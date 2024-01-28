import {createRoot} from "react-dom/client";
import {StyleProvider} from "./util/style/styleHook";
import {HttpClient} from "./util/http/httpClient";
import {ErrorRes} from "./response/response";
import {ErrorIds} from "./error";
import {TokenManager} from "./util/token/tokenManager";
import {Localstorage} from "./util/localstorage/localstorage";
import {api} from "./api";

export const localStorage = new Localstorage();
export const tokenManager = new TokenManager(localStorage);
export const httpClient = new HttpClient<ErrorRes>(
  import.meta.env.VITE_BASE,
  import.meta.env.VITE_CORS,
  tokenManager,
);
tokenManager.refreshFetcher = async refreshToken => {
  const value = await api.login.refresh(refreshToken)();
  return {
    accessToken: value.access_token,
    refreshToken: value.refresh_token,
  };
};
httpClient.statusCodeErrorHandler = async event => {
  if (event.result.error_id !== ErrorIds.ACCESS_TOKEN_EXPIRED.name) return;

  await tokenManager.fetchRefresh();

  if (event.retry > 10) return;
  event.setRetry(event.retry + 1);
};

export function Main() {
  return <StyleProvider></StyleProvider>;
}

function main() {
  const element = document.getElementById("react");
  if (element == undefined) {
    console.error("初期化に失敗しました。");
    console.error("ブラウザーをリロードしてください。");
    document.body.textContent = "初期化に失敗しました。ブラウザーをリロードしてください。";
    return;
  }
  createRoot(element).render(<Main/>);
}

main();

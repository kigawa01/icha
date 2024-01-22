import {createRoot} from "react-dom/client";
import {StyleProvider} from "./util/style/styleHook";
import {HttpJsonClient} from "./util/http/httpJsonClient";
import {ErrorRes} from "./response/response";
import {ErrorIds} from "./error";

export const httpClient = new HttpJsonClient<ErrorRes>(
  import.meta.env.VITE_BASE,
);
httpClient.statusCodeErrorHandler = event => {
  if (event.result.error_id !== ErrorIds.ACCESS_TOKEN_EXPIRED.name) return;


  if (event.retry > 10) return;
  event.setRetry(event.retry + 1);
};

export function Main() {
  return <StyleProvider>
  </StyleProvider>;
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

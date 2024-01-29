import {createRoot} from "react-dom/client";
import {StyleProvider} from "./util/style/styleHook";
import {TokenManager} from "./util/token/tokenManager";
import {Localstorage} from "./util/localstorage/localstorage";
import {Configuration, DefaultApi} from "./api_clients";
import {MainRouter} from "./MainRouter.tsx";

import.meta.env.VITE_CORS;
export const clientConfig = new Configuration({
  basePath: import.meta.env.VITE_BASE,
});
export const defaultApi = new DefaultApi(clientConfig);
export const localStorage = new Localstorage();
export const tokenManager = new TokenManager(localStorage);

tokenManager.refreshFetcher = async _ => {
  // const value = await api.login.refresh(refreshToken)();
  // return {
  //   accessToken: value.access_token,
  //   refreshToken: value.refresh_token,
  // };
  return {accessToken: "", refreshToken: ""};
};


export function Main() {
  return <StyleProvider>
    <MainRouter/>
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

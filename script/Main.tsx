import {createRoot} from "react-dom/client";
import {StyleProvider} from "./util/style/styleHook";

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

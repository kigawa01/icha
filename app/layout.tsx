import {ReactNode} from "react";
import {Header} from "../script/page/header/Header";
import {Theme} from "./Theme";


export default function RootLayout(
  {
    children,
  }: {
    children: ReactNode
  },
) {

  return <html>
    <head>
      <meta charSet="UTF-8"/>
      <title>Icha</title>
    </head>
    <body>
      <Theme>
        <Header/>
      </Theme>
    </body>
  </html>;
}
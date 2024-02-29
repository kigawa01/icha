import {ReactNode} from "react";
import {Header} from "./_header/Header";
import {Theme} from "./Theme";
import {Footer} from "./_footer/Footer";
import {Toolbar} from "@mui/material";
import {Box} from "@mui/system";
import UserProvider from "./_manager/UserProvider";

export default function RootLayout(
  {
    children,
  }: {
    children: ReactNode,
  },
) {

  return <html lang="ja">
    <head>
      <meta charSet="UTF-8"/>
      <meta content="width=device-width, initial-scale=1" name="viewport"/>
      <title>Icha</title>
      {/* Google tag (gtag.js) */}
      <script async src="https://www.googletagmanager.com/gtag/js?id=G-E2QSM2RBMZ"></script>
      <script>
        {`
        window.dataLayer = window.dataLayer || [];
        function gtag(){dataLayer.push(arguments);}
        gtag('js', new Date());

        gtag('config', 'G-E2QSM2RBMZ');        
        `}
      </script>

    </head>
    <Box
      component={"body"}
      minHeight={"100vh"}
      position={"relative"}
      boxSizing={"border-box"}
      margin={0}
    >
      <UserProvider/>
      <Theme>
        <Header/>
        <Box
          display={"flex"}
          flexDirection={"column"}
          minHeight={"100vh"}
        >
          <Toolbar/>
          {children}
          <Footer/>
        </Box>
      </Theme>
    </Box>
  </html>;
}
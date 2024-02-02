import {ReactNode} from "react";
import {Header} from "./header/Header";
import {Theme} from "./Theme";
import {Footer} from "./footer/Footer";
import {Toolbar} from "@mui/material";
import {Box} from "@mui/system";


export default function RootLayout(
  {
    children,
  }: {
    children: ReactNode
  },
) {

  return <html lang="ja">
    <head>
      <meta charSet="UTF-8"/>
      <meta content="width=device-width, initial-scale=1" name="viewport"/>
      <title>Icha</title>
    </head>
    <Box
      component={"body"}
      minHeight={"100vh"}
      position={"relative"}
      boxSizing={"border-box"}
      margin={0}
    >
      <Theme>

        <Header/>
        <Toolbar/>
        {children}
        <Footer/>

      </Theme>
    </Box>
  </html>;
}
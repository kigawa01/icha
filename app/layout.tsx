import {ReactNode} from "react";
import {Header} from "./_header/Header";
import {Theme} from "./_unit/Theme";
import {Footer} from "./_footer/Footer";
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
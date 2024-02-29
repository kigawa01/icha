import {ReactNode} from "react";
import {Header} from "./_header/Header";
import {Theme} from "./Theme";
import {Footer} from "./_footer/Footer";
import {Toolbar} from "@mui/material";
import {Box} from "@mui/system";
import UserProvider from "./_manager/UserProvider";
import Script from "next/script";

const GA_MEASUREMENT_ID = process.env.NEXT_PUBLIC_GA_ID;
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
      <Script
        strategy="afterInteractive"
        src={`https://www.googletagmanager.com/gtag/js?id=${GA_MEASUREMENT_ID}`}
      />
      <Script
        id="gtag-init"
        strategy="afterInteractive"
        dangerouslySetInnerHTML={{
          __html: `
           window.dataLayer = window.dataLayer || [];
           function gtag(){dataLayer.push(arguments);}
           gtag('js', new Date());
           gtag('config', '${GA_MEASUREMENT_ID}');
           `,
        }}
      />
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
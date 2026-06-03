import {Links, Meta, Outlet, Scripts, ScrollRestoration} from "react-router";
import {Header} from "./_header/Header";
import {Theme} from "./Theme";
import {Footer} from "./_footer/Footer";
import {Toolbar} from "@mui/material";
import {Box} from "@mui/system";
import UserProvider from "./_manager/UserProvider";
import "./font.css";

const GA_MEASUREMENT_ID = import.meta.env.VITE_GA_ID;

export default function App() {
  return (
    <html lang="ja">
      <head>
        <meta charSet="UTF-8"/>
        <meta content="width=device-width, initial-scale=1" name="viewport"/>
        <title>Icha</title>
        <Meta/>
        <Links/>
        {GA_MEASUREMENT_ID && <>
          <script async src={`https://www.googletagmanager.com/gtag/js?id=${GA_MEASUREMENT_ID}`}/>
          <script dangerouslySetInnerHTML={{
            __html: `
              window.dataLayer = window.dataLayer || [];
              function gtag(){dataLayer.push(arguments);}
              gtag('js', new Date());
              gtag('config', '${GA_MEASUREMENT_ID}');
            `,
          }}/>
        </>}
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
            <Outlet/>
            <Footer/>
          </Box>
        </Theme>
        <ScrollRestoration/>
        <Scripts/>
      </Box>
    </html>
  );
}

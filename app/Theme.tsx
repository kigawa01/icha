"use client";
import {ReactNode} from "react";
import {AppRouterCacheProvider} from "@mui/material-nextjs/v13-appRouter";
import {ThemeProvider} from "@mui/system";
import {createTheme} from "@mui/material";
import localFont from "next/font/local";
import {amber, grey, lime} from "@mui/material/colors";


const udevFont = localFont({src: "../assets/UDEVGothic_v1-3-1/UDEVGothic35-Regular.ttf"});

export function Theme(
  {
    children,
  }: {
    children: ReactNode
  },
) {
  const theme = createTheme({
    palette: {
      primary: {
        main: amber[200],
        contrastText: grey[900],
      },
      secondary: {
        main: lime[800],
      },
      grey: {},
    },
    components: {
      MuiCssBaseline: {},
    },
    typography: {
      fontFamily: udevFont.style.fontFamily,
      h1: {
        fontSize: "2rem",
      },
      h2: {
        fontSize: "2.5rem",
      },
    },
  });

  return <AppRouterCacheProvider>
    <ThemeProvider theme={theme}>
      {children}
    </ThemeProvider>
  </AppRouterCacheProvider>;
}
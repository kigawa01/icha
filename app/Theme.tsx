"use client";
import {ReactNode} from "react";
import {AppRouterCacheProvider} from "@mui/material-nextjs/v13-appRouter";
import {ThemeProvider} from "@mui/system";
import {createTheme} from "@mui/material";
import localFont from "@next/font/local";



const udevFont = localFont({src: "../assets/UDEVGothic_v1-3-1/UDEVGothic35-Regular.ttf"})
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
        main: "#F2E8D4",
        contrastText: "#000",
      },
    },
    components: {
      MuiCssBaseline: {},
    },
    typography: {
      fontFamily: udevFont.style.fontFamily,
      h1: {
        fontSize: "2rem"
      }
    }
  });

  return <AppRouterCacheProvider>
    <ThemeProvider theme={theme}>
      {children}
    </ThemeProvider>
  </AppRouterCacheProvider>;
}
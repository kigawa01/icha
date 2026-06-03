import {ReactNode} from "react";
import {ThemeProvider} from "@mui/system";
import {createTheme} from "@mui/material";
import {amber, grey, lime} from "@mui/material/colors";

const FONT_FAMILY = '"UDEVGothic", monospace';

export const udevFont = {style: {fontFamily: FONT_FAMILY}};

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
      fontFamily: FONT_FAMILY,
      h1: {
        fontSize: "2rem",
      },
      h2: {
        fontSize: "2.5rem",
      },
      h3: {
        fontSize: "2rem",
      },
    },
  });

  return (
    <ThemeProvider theme={theme}>
      {children}
    </ThemeProvider>
  );
}

import { FC, useEffect, useMemo, useState } from "react";
import { CssBaseline, PaletteMode, ThemeOptions } from "@mui/material";
import { createTheme, ThemeProvider } from "@mui/material/styles";

declare module "@mui/material/styles" {
  interface BreakpointOverrides {
    xs: true;
    sm: true;
    smd: true;
    md: true;
    lg: true;
    xl: true;
    mobile: false;
    tablet: false;
    laptop: false;
    desktop: false;
  }

  interface Palette {
    regular: Palette["primary"];
  }
}

const getDesignTokens = (mode: PaletteMode): ThemeOptions => ({
  breakpoints: {
    values: {
      xs: 0,
      sm: 600,
      smd: 992,
      md: 1152,
      lg: 1200,
      xl: 1536,
    },
  },
  palette: {
    mode,
    ...(mode === "light"
      ? {
          // palette values for light mode
          primary: {
            main: "#000",
          },
          background: {
            default: "#fff",
            paper: "#fff",
          },
          text: {
            primary: "#fff",
            secondary: "#fff",
          },
        }
      : {
          // palette values for dark mode
          primary: {
            main: "#fff",
          },
          background: {
            default: "#000",
            paper: "#fff",
          },
          text: {
            primary: "#fff",
            secondary: "#fff",
          },
        }),
  },
  typography: {
    fontFamily: ["Inter", "sans-serif"].join(", "),
    h1: {
      fontWeight: 800,
      fontSize: "2.5rem",
    },
    h2: {
      fontWeight: 600,
      fontSize: "2rem",
    },
    h3: {
      fontWeight: 600,
      fontSize: "1.7rem",
    },
    h4: {
      fontWeight: 600,
      fontSize: "1.6rem",
    },
    h5: {
      fontWeight: 600,
      fontSize: "1.4rem",
    },
    subtitle1: {
      fontWeight: 800,
      fontSize: "1.1rem",
    },
    subtitle2: {
      fontWeight: 400,
      fontSize: "1rem",
    },
    body1: {
      fontWeight: 600,
      fontSize: "1.1rem",
    },
    body2: {
      fontWeight: 400,
      fontSize: "1rem",
    },
  },
  components: {
    MuiCssBaseline: {
      styleOverrides: {
        "@font-faces": ["Inter"],
      },
    },
  },
});

const Theme: FC = ({ children }) => {
  const [mode,] = useState('dark');

  const theme = useMemo(
    () => createTheme(getDesignTokens(mode as PaletteMode)),
    [mode]
  );

  theme.typography.body2 = {
    [theme.breakpoints.down("sm")]: {
      fontWeight: 300,
      fontSize: "0.7rem",
    },
  };

  useEffect(() => {
    console.log("theme:", mode);
  }, [mode]);

  return (
    <>
      <ThemeProvider theme={theme}>
        <CssBaseline />
        {children}
      </ThemeProvider>
    </>
  );
};

export default Theme;

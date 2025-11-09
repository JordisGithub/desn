import { createTheme } from "@mui/material/styles";

const theme = createTheme({
  palette: {
    mode: "light",
    primary: {
      main: "#004c91",
      light: "#1565c0",
      dark: "#003d73",
      contrastText: "#ffffff",
    },
    secondary: {
      main: "#00a77f",
      light: "#33b895",
      dark: "#008766",
      contrastText: "#ffffff",
    },
    warning: {
      main: "#f6d469",
      light: "#f8df87",
      dark: "#f5c943",
      contrastText: "#2b2b2b",
    },
    error: {
      main: "#d32f2f",
      light: "#ef5350",
      dark: "#c62828",
      contrastText: "#ffffff",
    },
    success: {
      main: "#00a77f",
      light: "#33b895",
      dark: "#008766",
      contrastText: "#ffffff",
    },
    background: {
      default: "#ffffff",
      paper: "#f9fafb",
    },
    text: {
      primary: "#2b2b2b",
      secondary: "#4a5565",
      disabled: "#9ca3af",
    },
    grey: {
      50: "#f9fafb",
      100: "#f3f4f6",
      200: "#e5e7eb",
      300: "#d1d5db",
      400: "#9ca3af",
      500: "#6b7280",
      600: "#4a5565",
      700: "#374151",
      800: "#2b2b2b",
      900: "#111827",
    },
  },
  typography: {
    fontFamily: '"Roboto", "Poppins", "Arial", sans-serif',
    h1: {
      fontFamily: '"Poppins", "Roboto", sans-serif',
      fontSize: "3.75rem",
      fontWeight: 400,
      lineHeight: 1.2,
      "@media (max-width:960px)": {
        fontSize: "3rem",
      },
      "@media (max-width:600px)": {
        fontSize: "2.5rem",
      },
    },
    h2: {
      fontFamily: '"Poppins", "Roboto", sans-serif',
      fontSize: "3rem",
      fontWeight: 400,
      lineHeight: 1.2,
      "@media (max-width:960px)": {
        fontSize: "2.5rem",
      },
      "@media (max-width:600px)": {
        fontSize: "2rem",
      },
    },
    h3: {
      fontFamily: '"Poppins", "Roboto", sans-serif',
      fontSize: "2.5rem",
      fontWeight: 400,
      lineHeight: 1.2,
      "@media (max-width:960px)": {
        fontSize: "2rem",
      },
      "@media (max-width:600px)": {
        fontSize: "1.75rem",
      },
    },
    h4: {
      fontFamily: '"Poppins", "Roboto", sans-serif',
      fontSize: "2rem",
      fontWeight: 400,
      lineHeight: 1.3,
      "@media (max-width:600px)": {
        fontSize: "1.5rem",
      },
    },
    h5: {
      fontFamily: '"Poppins", "Roboto", sans-serif',
      fontSize: "1.5rem",
      fontWeight: 400,
      lineHeight: 1.4,
      "@media (max-width:600px)": {
        fontSize: "1.25rem",
      },
    },
    h6: {
      fontFamily: '"Poppins", "Roboto", sans-serif',
      fontSize: "1.25rem",
      fontWeight: 500,
      lineHeight: 1.4,
    },
    body1: {
      fontSize: "1.125rem",
      lineHeight: 1.6,
      "@media (max-width:600px)": {
        fontSize: "1rem",
      },
    },
    body2: {
      fontSize: "1rem",
      lineHeight: 1.5,
    },
    button: {
      fontSize: "1rem",
      fontWeight: 500,
      textTransform: "none",
    },
  },
  spacing: 8,
  breakpoints: {
    values: {
      xs: 0,
      sm: 600,
      md: 960,
      lg: 1280,
      xl: 1920,
    },
  },
  shape: {
    borderRadius: 8,
  },
  shadows: [
    "none",
    "0px 2px 4px rgba(0, 0, 0, 0.05)",
    "0px 4px 6px rgba(0, 0, 0, 0.07)",
    "0px 8px 12px rgba(0, 0, 0, 0.1)",
    "0px 12px 16px rgba(0, 0, 0, 0.12)",
    "0px 16px 24px rgba(0, 0, 0, 0.14)",
    "0px 20px 25px -5px rgba(0,0,0,0.1), 0px 8px 10px -6px rgba(0,0,0,0.1)",
    "0px 24px 32px rgba(0, 0, 0, 0.16)",
    "0px 32px 40px rgba(0, 0, 0, 0.18)",
    "0px 2px 4px rgba(0, 0, 0, 0.05)",
    "0px 4px 6px rgba(0, 0, 0, 0.07)",
    "0px 8px 12px rgba(0, 0, 0, 0.1)",
    "0px 12px 16px rgba(0, 0, 0, 0.12)",
    "0px 16px 24px rgba(0, 0, 0, 0.14)",
    "0px 20px 32px rgba(0, 0, 0, 0.16)",
    "0px 24px 40px rgba(0, 0, 0, 0.18)",
    "0px 32px 48px rgba(0, 0, 0, 0.2)",
    "0px 2px 4px rgba(0, 0, 0, 0.05)",
    "0px 4px 6px rgba(0, 0, 0, 0.07)",
    "0px 8px 12px rgba(0, 0, 0, 0.1)",
    "0px 12px 16px rgba(0, 0, 0, 0.12)",
    "0px 16px 24px rgba(0, 0, 0, 0.14)",
    "0px 20px 32px rgba(0, 0, 0, 0.16)",
    "0px 24px 40px rgba(0, 0, 0, 0.18)",
    "0px 32px 48px rgba(0, 0, 0, 0.2)",
  ],
  components: {
    MuiButton: {
      styleOverrides: {
        root: {
          borderRadius: "100px",
          padding: "12px 32px",
          fontSize: "1rem",
          fontWeight: 600,
          transition: "all 0.3s ease",
          "&:hover": {
            transform: "translateY(-2px)",
            boxShadow: "0px 8px 16px rgba(0, 0, 0, 0.15)",
          },
        },
        contained: {
          boxShadow: "0px 4px 8px rgba(0, 0, 0, 0.1)",
        },
      },
    },
    MuiCard: {
      styleOverrides: {
        root: {
          borderRadius: "16px",
          boxShadow: "0px 4px 12px rgba(0, 0, 0, 0.08)",
          transition: "all 0.3s ease",
          "&:hover": {
            boxShadow: "0px 8px 24px rgba(0, 0, 0, 0.12)",
            transform: "translateY(-4px)",
          },
        },
      },
    },
    MuiContainer: {
      styleOverrides: {
        root: {
          paddingLeft: "24px",
          paddingRight: "24px",
          "@media (max-width:600px)": {
            paddingLeft: "16px",
            paddingRight: "16px",
          },
        },
      },
    },
  },
});

export default theme;

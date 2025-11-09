import type { ReactNode } from "react";
import { Box } from "@mui/material";
import Header from "./Header";
import Footer from "./Footer";

interface LayoutProps {
  children: ReactNode;
}

export default function Layout({ children }: LayoutProps) {
  return (
    <Box
      sx={{
        minHeight: "100vh",
        display: "flex",
        flexDirection: "column",
      }}
    >
      <Header />
      <Box component='main' sx={{ flex: 1 }}>
        {children}
      </Box>
      <Footer />
    </Box>
  );
}

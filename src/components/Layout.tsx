import type { ReactNode } from "react";
import { Box } from "@mui/material";
import Header from "./Header";
import Footer from "./Footer";
import { useFocusManagement } from "../hooks/useFocusManagement";

interface LayoutProps {
  children: ReactNode;
}

export default function Layout({ children }: LayoutProps) {
  const announcementRef = useFocusManagement();

  return (
    <Box
      sx={{
        minHeight: "100vh",
        display: "flex",
        flexDirection: "column",
      }}
    >
      {/* Screen reader announcement for route changes */}
      <div
        ref={announcementRef}
        role='status'
        aria-live='polite'
        aria-atomic='true'
        style={{
          position: "absolute",
          left: "-10000px",
          width: "1px",
          height: "1px",
          overflow: "hidden",
        }}
      />

      <Header />
      <Box component='main' id='main-content' sx={{ flex: 1 }}>
        {children}
      </Box>
      <Footer />
    </Box>
  );
}

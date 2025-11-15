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

  const skipToMainContent = (e: React.MouseEvent<HTMLAnchorElement>) => {
    e.preventDefault();
    const mainContent = document.querySelector("main") as HTMLElement;
    if (mainContent) {
      mainContent.setAttribute("tabindex", "-1");
      mainContent.focus();
      mainContent.addEventListener(
        "blur",
        () => {
          mainContent.removeAttribute("tabindex");
        },
        { once: true }
      );
    }
  };

  return (
    <Box
      sx={{
        minHeight: "100vh",
        display: "flex",
        flexDirection: "column",
      }}
    >
      {/* Skip to main content link - First in DOM for keyboard users */}
      <a
        href='#main-content'
        onClick={skipToMainContent}
        style={{
          position: "fixed",
          left: "8px",
          top: "8px",
          zIndex: 10000,
          padding: "8px 16px",
          backgroundColor: "#004c91",
          color: "white",
          textDecoration: "none",
          borderRadius: "4px",
          transform: "translateY(-150%)",
          transition: "transform 0.2s ease",
        }}
        onFocus={(e) => {
          e.currentTarget.style.transform = "translateY(0)";
        }}
        onBlur={(e) => {
          e.currentTarget.style.transform = "translateY(-150%)";
        }}
      >
        Skip to main content
      </a>

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

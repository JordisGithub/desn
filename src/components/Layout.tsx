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
          position: "absolute",
          left: "-9999px",
          zIndex: 9999,
          padding: "8px 16px",
          backgroundColor: "#004c91",
          color: "white",
          textDecoration: "none",
          borderRadius: "4px",
        }}
        onFocus={(e) => {
          e.currentTarget.style.left = "8px";
          e.currentTarget.style.top = "8px";
        }}
        onBlur={(e) => {
          e.currentTarget.style.left = "-9999px";
          e.currentTarget.style.top = "auto";
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

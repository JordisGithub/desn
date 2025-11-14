import { useEffect, useRef } from "react";
import { useLocation } from "react-router-dom";

/**
 * Custom hook for managing focus and scroll behavior on route changes
 * Ensures accessibility by:
 * - Scrolling to top of page on navigation
 * - Moving focus to main content area
 * - Announcing page changes to screen readers
 */
export const useFocusManagement = () => {
  const location = useLocation();
  const announcementRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    // Scroll to top of page
    window.scrollTo(0, 0);

    // Focus on main content area (h1 or main element)
    const mainContent = document.querySelector("main") as HTMLElement;
    const heading = document.querySelector("h1") as HTMLElement;

    if (heading) {
      // Make heading focusable temporarily
      heading.setAttribute("tabindex", "-1");
      heading.focus();
      // Remove tabindex after focus to avoid affecting tab order
      heading.addEventListener(
        "blur",
        () => {
          heading.removeAttribute("tabindex");
        },
        { once: true }
      );
    } else if (mainContent) {
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

    // Announce route change to screen readers
    if (announcementRef.current) {
      const pageName = document.title.split("|")[0].trim();
      announcementRef.current.textContent = `Navigated to ${pageName}`;
    }
  }, [location.pathname]);

  return announcementRef;
};

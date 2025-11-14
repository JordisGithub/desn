import { useRef, useEffect } from "react";

/**
 * Custom hook for managing live region announcements
 * Used for dynamically announcing content changes to screen readers
 */
export const useAnnouncer = () => {
  const announcerRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    // Create announcer element if it doesn't exist
    if (!announcerRef.current) {
      const announcer = document.createElement("div");
      announcer.setAttribute("role", "status");
      announcer.setAttribute("aria-live", "polite");
      announcer.setAttribute("aria-atomic", "true");
      announcer.className = "sr-only";
      document.body.appendChild(announcer);
      announcerRef.current = announcer;
    }

    return () => {
      if (announcerRef.current) {
        document.body.removeChild(announcerRef.current);
        announcerRef.current = null;
      }
    };
  }, []);

  const announce = (
    message: string,
    priority: "polite" | "assertive" = "polite"
  ) => {
    if (announcerRef.current) {
      // Clear previous announcement
      announcerRef.current.textContent = "";
      // Set priority
      announcerRef.current.setAttribute("aria-live", priority);
      // Announce new message (slight delay ensures screen readers catch the change)
      setTimeout(() => {
        if (announcerRef.current) {
          announcerRef.current.textContent = message;
        }
      }, 100);
    }
  };

  return { announce };
};

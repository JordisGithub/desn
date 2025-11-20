import { useEffect } from "react";
import { useLocation } from "react-router-dom";
import {
  getHighlightQuery,
  highlightSearchTerm,
  removeHighlights,
} from "../utils/searchHighlight";

/**
 * Hook that automatically highlights search terms when a page loads
 * with the 'highlight' URL parameter
 */
export function useSearchHighlight(): void {
  const location = useLocation();

  useEffect(() => {
    // Get the highlight query from URL
    const highlightQuery = getHighlightQuery();

    // Clean up any previous highlights
    removeHighlights();

    if (highlightQuery && highlightQuery.trim().length > 0) {
      // Wait for DOM to be fully rendered before highlighting
      // This is especially important for dynamically rendered content
      const timer = setTimeout(() => {
        highlightSearchTerm({
          query: highlightQuery,
          duration: 2000, // 2 seconds
        });
      }, 100);

      return () => clearTimeout(timer);
    }
  }, [location]);
}

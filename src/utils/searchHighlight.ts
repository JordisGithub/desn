/**
 * Search Highlighting Utility
 * Handles finding, highlighting, and scrolling to search terms on a page
 */

const HIGHLIGHT_CLASS = "search-highlight";
const HIGHLIGHT_DURATION = 2000; // 2 seconds

export interface HighlightOptions {
  query: string;
  duration?: number;
  className?: string;
}

/**
 * Highlights all occurrences of a search term in the DOM
 * and scrolls to the first match
 */
export function highlightSearchTerm(options: HighlightOptions): void {
  const {
    query,
    duration = HIGHLIGHT_DURATION,
    className = HIGHLIGHT_CLASS,
  } = options;

  if (!query || query.trim().length === 0) {
    return;
  }

  const searchRegex = new RegExp(`(${escapeRegex(query)})`, "gi");
  const walker = document.createTreeWalker(
    document.body,
    NodeFilter.SHOW_TEXT,
    null
  );

  const nodesToReplace: { node: Node; parent: Node }[] = [];
  let node: Node | null;

  // Find all text nodes containing the search term
  while ((node = walker.nextNode())) {
    if (
      node.textContent &&
      searchRegex.test(node.textContent) &&
      node.parentElement &&
      !isExcludedElement(node.parentElement)
    ) {
      nodesToReplace.push({ node, parent: node.parentElement });
      searchRegex.lastIndex = 0; // Reset regex for next iteration
    }
  }

  if (nodesToReplace.length === 0) {
    return;
  }

  let firstHighlight: HTMLElement | null = null;

  // Replace text nodes with highlighted spans
  nodesToReplace.forEach(({ node, parent }) => {
    const textContent = node.textContent || "";
    const fragment = document.createDocumentFragment();

    let lastIndex = 0;
    let match;

    while ((match = searchRegex.exec(textContent)) !== null) {
      // Add non-matching text
      if (match.index > lastIndex) {
        fragment.appendChild(
          document.createTextNode(textContent.substring(lastIndex, match.index))
        );
      }

      // Add highlighted matching text
      const highlightSpan = document.createElement("span");
      highlightSpan.className = className;
      highlightSpan.textContent = match[0];
      highlightSpan.style.backgroundColor = "#ffeb3b"; // Bright yellow
      highlightSpan.style.padding = "2px 4px";
      highlightSpan.style.borderRadius = "2px";
      highlightSpan.style.fontWeight = "600";
      highlightSpan.style.transition = `background-color 0.3s ease, box-shadow 0.3s ease`;
      highlightSpan.style.boxShadow = "0 0 0 2px #fbc02d";

      if (!firstHighlight) {
        firstHighlight = highlightSpan;
      }

      fragment.appendChild(highlightSpan);
      lastIndex = searchRegex.lastIndex;
    }

    // Add remaining text
    if (lastIndex < textContent.length) {
      fragment.appendChild(
        document.createTextNode(textContent.substring(lastIndex))
      );
    }

    // Replace the text node with the fragment
    if (parent === node.parentElement) {
      parent.replaceChild(fragment, node);
    }
  });

  // Scroll to and pulse the first highlight
  if (firstHighlight) {
    scrollToElement(firstHighlight);
    pulseHighlight(firstHighlight, duration);
  }
}

/**
 * Scrolls an element into view with smooth behavior
 */
function scrollToElement(element: Element): void {
  element.scrollIntoView({
    behavior: "smooth",
    block: "center",
  });

  // Give it extra focus treatment
  const rect = element.getBoundingClientRect();
  if (rect.top < 100) {
    // If too high after scroll, scroll down a bit more
    window.scrollBy({
      top: -50,
      behavior: "smooth",
    });
  }
}

/**
 * Pulses the highlight for a duration then removes it
 */
function pulseHighlight(element: HTMLElement, duration: number): void {
  // Add pulse animation
  element.style.animation = "searchHighlightPulse 0.6s ease-in-out 3";

  // Inject keyframes if not already present
  injectHighlightAnimation();

  // Remove highlight after duration
  setTimeout(() => {
    removeHighlights();
  }, duration);
}

/**
 * Removes all highlights from the page
 */
export function removeHighlights(): void {
  document.querySelectorAll(`.${HIGHLIGHT_CLASS}`).forEach((el) => {
    const parent = el.parentNode;
    if (parent) {
      // Replace span with its text content
      while (el.firstChild) {
        parent.insertBefore(el.firstChild, el);
      }
      parent.removeChild(el);
    }
  });
}

/**
 * Injects the highlight animation keyframes into the document
 */
function injectHighlightAnimation(): void {
  if (document.getElementById("search-highlight-styles")) {
    return;
  }

  const style = document.createElement("style");
  style.id = "search-highlight-styles";
  style.textContent = `
    @keyframes searchHighlightPulse {
      0% {
        box-shadow: 0 0 0 2px #fbc02d;
        transform: scale(1);
      }
      50% {
        box-shadow: 0 0 8px 2px #fbc02d;
        transform: scale(1.05);
      }
      100% {
        box-shadow: 0 0 0 2px #fbc02d;
        transform: scale(1);
      }
    }
  `;
  document.head.appendChild(style);
}

/**
 * Escapes special regex characters
 */
function escapeRegex(str: string): string {
  return str.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
}

/**
 * Checks if element should be excluded from highlighting
 * (e.g., scripts, styles, hidden elements)
 */
function isExcludedElement(element: Element): boolean {
  const tagName = element.tagName.toLowerCase();
  const excludedTags = ["script", "style", "noscript", "meta", "title"];

  if (excludedTags.includes(tagName)) {
    return true;
  }

  // Check if element or parents are hidden
  if (element.getAttribute("hidden") !== null) {
    return true;
  }

  const computedStyle = window.getComputedStyle(element);
  if (
    computedStyle.display === "none" ||
    computedStyle.visibility === "hidden"
  ) {
    return true;
  }

  // Don't highlight in form inputs
  if (tagName === "input" || tagName === "textarea") {
    return true;
  }

  return false;
}

/**
 * Creates a URLSearchParam for highlighting
 * Used to pass highlight query through navigation
 */
export function createHighlightUrl(baseUrl: string, query: string): string {
  // If baseUrl is already a full URL, use it directly
  // Otherwise, construct from origin
  const url = baseUrl.startsWith("http")
    ? new URL(baseUrl)
    : new URL(baseUrl, window.location.origin);
  url.searchParams.set("highlight", query);
  return url.pathname + url.search;
}

/**
 * Gets the highlight query from URL params
 */
export function getHighlightQuery(): string | null {
  const params = new URLSearchParams(window.location.search);
  return params.get("highlight");
}

/**
 * Color Variables - Centralized color system for DESN website
 * All colors used across the application are defined here for consistency
 */

export const colors = {
  // Primary Brand Colors
  primary: {
    main: "#004c91", // Primary blue - used for headings, buttons, links
    light: "#1565c0", // Lighter blue
    dark: "#003d73", // Darker blue
    contrastText: "#ffffff", // White text on primary
  },

  // Secondary Brand Colors
  secondary: {
    main: "#00a77f", // Teal green - used for accents, highlights
    light: "#33b895", // Lighter teal
    dark: "#008766", // Darker teal
    contrastText: "#ffffff", // White text on secondary
  },

  // Accent Colors
  accent: {
    warning: "#f6d469", // Yellow - donation buttons, CTAs
    warningDark: "#f5ca4a", // Darker yellow for hover states
    error: "#d32f2f", // Red - error states
    errorLight: "#ef5350", // Light red
    errorDark: "#c62828", // Dark red
    success: "#00a77f", // Green - success states (same as secondary)
  },

  // Neutral Colors
  neutral: {
    white: "#ffffff", // Pure white - backgrounds
    offWhite: "#f9fafb", // Off-white - subtle backgrounds
    lightGrey: "#f3f4f6", // Light grey - section backgrounds
    mediumLight: "#e5e7eb", // Medium light grey
    mediumGrey: "#d1d5db", // Medium grey - borders
    mediumDark: "#9ca3af", // Medium dark grey
    darkGrey: "#6b7280", // Dark grey - secondary text
    charcoal: "#4a5565", // Charcoal - text
    darkCharcoal: "#374151", // Dark charcoal
    nearBlack: "#2b2b2b", // Near black - primary text
    black: "#111827", // Pure black
  },

  // Semantic Colors
  text: {
    primary: "#2b2b2b", // Main text color
    secondary: "#4a5565", // Secondary text color
    disabled: "#9ca3af", // Disabled text color
    light: "#6b7280", // Light text
  },

  // Background Colors
  background: {
    default: "#ffffff", // Default page background
    paper: "#f9fafb", // Card/container backgrounds
    lightBlue: "#e8f4f8", // Light blue background for info boxes
    lightGreen: "#e6f4f1", // Light green background for donation sections
    lightYellow: "#fffacd", // Light yellow
    yellow: "#fff3cd", // Yellow highlight for search results
  },

  // Component-Specific Colors
  components: {
    // Search Results
    searchInfoBox: "#e8f4f8", // Background for search info box
    searchHighlight: "#fff3cd", // Highlight color for matching text
    searchHighlightBorder: "#ffc107", // Border for highlight
    searchBadge: "#004c91", // Badge background for result type

    // Navigation
    navBackground: "#004c91", // Navigation bar background
    navText: "#ffffff", // Navigation text

    // Donation Section
    donationBackground: "#e6f4f1", // Donation section background
    donationBorder: "#b8e6d5", // Donation section border
    donateButton: "#f6d469", // Yellow donation button
    donateButtonHover: "#f5ca4a", // Darker yellow on hover
    donateButtonText: "#004c91", // Text color for donation button

    // Impact Cards
    impactIcon: "linear-gradient(135deg, #004c91 0%, #00a77f 100%)", // Gradient for impact icons
    impactIconShadow: "rgba(0, 76, 145, 0.3)", // Shadow for impact icons
    impactHoverBorder: "#00a77f", // Border color on hover

    // Tagline/Emphasis
    tagline: "#004c91", // Color for emphasized taglines
  },

  // Overlay & Transparency Colors
  overlay: {
    darkBlue75: "rgba(0, 76, 145, 0.75)", // Dark blue overlay - 75% opacity
    darkBlue85: "rgba(0, 61, 115, 0.85)", // Dark blue overlay - 85% opacity
    black70: "rgba(0, 0, 0, 0.7)", // Black overlay - 70% opacity
    black05: "rgba(0, 0, 0, 0.05)", // Black overlay - 5% opacity
    black07: "rgba(0, 0, 0, 0.07)", // Black overlay - 7% opacity
    black1: "rgba(0, 0, 0, 0.1)", // Black overlay - 10% opacity
    black12: "rgba(0, 0, 0, 0.12)", // Black overlay - 12% opacity
    black14: "rgba(0, 0, 0, 0.14)", // Black overlay - 14% opacity
    black16: "rgba(0, 0, 0, 0.16)", // Black overlay - 16% opacity
    black18: "rgba(0, 0, 0, 0.18)", // Black overlay - 18% opacity
    green2: "rgba(0, 167, 127, 0.2)", // Green overlay - 20% opacity
  },
};

// Accessibility compliant colors
export const a11yColors = {
  // WCAG AAA compliant (7:1 contrast on white)
  darkBlue: "#001a33", // Very dark blue for hero copy heading - 12.6:1 contrast
  heroHeading: "#ffffff", // White headings with text-shadow
  textOnDark: "#ffffff", // White text on dark backgrounds
};

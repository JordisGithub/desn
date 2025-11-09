import { styled } from "@mui/material/styles";
import { Button } from "@mui/material";
import { Link } from "react-router-dom";

/**
 * Standardized Primary CTA Button
 * Uses DESN's brand yellow (#f6d469) with consistent typography
 * WCAG 2.2 AA compliant with focus indicators
 */
export const PrimaryCTAButton = styled(Button)(({ theme }) => ({
  backgroundColor: "#f6d469",
  color: "#2b2b2b",
  fontWeight: 600,
  fontSize: "1.125rem",
  padding: theme.spacing(1.5, 4),
  borderRadius: "100px",
  textTransform: "none",
  transition: "all 0.3s ease",
  "&:hover": {
    backgroundColor: "#f5c943",
    transform: "translateY(-2px)",
    boxShadow: "0 4px 12px rgba(246, 212, 105, 0.4)",
  },
  "&:focus": {
    outline: "3px solid white",
    outlineOffset: "2px",
  },
  "&:active": {
    transform: "translateY(0)",
  },
  [theme.breakpoints.down("sm")]: {
    fontSize: "1rem",
    padding: theme.spacing(1.25, 3),
  },
}));

/**
 * Standardized Primary CTA Link Button
 * Same styling as PrimaryCTAButton but for Link components
 */
export const PrimaryCTALink = styled(Link)(({ theme }) => ({
  backgroundColor: "#f6d469",
  color: "#2b2b2b",
  fontWeight: 600,
  fontSize: "1.125rem",
  padding: theme.spacing(1.5, 4),
  borderRadius: "100px",
  textDecoration: "none",
  display: "inline-flex",
  alignItems: "center",
  justifyContent: "center",
  gap: theme.spacing(1),
  transition: "all 0.3s ease",
  "&:hover": {
    backgroundColor: "#f5c943",
    transform: "translateY(-2px)",
    boxShadow: "0 4px 12px rgba(246, 212, 105, 0.4)",
  },
  "&:focus": {
    outline: "3px solid white",
    outlineOffset: "2px",
  },
  "&:active": {
    transform: "translateY(0)",
  },
  [theme.breakpoints.down("sm")]: {
    fontSize: "1rem",
    padding: theme.spacing(1.25, 3),
  },
}));

/**
 * Standardized Secondary CTA Button (Outlined)
 * White outline on dark backgrounds
 */
export const SecondaryCTAButton = styled(Button)(({ theme }) => ({
  backgroundColor: "transparent",
  color: "white",
  fontWeight: 600,
  fontSize: "1.125rem",
  padding: theme.spacing(1.5, 4),
  borderRadius: "100px",
  border: "2px solid white",
  textTransform: "none",
  transition: "all 0.3s ease",
  "&:hover": {
    backgroundColor: "rgba(255, 255, 255, 0.15)",
    borderColor: "white",
  },
  "&:focus": {
    outline: "3px solid #f6d469",
    outlineOffset: "2px",
  },
  [theme.breakpoints.down("sm")]: {
    fontSize: "1rem",
    padding: theme.spacing(1.25, 3),
  },
}));

/**
 * Standardized Secondary CTA Link Button
 * Same styling as SecondaryCTAButton but for Link components
 */
export const SecondaryCTALink = styled(Link)(({ theme }) => ({
  backgroundColor: "transparent",
  color: "white",
  fontWeight: 600,
  fontSize: "1.125rem",
  padding: theme.spacing(1.5, 4),
  borderRadius: "100px",
  border: "2px solid white",
  textDecoration: "none",
  display: "inline-flex",
  alignItems: "center",
  justifyContent: "center",
  gap: theme.spacing(1),
  transition: "all 0.3s ease",
  "&:hover": {
    backgroundColor: "rgba(255, 255, 255, 0.15)",
    borderColor: "white",
  },
  "&:focus": {
    outline: "3px solid #f6d469",
    outlineOffset: "2px",
  },
  [theme.breakpoints.down("sm")]: {
    fontSize: "1rem",
    padding: theme.spacing(1.25, 3),
  },
}));

/**
 * Standardized Tertiary CTA Button (Dark version for light backgrounds)
 */
export const TertiaryCTAButton = styled(Button)(({ theme }) => ({
  backgroundColor: "#004c91",
  color: "white",
  fontWeight: 600,
  fontSize: "1.125rem",
  padding: theme.spacing(1.5, 4),
  borderRadius: "100px",
  textTransform: "none",
  transition: "all 0.3s ease",
  "&:hover": {
    backgroundColor: "#003d75",
    transform: "translateY(-2px)",
    boxShadow: "0 4px 12px rgba(0, 76, 145, 0.3)",
  },
  "&:focus": {
    outline: "3px solid #f6d469",
    outlineOffset: "2px",
  },
  "&:active": {
    transform: "translateY(0)",
  },
  [theme.breakpoints.down("sm")]: {
    fontSize: "1rem",
    padding: theme.spacing(1.25, 3),
  },
}));

/**
 * Standardized Tertiary CTA Link Button
 */
export const TertiaryCTALink = styled(Link)(({ theme }) => ({
  backgroundColor: "#004c91",
  color: "white",
  fontWeight: 600,
  fontSize: "1.125rem",
  padding: theme.spacing(1.5, 4),
  borderRadius: "100px",
  textDecoration: "none",
  display: "inline-flex",
  alignItems: "center",
  justifyContent: "center",
  gap: theme.spacing(1),
  transition: "all 0.3s ease",
  "&:hover": {
    backgroundColor: "#003d75",
    transform: "translateY(-2px)",
    boxShadow: "0 4px 12px rgba(0, 76, 145, 0.3)",
  },
  "&:focus": {
    outline: "3px solid #f6d469",
    outlineOffset: "2px",
  },
  "&:active": {
    transform: "translateY(0)",
  },
  [theme.breakpoints.down("sm")]: {
    fontSize: "1rem",
    padding: theme.spacing(1.25, 3),
  },
}));

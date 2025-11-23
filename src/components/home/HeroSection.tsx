import { Box, Typography } from "@mui/material";
import { styled } from "@mui/material/styles";
import { useTranslation } from "react-i18next";
import heroImage from "../../assets/home/nepal-hero-image.png";

// Full-width hero container with background image
const HeroContainer = styled("div")(({ theme }) => ({
  position: "relative",
  width: "100%",
  minHeight: "85vh",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  overflow: "hidden",
  backgroundImage: `url(${heroImage})`,
  backgroundSize: "cover",
  backgroundPosition: "center center",
  backgroundRepeat: "no-repeat",
  [theme.breakpoints.down("md")]: {
    minHeight: "70vh",
  },
  [theme.breakpoints.down("sm")]: {
    minHeight: "60vh",
  },
  // Dark gradient overlay for text contrast
  "&::before": {
    content: '""',
    position: "absolute",
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    background:
      "linear-gradient(135deg, rgba(0, 76, 145, 0.75) 0%, rgba(0, 61, 115, 0.85) 50%, rgba(0, 0, 0, 0.7) 100%)",
    zIndex: 1,
  },
}));

// Content wrapper - centered both horizontally and vertically
const HeroContent = styled(Box)(({ theme }) => ({
  position: "relative",
  zIndex: 2,
  textAlign: "center",
  padding: theme.spacing(4),
  maxWidth: "1200px",
  margin: "0 auto",
  [theme.breakpoints.down("md")]: {
    padding: theme.spacing(3),
  },
  [theme.breakpoints.down("sm")]: {
    padding: theme.spacing(2),
  },
}));

// Massive, bold headline
const HeroHeading = styled(Typography)(({ theme }) => ({
  color: "#f6d469",
  fontSize: "4.5rem", // Desktop: 72px
  fontWeight: 900,
  lineHeight: 1.1,
  letterSpacing: "-0.02em",
  marginBottom: theme.spacing(2),
  textShadow:
    "0px 6px 20px rgba(0, 0, 0, 0.6), 0px 2px 8px rgba(0, 76, 145, 0.5)",
  animation: "fadeInUp 0.8s ease-out",
  "@keyframes fadeInUp": {
    from: {
      opacity: 0,
      transform: "translateY(30px)",
    },
    to: {
      opacity: 1,
      transform: "translateY(0)",
    },
  },
  [theme.breakpoints.down("lg")]: {
    fontSize: "3.5rem", // 56px
  },
  [theme.breakpoints.down("md")]: {
    fontSize: "2.75rem", // 44px
  },
  [theme.breakpoints.down("sm")]: {
    fontSize: "2rem", // 32px - mobile
    marginBottom: theme.spacing(2),
  },
}));

// Sub-headline with strong readability
const HeroSubHeading = styled(Typography)(({ theme }) => ({
  color: "#f6d469",
  fontSize: "2.25rem", // Desktop: 36px
  fontWeight: 700,
  lineHeight: 1.3,
  textShadow:
    "0px 4px 16px rgba(0, 0, 0, 0.7), 0px 2px 4px rgba(0, 76, 145, 0.5)",
  letterSpacing: "-0.01em",
  maxWidth: "900px",
  margin: "0 auto",
  marginBottom: theme.spacing(3),
  animation: "fadeInUp 0.8s ease-out 0.2s both",
  position: "relative",
  "&::after": {
    content: '""',
    position: "absolute",
    bottom: "-12px",
    left: "50%",
    transform: "translateX(-50%)",
    width: "120px",
    height: "4px",
    background: "linear-gradient(90deg, transparent, #00a77f, transparent)",
    borderRadius: "2px",
  },
  "@keyframes fadeInUp": {
    from: {
      opacity: 0,
      transform: "translateY(30px)",
    },
    to: {
      opacity: 1,
      transform: "translateY(0)",
    },
  },
  [theme.breakpoints.down("md")]: {
    fontSize: "1.75rem", // 28px
    marginBottom: theme.spacing(3),
  },
  [theme.breakpoints.down("sm")]: {
    fontSize: "1.375rem", // 22px - mobile
    marginBottom: theme.spacing(2),
  },
}));

// Hero copy heading - WCAG 2.2 AA compliant (7:1 contrast on light backgrounds)
// Use this component when rendering hero_copy_heading translation key
const HeroCopyHeading = styled(Typography)(({ theme }) => ({
  color: "#001a33", // Very dark blue: 12.6:1 contrast on white background (WCAG AA)
  fontSize: "2.25rem", // Desktop: 36px
  fontWeight: 700,
  lineHeight: 1.3,
  letterSpacing: "-0.01em",
  marginBottom: theme.spacing(3),
  [theme.breakpoints.down("md")]: {
    fontSize: "1.875rem", // 30px
  },
  [theme.breakpoints.down("sm")]: {
    fontSize: "1.5rem", // 24px - mobile
    marginBottom: theme.spacing(2),
  },
}));

export { HeroCopyHeading }; // Exported for use with hero_copy_heading translation

export default function HeroSection() {
  const { t } = useTranslation();
  // Donations now open PayPal directly

  return (
    <>
      <HeroContainer as='section' id='hero' aria-labelledby='hero-heading'>
        <HeroContent>
          {/* Main Headline - Organization Name */}
          <HeroHeading as='h1' id='hero-heading' variant='h1' tabIndex={-1}>
            {t("hero_heading")}
          </HeroHeading>

          {/* Sub-Headline - Mission Statement */}
          <HeroSubHeading as='h2' variant='h2'>
            {t("hero_subheading")}
          </HeroSubHeading>

          {/* Description */}
          <Typography
            sx={{
              color: "#ffffff",
              fontSize: "1.35rem",
              fontWeight: 500,
              lineHeight: 1.7,
              textShadow: "0px 3px 12px rgba(0, 0, 0, 0.6)",
              maxWidth: "800px",
              margin: "0 auto",
              marginTop: 5,
              letterSpacing: "0.02em",
              animation: "fadeInUp 0.8s ease-out 0.4s both",
              "@keyframes fadeInUp": {
                from: {
                  opacity: 0,
                  transform: "translateY(30px)",
                },
                to: {
                  opacity: 1,
                  transform: "translateY(0)",
                },
              },
            }}
          >
            {t("hero_description")}
          </Typography>
        </HeroContent>
      </HeroContainer>
    </>
  );
}

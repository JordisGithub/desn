import { Box, Container, Typography } from "@mui/material";
import { styled } from "@mui/material/styles";
import { useTranslation } from "react-i18next";
import OptimizedImage from "../OptimizedImage";

// Main hero container
const HeroContainer = styled("section")(({ theme }) => ({
  backgroundColor: theme.palette.background.default,
  paddingTop: theme.spacing(6),
  paddingBottom: theme.spacing(8),
  [theme.breakpoints.down("md")]: {
    paddingTop: theme.spacing(4),
    paddingBottom: theme.spacing(6),
  },
  [theme.breakpoints.down("sm")]: {
    paddingTop: theme.spacing(3),
    paddingBottom: theme.spacing(4),
  },
}));

// Combined wrapper for text and image
const HeroContentWrapper = styled(Box)({
  position: "relative",
  overflow: "hidden",
  borderRadius: "24px",
  boxShadow: "0px 12px 40px rgba(0, 76, 145, 0.15)",
});

// Text overlay with darker sunset brownish gradient for better contrast
const HeroTextOverlay = styled(Box)(({ theme }) => ({
  position: "absolute",
  top: 0,
  left: 0,
  right: 0,
  zIndex: 2,
  background:
    "linear-gradient(180deg, rgba(139, 69, 19, 0.92) 0%, rgba(160, 82, 45, 0.88) 10%, rgba(184, 94, 50, 0.82) 20%, rgba(205, 133, 63, 0.75) 35%, rgba(222, 184, 135, 0.5) 50%, rgba(245, 222, 179, 0) 100%)",
  padding: theme.spacing(0.5, 3, 8, 3),
  [theme.breakpoints.up("md")]: {
    padding: theme.spacing(1, 6, 12, 6),
  },
  [theme.breakpoints.down("sm")]: {
    padding: theme.spacing(0.5, 2, 6, 2),
  },
}));

// Hero image is rendered by OptimizedImage (responsive variants)

// Organization name heading - single line
const HeroHeading = styled(Typography)(({ theme }) => ({
  fontSize: "2.25rem",
  fontWeight: 700,
  color: "#ffffff",
  marginBottom: theme.spacing(2),
  lineHeight: 1.2,
  textAlign: "center",
  textShadow: "0 4px 12px rgba(0, 0, 0, 0.4)",
  letterSpacing: "-0.02em",
  [theme.breakpoints.up("md")]: {
    fontSize: "3rem",
  },
  [theme.breakpoints.down("sm")]: {
    fontSize: "1.5rem",
  },
}));

// Tagline/mission text - second line
const HeroTagline = styled(Typography)(({ theme }) => ({
  fontSize: "1.375rem",
  fontWeight: 600,
  color: "#ffffff",
  textAlign: "center",
  lineHeight: 1.3,
  marginBottom: theme.spacing(1.5),
  textShadow: "0 3px 8px rgba(0, 0, 0, 0.4)",
  letterSpacing: "-0.01em",
  [theme.breakpoints.up("md")]: {
    fontSize: "1.75rem",
  },
  [theme.breakpoints.down("sm")]: {
    fontSize: "1.125rem",
  },
}));

// Additional description text - third line
const HeroDescription = styled(Typography)(({ theme }) => ({
  fontSize: "1.125rem",
  fontWeight: 500,
  color: "#ffffff",
  textAlign: "center",
  lineHeight: 1.4,
  textShadow: "0 2px 6px rgba(0, 0, 0, 0.4)",
  [theme.breakpoints.up("md")]: {
    fontSize: "1.25rem",
  },
  [theme.breakpoints.down("sm")]: {
    fontSize: "1rem",
  },
}));

// Copy block that appears under the hero image
const HeroCopyWrapper = styled(Box)(({ theme }) => ({
  display: "flex",
  justifyContent: "center",
  marginTop: theme.spacing(4),
  [theme.breakpoints.down("sm")]: {
    marginTop: theme.spacing(3),
  },
}));

const HeroCopyCard = styled(Box)(({ theme }) => ({
  maxWidth: 1100,
  background:
    "linear-gradient(180deg, rgba(255,255,255,0.98), rgba(250,250,250,0.95))",
  color: theme.palette.text.primary,
  padding: theme.spacing(4),
  borderRadius: 14,
  boxShadow: "0 10px 30px rgba(2,6,23,0.08)",
  borderLeft: `6px solid ${theme.palette.primary.main}`,
  lineHeight: 1.6,
  [theme.breakpoints.down("sm")]: {
    padding: theme.spacing(3),
    margin: theme.spacing(0, 2),
  },
}));

const HeroCopyHeading = styled(Typography)(({ theme }) => ({
  fontSize: "1rem",
  fontWeight: 700,
  color: theme.palette.primary.main,
  marginBottom: theme.spacing(1),
  textTransform: "uppercase",
  letterSpacing: "0.08em",
}));

const HeroCopyText = styled(Typography)(({ theme }) => ({
  fontSize: "1rem",
  color: theme.palette.text.secondary,
}));

export default function HeroSection() {
  const { t } = useTranslation();

  return (
    <HeroContainer aria-labelledby='hero-heading' role='banner'>
      <Container maxWidth='xl' sx={{ px: { xs: 2, sm: 3, md: 6 } }}>
        <HeroContentWrapper>
          {/* Text overlay with sunset gradient */}
          <HeroTextOverlay>
            <Container maxWidth='lg'>
              {/* Main heading - Line 1 */}
              <HeroHeading as='h1' id='hero-heading' variant='h1' tabIndex={-1}>
                {t("hero_title")}
              </HeroHeading>

              {/* Mission statement - Line 2 */}
              <HeroTagline as='p' variant='h2'>
                {t("hero_subtitle")}
              </HeroTagline>

              {/* Additional context - Line 3 */}
              <HeroDescription as='p'>{t("hero_tagline")}</HeroDescription>
            </Container>
          </HeroTextOverlay>

          {/* Hero image */}
          <OptimizedImage
            src={"home/nepal-hero-image.png"}
            alt={t("hero_alt")}
            loading='eager'
            style={{
              width: "100%",
              height: "auto",
              minHeight: 600,
              maxHeight: 750,
              objectFit: "cover",
              display: "block",
            }}
          />
        </HeroContentWrapper>

        {/* Styled copy block under the hero image */}
        <HeroCopyWrapper aria-label='About DESN'>
          <HeroCopyCard role='region' aria-labelledby='desn-about-heading'>
            <HeroCopyHeading id='desn-about-heading'>
              {t("hero_copy_heading")}
            </HeroCopyHeading>

            <HeroCopyText paragraph>
              {t("hero_copy_description_1")}
            </HeroCopyText>

            <HeroCopyText sx={{ fontWeight: 700, mt: 1 }}>
              {t("hero_copy_description_2")}
            </HeroCopyText>
          </HeroCopyCard>
        </HeroCopyWrapper>
      </Container>
    </HeroContainer>
  );
}

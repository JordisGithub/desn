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

// Wrapper for text section above image
const HeroTextSection = styled(Box)(({ theme }) => ({
  background:
    "linear-gradient(180deg, #F5DEB3 0%, #F4E4C1 20%, #F3EBCE 40%, #F2F1DB 60%, rgba(245, 240, 220, 0.95) 80%, rgba(245, 240, 220, 0.7) 90%, rgba(245, 240, 220, 0) 100%)",
  padding: theme.spacing(4, 3, 5, 3),
  borderRadius: "24px 24px 0 0",
  marginBottom: "-1px",
  [theme.breakpoints.up("md")]: {
    padding: theme.spacing(6, 6, 6, 6),
  },
  [theme.breakpoints.down("sm")]: {
    padding: theme.spacing(3, 2, 4, 2),
  },
}));

// Wrapper for image with overlay
const HeroImageWrapper = styled(Box)({
  position: "relative",
  overflow: "hidden",
  borderRadius: "0 0 24px 24px",
  boxShadow: "0px 12px 40px rgba(0, 76, 145, 0.15)",
  marginTop: "-1px",
  "&::before": {
    content: '""',
    position: "absolute",
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    background:
      "linear-gradient(180deg, rgba(245, 240, 220, 0.3) 0%, rgba(245, 240, 220, 0.15) 30%, rgba(245, 240, 220, 0) 60%)",
    zIndex: 1,
    pointerEvents: "none",
  },
});

// Hero image is rendered by OptimizedImage (responsive variants)

// Organization name heading - single line
const HeroHeading = styled(Typography)(({ theme }) => ({
  fontSize: "2.25rem",
  fontWeight: 700,
  color: "#1a1a1a",
  marginBottom: theme.spacing(2),
  lineHeight: 1.2,
  textAlign: "center",
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
  color: "#2a2a2a",
  textAlign: "center",
  lineHeight: 1.3,
  marginBottom: theme.spacing(1.5),
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
  color: "#333333",
  textAlign: "center",
  lineHeight: 1.4,
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
    <HeroContainer aria-labelledby='hero-heading'>
      <Container maxWidth='xl' sx={{ px: { xs: 2, sm: 3, md: 6 } }}>
        {/* Text section with gradient background */}
        <HeroTextSection>
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
        </HeroTextSection>

        {/* Hero image */}
        <HeroImageWrapper>
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
        </HeroImageWrapper>

        {/* Styled copy block under the hero image */}
        <HeroCopyWrapper>
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

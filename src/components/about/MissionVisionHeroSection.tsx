import { Container, Typography, Box } from "@mui/material";
import { styled } from "@mui/material/styles";
import { useTranslation } from "react-i18next";
import useLazyBackground from "../../hooks/useLazyBackground";
import type { MutableRefObject } from "react";

const heroImageUrl = new URL(
  "../../assets/AboutUs/AboutUsHero.png",
  import.meta.url
).href;

// Full-width hero with dramatic image
const HeroContainer = styled("section")(({ theme }) => ({
  position: "relative",
  width: "100%",
  minHeight: "50vh",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  overflow: "hidden",
  backgroundImage: `url(${heroImageUrl})`,
  backgroundSize: "cover",
  backgroundPosition: "center center",
  backgroundRepeat: "no-repeat",
  [theme.breakpoints.down("md")]: {
    minHeight: "45vh",
  },
  [theme.breakpoints.down("sm")]: {
    minHeight: "40vh",
  },
  // Dark overlay for text contrast
  "&::before": {
    content: '""',
    position: "absolute",
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    background:
      "linear-gradient(135deg, rgba(0, 76, 145, 0.75) 10%, rgba(0, 61, 115, 0.85) 100%, rgba(0, 0, 0, 0.7) 100%)",
    zIndex: 1,
  },
}));

const HeroContent = styled(Box)(({ theme }) => ({
  position: "relative",
  zIndex: 2,
  textAlign: "center",
  padding: theme.spacing(6, 4),
  maxWidth: "1000px",
  margin: "0 auto",
  [theme.breakpoints.down("md")]: {
    padding: theme.spacing(5, 3),
  },
  [theme.breakpoints.down("sm")]: {
    padding: theme.spacing(4, 2),
  },
}));

const MainHeading = styled(Typography)(({ theme }) => ({
  color: "#ffffff",
  fontSize: "4.25rem",
  fontWeight: 800,
  lineHeight: 1.1,
  letterSpacing: "0.01em",
  marginBottom: theme.spacing(2),
  textShadow: "0px 6px 16px rgba(0, 0, 0, 0.6)",
  [theme.breakpoints.down("lg")]: {
    fontSize: "3.5rem",
  },
  [theme.breakpoints.down("md")]: {
    fontSize: "2.75rem",
  },
  [theme.breakpoints.down("sm")]: {
    fontSize: "2.25rem",
  },
}));

const HeroSubheading = styled(Typography)(({ theme }) => ({
  color: "#f6d469",
  fontSize: "1.5rem",
  fontWeight: 500,
  lineHeight: 1.4,
  textShadow: "0px 4px 12px rgba(0, 0, 0, 0.5)",
  maxWidth: "700px",
  margin: "0 auto",
  [theme.breakpoints.down("md")]: {
    fontSize: "1.25rem",
  },
  [theme.breakpoints.down("sm")]: {
    fontSize: "1.125rem",
  },
}));

export default function MissionVisionHeroSection() {
  const { t } = useTranslation();
  const bgRef = useLazyBackground() as MutableRefObject<HTMLElement | null>;

  return (
    <>
      {/* Hero Section - Image with Heading Only */}
      <HeroContainer
        aria-labelledby='mission-vision-hero-heading'
        aria-describedby='hero-subheading'
        data-bg={heroImageUrl}
        ref={bgRef}
      >
        <Container maxWidth='xl'>
          <HeroContent>
            <MainHeading as='h1' id='mission-vision-hero-heading'>
              {t("about_hero_org_name")}
            </MainHeading>
            <HeroSubheading id='hero-subheading'>
              {t("about_hero_tagline")}
            </HeroSubheading>
          </HeroContent>
        </Container>
      </HeroContainer>
    </>
  );
}

import { Container, Typography, Box } from "@mui/material";
import { styled } from "@mui/material/styles";
import { useTranslation } from "react-i18next";
import useLazyBackground from "../../hooks/useLazyBackground";
import type { MutableRefObject } from "react";

const heroImageUrl = new URL(
  "../../assets/home/home-aboutus.jpg",
  import.meta.url
).href;

// Full-width hero with dramatic image
const HeroContainer = styled("section")(({ theme }) => ({
  position: "relative",
  width: "100%",
  minHeight: "75vh",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  overflow: "hidden",
  backgroundSize: "cover",
  backgroundPosition: "center center",
  backgroundRepeat: "no-repeat",
  [theme.breakpoints.down("md")]: {
    minHeight: "65vh",
  },
  [theme.breakpoints.down("sm")]: {
    minHeight: "55vh",
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
      "linear-gradient(135deg, rgba(0, 76, 145, 0.85) 0%, rgba(0, 61, 115, 0.75) 100%)",
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
  marginBottom: theme.spacing(5),
  textShadow: "0px 6px 16px rgba(0, 0, 0, 0.6)",
  [theme.breakpoints.down("lg")]: {
    fontSize: "3.5rem",
  },
  [theme.breakpoints.down("md")]: {
    fontSize: "2.75rem",
  },
  [theme.breakpoints.down("sm")]: {
    fontSize: "2.25rem",
    marginBottom: theme.spacing(4),
  },
}));

const MissionVisionWrapper = styled(Box)(({ theme }) => ({
  display: "flex",
  flexDirection: "column",
  gap: theme.spacing(3),
  maxWidth: "900px",
  margin: "0 auto",
}));

const StatementBox = styled(Box)(({ theme }) => ({
  backgroundColor: "rgba(255, 255, 255, 0.15)",
  backdropFilter: "blur(10px)",
  border: "1px solid rgba(255, 255, 255, 0.3)",
  borderRadius: "14px",
  padding: theme.spacing(4, 5),
  textAlign: "left",
  boxShadow: "0 8px 16px rgba(0, 0, 0, 0.2)",
  [theme.breakpoints.down("sm")]: {
    padding: theme.spacing(3, 3.5),
  },
}));

const StatementLabel = styled(Typography)(({ theme }) => ({
  color: "#f6d469",
  fontSize: "0.875rem",
  fontWeight: 700,
  textTransform: "uppercase",
  letterSpacing: "0.1em",
  marginBottom: theme.spacing(1),
}));

const StatementText = styled(Typography)(({ theme }) => ({
  color: "#ffffff",
  fontSize: "1.35rem",
  fontWeight: 400,
  lineHeight: 1.7,
  [theme.breakpoints.down("md")]: {
    fontSize: "1.2rem",
  },
  [theme.breakpoints.down("sm")]: {
    fontSize: "1.05rem",
  },
}));

export default function MissionVisionHeroSection() {
  const { t } = useTranslation();
  const bgRef = useLazyBackground() as MutableRefObject<HTMLElement | null>;

  return (
    <HeroContainer
      aria-labelledby='mission-vision-hero-heading'
      data-bg={heroImageUrl}
      ref={bgRef}
    >
      <Container maxWidth='xl'>
        <HeroContent>
          <MainHeading as='h1' id='mission-vision-hero-heading'>
            {t("about_hero_org_name")}
          </MainHeading>

          <MissionVisionWrapper>
            {/* Vision */}
            <StatementBox>
              <StatementLabel>{t("about_vision_title")}</StatementLabel>
              <StatementText>{t("about_vision_text")}</StatementText>
            </StatementBox>

            {/* Mission */}
            <StatementBox>
              <StatementLabel>{t("about_mission_title")}</StatementLabel>
              <StatementText>{t("about_mission_text")}</StatementText>
            </StatementBox>
          </MissionVisionWrapper>
        </HeroContent>
      </Container>
    </HeroContainer>
  );
}

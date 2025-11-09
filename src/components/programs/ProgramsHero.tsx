import { Box, Button, Container, Typography } from "@mui/material";
import { styled } from "@mui/material/styles";
import { useTranslation } from "react-i18next";
import ArrowForwardIcon from "@mui/icons-material/ArrowForward";

const HeroSection = styled("section")({
  position: "relative",
  minHeight: "686px",
  background: "linear-gradient(180deg, #004c91 0%, #004c91 50%, #00a77f 100%)",
  overflow: "hidden",
  display: "flex",
  alignItems: "center",
});

const GradientOverlay1 = styled(Box)({
  position: "absolute",
  width: "384px",
  height: "384px",
  borderRadius: "50%",
  background: "rgba(255, 255, 255, 0.05)",
  filter: "blur(96px)",
  top: "80px",
  left: "593px",
});

const GradientOverlay2 = styled(Box)({
  position: "absolute",
  width: "600px",
  height: "600px",
  borderRadius: "50%",
  background: "rgba(246, 212, 105, 0.1)",
  filter: "blur(96px)",
  top: "6px",
  left: "160px",
});

const Badge = styled(Box)({
  display: "inline-block",
  backgroundColor: "rgba(255, 255, 255, 0.2)",
  border: "1px solid rgba(0, 0, 0, 0)",
  borderRadius: "8px",
  padding: "13px 25px",
  marginBottom: "32px",
});

const BadgeText = styled(Typography)({
  fontSize: "18px",
  fontWeight: 500,
  color: "white",
  lineHeight: "28px",
  fontFamily: "Roboto, sans-serif",
});

const Title = styled(Typography)({
  fontSize: "60px",
  fontWeight: 400,
  lineHeight: "75px",
  color: "white",
  marginBottom: "32px",
  fontFamily: "Poppins, sans-serif",
});

const Description = styled(Typography)({
  fontSize: "24px",
  fontWeight: 400,
  lineHeight: "39px",
  color: "rgba(255, 255, 255, 0.95)",
  marginBottom: "48px",
  maxWidth: "780px",
  fontFamily: "Roboto, sans-serif",
});

const CTAContainer = styled(Box)({
  display: "flex",
  gap: "24px",
  flexWrap: "wrap",
});

const PrimaryButton = styled(Button)({
  backgroundColor: "#f6d469",
  color: "#2b2b2b",
  fontSize: "18px",
  fontWeight: 600,
  padding: "20px 40px",
  borderRadius: "100px",
  textTransform: "none",
  boxShadow:
    "0px 20px 25px -5px rgba(0,0,0,0.1), 0px 8px 10px -6px rgba(0,0,0,0.1)",
  fontFamily: "Roboto, sans-serif",
  "&:hover": {
    backgroundColor: "#f5c943",
  },
  "&:focus": {
    outline: "3px solid white",
    outlineOffset: "2px",
  },
});

const SecondaryButton = styled(Button)({
  backgroundColor: "#f6d469",
  color: "#2b2b2b",
  fontSize: "18px",
  fontWeight: 600,
  padding: "20px 42px",
  borderRadius: "100px",
  textTransform: "none",
  border: "2px solid white",
  fontFamily: "Roboto, sans-serif",
  "&:hover": {
    backgroundColor: "#f5c943",
  },
  "&:focus": {
    outline: "3px solid white",
    outlineOffset: "2px",
  },
});

export default function ProgramsHero() {
  const { t } = useTranslation();

  const scrollToPrograms = () => {
    const element = document.getElementById("core-programs");
    element?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <HeroSection aria-labelledby='programs-hero-title'>
      <GradientOverlay1 aria-hidden='true' />
      <GradientOverlay2 aria-hidden='true' />
      <Container maxWidth='lg' sx={{ position: "relative", zIndex: 1 }}>
        <Box maxWidth='800px'>
          <Badge>
            <BadgeText>{t("programs:hero.badge")}</BadgeText>
          </Badge>
          <Title id='programs-hero-title' variant='h1'>
            {t("programs:hero.title")}
          </Title>
          <Description>{t("programs:hero.description")}</Description>
          <CTAContainer>
            <PrimaryButton
              onClick={scrollToPrograms}
              endIcon={<ArrowForwardIcon />}
              aria-label={t("programs:hero.explore_button")}
            >
              {t("programs:hero.explore_button")}
            </PrimaryButton>
            <SecondaryButton
              href='/get-involved'
              aria-label={t("programs:hero.get_involved_button")}
            >
              {t("programs:hero.get_involved_button")}
            </SecondaryButton>
          </CTAContainer>
        </Box>
      </Container>
    </HeroSection>
  );
}

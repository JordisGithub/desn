import React from "react";
import { styled } from "@mui/material/styles";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import { useTranslation } from "react-i18next";
import VolunteerActivismIcon from "@mui/icons-material/VolunteerActivism";
import getInvolvedHero from "../../assets/GetInvolved/get-involved-hero.png";

const HeroContainer = styled(Box)({
  position: "relative",
  height: "600px",
  overflow: "hidden",
  "&::before": {
    content: '""',
    position: "absolute",
    inset: 0,
    backgroundImage: `url(${getInvolvedHero})`,
    backgroundSize: "cover",
    backgroundPosition: "center 70%",
    animation: "kenBurnsZoom 20s ease-in-out infinite alternate",
  },
  "@keyframes kenBurnsZoom": {
    "0%": {
      transform: "scale(1)",
    },
    "100%": {
      transform: "scale(1.1)",
    },
  },
});

const Overlay = styled(Box)({
  position: "absolute",
  inset: 0,
  background:
    "linear-gradient(135deg, rgba(0, 76, 145, 0.92) 0%, rgba(0, 76, 145, 0.82) 50%, rgba(0, 76, 145, 0.62) 100%)",
  zIndex: 1,
});

const Content = styled(Box)(({ theme }) => ({
  position: "relative",
  zIndex: 2,
  height: "100%",
  display: "flex",
  flexDirection: "column",
  justifyContent: "center",
  padding: theme.spacing(0, 12),
  maxWidth: "1200px",
}));

const IconCircle = styled(Box)({
  width: "80px",
  height: "80px",
  borderRadius: "50%",
  backgroundColor: "#f6d469",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  marginBottom: "24px",
});

const Title = styled("h1")({
  fontSize: "48px",
  fontWeight: 400,
  color: "white",
  fontFamily: "'Open Sans', sans-serif",
  margin: 0,
  marginBottom: "16px",
  textShadow: "0px 8px 16px rgba(0, 0, 0, 0.75)",
});

const Subtitle = styled(Typography)({
  fontSize: "36px",
  fontWeight: 400,
  color: "rgba(255, 255, 255, 0.9)",
  marginBottom: "16px",
  maxWidth: "1200px",
  lineHeight: 1.4,
  textShadow: "0px 8px 16px rgba(0, 0, 0, 0.75)",
});

const Description = styled(Typography)(({ theme }) => ({
  fontSize: "20px",
  fontWeight: 400,
  color: "#ffffff",
  maxWidth: "1000px",
  lineHeight: 1.5,
  textShadow: "0px 4px 12px rgba(0, 0, 0, 0.6)",
}));

const HeroSection: React.FC = () => {
  const { t } = useTranslation();

  return (
    <HeroContainer
      role='banner'
      aria-label='Get Involved Hero Section'
      aria-describedby='hero-description'
    >
      <Overlay />
      <Content>
        <IconCircle>
          <VolunteerActivismIcon sx={{ fontSize: 48, color: "#004c91" }} />
        </IconCircle>
        <Title>{t("get_involved.hero.title")}</Title>
        <Subtitle>{t("get_involved.hero.subtitle")}</Subtitle>
        <Description id='hero-description'>
          {t("get_involved.hero.description")}
        </Description>
      </Content>
    </HeroContainer>
  );
};

export default HeroSection;

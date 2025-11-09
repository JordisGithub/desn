import React from "react";
import { styled } from "@mui/material/styles";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import { useTranslation } from "react-i18next";
import VolunteerActivismIcon from "@mui/icons-material/VolunteerActivism";

const HeroContainer = styled(Box)({
  position: "relative",
  height: "600px",
  backgroundImage:
    "url(https://www.figma.com/api/mcp/asset/d3e7c7d9-d0f0-43a6-8e0f-0157f520c5d2)",
  backgroundSize: "cover",
  backgroundPosition: "center",
  overflow: "hidden",
});

const Overlay = styled(Box)({
  position: "absolute",
  inset: 0,
  backgroundColor: "rgba(0, 76, 145, 0.95)",
});

const Content = styled(Box)(({ theme }) => ({
  position: "relative",
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

const Title = styled(Typography)({
  fontSize: "48px",
  fontWeight: 400,
  color: "white",
  marginBottom: "16px",
  fontFamily: "'Open Sans', sans-serif",
});

const Subtitle = styled(Typography)({
  fontSize: "36px",
  fontWeight: 400,
  color: "rgba(255, 255, 255, 0.9)",
  marginBottom: "16px",
  maxWidth: "1200px",
  lineHeight: 1.4,
});

const Description = styled(Typography)({
  fontSize: "20px",
  fontWeight: 400,
  color: "rgba(255, 255, 255, 0.8)",
  maxWidth: "1000px",
  lineHeight: 1.5,
});

const HeroSection: React.FC = () => {
  const { t } = useTranslation();

  return (
    <HeroContainer>
      <Overlay />
      <Content>
        <IconCircle>
          <VolunteerActivismIcon sx={{ fontSize: 48, color: "#004c91" }} />
        </IconCircle>
        <Title>{t("get_involved.hero.title")}</Title>
        <Subtitle>{t("get_involved.hero.subtitle")}</Subtitle>
        <Description>{t("get_involved.hero.description")}</Description>
      </Content>
    </HeroContainer>
  );
};

export default HeroSection;

import React from "react";
import { styled } from "@mui/material/styles";
import { Container, Box, Typography } from "@mui/material";
import { useTranslation } from "react-i18next";
import useLazyBackground from "../../hooks/useLazyBackground";
import type { MutableRefObject } from "react";
import getInvolvedHero from "../../assets/GetInvolved/get-involved-hero.png";

const HeroContainer = styled("section")({
  position: "relative",
  height: "500px",
  overflow: "hidden",
});

const ContentWrapper = styled(Box)({
  position: "relative",
  zIndex: 1,
  height: "100%",
  display: "flex",
  flexDirection: "column",
  justifyContent: "center",
  alignItems: "center",
});

const Title = styled(Typography)({
  fontSize: "68px",
  fontWeight: 800,
  color: "rgb(255, 255, 255)",
  fontFamily: "'Poppins', 'Roboto', sans-serif",
  letterSpacing: "0.68px",
  lineHeight: "74.8px",
  textAlign: "center",
  textShadow: "rgba(0, 0, 0, 0.85) 0px 10px 20px",
  marginTop: 0,
  marginBottom: "16px",
  WebkitFontSmoothing: "antialiased",
  textRendering: "optimizeLegibility",
});

const Tagline = styled(Typography)({
  fontSize: "16px",
  fontWeight: 600,
  color: "rgb(246, 212, 105)",
  fontFamily: "'Poppins', 'Open Sans', 'Roboto', 'Arial', sans-serif",
  letterSpacing: "0.16px",
  lineHeight: "22.4px",
  textAlign: "center",
  textShadow: "rgba(0, 0, 0, 0.75) 0px 8px 16px",
  marginTop: 0,
  marginBottom: 0,
  marginLeft: "118px",
  marginRight: "118px",
  maxWidth: "700px",
  WebkitFontSmoothing: "antialiased",
  textRendering: "optimizeLegibility",
});

const HeroSection: React.FC = () => {
  const { t } = useTranslation();
  const bgRef = useLazyBackground() as MutableRefObject<HTMLElement | null>;

  return (
    <HeroContainer
      aria-labelledby='get-involved-hero-heading'
      data-bg={getInvolvedHero}
      ref={bgRef}
    >
      <Container
        maxWidth='xl'
        sx={{ px: { xs: 2, sm: 3, md: 6 }, height: "100%" }}
      >
        <ContentWrapper>
          <Title as='h1' id='get-involved-hero-heading'>
            {t("get_involved.hero.title")}
          </Title>
          <Tagline>{t("get_involved.hero.subtitle")}</Tagline>
        </ContentWrapper>
      </Container>
    </HeroContainer>
  );
};

export default HeroSection;

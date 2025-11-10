import { Container, Typography, Box } from "@mui/material";
import { styled } from "@mui/material/styles";
import { useTranslation } from "react-i18next";
import FormatQuoteIcon from "@mui/icons-material/FormatQuote";
import desnLogo from "../../assets/DESN_logo_500x500.jpg";
import useLazyBackground from "../../hooks/useLazyBackground";
import type { MutableRefObject } from "react";
import heroImage from "../../assets/home/about-hero.jpg";

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
  paddingTop: "64px",
  paddingBottom: "64px",
});

const LogoImage = styled("img")(({ theme }) => ({
  height: "120px",
  width: "auto",
  marginBottom: theme.spacing(3),
  filter: "brightness(0) invert(1)",
  [theme.breakpoints.down("md")]: {
    height: "80px",
  },
}));

const QuoteBox = styled(Box)(({ theme }) => ({
  backgroundColor: "rgba(255, 255, 255, 0.1)",
  border: "2px solid rgba(255, 255, 255, 0.3)",
  borderRadius: "12px",
  padding: theme.spacing(3, 4),
  marginTop: theme.spacing(4),
  maxWidth: "800px",
  position: "relative",
}));

const QuoteText = styled(Typography)(({ theme }) => ({
  fontSize: "1.5rem",
  fontStyle: "italic",
  color: "white",
  lineHeight: 1.5,
  [theme.breakpoints.down("md")]: {
    fontSize: "1.25rem",
  },
}));

const OrganizationName = styled(Typography)(({ theme }) => ({
  fontSize: "3rem",
  fontWeight: 400,
  color: "white",
  marginBottom: theme.spacing(3),
  lineHeight: 1.2,
  [theme.breakpoints.up("md")]: {
    fontSize: "4rem",
  },
}));

const Tagline = styled(Typography)(({ theme }) => ({
  fontSize: "1.5rem",
  fontWeight: 400,
  color: "rgba(255, 255, 255, 0.9)",
  marginBottom: theme.spacing(4),
  [theme.breakpoints.up("md")]: {
    fontSize: "2.25rem",
  },
}));

const EstablishedBadge = styled(Box)(({ theme }) => ({
  display: "inline-block",
  backgroundColor: "white",
  color: "#004c91",
  fontSize: "1.25rem",
  fontWeight: 400,
  padding: theme.spacing(1, 2),
  borderRadius: "10px",
  border: "1px solid rgba(255, 255, 255, 0.2)",
}));

export default function AboutHero() {
  const { t } = useTranslation();
  const bgRef = useLazyBackground() as MutableRefObject<HTMLElement | null>;

  return (
  <HeroContainer aria-labelledby='about-hero-heading' data-bg={heroImage} ref={bgRef}>
      <Container maxWidth='xl' sx={{ px: { xs: 2, sm: 3, md: 6 } }}>
        <ContentWrapper>
          <LogoImage src={desnLogo} alt='DESN Logo' />
          <OrganizationName as='h1' id='about-hero-heading'>
            {t("about_hero_org_name")}
          </OrganizationName>
          <Tagline>{t("about_hero_tagline")}</Tagline>
          <EstablishedBadge>
            <Typography
              component='span'
              sx={{ fontSize: "1rem", fontWeight: 400, mr: 1 }}
            >
              {t("about_hero_established_label")}
            </Typography>
            <Typography
              component='span'
              sx={{ fontSize: "1.25rem", fontWeight: 400 }}
            >
              {t("about_hero_established_year")}
            </Typography>
          </EstablishedBadge>
          <QuoteBox>
            <FormatQuoteIcon
              sx={{
                position: "absolute",
                top: 16,
                left: 16,
                fontSize: 40,
                color: "rgba(255, 255, 255, 0.3)",
              }}
            />
            <QuoteText>{t("about_hero_quote")}</QuoteText>
          </QuoteBox>
        </ContentWrapper>
      </Container>
    </HeroContainer>
  );
}

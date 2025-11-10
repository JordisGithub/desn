import { Container, Typography } from "@mui/material";
import { styled } from "@mui/material/styles";
import { useTranslation } from "react-i18next";

const HeroContainer = styled("section")(({ theme }) => ({
  background: "linear-gradient(180deg, #004c91 0%, #004c91 50%, #00a77f 100%)",
  paddingTop: theme.spacing(12),
  paddingBottom: theme.spacing(6),
  position: "relative",
  overflow: "hidden",
  [theme.breakpoints.down("md")]: {
    paddingTop: theme.spacing(8),
    paddingBottom: theme.spacing(4),
  },
}));

const HeroTitle = styled(Typography)(({ theme }) => ({
  fontSize: "3rem",
  fontWeight: 400,
  color: "white",
  marginBottom: theme.spacing(3),
  textAlign: "center",
  fontFamily: "'Open Sans', sans-serif",
  [theme.breakpoints.down("md")]: {
    fontSize: "2.5rem",
  },
  [theme.breakpoints.down("sm")]: {
    fontSize: "2rem",
  },
}));

const HeroSubtitle = styled(Typography)(({ theme }) => ({
  fontSize: "1.25rem",
  fontWeight: 400,
  color: "rgba(255, 255, 255, 0.95)",
  textAlign: "center",
  maxWidth: "768px",
  margin: "0 auto",
  lineHeight: 1.75,
  [theme.breakpoints.down("md")]: {
    fontSize: "1.125rem",
  },
  [theme.breakpoints.down("sm")]: {
    fontSize: "1rem",
  },
}));

export default function EventsHero() {
  const { t } = useTranslation();

  return (
    <HeroContainer aria-labelledby='events-hero-heading'>
      <Container maxWidth='xl' sx={{ px: { xs: 2, sm: 3, md: 6 } }}>
        <HeroTitle variant='h1' id='events-hero-heading'>
          {t("events_hero_title")}
        </HeroTitle>
        <HeroSubtitle>{t("events_hero_subtitle")}</HeroSubtitle>
      </Container>
    </HeroContainer>
  );
}

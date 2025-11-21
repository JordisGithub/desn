import { Container, Typography, Box } from "@mui/material";
import { styled } from "@mui/material/styles";
import { useTranslation } from "react-i18next";

const HeroSection = styled("section")(({ theme }) => ({
  background: "linear-gradient(180deg, #004c91 0%, #004c91 50%, #00a77f 100%)",
  position: "relative",
  overflow: "hidden",
  paddingTop: theme.spacing(16),
  paddingBottom: theme.spacing(10),
  [theme.breakpoints.down("sm")]: {
    paddingTop: theme.spacing(10),
    paddingBottom: theme.spacing(6),
  },
}));

const Badge = styled(Box)(({ theme }) => ({
  backgroundColor: "rgba(255, 255, 255, 0.2)",
  border: "1px solid rgba(0, 0, 0, 0)",
  borderRadius: theme.spacing(1),
  padding: theme.spacing(1.5, 3),
  display: "inline-block",
  marginBottom: theme.spacing(3),
}));

const HeroTitle = styled(Typography)(({ theme }) => ({
  fontSize: "3.75rem",
  fontWeight: 400,
  color: "white",
  marginBottom: theme.spacing(3),
  fontFamily: '"Poppins", "Roboto", sans-serif',
  [theme.breakpoints.down("md")]: {
    fontSize: "3rem",
  },
  [theme.breakpoints.down("sm")]: {
    fontSize: "2.5rem",
  },
}));

const HeroDescription = styled(Typography)(({ theme }) => ({
  fontSize: "1.5rem",
  color: "rgba(255, 255, 255, 0.95)",
  marginBottom: theme.spacing(5),
  lineHeight: 1.625,
  [theme.breakpoints.down("sm")]: {
    fontSize: "1.25rem",
  },
}));

export default function ContactHero() {
  const { t } = useTranslation();

  return (
    <HeroSection aria-labelledby='contact-hero-heading' role='banner'>
      <Container maxWidth='lg' sx={{ position: "relative", zIndex: 1 }}>
        <Box sx={{ maxWidth: "733px" }}>
          <Badge>
            <Typography
              variant='body1'
              sx={{
                color: "white",
                fontWeight: 500,
                fontSize: "1.125rem",
              }}
            >
              {t("contact.hero.badge")}
            </Typography>
          </Badge>

          <HeroTitle id='contact-hero-heading' variant='h1'>
            {t("contact.hero.title")}
          </HeroTitle>

          <HeroDescription>{t("contact.hero.description")}</HeroDescription>
        </Box>
      </Container>
    </HeroSection>
  );
}

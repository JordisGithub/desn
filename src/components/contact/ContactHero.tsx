import { Container, Typography, Button, Stack, Box } from "@mui/material";
import { styled } from "@mui/material/styles";
import { useTranslation } from "react-i18next";
import SendIcon from "@mui/icons-material/Send";

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

const HeroButton = styled(Button)(({ theme }) => ({
  backgroundColor: "#f6d469",
  color: "#2b2b2b",
  fontWeight: 600,
  fontSize: "1.125rem",
  padding: theme.spacing(2, 6),
  borderRadius: "100px",
  textTransform: "none",
  boxShadow:
    "0px 20px 25px -5px rgba(0,0,0,0.1), 0px 8px 10px -6px rgba(0,0,0,0.1)",
  "&:hover": {
    backgroundColor: "#f5c943",
    transform: "translateY(-2px)",
    boxShadow: "0px 25px 50px -12px rgba(0,0,0,0.25)",
  },
  "&:focus": {
    outline: "3px solid white",
    outlineOffset: "2px",
  },
  [theme.breakpoints.down("sm")]: {
    fontSize: "1rem",
    padding: theme.spacing(1.5, 4),
    width: "100%",
  },
}));

const OutlineButton = styled(HeroButton)({
  backgroundColor: "#f6d469",
  border: "2px solid white",
  "&:hover": {
    backgroundColor: "#f5c943",
  },
});

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

          <Stack direction={{ xs: "column", sm: "row" }} spacing={3}>
            <HeroButton
              href='#contact-section'
              startIcon={<SendIcon />}
              aria-label={`${t(
                "contact.hero.send_message"
              )} - Skip to contact form`}
            >
              {t("contact.hero.send_message")}
            </HeroButton>
            <OutlineButton
              href='#location-details'
              aria-label={`${t(
                "contact.hero.view_location"
              )} - Skip to location information`}
            >
              {t("contact.hero.view_location")}
            </OutlineButton>
          </Stack>
        </Box>
      </Container>
    </HeroSection>
  );
}

import { Box, Container, Typography } from "@mui/material";
import { styled } from "@mui/material/styles";
import { useTranslation } from "react-i18next";

const HeroSection = styled("div")<{ component?: React.ElementType }>(
  ({ theme }) => ({
    position: "relative",
    minHeight: "400px",
    background:
      "linear-gradient(180deg, #004c91 0%, #004c91 50%, #00a77f 100%)",
    overflow: "hidden",
    display: "flex",
    alignItems: "center",
    [theme.breakpoints.up("md")]: {
      minHeight: "686px",
    },
  })
);

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

const BadgeText = styled(Typography)(({ theme }) => ({
  fontSize: "14px",
  fontWeight: 500,
  color: "white",
  lineHeight: "24px",
  fontFamily: "Roboto, sans-serif",
  [theme.breakpoints.up("sm")]: {
    fontSize: "16px",
    lineHeight: "26px",
  },
  [theme.breakpoints.up("md")]: {
    fontSize: "18px",
    lineHeight: "28px",
  },
}));

const Title = styled(Typography)<{ component?: React.ElementType }>(
  ({ theme }) => ({
    fontSize: "32px",
    fontWeight: 700,
    lineHeight: "40px",
    color: "white",
    marginBottom: "16px",
    fontFamily: "Poppins, sans-serif",
    [theme.breakpoints.up("sm")]: {
      fontSize: "40px",
      lineHeight: "50px",
    },
    [theme.breakpoints.up("md")]: {
      fontSize: "60px",
      lineHeight: "75px",
      marginBottom: "24px",
    },
  })
);

const Description = styled(Typography)<{ component?: React.ElementType }>(
  ({ theme }) => ({
    fontSize: "16px",
    fontWeight: 400,
    lineHeight: "26px",
    color: "rgba(255, 255, 255, 0.95)",
    marginBottom: "32px",
    maxWidth: "780px",
    fontFamily: "Roboto, sans-serif",
    [theme.breakpoints.up("sm")]: {
      fontSize: "18px",
      lineHeight: "30px",
    },
    [theme.breakpoints.up("md")]: {
      fontSize: "22px",
      lineHeight: "36px",
      marginBottom: "48px",
    },
  })
);

export default function ProgramsHero() {
  const { t } = useTranslation();

  return (
    <HeroSection component='header' aria-labelledby='programs-hero-title'>
      <GradientOverlay1 aria-hidden='true' />
      <GradientOverlay2 aria-hidden='true' />
      <Container maxWidth='lg' sx={{ position: "relative", zIndex: 1 }}>
        <Box maxWidth='800px'>
          <Badge
            role='note'
            aria-label={`Category: ${t("programs.hero.badge")}`}
          >
            <BadgeText>{t("programs.hero.badge")}</BadgeText>
          </Badge>
          <Title id='programs-hero-title' variant='h1' component='h1'>
            {t("programs.hero.title")}
          </Title>
          <Description component='p'>
            {t("programs.hero.description")}
          </Description>
        </Box>
      </Container>
    </HeroSection>
  );
}

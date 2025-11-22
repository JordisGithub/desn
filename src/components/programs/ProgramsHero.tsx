import { Box, Container, Typography } from "@mui/material";
import { styled } from "@mui/material/styles";
import { useTranslation } from "react-i18next";

const HeroSection = styled("div")<{ component?: React.ElementType }>(
  ({ theme }) => ({
    position: "relative",
    minHeight: "500px",
    background:
      "linear-gradient(180deg, #004c91 0%, #004c91 50%, #00a77f 100%)",
    overflow: "hidden",
    display: "flex",
    alignItems: "center",
    padding: theme.spacing(3, 0),
    [theme.breakpoints.up("sm")]: {
      minHeight: "550px",
      padding: theme.spacing(4, 0),
    },
    [theme.breakpoints.up("md")]: {
      minHeight: "686px",
      padding: theme.spacing(6, 0),
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

const Badge = styled(Box)(({ theme }) => ({
  display: "inline-block",
  backgroundColor: "rgba(255, 255, 255, 0.2)",
  border: "1px solid rgba(0, 0, 0, 0)",
  borderRadius: "8px",
  padding: "10px 20px",
  marginBottom: "20px",
  [theme.breakpoints.up("sm")]: {
    padding: "12px 24px",
    marginBottom: "28px",
  },
  [theme.breakpoints.up("md")]: {
    padding: "13px 25px",
    marginBottom: "32px",
  },
}));

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
    fontSize: "28px",
    fontWeight: 700,
    lineHeight: "36px",
    color: "white",
    marginBottom: "12px",
    fontFamily: "Poppins, sans-serif",
    [theme.breakpoints.up("sm")]: {
      fontSize: "40px",
      lineHeight: "50px",
      marginBottom: "16px",
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
    fontSize: "15px",
    fontWeight: 400,
    lineHeight: "24px",
    color: "rgba(255, 255, 255, 0.95)",
    marginBottom: "0",
    maxWidth: "780px",
    fontFamily: "Roboto, sans-serif",
    [theme.breakpoints.up("sm")]: {
      fontSize: "18px",
      lineHeight: "30px",
      marginBottom: "16px",
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
    <HeroSection role='region' aria-labelledby='programs-hero-title'>
      <GradientOverlay1 aria-hidden='true' />
      <GradientOverlay2 aria-hidden='true' />
      <Container maxWidth='lg' sx={{ position: "relative", zIndex: 1 }}>
        <Box maxWidth='800px'>
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

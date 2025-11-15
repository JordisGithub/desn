import { Container, Typography, Stack, Box } from "@mui/material";
import { styled } from "@mui/material/styles";
import { Link } from "react-router-dom";
import { useTranslation } from "react-i18next";
import OptimizedImage from "../OptimizedImage";

const AboutContainer = styled("section")({
  background: "linear-gradient(135deg, #004c91 0%, #003d75 50%, #005ca8 100%)",
  position: "relative",
  overflow: "hidden",
  "&::before": {
    content: '""',
    position: "absolute",
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    background:
      "radial-gradient(circle at 20% 50%, rgba(246, 212, 105, 0.1) 0%, transparent 50%), radial-gradient(circle at 80% 80%, rgba(255, 255, 255, 0.05) 0%, transparent 50%)",
    pointerEvents: "none",
  },
});

const ImageWrapper = styled(Box)(({ theme }) => ({
  position: "relative",
  maxWidth: "500px",
  margin: "0 auto",
  padding: theme.spacing(2),
  background:
    "linear-gradient(145deg, rgba(0, 167, 127, 0.25), rgba(0, 167, 127, 0.15))",
  borderRadius: theme.spacing(3),
  boxShadow:
    "0 12px 40px rgba(0, 0, 0, 0.3), inset 0 2px 4px rgba(0, 167, 127, 0.3)",
  transition: "transform 0.3s ease, box-shadow 0.3s ease",
  backdropFilter: "blur(10px)",
  border: "3px solid rgba(0, 167, 127, 0.4)",
  "&:hover": {
    transform: "translateY(-6px)",
    boxShadow:
      "0 16px 50px rgba(0, 0, 0, 0.35), inset 0 2px 4px rgba(0, 167, 127, 0.4), 0 0 30px rgba(0, 167, 127, 0.2)",
    border: "3px solid rgba(0, 167, 127, 0.6)",
  },
  [theme.breakpoints.down("md")]: {
    maxWidth: "400px",
    padding: theme.spacing(1.5),
  },
}));

const ImageInner = styled(Box)(({ theme }) => ({
  position: "relative",
  borderRadius: theme.spacing(2),
  overflow: "hidden",
  boxShadow: "0 4px 12px rgba(0, 0, 0, 0.2)",
  "&::after": {
    content: '""',
    position: "absolute",
    inset: 0,
    background:
      "linear-gradient(180deg, rgba(0, 76, 145, 0) 0%, rgba(0, 76, 145, 0.05) 100%)",
    pointerEvents: "none",
  },
}));

const ContentWrapper = styled(Box)({
  position: "relative",
  zIndex: 1,
});

const AboutHeading = styled(Typography)(({ theme }) => ({
  fontSize: "2rem",
  fontWeight: 700,
  color: "white",
  marginBottom: theme.spacing(2.5),
  lineHeight: 1.2,
  letterSpacing: "-0.01em",
  textShadow: "0 2px 8px rgba(0, 0, 0, 0.2)",
  [theme.breakpoints.up("md")]: {
    fontSize: "2.5rem",
  },
  [theme.breakpoints.down("sm")]: {
    fontSize: "1.75rem",
  },
}));

const AboutDescription = styled(Typography)(({ theme }) => ({
  fontSize: "1rem",
  color: "rgba(255, 255, 255, 0.95)",
  marginBottom: theme.spacing(3),
  lineHeight: 1.7,
  fontWeight: 400,
  textShadow: "0 1px 3px rgba(0, 0, 0, 0.15)",
  [theme.breakpoints.up("md")]: {
    fontSize: "1.0625rem",
  },
  [theme.breakpoints.down("sm")]: {
    fontSize: "0.9375rem",
  },
}));

const AboutButton = styled(Link)(({ theme }) => ({
  backgroundColor: "#f6d469",
  color: "#351c42",
  fontWeight: 700,
  fontSize: "1rem",
  textTransform: "capitalize",
  padding: theme.spacing(1.5, 4),
  borderRadius: "100px",
  textDecoration: "none",
  display: "inline-flex",
  alignItems: "center",
  gap: theme.spacing(1),
  boxShadow:
    "0 4px 15px rgba(246, 212, 105, 0.3), 0 2px 6px rgba(0, 0, 0, 0.2)",
  transition: "all 0.3s ease",
  "&:hover, &:focus": {
    backgroundColor: "#f5c943",
    transform: "translateY(-2px)",
    boxShadow:
      "0 6px 20px rgba(246, 212, 105, 0.4), 0 3px 8px rgba(0, 0, 0, 0.25)",
    fontWeight: 800,
  },
  "&:active": {
    transform: "translateY(0)",
  },
  "&:focus": {
    outline: "3px solid white",
    outlineOffset: "3px",
  },
  [theme.breakpoints.down("sm")]: {
    fontSize: "0.9375rem",
    padding: theme.spacing(1.25, 3.5),
  },
}));

export default function AboutSection() {
  const { t } = useTranslation();

  return (
    <AboutContainer
      aria-labelledby='about-heading'
      style={{ paddingTop: "6rem", paddingBottom: "6rem" }}
    >
      <Container maxWidth='xl' sx={{ px: { xs: 2, sm: 3, md: 6 } }}>
        <Stack
          direction={{ xs: "column", md: "row" }}
          spacing={{ xs: 4, md: 6 }}
          alignItems='center'
        >
          <Box sx={{ flex: "1 1 40%" }}>
            <ImageWrapper>
              <ImageInner>
                <OptimizedImage
                  src='home/home-aboutus.jpg'
                  alt={t("about_alt")}
                  loading='lazy'
                  style={{
                    width: "100%",
                    height: "auto",
                    display: "block",
                  }}
                />
              </ImageInner>
            </ImageWrapper>
          </Box>
          <ContentWrapper sx={{ flex: "1 1 60%" }}>
            <AboutHeading as='h2' id='about-heading'>
              {t("about_heading")}
            </AboutHeading>
            <AboutDescription>{t("about_description")}</AboutDescription>
            <AboutButton to='/about' aria-label={t("about_button")}>
              {t("about_button")}
              <span aria-hidden='true'>→</span>
            </AboutButton>
          </ContentWrapper>
        </Stack>
      </Container>
    </AboutContainer>
  );
}

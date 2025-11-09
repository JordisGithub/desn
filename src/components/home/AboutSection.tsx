import { Container, Typography, Stack } from "@mui/material";
import { styled } from "@mui/material/styles";
import { Link } from "react-router-dom";
import { useTranslation } from "react-i18next";
import imgAboutImage from "../../assets/home/home-aboutus.jpg";

const AboutContainer = styled("section")({
  backgroundColor: "#004c91",
  position: "relative",
  overflow: "hidden",
});

const AboutImage = styled("img")(({ theme }) => ({
  width: "100%",
  height: "auto",
  borderRadius: theme.spacing(2),
}));

const AboutHeading = styled(Typography)(({ theme }) => ({
  fontSize: "2.5rem",
  fontWeight: 600,
  color: "white",
  marginBottom: theme.spacing(3),
  [theme.breakpoints.up("md")]: {
    fontSize: "3rem",
  },
}));

const AboutDescription = styled(Typography)(({ theme }) => ({
  fontSize: "1.25rem",
  color: "white",
  marginBottom: theme.spacing(4),
  lineHeight: 1.6,
  [theme.breakpoints.up("md")]: {
    fontSize: "1.5rem",
  },
}));

const AboutButton = styled(Link)(({ theme }) => ({
  backgroundColor: "#f6d469",
  color: "#351c42",
  fontWeight: 700,
  fontSize: "1.25rem",
  textTransform: "capitalize",
  padding: theme.spacing(1.5, 4),
  borderRadius: "100px",
  textDecoration: "none",
  display: "inline-block",
  "&:hover": {
    backgroundColor: "#f5c943",
  },
  "&:focus": {
    outline: "3px solid white",
    outlineOffset: "2px",
  },
}));

export default function AboutSection() {
  const { t } = useTranslation();

  return (
    <AboutContainer
      aria-labelledby='about-heading'
      style={{ paddingTop: "5rem", paddingBottom: "5rem" }}
    >
      <Container maxWidth='xl' sx={{ px: { xs: 2, sm: 3, md: 6 } }}>
        <Stack
          direction={{ xs: "column", md: "row" }}
          spacing={4}
          alignItems='center'
        >
          <div style={{ flex: "1 1 50%" }}>
            <AboutImage src={imgAboutImage} alt={t("about_alt")} />
          </div>
          <div style={{ flex: "1 1 50%" }}>
            <AboutHeading as='h2' id='about-heading'>
              {t("about_heading")}
            </AboutHeading>
            <AboutDescription>{t("about_description")}</AboutDescription>
            <AboutButton to='/about' aria-label={t("about_button")}>
              {t("about_button")}
            </AboutButton>
          </div>
        </Stack>
      </Container>
    </AboutContainer>
  );
}

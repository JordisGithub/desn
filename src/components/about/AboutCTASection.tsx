import { Container, Typography, Box } from "@mui/material";
import { styled } from "@mui/material/styles";
import { Link } from "react-router-dom";
import { useTranslation } from "react-i18next";
import ArrowForwardIcon from "@mui/icons-material/ArrowForward";

const CTAContainer = styled("section")({
  background: "linear-gradient(180deg, #002b52 0%, #004c91 20%, #00a77f 100%)",
  paddingTop: "80px",
  paddingBottom: "80px",
  position: "relative",
  overflow: "hidden",
});

const CTATitle = styled(Typography)(({ theme }) => ({
  fontSize: "2.5rem",
  fontWeight: 600,
  color: "white",
  marginBottom: theme.spacing(2),
  textAlign: "center",
  [theme.breakpoints.down("md")]: {
    fontSize: "2rem",
  },
}));

const CTADescription = styled(Typography)(({ theme }) => ({
  fontSize: "1.25rem",
  color: "rgba(255, 255, 255, 0.9)",
  textAlign: "center",
  maxWidth: "700px",
  margin: `0 auto ${theme.spacing(5)}`,
}));

const ButtonGroup = styled(Box)(({ theme }) => ({
  display: "flex",
  gap: theme.spacing(2),
  justifyContent: "center",
  flexWrap: "wrap",
}));

const PrimaryButton = styled(Link)(({ theme }) => ({
  backgroundColor: "#f6d469",
  color: "#2b2b2b",
  fontWeight: 600,
  fontSize: "1.125rem",
  padding: theme.spacing(1.5, 4),
  borderRadius: "8px",
  textDecoration: "none",
  display: "inline-flex",
  alignItems: "center",
  gap: theme.spacing(1),
  transition: "all 0.3s ease",
  "&:hover": {
    backgroundColor: "#f5c943",
  },
  "&:focus": {
    outline: "3px solid white",
    outlineOffset: "2px",
  },
}));

const SecondaryButton = styled(Link)(({ theme }) => ({
  backgroundColor: "transparent",
  color: "white",
  fontWeight: 600,
  fontSize: "1.125rem",
  padding: theme.spacing(1.5, 4),
  borderRadius: "8px",
  border: "2px solid white",
  textDecoration: "none",
  display: "inline-flex",
  alignItems: "center",
  gap: theme.spacing(1),
  transition: "all 0.3s ease",
  "&:hover": {
    backgroundColor: "rgba(255, 255, 255, 0.25)",
    borderColor: "white",
  },
  "&:focus": {
    outline: "3px solid #f6d469",
    outlineOffset: "2px",
  },
}));

export default function AboutCTASection() {
  const { t } = useTranslation();

  return (
    <CTAContainer aria-labelledby='cta-heading'>
      <Container maxWidth='xl' sx={{ px: { xs: 2, sm: 3, md: 6 } }}>
        <CTATitle variant='h2' id='cta-heading'>
          {t("about_cta_title")}
        </CTATitle>
        <CTADescription>{t("about_cta_description")}</CTADescription>
        <ButtonGroup>
          <PrimaryButton to='/programs' aria-label={t("about_cta_programs")}>
            {t("about_cta_programs")}
            <ArrowForwardIcon />
          </PrimaryButton>
          <SecondaryButton to='/about#team' aria-label={t("about_cta_team")}>
            {t("about_cta_team")}
            <ArrowForwardIcon />
          </SecondaryButton>
        </ButtonGroup>
      </Container>
    </CTAContainer>
  );
}

import { Container, Typography, Box } from "@mui/material";
import { styled } from "@mui/material/styles";
import { Link } from "react-router-dom";
import { useTranslation } from "react-i18next";
import ArrowForwardIcon from "@mui/icons-material/ArrowForward";

const CTAContainer = styled("section")({
  background: "linear-gradient(180deg, #002b52 0%, #004c91 20%, #00a77f 100%)",
  paddingTop: "120px",
  paddingBottom: "120px",
  position: "relative",
  overflow: "hidden",
});

const CTATitle = styled(Typography)(({ theme }) => ({
  fontSize: "2.75rem",
  fontWeight: 700,
  color: "white",
  letterSpacing: "0.02em",
  marginBottom: theme.spacing(3),
  textAlign: "center",
  [theme.breakpoints.down("md")]: {
    fontSize: "2.125rem",
    letterSpacing: "0.01em",
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
  background: "linear-gradient(135deg, #f6d469 0%, #f5c943 100%)",
  color: "#2b2b2b",
  fontWeight: 700,
  fontSize: "1.125rem",
  padding: theme.spacing(2, 5),
  borderRadius: "12px",
  textDecoration: "none",
  display: "inline-flex",
  alignItems: "center",
  gap: theme.spacing(1),
  boxShadow: "0 6px 12px rgba(246, 212, 105, 0.35)",
  transition: "all 0.3s cubic-bezier(0.4, 0, 0.2, 1)",
  "&:hover": {
    background: "linear-gradient(135deg, #f5c943 0%, #e5b833 100%)",
    transform: "translateY(-3px)",
    boxShadow: "0 12px 24px rgba(246, 212, 105, 0.45)",
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

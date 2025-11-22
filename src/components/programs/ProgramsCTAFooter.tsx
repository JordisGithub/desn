import { Box, Button, Container, Typography } from "@mui/material";
import { styled } from "@mui/material/styles";
import { useTranslation } from "react-i18next";
import ArrowForwardIcon from "@mui/icons-material/ArrowForward";
import VolunteerActivismIcon from "@mui/icons-material/VolunteerActivism";

const CTASection = styled("section")(({ theme }) => ({
  padding: theme.spacing(6, 2),
  background: "linear-gradient(180deg, #004c91 0%, #00a77f 100%)",
  position: "relative",
  overflow: "hidden",
  [theme.breakpoints.up("sm")]: {
    padding: theme.spacing(8, 3),
  },
  [theme.breakpoints.up("md")]: {
    padding: theme.spacing(12, 4),
  },
}));

const CTAContent = styled(Container)({
  position: "relative",
  zIndex: 2,
  textAlign: "center",
});

const CTATitle = styled(Typography)(({ theme }) => ({
  fontSize: "1.75rem",
  fontWeight: 700,
  color: "#ffffff",
  marginBottom: "12px",
  fontFamily: "Poppins, sans-serif",
  [theme.breakpoints.up("sm")]: {
    fontSize: "2rem",
    marginBottom: "14px",
  },
  [theme.breakpoints.up("md")]: {
    fontSize: "2.5rem",
    marginBottom: "16px",
  },
}));

const CTADescription = styled(Typography)(({ theme }) => ({
  fontSize: "1rem",
  color: "rgba(255, 255, 255, 0.95)",
  marginBottom: "24px",
  maxWidth: "700px",
  margin: "0 auto 24px",
  [theme.breakpoints.up("sm")]: {
    fontSize: "1.125rem",
    marginBottom: "32px",
    margin: "0 auto 32px",
  },
  [theme.breakpoints.up("md")]: {
    fontSize: "1.25rem",
    marginBottom: "40px",
    margin: "0 auto 40px",
  },
}));

const CTAButtons = styled(Box)(({ theme }) => ({
  display: "flex",
  gap: theme.spacing(3),
  justifyContent: "center",
  flexWrap: "wrap",
}));

const PrimaryButton = styled(Button)(({ theme }) => ({
  backgroundColor: "#f6d469",
  color: "#2b2b2b",
  fontSize: "1rem",
  fontWeight: 600,
  padding: "12px 24px",
  borderRadius: "100px",
  textTransform: "none",
  boxShadow: "0px 8px 16px rgba(0, 0, 0, 0.2)",
  fontFamily: "Roboto, sans-serif",
  [theme.breakpoints.up("sm")]: {
    fontSize: "1.0625rem",
    padding: "14px 32px",
  },
  [theme.breakpoints.up("md")]: {
    fontSize: "1.125rem",
    padding: "16px 40px",
  },
  "&:hover": {
    backgroundColor: "#f5c943",
    transform: "translateY(-2px)",
    boxShadow: "0px 12px 20px rgba(0, 0, 0, 0.25)",
  },
  "&:focus-visible": {
    outline: "3px solid white",
    outlineOffset: "3px",
  },
}));

const SecondaryButton = styled(Button)(({ theme }) => ({
  backgroundColor: "transparent",
  color: "#ffffff",
  fontSize: "1rem",
  fontWeight: 600,
  padding: "12px 24px",
  borderRadius: "100px",
  textTransform: "none",
  border: "2px solid white",
  fontFamily: "Roboto, sans-serif",
  [theme.breakpoints.up("sm")]: {
    fontSize: "1.0625rem",
    padding: "14px 32px",
  },
  [theme.breakpoints.up("md")]: {
    fontSize: "1.125rem",
    padding: "16px 40px",
  },
  "&:hover": {
    backgroundColor: "rgba(255, 255, 255, 0.1)",
    borderColor: "#f6d469",
    color: "#f6d469",
  },
  "&:focus-visible": {
    outline: "3px solid #f6d469",
    outlineOffset: "3px",
  },
}));

const BackgroundDecoration = styled(Box)({
  position: "absolute",
  width: "500px",
  height: "500px",
  borderRadius: "50%",
  background: "rgba(255, 255, 255, 0.05)",
  filter: "blur(100px)",
  top: "-100px",
  right: "-100px",
  zIndex: 1,
});

export default function ProgramsCTA() {
  const { t } = useTranslation("programs");

  return (
    <CTASection aria-label='Get Involved Call to Action'>
      <BackgroundDecoration aria-hidden='true' />
      <CTAContent maxWidth='lg'>
        <CTATitle id='programs-cta-title' variant='h2'>
          {t("programs.cta.title")}
        </CTATitle>
        <CTADescription>{t("programs.cta.description")}</CTADescription>
        <CTAButtons>
          <PrimaryButton
            href='/get-involved'
            startIcon={<VolunteerActivismIcon />}
            aria-label={t("programs.cta.get_involved_button")}
          >
            {t("programs.cta.get_involved_button")}
          </PrimaryButton>
          <SecondaryButton
            href='/contact'
            endIcon={<ArrowForwardIcon />}
            aria-label={t("programs.cta.donate_button")}
          >
            {t("programs.cta.donate_button")}
          </SecondaryButton>
        </CTAButtons>
      </CTAContent>
    </CTASection>
  );
}

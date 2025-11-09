import { Box, Button, Container, Typography } from "@mui/material";
import { styled } from "@mui/material/styles";
import { useTranslation } from "react-i18next";
import ArrowForwardIcon from "@mui/icons-material/ArrowForward";

const CTASection = styled("section")({
  position: "relative",
  minHeight: "573px",
  background: "linear-gradient(180deg, #004c91 0%, #00a77f 100%)",
  overflow: "hidden",
  display: "flex",
  alignItems: "center",
});

const GradientOverlay = styled(Box)({
  position: "absolute",
  width: "600px",
  height: "600px",
  borderRadius: "50%",
  background: "rgba(255, 255, 255, 0.05)",
  filter: "blur(96px)",
  top: "0",
  left: "537px",
});

const ContentContainer = styled(Box)({
  position: "relative",
  zIndex: 1,
  display: "flex",
  flexDirection: "column",
  alignItems: "center",
  gap: "32px",
  textAlign: "center",
  maxWidth: "1024px",
  margin: "0 auto",
});

const CTATitle = styled(Typography)({
  fontSize: "60px",
  fontWeight: 400,
  lineHeight: "75px",
  color: "white",
  fontFamily: "Poppins, sans-serif",
});

const CTADescription = styled(Typography)({
  fontSize: "24px",
  fontWeight: 400,
  lineHeight: "39px",
  color: "rgba(255, 255, 255, 0.95)",
  maxWidth: "985px",
  fontFamily: "Roboto, sans-serif",
});

const ButtonContainer = styled(Box)({
  display: "flex",
  gap: "24px",
  justifyContent: "center",
  flexWrap: "wrap",
});

const PrimaryButton = styled(Button)({
  backgroundColor: "#f6d469",
  color: "#2b2b2b",
  fontSize: "20px",
  fontWeight: 600,
  padding: "24px 48px",
  borderRadius: "100px",
  textTransform: "none",
  boxShadow: "0px 25px 50px -12px rgba(0,0,0,0.25)",
  fontFamily: "Roboto, sans-serif",
  "&:hover": {
    backgroundColor: "#f5c943",
  },
  "&:focus": {
    outline: "3px solid white",
    outlineOffset: "2px",
  },
});

const SecondaryButton = styled(Button)({
  backgroundColor: "#f6d469",
  color: "#2b2b2b",
  fontSize: "20px",
  fontWeight: 600,
  padding: "24px 48px",
  borderRadius: "100px",
  textTransform: "none",
  boxShadow: "0px 25px 50px -12px rgba(0,0,0,0.25)",
  fontFamily: "Roboto, sans-serif",
  "&:hover": {
    backgroundColor: "#f5c943",
  },
  "&:focus": {
    outline: "3px solid white",
    outlineOffset: "2px",
  },
});

export default function ProgramsCTA() {
  const { t } = useTranslation();

  return (
    <CTASection aria-labelledby='programs-cta-title'>
      <GradientOverlay aria-hidden='true' />
      <Container maxWidth='xl'>
        <ContentContainer>
          <CTATitle id='programs-cta-title'>{t("programs:cta.title")}</CTATitle>
          <CTADescription>{t("programs:cta.description")}</CTADescription>
          <ButtonContainer>
            <PrimaryButton
              href='/get-involved'
              endIcon={<ArrowForwardIcon />}
              aria-label={t("programs:cta.get_involved_button")}
            >
              {t("programs:cta.get_involved_button")}
            </PrimaryButton>
            <SecondaryButton
              href='/contact'
              aria-label={t("programs:cta.contact_button")}
            >
              {t("programs:cta.contact_button")}
            </SecondaryButton>
          </ButtonContainer>
        </ContentContainer>
      </Container>
    </CTASection>
  );
}

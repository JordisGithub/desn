import { Container, Typography, Stack } from "@mui/material";
import { styled } from "@mui/material/styles";
import { Link } from "react-router-dom";
import FacebookIcon from "@mui/icons-material/Facebook";
import TwitterIcon from "@mui/icons-material/Twitter";
import LinkedInIcon from "@mui/icons-material/LinkedIn";
import LocationOnIcon from "@mui/icons-material/LocationOn";
import PhoneIcon from "@mui/icons-material/Phone";
import EmailIcon from "@mui/icons-material/Email";
import { useTranslation } from "react-i18next";

const CTASection = styled("section")({
  background: "linear-gradient(to bottom, #004c91, #00a77f)",
  textAlign: "center",
});

const CTAHeading = styled(Typography)(({ theme }) => ({
  fontSize: "2.5rem",
  fontWeight: 400,
  color: "white",
  marginBottom: theme.spacing(3),
  [theme.breakpoints.up("md")]: {
    fontSize: "3.75rem",
  },
}));

const CTADescription = styled(Typography)(({ theme }) => ({
  fontSize: "1.125rem",
  color: "rgba(255, 255, 255, 0.95)",
  marginBottom: theme.spacing(4),
  lineHeight: 1.6,
  [theme.breakpoints.up("md")]: {
    fontSize: "1.5rem",
  },
}));

const CTAButton = styled(Link)(({ theme }) => ({
  backgroundColor: "#f6d469",
  color: "#2b2b2b",
  fontWeight: 600,
  fontSize: "1.25rem",
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

const FooterContainer = styled("footer")({
  backgroundColor: "#00a77f",
});

const FooterHeading = styled(Typography)({
  fontSize: "2rem",
  fontWeight: 400,
  color: "#2b2b2b",
  marginBottom: "1rem",
});

const FooterText = styled(Typography)({
  fontSize: "1rem",
  color: "#2b2b2b",
  lineHeight: 1.5,
});

const FooterLink = styled(Link)({
  fontSize: "1rem",
  color: "#2b2b2b",
  textDecoration: "none",
  "&:hover": {
    textDecoration: "underline",
  },
  "&:focus": {
    outline: "2px solid #004c91",
    outlineOffset: "2px",
  },
});

const SocialIcon = styled("a")({
  width: "28px",
  height: "28px",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  cursor: "pointer",
  "&:focus": {
    outline: "2px solid #004c91",
    outlineOffset: "2px",
  },
});

const CopyrightBar = styled("div")({
  backgroundColor: "#004c91",
  padding: "1.5rem 0",
  textAlign: "center",
});

const CopyrightText = styled(Typography)({
  color: "white",
  fontSize: "1rem",
});

export default function Footer() {
  const { t } = useTranslation();

  return (
    <>
      {/* CTA Section */}
      <CTASection
        aria-labelledby='cta-heading'
        style={{ paddingTop: "6rem", paddingBottom: "6rem" }}
      >
        <Container maxWidth='md'>
          <CTAHeading as='h2' id='cta-heading'>
            {t("footer_cta_heading")}
          </CTAHeading>
          <CTADescription>{t("footer_cta_description")}</CTADescription>
          <Stack
            direction={{ xs: "column", sm: "row" }}
            spacing={2}
            justifyContent='center'
          >
            <CTAButton to='/get-involved' aria-label={t("get_involved_button")}>
              {t("get_involved_button")}
            </CTAButton>
            <CTAButton to='/donate' aria-label={t("footer_donate_button")}>
              {t("footer_donate_button")}
            </CTAButton>
          </Stack>
        </Container>
      </CTASection>

      {/* Footer */}
      <FooterContainer
        role='contentinfo'
        style={{ paddingTop: "5rem", paddingBottom: "5rem" }}
      >
        <Container maxWidth='lg'>
          <div
            style={{
              display: "grid",
              gridTemplateColumns: "1fr",
              gap: "2rem",
            }}
          >
            {/* About DESN */}
            <div>
              <FooterHeading>{t("footer_about_heading")}</FooterHeading>
              <FooterText sx={{ mb: 2 }}>{t("footer_about_text")}</FooterText>
              <Stack direction='row' spacing={1.5}>
                <SocialIcon href='#' aria-label='Facebook' tabIndex={0}>
                  <FacebookIcon />
                </SocialIcon>
                <SocialIcon href='#' aria-label='Twitter' tabIndex={0}>
                  <TwitterIcon />
                </SocialIcon>
                <SocialIcon href='#' aria-label='LinkedIn' tabIndex={0}>
                  <LinkedInIcon />
                </SocialIcon>
              </Stack>
            </div>

            {/* Quick Links */}
            <div>
              <FooterHeading>{t("footer_quick_links")}</FooterHeading>
              <Stack spacing={1}>
                <FooterLink to='/about'>{t("footer_link_about")}</FooterLink>
                <FooterLink to='/programs'>
                  {t("footer_link_programs")}
                </FooterLink>
                <FooterLink to='/events'>{t("footer_link_events")}</FooterLink>
                <FooterLink to='/resources'>
                  {t("footer_link_resources")}
                </FooterLink>
                <FooterLink to='/get-involved'>
                  {t("footer_link_get_involved")}
                </FooterLink>
              </Stack>
            </div>

            {/* Contact Us */}
            <div>
              <FooterHeading>{t("footer_contact_heading")}</FooterHeading>
              <Stack spacing={1}>
                <Stack direction='row' spacing={1} alignItems='flex-start'>
                  <LocationOnIcon sx={{ fontSize: "1rem", mt: 0.5 }} />
                  <FooterText>Lalitpur, Nepal</FooterText>
                </Stack>
                <Stack direction='row' spacing={1} alignItems='center'>
                  <PhoneIcon sx={{ fontSize: "1rem" }} />
                  <FooterLink to='tel:+97715709205'>+977-15709205</FooterLink>
                </Stack>
                <Stack direction='row' spacing={1} alignItems='center'>
                  <EmailIcon sx={{ fontSize: "1rem" }} />
                  <FooterLink to='mailto:disabilityemp@gmail.com'>
                    disabilityemp@gmail.com
                  </FooterLink>
                </Stack>
              </Stack>
            </div>

            {/* Legal */}
            <div>
              <FooterHeading>{t("footer_legal_heading")}</FooterHeading>
              <Stack spacing={1}>
                <FooterLink to='/privacy'>
                  {t("footer_link_privacy")}
                </FooterLink>
                <FooterLink to='/terms'>{t("footer_link_terms")}</FooterLink>
                <FooterLink to='/accessibility'>
                  {t("footer_link_accessibility")}
                </FooterLink>
              </Stack>
            </div>
          </div>
        </Container>
      </FooterContainer>

      {/* Copyright Bar */}
      <CopyrightBar>
        <Container>
          <CopyrightText>{t("footer_copyright")}</CopyrightText>
        </Container>
      </CopyrightBar>
    </>
  );
}

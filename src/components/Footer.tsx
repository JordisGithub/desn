import { Container, Typography, Stack, Box } from "@mui/material";
import { styled } from "@mui/material/styles";
import { Link } from "react-router-dom";
import FacebookIcon from "@mui/icons-material/Facebook";
import TwitterIcon from "@mui/icons-material/Twitter";
import LinkedInIcon from "@mui/icons-material/LinkedIn";
import LocationOnIcon from "@mui/icons-material/LocationOn";
import PhoneIcon from "@mui/icons-material/Phone";
import EmailIcon from "@mui/icons-material/Email";
import { useTranslation } from "react-i18next";
import desnLogo from "../assets/DESN_logo_500x500.jpg";

const CTASection = styled("section")(({ theme }) => ({
  background: "linear-gradient(to bottom, #004c91, #00a77f)",
  textAlign: "center",
  padding: "4rem 0",
  [theme.breakpoints.down("md")]: {
    padding: "3rem 0",
  },
}));

const CTAHeading = styled(Typography)(({ theme }) => ({
  fontSize: "2rem",
  fontWeight: 400,
  color: "white",
  marginBottom: theme.spacing(2),
  [theme.breakpoints.up("md")]: {
    fontSize: "2.5rem",
  },
}));

const CTADescription = styled(Typography)(({ theme }) => ({
  fontSize: "1rem",
  color: "rgba(255, 255, 255, 0.95)",
  marginBottom: theme.spacing(2.5),
  lineHeight: 1.6,
  [theme.breakpoints.up("md")]: {
    fontSize: "1.25rem",
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
  "&:hover, &:focus": {
    backgroundColor: "#f5c943",
    fontWeight: 700,
  },
  "&:focus": {
    outline: "3px solid white",
    outlineOffset: "2px",
  },
}));

const FooterContainer = styled("footer")({
  backgroundColor: "#00a77f",
});

const SocialSection = styled(Box)(({ theme }) => ({
  padding: theme.spacing(2, 0),
  borderBottom: "1px solid rgba(43, 43, 43, 0.1)",
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
}));

const SocialHeading = styled(Typography)({
  fontSize: "1.125rem",
  fontWeight: 600,
  color: "#2b2b2b",
  marginBottom: "1rem",
});

const FooterHeading = styled(Typography)({
  fontSize: "1.25rem",
  fontWeight: 600,
  color: "#2b2b2b",
  marginBottom: "1.5rem",
});

const FooterText = styled(Typography)({
  fontSize: "0.875rem",
  color: "#2b2b2b",
  lineHeight: 1.6,
});

const FooterLink = styled(Link)({
  fontSize: "0.875rem",
  color: "#2b2b2b",
  textDecoration: "none",
  display: "block",
  marginBottom: "0.5rem",
  "&:hover, &:focus": {
    color: "#004c91",
    textDecoration: "underline",
    fontWeight: 700,
  },
  "&:focus": {
    outline: "2px solid #004c91",
    outlineOffset: "2px",
  },
});

const SocialIcon = styled("a")({
  width: "40px",
  height: "40px",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  backgroundColor: "#004c91",
  color: "white",
  borderRadius: "50%",
  cursor: "pointer",
  transition: "all 0.3s ease",
  "&:hover, &:focus": {
    backgroundColor: "#003366",
    transform: "scale(1.1)",
  },
  "&:focus": {
    outline: "2px solid white",
    outlineOffset: "2px",
  },
});

const CopyrightBar = styled("div")({
  backgroundColor: "#004c91",
  padding: "1rem 0",
});

const BottomLinks = styled(Box)({
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
  gap: "2rem",
  marginBottom: "0.5rem",
  flexWrap: "wrap",
});

const BottomLink = styled(Link)({
  color: "white",
  fontSize: "0.875rem",
  textDecoration: "none",
  "&:hover, &:focus": {
    textDecoration: "underline",
    fontWeight: 700,
  },
  "&:focus": {
    outline: "2px solid white",
    outlineOffset: "2px",
  },
});

const CopyrightText = styled(Typography)({
  color: "white",
  fontSize: "0.875rem",
  textAlign: "center",
});

export default function Footer() {
  const { t } = useTranslation();

  return (
    <>
      {/* CTA Section */}
      <CTASection aria-labelledby='cta-heading'>
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
            <CTAButton
              to='/get-involved'
              aria-label={t("footer_button_get_involved")}
            >
              {t("footer_button_get_involved")}
            </CTAButton>
            <CTAButton to='/donate' aria-label={t("footer_button_donate")}>
              {t("footer_button_donate")}
            </CTAButton>
          </Stack>
        </Container>
      </CTASection>

      {/* Footer */}
      <FooterContainer role='contentinfo'>
        <Container maxWidth='lg'>
          {/* Social Media Section - Top of Footer */}
          <SocialSection>
            <Stack direction='row' spacing={2} alignItems='center'>
              <SocialHeading>{t("footer_stay_connected")}</SocialHeading>
              <SocialIcon
                href='https://facebook.com'
                aria-label='Facebook'
                target='_blank'
                rel='noopener noreferrer'
              >
                <FacebookIcon />
              </SocialIcon>
              <SocialIcon
                href='https://twitter.com'
                aria-label='Twitter'
                target='_blank'
                rel='noopener noreferrer'
              >
                <TwitterIcon />
              </SocialIcon>
              <SocialIcon
                href='https://linkedin.com'
                aria-label='LinkedIn'
                target='_blank'
                rel='noopener noreferrer'
              >
                <LinkedInIcon />
              </SocialIcon>
            </Stack>
          </SocialSection>

          {/* Footer Links Grid */}
          <Box sx={{ py: 3 }}>
            <div
              style={{
                display: "grid",
                gridTemplateColumns: "repeat(auto-fit, minmax(200px, 1fr))",
                gap: "2rem",
              }}
            >
              {/* About DESN */}
              <div>
                <FooterHeading>{t("footer_about_heading")}</FooterHeading>
                <Stack direction='row' spacing={2} alignItems='flex-start'>
                  <Box sx={{ flexShrink: 0 }}>
                    <img
                      src={desnLogo}
                      alt='DESN Logo'
                      style={{
                        width: "80px",
                        height: "80px",
                        objectFit: "contain",
                      }}
                    />
                  </Box>
                  <FooterText>{t("footer_about_text")}</FooterText>
                </Stack>
              </div>

              {/* Quick Links */}
              <div>
                <FooterHeading>{t("footer_quick_links")}</FooterHeading>
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
              </div>

              {/* Contact Us */}
              <div>
                <FooterHeading>{t("footer_contact_heading")}</FooterHeading>
                <Stack spacing={1.5}>
                  <Stack direction='row' spacing={1} alignItems='flex-start'>
                    <LocationOnIcon
                      sx={{ fontSize: "1.125rem", mt: 0.25, color: "#2b2b2b" }}
                      aria-label={t("contact_labels.location")}
                    />
                    <FooterText>{t("footer_contact_location")}</FooterText>
                  </Stack>
                  <Stack direction='row' spacing={1} alignItems='center'>
                    <PhoneIcon
                      sx={{ fontSize: "1.125rem", color: "#2b2b2b" }}
                      aria-label={t("contact_labels.phone")}
                    />
                    <FooterLink
                      to='tel:+97715709205'
                      sx={{ display: "inline" }}
                      aria-label={`${t("contact_labels.phone")}: ${t(
                        "footer_contact_phone"
                      )}`}
                    >
                      {t("footer_contact_phone")}
                    </FooterLink>
                  </Stack>
                  <Stack direction='row' spacing={1} alignItems='center'>
                    <EmailIcon
                      sx={{ fontSize: "1.125rem", color: "#2b2b2b" }}
                      aria-label={t("contact_labels.email")}
                    />
                    <FooterLink
                      to='mailto:disabilityemp@gmail.com'
                      sx={{ display: "inline" }}
                      aria-label={`${t(
                        "contact_labels.email"
                      )}: disabilityemp@gmail.com`}
                    >
                      disabilityemp@gmail.com
                    </FooterLink>
                  </Stack>
                </Stack>
              </div>

              {/* Legal */}
              <div>
                <FooterHeading>{t("footer_legal_heading")}</FooterHeading>
                <FooterLink to='/privacy'>
                  {t("footer_link_privacy")}
                </FooterLink>
                <FooterLink to='/terms'>{t("footer_link_terms")}</FooterLink>
              </div>
            </div>
          </Box>
        </Container>

        {/* Copyright Bar with Legal Links */}
        <CopyrightBar>
          <Container>
            <BottomLinks>
              <BottomLink to='/accessibility'>
                {t("footer_link_accessibility")}
              </BottomLink>
              <span style={{ color: "white" }}>|</span>
              <BottomLink to='/privacy'>
                {t("footer_link_account_privacy")}
              </BottomLink>
            </BottomLinks>
            <CopyrightText>{t("footer_copyright")}</CopyrightText>
          </Container>
        </CopyrightBar>
      </FooterContainer>
    </>
  );
}

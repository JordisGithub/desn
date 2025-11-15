import { Container, Typography, Box } from "@mui/material";
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

const FooterContainer = styled("footer")({
  backgroundColor: "#00a77f",
  position: "relative",
});

const TopSection = styled(Box)(({ theme }) => ({
  padding: theme.spacing(6, 0, 4, 0),
  [theme.breakpoints.down("md")]: {
    padding: theme.spacing(4, 0, 3, 0),
  },
}));

const SocialSection = styled(Box)(({ theme }) => ({
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
  gap: theme.spacing(3),
  marginBottom: theme.spacing(4),
  flexWrap: "wrap",
  [theme.breakpoints.down("sm")]: {
    gap: theme.spacing(2),
    marginBottom: theme.spacing(3),
  },
}));

const SocialHeading = styled(Typography)(({ theme }) => ({
  fontSize: "1.125rem",
  fontWeight: 600,
  color: "#1a1a1a",
  [theme.breakpoints.down("sm")]: {
    fontSize: "1rem",
  },
}));

const FooterGrid = styled(Box)(({ theme }) => ({
  display: "grid",
  gridTemplateColumns: "repeat(3, 1fr)",
  gap: theme.spacing(5),
  paddingTop: theme.spacing(4),
  borderTop: "2px solid rgba(0, 0, 0, 0.1)",
  [theme.breakpoints.down("md")]: {
    gridTemplateColumns: "repeat(2, 1fr)",
    gap: theme.spacing(4),
  },
  [theme.breakpoints.down("sm")]: {
    gridTemplateColumns: "1fr",
    gap: theme.spacing(4),
    textAlign: "center",
  },
}));

const FooterColumn = styled(Box)({});

const FooterHeading = styled(Typography)(({ theme }) => ({
  fontSize: "1.125rem",
  fontWeight: 700,
  color: "#1a1a1a",
  marginBottom: theme.spacing(2),
  textTransform: "uppercase",
  letterSpacing: "0.05em",
  [theme.breakpoints.down("sm")]: {
    fontSize: "1rem",
    marginBottom: theme.spacing(1.5),
  },
}));

const FooterText = styled(Typography)(({ theme }) => ({
  fontSize: "0.9375rem",
  color: "#1a1a1a",
  lineHeight: 1.6,
  [theme.breakpoints.down("sm")]: {
    fontSize: "0.875rem",
  },
}));

const FooterLink = styled(Link)(({ theme }) => ({
  fontSize: "0.9375rem",
  color: "#1a1a1a",
  textDecoration: "none",
  display: "block",
  marginBottom: theme.spacing(1),
  transition: "all 0.2s ease",
  "&:hover, &:focus": {
    color: "#000000",
    textDecoration: "underline",
    paddingLeft: theme.spacing(1),
    fontWeight: 600,
  },
  "&:focus": {
    outline: "3px solid #1a1a1a",
    outlineOffset: "2px",
  },
  [theme.breakpoints.down("sm")]: {
    fontSize: "0.875rem",
  },
}));

const SocialIcon = styled("a")(({ theme }) => ({
  width: "44px",
  height: "44px",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  backgroundColor: "#1a1a1a",
  color: "#ffffff",
  borderRadius: "50%",
  cursor: "pointer",
  transition: "all 0.3s ease",
  boxShadow: "0 2px 8px rgba(0, 0, 0, 0.2)",
  "&:hover, &:focus": {
    backgroundColor: "#000000",
    transform: "translateY(-4px)",
    boxShadow: "0 4px 12px rgba(0, 0, 0, 0.3)",
  },
  "&:focus": {
    outline: "3px solid #1a1a1a",
    outlineOffset: "2px",
  },
  [theme.breakpoints.down("sm")]: {
    width: "40px",
    height: "40px",
  },
}));

const LogoSection = styled(Box)(({ theme }) => ({
  display: "flex",
  alignItems: "flex-start",
  gap: theme.spacing(2),
  [theme.breakpoints.down("sm")]: {
    flexDirection: "column",
    alignItems: "center",
    textAlign: "center",
  },
}));

const ContactItem = styled(Box)(({ theme }) => ({
  display: "flex",
  alignItems: "flex-start",
  gap: theme.spacing(1),
  marginBottom: theme.spacing(1.5),
  color: "#1a1a1a",
}));

const CopyrightBar = styled(Box)(({ theme }) => ({
  backgroundColor: "#004c91",
  padding: theme.spacing(3, 0),
  marginTop: theme.spacing(4),
  [theme.breakpoints.down("sm")]: {
    padding: theme.spacing(2, 0),
  },
}));

const BottomLinks = styled(Box)(({ theme }) => ({
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
  gap: theme.spacing(3),
  marginBottom: theme.spacing(1.5),
  flexWrap: "wrap",
  [theme.breakpoints.down("sm")]: {
    gap: theme.spacing(2),
    marginBottom: theme.spacing(1),
  },
}));

const BottomLink = styled(Link)(({ theme }) => ({
  color: "#ffffff",
  fontSize: "0.875rem",
  textDecoration: "none",
  transition: "all 0.2s ease",
  "&:hover, &:focus": {
    color: "#ffffff",
    textDecoration: "underline",
  },
  "&:focus": {
    outline: "3px solid #ffffff",
    outlineOffset: "2px",
  },
  [theme.breakpoints.down("sm")]: {
    fontSize: "0.8125rem",
  },
}));

const CopyrightText = styled(Typography)(({ theme }) => ({
  color: "#ffffff",
  fontSize: "0.875rem",
  textAlign: "center",
  [theme.breakpoints.down("sm")]: {
    fontSize: "0.8125rem",
  },
}));

export default function Footer() {
  const { t } = useTranslation();

  return (
    <FooterContainer role='contentinfo'>
      <TopSection>
        <Container maxWidth='lg' sx={{ px: { xs: 2, sm: 3, md: 4 } }}>
          {/* Social Media Section */}
          <SocialSection>
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
          </SocialSection>

          {/* Footer Links Grid */}
          <FooterGrid>
            {/* About DESN */}
            <FooterColumn>
              <FooterHeading>{t("footer_about_heading")}</FooterHeading>
              <LogoSection>
                <Box
                  component='img'
                  src={desnLogo}
                  alt='DESN Logo'
                  sx={{
                    width: { xs: 70, sm: 80 },
                    height: { xs: 70, sm: 80 },
                    objectFit: "contain",
                    borderRadius: "8px",
                    backgroundColor: "white",
                    padding: 1,
                  }}
                />
                <FooterText>{t("footer_about_text")}</FooterText>
              </LogoSection>
            </FooterColumn>

            {/* Quick Links */}
            <FooterColumn>
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
            </FooterColumn>

            {/* Contact Us */}
            <FooterColumn
              sx={{
                display: "flex",
                flexDirection: "column",
                alignItems: { xs: "center", sm: "flex-start" },
              }}
            >
              <FooterHeading>{t("footer_contact_heading")}</FooterHeading>
              <ContactItem>
                <LocationOnIcon
                  sx={{ fontSize: "1.25rem", mt: 0.25, flexShrink: 0 }}
                  aria-label={t("contact_labels.location")}
                />
                <FooterText>{t("footer_contact_location")}</FooterText>
              </ContactItem>
              <ContactItem>
                <PhoneIcon
                  sx={{ fontSize: "1.25rem", flexShrink: 0 }}
                  aria-label={t("contact_labels.phone")}
                />
                <FooterLink
                  to='tel:+97715709205'
                  sx={{ display: "inline", marginBottom: 0 }}
                  aria-label={`${t("contact_labels.phone")}: ${t(
                    "footer_contact_phone"
                  )}`}
                >
                  {t("footer_contact_phone")}
                </FooterLink>
              </ContactItem>
              <ContactItem>
                <EmailIcon
                  sx={{ fontSize: "1.25rem", flexShrink: 0 }}
                  aria-label={t("contact_labels.email")}
                />
                <FooterLink
                  to='mailto:disabilityemp@gmail.com'
                  sx={{ display: "inline", marginBottom: 0 }}
                  aria-label={`${t(
                    "contact_labels.email"
                  )}: disabilityemp@gmail.com`}
                >
                  disabilityemp@gmail.com
                </FooterLink>
              </ContactItem>
            </FooterColumn>
          </FooterGrid>
        </Container>
      </TopSection>

      {/* Copyright Bar */}
      <CopyrightBar>
        <Container sx={{ px: { xs: 2, sm: 3, md: 4 } }}>
          <BottomLinks>
            <BottomLink to='/accessibility'>
              {t("footer_link_accessibility")}
            </BottomLink>
          </BottomLinks>
          <CopyrightText>{t("footer_copyright")}</CopyrightText>
        </Container>
      </CopyrightBar>
    </FooterContainer>
  );
}

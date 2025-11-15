import { Box, Button, Typography } from "@mui/material";
import { styled } from "@mui/material/styles";
import { useState } from "react";
import { useTranslation } from "react-i18next";
import DonationPaymentModal from "../payment/DonationPaymentModal";

// Full-width hero container with background image
const HeroContainer = styled("section")(({ theme }) => ({
  position: "relative",
  width: "100%",
  minHeight: "85vh",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  overflow: "hidden",
  backgroundImage: `url('/src/assets/home/nepal-hero-image.png')`,
  backgroundSize: "cover",
  backgroundPosition: "center center",
  backgroundRepeat: "no-repeat",
  [theme.breakpoints.down("md")]: {
    minHeight: "70vh",
  },
  [theme.breakpoints.down("sm")]: {
    minHeight: "60vh",
  },
  // Dark gradient overlay for text contrast
  "&::before": {
    content: '""',
    position: "absolute",
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    background:
      "linear-gradient(135deg, rgba(0, 76, 145, 0.75) 0%, rgba(0, 61, 115, 0.85) 50%, rgba(0, 0, 0, 0.7) 100%)",
    zIndex: 1,
  },
}));

// Content wrapper - centered both horizontally and vertically
const HeroContent = styled(Box)(({ theme }) => ({
  position: "relative",
  zIndex: 2,
  textAlign: "center",
  padding: theme.spacing(4),
  maxWidth: "1200px",
  margin: "0 auto",
  [theme.breakpoints.down("md")]: {
    padding: theme.spacing(3),
  },
  [theme.breakpoints.down("sm")]: {
    padding: theme.spacing(2),
  },
}));

// Massive, bold headline
const HeroHeading = styled(Typography)(({ theme }) => ({
  color: "#ffffff",
  fontSize: "4.5rem", // Desktop: 72px
  fontWeight: 800,
  lineHeight: 1.1,
  letterSpacing: "-0.03em",
  marginBottom: theme.spacing(3),
  textShadow: "0px 4px 12px rgba(0, 0, 0, 0.5)",
  [theme.breakpoints.down("lg")]: {
    fontSize: "3.5rem", // 56px
  },
  [theme.breakpoints.down("md")]: {
    fontSize: "2.75rem", // 44px
  },
  [theme.breakpoints.down("sm")]: {
    fontSize: "2rem", // 32px - mobile
    marginBottom: theme.spacing(2),
  },
}));

// Sub-headline with strong readability
const HeroSubHeading = styled(Typography)(({ theme }) => ({
  color: "#ffffff",
  fontSize: "1.75rem", // Desktop: 28px
  fontWeight: 500,
  lineHeight: 1.5,
  textShadow: "0px 2px 8px rgba(0, 0, 0, 0.4)",
  letterSpacing: "0.01em",
  maxWidth: "900px",
  margin: "0 auto",
  marginBottom: theme.spacing(5),
  [theme.breakpoints.down("md")]: {
    fontSize: "1.375rem", // 22px
    marginBottom: theme.spacing(4),
  },
  [theme.breakpoints.down("sm")]: {
    fontSize: "1.125rem", // 18px - mobile
    marginBottom: theme.spacing(3),
  },
}));

// Prominent CTA button with accent color
const HeroDonateButton = styled(Button)(({ theme }) => ({
  backgroundColor: theme.palette.warning.main, // #f6d469
  color: theme.palette.warning.contrastText, // #2b2b2b
  fontSize: "1.25rem",
  fontWeight: 700,
  textTransform: "uppercase",
  padding: theme.spacing(2.5, 6),
  borderRadius: "100px",
  boxShadow: "0px 8px 24px rgba(246, 212, 105, 0.5)",
  letterSpacing: "0.05em",
  transition: "all 0.3s ease",
  "&:hover": {
    backgroundColor: theme.palette.warning.dark, // #f5c943
    transform: "translateY(-4px) scale(1.03)",
    boxShadow: "0px 12px 32px rgba(246, 212, 105, 0.7)",
  },
  "&:active": {
    transform: "translateY(-2px) scale(1.01)",
  },
  [theme.breakpoints.down("md")]: {
    fontSize: "1.125rem",
    padding: theme.spacing(2, 5),
  },
  [theme.breakpoints.down("sm")]: {
    fontSize: "1rem",
    padding: theme.spacing(1.75, 4),
  },
}));

export default function HeroSection() {
  const { t } = useTranslation();
  const [donationModalOpen, setDonationModalOpen] = useState(false);

  return (
    <>
      <HeroContainer id='hero' aria-labelledby='hero-heading'>
        <HeroContent>
          {/* Massive Headline */}
          <HeroHeading as='h1' id='hero-heading' variant='h1' tabIndex={-1}>
            {t("hero_heading")}
          </HeroHeading>

          {/* Sub-Headline */}
          <HeroSubHeading as='p'>{t("hero_description")}</HeroSubHeading>

          {/* Primary CTA Button */}
          <HeroDonateButton
            onClick={() => setDonationModalOpen(true)}
            aria-label='Donate now to support people with disabilities in Nepal'
          >
            {t("hero_button")}
          </HeroDonateButton>
        </HeroContent>
      </HeroContainer>

      {/* Donation Modal */}
      <DonationPaymentModal
        open={donationModalOpen}
        onClose={() => setDonationModalOpen(false)}
      />
    </>
  );
}

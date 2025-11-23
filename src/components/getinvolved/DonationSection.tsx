import React from "react";
import { styled } from "@mui/material/styles";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import { useTranslation } from "react-i18next";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import PaymentIcon from "@mui/icons-material/Payment";
import donationImg from "../../assets/GetInvolved/GetInvolvedDonate.png";
import SchoolIcon from "@mui/icons-material/School";
import WorkIcon from "@mui/icons-material/Work";
import HomeWorkIcon from "@mui/icons-material/HomeWork";
import HandshakeIcon from "@mui/icons-material/Handshake";

const Section = styled(Box)(({ theme }) => ({
  padding: theme.spacing(12, 12),
  backgroundColor: "#e6f4f1",
  borderRadius: "16px",
  boxShadow: "0px 4px 20px rgba(0, 76, 145, 0.08)",
  border: "1px solid #b8e6d5",
  [theme.breakpoints.down("lg")]: {
    padding: theme.spacing(8, 4),
  },
  [theme.breakpoints.down("md")]: {
    padding: theme.spacing(6, 3),
  },
  [theme.breakpoints.down("sm")]: {
    padding: theme.spacing(4, 2),
  },
}));

const IntroContainer = styled(Box)(({ theme }) => ({
  display: "grid",
  gridTemplateColumns: "1fr 1fr",
  gap: theme.spacing(8),
  marginBottom: theme.spacing(8),
  [theme.breakpoints.down("md")]: {
    gridTemplateColumns: "1fr",
    gap: theme.spacing(4),
  },
}));

const ImageContainer = styled(Box)(({ theme }) => ({
  width: "100%",
  maxWidth: "608px",
  height: "384px",
  borderRadius: "14px",
  overflow: "hidden",
  boxShadow:
    "0px 20px 25px -5px rgba(0,0,0,0.1), 0px 8px 10px -6px rgba(0,0,0,0.1)",
  "& img": {
    width: "100%",
    height: "100%",
    objectFit: "cover",
  },
  [theme.breakpoints.down("md")]: {
    height: "300px",
  },
  [theme.breakpoints.down("sm")]: {
    height: "250px",
  },
}));

const TextContent = styled(Box)(({ theme }) => ({
  display: "flex",
  flexDirection: "column",
  gap: theme.spacing(3),
}));

const TitleBar = styled(Box)({
  width: "80px",
  height: "4px",
  backgroundColor: "#004c91",
  borderRadius: "100px",
});

const SectionTitle = styled(Typography)({
  fontSize: "32px",
  fontWeight: 400,
  color: "#004c91",
  marginTop: "20px",
  fontFamily: "'Open Sans', sans-serif",
});

const Description = styled(Typography)({
  fontSize: "20px",
  fontWeight: 400,
  color: "#364153",
  lineHeight: 1.5,
});

const BenefitsList = styled(Box)(({ theme }) => ({
  display: "flex",
  flexDirection: "column",
  gap: theme.spacing(1.5),
}));

const BenefitItem = styled(Box)(({ theme }) => ({
  display: "flex",
  alignItems: "center",
  gap: theme.spacing(2),
}));

const BenefitText = styled(Typography)({
  fontSize: "16px",
  fontWeight: 400,
  color: "#364153",
});

const ImpactBox = styled(Box)(({ theme }) => ({
  borderRadius: "16px",
  padding: theme.spacing(6, 0),
  display: "flex",
  flexDirection: "column",
  gap: theme.spacing(5),
  alignItems: "center",
}));

const ImpactTitle = styled(Typography)({
  fontSize: "36px",
  fontWeight: 400,
  color: "#004c91",
  textAlign: "center",
  fontFamily: "'Poppins', sans-serif",
});

const ImpactGrid = styled("ul")(({ theme }) => ({
  display: "grid",
  gridTemplateColumns: "repeat(3, 1fr)",
  gap: "24px",
  width: "100%",
  listStyle: "none",
  padding: 0,
  margin: 0,
  [theme.breakpoints.down("md")]: {
    gridTemplateColumns: "1fr",
  },
  [theme.breakpoints.down("sm")]: {
    gap: "16px",
  },
}));

const ImpactItem = styled("li")(({ theme }) => ({
  backgroundColor: "white",
  borderRadius: "16px",
  padding: theme.spacing(4),
  display: "flex",
  flexDirection: "column",
  alignItems: "center",
  gap: theme.spacing(2.5),
  boxShadow: "0px 4px 12px rgba(0, 76, 145, 0.1)",
  border: "2px solid transparent",
  transition: "all 0.3s ease",
  listStyle: "none",
  "&:hover": {
    borderColor: "#00a77f",
    transform: "translateY(-4px)",
    boxShadow: "0px 8px 24px rgba(0, 167, 127, 0.2)",
  },
}));

const ImpactIconCircle = styled(Box)({
  width: "80px",
  height: "80px",
  borderRadius: "50%",
  background: "linear-gradient(135deg, #004c91 0%, #00a77f 100%)",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  boxShadow: "0px 4px 16px rgba(0, 76, 145, 0.3)",
});

const ImpactAmount = styled(Typography)({
  fontSize: "24px",
  fontWeight: 600,
  color: "#004c91",
  textAlign: "center",
});

const ImpactDescription = styled(Typography)({
  fontSize: "15px",
  fontWeight: 400,
  color: "#4b5563",
  textAlign: "center",
  lineHeight: 1.5,
});

// Payment callout removed; styles retained only if needed later.

const DonateNowButton = styled("a")(({ theme }) => ({
  backgroundColor: "#f6d469",
  color: "#003d73",
  fontSize: "1rem",
  fontWeight: 700,
  padding: theme.spacing(1.5, 4),
  borderRadius: "100px",
  textTransform: "uppercase",
  letterSpacing: "0.02em",
  border: "none",
  cursor: "pointer",
  textDecoration: "none",
  transition: "all 0.3s cubic-bezier(0.4, 0, 0.2, 1)",
  marginTop: theme.spacing(2),
  display: "inline-flex",
  alignItems: "center",
  justifyContent: "center",
  gap: theme.spacing(1),
  "&:hover": {
    backgroundColor: "#004c91",
    color: "#ffffff",
  },
  "&:focus": {
    outline: "3px solid #004c91",
    outlineOffset: "2px",
    backgroundColor: "#004c91",
    color: "white",
  },
  [theme.breakpoints.down("sm")]: {
    padding: theme.spacing(1.25, 3),
    fontSize: "0.875rem",
  },
}));

const DonationSection: React.FC = () => {
  const { t } = useTranslation(["get_involved", "footer"]);

  const benefits = [
    t("get_involved.donation.benefits.impact"),
    t("get_involved.donation.benefits.programs"),
    t("get_involved.donation.benefits.receipt"),
  ];

  const impactExamples = [
    {
      icon: <SchoolIcon sx={{ fontSize: 40, color: "white" }} />,
      amount: t("get_involved.donation.impact.education.amount"),
      description: t("get_involved.donation.impact.education.description"),
    },
    {
      icon: <WorkIcon sx={{ fontSize: 40, color: "white" }} />,
      amount: t("get_involved.donation.impact.training.amount"),
      description: t("get_involved.donation.impact.training.description"),
    },
    {
      icon: <HomeWorkIcon sx={{ fontSize: 40, color: "white" }} />,
      amount: t("get_involved.donation.impact.accessibility.amount"),
      description: t("get_involved.donation.impact.accessibility.description"),
    },
  ];

  return (
    <Section
      id='donate-section'
      role='region'
      aria-labelledby='donate-section-title'
    >
      <IntroContainer>
        <ImageContainer>
          <img src={donationImg} alt={t("get_involved.donation.image_alt")} />
        </ImageContainer>
        <TextContent>
          <Box sx={{ position: "relative" }}>
            <HandshakeIcon sx={{ fontSize: 48, color: "#004c91", mb: 2 }} />
            <TitleBar />
          </Box>
          <SectionTitle as='h2' id='donate-section-title'>
            {t("get_involved.donation.title")}
          </SectionTitle>
          <Description>{t("get_involved.donation.description")}</Description>
          <BenefitsList>
            {benefits.map((benefit, index) => (
              <BenefitItem key={index}>
                <CheckCircleIcon sx={{ color: "#00a77f", fontSize: 24 }} />
                <BenefitText>{benefit}</BenefitText>
              </BenefitItem>
            ))}
          </BenefitsList>
          <DonateNowButton
            href='https://www.paypal.com/us/home'
            target='_blank'
            rel='noopener noreferrer'
            aria-label={t("get_involved.donation.paypal_aria_label")}
          >
            <PaymentIcon sx={{ fontSize: 20 }} />
            {t("footer:footer_donate_button")}
          </DonateNowButton>
        </TextContent>
      </IntroContainer>

      {/* Secure Payment via PayPal section intentionally removed per request */}

      <ImpactBox role='region' aria-labelledby='donation-impact-title'>
        <ImpactTitle as='h3' id='donation-impact-title'>
          {t("get_involved.donation.impact.title")}
        </ImpactTitle>
        <ImpactGrid
          aria-label={t("get_involved.donation.impact_list_aria_label")}
        >
          {impactExamples.map((example, index) => (
            <ImpactItem
              key={index}
              aria-label={`${example.amount}: ${example.description}`}
            >
              <ImpactIconCircle aria-hidden='true'>
                {example.icon}
              </ImpactIconCircle>
              <ImpactAmount aria-hidden='true'>{example.amount}</ImpactAmount>
              <ImpactDescription aria-hidden='true'>
                {example.description}
              </ImpactDescription>
            </ImpactItem>
          ))}
        </ImpactGrid>
      </ImpactBox>
    </Section>
  );
};

export default DonationSection;

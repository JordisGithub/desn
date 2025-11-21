import React, { useState } from "react";
import { styled } from "@mui/material/styles";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import Alert from "@mui/material/Alert";
import Dialog from "@mui/material/Dialog";
import DialogContent from "@mui/material/DialogContent";
import IconButton from "@mui/material/IconButton";
import CloseIcon from "@mui/icons-material/Close";
import { useTranslation } from "react-i18next";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import SchoolIcon from "@mui/icons-material/School";
import GroupsIcon from "@mui/icons-material/Groups";
import ComputerIcon from "@mui/icons-material/Computer";
import EventIcon from "@mui/icons-material/Event";
import AccessTimeIcon from "@mui/icons-material/AccessTime";
import HandshakeIcon from "@mui/icons-material/Handshake";
import VolunteerForm from "./VolunteerForm";
import volunteerHeroImg from "../../assets/GetInvolved/GetInvolvedVol.png";
import educationSupportImg from "../../assets/GetInvolved/educationSupport.jpg";
import communityOutreachImg from "../../assets/GetInvolved/communityOutreach.jpg";
import techSupportImg from "../../assets/GetInvolved/techSupport.jpg";
import eventSupportImg from "../../assets/GetInvolved/eventSupport.JPG";

const Section = styled(Box)(({ theme }) => ({
  padding: "40px",
  backgroundColor: "white",
  borderRadius: "16px",
  boxShadow: "0px 4px 20px rgba(0, 76, 145, 0.08)",
  [theme.breakpoints.down("md")]: {
    padding: "32px",
  },
  [theme.breakpoints.down("sm")]: {
    padding: "24px 16px",
  },
}));

const CTAButton = styled(Button)({
  backgroundColor: "#008766",
  color: "#ffffff",
  fontSize: "16px",
  fontWeight: 600,
  padding: "12px 40px",
  borderRadius: "10px",
  textTransform: "none",
  marginTop: "20px",
  letterSpacing: "0.02em",
  boxShadow: "none",
  "&:hover": {
    backgroundColor: "#006f54",
    boxShadow: "0 4px 12px rgba(0, 135, 102, 0.3)",
    transition: "all 0.2s ease",
  },
  "&:focus": {
    outline: "3px solid #004c91",
    outlineOffset: "2px",
    backgroundColor: "#006f54",
    transition: "none",
  },
  "&:focus-visible": {
    outline: "3px solid #004c91",
    outlineOffset: "2px",
    backgroundColor: "#006f54",
    transition: "none",
  },
});

const IntroContainer = styled(Box)(({ theme }) => ({
  display: "grid",
  gridTemplateColumns: "608px 608px",
  gap: theme.spacing(8),
  marginBottom: theme.spacing(8),
  justifyContent: "center",
  alignItems: "center",
  [theme.breakpoints.down("lg")]: {
    gridTemplateColumns: "1fr 1fr",
    gap: theme.spacing(6),
  },
  [theme.breakpoints.down("md")]: {
    gridTemplateColumns: "1fr",
    gap: theme.spacing(4),
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
  backgroundColor: "#00a77f",
  borderRadius: "100px",
});

const SectionTitle = styled(Typography)(({ theme }) => ({
  fontSize: "32px",
  fontWeight: 400,
  color: "#004c91",
  marginTop: "20px",
  fontFamily: "'Open Sans', sans-serif",
  [theme.breakpoints.down("sm")]: {
    fontSize: "24px",
  },
}));

const Description = styled(Typography)(({ theme }) => ({
  fontSize: "18px",
  fontWeight: 400,
  color: "#364153",
  lineHeight: 1.5,
  [theme.breakpoints.down("sm")]: {
    fontSize: "16px",
  },
}));

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
  fontSize: "18px",
  fontWeight: 400,
  color: "#364153",
});

const ImageContainer = styled(Box)(({ theme }) => ({
  width: "608px",
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
  [theme.breakpoints.down("lg")]: {
    width: "100%",
    maxWidth: "608px",
    height: "auto",
    aspectRatio: "608/384",
  },
  [theme.breakpoints.down("md")]: {
    maxWidth: "100%",
  },
}));

const OpportunitiesGrid = styled("ul")(({ theme }) => ({
  display: "grid",
  gridTemplateColumns: "repeat(4, 1fr)",
  gap: "24px",
  marginBottom: "64px",
  justifyContent: "center",
  listStyle: "none",
  padding: 0,
  margin: "0 0 64px 0",
  [theme.breakpoints.down("lg")]: {
    gridTemplateColumns: "repeat(2, 1fr)",
  },
  [theme.breakpoints.down("sm")]: {
    gridTemplateColumns: "1fr",
    gap: "20px",
    marginBottom: "48px",
  },
}));

const OpportunityCard = styled("li")(({ theme }) => ({
  border: "1px solid #e5e7eb",
  borderRadius: "14px",
  overflow: "hidden",
  display: "flex",
  flexDirection: "column",
  gap: theme.spacing(2),
  listStyle: "none",
}));

const CardImage = styled(Box)({
  width: "100%",
  height: "180px",
  overflow: "hidden",
  "& img": {
    width: "100%",
    height: "100%",
    objectFit: "cover",
  },
});

const CardContent = styled(Box)(({ theme }) => ({
  padding: theme.spacing(3),
  display: "flex",
  flexDirection: "column",
  gap: theme.spacing(2),
  flexGrow: 1,
}));

const IconBox = styled(Box)({
  width: "48px",
  height: "48px",
  borderRadius: "10px",
  backgroundColor: "rgba(0, 167, 127, 0.1)",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
});

const OpportunityTitle = styled(Typography)({
  fontSize: "20px",
  fontWeight: 400,
  color: "#004c91",
  fontFamily: "'Open Sans', sans-serif",
});

const OpportunityDescription = styled(Typography)({
  fontSize: "16px",
  fontWeight: 400,
  color: "#364153",
  lineHeight: 1.25,
  marginBottom: "auto",
});

const TimeCommitment = styled(Box)(({ theme }) => ({
  display: "flex",
  alignItems: "center",
  gap: theme.spacing(1),
}));

const TimeText = styled(Typography)({
  fontSize: "14px",
  fontWeight: 400,
  color: "#007056",
});

const VolunteerSection: React.FC = () => {
  const { t } = useTranslation();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [showSuccessMessage, setShowSuccessMessage] = useState(false);
  const successMessageRef = React.useRef<HTMLDivElement>(null);

  const benefits = [
    t("get_involved.volunteer.benefits.flexible"),
    t("get_involved.volunteer.benefits.training"),
    t("get_involved.volunteer.benefits.impact"),
  ];

  const opportunities = [
    {
      icon: (
        <SchoolIcon
          sx={{ fontSize: 24, color: "#00a77f" }}
          aria-hidden='true'
        />
      ),
      title: t("get_involved.volunteer.opportunities.education.title"),
      description: t(
        "get_involved.volunteer.opportunities.education.description"
      ),
      time: t("get_involved.volunteer.opportunities.education.time"),
      image: educationSupportImg,
      alt: "Education Support",
    },
    {
      icon: (
        <GroupsIcon
          sx={{ fontSize: 24, color: "#00a77f" }}
          aria-hidden='true'
        />
      ),
      title: t("get_involved.volunteer.opportunities.outreach.title"),
      description: t(
        "get_involved.volunteer.opportunities.outreach.description"
      ),
      time: t("get_involved.volunteer.opportunities.outreach.time"),
      image: communityOutreachImg,
      alt: "Community Outreach",
    },
    {
      icon: (
        <ComputerIcon
          sx={{ fontSize: 24, color: "#00a77f" }}
          aria-hidden='true'
        />
      ),
      title: t("get_involved.volunteer.opportunities.tech.title"),
      description: t("get_involved.volunteer.opportunities.tech.description"),
      time: t("get_involved.volunteer.opportunities.tech.time"),
      image: techSupportImg,
      alt: "Tech Training",
    },
    {
      icon: (
        <EventIcon sx={{ fontSize: 24, color: "#00a77f" }} aria-hidden='true' />
      ),
      title: t("get_involved.volunteer.opportunities.events.title"),
      description: t("get_involved.volunteer.opportunities.events.description"),
      time: t("get_involved.volunteer.opportunities.events.time"),
      image: eventSupportImg,
      alt: "Event Support",
    },
  ];

  const handleOpenModal = () => {
    setIsModalOpen(true);
    setShowSuccessMessage(false);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
  };

  const handleFormSuccess = () => {
    setIsModalOpen(false);
    setShowSuccessMessage(true);
    // Focus the success message for screen readers
    setTimeout(() => {
      successMessageRef.current?.focus();
    }, 100);
    // Auto-hide after 10 seconds
    setTimeout(() => {
      setShowSuccessMessage(false);
    }, 10000);
  };

  return (
    <Section
      id='volunteer-section'
      role='region'
      aria-labelledby='volunteer-section-title'
    >
      <IntroContainer>
        <TextContent>
          <Box sx={{ position: "relative" }}>
            <HandshakeIcon sx={{ fontSize: 48, color: "#00a77f", mb: 2 }} />
            <TitleBar />
          </Box>
          <SectionTitle as='h2' id='volunteer-section-title'>
            {t("get_involved.volunteer.title")}
          </SectionTitle>
          <Description>{t("get_involved.volunteer.description")}</Description>
          <BenefitsList>
            {benefits.map((benefit, index) => (
              <BenefitItem key={index}>
                <CheckCircleIcon sx={{ color: "#00a77f", fontSize: 24 }} />
                <BenefitText>{benefit}</BenefitText>
              </BenefitItem>
            ))}
          </BenefitsList>
          <CTAButton
            onClick={handleOpenModal}
            aria-label={t("get_involved.volunteer.open_form_aria_label")}
          >
            {t("get_involved.volunteer.form.submit")}
          </CTAButton>
        </TextContent>
        <ImageContainer>
          <img
            src={volunteerHeroImg}
            alt='Volunteers working together to support community members with disabilities'
          />
        </ImageContainer>
      </IntroContainer>

      {showSuccessMessage && (
        <Alert
          severity='success'
          role='status'
          aria-live='polite'
          aria-atomic='true'
          ref={successMessageRef}
          tabIndex={-1}
          sx={{
            mb: 4,
            maxWidth: "768px",
            margin: "0 auto 32px",
            backgroundColor: "#e8f5e9",
            border: "2px solid #2e7d32",
            borderRadius: "8px",
            "& .MuiAlert-icon": {
              color: "#2e7d32",
            },
          }}
          onClose={() => setShowSuccessMessage(false)}
        >
          <Typography
            variant='body1'
            sx={{ color: "#1b5e20", fontWeight: 600 }}
          >
            {t("get_involved.volunteer.form.success_message") ||
              "Thank you for your volunteer application! We will contact you soon."}
          </Typography>
        </Alert>
      )}

      <OpportunitiesGrid
        role='list'
        aria-label={t("get_involved.volunteer.opportunities_list_aria_label")}
      >
        {opportunities.map((opportunity, index) => (
          <OpportunityCard key={index} role='listitem'>
            <CardImage>
              <img src={opportunity.image} alt={opportunity.alt} />
            </CardImage>
            <CardContent>
              <IconBox>{opportunity.icon}</IconBox>
              <OpportunityTitle>{opportunity.title}</OpportunityTitle>
              <OpportunityDescription>
                {opportunity.description}
              </OpportunityDescription>
              <TimeCommitment>
                <AccessTimeIcon sx={{ fontSize: 16, color: "#00a77f" }} />
                <TimeText>{opportunity.time}</TimeText>
              </TimeCommitment>
            </CardContent>
          </OpportunityCard>
        ))}
      </OpportunitiesGrid>

      <Dialog
        open={isModalOpen}
        onClose={handleCloseModal}
        aria-labelledby='volunteer-dialog-title'
        aria-describedby='volunteer-dialog-desc'
        maxWidth='md'
        fullWidth
        PaperProps={{
          sx: {
            borderRadius: "16px",
            maxWidth: "900px",
          },
        }}
      >
        <IconButton
          onClick={handleCloseModal}
          sx={{
            position: "absolute",
            right: 16,
            top: 16,
            color: "#4b5563",
            backgroundColor: "rgba(255, 255, 255, 0.9)",
            zIndex: 1,
            transition: "all 0.2s ease",
            "&:hover": {
              backgroundColor: "#f3f4f6",
              color: "#1f2937",
              transform: "scale(1.05)",
            },
            "&:focus": {
              outline: "3px solid #f6d469",
              outlineOffset: "2px",
              backgroundColor: "#f3f4f6",
              color: "#1f2937",
            },
            "&:focus-visible": {
              outline: "3px solid #f6d469",
              outlineOffset: "2px",
              backgroundColor: "#f3f4f6",
              color: "#1f2937",
            },
            "&:active": {
              transform: "scale(0.95)",
              backgroundColor: "#e5e7eb",
            },
          }}
          aria-label={t("aria.close")}
        >
          <CloseIcon />
        </IconButton>
        <DialogContent sx={{ p: 0 }}>
          <VolunteerForm
            onSuccess={handleFormSuccess}
            dialogDescId='volunteer-dialog-desc'
            dialogTitleId='volunteer-dialog-title'
          />
        </DialogContent>
      </Dialog>
    </Section>
  );
};

export default VolunteerSection;

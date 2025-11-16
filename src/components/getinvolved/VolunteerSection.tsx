import React, { useState } from "react";
import { styled } from "@mui/material/styles";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
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
import educationSupportImg from "../../assets/GetInvolved/educationSupport.jpg";
import communityOutreachImg from "../../assets/GetInvolved/communityOutreach.jpg";
import techSupportImg from "../../assets/GetInvolved/techSupport.jpg";
import eventSupportImg from "../../assets/GetInvolved/eventSupport.JPG";

const Section = styled(Box)(({ theme }) => ({
  padding: "40px",
  backgroundColor: "white",
  borderRadius: "16px",
  boxShadow: "0px 4px 20px rgba(0, 76, 145, 0.08)",
}));

const CTAButton = styled(Button)(({ theme }) => ({
  backgroundColor: "#00a77f",
  color: "white",
  fontSize: "18px",
  fontWeight: 700,
  padding: theme.spacing(2, 5),
  borderRadius: "12px",
  textTransform: "none",
  marginTop: theme.spacing(3),
  maxWidth: "280px",
  boxShadow: "0px 6px 20px rgba(0, 167, 127, 0.4)",
  transition: "all 0.3s cubic-bezier(0.4, 0, 0.2, 1)",
  "&:hover": {
    backgroundColor: "#008f6c",
    transform: "translateY(-3px) scale(1.02)",
    boxShadow: "0px 10px 28px rgba(0, 167, 127, 0.5)",
  },
}));

const IntroContainer = styled(Box)(({ theme }) => ({
  display: "grid",
  gridTemplateColumns: "608px 608px",
  gap: theme.spacing(8),
  marginBottom: theme.spacing(8),
  justifyContent: "center",
  alignItems: "center",
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

const SectionTitle = styled(Typography)({
  fontSize: "32px",
  fontWeight: 400,
  color: "#004c91",
  marginTop: "20px",
  fontFamily: "'Open Sans', sans-serif",
});

const Description = styled(Typography)({
  fontSize: "18px",
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
  fontSize: "18px",
  fontWeight: 400,
  color: "#364153",
});

const ImageContainer = styled(Box)({
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
});

const OpportunitiesGrid = styled(Box)({
  display: "grid",
  gridTemplateColumns: "repeat(4, 1fr)",
  gap: "24px",
  marginBottom: "64px",
  justifyContent: "center",
});

const OpportunityCard = styled(Box)(({ theme }) => ({
  border: "1px solid #e5e7eb",
  borderRadius: "14px",
  overflow: "hidden",
  display: "flex",
  flexDirection: "column",
  gap: theme.spacing(2),
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
  color: "#00a77f",
});

const VolunteerSection: React.FC = () => {
  const { t } = useTranslation();
  const [isModalOpen, setIsModalOpen] = useState(false);

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
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
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
            aria-label='Apply to volunteer - opens application form'
          >
            Apply to Volunteer
          </CTAButton>
        </TextContent>
        <ImageContainer>
          <img
            src='https://www.figma.com/api/mcp/asset/30f6bda9-4ead-4541-9913-f64164737fe8'
            alt='Volunteers working together to support community members with disabilities'
          />
        </ImageContainer>
      </IntroContainer>

      <OpportunitiesGrid role='list' aria-label='Volunteer opportunities'>
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
            color: "#6b7280",
            zIndex: 1,
          }}
          aria-label='close'
        >
          <CloseIcon />
        </IconButton>
        <DialogContent sx={{ p: 0 }}>
          <VolunteerForm
            onSuccess={handleCloseModal}
            dialogDescId='volunteer-dialog-desc'
            dialogTitleId='volunteer-dialog-title'
          />
        </DialogContent>
      </Dialog>
    </Section>
  );
};

export default VolunteerSection;

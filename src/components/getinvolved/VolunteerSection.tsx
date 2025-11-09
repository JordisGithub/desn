import React from "react";
import { styled } from "@mui/material/styles";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import { useTranslation } from "react-i18next";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import SchoolIcon from "@mui/icons-material/School";
import GroupsIcon from "@mui/icons-material/Groups";
import ComputerIcon from "@mui/icons-material/Computer";
import EventIcon from "@mui/icons-material/Event";
import AccessTimeIcon from "@mui/icons-material/AccessTime";
import HandshakeIcon from "@mui/icons-material/Handshake";

const Section = styled(Box)(({ theme }) => ({
  padding: theme.spacing(12, 12),
  backgroundColor: "white",
}));

const IntroContainer = styled(Box)(({ theme }) => ({
  display: "grid",
  gridTemplateColumns: "608px 608px",
  gap: theme.spacing(8),
  marginBottom: theme.spacing(8),
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
});

const OpportunityCard = styled(Box)(({ theme }) => ({
  border: "1px solid #e5e7eb",
  borderRadius: "14px",
  padding: theme.spacing(3),
  display: "flex",
  flexDirection: "column",
  gap: theme.spacing(2),
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

  const benefits = [
    t("get_involved.volunteer.benefits.flexible"),
    t("get_involved.volunteer.benefits.training"),
    t("get_involved.volunteer.benefits.impact"),
  ];

  const opportunities = [
    {
      icon: <SchoolIcon sx={{ fontSize: 24, color: "#00a77f" }} />,
      title: t("get_involved.volunteer.opportunities.education.title"),
      description: t(
        "get_involved.volunteer.opportunities.education.description"
      ),
      time: t("get_involved.volunteer.opportunities.education.time"),
    },
    {
      icon: <GroupsIcon sx={{ fontSize: 24, color: "#00a77f" }} />,
      title: t("get_involved.volunteer.opportunities.outreach.title"),
      description: t(
        "get_involved.volunteer.opportunities.outreach.description"
      ),
      time: t("get_involved.volunteer.opportunities.outreach.time"),
    },
    {
      icon: <ComputerIcon sx={{ fontSize: 24, color: "#00a77f" }} />,
      title: t("get_involved.volunteer.opportunities.tech.title"),
      description: t("get_involved.volunteer.opportunities.tech.description"),
      time: t("get_involved.volunteer.opportunities.tech.time"),
    },
    {
      icon: <EventIcon sx={{ fontSize: 24, color: "#00a77f" }} />,
      title: t("get_involved.volunteer.opportunities.events.title"),
      description: t("get_involved.volunteer.opportunities.events.description"),
      time: t("get_involved.volunteer.opportunities.events.time"),
    },
  ];

  return (
    <Section>
      <IntroContainer>
        <TextContent>
          <Box sx={{ position: "relative" }}>
            <HandshakeIcon sx={{ fontSize: 48, color: "#00a77f", mb: 2 }} />
            <TitleBar />
          </Box>
          <SectionTitle>{t("get_involved.volunteer.title")}</SectionTitle>
          <Description>{t("get_involved.volunteer.description")}</Description>
          <BenefitsList>
            {benefits.map((benefit, index) => (
              <BenefitItem key={index}>
                <CheckCircleIcon sx={{ color: "#00a77f", fontSize: 20 }} />
                <BenefitText>{benefit}</BenefitText>
              </BenefitItem>
            ))}
          </BenefitsList>
        </TextContent>
        <ImageContainer>
          <img
            src='https://www.figma.com/api/mcp/asset/30f6bda9-4ead-4541-9913-f64164737fe8'
            alt='Volunteers'
          />
        </ImageContainer>
      </IntroContainer>

      <OpportunitiesGrid>
        {opportunities.map((opportunity, index) => (
          <OpportunityCard key={index}>
            <IconBox>{opportunity.icon}</IconBox>
            <OpportunityTitle>{opportunity.title}</OpportunityTitle>
            <OpportunityDescription>
              {opportunity.description}
            </OpportunityDescription>
            <TimeCommitment>
              <AccessTimeIcon sx={{ fontSize: 16, color: "#00a77f" }} />
              <TimeText>{opportunity.time}</TimeText>
            </TimeCommitment>
          </OpportunityCard>
        ))}
      </OpportunitiesGrid>
    </Section>
  );
};

export default VolunteerSection;

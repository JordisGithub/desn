import { Box, Container, Typography } from "@mui/material";
import { styled } from "@mui/material/styles";
import { useTranslation } from "react-i18next";
import AssessmentIcon from "@mui/icons-material/Assessment";
import DesignServicesIcon from "@mui/icons-material/DesignServices";
import BuildIcon from "@mui/icons-material/Build";
import InsightsIcon from "@mui/icons-material/Insights";

const ApproachSection = styled("section")({
  backgroundColor: "white",
  padding: "96px 32px",
});

const SectionHeader = styled(Box)({
  textAlign: "center",
  marginBottom: "80px",
});

const SectionTitle = styled(Typography)({
  fontSize: "48px",
  fontWeight: 400,
  lineHeight: "48px",
  color: "#004c91",
  marginBottom: "24px",
  fontFamily: "Poppins, sans-serif",
});

const SectionDescription = styled(Typography)({
  fontSize: "20px",
  fontWeight: 400,
  lineHeight: "32.5px",
  color: "#4a5565",
  maxWidth: "896px",
  margin: "0 auto",
  fontFamily: "Roboto, sans-serif",
});

const ApproachGrid = styled(Box)(({ theme }) => ({
  display: "grid",
  gridTemplateColumns: "repeat(1, 1fr)",
  gap: "40px",
  [theme.breakpoints.up("sm")]: {
    gridTemplateColumns: "repeat(2, 1fr)",
  },
  [theme.breakpoints.up("lg")]: {
    gridTemplateColumns: "repeat(4, 1fr)",
  },
}));

const ApproachCard = styled(Box)({
  backgroundColor: "white",
  border: "2px solid #f3f4f6",
  borderRadius: "16px",
  padding: "42px",
  display: "flex",
  flexDirection: "column",
  gap: "24px",
});

const IconContainer = styled(Box)<{ bgcolor: string }>(({ bgcolor }) => ({
  width: "96px",
  height: "96px",
  borderRadius: "16px",
  backgroundColor: bgcolor,
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  "& svg": {
    fontSize: "48px",
  },
}));

const StepNumber = styled(Typography)({
  fontSize: "60px",
  fontWeight: 400,
  lineHeight: "60px",
  color: "#004c91",
  opacity: 0.2,
  fontFamily: "Roboto, sans-serif",
});

const CardTitle = styled(Typography)({
  fontSize: "24px",
  fontWeight: 400,
  lineHeight: "32px",
  color: "#004c91",
  fontFamily: "Poppins, sans-serif",
});

const CardDescription = styled(Typography)({
  fontSize: "18px",
  fontWeight: 400,
  lineHeight: "29.25px",
  color: "#364153",
  fontFamily: "Roboto, sans-serif",
});

export default function OurApproach() {
  const { t } = useTranslation();

  const approaches = [
    {
      icon: <AssessmentIcon />,
      number: "01",
      title: t("programs:approach.assessment.title"),
      description: t("programs:approach.assessment.description"),
      iconBg: "rgba(0, 76, 145, 0.1)",
      iconColor: "#004c91",
    },
    {
      icon: <DesignServicesIcon />,
      number: "02",
      title: t("programs:approach.design.title"),
      description: t("programs:approach.design.description"),
      iconBg: "rgba(0, 167, 127, 0.1)",
      iconColor: "#00a77f",
    },
    {
      icon: <BuildIcon />,
      number: "03",
      title: t("programs:approach.implementation.title"),
      description: t("programs:approach.implementation.description"),
      iconBg: "rgba(150, 85, 149, 0.1)",
      iconColor: "#965595",
    },
    {
      icon: <InsightsIcon />,
      number: "04",
      title: t("programs:approach.evaluation.title"),
      description: t("programs:approach.evaluation.description"),
      iconBg: "rgba(246, 212, 105, 0.1)",
      iconColor: "#2b2b2b",
    },
  ];

  return (
    <ApproachSection aria-labelledby='our-approach-title'>
      <Container maxWidth='xl'>
        <SectionHeader>
          <SectionTitle id='our-approach-title'>
            {t("programs:approach.title")}
          </SectionTitle>
          <SectionDescription>
            {t("programs:approach.description")}
          </SectionDescription>
        </SectionHeader>
        <ApproachGrid>
          {approaches.map((approach, index) => (
            <ApproachCard key={index}>
              <IconContainer
                bgcolor={approach.iconBg}
                sx={{ color: approach.iconColor }}
              >
                {approach.icon}
              </IconContainer>
              <StepNumber>{approach.number}</StepNumber>
              <CardTitle>{approach.title}</CardTitle>
              <CardDescription>{approach.description}</CardDescription>
            </ApproachCard>
          ))}
        </ApproachGrid>
      </Container>
    </ApproachSection>
  );
}

import { Box, Container, Typography } from "@mui/material";
import { styled } from "@mui/material/styles";
import SchoolIcon from "@mui/icons-material/School";
import HealthAndSafetyIcon from "@mui/icons-material/HealthAndSafety";
import WorkIcon from "@mui/icons-material/Work";
import TrendingUpIcon from "@mui/icons-material/TrendingUp";
import GroupsIcon from "@mui/icons-material/Groups";
import { useTranslation } from "react-i18next";

const ValueSection = styled("section")(({ theme }) => ({
  background: "linear-gradient(135deg, #f8fafc 0%, #e0f2fe 50%, #f0fdf4 100%)",
  padding: theme.spacing(8, 0),
  position: "relative",
  "&::before": {
    content: '""',
    position: "absolute",
    top: 0,
    left: 0,
    right: 0,
    height: "2px",
    background: "linear-gradient(90deg, transparent, #00a77f, transparent)",
  },
  [theme.breakpoints.down("md")]: {
    padding: theme.spacing(6, 0),
  },
  [theme.breakpoints.down("sm")]: {
    padding: theme.spacing(4, 0),
  },
}));

const ContentWrapper = styled(Box)(({ theme }) => ({
  display: "grid",
  gridTemplateColumns: "1fr auto 1fr",
  gap: theme.spacing(6),
  alignItems: "center",
  [theme.breakpoints.down("md")]: {
    gridTemplateColumns: "1fr",
    gap: theme.spacing(4),
  },
}));

const ServicesColumn = styled(Box)(({ theme }) => ({
  display: "flex",
  flexDirection: "column",
  gap: theme.spacing(2.5),
}));

const SectionHeading = styled(Typography)(({ theme }) => ({
  fontSize: "1.75rem",
  fontWeight: 700,
  color: theme.palette.primary.main,
  marginBottom: theme.spacing(3),
  letterSpacing: "-0.01em",
  textAlign: "center",
  [theme.breakpoints.down("md")]: {
    fontSize: "1.5rem",
    marginBottom: theme.spacing(2),
  },
}));

const ServiceItem = styled(Box)(({ theme }) => ({
  display: "flex",
  alignItems: "center",
  gap: theme.spacing(2),
  padding: theme.spacing(2),
  backgroundColor: "rgba(255, 255, 255, 0.7)",
  borderRadius: "12px",
  backdropFilter: "blur(10px)",
  transition: "all 0.3s ease",
  border: "1px solid rgba(0, 76, 145, 0.1)",
  "&:hover": {
    transform: "translateX(8px)",
    backgroundColor: "white",
    boxShadow: "0 4px 12px rgba(0, 76, 145, 0.15)",
  },
}));

const IconWrapper = styled(Box)({
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  width: "44px",
  height: "44px",
  borderRadius: "12px",
  background: "linear-gradient(135deg, #004c91 0%, #00a77f 100%)",
  color: "#ffffff",
  flexShrink: 0,
  "& svg": {
    fontSize: "22px",
  },
});

const ServiceTitle = styled(Typography)(({ theme }) => ({
  fontSize: "1rem",
  fontWeight: 600,
  color: theme.palette.text.primary,
  lineHeight: 1.3,
  [theme.breakpoints.down("sm")]: {
    fontSize: "0.9375rem",
  },
}));

const Divider = styled(Box)(({ theme }) => ({
  width: "2px",
  height: "180px",
  background:
    "linear-gradient(180deg, transparent 0%, #00a77f 50%, transparent 100%)",
  [theme.breakpoints.down("md")]: {
    width: "100%",
    height: "2px",
    background:
      "linear-gradient(90deg, transparent 0%, #00a77f 50%, transparent 100%)",
  },
}));

const ImpactColumn = styled(Box)(({ theme }) => ({
  display: "flex",
  flexDirection: "column",
  gap: theme.spacing(2.5),
}));

const MetricCard = styled(Box)(({ theme }) => ({
  padding: theme.spacing(3),
  background: "linear-gradient(135deg, #ffffff 0%, #f0f9ff 100%)",
  borderRadius: "16px",
  textAlign: "center",
  border: "2px solid #00a77f",
  boxShadow: "0 4px 12px rgba(0, 167, 127, 0.1)",
  transition: "all 0.3s ease",
  "&:hover": {
    transform: "scale(1.05)",
    boxShadow: "0 8px 24px rgba(0, 167, 127, 0.2)",
    background: "linear-gradient(135deg, #00a77f 0%, #004c91 100%)",
    "& .metric-number": {
      color: "#ffffff",
    },
    "& .metric-label": {
      color: "#ffffff",
    },
  },
}));

const MetricNumber = styled(Typography)(({ theme }) => ({
  fontSize: "2.75rem",
  fontWeight: 800,
  color: theme.palette.secondary.main,
  lineHeight: 1,
  marginBottom: theme.spacing(0.5),
  letterSpacing: "-0.02em",
  transition: "color 0.3s ease",
  [theme.breakpoints.down("sm")]: {
    fontSize: "2.25rem",
  },
}));

const MetricLabel = styled(Typography)(({ theme }) => ({
  fontSize: "0.9375rem",
  fontWeight: 600,
  color: theme.palette.text.primary,
  lineHeight: 1.3,
  transition: "color 0.3s ease",
  [theme.breakpoints.down("sm")]: {
    fontSize: "0.875rem",
  },
}));

export default function ValuePropositionSection() {
  const { t } = useTranslation();

  const services = [
    {
      icon: <SchoolIcon />,
      title: t("value_prop_service_education"),
    },
    {
      icon: <HealthAndSafetyIcon />,
      title: t("value_prop_service_health"),
    },
    {
      icon: <WorkIcon />,
      title: t("value_prop_service_livelihood"),
    },
  ];

  const metrics = [
    {
      number: t("value_prop_metric_people_number"),
      label: t("value_prop_metric_people_label"),
      icon: <GroupsIcon />,
    },
    {
      number: t("value_prop_metric_success_number"),
      label: t("value_prop_metric_success_label"),
      icon: <TrendingUpIcon />,
    },
  ];

  return (
    <ValueSection aria-label='What we do and our impact'>
      <Container maxWidth='lg'>
        <ContentWrapper>
          {/* What We Do Section */}
          <ServicesColumn>
            <SectionHeading variant='h2' as='h2'>
              {t("value_prop_what_we_do")}
            </SectionHeading>
            {services.map((service, index) => (
              <ServiceItem key={index}>
                <IconWrapper>{service.icon}</IconWrapper>
                <ServiceTitle>{service.title}</ServiceTitle>
              </ServiceItem>
            ))}
          </ServicesColumn>

          {/* Divider */}
          <Divider />

          {/* Our Impact Section */}
          <ImpactColumn>
            <SectionHeading variant='h2' as='h2'>
              {t("value_prop_our_impact")}
            </SectionHeading>
            {metrics.map((metric, index) => (
              <MetricCard key={index}>
                <MetricNumber className='metric-number' variant='h3' as='div'>
                  {metric.number}
                </MetricNumber>
                <MetricLabel className='metric-label'>
                  {metric.label}
                </MetricLabel>
              </MetricCard>
            ))}
          </ImpactColumn>
        </ContentWrapper>
      </Container>
    </ValueSection>
  );
}

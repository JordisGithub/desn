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

const DonateLink = styled("a")(({ theme }) => ({
  display: "inline-flex",
  alignItems: "center",
  justifyContent: "center",
  padding: theme.spacing(2, 4),
  backgroundColor: "#00a77f",
  color: "#ffffff",
  fontSize: "1.125rem",
  fontWeight: 600,
  textDecoration: "none",
  borderRadius: "8px",
  transition: "all 0.3s ease",
  boxShadow: "0 4px 12px rgba(0, 167, 127, 0.3)",
  "&:hover, &:focus": {
    backgroundColor: "#008c6a",
    color: "#ffffff",
    transform: "translateY(-2px)",
    boxShadow: "0 6px 20px rgba(0, 167, 127, 0.4)",
  },
  "&:focus": {
    outline: "3px solid #00a77f",
    outlineOffset: "4px",
  },
  [theme.breakpoints.down("sm")]: {
    fontSize: "1rem",
    padding: theme.spacing(1.5, 3),
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
    <ValueSection aria-label={t("what_we_do_impact", { ns: "common" })}>
      <Container maxWidth='lg'>
        <ContentWrapper>
          {/* What We Do Section */}
          <ServicesColumn as='section' aria-labelledby='what-we-do-heading'>
            <SectionHeading variant='h2' as='h2' id='what-we-do-heading'>
              {t("value_prop_what_we_do")}
            </SectionHeading>
            <Box
              component='ul'
              sx={{
                listStyle: "none",
                padding: 0,
                margin: 0,
                display: "flex",
                flexDirection: "column",
                gap: 2.5,
              }}
            >
              {services.map((service, index) => (
                <Box component='li' key={index} sx={{ listStyle: "none" }}>
                  <ServiceItem>
                    <IconWrapper>{service.icon}</IconWrapper>
                    <ServiceTitle>{service.title}</ServiceTitle>
                  </ServiceItem>
                </Box>
              ))}
            </Box>
          </ServicesColumn>

          {/* Divider */}
          <Divider />

          {/* Our Impact Section */}
          <ImpactColumn as='section' aria-labelledby='our-impact-heading'>
            <SectionHeading variant='h2' as='h2' id='our-impact-heading'>
              {t("value_prop_our_impact")}
            </SectionHeading>
            <Box
              component='ul'
              sx={{
                listStyle: "none",
                padding: 0,
                margin: 0,
                display: "flex",
                flexDirection: "column",
                gap: 2.5,
              }}
            >
              {metrics.map((metric, index) => (
                <Box component='li' key={index} sx={{ listStyle: "none" }}>
                  <MetricCard>
                    <MetricNumber
                      className='metric-number'
                      variant='h3'
                      as='div'
                    >
                      {metric.number}
                    </MetricNumber>
                    <MetricLabel className='metric-label'>
                      {metric.label}
                    </MetricLabel>
                  </MetricCard>
                </Box>
              ))}
            </Box>
          </ImpactColumn>
        </ContentWrapper>
        
        {/* Donation Link */}
        <Box
          sx={{
            display: "flex",
            justifyContent: "center",
            mt: 6,
          }}
        >
          <DonateLink
            href="https://www.paypal.com/paypalme/thekopkrish"
            target="_blank"
            rel="noopener noreferrer"
            aria-label="Donate now to support people with disabilities in Nepal (opens in new window)"
          >
            Donate now to support people with disabilities in Nepal
          </DonateLink>
        </Box>
      </Container>
    </ValueSection>
  );
}

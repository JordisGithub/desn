import React from "react";
import { styled } from "@mui/material/styles";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import { useTranslation } from "react-i18next";

const Section = styled(Box)(({ theme }) => ({
  padding: theme.spacing(10, 12),
  backgroundColor: "white",
}));

const Container = styled(Box)(({ theme }) => ({
  display: "flex",
  flexDirection: "column",
  gap: theme.spacing(6),
  alignItems: "center",
}));

const Header = styled(Box)({
  textAlign: "center",
  marginBottom: "16px",
});

const SectionTitle = styled(Typography)({
  fontSize: "32px",
  fontWeight: 400,
  color: "#004c91",
  marginBottom: "20px",
  fontFamily: "'Open Sans', sans-serif",
});

const Description = styled(Typography)(({ theme }) => ({
  fontSize: "18px",
  fontWeight: 400,
  color: "#374151",
  lineHeight: 1.6,
  maxWidth: "900px",
  textAlign: "center",
}));

const StatsGrid = styled(Box)({
  display: "grid",
  gridTemplateColumns: "repeat(3, 1fr)",
  gap: "32px",
  width: "100%",
});

const StatCard = styled(Box)({
  backgroundColor: "white",
  background: "linear-gradient(135deg, #e5f3ff, #ffffff)",
  borderTop: "5px solid #f6d469",
  borderRadius: "16px",
  padding: "40px 32px",
  display: "flex",
  flexDirection: "column",
  gap: "16px",
  alignItems: "center",
  boxShadow: "0 24px 60px rgba(0, 0, 0, 0.48)",
  transition: "all 0.3s cubic-bezier(0.4, 0, 0.2, 1)",
  cursor: "default",
  position: "relative",
  overflow: "hidden",
  "&::before": {
    content: '""',
    position: "absolute",
    inset: 0,
    background:
      "linear-gradient(135deg, rgba(246, 212, 105, 0.05), transparent)",
    opacity: 0,
    transition: "opacity 0.3s ease",
  },
  "&:hover": {
    transform: "scale(1.06) translateY(-6px)",
    boxShadow: "0 32px 80px rgba(0, 0, 0, 0.58)",
  },
  "&:hover::before": {
    opacity: 1,
  },
});

const StatNumber = styled(Typography)({
  fontSize: "48px",
  fontWeight: 800,
  color: "var(--color-primary-dark)",
  textAlign: "center",
  transition: "all 0.3s ease",
  lineHeight: 1.1,
});

const StatLabel = styled(Typography)({
  fontSize: "16px",
  fontWeight: 400,
  color: "#374151",
  textAlign: "center",
});

const ImpactSection: React.FC = () => {
  const { t } = useTranslation();

  const stats = [
    { number: "2000+", label: t("get_involved.impact.lives_impacted") },
    { number: "45+", label: t("get_involved.impact.programs") },
    { number: "20", label: t("get_involved.impact.years_of_service") },
  ];

  return (
    <Section role='region' aria-labelledby='impact-section-title'>
      <Container>
        <Header>
          <SectionTitle as='h2' id='impact-section-title'>
            {t("get_involved.impact.title")}
          </SectionTitle>
          <Description>
            {t("get_involved.impact.subtitle")}{" "}
            {t("get_involved.impact.description")}
          </Description>
        </Header>
        <StatsGrid role='list' aria-label='Impact statistics'>
          {stats.map((stat, index) => (
            <StatCard
              key={index}
              role='listitem'
              aria-label={`${stat.number} ${stat.label}`}
            >
              <StatNumber aria-hidden='true'>{stat.number}</StatNumber>
              <StatLabel aria-hidden='true'>{stat.label}</StatLabel>
            </StatCard>
          ))}
        </StatsGrid>
      </Container>
    </Section>
  );
};

export default ImpactSection;

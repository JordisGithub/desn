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
  marginBottom: "12px",
  fontFamily: "'Open Sans', sans-serif",
});

const SectionSubtitle = styled(Typography)({
  fontSize: "18px",
  fontWeight: 400,
  color: "#4a5565",
});

const StatsGrid = styled(Box)({
  display: "grid",
  gridTemplateColumns: "repeat(4, 1fr)",
  gap: "32px",
  width: "100%",
});

const StatCard = styled(Box)({
  backgroundColor: "white",
  borderBottom: "4px solid #00a77f",
  borderRadius: "16px",
  padding: "32px 32px 4px 32px",
  display: "flex",
  flexDirection: "column",
  gap: "12px",
  alignItems: "center",
});

const StatNumber = styled(Typography)({
  fontSize: "32px",
  fontWeight: 600,
  color: "#004c91",
  textAlign: "center",
});

const StatLabel = styled(Typography)({
  fontSize: "16px",
  fontWeight: 400,
  color: "#4a5565",
  textAlign: "center",
});

const ImpactSection: React.FC = () => {
  const { t } = useTranslation();

  const stats = [
    { number: "2000+", label: t("get_involved.impact.lives_impacted") },
    { number: "150+", label: t("get_involved.impact.volunteers") },
    { number: "45+", label: t("get_involved.impact.programs") },
    { number: "20", label: t("get_involved.impact.years_of_service") },
  ];

  return (
    <Section>
      <Container>
        <Header>
          <SectionTitle>{t("get_involved.impact.title")}</SectionTitle>
          <SectionSubtitle>{t("get_involved.impact.subtitle")}</SectionSubtitle>
        </Header>
        <StatsGrid>
          {stats.map((stat, index) => (
            <StatCard key={index}>
              <StatNumber>{stat.number}</StatNumber>
              <StatLabel>{stat.label}</StatLabel>
            </StatCard>
          ))}
        </StatsGrid>
      </Container>
    </Section>
  );
};

export default ImpactSection;

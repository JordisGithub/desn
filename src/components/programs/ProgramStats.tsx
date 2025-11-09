import { Box, Container, Typography } from "@mui/material";
import { styled } from "@mui/material/styles";
import { useTranslation } from "react-i18next";
import GroupsIcon from "@mui/icons-material/Groups";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import EmojiEventsIcon from "@mui/icons-material/EmojiEvents";
import TrendingUpIcon from "@mui/icons-material/TrendingUp";

const StatsSection = styled("section")({
  backgroundColor: "white",
  padding: "96px 32px",
});

const StatsGrid = styled(Box)(({ theme }) => ({
  display: "grid",
  gridTemplateColumns: "repeat(1, 1fr)",
  gap: "48px",
  [theme.breakpoints.up("sm")]: {
    gridTemplateColumns: "repeat(2, 1fr)",
  },
  [theme.breakpoints.up("md")]: {
    gridTemplateColumns: "repeat(4, 1fr)",
  },
}));

const StatCard = styled(Box)({
  backgroundColor: "white",
  border: "2px solid #f3f4f6",
  borderRadius: "16px",
  padding: "50px",
  textAlign: "center",
  display: "flex",
  flexDirection: "column",
  alignItems: "center",
});

const IconContainer = styled(Box)<{ bgcolor: string }>(({ bgcolor }) => ({
  width: "128px",
  height: "128px",
  borderRadius: "50%",
  backgroundColor: bgcolor,
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  marginBottom: "56px",
  "& svg": {
    fontSize: "64px",
  },
}));

const StatNumber = styled(Typography)<{ color?: string }>(({ color }) => ({
  fontSize: "48px",
  fontWeight: 400,
  lineHeight: "48px",
  color: color || "#004c91",
  marginBottom: "40px",
  fontFamily: "Roboto, sans-serif",
}));

const StatLabel = styled(Typography)({
  fontSize: "20px",
  fontWeight: 400,
  lineHeight: "28px",
  color: "#4a5565",
  fontFamily: "Roboto, sans-serif",
});

export default function ProgramStats() {
  const { t } = useTranslation();

  const stats = [
    {
      icon: <GroupsIcon />,
      number: "15,000+",
      label: t("programs:stats.lives_impacted"),
      iconBg: "rgba(0, 76, 145, 0.1)",
      iconColor: "#004c91",
      numberColor: "#004c91",
    },
    {
      icon: <CheckCircleIcon />,
      number: "5",
      label: t("programs:stats.core_programs"),
      iconBg: "#ffffff",
      iconColor: "#2b2b2b",
      numberColor: "#2b2b2b",
    },
    {
      icon: <EmojiEventsIcon />,
      number: "108",
      label: t("programs:stats.projects_delivered"),
      iconBg: "#004c91",
      iconColor: "white",
      numberColor: "#2b2b2b",
    },
    {
      icon: <TrendingUpIcon />,
      number: "95%",
      label: t("programs:stats.success_rate"),
      iconBg: "rgba(246, 212, 105, 0.1)",
      iconColor: "#004c91",
      numberColor: "#004c91",
    },
  ];

  return (
    <StatsSection aria-labelledby='programs-stats-title'>
      <Container maxWidth='xl'>
        <Typography
          id='programs-stats-title'
          sx={{ position: "absolute", left: "-10000px" }}
        >
          {t("programs:stats.section_title")}
        </Typography>
        <StatsGrid>
          {stats.map((stat, index) => (
            <StatCard key={index}>
              <IconContainer
                bgcolor={stat.iconBg}
                sx={{ color: stat.iconColor }}
              >
                {stat.icon}
              </IconContainer>
              <StatNumber color={stat.numberColor}>{stat.number}</StatNumber>
              <StatLabel>{stat.label}</StatLabel>
            </StatCard>
          ))}
        </StatsGrid>
      </Container>
    </StatsSection>
  );
}

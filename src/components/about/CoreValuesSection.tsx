import { Container, Typography, Box } from "@mui/material";
import { styled } from "@mui/material/styles";
import { useTranslation } from "react-i18next";
import GroupsIcon from "@mui/icons-material/Groups";
import BalanceIcon from "@mui/icons-material/Balance";
import NatureIcon from "@mui/icons-material/Nature";
import RecyclingIcon from "@mui/icons-material/Recycling";
import IntegrationInstructionsIcon from "@mui/icons-material/IntegrationInstructions";
import VisibilityIcon from "@mui/icons-material/Visibility";

const SectionContainer = styled("section")(({ theme }) => ({
  backgroundColor: "#F0F4F8",
  paddingTop: theme.spacing(5),
  paddingBottom: theme.spacing(5),
  [theme.breakpoints.down("md")]: {
    paddingTop: theme.spacing(4),
    paddingBottom: theme.spacing(4),
  },
}));

const SectionHeading = styled(Typography)(({ theme }) => ({
  fontSize: "3rem",
  fontWeight: 700,
  color: "#004c91",
  textAlign: "center",
  letterSpacing: "0.02em",
  marginBottom: theme.spacing(1.5),
  lineHeight: 1.2,
  [theme.breakpoints.down("md")]: {
    fontSize: "2.25rem",
    letterSpacing: "0.01em",
  },
}));

const UnderlineBar = styled(Box)(({ theme }) => ({
  width: "80px",
  height: "4px",
  backgroundColor: "#00a77f",
  borderRadius: "16777200px",
  margin: "0 auto",
  marginBottom: theme.spacing(6),
}));

const ValuesGrid = styled(Box)(({ theme }) => ({
  display: "grid",
  gridTemplateColumns: "repeat(3, 1fr)",
  gap: theme.spacing(3),
  [theme.breakpoints.down("md")]: {
    gridTemplateColumns: "repeat(2, 1fr)",
  },
  [theme.breakpoints.down("sm")]: {
    gridTemplateColumns: "1fr",
  },
}));

const ValueCard = styled(Box)(({ theme }) => ({
  backgroundColor: "white",
  border: "1px solid #e5e7eb",
  borderRadius: "16px",
  padding: theme.spacing(4.5),
  display: "flex",
  flexDirection: "column",
  alignItems: "center",
  gap: theme.spacing(2.5),
  textAlign: "center",
  transition: "all 0.35s cubic-bezier(0.4, 0, 0.2, 1)",
  minHeight: "190px",
  boxShadow: "0 16px 50px rgba(0, 0, 0, 0.35) !important",
  "&:hover": {
    borderColor: "#00a77f",
    boxShadow: "0 12px 28px rgba(0, 167, 127, 0.22)",
    transform: "translateY(-6px)",
  },
  "&:focus-visible": {
    outline: "3px solid #f6d469",
    outlineOffset: "3px",
    borderColor: "#004c91",
  },
}));

const IconBox = styled(Box)({
  width: "72px",
  height: "72px",
  borderRadius: "50%",
  backgroundColor: "rgba(0, 167, 127, 0.12)",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  flexShrink: 0,
  transition: "all 0.3s ease",
});

const ValueTitle = styled(Typography)({
  fontSize: "1.125rem",
  color: "#111827",
  lineHeight: 1.4,
  fontWeight: 600,
});

export default function CoreValuesSection() {
  const { t } = useTranslation();

  const values = [
    {
      icon: <GroupsIcon sx={{ fontSize: 36, color: "#00a77f" }} />,
      title: t("about_value_1"),
    },
    {
      icon: <BalanceIcon sx={{ fontSize: 36, color: "#00a77f" }} />,
      title: t("about_value_2"),
    },
    {
      icon: <NatureIcon sx={{ fontSize: 36, color: "#00a77f" }} />,
      title: t("about_value_3"),
    },
    {
      icon: <RecyclingIcon sx={{ fontSize: 36, color: "#00a77f" }} />,
      title: t("about_value_4"),
    },
    {
      icon: (
        <IntegrationInstructionsIcon sx={{ fontSize: 36, color: "#00a77f" }} />
      ),
      title: t("about_value_5"),
    },
    {
      icon: <VisibilityIcon sx={{ fontSize: 36, color: "#00a77f" }} />,
      title: t("about_value_6"),
    },
  ];

  return (
    <SectionContainer
      role='region'
      aria-labelledby='core-values-heading'
      aria-label='Our Core Values and Principles'
    >
      <Container maxWidth='xl' sx={{ px: { xs: 2, sm: 3, md: 6 } }}>
        <SectionHeading as='h2' id='core-values-heading' tabIndex={-1}>
          {t("about_values_title")}
        </SectionHeading>
        <UnderlineBar aria-hidden='true' />

        <ValuesGrid>
          {values.map((value, index) => (
            <ValueCard
              key={index}
              tabIndex={0}
              role='article'
              aria-label={`Core value: ${value.title}`}
            >
              <IconBox aria-hidden='true'>{value.icon}</IconBox>
              <ValueTitle>{value.title}</ValueTitle>
            </ValueCard>
          ))}
        </ValuesGrid>
      </Container>
    </SectionContainer>
  );
}

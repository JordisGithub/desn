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
  backgroundColor: "white",
  paddingTop: theme.spacing(10),
  paddingBottom: theme.spacing(10),
  [theme.breakpoints.down("md")]: {
    paddingTop: theme.spacing(8),
    paddingBottom: theme.spacing(8),
  },
}));

const SectionHeading = styled(Typography)(({ theme }) => ({
  fontSize: "2.5rem",
  fontWeight: 600,
  color: "#004c91",
  textAlign: "center",
  marginBottom: theme.spacing(1),
  [theme.breakpoints.down("md")]: {
    fontSize: "2rem",
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
  borderRadius: "14px",
  padding: theme.spacing(3),
  display: "flex",
  flexDirection: "column",
  alignItems: "center",
  gap: theme.spacing(2),
  textAlign: "center",
  transition: "all 0.3s ease",
  minHeight: "160px",
  "&:hover": {
    borderColor: "#00a77f",
    boxShadow: "0 4px 12px rgba(0, 167, 127, 0.15)",
    transform: "translateY(-4px)",
  },
}));

const IconBox = styled(Box)({
  width: "56px",
  height: "56px",
  borderRadius: "50%",
  backgroundColor: "rgba(0, 167, 127, 0.1)",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  flexShrink: 0,
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
      icon: <GroupsIcon sx={{ fontSize: 28, color: "#00a77f" }} />,
      title: t("about_value_1"),
    },
    {
      icon: <BalanceIcon sx={{ fontSize: 28, color: "#00a77f" }} />,
      title: t("about_value_2"),
    },
    {
      icon: <NatureIcon sx={{ fontSize: 28, color: "#00a77f" }} />,
      title: t("about_value_3"),
    },
    {
      icon: <RecyclingIcon sx={{ fontSize: 28, color: "#00a77f" }} />,
      title: t("about_value_4"),
    },
    {
      icon: (
        <IntegrationInstructionsIcon sx={{ fontSize: 28, color: "#00a77f" }} />
      ),
      title: t("about_value_5"),
    },
    {
      icon: <VisibilityIcon sx={{ fontSize: 28, color: "#00a77f" }} />,
      title: t("about_value_6"),
    },
  ];

  return (
    <SectionContainer aria-labelledby='core-values-heading'>
      <Container maxWidth='xl' sx={{ px: { xs: 2, sm: 3, md: 6 } }}>
        <SectionHeading as='h2' id='core-values-heading'>
          {t("about_values_title")}
        </SectionHeading>
        <UnderlineBar />

        <ValuesGrid>
          {values.map((value, index) => (
            <ValueCard key={index}>
              <IconBox>{value.icon}</IconBox>
              <ValueTitle>{value.title}</ValueTitle>
            </ValueCard>
          ))}
        </ValuesGrid>
      </Container>
    </SectionContainer>
  );
}

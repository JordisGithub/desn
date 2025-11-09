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
  paddingTop: theme.spacing(8),
  paddingBottom: theme.spacing(8),
}));

const SectionTitle = styled(Typography)(({ theme }) => ({
  fontSize: "2rem",
  fontWeight: 400,
  color: "#004c91",
  marginBottom: theme.spacing(1),
}));

const UnderlineBar = styled(Box)({
  width: "109px",
  height: "4px",
  backgroundColor: "#004c91",
  borderRadius: "16777200px",
  marginBottom: "32px",
});

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
  gap: theme.spacing(2),
  minHeight: "146px",
}));

const IconBox = styled(Box)({
  width: "48px",
  height: "48px",
  borderRadius: "10px",
  backgroundColor: "rgba(0, 167, 127, 0.1)",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  flexShrink: 0,
});

const ValueTitle = styled(Typography)({
  fontSize: "1.125rem",
  color: "#004c91",
  lineHeight: 1.33,
  fontWeight: 400,
});

export default function ValuesSection() {
  const { t } = useTranslation();

  const values = [
    {
      icon: <GroupsIcon sx={{ fontSize: 24, color: "#00a77f" }} />,
      title: t("about_value_1"),
    },
    {
      icon: <BalanceIcon sx={{ fontSize: 24, color: "#00a77f" }} />,
      title: t("about_value_2"),
    },
    {
      icon: <NatureIcon sx={{ fontSize: 24, color: "#00a77f" }} />,
      title: t("about_value_3"),
    },
    {
      icon: <RecyclingIcon sx={{ fontSize: 24, color: "#00a77f" }} />,
      title: t("about_value_4"),
    },
    {
      icon: (
        <IntegrationInstructionsIcon sx={{ fontSize: 24, color: "#00a77f" }} />
      ),
      title: t("about_value_5"),
    },
    {
      icon: <VisibilityIcon sx={{ fontSize: 24, color: "#00a77f" }} />,
      title: t("about_value_6"),
    },
  ];

  return (
    <SectionContainer aria-labelledby='values-heading'>
      <Container maxWidth='lg'>
        <SectionTitle variant='h2' id='values-heading'>
          {t("about_values_title")}
        </SectionTitle>
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

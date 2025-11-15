import { Container, Typography, Box } from "@mui/material";
import { styled } from "@mui/material/styles";
import { useTranslation } from "react-i18next";

const SectionContainer = styled("section")(({ theme }) => ({
  backgroundColor: "#F9FAFB",
  paddingTop: theme.spacing(14),
  paddingBottom: theme.spacing(14),
  [theme.breakpoints.down("md")]: {
    paddingTop: theme.spacing(10),
    paddingBottom: theme.spacing(10),
  },
}));

const SectionHeading = styled(Typography)(({ theme }) => ({
  fontSize: "2.75rem",
  fontWeight: 700,
  color: "#004c91",
  textAlign: "center",
  letterSpacing: "0.02em",
  marginBottom: theme.spacing(1.5),
  [theme.breakpoints.down("md")]: {
    fontSize: "2.125rem",
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

const ObjectivesGrid = styled(Box)(({ theme }) => ({
  display: "grid",
  gridTemplateColumns: "repeat(2, 1fr)",
  gap: theme.spacing(2.5),
  [theme.breakpoints.down("md")]: {
    gridTemplateColumns: "1fr",
  },
}));

const ObjectiveItem = styled(Box)(({ theme }) => ({
  backgroundColor: "white",
  border: "1px solid #e5e7eb",
  borderRadius: "12px",
  padding: theme.spacing(3.5),
  display: "flex",
  gap: theme.spacing(2.5),
  alignItems: "flex-start",
  boxShadow: "0 4px 6px rgba(0, 0, 0, 0.05)",
  transition: "all 0.3s cubic-bezier(0.4, 0, 0.2, 1)",
  "&:hover": {
    borderColor: "#00a77f",
    boxShadow: "0 8px 16px rgba(0, 167, 127, 0.15)",
    transform: "translateY(-2px)",
  },
}));

const NumberBadge = styled(Box)({
  width: "32px",
  height: "32px",
  borderRadius: "50%",
  backgroundColor: "#004c91",
  color: "white",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  fontSize: "1rem",
  fontWeight: 600,
  flexShrink: 0,
});

const ObjectiveText = styled(Typography)({
  fontSize: "1.063rem",
  color: "#374151",
  lineHeight: 1.7,
  fontWeight: 400,
});

export default function ObjectivesCleanSection() {
  const { t } = useTranslation();

  const objectives = [
    t("about_objective_1"),
    t("about_objective_2"),
    t("about_objective_3"),
    t("about_objective_4"),
    t("about_objective_5"),
    t("about_objective_6"),
    t("about_objective_7"),
    t("about_objective_8"),
    t("about_objective_9"),
  ];

  return (
    <SectionContainer aria-labelledby='objectives-heading'>
      <Container maxWidth='xl' sx={{ px: { xs: 2, sm: 3, md: 6 } }}>
        <SectionHeading as='h2' id='objectives-heading'>
          {t("about_objectives_title")}
        </SectionHeading>
        <UnderlineBar />

        <ObjectivesGrid>
          {objectives.map((objective, index) => (
            <ObjectiveItem key={index}>
              <NumberBadge>{index + 1}</NumberBadge>
              <ObjectiveText>{objective}</ObjectiveText>
            </ObjectiveItem>
          ))}
        </ObjectivesGrid>
      </Container>
    </SectionContainer>
  );
}

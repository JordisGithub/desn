import { Container, Typography, Box } from "@mui/material";
import { styled } from "@mui/material/styles";
import { useTranslation } from "react-i18next";

const SectionContainer = styled("section")(({ theme }) => ({
  backgroundColor: "#f9fafb",
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
  borderRadius: "10px",
  padding: theme.spacing(2.5),
  display: "flex",
  gap: theme.spacing(2),
  alignItems: "flex-start",
  transition: "all 0.2s ease",
  "&:hover": {
    borderColor: "#00a77f",
    boxShadow: "0 2px 8px rgba(0, 167, 127, 0.1)",
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
  lineHeight: 1.5,
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

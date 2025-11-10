import { Container, Typography, Box } from "@mui/material";
import { styled } from "@mui/material/styles";
import { useTranslation } from "react-i18next";

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
  width: "80px",
  height: "4px",
  backgroundColor: "#00a77f",
  borderRadius: "16777200px",
  marginBottom: "48px",
});

const ObjectivesList = styled("ol")(({ theme }) => ({
  display: "grid",
  gridTemplateColumns: "repeat(2, 1fr)",
  gap: theme.spacing(3),
  listStyle: "none",
  padding: 0,
  margin: 0,
  counterReset: "objective-counter",
  [theme.breakpoints.down("md")]: {
    gridTemplateColumns: "1fr",
  },
}));

const ObjectiveItem = styled("li")(({ theme }) => ({
  backgroundColor: "white",
  border: "1px solid #e5e7eb",
  borderRadius: "10px",
  padding: theme.spacing(2.5),
  display: "flex",
  gap: theme.spacing(2),
  alignItems: "flex-start",
  minHeight: "76px",
  counterIncrement: "objective-counter",
  "&::before": {
    content: "counter(objective-counter)",
    width: "32px",
    height: "32px",
    borderRadius: "50%",
    backgroundColor: "#004c91",
    color: "white",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    fontSize: "1rem",
    fontWeight: 400,
    flexShrink: 0,
  },
}));

const ObjectiveText = styled("span")({
  fontSize: "1.125rem",
  color: "#364153",
  lineHeight: 1.33,
  fontWeight: 400,
  display: "block",
});

export default function ObjectivesSection() {
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
        <SectionTitle variant='h2' id='objectives-heading'>
          {t("about_objectives_title")}
        </SectionTitle>
        <UnderlineBar />

        <ObjectivesList aria-labelledby='objectives-heading'>
          {objectives.map((objective, index) => (
            <ObjectiveItem key={index}>
              <ObjectiveText>{objective}</ObjectiveText>
            </ObjectiveItem>
          ))}
        </ObjectivesList>
      </Container>
    </SectionContainer>
  );
}

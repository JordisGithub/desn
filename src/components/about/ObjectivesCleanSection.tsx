import { Container, Typography, Box } from "@mui/material";
import { styled } from "@mui/material/styles";
import { useTranslation } from "react-i18next";

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
  lineHeight: 1.2,
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
  gap: 0,
  columnGap: theme.spacing(12),
  rowGap: 0,
  [theme.breakpoints.down("md")]: {
    gridTemplateColumns: "1fr",
    columnGap: 0,
  },
}));

const ObjectiveItem = styled(Box)(({ theme }) => ({
  display: "flex",
  gap: theme.spacing(1),
  alignItems: "flex-start",
  marginBottom: "6px !important",
  padding: "2px 0 !important",
  minHeight: "20px",
  transition: "all 0.2s ease",
  "&:focus-visible": {
    outline: "3px solid #f6d469",
    outlineOffset: "2px",
    borderRadius: "4px",
  },
}));

const NumberBadge = styled(Box)({
  minWidth: "20px !important",
  height: "20px !important",
  borderRadius: "50%",
  backgroundColor: "#e5f3ff",
  color: "#004c91",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  fontSize: "0.625rem",
  fontWeight: 700,
  flexShrink: 0,
  marginTop: "1px",
});

const ObjectiveText = styled(Typography)({
  fontSize: "0.938rem",
  color: "#1f2937",
  lineHeight: 1.35,
  fontWeight: 400,
  paddingTop: 0,
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
    <SectionContainer
      role='region'
      aria-labelledby='objectives-heading'
      aria-label='Organizational Goals and Objectives'
    >
      <Container maxWidth='xl' sx={{ px: { xs: 2, sm: 3, md: 6 } }}>
        <SectionHeading as='h2' id='objectives-heading' tabIndex={-1}>
          {t("about_objectives_title")}
        </SectionHeading>
        <UnderlineBar aria-hidden='true' />

        <ObjectivesGrid
          role='list'
          aria-label='List of organizational objectives'
        >
          {objectives.map((objective, index) => (
            <ObjectiveItem key={index} role='listitem'>
              <NumberBadge aria-hidden='true'>{index + 1}</NumberBadge>
              <ObjectiveText>{objective}</ObjectiveText>
            </ObjectiveItem>
          ))}
        </ObjectivesGrid>
      </Container>
    </SectionContainer>
  );
}

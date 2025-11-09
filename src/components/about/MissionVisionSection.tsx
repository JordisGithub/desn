import { Container, Typography, Box } from "@mui/material";
import { styled } from "@mui/material/styles";
import { useTranslation } from "react-i18next";
import VisibilityIcon from "@mui/icons-material/Visibility";
import TrackChangesIcon from "@mui/icons-material/TrackChanges";

const SectionContainer = styled("section")(({ theme }) => ({
  backgroundColor: "white",
  paddingTop: theme.spacing(8),
  paddingBottom: theme.spacing(8),
}));

const CardsGrid = styled(Box)(({ theme }) => ({
  display: "grid",
  gridTemplateColumns: "repeat(2, 1fr)",
  gap: theme.spacing(4),
  [theme.breakpoints.down("md")]: {
    gridTemplateColumns: "1fr",
  },
}));

const MissionVisionCard = styled(Box)(({ theme }) => ({
  backgroundColor: "#004c91",
  borderRadius: "16px",
  padding: theme.spacing(4),
  boxShadow:
    "0px 20px 25px -5px rgba(0,0,0,0.1), 0px 8px 10px -6px rgba(0,0,0,0.1)",
  display: "flex",
  flexDirection: "column",
  gap: theme.spacing(2),
  minHeight: "400px",
}));

const CardHeader = styled(Box)({
  display: "flex",
  gap: "12px",
  alignItems: "center",
});

const IconBox = styled(Box)({
  width: "48px",
  height: "48px",
  borderRadius: "10px",
  backgroundColor: "rgba(255, 255, 255, 0.2)",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
});

const CardTitle = styled(Typography)({
  fontSize: "2rem",
  fontWeight: 400,
  color: "white",
  lineHeight: 1.35,
});

const CardContent = styled(Typography)({
  fontSize: "1.5rem",
  fontWeight: 400,
  color: "rgba(255, 255, 255, 0.9)",
  lineHeight: 1.67,
});

export default function MissionVisionSection() {
  const { t } = useTranslation();

  return (
    <SectionContainer aria-labelledby='mission-vision-heading'>
      <Container maxWidth='lg'>
        <CardsGrid>
          {/* Vision Card */}
          <MissionVisionCard>
            <CardHeader>
              <IconBox>
                <VisibilityIcon sx={{ fontSize: 24, color: "white" }} />
              </IconBox>
              <CardTitle variant='h3'>{t("about_vision_title")}</CardTitle>
            </CardHeader>
            <CardContent>{t("about_vision_text")}</CardContent>
          </MissionVisionCard>

          {/* Mission Card */}
          <MissionVisionCard>
            <CardHeader>
              <IconBox>
                <TrackChangesIcon sx={{ fontSize: 24, color: "white" }} />
              </IconBox>
              <CardTitle variant='h3'>{t("about_mission_title")}</CardTitle>
            </CardHeader>
            <CardContent>{t("about_mission_text")}</CardContent>
          </MissionVisionCard>
        </CardsGrid>
      </Container>
    </SectionContainer>
  );
}

import { Container, Typography, Box } from "@mui/material";
import { styled } from "@mui/material/styles";
import { useTranslation } from "react-i18next";
import introImage from "../../assets/AboutUs/AboutUsIntro.jpg";

const SectionContainer = styled("section")(({ theme }) => ({
  backgroundColor: "#F0F4F8",
  paddingTop: theme.spacing(6),
  paddingBottom: theme.spacing(6),
  [theme.breakpoints.down("md")]: {
    paddingTop: theme.spacing(5),
    paddingBottom: theme.spacing(5),
  },
}));

const ThreeColumnGrid = styled(Box)(({ theme }) => ({
  display: "grid",
  gridTemplateColumns: "repeat(3, 1fr)",
  gap: theme.spacing(4),
  [theme.breakpoints.down("lg")]: {
    gridTemplateColumns: "1fr 1fr",
    "& > *:last-child": {
      gridColumn: "1 / -1",
    },
  },
  [theme.breakpoints.down("md")]: {
    gridTemplateColumns: "1fr",
    gap: theme.spacing(3),
  },
}));

const StatementBox = styled(Box)(({ theme }) => ({
  backgroundColor: "white",
  borderRadius: "16px",
  padding: theme.spacing(6),
  minHeight: "280px",
  boxShadow: "0 16px 50px rgba(0, 0, 0, 0.35) !important",
  maxWidth: "450px",
  margin: "0 auto",
  border: "1px solid #e5e7eb",
  transition: "all 0.3s ease",
  display: "flex",
  flexDirection: "column",
  "&:hover": {
    boxShadow: "0 12px 35px rgba(0, 76, 145, 0.2)",
    borderColor: "#00a77f",
    transform: "translateY(-4px)",
  },
  "&:focus-visible": {
    outline: "3px solid #f6d469",
    outlineOffset: "3px",
  },
  [theme.breakpoints.down("lg")]: {
    minHeight: "240px",
  },
  [theme.breakpoints.down("md")]: {
    minHeight: "auto",
    padding: theme.spacing(4),
  },
}));

const StatementLabel = styled(Typography)(({ theme }) => ({
  color: "#004c91",
  fontSize: "2.5rem",
  fontWeight: 700,
  marginBottom: theme.spacing(2.5),
  letterSpacing: "0.01em",
  lineHeight: 1.2,
  [theme.breakpoints.down("md")]: {
    fontSize: "1.875rem",
  },
}));

const StatementText = styled(Typography)({
  color: "#374151",
  fontSize: "1.063rem",
  fontWeight: 400,
  lineHeight: 1.8,
});

const ImageColumn = styled(Box)(({ theme }) => ({
  backgroundColor: "white",
  borderRadius: "16px",
  padding: theme.spacing(2.5),
  boxShadow: "0 16px 50px rgba(0, 0, 0, 0.35) !important",
  border: "4px solid var(--color-accent) !important",
  transition: "all 0.3s ease",
  overflow: "hidden",
  display: "flex",
  alignItems: "center",
  minHeight: "280px",
  "&:hover": {
    boxShadow: "0 16px 50px rgba(0, 76, 145, 0.3)",
    transform: "translateY(-4px)",
    "& img": {
      transform: "scale(1.02)",
    },
  },
  "&:focus-visible": {
    outline: "3px solid #f6d469",
    outlineOffset: "3px",
  },
  [theme.breakpoints.down("lg")]: {
    minHeight: "400px",
  },
  [theme.breakpoints.down("md")]: {
    minHeight: "300px",
  },
}));

const StyledImage = styled("img")({
  width: "100%",
  height: "100%",
  objectFit: "cover",
  borderRadius: "12px",
  display: "block",
  transition: "transform 0.3s ease",
});

export default function IntegratedMissionVisionSection() {
  const { t } = useTranslation();

  return (
    <SectionContainer
      role='region'
      aria-labelledby='mission-vision-heading'
      aria-label='Our Mission, Vision, and Community'
    >
      <Container maxWidth='xl' sx={{ px: { xs: 2, sm: 3, md: 6 } }}>
        <ThreeColumnGrid>
          {/* Column 1: Vision */}
          <StatementBox
            role='article'
            aria-labelledby='vision-heading'
            tabIndex={0}
          >
            <StatementLabel as='h2' id='vision-heading'>
              {t("about_vision_title")}
            </StatementLabel>
            <StatementText>{t("about_vision_text")}</StatementText>
          </StatementBox>

          {/* Column 2: Image (Center) */}
          <ImageColumn
            role='img'
            tabIndex={0}
            aria-label='Community members participating in empowerment programs'
          >
            <StyledImage
              src={introImage}
              alt="Disabled People's Self-Help Network members engaged in community activities and empowerment programs"
              loading='eager'
            />
          </ImageColumn>

          {/* Column 3: Mission */}
          <StatementBox
            role='article'
            aria-labelledby='mission-heading'
            tabIndex={0}
          >
            <StatementLabel as='h2' id='mission-heading'>
              {t("about_mission_title")}
            </StatementLabel>
            <StatementText>{t("about_mission_text")}</StatementText>
          </StatementBox>
        </ThreeColumnGrid>
      </Container>
    </SectionContainer>
  );
}

import { Container, Typography } from "@mui/material";
import { styled } from "@mui/material/styles";
import { useTranslation } from "react-i18next";
import nepalHeroImage from "../../assets/home/nepal-hero-image.png";


const HeroContainer = styled("section")(({ theme }) => ({
  backgroundColor: theme.palette.background.default,
  paddingTop: theme.spacing(6),
  paddingBottom: theme.spacing(8),
  [theme.breakpoints.down("md")]: {
    paddingTop: theme.spacing(4),
    paddingBottom: theme.spacing(6),
  },
  [theme.breakpoints.down("sm")]: {
    paddingTop: theme.spacing(3),
    paddingBottom: theme.spacing(4),
  },
}));

const HeroHeading = styled(Typography)(({ theme }) => ({
  fontSize: "2rem",
  fontWeight: 700,
  color: "#004c91",
  marginBottom: theme.spacing(3),
  lineHeight: 1.2,
  textAlign: "center",
  [theme.breakpoints.up("md")]: {
    fontSize: "3rem",
  },
}));

const HeroSubheading = styled(Typography)(({ theme }) => ({
  fontSize: "1.5rem",
  fontWeight: 600,
  color: "#004c91",
  marginBottom: theme.spacing(2),
  textAlign: "center",
  paddingLeft: theme.spacing(2),
  paddingRight: theme.spacing(2),
  [theme.breakpoints.up("md")]: {
    fontSize: "2rem",
    paddingLeft: theme.spacing(8),
    paddingRight: theme.spacing(8),
  },
}));

const HeroTagline = styled(Typography)(({ theme }) => ({
  fontSize: "1.125rem",
  fontWeight: 400,
  color: "#364153",
  marginBottom: theme.spacing(4),
  textAlign: "center",
  paddingLeft: theme.spacing(2),
  paddingRight: theme.spacing(2),
  lineHeight: 1.6,
  [theme.breakpoints.up("md")]: {
    fontSize: "1.25rem",
    paddingLeft: theme.spacing(10),
    paddingRight: theme.spacing(10),
  },
}));

const HeroImage = styled("img")(({ theme }) => ({
  width: "100%",
  maxHeight: "600px",
  objectFit: "cover",
  borderRadius: theme.spacing(2),
  marginBottom: theme.spacing(4),
  boxShadow: "0px 8px 24px rgba(0, 0, 0, 0.12)",
  transition: "transform 0.3s ease",
  [theme.breakpoints.down("md")]: {
    maxHeight: "400px",
    borderRadius: theme.spacing(1),
  },
  [theme.breakpoints.down("sm")]: {
    maxHeight: "300px",
  },
}));

const MissionStatement = styled(Typography)(({ theme }) => ({
  fontSize: "1.5rem",
  fontWeight: 500,
  color: "#004c91",
  marginBottom: theme.spacing(2),
  textAlign: "center",
  [theme.breakpoints.up("md")]: {
    fontSize: "2rem",
  },
}));

const DescriptionText = styled(Typography)(({ theme }) => ({
  fontSize: "1rem",
  color: "#364153",
  textAlign: "center",
  paddingLeft: theme.spacing(2),
  paddingRight: theme.spacing(2),
  lineHeight: 1.6,
  [theme.breakpoints.up("md")]: {
    fontSize: "1.125rem",
    paddingLeft: theme.spacing(12),
    paddingRight: theme.spacing(12),
  },
}));

export default function HeroSection() {
  const { t } = useTranslation();

  return (
    <HeroContainer aria-labelledby='hero-heading'>
      <Container maxWidth='xl' sx={{ px: { xs: 2, sm: 3, md: 6 } }}>
        <HeroHeading as='h1' id='hero-heading' variant='h2'>
          {t("hero_title")}
        </HeroHeading>
        <HeroSubheading as='p' variant='h2'>
          {t("hero_subtitle")}
        </HeroSubheading>

        <HeroTagline variant='body1'>{t("hero_tagline")}</HeroTagline>

        <HeroImage src={nepalHeroImage} alt={t("hero_alt")} />

        <MissionStatement variant='h3'>
          {t("mission_statement")}
        </MissionStatement>

        <DescriptionText variant='body1' sx={{ mb: 2 }}>
          {t("hero_description_1")}
        </DescriptionText>

        <DescriptionText variant='body1'>
          {t("hero_description_2")}
        </DescriptionText>
      </Container>
    </HeroContainer>
  );
}

import { Container, Typography } from "@mui/material";
import { styled } from "@mui/material/styles";
import { useTranslation } from "react-i18next";

const HeroContainer = styled("section")(({ theme }) => ({
  backgroundColor: theme.palette.background.default,
  paddingTop: theme.spacing(4),
  paddingBottom: theme.spacing(6),
  [theme.breakpoints.up("md")]: {
    paddingTop: theme.spacing(6),
    paddingBottom: theme.spacing(8),
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
  marginBottom: theme.spacing(4),
  textAlign: "center",
  paddingLeft: theme.spacing(2),
  paddingRight: theme.spacing(2),
  [theme.breakpoints.up("md")]: {
    fontSize: "2rem",
    paddingLeft: theme.spacing(8),
    paddingRight: theme.spacing(8),
  },
}));

const HeroImage = styled("img")(({ theme }) => ({
  width: "100%",
  maxHeight: "600px",
  objectFit: "cover",
  borderRadius: theme.spacing(2),
  marginBottom: theme.spacing(4),
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

// Image placeholder - replace with actual image
const heroImage =
  "https://images.unsplash.com/photo-1517486808906-6ca8b3f04846?w=1200";

export default function HeroSection() {
  const { t } = useTranslation();

  return (
    <HeroContainer aria-labelledby='hero-heading'>
      <Container maxWidth='lg'>
        <HeroHeading as='h1' id='hero-heading' variant='h2'>
          {t("hero_title")}
        </HeroHeading>

        <HeroSubheading as='p' variant='h2'>
          {t("hero_subtitle")}
        </HeroSubheading>

        <HeroImage src={heroImage} alt={t("hero_alt")} />

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

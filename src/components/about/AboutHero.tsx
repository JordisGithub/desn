import { Container, Typography, Box } from "@mui/material";
import { styled } from "@mui/material/styles";
import { useTranslation } from "react-i18next";
import WorkspacePremiumIcon from "@mui/icons-material/WorkspacePremium";

const HeroContainer = styled("section")({
  position: "relative",
  height: "500px",
  overflow: "hidden",
  backgroundImage:
    'url("https://images.unsplash.com/photo-1559027615-cd4628902d4a?w=1920")',
  backgroundSize: "cover",
  backgroundPosition: "center",
  "&::before": {
    content: '""',
    position: "absolute",
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    background:
      "linear-gradient(to right, rgba(0, 76, 145, 0.95), rgba(0, 76, 145, 0.7))",
    opacity: 0.98,
  },
});

const ContentWrapper = styled(Box)({
  position: "relative",
  zIndex: 1,
  height: "100%",
  display: "flex",
  flexDirection: "column",
  justifyContent: "center",
  paddingTop: "64px",
  paddingBottom: "64px",
});

const LogoCircle = styled(Box)({
  width: "64px",
  height: "64px",
  borderRadius: "50%",
  backgroundColor: "#00a77f",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  marginBottom: "24px",
});

const OrganizationName = styled(Typography)(({ theme }) => ({
  fontSize: "3rem",
  fontWeight: 400,
  color: "white",
  marginBottom: theme.spacing(3),
  lineHeight: 1.2,
  [theme.breakpoints.up("md")]: {
    fontSize: "4rem",
  },
}));

const Tagline = styled(Typography)(({ theme }) => ({
  fontSize: "1.5rem",
  fontWeight: 400,
  color: "rgba(255, 255, 255, 0.9)",
  marginBottom: theme.spacing(4),
  [theme.breakpoints.up("md")]: {
    fontSize: "2.25rem",
  },
}));

const EstablishedBadge = styled(Box)(({ theme }) => ({
  display: "inline-block",
  backgroundColor: "white",
  color: "#004c91",
  fontSize: "1.25rem",
  fontWeight: 400,
  padding: theme.spacing(1, 2),
  borderRadius: "10px",
  border: "1px solid rgba(255, 255, 255, 0.2)",
}));

export default function AboutHero() {
  const { t } = useTranslation();

  return (
    <HeroContainer aria-labelledby='about-hero-heading'>
      <Container maxWidth='lg'>
        <ContentWrapper>
          <Box display='flex' alignItems='center' gap='12px' mb={3}>
            <LogoCircle>
              <WorkspacePremiumIcon sx={{ fontSize: 40, color: "white" }} />
            </LogoCircle>
            <OrganizationName as='h1' id='about-hero-heading'>
              {t("about_hero_org_name")}
            </OrganizationName>
          </Box>
          <Tagline>{t("about_hero_tagline")}</Tagline>
          <EstablishedBadge>
            <Typography
              component='span'
              sx={{ fontSize: "1rem", fontWeight: 400, mr: 1 }}
            >
              {t("about_hero_established_label")}
            </Typography>
            <Typography
              component='span'
              sx={{ fontSize: "1.25rem", fontWeight: 400 }}
            >
              {t("about_hero_established_year")}
            </Typography>
          </EstablishedBadge>
        </ContentWrapper>
      </Container>
    </HeroContainer>
  );
}

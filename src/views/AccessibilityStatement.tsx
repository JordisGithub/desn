import { Container, Typography, Box, List, ListItem } from "@mui/material";
import { styled } from "@mui/material/styles";
import { useTranslation } from "react-i18next";
import { Link } from "react-router-dom";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import ShieldIcon from "@mui/icons-material/Shield";
import GroupsIcon from "@mui/icons-material/Groups";
import VolumeUpIcon from "@mui/icons-material/VolumeUp";
import LanguageIcon from "@mui/icons-material/Language";
import ContrastIcon from "@mui/icons-material/Contrast";
import KeyboardIcon from "@mui/icons-material/Keyboard";
import DevicesIcon from "@mui/icons-material/Devices";
import EmailIcon from "@mui/icons-material/Email";
import PhoneIcon from "@mui/icons-material/Phone";
import ContactPageIcon from "@mui/icons-material/ContactPage";
import VerifiedIcon from "@mui/icons-material/Verified";

// Styled Components
const PageContainer = styled(Box)({
  minHeight: "100vh",
  backgroundColor: "#ffffff",
});

const HeroSection = styled(Box)(({ theme }) => ({
  background: "linear-gradient(180deg, #004c91 0%, #004c91 50%, #00a77f 100%)",
  color: "#ffffff",
  padding: theme.spacing(16, 4),
  position: "relative",
  overflow: "hidden",
  "&::before": {
    content: '""',
    position: "absolute",
    top: "80px",
    right: "879px",
    width: "384px",
    height: "384px",
    background: "rgba(255, 255, 255, 0.05)",
    borderRadius: "50%",
    filter: "blur(100px)",
  },
  "&::after": {
    content: '""',
    position: "absolute",
    top: "62.5px",
    left: "160px",
    width: "600px",
    height: "600px",
    background: "rgba(246, 212, 105, 0.1)",
    borderRadius: "50%",
    filter: "blur(100px)",
  },
  [theme.breakpoints.down("lg")]: {
    padding: theme.spacing(12, 4),
  },
  [theme.breakpoints.down("md")]: {
    padding: theme.spacing(10, 3),
  },
  [theme.breakpoints.down("sm")]: {
    padding: theme.spacing(8, 2),
  },
}));

const HeroContent = styled(Container)({
  position: "relative",
  zIndex: 1,
});

const Badge = styled(Box)(({ theme }) => ({
  display: "inline-flex",
  alignItems: "center",
  gap: theme.spacing(1.5),
  backgroundColor: "rgba(255, 255, 255, 0.2)",
  padding: theme.spacing(1.5, 3),
  borderRadius: theme.spacing(1),
  marginBottom: theme.spacing(3),
  fontSize: "1.125rem",
  fontWeight: 500,
  [theme.breakpoints.down("sm")]: {
    fontSize: "1rem",
    padding: theme.spacing(1.25, 2.5),
    gap: theme.spacing(1),
  },
}));

const PageTitle = styled(Typography)(({ theme }) => ({
  fontSize: "3.75rem",
  fontWeight: 400,
  marginBottom: theme.spacing(3),
  lineHeight: 1.2,
  fontFamily: "Poppins, sans-serif",
  color: "#ffffff",
  [theme.breakpoints.down("lg")]: {
    fontSize: "3.25rem",
  },
  [theme.breakpoints.down("md")]: {
    fontSize: "2.75rem",
  },
  [theme.breakpoints.down("sm")]: {
    fontSize: "2rem",
  },
  [theme.breakpoints.down("xs")]: {
    fontSize: "1.75rem",
  },
}));

const PageIntro = styled(Typography)(({ theme }) => ({
  fontSize: "1.5rem",
  lineHeight: 1.5,
  marginBottom: theme.spacing(3),
  color: "rgba(255, 255, 255, 0.95)",
  maxWidth: "928px",
  [theme.breakpoints.down("md")]: {
    fontSize: "1.35rem",
  },
  [theme.breakpoints.down("sm")]: {
    fontSize: "1.125rem",
  },
}));

const LastUpdated = styled(Typography)(({ theme }) => ({
  fontSize: "1.25rem",
  color: "rgba(255, 255, 255, 0.9)",
  marginBottom: theme.spacing(5),
  "& strong": {
    fontWeight: 700,
  },
  [theme.breakpoints.down("sm")]: {
    fontSize: "1.125rem",
  },
}));

const Section = styled(Box)(({ theme }) => ({
  padding: theme.spacing(12, 4),
  [theme.breakpoints.down("lg")]: {
    padding: theme.spacing(10, 3),
  },
  [theme.breakpoints.down("md")]: {
    padding: theme.spacing(8, 2.5),
  },
  [theme.breakpoints.down("sm")]: {
    padding: theme.spacing(6, 2),
  },
}));

const SectionTitle = styled(Typography)(({ theme }) => ({
  fontSize: "3rem",
  fontWeight: 400,
  color: "#004c91",
  textAlign: "center",
  marginBottom: theme.spacing(3),
  fontFamily: "Poppins, sans-serif",
  [theme.breakpoints.down("md")]: {
    fontSize: "2.5rem",
  },
  [theme.breakpoints.down("sm")]: {
    fontSize: "2rem",
  },
}));

const SectionSubtitle = styled(Typography)(({ theme }) => ({
  fontSize: "1.25rem",
  lineHeight: 1.5,
  color: "#333333",
  textAlign: "center",
  maxWidth: "896px",
  margin: "0 auto",
  marginBottom: theme.spacing(6),
  padding: theme.spacing(0, 2),
  [theme.breakpoints.down("md")]: {
    fontSize: "1.125rem",
    marginBottom: theme.spacing(5),
  },
  [theme.breakpoints.down("sm")]: {
    fontSize: "1rem",
    marginBottom: theme.spacing(4),
  },
}));

const CommitmentCard = styled(Box)(({ theme }) => ({
  backgroundColor: "#ffffff",
  border: "2px solid #e5e7eb",
  borderRadius: theme.spacing(2),
  padding: theme.spacing(6),
  height: "100%",
  display: "flex",
  flexDirection: "column",
  gap: theme.spacing(3),
  [theme.breakpoints.down("md")]: {
    padding: theme.spacing(5),
  },
  [theme.breakpoints.down("sm")]: {
    padding: theme.spacing(4),
    gap: theme.spacing(2.5),
  },
}));

const CardIconContainer = styled(Box)(({ theme }) => ({
  width: "80px",
  height: "80px",
  borderRadius: theme.spacing(2),
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  fontSize: "2.5rem",
  [theme.breakpoints.down("sm")]: {
    width: "64px",
    height: "64px",
    fontSize: "2rem",
  },
}));

const CardTitle = styled(Typography)(({ theme }) => ({
  fontSize: "1.5rem",
  fontWeight: 400,
  color: "#004c91",
  fontFamily: "Poppins, sans-serif",
  [theme.breakpoints.down("sm")]: {
    fontSize: "1.35rem",
  },
}));

const CardText = styled(Typography)(({ theme }) => ({
  fontSize: "1.125rem",
  color: "#333333",
  lineHeight: 1.5,
  [theme.breakpoints.down("sm")]: {
    fontSize: "1rem",
  },
}));

const FeatureCard = styled(Box)(({ theme }) => ({
  backgroundColor: "#ffffff",
  border: "2px solid #e5e7eb",
  borderRadius: theme.spacing(2),
  padding: theme.spacing(5),
  height: "100%",
  display: "flex",
  flexDirection: "column",
  [theme.breakpoints.down("md")]: {
    padding: theme.spacing(4),
  },
  [theme.breakpoints.down("sm")]: {
    padding: theme.spacing(3.5),
  },
}));

const FeatureList = styled(List)(({ theme }) => ({
  marginTop: theme.spacing(2),
  "& .MuiListItem-root": {
    padding: theme.spacing(0.75, 0),
    alignItems: "flex-start",
  },
}));

const ContactCard = styled(Box)(({ theme }) => ({
  backgroundColor: "#ffffff",
  border: "2px solid #e5e7eb",
  borderRadius: theme.spacing(2),
  padding: theme.spacing(5),
  height: "100%",
  display: "flex",
  flexDirection: "column",
  alignItems: "center",
  textAlign: "center",
  gap: theme.spacing(3),
  [theme.breakpoints.down("sm")]: {
    padding: theme.spacing(4),
    gap: theme.spacing(2.5),
  },
}));

const ContactIconContainer = styled(Box)(({ theme }) => ({
  width: "80px",
  height: "80px",
  borderRadius: theme.spacing(2),
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  fontSize: "2.5rem",
  [theme.breakpoints.down("sm")]: {
    width: "64px",
    height: "64px",
    fontSize: "2rem",
  },
}));

const ContactTitle = styled(Typography)(({ theme }) => ({
  fontSize: "1.5rem",
  fontWeight: 400,
  color: "#004c91",
  fontFamily: "Poppins, sans-serif",
  [theme.breakpoints.down("sm")]: {
    fontSize: "1.35rem",
  },
}));

const ContactSubtitle = styled(Typography)(({ theme }) => ({
  fontSize: "1.125rem",
  color: "#333333",
  [theme.breakpoints.down("sm")]: {
    fontSize: "1rem",
  },
}));

const ContactLink = styled(Typography)(({ theme }) => ({
  fontSize: "1.125rem",
  color: "#008060",
  fontWeight: 500,
  [theme.breakpoints.down("sm")]: {
    fontSize: "1rem",
  },
}));

const InfoBox = styled(Box)(({ theme }) => ({
  backgroundColor: "rgba(0, 76, 145, 0.05)",
  border: "2px solid rgba(0, 76, 145, 0.2)",
  borderRadius: theme.spacing(2),
  padding: theme.spacing(5),
  display: "flex",
  gap: theme.spacing(3),
  marginTop: theme.spacing(6),
  alignItems: "flex-start",
  [theme.breakpoints.down("md")]: {
    padding: theme.spacing(4),
    gap: theme.spacing(2.5),
  },
  [theme.breakpoints.down("sm")]: {
    flexDirection: "column",
    padding: theme.spacing(3),
    gap: theme.spacing(2),
    alignItems: "center",
    textAlign: "center",
  },
}));

const SkipLink = styled("a")(({ theme }) => ({
  position: "absolute",
  top: "-40px",
  left: 0,
  background: "#004c91",
  color: "white",
  padding: "8px 16px",
  textDecoration: "none",
  zIndex: 9999,
  fontSize: "1rem",
  fontWeight: 500,
  borderRadius: "0 0 4px 0",
  "&:focus": {
    top: 0,
  },
  [theme.breakpoints.down("sm")]: {
    fontSize: "0.875rem",
    padding: "6px 12px",
  },
}));

export default function AccessibilityStatement() {
  const { t } = useTranslation("accessibility");

  return (
    <PageContainer>
      <SkipLink href='#main-content' aria-label={t("skip_to_content")}>
        {t("skip_to_content")}
      </SkipLink>

      {/* Hero Section */}
      <HeroSection>
        <HeroContent>
          <Badge>
            <VerifiedIcon sx={{ fontSize: "0.75rem" }} />
            {t("wcag_badge")}
          </Badge>
          <PageTitle variant='h1'>{t("accessibility_title")}</PageTitle>
          <PageIntro>{t("accessibility_intro")}</PageIntro>
          <LastUpdated>
            <strong>{t("last_updated_label")}</strong> {t("last_updated_date")}
          </LastUpdated>
        </HeroContent>
      </HeroSection>

      {/* Commitment Section */}
      <Section sx={{ backgroundColor: "#ffffff" }}>
        <Container maxWidth='xl' sx={{ px: { xs: 2, sm: 3, md: 6 } }}>
          <SectionTitle variant='h2'>
            {t("commitment_section_title")}
          </SectionTitle>
          <SectionSubtitle>{t("commitment_section_subtitle")}</SectionSubtitle>

          <Box
            sx={{
              display: "grid",
              gridTemplateColumns: { xs: "1fr", md: "1fr 1fr" },
              gap: { xs: 3, sm: 4, md: 6 },
            }}
          >
            <CommitmentCard>
              <CardIconContainer
                sx={{ backgroundColor: "rgba(0, 76, 145, 0.1)" }}
              >
                <ShieldIcon sx={{ fontSize: "2.5rem", color: "#004c91" }} />
              </CardIconContainer>
              <Box>
                <CardTitle>{t("standards_title")}</CardTitle>
                <CardText sx={{ mt: 2, mb: 3 }}>{t("standards_text")}</CardText>
                <FeatureList disablePadding>
                  <ListItem>
                    <CheckCircleIcon
                      sx={{
                        color: "#00a77f",
                        mr: 1.5,
                        fontSize: "1.25rem",
                        mt: 0.25,
                      }}
                    />
                    <Typography
                      sx={{
                        fontSize: "1rem",
                        lineHeight: 1.5,
                        color: "#333333",
                      }}
                    >
                      {t("standards_item_1")}
                    </Typography>
                  </ListItem>
                  <ListItem>
                    <CheckCircleIcon
                      sx={{
                        color: "#00a77f",
                        mr: 1.5,
                        fontSize: "1.25rem",
                        mt: 0.25,
                      }}
                    />
                    <Typography
                      sx={{
                        fontSize: "1rem",
                        lineHeight: 1.5,
                        color: "#333333",
                      }}
                    >
                      {t("standards_item_2")}
                    </Typography>
                  </ListItem>
                  <ListItem>
                    <CheckCircleIcon
                      sx={{
                        color: "#00a77f",
                        mr: 1.5,
                        fontSize: "1.25rem",
                        mt: 0.25,
                      }}
                    />
                    <Typography
                      sx={{
                        fontSize: "1rem",
                        lineHeight: 1.5,
                        color: "#333333",
                      }}
                    >
                      {t("standards_item_3")}
                    </Typography>
                  </ListItem>
                  <ListItem>
                    <CheckCircleIcon
                      sx={{
                        color: "#00a77f",
                        mr: 1.5,
                        fontSize: "1.25rem",
                        mt: 0.25,
                      }}
                    />
                    <Typography
                      sx={{
                        fontSize: "1rem",
                        lineHeight: 1.5,
                        color: "#333333",
                      }}
                    >
                      {t("standards_item_4")}
                    </Typography>
                  </ListItem>
                </FeatureList>
              </Box>
            </CommitmentCard>

            <CommitmentCard>
              <CardIconContainer
                sx={{ backgroundColor: "rgba(0, 167, 127, 0.1)" }}
              >
                <GroupsIcon sx={{ fontSize: "2.5rem", color: "#00a77f" }} />
              </CardIconContainer>
              <Box>
                <CardTitle>{t("inclusive_title")}</CardTitle>
                <CardText sx={{ mt: 2, mb: 3 }}>{t("inclusive_text")}</CardText>
                <FeatureList disablePadding>
                  <ListItem>
                    <CheckCircleIcon
                      sx={{
                        color: "#00a77f",
                        mr: 1.5,
                        fontSize: "1.25rem",
                        mt: 0.25,
                      }}
                    />
                    <Typography
                      sx={{
                        fontSize: "1rem",
                        lineHeight: 1.5,
                        color: "#333333",
                      }}
                    >
                      {t("inclusive_item_1")}
                    </Typography>
                  </ListItem>
                  <ListItem>
                    <CheckCircleIcon
                      sx={{
                        color: "#00a77f",
                        mr: 1.5,
                        fontSize: "1.25rem",
                        mt: 0.25,
                      }}
                    />
                    <Typography
                      sx={{
                        fontSize: "1rem",
                        lineHeight: 1.5,
                        color: "#333333",
                      }}
                    >
                      {t("inclusive_item_2")}
                    </Typography>
                  </ListItem>
                  <ListItem>
                    <CheckCircleIcon
                      sx={{
                        color: "#00a77f",
                        mr: 1.5,
                        fontSize: "1.25rem",
                        mt: 0.25,
                      }}
                    />
                    <Typography
                      sx={{
                        fontSize: "1rem",
                        lineHeight: 1.5,
                        color: "#333333",
                      }}
                    >
                      {t("inclusive_item_3")}
                    </Typography>
                  </ListItem>
                  <ListItem>
                    <CheckCircleIcon
                      sx={{
                        color: "#00a77f",
                        mr: 1.5,
                        fontSize: "1.25rem",
                        mt: 0.25,
                      }}
                    />
                    <Typography
                      sx={{
                        fontSize: "1rem",
                        lineHeight: 1.5,
                        color: "#333333",
                      }}
                    >
                      {t("inclusive_item_4")}
                    </Typography>
                  </ListItem>
                </FeatureList>
              </Box>
            </CommitmentCard>
          </Box>
        </Container>
      </Section>

      {/* Features Section */}
      <Section id='features' sx={{ backgroundColor: "#f9fafb" }}>
        <Container maxWidth='xl' sx={{ px: { xs: 2, sm: 3, md: 6 } }}>
          <SectionTitle variant='h2'>
            {t("features_section_title")}
          </SectionTitle>
          <SectionSubtitle>{t("features_section_subtitle")}</SectionSubtitle>

          <Box
            sx={{
              display: "grid",
              gridTemplateColumns: {
                xs: "1fr",
                sm: "1fr 1fr",
                lg: "1fr 1fr 1fr",
              },
              gap: { xs: 3, sm: 4, md: 5, lg: 6 },
            }}
          >
            {/* Screen Reader Support */}
            <FeatureCard>
              <CardIconContainer
                sx={{ backgroundColor: "rgba(0, 76, 145, 0.1)" }}
              >
                <VolumeUpIcon sx={{ fontSize: "2.5rem", color: "#004c91" }} />
              </CardIconContainer>
              <CardTitle sx={{ mt: 2 }}>{t("screen_reader_title")}</CardTitle>
              <CardText sx={{ mt: 2, mb: 2 }}>
                {t("screen_reader_text")}
              </CardText>
              <FeatureList disablePadding>
                <ListItem>
                  <CheckCircleIcon
                    sx={{
                      color: "#00a77f",
                      mr: 1.5,
                      fontSize: "1.25rem",
                      mt: 0.25,
                    }}
                  />
                  <Typography
                    sx={{ fontSize: "1rem", lineHeight: 1.5, color: "#333333" }}
                  >
                    {t("screen_reader_item_1")}
                  </Typography>
                </ListItem>
                <ListItem>
                  <CheckCircleIcon
                    sx={{
                      color: "#00a77f",
                      mr: 1.5,
                      fontSize: "1.25rem",
                      mt: 0.25,
                    }}
                  />
                  <Typography
                    sx={{ fontSize: "1rem", lineHeight: 1.5, color: "#333333" }}
                  >
                    {t("screen_reader_item_2")}
                  </Typography>
                </ListItem>
                <ListItem>
                  <CheckCircleIcon
                    sx={{
                      color: "#00a77f",
                      mr: 1.5,
                      fontSize: "1.25rem",
                      mt: 0.25,
                    }}
                  />
                  <Typography
                    sx={{ fontSize: "1rem", lineHeight: 1.5, color: "#333333" }}
                  >
                    {t("screen_reader_item_3")}
                  </Typography>
                </ListItem>
                <ListItem>
                  <CheckCircleIcon
                    sx={{
                      color: "#00a77f",
                      mr: 1.5,
                      fontSize: "1.25rem",
                      mt: 0.25,
                    }}
                  />
                  <Typography
                    sx={{ fontSize: "1rem", lineHeight: 1.5, color: "#333333" }}
                  >
                    {t("screen_reader_item_4")}
                  </Typography>
                </ListItem>
                <ListItem>
                  <CheckCircleIcon
                    sx={{
                      color: "#00a77f",
                      mr: 1.5,
                      fontSize: "1.25rem",
                      mt: 0.25,
                    }}
                  />
                  <Typography
                    sx={{ fontSize: "1rem", lineHeight: 1.5, color: "#333333" }}
                  >
                    {t("screen_reader_item_5")}
                  </Typography>
                </ListItem>
                <ListItem>
                  <CheckCircleIcon
                    sx={{
                      color: "#00a77f",
                      mr: 1.5,
                      fontSize: "1.25rem",
                      mt: 0.25,
                    }}
                  />
                  <Typography
                    sx={{ fontSize: "1rem", lineHeight: 1.5, color: "#333333" }}
                  >
                    {t("screen_reader_item_6")}
                  </Typography>
                </ListItem>
              </FeatureList>
            </FeatureCard>

            {/* Multilingual Support */}
            <FeatureCard>
              <CardIconContainer
                sx={{ backgroundColor: "rgba(0, 167, 127, 0.1)" }}
              >
                <LanguageIcon sx={{ fontSize: "2.5rem", color: "#00a77f" }} />
              </CardIconContainer>
              <CardTitle sx={{ mt: 2 }}>{t("multilingual_title")}</CardTitle>
              <CardText sx={{ mt: 2, mb: 2 }}>
                {t("multilingual_text")}
              </CardText>
              <FeatureList disablePadding>
                <ListItem>
                  <CheckCircleIcon
                    sx={{
                      color: "#00a77f",
                      mr: 1.5,
                      fontSize: "1.25rem",
                      mt: 0.25,
                    }}
                  />
                  <Typography
                    sx={{ fontSize: "1rem", lineHeight: 1.5, color: "#333333" }}
                  >
                    {t("multilingual_item_1")}
                  </Typography>
                </ListItem>
                <ListItem>
                  <CheckCircleIcon
                    sx={{
                      color: "#00a77f",
                      mr: 1.5,
                      fontSize: "1.25rem",
                      mt: 0.25,
                    }}
                  />
                  <Typography
                    sx={{ fontSize: "1rem", lineHeight: 1.5, color: "#333333" }}
                  >
                    {t("multilingual_item_2")}
                  </Typography>
                </ListItem>
                <ListItem>
                  <CheckCircleIcon
                    sx={{
                      color: "#00a77f",
                      mr: 1.5,
                      fontSize: "1.25rem",
                      mt: 0.25,
                    }}
                  />
                  <Typography
                    sx={{ fontSize: "1rem", lineHeight: 1.5, color: "#333333" }}
                  >
                    {t("multilingual_item_3")}
                  </Typography>
                </ListItem>
                <ListItem>
                  <CheckCircleIcon
                    sx={{
                      color: "#00a77f",
                      mr: 1.5,
                      fontSize: "1.25rem",
                      mt: 0.25,
                    }}
                  />
                  <Typography
                    sx={{ fontSize: "1rem", lineHeight: 1.5, color: "#333333" }}
                  >
                    {t("multilingual_item_4")}
                  </Typography>
                </ListItem>
              </FeatureList>
            </FeatureCard>

            {/* Text Customization */}
            {/* <FeatureCard>
              <CardIconContainer
                sx={{ backgroundColor: "rgba(150, 85, 149, 0.1)" }}
              >
                <TextFieldsIcon sx={{ fontSize: "2.5rem", color: "#965595" }} />
              </CardIconContainer>
              <CardTitle sx={{ mt: 2 }}>{t("text_customization_title")}</CardTitle>
              <CardText sx={{ mt: 2, mb: 2 }}>
                {t("text_customization_text")}
              </CardText>
              <FeatureList disablePadding>
                <ListItem>
                  <CheckCircleIcon
                    sx={{
                      color: "#00a77f",
                      mr: 1.5,
                      fontSize: "1.25rem",
                      mt: 0.25,
                    }}
                  />
                  <Typography sx={{ fontSize: "1rem", lineHeight: 1.5, color: "#333333" }}>
                    {t("text_item_1")}
                  </Typography>
                </ListItem>
                <ListItem>
                  <CheckCircleIcon
                    sx={{
                      color: "#00a77f",
                      mr: 1.5,
                      fontSize: "1.25rem",
                      mt: 0.25,
                    }}
                  />
                  <Typography sx={{ fontSize: "1rem", lineHeight: 1.5, color: "#333333" }}>
                    {t("text_item_2")}
                  </Typography>
                </ListItem>
                <ListItem>
                  <CheckCircleIcon
                    sx={{
                      color: "#00a77f",
                      mr: 1.5,
                      fontSize: "1.25rem",
                      mt: 0.25,
                    }}
                  />
                  <Typography sx={{ fontSize: "1rem", lineHeight: 1.5, color: "#333333" }}>
                    {t("text_item_3")}
                  </Typography>
                </ListItem>
                <ListItem>
                  <CheckCircleIcon
                    sx={{
                      color: "#00a77f",
                      mr: 1.5,
                      fontSize: "1.25rem",
                      mt: 0.25,
                    }}
                  />
                  <Typography sx={{ fontSize: "1rem", lineHeight: 1.5, color: "#333333" }}>
                    {t("text_item_4")}
                  </Typography>
                </ListItem>
              </FeatureList>
            </FeatureCard> */}

            {/* Contrast & Colors */}
            <FeatureCard>
              <CardIconContainer
                sx={{ backgroundColor: "rgba(246, 212, 105, 0.1)" }}
              >
                <ContrastIcon sx={{ fontSize: "2.5rem", color: "#f6d469" }} />
              </CardIconContainer>
              <CardTitle sx={{ mt: 2 }}>{t("contrast_title")}</CardTitle>
              <CardText sx={{ mt: 2, mb: 2 }}>{t("contrast_text")}</CardText>
              <FeatureList disablePadding>
                <ListItem>
                  <CheckCircleIcon
                    sx={{
                      color: "#00a77f",
                      mr: 1.5,
                      fontSize: "1.25rem",
                      mt: 0.25,
                    }}
                  />
                  <Typography
                    sx={{ fontSize: "1rem", lineHeight: 1.5, color: "#333333" }}
                  >
                    {t("contrast_item_1")}
                  </Typography>
                </ListItem>
                <ListItem>
                  <CheckCircleIcon
                    sx={{
                      color: "#00a77f",
                      mr: 1.5,
                      fontSize: "1.25rem",
                      mt: 0.25,
                    }}
                  />
                  <Typography
                    sx={{ fontSize: "1rem", lineHeight: 1.5, color: "#333333" }}
                  >
                    {t("contrast_item_2")}
                  </Typography>
                </ListItem>
                <ListItem>
                  <CheckCircleIcon
                    sx={{
                      color: "#00a77f",
                      mr: 1.5,
                      fontSize: "1.25rem",
                      mt: 0.25,
                    }}
                  />
                  <Typography
                    sx={{ fontSize: "1rem", lineHeight: 1.5, color: "#333333" }}
                  >
                    {t("contrast_item_3")}
                  </Typography>
                </ListItem>
                <ListItem>
                  <CheckCircleIcon
                    sx={{
                      color: "#00a77f",
                      mr: 1.5,
                      fontSize: "1.25rem",
                      mt: 0.25,
                    }}
                  />
                  <Typography
                    sx={{ fontSize: "1rem", lineHeight: 1.5, color: "#333333" }}
                  >
                    {t("contrast_item_4")}
                  </Typography>
                </ListItem>
                <ListItem>
                  <CheckCircleIcon
                    sx={{
                      color: "#00a77f",
                      mr: 1.5,
                      fontSize: "1.25rem",
                      mt: 0.25,
                    }}
                  />
                  <Typography
                    sx={{ fontSize: "1rem", lineHeight: 1.5, color: "#333333" }}
                  >
                    {t("contrast_item_5")}
                  </Typography>
                </ListItem>
              </FeatureList>
            </FeatureCard>

            {/* Keyboard Navigation */}
            <FeatureCard>
              <CardIconContainer
                sx={{ backgroundColor: "rgba(0, 76, 145, 0.1)" }}
              >
                <KeyboardIcon sx={{ fontSize: "2.5rem", color: "#004c91" }} />
              </CardIconContainer>
              <CardTitle sx={{ mt: 2 }}>{t("keyboard_title")}</CardTitle>
              <CardText sx={{ mt: 2, mb: 2 }}>{t("keyboard_text")}</CardText>
              <FeatureList disablePadding>
                <ListItem>
                  <CheckCircleIcon
                    sx={{
                      color: "#00a77f",
                      mr: 1.5,
                      fontSize: "1.25rem",
                      mt: 0.25,
                    }}
                  />
                  <Typography
                    sx={{ fontSize: "1rem", lineHeight: 1.5, color: "#333333" }}
                  >
                    {t("keyboard_item_1")}
                  </Typography>
                </ListItem>
                <ListItem>
                  <CheckCircleIcon
                    sx={{
                      color: "#00a77f",
                      mr: 1.5,
                      fontSize: "1.25rem",
                      mt: 0.25,
                    }}
                  />
                  <Typography
                    sx={{ fontSize: "1rem", lineHeight: 1.5, color: "#333333" }}
                  >
                    {t("keyboard_item_2")}
                  </Typography>
                </ListItem>
                <ListItem>
                  <CheckCircleIcon
                    sx={{
                      color: "#00a77f",
                      mr: 1.5,
                      fontSize: "1.25rem",
                      mt: 0.25,
                    }}
                  />
                  <Typography
                    sx={{ fontSize: "1rem", lineHeight: 1.5, color: "#333333" }}
                  >
                    {t("keyboard_item_3")}
                  </Typography>
                </ListItem>
                <ListItem>
                  <CheckCircleIcon
                    sx={{
                      color: "#00a77f",
                      mr: 1.5,
                      fontSize: "1.25rem",
                      mt: 0.25,
                    }}
                  />
                  <Typography
                    sx={{ fontSize: "1rem", lineHeight: 1.5, color: "#333333" }}
                  >
                    {t("keyboard_item_4")}
                  </Typography>
                </ListItem>
                <ListItem>
                  <CheckCircleIcon
                    sx={{
                      color: "#00a77f",
                      mr: 1.5,
                      fontSize: "1.25rem",
                      mt: 0.25,
                    }}
                  />
                  <Typography
                    sx={{ fontSize: "1rem", lineHeight: 1.5, color: "#333333" }}
                  >
                    {t("keyboard_item_5")}
                  </Typography>
                </ListItem>
              </FeatureList>
            </FeatureCard>

            {/* Responsive Design */}
            <FeatureCard>
              <CardIconContainer
                sx={{ backgroundColor: "rgba(0, 167, 127, 0.1)" }}
              >
                <DevicesIcon sx={{ fontSize: "2.5rem", color: "#00a77f" }} />
              </CardIconContainer>
              <CardTitle sx={{ mt: 2 }}>{t("responsive_title")}</CardTitle>
              <CardText sx={{ mt: 2, mb: 2 }}>{t("responsive_text")}</CardText>
              <FeatureList disablePadding>
                <ListItem>
                  <CheckCircleIcon
                    sx={{
                      color: "#00a77f",
                      mr: 1.5,
                      fontSize: "1.25rem",
                      mt: 0.25,
                    }}
                  />
                  <Typography
                    sx={{ fontSize: "1rem", lineHeight: 1.5, color: "#333333" }}
                  >
                    {t("responsive_item_1")}
                  </Typography>
                </ListItem>
                <ListItem>
                  <CheckCircleIcon
                    sx={{
                      color: "#00a77f",
                      mr: 1.5,
                      fontSize: "1.25rem",
                      mt: 0.25,
                    }}
                  />
                  <Typography
                    sx={{ fontSize: "1rem", lineHeight: 1.5, color: "#333333" }}
                  >
                    {t("responsive_item_2")}
                  </Typography>
                </ListItem>
                <ListItem>
                  <CheckCircleIcon
                    sx={{
                      color: "#00a77f",
                      mr: 1.5,
                      fontSize: "1.25rem",
                      mt: 0.25,
                    }}
                  />
                  <Typography
                    sx={{ fontSize: "1rem", lineHeight: 1.5, color: "#333333" }}
                  >
                    {t("responsive_item_3")}
                  </Typography>
                </ListItem>
                <ListItem>
                  <CheckCircleIcon
                    sx={{
                      color: "#00a77f",
                      mr: 1.5,
                      fontSize: "1.25rem",
                      mt: 0.25,
                    }}
                  />
                  <Typography
                    sx={{ fontSize: "1rem", lineHeight: 1.5, color: "#333333" }}
                  >
                    {t("responsive_item_4")}
                  </Typography>
                </ListItem>
              </FeatureList>
            </FeatureCard>
          </Box>
        </Container>
      </Section>

      {/* Testing Section */}
      <Section sx={{ backgroundColor: "#ffffff" }}>
        <Container maxWidth='xl' sx={{ px: { xs: 2, sm: 3, md: 6 } }}>
          <SectionTitle variant='h2'>{t("testing_section_title")}</SectionTitle>
          <SectionSubtitle>{t("testing_section_subtitle")}</SectionSubtitle>

          <Box
            sx={{
              display: "grid",
              gridTemplateColumns: { xs: "1fr", md: "1fr 1fr" },
              gap: { xs: 3, sm: 4, md: 6 },
            }}
          >
            <CommitmentCard>
              <CardIconContainer
                sx={{ backgroundColor: "rgba(0, 76, 145, 0.1)" }}
              >
                <VerifiedIcon sx={{ fontSize: "2.5rem", color: "#004c91" }} />
              </CardIconContainer>
              <Box>
                <CardTitle>{t("automated_testing_title")}</CardTitle>
                <CardText sx={{ mt: 2, mb: 3 }}>
                  {t("automated_testing_text")}
                </CardText>
                <FeatureList disablePadding>
                  <ListItem>
                    <CheckCircleIcon
                      sx={{
                        color: "#00a77f",
                        mr: 1.5,
                        fontSize: "1.25rem",
                        mt: 0.25,
                      }}
                    />
                    <Typography
                      sx={{
                        fontSize: "1rem",
                        lineHeight: 1.5,
                        color: "#333333",
                      }}
                    >
                      {t("automated_item_1")}
                    </Typography>
                  </ListItem>
                  <ListItem>
                    <CheckCircleIcon
                      sx={{
                        color: "#00a77f",
                        mr: 1.5,
                        fontSize: "1.25rem",
                        mt: 0.25,
                      }}
                    />
                    <Typography
                      sx={{
                        fontSize: "1rem",
                        lineHeight: 1.5,
                        color: "#333333",
                      }}
                    >
                      {t("automated_item_2")}
                    </Typography>
                  </ListItem>
                  <ListItem>
                    <CheckCircleIcon
                      sx={{
                        color: "#00a77f",
                        mr: 1.5,
                        fontSize: "1.25rem",
                        mt: 0.25,
                      }}
                    />
                    <Typography
                      sx={{
                        fontSize: "1rem",
                        lineHeight: 1.5,
                        color: "#333333",
                      }}
                    >
                      {t("automated_item_3")}
                    </Typography>
                  </ListItem>
                  <ListItem>
                    <CheckCircleIcon
                      sx={{
                        color: "#00a77f",
                        mr: 1.5,
                        fontSize: "1.25rem",
                        mt: 0.25,
                      }}
                    />
                    <Typography
                      sx={{
                        fontSize: "1rem",
                        lineHeight: 1.5,
                        color: "#333333",
                      }}
                    >
                      {t("automated_item_4")}
                    </Typography>
                  </ListItem>
                </FeatureList>
              </Box>
            </CommitmentCard>

            <CommitmentCard>
              <CardIconContainer
                sx={{ backgroundColor: "rgba(0, 167, 127, 0.1)" }}
              >
                <ShieldIcon sx={{ fontSize: "2.5rem", color: "#00a77f" }} />
              </CardIconContainer>
              <Box>
                <CardTitle>{t("monitoring_title")}</CardTitle>
                <CardText sx={{ mt: 2, mb: 3 }}>
                  {t("monitoring_text")}
                </CardText>
                <FeatureList disablePadding>
                  <ListItem>
                    <CheckCircleIcon
                      sx={{
                        color: "#00a77f",
                        mr: 1.5,
                        fontSize: "1.25rem",
                        mt: 0.25,
                      }}
                    />
                    <Typography
                      sx={{
                        fontSize: "1rem",
                        lineHeight: 1.5,
                        color: "#333333",
                      }}
                    >
                      {t("monitoring_item_1")}
                    </Typography>
                  </ListItem>
                  <ListItem>
                    <CheckCircleIcon
                      sx={{
                        color: "#00a77f",
                        mr: 1.5,
                        fontSize: "1.25rem",
                        mt: 0.25,
                      }}
                    />
                    <Typography
                      sx={{
                        fontSize: "1rem",
                        lineHeight: 1.5,
                        color: "#333333",
                      }}
                    >
                      {t("monitoring_item_2")}
                    </Typography>
                  </ListItem>
                  <ListItem>
                    <CheckCircleIcon
                      sx={{
                        color: "#00a77f",
                        mr: 1.5,
                        fontSize: "1.25rem",
                        mt: 0.25,
                      }}
                    />
                    <Typography
                      sx={{
                        fontSize: "1rem",
                        lineHeight: 1.5,
                        color: "#333333",
                      }}
                    >
                      {t("monitoring_item_3")}
                    </Typography>
                  </ListItem>
                  <ListItem>
                    <CheckCircleIcon
                      sx={{
                        color: "#00a77f",
                        mr: 1.5,
                        fontSize: "1.25rem",
                        mt: 0.25,
                      }}
                    />
                    <Typography
                      sx={{
                        fontSize: "1rem",
                        lineHeight: 1.5,
                        color: "#333333",
                      }}
                    >
                      {t("monitoring_item_4")}
                    </Typography>
                  </ListItem>
                </FeatureList>
              </Box>
            </CommitmentCard>
          </Box>

          <InfoBox sx={{ mt: 6 }}>
            <CardIconContainer
              sx={{
                backgroundColor: "rgba(0, 76, 145, 0.1)",
                width: "64px",
                height: "64px",
              }}
            >
              <CheckCircleIcon sx={{ fontSize: "2rem", color: "#004c91" }} />
            </CardIconContainer>
            <Box>
              <CardTitle>{t("coverage_title")}</CardTitle>
              <CardText sx={{ mt: 1.5 }}>{t("coverage_text")}</CardText>
            </Box>
          </InfoBox>
        </Container>
      </Section>

      {/* Contact Section */}
      <Section id='contact' sx={{ backgroundColor: "#f9fafb" }}>
        <Container maxWidth='xl' sx={{ px: { xs: 2, sm: 3, md: 6 } }}>
          <SectionTitle variant='h2'>{t("contact_section_title")}</SectionTitle>
          <SectionSubtitle>{t("contact_section_subtitle")}</SectionSubtitle>

          <Box
            sx={{
              display: "grid",
              gridTemplateColumns: {
                xs: "1fr",
                sm: "1fr 1fr",
                md: "1fr 1fr 1fr",
              },
              gap: { xs: 3, sm: 4, md: 6 },
            }}
          >
            <ContactCard>
              <ContactIconContainer
                sx={{ backgroundColor: "rgba(0, 76, 145, 0.1)" }}
              >
                <EmailIcon sx={{ fontSize: "2.5rem", color: "#004c91" }} />
              </ContactIconContainer>
              <ContactTitle>{t("contact_email_title")}</ContactTitle>
              <ContactSubtitle>{t("contact_email_subtitle")}</ContactSubtitle>
              <ContactLink>{t("contact_email")}</ContactLink>
            </ContactCard>

            <ContactCard>
              <ContactIconContainer
                sx={{ backgroundColor: "rgba(0, 167, 127, 0.1)" }}
              >
                <PhoneIcon sx={{ fontSize: "2.5rem", color: "#00a77f" }} />
              </ContactIconContainer>
              <ContactTitle>{t("contact_phone_title")}</ContactTitle>
              <ContactSubtitle>{t("contact_phone_subtitle")}</ContactSubtitle>
              <ContactLink>{t("contact_phone")}</ContactLink>
            </ContactCard>

            <ContactCard>
              <ContactIconContainer
                sx={{ backgroundColor: "rgba(150, 85, 149, 0.1)" }}
              >
                <ContactPageIcon
                  sx={{ fontSize: "2.5rem", color: "#965595" }}
                />
              </ContactIconContainer>
              <ContactTitle>{t("contact_form_title")}</ContactTitle>
              <ContactSubtitle>{t("contact_form_subtitle")}</ContactSubtitle>
              <Box
                component={Link}
                to='/contact#contact-form'
                sx={{ textDecoration: "none" }}
              >
                <ContactLink>{t("contact_form_link")}</ContactLink>
              </Box>
            </ContactCard>
          </Box>

          <InfoBox>
            <CardIconContainer
              sx={{
                backgroundColor: "rgba(0, 76, 145, 0.1)",
                width: "64px",
                height: "64px",
              }}
            >
              <VerifiedIcon sx={{ fontSize: "2rem", color: "#004c91" }} />
            </CardIconContainer>
            <Box>
              <CardTitle>{t("response_title")}</CardTitle>
              <CardText sx={{ mt: 1.5 }}>{t("response_text")}</CardText>
            </Box>
          </InfoBox>
        </Container>
      </Section>
    </PageContainer>
  );
}

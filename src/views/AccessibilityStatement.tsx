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
import DescriptionIcon from "@mui/icons-material/Description";
import VideocamIcon from "@mui/icons-material/Videocam";
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
  [theme.breakpoints.down("md")]: {
    padding: theme.spacing(8, 3),
  },
}));

const HeroContent = styled(Container)({
  position: "relative",
  zIndex: 1,
  maxWidth: "1000px !important",
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
}));

const PageTitle = styled(Typography)(({ theme }) => ({
  fontSize: "3.75rem",
  fontWeight: 400,
  marginBottom: theme.spacing(3),
  lineHeight: 1.2,
  fontFamily: "Poppins, sans-serif",
  [theme.breakpoints.down("md")]: {
    fontSize: "3rem",
  },
  [theme.breakpoints.down("sm")]: {
    fontSize: "2.5rem",
  },
}));

const PageIntro = styled(Typography)(({ theme }) => ({
  fontSize: "1.5rem",
  lineHeight: 1.6,
  marginBottom: theme.spacing(3),
  color: "rgba(255, 255, 255, 0.95)",
  maxWidth: "928px",
  [theme.breakpoints.down("sm")]: {
    fontSize: "1.25rem",
  },
}));

const LastUpdated = styled(Typography)(({ theme }) => ({
  fontSize: "1.25rem",
  color: "rgba(255, 255, 255, 0.9)",
  marginBottom: theme.spacing(5),
  "& strong": {
    fontWeight: 700,
  },
}));

const Section = styled(Box)(({ theme }) => ({
  padding: theme.spacing(12, 4),
  [theme.breakpoints.down("md")]: {
    padding: theme.spacing(8, 3),
  },
}));

const SectionTitle = styled(Typography)(({ theme }) => ({
  fontSize: "3rem",
  fontWeight: 400,
  color: "#004c91",
  textAlign: "center",
  marginBottom: theme.spacing(3),
  fontFamily: "Poppins, sans-serif",
  [theme.breakpoints.down("sm")]: {
    fontSize: "2.5rem",
  },
}));

const SectionSubtitle = styled(Typography)(({ theme }) => ({
  fontSize: "1.25rem",
  color: "#4a5565",
  textAlign: "center",
  maxWidth: "896px",
  margin: "0 auto",
  marginBottom: theme.spacing(6),
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
}));

const CardIconContainer = styled(Box)(({ theme }) => ({
  width: "80px",
  height: "80px",
  borderRadius: theme.spacing(2),
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  fontSize: "2.5rem",
}));

const CardTitle = styled(Typography)({
  fontSize: "1.5rem",
  fontWeight: 400,
  color: "#004c91",
  fontFamily: "Poppins, sans-serif",
});

const CardText = styled(Typography)({
  fontSize: "1.125rem",
  color: "#364153",
  lineHeight: 1.6,
});

const FeatureCard = styled(Box)(({ theme }) => ({
  backgroundColor: "#ffffff",
  border: "2px solid #e5e7eb",
  borderRadius: theme.spacing(2),
  padding: theme.spacing(5),
  height: "100%",
  display: "flex",
  flexDirection: "column",
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
}));

const ContactIconContainer = styled(Box)(({ theme }) => ({
  width: "80px",
  height: "80px",
  borderRadius: theme.spacing(2),
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  fontSize: "2.5rem",
}));

const ContactTitle = styled(Typography)({
  fontSize: "1.5rem",
  fontWeight: 400,
  color: "#004c91",
  fontFamily: "Poppins, sans-serif",
});

const ContactSubtitle = styled(Typography)({
  fontSize: "1.125rem",
  color: "#364153",
});

const ContactLink = styled(Typography)({
  fontSize: "1.125rem",
  color: "#00a77f",
  fontWeight: 500,
});

const InfoBox = styled(Box)(({ theme }) => ({
  backgroundColor: "rgba(0, 76, 145, 0.05)",
  border: "2px solid rgba(0, 76, 145, 0.2)",
  borderRadius: theme.spacing(2),
  padding: theme.spacing(5),
  display: "flex",
  gap: theme.spacing(3),
  marginTop: theme.spacing(6),
  alignItems: "flex-start",
}));

const SkipLink = styled("a")({
  position: "absolute",
  top: "-40px",
  left: 0,
  background: "#004c91",
  color: "white",
  padding: "8px",
  textDecoration: "none",
  zIndex: 9999,
  "&:focus": {
    top: 0,
  },
});

export default function AccessibilityStatement() {
  const { t } = useTranslation();

  return (
    <PageContainer>
      <SkipLink href='#main-content'>Skip to main content</SkipLink>

      {/* Hero Section */}
      <HeroSection>
        <HeroContent id='main-content'>
          <Badge>
            <VerifiedIcon sx={{ fontSize: "0.75rem" }} />
            WCAG 2.2 AA Compliant
          </Badge>
          <PageTitle variant='h1'>{t("accessibility_title")}</PageTitle>
          <PageIntro>{t("accessibility_intro")}</PageIntro>
          <LastUpdated>
            <strong>Last Updated:</strong> November 3, 2024
          </LastUpdated>
        </HeroContent>
      </HeroSection>

      {/* Commitment Section */}
      <Section sx={{ backgroundColor: "#ffffff" }}>
        <Container maxWidth='lg'>
          <SectionTitle variant='h2'>Our Accessibility Commitment</SectionTitle>
          <SectionSubtitle>
            As an organization dedicated to disability empowerment,
            accessibility is at the core of everything we do.
          </SectionSubtitle>

          <Box
            sx={{
              display: "grid",
              gridTemplateColumns: { xs: "1fr", md: "1fr 1fr" },
              gap: 6,
            }}
          >
            <CommitmentCard>
              <CardIconContainer
                sx={{ backgroundColor: "rgba(0, 76, 145, 0.1)" }}
              >
                <ShieldIcon sx={{ fontSize: "2.5rem", color: "#004c91" }} />
              </CardIconContainer>
              <Box>
                <CardTitle>Standards Compliance</CardTitle>
                <CardText sx={{ mt: 2, mb: 3 }}>
                  Fully compliant with WCAG 2.2 AA accessibility standards,
                  ensuring our website is accessible to all users regardless of
                  ability.
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
                    <Typography sx={{ fontSize: "1rem", color: "#364153" }}>
                      Perceivable content for all users
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
                    <Typography sx={{ fontSize: "1rem", color: "#364153" }}>
                      Operable user interface
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
                    <Typography sx={{ fontSize: "1rem", color: "#364153" }}>
                      Understandable information
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
                    <Typography sx={{ fontSize: "1rem", color: "#364153" }}>
                      Robust technical implementation
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
                <CardTitle>Inclusive Design</CardTitle>
                <CardText sx={{ mt: 2, mb: 3 }}>
                  Designed with input from persons with disabilities to ensure
                  genuine accessibility and usability.
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
                    <Typography sx={{ fontSize: "1rem", color: "#364153" }}>
                      User testing with diverse abilities
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
                    <Typography sx={{ fontSize: "1rem", color: "#364153" }}>
                      Continuous improvement process
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
                    <Typography sx={{ fontSize: "1rem", color: "#364153" }}>
                      Feedback-driven enhancements
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
                    <Typography sx={{ fontSize: "1rem", color: "#364153" }}>
                      Regular accessibility audits
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
        <Container maxWidth='lg'>
          <SectionTitle variant='h2'>Accessibility Features</SectionTitle>
          <SectionSubtitle>
            Our website includes comprehensive accessibility features to ensure
            everyone can access our content and services.
          </SectionSubtitle>

          <Box
            sx={{
              display: "grid",
              gridTemplateColumns: { xs: "1fr", md: "1fr 1fr 1fr" },
              gap: 6,
            }}
          >
            {/* Screen Reader Support */}
            <FeatureCard>
              <CardIconContainer
                sx={{ backgroundColor: "rgba(0, 76, 145, 0.1)" }}
              >
                <VolumeUpIcon sx={{ fontSize: "2.5rem", color: "#004c91" }} />
              </CardIconContainer>
              <CardTitle sx={{ mt: 2 }}>Screen Reader Support</CardTitle>
              <CardText sx={{ mt: 2, mb: 2 }}>
                Fully compatible with NVDA, JAWS, VoiceOver, and other popular
                screen readers.
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
                  <Typography sx={{ fontSize: "1rem", color: "#364153" }}>
                    Semantic HTML markup
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
                  <Typography sx={{ fontSize: "1rem", color: "#364153" }}>
                    ARIA labels and landmarks
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
                  <Typography sx={{ fontSize: "1rem", color: "#364153" }}>
                    Descriptive alt text for images
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
                  <Typography sx={{ fontSize: "1rem", color: "#364153" }}>
                    Skip navigation links
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
              <CardTitle sx={{ mt: 2 }}>Multilingual Support</CardTitle>
              <CardText sx={{ mt: 2, mb: 2 }}>
                Content available in English and Nepali (नेपाली) languages.
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
                  <Typography sx={{ fontSize: "1rem", color: "#364153" }}>
                    Easy language switching
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
                  <Typography sx={{ fontSize: "1rem", color: "#364153" }}>
                    Consistent translation quality
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
                  <Typography sx={{ fontSize: "1rem", color: "#364153" }}>
                    Language-specific formatting
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
                  <Typography sx={{ fontSize: "1rem", color: "#364153" }}>
                    UTF-8 character encoding
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
              <CardTitle sx={{ mt: 2 }}>Text Customization</CardTitle>
              <CardText sx={{ mt: 2, mb: 2 }}>
                Adjustable font sizes and text spacing for improved readability.
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
                  <Typography sx={{ fontSize: "1rem", color: "#364153" }}>
                    Browser zoom up to 200%
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
                  <Typography sx={{ fontSize: "1rem", color: "#364153" }}>
                    Responsive text sizing
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
                  <Typography sx={{ fontSize: "1rem", color: "#364153" }}>
                    Clear typography hierarchy
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
                  <Typography sx={{ fontSize: "1rem", color: "#364153" }}>
                    Sufficient line height
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
              <CardTitle sx={{ mt: 2 }}>Contrast & Colors</CardTitle>
              <CardText sx={{ mt: 2, mb: 2 }}>
                High contrast ratios meeting WCAG 2.2 AA standards.
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
                  <Typography sx={{ fontSize: "1rem", color: "#364153" }}>
                    Minimum 4.5:1 contrast for text
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
                  <Typography sx={{ fontSize: "1rem", color: "#364153" }}>
                    Color not sole indicator
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
                  <Typography sx={{ fontSize: "1rem", color: "#364153" }}>
                    Focus indicators visible
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
                  <Typography sx={{ fontSize: "1rem", color: "#364153" }}>
                    Accessible color palette
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
              <CardTitle sx={{ mt: 2 }}>Keyboard Navigation</CardTitle>
              <CardText sx={{ mt: 2, mb: 2 }}>
                Full keyboard accessibility without requiring a mouse.
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
                  <Typography sx={{ fontSize: "1rem", color: "#364153" }}>
                    Logical tab order
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
                  <Typography sx={{ fontSize: "1rem", color: "#364153" }}>
                    Visible focus indicators
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
                  <Typography sx={{ fontSize: "1rem", color: "#364153" }}>
                    Keyboard shortcuts available
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
                  <Typography sx={{ fontSize: "1rem", color: "#364153" }}>
                    No keyboard traps
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
              <CardTitle sx={{ mt: 2 }}>Responsive Design</CardTitle>
              <CardText sx={{ mt: 2, mb: 2 }}>
                Optimized for all devices and screen sizes.
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
                  <Typography sx={{ fontSize: "1rem", color: "#364153" }}>
                    Mobile-friendly layouts
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
                  <Typography sx={{ fontSize: "1rem", color: "#364153" }}>
                    Touch-friendly targets
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
                  <Typography sx={{ fontSize: "1rem", color: "#364153" }}>
                    Orientation support
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
                  <Typography sx={{ fontSize: "1rem", color: "#364153" }}>
                    Zoom without loss of functionality
                  </Typography>
                </ListItem>
              </FeatureList>
            </FeatureCard>

            {/* Document Accessibility */}
            <FeatureCard>
              <CardIconContainer
                sx={{ backgroundColor: "rgba(150, 85, 149, 0.1)" }}
              >
                <DescriptionIcon
                  sx={{ fontSize: "2.5rem", color: "#965595" }}
                />
              </CardIconContainer>
              <CardTitle sx={{ mt: 2 }}>Document Accessibility</CardTitle>
              <CardText sx={{ mt: 2, mb: 2 }}>
                All documents tagged and accessible for assistive technology.
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
                  <Typography sx={{ fontSize: "1rem", color: "#364153" }}>
                    PDF accessibility tagging
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
                  <Typography sx={{ fontSize: "1rem", color: "#364153" }}>
                    Alternative formats available
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
                  <Typography sx={{ fontSize: "1rem", color: "#364153" }}>
                    Captions for videos
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
                  <Typography sx={{ fontSize: "1rem", color: "#364153" }}>
                    Transcripts for audio
                  </Typography>
                </ListItem>
              </FeatureList>
            </FeatureCard>

            {/* Media Accessibility */}
            <FeatureCard>
              <CardIconContainer
                sx={{ backgroundColor: "rgba(246, 212, 105, 0.1)" }}
              >
                <VideocamIcon sx={{ fontSize: "2.5rem", color: "#f6d469" }} />
              </CardIconContainer>
              <CardTitle sx={{ mt: 2 }}>Media Accessibility</CardTitle>
              <CardText sx={{ mt: 2, mb: 2 }}>
                All multimedia content includes captions and descriptions.
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
                  <Typography sx={{ fontSize: "1rem", color: "#364153" }}>
                    Video captions (closed)
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
                  <Typography sx={{ fontSize: "1rem", color: "#364153" }}>
                    Audio descriptions
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
                  <Typography sx={{ fontSize: "1rem", color: "#364153" }}>
                    Transcript downloads
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
                  <Typography sx={{ fontSize: "1rem", color: "#364153" }}>
                    Sign language interpretation
                  </Typography>
                </ListItem>
              </FeatureList>
            </FeatureCard>
          </Box>
        </Container>
      </Section>

      {/* Contact Section */}
      <Section id='contact' sx={{ backgroundColor: "#ffffff" }}>
        <Container maxWidth='lg'>
          <SectionTitle variant='h2'>Report Accessibility Issues</SectionTitle>
          <SectionSubtitle>
            We welcome your feedback on the accessibility of our website. Please
            let us know if you encounter any barriers.
          </SectionSubtitle>

          <Box
            sx={{
              display: "grid",
              gridTemplateColumns: { xs: "1fr", md: "1fr 1fr 1fr" },
              gap: 6,
            }}
          >
            <ContactCard>
              <ContactIconContainer
                sx={{ backgroundColor: "rgba(0, 76, 145, 0.1)" }}
              >
                <EmailIcon sx={{ fontSize: "2.5rem", color: "#004c91" }} />
              </ContactIconContainer>
              <ContactTitle>Email Us</ContactTitle>
              <ContactSubtitle>Send accessibility feedback</ContactSubtitle>
              <ContactLink>disabilityemp@gmail.com</ContactLink>
            </ContactCard>

            <ContactCard>
              <ContactIconContainer
                sx={{ backgroundColor: "rgba(0, 167, 127, 0.1)" }}
              >
                <PhoneIcon sx={{ fontSize: "2.5rem", color: "#00a77f" }} />
              </ContactIconContainer>
              <ContactTitle>Call Us</ContactTitle>
              <ContactSubtitle>Speak to our team</ContactSubtitle>
              <ContactLink>+977-15709205</ContactLink>
            </ContactCard>

            <ContactCard>
              <ContactIconContainer
                sx={{ backgroundColor: "rgba(150, 85, 149, 0.1)" }}
              >
                <ContactPageIcon
                  sx={{ fontSize: "2.5rem", color: "#965595" }}
                />
              </ContactIconContainer>
              <ContactTitle>Contact Form</ContactTitle>
              <ContactSubtitle>Fill out our form</ContactSubtitle>
              <Box
                component={Link}
                to='/get-involved'
                sx={{ textDecoration: "none" }}
              >
                <ContactLink>Contact Page</ContactLink>
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
              <CardTitle>Response Time</CardTitle>
              <CardText sx={{ mt: 1.5 }}>
                We aim to respond to all accessibility feedback within{" "}
                <strong>3 business days</strong>. Critical accessibility
                barriers will be addressed as a priority. You will receive a
                confirmation of receipt and regular updates on the status of
                your report.
              </CardText>
            </Box>
          </InfoBox>
        </Container>
      </Section>
    </PageContainer>
  );
}

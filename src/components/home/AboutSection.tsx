import { Container, Typography, Box } from "@mui/material";
import { styled } from "@mui/material/styles";
import { Link } from "react-router-dom";
import CalendarTodayIcon from "@mui/icons-material/CalendarToday";
import PublicIcon from "@mui/icons-material/Public";
import FlagIcon from "@mui/icons-material/Flag";

const AboutContainer = styled("section")(({ theme }) => ({
  backgroundColor: theme.palette.background.paper,
  padding: theme.spacing(10, 0),
  position: "relative",
  [theme.breakpoints.down("md")]: {
    padding: theme.spacing(7, 0),
  },
  [theme.breakpoints.down("sm")]: {
    padding: theme.spacing(5, 0),
  },
}));

// Two-column grid
const GridContainer = styled(Box)(({ theme }) => ({
  display: "grid",
  gridTemplateColumns: "1fr 1fr",
  gap: theme.spacing(6),
  alignItems: "center",
  [theme.breakpoints.down("md")]: {
    gridTemplateColumns: "1fr",
    gap: theme.spacing(4),
  },
}));

// Left column - Main content
const ContentColumn = styled(Box)(({ theme }) => ({
  [theme.breakpoints.down("md")]: {
    order: 2, // Content appears below on mobile
  },
}));

// Right column - Visual/facts
const FactsColumn = styled(Box)(({ theme }) => ({
  [theme.breakpoints.down("md")]: {
    order: 1, // Facts appear above on mobile
  },
}));

// Section heading
const AboutHeading = styled(Typography)(({ theme }) => ({
  fontSize: "2.25rem",
  fontWeight: 700,
  color: theme.palette.primary.main,
  marginBottom: theme.spacing(3),
  lineHeight: 1.2,
  letterSpacing: "-0.01em",
  [theme.breakpoints.down("md")]: {
    fontSize: "2rem",
  },
  [theme.breakpoints.down("sm")]: {
    fontSize: "1.75rem",
    marginBottom: theme.spacing(2),
  },
}));

// Tagline
const Tagline = styled(Typography)(({ theme }) => ({
  fontSize: "1.25rem",
  fontWeight: 600,
  color: theme.palette.secondary.main,
  marginBottom: theme.spacing(3),
  lineHeight: 1.4,
  fontStyle: "italic",
  [theme.breakpoints.down("sm")]: {
    fontSize: "1.125rem",
    marginBottom: theme.spacing(2),
  },
}));

// Summary text block
const SummaryText = styled(Typography)(({ theme }) => ({
  fontSize: "1rem",
  color: theme.palette.text.primary,
  lineHeight: 1.7,
  marginBottom: theme.spacing(4),
  [theme.breakpoints.down("sm")]: {
    fontSize: "0.9375rem",
    marginBottom: theme.spacing(3),
  },
}));

// CTA Button - secondary style
const AboutButton = styled(Link)(({ theme }) => ({
  backgroundColor: theme.palette.primary.main,
  color: "#ffffff",
  fontWeight: 600,
  fontSize: "1rem",
  textTransform: "uppercase",
  padding: theme.spacing(1.5, 4),
  borderRadius: "100px",
  textDecoration: "none",
  display: "inline-flex",
  alignItems: "center",
  gap: theme.spacing(1),
  boxShadow: "0 4px 12px rgba(0, 76, 145, 0.3)",
  transition: "all 0.3s ease",
  border: `2px solid ${theme.palette.primary.main}`,
  "&:hover, &:focus": {
    backgroundColor: "#003d73",
    borderColor: "#003d73",
    transform: "translateY(-2px)",
    boxShadow: "0 6px 16px rgba(0, 76, 145, 0.4)",
  },
  "&:active": {
    transform: "translateY(0)",
  },
  [theme.breakpoints.down("sm")]: {
    fontSize: "0.9375rem",
    padding: theme.spacing(1.25, 3),
    width: "100%",
    justifyContent: "center",
  },
}));

// Key facts container
const FactsContainer = styled(Box)(({ theme }) => ({
  backgroundColor: "#ffffff",
  borderRadius: 16,
  padding: theme.spacing(4),
  boxShadow: "0px 4px 20px rgba(0, 0, 0, 0.08)",
  border: `2px solid ${theme.palette.primary.light}`,
  [theme.breakpoints.down("sm")]: {
    padding: theme.spacing(3),
  },
}));

// Individual fact item
const FactItem = styled(Box)(({ theme }) => ({
  display: "flex",
  alignItems: "flex-start",
  gap: theme.spacing(2),
  marginBottom: theme.spacing(3),
  "&:last-child": {
    marginBottom: 0,
  },
}));

// Fact icon wrapper
const FactIcon = styled(Box)(({ theme }) => ({
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  width: "48px",
  height: "48px",
  borderRadius: "50%",
  backgroundColor: theme.palette.primary.light,
  color: "#ffffff",
  flexShrink: 0,
  "& svg": {
    fontSize: "24px",
  },
}));

// Fact content
const FactContent = styled(Box)({
  flex: 1,
  paddingTop: "4px",
});

const FactLabel = styled(Typography)(({ theme }) => ({
  fontSize: "0.875rem",
  fontWeight: 600,
  color: theme.palette.text.secondary,
  textTransform: "uppercase",
  letterSpacing: "0.05em",
  marginBottom: theme.spacing(0.5),
}));

const FactValue = styled(Typography)(({ theme }) => ({
  fontSize: "1.125rem",
  fontWeight: 700,
  color: theme.palette.text.primary,
  lineHeight: 1.3,
  [theme.breakpoints.down("sm")]: {
    fontSize: "1rem",
  },
}));

export default function AboutSection() {
  const keyFacts = [
    {
      icon: <CalendarTodayIcon />,
      label: "Established",
      value: "2004 (2060 B.S.)",
    },
    {
      icon: <PublicIcon />,
      label: "Service Area",
      value: "Nationwide - Nepal",
    },
    {
      icon: <FlagIcon />,
      label: "Primary Goal",
      value: "Inclusive, Barrier-Free Society",
    },
  ];

  return (
    <AboutContainer aria-labelledby='about-heading'>
      <Container maxWidth='lg'>
        <GridContainer>
          {/* Left Column - Main Content */}
          <ContentColumn>
            <AboutHeading as='h2' id='about-heading'>
              Our Mission: Empowering Nepal's Future
            </AboutHeading>

            <Tagline>
              Creating a rights-based, barrier-free and inclusive society
            </Tagline>

            <SummaryText>
              DESN has been consistently advocating for equal rights,
              participation, and accessibility to ensure that persons with
              disabilities and marginalized women can live in a barrier-free,
              inclusive environment with improved socio-economic conditions. The
              Disability Empowerment Society Nepal (DESN) is a non-profit,
              non-political social organization founded and led by persons with
              disabilities. Established under the Organization Registration Act,
              1972, DESN works for the welfare and empowerment of persons with
              disabilities, helpless people, and single women through advocacy,
              education, technology, and livelihood support.
            </SummaryText>

            <AboutButton to='/about' aria-label='Read our full story'>
              Read Our Full Story
              <span aria-hidden='true'>→</span>
            </AboutButton>
          </ContentColumn>

          {/* Right Column - Key Facts */}
          <FactsColumn>
            <FactsContainer>
              {keyFacts.map((fact, index) => (
                <FactItem key={index}>
                  <FactIcon>{fact.icon}</FactIcon>
                  <FactContent>
                    <FactLabel>{fact.label}</FactLabel>
                    <FactValue>{fact.value}</FactValue>
                  </FactContent>
                </FactItem>
              ))}
            </FactsContainer>
          </FactsColumn>
        </GridContainer>
      </Container>
    </AboutContainer>
  );
}

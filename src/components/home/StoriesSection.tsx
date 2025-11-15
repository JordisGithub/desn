import { Box, Container, Typography, Link } from "@mui/material";
import { styled } from "@mui/material/styles";
import FormatQuoteIcon from "@mui/icons-material/FormatQuote";

// Section container
const StoriesSectionContainer = styled("section")(({ theme }) => ({
  backgroundColor: theme.palette.background.default,
  padding: theme.spacing(10, 0),
  [theme.breakpoints.down("md")]: {
    padding: theme.spacing(7, 0),
  },
  [theme.breakpoints.down("sm")]: {
    padding: theme.spacing(5, 0),
  },
}));

// Section title
const SectionTitle = styled(Typography)(({ theme }) => ({
  fontSize: "2.5rem",
  fontWeight: 700,
  color: theme.palette.text.primary,
  textAlign: "center",
  marginBottom: theme.spacing(6),
  letterSpacing: "-0.01em",
  [theme.breakpoints.down("md")]: {
    fontSize: "2rem",
    marginBottom: theme.spacing(5),
  },
  [theme.breakpoints.down("sm")]: {
    fontSize: "1.75rem",
    marginBottom: theme.spacing(4),
  },
}));

// Grid container for testimonial cards
const TestimonialGrid = styled(Box)(({ theme }) => ({
  display: "grid",
  gridTemplateColumns: "repeat(3, 1fr)",
  gap: theme.spacing(4),
  [theme.breakpoints.down("lg")]: {
    gridTemplateColumns: "repeat(2, 1fr)",
  },
  [theme.breakpoints.down("md")]: {
    gridTemplateColumns: "1fr",
    gap: theme.spacing(3),
  },
}));

// Individual testimonial card
const TestimonialCard = styled(Box)(({ theme }) => ({
  backgroundColor: "#ffffff",
  borderRadius: 16,
  padding: theme.spacing(5),
  boxShadow: "0px 4px 16px rgba(0, 0, 0, 0.08)",
  transition: "all 0.3s ease",
  display: "flex",
  flexDirection: "column",
  position: "relative",
  border: `1px solid ${theme.palette.grey[200]}`,
  "&:hover": {
    boxShadow: "0px 8px 24px rgba(0, 0, 0, 0.12)",
    transform: "translateY(-6px)",
  },
  [theme.breakpoints.down("md")]: {
    padding: theme.spacing(4),
    maxWidth: "90%",
    margin: "0 auto",
  },
  [theme.breakpoints.down("sm")]: {
    padding: theme.spacing(3.5),
    maxWidth: "95%",
  },
}));

// Quote icon wrapper
const QuoteIconWrapper = styled(Box)(({ theme }) => ({
  position: "absolute",
  top: theme.spacing(3),
  right: theme.spacing(3),
  opacity: 0.15,
  "& svg": {
    fontSize: "4rem",
    color: theme.palette.primary.main,
  },
  [theme.breakpoints.down("sm")]: {
    top: theme.spacing(2),
    right: theme.spacing(2),
    "& svg": {
      fontSize: "3rem",
    },
  },
}));

// Profile section (image + info)
const ProfileSection = styled(Box)(({ theme }) => ({
  display: "flex",
  alignItems: "center",
  gap: theme.spacing(2),
  marginBottom: theme.spacing(3),
  zIndex: 1,
}));

// Circular profile image
const ProfileImage = styled("img")(({ theme }) => ({
  width: "64px",
  height: "64px",
  borderRadius: "50%",
  objectFit: "cover",
  border: `3px solid ${theme.palette.primary.light}`,
  boxShadow: "0px 2px 8px rgba(0, 0, 0, 0.1)",
  [theme.breakpoints.down("sm")]: {
    width: "56px",
    height: "56px",
  },
}));

// Profile info container
const ProfileInfo = styled(Box)({
  flex: 1,
});

// Person's name
const PersonName = styled(Typography)(({ theme }) => ({
  fontSize: "1.125rem",
  fontWeight: 700,
  color: theme.palette.text.primary,
  lineHeight: 1.3,
  marginBottom: theme.spacing(0.5),
  [theme.breakpoints.down("sm")]: {
    fontSize: "1rem",
  },
}));

// Person's title/role
const PersonTitle = styled(Typography)(({ theme }) => ({
  fontSize: "0.875rem",
  fontWeight: 500,
  color: theme.palette.text.secondary,
  lineHeight: 1.4,
  [theme.breakpoints.down("sm")]: {
    fontSize: "0.8125rem",
  },
}));

// Quote text
const QuoteText = styled(Typography)(({ theme }) => ({
  fontSize: "1rem",
  lineHeight: 1.7,
  color: theme.palette.text.primary,
  marginBottom: theme.spacing(3),
  position: "relative",
  zIndex: 1,
  fontStyle: "italic",
  [theme.breakpoints.down("sm")]: {
    fontSize: "0.9375rem",
    marginBottom: theme.spacing(2.5),
  },
}));

// Read more link
const ReadMoreLink = styled(Link)(({ theme }) => ({
  fontSize: "0.9375rem",
  fontWeight: 600,
  color: theme.palette.warning.main,
  textDecoration: "none",
  display: "inline-flex",
  alignItems: "center",
  gap: theme.spacing(0.5),
  transition: "all 0.2s ease",
  marginTop: "auto",
  cursor: "pointer",
  "&:hover": {
    color: theme.palette.warning.dark,
    textDecoration: "underline",
    gap: theme.spacing(1),
  },
  "&::after": {
    content: '"→"',
    fontSize: "1.125rem",
    transition: "transform 0.2s ease",
  },
  "&:hover::after": {
    transform: "translateX(4px)",
  },
  [theme.breakpoints.down("sm")]: {
    fontSize: "0.875rem",
  },
}));

export default function StoriesSection() {
  const testimonials = [
    {
      id: 1,
      name: "Sita Sharma",
      title: "Program Graduate, 2023",
      image: "https://i.pravatar.cc/150?img=1",
      quote:
        "This program changed my life and gave me hope. I learned valuable skills that helped me become independent and support my family.",
    },
    {
      id: 2,
      name: "Ramesh Thapa",
      title: "Skills Training Participant",
      image: "https://i.pravatar.cc/150?img=12",
      quote:
        "The support and training I received opened doors I never thought possible. Today, I run my own small business and mentor others.",
    },
    {
      id: 3,
      name: "Maya Gurung",
      title: "Education Program Beneficiary",
      image: "https://i.pravatar.cc/150?img=5",
      quote:
        "DESN believed in me when others didn't. Their education program gave me the tools and confidence to pursue my dreams.",
    },
  ];

  return (
    <StoriesSectionContainer aria-labelledby='stories-heading'>
      <Container maxWidth='lg'>
        <SectionTitle id='stories-heading' variant='h2' as='h2'>
          Stories of Change
        </SectionTitle>

        <TestimonialGrid>
          {testimonials.map((testimonial) => (
            <TestimonialCard key={testimonial.id}>
              <QuoteIconWrapper aria-hidden='true'>
                <FormatQuoteIcon />
              </QuoteIconWrapper>

              <ProfileSection>
                <ProfileImage
                  src={testimonial.image}
                  alt={`${testimonial.name} profile photo`}
                />
                <ProfileInfo>
                  <PersonName>{testimonial.name}</PersonName>
                  <PersonTitle>{testimonial.title}</PersonTitle>
                </ProfileInfo>
              </ProfileSection>

              <QuoteText>"{testimonial.quote}"</QuoteText>

              <ReadMoreLink
                href='#'
                aria-label={`Read full story of ${testimonial.name}`}
              >
                Read Full Story
              </ReadMoreLink>
            </TestimonialCard>
          ))}
        </TestimonialGrid>
      </Container>
    </StoriesSectionContainer>
  );
}

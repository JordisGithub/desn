import { Container, Typography, Box, Button } from "@mui/material";
import { styled } from "@mui/material/styles";
import { useTranslation } from "react-i18next";
import CalendarTodayIcon from "@mui/icons-material/CalendarToday";
import AccessTimeIcon from "@mui/icons-material/AccessTime";
import LocationOnIcon from "@mui/icons-material/LocationOn";
import ArrowForwardIcon from "@mui/icons-material/ArrowForward";

const SectionContainer = styled("section")(({ theme }) => ({
  backgroundColor: "#f9fafb",
  paddingTop: theme.spacing(12),
  paddingBottom: theme.spacing(12),
  [theme.breakpoints.down("md")]: {
    paddingTop: theme.spacing(8),
    paddingBottom: theme.spacing(8),
  },
}));

const ContentGrid = styled(Box)(({ theme }) => ({
  display: "grid",
  gridTemplateColumns: "1fr 1fr",
  gap: theme.spacing(6),
  alignItems: "center",
  [theme.breakpoints.down("md")]: {
    gridTemplateColumns: "1fr",
    gap: theme.spacing(4),
  },
}));

const ContentColumn = styled(Box)({
  display: "flex",
  flexDirection: "column",
  gap: "1.5rem",
});

const FeaturedLabel = styled(Typography)({
  fontSize: "0.875rem",
  fontWeight: 600,
  color: "#00a77f",
  textTransform: "uppercase",
  letterSpacing: "0.1em",
  marginBottom: "0.5rem",
});

const FeaturedTitle = styled(Typography)(({ theme }) => ({
  fontSize: "2rem",
  fontWeight: 400,
  color: "#004c91",
  fontFamily: "'Open Sans', sans-serif",
  lineHeight: 1.3,
  [theme.breakpoints.down("md")]: {
    fontSize: "1.75rem",
  },
}));

const FeaturedDescription = styled(Typography)({
  fontSize: "1.125rem",
  color: "#4a5565",
  lineHeight: 1.6,
});

const EventMeta = styled(Box)({
  display: "flex",
  flexDirection: "column",
  gap: "0.75rem",
});

const MetaItem = styled(Box)({
  display: "flex",
  alignItems: "center",
  gap: "0.75rem",
  "& .MuiSvgIcon-root": {
    fontSize: "1.5rem",
    color: "#004c91",
  },
});

const MetaText = styled(Typography)({
  fontSize: "1rem",
  color: "#364153",
  fontWeight: 500,
});

const LearnMoreButton = styled(Button)({
  backgroundColor: "#004c91",
  color: "white",
  height: "54px",
  borderRadius: "100px",
  fontSize: "1rem",
  textTransform: "none",
  paddingLeft: "2rem",
  paddingRight: "2rem",
  alignSelf: "flex-start",
  "&:hover": {
    backgroundColor: "#003d73",
    transform: "translateY(-2px)",
  },
  transition: "all 0.3s ease",
});

const ImageColumn = styled(Box)(({ theme }) => ({
  [theme.breakpoints.down("md")]: {
    order: -1, // Move image above content on mobile
  },
}));

const FeaturedImage = styled("img")(({ theme }) => ({
  width: "100%",
  height: "400px",
  objectFit: "cover",
  borderRadius: "16px",
  boxShadow: "0px 8px 24px rgba(0, 0, 0, 0.12)",
  [theme.breakpoints.down("md")]: {
    height: "300px",
  },
  [theme.breakpoints.down("sm")]: {
    height: "250px",
  },
}));

export default function FeaturedEvent() {
  useTranslation();

  return (
    <SectionContainer aria-labelledby='featured-event-heading'>
      <Container maxWidth='lg'>
        <ContentGrid>
          <ContentColumn>
            <Box>
              <FeaturedLabel>Featured Event</FeaturedLabel>
              <FeaturedTitle variant='h3' id='featured-event-heading'>
                International Day of Persons with Disabilities
              </FeaturedTitle>
            </Box>

            <FeaturedDescription>
              Celebrating "Innovation for Inclusion" through awareness and
              advocacy. Join us for a day of inspiring talks, interactive
              workshops, and community celebration as we work together towards a
              more inclusive society.
            </FeaturedDescription>

            <EventMeta>
              <MetaItem>
                <CalendarTodayIcon />
                <MetaText>December 3, 2025</MetaText>
              </MetaItem>
              <MetaItem>
                <AccessTimeIcon />
                <MetaText>9:00 AM - 5:00 PM</MetaText>
              </MetaItem>
              <MetaItem>
                <LocationOnIcon />
                <MetaText>DESN Office, Lalitpur, Nepal</MetaText>
              </MetaItem>
            </EventMeta>

            <LearnMoreButton endIcon={<ArrowForwardIcon />}>
              Learn More
            </LearnMoreButton>
          </ContentColumn>

          <ImageColumn>
            <FeaturedImage
              src='https://images.unsplash.com/photo-1511632765486-a01980e01a18?w=800&h=600&fit=crop'
              alt='Group of people collaborating'
              loading='lazy'
            />
          </ImageColumn>
        </ContentGrid>
      </Container>
    </SectionContainer>
  );
}

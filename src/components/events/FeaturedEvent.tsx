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
  backgroundColor: "white",
  borderRadius: "20px",
  padding: theme.spacing(6),
  transition: "all 0.4s cubic-bezier(0.4, 0, 0.2, 1)",
  [theme.breakpoints.down("md")]: {
    gridTemplateColumns: "1fr",
    gap: theme.spacing(4),
    padding: theme.spacing(4),
  },
}));

const ContentColumn = styled(Box)({
  display: "flex",
  flexDirection: "column",
  gap: "1.5rem",
});

const FeaturedLabel = styled(Typography)({
  fontSize: "0.875rem",
  fontWeight: 700,
  color: "#007a56",
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
  height: "56px",
  borderRadius: "100px",
  fontSize: "1.125rem",
  fontWeight: 600,
  textTransform: "none",
  paddingLeft: "2.5rem",
  paddingRight: "2.5rem",
  alignSelf: "flex-start",
  boxShadow: "0 8px 24px rgba(0, 76, 145, 0.4)",
  transition: "all 0.4s cubic-bezier(0.4, 0, 0.2, 1)",
  "&:hover": {
    backgroundColor: "#003366",
    transform: "translateY(-3px) scale(1.05)",
    boxShadow: "0 12px 36px rgba(0, 76, 145, 0.6)",
  },
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
  boxShadow: "0 30px 80px rgba(0, 0, 0, 0.75)",
  transition: "all 0.4s cubic-bezier(0.4, 0, 0.2, 1)",
  "&:hover": {
    boxShadow: "0 40px 100px rgba(0, 0, 0, 0.85)",
    transform: "scale(1.02) translateY(-6px)",
  },
  [theme.breakpoints.down("md")]: {
    height: "300px",
  },
  [theme.breakpoints.down("sm")]: {
    height: "250px",
  },
}));

export default function FeaturedEvent() {
  const { t } = useTranslation();

  return (
    <SectionContainer
      aria-labelledby='featured-event-heading'
      role='region'
      aria-label='Featured Event Section'
    >
      <Container maxWidth='xl' sx={{ px: { xs: 2, sm: 3, md: 6 } }}>
        <ContentGrid
          role='article'
          aria-label={`Featured event: ${t("featured_event_heading")}`}
        >
          <ContentColumn>
            <Box>
              <FeaturedLabel
                aria-label={`Event category: ${t("featured_event_title")}`}
              >
                {t("featured_event_title")}
              </FeaturedLabel>
              <FeaturedTitle variant='h2' id='featured-event-heading'>
                {t("featured_event_heading")}
              </FeaturedTitle>
            </Box>

            <FeaturedDescription>
              {t("featured_event_description")}
            </FeaturedDescription>

            <EventMeta role='list' aria-label='Event details'>
              <MetaItem role='listitem'>
                <CalendarTodayIcon aria-hidden='true' />
                <MetaText>
                  <span className='sr-only'>Event date: </span>
                  {t("featured_event_date")}
                </MetaText>
              </MetaItem>
              <MetaItem role='listitem'>
                <AccessTimeIcon aria-hidden='true' />
                <MetaText>
                  <span className='sr-only'>Event time: </span>
                  {t("featured_event_time")}
                </MetaText>
              </MetaItem>
              <MetaItem role='listitem'>
                <LocationOnIcon aria-hidden='true' />
                <MetaText>
                  <span className='sr-only'>Event location: </span>
                  {t("featured_event_location")}
                </MetaText>
              </MetaItem>
            </EventMeta>

            <LearnMoreButton
              endIcon={<ArrowForwardIcon aria-hidden='true' />}
              aria-label={`Register for ${t(
                "featured_event_heading"
              )} event on ${t("featured_event_date")}`}
            >
              {t("event_register_button")}
            </LearnMoreButton>
          </ContentColumn>

          <ImageColumn aria-hidden='true'>
            <FeaturedImage
              src='https://images.unsplash.com/photo-1511632765486-a01980e01a18?w=800&h=600&fit=crop'
              alt=''
              loading='lazy'
              role='presentation'
            />
          </ImageColumn>
        </ContentGrid>
      </Container>
    </SectionContainer>
  );
}

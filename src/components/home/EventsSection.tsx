import {
  Container,
  Typography,
  Card,
  CardContent,
  CardMedia,
  Stack,
} from "@mui/material";
import { styled } from "@mui/material/styles";
import { Link } from "react-router-dom";
import { useTranslation } from "react-i18next";
import {
  imgEventAirMidPoint,
  imgEventInternationalDay,
  imgEventAirAwardCeremony,
} from "../../constants/figmaAssets";

const EventsContainer = styled("section")({
  backgroundColor: "white",
});

const SectionHeading = styled(Typography)(({ theme }) => ({
  fontSize: "2.5rem",
  fontWeight: 600,
  color: "#004c91",
  marginBottom: theme.spacing(6),
  textAlign: "center",
  textTransform: "capitalize",
  [theme.breakpoints.up("md")]: {
    fontSize: "3rem",
  },
}));

const EventsGrid = styled("div")(({ theme }) => ({
  display: "grid",
  gridTemplateColumns: "1fr",
  gap: theme.spacing(4),
  [theme.breakpoints.up("sm")]: {
    gridTemplateColumns: "repeat(2, 1fr)",
  },
  [theme.breakpoints.up("md")]: {
    gridTemplateColumns: "repeat(3, 1fr)",
  },
}));

const EventCard = styled(Card)({
  height: "100%",
  display: "flex",
  flexDirection: "column",
  "&:focus-within": {
    outline: "3px solid #004c91",
    outlineOffset: "2px",
  },
});

const EventDate = styled("time")({
  backgroundColor: "#f6d469",
  color: "#351c42",
  padding: "0.5rem 1rem",
  borderRadius: "100px",
  fontSize: "1rem",
  fontWeight: 500,
});

const EventTime = styled("span")({
  backgroundColor: "#f6d469",
  color: "#2b2b2b",
  padding: "0.5rem 1rem",
  borderRadius: "100px",
  fontSize: "1rem",
});

const EventTitle = styled(Typography)({
  fontSize: "1.25rem",
  fontWeight: 600,
  color: "#351c42",
  marginBottom: "1rem",
});

const EventTitleLink = styled(Link)({
  color: "#351c42",
  textDecoration: "none",
  "&:hover": {
    textDecoration: "underline",
    color: "#004c91",
  },
  "&:focus": {
    outline: "3px solid #f6d469",
    outlineOffset: "2px",
    borderRadius: "4px",
  },
});

const EventDescription = styled(Typography)({
  marginBottom: "1rem",
  fontSize: "1rem",
  lineHeight: 1.5,
});

const EventOrganizer = styled(Typography)({
  fontSize: "1rem",
});

export default function EventsSection() {
  const { t } = useTranslation();

  const events = [
    {
      id: "air-mid-point-check-in",
      date: "2025-10-24",
      dateLabelKey: "event_1_date",
      timeKey: "event_1_time",
      titleKey: "event_1_title",
      descKey: "event_1_desc",
      organizer: "knowbility",
      image: imgEventAirMidPoint,
      altKey: "event_1_alt",
    },
    {
      id: "international-day-of-persons-with-disabilities",
      date: "2025-12-02",
      dateLabelKey: "event_2_date",
      timeKey: "event_2_time",
      titleKey: "event_2_title",
      descKey: "event_2_desc",
      organizer: "DESN",
      image: imgEventInternationalDay,
      altKey: "event_2_alt",
    },
    {
      id: "air-award-ceremony",
      date: "2026-01-15",
      dateLabelKey: "event_3_date",
      timeKey: "event_3_time",
      titleKey: "event_3_title",
      descKey: "event_3_desc",
      organizer: "knowbility",
      image: imgEventAirAwardCeremony,
      altKey: "event_3_alt",
    },
  ];

  return (
    <EventsContainer
      aria-labelledby='events-heading'
      style={{ paddingTop: "5rem", paddingBottom: "5rem" }}
    >
      <Container maxWidth='lg'>
        <SectionHeading as='h2' id='events-heading'>
          {t("events_heading")}
        </SectionHeading>

        <EventsGrid>
          {events.map((event, index) => (
            <EventCard key={index}>
              <CardMedia
                component='img'
                height='256'
                image={event.image}
                alt={t(event.altKey)}
              />
              <CardContent>
                <Stack direction='row' spacing={1} sx={{ mb: 2 }}>
                  <EventDate dateTime={event.date}>
                    {t(event.dateLabelKey)}
                  </EventDate>
                  <EventTime>{t(event.timeKey)}</EventTime>
                </Stack>
                <EventTitle as='h3'>
                  <EventTitleLink
                    to={`/events/${event.id}`}
                    aria-label={`View details for ${t(event.titleKey)}`}
                  >
                    {t(event.titleKey)}
                  </EventTitleLink>
                </EventTitle>
                <EventDescription>{t(event.descKey)}</EventDescription>
                <EventOrganizer>
                  <strong>{t("event_organizer")}</strong> {event.organizer}
                </EventOrganizer>
              </CardContent>
            </EventCard>
          ))}
        </EventsGrid>
      </Container>
    </EventsContainer>
  );
}

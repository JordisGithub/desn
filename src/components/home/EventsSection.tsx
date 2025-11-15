import { useState, useEffect } from "react";
import {
  Container,
  Typography,
  Card,
  CardContent,
  Stack,
  Button,
} from "@mui/material";
import { styled } from "@mui/material/styles";
import { Link } from "react-router-dom";
import { useTranslation } from "react-i18next";
import ArrowForwardIcon from "@mui/icons-material/ArrowForward";
import OptimizedImage from "../OptimizedImage";
import EventRegistrationModal from "../events/EventRegistrationModal";
import EventService from "../../services/EventService";

const EventsContainer = styled("section")({
  backgroundColor: "white",
  position: "relative",
  "&::before": {
    content: '""',
    position: "absolute",
    top: 0,
    left: 0,
    right: 0,
    height: "2px",
    background:
      "linear-gradient(90deg, transparent, rgba(246, 212, 105, 0.6), transparent)",
  },
});

const SectionHeading = styled(Typography)(({ theme }) => ({
  fontSize: "2.5rem",
  fontWeight: 700,
  color: theme.palette.primary.main,
  marginBottom: theme.spacing(2),
  textAlign: "center",
  fontFamily: "Poppins, sans-serif",
  letterSpacing: "-0.01em",
  lineHeight: 1.2,
  [theme.breakpoints.down("md")]: {
    fontSize: "2rem",
  },
  [theme.breakpoints.down("sm")]: {
    fontSize: "1.625rem",
  },
}));

const SectionSubheading = styled(Typography)(({ theme }) => ({
  fontSize: "1.125rem",
  fontWeight: 400,
  color: "#5a6c7d",
  textAlign: "center",
  maxWidth: "660px",
  margin: "0 auto",
  marginBottom: theme.spacing(6),
  lineHeight: 1.6,
  [theme.breakpoints.down("md")]: {
    fontSize: "1.0625rem",
    marginBottom: theme.spacing(5),
    maxWidth: "90%",
  },
  [theme.breakpoints.down("sm")]: {
    fontSize: "1rem",
    marginBottom: theme.spacing(4),
  },
}));

const EventsGrid = styled("div")(({ theme }) => ({
  display: "grid",
  gridTemplateColumns: "1fr",
  gap: theme.spacing(3),
  [theme.breakpoints.up("sm")]: {
    gridTemplateColumns: "repeat(2, 1fr)",
    gap: theme.spacing(3.5),
  },
  [theme.breakpoints.up("md")]: {
    gridTemplateColumns: "repeat(3, 1fr)",
    gap: theme.spacing(4),
  },
}));

const EventCard = styled(Card)(({ theme }) => ({
  height: "100%",
  display: "flex",
  flexDirection: "column",
  borderRadius: "20px",
  overflow: "hidden",
  transition: "all 0.35s cubic-bezier(0.4, 0, 0.2, 1)",
  boxShadow: "0 6px 20px rgba(0, 0, 0, 0.1)",
  border: "2px solid transparent",
  position: "relative",
  "&::before": {
    content: '""',
    position: "absolute",
    top: 0,
    left: 0,
    right: 0,
    height: "5px",
    background: "linear-gradient(90deg, #f6d469, #00a77f, #004c91)",
    opacity: 0,
    transition: "opacity 0.35s ease",
  },
  "&:hover": {
    transform: "translateY(-8px) scale(1.02)",
    boxShadow: "0 16px 40px rgba(0, 76, 145, 0.2)",
    borderColor: "#f6d469",
    "&::before": {
      opacity: 1,
    },
    "& .event-image": {
      transform: "scale(1.1)",
    },
  },
  "&:focus-within": {
    outline: `3px solid ${theme.palette.primary.main}`,
    outlineOffset: "4px",
    "&::before": {
      opacity: 1,
    },
  },
}));

const ImageWrapper = styled("div")({
  width: "100%",
  aspectRatio: "16 / 9",
  overflow: "hidden",
  flexShrink: 0,
  position: "relative",
  backgroundColor: "#f0f2f5",
  "&::after": {
    content: '""',
    position: "absolute",
    bottom: 0,
    left: 0,
    right: 0,
    height: "50%",
    background: "linear-gradient(to top, rgba(0, 0, 0, 0.3), transparent)",
    pointerEvents: "none",
  },
});

const EventDate = styled("time")(({ theme }) => ({
  backgroundColor: "#004c91",
  color: "white",
  padding: "0.625rem 1.25rem",
  borderRadius: "100px",
  fontSize: "0.9375rem",
  fontWeight: 700,
  fontFamily: "Poppins, sans-serif",
  letterSpacing: "0.5px",
  boxShadow: "0 2px 8px rgba(0, 76, 145, 0.25)",
  [theme.breakpoints.down("sm")]: {
    fontSize: "0.875rem",
    padding: "0.5rem 1rem",
  },
}));

const EventTime = styled("span")(({ theme }) => ({
  backgroundColor: "#00a77f",
  color: "white",
  padding: "0.625rem 1.25rem",
  borderRadius: "100px",
  fontSize: "0.9375rem",
  fontWeight: 600,
  fontFamily: "Poppins, sans-serif",
  boxShadow: "0 2px 8px rgba(0, 167, 127, 0.25)",
  [theme.breakpoints.down("sm")]: {
    fontSize: "0.875rem",
    padding: "0.5rem 1rem",
  },
}));

const EventTitle = styled(Typography)(({ theme }) => ({
  fontSize: "1.375rem",
  fontWeight: 700,
  color: theme.palette.primary.main,
  marginBottom: theme.spacing(1.5),
  lineHeight: 1.3,
  fontFamily: "Poppins, sans-serif",
  [theme.breakpoints.down("md")]: {
    fontSize: "1.25rem",
  },
  [theme.breakpoints.down("sm")]: {
    fontSize: "1.125rem",
    marginBottom: theme.spacing(1.25),
  },
}));

const EventTitleLink = styled(Link)(({ theme }) => ({
  color: theme.palette.primary.main,
  textDecoration: "none",
  transition: "color 0.25s ease",
  "&:hover, &:focus": {
    color: "#006d54",
    textDecoration: "underline",
  },
  "&:focus": {
    outline: `3px solid ${theme.palette.primary.main}`,
    outlineOffset: "3px",
    borderRadius: "4px",
  },
}));

const EventDescription = styled(Typography)(({ theme }) => ({
  marginBottom: theme.spacing(2),
  fontSize: "1.0625rem",
  lineHeight: 1.65,
  color: "#4a5568",
  [theme.breakpoints.down("md")]: {
    fontSize: "1rem",
  },
  [theme.breakpoints.down("sm")]: {
    fontSize: "0.9375rem",
    lineHeight: 1.6,
    marginBottom: theme.spacing(1.5),
  },
}));

const EventOrganizer = styled(Typography)(({ theme }) => ({
  fontSize: "0.9375rem",
  color: "#5a6c7d",
  marginBottom: theme.spacing(2),
  "& strong": {
    color: theme.palette.primary.main,
    fontWeight: 700,
  },
  [theme.breakpoints.down("sm")]: {
    fontSize: "0.875rem",
    marginBottom: theme.spacing(1.5),
  },
}));

const RegisterButton = styled(Button)(({ theme }) => ({
  backgroundColor: "#f6d469",
  color: "#1a2332",
  width: "100%",
  borderRadius: "12px",
  fontSize: "1rem",
  fontWeight: 700,
  padding: "12px 24px",
  textTransform: "uppercase",
  letterSpacing: "0.5px",
  fontFamily: "Poppins, sans-serif",
  transition: "all 0.3s cubic-bezier(0.4, 0, 0.2, 1)",
  boxShadow: "0 4px 12px rgba(246, 212, 105, 0.3)",
  "&:hover": {
    backgroundColor: "#f5c943",
    transform: "translateY(-2px)",
    boxShadow: "0 8px 20px rgba(246, 212, 105, 0.4)",
  },
  "&:focus": {
    outline: `3px solid ${theme.palette.primary.main}`,
    outlineOffset: "3px",
  },
  "&:disabled": {
    backgroundColor: "#e0e0e0",
    color: "#9e9e9e",
    cursor: "not-allowed",
    transform: "none",
    boxShadow: "none",
  },
  [theme.breakpoints.down("sm")]: {
    fontSize: "0.9375rem",
    padding: "10px 20px",
  },
}));

interface EventStatus {
  isFull: boolean;
  currentRegistrations: number;
  maxCapacity: number;
  availableSpots: number;
}

export default function EventsSection() {
  const { t } = useTranslation();
  const [selectedEvent, setSelectedEvent] = useState<{
    id: string;
    title: string;
    date: string;
    time: string;
  } | null>(null);
  const [modalOpen, setModalOpen] = useState(false);
  const [eventStatuses, setEventStatuses] = useState<
    Record<string, EventStatus>
  >({});

  const events = [
    {
      id: "air-mid-point-check-in",
      eventId: 1,
      date: "2025-10-24",
      dateLabelKey: "event_1_date",
      timeKey: "event_1_time",
      titleKey: "event_1_title",
      descKey: "event_1_desc",
      organizer: "knowbility",
      image: "home/events1.jpg",
      altKey: "event_1_alt",
      location: "Virtual Event",
    },
    {
      id: "international-day-of-persons-with-disabilities",
      eventId: 2,
      date: "2025-12-02",
      dateLabelKey: "event_2_date",
      timeKey: "event_2_time",
      titleKey: "event_2_title",
      descKey: "event_2_desc",
      organizer: "DESN",
      image: "home/events2.jpg",
      altKey: "event_2_alt",
      location: "Lalitpur, Nepal",
    },
    {
      id: "air-award-ceremony",
      eventId: 3,
      date: "2026-01-15",
      dateLabelKey: "event_3_date",
      timeKey: "event_3_time",
      titleKey: "event_3_title",
      descKey: "event_3_desc",
      organizer: "knowbility",
      image: "home/events3.jpg",
      altKey: "event_3_alt",
      location: "Virtual Event",
    },
  ];

  // Fetch event statuses on mount
  useEffect(() => {
    const fetchEventStatuses = async () => {
      const statuses: Record<string, EventStatus> = {};

      for (const event of events) {
        try {
          const response = await EventService.getEventById(event.eventId);
          statuses[event.id] = {
            isFull: response.currentAttendees >= response.maxAttendees,
            currentRegistrations: response.currentAttendees,
            maxCapacity: response.maxAttendees,
            availableSpots: response.maxAttendees - response.currentAttendees,
          };
        } catch (error) {
          console.error(
            `Error fetching status for event ${event.eventId}:`,
            error
          );
        }
      }

      setEventStatuses(statuses);
    };

    fetchEventStatuses();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const handleRegisterClick = (event: (typeof events)[0]) => {
    setSelectedEvent({
      id: event.id,
      title: t(event.titleKey),
      date: t(event.dateLabelKey),
      time: t(event.timeKey),
    });
    setModalOpen(true);
  };

  const handleModalClose = () => {
    setModalOpen(false);
    setSelectedEvent(null);
  };

  const handleRegistrationSuccess = () => {
    // Refresh event statuses after successful registration
    if (selectedEvent) {
      const event = events.find((e) => e.id === selectedEvent.id);
      if (event) {
        EventService.getEventById(event.eventId)
          .then((response) => {
            setEventStatuses((prev) => ({
              ...prev,
              [event.id]: {
                isFull: response.currentAttendees >= response.maxAttendees,
                currentRegistrations: response.currentAttendees,
                maxCapacity: response.maxAttendees,
                availableSpots:
                  response.maxAttendees - response.currentAttendees,
              },
            }));
          })
          .catch((error) => {
            console.error("Error refreshing event status:", error);
          });
      }
    }
  };

  return (
    <EventsContainer
      aria-labelledby='events-heading'
      style={{ paddingTop: "5rem", paddingBottom: "5rem" }}
    >
      <Container maxWidth='xl' sx={{ px: { xs: 2, sm: 3, md: 6 } }}>
        <SectionHeading as='h2' id='events-heading'>
          {t("events_heading")}
        </SectionHeading>

        <SectionSubheading>
          Join us for upcoming events, workshops, and celebrations that promote
          inclusion and accessibility for all.
        </SectionSubheading>

        <EventsGrid>
          {events.map((event, index) => (
            <EventCard key={index}>
              <ImageWrapper>
                <OptimizedImage
                  src={event.image}
                  alt={t(event.altKey)}
                  loading='lazy'
                  sizes='(max-width: 600px) 100vw, (max-width: 960px) 50vw, 33vw'
                  className='event-image'
                  style={{
                    width: "100%",
                    height: "100%",
                    objectFit: "cover",
                    objectPosition: "center",
                    display: "block",
                    transition: "transform 0.35s cubic-bezier(0.4, 0, 0.2, 1)",
                  }}
                />
              </ImageWrapper>
              <CardContent>
                <Stack direction='row' spacing={1} sx={{ mb: 2 }}>
                  <EventDate dateTime={event.date}>
                    {t(event.dateLabelKey)}
                  </EventDate>
                  <EventTime>{t(event.timeKey)}</EventTime>
                </Stack>
                <EventTitle as='h3'>
                  <EventTitleLink to={`/events/${event.id}`}>
                    {t(event.titleKey)}
                  </EventTitleLink>
                </EventTitle>
                <EventDescription>{t(event.descKey)}</EventDescription>
                <EventOrganizer>
                  <strong>{t("event_organizer")}</strong> {event.organizer}
                </EventOrganizer>
                <RegisterButton
                  aria-label={`Register for ${t(event.titleKey)}`}
                  endIcon={
                    !eventStatuses[event.id]?.isFull ? (
                      <ArrowForwardIcon />
                    ) : undefined
                  }
                  onClick={() => handleRegisterClick(event)}
                  disabled={eventStatuses[event.id]?.isFull}
                >
                  {eventStatuses[event.id]?.isFull
                    ? "Event Full"
                    : "Register Now"}
                </RegisterButton>
              </CardContent>
            </EventCard>
          ))}
        </EventsGrid>
      </Container>

      {selectedEvent && (
        <EventRegistrationModal
          open={modalOpen}
          onClose={handleModalClose}
          eventId={events.find((e) => e.id === selectedEvent.id)?.eventId || 0}
          eventTitle={selectedEvent.title}
          eventDate={selectedEvent.date}
          eventTime={selectedEvent.time}
          eventLocation={
            events.find((e) => e.id === selectedEvent.id)?.location || ""
          }
          onRegistrationSuccess={handleRegistrationSuccess}
        />
      )}
    </EventsContainer>
  );
}

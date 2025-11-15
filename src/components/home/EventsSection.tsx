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
  backgroundColor: "#f5f5f5",
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
  gap: theme.spacing(3),
  [theme.breakpoints.up("sm")]: {
    gridTemplateColumns: "repeat(2, 1fr)",
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
  borderRadius: theme.spacing(2),
  transition: "transform 0.3s ease, box-shadow 0.3s ease",
  boxShadow: "0 4px 12px rgba(0, 0, 0, 0.08)",
  "&:hover": {
    transform: "translateY(-4px)",
    boxShadow: "0 8px 24px rgba(0, 76, 145, 0.15)",
  },
  "&:focus-within": {
    outline: "3px solid #004c91",
    outlineOffset: "2px",
  },
}));

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
  "&:hover, &:focus": {
    textDecoration: "underline",
    color: "#004c91",
    fontWeight: 700,
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

const RegisterButton = styled(Button)({
  backgroundColor: "#004c91",
  color: "white",
  width: "100%",
  borderRadius: "8px",
  fontSize: "0.875rem",
  fontWeight: 500,
  padding: "8px 16px",
  marginTop: "1rem",
  textTransform: "none",
  "&:hover, &:focus": {
    backgroundColor: "#003d73",
    fontWeight: 700,
  },
  "&:focus": {
    outline: "3px solid #f6d469",
    outlineOffset: "2px",
  },
});

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

        <EventsGrid>
          {events.map((event, index) => (
            <EventCard key={index}>
              <div
                style={{
                  width: "100%",
                  aspectRatio: "16 / 9",
                  overflow: "hidden",
                  flexShrink: 0,
                  borderRadius: "16px 16px 0 0",
                }}
              >
                <OptimizedImage
                  src={event.image}
                  alt={t(event.altKey)}
                  loading='lazy'
                  sizes='(max-width: 600px) 400px, (max-width: 960px) 50vw, 33vw'
                  style={{
                    width: "100%",
                    height: "100%",
                    objectFit: "cover",
                    objectPosition: "center",
                    display: "block",
                  }}
                />
              </div>
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
                  sx={{
                    backgroundColor: eventStatuses[event.id]?.isFull
                      ? "#e0e0e0"
                      : "#004c91",
                    color: eventStatuses[event.id]?.isFull
                      ? "#9e9e9e"
                      : "white",
                    cursor: eventStatuses[event.id]?.isFull
                      ? "not-allowed"
                      : "pointer",
                    "&:hover": {
                      backgroundColor: eventStatuses[event.id]?.isFull
                        ? "#e0e0e0"
                        : "#003d73",
                    },
                  }}
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

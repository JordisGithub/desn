import { useState, useEffect } from "react";
import {
  Container,
  Typography,
  Card,
  CardContent,
  Stack,
  Box,
} from "@mui/material";
import { styled } from "@mui/material/styles";
import { useTranslation } from "react-i18next";
import ArrowForwardIcon from "@mui/icons-material/ArrowForward";
import EventRegistrationModal from "../events/EventRegistrationModal";
import EventService from "../../services/EventService";
import { getEventDisplayImageUrl } from "../../utils/eventImages";
import {
  translateEventDescription,
  translateEventDate,
  translateEventLocation,
  translateEventTime,
  translateEventTitle,
} from "../../utils/eventTranslations";
import {
  formatDate,
  formatDateWithDay,
  formatTimeRange,
} from "../../utils/dateLocalization";

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
  [theme.breakpoints.up("lg")]: {
    gridTemplateColumns: "repeat(auto-fill, minmax(320px, 1fr))",
    gap: theme.spacing(4),
  },
  "@media (max-width: 1600px)": {
    overflowX: "auto",
    gridTemplateColumns: "repeat(auto-fit, minmax(300px, 1fr))",
    paddingBottom: theme.spacing(1),
    "&::-webkit-scrollbar": {
      height: "8px",
    },
    "&::-webkit-scrollbar-track": {
      backgroundColor: "#f1f1f1",
      borderRadius: "10px",
    },
    "&::-webkit-scrollbar-thumb": {
      backgroundColor: "#004c91",
      borderRadius: "10px",
      "&:hover": {
        backgroundColor: "#003a6b",
      },
    },
  },
}));

const EventCard = styled(Card)(() => ({
  height: "100%",
  display: "flex",
  flexDirection: "column",
  justifyContent: "space-between",
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
  backgroundColor: "#007056",
  color: "white",
  padding: "0.625rem 1.25rem",
  borderRadius: "100px",
  fontSize: "0.9375rem",
  fontWeight: 700,
  fontFamily: "Poppins, sans-serif",
  boxShadow: "0 2px 8px rgba(0, 112, 86, 0.25)",
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

const RegisterButton = styled("button")(({ theme }) => ({
  backgroundColor: "#f6d469",
  color: "#003d73",
  width: "100%",
  borderRadius: "12px",
  fontSize: "1rem",
  fontWeight: 700,
  padding: "12px 24px",
  textTransform: "uppercase",
  letterSpacing: "0.02em",
  fontFamily: "Poppins, sans-serif",
  cursor: "pointer",
  border: "none",
  boxShadow: "0 4px 12px rgba(246, 212, 105, 0.3)",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  gap: "8px",
  "&:hover": {
    backgroundColor: "#004c91",
    color: "#ffffff",
  },
  "&:focus": {
    outline: "3px solid #004c91",
    outlineOffset: "2px",
    color: "#ffffff",
  },
  "&:disabled": {
    backgroundColor: "#e0e0e0",
    color: "#9e9e9e",
    cursor: "not-allowed",
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

interface EventData {
  id: number;
  title: string;
  description: string;
  startDate: string;
  endDate: string;
  location: string;
  maxAttendees: number;
  currentAttendees: number;
  featured?: boolean;
  imageUrl?: string;
}

export default function EventsSection() {
  const { t, i18n } = useTranslation();

  const [selectedEvent, setSelectedEvent] = useState<{
    id: number;
    title: string;
    date: string;
    time: string;
    location: string;
  } | null>(null);
  const [modalOpen, setModalOpen] = useState(false);
  const [eventStatuses, setEventStatuses] = useState<
    Record<number, EventStatus>
  >({});
  const [events, setEvents] = useState<EventData[]>([]);
  const [languageKey, setLanguageKey] = useState(i18n.language);

  // Force re-render when language changes
  useEffect(() => {
    setLanguageKey(i18n.language);
  }, [i18n.language]);

  useEffect(() => {
    if (typeof window === "undefined") return;
    if (import.meta.env.MODE === "test") return;

    const fetchEvents = async () => {
      try {
        const backendEvents = await EventService.getUpcomingEvents();
        setEvents(backendEvents);
      } catch (error) {
        console.error("Error fetching events:", error);
        setEvents([]);
      }
    };

    fetchEvents();
  }, []);

  useEffect(() => {
    if (events.length === 0) return;

    const fetchEventStatuses = async () => {
      const statuses: Record<number, EventStatus> = {};

      for (const event of events) {
        try {
          statuses[event.id] = {
            isFull: event.currentAttendees >= event.maxAttendees,
            currentRegistrations: event.currentAttendees,
            maxCapacity: event.maxAttendees,
            availableSpots: event.maxAttendees - event.currentAttendees,
          };
        } catch (error) {
          console.error(
            `Error processing status for event ${event.id}:`,
            error
          );
        }
      }

      setEventStatuses(statuses);
    };

    fetchEventStatuses();
  }, [events]);

  const handleRegisterClick = (payload: {
    event: EventData;
    localizedTitle: string;
    localizedDate: string;
    localizedTime: string;
    localizedLocation: string;
  }) => {
    const {
      event,
      localizedTitle,
      localizedDate,
      localizedTime,
      localizedLocation,
    } = payload;

    setSelectedEvent({
      id: event.id,
      title: localizedTitle,
      date: localizedDate,
      time: localizedTime,
      location: localizedLocation,
    });
    setModalOpen(true);
  };

  const handleModalClose = () => {
    setModalOpen(false);
    setSelectedEvent(null);
  };

  const handleRegistrationSuccess = () => {
    if (selectedEvent) {
      const event = events.find((e) => e.id === selectedEvent.id);
      if (event) {
        EventService.getEventById(event.id)
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

        <SectionSubheading>{t("events_section_intro")}</SectionSubheading>

        <EventsGrid>
          {events.length === 0 ? (
            <Typography
              sx={{
                gridColumn: "1 / -1",
                textAlign: "center",
                color: "#666",
                py: 4,
              }}
            >
              {t("no_events")}
            </Typography>
          ) : (
            events.map((event) => {
              const startDate = new Date(event.startDate);
              const endDate = new Date(event.endDate);
              const status = eventStatuses[event.id];
              const imageSrc = getEventDisplayImageUrl(
                event.id,
                event.imageUrl
              );

              const translatedTitle = translateEventTitle(event.title, t);
              const translatedDescription = translateEventDescription(
                event.description,
                t
              );
              const translatedLocation = translateEventLocation(
                event.location,
                t
              );
              const currentLanguage = i18n.language || "en";
              const formattedCardDate = formatDate(startDate, currentLanguage);
              const formattedTimeRange = formatTimeRange(
                startDate,
                endDate,
                currentLanguage
              );
              const formattedModalDate = formatDateWithDay(
                startDate,
                currentLanguage
              );

              // Debug logging
              if (event.id === 3 && currentLanguage === "ne") {
                console.log("Event 3 (Annual Meeting) formatting:", {
                  language: currentLanguage,
                  startDate: startDate.toISOString(),
                  formattedCardDate,
                  formattedTimeRange,
                });
              }
              const localizedCardDate = translateEventDate(
                event.title,
                t,
                formattedCardDate
              );
              const localizedModalDate = translateEventDate(
                event.title,
                t,
                formattedModalDate
              );
              const localizedTimeRange = translateEventTime(
                event.title,
                t,
                formattedTimeRange
              );

              return (
                <EventCard key={`${event.id}-${languageKey}`}>
                  <ImageWrapper>
                    {imageSrc ? (
                      <img
                        src={imageSrc}
                        alt={translatedTitle}
                        loading='lazy'
                        className='event-image'
                        style={{
                          width: "100%",
                          height: "100%",
                          objectFit: "cover",
                          objectPosition: "center",
                          display: "block",
                          transition:
                            "transform 0.35s cubic-bezier(0.4, 0, 0.2, 1)",
                        }}
                      />
                    ) : (
                      <Box
                        sx={{
                          width: "100%",
                          height: "100%",
                          backgroundColor: "#f0f0f0",
                          display: "flex",
                          alignItems: "center",
                          justifyContent: "center",
                          minHeight: "250px",
                        }}
                      >
                        <Typography color='text.secondary'>
                          {t("event_image_placeholder")}
                        </Typography>
                      </Box>
                    )}
                  </ImageWrapper>
                  <CardContent>
                    <Stack direction='row' spacing={1} sx={{ mb: 2 }}>
                      <EventDate dateTime={event.startDate}>
                        {localizedCardDate}
                      </EventDate>
                      <EventTime>{localizedTimeRange}</EventTime>
                    </Stack>
                    <EventTitle as='h3'>{translatedTitle}</EventTitle>
                    <EventDescription>{translatedDescription}</EventDescription>
                    {translatedLocation && (
                      <EventOrganizer>
                        <strong>{t("event_location_label")}</strong>{" "}
                        {translatedLocation}
                      </EventOrganizer>
                    )}
                    <EventOrganizer>
                      <strong>{t("event_organizer")}</strong> DESN
                    </EventOrganizer>
                    <RegisterButton
                      aria-label={`${t("register_now")}: ${translatedTitle}`}
                      onClick={() =>
                        handleRegisterClick({
                          event,
                          localizedTitle: translatedTitle,
                          localizedDate: localizedModalDate,
                          localizedTime: localizedTimeRange,
                          localizedLocation: translatedLocation,
                        })
                      }
                      disabled={status?.isFull}
                    >
                      {status?.isFull ? t("event_full") : t("register_now")}
                      {!status?.isFull && (
                        <ArrowForwardIcon sx={{ fontSize: "1rem" }} />
                      )}
                    </RegisterButton>
                  </CardContent>
                </EventCard>
              );
            })
          )}
        </EventsGrid>
      </Container>

      {selectedEvent && (
        <EventRegistrationModal
          open={modalOpen}
          onClose={handleModalClose}
          eventId={selectedEvent.id}
          eventTitle={selectedEvent.title}
          eventDate={selectedEvent.date}
          eventTime={selectedEvent.time}
          eventLocation={selectedEvent.location}
          onRegistrationSuccess={handleRegistrationSuccess}
        />
      )}
    </EventsContainer>
  );
}

import { useState, useEffect } from "react";
import { Container, Typography, Box, Button, Chip } from "@mui/material";
import { styled } from "@mui/material/styles";
import { useTranslation } from "react-i18next";
import CalendarTodayIcon from "@mui/icons-material/CalendarToday";
import AccessTimeIcon from "@mui/icons-material/AccessTime";
import LocationOnIcon from "@mui/icons-material/LocationOn";
import ArrowForwardIcon from "@mui/icons-material/ArrowForward";
import ChevronLeftIcon from "@mui/icons-material/ChevronLeft";
import ChevronRightIcon from "@mui/icons-material/ChevronRight";
import EventRegistrationModal from "./EventRegistrationModal";
import EventService from "../../services/EventService";
import {
  translateEventTitle,
  translateEventDescription,
  translateEventLocation,
} from "../../utils/eventTranslations";
import { formatDate, formatTimeRange } from "../../utils/dateLocalization";

const SectionContainer = styled("section")(({ theme }) => ({
  backgroundColor: "white",
  paddingTop: theme.spacing(12),
  paddingBottom: theme.spacing(12),
  [theme.breakpoints.down("md")]: {
    paddingTop: theme.spacing(8),
    paddingBottom: theme.spacing(8),
  },
}));

const SectionTitle = styled(Typography)(({ theme }) => ({
  fontSize: "3rem",
  fontWeight: 400,
  color: "#004c91",
  marginBottom: theme.spacing(2),
  textAlign: "center",
  fontFamily: "'Open Sans', sans-serif",
  [theme.breakpoints.down("md")]: {
    fontSize: "2.5rem",
  },
  [theme.breakpoints.down("sm")]: {
    fontSize: "2rem",
  },
}));

const SectionSubtitle = styled(Typography)(({ theme }) => ({
  fontSize: "1.125rem",
  color: "#4a5565",
  textAlign: "center",
  marginBottom: theme.spacing(6),
}));

const ContentGrid = styled(Box)(({ theme }) => ({
  display: "grid",
  gridTemplateColumns: "1fr 1fr",
  gap: theme.spacing(4),
  [theme.breakpoints.down("md")]: {
    gridTemplateColumns: "1fr",
  },
}));

const CalendarCard = styled(Box)(({ theme }) => ({
  backgroundColor: "white",
  border: "none",
  borderRadius: "16px",
  padding: theme.spacing(2.5),
  boxShadow: "0 4px 12px rgba(0, 0, 0, 0.08)",
  maxWidth: "380px",
  margin: "0 auto",
  alignSelf: "flex-start",
  [theme.breakpoints.down("md")]: {
    maxWidth: "100%",
  },
}));

const CalendarHeader = styled(Typography)({
  fontSize: "0.875rem",
  fontWeight: 600,
  color: "#004c91",
  textAlign: "center",
  marginBottom: "1rem",
  fontFamily: "'Poppins', sans-serif",
  textTransform: "uppercase",
  letterSpacing: "0.05em",
});

const Calendar = styled(Box)(({ theme }) => ({
  border: "none",
  borderRadius: "12px",
  padding: theme.spacing(1.5),
  backgroundColor: "#fafafa",
}));

const CalendarNav = styled(Box)({
  display: "flex",
  alignItems: "center",
  justifyContent: "space-between",
  marginBottom: "1rem",
});

const MonthYear = styled(Typography)({
  fontSize: "0.875rem",
  fontWeight: 500,
  color: "#2b2b2b",
});

const NavButton = styled(Button)({
  minWidth: "36px",
  width: "36px",
  height: "36px",
  padding: "4px",
  border: "2px solid #004c91",
  borderRadius: "8px",
  backgroundColor: "#004c91",
  cursor: "pointer",
  transition: "all 0.2s ease",
  "&:hover": {
    backgroundColor: "#003d73",
    borderColor: "#003d73",
    transform: "scale(1.05)",
  },
  "& .MuiSvgIcon-root": {
    fontSize: "1.25rem",
    color: "white",
  },
});

const CalendarGrid = styled(Box)({
  display: "grid",
  gridTemplateColumns: "repeat(7, 1fr)",
  gap: "0",
});

const DayHeader = styled(Typography)({
  fontSize: "0.8rem",
  color: "#717182",
  textAlign: "center",
  padding: "0.25rem",
  marginBottom: "0.25rem",
});

const DayCell = styled(Button, {
  shouldForwardProp: (prop) =>
    prop !== "isToday" && prop !== "hasEvent" && prop !== "isOtherMonth",
})<{
  isToday?: boolean;
  hasEvent?: boolean;
  isOtherMonth?: boolean;
}>(({ isToday, hasEvent, isOtherMonth }) => ({
  minWidth: "32px",
  width: "32px",
  height: "32px",
  padding: "0",
  fontSize: "0.875rem",
  color: hasEvent ? "#ffffff" : isOtherMonth ? "#717182" : "#004c91",
  backgroundColor: hasEvent ? "#00875f" : "transparent",
  borderRadius: "8px",
  border: isToday && !hasEvent ? "2px solid #004c91" : "none",
  "&:hover": {
    backgroundColor: hasEvent ? "#006644" : "#f3f4f6",
  },
  ...(hasEvent && {
    fontWeight: 700,
  }),
}));

const Note = styled(Box)({
  backgroundColor: "rgba(246, 212, 105, 0.15)",
  borderRadius: "10px",
  padding: "0.75rem",
  marginTop: "1rem",
});

const NoteText = styled(Typography)({
  fontSize: "0.75rem",
  color: "#364153",
  lineHeight: 1.4,
  "& strong": {
    fontWeight: 700,
  },
});

const EventsColumn = styled(Box)({
  display: "flex",
  flexDirection: "column",
  gap: "1.5rem",
});

const EventsHeader = styled(Typography)({
  fontSize: "1rem",
  fontWeight: 400,
  color: "#004c91",
  fontFamily: "'Poppins', sans-serif",
  marginBottom: "0.5rem",
});

const EventCard = styled(Box)(({ theme }) => ({
  backgroundColor: "white",
  border: "none",
  borderRadius: "16px",
  padding: theme.spacing(3),
  boxShadow: "0 18px 48px rgba(0, 0, 0, 0.45)",
  transition: "all 0.4s cubic-bezier(0.4, 0, 0.2, 1)",
  "&:hover": {
    boxShadow: "0 24px 60px rgba(0, 0, 0, 0.65)",
    transform: "translateY(-6px) scale(1.02)",
  },
}));

const BadgeContainer = styled(Box)({
  display: "flex",
  gap: "0.5rem",
  marginBottom: "1rem",
  flexWrap: "wrap",
});

const EventBadge = styled(Chip)(({ color }) => ({
  backgroundColor: color === "primary" ? "#f6d469" : "transparent",
  border: color === "secondary" ? "1px solid #004c91" : "none",
  color: color === "primary" ? "#351c42" : "#004c91",
  fontSize: "0.75rem",
  fontWeight: 500,
  height: "22px",
  "& .MuiChip-label": {
    padding: "3px 9px",
  },
}));

const EventTitle = styled(Typography)({
  fontSize: "1rem",
  fontWeight: 400,
  color: "#004c91",
  marginBottom: "1rem",
  fontFamily: "'Poppins', sans-serif",
});

const EventDescription = styled(Typography)({
  fontSize: "1rem",
  color: "#364153",
  marginBottom: "1.5rem",
  lineHeight: 1.5,
});

const EventMeta = styled(Box)({
  display: "flex",
  flexDirection: "column",
  gap: "0.5rem",
  marginBottom: "1.5rem",
});

const MetaItem = styled(Box)({
  display: "flex",
  alignItems: "center",
  gap: "0.5rem",
  "& .MuiSvgIcon-root": {
    fontSize: "1.25rem",
    color: "#4a5565",
  },
});

const MetaText = styled(Typography)({
  fontSize: "1rem",
  color: "#4a5565",
});

const RegisterButton = styled(Button)({
  backgroundColor: "#004c91",
  color: "white",
  width: "100%",
  height: "52px",
  borderRadius: "12px",
  fontSize: "1rem",
  fontWeight: 600,
  textTransform: "none",
  boxShadow: "0 8px 24px rgba(0, 76, 145, 0.35)",
  transition: "all 0.3s cubic-bezier(0.4, 0, 0.2, 1)",
  "&:hover": {
    backgroundColor: "#003366",
    boxShadow: "0 12px 32px rgba(0, 76, 145, 0.5)",
    transform: "translateY(-2px)",
  },
});

interface EventStatus {
  isFull: boolean;
  currentRegistrations: number;
  maxCapacity: number;
  availableSpots: number;
}

interface EventData {
  id: number;
  eventId: number; // Changed from string to number
  type: string;
  organizer: string;
  title: string;
  description: string;
  date: string;
  time: string;
  location: string;
  calendarDate: number | null;
}

export default function UpcomingEvents() {
  const { t, i18n } = useTranslation();
  const [currentDate, setCurrentDate] = useState(new Date(2025, 10, 1)); // November 2025
  const [selectedDate, setSelectedDate] = useState<number | null>(null);
  const [selectedEvent, setSelectedEvent] = useState<EventData | null>(null);
  const [modalOpen, setModalOpen] = useState(false);
  const [eventStatuses, setEventStatuses] = useState<
    Record<number, EventStatus>
  >({});
  const [events, setEvents] = useState<EventData[]>([]);

  // Fetch events from backend
  useEffect(() => {
    const fetchEvents = async () => {
      try {
        const backendEvents = await EventService.getUpcomingEvents();

        // Transform backend events to frontend format
        const transformedEvents: EventData[] = backendEvents.map((event) => {
          const startDate = new Date(event.startDate);
          const endDate = new Date(event.endDate);

          return {
            id: event.id,
            eventId: event.id, // Use numeric ID
            type: "Event",
            organizer: "DESN",
            title: event.title,
            description: event.description,
            date: formatDate(startDate, i18n.language),
            time: formatTimeRange(startDate, endDate, i18n.language),
            location: event.location,
            calendarDate: startDate.getDate(),
          };
        });

        setEvents(transformedEvents);
      } catch (error) {
        console.error("Error fetching events:", error);
      }
    };

    fetchEvents();
  }, [i18n.language]); // Re-fetch when language changes to update date/time formatting

  // Fetch event statuses after events are loaded
  useEffect(() => {
    if (events.length === 0) return;

    const fetchEventStatuses = async () => {
      const statuses: Record<number, EventStatus> = {};

      for (const event of events) {
        try {
          const response = await EventService.getEventById(event.eventId);
          statuses[event.eventId] = {
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
  }, [events]);

  const handleRegisterClick = (event: EventData) => {
    setSelectedEvent(event);
    setModalOpen(true);
  };

  const handleModalClose = () => {
    setModalOpen(false);
    setSelectedEvent(null);
  };

  const handleRegistrationSuccess = () => {
    // Refresh event statuses after successful registration
    const refreshEventStatus = async () => {
      if (selectedEvent) {
        try {
          const response = await EventService.getEventById(
            selectedEvent.eventId
          );
          setEventStatuses((prev) => ({
            ...prev,
            [selectedEvent.eventId]: {
              isFull: response.currentAttendees >= response.maxAttendees,
              currentRegistrations: response.currentAttendees,
              maxCapacity: response.maxAttendees,
              availableSpots: response.maxAttendees - response.currentAttendees,
            },
          }));
        } catch (error) {
          console.error("Error refreshing event status:", error);
        }
      }
    };

    refreshEventStatus();
  };

  const daysInMonth = new Date(
    currentDate.getFullYear(),
    currentDate.getMonth() + 1,
    0
  ).getDate();
  const firstDayOfMonth = new Date(
    currentDate.getFullYear(),
    currentDate.getMonth(),
    1
  ).getDay();

  const generateCalendarDays = () => {
    const days = [];
    const prevMonthDays = new Date(
      currentDate.getFullYear(),
      currentDate.getMonth(),
      0
    ).getDate();

    // Get all event dates for the CURRENT DISPLAYED month and year only
    const eventDates = new Set(
      events
        .filter((event) => {
          // Parse the event date to check if it matches current displayed month/year
          const eventDate = new Date(event.date);
          return (
            eventDate.getMonth() === currentDate.getMonth() &&
            eventDate.getFullYear() === currentDate.getFullYear()
          );
        })
        .map((event) => event.calendarDate)
        .filter((date) => date !== null)
    );

    const today = new Date();
    const isCurrentMonth =
      currentDate.getMonth() === today.getMonth() &&
      currentDate.getFullYear() === today.getFullYear();

    // Previous month days
    for (let i = firstDayOfMonth - 1; i >= 0; i--) {
      days.push({
        day: prevMonthDays - i,
        isOtherMonth: true,
        isToday: false,
        hasEvent: false,
      });
    }

    // Current month days
    for (let i = 1; i <= daysInMonth; i++) {
      days.push({
        day: i,
        isOtherMonth: false,
        isToday: isCurrentMonth && i === today.getDate(),
        hasEvent: eventDates.has(i),
      });
    }

    // Next month days
    const remainingDays = 42 - days.length;
    for (let i = 1; i <= remainingDays; i++) {
      days.push({
        day: i,
        isOtherMonth: true,
        isToday: false,
        hasEvent: false,
      });
    }

    return days;
  };

  const monthYear = currentDate.toLocaleDateString("en-US", {
    month: "long",
    year: "numeric",
  });

  const handlePreviousMonth = () => {
    setCurrentDate(
      new Date(currentDate.getFullYear(), currentDate.getMonth() - 1, 1)
    );
    setSelectedDate(null);
  };

  const handleNextMonth = () => {
    setCurrentDate(
      new Date(currentDate.getFullYear(), currentDate.getMonth() + 1, 1)
    );
    setSelectedDate(null);
  };

  return (
    <SectionContainer
      aria-labelledby='upcoming-events-heading'
      role='region'
      aria-label='Upcoming Events Section'
    >
      <Container maxWidth='xl' sx={{ px: { xs: 2, sm: 3, md: 6 } }}>
        <SectionTitle variant='h2' id='upcoming-events-heading'>
          {t("events_upcoming_title")}
        </SectionTitle>
        <SectionSubtitle>{t("events_upcoming_subtitle")}</SectionSubtitle>

        <ContentGrid
          role='group'
          aria-label='Event calendar and event listings'
        >
          {/* Calendar */}
          <CalendarCard role='region' aria-label='Event calendar' tabIndex={0}>
            <CalendarHeader id='calendar-heading'>
              {t("calendar_heading")}
            </CalendarHeader>
            <Calendar role='application' aria-labelledby='calendar-heading'>
              <CalendarNav role='group' aria-label='Calendar navigation'>
                <NavButton
                  onClick={handlePreviousMonth}
                  aria-label={`Previous month. Current month is ${monthYear}`}
                >
                  <ChevronLeftIcon aria-hidden='true' />
                </NavButton>
                <MonthYear aria-live='polite' aria-atomic='true'>
                  {monthYear}
                </MonthYear>
                <NavButton
                  onClick={handleNextMonth}
                  aria-label={`Next month. Current month is ${monthYear}`}
                >
                  <ChevronRightIcon aria-hidden='true' />
                </NavButton>
              </CalendarNav>

              <CalendarGrid
                role='grid'
                aria-label={`Calendar for ${monthYear}`}
              >
                <Box role='row' sx={{ display: "contents" }}>
                  {["Su", "Mo", "Tu", "We", "Th", "Fr", "Sa"].map((day) => (
                    <DayHeader key={day} role='columnheader'>
                      {day}
                    </DayHeader>
                  ))}
                </Box>
                {Array.from(
                  { length: Math.ceil(generateCalendarDays().length / 7) },
                  (_, weekIndex) => (
                    <Box
                      key={weekIndex}
                      role='row'
                      sx={{ display: "contents" }}
                    >
                      {generateCalendarDays()
                        .slice(weekIndex * 7, (weekIndex + 1) * 7)
                        .map((dayInfo, index) => (
                          <DayCell
                            key={weekIndex * 7 + index}
                            isToday={dayInfo.isToday}
                            hasEvent={dayInfo.hasEvent}
                            isOtherMonth={dayInfo.isOtherMonth}
                            onClick={() =>
                              !dayInfo.isOtherMonth &&
                              setSelectedDate(dayInfo.day)
                            }
                            aria-label={
                              dayInfo.isOtherMonth
                                ? `${dayInfo.day}, not in current month`
                                : `${monthYear.split(" ")[0]} ${dayInfo.day}${
                                    dayInfo.hasEvent
                                      ? ", has scheduled event"
                                      : ", no events"
                                  }${dayInfo.isToday ? ", today" : ""}`
                            }
                            aria-current={dayInfo.isToday ? "date" : undefined}
                            disabled={dayInfo.isOtherMonth}
                            role='gridcell'
                            tabIndex={dayInfo.isOtherMonth ? -1 : 0}
                            sx={{
                              cursor: dayInfo.isOtherMonth
                                ? "default"
                                : "pointer",
                            }}
                          >
                            {dayInfo.day}
                          </DayCell>
                        ))}
                    </Box>
                  )
                )}
              </CalendarGrid>
            </Calendar>

            <Note>
              <NoteText>
                <strong>Note:</strong> {t("calendar_note")}
              </NoteText>
            </Note>
          </CalendarCard>

          {/* Event Details */}
          <EventsColumn role='region' aria-live='polite' aria-atomic='false'>
            <Box
              sx={{
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
                mb: 2,
              }}
            >
              <EventsHeader sx={{ mb: 0 }} id='event-list-heading'>
                {selectedDate
                  ? `${t("events_on_date")} ${
                      monthYear.split(" ")[0]
                    } ${selectedDate}`
                  : t("event_details_heading")}
              </EventsHeader>
              {selectedDate && (
                <Button
                  onClick={() => setSelectedDate(null)}
                  aria-label={`Clear date filter. Currently showing events for ${
                    monthYear.split(" ")[0]
                  } ${selectedDate}`}
                  sx={{
                    textTransform: "none",
                    color: "#004c91",
                    fontSize: "0.875rem",
                    fontWeight: 500,
                    "&:hover": {
                      backgroundColor: "rgba(0, 76, 145, 0.08)",
                    },
                  }}
                >
                  {t("clear_filter")}
                </Button>
              )}
            </Box>
            <div role='status' aria-live='polite' className='sr-only'>
              {selectedDate
                ? `${t("showing_events_for")} ${
                    events.filter(
                      (event) => event.calendarDate === selectedDate
                    ).length
                  } ${t("events_for_date")} ${
                    monthYear.split(" ")[0]
                  } ${selectedDate}`
                : `${t("showing_all_events")} ${events.length} ${t(
                    "upcoming_events_count"
                  )}`}
            </div>
            {selectedDate
              ? events
                  .filter((event) => event.calendarDate === selectedDate)
                  .map((event) => {
                    const status = eventStatuses[event.eventId];
                    const isFull = status?.isFull || false;

                    return (
                      <EventCard
                        key={event.id}
                        role='article'
                        aria-labelledby={`event-title-${event.id}`}
                        aria-describedby={`event-desc-${event.id} event-meta-${event.id}`}
                        tabIndex={0}
                      >
                        <BadgeContainer
                          role='group'
                          aria-label='Event categories'
                        >
                          <EventBadge
                            label={t("event_type_label")}
                            color='primary'
                            aria-label={`${t("event_type_label")}: ${t(
                              "event_type_label"
                            )}`}
                          />
                          <EventBadge
                            label='DESN'
                            color='secondary'
                            aria-label={`${t("organized_by_label")} DESN`}
                          />
                          {status && (
                            <Chip
                              label={`${status.availableSpots} ${t(
                                "spots_left"
                              )}`}
                              size='small'
                              aria-label={`${status.availableSpots} ${t(
                                "registration_spots_remaining"
                              )} ${status.maxCapacity} ${t("total_capacity")}`}
                              sx={{
                                backgroundColor:
                                  status.availableSpots < 10
                                    ? "#ffebee"
                                    : "#e8f5e9",
                                color:
                                  status.availableSpots < 10
                                    ? "#c62828"
                                    : "#2e7d32",
                                fontSize: "0.75rem",
                                fontWeight: 500,
                                height: "22px",
                              }}
                            />
                          )}
                        </BadgeContainer>

                        <EventTitle id={`event-title-${event.id}`}>
                          {translateEventTitle(event.title, t)}
                        </EventTitle>
                        <EventDescription id={`event-desc-${event.id}`}>
                          {translateEventDescription(event.description, t)}
                        </EventDescription>

                        <EventMeta
                          role='list'
                          aria-label='Event details'
                          id={`event-meta-${event.id}`}
                        >
                          <MetaItem role='listitem'>
                            <CalendarTodayIcon aria-hidden='true' />
                            <MetaText>
                              <span className='sr-only'>
                                {t("event_date_label")}{" "}
                              </span>
                              {event.date}
                            </MetaText>
                          </MetaItem>
                          <MetaItem role='listitem'>
                            <AccessTimeIcon aria-hidden='true' />
                            <MetaText>
                              <span className='sr-only'>
                                {t("event_time_label")}{" "}
                              </span>
                              {event.time}
                            </MetaText>
                          </MetaItem>
                          <MetaItem role='listitem'>
                            <LocationOnIcon aria-hidden='true' />
                            <MetaText>
                              <span className='sr-only'>
                                {t("event_location_label")}{" "}
                              </span>
                              {translateEventLocation(event.location, t)}
                            </MetaText>
                          </MetaItem>
                        </EventMeta>

                        <RegisterButton
                          endIcon={
                            !isFull ? (
                              <ArrowForwardIcon aria-hidden='true' />
                            ) : undefined
                          }
                          onClick={() => handleRegisterClick(event)}
                          disabled={isFull}
                          aria-label={
                            isFull
                              ? `${t("event_full")} - ${translateEventTitle(
                                  event.title,
                                  t
                                )}`
                              : `${t("register_now")} - ${translateEventTitle(
                                  event.title,
                                  t
                                )} - ${event.date} ${event.time}`
                          }
                          sx={{
                            backgroundColor: isFull ? "#e0e0e0" : "#004c91",
                            color: isFull ? "#9e9e9e" : "white",
                            cursor: isFull ? "not-allowed" : "pointer",
                            "&:hover": {
                              backgroundColor: isFull ? "#e0e0e0" : "#003d73",
                            },
                          }}
                        >
                          {isFull ? t("event_full") : t("register_now")}
                        </RegisterButton>
                      </EventCard>
                    );
                  })
              : events.map((event) => {
                  const status = eventStatuses[event.eventId];
                  const isFull = status?.isFull || false;

                  return (
                    <EventCard key={event.id}>
                      <BadgeContainer>
                        <EventBadge
                          label={t("event_type_label")}
                          color='primary'
                        />
                        <EventBadge label='DESN' color='secondary' />
                        {status && (
                          <Chip
                            label={`${status.availableSpots} ${t(
                              "spots_left"
                            )}`}
                            size='small'
                            sx={{
                              backgroundColor:
                                status.availableSpots < 10
                                  ? "#ffebee"
                                  : "#e8f5e9",
                              color:
                                status.availableSpots < 10
                                  ? "#c62828"
                                  : "#2e7d32",
                              fontSize: "0.75rem",
                              fontWeight: 500,
                              height: "22px",
                            }}
                          />
                        )}
                      </BadgeContainer>

                      <EventTitle>
                        {translateEventTitle(event.title, t)}
                      </EventTitle>
                      <EventDescription>
                        {translateEventDescription(event.description, t)}
                      </EventDescription>

                      <EventMeta>
                        <MetaItem>
                          <CalendarTodayIcon />
                          <MetaText>{event.date}</MetaText>
                        </MetaItem>
                        <MetaItem>
                          <AccessTimeIcon />
                          <MetaText>{event.time}</MetaText>
                        </MetaItem>
                        <MetaItem>
                          <LocationOnIcon />
                          <MetaText>
                            {translateEventLocation(event.location, t)}
                          </MetaText>
                        </MetaItem>
                      </EventMeta>

                      <RegisterButton
                        endIcon={!isFull ? <ArrowForwardIcon /> : undefined}
                        onClick={() => handleRegisterClick(event)}
                        disabled={isFull}
                        sx={{
                          backgroundColor: isFull ? "#e0e0e0" : "#004c91",
                          color: isFull ? "#9e9e9e" : "white",
                          cursor: isFull ? "not-allowed" : "pointer",
                          "&:hover": {
                            backgroundColor: isFull ? "#e0e0e0" : "#003d73",
                          },
                        }}
                      >
                        {isFull ? t("event_full") : t("register_now")}
                      </RegisterButton>
                    </EventCard>
                  );
                })}
          </EventsColumn>
        </ContentGrid>
      </Container>

      {selectedEvent && (
        <EventRegistrationModal
          open={modalOpen}
          onClose={handleModalClose}
          eventId={selectedEvent.eventId}
          eventTitle={translateEventTitle(selectedEvent.title, t)}
          eventDate={selectedEvent.date}
          eventTime={selectedEvent.time}
          eventLocation={translateEventLocation(selectedEvent.location, t)}
          onRegistrationSuccess={handleRegistrationSuccess}
        />
      )}
    </SectionContainer>
  );
}

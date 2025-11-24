import { useState, useEffect } from "react";
import { Container, Typography, Box, Button, Chip } from "@mui/material";
import { styled } from "@mui/material/styles";
import { useTranslation } from "react-i18next";
import { useAuth } from "../../contexts/AuthContext";
import CalendarTodayIcon from "@mui/icons-material/CalendarToday";
import AccessTimeIcon from "@mui/icons-material/AccessTime";
import LocationOnIcon from "@mui/icons-material/LocationOn";
import ArrowForwardIcon from "@mui/icons-material/ArrowForward";
import ChevronLeftIcon from "@mui/icons-material/ChevronLeft";
import ChevronRightIcon from "@mui/icons-material/ChevronRight";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import CancelIcon from "@mui/icons-material/Cancel";
import EventRegistrationModal from "./EventRegistrationModal";
import EventService from "../../services/EventService";
import {
  translateEventTitle,
  translateEventDescription,
  translateEventLocation,
} from "../../utils/eventTranslations";
import { formatDate, formatTimeRange } from "../../utils/dateLocalization";
import "../../styles/EventButtons.css";

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
  border: "1px solid #004c91", // Added dark blue border
  borderRadius: "16px",
  padding: theme.spacing(2.5),
  boxShadow: "0 4px 12px rgba(0, 0, 0, 0.08)",
  maxWidth: "380px",
  margin: "0 auto",
  alignSelf: "flex-start",
  "&:focus": {
    outline: "3px solid #004c91",
    outlineOffset: "2px",
  },
  [theme.breakpoints.down("md")]: {
    maxWidth: "100%",
  },
  [theme.breakpoints.down("sm")]: {
    padding: theme.spacing(1.5),
    borderRadius: "12px",
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
  [theme.breakpoints.down("sm")]: {
    padding: theme.spacing(1),
  },
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
  transition: "background-color 0.2s ease, border-color 0.2s ease",
  "&:hover": {
    backgroundColor: "#00295a",
    borderColor: "#00a77f",
  },
  "&.MuiButton-root:hover": {
    backgroundColor: "#00295a",
    borderColor: "#00a77f",
  },
  "&:focus": {
    outline: "3px solid #004c91",
    outlineOffset: "2px",
  },
  "& .MuiTouchRipple-root": {
    display: "none",
  },
  "& .MuiSvgIcon-root": {
    fontSize: "1.25rem",
    color: "white",
  },
});

const CalendarGrid = styled(Box)(({ theme }) => ({
  display: "grid",
  gridTemplateColumns: "repeat(7, 1fr)",
  gap: "0",
  [theme.breakpoints.down("sm")]: {
    gap: "2px",
  },
}));

const DayHeader = styled(Typography)({
  fontSize: "0.8rem",
  color: "#000000", // Set weekday header text to black
  textAlign: "center",
  padding: "0.25rem",
  marginBottom: "0.25rem",
});

const DayCell = styled(Button, {
  shouldForwardProp: (prop) =>
    prop !== "isToday" &&
    prop !== "hasEvent" &&
    prop !== "isOtherMonth" &&
    prop !== "isSelected" &&
    prop !== "hasSelection" &&
    prop !== "isPast",
})<{
  isToday?: boolean;
  hasEvent?: boolean;
  isOtherMonth?: boolean;
  isSelected?: boolean;
  hasSelection?: boolean; // indicates any date is selected in calendar
  isPast?: boolean;
}>(
  ({
    isToday,
    hasEvent,
    isOtherMonth,
    isSelected,
    hasSelection,
    isPast,
    theme,
  }) => ({
    minWidth: "32px",
    width: "32px",
    height: "32px",
    padding: "0",
    fontSize: "0.875rem",
    // Strict WCAG 2.2 AAA palette (≥7:1 for normal text):
    // - Normal/current month day: #004c91 text on white (≈8.7:1)
    // - Event day: #005339 background with white text (≈7.6:1)
    // - Event hover: darken to #00472d (maintains >7:1)
    // - Selected day: keep white background + bold + green border for clarity (no tinted bg that lowers contrast)
    // - Today: subtle light blue (#e3f2fd) retains ≈7.3:1 contrast with #004c91
    // - Past day: muted #495662 (≈7+:1 on white) italic for distinction
    // - Other-month day: #55636d (≈7+:1 on white) with light gray background and 200 font weight
    position: "relative",
    color: hasEvent
      ? "#ffffff"
      : isOtherMonth
      ? "#55636d"
      : isPast
      ? "#495662"
      : "#004c91",
    backgroundColor: hasEvent
      ? "#005339"
      : isSelected
      ? "#ffffff"
      : isToday
      ? "#e3f2fd"
      : isOtherMonth
      ? "#f5f5f5"
      : "transparent",
    fontWeight: isOtherMonth ? 200 : "normal",
    borderRadius: "8px",
    border: isSelected
      ? "3px solid #00875f"
      : isToday && !hasSelection
      ? "2px solid #64b5f6"
      : hasEvent
      ? "2px solid #005339"
      : "none",
    "&:hover": {
      backgroundColor: hasEvent
        ? "#00472d"
        : isSelected
        ? "#f2f6fa"
        : isOtherMonth
        ? "#eef2f5"
        : isPast
        ? "#f2f4f6"
        : "#f3f4f6",
    },
    "&:focus": {
      outline: "3px solid #004c91",
      outlineOffset: "2px",
    },
    "& .MuiTouchRipple-root": {
      display: "none",
    },
    ...(hasEvent && {
      fontWeight: 700,
      boxShadow: "0 0 0 2px rgba(0,83,57,0.35)",
    }),
    ...(isSelected && {
      fontWeight: 700,
    }),
    ...(isPast &&
      !isSelected && {
        fontStyle: "italic",
      }),
    [theme.breakpoints.down("sm")]: {
      minWidth: "28px",
      width: "28px",
      height: "28px",
      fontSize: "0.75rem",
    },
  })
);

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
  transition:
    "box-shadow 0.4s cubic-bezier(0.4, 0, 0.2, 1), transform 0.4s cubic-bezier(0.4, 0, 0.2, 1)",
  "&:hover": {
    boxShadow: "0 24px 60px rgba(0, 0, 0, 0.65)",
    transform: "translateY(-6px)",
  },
  "&:focus-within": {
    outline: "3px solid #004c91",
    outlineOffset: "2px",
  },
  [theme.breakpoints.down("sm")]: {
    padding: theme.spacing(2),
    borderRadius: "12px",
    boxShadow: "0 8px 24px rgba(0, 0, 0, 0.35)",
    "&:hover": {
      boxShadow: "0 12px 32px rgba(0, 0, 0, 0.45)",
      transform: "translateY(-4px)",
    },
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
  // backgroundColor: "#004c91",
  // color: "white",
  // width: "100%",
  // height: "52px",
  // borderRadius: "12px",
  fontSize: "1rem",
  fontWeight: 600,
  textTransform: "none",
  // border: "3px solid transparent",
  // boxShadow: "0 8px 24px rgba(0, 76, 145, 0.4)",
  // transition:
  //   "background-color 0.3s cubic-bezier(0.4, 0, 0.2, 1), transform 0.3s cubic-bezier(0.4, 0, 0.2, 1), box-shadow 0.3s cubic-bezier(0.4, 0, 0.2, 1), border-color 0.3s cubic-bezier(0.4, 0, 0.2, 1)",
  "&:hover": {
    backgroundColor: "#00295a",
    borderColor: "#00a77f",
    transform: "translateY(-3px)",
    boxShadow: "0 12px 36px rgba(0, 76, 145, 0.6)",
  },
  "&:focus": {
    outline: "3px solid #004c91",
    outlineOffset: "2px",
    backgroundColor: "#00295a",
  },
  "&.MuiButton-root": {
    "& .MuiTouchRipple-root": {
      display: "none",
    },
  },
});

// Clear Filter button styled to share hover/focus CSS with RegisterButton
const ClearFilterButton = styled(Button)({
  textTransform: "none",
  color: "#004c91",
  fontSize: "0.875rem",
  fontWeight: 500,
  backgroundColor: "transparent",
  transition:
    "background-color 0.3s cubic-bezier(0.4,0,0.2,1), transform 0.3s cubic-bezier(0.4,0,0.2,1), box-shadow 0.3s cubic-bezier(0.4,0,0.2,1), border-color 0.3s cubic-bezier(0.4,0,0.2,1)",
  border: "3px solid transparent",
  borderRadius: "8px",
  "&:hover": {
    backgroundColor: "#00295a",
    borderColor: "#00a77f",
    transform: "translateY(-3px)",
    boxShadow: "0 12px 36px rgba(0, 76, 145, 0.6)",
    color: "white",
  },
  "&:focus": {
    outline: "3px solid #004c91",
    outlineOffset: "2px",
    backgroundColor: "#00295a",
    color: "white",
  },
  "& .MuiTouchRipple-root": {
    display: "none",
  },
});

const RegisteredButton = styled(Button)({
  textTransform: "none",
  fontWeight: 700,
  fontSize: "1rem",
  padding: "12px 24px",
  backgroundColor: "#00a77f",
  color: "#ffffff",
  border: "3px solid #00a77f",
  borderRadius: "12px",
  minHeight: "52px",
  cursor: "default",
  boxShadow: "0 4px 12px rgba(0, 167, 127, 0.3)",
  "&:hover": {
    backgroundColor: "#00a77f",
  },
  "&:focus": {
    outline: "3px solid #004c91",
    outlineOffset: "2px",
  },
  "& .MuiTouchRipple-root": {
    display: "none",
  },
});

const CancelButton = styled(Button)({
  textTransform: "none",
  fontWeight: 700,
  fontSize: "0.95rem",
  padding: "12px 20px",
  backgroundColor: "#ffffff",
  color: "#c62828",
  border: "3px solid #c62828",
  borderRadius: "12px",
  minHeight: "52px",
  boxShadow: "0 4px 12px rgba(198, 40, 40, 0.2)",
  transition:
    "background-color 0.3s cubic-bezier(0.4,0,0.2,1), transform 0.3s cubic-bezier(0.4,0,0.2,1), box-shadow 0.3s cubic-bezier(0.4,0,0.2,1), border-color 0.3s cubic-bezier(0.4,0,0.2,1)",
  "&:hover": {
    backgroundColor: "#8b0000",
    color: "#ffffff",
    borderColor: "#ff6b6b",
    transform: "translateY(-3px)",
    boxShadow: "0 12px 36px rgba(139, 0, 0, 0.5)",
  },
  "&:focus": {
    outline: "3px solid #004c91",
    outlineOffset: "2px",
    backgroundColor: "#8b0000",
    color: "#ffffff",
    borderColor: "#ff6b6b",
  },
  "&:disabled": {
    backgroundColor: "#e0e0e0",
    color: "#9e9e9e",
    borderColor: "#9e9e9e",
    cursor: "not-allowed",
    boxShadow: "none",
  },
  "& .MuiTouchRipple-root": {
    display: "none",
  },
});

interface EventStatus {
  isFull: boolean;
  currentRegistrations: number;
  maxCapacity: number;
  availableSpots: number;
  isRegistered?: boolean;
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
  startMonth: number;
  startYear: number;
}

export default function UpcomingEvents() {
  const { t, i18n } = useTranslation();
  const { user, isAuthenticated } = useAuth();
  const [currentDate, setCurrentDate] = useState(new Date(2025, 10, 1)); // November 2025
  const [selectedDate, setSelectedDate] = useState<number | null>(null);
  const [selectedEvent, setSelectedEvent] = useState<EventData | null>(null);
  const [modalOpen, setModalOpen] = useState(false);
  const [eventStatuses, setEventStatuses] = useState<
    Record<number, EventStatus>
  >({});
  const [events, setEvents] = useState<EventData[]>([]);
  // focusedDate no longer needed with full tab sequence; removed
  const [announcement, setAnnouncement] = useState<string>("");
  const [cancellingEventId, setCancellingEventId] = useState<number | null>(
    null
  );

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
            startMonth: startDate.getMonth(),
            startYear: startDate.getFullYear(),
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

          // Check if user is registered for this event
          let isRegistered = false;
          if (isAuthenticated && user?.username && user?.token) {
            try {
              const registrationStatus =
                await EventService.getRegistrationStatus(
                  event.eventId,
                  user.username,
                  user.token
                );
              isRegistered = registrationStatus.isRegistered;
            } catch (error) {
              console.error(
                `Error checking registration status for event ${event.eventId}:`,
                error
              );
            }
          }

          statuses[event.eventId] = {
            isFull: response.currentAttendees >= response.maxAttendees,
            currentRegistrations: response.currentAttendees,
            maxCapacity: response.maxAttendees,
            availableSpots: response.maxAttendees - response.currentAttendees,
            isRegistered,
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
  }, [events, isAuthenticated, user]);

  const handleCancelRegistration = async (eventId: number) => {
    if (!user?.username || !user?.token) return;

    setCancellingEventId(eventId);

    try {
      await EventService.cancelRegistration(eventId, user.username, user.token);

      // Refresh event status after cancellation
      const response = await EventService.getEventById(eventId);
      const registrationStatus = await EventService.getRegistrationStatus(
        eventId,
        user.username,
        user.token
      );

      setEventStatuses((prev) => ({
        ...prev,
        [eventId]: {
          isFull: response.currentAttendees >= response.maxAttendees,
          currentRegistrations: response.currentAttendees,
          maxCapacity: response.maxAttendees,
          availableSpots: response.maxAttendees - response.currentAttendees,
          isRegistered: registrationStatus.isRegistered,
        },
      }));
    } catch (error) {
      console.error("Error cancelling registration:", error);
    } finally {
      setCancellingEventId(null);
    }
  };

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
      if (selectedEvent && user?.username && user?.token) {
        try {
          const response = await EventService.getEventById(
            selectedEvent.eventId
          );
          const registrationStatus = await EventService.getRegistrationStatus(
            selectedEvent.eventId,
            user.username,
            user.token
          );

          setEventStatuses((prev) => ({
            ...prev,
            [selectedEvent.eventId]: {
              isFull: response.currentAttendees >= response.maxAttendees,
              currentRegistrations: response.currentAttendees,
              maxCapacity: response.maxAttendees,
              availableSpots: response.maxAttendees - response.currentAttendees,
              isRegistered: registrationStatus.isRegistered,
            },
          }));
        } catch (error) {
          console.error("Error refreshing event status:", error);
        }
      }
    };

    refreshEventStatus();
  };

  // Custom keyboard handling: after Register button, Tab moves to previous month button
  const handleRegisterButtonKeyDown = (
    e: React.KeyboardEvent<HTMLButtonElement>
  ) => {
    if (e.key === "Tab" && !e.shiftKey) {
      // Move focus to previous month navigation button instead of default next element
      e.preventDefault();
      const prevBtn = document.getElementById("calendar-prev-month");
      prevBtn?.focus();
    }
  };

  // When tabbing from the next month button, focus today's date if visible; else first active day
  const handleNextMonthButtonKeyDown = (
    e: React.KeyboardEvent<HTMLButtonElement>
  ) => {
    if (e.key === "Tab" && !e.shiftKey) {
      e.preventDefault();
      // aria-current="date" marks today if in current displayed month
      const todayCell = document.querySelector(
        '[role="gridcell"][aria-current="date"]'
      ) as HTMLElement | null;
      if (todayCell) {
        todayCell.focus();
        return;
      }
      // Fallback: first enabled gridcell
      const firstEnabled = document.querySelector(
        '[role="gridcell"]:not([aria-disabled="true"])'
      ) as HTMLElement | null;
      firstEnabled?.focus();
    }
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
    // Use original month/year fields to avoid locale parsing issues
    const eventDates = new Set(
      events
        .filter(
          (event) =>
            event.startMonth === currentDate.getMonth() &&
            event.startYear === currentDate.getFullYear()
        )
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
        isPast: isCurrentMonth && i < today.getDate(),
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

  // Localized month + year (with Devanagari numerals for supported South Asian langs)
  const monthYear = (() => {
    const monthNames = t("calendar.months", {
      returnObjects: true,
    }) as string[];
    const monthName = monthNames[currentDate.getMonth()] || "";
    let yearStr = currentDate.getFullYear().toString();
    if (["ne", "mai", "new"].includes(i18n.language)) {
      const numMap: Record<string, string> = {
        0: "०",
        1: "१",
        2: "२",
        3: "३",
        4: "४",
        5: "५",
        6: "६",
        7: "७",
        8: "८",
        9: "९",
      };
      yearStr = yearStr.replace(/\d/g, (d) => numMap[d] || d);
    }
    return `${monthName} ${yearStr}`.trim();
  })();

  const getEventsForDate = (day: number) => {
    return events.filter((event) => event.calendarDate === day);
  };

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

  const handleKeyDown = (
    e: React.KeyboardEvent,
    dayInfo: {
      day: number;
      isOtherMonth: boolean;
      isToday: boolean;
      hasEvent: boolean;
    },
    weekIndex: number,
    dayIndex: number
  ) => {
    const totalDays = generateCalendarDays();
    const currentIndex = weekIndex * 7 + dayIndex;

    switch (e.key) {
      case "ArrowUp":
        e.preventDefault();
        if (currentIndex >= 7) {
          const newIndex = currentIndex - 7;
          const newDay = totalDays[newIndex];
          if (!newDay.isOtherMonth) {
            const dayEvents = getEventsForDate(newDay.day);
            if (dayEvents.length > 0) {
              setAnnouncement(
                `${dayEvents.length} event${
                  dayEvents.length > 1 ? "s" : ""
                } scheduled on this date`
              );
            } else {
              setAnnouncement("");
            }
            document.getElementById(`day-${newDay.day}`)?.focus();
          }
        }
        break;
      case "ArrowDown":
        e.preventDefault();
        if (currentIndex + 7 < totalDays.length) {
          const newIndex = currentIndex + 7;
          const newDay = totalDays[newIndex];
          if (!newDay.isOtherMonth) {
            const dayEvents = getEventsForDate(newDay.day);
            if (dayEvents.length > 0) {
              setAnnouncement(
                `${dayEvents.length} event${
                  dayEvents.length > 1 ? "s" : ""
                } scheduled on this date`
              );
            } else {
              setAnnouncement("");
            }
            document.getElementById(`day-${newDay.day}`)?.focus();
          }
        }
        break;
      case "ArrowLeft":
        e.preventDefault();
        if (currentIndex > 0) {
          const newIndex = currentIndex - 1;
          const newDay = totalDays[newIndex];
          if (!newDay.isOtherMonth) {
            const dayEvents = getEventsForDate(newDay.day);
            if (dayEvents.length > 0) {
              setAnnouncement(
                `${dayEvents.length} event${
                  dayEvents.length > 1 ? "s" : ""
                } scheduled on this date`
              );
            } else {
              setAnnouncement("");
            }
            document.getElementById(`day-${newDay.day}`)?.focus();
          }
        }
        break;
      case "ArrowRight":
        e.preventDefault();
        if (currentIndex + 1 < totalDays.length) {
          const newIndex = currentIndex + 1;
          const newDay = totalDays[newIndex];
          if (!newDay.isOtherMonth) {
            const dayEvents = getEventsForDate(newDay.day);
            if (dayEvents.length > 0) {
              setAnnouncement(
                `${dayEvents.length} event${
                  dayEvents.length > 1 ? "s" : ""
                } scheduled on this date`
              );
            } else {
              setAnnouncement("");
            }
            document.getElementById(`day-${newDay.day}`)?.focus();
          }
        }
        break;
      case "Home": {
        e.preventDefault();
        const firstDay = totalDays.find((d) => !d.isOtherMonth);
        if (firstDay) {
          document.getElementById(`day-${firstDay.day}`)?.focus();
        }
        break;
      }
      case "End": {
        e.preventDefault();
        const lastDay = [...totalDays].reverse().find((d) => !d.isOtherMonth);
        if (lastDay) {
          document.getElementById(`day-${lastDay.day}`)?.focus();
        }
        break;
      }
      case "PageUp":
        e.preventDefault();
        handlePreviousMonth();
        break;
      case "PageDown":
        e.preventDefault();
        handleNextMonth();
        break;
      case " ":
      case "Enter":
        e.preventDefault();
        if (!dayInfo.isOtherMonth) {
          setSelectedDate(dayInfo.day);
        }
        break;
    }
  };

  return (
    <SectionContainer
      aria-labelledby='upcoming-events-heading'
      role='region'
      aria-label='Upcoming Events Section'
    >
      <Container maxWidth='xl' sx={{ px: { xs: 1.5, sm: 3, md: 6 } }}>
        <SectionTitle variant='h2' id='upcoming-events-heading'>
          {t("events_upcoming_title")}
        </SectionTitle>
        <SectionSubtitle>{t("events_upcoming_subtitle")}</SectionSubtitle>

        {/* Live region for calendar navigation announcements */}
        <div
          role='status'
          aria-live='polite'
          aria-atomic='true'
          className='sr-only'
        >
          {announcement}
        </div>

        <ContentGrid
          role='group'
          aria-label='Event calendar and event listings'
        >
          {/* Calendar */}
          <CalendarCard role='region' aria-label='Event calendar'>
            <CalendarHeader id='calendar-heading'>
              {t("calendar_heading")}
            </CalendarHeader>
            <Calendar role='application' aria-labelledby='calendar-heading'>
              <CalendarNav
                role='heading'
                aria-level={3}
                aria-label='Calendar navigation'
              >
                <NavButton
                  id='calendar-prev-month'
                  className='calendar-nav-button'
                  onClick={handlePreviousMonth}
                  aria-label={`${t("aria.previous_month")}. ${monthYear}`}
                  role='button'
                >
                  <ChevronLeftIcon aria-hidden='true' />
                </NavButton>
                <MonthYear aria-live='polite' aria-atomic='true'>
                  {monthYear}
                </MonthYear>
                <NavButton
                  className='calendar-nav-button'
                  onClick={handleNextMonth}
                  onKeyDown={handleNextMonthButtonKeyDown}
                  aria-label={`${t("aria.next_month")}. ${monthYear}`}
                  role='button'
                >
                  <ChevronRightIcon aria-hidden='true' />
                </NavButton>
              </CalendarNav>

              <CalendarGrid
                role='grid'
                aria-label={`Event Calendar for ${monthYear}`}
                aria-readonly='false'
                aria-multiselectable='false'
                aria-describedby='calendar-description'
              >
                <span id='calendar-description' className='sr-only'>
                  Interactive data grid showing calendar dates for {monthYear}.
                  Days with scheduled events are marked. Use arrow keys to
                  navigate, Enter or Space to select a date and view event
                  details.
                </span>
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
                        .map((dayInfo, index) => {
                          const isSelected =
                            selectedDate === dayInfo.day &&
                            !dayInfo.isOtherMonth;
                          const hasSelection = selectedDate !== null;
                          return (
                            <DayCell
                              key={weekIndex * 7 + index}
                              className={
                                isSelected ? "calendar-day-selected" : ""
                              }
                              id={
                                !dayInfo.isOtherMonth
                                  ? `day-${dayInfo.day}`
                                  : undefined
                              }
                              isToday={dayInfo.isToday}
                              hasEvent={dayInfo.hasEvent}
                              isOtherMonth={dayInfo.isOtherMonth}
                              isSelected={isSelected}
                              hasSelection={hasSelection}
                              isPast={dayInfo.isPast}
                              data-selected={isSelected ? "true" : undefined}
                              data-other-month={
                                dayInfo.isOtherMonth ? "true" : undefined
                              }
                              data-past={dayInfo.isPast ? "true" : undefined}
                              onClick={() =>
                                !dayInfo.isOtherMonth &&
                                setSelectedDate(dayInfo.day)
                              }
                              onKeyDown={(e) =>
                                handleKeyDown(e, dayInfo, weekIndex, index)
                              }
                              aria-label={
                                dayInfo.isOtherMonth
                                  ? `${dayInfo.day}, not in current month`
                                  : (() => {
                                      const dayEvents = getEventsForDate(
                                        dayInfo.day
                                      );
                                      const eventCount = dayEvents.length;
                                      return `${monthYear.split(" ")[0]} ${
                                        dayInfo.day
                                      }${dayInfo.isToday ? ", today" : ""}${
                                        dayInfo.isPast ? ", past date" : ""
                                      }${isSelected ? ", selected" : ""}. ${
                                        eventCount > 0
                                          ? `${eventCount} event${
                                              eventCount > 1 ? "s" : ""
                                            } scheduled`
                                          : "No events scheduled"
                                      }`;
                                    })()
                              }
                              aria-current={
                                dayInfo.isToday ? "date" : undefined
                              }
                              aria-selected={isSelected}
                              aria-disabled={dayInfo.isOtherMonth}
                              disabled={dayInfo.isOtherMonth}
                              role='gridcell'
                              tabIndex={
                                dayInfo.isOtherMonth
                                  ? -1
                                  : isSelected ||
                                    (selectedDate === null && dayInfo.isToday)
                                  ? 0
                                  : -1
                              }
                              sx={{
                                cursor: dayInfo.isOtherMonth
                                  ? "default"
                                  : "pointer",
                                ...(dayInfo.isOtherMonth && {
                                  fontWeight: "200 !important",
                                  backgroundColor: "#f5f5f5 !important",
                                }),
                                ...(isSelected && {
                                  backgroundColor: "#ffffff",
                                  border: "3px solid #00875f",
                                  color: "#004c91",
                                  fontWeight: 700,
                                  "&:hover": {
                                    backgroundColor: "#f2f6fa",
                                    color: "#004c91",
                                  },
                                }),
                              }}
                            >
                              {dayInfo.day}
                            </DayCell>
                          );
                        })}
                    </Box>
                  )
                )}
              </CalendarGrid>
            </Calendar>

            <Note>
              <NoteText>
                <strong>{t("calendar_legend_heading")}</strong>{" "}
                {t("calendar_legend_text")}
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
                <ClearFilterButton
                  onClick={() => setSelectedDate(null)}
                  aria-label={`Clear date filter. Currently showing events for ${
                    monthYear.split(" ")[0]
                  } ${selectedDate}`}
                >
                  {t("clear_filter")}
                </ClearFilterButton>
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

                        {status?.isRegistered ? (
                          <Box
                            sx={{
                              display: "flex",
                              gap: "60px",
                              alignItems: "center",
                            }}
                          >
                            <RegisteredButton
                              startIcon={<CheckCircleIcon aria-hidden='true' />}
                              disabled
                              aria-label={`${t(
                                "registered"
                              )} - ${translateEventTitle(event.title, t)}`}
                            >
                              {t("registered")}
                            </RegisteredButton>
                            <CancelButton
                              startIcon={<CancelIcon aria-hidden='true' />}
                              onClick={() =>
                                handleCancelRegistration(event.eventId)
                              }
                              disabled={cancellingEventId === event.eventId}
                              aria-label={`${t(
                                "cancel_registration"
                              )} - ${translateEventTitle(event.title, t)}`}
                            >
                              {cancellingEventId === event.eventId
                                ? t("cancel") + "..."
                                : t("cancel_registration")}
                            </CancelButton>
                          </Box>
                        ) : (
                          <RegisterButton
                            onKeyDown={handleRegisterButtonKeyDown}
                            className='register-button-custom'
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
                          >
                            {isFull ? t("event_full") : t("register_now")}
                          </RegisterButton>
                        )}
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

                      {status?.isRegistered ? (
                        <Box
                          sx={{
                            display: "flex",
                            gap: "60px",
                            alignItems: "center",
                          }}
                        >
                          <RegisteredButton
                            startIcon={<CheckCircleIcon aria-hidden='true' />}
                            disabled
                            aria-label={`${t(
                              "registered"
                            )} - ${translateEventTitle(event.title, t)}`}
                          >
                            {t("registered")}
                          </RegisteredButton>
                          <CancelButton
                            startIcon={<CancelIcon aria-hidden='true' />}
                            onClick={() =>
                              handleCancelRegistration(event.eventId)
                            }
                            disabled={cancellingEventId === event.eventId}
                            aria-label={`${t(
                              "cancel_registration"
                            )} - ${translateEventTitle(event.title, t)}`}
                          >
                            {cancellingEventId === event.eventId
                              ? t("cancel") + "..."
                              : t("cancel_registration")}
                          </CancelButton>
                        </Box>
                      ) : (
                        <RegisterButton
                          onKeyDown={handleRegisterButtonKeyDown}
                          className='register-button-custom'
                          endIcon={!isFull ? <ArrowForwardIcon /> : undefined}
                          onClick={() => handleRegisterClick(event)}
                          disabled={isFull}
                          sx={{
                            backgroundColor: isFull ? "#e0e0e0" : "#004c91",
                            color: isFull ? "#9e9e9e" : "white",
                            cursor: isFull ? "not-allowed" : "pointer",
                          }}
                        >
                          {isFull ? t("event_full") : t("register_now")}
                        </RegisterButton>
                      )}
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

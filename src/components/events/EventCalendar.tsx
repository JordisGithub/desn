import { useState, useEffect } from "react";
import {
  Box,
  Paper,
  Typography,
  IconButton,
  styled,
  Chip,
  Card,
  CardContent,
} from "@mui/material";
import {
  ChevronLeft,
  ChevronRight,
  CalendarToday,
  LocationOn,
  AccessTime,
} from "@mui/icons-material";

const CalendarContainer = styled(Paper)(({ theme }) => ({
  padding: theme.spacing(3),
  borderRadius: "16px",
  boxShadow: "0 4px 20px rgba(0,0,0,0.08)",
}));

const CalendarHeader = styled(Box)({
  display: "flex",
  justifyContent: "space-between",
  alignItems: "center",
  marginBottom: "24px",
});

const MonthTitle = styled(Typography)({
  fontSize: "1.5rem",
  fontWeight: 600,
  color: "#004c91",
});

const DayCell = styled(Box)<{ isToday?: boolean; hasEvent?: boolean; isSelected?: boolean }>(
  ({ isToday, hasEvent, isSelected }) => ({
    aspectRatio: "1",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    cursor: "pointer",
    borderRadius: "8px",
    position: "relative",
    transition: "all 0.2s",
    backgroundColor: isSelected
      ? "#004c91"
      : isToday
      ? "#e3f2fd"
      : "transparent",
    color: isSelected ? "white" : isToday ? "#004c91" : "#333",
    fontWeight: isToday || isSelected ? 600 : 400,
    border: hasEvent && !isSelected ? "2px solid #f6d469" : "none",
    "&:hover": {
      backgroundColor: isSelected ? "#003d73" : "#f5f5f5",
      transform: "scale(1.05)",
    },
    "&::after": hasEvent && !isSelected
      ? {
          content: '""',
          position: "absolute",
          bottom: "4px",
          left: "50%",
          transform: "translateX(-50%)",
          width: "6px",
          height: "6px",
          borderRadius: "50%",
          backgroundColor: "#f6d469",
        }
      : {},
  })
);

const DayName = styled(Typography)({
  textAlign: "center",
  fontWeight: 600,
  color: "#666",
  marginBottom: "8px",
  fontSize: "0.9rem",
});

const EventCard = styled(Card)({
  marginBottom: "16px",
  borderRadius: "12px",
  boxShadow: "0 2px 8px rgba(0,0,0,0.08)",
  transition: "transform 0.2s",
  "&:hover": {
    transform: "translateY(-2px)",
    boxShadow: "0 4px 12px rgba(0,0,0,0.12)",
  },
});

const EventTitle = styled(Typography)({
  fontWeight: 600,
  color: "#004c91",
  marginBottom: "8px",
});

const EventDetail = styled(Box)({
  display: "flex",
  alignItems: "center",
  gap: "8px",
  color: "#666",
  fontSize: "0.9rem",
  marginBottom: "4px",
});

interface Event {
  id: number;
  title: string;
  description: string;
  startDate: string;
  endDate: string;
  location: string;
  imageUrl?: string;
  maxAttendees: number;
  currentAttendees: number;
  featured: boolean;
}

interface EventCalendarProps {
  events: Event[];
}

export default function EventCalendar({ events }: EventCalendarProps) {
  const [currentDate, setCurrentDate] = useState(new Date());
  const [selectedDate, setSelectedDate] = useState<Date | null>(null);
  const [filteredEvents, setFilteredEvents] = useState<Event[]>([]);

  const daysOfWeek = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];

  useEffect(() => {
    if (selectedDate) {
      const eventsOnSelectedDate = events.filter((event) => {
        const eventDate = new Date(event.startDate);
        return (
          eventDate.getDate() === selectedDate.getDate() &&
          eventDate.getMonth() === selectedDate.getMonth() &&
          eventDate.getFullYear() === selectedDate.getFullYear()
        );
      });
      setFilteredEvents(eventsOnSelectedDate);
    } else {
      setFilteredEvents([]);
    }
  }, [selectedDate, events]);

  const getEventDates = () => {
    return events.map((event) => {
      const date = new Date(event.startDate);
      return `${date.getFullYear()}-${date.getMonth()}-${date.getDate()}`;
    });
  };

  const hasEventOnDate = (date: Date) => {
    const dateStr = `${date.getFullYear()}-${date.getMonth()}-${date.getDate()}`;
    return getEventDates().includes(dateStr);
  };

  const getDaysInMonth = (date: Date) => {
    const year = date.getFullYear();
    const month = date.getMonth();
    const firstDay = new Date(year, month, 1);
    const lastDay = new Date(year, month + 1, 0);
    const daysInMonth = lastDay.getDate();
    const startingDayOfWeek = firstDay.getDay();

    const days: (Date | null)[] = [];

    // Add empty cells for days before the first day of the month
    for (let i = 0; i < startingDayOfWeek; i++) {
      days.push(null);
    }

    // Add all days of the month
    for (let day = 1; day <= daysInMonth; day++) {
      days.push(new Date(year, month, day));
    }

    return days;
  };

  const handlePreviousMonth = () => {
    setCurrentDate(
      new Date(currentDate.getFullYear(), currentDate.getMonth() - 1, 1)
    );
  };

  const handleNextMonth = () => {
    setCurrentDate(
      new Date(currentDate.getFullYear(), currentDate.getMonth() + 1, 1)
    );
  };

  const handleDateClick = (date: Date) => {
    setSelectedDate(date);
  };

  const isToday = (date: Date) => {
    const today = new Date();
    return (
      date.getDate() === today.getDate() &&
      date.getMonth() === today.getMonth() &&
      date.getFullYear() === today.getFullYear()
    );
  };

  const isSelected = (date: Date) => {
    if (!selectedDate) return false;
    return (
      date.getDate() === selectedDate.getDate() &&
      date.getMonth() === selectedDate.getMonth() &&
      date.getFullYear() === selectedDate.getFullYear()
    );
  };

  const formatTime = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" });
  };

  const monthNames = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December",
  ];

  const days = getDaysInMonth(currentDate);

  return (
    <Box sx={{ display: "flex", gap: 4, flexWrap: { xs: "wrap", md: "nowrap" } }}>
      {/* Calendar */}
      <CalendarContainer sx={{ flex: { xs: "1 1 100%", md: "0 0 60%" } }}>
        <CalendarHeader>
          <IconButton onClick={handlePreviousMonth} aria-label="Previous month">
            <ChevronLeft />
          </IconButton>
          <MonthTitle>
            {monthNames[currentDate.getMonth()]} {currentDate.getFullYear()}
          </MonthTitle>
          <IconButton onClick={handleNextMonth} aria-label="Next month">
            <ChevronRight />
          </IconButton>
        </CalendarHeader>

        {/* Day names */}
        <Box
          sx={{
            display: "grid",
            gridTemplateColumns: "repeat(7, 1fr)",
            gap: 1,
            marginBottom: 1,
          }}
        >
          {daysOfWeek.map((day) => (
            <DayName key={day}>{day}</DayName>
          ))}
        </Box>

        {/* Calendar days */}
        <Box
          sx={{
            display: "grid",
            gridTemplateColumns: "repeat(7, 1fr)",
            gap: 1,
          }}
        >
          {days.map((date, index) =>
            date ? (
              <DayCell
                key={index}
                isToday={isToday(date)}
                hasEvent={hasEventOnDate(date)}
                isSelected={isSelected(date)}
                onClick={() => handleDateClick(date)}
                role="button"
                tabIndex={0}
                aria-label={`${date.getDate()} ${monthNames[date.getMonth()]}`}
              >
                {date.getDate()}
              </DayCell>
            ) : (
              <Box key={index} sx={{ aspectRatio: "1" }} />
            )
          )}
        </Box>

        <Box sx={{ marginTop: 3, display: "flex", gap: 2, alignItems: "center" }}>
          <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
            <Box
              sx={{
                width: 20,
                height: 20,
                borderRadius: "4px",
                border: "2px solid #f6d469",
              }}
            />
            <Typography variant="body2" color="text.secondary">
              Has Events
            </Typography>
          </Box>
          <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
            <Box
              sx={{
                width: 20,
                height: 20,
                borderRadius: "4px",
                backgroundColor: "#e3f2fd",
              }}
            />
            <Typography variant="body2" color="text.secondary">
              Today
            </Typography>
          </Box>
        </Box>
      </CalendarContainer>

      {/* Events list for selected date */}
      <Box sx={{ flex: { xs: "1 1 100%", md: "0 0 35%" } }}>
        <Paper
          sx={{
            padding: 3,
            borderRadius: "16px",
            boxShadow: "0 4px 20px rgba(0,0,0,0.08)",
            minHeight: "400px",
          }}
        >
          {selectedDate ? (
            <>
              <Box sx={{ display: "flex", alignItems: "center", gap: 1, mb: 3 }}>
                <CalendarToday sx={{ color: "#004c91" }} />
                <Typography variant="h6" sx={{ color: "#004c91", fontWeight: 600 }}>
                  {selectedDate.toLocaleDateString("en-US", {
                    weekday: "long",
                    year: "numeric",
                    month: "long",
                    day: "numeric",
                  })}
                </Typography>
              </Box>

              {filteredEvents.length > 0 ? (
                filteredEvents.map((event) => (
                  <EventCard key={event.id}>
                    <CardContent>
                      <EventTitle variant="h6">{event.title}</EventTitle>
                      <Typography
                        variant="body2"
                        color="text.secondary"
                        sx={{ mb: 2 }}
                      >
                        {event.description}
                      </Typography>
                      <EventDetail>
                        <AccessTime sx={{ fontSize: "1.2rem" }} />
                        <span>
                          {formatTime(event.startDate)} -{" "}
                          {formatTime(event.endDate)}
                        </span>
                      </EventDetail>
                      <EventDetail>
                        <LocationOn sx={{ fontSize: "1.2rem" }} />
                        <span>{event.location}</span>
                      </EventDetail>
                      <Box sx={{ mt: 2 }}>
                        <Chip
                          label={`${event.currentAttendees}/${event.maxAttendees} attending`}
                          size="small"
                          color={
                            event.currentAttendees >= event.maxAttendees
                              ? "error"
                              : "success"
                          }
                        />
                      </Box>
                    </CardContent>
                  </EventCard>
                ))
              ) : (
                <Box
                  sx={{
                    textAlign: "center",
                    py: 6,
                    color: "#999",
                  }}
                >
                  <CalendarToday sx={{ fontSize: "4rem", mb: 2 }} />
                  <Typography variant="h6">No events on this day</Typography>
                  <Typography variant="body2">
                    Select a day with events to see details
                  </Typography>
                </Box>
              )}
            </>
          ) : (
            <Box
              sx={{
                textAlign: "center",
                py: 6,
                color: "#999",
              }}
            >
              <CalendarToday sx={{ fontSize: "4rem", mb: 2 }} />
              <Typography variant="h6">Select a Date</Typography>
              <Typography variant="body2">
                Click on a day in the calendar to see events
              </Typography>
            </Box>
          )}
        </Paper>
      </Box>
    </Box>
  );
}

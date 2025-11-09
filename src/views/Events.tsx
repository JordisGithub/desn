import { useState, useEffect } from "react";
import { styled } from "@mui/material/styles";
import { Container, Typography } from "@mui/material";
import { useTranslation } from "react-i18next";
import Footer from "../components/Footer";
import EventsHero from "../components/events/EventsHero";
import UpcomingEvents from "../components/events/UpcomingEvents";
import FeaturedEvent from "../components/events/FeaturedEvent";
import EventCalendar from "../components/events/EventCalendar";
// @ts-expect-error - ApiService is a JS file
import ApiService from "../services/ApiService";

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

const SkipLink = styled("a")({
  position: "absolute",
  top: "-40px",
  left: 0,
  background: "#004c91",
  color: "white",
  padding: "8px 16px",
  textDecoration: "none",
  zIndex: 9999,
  "&:focus": {
    top: 0,
    outline: "3px solid #f6d469",
    outlineOffset: "2px",
  },
});

const CalendarSection = styled("section")({
  padding: "80px 0",
  backgroundColor: "#f8f9fa",
});

const SectionTitle = styled(Typography)({
  fontSize: "2.5rem",
  fontWeight: 700,
  color: "#004c91",
  marginBottom: "16px",
  textAlign: "center",
});

const SectionSubtitle = styled(Typography)({
  fontSize: "1.1rem",
  color: "#666",
  textAlign: "center",
  marginBottom: "48px",
  maxWidth: "700px",
  margin: "0 auto 48px",
});

export default function Events() {
  const { t } = useTranslation();
  const [events, setEvents] = useState<Event[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchEvents = async () => {
      try {
        setLoading(true);
        const response = await ApiService.get("/api/events");
        setEvents(response || []);
      } catch (error) {
        console.error("Error fetching events:", error);
        setEvents([]);
      } finally {
        setLoading(false);
      }
    };

    fetchEvents();
  }, []);

  return (
    <>
      <SkipLink href='#main-content'>{t("skip_to_content")}</SkipLink>
      <main id='main-content'>
        <EventsHero />
        <UpcomingEvents />
        <FeaturedEvent />

        {/* Calendar Section */}
        <CalendarSection>
          <Container maxWidth='lg'>
            <SectionTitle variant='h2'>Event Calendar</SectionTitle>
            <SectionSubtitle>
              View all upcoming events and select a date to see event details
            </SectionSubtitle>
            {!loading && <EventCalendar events={events} />}
          </Container>
        </CalendarSection>
      </main>
      <Footer />
    </>
  );
}

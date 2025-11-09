import { useState, useEffect } from "react";
import {
  Container,
  Typography,
  Box,
  Card,
  CardContent,
  Button,
  Alert,
  CircularProgress,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Chip,
} from "@mui/material";
import { styled } from "@mui/material/styles";
import { useTranslation } from "react-i18next";
import { useAuth } from "../contexts/AuthContext";
import { useNavigate } from "react-router-dom";
import Header from "../components/Header";
import Footer from "../components/Footer";
import EventService from "../services/EventService";
import CalendarTodayIcon from "@mui/icons-material/CalendarToday";
import AccessTimeIcon from "@mui/icons-material/AccessTime";
import LocationOnIcon from "@mui/icons-material/LocationOn";
import EventAvailableIcon from "@mui/icons-material/EventAvailable";
import CancelIcon from "@mui/icons-material/Cancel";

const PageContainer = styled("div")({
  minHeight: "100vh",
  backgroundColor: "#f9fafb",
});

const DashboardContainer = styled(Container)(({ theme }) => ({
  paddingTop: theme.spacing(12),
  paddingBottom: theme.spacing(12),
  [theme.breakpoints.down("md")]: {
    paddingTop: theme.spacing(8),
    paddingBottom: theme.spacing(8),
  },
}));

const PageTitle = styled(Typography)(({ theme }) => ({
  fontSize: "3rem",
  fontWeight: 400,
  color: "#004c91",
  marginBottom: theme.spacing(2),
  fontFamily: "'Open Sans', sans-serif",
  [theme.breakpoints.down("md")]: {
    fontSize: "2.5rem",
  },
  [theme.breakpoints.down("sm")]: {
    fontSize: "2rem",
  },
}));

const PageSubtitle = styled(Typography)({
  fontSize: "1.125rem",
  color: "#4a5565",
  marginBottom: "3rem",
});

const EventsGrid = styled(Box)(({ theme }) => ({
  display: "grid",
  gridTemplateColumns: "repeat(auto-fill, minmax(350px, 1fr))",
  gap: theme.spacing(3),
  [theme.breakpoints.down("sm")]: {
    gridTemplateColumns: "1fr",
  },
}));

const EventCard = styled(Card)({
  borderRadius: "16px",
  border: "1px solid #e5e7eb",
  boxShadow: "0px 2px 8px rgba(0, 0, 0, 0.08)",
  transition: "all 0.3s ease",
  "&:hover": {
    boxShadow: "0px 8px 24px rgba(0, 0, 0, 0.12)",
    transform: "translateY(-4px)",
  },
});

const EventCardContent = styled(CardContent)({
  padding: "1.5rem",
});

const EventTitle = styled(Typography)({
  fontSize: "1.25rem",
  fontWeight: 600,
  color: "#004c91",
  marginBottom: "0.75rem",
  fontFamily: "'Poppins', sans-serif",
});

const EventMeta = styled(Box)({
  display: "flex",
  flexDirection: "column",
  gap: "0.5rem",
  marginBottom: "1rem",
});

const MetaItem = styled(Box)({
  display: "flex",
  alignItems: "center",
  gap: "0.5rem",
  "& .MuiSvgIcon-root": {
    fontSize: "1.125rem",
    color: "#4a5565",
  },
});

const MetaText = styled(Typography)({
  fontSize: "0.875rem",
  color: "#4a5565",
});

const StatusChip = styled(Chip)({
  marginBottom: "1rem",
  fontWeight: 500,
});

const CancelButton = styled(Button)({
  backgroundColor: "#f3f4f6",
  color: "#d32f2f",
  width: "100%",
  borderRadius: "10px",
  textTransform: "none",
  fontSize: "1rem",
  fontWeight: 600,
  padding: "10px",
  "&:hover": {
    backgroundColor: "#ffebee",
  },
});

const EmptyState = styled(Box)({
  textAlign: "center",
  padding: "4rem 2rem",
});

const EmptyStateIcon = styled(EventAvailableIcon)({
  fontSize: "5rem",
  color: "#c4c4c4",
  marginBottom: "1rem",
});

const EmptyStateText = styled(Typography)({
  fontSize: "1.25rem",
  color: "#717182",
  marginBottom: "1rem",
});

const BrowseEventsButton = styled(Button)({
  backgroundColor: "#004c91",
  color: "white",
  borderRadius: "100px",
  padding: "12px 32px",
  fontSize: "1rem",
  textTransform: "none",
  fontWeight: 600,
  "&:hover": {
    backgroundColor: "#003d73",
  },
});

interface Registration {
  eventId: string;
  username: string;
  email: string;
  fullName: string;
  registeredAt: string;
  status: string;
}

const eventIdToDetails: Record<
  string,
  { title: string; date: string; time: string; location: string }
> = {
  "air-midpoint-checkin": {
    title: "AIR Mid-Point Check-In",
    date: "October 25, 2025",
    time: "10:00 AM - 2:00 PM",
    location: "Online via Zoom",
  },
  "international-day-disabilities": {
    title: "International Day of Persons with Disabilities",
    date: "December 3, 2025",
    time: "9:00 AM - 5:00 PM",
    location: "DESN Office, Lalitpur, Nepal",
  },
  "air-awards-ceremony": {
    title: "AIR Awards Ceremony",
    date: "January 16, 2026",
    time: "7:00 PM - 9:00 PM",
    location: "Online Event",
  },
};

export default function MemberDashboard() {
  const { t } = useTranslation();
  const { user, isAuthenticated } = useAuth();
  const navigate = useNavigate();
  const [registrations, setRegistrations] = useState<Registration[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [cancelDialogOpen, setCancelDialogOpen] = useState(false);
  const [eventToCancel, setEventToCancel] = useState<Registration | null>(null);
  const [cancelling, setCancelling] = useState(false);

  useEffect(() => {
    if (!isAuthenticated) {
      navigate("/login");
      return;
    }

    const fetchRegistrations = async () => {
      if (!user) return;

      try {
        setLoading(true);
        const response = await EventService.getUserRegistrations(
          user.username,
          user.token
        );

        if (response.success) {
          setRegistrations(response.registrations);
        } else {
          setError("Failed to load your registrations");
        }
      } catch (err) {
        console.error("Error fetching registrations:", err);
        setError("An error occurred while loading your registrations");
      } finally {
        setLoading(false);
      }
    };

    fetchRegistrations();
  }, [isAuthenticated, navigate, user]);

  const handleCancelClick = (registration: Registration) => {
    setEventToCancel(registration);
    setCancelDialogOpen(true);
  };

  const handleCancelConfirm = async () => {
    if (!eventToCancel || !user) return;

    setCancelling(true);
    try {
      const response = await EventService.cancelRegistration(
        eventToCancel.eventId,
        user.username,
        user.token
      );

      if (response.success) {
        setRegistrations((prev) =>
          prev.filter((reg) => reg.eventId !== eventToCancel.eventId)
        );
        setCancelDialogOpen(false);
        setEventToCancel(null);
      } else {
        setError("Failed to cancel registration");
      }
    } catch (err) {
      console.error("Error cancelling registration:", err);
      setError("An error occurred while cancelling registration");
    } finally {
      setCancelling(false);
    }
  };

  const handleCancelClose = () => {
    setCancelDialogOpen(false);
    setEventToCancel(null);
  };

  if (loading) {
    return (
      <PageContainer>
        <Header />
        <Box
          sx={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            minHeight: "60vh",
          }}
        >
          <CircularProgress size={60} />
        </Box>
        <Footer />
      </PageContainer>
    );
  }

  return (
    <PageContainer>
      <Header />
      <main id='main-content'>
        <DashboardContainer maxWidth='lg'>
          <PageTitle variant='h1'>{t("member_dashboard_title")}</PageTitle>
          <PageSubtitle>{t("member_dashboard_subtitle")}</PageSubtitle>

          {error && (
            <Alert severity='error' sx={{ marginBottom: 3 }}>
              {error}
            </Alert>
          )}

          {registrations.length === 0 ? (
            <EmptyState>
              <EmptyStateIcon />
              <EmptyStateText>
                {t("member_dashboard_no_registrations")}
              </EmptyStateText>
              <BrowseEventsButton onClick={() => navigate("/events")}>
                {t("browse_events")}
              </BrowseEventsButton>
            </EmptyState>
          ) : (
            <EventsGrid>
              {registrations.map((registration) => {
                const eventDetails = eventIdToDetails[registration.eventId];
                if (!eventDetails) return null;

                return (
                  <EventCard key={registration.eventId}>
                    <EventCardContent>
                      <StatusChip
                        label={
                          registration.status === "confirmed"
                            ? "Confirmed"
                            : registration.status
                        }
                        color='success'
                        size='small'
                      />
                      <EventTitle>{eventDetails.title}</EventTitle>
                      <EventMeta>
                        <MetaItem>
                          <CalendarTodayIcon />
                          <MetaText>{eventDetails.date}</MetaText>
                        </MetaItem>
                        <MetaItem>
                          <AccessTimeIcon />
                          <MetaText>{eventDetails.time}</MetaText>
                        </MetaItem>
                        <MetaItem>
                          <LocationOnIcon />
                          <MetaText>{eventDetails.location}</MetaText>
                        </MetaItem>
                      </EventMeta>
                      <CancelButton
                        startIcon={<CancelIcon />}
                        onClick={() => handleCancelClick(registration)}
                      >
                        {t("cancel_registration")}
                      </CancelButton>
                    </EventCardContent>
                  </EventCard>
                );
              })}
            </EventsGrid>
          )}
        </DashboardContainer>
      </main>
      <Footer />

      {/* Cancel Confirmation Dialog */}
      <Dialog open={cancelDialogOpen} onClose={handleCancelClose}>
        <DialogTitle>{t("cancel_registration_title")}</DialogTitle>
        <DialogContent>
          <Typography>
            {t("cancel_registration_message")}
            {eventToCancel && eventIdToDetails[eventToCancel.eventId] && (
              <strong> {eventIdToDetails[eventToCancel.eventId].title}</strong>
            )}
            ?
          </Typography>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCancelClose} disabled={cancelling}>
            {t("no_keep_registration")}
          </Button>
          <Button
            onClick={handleCancelConfirm}
            color='error'
            disabled={cancelling}
          >
            {cancelling ? (
              <CircularProgress size={24} />
            ) : (
              t("yes_cancel_registration")
            )}
          </Button>
        </DialogActions>
      </Dialog>
    </PageContainer>
  );
}

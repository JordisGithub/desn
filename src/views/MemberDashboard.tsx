import { useState, useEffect } from "react";
import { usePageTitle } from "../hooks/usePageTitle";
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
import EventService from "../services/EventService";
import {
  translateEventTitle,
  translateEventLocation,
} from "../utils/eventTranslations";
import { formatDate, formatTimeRange } from "../utils/dateLocalization";
import ResourceService from "../services/ResourceService";
import CalendarTodayIcon from "@mui/icons-material/CalendarToday";
import AccessTimeIcon from "@mui/icons-material/AccessTime";
import LocationOnIcon from "@mui/icons-material/LocationOn";
import EventAvailableIcon from "@mui/icons-material/EventAvailable";
import CancelIcon from "@mui/icons-material/Cancel";
import FavoriteIcon from "@mui/icons-material/Favorite";
import DescriptionIcon from "@mui/icons-material/Description";
import VisibilityIcon from "@mui/icons-material/Visibility";
import ArticleIcon from "@mui/icons-material/Article";

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

const PageTitle = styled("h1")(({ theme }) => ({
  fontSize: "3rem",
  fontWeight: 400,
  color: "#004c91",
  fontFamily: "'Open Sans', sans-serif",
  margin: 0,
  marginBottom: theme.spacing(2),
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
  "&.MuiChip-colorSuccess": {
    backgroundColor: "#008766", // Darker success color for better contrast
    color: "#ffffff",
  },
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
  border: "2px solid #d32f2f",
  "&:hover": {
    backgroundColor: "#ffebee",
    color: "#b71c1c",
    borderColor: "#b71c1c",
  },
  "&:focus": {
    outline: "3px solid #d32f2f",
    outlineOffset: "2px",
    backgroundColor: "#ffebee",
  },
  "&:focus-visible": {
    outline: "3px solid #d32f2f",
    outlineOffset: "2px",
    backgroundColor: "#ffebee",
  },
  "&.MuiButton-root": {
    "& .MuiTouchRipple-root": {
      display: "none",
    },
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
  "&:focus": {
    outline: "3px solid #f6d469",
    outlineOffset: "2px",
    backgroundColor: "#003d73",
  },
  "&:focus-visible": {
    outline: "3px solid #f6d469",
    outlineOffset: "2px",
    backgroundColor: "#003d73",
  },
  "&.MuiButton-root": {
    "& .MuiTouchRipple-root": {
      display: "none",
    },
  },
});

const SectionTitle = styled(Typography)({
  fontSize: "2rem",
  fontWeight: 600,
  color: "#004c91",
  marginTop: "3rem",
  marginBottom: "1.5rem",
  fontFamily: "'Poppins', sans-serif",
});

const ResourceCard = styled(Card)({
  borderRadius: "16px",
  border: "1px solid #e5e7eb",
  boxShadow: "0px 2px 8px rgba(0, 0, 0, 0.08)",
  transition: "all 0.3s ease",
  "&:hover": {
    boxShadow: "0px 8px 24px rgba(0, 0, 0, 0.12)",
    transform: "translateY(-4px)",
  },
});

const ResourceCardContent = styled(CardContent)({
  padding: "1.5rem",
  display: "flex",
  gap: "1rem",
  flexWrap: "wrap",
  alignItems: "flex-start",
});

const ResourceIcon = styled(Box)({
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  width: "60px",
  height: "60px",
  borderRadius: "12px",
  backgroundColor: "#e3f2fd",
  flexShrink: 0,
  "& .MuiSvgIcon-root": {
    fontSize: "2rem",
    color: "#004c91",
  },
});

const ResourceInfo = styled(Box)({
  flex: 1,
  minWidth: 0, // Allow flex item to shrink below content size
  overflow: "hidden",
});

const ResourceTitle = styled(Typography)({
  fontSize: "1.125rem",
  fontWeight: 600,
  color: "#004c91",
  marginBottom: "0.5rem",
  fontFamily: "'Poppins', sans-serif",
  wordWrap: "break-word",
  overflowWrap: "break-word",
  hyphens: "auto",
});

const ResourceDescription = styled(Typography)({
  fontSize: "0.875rem",
  color: "#4a5565",
  marginBottom: "0.75rem",
  display: "-webkit-box",
  WebkitLineClamp: 2,
  WebkitBoxOrient: "vertical",
  overflow: "hidden",
});

const ResourceMeta = styled(Box)({
  display: "flex",
  gap: "1rem",
  alignItems: "center",
  flexWrap: "wrap",
});

const ResourceType = styled(Chip)({
  fontSize: "0.75rem",
  height: "24px",
});

const ResourceDate = styled(Typography)({
  fontSize: "0.75rem",
  color: "#717182",
});

const ResourceActions = styled(Box)({
  display: "flex",
  flexDirection: "column",
  gap: "0.5rem",
  alignItems: "flex-end",
  flexShrink: 0,
});

const ViewButton = styled(Button)({
  backgroundColor: "#004c91",
  color: "white",
  borderRadius: "8px",
  padding: "8px 16px",
  fontSize: "0.875rem",
  textTransform: "none",
  fontWeight: 600,
  minWidth: "120px",
  transition: "all 0.3s ease",
  "&:hover": {
    backgroundColor: "#002d5a",
    transform: "translateY(-2px)",
    boxShadow: "0px 4px 12px rgba(0, 76, 145, 0.4)",
  },
  "&:focus": {
    outline: "3px solid #004c91",
    outlineOffset: "2px",
    backgroundColor: "#003d73",
  },
  "&:focus-visible": {
    outline: "3px solid #004c91",
    outlineOffset: "2px",
    backgroundColor: "#003d73",
  },
  "&.MuiButton-root": {
    "& .MuiTouchRipple-root": {
      display: "none",
    },
  },
});

const RemoveFavoriteButton = styled(Button)({
  color: "#d32f2f",
  borderRadius: "8px",
  padding: "8px 16px",
  fontSize: "0.875rem",
  textTransform: "none",
  fontWeight: 600,
  minWidth: "120px",
  "&:hover": {
    backgroundColor: "#ffebee",
    color: "#b71c1c",
  },
  "&:focus": {
    outline: "3px solid #d32f2f",
    outlineOffset: "2px",
    backgroundColor: "#ffebee",
  },
  "&:focus-visible": {
    outline: "3px solid #d32f2f",
    outlineOffset: "2px",
    backgroundColor: "#ffebee",
  },
  "&.MuiButton-root": {
    "& .MuiTouchRipple-root": {
      display: "none",
    },
  },
});

interface Registration {
  registrationId: number;
  registeredAt: string;
  event: {
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
  };
}

interface FavoriteResource {
  favoriteId: number;
  favoritedAt: string;
  resource: {
    id: number;
    title: string;
    description: string;
    type: string;
    fileUrl: string;
    thumbnailUrl?: string;
    pages?: number;
    publishDate: string;
    clicks: number;
    favoriteCount: number;
    featured: boolean;
    createdAt: string;
    updatedAt: string;
  };
}

export default function MemberDashboard() {
  const { t } = useTranslation();
  usePageTitle("page_titles.member_dashboard");
  const { user, isAuthenticated, isAuthReady } = useAuth();
  const navigate = useNavigate();
  const [registrations, setRegistrations] = useState<Registration[]>([]);
  const [favorites, setFavorites] = useState<FavoriteResource[]>([]);
  const [loading, setLoading] = useState(true);
  const [loadingFavorites, setLoadingFavorites] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [cancelDialogOpen, setCancelDialogOpen] = useState(false);
  const [eventToCancel, setEventToCancel] = useState<Registration | null>(null);
  const [cancelling, setCancelling] = useState(false);

  useEffect(() => {
    if (!isAuthReady) {
      return;
    }

    if (!isAuthenticated) {
      navigate("/login");
      return;
    }

    let isMounted = true;

    const fetchRegistrations = async () => {
      if (!user || !isMounted) return;

      try {
        if (isMounted) setLoading(true);
        const registrationsData = await EventService.getUserRegistrations(
          user.username,
          user.token
        );

        // Transform backend response to Registration[] format
        const transformedRegistrations: Registration[] = registrationsData.map(
          (registration) => ({
            registrationId: registration.registrationId,
            registeredAt: registration.registeredAt,
            event: {
              id: registration.event.id,
              title: registration.event.title,
              description: registration.event.description,
              startDate: registration.event.startDate,
              endDate: registration.event.endDate,
              location: registration.event.location,
              maxAttendees: registration.event.maxAttendees,
              currentAttendees: registration.event.currentAttendees,
              featured: registration.event.featured || false,
            },
          })
        );
        if (isMounted) setRegistrations(transformedRegistrations);
      } catch (err) {
        console.error("Error fetching registrations:", err);
        if (isMounted) {
          setError("An error occurred while loading your registrations");
          setRegistrations([]); // Set empty array on error
        }
      } finally {
        if (isMounted) setLoading(false);
      }
    };

    const fetchFavorites = async () => {
      if (!user || !isMounted) return;

      try {
        if (isMounted) setLoadingFavorites(true);
        const favoritesData = await ResourceService.getUserFavorites(
          user.username,
          user.token
        );
        if (isMounted) setFavorites(favoritesData);
      } catch (err) {
        console.error("Error fetching favorites:", err);
        // Don't set error here, just log it - we don't want to block the whole dashboard
      } finally {
        if (isMounted) setLoadingFavorites(false);
      }
    };

    fetchRegistrations();
    fetchFavorites();

    return () => {
      isMounted = false;
    };
  }, [isAuthReady, isAuthenticated, navigate, user]);

  const handleCancelClick = (registration: Registration) => {
    setEventToCancel(registration);
    setCancelDialogOpen(true);
  };

  const handleCancelConfirm = async () => {
    if (!eventToCancel || !user) return;

    setCancelling(true);
    try {
      const response = await EventService.cancelRegistration(
        eventToCancel.event.id,
        user.username,
        user.token
      );

      if (response.success) {
        setRegistrations((prev) =>
          prev.filter((reg) => reg.event.id !== eventToCancel.event.id)
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

  const handleRemoveFavorite = async (resourceId: number) => {
    if (!user) return;

    try {
      await ResourceService.toggleFavorite(
        resourceId,
        user.username,
        user.token
      );
      // Remove from favorites list
      setFavorites((prev) =>
        prev.filter((fav) => fav.resource.id !== resourceId)
      );
    } catch (err) {
      console.error("Error removing favorite:", err);
      setError("Failed to remove favorite");
    }
  };

  const handleViewResource = (fileUrl: string) => {
    // Open resource in new tab
    window.open(fileUrl, "_blank", "noopener,noreferrer");
  };

  const getResourceTypeLabel = (type: string): string => {
    const labels: Record<string, string> = {
      "annual-report": "Annual Report",
      "policy-brief": "Policy Brief",
      "training-manual": "Training Manual",
      research: "Research",
      guideline: "Guideline",
      newsletter: "Newsletter",
      video: "Video Resource",
    };
    return labels[type] || type;
  };

  const formatDate = (dateString: string): string => {
    const date = new Date(dateString);
    return date.toLocaleDateString("en-US", {
      year: "numeric",
      month: "short",
      day: "numeric",
    });
  };

  if (loading || loadingFavorites) {
    return (
      <PageContainer>
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
      </PageContainer>
    );
  }

  return (
    <PageContainer>
      <DashboardContainer maxWidth='lg'>
        <PageTitle>{t("member_dashboard_title")}</PageTitle>
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
              const event = registration.event;
              const eventDate = new Date(event.startDate);
              const eventEndDate = new Date(event.endDate);

              return (
                <EventCard key={registration.event.id}>
                  <EventCardContent>
                    <StatusChip
                      label={t("registration_confirmed")}
                      color='success'
                      size='small'
                    />
                    <EventTitle>
                      {translateEventTitle(event.title, t)}
                    </EventTitle>
                    <EventMeta>
                      <MetaItem>
                        <CalendarTodayIcon />
                        <MetaText>
                          {formatDate(eventDate, i18n.language)}
                        </MetaText>
                      </MetaItem>
                      <MetaItem>
                        <AccessTimeIcon />
                        <MetaText>
                          {formatTimeRange(
                            eventDate,
                            eventEndDate,
                            i18n.language
                          )}
                        </MetaText>
                      </MetaItem>
                      <MetaItem>
                        <LocationOnIcon />
                        <MetaText>
                          {translateEventLocation(event.location, t)}
                        </MetaText>
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

        {/* Favorite Publications Section */}
        <SectionTitle variant='h2'>{t("favorite_publications")}</SectionTitle>

        {favorites.length === 0 ? (
          <EmptyState>
            <FavoriteIcon sx={{ fontSize: "5rem", color: "#c4c4c4", mb: 2 }} />
            <EmptyStateText>{t("no_favorite_publications")}</EmptyStateText>
            <BrowseEventsButton onClick={() => navigate("/resources")}>
              {t("browse_publications")}
            </BrowseEventsButton>
          </EmptyState>
        ) : (
          <EventsGrid>
            {favorites.map((favorite) => (
              <ResourceCard key={favorite.favoriteId}>
                <ResourceCardContent>
                  <ResourceIcon>
                    {favorite.resource.type === "video" ? (
                      <ArticleIcon />
                    ) : (
                      <DescriptionIcon />
                    )}
                  </ResourceIcon>
                  <ResourceInfo>
                    <ResourceTitle>{favorite.resource.title}</ResourceTitle>
                    <ResourceDescription>
                      {favorite.resource.description}
                    </ResourceDescription>
                    <ResourceMeta>
                      <ResourceType
                        label={getResourceTypeLabel(favorite.resource.type)}
                        size='small'
                        color='primary'
                        variant='outlined'
                      />
                      {favorite.resource.pages && (
                        <ResourceDate>
                          {favorite.resource.pages} pages
                        </ResourceDate>
                      )}
                      <ResourceDate>
                        {formatDate(favorite.resource.publishDate)}
                      </ResourceDate>
                    </ResourceMeta>
                  </ResourceInfo>
                  <ResourceActions>
                    <ViewButton
                      startIcon={<VisibilityIcon />}
                      onClick={() =>
                        handleViewResource(favorite.resource.fileUrl)
                      }
                    >
                      {t("view")}
                    </ViewButton>
                    <RemoveFavoriteButton
                      startIcon={<CancelIcon />}
                      onClick={() => handleRemoveFavorite(favorite.resource.id)}
                    >
                      {t("remove")}
                    </RemoveFavoriteButton>
                  </ResourceActions>
                </ResourceCardContent>
              </ResourceCard>
            ))}
          </EventsGrid>
        )}
      </DashboardContainer>

      {/* Cancel Confirmation Dialog */}
      <Dialog open={cancelDialogOpen} onClose={handleCancelClose}>
        <DialogTitle>{t("cancel_registration_title")}</DialogTitle>
        <DialogContent>
          <Typography>
            {t("cancel_registration_message")}
            {eventToCancel && <strong> {eventToCancel.event.title}</strong>}?
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

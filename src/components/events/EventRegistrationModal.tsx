import { useState } from "react";
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  Typography,
  Box,
  Alert,
  CircularProgress,
} from "@mui/material";
import { styled } from "@mui/material/styles";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../../contexts/AuthContext";
import { useTranslation } from "react-i18next";
import EventService from "../../services/EventService";
import LoginIcon from "@mui/icons-material/Login";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";

const StyledDialog = styled(Dialog)(({ theme }) => ({
  "& .MuiDialog-paper": {
    borderRadius: "16px",
    padding: theme.spacing(2),
    maxWidth: "500px",
  },
}));

const StyledDialogTitle = styled(DialogTitle)({
  fontSize: "1.5rem",
  fontWeight: 600,
  color: "#004c91",
  textAlign: "center",
  paddingBottom: "1rem",
});

const StyledDialogContent = styled(DialogContent)({
  paddingTop: "1rem",
  paddingBottom: "1.5rem",
});

const LoginPromptBox = styled(Box)(({ theme }) => ({
  textAlign: "center",
  padding: theme.spacing(3),
}));

const LoginPromptText = styled(Typography)({
  fontSize: "1.125rem",
  color: "#4a5565",
  marginBottom: "1.5rem",
  lineHeight: 1.6,
});

const ActionButton = styled(Button)({
  borderRadius: "100px",
  padding: "12px 32px",
  fontSize: "1rem",
  textTransform: "none",
  fontWeight: 600,
  minWidth: "140px",
});

const PrimaryButton = styled(ActionButton)({
  backgroundColor: "#004c91",
  color: "white",
  "&:hover": {
    backgroundColor: "#003d73",
  },
});

const SecondaryButton = styled(ActionButton)({
  backgroundColor: "#f3f4f6",
  color: "#4a5565",
  "&:hover": {
    backgroundColor: "#e5e7eb",
  },
});

const EventDetails = styled(Box)({
  backgroundColor: "#f9fafb",
  borderRadius: "12px",
  padding: "1.5rem",
  marginBottom: "1.5rem",
});

const EventDetailRow = styled(Box)({
  display: "flex",
  justifyContent: "space-between",
  marginBottom: "0.75rem",
  "&:last-child": {
    marginBottom: 0,
  },
});

const DetailLabel = styled(Typography)({
  fontSize: "0.875rem",
  color: "#717182",
  fontWeight: 500,
});

const DetailValue = styled(Typography)({
  fontSize: "0.875rem",
  color: "#2b2b2b",
  fontWeight: 600,
});

interface EventRegistrationModalProps {
  open: boolean;
  onClose: () => void;
  eventId: number;
  eventTitle: string;
  eventDate: string;
  eventTime: string;
  eventLocation: string;
  onRegistrationSuccess?: () => void;
}

export default function EventRegistrationModal({
  open,
  onClose,
  eventId,
  eventTitle,
  eventDate,
  eventTime,
  eventLocation,
  onRegistrationSuccess,
}: EventRegistrationModalProps) {
  const { t } = useTranslation();
  const { user, isAuthenticated } = useAuth();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState(false);

  const handleLoginRedirect = () => {
    onClose();
    navigate("/login", { state: { from: "/events" } });
  };

  const handleRegisterRedirect = () => {
    onClose();
    navigate("/register", { state: { from: "/events" } });
  };

  const handleConfirmRegistration = async () => {
    if (!user) return;

    setLoading(true);
    setError(null);

    try {
      const registrationData = {
        username: user.username,
        email: user.email,
        fullName: user.fullName,
      };

      await EventService.registerForEvent(
        eventId,
        registrationData,
        user.token
      );

      setSuccess(true);

      setTimeout(() => {
        setSuccess(false);
        onClose();
        if (onRegistrationSuccess) {
          onRegistrationSuccess();
        }
      }, 2000);
    } catch (err) {
      console.error("Registration error:", err);
      const error = err as {
        response?: { data?: { message?: string }; status?: number };
      };

      if (error.response?.data?.message) {
        setError(error.response.data.message);
      } else if (error.response?.status === 409) {
        setError(
          "You are already registered for this event or the event is full."
        );
      } else {
        setError("Failed to register for the event. Please try again.");
      }
    } finally {
      setLoading(false);
    }
  };

  const renderContent = () => {
    if (success) {
      return (
        <LoginPromptBox>
          <CheckCircleIcon
            sx={{ fontSize: "4rem", color: "#00a77f", marginBottom: 2 }}
          />
          <Typography variant='h6' sx={{ color: "#00a77f", fontWeight: 600 }}>
            {t("event_registration_success")}
          </Typography>
          <Typography sx={{ color: "#4a5565", marginTop: 1 }}>
            {t("event_registration_success_message")}
          </Typography>
        </LoginPromptBox>
      );
    }

    if (!isAuthenticated) {
      return (
        <>
          <LoginPromptBox>
            <LoginIcon
              sx={{ fontSize: "3rem", color: "#004c91", marginBottom: 2 }}
            />
            <LoginPromptText>
              {t("event_registration_login_required")}
            </LoginPromptText>
          </LoginPromptBox>
          <DialogActions
            sx={{ justifyContent: "center", gap: 2, paddingBottom: 2 }}
          >
            <SecondaryButton onClick={onClose}>{t("cancel")}</SecondaryButton>
            <SecondaryButton onClick={handleRegisterRedirect}>
              {t("create_account")}
            </SecondaryButton>
            <PrimaryButton onClick={handleLoginRedirect}>
              {t("login")}
            </PrimaryButton>
          </DialogActions>
        </>
      );
    }

    return (
      <>
        <StyledDialogContent>
          {error && (
            <Alert severity='error' sx={{ marginBottom: 2 }}>
              {error}
            </Alert>
          )}

          <Typography sx={{ marginBottom: 2, color: "#4a5565" }}>
            {t("event_registration_confirm_message")}
          </Typography>

          <EventDetails>
            <EventDetailRow>
              <DetailLabel>{t("event")}:</DetailLabel>
              <DetailValue>{eventTitle}</DetailValue>
            </EventDetailRow>
            <EventDetailRow>
              <DetailLabel>{t("date")}:</DetailLabel>
              <DetailValue>{eventDate}</DetailValue>
            </EventDetailRow>
            <EventDetailRow>
              <DetailLabel>{t("time")}:</DetailLabel>
              <DetailValue>{eventTime}</DetailValue>
            </EventDetailRow>
            <EventDetailRow>
              <DetailLabel>{t("location")}:</DetailLabel>
              <DetailValue>{eventLocation}</DetailValue>
            </EventDetailRow>
            <EventDetailRow>
              <DetailLabel>{t("registrant")}:</DetailLabel>
              <DetailValue>{user?.fullName}</DetailValue>
            </EventDetailRow>
          </EventDetails>
        </StyledDialogContent>

        <DialogActions
          sx={{ justifyContent: "center", gap: 2, paddingBottom: 2 }}
        >
          <SecondaryButton onClick={onClose} disabled={loading}>
            {t("cancel")}
          </SecondaryButton>
          <PrimaryButton onClick={handleConfirmRegistration} disabled={loading}>
            {loading ? (
              <CircularProgress size={24} sx={{ color: "white" }} />
            ) : (
              t("confirm_registration")
            )}
          </PrimaryButton>
        </DialogActions>
      </>
    );
  };

  return (
    <StyledDialog open={open} onClose={onClose} maxWidth='sm' fullWidth>
      <StyledDialogTitle>
        {success
          ? t("event_registration_success_title")
          : !isAuthenticated
          ? t("event_registration_title")
          : t("confirm_event_registration")}
      </StyledDialogTitle>
      {renderContent()}
    </StyledDialog>
  );
}

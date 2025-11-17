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
    [theme.breakpoints.down("sm")]: {
      margin: theme.spacing(2),
      padding: theme.spacing(1.5),
      maxWidth: "calc(100% - 32px)",
    },
  },
}));

const StyledDialogTitle = styled(DialogTitle)(({ theme }) => ({
  fontSize: "1.5rem",
  fontWeight: 600,
  color: "#004c91",
  textAlign: "center",
  paddingBottom: "1rem",
  [theme.breakpoints.down("sm")]: {
    fontSize: "1.25rem",
    padding: theme.spacing(1.5, 1, 0.75, 1),
  },
}));

const StyledDialogContent = styled(DialogContent)(({ theme }) => ({
  paddingTop: "1rem",
  paddingBottom: "1.5rem",
  [theme.breakpoints.down("sm")]: {
    padding: theme.spacing(1, 1.5, 1.5, 1.5),
  },
}));

const LoginPromptBox = styled(Box)(({ theme }) => ({
  textAlign: "center",
  padding: theme.spacing(3),
  [theme.breakpoints.down("sm")]: {
    padding: theme.spacing(2, 1),
  },
}));

const LoginPromptText = styled(Typography)(({ theme }) => ({
  fontSize: "1.125rem",
  color: "#4a5565",
  marginBottom: "1.5rem",
  lineHeight: 1.6,
  [theme.breakpoints.down("sm")]: {
    fontSize: "1rem",
    marginBottom: "1rem",
  },
}));

const ActionButton = styled(Button)(({ theme }) => ({
  borderRadius: "100px",
  padding: "12px 32px",
  fontSize: "1rem",
  textTransform: "none",
  fontWeight: 600,
  minWidth: "140px",
  [theme.breakpoints.down("sm")]: {
    padding: "10px 20px",
    fontSize: "0.875rem",
    minWidth: "100px",
  },
}));

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

const EventDetails = styled(Box)(({ theme }) => ({
  backgroundColor: "#f9fafb",
  borderRadius: "12px",
  padding: "1.5rem",
  marginBottom: "1.5rem",
  [theme.breakpoints.down("sm")]: {
    padding: "1rem",
    marginBottom: "1rem",
  },
}));

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
        <LoginPromptBox
          role='status'
          aria-live='polite'
          id='registration-modal-description'
        >
          <CheckCircleIcon
            sx={{
              fontSize: { xs: "3rem", sm: "4rem" },
              color: "#00a77f",
              marginBottom: 2,
            }}
            aria-hidden='true'
          />
          <Typography
            variant='h6'
            sx={{
              color: "#00a77f",
              fontWeight: 600,
              fontSize: { xs: "1.125rem", sm: "1.25rem" },
            }}
          >
            {t("event_registration_success")}
          </Typography>
          <Typography
            sx={{
              color: "#4a5565",
              marginTop: 1,
              fontSize: { xs: "0.875rem", sm: "1rem" },
            }}
          >
            {t("event_registration_success_message")}
          </Typography>
        </LoginPromptBox>
      );
    }

    if (!isAuthenticated) {
      return (
        <>
          <LoginPromptBox id='registration-modal-description'>
            <LoginIcon
              sx={{
                fontSize: { xs: "2.5rem", sm: "3rem" },
                color: "#004c91",
                marginBottom: 2,
              }}
              aria-hidden='true'
            />
            <LoginPromptText>
              {t("event_registration_login_required")}
            </LoginPromptText>
          </LoginPromptBox>
          <DialogActions
            sx={{
              justifyContent: "center",
              gap: 2,
              paddingBottom: 2,
              flexDirection: { xs: "column", sm: "row" },
              "& > button": {
                width: { xs: "100%", sm: "auto" },
              },
            }}
            role='group'
            aria-label='Authentication actions'
          >
            <SecondaryButton
              onClick={onClose}
              aria-label='Cancel and close registration dialog'
            >
              {t("cancel")}
            </SecondaryButton>
            <SecondaryButton
              onClick={handleRegisterRedirect}
              aria-label='Create new account to register for events'
            >
              {t("create_account")}
            </SecondaryButton>
            <PrimaryButton
              onClick={handleLoginRedirect}
              aria-label='Login to your account to register for this event'
            >
              {t("login")}
            </PrimaryButton>
          </DialogActions>
        </>
      );
    }

    return (
      <>
        <StyledDialogContent id='registration-modal-description'>
          {error && (
            <Alert
              severity='error'
              sx={{ marginBottom: 2 }}
              role='alert'
              aria-live='assertive'
            >
              {error}
            </Alert>
          )}

          <Typography sx={{ marginBottom: 2, color: "#4a5565" }}>
            {t("event_registration_confirm_message")}
          </Typography>

          <EventDetails role='list' aria-label='Event registration details'>
            <EventDetailRow role='listitem'>
              <DetailLabel>{t("event")}:</DetailLabel>
              <DetailValue>{eventTitle}</DetailValue>
            </EventDetailRow>
            <EventDetailRow role='listitem'>
              <DetailLabel>{t("date")}:</DetailLabel>
              <DetailValue>{eventDate}</DetailValue>
            </EventDetailRow>
            <EventDetailRow role='listitem'>
              <DetailLabel>{t("time")}:</DetailLabel>
              <DetailValue>{eventTime}</DetailValue>
            </EventDetailRow>
            <EventDetailRow role='listitem'>
              <DetailLabel>{t("location")}:</DetailLabel>
              <DetailValue>{eventLocation}</DetailValue>
            </EventDetailRow>
            <EventDetailRow role='listitem'>
              <DetailLabel>{t("registrant")}:</DetailLabel>
              <DetailValue>{user?.fullName}</DetailValue>
            </EventDetailRow>
          </EventDetails>
        </StyledDialogContent>

        <DialogActions
          sx={{
            justifyContent: "center",
            gap: 2,
            paddingBottom: 2,
            flexDirection: { xs: "column", sm: "row" },
            "& > button": {
              width: { xs: "100%", sm: "auto" },
            },
          }}
          role='group'
          aria-label='Registration confirmation actions'
        >
          <SecondaryButton
            onClick={onClose}
            disabled={loading}
            aria-label='Cancel registration and close dialog'
          >
            {t("cancel")}
          </SecondaryButton>
          <PrimaryButton
            onClick={handleConfirmRegistration}
            disabled={loading}
            aria-label={
              loading
                ? "Submitting registration, please wait"
                : `Confirm registration for ${eventTitle} on ${eventDate}`
            }
            aria-busy={loading}
          >
            {loading ? (
              <>
                <CircularProgress
                  size={24}
                  sx={{ color: "white" }}
                  aria-hidden='true'
                />
                <span className='sr-only'>Submitting registration</span>
              </>
            ) : (
              t("confirm_registration")
            )}
          </PrimaryButton>
        </DialogActions>
      </>
    );
  };

  return (
    <StyledDialog
      open={open}
      onClose={onClose}
      maxWidth='sm'
      fullWidth
      aria-labelledby='registration-modal-title'
      aria-describedby='registration-modal-description'
      role='dialog'
      aria-modal='true'
    >
      <StyledDialogTitle id='registration-modal-title'>
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

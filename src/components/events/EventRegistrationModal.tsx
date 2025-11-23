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
  IconButton,
} from "@mui/material";
import { styled } from "@mui/material/styles";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../../contexts/AuthContext";
import { useTranslation } from "react-i18next";
import EventService from "../../services/EventService";
import LoginIcon from "@mui/icons-material/Login";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import CloseIcon from "@mui/icons-material/Close";

const StyledDialog = styled(Dialog)(({ theme }) => ({
  "& .MuiBackdrop-root": {
    backgroundColor: "rgba(0, 0, 0, 0.7)",
  },
  "& .MuiDialog-paper": {
    borderRadius: "16px",
    padding: theme.spacing(2),
    maxWidth: "500px",
    border: "2px solid #004c91",
    [theme.breakpoints.down("sm")]: {
      margin: theme.spacing(2),
      padding: theme.spacing(1.5),
      maxWidth: "calc(100% - 32px)",
    },
  },
}));

const StyledDialogTitle = styled(DialogTitle)(({ theme }) => ({
  fontSize: "1.5rem",
  fontWeight: 700,
  color: "#002b52",
  textAlign: "center",
  paddingBottom: "1rem",
  position: "relative",
  paddingRight: theme.spacing(6),
  [theme.breakpoints.down("sm")]: {
    fontSize: "1.25rem",
    padding: theme.spacing(1.5, 6, 0.75, 1),
  },
}));

const CloseButton = styled(IconButton)(({ theme }) => ({
  position: "absolute",
  right: theme.spacing(1),
  top: theme.spacing(1),
  color: "#002b52",
  width: "44px",
  height: "44px",
  padding: "10px",
  transition: "transform 0.2s ease-in-out, background-color 0.2s ease-in-out",
  "&:hover": {
    backgroundColor: "#e8eff7",
    color: "#001f3a",
    transform: "scale(1.15)",
  },
  "&:focus-visible": {
    outline: "3px solid #002b52",
    outlineOffset: "2px",
    backgroundColor: "#e8eff7",
    transform: "scale(1.15)",
  },
  "& .MuiSvgIcon-root": {
    fontSize: "1.5rem",
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
  color: "#2b2b2b",
  marginBottom: "1.5rem",
  lineHeight: 1.6,
  fontWeight: 500,
  [theme.breakpoints.down("sm")]: {
    fontSize: "1rem",
    marginBottom: "1rem",
  },
}));

const ActionButton = styled(Button)(({ theme }) => ({
  borderRadius: "8px",
  padding: "12px 32px",
  fontSize: "1rem",
  textTransform: "none",
  fontWeight: 700,
  minWidth: "140px",
  minHeight: "48px",
  display: "inline-flex",
  alignItems: "center",
  justifyContent: "center",
  "&:focus-visible": {
    outline: "3px solid #002b52",
    outlineOffset: "2px",
  },
  [theme.breakpoints.down("sm")]: {
    padding: "12px 20px",
    fontSize: "0.95rem",
    minWidth: "120px",
  },
  "&.MuiButton-root": {
    "& .MuiTouchRipple-root": {
      display: "none",
    },
  },
}));

const PrimaryButton = styled(ActionButton)({
  backgroundColor: "#002b52",
  color: "#ffffff",
  border: "2px solid transparent",
  "&:hover": {
    backgroundColor: "#ffffff",
    color: "#002b52",
    border: "2px solid #002b52",
  },
  "&:focus-visible": {
    backgroundColor: "#ffffff",
    color: "#002b52",
    border: "2px solid #002b52",
    outline: "3px solid #002b52",
    outlineOffset: "2px",
  },
  "&:active": {
    backgroundColor: "#001f3a",
  },
  "&:disabled": {
    backgroundColor: "#999999",
    color: "#ffffff",
    cursor: "not-allowed",
  },
});

const SecondaryButton = styled(ActionButton)({
  backgroundColor: "#ffffff",
  color: "#002b52",
  border: "2px solid #002b52",
  fontWeight: 700,
  "&:hover": {
    backgroundColor: "#e8eff7",
    borderColor: "#001f3a",
    color: "#001f3a",
  },
  "&:focus-visible": {
    backgroundColor: "#e8eff7",
    borderColor: "#001f3a",
    color: "#001f3a",
    outline: "3px solid #002b52",
    outlineOffset: "2px",
  },
  "&:active": {
    backgroundColor: "#d9e5f0",
  },
  "&:disabled": {
    backgroundColor: "#e5e7eb",
    color: "#999999",
    borderColor: "#999999",
    cursor: "not-allowed",
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
  fontSize: "0.95rem",
  color: "#2b2b2b",
  fontWeight: 700,
});

const DetailValue = styled(Typography)({
  fontSize: "0.95rem",
  color: "#004c91",
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
              disableRipple
            >
              {t("cancel")}
            </SecondaryButton>
            <SecondaryButton
              onClick={handleRegisterRedirect}
              aria-label='Create new account to register for events'
              disableRipple
            >
              {t("create_account")}
            </SecondaryButton>
            <PrimaryButton
              onClick={handleLoginRedirect}
              aria-label='Login to your account to register for this event'
              disableRipple
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

          <Typography
            sx={{ marginBottom: 2, color: "#2b2b2b", fontWeight: 500 }}
          >
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
            disableRipple
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
            disableRipple
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
        <CloseButton
          onClick={onClose}
          aria-label={t("close")}
          disabled={loading}
          disableRipple
        >
          <CloseIcon />
        </CloseButton>
      </StyledDialogTitle>
      {renderContent()}
    </StyledDialog>
  );
}

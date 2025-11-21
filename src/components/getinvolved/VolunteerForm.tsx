import React, { useState, useEffect, useRef } from "react";
import { styled } from "@mui/material/styles";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import Alert from "@mui/material/Alert";
import CircularProgress from "@mui/material/CircularProgress";
import { useTranslation } from "react-i18next";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import { useLanguage } from "../../contexts/LanguageContext";
import { postWithAuth } from "../../services/ApiService";

const FormContainer = styled(Box)(({ theme }) => ({
  maxWidth: "1280px",
  margin: "0 auto",
  borderRadius: "16px",
  background: "linear-gradient(to bottom, #004c91, #00a77f)",
  padding: "64px",
  boxShadow: "0 12px 32px rgba(0, 76, 145, 0.3)",
  [theme.breakpoints.down("md")]: {
    padding: theme.spacing(6),
  },
  [theme.breakpoints.down("sm")]: {
    padding: theme.spacing(4),
  },
}));

const FormTitle = styled(Typography)(({ theme }) => ({
  fontSize: "24px",
  fontWeight: 400,
  color: "white",
  textAlign: "center",
  marginBottom: "32px",
  fontFamily: "'Open Sans', sans-serif",
  [theme.breakpoints.down("sm")]: {
    fontSize: "20px",
    marginBottom: "24px",
  },
}));

const Form = styled("form")(({ theme }) => ({
  display: "flex",
  flexDirection: "column",
  gap: theme.spacing(4),
  maxWidth: "768px",
  margin: "0 auto",
}));

const InputRow = styled(Box)(({ theme }) => ({
  display: "grid",
  gridTemplateColumns: "1fr 1fr",
  gap: theme.spacing(2),
  [theme.breakpoints.down("sm")]: {
    gridTemplateColumns: "1fr",
  },
}));

const StyledTextField = styled(TextField)({
  "& .MuiOutlinedInput-root": {
    backgroundColor: "rgba(255, 255, 255, 0.9)",
    borderRadius: "10px",
    "& fieldset": {
      borderColor: "rgba(255, 255, 255, 0.3)",
      borderWidth: "1px",
    },
    "&:hover fieldset": {
      borderColor: "rgba(0, 76, 145, 0.5)",
    },
    "&.Mui-focused fieldset": {
      borderColor: "#f6d469",
      borderWidth: "3px",
    },
  },
  "& .MuiInputLabel-root": {
    color: "rgba(16, 24, 40, 0.7)",
    backgroundColor: "rgba(255, 255, 255, 0.9)",
    padding: "0 4px",
    "&.Mui-focused": {
      color: "#004c91",
    },
  },
  "& .MuiInputBase-input": {
    color: "#1f2937",
  },
});

const SubmitButton = styled(Button)({
  backgroundColor: "#004c91",
  color: "#ffffff",
  fontSize: "16px",
  fontWeight: 600,
  padding: "12px",
  borderRadius: "10px",
  textTransform: "none",
  marginTop: "20px",
  letterSpacing: "0.02em",
  transition: "all 0.2s ease",
  boxShadow: "none",
  "&:hover": {
    backgroundColor: "#003d73",
    boxShadow: "0 4px 12px rgba(0, 76, 145, 0.3)",
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
  "&:disabled": {
    backgroundColor: "#d1d5db",
    color: "#6b7280",
  },
});

const RequiredNote = styled(Typography)(({ theme }) => ({
  fontSize: "20px",
  color: "white",
  marginBottom: "32px",
  [theme.breakpoints.down("sm")]: {
    fontSize: "16px",
    marginBottom: "24px",
  },
}));

interface VolunteerFormProps {
  onSuccess?: () => void;
  dialogTitleId?: string;
  dialogDescId?: string;
}

const VolunteerForm: React.FC<VolunteerFormProps> = ({
  onSuccess,
  dialogTitleId,
  dialogDescId,
}) => {
  const { t } = useTranslation();
  const { lang } = useLanguage();
  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitSuccess, setSubmitSuccess] = useState(false);
  const [submitError, setSubmitError] = useState<string | null>(null);
  const [validationErrors, setValidationErrors] = useState<{
    fullName?: string;
    email?: string;
  }>({});
  const firstInputRef = useRef<HTMLInputElement | null>(null);
  const errorSummaryRef = useRef<HTMLDivElement | null>(null);

  const validateForm = (): boolean => {
    const errors: { fullName?: string; email?: string } = {};

    if (!formData.fullName.trim()) {
      errors.fullName = t(
        "get_involved.volunteer.form.errors.full_name_required"
      );
    }

    if (!formData.email.trim()) {
      errors.email = t("get_involved.volunteer.form.errors.email_required");
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      errors.email = t("get_involved.volunteer.form.errors.email_invalid");
    }

    setValidationErrors(errors);
    return Object.keys(errors).length === 0;
  };

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
    // Clear field-specific validation error when user starts typing
    if (validationErrors[name as keyof typeof validationErrors]) {
      setValidationErrors((prev) => {
        const updated = { ...prev };
        delete updated[name as keyof typeof validationErrors];
        return updated;
      });
    }
    // Clear general errors when user starts typing
    if (submitError) setSubmitError(null);
    if (submitSuccess) setSubmitSuccess(false);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitError(null);
    setSubmitSuccess(false);

    // Client-side validation
    if (!validateForm()) {
      // Focus the error summary for screen readers
      setTimeout(() => {
        errorSummaryRef.current?.focus();
      }, 100);
      return;
    }

    setIsSubmitting(true);

    try {
      interface SubmissionResponse {
        success: boolean;
        message?: string;
      }

      const response = await postWithAuth<SubmissionResponse>(
        "/api/forms/volunteer",
        {
          ...formData,
          language: lang,
        }
      );

      if (response.success) {
        setSubmitSuccess(true);
        // Reset form
        setFormData({
          fullName: "",
          email: "",
        });
        // Announce success to SR via aria-live (Alert role=status below)
        // Call onSuccess callback after a short delay to show success message
        if (onSuccess) {
          setTimeout(() => {
            onSuccess();
          }, 2000);
        }
      } else {
        setSubmitError(response.message || "Failed to submit application");
      }
    } catch (error) {
      console.error("Volunteer application error:", error);
      const err = error as { data?: { message?: string } };
      setSubmitError(
        err.data?.message || "Failed to submit application. Please try again."
      );
    } finally {
      setIsSubmitting(false);
    }
  };

  // focus the first input when dialog opens
  useEffect(() => {
    if (firstInputRef.current) {
      firstInputRef.current.focus();
    }
  }, []);

  return (
    <FormContainer
      id='volunteer-form'
      aria-labelledby={dialogTitleId}
      aria-describedby={dialogDescId}
    >
      <FormTitle as='h3' id={dialogTitleId || "volunteer-dialog-title"}>
        {t("get_involved.volunteer.form.title")}
      </FormTitle>
      <RequiredNote id={dialogDescId || "volunteer-dialog-desc"}>
        {t("get_involved.volunteer.form.required")}
      </RequiredNote>
      <Box
        sx={{
          backgroundColor: "rgba(255, 255, 255, 0.1)",
          borderRadius: "10px",
          padding: "16px",
          marginBottom: "24px",
          maxWidth: "768px",
          margin: "0 auto 24px",
          display: "flex",
          alignItems: "center",
          gap: "12px",
        }}
      >
        <CheckCircleIcon
          sx={{ color: "#f6d469", fontSize: 20 }}
          aria-hidden='true'
        />
        <Typography sx={{ fontSize: "14px", color: "white" }}>
          {t("get_involved.volunteer.security_note") ||
            "Your information is secure and will only be used to contact you about volunteer opportunities."}
        </Typography>
      </Box>

      {Object.keys(validationErrors).length > 0 && (
        <Alert
          severity='error'
          role='alert'
          aria-live='assertive'
          aria-atomic='true'
          sx={{
            mb: 3,
            maxWidth: "768px",
            margin: "0 auto 24px",
            backgroundColor: "#fee",
            border: "2px solid #c00",
          }}
          ref={errorSummaryRef}
          tabIndex={-1}
        >
          <Box component='div' sx={{ fontWeight: 700, mb: 1 }}>
            {t("get_involved.volunteer.form.errors.summary_title")}
          </Box>
          <Box component='ul' sx={{ m: 0, pl: 2 }}>
            {validationErrors.fullName && (
              <li>
                <a
                  href='#volunteer-fullName'
                  style={{ color: "#c00", textDecoration: "underline" }}
                  onClick={(e) => {
                    e.preventDefault();
                    document.getElementById("volunteer-fullName")?.focus();
                  }}
                >
                  {validationErrors.fullName}
                </a>
              </li>
            )}
            {validationErrors.email && (
              <li>
                <a
                  href='#volunteer-email'
                  style={{ color: "#c00", textDecoration: "underline" }}
                  onClick={(e) => {
                    e.preventDefault();
                    document.getElementById("volunteer-email")?.focus();
                  }}
                >
                  {validationErrors.email}
                </a>
              </li>
            )}
          </Box>
        </Alert>
      )}

      {submitSuccess && (
        <Alert
          severity='success'
          role='status'
          aria-live='polite'
          sx={{ mb: 3, maxWidth: "768px", margin: "0 auto 24px" }}
        >
          {t("get_involved.volunteer.form.success_message") ||
            "Thank you for your application! We will contact you soon."}
        </Alert>
      )}

      {submitError && (
        <Alert
          severity='error'
          sx={{ mb: 3, maxWidth: "768px", margin: "0 auto 24px" }}
        >
          {submitError}
        </Alert>
      )}

      <Form onSubmit={handleSubmit}>
        <InputRow>
          <StyledTextField
            id='volunteer-fullName'
            name='fullName'
            label={t("get_involved.volunteer.form.full_name")}
            value={formData.fullName}
            onChange={handleChange}
            fullWidth
            disabled={isSubmitting}
            error={!!validationErrors.fullName}
            helperText={validationErrors.fullName}
            inputRef={firstInputRef}
            slotProps={{
              input: {
                "aria-label": "Full Name",
                "aria-required": "true",
                "aria-invalid": !!validationErrors.fullName,
                "aria-describedby": validationErrors.fullName
                  ? "volunteer-fullName-error"
                  : undefined,
              },
            }}
            FormHelperTextProps={{
              id: "volunteer-fullName-error",
              role: "alert",
            }}
          />
          <StyledTextField
            id='volunteer-email'
            name='email'
            type='email'
            label={t("get_involved.volunteer.form.email")}
            value={formData.email}
            onChange={handleChange}
            fullWidth
            disabled={isSubmitting}
            error={!!validationErrors.email}
            helperText={validationErrors.email}
            slotProps={{
              input: {
                "aria-label": "Email Address",
                "aria-required": "true",
                "aria-invalid": !!validationErrors.email,
                "aria-describedby": validationErrors.email
                  ? "volunteer-email-error"
                  : undefined,
              },
            }}
            FormHelperTextProps={{
              id: "volunteer-email-error",
              role: "alert",
            }}
          />
        </InputRow>
        <SubmitButton
          type='submit'
          fullWidth
          disabled={isSubmitting}
          endIcon={
            isSubmitting ? (
              <CircularProgress size={20} color='inherit' />
            ) : undefined
          }
          aria-label={t("get_involved.volunteer.form.submit_aria_label")}
        >
          {isSubmitting
            ? t("get_involved.volunteer.form.submitting")
            : t("get_involved.volunteer.form.submit")}
        </SubmitButton>
      </Form>
    </FormContainer>
  );
};

export default VolunteerForm;

import React, { useState, useEffect, useRef } from "react";
import { styled } from "@mui/material/styles";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import Alert from "@mui/material/Alert";
import CircularProgress from "@mui/material/CircularProgress";
import { useTranslation } from "react-i18next";
import SendIcon from "@mui/icons-material/Send";
import { useLanguage } from "../../contexts/LanguageContext";
import { postWithAuth } from "../../services/ApiService";

const FormContainer = styled(Box)(({ theme }) => ({
  borderRadius: "16px",
  padding: theme.spacing(8, 0),
  maxWidth: "768px",
  margin: "0 auto",
  [theme.breakpoints.down("md")]: {
    padding: theme.spacing(6, 0),
  },
  [theme.breakpoints.down("sm")]: {
    padding: theme.spacing(4, 0),
  },
}));

const FormTitle = styled(Typography)({
  fontSize: "24px",
  fontWeight: 400,
  color: "#004c91",
  textAlign: "center",
  marginBottom: "48px",
  fontFamily: "'Open Sans', sans-serif",
});

const Form = styled("form")(({ theme }) => ({
  display: "flex",
  flexDirection: "column",
  gap: theme.spacing(4),
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
    backgroundColor: "white",
    borderRadius: "10px",
    "& fieldset": {
      borderColor: "#d1d5dc",
      borderWidth: "1px",
    },
    "&:hover fieldset": {
      borderColor: "#004c91",
    },
    "&.Mui-focused fieldset": {
      borderColor: "#f6d469",
      borderWidth: "3px",
    },
  },
  "& .MuiInputBase-input": {
    color: "#1f2937",
  },
});

const SubmitButton = styled(Button)({
  backgroundColor: "#f6d469",
  color: "#004c91",
  fontSize: "20px",
  fontWeight: 700,
  padding: "14px 32px",
  borderRadius: "12px",
  textTransform: "none",
  boxShadow: "0px 6px 20px rgba(246, 212, 105, 0.4)",
  transition: "all 0.3s cubic-bezier(0.4, 0, 0.2, 1)",
  "&:hover": {
    backgroundColor: "#f5ca4a",
    transform: "translateY(-3px)",
    boxShadow: "0px 10px 28px rgba(246, 212, 105, 0.5)",
  },
  "&:disabled": {
    backgroundColor: "#d1d5db",
    color: "#6b7280",
  },
});

const RequiredNote = styled(Typography)({
  fontSize: "16px",
  color: "black",
  textAlign: "right",
  marginTop: "-16px",
});

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
      <FormTitle id={dialogTitleId || "volunteer-dialog-title"}>
        {t("get_involved.volunteer.form.title")}
      </FormTitle>
      <RequiredNote id={dialogDescId || "volunteer-dialog-desc"}>
        {t("get_involved.volunteer.form.required")}
      </RequiredNote>

      {Object.keys(validationErrors).length > 0 && (
        <Alert
          severity='error'
          role='alert'
          aria-live='assertive'
          aria-atomic='true'
          sx={{ mb: 3, backgroundColor: "#fee", border: "2px solid #c00" }}
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
        <Alert severity='success' sx={{ mb: 3 }}>
          {t("get_involved.volunteer.form.success_message") ||
            "Thank you for your application! We will contact you soon."}
        </Alert>
      )}

      {submitError && (
        <Alert severity='error' sx={{ mb: 3 }}>
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
            required
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
            required
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
          endIcon={isSubmitting ? <CircularProgress size={20} /> : <SendIcon />}
          disabled={isSubmitting}
          aria-label={t("get_involved.volunteer.form.submit_aria_label")}
        >
          {isSubmitting ? "Submitting..." : "SUBMIT VOLUNTEER INQUIRY"}
        </SubmitButton>
      </Form>
    </FormContainer>
  );
};

export default VolunteerForm;

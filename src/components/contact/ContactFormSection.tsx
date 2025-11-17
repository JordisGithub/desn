import { useState, useRef } from "react";
import {
  Container,
  Typography,
  TextField,
  Button,
  Box,
  Card,
  CardContent,
  Stack,
  Alert,
  CircularProgress,
} from "@mui/material";
import { styled } from "@mui/material/styles";
import { useTranslation } from "react-i18next";
import { useLanguage } from "../../contexts/LanguageContext";
import { postWithAuth } from "../../services/ApiService";
import SendIcon from "@mui/icons-material/Send";
import AccessTimeIcon from "@mui/icons-material/AccessTime";

const FormSection = styled("section")(({ theme }) => ({
  backgroundColor: "#f9fafb",
  paddingTop: theme.spacing(10),
  paddingBottom: theme.spacing(10),
  [theme.breakpoints.down("sm")]: {
    paddingTop: theme.spacing(6),
    paddingBottom: theme.spacing(6),
  },
}));

const FormContainer = styled(Box)(({ theme }) => ({
  display: "grid",
  gridTemplateColumns: "1fr 1fr",
  gap: theme.spacing(8),
  [theme.breakpoints.down("md")]: {
    gridTemplateColumns: "1fr",
    gap: theme.spacing(6),
  },
  [theme.breakpoints.down("sm")]: {
    gap: theme.spacing(4),
  },
}));

const SectionTitle = styled(Typography)(({ theme }) => ({
  fontSize: "3rem",
  fontWeight: 400,
  color: "#004c91",
  fontFamily: '"Poppins", "Roboto", sans-serif',
  marginBottom: theme.spacing(2),
  [theme.breakpoints.down("sm")]: {
    fontSize: "2.5rem",
  },
})) as typeof Typography;

const SectionDescription = styled(Typography)({
  fontSize: "1.25rem",
  color: "#4a5565",
  lineHeight: 1.625,
  marginBottom: "3rem",
});

const StyledTextField = styled(TextField)(({ theme }) => ({
  "& .MuiOutlinedInput-root": {
    backgroundColor: "#f3f3f5",
    borderRadius: theme.spacing(1.75),
    "& fieldset": {
      borderColor: "#d1d5dc",
      borderWidth: "2px",
    },
    "&:hover fieldset": {
      borderColor: "#004c91",
    },
    "&.Mui-focused fieldset": {
      borderColor: "#004c91",
    },
  },
  "& .MuiInputLabel-root": {
    fontSize: "1.125rem",
    fontWeight: 500,
    color: "#101828",
    "&.Mui-focused": {
      color: "#004c91",
    },
  },
  "& .MuiInputBase-input": {
    fontSize: "0.875rem",
    padding: theme.spacing(2, 3),
    "&::placeholder": {
      color: "#717182",
    },
  },
}));

const SubmitButton = styled(Button)(({ theme }) => ({
  backgroundColor: "#004c91",
  color: "white",
  fontWeight: 500,
  fontSize: "1.25rem",
  padding: theme.spacing(1.5, 4),
  borderRadius: theme.spacing(1.75),
  textTransform: "none",
  width: "100%",
  "&:hover": {
    backgroundColor: "#003d73",
  },
  "&:focus": {
    outline: "3px solid #f6d469",
    outlineOffset: "2px",
  },
  "&:disabled": {
    backgroundColor: "#d1d5db",
    color: "#6b7280",
  },
}));

const InfoCard = styled(Card)(({ theme }) => ({
  border: "2px solid #e5e7eb",
  borderRadius: theme.spacing(2),
  boxShadow: "none",
  padding: theme.spacing(5),
  marginBottom: theme.spacing(4),
  "&:focus-within": {
    outline: "3px solid #004c91",
    outlineOffset: "2px",
  },
  [theme.breakpoints.down("sm")]: {
    padding: theme.spacing(4),
  },
}));

const CardIconContainer = styled(Box)(({ theme }) => ({
  display: "flex",
  alignItems: "center",
  gap: theme.spacing(2),
  marginBottom: theme.spacing(7),
}));

const IconBg = styled(Box, {
  shouldForwardProp: (prop) => prop !== "bgColor",
})<{ bgColor: string }>(({ bgColor, theme }) => ({
  width: "64px",
  height: "64px",
  borderRadius: theme.spacing(2),
  backgroundColor: bgColor,
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
}));

const CardTitle = styled(Typography)({
  fontSize: "1.875rem",
  fontWeight: 400,
  color: "#004c91",
  fontFamily: '"Poppins", "Roboto", sans-serif',
});

const TimeSlot = styled(Box)(({ theme }) => ({
  display: "flex",
  justifyContent: "space-between",
  paddingBottom: theme.spacing(1),
  borderBottom: "1px solid #e5e7eb",
  "&:not(:last-child)": {
    marginBottom: theme.spacing(2.5),
  },
  "&:last-child": {
    borderBottom: "none",
  },
}));

const DayLabel = styled(Typography)({
  fontSize: "1.125rem",
  color: "#364153",
  fontWeight: 400,
});

const TimeLabel = styled(Typography)({
  fontSize: "1.125rem",
  color: "#101828",
  fontWeight: 400,
});

export default function ContactFormSection() {
  const { t } = useTranslation();
  const { lang } = useLanguage();
  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    phone: "",
    subject: "",
    message: "",
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitSuccess, setSubmitSuccess] = useState(false);
  const [submitError, setSubmitError] = useState<string | null>(null);
  const [validationErrors, setValidationErrors] = useState<{
    fullName?: string;
    email?: string;
    phone?: string;
    subject?: string;
    message?: string;
  }>({});
  const errorSummaryRef = useRef<HTMLDivElement | null>(null);

  const validateForm = (): boolean => {
    const errors: {
      fullName?: string;
      email?: string;
      phone?: string;
      subject?: string;
      message?: string;
    } = {};

    if (!formData.fullName.trim()) {
      errors.fullName = t("contact.form.errors.full_name_required");
    }

    if (!formData.email.trim()) {
      errors.email = t("contact.form.errors.email_required");
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      errors.email = t("contact.form.errors.email_invalid");
    }

    if (!formData.subject.trim()) {
      errors.subject = t("contact.form.errors.subject_required");
    }

    if (!formData.message.trim()) {
      errors.message = t("contact.form.errors.message_required");
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
        "/api/forms/contact",
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
          phone: "",
          subject: "",
          message: "",
        });
      } else {
        setSubmitError(response.message || "Failed to submit message");
      }
    } catch (error) {
      console.error("Contact form error:", error);
      const err = error as { data?: { message?: string } };
      setSubmitError(
        err.data?.message || "Failed to submit message. Please try again."
      );
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <FormSection id='contact-form' aria-labelledby='contact-form-heading'>
      <Container maxWidth='xl'>
        <FormContainer>
          {/* Form Column */}
          <Box>
            <SectionTitle component='h2' variant='h2' id='contact-form-heading'>
              {t("contact.form.title")}
            </SectionTitle>
            <SectionDescription>
              {t("contact.form.description")}
            </SectionDescription>

            <form onSubmit={handleSubmit}>
              <Stack spacing={4}>
                {/* Error Summary */}
                {Object.keys(validationErrors).length > 0 && (
                  <Alert
                    severity='error'
                    role='alert'
                    aria-live='assertive'
                    ref={errorSummaryRef}
                    tabIndex={-1}
                    sx={{ mb: 2 }}
                  >
                    <Box sx={{ fontWeight: "bold", mb: 1 }}>
                      {t("contact.form.errors.summary_title") ||
                        "Please fix the following errors:"}
                    </Box>
                    <Box component='ul' sx={{ m: 0, pl: 2 }}>
                      {validationErrors.fullName && (
                        <li>
                          <a
                            href='#contact-fullName'
                            style={{
                              color: "#c00",
                              textDecoration: "underline",
                            }}
                            onClick={(e) => {
                              e.preventDefault();
                              document
                                .getElementById("contact-fullName")
                                ?.focus();
                            }}
                          >
                            {validationErrors.fullName}
                          </a>
                        </li>
                      )}
                      {validationErrors.email && (
                        <li>
                          <a
                            href='#contact-email'
                            style={{
                              color: "#c00",
                              textDecoration: "underline",
                            }}
                            onClick={(e) => {
                              e.preventDefault();
                              document.getElementById("contact-email")?.focus();
                            }}
                          >
                            {validationErrors.email}
                          </a>
                        </li>
                      )}
                      {validationErrors.subject && (
                        <li>
                          <a
                            href='#contact-subject'
                            style={{
                              color: "#c00",
                              textDecoration: "underline",
                            }}
                            onClick={(e) => {
                              e.preventDefault();
                              document
                                .getElementById("contact-subject")
                                ?.focus();
                            }}
                          >
                            {validationErrors.subject}
                          </a>
                        </li>
                      )}
                      {validationErrors.message && (
                        <li>
                          <a
                            href='#contact-message'
                            style={{
                              color: "#c00",
                              textDecoration: "underline",
                            }}
                            onClick={(e) => {
                              e.preventDefault();
                              document
                                .getElementById("contact-message")
                                ?.focus();
                            }}
                          >
                            {validationErrors.message}
                          </a>
                        </li>
                      )}
                    </Box>
                  </Alert>
                )}

                {/* Success Message */}
                {submitSuccess && (
                  <Alert severity='success' role='status' aria-live='polite'>
                    {t("contact.form.success_message") ||
                      "Thank you for your message! We will get back to you soon."}
                  </Alert>
                )}

                {/* Error Message */}
                {submitError && (
                  <Alert severity='error' role='alert'>
                    {submitError}
                  </Alert>
                )}

                <StyledTextField
                  id='contact-fullName'
                  fullWidth
                  required
                  name='fullName'
                  label={t("contact.form.full_name")}
                  placeholder={t("contact.form.full_name_placeholder")}
                  value={formData.fullName}
                  onChange={handleChange}
                  disabled={isSubmitting}
                  error={!!validationErrors.fullName}
                  helperText={validationErrors.fullName}
                  slotProps={{
                    input: {
                      "aria-label": t("contact.form.full_name"),
                      "aria-required": "true",
                      "aria-invalid": !!validationErrors.fullName,
                      "aria-describedby": validationErrors.fullName
                        ? "contact-fullName-error"
                        : undefined,
                    },
                  }}
                  FormHelperTextProps={{
                    id: "contact-fullName-error",
                    role: "alert",
                  }}
                  autoComplete='name'
                />

                <StyledTextField
                  id='contact-email'
                  fullWidth
                  required
                  type='email'
                  name='email'
                  label={t("contact.form.email")}
                  placeholder={t("contact.form.email_placeholder")}
                  value={formData.email}
                  onChange={handleChange}
                  disabled={isSubmitting}
                  error={!!validationErrors.email}
                  helperText={validationErrors.email}
                  slotProps={{
                    input: {
                      "aria-label": t("contact.form.email"),
                      "aria-required": "true",
                      "aria-invalid": !!validationErrors.email,
                      "aria-describedby": validationErrors.email
                        ? "contact-email-error"
                        : undefined,
                    },
                  }}
                  FormHelperTextProps={{
                    id: "contact-email-error",
                    role: "alert",
                  }}
                  autoComplete='email'
                />

                <StyledTextField
                  id='contact-phone'
                  fullWidth
                  name='phone'
                  label={t("contact.form.phone")}
                  placeholder={t("contact.form.phone_placeholder")}
                  value={formData.phone}
                  onChange={handleChange}
                  disabled={isSubmitting}
                  slotProps={{
                    input: {
                      "aria-label": t("contact.form.phone"),
                    },
                  }}
                  autoComplete='tel'
                />

                <StyledTextField
                  id='contact-subject'
                  fullWidth
                  required
                  name='subject'
                  label={t("contact.form.subject")}
                  placeholder={t("contact.form.subject_placeholder")}
                  value={formData.subject}
                  onChange={handleChange}
                  disabled={isSubmitting}
                  error={!!validationErrors.subject}
                  helperText={validationErrors.subject}
                  slotProps={{
                    input: {
                      "aria-label": t("contact.form.subject"),
                      "aria-required": "true",
                      "aria-invalid": !!validationErrors.subject,
                      "aria-describedby": validationErrors.subject
                        ? "contact-subject-error"
                        : undefined,
                    },
                  }}
                  FormHelperTextProps={{
                    id: "contact-subject-error",
                    role: "alert",
                  }}
                />

                <StyledTextField
                  id='contact-message'
                  fullWidth
                  required
                  multiline
                  rows={4}
                  name='message'
                  label={t("contact.form.message")}
                  placeholder={t("contact.form.message_placeholder")}
                  value={formData.message}
                  onChange={handleChange}
                  disabled={isSubmitting}
                  error={!!validationErrors.message}
                  helperText={validationErrors.message}
                  slotProps={{
                    input: {
                      "aria-label": t("contact.form.message"),
                      "aria-required": "true",
                      "aria-invalid": !!validationErrors.message,
                      "aria-describedby": validationErrors.message
                        ? "contact-message-error"
                        : undefined,
                    },
                  }}
                  FormHelperTextProps={{
                    id: "contact-message-error",
                    role: "alert",
                  }}
                />

                <SubmitButton
                  type='submit'
                  startIcon={
                    isSubmitting ? (
                      <CircularProgress size={20} color='inherit' />
                    ) : (
                      <SendIcon />
                    )
                  }
                  disabled={isSubmitting}
                >
                  {isSubmitting
                    ? t("contact.form.submitting") || "Sending..."
                    : t("contact.form.submit")}
                </SubmitButton>
              </Stack>
            </form>
          </Box>

          {/* Info Cards Column */}
          <Box>
            {/* Office Hours Card */}
            <InfoCard>
              <CardContent sx={{ padding: 0 }}>
                <CardIconContainer>
                  <IconBg bgColor='rgba(0, 167, 127, 0.1)' aria-hidden='true'>
                    <AccessTimeIcon sx={{ fontSize: 32, color: "#00a77f" }} />
                  </IconBg>
                  <CardTitle>{t("contact.office_hours.title")}</CardTitle>
                </CardIconContainer>

                <Stack spacing={2.5}>
                  <TimeSlot>
                    <DayLabel>{t("contact.office_hours.weekdays")}</DayLabel>
                    <TimeLabel>
                      {t("contact.office_hours.weekdays_time")}
                    </TimeLabel>
                  </TimeSlot>
                  <TimeSlot>
                    <DayLabel>{t("contact.office_hours.saturday")}</DayLabel>
                    <TimeLabel>
                      {t("contact.office_hours.saturday_time")}
                    </TimeLabel>
                  </TimeSlot>
                  <TimeSlot>
                    <DayLabel>{t("contact.office_hours.sunday")}</DayLabel>
                    <TimeLabel>{t("contact.office_hours.closed")}</TimeLabel>
                  </TimeSlot>
                  <TimeSlot>
                    <DayLabel>{t("contact.office_hours.holidays")}</DayLabel>
                    <TimeLabel>{t("contact.office_hours.closed")}</TimeLabel>
                  </TimeSlot>
                </Stack>
              </CardContent>
            </InfoCard>

            {/* Community Photo */}
            <Box
              sx={{
                width: "100%",
                height: { xs: "300px", sm: "350px", md: "400px" },
                borderRadius: 2,
                overflow: "hidden",
                boxShadow:
                  "0px 20px 25px -5px rgba(0,0,0,0.1), 0px 8px 10px -6px rgba(0,0,0,0.1)",
              }}
            >
              <img
                src='https://www.figma.com/api/mcp/asset/0389404e-6062-45a6-814d-d1e9bc93997b'
                alt={t("contact.community_image_alt")}
                style={{
                  width: "100%",
                  height: "100%",
                  objectFit: "cover",
                }}
              />
            </Box>
          </Box>
        </FormContainer>
      </Container>
    </FormSection>
  );
}

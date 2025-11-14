import React, { useState } from "react";
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
  padding: theme.spacing(6, 0),
  maxWidth: "768px",
  margin: "0 auto",
  [theme.breakpoints.down("md")]: {
    padding: theme.spacing(4, 0),
  },
  [theme.breakpoints.down("sm")]: {
    padding: theme.spacing(3, 0),
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
    },
    "&:hover fieldset": {
      borderColor: "#004c91",
    },
    "&.Mui-focused fieldset": {
      borderColor: "#004c91",
    },
  },
});

const SubmitButton = styled(Button)({
  backgroundColor: "#f6d469",
  color: "#2b2b2b",
  fontSize: "20px",
  fontWeight: 400,
  padding: "12px 24px",
  borderRadius: "10px",
  textTransform: "none",
  "&:hover": {
    backgroundColor: "#f5ca4a",
  },
});

const RequiredNote = styled(Typography)({
  fontSize: "16px",
  color: "black",
  textAlign: "right",
  marginTop: "-16px",
});

const VolunteerForm: React.FC = () => {
  const { t } = useTranslation();
  const { lang } = useLanguage();
  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    phone: "",
    message: "",
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitSuccess, setSubmitSuccess] = useState(false);
  const [submitError, setSubmitError] = useState<string | null>(null);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
    // Clear errors when user starts typing
    if (submitError) setSubmitError(null);
    if (submitSuccess) setSubmitSuccess(false);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setSubmitError(null);
    setSubmitSuccess(false);

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
          phone: "",
          message: "",
        });
        // Scroll to success message
        window.scrollTo({ top: 0, behavior: "smooth" });
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

  return (
    <FormContainer>
      <FormTitle>{t("get_involved.volunteer.form.title")}</FormTitle>
      <RequiredNote>{t("get_involved.volunteer.form.required")}</RequiredNote>

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
            name='fullName'
            label={t("get_involved.volunteer.form.full_name")}
            value={formData.fullName}
            onChange={handleChange}
            required
            fullWidth
            disabled={isSubmitting}
          />
          <StyledTextField
            name='email'
            type='email'
            label={t("get_involved.volunteer.form.email")}
            value={formData.email}
            onChange={handleChange}
            required
            fullWidth
            disabled={isSubmitting}
          />
        </InputRow>
        <StyledTextField
          name='phone'
          label={t("get_involved.volunteer.form.phone")}
          value={formData.phone}
          onChange={handleChange}
          required
          fullWidth
          sx={{ maxWidth: "376px" }}
          disabled={isSubmitting}
        />
        <StyledTextField
          name='message'
          label={t("get_involved.volunteer.form.message")}
          value={formData.message}
          onChange={handleChange}
          multiline
          rows={5}
          fullWidth
          disabled={isSubmitting}
        />
        <SubmitButton
          type='submit'
          endIcon={isSubmitting ? <CircularProgress size={20} /> : <SendIcon />}
          disabled={isSubmitting}
        >
          {isSubmitting
            ? t("get_involved.volunteer.form.submitting") || "Submitting..."
            : t("get_involved.volunteer.form.submit")}
        </SubmitButton>
      </Form>
    </FormContainer>
  );
};

export default VolunteerForm;

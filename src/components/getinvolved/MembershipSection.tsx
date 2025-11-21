import React, { useState, useRef } from "react";
import { styled } from "@mui/material/styles";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import Alert from "@mui/material/Alert";
import CircularProgress from "@mui/material/CircularProgress";
import Dialog from "@mui/material/Dialog";
import DialogContent from "@mui/material/DialogContent";
import IconButton from "@mui/material/IconButton";
import CloseIcon from "@mui/icons-material/Close";
import { useTranslation } from "react-i18next";
import { useLanguage } from "../../contexts/LanguageContext";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import SendIcon from "@mui/icons-material/Send";
import membershipImg from "../../assets/GetInvolved/GetInvolvedMember.jpg";
import CardMembershipIcon from "@mui/icons-material/CardMembership";
import { postWithAuth } from "../../services/ApiService";

const Section = styled(Box)(({ theme }) => ({
  padding: theme.spacing(12, 12),
  backgroundColor: "white",
  borderRadius: "16px",
  boxShadow: "0px 4px 20px rgba(0, 76, 145, 0.08)",
  [theme.breakpoints.down("md")]: {
    padding: theme.spacing(8, 6),
  },
  [theme.breakpoints.down("sm")]: {
    padding: theme.spacing(6, 3),
  },
}));

const BecomeaMemberButton = styled(Button)({
  backgroundColor: "#008766",
  color: "#ffffff",
  fontSize: "16px",
  fontWeight: 600,
  padding: "12px 40px",
  borderRadius: "10px",
  textTransform: "none",
  marginTop: "20px",
  letterSpacing: "0.02em",
  boxShadow: "none",
  transition: "none !important", // eliminate animation for focus entry
  "&:hover": {
    backgroundColor: "#006f54",
    boxShadow: "0 4px 12px rgba(0, 135, 102, 0.3)",
    transition: "all 0.2s ease", // hover only
  },
  "&:focus": {
    outline: "3px solid #004c91",
    outlineOffset: "2px",
    backgroundColor: "#008766",
    transition: "none !important",
  },
  "&:focus-visible": {
    outline: "3px solid #004c91",
    outlineOffset: "2px",
    backgroundColor: "#008766",
    transition: "none !important",
  },
  "& .MuiTouchRipple-root": {
    display: "none",
  },
});

const IntroContainer = styled(Box)(({ theme }) => ({
  display: "grid",
  gridTemplateColumns: "608px 608px",
  gap: theme.spacing(8),
  marginBottom: theme.spacing(8),
  maxWidth: "1280px",
  margin: "0 auto 64px auto",
  [theme.breakpoints.down("lg")]: {
    gridTemplateColumns: "1fr 1fr",
    gap: theme.spacing(6),
  },
  [theme.breakpoints.down("md")]: {
    gridTemplateColumns: "1fr",
    gap: theme.spacing(4),
    marginBottom: theme.spacing(6),
  },
}));

const TextContent = styled(Box)(({ theme }) => ({
  display: "flex",
  flexDirection: "column",
  gap: theme.spacing(3),
}));

const TitleBar = styled(Box)({
  width: "80px",
  height: "4px",
  backgroundColor: "#f6d469",
  borderRadius: "100px",
});

const SectionTitle = styled(Typography)(({ theme }) => ({
  fontSize: "32px",
  fontWeight: 400,
  color: "#004c91",
  marginTop: "20px",
  fontFamily: "'Open Sans', sans-serif",
  [theme.breakpoints.down("sm")]: {
    fontSize: "24px",
  },
}));

const Description = styled(Typography)(({ theme }) => ({
  fontSize: "16px",
  fontWeight: 400,
  color: "#364153",
  lineHeight: 1.5,
  [theme.breakpoints.down("sm")]: {
    fontSize: "14px",
  },
}));

const ImageContainer = styled(Box)(({ theme }) => ({
  width: "608px",
  height: "384px",
  borderRadius: "14px",
  overflow: "hidden",
  boxShadow:
    "0px 20px 25px -5px rgba(0,0,0,0.1), 0px 8px 10px -6px rgba(0,0,0,0.1)",
  "& img": {
    width: "100%",
    height: "100%",
    objectFit: "cover",
  },
  [theme.breakpoints.down("lg")]: {
    width: "100%",
    maxWidth: "608px",
    height: "auto",
    aspectRatio: "608/384",
  },
  [theme.breakpoints.down("md")]: {
    maxWidth: "100%",
  },
}));

const BenefitsSection = styled(Box)({
  maxWidth: "1280px",
  margin: "0 auto",
});

const BenefitsTitle = styled(Typography)({
  fontSize: "24px",
  fontWeight: 400,
  color: "#004c91",
  textAlign: "center",
  marginBottom: "48px",
  fontFamily: "'Open Sans', sans-serif",
});

const BenefitsGrid = styled("ul")(({ theme }) => ({
  display: "grid",
  gridTemplateColumns: "repeat(2, 1fr)",
  gap: "24px",
  listStyle: "none",
  padding: 0,
  margin: 0,
  [theme.breakpoints.down("sm")]: {
    gridTemplateColumns: "1fr",
    gap: "16px",
  },
}));

const BenefitCard = styled("li")(({ theme }) => ({
  backgroundColor: "white",
  borderRadius: "10px",
  padding: theme.spacing(2, 6),
  display: "flex",
  alignItems: "center",
  gap: theme.spacing(2),
  listStyle: "none",
}));

const BenefitText = styled(Typography)({
  fontSize: "16px",
  fontWeight: 400,
  color: "#364153",
});

const FormSection = styled(Box)(({ theme }) => ({
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
    borderRadius: "12px",
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

const RequiredNote = styled(Typography)(({ theme }) => ({
  fontSize: "20px",
  color: "white",
  marginBottom: "32px",
  [theme.breakpoints.down("sm")]: {
    fontSize: "16px",
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
}));

const StyledTextField = styled(TextField)({
  "& .MuiOutlinedInput-root": {
    backgroundColor: "rgba(255, 255, 255, 0.9)",
    borderRadius: "10px",
    transition: "all 0.2s ease",
    "& fieldset": {
      borderColor: "rgba(255, 255, 255, 0.3)",
      borderWidth: "1px",
    },
    "&:hover:not(.Mui-disabled) fieldset": {
      borderColor: "#004c91",
      borderWidth: "2px",
    },
    "&.Mui-focused fieldset": {
      borderColor: "#f6d469",
      borderWidth: "3px",
      boxShadow: "0 0 0 1px #f6d469",
    },
    "&.Mui-error fieldset": {
      borderColor: "#b71c1c",
      borderWidth: "2px",
    },
    "&.Mui-error:hover:not(.Mui-disabled) fieldset": {
      borderColor: "#8b0000",
      borderWidth: "2px",
    },
    "&.Mui-error.Mui-focused fieldset": {
      borderColor: "#b71c1c",
      borderWidth: "3px",
      boxShadow: "0 0 0 1px #b71c1c",
    },
  },
  "& .MuiInputLabel-root": {
    color: "rgba(16, 24, 40, 0.7)",
    backgroundColor: "rgba(255, 255, 255, 0.9)",
    padding: "0 4px",
    fontWeight: 500,
    "&.Mui-focused": {
      color: "#004c91",
      fontWeight: 600,
    },
    "&.Mui-error": {
      color: "#b71c1c",
      fontWeight: 600,
    },
  },
  "& .MuiInputBase-input": {
    color: "#1f2937",
    "&:focus": {
      outline: "none",
    },
  },
  "& .MuiFormHelperText-root": {
    backgroundColor: "rgba(255, 255, 255, 0.95)",
    margin: "4px 0 0 0",
    padding: "4px 8px",
    borderRadius: "4px",
    "&.Mui-error": {
      color: "#b71c1c",
      fontWeight: 600,
    },
  },
});

const SubmitButton = styled(Button)(({ theme }) => ({
  backgroundColor: "#f6d469",
  color: "#004c91",
  fontSize: "20px",
  fontWeight: 700,
  padding: "14px 32px",
  borderRadius: "12px",
  textTransform: "none",
  boxShadow: "0px 6px 20px rgba(246, 212, 105, 0.4)",
  transition: "all 0.2s ease",
  "& .MuiTouchRipple-root": {
    display: "none",
  },
  "&:hover:not(:disabled)": {
    backgroundColor: "#f5ca4a",
    transform: "translateY(-1px)",
    boxShadow: "0px 10px 28px rgba(246, 212, 105, 0.5)",
  },
  "&:active:not(:disabled)": {
    transform: "translateY(0)",
    boxShadow: "0px 4px 16px rgba(246, 212, 105, 0.4)",
  },
  "&:focus": {
    outline: "3px solid #004c91",
    outlineOffset: "3px",
    backgroundColor: "#f5ca4a",
  },
  "&:focus-visible": {
    outline: "3px solid #004c91",
    outlineOffset: "3px",
    backgroundColor: "#f5ca4a",
  },
  "&:disabled": {
    backgroundColor: "#d1d5db",
    color: "#6b7280",
    opacity: 0.6,
  },
  [theme.breakpoints.down("sm")]: {
    fontSize: "16px",
    padding: "12px 24px",
  },
}));

const MembershipSection: React.FC = () => {
  const { t } = useTranslation();
  const { lang } = useLanguage();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [showPageSuccessMessage, setShowPageSuccessMessage] = useState(false);
  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    phone: "",
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitSuccess, setSubmitSuccess] = useState(false);
  const [submitError, setSubmitError] = useState<string | null>(null);
  const [validationErrors, setValidationErrors] = useState<{
    fullName?: string;
    email?: string;
    phone?: string;
  }>({});
  const errorSummaryRef = useRef<HTMLDivElement | null>(null);
  const pageSuccessMessageRef = useRef<HTMLDivElement | null>(null);

  const benefits = [
    t("get_involved.membership.benefits.updates"),
    t("get_involved.membership.benefits.meetings"),
    t("get_involved.membership.benefits.networking"),
    t("get_involved.membership.benefits.resources"),
    t("get_involved.membership.benefits.voice"),
    t("get_involved.membership.benefits.certificate"),
  ];

  const validateForm = (): boolean => {
    const errors: { fullName?: string; email?: string; phone?: string } = {};

    if (!formData.fullName.trim()) {
      errors.fullName = t(
        "get_involved.membership.form.errors.full_name_required"
      );
    }

    if (!formData.email.trim()) {
      errors.email = t("get_involved.membership.form.errors.email_required");
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      errors.email = t("get_involved.membership.form.errors.email_invalid");
    }

    if (!formData.phone.trim()) {
      errors.phone = t("get_involved.membership.form.errors.phone_required");
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
        "/api/forms/membership",
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
        });
        // Close modal and show page success message
        setTimeout(() => {
          setIsModalOpen(false);
          setShowPageSuccessMessage(true);
          // Focus the success message for screen readers
          setTimeout(() => {
            pageSuccessMessageRef.current?.focus();
          }, 100);
          // Auto-hide after 10 seconds
          setTimeout(() => {
            setShowPageSuccessMessage(false);
          }, 10000);
        }, 2000);
      } else {
        setSubmitError(response.message || "Failed to submit application");
      }
    } catch (error) {
      console.error("Membership application error:", error);
      const err = error as { data?: { message?: string } };
      setSubmitError(
        err.data?.message || "Failed to submit application. Please try again."
      );
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleOpenModal = () => {
    setIsModalOpen(true);
    setShowPageSuccessMessage(false);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    // Reset form state when closing
    setSubmitSuccess(false);
    setSubmitError(null);
  };

  return (
    <Section
      id='membership-section'
      role='region'
      aria-labelledby='membership-section-title'
    >
      <IntroContainer>
        <TextContent>
          <Box sx={{ position: "relative" }}>
            <CardMembershipIcon
              sx={{ fontSize: 48, color: "#f6d469", mb: 2 }}
            />
            <TitleBar />
          </Box>
          <SectionTitle as='h2' id='membership-section-title'>
            {t("get_involved.membership.title")}
          </SectionTitle>
          <Description
            sx={{
              fontSize: "18px",
              fontWeight: 600,
              color: "#004c91",
              mb: 2,
            }}
          >
            {t("get_involved.membership.intro")}
          </Description>
          <Description>{t("get_involved.membership.description")}</Description>
          <BecomeaMemberButton
            onClick={handleOpenModal}
            aria-haspopup='dialog'
            aria-controls='membership-dialog'
            aria-label={t("get_involved.membership.become_member_aria_label")}
          >
            {t("get_involved.membership.become_member")}
          </BecomeaMemberButton>
        </TextContent>
        <ImageContainer>
          <img
            src={membershipImg}
            alt='Community members gathering for DESN membership meeting'
          />
        </ImageContainer>
      </IntroContainer>

      {showPageSuccessMessage && (
        <Alert
          severity='success'
          role='status'
          aria-live='polite'
          aria-atomic='true'
          ref={pageSuccessMessageRef}
          tabIndex={-1}
          sx={{
            mb: 4,
            maxWidth: "768px",
            margin: "0 auto 32px",
            backgroundColor: "#e8f5e9",
            border: "2px solid #2e7d32",
            borderRadius: "8px",
            "& .MuiAlert-icon": {
              color: "#2e7d32",
            },
          }}
          onClose={() => setShowPageSuccessMessage(false)}
        >
          <Typography
            variant='body1'
            sx={{ color: "#1b5e20", fontWeight: 600 }}
          >
            {t("get_involved.membership.form.success_message") ||
              "Thank you for your membership application! We will contact you soon."}
          </Typography>
        </Alert>
      )}

      <BenefitsSection>
        <BenefitsTitle as='h3'>
          {t("get_involved.membership.benefits.title")}
        </BenefitsTitle>
        <BenefitsGrid aria-label={t("get_involved.membership.benefits.title")}>
          {benefits.map((benefit, index) => (
            <BenefitCard key={index}>
              <CheckCircleIcon sx={{ color: "#00a77f", fontSize: 24 }} />
              <BenefitText>{benefit}</BenefitText>
            </BenefitCard>
          ))}
        </BenefitsGrid>
      </BenefitsSection>

      <Dialog
        id='membership-dialog'
        open={isModalOpen}
        onClose={handleCloseModal}
        aria-labelledby='membership-dialog-title'
        aria-describedby='membership-dialog-desc'
        maxWidth='md'
        fullWidth
        PaperProps={{
          sx: {
            borderRadius: "16px",
            maxWidth: "900px",
          },
        }}
      >
        <IconButton
          onClick={handleCloseModal}
          sx={{
            position: "absolute",
            right: 16,
            top: 16,
            color: "#4b5563",
            backgroundColor: "rgba(255, 255, 255, 0.9)",
            zIndex: 1,
            transition: "all 0.2s ease",
            "&:hover": {
              backgroundColor: "#f3f4f6",
              color: "#1f2937",
              transform: "scale(1.05)",
            },
            "&:focus": {
              outline: "3px solid #f6d469",
              outlineOffset: "2px",
              backgroundColor: "#f3f4f6",
              color: "#1f2937",
            },
            "&:focus-visible": {
              outline: "3px solid #f6d469",
              outlineOffset: "2px",
              backgroundColor: "#f3f4f6",
              color: "#1f2937",
            },
            "&:active": {
              transform: "scale(0.95)",
              backgroundColor: "#e5e7eb",
            },
          }}
          aria-label={t("aria.close")}
        >
          <CloseIcon />
        </IconButton>
        <DialogContent sx={{ p: 0 }}>
          <FormSection role='region'>
            <FormTitle as='h3' id='membership-dialog-title'>
              {t("get_involved.membership.form.title")}
            </FormTitle>
            <RequiredNote id='membership-dialog-desc'>
              {t("get_involved.membership.form.required")}
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
                {t("get_involved.membership.security_note")}
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
                  backgroundColor: "#ffebee",
                  border: "2px solid #b71c1c",
                  "& .MuiAlert-icon": {
                    color: "#b71c1c",
                  },
                }}
                ref={errorSummaryRef}
                tabIndex={-1}
              >
                <Box
                  component='div'
                  sx={{ fontWeight: 700, mb: 1, color: "#b71c1c" }}
                >
                  {t("get_involved.membership.form.errors.summary_title")}
                </Box>
                <Box component='ul' sx={{ m: 0, pl: 2 }}>
                  {validationErrors.fullName && (
                    <li>
                      <a
                        href='#membership-fullName'
                        style={{
                          color: "#b71c1c",
                          textDecoration: "underline",
                          fontWeight: 600,
                          padding: "2px 4px",
                          borderRadius: "2px",
                          display: "inline-block",
                        }}
                        onMouseEnter={(e) => {
                          e.currentTarget.style.backgroundColor =
                            "rgba(183, 28, 28, 0.1)";
                          e.currentTarget.style.color = "#8b0000";
                        }}
                        onMouseLeave={(e) => {
                          e.currentTarget.style.backgroundColor = "transparent";
                          e.currentTarget.style.color = "#b71c1c";
                        }}
                        onFocus={(e) => {
                          e.currentTarget.style.outline = "3px solid #f6d469";
                          e.currentTarget.style.outlineOffset = "2px";
                        }}
                        onBlur={(e) => {
                          e.currentTarget.style.outline = "none";
                        }}
                        onClick={(e) => {
                          e.preventDefault();
                          document
                            .getElementById("membership-fullName")
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
                        href='#membership-email'
                        style={{
                          color: "#b71c1c",
                          textDecoration: "underline",
                          fontWeight: 600,
                          padding: "2px 4px",
                          borderRadius: "2px",
                          display: "inline-block",
                        }}
                        onMouseEnter={(e) => {
                          e.currentTarget.style.backgroundColor =
                            "rgba(183, 28, 28, 0.1)";
                          e.currentTarget.style.color = "#8b0000";
                        }}
                        onMouseLeave={(e) => {
                          e.currentTarget.style.backgroundColor = "transparent";
                          e.currentTarget.style.color = "#b71c1c";
                        }}
                        onFocus={(e) => {
                          e.currentTarget.style.outline = "3px solid #f6d469";
                          e.currentTarget.style.outlineOffset = "2px";
                        }}
                        onBlur={(e) => {
                          e.currentTarget.style.outline = "none";
                        }}
                        onClick={(e) => {
                          e.preventDefault();
                          document.getElementById("membership-email")?.focus();
                        }}
                      >
                        {validationErrors.email}
                      </a>
                    </li>
                  )}
                  {validationErrors.phone && (
                    <li>
                      <a
                        href='#membership-phone'
                        style={{
                          color: "#b71c1c",
                          textDecoration: "underline",
                          fontWeight: 600,
                          padding: "2px 4px",
                          borderRadius: "2px",
                          display: "inline-block",
                        }}
                        onMouseEnter={(e) => {
                          e.currentTarget.style.backgroundColor =
                            "rgba(183, 28, 28, 0.1)";
                          e.currentTarget.style.color = "#8b0000";
                        }}
                        onMouseLeave={(e) => {
                          e.currentTarget.style.backgroundColor = "transparent";
                          e.currentTarget.style.color = "#b71c1c";
                        }}
                        onFocus={(e) => {
                          e.currentTarget.style.outline = "3px solid #f6d469";
                          e.currentTarget.style.outlineOffset = "2px";
                        }}
                        onBlur={(e) => {
                          e.currentTarget.style.outline = "none";
                        }}
                        onClick={(e) => {
                          e.preventDefault();
                          document.getElementById("membership-phone")?.focus();
                        }}
                      >
                        {validationErrors.phone}
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
                {t("get_involved.membership.form.success_message") ||
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

            <Form onSubmit={handleSubmit} noValidate>
              <InputRow>
                <StyledTextField
                  id='membership-fullName'
                  name='fullName'
                  label={t("get_involved.membership.form.full_name")}
                  value={formData.fullName}
                  onChange={handleChange}
                  fullWidth
                  required
                  disabled={isSubmitting}
                  error={!!validationErrors.fullName}
                  helperText={validationErrors.fullName}
                  slotProps={{
                    htmlInput: {
                      "aria-label": "Full Name",
                      "aria-required": "true",
                      "aria-invalid": !!validationErrors.fullName,
                      "aria-describedby": validationErrors.fullName
                        ? "membership-fullName-error"
                        : undefined,
                      autoComplete: "name",
                    },
                  }}
                  FormHelperTextProps={{
                    id: "membership-fullName-error",
                    role: "alert",
                  }}
                />
                <StyledTextField
                  id='membership-email'
                  name='email'
                  type='email'
                  label={t("get_involved.membership.form.email")}
                  value={formData.email}
                  onChange={handleChange}
                  fullWidth
                  required
                  disabled={isSubmitting}
                  error={!!validationErrors.email}
                  helperText={validationErrors.email}
                  slotProps={{
                    htmlInput: {
                      "aria-label": "Email Address",
                      "aria-required": "true",
                      "aria-invalid": !!validationErrors.email,
                      "aria-describedby": validationErrors.email
                        ? "membership-email-error"
                        : undefined,
                      autoComplete: "email",
                    },
                  }}
                  FormHelperTextProps={{
                    id: "membership-email-error",
                    role: "alert",
                  }}
                />
              </InputRow>
              <StyledTextField
                id='membership-phone'
                name='phone'
                label={t("get_involved.membership.form.phone")}
                value={formData.phone}
                onChange={handleChange}
                fullWidth
                required
                sx={{ maxWidth: "376px" }}
                disabled={isSubmitting}
                error={!!validationErrors.phone}
                helperText={validationErrors.phone}
                slotProps={{
                  htmlInput: {
                    "aria-label": "Phone Number",
                    "aria-required": "true",
                    "aria-invalid": !!validationErrors.phone,
                    "aria-describedby": validationErrors.phone
                      ? "membership-phone-error"
                      : undefined,
                    autoComplete: "tel",
                  },
                }}
                FormHelperTextProps={{
                  id: "membership-phone-error",
                  role: "alert",
                }}
              />
              <SubmitButton
                type='submit'
                endIcon={
                  isSubmitting ? <CircularProgress size={20} /> : <SendIcon />
                }
                disabled={isSubmitting}
                aria-label={t("get_involved.membership.form.submit_aria_label")}
              >
                {isSubmitting ? "Submitting..." : "APPLY FOR MEMBERSHIP"}
              </SubmitButton>
            </Form>
          </FormSection>
        </DialogContent>
      </Dialog>
    </Section>
  );
};

export default MembershipSection;

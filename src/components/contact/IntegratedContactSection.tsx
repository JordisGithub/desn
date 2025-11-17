import { useState } from "react";
import {
  Container,
  Typography,
  TextField,
  Button,
  Box,
  Card,
  CardContent,
  Stack,
} from "@mui/material";
import { styled } from "@mui/material/styles";
import { useTranslation } from "react-i18next";
import SendIcon from "@mui/icons-material/Send";
import EmailIcon from "@mui/icons-material/Email";
import PhoneIcon from "@mui/icons-material/Phone";
import DirectionsIcon from "@mui/icons-material/Directions";

const ContactSection = styled("section")(({ theme }) => ({
  backgroundColor: "#f9fafb",
  paddingTop: theme.spacing(12),
  paddingBottom: theme.spacing(12),
  [theme.breakpoints.down("sm")]: {
    paddingTop: theme.spacing(6),
    paddingBottom: theme.spacing(6),
  },
}));

const TwoColumnLayout = styled(Box)(({ theme }) => ({
  display: "grid",
  gridTemplateColumns: "1fr 1fr",
  gap: theme.spacing(6),
  alignItems: "start",
  [theme.breakpoints.down("md")]: {
    gridTemplateColumns: "1fr",
    gap: theme.spacing(4),
  },
}));

// ========== LEFT COLUMN: MAP & INFO CARDS ==========

const LeftColumn = styled(Box)({
  display: "flex",
  flexDirection: "column",
  gap: "32px",
});

const InfoCard = styled(Card)(({ theme }) => ({
  borderRadius: "16px",
  boxShadow: "0 24px 60px rgba(0, 0, 0, 0.45) !important",
  padding: theme.spacing(4),
  border: "2px solid transparent",
  backgroundColor: "#ffffff",
  transition: "all 0.3s ease",
  "&:hover": {
    transform: "translateY(-2px)",
    boxShadow: "0 28px 70px rgba(0, 0, 0, 0.5) !important",
  },
  "&:focus-within": {
    borderColor: "#f6d469",
    boxShadow:
      "0 24px 60px rgba(0, 0, 0, 0.45), 0 0 0 3px rgba(246, 212, 105, 0.3) !important",
  },
}));

const InfoCardHeader = styled(Box)({
  display: "flex",
  alignItems: "center",
  gap: "16px",
  marginBottom: "16px",
});

const IconWrapper = styled(Box, {
  shouldForwardProp: (prop) => prop !== "bgColor",
})<{ bgColor: string }>(({ bgColor }) => ({
  width: "56px",
  height: "56px",
  borderRadius: "12px",
  backgroundColor: bgColor,
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  flexShrink: 0,
}));

const InfoTitle = styled(Typography)({
  fontSize: "1.5rem",
  fontWeight: 600,
  color: "#004c91",
  fontFamily: '"Poppins", "Roboto", sans-serif',
});

const InfoText = styled(Typography)({
  fontSize: "1.125rem",
  color: "#364153",
  lineHeight: 1.6,
  "&:not(:last-child)": {
    marginBottom: "8px",
  },
});

const InfoLink = styled("a")({
  color: "#004c91",
  textDecoration: "underline",
  textDecorationColor: "transparent",
  fontWeight: 500,
  transition: "all 0.2s ease",
  borderRadius: "4px",
  padding: "2px 4px",
  margin: "-2px -4px",
  "&:hover": {
    textDecorationColor: "#004c91",
    backgroundColor: "rgba(0, 76, 145, 0.05)",
    color: "#003d73",
  },
  "&:focus": {
    outline: "3px solid #f6d469",
    outlineOffset: "2px",
    textDecorationColor: "#004c91",
    backgroundColor: "rgba(246, 212, 105, 0.15)",
  },
  "&:focus-visible": {
    outline: "3px solid #f6d469",
    outlineOffset: "2px",
  },
  "&:visited": {
    color: "#5B21B6",
  },
  "&:visited:hover": {
    color: "#4C1D95",
    textDecorationColor: "#5B21B6",
  },
  "&:active": {
    backgroundColor: "rgba(0, 76, 145, 0.1)",
    transform: "scale(0.98)",
  },
});

const MapContainer = styled(Box)(({ theme }) => ({
  width: "100%",
  height: "500px",
  borderRadius: "16px",
  overflow: "hidden",
  boxShadow: "0 30px 80px rgba(0, 0, 0, 0.75) !important",
  border: "none",
  backgroundColor: "#f3f4f6",
  [theme.breakpoints.down("md")]: {
    height: "400px",
  },
  [theme.breakpoints.down("sm")]: {
    height: "300px",
  },
}));

const DirectionsButton = styled(Button)(({ theme }) => ({
  backgroundColor: "#004c91",
  color: "white",
  fontWeight: 600,
  fontSize: "1.125rem",
  padding: theme.spacing(1.75, 4),
  borderRadius: "12px",
  textTransform: "none",
  width: "100%",
  marginTop: theme.spacing(2),
  boxShadow: "0 4px 12px rgba(0, 76, 145, 0.2)",
  transition: "all 0.2s ease",
  "&:hover": {
    backgroundColor: "#003d73",
    boxShadow: "0 6px 16px rgba(0, 76, 145, 0.3)",
    transform: "translateY(-1px)",
  },
  "&:focus": {
    outline: "3px solid #f6d469",
    outlineOffset: "3px",
    backgroundColor: "#003d73",
  },
  "&:focus-visible": {
    outline: "3px solid #f6d469",
    outlineOffset: "3px",
  },
  "&:active": {
    backgroundColor: "#002952",
    transform: "translateY(0)",
    boxShadow: "0 2px 8px rgba(0, 76, 145, 0.3)",
  },
  "&:visited": {
    color: "white",
  },
})) as typeof Button;

// ========== RIGHT COLUMN: MINIMALIST FORM ==========

const RightColumn = styled(Box)({
  display: "flex",
  flexDirection: "column",
});

const FormTitle = styled(Typography)(({ theme }) => ({
  fontSize: "2.5rem",
  fontWeight: 700,
  color: "#004c91",
  fontFamily: '"Poppins", "Roboto", sans-serif',
  marginBottom: theme.spacing(3),
  textShadow: "0px 12px 24px rgba(0, 0, 0, 0.9) !important",
  [theme.breakpoints.down("sm")]: {
    fontSize: "2rem",
  },
})) as typeof Typography;

const FormDescription = styled(Typography)({
  fontSize: "1.125rem",
  color: "#4a5565",
  lineHeight: 1.6,
  marginBottom: "32px",
});

const MinimalistTextField = styled(TextField)(({ theme }) => ({
  "& .MuiOutlinedInput-root": {
    backgroundColor: "#ffffff",
    borderRadius: "12px",
    transition: "all 0.2s ease",
    "& fieldset": {
      borderColor: "#d1d5dc",
      borderWidth: "2px",
      transition: "all 0.2s ease",
    },
    "&:hover fieldset": {
      borderColor: "#004c91",
      borderWidth: "2px",
    },
    "&.Mui-focused fieldset": {
      borderColor: "var(--color-accent) !important",
      borderWidth: "3px !important",
      boxShadow: "0 0 0 4px rgba(246, 212, 105, 0.6) !important",
    },
    "&.Mui-focused:hover fieldset": {
      borderColor: "var(--color-accent) !important",
    },
  },
  "& .MuiInputLabel-root": {
    fontSize: "1rem",
    fontWeight: 500,
    color: "#364153",
    transition: "all 0.2s ease",
    "&.Mui-focused": {
      color: "#004c91",
      fontWeight: 600,
    },
  },
  "& .MuiInputBase-input": {
    fontSize: "1rem",
    padding: theme.spacing(2),
    color: "#101828",
    "&:focus": {
      outline: "none",
    },
  },
}));

const SubmitButton = styled(Button)({
  backgroundColor: "var(--color-accent-dark) !important",
  color: "var(--color-primary-dark) !important",
  fontWeight: "800 !important",
  fontSize: "1.25rem",
  padding: "16px 32px",
  borderRadius: "12px",
  textTransform: "uppercase",
  letterSpacing: "0.5px",
  width: "100%",
  boxShadow: "0 8px 24px rgba(246, 212, 105, 0.4)",
  transition: "all 0.2s ease",
  "&:hover": {
    transform: "translateY(-2px)",
    boxShadow: "0 12px 32px rgba(246, 212, 105, 0.5)",
    filter: "brightness(1.05)",
  },
  "&:focus": {
    outline: "3px solid #004c91",
    outlineOffset: "4px",
    boxShadow:
      "0 12px 32px rgba(246, 212, 105, 0.5), 0 0 0 3px rgba(0, 76, 145, 0.2)",
  },
  "&:focus-visible": {
    outline: "3px solid #004c91",
    outlineOffset: "4px",
  },
  "&:active": {
    transform: "translateY(0)",
    boxShadow: "0 4px 16px rgba(246, 212, 105, 0.4)",
    filter: "brightness(0.95)",
  },
  "&:disabled": {
    opacity: 0.6,
    cursor: "not-allowed",
  },
});

const LocationText = styled(Typography)({
  fontSize: "1rem",
  color: "#364153",
  lineHeight: 1.8,
  marginBottom: "16px",
});

export default function IntegratedContactSection() {
  const { t } = useTranslation();
  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    message: "",
  });
  const [formStatus, setFormStatus] = useState<string>("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [validationErrors, setValidationErrors] = useState<{
    fullName?: string;
    email?: string;
    message?: string;
  }>({});

  const validateForm = (): boolean => {
    const errors: {
      fullName?: string;
      email?: string;
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
    // Clear field error when user types
    if (validationErrors[name as keyof typeof validationErrors]) {
      setValidationErrors((prev) => {
        const updated = { ...prev };
        delete updated[name as keyof typeof validationErrors];
        return updated;
      });
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    // Validate form
    if (!validateForm()) {
      setFormStatus("");
      return;
    }

    setIsSubmitting(true);
    setFormStatus("Submitting your message...");

    // Simulate form submission
    setTimeout(() => {
      console.log("Form submitted:", formData);
      setFormStatus(
        "Message sent successfully! We will respond within 24 hours."
      );
      setIsSubmitting(false);
      // Reset form
      setFormData({ fullName: "", email: "", message: "" });
      setValidationErrors({});
    }, 1000);
  };

  const directionsUrl =
    "https://www.google.com/maps/dir/?api=1&destination=Siddhi%20Road%2C%20Lalitpur%2044700%2C%20Nepal";

  return (
    <>
      {/* Main Contact Section: [MAP | FORM] */}
      <ContactSection
        id='contact-section'
        aria-labelledby='contact-heading'
        role='main'
      >
        <Container maxWidth='xl'>
          <TwoColumnLayout>
            {/* LEFT COLUMN: MAP & Location Details */}
            <LeftColumn>
              {/* Map Container with MAXIMUM Shadow */}
              <MapContainer aria-hidden='true'>
                <iframe
                  src='https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3533.1234567890!2d85.3240!3d27.6710!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2zMjfCsDQwJzE1LjYiTiA4NcKwMTknMjYuNCJF!5e0!3m2!1sen!2snp!4v1234567890'
                  width='100%'
                  height='100%'
                  style={{ border: 0 }}
                  allowFullScreen
                  loading='lazy'
                  referrerPolicy='no-referrer-when-downgrade'
                  title={t("contact.map.iframe_title")}
                  tabIndex={-1}
                  aria-label='Decorative map showing DESN office location. Full location details provided in text below.'
                />
              </MapContainer>

              {/* Condensed Location Details */}
              <Box sx={{ marginTop: 3 }} id='location-details'>
                <Typography
                  component='h2'
                  sx={{
                    fontSize: "1.5rem",
                    fontWeight: 600,
                    color: "#004c91",
                    marginBottom: 2,
                  }}
                >
                  {t("contact.map.location_details_heading")}
                </Typography>

                <Box component='address' sx={{ fontStyle: "normal" }}>
                  <LocationText>
                    <strong>{t("contact.map.office_name")}</strong>
                    <br />
                    {t("contact.cards.location.address1")},{" "}
                    {t("contact.cards.location.address2")}
                  </LocationText>
                  <LocationText>
                    <strong>Landmark:</strong>{" "}
                    {t("contact.map.landmark_description")}
                  </LocationText>
                  <LocationText>
                    <strong>Transit:</strong>{" "}
                    {t("contact.map.transit_description")}
                  </LocationText>
                </Box>

                <DirectionsButton
                  component='a'
                  href={directionsUrl}
                  target='_blank'
                  rel='noopener noreferrer'
                  startIcon={<DirectionsIcon />}
                  aria-label={`${t(
                    "contact.map.get_directions"
                  )} - Opens in new window`}
                >
                  {t("contact.map.get_directions")}
                </DirectionsButton>
              </Box>
            </LeftColumn>

            {/* RIGHT COLUMN: Minimalist Contact Form */}
            <RightColumn>
              <FormTitle component='h2' id='contact-heading'>
                {t("contact.form.title")}
              </FormTitle>
              <FormDescription id='form-description'>
                {t("contact.form.description")}
              </FormDescription>

              {/* Live region for screen reader announcements */}
              <Box
                role='status'
                aria-live='polite'
                aria-atomic='true'
                sx={{
                  position: "absolute",
                  left: "-10000px",
                  width: "1px",
                  height: "1px",
                  overflow: "hidden",
                }}
              >
                {formStatus}
              </Box>

              <form
                onSubmit={handleSubmit}
                aria-labelledby='contact-heading'
                aria-describedby='form-description'
                noValidate
              >
                <Stack
                  spacing={3}
                  component='fieldset'
                  sx={{ border: "none", padding: 0, margin: 0 }}
                >
                  <legend style={{ position: "absolute", left: "-10000px" }}>
                    Contact form with 3 required fields
                  </legend>

                  <MinimalistTextField
                    fullWidth
                    required
                    name='fullName'
                    label={t("contact.form.full_name")}
                    value={formData.fullName}
                    onChange={handleChange}
                    error={!!validationErrors.fullName}
                    helperText={validationErrors.fullName}
                    inputProps={{
                      "aria-required": "true",
                      "aria-invalid": !!validationErrors.fullName,
                    }}
                    autoComplete='name'
                  />

                  <MinimalistTextField
                    fullWidth
                    required
                    type='email'
                    name='email'
                    label={t("contact.form.email")}
                    value={formData.email}
                    onChange={handleChange}
                    error={!!validationErrors.email}
                    helperText={validationErrors.email}
                    inputProps={{
                      "aria-required": "true",
                      "aria-invalid": !!validationErrors.email,
                    }}
                    autoComplete='email'
                  />

                  <MinimalistTextField
                    fullWidth
                    required
                    multiline
                    rows={6}
                    name='message'
                    label={t("contact.form.message")}
                    value={formData.message}
                    onChange={handleChange}
                    error={!!validationErrors.message}
                    helperText={validationErrors.message}
                    inputProps={{
                      "aria-required": "true",
                      "aria-invalid": !!validationErrors.message,
                    }}
                  />

                  <SubmitButton
                    type='submit'
                    startIcon={<SendIcon />}
                    disabled={isSubmitting}
                    aria-label={
                      isSubmitting
                        ? "Sending message, please wait"
                        : `${t("contact.form.submit")} - Submit contact form`
                    }
                  >
                    {isSubmitting
                      ? "SENDING..."
                      : t("contact.form.submit").toUpperCase()}
                  </SubmitButton>
                </Stack>
              </form>
            </RightColumn>
          </TwoColumnLayout>
        </Container>
      </ContactSection>

      {/* Contact Info Cards Section */}
      <ContactSection
        sx={{ backgroundColor: "white", paddingTop: 8, paddingBottom: 8 }}
        aria-label='Contact information'
        role='region'
      >
        <Container maxWidth='xl'>
          <Typography
            component='h2'
            sx={{
              fontSize: "2rem",
              fontWeight: 600,
              color: "#004c91",
              textAlign: "center",
              marginBottom: 4,
              position: "absolute",
              left: "-10000px",
            }}
          >
            Quick Contact Methods
          </Typography>
          <Box
            sx={{
              display: "grid",
              gridTemplateColumns: { xs: "1fr", md: "1fr 1fr" },
              gap: { xs: 3, md: 4 },
              maxWidth: "900px",
              margin: "0 auto",
            }}
          >
            {/* Phone Card */}
            <InfoCard role='article' aria-labelledby='phone-card-title'>
              <CardContent sx={{ padding: 0 }}>
                <InfoCardHeader>
                  <IconWrapper
                    bgColor='rgba(0, 167, 127, 0.15)'
                    aria-hidden='true'
                  >
                    <PhoneIcon
                      sx={{ fontSize: "32px !important", color: "#00a77f" }}
                      aria-hidden='true'
                    />
                  </IconWrapper>
                  <InfoTitle id='phone-card-title'>
                    {t("contact.cards.phone.title")}
                  </InfoTitle>
                </InfoCardHeader>
                <InfoText>
                  <InfoLink
                    href='tel:+977-15709205'
                    aria-label={`Primary phone number: ${t(
                      "contact.cards.phone.primary"
                    )}`}
                  >
                    {t("contact.cards.phone.primary")}
                  </InfoLink>
                </InfoText>
                <InfoText>
                  <InfoLink
                    href='tel:+977-9849873868'
                    aria-label={`Secondary phone number: ${t(
                      "contact.cards.phone.secondary"
                    )}`}
                  >
                    {t("contact.cards.phone.secondary")}
                  </InfoLink>
                </InfoText>
              </CardContent>
            </InfoCard>

            {/* Email Card */}
            <InfoCard role='article' aria-labelledby='email-card-title'>
              <CardContent sx={{ padding: 0 }}>
                <InfoCardHeader>
                  <IconWrapper
                    bgColor='rgba(0, 76, 145, 0.15)'
                    aria-hidden='true'
                  >
                    <EmailIcon
                      sx={{ fontSize: "32px !important", color: "#004c91" }}
                      aria-hidden='true'
                    />
                  </IconWrapper>
                  <InfoTitle id='email-card-title'>
                    {t("contact.cards.email.title")}
                  </InfoTitle>
                </InfoCardHeader>
                <InfoText>
                  <InfoLink
                    href='mailto:disabilityemp@gmail.com'
                    aria-label={`Primary email address: ${t(
                      "contact.cards.email.primary"
                    )}`}
                  >
                    {t("contact.cards.email.primary")}
                  </InfoLink>
                </InfoText>
                <InfoText>
                  <InfoLink
                    href='mailto:thekopkrish@gmail.com'
                    aria-label={`Secondary email address: ${t(
                      "contact.cards.email.secondary"
                    )}`}
                  >
                    {t("contact.cards.email.secondary")}
                  </InfoLink>
                </InfoText>
              </CardContent>
            </InfoCard>
          </Box>
        </Container>
      </ContactSection>
    </>
  );
}

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
import AccessTimeIcon from "@mui/icons-material/AccessTime";

const FormSection = styled("section")(({ theme }) => ({
  backgroundColor: "#f9fafb",
  paddingTop: theme.spacing(10),
  paddingBottom: theme.spacing(10),
}));

const FormContainer = styled(Box)(({ theme }) => ({
  display: "grid",
  gridTemplateColumns: "1fr 1fr",
  gap: theme.spacing(8),
  [theme.breakpoints.down("md")]: {
    gridTemplateColumns: "1fr",
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
}));

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
  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    phone: "",
    subject: "",
    message: "",
  });

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Handle form submission
    console.log("Form submitted:", formData);
  };

  return (
    <FormSection id='contact-form' aria-labelledby='contact-form-heading'>
      <Container maxWidth='xl'>
        <FormContainer>
          {/* Form Column */}
          <Box>
            <SectionTitle id='contact-form-heading'>
              {t("contact.form.title")}
            </SectionTitle>
            <SectionDescription>
              {t("contact.form.description")}
            </SectionDescription>

            <form onSubmit={handleSubmit}>
              <Stack spacing={4}>
                <StyledTextField
                  fullWidth
                  required
                  name='fullName'
                  label={t("contact.form.full_name")}
                  placeholder={t("contact.form.full_name_placeholder")}
                  value={formData.fullName}
                  onChange={handleChange}
                />

                <StyledTextField
                  fullWidth
                  required
                  type='email'
                  name='email'
                  label={t("contact.form.email")}
                  placeholder={t("contact.form.email_placeholder")}
                  value={formData.email}
                  onChange={handleChange}
                />

                <StyledTextField
                  fullWidth
                  name='phone'
                  label={t("contact.form.phone")}
                  placeholder={t("contact.form.phone_placeholder")}
                  value={formData.phone}
                  onChange={handleChange}
                />

                <StyledTextField
                  fullWidth
                  required
                  name='subject'
                  label={t("contact.form.subject")}
                  placeholder={t("contact.form.subject_placeholder")}
                  value={formData.subject}
                  onChange={handleChange}
                />

                <StyledTextField
                  fullWidth
                  required
                  multiline
                  rows={4}
                  name='message'
                  label={t("contact.form.message")}
                  placeholder={t("contact.form.message_placeholder")}
                  value={formData.message}
                  onChange={handleChange}
                />

                <SubmitButton type='submit' startIcon={<SendIcon />}>
                  {t("contact.form.submit")}
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
                  <IconBg bgColor='rgba(0, 167, 127, 0.1)'>
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
                height: "400px",
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

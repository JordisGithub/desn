import React, { useState } from "react";
import { styled } from "@mui/material/styles";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import Alert from "@mui/material/Alert";
import CircularProgress from "@mui/material/CircularProgress";
import { useTranslation } from "react-i18next";
import { useLanguage } from "../../contexts/LanguageContext";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import SendIcon from "@mui/icons-material/Send";
import CardMembershipIcon from "@mui/icons-material/CardMembership";
// @ts-expect-error - ApiService is a JS file
import { postWithAuth } from "../../services/ApiService.js";

const Section = styled(Box)(({ theme }) => ({
  padding: theme.spacing(12, 12),
  backgroundColor: "white",
}));

const IntroContainer = styled(Box)(({ theme }) => ({
  display: "grid",
  gridTemplateColumns: "608px 608px",
  gap: theme.spacing(8),
  marginBottom: theme.spacing(8),
  maxWidth: "1280px",
  margin: "0 auto 64px auto",
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

const SectionTitle = styled(Typography)({
  fontSize: "32px",
  fontWeight: 400,
  color: "#004c91",
  marginTop: "20px",
  fontFamily: "'Open Sans', sans-serif",
});

const Description = styled(Typography)({
  fontSize: "16px",
  fontWeight: 400,
  color: "#364153",
  lineHeight: 1.5,
});

const ImageContainer = styled(Box)({
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
});

const BenefitsSection = styled(Box)({
  maxWidth: "1280px",
  margin: "0 auto 64px auto",
});

const BenefitsTitle = styled(Typography)({
  fontSize: "24px",
  fontWeight: 400,
  color: "#004c91",
  textAlign: "center",
  marginBottom: "48px",
  fontFamily: "'Open Sans', sans-serif",
});

const BenefitsGrid = styled(Box)({
  display: "grid",
  gridTemplateColumns: "repeat(2, 1fr)",
  gap: "24px",
});

const BenefitCard = styled(Box)(({ theme }) => ({
  backgroundColor: "white",
  borderRadius: "10px",
  padding: theme.spacing(2, 6),
  display: "flex",
  alignItems: "center",
  gap: theme.spacing(2),
}));

const BenefitText = styled(Typography)({
  fontSize: "16px",
  fontWeight: 400,
  color: "#364153",
});

const FormSection = styled(Box)({
  maxWidth: "1280px",
  margin: "0 auto",
  borderRadius: "16px",
  background: "linear-gradient(to bottom, #004c91, #00a77f)",
  padding: "64px",
});

const FormTitle = styled(Typography)({
  fontSize: "24px",
  fontWeight: 400,
  color: "white",
  textAlign: "center",
  marginBottom: "32px",
  fontFamily: "'Open Sans', sans-serif",
});

const RequiredNote = styled(Typography)({
  fontSize: "20px",
  color: "white",
  marginBottom: "32px",
});

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
    "& fieldset": {
      borderColor: "transparent",
    },
    "&:hover fieldset": {
      borderColor: "rgba(0, 76, 145, 0.3)",
    },
    "&.Mui-focused fieldset": {
      borderColor: "#004c91",
    },
  },
  "& .MuiInputLabel-root": {
    color: "rgba(16, 24, 40, 0.5)",
  },
});

const SubmitButton = styled(Button)({
  backgroundColor: "#f6d469",
  color: "#351c42",
  fontSize: "16px",
  fontWeight: 400,
  padding: "12px 24px",
  borderRadius: "10px",
  textTransform: "none",
  "&:hover": {
    backgroundColor: "#f5ca4a",
  },
});

const MembershipSection: React.FC = () => {
  const { t } = useTranslation();
  const { lang } = useLanguage();
  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    phone: "",
    address: "",
    message: "",
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitSuccess, setSubmitSuccess] = useState(false);
  const [submitError, setSubmitError] = useState<string | null>(null);

  const benefits = [
    t("get_involved.membership.benefits.updates"),
    t("get_involved.membership.benefits.meetings"),
    t("get_involved.membership.benefits.networking"),
    t("get_involved.membership.benefits.resources"),
    t("get_involved.membership.benefits.voice"),
    t("get_involved.membership.benefits.certificate"),
  ];

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
      const response = await postWithAuth("/api/forms/membership", {
        ...formData,
        language: lang,
      });

      if (response.success) {
        setSubmitSuccess(true);
        // Reset form
        setFormData({
          fullName: "",
          email: "",
          phone: "",
          address: "",
          message: "",
        });
        // Scroll to success message
        window.scrollTo({ top: 0, behavior: "smooth" });
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

  return (
    <Section>
      <IntroContainer>
        <TextContent>
          <Box sx={{ position: "relative" }}>
            <CardMembershipIcon
              sx={{ fontSize: 48, color: "#f6d469", mb: 2 }}
            />
            <TitleBar />
          </Box>
          <SectionTitle>{t("get_involved.membership.title")}</SectionTitle>
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
        </TextContent>
        <ImageContainer>
          <img
            src='https://www.figma.com/api/mcp/asset/4ebd3bdc-190f-4548-931e-7082e1bdcd3e'
            alt='Membership'
          />
        </ImageContainer>
      </IntroContainer>

      <BenefitsSection>
        <BenefitsTitle>
          {t("get_involved.membership.benefits.title")}
        </BenefitsTitle>
        <BenefitsGrid>
          {benefits.map((benefit, index) => (
            <BenefitCard key={index}>
              <CheckCircleIcon sx={{ color: "#00a77f", fontSize: 20 }} />
              <BenefitText>{benefit}</BenefitText>
            </BenefitCard>
          ))}
        </BenefitsGrid>
      </BenefitsSection>

      <FormSection>
        <FormTitle>{t("get_involved.membership.form.title")}</FormTitle>
        <RequiredNote>
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
          <CheckCircleIcon sx={{ color: "#f6d469", fontSize: 20 }} />
          <Typography sx={{ fontSize: "14px", color: "white" }}>
            {t("get_involved.membership.security_note")}
          </Typography>
        </Box>

        {submitSuccess && (
          <Alert
            severity='success'
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

        <Form onSubmit={handleSubmit}>
          <InputRow>
            <StyledTextField
              name='fullName'
              label={t("get_involved.membership.form.full_name")}
              value={formData.fullName}
              onChange={handleChange}
              required
              fullWidth
              disabled={isSubmitting}
            />
            <StyledTextField
              name='email'
              type='email'
              label={t("get_involved.membership.form.email")}
              value={formData.email}
              onChange={handleChange}
              required
              fullWidth
              disabled={isSubmitting}
            />
          </InputRow>
          <StyledTextField
            name='phone'
            label={t("get_involved.membership.form.phone")}
            value={formData.phone}
            onChange={handleChange}
            required
            fullWidth
            sx={{ maxWidth: "376px" }}
            disabled={isSubmitting}
          />
          <StyledTextField
            name='address'
            label={t("get_involved.membership.form.address")}
            value={formData.address}
            onChange={handleChange}
            fullWidth
            disabled={isSubmitting}
          />
          <StyledTextField
            name='message'
            label={t("get_involved.membership.form.message")}
            value={formData.message}
            onChange={handleChange}
            multiline
            rows={5}
            fullWidth
            disabled={isSubmitting}
          />
          <SubmitButton
            type='submit'
            endIcon={
              isSubmitting ? <CircularProgress size={20} /> : <SendIcon />
            }
            disabled={isSubmitting}
          >
            {isSubmitting
              ? t("get_involved.membership.form.submitting") || "Submitting..."
              : t("get_involved.membership.form.submit")}
          </SubmitButton>
        </Form>
      </FormSection>
    </Section>
  );
};

export default MembershipSection;

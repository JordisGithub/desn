import React, { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { styled } from "@mui/material/styles";
import { usePageTitle } from "../hooks/usePageTitle";
import {
  Box,
  Container,
  TextField,
  Button,
  Typography,
  Alert,
  Paper,
  CircularProgress,
} from "@mui/material";
import { useTranslation } from "react-i18next";
import { useAuth } from "../contexts/AuthContext";
import ApiService from "../services/ApiService";

const PageContainer = styled(Box)({
  minHeight: "100vh",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  backgroundColor: "#f5f5f5",
  padding: "20px",
});

const FormPaper = styled(Paper)({
  padding: "40px",
  maxWidth: "450px",
  width: "100%",
  borderRadius: "16px",
  boxShadow: "0 4px 20px rgba(0,0,0,0.1)",
});

const Title = styled("h1")({
  fontSize: "32px",
  fontWeight: 600,
  color: "#004c91",
  marginBottom: "8px",
  textAlign: "center",
  fontFamily: '"Roboto","Helvetica","Arial",sans-serif',
  margin: 0,
});

const Subtitle = styled(Typography)({
  fontSize: "16px",
  color: "#374151",
  marginBottom: "32px",
  textAlign: "center",
  fontWeight: 400,
});

const StyledTextField = styled(TextField)({
  marginBottom: "20px",
  "& .MuiOutlinedInput-root": {
    borderRadius: "10px",
    transition: "all 0.2s ease",
    "& .MuiOutlinedInput-notchedOutline": {
      borderColor: "#d1d5db",
      borderWidth: "1px",
    },
    "&:hover:not(.Mui-disabled) .MuiOutlinedInput-notchedOutline": {
      borderColor: "#004c91",
      borderWidth: "2px",
    },
    "&.Mui-focused": {
      outline: "3px solid #004c91 !important",
      outlineOffset: "2px",
      boxShadow: "none !important",
      "& .MuiOutlinedInput-notchedOutline": {
        borderWidth: "3px",
        borderColor: "#004c91 !important",
        boxShadow: "none !important",
      },
    },
    "&.Mui-error .MuiOutlinedInput-notchedOutline": {
      borderColor: "#b71c1c",
      borderWidth: "2px",
    },
    "&.Mui-error:hover:not(.Mui-disabled) .MuiOutlinedInput-notchedOutline": {
      borderColor: "#8b0000",
      borderWidth: "2px",
    },
    "&.Mui-error.Mui-focused": {
      outline: "3px solid #b71c1c !important",
      outlineOffset: "2px",
      "& .MuiOutlinedInput-notchedOutline": {
        borderColor: "#b71c1c !important",
        borderWidth: "3px",
        boxShadow: "0 0 0 1px #b71c1c",
      },
    },
  },
  "& .MuiOutlinedInput-input": {
    "&:focus": {
      outline: "none",
      boxShadow: "none !important",
    },
    "&:focus-visible": {
      outline: "none",
      boxShadow: "none !important",
    },
  },
  "& .MuiInputLabel-root": {
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
  "& .MuiFormHelperText-root": {
    margin: "4px 0 0 0",
    padding: "4px 8px",
    borderRadius: "4px",
    "&.Mui-error": {
      color: "#b71c1c",
      fontWeight: 600,
      backgroundColor: "#ffebee",
    },
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
  "&.MuiButtonBase-root": {
    "&:focus .MuiTouchRipple-root": {
      display: "none",
    },
  },
});

const LinkText = styled(Typography)({
  marginTop: "20px",
  textAlign: "center",
  fontSize: "14px",
  color: "#374151",
  fontWeight: 400,
  "& a": {
    color: "#004c91",
    textDecoration: "none",
    fontWeight: 500,
    transition: "all 0.2s ease",
    "&:hover": {
      color: "#003d73",
      textDecoration: "underline",
    },
    "&:focus": {
      outline: "3px solid #004c91",
      outlineOffset: "2px",
      borderRadius: "4px",
      color: "#003d73",
    },
    "&:focus-visible": {
      outline: "3px solid #004c91",
      outlineOffset: "2px",
      borderRadius: "4px",
      color: "#003d73",
    },
  },
});

const Register: React.FC = () => {
  const { t } = useTranslation();
  usePageTitle("page_titles.register");
  const navigate = useNavigate();
  const { login } = useAuth();
  const [formData, setFormData] = useState({
    username: "",
    email: "",
    password: "",
    fullName: "",
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [validationErrors, setValidationErrors] = useState<{
    fullName?: string;
    username?: string;
    email?: string;
    password?: string;
  }>({});
  const errorSummaryRef = React.useRef<HTMLDivElement>(null);

  const validateForm = (): boolean => {
    const errors: {
      fullName?: string;
      username?: string;
      email?: string;
      password?: string;
    } = {};

    if (!formData.fullName.trim()) {
      errors.fullName = t("register_error_fullname_required");
    }

    if (!formData.username.trim()) {
      errors.username = t("register_error_username_required");
    }

    if (!formData.email.trim()) {
      errors.email = t("register_error_email_required");
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      errors.email = t("register_error_email_invalid");
    }

    if (!formData.password.trim()) {
      errors.password = t("register_error_password_required");
    }

    setValidationErrors(errors);
    return Object.keys(errors).length === 0;
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
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
    if (error) setError(null);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);

    // Client-side validation
    if (!validateForm()) {
      // Focus the error summary for screen readers
      setTimeout(() => {
        errorSummaryRef.current?.focus();
      }, 100);
      return;
    }

    setLoading(true);

    try {
      interface RegisterResponse {
        success: boolean;
        message?: string;
        errors?: string[];
        user?: {
          username: string;
          email: string;
          fullName: string;
          role: string;
          token: string;
        };
      }

      const data = await ApiService.postWithAuth<RegisterResponse>(
        "/api/auth/register",
        formData
      );

      if (data.success && data.user) {
        login(data.user);
        navigate("/");
      } else {
        if (data.errors && Array.isArray(data.errors)) {
          setError(data.errors.join(", "));
        } else {
          setError(data.message || t("auth_error_generic"));
        }
      }
    } catch (err) {
      console.error("Registration error:", err);
      setError(t("auth_error_generic"));
    } finally {
      setLoading(false);
    }
  };

  return (
    <PageContainer>
      <Container maxWidth='sm'>
        <FormPaper elevation={3}>
          <Title>{t("register_title")}</Title>
          <Subtitle>{t("register_subtitle")}</Subtitle>

          {Object.keys(validationErrors).length > 0 && (
            <Alert
              severity='error'
              role='alert'
              aria-live='assertive'
              aria-atomic='true'
              sx={{
                mb: 3,
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
                {t("register_error_summary_title")}
              </Box>
              <Box component='ul' sx={{ m: 0, pl: 2 }}>
                {validationErrors.fullName && (
                  <li>
                    <a
                      href='#register-fullName'
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
                        e.currentTarget.style.outline = "3px solid #004c91";
                        e.currentTarget.style.outlineOffset = "2px";
                      }}
                      onBlur={(e) => {
                        e.currentTarget.style.outline = "none";
                      }}
                      onClick={(e) => {
                        e.preventDefault();
                        document.getElementById("register-fullName")?.focus();
                      }}
                    >
                      {validationErrors.fullName}
                    </a>
                  </li>
                )}
                {validationErrors.username && (
                  <li>
                    <a
                      href='#register-username'
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
                        e.currentTarget.style.outline = "3px solid #004c91";
                        e.currentTarget.style.outlineOffset = "2px";
                      }}
                      onBlur={(e) => {
                        e.currentTarget.style.outline = "none";
                      }}
                      onClick={(e) => {
                        e.preventDefault();
                        document.getElementById("register-username")?.focus();
                      }}
                    >
                      {validationErrors.username}
                    </a>
                  </li>
                )}
                {validationErrors.email && (
                  <li>
                    <a
                      href='#register-email'
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
                        e.currentTarget.style.outline = "3px solid #004c91";
                        e.currentTarget.style.outlineOffset = "2px";
                      }}
                      onBlur={(e) => {
                        e.currentTarget.style.outline = "none";
                      }}
                      onClick={(e) => {
                        e.preventDefault();
                        document.getElementById("register-email")?.focus();
                      }}
                    >
                      {validationErrors.email}
                    </a>
                  </li>
                )}
                {validationErrors.password && (
                  <li>
                    <a
                      href='#register-password'
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
                        e.currentTarget.style.outline = "3px solid #004c91";
                        e.currentTarget.style.outlineOffset = "2px";
                      }}
                      onBlur={(e) => {
                        e.currentTarget.style.outline = "none";
                      }}
                      onClick={(e) => {
                        e.preventDefault();
                        document.getElementById("register-password")?.focus();
                      }}
                    >
                      {validationErrors.password}
                    </a>
                  </li>
                )}
              </Box>
            </Alert>
          )}

          {error && (
            <Alert
              severity='error'
              role='alert'
              aria-live='assertive'
              sx={{ mb: 3 }}
            >
              {error}
            </Alert>
          )}

          <form onSubmit={handleSubmit} noValidate>
            <StyledTextField
              id='register-fullName'
              fullWidth
              label={t("register_fullname")}
              name='fullName'
              value={formData.fullName}
              onChange={handleChange}
              required
              disabled={loading}
              error={!!validationErrors.fullName}
              helperText={validationErrors.fullName}
              slotProps={{
                htmlInput: {
                  "aria-invalid": !!validationErrors.fullName,
                  "aria-describedby": validationErrors.fullName
                    ? "register-fullName-error"
                    : undefined,
                },
              }}
              FormHelperTextProps={{
                id: "register-fullName-error",
                role: "alert",
              }}
            />
            <StyledTextField
              id='register-username'
              fullWidth
              label={t("register_username")}
              name='username'
              value={formData.username}
              onChange={handleChange}
              required
              disabled={loading}
              error={!!validationErrors.username}
              helperText={validationErrors.username}
              slotProps={{
                htmlInput: {
                  "aria-invalid": !!validationErrors.username,
                  "aria-describedby": validationErrors.username
                    ? "register-username-error"
                    : undefined,
                },
              }}
              FormHelperTextProps={{
                id: "register-username-error",
                role: "alert",
              }}
            />
            <StyledTextField
              id='register-email'
              fullWidth
              label={t("register_email")}
              name='email'
              type='email'
              value={formData.email}
              onChange={handleChange}
              required
              disabled={loading}
              error={!!validationErrors.email}
              helperText={validationErrors.email}
              slotProps={{
                htmlInput: {
                  "aria-invalid": !!validationErrors.email,
                  "aria-describedby": validationErrors.email
                    ? "register-email-error"
                    : undefined,
                },
              }}
              FormHelperTextProps={{
                id: "register-email-error",
                role: "alert",
              }}
            />
            <StyledTextField
              id='register-password'
              fullWidth
              label={t("register_password")}
              name='password'
              type='password'
              value={formData.password}
              onChange={handleChange}
              required
              disabled={loading}
              error={!!validationErrors.password}
              helperText={validationErrors.password}
              slotProps={{
                htmlInput: {
                  "aria-invalid": !!validationErrors.password,
                  "aria-describedby": validationErrors.password
                    ? "register-password-error"
                    : undefined,
                },
              }}
              FormHelperTextProps={{
                id: "register-password-error",
                role: "alert",
              }}
            />

            <SubmitButton
              type='submit'
              fullWidth
              disabled={loading}
              endIcon={
                loading ? <CircularProgress size={20} color='inherit' /> : null
              }
            >
              {loading ? t("register_submitting") : t("register_submit")}
            </SubmitButton>
          </form>

          <LinkText>
            {t("register_has_account")}{" "}
            <Link to='/login'>{t("register_signin_link")}</Link>
          </LinkText>
        </FormPaper>
      </Container>
    </PageContainer>
  );
};

export default Register;

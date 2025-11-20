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
    "& .MuiOutlinedInput-notchedOutline": {
      borderColor: "#d1d5db",
    },
    "&:hover .MuiOutlinedInput-notchedOutline": {
      borderColor: "#004c91",
    },
    "&.Mui-focused .MuiOutlinedInput-notchedOutline": {
      borderWidth: "3px",
      borderColor: "#004c91",
    },
  },
  "& .MuiOutlinedInput-input": {
    "&:focus-visible": {
      outline: "none",
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

const Login: React.FC = () => {
  const { t } = useTranslation();
  usePageTitle("page_titles.login");
  const navigate = useNavigate();
  const { login } = useAuth();
  const [formData, setFormData] = useState({
    username: "",
    password: "",
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
    setError(null);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    try {
      interface LoginResponse {
        success: boolean;
        message?: string;
        user?: {
          username: string;
          email: string;
          fullName: string;
          role: string;
          token: string;
        };
      }

      const data = await ApiService.postWithAuth<LoginResponse>(
        "/api/auth/login",
        formData
      );

      if (data.success && data.user) {
        login(data.user);

        // Route based on user role
        if (data.user.role === "OWNER") {
          navigate("/owner/dashboard");
        } else if (data.user.role === "ADMIN") {
          navigate("/admin/dashboard");
        } else if (data.user.role === "MEMBER") {
          navigate("/member/dashboard");
        } else {
          navigate("/");
        }
      } else {
        setError(data.message || t("auth_error_login_failed"));
      }
    } catch (err) {
      console.error("Login error:", err);
      setError(t("auth_error_generic"));
    } finally {
      setLoading(false);
    }
  };

  return (
    <PageContainer>
      <Container maxWidth='sm'>
        <FormPaper elevation={3}>
          <Title>{t("login_title")}</Title>
          <Subtitle>{t("login_subtitle")}</Subtitle>

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

          <form onSubmit={handleSubmit}>
            <StyledTextField
              fullWidth
              label={t("login_username")}
              name='username'
              value={formData.username}
              onChange={handleChange}
              required
              disabled={loading}
              inputProps={{
                "aria-label": t("login_username"),
                "aria-required": true,
              }}
            />
            <StyledTextField
              fullWidth
              label={t("login_password")}
              name='password'
              type='password'
              value={formData.password}
              onChange={handleChange}
              required
              disabled={loading}
              inputProps={{
                "aria-label": t("login_password"),
                "aria-required": true,
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
              {loading ? t("login_submitting") : t("login_submit")}
            </SubmitButton>
          </form>

          <LinkText>
            {t("login_no_account")}{" "}
            <Link to='/register'>{t("login_signup_link")}</Link>
          </LinkText>
        </FormPaper>
      </Container>
    </PageContainer>
  );
};

export default Login;

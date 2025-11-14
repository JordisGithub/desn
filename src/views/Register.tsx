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
  color: "#666",
  marginBottom: "32px",
  textAlign: "center",
});

const StyledTextField = styled(TextField)({
  marginBottom: "20px",
  "& .MuiOutlinedInput-root": {
    borderRadius: "10px",
  },
});

const SubmitButton = styled(Button)({
  backgroundColor: "#004c91",
  color: "white",
  fontSize: "16px",
  fontWeight: 500,
  padding: "12px",
  borderRadius: "10px",
  textTransform: "none",
  marginTop: "20px",
  "&:hover": {
    backgroundColor: "#003d75",
  },
  "&:disabled": {
    backgroundColor: "#cccccc",
  },
});

const LinkText = styled(Typography)({
  marginTop: "20px",
  textAlign: "center",
  fontSize: "14px",
  color: "#666",
  "& a": {
    color: "#004c91",
    textDecoration: "none",
    fontWeight: 500,
    "&:hover": {
      textDecoration: "underline",
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
              label={t("register_fullname")}
              name='fullName'
              value={formData.fullName}
              onChange={handleChange}
              required
              disabled={loading}
            />
            <StyledTextField
              fullWidth
              label={t("register_username")}
              name='username'
              value={formData.username}
              onChange={handleChange}
              required
              disabled={loading}
            />
            <StyledTextField
              fullWidth
              label={t("register_email")}
              name='email'
              type='email'
              value={formData.email}
              onChange={handleChange}
              required
              disabled={loading}
            />
            <StyledTextField
              fullWidth
              label={t("register_password")}
              name='password'
              type='password'
              value={formData.password}
              onChange={handleChange}
              required
              disabled={loading}
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

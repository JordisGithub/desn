import {
  Box,
  Container,
  Typography,
  TextField,
  Button,
  Stack,
} from "@mui/material";
import { styled } from "@mui/material/styles";
import SendIcon from "@mui/icons-material/Send";
import { useTranslation } from "react-i18next";

const NewsletterContainer = styled(Box)({
  backgroundColor: "#004c91",
});

const NewsletterHeading = styled(Typography)(({ theme }) => ({
  fontSize: "1.75rem",
  fontWeight: 600,
  color: "white",
  textTransform: "capitalize",
  [theme.breakpoints.up("md")]: {
    fontSize: "2rem",
  },
}));

const NewsletterInput = styled(TextField)({
  backgroundColor: "rgba(53, 28, 66, 0.5)",
  borderRadius: "100px",
  "& .MuiOutlinedInput-root": {
    color: "#d7d3cb",
    borderRadius: "100px",
    "& fieldset": {
      borderColor: "#f6d469",
    },
    "&:hover fieldset": {
      borderColor: "#f6d469",
    },
    "&.Mui-focused fieldset": {
      borderColor: "#f6d469",
    },
  },
  "& .MuiOutlinedInput-input": {
    padding: "16px 20px",
  },
});

const SubscribeButton = styled(Button)(({ theme }) => ({
  backgroundColor: "#fff590",
  color: "#351c42",
  fontWeight: 700,
  padding: theme.spacing(2, 3),
  borderRadius: "100px",
  textTransform: "capitalize",
  whiteSpace: "nowrap",
  "&:hover": {
    backgroundColor: "#f6d469",
  },
  "&:focus": {
    outline: "3px solid white",
    outlineOffset: "2px",
  },
}));

export default function NewsletterSection() {
  const { t } = useTranslation();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Handle newsletter subscription
  };

  return (
    <NewsletterContainer
      aria-labelledby='newsletter-heading'
      style={{ paddingTop: "3rem", paddingBottom: "3rem" }}
    >
      <Container maxWidth='md'>
        <Stack
          direction={{ xs: "column", md: "row" }}
          spacing={4}
          alignItems='center'
        >
          <div style={{ flex: "1 1 50%" }}>
            <NewsletterHeading as='h2' id='newsletter-heading'>
              {t("newsletter_heading")}
            </NewsletterHeading>
          </div>
          <form
            onSubmit={handleSubmit}
            style={{
              flex: "1 1 50%",
              display: "flex",
              gap: "0.5rem",
              width: "100%",
            }}
          >
            <NewsletterInput
              type='email'
              placeholder={t("newsletter_placeholder")}
              required
              aria-label={t("newsletter_aria_label")}
              fullWidth
            />
            <SubscribeButton
              type='submit'
              variant='contained'
              aria-label={t("newsletter_button")}
              endIcon={<SendIcon />}
            >
              {t("newsletter_button")}
            </SubscribeButton>
          </form>
        </Stack>
      </Container>
    </NewsletterContainer>
  );
}

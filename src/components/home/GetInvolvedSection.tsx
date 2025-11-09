import { Container, Typography, Stack } from "@mui/material";
import { styled } from "@mui/material/styles";
import { Link } from "react-router-dom";
import { useTranslation } from "react-i18next";

const GetInvolvedContainer = styled("section")({
  backgroundColor: "#004c91",
  position: "relative",
  overflow: "hidden",
});

const SectionHeading = styled(Typography)(({ theme }) => ({
  fontSize: "2.5rem",
  fontWeight: 600,
  color: "white",
  marginBottom: theme.spacing(6),
  textAlign: "center",
  [theme.breakpoints.up("md")]: {
    fontSize: "3rem",
  },
}));

const VolunteerImage = styled("img")(({ theme }) => ({
  width: "48%",
  height: "376px",
  objectFit: "cover",
  borderRadius: theme.spacing(2),
}));

const CallToActionText = styled(Typography)(({ theme }) => ({
  fontSize: "1.75rem",
  fontWeight: 600,
  color: "white",
  marginBottom: theme.spacing(4),
  lineHeight: 1.4,
  textTransform: "capitalize",
  [theme.breakpoints.up("md")]: {
    fontSize: "2.5rem",
  },
}));

const GetInvolvedButton = styled(Link)(({ theme }) => ({
  backgroundColor: "#f6d469",
  color: "#351c42",
  fontWeight: 700,
  fontSize: "1.25rem",
  textTransform: "capitalize",
  padding: theme.spacing(1.5, 4),
  borderRadius: "100px",
  textDecoration: "none",
  display: "inline-block",
  "&:hover": {
    backgroundColor: "#f5c943",
  },
  "&:focus": {
    outline: "3px solid white",
    outlineOffset: "2px",
  },
}));

const volunteerImage1 =
  "https://images.unsplash.com/photo-1559027615-cd4628902d4a?w=400";
const volunteerImage2 =
  "https://images.unsplash.com/photo-1488521787991-ed7bbaae773c?w=400";

export default function GetInvolvedSection() {
  const { t } = useTranslation();

  return (
    <GetInvolvedContainer
      aria-labelledby='get-involved-heading'
      style={{ paddingTop: "5rem", paddingBottom: "5rem" }}
    >
      <Container maxWidth='lg'>
        <SectionHeading as='h2' id='get-involved-heading'>
          {t("get_involved_heading")}
        </SectionHeading>

        <Stack
          direction={{ xs: "column", md: "row" }}
          spacing={4}
          alignItems='center'
        >
          <div style={{ flex: "1 1 50%" }}>
            <Stack direction='row' spacing={2}>
              <VolunteerImage
                src={volunteerImage1}
                alt={t("get_involved_alt_1")}
              />
              <VolunteerImage
                src={volunteerImage2}
                alt={t("get_involved_alt_2")}
              />
            </Stack>
          </div>
          <div style={{ flex: "1 1 50%" }}>
            <CallToActionText as='p'>{t("get_involved_cta")}</CallToActionText>
            <GetInvolvedButton
              to='/get-involved'
              aria-label={t("get_involved_button")}
            >
              {t("get_involved_button")}
            </GetInvolvedButton>
          </div>
        </Stack>
      </Container>
    </GetInvolvedContainer>
  );
}

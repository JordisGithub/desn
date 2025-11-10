import { useState } from "react";
import { Container, Typography, Stack, Button } from "@mui/material";
import { styled } from "@mui/material/styles";
import { Link } from "react-router-dom";
import { useTranslation } from "react-i18next";
import DonationPaymentModal from "../payment/DonationPaymentModal";
import getinvolved1 from "../../assets/home/getinvolved1.jpg";
import getinvolved2 from "../../assets/home/getinvolved2.jpg";

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
  [theme.breakpoints.down("md")]: {
    height: "280px",
  },
  [theme.breakpoints.down("sm")]: {
    width: "100%",
    height: "200px",
  },
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
    transform: "translateY(-2px)",
    boxShadow: "0px 8px 16px rgba(0, 0, 0, 0.2)",
  },
  "&:focus": {
    outline: "3px solid white",
    outlineOffset: "2px",
  },
  transition: "all 0.3s ease",
  [theme.breakpoints.down("sm")]: {
    width: "100%",
    textAlign: "center",
  },
}));

const DonateBtn = styled(Button)(({ theme }) => ({
  backgroundColor: "#f6d469",
  color: "#2b2b2b",
  fontWeight: 600,
  fontSize: "1.25rem",
  textTransform: "capitalize",
  padding: theme.spacing(1.5, 3),
  borderRadius: "100px",
  "&:hover": {
    backgroundColor: "#f5c943",
    transform: "translateY(-2px)",
    boxShadow: "0px 8px 16px rgba(0, 0, 0, 0.2)",
  },
  "&:focus": {
    outline: "3px solid white",
    outlineOffset: "2px",
  },
  transition: "all 0.3s ease",
  [theme.breakpoints.down("sm")]: {
    width: "100%",
  },
}));

export default function GetInvolvedSection() {
  const { t } = useTranslation();
  const [donationModalOpen, setDonationModalOpen] = useState(false);

  return (
    <GetInvolvedContainer
      aria-labelledby='get-involved-heading'
      style={{ paddingTop: "5rem", paddingBottom: "5rem" }}
    >
      <Container maxWidth='xl' sx={{ px: { xs: 2, sm: 3, md: 6 } }}>
        <SectionHeading as='h2' id='get-involved-heading'>
          {t("get_involved_heading")}
        </SectionHeading>

        <Stack
          direction={{ xs: "column", md: "row" }}
          spacing={4}
          alignItems='center'
        >
          <div style={{ flex: "1 1 50%", width: "100%" }}>
            <Stack direction={{ xs: "column", sm: "row" }} spacing={2}>
              <VolunteerImage
                src={getinvolved1}
                alt={t("get_involved_alt_1")}
                loading='lazy'
              />
              <VolunteerImage
                src={getinvolved2}
                alt={t("get_involved_alt_2")}
                loading='lazy'
              />
            </Stack>
          </div>
          <div style={{ flex: "1 1 50%" }}>
            <CallToActionText as='p'>{t("get_involved_cta")}</CallToActionText>
            <Stack
              direction={{ xs: "column", sm: "row" }}
              spacing={2}
              sx={{ flexWrap: "wrap" }}
            >
              <GetInvolvedButton
                to='/get-involved'
                aria-label={t("get_involved_button")}
              >
                {t("get_involved_button")}
              </GetInvolvedButton>
              <DonateBtn
                onClick={() => setDonationModalOpen(true)}
                aria-label='Donate Now'
              >
                Donate
              </DonateBtn>
            </Stack>
          </div>
        </Stack>
      </Container>

      <DonationPaymentModal
        open={donationModalOpen}
        onClose={() => setDonationModalOpen(false)}
      />
    </GetInvolvedContainer>
  );
}

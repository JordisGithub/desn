import {
  Container,
  Typography,
  Box,
  Card,
  CardContent,
  Button,
} from "@mui/material";
import { styled } from "@mui/material/styles";
import { useTranslation } from "react-i18next";
import LocationOnIcon from "@mui/icons-material/LocationOn";
import DirectionsIcon from "@mui/icons-material/Directions";
import AccessibleIcon from "@mui/icons-material/Accessible";

const MapSection = styled("section")(({ theme }) => ({
  backgroundColor: "white",
  paddingTop: theme.spacing(12),
  paddingBottom: theme.spacing(12),
}));

const SectionTitle = styled(Typography)(({ theme }) => ({
  fontSize: "3rem",
  fontWeight: 400,
  color: "#004c91",
  fontFamily: '"Poppins", "Roboto", sans-serif',
  textAlign: "center",
  marginBottom: theme.spacing(3),
  [theme.breakpoints.down("sm")]: {
    fontSize: "2.5rem",
  },
}));

const SectionDescription = styled(Typography)(({ theme }) => ({
  fontSize: "1.25rem",
  color: "#4a5565",
  lineHeight: 1.625,
  textAlign: "center",
  maxWidth: "714px",
  margin: "0 auto",
  marginBottom: theme.spacing(6),
}));

const MapContainer = styled(Box)(({ theme }) => ({
  display: "grid",
  gridTemplateColumns: "1fr 1fr",
  gap: theme.spacing(6),
  [theme.breakpoints.down("md")]: {
    gridTemplateColumns: "1fr",
  },
}));

const MapFrame = styled(Box)(({ theme }) => ({
  width: "100%",
  height: "600px",
  border: "2px solid #e5e7eb",
  borderRadius: theme.spacing(2),
  overflow: "hidden",
  backgroundColor: "#f3f4f6",
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

const CardHeader = styled(Box)(({ theme }) => ({
  display: "flex",
  alignItems: "center",
  gap: theme.spacing(3),
  marginBottom: theme.spacing(2),
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
  fontSize: "1.5rem",
  fontWeight: 400,
  color: "#004c91",
  fontFamily: '"Poppins", "Roboto", sans-serif',
});

const AddressText = styled(Typography)({
  fontSize: "1.125rem",
  color: "#364153",
  lineHeight: 1.625,
  marginBottom: "0.5rem",
});

const DirectionsButton = styled(Button)(({ theme }) => ({
  backgroundColor: "#004c91",
  color: "white",
  fontWeight: 500,
  fontSize: "1.125rem",
  padding: theme.spacing(2, 4),
  borderRadius: theme.spacing(1.75),
  textTransform: "none",
  width: "100%",
  marginTop: theme.spacing(3),
  "&:hover": {
    backgroundColor: "#003d73",
  },
  "&:focus": {
    outline: "3px solid #f6d469",
    outlineOffset: "2px",
  },
}));

const AccessibilityNote = styled(Box)(({ theme }) => ({
  display: "flex",
  gap: theme.spacing(2),
  padding: theme.spacing(3),
  backgroundColor: "#f9fafb",
  borderRadius: theme.spacing(2),
  border: "2px solid #e5e7eb",
}));

export default function MapLocationSection() {
  const { t } = useTranslation();

  return (
    <MapSection id='map-section' aria-labelledby='map-heading'>
      <Container maxWidth='xl'>
        <SectionTitle id='map-heading'>{t("contact.map.title")}</SectionTitle>
        <SectionDescription>{t("contact.map.description")}</SectionDescription>

        <MapContainer>
          {/* Map */}
          <MapFrame>
            <iframe
              src='https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3533.1234567890!2d85.3240!3d27.6710!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2zMjfCsDQwJzE1LjYiTiA4NcKwMTknMjYuNCJF!5e0!3m2!1sen!2snp!4v1234567890'
              width='100%'
              height='100%'
              style={{ border: 0 }}
              allowFullScreen
              loading='lazy'
              referrerPolicy='no-referrer-when-downgrade'
              title={t("contact.map.iframe_title")}
            />
          </MapFrame>

          {/* Location Details */}
          <Box>
            {/* Office Address Card */}
            <InfoCard>
              <CardContent sx={{ padding: 0 }}>
                <CardHeader>
                  <IconBg bgColor='rgba(0, 76, 145, 0.1)'>
                    <LocationOnIcon sx={{ fontSize: 32, color: "#004c91" }} />
                  </IconBg>
                  <CardTitle>{t("contact.map.office_title")}</CardTitle>
                </CardHeader>

                <Box sx={{ marginTop: 2 }}>
                  <AddressText>{t("contact.map.office_name")}</AddressText>
                  <AddressText>
                    {t("contact.cards.location.address1")}
                  </AddressText>
                  <AddressText>{t("contact.map.province")}</AddressText>
                  <AddressText>
                    {t("contact.cards.location.address2")}
                  </AddressText>
                </Box>
              </CardContent>
            </InfoCard>

            {/* Getting Here Card */}
            <InfoCard>
              <CardContent sx={{ padding: 0 }}>
                <CardHeader>
                  <IconBg bgColor='rgba(0, 167, 127, 0.1)'>
                    <DirectionsIcon sx={{ fontSize: 32, color: "#00a77f" }} />
                  </IconBg>
                  <CardTitle>{t("contact.map.directions_title")}</CardTitle>
                </CardHeader>

                <Typography
                  sx={{
                    fontSize: "1.125rem",
                    color: "#364153",
                    lineHeight: 1.625,
                    marginTop: 2,
                  }}
                >
                  {t("contact.map.directions_description")}
                </Typography>

                <DirectionsButton
                  href='https://maps.google.com/?q=Mahalaxmi+Municipality+Lalitpur+Nepal'
                  startIcon={<DirectionsIcon />}
                  onClick={() =>
                    window.open(
                      "https://maps.google.com/?q=Mahalaxmi+Municipality+Lalitpur+Nepal",
                      "_blank",
                      "noopener,noreferrer"
                    )
                  }
                >
                  {t("contact.map.get_directions")}
                </DirectionsButton>
              </CardContent>
            </InfoCard>

            {/* Accessibility Note */}
            <AccessibilityNote>
              <AccessibleIcon
                sx={{ fontSize: 24, color: "#004c91", flexShrink: 0 }}
              />
              <Box>
                <Typography
                  sx={{
                    fontSize: "1.25rem",
                    fontWeight: 500,
                    color: "#004c91",
                    fontFamily: '"Poppins", "Roboto", sans-serif',
                    marginBottom: 1.5,
                  }}
                >
                  {t("contact.map.accessibility_title")}
                </Typography>
                <Typography
                  sx={{
                    fontSize: "1.125rem",
                    color: "#364153",
                    lineHeight: 1.625,
                  }}
                >
                  {t("contact.map.accessibility_description")}
                </Typography>
              </Box>
            </AccessibilityNote>
          </Box>
        </MapContainer>
      </Container>
    </MapSection>
  );
}

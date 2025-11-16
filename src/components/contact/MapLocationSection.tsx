import { Container, Typography, Box, Button } from "@mui/material";
import { styled } from "@mui/material/styles";
import { useTranslation } from "react-i18next";
import DirectionsIcon from "@mui/icons-material/Directions";
import AccessibleIcon from "@mui/icons-material/Accessible";

const MapSection = styled("section")(({ theme }) => ({
  backgroundColor: "white",
  paddingTop: theme.spacing(12),
  paddingBottom: theme.spacing(12),
  [theme.breakpoints.down("sm")]: {
    paddingTop: theme.spacing(6),
    paddingBottom: theme.spacing(6),
  },
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
})) as typeof Typography;

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
    gap: theme.spacing(4),
    // Maintain source order (text first, map second) in mobile view
  },
}));

// Screen reader only utility class
const srOnlyStyles = {
  position: "absolute",
  width: "1px",
  height: "1px",
  padding: 0,
  margin: "-1px",
  overflow: "hidden",
  clip: "rect(0, 0, 0, 0)",
  whiteSpace: "nowrap",
  borderWidth: 0,
} as const;

const MapFrame = styled(Box)(({ theme }) => ({
  width: "100%",
  height: "600px",
  border: "2px solid #e5e7eb",
  borderRadius: theme.spacing(2),
  overflow: "hidden",
  backgroundColor: "#f3f4f6",
  [theme.breakpoints.down("md")]: {
    height: "450px",
  },
  [theme.breakpoints.down("sm")]: {
    height: "350px",
  },
}));

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
  [theme.breakpoints.down("sm")]: {
    fontSize: "1rem",
    padding: theme.spacing(1.5, 3),
  },
}));

const AccessibilityNote = styled(Box)(({ theme }) => ({
  display: "flex",
  gap: theme.spacing(2),
  padding: theme.spacing(3),
  backgroundColor: "#f9fafb",
  borderRadius: theme.spacing(2),
  border: "2px solid #e5e7eb",
  [theme.breakpoints.down("sm")]: {
    flexDirection: "column",
    padding: theme.spacing(2.5),
  },
}));

export default function MapLocationSection() {
  const { t } = useTranslation();

  // Direct Google Maps directions link with URL-encoded address
  const directionsUrl =
    "https://www.google.com/maps/dir/?api=1&destination=Siddhi%20Road%2C%20Lalitpur%2044700%2C%20Nepal";

  return (
    <MapSection id='map-section' aria-labelledby='map-heading'>
      <Container maxWidth='xl'>
        <SectionTitle component='h2' variant='h2' id='map-heading'>
          {t("contact.map.title")}
        </SectionTitle>
        <SectionDescription>{t("contact.map.description")}</SectionDescription>

        <MapContainer>
          {/* NON-VISUAL COMPONENT (NVC) - Primary accessible content */}
          <Box>
            <Typography
              component='h3'
              sx={{
                fontSize: { xs: "1.75rem", sm: "2rem" },
                fontWeight: 500,
                color: "#004c91",
                fontFamily: '"Poppins", "Roboto", sans-serif',
                marginBottom: 3,
              }}
            >
              {t("contact.map.location_details_heading")}
            </Typography>

            <Box
              component='ul'
              sx={{
                listStyle: "none",
                padding: 0,
                margin: 0,
                display: "flex",
                flexDirection: "column",
                gap: 3,
              }}
            >
              {/* Full Address */}
              <Box component='li'>
                <Typography
                  component='strong'
                  sx={{
                    fontSize: { xs: "1.125rem", sm: "1.25rem" },
                    fontWeight: 600,
                    color: "#004c91",
                    display: "block",
                    marginBottom: 1,
                  }}
                >
                  {t("contact.map.full_address_label")}
                </Typography>
                <Typography
                  sx={{
                    fontSize: { xs: "1rem", sm: "1.125rem" },
                    color: "#364153",
                    lineHeight: 1.75,
                  }}
                >
                  {t("contact.map.office_name")}
                  <br />
                  {t("contact.cards.location.address1")}
                  <br />
                  {t("contact.cards.location.address2")}
                </Typography>
              </Box>

              {/* Key Landmark */}
              <Box component='li'>
                <Typography
                  component='strong'
                  sx={{
                    fontSize: { xs: "1.125rem", sm: "1.25rem" },
                    fontWeight: 600,
                    color: "#004c91",
                    display: "block",
                    marginBottom: 1,
                  }}
                >
                  {t("contact.map.landmark_label")}
                </Typography>
                <Typography
                  sx={{
                    fontSize: { xs: "1rem", sm: "1.125rem" },
                    color: "#364153",
                    lineHeight: 1.75,
                  }}
                >
                  {t("contact.map.landmark_description")}
                </Typography>
              </Box>

              {/* Transit Details */}
              <Box component='li'>
                <Typography
                  component='strong'
                  sx={{
                    fontSize: { xs: "1.125rem", sm: "1.25rem" },
                    fontWeight: 600,
                    color: "#004c91",
                    display: "block",
                    marginBottom: 1,
                  }}
                >
                  {t("contact.map.transit_label")}
                </Typography>
                <Typography
                  sx={{
                    fontSize: { xs: "1rem", sm: "1.125rem" },
                    color: "#364153",
                    lineHeight: 1.75,
                  }}
                >
                  {t("contact.map.transit_description")}
                </Typography>
              </Box>

              {/* Guided Directions */}
              <Box component='li'>
                <Typography
                  component='strong'
                  sx={{
                    fontSize: { xs: "1.125rem", sm: "1.25rem" },
                    fontWeight: 600,
                    color: "#004c91",
                    display: "block",
                    marginBottom: 1,
                  }}
                >
                  {t("contact.map.guided_directions_label")}
                </Typography>
                <DirectionsButton
                  href={directionsUrl}
                  target='_blank'
                  rel='noopener noreferrer'
                  startIcon={<DirectionsIcon />}
                  aria-describedby='directions-tip'
                  sx={{ marginTop: 1 }}
                >
                  {t("contact.map.get_directions")}
                </DirectionsButton>
                <Typography
                  id='directions-tip'
                  component='span'
                  sx={srOnlyStyles}
                >
                  {t("contact.map.directions_tip")}
                </Typography>
              </Box>
            </Box>

            {/* Accessibility Note */}
            <AccessibilityNote
              sx={{ marginTop: 4 }}
              role='note'
              aria-labelledby='accessibility-heading'
            >
              <AccessibleIcon
                sx={{ fontSize: 24, color: "#004c91", flexShrink: 0 }}
                aria-hidden='true'
              />
              <Box>
                <Typography
                  id='accessibility-heading'
                  component='h4'
                  sx={{
                    fontSize: { xs: "1.125rem", sm: "1.25rem" },
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
                    fontSize: { xs: "1rem", sm: "1.125rem" },
                    color: "#364153",
                    lineHeight: 1.625,
                  }}
                >
                  {t("contact.map.accessibility_description")}
                </Typography>
              </Box>
            </AccessibilityNote>

            <Typography
              sx={{
                fontSize: { xs: "1rem", sm: "1.125rem" },
                color: "#364153",
                lineHeight: 1.75,
                marginTop: 4,
                fontStyle: "italic",
              }}
            >
              {t("contact.map.visual_reference")}
            </Typography>
          </Box>

          {/* OPTIONAL VISUAL COMPONENT (OVC) - Visual representation for sighted users */}
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
              role='application'
            />
          </MapFrame>
        </MapContainer>
      </Container>
    </MapSection>
  );
}

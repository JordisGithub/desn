import { Container, Typography, Box, Button } from "@mui/material";
import { styled } from "@mui/material/styles";
import { useTranslation } from "react-i18next";
import DirectionsIcon from "@mui/icons-material/Directions";
import AccessibleIcon from "@mui/icons-material/Accessible";
import OpenInNewIcon from "@mui/icons-material/OpenInNew";

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

const DirectionsButton = styled(Button, {
  shouldForwardProp: (prop) =>
    prop !== "disableRipple" && prop !== "disableTouchRipple",
})<{
  href?: string;
  component?: React.ElementType;
  target?: string;
  rel?: string;
}>(({ theme }) => ({
  backgroundColor: "#004c91",
  color: "white",
  fontWeight: 500,
  fontSize: "1.125rem",
  padding: theme.spacing(2, 4),
  borderRadius: theme.spacing(1.75),
  textTransform: "none",
  width: "100%",
  marginTop: theme.spacing(3),
  "& .MuiTouchRipple-root": {
    display: "none",
  },
  "&:hover": {
    backgroundColor: "#003d73",
    color: "white",
  },
  "&:focus": {
    outline: "4px solid #004c91",
    outlineOffset: "3px",
    color: "white",
    boxShadow: "0 0 0 7px rgba(0, 76, 145, 0.3)",
  },
  "&:focus-visible": {
    outline: "4px solid #004c91",
    outlineOffset: "3px",
    color: "white",
    boxShadow: "0 0 0 7px rgba(0, 76, 145, 0.3)",
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

        {/* Accessible Data Table */}
        <Box sx={{ marginBottom: 6 }}>
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
            {t("contact.map.table_heading")}
          </Typography>

          <Box
            component='table'
            sx={{
              width: "100%",
              borderCollapse: "collapse",
              border: "2px solid #004c91",
              backgroundColor: "white",
              "& th, & td": {
                border: "1px solid #d1d5dc",
                padding: { xs: 2, sm: 3 },
                textAlign: "left",
              },
              "& th": {
                backgroundColor: "#f9fafb",
                color: "#004c91",
                fontWeight: 600,
                fontSize: { xs: "1rem", sm: "1.125rem" },
              },
              "& td": {
                color: "#364153",
                fontSize: { xs: "0.875rem", sm: "1rem" },
                lineHeight: 1.6,
              },
            }}
          >
            <Box component='thead'>
              <Box component='tr'>
                <Box component='th' scope='col'>
                  {t("contact.map.table_feature")}
                </Box>
                <Box component='th' scope='col'>
                  {t("contact.map.table_details")}
                </Box>
              </Box>
            </Box>
            <Box component='tbody'>
              <Box component='tr'>
                <Box component='th' scope='row'>
                  {t("contact.map.table_full_address")}
                </Box>
                <Box component='td'>
                  {t("contact.map.table_full_address_value")}
                </Box>
              </Box>
              <Box component='tr'>
                <Box component='th' scope='row'>
                  {t("contact.map.table_landmark")}
                </Box>
                <Box component='td'>
                  {t("contact.map.table_landmark_value")}
                </Box>
              </Box>
              <Box component='tr'>
                <Box component='th' scope='row'>
                  {t("contact.map.table_nearest_transit")}
                </Box>
                <Box component='td'>
                  {t("contact.map.table_nearest_transit_value")}
                </Box>
              </Box>
              <Box component='tr'>
                <Box component='th' scope='row'>
                  {t("contact.map.table_ride_options")}
                </Box>
                <Box component='td'>
                  {t("contact.map.table_ride_options_value")}
                </Box>
              </Box>
              <Box component='tr'>
                <Box component='th' scope='row'>
                  {t("contact.map.table_directions")}
                </Box>
                <Box component='td'>
                  {t("contact.map.table_directions_value")}
                </Box>
              </Box>
              <Box component='tr'>
                <Box component='th' scope='row'>
                  {t("contact.map.table_map_link")}
                </Box>
                <Box component='td'>
                  <Box
                    component='a'
                    href={directionsUrl}
                    target='_blank'
                    rel='noopener noreferrer'
                    sx={{
                      color: "#004c91",
                      textDecoration: "underline",
                      "&:hover": {
                        color: "#003d73",
                      },
                      "&:focus": {
                        outline: "3px solid #004c91",
                        outlineOffset: "2px",
                      },
                    }}
                  >
                    {t("contact.map.table_map_link_value")}
                  </Box>
                </Box>
              </Box>
            </Box>
          </Box>
        </Box>

        {/* Accessible Features Section */}
        <Box sx={{ marginBottom: 6 }}>
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
            {t("contact.map.accessibility_features_heading")}
          </Typography>
          <Box
            component='ul'
            sx={{
              listStyle: "disc",
              paddingLeft: 4,
              margin: 0,
              display: "flex",
              flexDirection: "column",
              gap: 2,
            }}
          >
            <Box component='li'>
              <Typography
                sx={{
                  fontSize: { xs: "1rem", sm: "1.125rem" },
                  color: "#364153",
                  lineHeight: 1.75,
                }}
              >
                {t("contact.map.accessibility_features.structured_data")}
              </Typography>
            </Box>
            <Box component='li'>
              <Typography
                sx={{
                  fontSize: { xs: "1rem", sm: "1.125rem" },
                  color: "#364153",
                  lineHeight: 1.75,
                }}
              >
                {t("contact.map.accessibility_features.clear_headings")}
              </Typography>
            </Box>
            <Box component='li'>
              <Typography
                sx={{
                  fontSize: { xs: "1rem", sm: "1.125rem" },
                  color: "#364153",
                  lineHeight: 1.75,
                }}
              >
                {t("contact.map.accessibility_features.direct_map_link")}
              </Typography>
            </Box>
            <Box component='li'>
              <Typography
                sx={{
                  fontSize: { xs: "1rem", sm: "1.125rem" },
                  color: "#364153",
                  lineHeight: 1.75,
                }}
              >
                {t("contact.map.accessibility_features.keyboard_access")}
              </Typography>
            </Box>
            <Box component='li'>
              <Typography
                sx={{
                  fontSize: { xs: "1rem", sm: "1.125rem" },
                  color: "#364153",
                  lineHeight: 1.75,
                }}
              >
                {t("contact.map.accessibility_features.text_landmarks")}
              </Typography>
            </Box>
            <Box component='li'>
              <Typography
                sx={{
                  fontSize: { xs: "1rem", sm: "1.125rem" },
                  color: "#364153",
                  lineHeight: 1.75,
                }}
              >
                {t("contact.map.accessibility_features.user_guidance")}
              </Typography>
            </Box>
          </Box>
        </Box>

        {/* Known Limitations Section */}
        <Box sx={{ marginBottom: 6 }}>
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
            {t("contact.map.known_limitations_heading")}
          </Typography>
          <Box
            component='ul'
            sx={{
              listStyle: "disc",
              paddingLeft: 4,
              margin: 0,
              display: "flex",
              flexDirection: "column",
              gap: 2,
            }}
          >
            <Box component='li'>
              <Typography
                sx={{
                  fontSize: { xs: "1rem", sm: "1.125rem" },
                  color: "#364153",
                  lineHeight: 1.75,
                }}
              >
                {t("contact.map.known_limitations.embedded_map")}
              </Typography>
            </Box>
            <Box component='li'>
              <Typography
                sx={{
                  fontSize: { xs: "1rem", sm: "1.125rem" },
                  color: "#364153",
                  lineHeight: 1.75,
                }}
              >
                {t("contact.map.known_limitations.screen_reader")}
              </Typography>
            </Box>
            <Box component='li'>
              <Typography
                sx={{
                  fontSize: { xs: "1rem", sm: "1.125rem" },
                  color: "#364153",
                  lineHeight: 1.75,
                }}
              >
                {t("contact.map.known_limitations.limited_interactivity")}
              </Typography>
            </Box>
            <Box component='li'>
              <Typography
                sx={{
                  fontSize: { xs: "1rem", sm: "1.125rem" },
                  color: "#364153",
                  lineHeight: 1.75,
                }}
              >
                {t("contact.map.known_limitations.no_live_directions")}
              </Typography>
            </Box>
            <Box component='li'>
              <Typography
                sx={{
                  fontSize: { xs: "1rem", sm: "1.125rem" },
                  color: "#364153",
                  lineHeight: 1.75,
                }}
              >
                {t("contact.map.known_limitations.vendor_updates")}
              </Typography>
            </Box>
          </Box>
        </Box>

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
                  component='a'
                  target='_blank'
                  rel='noopener noreferrer'
                  startIcon={<DirectionsIcon />}
                  endIcon={<OpenInNewIcon />}
                  disableRipple
                  disableTouchRipple
                  sx={{ marginTop: 1 }}
                >
                  Get Directions to DESN Office
                </DirectionsButton>
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
              title='The interactive Google Map provides precise location details for the DESN office. It is located on Siddhi Road, Mahalaxmi Municipality, Lalitpur 44700, Nepal. Refer to the location data table for complete location details.'
              lang='en'
            />
          </MapFrame>
        </MapContainer>
      </Container>
    </MapSection>
  );
}

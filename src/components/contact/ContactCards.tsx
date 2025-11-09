import { Container, Typography, Box, Card, CardContent } from "@mui/material";
import { styled } from "@mui/material/styles";
import { useTranslation } from "react-i18next";
import EmailIcon from "@mui/icons-material/Email";
import PhoneIcon from "@mui/icons-material/Phone";
import LocationOnIcon from "@mui/icons-material/LocationOn";
import LanguageIcon from "@mui/icons-material/Language";

const CardsSection = styled("section")(({ theme }) => ({
  backgroundColor: "white",
  paddingTop: theme.spacing(12),
  paddingBottom: theme.spacing(12),
}));

const CardsContainer = styled(Box)(({ theme }) => ({
  display: "grid",
  gridTemplateColumns: "repeat(4, 1fr)",
  gap: theme.spacing(4),
  [theme.breakpoints.down("lg")]: {
    gridTemplateColumns: "repeat(2, 1fr)",
  },
  [theme.breakpoints.down("sm")]: {
    gridTemplateColumns: "1fr",
  },
}));

const ContactCard = styled(Card)(({ theme }) => ({
  border: "2px solid #e5e7eb",
  borderRadius: theme.spacing(2),
  boxShadow: "none",
  padding: theme.spacing(5),
  height: "100%",
  transition: "all 0.3s ease",
  "&:hover": {
    boxShadow: "0px 8px 24px rgba(0, 0, 0, 0.12)",
    transform: "translateY(-4px)",
  },
  "&:focus-within": {
    outline: "3px solid #004c91",
    outlineOffset: "2px",
  },
}));

const IconContainer = styled(Box, {
  shouldForwardProp: (prop) => prop !== "bgColor",
})<{ bgColor: string }>(({ bgColor, theme }) => ({
  width: "80px",
  height: "80px",
  borderRadius: theme.spacing(2),
  backgroundColor: bgColor,
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  marginBottom: theme.spacing(3),
}));

const CardTitle = styled(Typography)(({ theme }) => ({
  fontSize: "1.5rem",
  fontWeight: 400,
  color: "#004c91",
  fontFamily: '"Poppins", "Roboto", sans-serif',
  marginBottom: theme.spacing(2),
}));

const CardDescription = styled(Typography)({
  fontSize: "1.125rem",
  color: "#4a5565",
  lineHeight: 1.556,
  marginBottom: "1rem",
});

const ContactInfo = styled(Typography)({
  fontSize: "1.125rem",
  color: "#101828",
  lineHeight: 1.556,
  fontWeight: 400,
  "&:not(:last-child)": {
    marginBottom: "0.5rem",
  },
});

const SecondaryInfo = styled(Typography)({
  fontSize: "1.125rem",
  color: "#4a5565",
  lineHeight: 1.556,
});

export default function ContactCards() {
  const { t } = useTranslation();

  return (
    <CardsSection aria-labelledby='contact-methods-heading'>
      <Container maxWidth='xl'>
        <Typography
          id='contact-methods-heading'
          variant='h2'
          sx={{
            fontSize: "2.5rem",
            fontWeight: 400,
            color: "#004c91",
            fontFamily: '"Poppins", "Roboto", sans-serif',
            textAlign: "center",
            marginBottom: 6,
            visibility: "hidden",
            position: "absolute",
          }}
        >
          {t("contact.cards.heading")}
        </Typography>

        <CardsContainer>
          {/* Email Card */}
          <Box>
            <ContactCard>
              <CardContent sx={{ padding: 0 }}>
                <IconContainer bgColor='rgba(0, 76, 145, 0.1)'>
                  <EmailIcon sx={{ fontSize: 40, color: "#004c91" }} />
                </IconContainer>
                <CardTitle>{t("contact.cards.email.title")}</CardTitle>
                <CardDescription>
                  {t("contact.cards.email.description")}
                </CardDescription>
                <ContactInfo>
                  <a
                    href='mailto:disabilityemp@gmail.com'
                    style={{
                      color: "#101828",
                      textDecoration: "none",
                    }}
                  >
                    disabilityemp@gmail.com
                  </a>
                </ContactInfo>
                <SecondaryInfo>
                  <a
                    href='mailto:thekopkrish@gmail.com'
                    style={{
                      color: "#4a5565",
                      textDecoration: "none",
                    }}
                  >
                    thekopkrish@gmail.com
                  </a>
                </SecondaryInfo>
              </CardContent>
            </ContactCard>
          </Box>

          {/* Phone Card */}
          <Box>
            <ContactCard>
              <CardContent sx={{ padding: 0 }}>
                <IconContainer bgColor='rgba(0, 167, 127, 0.1)'>
                  <PhoneIcon sx={{ fontSize: 40, color: "#00a77f" }} />
                </IconContainer>
                <CardTitle>{t("contact.cards.phone.title")}</CardTitle>
                <CardDescription>
                  {t("contact.cards.phone.description")}
                </CardDescription>
                <ContactInfo>
                  <a
                    href='tel:+977-15709205'
                    style={{
                      color: "#101828",
                      textDecoration: "none",
                    }}
                  >
                    +977-15709205
                  </a>
                </ContactInfo>
                <SecondaryInfo>
                  <a
                    href='tel:+977-9849873868'
                    style={{
                      color: "#4a5565",
                      textDecoration: "none",
                    }}
                  >
                    +977-9849873868
                  </a>
                </SecondaryInfo>
              </CardContent>
            </ContactCard>
          </Box>

          {/* Location Card */}
          <Box>
            <ContactCard>
              <CardContent sx={{ padding: 0 }}>
                <IconContainer bgColor='rgba(150, 85, 149, 0.1)'>
                  <LocationOnIcon sx={{ fontSize: 40, color: "#965595" }} />
                </IconContainer>
                <CardTitle>{t("contact.cards.location.title")}</CardTitle>
                <CardDescription>
                  {t("contact.cards.location.description")}
                </CardDescription>
                <ContactInfo>
                  {t("contact.cards.location.address1")}
                </ContactInfo>
                <SecondaryInfo>
                  {t("contact.cards.location.address2")}
                </SecondaryInfo>
              </CardContent>
            </ContactCard>
          </Box>

          {/* Website Card */}
          <Box>
            <ContactCard>
              <CardContent sx={{ padding: 0 }}>
                <IconContainer bgColor='rgba(246, 212, 105, 0.1)'>
                  <LanguageIcon sx={{ fontSize: 40, color: "#f6d469" }} />
                </IconContainer>
                <CardTitle>{t("contact.cards.website.title")}</CardTitle>
                <CardDescription>
                  {t("contact.cards.website.description")}
                </CardDescription>
                <ContactInfo>
                  <a
                    href='http://www.desnepal.com'
                    target='_blank'
                    rel='noopener noreferrer'
                    style={{
                      color: "#101828",
                      textDecoration: "none",
                    }}
                  >
                    www.desnepal.com
                  </a>
                </ContactInfo>
              </CardContent>
            </ContactCard>
          </Box>
        </CardsContainer>
      </Container>
    </CardsSection>
  );
}

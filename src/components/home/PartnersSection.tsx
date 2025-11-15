import { Container, Typography } from "@mui/material";
import { styled } from "@mui/material/styles";
import { useTranslation } from "react-i18next";
// import { imgNationalFederationLogo } from "../../constants/figmaAssets";
import abilis from "../../assets/grantors/Abilis.png";
import apnicLogo from "../../assets/grantors/APNIC.png";
import governmentNepalLogo from "../../assets/grantors/GvmtNepal.png";
import khyentseLogo from "../../assets/grantors/khyentse_foundation.png";
import meedanLogo from "../../assets/grantors/Meedan.svg";
import undpLogo from "../../assets/grantors/UNDP.png";

const PartnersContainer = styled("section")({
  background: "linear-gradient(135deg, #004c91 0%, #003d73 50%, #002b52 100%)",
  position: "relative",
  "&::before": {
    content: '""',
    position: "absolute",
    top: 0,
    left: 0,
    right: 0,
    height: "3px",
    background: "linear-gradient(90deg, transparent, #f6d469, transparent)",
  },
});

const SectionHeading = styled(Typography)(({ theme }) => ({
  fontSize: "2rem",
  fontWeight: 700,
  color: "white",
  marginBottom: theme.spacing(2),
  textAlign: "center",
  textTransform: "capitalize",
  letterSpacing: "-0.01em",
  fontFamily: "Poppins, sans-serif",
  [theme.breakpoints.up("md")]: {
    fontSize: "2.5rem",
  },
  [theme.breakpoints.down("sm")]: {
    fontSize: "1.625rem",
  },
}));

const SectionSubheading = styled(Typography)(({ theme }) => ({
  fontSize: "1.0625rem",
  fontWeight: 400,
  color: "rgba(255, 255, 255, 0.9)",
  textAlign: "center",
  maxWidth: "600px",
  margin: "0 auto",
  marginBottom: theme.spacing(5),
  lineHeight: 1.6,
  [theme.breakpoints.down("md")]: {
    fontSize: "1rem",
    marginBottom: theme.spacing(4),
    maxWidth: "90%",
  },
  [theme.breakpoints.down("sm")]: {
    fontSize: "0.9375rem",
    marginBottom: theme.spacing(3.5),
  },
}));

const PartnersGrid = styled("div")(({ theme }) => ({
  display: "grid",
  gridTemplateColumns: "repeat(2, 1fr)",
  gap: theme.spacing(2.5),
  maxWidth: "1100px",
  margin: "0 auto",
  [theme.breakpoints.up("sm")]: {
    gridTemplateColumns: "repeat(3, 1fr)",
    gap: theme.spacing(3),
  },
  [theme.breakpoints.up("md")]: {
    gridTemplateColumns: "repeat(6, 1fr)",
    gap: theme.spacing(3.5),
  },
}));

const PartnerCard = styled("div")(({ theme }) => ({
  backgroundColor: "white",
  padding: theme.spacing(3),
  borderRadius: "16px",
  textAlign: "center",
  minHeight: "100px",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  transition: "all 0.3s cubic-bezier(0.4, 0, 0.2, 1)",
  boxShadow: "0 4px 16px rgba(0, 0, 0, 0.15)",
  border: "2px solid transparent",
  "&:hover": {
    transform: "translateY(-6px) scale(1.03)",
    boxShadow: "0 12px 32px rgba(246, 212, 105, 0.3)",
    borderColor: "#f6d469",
    "& img": {
      filter: "grayscale(0%) brightness(1.05)",
      transform: "scale(1.05)",
    },
  },
  [theme.breakpoints.up("md")]: {
    padding: theme.spacing(3.5),
    minHeight: "120px",
  },
  [theme.breakpoints.down("sm")]: {
    padding: theme.spacing(2.5),
    minHeight: "90px",
  },
}));

const PartnerLogo = styled("img")(({ theme }) => ({
  width: "100%",
  height: "70px",
  objectFit: "contain",
  filter: "grayscale(30%)",
  transition: "all 0.3s ease",
  [theme.breakpoints.up("md")]: {
    height: "80px",
  },
  [theme.breakpoints.down("sm")]: {
    height: "60px",
  },
}));

const partners = [
  {
    name: "UNDP",
    logo: undpLogo,
  },
  {
    name: "APNIC",
    logo: apnicLogo,
  },
  {
    name: "Khyentse Foundation",
    logo: khyentseLogo,
  },
  {
    name: "National Federation for the Disabled",
    logo: abilis,
  },
  {
    name: "Meedan",
    logo: meedanLogo,
  },
  {
    name: "Government of Nepal",
    logo: governmentNepalLogo,
  },
];

export default function PartnersSection() {
  const { t } = useTranslation();

  return (
    <PartnersContainer
      aria-labelledby='partners-heading'
      style={{ paddingTop: "5rem", paddingBottom: "5rem" }}
    >
      <Container maxWidth='xl' sx={{ px: { xs: 2, sm: 3, md: 6 } }}>
        <SectionHeading as='h2' id='partners-heading'>
          {t("partners_heading")}
        </SectionHeading>
        
        <SectionSubheading>
          Working together with international organizations and government bodies to create lasting
          impact for persons with disabilities in Nepal.
        </SectionSubheading>

        <PartnersGrid>
          {partners.map((partner, index) => (
            <PartnerCard key={index}>
              <PartnerLogo src={partner.logo} alt={partner.name} />
            </PartnerCard>
          ))}
        </PartnersGrid>
      </Container>
    </PartnersContainer>
  );
}

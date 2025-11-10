import { Container, Typography } from "@mui/material";
import { styled } from "@mui/material/styles";
import { useTranslation } from "react-i18next";
// import { imgNationalFederationLogo } from "../../constants/figmaAssets";
import abilis from "../../assets/grantors/abilis.png";
import apnicLogo from "../../assets/grantors/APNIC.png";
import governmentNepalLogo from "../../assets/grantors/GvmtNepal.png";
import khyentseLogo from "../../assets/grantors/khyentse_foundation.png";
import meedanLogo from "../../assets/grantors/Meedan.svg";
import undpLogo from "../../assets/grantors/UNDP.png";

const PartnersContainer = styled("section")({
  backgroundColor: "#f6d469",
});

const SectionHeading = styled(Typography)(({ theme }) => ({
  fontSize: "2rem",
  fontWeight: 700,
  color: "#351c42",
  marginBottom: theme.spacing(4),
  textAlign: "center",
  textTransform: "capitalize",
  letterSpacing: "-0.01em",
  [theme.breakpoints.up("md")]: {
    fontSize: "2.5rem",
    marginBottom: theme.spacing(5),
  },
}));

const PartnersGrid = styled("div")(({ theme }) => ({
  display: "grid",
  gridTemplateColumns: "repeat(2, 1fr)",
  gap: theme.spacing(2),
  maxWidth: "1000px",
  margin: "0 auto",
  [theme.breakpoints.up("sm")]: {
    gridTemplateColumns: "repeat(3, 1fr)",
    gap: theme.spacing(2.5),
  },
  [theme.breakpoints.up("md")]: {
    gridTemplateColumns: "repeat(6, 1fr)",
    gap: theme.spacing(3),
  },
}));

const PartnerCard = styled("div")(({ theme }) => ({
  backgroundColor: "white",
  padding: theme.spacing(2),
  borderRadius: theme.spacing(1.5),
  textAlign: "center",
  minHeight: "80px",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  transition: "transform 0.2s ease, box-shadow 0.2s ease",
  boxShadow: "0 2px 8px rgba(0, 0, 0, 0.08)",
  "&:hover": {
    transform: "translateY(-2px)",
    boxShadow: "0 4px 12px rgba(0, 0, 0, 0.12)",
  },
  [theme.breakpoints.up("md")]: {
    padding: theme.spacing(2.5),
    minHeight: "90px",
  },
}));

const PartnerLogo = styled("img")(({ theme }) => ({
  width: "100%",
  height: "60px",
  objectFit: "contain",
  filter: "grayscale(20%)",
  transition: "filter 0.2s ease",
  "&:hover": {
    filter: "grayscale(0%)",
  },
  [theme.breakpoints.up("md")]: {
    height: "70px",
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
      style={{ paddingTop: "3.5rem", paddingBottom: "3.5rem" }}
    >
      <Container maxWidth='xl' sx={{ px: { xs: 2, sm: 3, md: 6 } }}>
        <SectionHeading as='h2' id='partners-heading'>
          {t("partners_heading")}
        </SectionHeading>

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

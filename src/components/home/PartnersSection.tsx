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
  fontSize: "2.5rem",
  fontWeight: 600,
  color: "#351c42",
  marginBottom: theme.spacing(6),
  textAlign: "center",
  textTransform: "capitalize",
  [theme.breakpoints.up("md")]: {
    fontSize: "3rem",
  },
}));

const PartnersGrid = styled("div")(({ theme }) => ({
  display: "grid",
  gridTemplateColumns: "repeat(2, 1fr)",
  gap: theme.spacing(4),
  [theme.breakpoints.up("sm")]: {
    gridTemplateColumns: "repeat(4, 1fr)",
  },
}));

const PartnerCard = styled("div")(({ theme }) => ({
  backgroundColor: "white",
  padding: theme.spacing(3),
  borderRadius: theme.spacing(2),
  textAlign: "center",
  minHeight: "128px",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
}));

const PartnerLogo = styled("img")({
  width: "100%",
  height: "100px",
  objectFit: "contain",
});

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

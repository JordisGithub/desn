import { Container, Typography } from "@mui/material";
import { styled } from "@mui/material/styles";
import { useTranslation } from "react-i18next";
import {
  imgUndpLogo,
  imgNationalFederationLogo,
  imgMeedanLogo,
  imgGovernmentOfNepalLogo,
} from "../../constants/figmaAssets";

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
  maxWidth: "100%",
  maxHeight: "100px",
  objectFit: "contain",
});

const partners = [
  {
    name: "UNDP",
    logo: imgUndpLogo,
  },
  {
    name: "National Federation for the Disabled",
    logo: imgNationalFederationLogo,
  },
  {
    name: "Meedan",
    logo: imgMeedanLogo,
  },
  {
    name: "Government of Nepal",
    logo: imgGovernmentOfNepalLogo,
  },
];

export default function PartnersSection() {
  const { t } = useTranslation();

  return (
    <PartnersContainer
      aria-labelledby='partners-heading'
      style={{ paddingTop: "5rem", paddingBottom: "5rem" }}
    >
      <Container maxWidth='lg'>
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

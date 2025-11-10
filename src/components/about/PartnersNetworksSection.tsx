import { Container, Typography, Box } from "@mui/material";
import { styled } from "@mui/material/styles";
import { useTranslation } from "react-i18next";
import meedanLogo from "../../assets/grantors/Meedan.svg";
import apnicLogo from "../../assets/grantors/APNIC.png";
import khyentseLogo from "../../assets/grantors/khyentse_foundation.png";
import undpLogo from "../../assets/grantors/UNDP.png";
import governmentNepalLogo from "../../assets/grantors/GvmtNepal.png";

const SectionContainer = styled("section")(({ theme }) => ({
  backgroundColor: "white",
  paddingTop: theme.spacing(8),
  paddingBottom: theme.spacing(8),
}));

const SectionTitle = styled(Typography)(({ theme }) => ({
  fontSize: "2rem",
  fontWeight: 400,
  color: "#004c91",
  marginBottom: theme.spacing(1),
}));

const UnderlineBar = styled(Box)({
  width: "80px",
  height: "4px",
  backgroundColor: "#00a77f",
  borderRadius: "16777200px",
  marginBottom: "32px",
});

const DescriptionText = styled(Typography)({
  fontSize: "1.125rem",
  color: "#364153",
  lineHeight: 1.6,
  maxWidth: "800px",
  margin: "0 auto 48px",
  textAlign: "center",
});

const PartnersGrid = styled(Box)(({ theme }) => ({
  display: "grid",
  gridTemplateColumns: "repeat(4, 1fr)",
  gap: theme.spacing(4),
  [theme.breakpoints.down("md")]: {
    gridTemplateColumns: "repeat(2, 1fr)",
  },
  [theme.breakpoints.down("sm")]: {
    gridTemplateColumns: "1fr",
  },
}));

const PartnerCard = styled(Box)(({ theme }) => ({
  backgroundColor: "white",
  border: "1px solid #e5e7eb",
  borderRadius: "12px",
  padding: theme.spacing(4),
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  minHeight: "150px",
  transition: "all 0.3s ease",
  "&:hover": {
    boxShadow: "0 4px 12px rgba(0, 0, 0, 0.1)",
    transform: "translateY(-4px)",
  },
}));

const PartnerLogo = styled("img")({
  maxWidth: "100%",
  maxHeight: "80px",
  objectFit: "contain",
});

export default function PartnersNetworksSection() {
  const { t } = useTranslation();

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
      name: "Meedan",
      logo: meedanLogo,
    },
    {
      name: "Government of Nepal",
      logo: governmentNepalLogo,
    },
  ];

  return (
    <SectionContainer aria-labelledby='partners-heading'>
      <Container maxWidth='xl' sx={{ px: { xs: 2, sm: 3, md: 6 } }}>
        <Box textAlign='center'>
          <SectionTitle variant='h2' id='partners-heading'>
            {t("about_partners_title")}
          </SectionTitle>
          <UnderlineBar mx='auto' />
          <DescriptionText>{t("about_partners_description")}</DescriptionText>
        </Box>

        <PartnersGrid>
          {partners.map((partner, index) => (
            <PartnerCard key={index}>
              <PartnerLogo src={partner.logo} alt={partner.name} />
            </PartnerCard>
          ))}
        </PartnersGrid>
      </Container>
    </SectionContainer>
  );
}

import { Container, Typography, Box } from "@mui/material";
import { styled } from "@mui/material/styles";
import { useTranslation } from "react-i18next";
import VerifiedIcon from "@mui/icons-material/Verified";

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
  width: "124px",
  height: "4px",
  backgroundColor: "#004c91",
  borderRadius: "16777200px",
  marginBottom: "32px",
});

const LegalCard = styled(Box)(({ theme }) => ({
  backgroundColor: "white",
  border: "1px solid #e5e7eb",
  borderLeft: "4px solid #00a77f",
  borderRadius: "16px",
  padding: theme.spacing(4),
  marginTop: theme.spacing(4),
}));

const InfoGrid = styled(Box)(({ theme }) => ({
  display: "grid",
  gridTemplateColumns: "repeat(2, 1fr)",
  gap: theme.spacing(4),
  [theme.breakpoints.down("md")]: {
    gridTemplateColumns: "1fr",
  },
}));

const InfoColumn = styled(Box)({
  display: "flex",
  flexDirection: "column",
  gap: "16px",
});

const InfoItem = styled(Box)({
  display: "flex",
  gap: "12px",
  alignItems: "flex-start",
});

const IconBox = styled(Box)({
  width: "40px",
  height: "40px",
  borderRadius: "10px",
  backgroundColor: "rgba(0, 76, 145, 0.1)",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  flexShrink: 0,
});

const InfoTextBox = styled(Box)({
  display: "flex",
  flexDirection: "column",
});

const InfoLabel = styled(Typography)({
  fontSize: "1rem",
  color: "#4a5565",
  lineHeight: 1.25,
  marginBottom: "4px",
});

const InfoValue = styled(Typography)({
  fontSize: "1.25rem",
  color: "#101828",
  fontWeight: 400,
  lineHeight: 1.2,
});

export default function LegalStatusSection() {
  const { t } = useTranslation();

  return (
    <SectionContainer aria-labelledby='legal-status-heading'>
      <Container maxWidth='lg'>
        <Box>
          <SectionTitle variant='h2' id='legal-status-heading'>
            {t("about_legal_title")}
          </SectionTitle>
          <UnderlineBar />

          <LegalCard>
            <InfoGrid>
              <InfoColumn>
                <InfoItem>
                  <IconBox>
                    <VerifiedIcon sx={{ fontSize: 20, color: "#004c91" }} />
                  </IconBox>
                  <InfoTextBox>
                    <InfoLabel>{t("about_legal_reg_date_label")}</InfoLabel>
                    <InfoValue>{t("about_legal_reg_date")}</InfoValue>
                  </InfoTextBox>
                </InfoItem>

                <InfoItem sx={{ mt: 4 }}>
                  <IconBox>
                    <VerifiedIcon sx={{ fontSize: 20, color: "#004c91" }} />
                  </IconBox>
                  <InfoTextBox>
                    <InfoLabel>{t("about_legal_reg_number_label")}</InfoLabel>
                    <InfoValue>{t("about_legal_reg_number")}</InfoValue>
                  </InfoTextBox>
                </InfoItem>
              </InfoColumn>

              <InfoColumn>
                <InfoItem>
                  <IconBox>
                    <VerifiedIcon sx={{ fontSize: 20, color: "#004c91" }} />
                  </IconBox>
                  <InfoTextBox>
                    <InfoLabel>{t("about_legal_affiliations_label")}</InfoLabel>
                    <InfoValue>{t("about_legal_affiliations")}</InfoValue>
                  </InfoTextBox>
                </InfoItem>

                <InfoItem sx={{ mt: 2 }}>
                  <IconBox>
                    <VerifiedIcon sx={{ fontSize: 20, color: "#004c91" }} />
                  </IconBox>
                  <InfoTextBox>
                    <InfoLabel>{t("about_legal_type_label")}</InfoLabel>
                    <InfoValue>{t("about_legal_type")}</InfoValue>
                  </InfoTextBox>
                </InfoItem>
              </InfoColumn>
            </InfoGrid>
          </LegalCard>
        </Box>
      </Container>
    </SectionContainer>
  );
}

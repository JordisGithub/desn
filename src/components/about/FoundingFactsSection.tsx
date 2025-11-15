import { Container, Typography, Box } from "@mui/material";
import { styled } from "@mui/material/styles";
import { useTranslation } from "react-i18next";
import CalendarTodayIcon from "@mui/icons-material/CalendarToday";
import WorkspacesIcon from "@mui/icons-material/Workspaces";
import VerifiedIcon from "@mui/icons-material/Verified";
import BusinessIcon from "@mui/icons-material/Business";

const SectionContainer = styled("section")(({ theme }) => ({
  backgroundColor: "#F9FAFB",
  paddingTop: theme.spacing(14),
  paddingBottom: theme.spacing(14),
  [theme.breakpoints.down("md")]: {
    paddingTop: theme.spacing(10),
    paddingBottom: theme.spacing(10),
  },
}));

const TwoColumnGrid = styled(Box)(({ theme }) => ({
  display: "grid",
  gridTemplateColumns: "1fr 1fr",
  gap: theme.spacing(6),
  [theme.breakpoints.down("md")]: {
    gridTemplateColumns: "1fr",
    gap: theme.spacing(4),
  },
}));

const IntroColumn = styled(Box)({
  display: "flex",
  flexDirection: "column",
  gap: "16px",
});

const IntroHeading = styled(Typography)(({ theme }) => ({
  fontSize: "2.25rem",
  fontWeight: 600,
  color: "#004c91",
  lineHeight: 1.2,
  marginBottom: theme.spacing(2),
  [theme.breakpoints.down("md")]: {
    fontSize: "1.875rem",
  },
}));

const IntroText = styled(Typography)({
  fontSize: "1.125rem",
  color: "#4b5563",
  lineHeight: 1.7,
  fontWeight: 400,
});

const FactsColumn = styled(Box)({
  display: "flex",
  flexDirection: "column",
  gap: "20px",
});

const FactCard = styled(Box)(({ theme }) => ({
  backgroundColor: "white",
  border: "1px solid #e5e7eb",
  borderLeft: "4px solid #00a77f",
  borderRadius: "12px",
  padding: theme.spacing(2.5, 3),
  display: "flex",
  gap: theme.spacing(2),
  alignItems: "center",
  boxShadow: "0 1px 3px rgba(0, 0, 0, 0.1)",
  transition: "all 0.2s ease",
  "&:hover": {
    boxShadow: "0 4px 6px rgba(0, 0, 0, 0.1)",
    transform: "translateY(-2px)",
  },
}));

const IconWrapper = styled(Box)({
  width: "48px",
  height: "48px",
  borderRadius: "10px",
  backgroundColor: "rgba(0, 167, 127, 0.1)",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  flexShrink: 0,
});

const FactContent = styled(Box)({
  display: "flex",
  flexDirection: "column",
  flex: 1,
});

const FactLabel = styled(Typography)({
  fontSize: "0.875rem",
  color: "#6b7280",
  fontWeight: 500,
  textTransform: "uppercase",
  letterSpacing: "0.05em",
  marginBottom: "4px",
});

const FactValue = styled(Typography)({
  fontSize: "1.25rem",
  color: "#111827",
  fontWeight: 600,
  lineHeight: 1.2,
});

export default function FoundingFactsSection() {
  const { t } = useTranslation();

  return (
    <SectionContainer aria-labelledby='founding-facts-heading'>
      <Container maxWidth='xl' sx={{ px: { xs: 2, sm: 3, md: 6 } }}>
        <TwoColumnGrid>
          {/* Left Column: Condensed Introduction */}
          <IntroColumn>
            <IntroHeading as='h2' id='founding-facts-heading'>
              {t("about_intro_heading")}
            </IntroHeading>
            <IntroText>
              {t("about_founding_intro")}
            </IntroText>
            <IntroText>
              {t("about_intro_text_1")}
            </IntroText>
          </IntroColumn>

          {/* Right Column: Key Facts as Cards */}
          <FactsColumn>
            <FactCard>
              <IconWrapper>
                <CalendarTodayIcon sx={{ fontSize: 24, color: "#00a77f" }} />
              </IconWrapper>
              <FactContent>
                <FactLabel>{t("about_founding_fact_year_label")}</FactLabel>
                <FactValue>{t("about_legal_reg_date")}</FactValue>
              </FactContent>
            </FactCard>

            <FactCard>
              <IconWrapper>
                <WorkspacesIcon sx={{ fontSize: 24, color: "#00a77f" }} />
              </IconWrapper>
              <FactContent>
                <FactLabel>{t("about_founding_fact_years_service_label")}</FactLabel>
                <FactValue>{t("about_founding_fact_years_service")}</FactValue>
              </FactContent>
            </FactCard>

            <FactCard>
              <IconWrapper>
                <VerifiedIcon sx={{ fontSize: 24, color: "#00a77f" }} />
              </IconWrapper>
              <FactContent>
                <FactLabel>{t("about_legal_reg_number_label")}</FactLabel>
                <FactValue>{t("about_legal_reg_number")}</FactValue>
              </FactContent>
            </FactCard>

            <FactCard>
              <IconWrapper>
                <BusinessIcon sx={{ fontSize: 24, color: "#00a77f" }} />
              </IconWrapper>
              <FactContent>
                <FactLabel>{t("about_legal_affiliations_label")}</FactLabel>
                <FactValue>{t("about_legal_type")}</FactValue>
              </FactContent>
            </FactCard>
          </FactsColumn>
        </TwoColumnGrid>
      </Container>
    </SectionContainer>
  );
}

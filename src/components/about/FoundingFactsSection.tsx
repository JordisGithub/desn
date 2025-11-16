import { Container, Typography, Box } from "@mui/material";
import { styled } from "@mui/material/styles";
import { useTranslation } from "react-i18next";
import CalendarTodayIcon from "@mui/icons-material/CalendarToday";
import WorkspacesIcon from "@mui/icons-material/Workspaces";
import VerifiedIcon from "@mui/icons-material/Verified";
import BusinessIcon from "@mui/icons-material/Business";

const SectionContainer = styled("section")(({ theme }) => ({
  backgroundColor: "#F0F4F8",
  paddingTop: theme.spacing(5),
  paddingBottom: theme.spacing(5),
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
  fontSize: "3rem",
  fontWeight: 700,
  color: "#004c91",
  lineHeight: 1.2,
  letterSpacing: "0.02em",
  marginBottom: theme.spacing(2),
  [theme.breakpoints.down("md")]: {
    fontSize: "2.25rem",
  },
}));

const IntroText = styled(Typography)({
  fontSize: "1.125rem",
  color: "#374151",
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
  borderRadius: "16px",
  padding: theme.spacing(2.5, 3),
  minHeight: "44px",
  display: "flex",
  gap: theme.spacing(2),
  alignItems: "center",
  boxShadow: "0 16px 50px rgba(0, 0, 0, 0.35) !important",
  transition: "all 0.2s ease",
  "&:hover": {
    boxShadow: "0 8px 24px rgba(0, 0, 0, 0.15)",
    transform: "translateY(-2px)",
  },
  "&:focus-visible": {
    outline: "3px solid #f6d469",
    outlineOffset: "2px",
    boxShadow: "0 4px 6px rgba(0, 0, 0, 0.1)",
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
  color: "#4b5563",
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
    <SectionContainer
      role='region'
      aria-labelledby='founding-facts-heading'
      aria-label='Organization Founding History'
    >
      <Container maxWidth='xl' sx={{ px: { xs: 2, sm: 3, md: 6 } }}>
        <TwoColumnGrid>
          {/* Left Column: Condensed Introduction */}
          <IntroColumn>
            <IntroHeading as='h2' id='founding-facts-heading' tabIndex={-1}>
              {t("about_intro_heading")}
            </IntroHeading>
            <IntroText>{t("about_founding_intro")}</IntroText>
            <IntroText>{t("about_intro_text_1")}</IntroText>
          </IntroColumn>

          {/* Right Column: Key Facts as Cards */}
          <FactsColumn role='list' aria-label='Organization founding facts'>
            <FactCard
              role='listitem'
              tabIndex={0}
              aria-label={`${t("about_founding_fact_year_label")}: ${t(
                "about_legal_reg_date"
              )}`}
            >
              <IconWrapper aria-hidden='true'>
                <CalendarTodayIcon sx={{ fontSize: 24, color: "#00a77f" }} />
              </IconWrapper>
              <FactContent>
                <FactLabel>{t("about_founding_fact_year_label")}</FactLabel>
                <FactValue>{t("about_legal_reg_date")}</FactValue>
              </FactContent>
            </FactCard>

            <FactCard
              role='listitem'
              tabIndex={0}
              aria-label={`${t("about_founding_fact_years_service_label")}: ${t(
                "about_founding_fact_years_service"
              )}`}
            >
              <IconWrapper aria-hidden='true'>
                <WorkspacesIcon sx={{ fontSize: 24, color: "#00a77f" }} />
              </IconWrapper>
              <FactContent>
                <FactLabel>
                  {t("about_founding_fact_years_service_label")}
                </FactLabel>
                <FactValue>{t("about_founding_fact_years_service")}</FactValue>
              </FactContent>
            </FactCard>

            <FactCard
              role='listitem'
              tabIndex={0}
              aria-label={`${t("about_legal_reg_number_label")}: ${t(
                "about_legal_reg_number"
              )}`}
            >
              <IconWrapper aria-hidden='true'>
                <VerifiedIcon sx={{ fontSize: 24, color: "#00a77f" }} />
              </IconWrapper>
              <FactContent>
                <FactLabel>{t("about_legal_reg_number_label")}</FactLabel>
                <FactValue>{t("about_legal_reg_number")}</FactValue>
              </FactContent>
            </FactCard>

            <FactCard
              role='listitem'
              tabIndex={0}
              aria-label={`${t("about_legal_affiliations_label")}: ${t(
                "about_legal_type"
              )}`}
            >
              <IconWrapper aria-hidden='true'>
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

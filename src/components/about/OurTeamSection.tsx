import { Container, Typography, Box } from "@mui/material";
import { styled } from "@mui/material/styles";
import { useTranslation } from "react-i18next";
import PeopleIcon from "@mui/icons-material/People";

const SectionContainer = styled("section")(({ theme }) => ({
  backgroundColor: "#f8f9fa",
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

const TeamPlaceholder = styled(Box)(({ theme }) => ({
  backgroundColor: "white",
  borderRadius: "12px",
  padding: theme.spacing(8, 4),
  textAlign: "center",
  border: "2px dashed #e5e7eb",
}));

const PlaceholderIcon = styled(PeopleIcon)(({ theme }) => ({
  fontSize: "5rem",
  color: "#004c91",
  marginBottom: theme.spacing(2),
}));

const PlaceholderText = styled(Typography)({
  fontSize: "1.125rem",
  color: "#6b7280",
  fontStyle: "italic",
});

export default function OurTeamSection() {
  const { t } = useTranslation();

  return (
    <SectionContainer aria-labelledby='team-heading'>
      <Container maxWidth='xl' sx={{ px: { xs: 2, sm: 3, md: 6 } }}>
        <Box textAlign='center'>
          <SectionTitle variant='h2' id='team-heading'>
            {t("about_team_title")}
          </SectionTitle>
          <UnderlineBar mx='auto' />
          <DescriptionText>{t("about_team_description")}</DescriptionText>
        </Box>

        <TeamPlaceholder>
          <PlaceholderIcon />
          <PlaceholderText>
            Team profiles and bios will be added here
          </PlaceholderText>
        </TeamPlaceholder>
      </Container>
    </SectionContainer>
  );
}

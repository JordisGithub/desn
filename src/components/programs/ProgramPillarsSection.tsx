import { Box, Container, Typography } from "@mui/material";
import { styled } from "@mui/material/styles";
import { useTranslation } from "react-i18next";
import SchoolIcon from "@mui/icons-material/School";
import WorkIcon from "@mui/icons-material/Work";
import CampaignIcon from "@mui/icons-material/Campaign";

const PillarsSection = styled("section")(({ theme }) => ({
  padding: theme.spacing(6, 2),
  backgroundColor: "#ffffff",
  [theme.breakpoints.up("sm")]: {
    padding: theme.spacing(8, 3),
  },
  [theme.breakpoints.up("md")]: {
    padding: theme.spacing(12, 4),
  },
}));

const SectionTitle = styled(Typography)<{ component?: React.ElementType }>(
  ({ theme }) => ({
    fontSize: "2.5rem",
    fontWeight: 700,
    color: "#004c91",
    textAlign: "center",
    marginBottom: theme.spacing(2),
    fontFamily: "Poppins, sans-serif",
  })
);

const SectionSubtitle = styled(Typography)<{ component?: React.ElementType }>(
  ({ theme }) => ({
    fontSize: "1.25rem",
    color: "#374151",
    textAlign: "center",
    maxWidth: "800px",
    margin: `0 auto ${theme.spacing(8)}`,
  })
);

const PillarsGrid = styled(Box)(({ theme }) => ({
  display: "grid",
  gridTemplateColumns: "1fr",
  gap: theme.spacing(4),
  [theme.breakpoints.up("sm")]: {
    gridTemplateColumns: "repeat(2, 1fr)",
  },
  [theme.breakpoints.up("md")]: {
    gridTemplateColumns: "repeat(3, 1fr)",
  },
}));

const PillarCard = styled(Box, {
  shouldForwardProp: (prop) => prop !== "pillarColor",
})<{
  pillarColor: string;
  component?: React.ElementType;
}>(({ theme, pillarColor }) => ({
  backgroundColor: "#ffffff",
  borderRadius: "16px",
  padding: theme.spacing(5, 4),
  border: `3px solid ${pillarColor}`,
  boxShadow: "0 8px 24px rgba(0, 0, 0, 0.08)",
  display: "flex",
  flexDirection: "column",
  alignItems: "center",
  textAlign: "center",
  transition: "all 0.3s ease",
  "&:hover": {
    transform: "translateY(-8px)",
    boxShadow: "0 16px 40px rgba(0, 0, 0, 0.12)",
  },
}));

const IconWrapper = styled(Box, {
  shouldForwardProp: (prop) => prop !== "bgColor",
})<{ bgColor: string }>(({ bgColor }) => ({
  width: "80px",
  height: "80px",
  borderRadius: "50%",
  backgroundColor: bgColor,
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  marginBottom: "24px",
}));

const PillarTitle = styled(Typography)<{ component?: React.ElementType }>(
  ({ theme }) => ({
    fontSize: "1.5rem",
    fontWeight: 700,
    color: "#0f172a",
    marginBottom: "12px",
    fontFamily: "Poppins, sans-serif",
    [theme.breakpoints.up("sm")]: {
      fontSize: "1.75rem",
    },
    [theme.breakpoints.up("md")]: {
      fontSize: "2.25rem",
    },
  })
);

const PillarDescription = styled(Typography)<{ component?: React.ElementType }>(
  {
    fontSize: "1rem",
    color: "#374151",
    lineHeight: 1.6,
  }
);

const pillarsData = [
  {
    id: "education",
    icon: SchoolIcon,
    color: "#004c91", // var(--color-primary)
    bgColor: "rgba(0, 76, 145, 0.1)",
  },
  {
    id: "livelihood",
    icon: WorkIcon,
    color: "#00a77f", // var(--color-secondary)
    bgColor: "rgba(0, 167, 127, 0.1)",
  },
  {
    id: "advocacy",
    icon: CampaignIcon,
    color: "#f6d469", // var(--color-accent)
    bgColor: "rgba(246, 212, 105, 0.2)",
  },
];

export default function ProgramPillarsSection() {
  const { t } = useTranslation();

  return (
    <PillarsSection aria-label='Program Pillars Overview'>
      <Container maxWidth='lg'>
        <SectionTitle id='program-pillars-title' component='h2'>
          {t("programs.pillars.title")}
        </SectionTitle>
        <SectionSubtitle component='p'>
          {t("programs.pillars.subtitle")}
        </SectionSubtitle>

        <PillarsGrid>
          {pillarsData.map((pillar) => {
            const Icon = pillar.icon;
            return (
              <PillarCard
                key={pillar.id}
                pillarColor={pillar.color}
                aria-labelledby={`pillar-${pillar.id}-title`}
                aria-describedby={`pillar-${pillar.id}-desc`}
              >
                <IconWrapper
                  bgColor={pillar.bgColor}
                  role='img'
                  aria-label={`${t(
                    `programs.pillars.${pillar.id}.title`
                  )} icon`}
                >
                  <Icon
                    sx={{ fontSize: 40, color: pillar.color }}
                    aria-hidden='true'
                  />
                </IconWrapper>
                <PillarTitle id={`pillar-${pillar.id}-title`} component='h3'>
                  {t(`programs.pillars.${pillar.id}.title`)}
                </PillarTitle>
                <PillarDescription
                  id={`pillar-${pillar.id}-desc`}
                  component='p'
                >
                  {t(`programs.pillars.${pillar.id}.description`)}
                </PillarDescription>
              </PillarCard>
            );
          })}
        </PillarsGrid>
      </Container>
    </PillarsSection>
  );
}

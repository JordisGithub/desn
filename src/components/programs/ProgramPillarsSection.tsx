import { Box, Container, Typography } from "@mui/material";
import { styled } from "@mui/material/styles";
import { useTranslation } from "react-i18next";
import SchoolIcon from "@mui/icons-material/School";
import WorkIcon from "@mui/icons-material/Work";
import CampaignIcon from "@mui/icons-material/Campaign";

const PillarsSection = styled("section")(({ theme }) => ({
  padding: theme.spacing(4, 2),
  backgroundColor: "#ffffff",
  [theme.breakpoints.up("sm")]: {
    padding: theme.spacing(5, 3),
  },
  [theme.breakpoints.up("md")]: {
    padding: theme.spacing(6, 4),
  },
}));

const SectionTitle = styled(Typography)<{ component?: React.ElementType }>(
  ({ theme }) => ({
    fontSize: "1.5rem",
    fontWeight: 700,
    color: "#004c91",
    textAlign: "center",
    marginBottom: theme.spacing(1.5),
    fontFamily: "Poppins, sans-serif",
    [theme.breakpoints.up("sm")]: {
      fontSize: "1.75rem",
    },
    [theme.breakpoints.up("md")]: {
      fontSize: "2rem",
    },
  })
);

const SectionSubtitle = styled(Typography)<{ component?: React.ElementType }>(
  ({ theme }) => ({
    fontSize: "0.9rem",
    color: "#374151",
    textAlign: "center",
    maxWidth: "800px",
    margin: `0 auto ${theme.spacing(3)}`,
    lineHeight: 1.6,
    padding: theme.spacing(0, 1),
    [theme.breakpoints.up("sm")]: {
      fontSize: "1rem",
      margin: `0 auto ${theme.spacing(4)}`,
      padding: 0,
    },
    [theme.breakpoints.up("md")]: {
      fontSize: "1.1rem",
      margin: `0 auto ${theme.spacing(5)}`,
    },
  })
);

const PillarsGrid = styled(Box)(({ theme }) => ({
  display: "grid",
  gridTemplateColumns: "1fr",
  gap: theme.spacing(2.5),
  [theme.breakpoints.up("sm")]: {
    gridTemplateColumns: "repeat(2, 1fr)",
    gap: theme.spacing(3),
  },
  [theme.breakpoints.up("md")]: {
    gridTemplateColumns: "repeat(3, 1fr)",
    gap: theme.spacing(3.5),
  },
}));

const PillarCard = styled(Box, {
  shouldForwardProp: (prop) => prop !== "pillarColor",
})<{
  pillarColor: string;
  component?: React.ElementType;
}>(({ theme, pillarColor }) => ({
  backgroundColor: "#ffffff",
  borderRadius: "10px",
  padding: theme.spacing(2.5, 2),
  border: `2px solid ${pillarColor}`,
  boxShadow: "0 3px 12px rgba(0, 0, 0, 0.08)",
  display: "flex",
  flexDirection: "column",
  alignItems: "center",
  textAlign: "center",
  transition: "all 0.3s ease",
  [theme.breakpoints.up("sm")]: {
    padding: theme.spacing(3, 2.5),
    borderRadius: "12px",
    border: `2px solid ${pillarColor}`,
    boxShadow: "0 4px 16px rgba(0, 0, 0, 0.08)",
  },
  [theme.breakpoints.up("md")]: {
    padding: theme.spacing(3.5, 3),
    borderRadius: "14px",
    border: `2.5px solid ${pillarColor}`,
    boxShadow: "0 6px 20px rgba(0, 0, 0, 0.08)",
  },
  "&:hover": {
    transform: "translateY(-6px)",
    boxShadow: "0 12px 32px rgba(0, 0, 0, 0.12)",
  },
}));

const IconWrapper = styled(Box, {
  shouldForwardProp: (prop) => prop !== "bgColor",
})<{ bgColor: string }>(({ bgColor, theme }) => ({
  width: "50px",
  height: "50px",
  borderRadius: "50%",
  backgroundColor: bgColor,
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  marginBottom: "12px",
  [theme.breakpoints.up("sm")]: {
    width: "55px",
    height: "55px",
    marginBottom: "14px",
  },
  [theme.breakpoints.up("md")]: {
    width: "60px",
    height: "60px",
    marginBottom: "16px",
  },
}));

const PillarTitle = styled(Typography)<{ component?: React.ElementType }>(
  ({ theme }) => ({
    fontSize: "1.1rem",
    fontWeight: 700,
    color: "#0f172a",
    marginBottom: "6px",
    fontFamily: "Poppins, sans-serif",
    [theme.breakpoints.up("sm")]: {
      fontSize: "1.2rem",
      marginBottom: "8px",
    },
    [theme.breakpoints.up("md")]: {
      fontSize: "1.35rem",
      marginBottom: "10px",
    },
  })
);

const PillarDescription = styled(Typography)<{ component?: React.ElementType }>(
  ({ theme }) => ({
    fontSize: "0.9rem",
    color: "#374151",
    lineHeight: 1.6,
    [theme.breakpoints.up("sm")]: {
      fontSize: "0.95rem",
    },
    [theme.breakpoints.up("md")]: {
      fontSize: "1rem",
    },
  })
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
  const { t } = useTranslation("programs");

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
                component='article'
                aria-labelledby={`pillar-overview-${pillar.id}-title`}
                aria-describedby={`pillar-overview-${pillar.id}-desc`}
              >
                <IconWrapper bgColor={pillar.bgColor} aria-hidden='true'>
                  <Icon
                    sx={{ fontSize: 32, color: pillar.color }}
                    aria-hidden='true'
                  />
                </IconWrapper>
                <PillarTitle
                  id={`pillar-overview-${pillar.id}-title`}
                  component='h3'
                >
                  {t(`programs.pillars.${pillar.id}.title`)}
                </PillarTitle>
                <PillarDescription
                  id={`pillar-overview-${pillar.id}-desc`}
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

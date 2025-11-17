import { Box, Container, Typography } from "@mui/material";
import { styled } from "@mui/material/styles";
import { useTranslation } from "react-i18next";

type ProgramType = "education" | "livelihood" | "advocacy";

interface ProgramItem {
  id: string;
  titleKey: string;
  impactKey: string;
  outcomeKey: string;
  altKey: string;
  image: string;
}

interface ProgramPillarProps {
  pillarType: ProgramType;
  programs: ProgramItem[];
}

const pillarColors = {
  education: "#004c91",
  livelihood: "#006b55",
  advocacy: "#8f6f00",
};

const PillarSection = styled("section")(({ theme }) => ({
  padding: theme.spacing(6, 2),
  backgroundColor: "#f9fafb",
  [theme.breakpoints.up("sm")]: {
    padding: theme.spacing(8, 3),
  },
  [theme.breakpoints.up("md")]: {
    padding: theme.spacing(12, 4),
  },
}));

const PillarHeader = styled(Box)(({ theme }) => ({
  textAlign: "center",
  marginBottom: theme.spacing(4),
  [theme.breakpoints.up("sm")]: {
    marginBottom: theme.spacing(6),
  },
  [theme.breakpoints.up("md")]: {
    marginBottom: theme.spacing(8),
  },
}));

const PillarTitle = styled(Typography)<{
  pillartype: ProgramType;
  component?: React.ElementType;
}>(({ pillartype, theme }) => ({
  fontSize: "1.25rem",
  fontWeight: 700,
  color: pillarColors[pillartype],
  marginBottom: "12px",
  fontFamily: "Poppins, sans-serif",
  [theme.breakpoints.up("sm")]: {
    fontSize: "1.375rem",
    marginBottom: "14px",
  },
  [theme.breakpoints.up("md")]: {
    fontSize: "1.5rem",
    marginBottom: "16px",
  },
}));

const PillarSubtitle = styled(Typography)<{ component?: React.ElementType }>({
  fontSize: "1.125rem",
  color: "#374151",
  maxWidth: "800px",
  margin: "0 auto",
});

const ProgramsGrid = styled(Box)(({ theme }) => ({
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

const ProgramCard = styled(Box)<{
  pillartype: ProgramType;
  component?: React.ElementType;
}>(({ pillartype }) => ({
  backgroundColor: "#ffffff",
  borderRadius: "16px",
  overflow: "hidden",
  borderTop: `5px solid ${pillarColors[pillartype]}`,
  boxShadow: "0 16px 40px rgba(0, 0, 0, 0.35)",
  display: "flex",
  flexDirection: "column",
  transition: "all 0.3s ease",
  "&:hover": {
    transform: "translateY(-8px)",
    boxShadow: "0 20px 50px rgba(0, 0, 0, 0.4)",
  },
}));

const CardImageWrapper = styled(Box)({
  position: "relative",
  width: "100%",
  paddingTop: "50%", // 2:1 ratio
  overflow: "hidden",
  backgroundColor: "#e5e7eb",
});

const CardImage = styled("img")({
  position: "absolute",
  top: 0,
  left: 0,
  width: "100%",
  height: "100%",
  objectFit: "cover",
});

const ImageGradient = styled(Box)({
  position: "absolute",
  bottom: 0,
  left: 0,
  right: 0,
  height: "30%",
  background: "linear-gradient(to top, rgba(0, 0, 0, 0.3), transparent)",
});

const CardBody = styled(Box)(({ theme }) => ({
  padding: theme.spacing(4, 3),
  display: "flex",
  flexDirection: "column",
  gap: theme.spacing(2),
}));

const CardTitle = styled(Typography)<{ component?: React.ElementType }>(
  ({ theme }) => ({
    fontSize: "1.25rem",
    fontWeight: 700,
    color: "#0f172a",
    fontFamily: "Poppins, sans-serif",
    lineHeight: 1.3,
    [theme.breakpoints.up("sm")]: {
      fontSize: "1.375rem",
    },
    [theme.breakpoints.up("md")]: {
      fontSize: "1.5rem",
    },
  })
);

const ImpactMetric = styled(Typography)<{ pillartype: ProgramType }>(
  ({ pillartype, theme }) => ({
    fontSize: "1rem",
    fontWeight: 700,
    color: pillarColors[pillartype],
    fontFamily: "Roboto, sans-serif",
    [theme.breakpoints.up("sm")]: {
      fontSize: "1.125rem",
    },
    [theme.breakpoints.up("md")]: {
      fontSize: "1.25rem",
    },
  })
);

const OutcomeText = styled(Typography)({
  fontSize: "1rem",
  color: "#374151",
  lineHeight: 1.6,
});

export default function ProgramPillarCategory({
  pillarType,
  programs,
}: ProgramPillarProps) {
  const { t } = useTranslation();

  return (
    <PillarSection
      id={`pillar-${pillarType}`}
      aria-label={`${t(
        `programs.categories.${pillarType}.title`
      )} Programs Section`}
    >
      <Container maxWidth='xl'>
        <PillarHeader>
          <PillarTitle
            id={`pillar-${pillarType}-title`}
            component='h3'
            pillartype={pillarType}
          >
            {t(`programs.categories.${pillarType}.title`)}
          </PillarTitle>
          <PillarSubtitle component='p'>
            {t(`programs.categories.${pillarType}.subtitle`)}
          </PillarSubtitle>
        </PillarHeader>

        <ProgramsGrid
          role='list'
          aria-label={t(`programs.categories.${pillarType}.title`)}
        >
          {programs.map((program) => (
            <ProgramCard
              key={program.id}
              pillartype={pillarType}
              role='listitem'
              aria-labelledby={`${program.id}-title`}
              aria-describedby={`${program.id}-outcome`}
            >
              <CardImageWrapper>
                <CardImage
                  src={program.image}
                  alt={t(program.altKey)}
                  loading='lazy'
                />
                <ImageGradient aria-hidden='true' />
              </CardImageWrapper>
              <CardBody>
                <CardTitle id={`${program.id}-title`} component='h4'>
                  {t(program.titleKey)}
                </CardTitle>
                <ImpactMetric
                  pillartype={pillarType}
                  aria-label={`Impact: ${t(program.impactKey)}`}
                >
                  {t(program.impactKey)}
                </ImpactMetric>
                <OutcomeText id={`${program.id}-outcome`}>
                  {t(program.outcomeKey)}
                </OutcomeText>
              </CardBody>
            </ProgramCard>
          ))}
        </ProgramsGrid>
      </Container>
    </PillarSection>
  );
}

import { Box, Button, Container, Typography } from "@mui/material";
import { styled } from "@mui/material/styles";
import program1 from "../../assets/home/program1.jpg";
import program2 from "../../assets/home/program2.jpg";
import program3 from "../../assets/home/program3.jpg";
import program4 from "../../assets/home/program4.jpg";
import program5 from "../../assets/home/program5.jpg";

type ProgramType = "Education" | "Livelihood" | "Advocacy";

interface ProgramItem {
  id: string;
  title: string;
  type: ProgramType;
  image: string;
  impact: string; // single impact metric
  outcome: string; // short, outcome-focused description (max ~3 lines visually)
  link?: string;
}

const SECTION_PADDING = 12; // 96px

const CardsSection = styled("section")(({ theme }) => ({
  padding: theme.spacing(SECTION_PADDING, 4),
  backgroundColor: "#f9fafb",
}));

const CardsGrid = styled(Box)(({ theme }) => ({
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

const Card = styled(Box)<{ category: ProgramType }>(({ category }) => ({
  backgroundColor: "#ffffff",
  borderRadius: 16,
  overflow: "hidden",
  border: `3px solid ${
    category === "Education"
      ? "var(--color-primary)"
      : category === "Livelihood"
      ? "var(--color-secondary)"
      : "var(--color-accent)"
  }`,
  boxShadow: "0 16px 40px rgba(0, 0, 0, 0.12)",
  display: "flex",
  flexDirection: "column",
}));

const CardImageWrap = styled(Box)({
  position: "relative",
  height: 180, // top third emphasis
  overflow: "hidden",
});

const CardImage = styled("img")({
  width: "100%",
  height: "100%",
  objectFit: "cover",
  display: "block",
});

const CardBody = styled(Box)(({ theme }) => ({
  padding: theme.spacing(3),
  flex: 1,
  display: "flex",
  flexDirection: "column",
  gap: theme.spacing(2),
}));

const CardTitle = styled(Typography)({
  fontSize: "1.25rem",
  fontWeight: 800,
  color: "#0f172a",
  textAlign: "center",
});

const ImpactMetric = styled(Typography)({
  fontSize: "1.125rem",
  fontWeight: 700,
  color: "#004c91",
  textAlign: "center",
});

const OutcomeText = styled(Typography)({
  color: "#374151",
  fontSize: "0.9875rem",
  lineHeight: 1.5,
  display: "-webkit-box",
  WebkitLineClamp: 3,
  WebkitBoxOrient: "vertical" as const,
  overflow: "hidden",
  textOverflow: "ellipsis",
});

const LearnMoreButton = styled(Button)(({ theme }) => ({
  backgroundColor: "var(--color-primary)",
  color: "#ffffff",
  fontWeight: 700,
  textTransform: "none",
  borderRadius: 12,
  padding: theme.spacing(1.25, 2),
  alignSelf: "center",
  "&:hover": { backgroundColor: "var(--color-primary-dark)" },
  "&:focus-visible": {
    outline: "3px solid var(--color-accent)",
    outlineOffset: 2,
  },
}));

const programs: ProgramItem[] = [
  {
    id: "p-edu-1",
    title: "Inclusive Education Support",
    type: "Education",
    image: program3,
    impact: "500+ Youth Trained",
    outcome:
      "Gain practical literacy, digital skills, and accessible learning tools to thrive in school and life.",
    link: "/resources",
  },
  {
    id: "p-liv-1",
    title: "Livelihood & Skills",
    type: "Livelihood",
    image: program4,
    impact: "1,200+ Jobs Enabled",
    outcome:
      "Build market-ready skills and connect with fair employment opportunities and micro-entrepreneurship pathways.",
    link: "/resources",
  },
  {
    id: "p-adv-1",
    title: "Rights & Advocacy",
    type: "Advocacy",
    image: program1,
    impact: "80+ Policies Influenced",
    outcome:
      "Know your rights, access public services, and participate fully through policy change and awareness.",
    link: "/resources",
  },
  {
    id: "p-edu-2",
    title: "Assistive Tech Access",
    type: "Education",
    image: program5,
    impact: "3,000 Devices Distributed",
    outcome:
      "Get assistive tools and training that remove barriers to learning and communication.",
    link: "/resources",
  },
  {
    id: "p-liv-2",
    title: "Women-led Microenterprise",
    type: "Livelihood",
    image: program2,
    impact: "400+ Businesses Started",
    outcome:
      "Launch or grow small businesses with mentoring, startup kits, and peer networks.",
    link: "/resources",
  },
  {
    id: "p-adv-2",
    title: "Community Inclusion Hubs",
    type: "Advocacy",
    image: program1,
    impact: "50+ Hubs Established",
    outcome:
      "Access local support, peer groups, and training close to home with barrier-free spaces.",
    link: "/resources",
  },
];

export default function ProgramCards() {
  return (
    <CardsSection aria-labelledby='program-cards-title'>
      <Container maxWidth='xl'>
        <Box mb={4} textAlign='center'>
          <Typography
            id='program-cards-title'
            variant='h2'
            sx={{ fontWeight: 800, color: "#004c91" }}
          >
            Solutions You Can Use
          </Typography>
          <Typography sx={{ color: "#4b5563", mt: 1 }}>
            Discover practical support to learn, work, and lead.
          </Typography>
        </Box>
        <CardsGrid>
          {programs.map((p) => (
            <Card
              key={p.id}
              category={p.type}
              aria-labelledby={`${p.id}-title`}
            >
              <CardImageWrap>
                <CardImage src={p.image} alt={p.title} />
              </CardImageWrap>
              <CardBody>
                <CardTitle id={`${p.id}-title`}>{p.title}</CardTitle>
                <ImpactMetric aria-label={`Impact: ${p.impact}`}>
                  {p.impact}
                </ImpactMetric>
                <OutcomeText>{p.outcome}</OutcomeText>
                <LearnMoreButton
                  href={p.link}
                  aria-label={`Learn more about ${p.title}`}
                >
                  Learn More
                </LearnMoreButton>
              </CardBody>
            </Card>
          ))}
        </CardsGrid>
      </Container>
    </CardsSection>
  );
}

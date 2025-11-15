import { Container, Typography, Card, CardContent } from "@mui/material";
import { styled } from "@mui/material/styles";
import { Link } from "react-router-dom";
import { useTranslation } from "react-i18next";
import OptimizedImage from "../OptimizedImage";

const ProgramsContainer = styled("section")({
  backgroundColor: "white",
});

const SectionHeading = styled(Typography)(({ theme }) => ({
  fontSize: "2.5rem",
  fontWeight: 600,
  color: "#004c91",
  marginBottom: theme.spacing(6),
  textAlign: "center",
  textTransform: "capitalize",
  [theme.breakpoints.up("md")]: {
    fontSize: "3rem",
  },
}));

const ProgramsGrid = styled("div")(({ theme }) => ({
  display: "grid",
  gridTemplateColumns: "1fr",
  gap: theme.spacing(3),
  [theme.breakpoints.up("sm")]: {
    gridTemplateColumns: "repeat(2, 1fr)",
  },
  [theme.breakpoints.up("md")]: {
    gridTemplateColumns: "repeat(3, 1fr)",
    gap: theme.spacing(4),
  },
}));

const ProgramCard = styled(Card)(({ theme }) => ({
  height: "100%",
  display: "flex",
  flexDirection: "column",
  borderRadius: theme.spacing(2),
  transition: "transform 0.3s ease, box-shadow 0.3s ease",
  boxShadow: "0 4px 12px rgba(0, 0, 0, 0.08)",
  "&:hover": {
    transform: "translateY(-4px)",
    boxShadow: "0 8px 24px rgba(0, 76, 145, 0.15)",
  },
  "&:focus-within": {
    outline: "3px solid #004c91",
    outlineOffset: "2px",
  },
}));

const ProgramTitle = styled(Typography)(({ theme }) => ({
  fontSize: "1rem",
  fontWeight: 700,
  color: "#004c91",
  marginBottom: theme.spacing(1),
  lineHeight: 1.3,
  [theme.breakpoints.up("md")]: {
    fontSize: "1.125rem",
  },
}));

const ProgramDescription = styled(Typography)(({ theme }) => ({
  fontSize: "0.875rem",
  lineHeight: 1.5,
  color: "rgba(0, 0, 0, 0.7)",
  marginBottom: theme.spacing(1.5),
  [theme.breakpoints.up("md")]: {
    fontSize: "0.9375rem",
  },
}));

const LearnMoreButton = styled(Link)(({ theme }) => ({
  backgroundColor: "#f6d469",
  color: "#2b2b2b",
  fontWeight: 700,
  fontSize: "1.25rem",
  padding: theme.spacing(1.5, 4),
  borderRadius: "10px",
  textDecoration: "none",
  display: "inline-block",
  "&:hover, &:focus": {
    backgroundColor: "#f5c943",
    fontWeight: 800,
  },
  "&:focus": {
    outline: "3px solid #004c91",
    outlineOffset: "2px",
  },
}));

export default function ProgramsSection() {
  const { t } = useTranslation();

  const programs = [
    {
      titleKey: "program_disability_title",
      descKey: "program_disability_desc",
      image: "home/program2.jpg",
      alt: "People with disabilities participating in advocacy and awareness programs",
    },
    {
      titleKey: "program_ict_title",
      descKey: "program_ict_desc",
      image: "home/program1.jpg",
      alt: "Person using assistive technology and accessible digital tools",
    },
    {
      titleKey: "program_livelihood_title",
      descKey: "program_livelihood_desc",
      image: "home/program3.jpg",
      alt: "Persons with disabilities participating in vocational training",
    },
    {
      titleKey: "program_life_skills_title",
      descKey: "program_life_skills_desc",
      image: "home/program4.jpg",
      alt: "Youth with disabilities learning practical life skills and education",
    },
    {
      titleKey: "program_women_title",
      descKey: "program_women_desc",
      image: "home/program5.jpg",
      alt: "Community members participating in accessibility and awareness initiatives",
    },
    {
      titleKey: "program_community_title",
      descKey: "program_community_desc",
      image: "home/program6.jpg",
      alt: "Community members participating in accessibility and awareness initiatives",
    },
  ];

  return (
    <ProgramsContainer
      aria-labelledby='programs-heading'
      style={{ paddingTop: "5rem", paddingBottom: "5rem" }}
    >
      <Container maxWidth='xl' sx={{ px: { xs: 2, sm: 3, md: 6 } }}>
        <SectionHeading as='h2' id='programs-heading'>
          {t("programs_heading")}
        </SectionHeading>

        <ProgramsGrid>
          {programs.map((program, index) => (
            <ProgramCard key={index}>
              <div
                style={{
                  width: "100%",
                  aspectRatio: "16 / 9",
                  overflow: "hidden",
                  flexShrink: 0,
                  borderRadius: "16px 16px 0 0",
                }}
              >
                <OptimizedImage
                  src={program.image}
                  alt={program.alt}
                  loading='lazy'
                  sizes='(max-width: 600px) 400px, (max-width: 960px) 50vw, 33vw'
                  style={{
                    width: "100%",
                    height: "100%",
                    objectFit: "cover",
                    objectPosition: "center",
                    display: "block",
                  }}
                />
              </div>
              <CardContent
                sx={{
                  flexGrow: 1,
                  display: "flex",
                  flexDirection: "column",
                  p: 2,
                }}
              >
                <ProgramTitle as='h3'>{t(program.titleKey)}</ProgramTitle>
                <ProgramDescription>{t(program.descKey)}</ProgramDescription>
              </CardContent>
            </ProgramCard>
          ))}
        </ProgramsGrid>

        <div style={{ textAlign: "center", marginTop: "3rem" }}>
          <LearnMoreButton to='/programs'>
            {t("programs_button")}
          </LearnMoreButton>
        </div>
      </Container>
    </ProgramsContainer>
  );
}

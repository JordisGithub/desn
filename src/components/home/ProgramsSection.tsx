import {
  Container,
  Typography,
  Card,
  CardContent,
  CardMedia,
} from "@mui/material";
import { styled } from "@mui/material/styles";
import { Link } from "react-router-dom";
import { useTranslation } from "react-i18next";
import program1 from "../../assets/home/program1.jpg";
import program2 from "../../assets/home/program2.jpg";
import program3 from "../../assets/home/program3.jpg";
import program4 from "../../assets/home/program4.jpg";
import program5 from "../../assets/home/program5.jpg";
import program6 from "../../assets/home/program6.jpg";

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
  gap: theme.spacing(4),
  [theme.breakpoints.up("sm")]: {
    gridTemplateColumns: "repeat(2, 1fr)",
  },
  [theme.breakpoints.up("md")]: {
    gridTemplateColumns: "repeat(3, 1fr)",
  },
}));

const ProgramCard = styled(Card)({
  height: "100%",
  display: "flex",
  flexDirection: "column",
  "&:focus-within": {
    outline: "3px solid #004c91",
    outlineOffset: "2px",
  },
});

const ProgramTitle = styled(Typography)({
  fontSize: "1.25rem",
  fontWeight: 600,
  color: "#004c91",
  marginBottom: "1rem",
});

const ProgramDescription = styled(Typography)({
  fontSize: "1rem",
  lineHeight: 1.5,
  color: "rgba(0, 0, 0, 0.6)",
  marginBottom: "1rem",
});

const CardLearnMoreButton = styled(Link)(({ theme }) => ({
  backgroundColor: "#004c91",
  color: "white",
  fontWeight: 600,
  fontSize: "0.875rem",
  padding: theme.spacing(1, 2),
  borderRadius: "6px",
  textDecoration: "none",
  display: "inline-block",
  textTransform: "uppercase",
  "&:hover": {
    backgroundColor: "#003d73",
  },
  "&:focus": {
    outline: "3px solid #f6d469",
    outlineOffset: "2px",
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
  "&:hover": {
    backgroundColor: "#f5c943",
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
      image: program2,
      alt: "People with disabilities participating in advocacy and awareness programs",
    },
    {
      titleKey: "program_ict_title",
      descKey: "program_ict_desc",
      image: program1,
      alt: "Person using assistive technology and accessible digital tools",
    },
    {
      titleKey: "program_livelihood_title",
      descKey: "program_livelihood_desc",
      image: program3,
      alt: "Persons with disabilities participating in vocational training",
    },
    {
      titleKey: "program_life_skills_title",
      descKey: "program_life_skills_desc",
      image: program4,
      alt: "Youth with disabilities learning practical life skills and education",
    },
    {
      titleKey: "program_women_title",
      descKey: "program_women_desc",
      image: program5,
      alt: "Community members participating in accessibility and awareness initiatives",
    },
    {
      titleKey: "program_community_title",
      descKey: "program_community_desc",
      image: program6,
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
              <CardMedia
                component='div'
                image={program.image}
                sx={{
                  width: "100%",
                  aspectRatio: "1 / 1",
                  backgroundSize: "cover",
                  backgroundPosition: "center",
                  flexShrink: 0,
                }}
                role='img'
                aria-label={program.alt}
              />
              <CardContent
                sx={{
                  flexGrow: 1,
                  display: "flex",
                  flexDirection: "column",
                  justifyContent: "space-between",
                }}
              >
                <div>
                  <ProgramTitle as='h3'>{t(program.titleKey)}</ProgramTitle>
                  <ProgramDescription>{t(program.descKey)}</ProgramDescription>
                </div>
                <div>
                  <CardLearnMoreButton
                    to='/programs'
                    aria-label={`${t("program_learn_more")} - ${t(
                      program.titleKey
                    )}`}
                  >
                    {t("program_learn_more")}
                  </CardLearnMoreButton>
                </div>
              </CardContent>
            </ProgramCard>
          ))}
        </ProgramsGrid>

        <div style={{ textAlign: "center", marginTop: "3rem" }}>
          <LearnMoreButton to='/programs' aria-label={t("programs_button")}>
            {t("programs_button")}
          </LearnMoreButton>
        </div>
      </Container>
    </ProgramsContainer>
  );
}

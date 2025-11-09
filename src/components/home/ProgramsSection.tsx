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
});

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
      image:
        "https://images.unsplash.com/photo-1573497019940-1c28c88b4f3e?w=400",
      alt: "People with disabilities participating in advocacy and awareness programs",
    },
    {
      titleKey: "program_women_title",
      descKey: "program_women_desc",
      image:
        "https://images.unsplash.com/photo-1488521787991-ed7bbaae773c?w=400",
      alt: "Women participating in skill training and empowerment programs",
    },
    {
      titleKey: "program_ict_title",
      descKey: "program_ict_desc",
      image:
        "https://images.unsplash.com/photo-1531482615713-2afd69097998?w=400",
      alt: "Person using assistive technology and accessible digital tools",
    },
    {
      titleKey: "program_livelihood_title",
      descKey: "program_livelihood_desc",
      image: "https://images.unsplash.com/photo-1556761175-4b46a572b786?w=400",
      alt: "Persons with disabilities participating in vocational training",
    },
    {
      titleKey: "program_life_skills_title",
      descKey: "program_life_skills_desc",
      image:
        "https://images.unsplash.com/photo-1503676260728-1c00da094a0b?w=400",
      alt: "Youth with disabilities learning practical life skills and education",
    },
    {
      titleKey: "program_community_title",
      descKey: "program_community_desc",
      image: "https://images.unsplash.com/photo-1559027615-cd4628902d4a?w=400",
      alt: "Community members participating in accessibility and awareness initiatives",
    },
  ];

  return (
    <ProgramsContainer
      aria-labelledby='programs-heading'
      style={{ paddingTop: "5rem", paddingBottom: "5rem" }}
    >
      <Container maxWidth='lg'>
        <SectionHeading as='h2' id='programs-heading'>
          {t("programs_heading")}
        </SectionHeading>

        <ProgramsGrid>
          {programs.map((program, index) => (
            <ProgramCard key={index}>
              <CardMedia
                component='img'
                height='192'
                image={program.image}
                alt={program.alt}
              />
              <CardContent sx={{ flexGrow: 1 }}>
                <ProgramTitle as='h3'>{t(program.titleKey)}</ProgramTitle>
                <ProgramDescription>{t(program.descKey)}</ProgramDescription>
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

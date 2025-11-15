import { Container, Typography, Box } from "@mui/material";
import { styled } from "@mui/material/styles";
import { Link } from "react-router-dom";
import ArrowForwardIcon from "@mui/icons-material/ArrowForward";
import OptimizedImage from "../OptimizedImage";

const ProgramsSectionContainer = styled("section")(({ theme }) => ({
  background: "linear-gradient(135deg, #f0f9ff 0%, #e0f2fe 50%, #f0fdf4 100%)",
  padding: "6rem 0",
  position: "relative",
  "&::before": {
    content: '""',
    position: "absolute",
    top: 0,
    left: 0,
    right: 0,
    height: "1px",
    background:
      "linear-gradient(90deg, transparent, rgba(0, 167, 127, 0.3), transparent)",
  },
  [theme.breakpoints.down("md")]: {
    padding: "4rem 0",
  },
  [theme.breakpoints.down("sm")]: {
    padding: "3rem 0",
  },
}));

const SectionHeading = styled(Typography)(({ theme }) => ({
  fontSize: "2.5rem",
  fontWeight: 700,
  color: theme.palette.primary.main,
  marginBottom: theme.spacing(2),
  textAlign: "center",
  fontFamily: "Poppins, sans-serif",
  letterSpacing: "-0.01em",
  lineHeight: 1.2,
  [theme.breakpoints.down("md")]: {
    fontSize: "2rem",
  },
  [theme.breakpoints.down("sm")]: {
    fontSize: "1.625rem",
  },
}));

const SectionSubheading = styled(Typography)(({ theme }) => ({
  fontSize: "1.125rem",
  fontWeight: 400,
  color: "#5a6c7d",
  textAlign: "center",
  maxWidth: "660px",
  margin: "0 auto",
  marginBottom: theme.spacing(6),
  lineHeight: 1.6,
  [theme.breakpoints.down("md")]: {
    fontSize: "1.0625rem",
    marginBottom: theme.spacing(5),
    maxWidth: "90%",
  },
  [theme.breakpoints.down("sm")]: {
    fontSize: "1rem",
    marginBottom: theme.spacing(4),
  },
}));

const ProgramsGrid = styled("div")(({ theme }) => ({
  display: "grid",
  gridTemplateColumns: "1fr",
  gap: theme.spacing(3),
  marginBottom: theme.spacing(2),
  [theme.breakpoints.up("sm")]: {
    gridTemplateColumns: "repeat(2, 1fr)",
    gap: theme.spacing(3.5),
  },
  [theme.breakpoints.up("md")]: {
    gridTemplateColumns: "repeat(3, 1fr)",
    gap: theme.spacing(4),
  },
}));

const ProgramCard = styled(Box)(({ theme }) => ({
  backgroundColor: "white",
  borderRadius: "20px",
  overflow: "hidden",
  transition: "all 0.35s cubic-bezier(0.4, 0, 0.2, 1)",
  boxShadow: "0 4px 20px rgba(0, 0, 0, 0.08)",
  display: "flex",
  flexDirection: "column",
  height: "100%",
  border: "2px solid transparent",
  position: "relative",
  "&::before": {
    content: '""',
    position: "absolute",
    top: 0,
    left: 0,
    right: 0,
    height: "4px",
    background: "linear-gradient(90deg, #00a77f, #004c91, #f6d469)",
    opacity: 0,
    transition: "opacity 0.35s ease",
  },
  "&:hover": {
    transform: "translateY(-6px) scale(1.01)",
    boxShadow: "0 16px 40px rgba(0, 76, 145, 0.18)",
    borderColor: theme.palette.secondary.main,
    "&::before": {
      opacity: 1,
    },
    "& .program-image": {
      transform: "scale(1.08)",
    },
  },
  "&:focus-within": {
    outline: `3px solid ${theme.palette.primary.main}`,
    outlineOffset: "4px",
    "&::before": {
      opacity: 1,
    },
  },
  [theme.breakpoints.down("sm")]: {
    marginBottom: theme.spacing(2),
  },
}));

const ImageContainer = styled("div")(({ theme }) => ({
  width: "100%",
  height: "280px",
  position: "relative",
  overflow: "hidden",
  backgroundColor: "#f0f2f5",
  "&::after": {
    content: '""',
    position: "absolute",
    bottom: 0,
    left: 0,
    right: 0,
    height: "50%",
    background: "linear-gradient(to top, rgba(0, 0, 0, 0.3), transparent)",
    pointerEvents: "none",
  },
  [theme.breakpoints.down("md")]: {
    height: "260px",
  },
  [theme.breakpoints.down("sm")]: {
    height: "240px",
  },
}));

const CardContent = styled("div")(({ theme }) => ({
  padding: theme.spacing(3.5),
  display: "flex",
  flexDirection: "column",
  flexGrow: 1,
  backgroundColor: "white",
  [theme.breakpoints.down("sm")]: {
    padding: theme.spacing(3),
  },
}));

const ProgramTitle = styled(Typography)(({ theme }) => ({
  fontSize: "1.4rem",
  fontWeight: 700,
  color: theme.palette.primary.main,
  marginBottom: theme.spacing(1.75),
  lineHeight: 1.3,
  fontFamily: "Poppins, sans-serif",
  [theme.breakpoints.down("md")]: {
    fontSize: "1.3rem",
    marginBottom: theme.spacing(1.5),
  },
  [theme.breakpoints.down("sm")]: {
    fontSize: "1.2rem",
  },
}));

const ProgramBenefit = styled(Typography)(({ theme }) => ({
  fontSize: "1.0625rem",
  lineHeight: 1.7,
  color: "#4a5568",
  marginBottom: 0,
  flexGrow: 1,
  [theme.breakpoints.down("md")]: {
    fontSize: "1rem",
  },
  [theme.breakpoints.down("sm")]: {
    fontSize: "0.9375rem",
  },
}));

const ViewAllButton = styled(Link)(({ theme }) => ({
  display: "inline-flex",
  alignItems: "center",
  justifyContent: "center",
  gap: theme.spacing(1.5),
  backgroundColor: theme.palette.secondary.main,
  color: "white",
  fontWeight: 700,
  fontSize: "1.125rem",
  padding: theme.spacing(2, 5),
  borderRadius: "12px",
  textDecoration: "none",
  textTransform: "uppercase",
  letterSpacing: "0.5px",
  transition: "all 0.3s ease",
  fontFamily: "Poppins, sans-serif",
  boxShadow: "0 4px 14px rgba(0, 167, 127, 0.3)",
  "& .MuiSvgIcon-root": {
    fontSize: "1.5rem",
    transition: "transform 0.3s ease",
  },
  "&:hover": {
    backgroundColor: "#006d54",
    transform: "translateY(-2px)",
    boxShadow: "0 8px 24px rgba(0, 167, 127, 0.4)",
    "& .MuiSvgIcon-root": {
      transform: "translateX(6px)",
    },
  },
  "&:focus": {
    outline: `3px solid ${theme.palette.primary.main}`,
    outlineOffset: "4px",
  },
  [theme.breakpoints.down("sm")]: {
    fontSize: "1rem",
    padding: theme.spacing(1.75, 4),
  },
}));

const CTAContainer = styled("div")(({ theme }) => ({
  textAlign: "center",
  marginTop: theme.spacing(6),
  [theme.breakpoints.down("md")]: {
    marginTop: theme.spacing(5),
  },
  [theme.breakpoints.down("sm")]: {
    marginTop: theme.spacing(4),
  },
}));

export default function ProgramsSection() {
  const programs = [
    {
      title: "Disability Rights & Advocacy",
      benefit:
        "Persons with disabilities gain equal rights, full participation, and barrier-free access to services.",
      image: "home/program2.jpg",
      alt: "People with disabilities participating in advocacy and awareness programs",
    },
    {
      title: "Accessible Technology",
      benefit:
        "Communities access digital tools and assistive technology that enable independence and connectivity.",
      image: "home/program1.jpg",
      alt: "Person using assistive technology and accessible digital tools",
    },
    {
      title: "Economic Empowerment",
      benefit:
        "Individuals build sustainable livelihoods through vocational training and entrepreneurship support.",
      image: "home/program3.jpg",
      alt: "Persons with disabilities participating in vocational training",
    },
    {
      title: "Education & Life Skills",
      benefit:
        "Youth develop confidence and self-reliance through practical education and essential life skills.",
      image: "home/program4.jpg",
      alt: "Youth with disabilities learning practical life skills and education",
    },
    {
      title: "Women's Empowerment",
      benefit:
        "Vulnerable women gain skills, income opportunities, and community inclusion for a better future.",
      image: "home/program5.jpg",
      alt: "Women participating in empowerment programs",
    },
    {
      title: "Community Inclusion",
      benefit:
        "Communities become more inclusive through awareness programs and accessibility initiatives.",
      image: "home/program6.jpg",
      alt: "Community members participating in accessibility and awareness initiatives",
    },
  ];

  return (
    <ProgramsSectionContainer aria-labelledby='programs-heading'>
      <Container maxWidth='xl' sx={{ px: { xs: 2.5, sm: 3, md: 6, lg: 8 } }}>
        <SectionHeading as='h2' id='programs-heading'>
          Our Programs: How We Create Change
        </SectionHeading>

        <SectionSubheading>
          We focus on six key areas to ensure comprehensive empowerment and
          lasting impact for persons with disabilities across Nepal.
        </SectionSubheading>

        <ProgramsGrid>
          {programs.map((program, index) => (
            <ProgramCard
              key={index}
              role='article'
              aria-labelledby={`program-title-${index}`}
            >
              <ImageContainer>
                <OptimizedImage
                  src={program.image}
                  alt={program.alt}
                  loading='lazy'
                  sizes='(max-width: 600px) 100vw, (max-width: 960px) 50vw, 33vw'
                  className='program-image'
                  style={{
                    width: "100%",
                    height: "100%",
                    objectFit: "cover",
                    objectPosition: "center",
                    display: "block",
                    transition: "transform 0.35s cubic-bezier(0.4, 0, 0.2, 1)",
                  }}
                />
              </ImageContainer>

              <CardContent>
                <ProgramTitle as='h3' id={`program-title-${index}`}>
                  {program.title}
                </ProgramTitle>

                <ProgramBenefit>{program.benefit}</ProgramBenefit>
              </CardContent>
            </ProgramCard>
          ))}
        </ProgramsGrid>

        <CTAContainer>
          <ViewAllButton
            to='/programs'
            aria-label='View all programs and services'
          >
            View All Programs
            <ArrowForwardIcon />
          </ViewAllButton>
        </CTAContainer>
      </Container>
    </ProgramsSectionContainer>
  );
}

import { Container, Box } from "@mui/material";
import { styled } from "@mui/material/styles";
import introImage from "../../assets/AboutUs/AboutUsIntro.jpg";

const SectionContainer = styled("section")(({ theme }) => ({
  backgroundColor: "#F0F4F8",
  paddingTop: theme.spacing(5),
  paddingBottom: theme.spacing(5),
  [theme.breakpoints.down("md")]: {
    paddingTop: theme.spacing(4),
    paddingBottom: theme.spacing(4),
  },
}));

const ImageWrapper = styled(Box)(({ theme }) => ({
  position: "relative",
  width: "100%",
  maxWidth: "1200px",
  margin: "0 auto",
  borderRadius: "16px",
  overflow: "hidden",
  boxShadow: "0 10px 30px rgba(0, 76, 145, 0.15)",
  border: "1px solid #e5e7eb",
  transition: "all 0.4s ease",
  "&:hover": {
    transform: "translateY(-8px)",
    boxShadow: "0 20px 60px rgba(0, 76, 145, 0.25)",
  },
  "&:focus-within": {
    outline: "3px solid #f6d469",
    outlineOffset: "4px",
  },
  // Decorative corner accent
  "&::before": {
    content: '""',
    position: "absolute",
    top: 0,
    left: 0,
    width: "120px",
    height: "120px",
    background: "linear-gradient(135deg, #004c91 0%, transparent 100%)",
    opacity: 0.15,
    zIndex: 1,
    [theme.breakpoints.down("sm")]: {
      width: "80px",
      height: "80px",
    },
  },
  "&::after": {
    content: '""',
    position: "absolute",
    bottom: 0,
    right: 0,
    width: "120px",
    height: "120px",
    background: "linear-gradient(-45deg, #00a77f 0%, transparent 100%)",
    opacity: 0.15,
    zIndex: 1,
    [theme.breakpoints.down("sm")]: {
      width: "80px",
      height: "80px",
    },
  },
}));

const StyledImage = styled("img")({
  width: "100%",
  height: "auto",
  display: "block",
  position: "relative",
  zIndex: 0,
});

export default function IntroImageSection() {
  return (
    <SectionContainer
      role='region'
      aria-label='Organization Introduction Image'
    >
      <Container maxWidth='xl' sx={{ px: { xs: 2, sm: 3, md: 6 } }}>
        <ImageWrapper
          role='img'
          tabIndex={0}
          aria-label='Organization introduction: Community members participating in empowerment programs'
        >
          <StyledImage
            src={introImage}
            alt="Disabled People's Self-Help Network members engaged in community activities and empowerment programs. The image shows diverse individuals with disabilities participating in organizational initiatives."
            loading='lazy'
            role='presentation'
          />
        </ImageWrapper>
      </Container>
    </SectionContainer>
  );
}

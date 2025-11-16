import { Box, Container, Typography } from "@mui/material";
import { styled } from "@mui/material/styles";

const IntroSection = styled("section")(({ theme }) => ({
  padding: theme.spacing(12, 4),
  backgroundColor: "#ffffff",
}));

const IntroWrapper = styled(Container)({
  maxWidth: 1200,
});

const IntroHeading = styled(Typography)(({ theme }) => ({
  fontSize: "2.25rem",
  fontWeight: 700,
  color: "#004c91",
  textAlign: "center",
  marginBottom: theme.spacing(2),
}));

const IntroText = styled(Typography)(({ theme }) => ({
  fontSize: "1.125rem",
  color: "#364153",
  textAlign: "center",
  maxWidth: 960,
  margin: "0 auto",
}));

export default function ProgramIntro() {
  return (
    <IntroSection aria-labelledby='program-intro-title'>
      <IntroWrapper>
        <IntroHeading id='program-intro-title'>
          Our Work is Divided into 3 Pillars
        </IntroHeading>
        <IntroText>
          Education, Livelihood, and Advocacy — practical solutions that help
          people with disabilities learn, work, and lead with dignity.
        </IntroText>
      </IntroWrapper>
    </IntroSection>
  );
}

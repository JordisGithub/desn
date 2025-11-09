import { Container, Typography, Box } from "@mui/material";
import { styled } from "@mui/material/styles";
import { useTranslation } from "react-i18next";

const SectionContainer = styled("section")(({ theme }) => ({
  backgroundColor: "white",
  paddingTop: theme.spacing(8),
  paddingBottom: theme.spacing(8),
}));

const SectionTitle = styled(Typography)(({ theme }) => ({
  fontSize: "3rem",
  fontWeight: 400,
  color: "#004c91",
  marginBottom: theme.spacing(1),
  [theme.breakpoints.down("md")]: {
    fontSize: "2.5rem",
  },
}));

const UnderlineBar = styled(Box)({
  width: "155px",
  height: "4px",
  backgroundColor: "#00a77f",
  borderRadius: "16777200px",
  marginBottom: "32px",
});

const IntroHeading = styled(Typography)(({ theme }) => ({
  fontSize: "2rem",
  fontWeight: 400,
  color: "#004c91",
  marginBottom: theme.spacing(2),
}));

const IntroText = styled(Typography)(({ theme }) => ({
  fontSize: "1.125rem",
  color: "#364153",
  lineHeight: 1.5,
  marginBottom: theme.spacing(3),
}));

const SubtitleText = styled(Typography)(({ theme }) => ({
  fontSize: "1.125rem",
  color: "black",
  lineHeight: 1.67,
  marginBottom: theme.spacing(4),
}));

const ImageContainer = styled(Box)(({ theme }) => ({
  width: "100%",
  height: "490px",
  overflow: "hidden",
  borderRadius: "14px",
  boxShadow:
    "0px 10px 15px -3px rgba(0,0,0,0.1), 0px 4px 6px -4px rgba(0,0,0,0.1)",
  "& img": {
    width: "100%",
    height: "100%",
    objectFit: "cover",
  },
  [theme.breakpoints.down("md")]: {
    height: "300px",
    marginBottom: theme.spacing(4),
  },
}));

const ContentGrid = styled(Box)(({ theme }) => ({
  display: "flex",
  gap: theme.spacing(6),
  alignItems: "center",
  [theme.breakpoints.down("md")]: {
    flexDirection: "column",
  },
}));

const TextColumn = styled(Box)({
  flex: 1,
});

const ImageColumn = styled(Box)({
  flex: 1,
});

export default function IntroductionSection() {
  const { t } = useTranslation();

  return (
    <SectionContainer aria-labelledby='intro-heading'>
      <Container maxWidth='lg'>
        <Box textAlign='center' mb={6}>
          <SectionTitle variant='h2' id='intro-heading'>
            {t("about_intro_section_title")}
          </SectionTitle>
          <UnderlineBar mx='auto' />
          <SubtitleText>{t("about_intro_subtitle")}</SubtitleText>
        </Box>

        <ContentGrid>
          <TextColumn>
            <IntroHeading variant='h3'>{t("about_intro_heading")}</IntroHeading>
            <IntroText>{t("about_intro_text_1")}</IntroText>
            <IntroText>{t("about_intro_text_2")}</IntroText>
          </TextColumn>
          <ImageColumn>
            <ImageContainer>
              <img
                src='https://images.unsplash.com/photo-1582213782179-e0d53f98f2ca?w=800'
                alt={t("about_intro_image_alt")}
              />
            </ImageContainer>
          </ImageColumn>
        </ContentGrid>
      </Container>
    </SectionContainer>
  );
}

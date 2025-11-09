import { Box, Button, Container, Typography } from "@mui/material";
import { styled } from "@mui/material/styles";
import { useTranslation } from "react-i18next";
import ArrowForwardIcon from "@mui/icons-material/ArrowForward";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import AccessibilityNewIcon from "@mui/icons-material/AccessibilityNew";
import VolunteerActivismIcon from "@mui/icons-material/VolunteerActivism";
import SchoolIcon from "@mui/icons-material/School";
import ComputerIcon from "@mui/icons-material/Computer";
import {
  imgProgramDisabilityInclusion,
  imgProgramAccessibleICT,
  imgProgramLivelihood,
  imgProgramLifeSkills,
  imgProgramCommunity,
} from "../../constants/figmaAssets";

const CoreProgramsSection = styled("section")({
  backgroundColor: "#f9fafb",
  padding: "96px 32px",
});

const SectionHeader = styled(Box)({
  textAlign: "center",
  marginBottom: "80px",
});

const SectionTitle = styled(Typography)({
  fontSize: "48px",
  fontWeight: 400,
  lineHeight: "48px",
  color: "#004c91",
  marginBottom: "24px",
  fontFamily: "Poppins, sans-serif",
});

const SectionDescription = styled(Typography)({
  fontSize: "20px",
  fontWeight: 400,
  lineHeight: "32.5px",
  color: "#4a5565",
  maxWidth: "896px",
  margin: "0 auto",
  fontFamily: "Roboto, sans-serif",
});

const ProgramCard = styled(Box)({
  backgroundColor: "white",
  border: "2px solid #e5e7eb",
  borderRadius: "24px",
  overflow: "hidden",
  marginBottom: "64px",
});

const HorizontalCard = styled(Box)({
  display: "grid",
  gridTemplateColumns: "1fr 1fr",
  "@media (max-width: 900px)": {
    gridTemplateColumns: "1fr",
  },
});

const ProgramImage = styled("img")({
  width: "100%",
  height: "500px",
  objectFit: "cover",
});

const ProgramContent = styled(Box)({
  padding: "48px",
  display: "flex",
  flexDirection: "column",
  justifyContent: "space-between",
});

const Badge = styled(Box)<{ bgcolor: string }>(({ bgcolor }) => ({
  display: "inline-block",
  backgroundColor: bgcolor,
  border: "1px solid rgba(0, 0, 0, 0)",
  borderRadius: "8px",
  padding: "9px 17px",
  marginBottom: "24px",
}));

const BadgeText = styled(Typography)({
  fontSize: "16px",
  fontWeight: 500,
  color: "#2b2b2b",
  lineHeight: "24px",
  fontFamily: "Roboto, sans-serif",
});

const ProgramTitle = styled(Typography)({
  fontSize: "36px",
  fontWeight: 400,
  lineHeight: "40px",
  color: "#004c91",
  marginBottom: "24px",
  fontFamily: "Poppins, sans-serif",
});

const ProgramDescription = styled(Typography)({
  fontSize: "20px",
  fontWeight: 400,
  lineHeight: "32.5px",
  color: "#364153",
  marginBottom: "32px",
  fontFamily: "Roboto, sans-serif",
});

const StatsContainer = styled(Box)({
  display: "grid",
  gridTemplateColumns: "repeat(3, 1fr)",
  borderBottom: "2px solid #e5e7eb",
  paddingBottom: "32px",
  marginBottom: "32px",
});

const StatItem = styled(Box)({
  display: "flex",
  flexDirection: "column",
  gap: "8px",
});

const StatNumber = styled(Typography)<{ color?: string }>(({ color }) => ({
  fontSize: "30px",
  fontWeight: 400,
  lineHeight: "36px",
  color: color || "#004c91",
  fontFamily: "Roboto, sans-serif",
}));

const StatLabel = styled(Typography)({
  fontSize: "16px",
  fontWeight: 400,
  lineHeight: "24px",
  color: "#4a5565",
  fontFamily: "Roboto, sans-serif",
});

const FeaturesTitle = styled(Typography)({
  fontSize: "20px",
  fontWeight: 400,
  lineHeight: "28px",
  color: "#004c91",
  marginBottom: "16px",
  fontFamily: "Poppins, sans-serif",
});

const FeaturesList = styled(Box)({
  display: "flex",
  flexDirection: "column",
  gap: "12px",
  marginBottom: "32px",
});

const FeatureItem = styled(Box)({
  display: "flex",
  alignItems: "flex-start",
  gap: "12px",
});

const FeatureText = styled(Typography)({
  fontSize: "18px",
  fontWeight: 400,
  lineHeight: "28px",
  color: "#364153",
  fontFamily: "Roboto, sans-serif",
});

const LearnMoreButton = styled(Button)({
  backgroundColor: "#004c91",
  color: "white",
  fontSize: "18px",
  fontWeight: 400,
  padding: "20px 0",
  borderRadius: "14px",
  textTransform: "none",
  boxShadow:
    "0px 10px 15px -3px rgba(0,0,0,0.1), 0px 4px 6px -4px rgba(0,0,0,0.1)",
  fontFamily: "Roboto, sans-serif",
  width: "100%",
  "&:hover": {
    backgroundColor: "#003d73",
  },
  "&:focus": {
    outline: "3px solid #f6d469",
    outlineOffset: "2px",
  },
});

// Vertical Card Components
const VerticalCardsGrid = styled(Box)(({ theme }) => ({
  display: "grid",
  gridTemplateColumns: "repeat(1, 1fr)",
  gap: "40px",
  [theme.breakpoints.up("sm")]: {
    gridTemplateColumns: "repeat(2, 1fr)",
  },
  [theme.breakpoints.up("md")]: {
    gridTemplateColumns: "repeat(3, 1fr)",
  },
}));

const VerticalCard = styled(Box)({
  backgroundColor: "white",
  border: "2px solid #e5e7eb",
  borderRadius: "24px",
  overflow: "hidden",
});

const VerticalCardImage = styled("img")({
  width: "100%",
  height: "320px",
  objectFit: "cover",
});

const VerticalCardContent = styled(Box)({
  padding: "32px",
});

const VerticalCardTitle = styled(Typography)({
  fontSize: "24px",
  fontWeight: 400,
  lineHeight: "32px",
  color: "#004c91",
  marginBottom: "24px",
  fontFamily: "Poppins, sans-serif",
});

const VerticalCardDescription = styled(Typography)({
  fontSize: "18px",
  fontWeight: 400,
  lineHeight: "29.25px",
  color: "#364153",
  marginBottom: "32px",
  fontFamily: "Roboto, sans-serif",
});

const VerticalStatsContainer = styled(Box)({
  display: "grid",
  gridTemplateColumns: "repeat(3, 1fr)",
  gap: "16px",
  borderBottom: "2px solid #e5e7eb",
  paddingBottom: "26px",
  marginBottom: "32px",
});

const VerticalStatNumber = styled(Typography)<{ color?: string }>(
  ({ color }) => ({
    fontSize: "20px",
    fontWeight: 400,
    lineHeight: "28px",
    color: color || "#004c91",
    fontFamily: "Roboto, sans-serif",
  })
);

const VerticalStatLabel = styled(Typography)({
  fontSize: "14px",
  fontWeight: 400,
  lineHeight: "20px",
  color: "#4a5565",
  fontFamily: "Roboto, sans-serif",
});

const VerticalLearnMoreButton = styled(Button)({
  backgroundColor: "#004c91",
  color: "white",
  fontSize: "18px",
  fontWeight: 400,
  padding: "16px 0",
  borderRadius: "14px",
  textTransform: "none",
  boxShadow:
    "0px 10px 15px -3px rgba(0,0,0,0.1), 0px 4px 6px -4px rgba(0,0,0,0.1)",
  fontFamily: "Roboto, sans-serif",
  width: "100%",
  "&:hover": {
    backgroundColor: "#003d73",
  },
  "&:focus": {
    outline: "3px solid #f6d469",
    outlineOffset: "2px",
  },
});

const IconBadge = styled(Box)<{ bgcolor: string; borderColor?: string }>(
  ({ bgcolor, borderColor }) => ({
    display: "inline-flex",
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: bgcolor,
    border: borderColor ? `2px solid ${borderColor}` : "2px solid #2b2b2b",
    borderRadius: "16px",
    width: "100px",
    height: "100px",
    position: "absolute",
    top: "16px",
    left: "16px",
    "& svg": {
      fontSize: "48px",
    },
  })
);

export default function CorePrograms() {
  const { t } = useTranslation();

  return (
    <CoreProgramsSection
      id='core-programs'
      aria-labelledby='core-programs-title'
    >
      <Container maxWidth='xl'>
        <SectionHeader>
          <SectionTitle id='core-programs-title'>
            {t("programs:core.title")}
          </SectionTitle>
          <SectionDescription>
            {t("programs:core.description")}
          </SectionDescription>
        </SectionHeader>

        {/* Program 1: Disability and Inclusion */}
        <ProgramCard>
          <HorizontalCard>
            <Box position='relative'>
              <ProgramImage
                src={imgProgramDisabilityInclusion}
                alt={t("programs:core.program1.image_alt")}
              />
              <IconBadge
                bgcolor='rgba(0, 76, 145, 0.1)'
                sx={{ color: "#2b2b2b" }}
              >
                <AccessibilityNewIcon />
              </IconBadge>
            </Box>
            <ProgramContent>
              <div>
                <Badge bgcolor='rgba(0, 76, 145, 0.1)'>
                  <BadgeText>{t("programs:core.program1.badge")}</BadgeText>
                </Badge>
                <ProgramTitle>{t("programs:core.program1.title")}</ProgramTitle>
                <ProgramDescription>
                  {t("programs:core.program1.description")}
                </ProgramDescription>
                <StatsContainer>
                  <StatItem>
                    <StatNumber>5000+</StatNumber>
                    <StatLabel>{t("programs:core.beneficiaries")}</StatLabel>
                  </StatItem>
                  <StatItem>
                    <StatNumber>25</StatNumber>
                    <StatLabel>{t("programs:core.projects")}</StatLabel>
                  </StatItem>
                  <StatItem>
                    <StatNumber>High</StatNumber>
                    <StatLabel>{t("programs:core.impact")}</StatLabel>
                  </StatItem>
                </StatsContainer>
                <FeaturesTitle>{t("programs:core.key_features")}</FeaturesTitle>
                <FeaturesList>
                  {Array.isArray(
                    t("programs:core.program1.features", {
                      returnObjects: true,
                    })
                  ) &&
                    (
                      t("programs:core.program1.features", {
                        returnObjects: true,
                      }) as string[]
                    ).map((feature: string, index: number) => (
                      <FeatureItem key={index}>
                        <CheckCircleIcon
                          sx={{ color: "#00a77f", fontSize: "24px" }}
                        />
                        <FeatureText>{feature}</FeatureText>
                      </FeatureItem>
                    ))}
                </FeaturesList>
              </div>
              <LearnMoreButton endIcon={<ArrowForwardIcon />}>
                {t("programs:core.learn_more")}
              </LearnMoreButton>
            </ProgramContent>
          </HorizontalCard>
        </ProgramCard>

        {/* Program 2: Helpless and Single Women Empowerment */}
        <ProgramCard>
          <HorizontalCard>
            <ProgramContent sx={{ order: { xs: 2, md: 1 } }}>
              <div>
                <Badge bgcolor='rgba(150, 89, 149, 0.1)'>
                  <BadgeText>{t("programs:core.program2.badge")}</BadgeText>
                </Badge>
                <ProgramTitle>{t("programs:core.program2.title")}</ProgramTitle>
                <ProgramDescription>
                  {t("programs:core.program2.description")}
                </ProgramDescription>
                <StatsContainer>
                  <StatItem>
                    <StatNumber color='#351c42'>1200+</StatNumber>
                    <StatLabel>{t("programs:core.beneficiaries")}</StatLabel>
                  </StatItem>
                  <StatItem>
                    <StatNumber color='#2b2b2b'>15</StatNumber>
                    <StatLabel>{t("programs:core.projects")}</StatLabel>
                  </StatItem>
                  <StatItem>
                    <StatNumber color='#2b2b2b'>High</StatNumber>
                    <StatLabel>{t("programs:core.impact")}</StatLabel>
                  </StatItem>
                </StatsContainer>
                <FeaturesTitle>{t("programs:core.key_features")}</FeaturesTitle>
                <FeaturesList>
                  {Array.isArray(
                    t("programs:core.program2.features", {
                      returnObjects: true,
                    })
                  ) &&
                    (
                      t("programs:core.program2.features", {
                        returnObjects: true,
                      }) as string[]
                    ).map((feature: string, index: number) => (
                      <FeatureItem key={index}>
                        <CheckCircleIcon
                          sx={{ color: "#00a77f", fontSize: "24px" }}
                        />
                        <FeatureText>{feature}</FeatureText>
                      </FeatureItem>
                    ))}
                </FeaturesList>
              </div>
              <LearnMoreButton endIcon={<ArrowForwardIcon />}>
                {t("programs:core.learn_more")}
              </LearnMoreButton>
            </ProgramContent>
            <Box position='relative' sx={{ order: { xs: 1, md: 2 } }}>
              <ProgramImage
                src={imgProgramCommunity}
                alt={t("programs:core.program2.image_alt")}
              />
              <IconBadge
                bgcolor='white'
                borderColor='#2b2b2b'
                sx={{ color: "#2b2b2b", right: "32px", left: "auto" }}
              >
                <VolunteerActivismIcon />
              </IconBadge>
            </Box>
          </HorizontalCard>
        </ProgramCard>

        {/* Programs 3, 4, 5: Vertical Cards */}
        <VerticalCardsGrid>
          {/* Program 3: Life Skills and Education Development */}
          <VerticalCard>
            <Box position='relative'>
              <VerticalCardImage
                src={imgProgramLifeSkills}
                alt={t("programs:core.program3.image_alt")}
              />
              <Badge
                bgcolor='#2b2b2b'
                sx={{
                  position: "absolute",
                  top: "24px",
                  right: "24px",
                  left: "auto",
                }}
              >
                <BadgeText sx={{ color: "white" }}>
                  {t("programs:core.program3.badge")}
                </BadgeText>
              </Badge>
              <IconBadge
                bgcolor='white'
                borderColor='transparent'
                sx={{ color: "#2b2b2b" }}
              >
                <SchoolIcon />
              </IconBadge>
            </Box>
            <VerticalCardContent>
              <VerticalCardTitle>
                {t("programs:core.program3.title")}
              </VerticalCardTitle>
              <VerticalCardDescription>
                {t("programs:core.program3.description")}
              </VerticalCardDescription>
              <VerticalStatsContainer>
                <StatItem>
                  <VerticalStatNumber color='#00a77f'>3000+</VerticalStatNumber>
                  <VerticalStatLabel>
                    {t("programs:core.beneficiaries")}
                  </VerticalStatLabel>
                </StatItem>
                <StatItem>
                  <VerticalStatNumber>30</VerticalStatNumber>
                  <VerticalStatLabel>
                    {t("programs:core.projects")}
                  </VerticalStatLabel>
                </StatItem>
                <StatItem>
                  <VerticalStatNumber>Very High</VerticalStatNumber>
                  <VerticalStatLabel>
                    {t("programs:core.impact")}
                  </VerticalStatLabel>
                </StatItem>
              </VerticalStatsContainer>
              <VerticalLearnMoreButton endIcon={<ArrowForwardIcon />}>
                {t("programs:core.learn_more")}
              </VerticalLearnMoreButton>
            </VerticalCardContent>
          </VerticalCard>

          {/* Program 4: Livelihood Development */}
          <VerticalCard>
            <Box position='relative'>
              <VerticalCardImage
                src={imgProgramLivelihood}
                alt={t("programs:core.program4.image_alt")}
              />
              <Badge
                bgcolor='#004c91'
                sx={{
                  position: "absolute",
                  top: "12px",
                  right: "12px",
                  left: "auto",
                }}
              >
                <BadgeText sx={{ color: "white" }}>
                  {t("programs:core.program4.badge")}
                </BadgeText>
              </Badge>
            </Box>
            <VerticalCardContent>
              <VerticalCardTitle>
                {t("programs:core.program4.title")}
              </VerticalCardTitle>
              <VerticalCardDescription>
                {t("programs:core.program4.description")}
              </VerticalCardDescription>
              <VerticalStatsContainer>
                <StatItem>
                  <VerticalStatNumber>2500+</VerticalStatNumber>
                  <VerticalStatLabel>
                    {t("programs:core.beneficiaries")}
                  </VerticalStatLabel>
                </StatItem>
                <StatItem>
                  <VerticalStatNumber>20</VerticalStatNumber>
                  <VerticalStatLabel>
                    {t("programs:core.projects")}
                  </VerticalStatLabel>
                </StatItem>
                <StatItem>
                  <VerticalStatNumber>High</VerticalStatNumber>
                  <VerticalStatLabel>
                    {t("programs:core.impact")}
                  </VerticalStatLabel>
                </StatItem>
              </VerticalStatsContainer>
              <VerticalLearnMoreButton endIcon={<ArrowForwardIcon />}>
                {t("programs:core.learn_more")}
              </VerticalLearnMoreButton>
            </VerticalCardContent>
          </VerticalCard>

          {/* Program 5: Accessible ICTs and Assistive Technology */}
          <VerticalCard>
            <Box position='relative'>
              <VerticalCardImage
                src={imgProgramAccessibleICT}
                alt={t("programs:core.program5.image_alt")}
              />
              <Badge
                bgcolor='white'
                sx={{
                  position: "absolute",
                  top: "20px",
                  right: "12px",
                  left: "auto",
                }}
              >
                <BadgeText sx={{ color: "#004c91" }}>
                  {t("programs:core.program5.badge")}
                </BadgeText>
              </Badge>
              <IconBadge
                bgcolor='white'
                borderColor='#004c91'
                sx={{ color: "#004c91" }}
              >
                <ComputerIcon />
              </IconBadge>
            </Box>
            <VerticalCardContent>
              <VerticalCardTitle>
                {t("programs:core.program5.title")}
              </VerticalCardTitle>
              <VerticalCardDescription>
                {t("programs:core.program5.description")}
              </VerticalCardDescription>
              <VerticalStatsContainer>
                <StatItem>
                  <VerticalStatNumber>4000+</VerticalStatNumber>
                  <VerticalStatLabel>
                    {t("programs:core.beneficiaries")}
                  </VerticalStatLabel>
                </StatItem>
                <StatItem>
                  <VerticalStatNumber>18</VerticalStatNumber>
                  <VerticalStatLabel>
                    {t("programs:core.projects")}
                  </VerticalStatLabel>
                </StatItem>
                <StatItem>
                  <VerticalStatNumber>Very High</VerticalStatNumber>
                  <VerticalStatLabel>
                    {t("programs:core.impact")}
                  </VerticalStatLabel>
                </StatItem>
              </VerticalStatsContainer>
              <VerticalLearnMoreButton endIcon={<ArrowForwardIcon />}>
                {t("programs:core.learn_more")}
              </VerticalLearnMoreButton>
            </VerticalCardContent>
          </VerticalCard>
        </VerticalCardsGrid>
      </Container>
    </CoreProgramsSection>
  );
}

import { usePageTitle } from "../hooks/usePageTitle";
import { Box } from "@mui/material";
import MissionVisionHeroSection from "../components/about/MissionVisionHeroSection";
import IntegratedMissionVisionSection from "../components/about/IntegratedMissionVisionSection";
import FoundingFactsSection from "../components/about/FoundingFactsSection";
import CoreValuesSection from "../components/about/CoreValuesSection";
import ObjectivesCleanSection from "../components/about/ObjectivesCleanSection";
import OurTeamSection from "../components/about/OurTeamSection";
import PartnersSection from "../components/home/PartnersSection";
import AboutCTASection from "../components/about/AboutCTASection";

export default function About() {
  usePageTitle("page_titles.about");

  return (
    <Box
      component='main'
      sx={{ backgroundColor: "#F0F4F8" }}
      role='main'
      aria-label='About DESN'
    >
      <MissionVisionHeroSection />
      <IntegratedMissionVisionSection />
      <FoundingFactsSection />
      <CoreValuesSection />
      <ObjectivesCleanSection />
      <OurTeamSection />
      <PartnersSection />
      <AboutCTASection />
    </Box>
  );
}

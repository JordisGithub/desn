import { usePageTitle } from "../hooks/usePageTitle";
import MissionVisionHeroSection from "../components/about/MissionVisionHeroSection";
import FoundingFactsSection from "../components/about/FoundingFactsSection";
import CoreValuesSection from "../components/about/CoreValuesSection";
import ObjectivesCleanSection from "../components/about/ObjectivesCleanSection";
import OurTeamSection from "../components/about/OurTeamSection";
import PartnersSection from "../components/home/PartnersSection";
import AboutCTASection from "../components/about/AboutCTASection";

export default function About() {
  usePageTitle("page_titles.about");

  return (
    <>
      <MissionVisionHeroSection />
      <FoundingFactsSection />
      <CoreValuesSection />
      <ObjectivesCleanSection />
      <OurTeamSection />
      <PartnersSection />
      <AboutCTASection />
    </>
  );
}

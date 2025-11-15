import { usePageTitle } from "../hooks/usePageTitle";
import AboutHero from "../components/about/AboutHero";
import IntroductionSection from "../components/about/IntroductionSection";
import LegalStatusSection from "../components/about/LegalStatusSection";
import MissionVisionSection from "../components/about/MissionVisionSection";
import ObjectivesSection from "../components/about/ObjectivesSection";
import ValuesSection from "../components/about/ValuesSection";
import OurTeamSection from "../components/about/OurTeamSection";
import PartnersNetworksSection from "../components/about/PartnersNetworksSection";
import AboutCTASection from "../components/about/AboutCTASection";

export default function About() {
  usePageTitle("page_titles.about");

  return (
    <>
      <AboutHero />
      <IntroductionSection />
      <LegalStatusSection />
      <MissionVisionSection />
      <ObjectivesSection />
      <ValuesSection />
      <OurTeamSection />
      <PartnersNetworksSection />
      <AboutCTASection />
    </>
  );
}

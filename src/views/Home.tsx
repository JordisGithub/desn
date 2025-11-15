import { usePageTitle } from "../hooks/usePageTitle";
import HeroSection from "../components/home/HeroSection";
import AboutCTASection from "../components/about/AboutCTASection";
import StoriesSection from "../components/home/StoriesSection";
import AboutSection from "../components/home/AboutSection";
import ProgramsSection from "../components/home/ProgramsSection";
import EventsSection from "../components/home/EventsSection";
import PartnersSection from "../components/home/PartnersSection";
import ValuePropositionSection from "../components/home/ValuePropositionSection";

export default function Home() {
  usePageTitle("page_titles.home");

  return (
    <>
      <HeroSection />
      <ValuePropositionSection />
      <AboutSection />
      <ProgramsSection />
      <EventsSection />
      <StoriesSection />
      <PartnersSection />
      <AboutCTASection />
    </>
  );
}

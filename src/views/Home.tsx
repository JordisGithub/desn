import { usePageTitle } from "../hooks/usePageTitle";
import HeroSection from "../components/home/HeroSection";
import AboutSection from "../components/home/AboutSection";
import ProgramsSection from "../components/home/ProgramsSection";
import GetInvolvedSection from "../components/home/GetInvolvedSection";
import EventsSection from "../components/home/EventsSection";
import PartnersSection from "../components/home/PartnersSection";
import NewsletterSection from "../components/home/NewsletterSection";

export default function Home() {
  usePageTitle("page_titles.home");

  return (
    <>
      <HeroSection />
      <AboutSection />
      <ProgramsSection />
      <GetInvolvedSection />
      <EventsSection />
      <PartnersSection />
      <NewsletterSection />
    </>
  );
}

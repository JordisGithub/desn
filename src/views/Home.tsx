import { styled } from "@mui/material/styles";
import { useTranslation } from "react-i18next";
import { usePageTitle } from "../hooks/usePageTitle";
import HeroSection from "../components/home/HeroSection";
import AboutSection from "../components/home/AboutSection";
import ProgramsSection from "../components/home/ProgramsSection";
import GetInvolvedSection from "../components/home/GetInvolvedSection";
import EventsSection from "../components/home/EventsSection";
import PartnersSection from "../components/home/PartnersSection";
import NewsletterSection from "../components/home/NewsletterSection";

const SkipLink = styled("a")({
  position: "absolute",
  top: "-40px",
  left: 0,
  background: "#004c91",
  color: "white",
  padding: "8px 16px",
  textDecoration: "none",
  zIndex: 9999,
  "&:focus": {
    top: 0,
    outline: "3px solid #f6d469",
    outlineOffset: "2px",
  },
});

export default function Home() {
  const { t } = useTranslation();
  usePageTitle("page_titles.home");

  return (
    <>
      <SkipLink href='#main-content'>{t("skip_to_content")}</SkipLink>
      <main id='main-content'>
        <HeroSection />
        <AboutSection />
        <ProgramsSection />
        <GetInvolvedSection />
        <EventsSection />
        <PartnersSection />
        <NewsletterSection />
      </main>
    </>
  );
}

import { styled } from "@mui/material/styles";
import { useTranslation } from "react-i18next";
import AboutHero from "../components/about/AboutHero";
import IntroductionSection from "../components/about/IntroductionSection";
import LegalStatusSection from "../components/about/LegalStatusSection";
import MissionVisionSection from "../components/about/MissionVisionSection";
import ObjectivesSection from "../components/about/ObjectivesSection";
import ValuesSection from "../components/about/ValuesSection";
import Footer from "../components/Footer";

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

export default function About() {
  const { t } = useTranslation();

  return (
    <>
      <SkipLink href='#main-content'>{t("skip_to_content")}</SkipLink>
      <main id='main-content'>
        <AboutHero />
        <IntroductionSection />
        <LegalStatusSection />
        <MissionVisionSection />
        <ObjectivesSection />
        <ValuesSection />
      </main>
      <Footer />
    </>
  );
}

import { styled } from "@mui/material/styles";
import { useTranslation } from "react-i18next";
import ContactHero from "../components/contact/ContactHero";
import ContactCards from "../components/contact/ContactCards";
import ContactFormSection from "../components/contact/ContactFormSection";
import MapLocationSection from "../components/contact/MapLocationSection";
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

export default function Contact() {
  const { t } = useTranslation();

  return (
    <>
      <SkipLink href='#main-content'>{t("skip_to_content")}</SkipLink>
      <main id='main-content'>
        <ContactHero />
        <ContactCards />
        <ContactFormSection />
        <MapLocationSection />
      </main>
      <Footer />
    </>
  );
}

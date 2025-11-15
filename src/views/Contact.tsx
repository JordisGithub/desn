import { usePageTitle } from "../hooks/usePageTitle";
import ContactHero from "../components/contact/ContactHero";
import ContactCards from "../components/contact/ContactCards";
import ContactFormSection from "../components/contact/ContactFormSection";
import MapLocationSection from "../components/contact/MapLocationSection";

export default function Contact() {
  usePageTitle("page_titles.contact");

  return (
    <>
      <ContactHero />
      <ContactCards />
      <ContactFormSection />
      <MapLocationSection />
    </>
  );
}

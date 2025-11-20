import { usePageTitle } from "../hooks/usePageTitle";
import { useSearchHighlight } from "../hooks/useSearchHighlight";
import ContactHero from "../components/contact/ContactHero";
import IntegratedContactSection from "../components/contact/IntegratedContactSection";

export default function Contact() {
  usePageTitle("page_titles.contact");
  useSearchHighlight();

  return (
    <>
      <ContactHero />
      <IntegratedContactSection />
    </>
  );
}

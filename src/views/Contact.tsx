import { usePageTitle } from "../hooks/usePageTitle";
import ContactHero from "../components/contact/ContactHero";
import IntegratedContactSection from "../components/contact/IntegratedContactSection";

export default function Contact() {
  usePageTitle("page_titles.contact");

  return (
    <>
      <ContactHero />
      <IntegratedContactSection />
    </>
  );
}

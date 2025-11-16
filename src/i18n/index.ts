import i18n from "i18next";
import { initReactI18next } from "react-i18next";

// Get saved language from localStorage or default to 'en'
const savedLanguage = localStorage.getItem("language") || "en";

// Import translations directly instead of dynamic imports
import enTranslations from "./locales/en";
import neTranslations from "./locales/ne";
import newTranslations from "./locales/new";
import maiTranslations from "./locales/mai";

// Load translations synchronously
const loadResources = () => {
  const resources = {
    en: { translation: enTranslations },
    ne: { translation: neTranslations },
    new: { translation: newTranslations },
    mai: { translation: maiTranslations },
  };

  return resources;
};

const resources = loadResources();

i18n.use(initReactI18next).init({
  lng: savedLanguage,
  fallbackLng: "en",
  interpolation: {
    escapeValue: false,
  },
  react: {
    useSuspense: false,
  },
  resources,
});

// Save language preference when it changes
i18n.on("languageChanged", (lng) => {
  localStorage.setItem("language", lng);
});

export default i18n;

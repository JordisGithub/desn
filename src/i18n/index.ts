import i18n from "i18next";
import { initReactI18next } from "react-i18next";

// Lazy load translations for better initial load performance
// Languages are loaded on-demand instead of bundled upfront
const resources = {
  en: {
    translation: () => import("./locales/en").then((m) => m.default),
  },
  ne: {
    translation: () => import("./locales/ne").then((m) => m.default),
  },
};

// Get saved language from localStorage or default to 'en'
const savedLanguage = localStorage.getItem("language") || "en";

i18n.use(initReactI18next).init({
  lng: savedLanguage,
  fallbackLng: "en",
  interpolation: {
    escapeValue: false,
  },
  react: {
    useSuspense: false, // Prevent blocking on language load
  },
  // Load translations asynchronously
  partialBundledLanguages: true,
});

// Load initial language
const loadLanguage = async (lang: string) => {
  const translations = await resources[
    lang as keyof typeof resources
  ].translation();
  i18n.addResourceBundle(lang, "translation", translations, true, true);
};

// Load the initial language
loadLanguage(savedLanguage);

// Save language preference when it changes
i18n.on("languageChanged", (lng) => {
  localStorage.setItem("language", lng);
  loadLanguage(lng);
});

export default i18n;

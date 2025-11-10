import i18n from "i18next";
import { initReactI18next } from "react-i18next";

// Get saved language from localStorage or default to 'en'
const savedLanguage = localStorage.getItem("language") || "en";

// Load translations dynamically
const loadResources = async () => {
  const resources: Record<string, { translation: Record<string, string> }> = {};

  for (const lang of ["en", "ne"]) {
    try {
      const module = await import(`./locales/${lang}`);
      resources[lang] = { translation: module.default };
    } catch (error) {
      console.error(`Failed to load ${lang} translations:`, error);
    }
  }

  return resources;
};

const resourcesPromise = loadResources();

i18n.use(initReactI18next).init({
  lng: savedLanguage,
  fallbackLng: "en",
  interpolation: {
    escapeValue: false,
  },
  react: {
    useSuspense: false, // Prevent blocking on language load
  },
  resources: {},
});

// Load translations when they're ready
resourcesPromise.then((resources) => {
  for (const lang in resources) {
    i18n.addResourceBundle(
      lang,
      "translation",
      resources[lang].translation,
      true,
      true
    );
  }
});

// Save language preference when it changes
i18n.on("languageChanged", (lng) => {
  localStorage.setItem("language", lng);
});

export default i18n;

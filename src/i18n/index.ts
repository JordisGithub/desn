import i18n from "i18next";
import { initReactI18next } from "react-i18next";
import en from "./locales/en";
import ne from "./locales/ne";

const resources = {
  en: {
    translation: en,
  },
  ne: {
    translation: ne,
  },
};

i18n.use(initReactI18next).init({
  resources,
  lng: "en",
  fallbackLng: "en",
  interpolation: {
    escapeValue: false,
  },
});

export default i18n;

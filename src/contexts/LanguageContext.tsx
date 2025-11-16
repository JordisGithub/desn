import { createContext, useState, useContext, useEffect } from "react";
import type { ReactNode } from "react";
import i18n from "../i18n";

type Language = "en" | "ne" | "new" | "mai";

type LanguageContextType = {
  lang: Language;
  setLang: (l: Language) => void;
};

const LanguageContext = createContext<LanguageContextType | undefined>(
  undefined
);

export const LanguageProvider = ({ children }: { children: ReactNode }) => {
  const [lang, setLang] = useState<Language>("en");

  useEffect(() => {
    // Update the HTML lang attribute whenever language changes
    document.documentElement.lang = lang;

    // Sync with i18next
    if (i18n.language !== lang) {
      void i18n.changeLanguage(lang);
    }
  }, [lang]);

  // Listen to i18next language changes and sync with context
  useEffect(() => {
    const handleLanguageChange = (lng: string) => {
      if (
        lng !== lang &&
        (lng === "en" || lng === "ne" || lng === "new" || lng === "mai")
      ) {
        setLang(lng as Language);
      }
    };

    i18n.on("languageChanged", handleLanguageChange);

    return () => {
      i18n.off("languageChanged", handleLanguageChange);
    };
  }, [lang]);

  return (
    <LanguageContext.Provider value={{ lang, setLang }}>
      {children}
    </LanguageContext.Provider>
  );
};

// eslint-disable-next-line react-refresh/only-export-components
export const useLanguage = () => {
  const ctx = useContext(LanguageContext);
  if (!ctx) throw new Error("useLanguage must be used within LanguageProvider");
  return ctx;
};

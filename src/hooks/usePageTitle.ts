import { useEffect } from "react";
import { useTranslation } from "react-i18next";

/**
 * Custom hook to manage document title with i18n support
 * Updates the page title whenever the language or title key changes
 *
 * @param titleKey - Translation key for the page title
 * @param options - Optional configuration
 */
export function usePageTitle(
  titleKey: string,
  options?: {
    siteName?: string;
    separator?: string;
  }
) {
  const { t, i18n } = useTranslation();
  const { siteName = "DESN", separator = " | " } = options || {};

  useEffect(() => {
    const title = t(titleKey);
    document.title = `${title}${separator}${siteName}`;
  }, [titleKey, t, siteName, separator, i18n.language]);
}

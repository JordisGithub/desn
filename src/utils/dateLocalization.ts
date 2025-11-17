/**
 * Date and Time Localization Utility
 *
 * This utility provides locale-aware date and time formatting using the Intl API.
 * It maps our supported language codes to BCP 47 locale identifiers.
 */

/**
 * Maps our language codes to BCP 47 locale identifiers
 */
const localeMap: Record<string, string> = {
  en: "en-US", // English (United States)
  ne: "ne-NP", // Nepali (Nepal)
  mai: "mai-NP", // Maithili (Nepal) - Note: Limited browser support, falls back to ne-NP
  new: "new-NP", // Newari (Nepal) - Note: Limited browser support, falls back to ne-NP
};

/**
 * Gets the BCP 47 locale identifier for the given language code
 * @param language - Our language code (en, ne, mai, new)
 * @returns BCP 47 locale identifier
 */
function getLocale(language: string): string {
  return localeMap[language] || "en-US";
}

/**
 * Formats a date according to the user's selected language
 * @param date - The date to format
 * @param language - The current language code
 * @returns Formatted date string (e.g., "Dec 7, 2025" in English, "२०२५ डिसेम्बर ७" in Nepali)
 */
export function formatDate(date: Date, language: string): string {
  const locale = getLocale(language);

  try {
    return date.toLocaleDateString(locale, {
      month: "short",
      day: "numeric",
      year: "numeric",
    });
  } catch {
    // Fallback to English if locale is not supported
    console.warn(`Locale ${locale} not supported, falling back to en-US`);
    return date.toLocaleDateString("en-US", {
      month: "short",
      day: "numeric",
      year: "numeric",
    });
  }
}

/**
 * Formats a time according to the user's selected language
 * @param date - The date/time to format
 * @param language - The current language code
 * @returns Formatted time string (e.g., "11:27 AM" in English, "११:२७ पूर्वाह्न" in Nepali)
 */
export function formatTime(date: Date, language: string): string {
  const locale = getLocale(language);

  try {
    return date.toLocaleTimeString(locale, {
      hour: "numeric",
      minute: "2-digit",
    });
  } catch {
    // Fallback to English if locale is not supported
    console.warn(`Locale ${locale} not supported, falling back to en-US`);
    return date.toLocaleTimeString("en-US", {
      hour: "numeric",
      minute: "2-digit",
    });
  }
}

/**
 * Formats a date range (start and end times) according to the user's selected language
 * @param startDate - The start date/time
 * @param endDate - The end date/time
 * @param language - The current language code
 * @returns Formatted time range string (e.g., "11:27 AM - 2:27 PM")
 */
export function formatTimeRange(
  startDate: Date,
  endDate: Date,
  language: string
): string {
  const startTime = formatTime(startDate, language);
  const endTime = formatTime(endDate, language);

  // Use appropriate separator based on language
  const separator = language === "en" ? " - " : " - ";

  return `${startTime}${separator}${endTime}`;
}

/**
 * Formats a full date with day of week according to the user's selected language
 * @param date - The date to format
 * @param language - The current language code
 * @returns Formatted date string with day name
 */
export function formatDateWithDay(date: Date, language: string): string {
  const locale = getLocale(language);

  try {
    return date.toLocaleDateString(locale, {
      weekday: "long",
      month: "long",
      day: "numeric",
      year: "numeric",
    });
  } catch {
    console.warn(`Locale ${locale} not supported, falling back to en-US`);
    return date.toLocaleDateString("en-US", {
      weekday: "long",
      month: "long",
      day: "numeric",
      year: "numeric",
    });
  }
}

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
 * Maps English digits to Devanagari numerals for Nepali
 */
const devanagariNumerals: Record<string, string> = {
  "0": "०",
  "1": "१",
  "2": "२",
  "3": "३",
  "4": "४",
  "5": "५",
  "6": "६",
  "7": "७",
  "8": "८",
  "9": "९",
};

/**
 * Converts English digits to Devanagari numerals
 */
function toDevanagariNumerals(text: string): string {
  return text.replace(/\d/g, (digit) => devanagariNumerals[digit] || digit);
}

/**
 * Maps English month abbreviations to Nepali
 */
const nepaliMonths: Record<string, string> = {
  Jan: "जनवरी",
  Feb: "फेब्रुअरी",
  Mar: "मार्च",
  Apr: "अप्रिल",
  May: "मे",
  Jun: "जुन",
  Jul: "जुलाई",
  Aug: "अगस्ट",
  Sep: "सेप्टेम्बर",
  Oct: "अक्टोबर",
  Nov: "नोभेम्बर",
  Dec: "डिसेम्बर",
};

/**
 * Maps English month names (full) to Nepali
 */
const nepaliMonthsFull: Record<string, string> = {
  January: "जनवरी",
  February: "फेब्रुअरी",
  March: "मार्च",
  April: "अप्रिल",
  May: "मे",
  June: "जुन",
  July: "जुलाई",
  August: "अगस्ट",
  September: "सेप्टेम्बर",
  October: "अक्टोबर",
  November: "नोभेम्बर",
  December: "डिसेम्बर",
};

/**
 * Maps English day names to Nepali
 */
const nepaliDays: Record<string, string> = {
  Sunday: "आइतबार",
  Monday: "सोमबार",
  Tuesday: "मंगलबार",
  Wednesday: "बुधबार",
  Thursday: "बिहिबार",
  Friday: "शुक्रबार",
  Saturday: "शनिबार",
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
 * Converts English date string to Nepali format
 */
function convertToNepaliDate(englishDate: string): string {
  let result = englishDate;

  // Replace month abbreviations
  Object.entries(nepaliMonths).forEach(([eng, nep]) => {
    result = result.replace(eng, nep);
  });

  // Replace full month names
  Object.entries(nepaliMonthsFull).forEach(([eng, nep]) => {
    result = result.replace(eng, nep);
  });

  // Replace day names
  Object.entries(nepaliDays).forEach(([eng, nep]) => {
    result = result.replace(eng, nep);
  });

  // Convert numerals to Devanagari
  result = toDevanagariNumerals(result);

  return result;
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
    const result = date.toLocaleDateString(locale, {
      month: "short",
      day: "numeric",
      year: "numeric",
    });

    // Check if browser returned English format (indicates no locale support)
    const isEnglishFormat = /^[A-Za-z]/.test(result);

    if (language === "ne" || language === "mai" || language === "new") {
      if (isEnglishFormat) {
        // Browser doesn't support the locale, manually convert
        return convertToNepaliDate(result);
      }
    }

    return result;
  } catch (error) {
    // Fallback: format in English then convert if needed
    const englishDate = date.toLocaleDateString("en-US", {
      month: "short",
      day: "numeric",
      year: "numeric",
    });

    if (language === "ne" || language === "mai" || language === "new") {
      return convertToNepaliDate(englishDate);
    }

    return englishDate;
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
    const result = date.toLocaleTimeString(locale, {
      hour: "numeric",
      minute: "2-digit",
    });

    // Check if browser returned English format
    const hasEnglishChars = /[APap][Mm]/.test(result);

    if (language === "ne" || language === "mai" || language === "new") {
      if (hasEnglishChars) {
        // Manually convert AM/PM and numerals
        let nepaliTime = result
          .replace(/AM/gi, "पूर्वाह्न")
          .replace(/PM/gi, "अपराह्न");
        nepaliTime = toDevanagariNumerals(nepaliTime);
        return nepaliTime;
      }
    }

    return result;
  } catch (error) {
    // Fallback
    const englishTime = date.toLocaleTimeString("en-US", {
      hour: "numeric",
      minute: "2-digit",
    });

    if (language === "ne" || language === "mai" || language === "new") {
      let nepaliTime = englishTime
        .replace(/AM/gi, "पूर्वाह्न")
        .replace(/PM/gi, "अपराह्न");
      nepaliTime = toDevanagariNumerals(nepaliTime);
      return nepaliTime;
    }

    return englishTime;
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
    const result = date.toLocaleDateString(locale, {
      weekday: "long",
      month: "long",
      day: "numeric",
      year: "numeric",
    });

    // Check if browser returned English format
    const isEnglishFormat = /^[A-Za-z]/.test(result);

    if (language === "ne" || language === "mai" || language === "new") {
      if (isEnglishFormat) {
        return convertToNepaliDate(result);
      }
    }

    return result;
  } catch {
    const englishDate = date.toLocaleDateString("en-US", {
      weekday: "long",
      month: "long",
      day: "numeric",
      year: "numeric",
    });

    if (language === "ne" || language === "mai" || language === "new") {
      return convertToNepaliDate(englishDate);
    }

    return englishDate;
  }
}

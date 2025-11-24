/**
 * Event Translation Utility
 *
 * This utility provides translation mapping for backend event data.
 * It maps English event titles/descriptions/locations to their translation keys.
 *
 * NOTE: This is a frontend workaround until the backend supports multilingual content.
 * Ideally, the backend should return localized event data based on the Accept-Language header.
 */

interface TranslationMap {
  [key: string]: string;
}

/**
 * Maps English event titles to their translation keys
 */
export const eventTitleMap: TranslationMap = {
  "AIR Mid-Point Check-In": "event_1_title",
  "International day of persons with disabilities": "event_2_title",
  "International Day of Persons with Disabilities": "event_2_title",
  "AIR award ceremony": "event_3_title",
  "Disability Rights Awareness Workshop": "event_disability_rights_title",
  "Accessible Technology Training": "event_accessible_tech_title",
  "Annual General Meeting 2025": "event_annual_meeting_title",
};

/**
 * Maps English event descriptions to their translation keys
 */
export const eventDescriptionMap: TranslationMap = {
  "Reviewing DESN's accessible website progress with the Digital A11y Alliance.":
    "event_1_desc",
  'Celebrating "innovation for inclusion" through awareness and advocacy.':
    "event_2_desc",
  "Recognition of completed accessible website by knowbility.": "event_3_desc",
  "Interactive workshop on understanding and promoting disability rights in communities":
    "event_disability_rights_desc",
  "Hands-on training on assistive technologies and accessible software solutions":
    "event_accessible_tech_desc",
  "DESN's annual meeting to discuss progress, plans, and member concerns":
    "event_annual_meeting_desc",
};

/**
 * Maps English event locations to their translation keys
 */
export const eventLocationMap: TranslationMap = {
  "Kathmandu Community Center": "location_kathmandu_center",
  "DESN Training Center, Lalitpur": "location_desn_training",
  "Hotel Yak & Yeti, Kathmandu": "location_hotel_yak",
};

const eventDateMap: TranslationMap = {
  "AIR Mid-Point Check-In": "event_1_date",
  "International day of persons with disabilities": "event_2_date",
  "International Day of Persons with Disabilities": "event_2_date",
  "AIR award ceremony": "event_3_date",
};

const eventTimeMap: TranslationMap = {
  "AIR Mid-Point Check-In": "event_1_time",
  "International day of persons with disabilities": "event_2_time",
  "International Day of Persons with Disabilities": "event_2_time",
  "AIR award ceremony": "event_3_time",
};

/**
 * Translates an event title using the translation function
 * @param title - The English title from the backend
 * @param t - The i18n translation function
 * @returns Translated title or original if no mapping exists
 */
export function translateEventTitle(
  title: string,
  t: (key: string) => string
): string {
  const key = eventTitleMap[title];
  return key ? t(key) : title;
}

/**
 * Translates an event description using the translation function
 * @param description - The English description from the backend
 * @param t - The i18n translation function
 * @returns Translated description or original if no mapping exists
 */
export function translateEventDescription(
  description: string,
  t: (key: string) => string
): string {
  const key = eventDescriptionMap[description];
  return key ? t(key) : description;
}

/**
 * Translates an event location using the translation function
 * @param location - The English location from the backend
 * @param t - The i18n translation function
 * @returns Translated location or original if no mapping exists
 */
export function translateEventLocation(
  location: string,
  t: (key: string) => string
): string {
  const key = eventLocationMap[location];
  return key ? t(key) : location;
}

export function translateEventDate(
  title: string,
  t: (key: string) => string,
  fallback: string
): string {
  const key = eventDateMap[title];
  if (!key) return fallback;
  const translated = t(key);
  return translated === key ? fallback : translated;
}

export function translateEventTime(
  title: string,
  t: (key: string) => string,
  fallback: string
): string {
  const key = eventTimeMap[title];
  if (!key) return fallback;
  const translated = t(key);
  return translated === key ? fallback : translated;
}

import React from "react";
import { useTranslation } from "react-i18next";

interface TranslatedImageProps
  extends Omit<React.ImgHTMLAttributes<HTMLImageElement>, "alt"> {
  /** Translation key for the alt text */
  altKey: string;
  /** Fallback alt text if translation is not available */
  fallbackAlt?: string;
}

/**
 * Image component that automatically updates alt text when language changes
 * Uses i18n translation keys for alt text and re-renders on language change
 *
 * @example
 * <TranslatedImage
 *   src="/path/to/image.jpg"
 *   altKey="home.hero.image_alt"
 *   fallbackAlt="Hero image"
 * />
 */
export const TranslatedImage: React.FC<TranslatedImageProps> = ({
  altKey,
  fallbackAlt = "",
  ...imgProps
}) => {
  const { t, i18n } = useTranslation();

  // Force re-render when language changes by using language as key
  return (
    <img
      {...imgProps}
      alt={t(altKey, fallbackAlt)}
      key={`${imgProps.src}-${i18n.language}`}
    />
  );
};

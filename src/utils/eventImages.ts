import eventImage1 from "../assets/optimized/home-events1-jpg-800.jpg";
import eventImage2 from "../assets/optimized/home-events2-jpg-800.jpg";
import eventImage3 from "../assets/optimized/home-events3-jpg-800.jpg";

const fallbackImageMap: Record<number, string> = {
  1: eventImage1,
  2: eventImage2,
  3: eventImage3,
};

export const getEventDisplayImageUrl = (
  eventId: number,
  imageUrl?: string
): string => {
  if (imageUrl) {
    const normalized = imageUrl.trim();
    if (!normalized.includes("unsplash")) {
      return normalized;
    }
  }

  return fallbackImageMap[eventId] || imageUrl || "";
};

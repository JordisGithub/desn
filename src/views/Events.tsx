import { styled } from "@mui/material/styles";
import { useTranslation } from "react-i18next";
import EventsHero from "../components/events/EventsHero";
import UpcomingEvents from "../components/events/UpcomingEvents";
import FeaturedEvent from "../components/events/FeaturedEvent";

const SkipLink = styled("a")({
  position: "absolute",
  top: "-40px",
  left: 0,
  background: "#004c91",
  color: "white",
  padding: "8px 16px",
  textDecoration: "none",
  zIndex: 9999,
  "&:focus": {
    top: 0,
    outline: "3px solid #f6d469",
    outlineOffset: "2px",
  },
});

export default function Events() {
  const { t } = useTranslation();

  return (
    <>
      <SkipLink href='#main-content'>{t("skip_to_content")}</SkipLink>
      <main id='main-content'>
        <EventsHero />
        <UpcomingEvents />
        <FeaturedEvent />
      </main>
    </>
  );
}

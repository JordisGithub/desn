import { usePageTitle } from "../hooks/usePageTitle";
import EventsHero from "../components/events/EventsHero";
import UpcomingEvents from "../components/events/UpcomingEvents";
import FeaturedEvent from "../components/events/FeaturedEvent";

export default function Events() {
  usePageTitle("page_titles.events");

  return (
    <>
      <EventsHero />
      <UpcomingEvents />
      <FeaturedEvent />
    </>
  );
}

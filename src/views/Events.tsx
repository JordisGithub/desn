import { usePageTitle } from "../hooks/usePageTitle";
import EventsHero from "../components/events/EventsHero";
import UpcomingEvents from "../components/events/UpcomingEvents";
import FeaturedEvent from "../components/events/FeaturedEvent";
import { Box } from "@mui/material";

export default function Events() {
  usePageTitle("page_titles.events");

  return (
    <>
      <a href='#main-content' className='skip-link'>
        Skip to main content
      </a>
      <EventsHero />
      <Box
        component='main'
        id='main-content'
        role='main'
        aria-label='Events page main content'
      >
        <FeaturedEvent />
        <UpcomingEvents />
      </Box>
    </>
  );
}

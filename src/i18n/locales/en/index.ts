import common from "./common";
import home from "./home";
import about from "./about";
import footer from "./footer";
import get_involved from "./get_involved";
import auth from "./auth";
import payment from "./payment";
import accessibility from "./accessibility";
import contact from "./contact";
import programs from "./programs";
import events from "./events";

export default {
  ...common,
  ...home,
  ...about,
  ...footer,
  ...auth,
  ...payment,
  ...accessibility,
  ...programs,
  ...events,
  get_involved,
  contact,
};

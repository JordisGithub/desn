export default {
  contact: {
    // Hero Section
    hero: {
      badge: "Get in Touch",
      title: "Contact Us",
      description:
        "We would love to hear from you. Whether you have questions, need support, or want to collaborate, our team is ready to assist you.",
      send_message: "Send a Message",
      view_location: "View Location",
    },

    // Contact Cards
    cards: {
      heading: "Contact Methods",
      phone: {
        title: "Call Us",
        description: "Mon-Fri from 9am to 5pm",
        primary: "+977-15709205",
        secondary: "+977-9849873868",
      },
      email: {
        title: "Email Us",
        description: "Send us an email anytime",
        primary: "disabilityemp@gmail.com",
        secondary: "thekopkrish@gmail.com",
      },
      location: {
        title: "Visit Us",
        description: "Come say hello at our office",
        address1: "Mahalaxmi Municipality–5",
        address2: "Bagmati Province, Lalitpur, Nepal",
      },
      website: {
        title: "Website",
        description: "Visit our official website",
      },
    },

    // Contact Form
    form: {
      title: "Send Us a Message",
      description:
        "Fill out the form below and we will get back to you as soon as possible.",
      required_fields_instruction:
        "Fields marked with an asterisk (*) are required.",
      full_name: "Full Name",
      full_name_placeholder: "Enter your full name",
      email: "Email Address",
      email_placeholder: "your.email@example.com",
      phone: "Phone Number",
      phone_placeholder: "+977-XXXXXXXXXX",
      subject: "Subject",
      subject_placeholder: "What is this regarding?",
      message: "Message",
      message_placeholder: "Tell us more about your inquiry...",
      submit: "Send Message",
      submitting: "Sending...",
      success_message:
        "Thank you for your message! We will get back to you soon.",
      errors: {
        summary_title: "Please fix the following errors:",
        full_name_required: "Full name is required",
        email_required: "Email address is required",
        email_invalid: "Please enter a valid email address",
        subject_required: "Subject is required",
        message_required: "Message is required",
      },
    },

    // Office Hours
    office_hours: {
      title: "Office Hours",
      weekdays: "Monday - Friday",
      weekdays_time: "9:00 AM - 5:00 PM",
      saturday: "Saturday",
      saturday_time: "10:00 AM - 3:00 PM",
      sunday: "Sunday",
      holidays: "Public Holidays",
      closed: "Closed",
    },

    // Social Media
    social: {
      title: "Follow Us",
      description:
        "Stay connected with us on social media for the latest updates, stories, and events.",
    },

    // Community Image
    community_image_alt: "DESN community event participants",

    // Map Section
    map: {
      title: "Our Location: Siddhi Road, Lalitpur, Nepal",
      description:
        "Complete location details and directions to reach our office in Mahalaxmi Municipality, Lalitpur.",

      // Accessible Data Table
      table_heading: "DESN Location Support - Accessible Data Table",
      table_feature: "Feature",
      table_details: "Details",
      table_full_address: "Full Address",
      table_full_address_value:
        "Mahalaxmi Municipality–5, Bagmati Province, Lalitpur, Nepal",
      table_landmark: "Landmark",
      table_landmark_value:
        "Near Siddhi Pokhari pond, visible DESN signboard at entrance",
      table_nearest_transit: "Nearest Transit",
      table_nearest_transit_value:
        "Pulchowk on Ring Road (10-minute walk to Sanepa)",
      table_ride_options: "Ride Options",
      table_ride_options_value: "Local taxis, Pathao, InDrive",
      table_directions: "Directions",
      table_directions_value:
        "From Pulchowk, walk towards Sanepa; follow signs to DESN",
      table_map_link: "Map Link",
      table_map_link_value: "Google Maps Directions",

      // Accessibility Features
      accessibility_features_heading: "Accessible Features",
      accessibility_features: {
        structured_data:
          "Structured Data View: All key location information (address, transit, directions, landmark, and map link) is provided below or beside the map in an HTML table and list format. This view is fully accessible to screen readers, keyboard navigation, and users who cannot visually interact with the map.",
        clear_headings:
          "Clear Headings and Labels: Every section uses distinct, semantic headings and properly labeled links for context and ease of use.",
        direct_map_link:
          "Direct Map Link: An accessible link is provided to open Google Maps in a new tab.",
        keyboard_access:
          "Keyboard Access to Data: The accessible data view (not the map) can be navigated using a keyboard.",
        text_landmarks:
          "Text Landmarks and Detailed Directions: Directions, local transit, and known landmarks are included in the accessible data view.",
        user_guidance:
          "User Guidance: A tooltip is provided on how to access information and describing the map.",
      },

      // Known Limitations
      known_limitations_heading: "Known Limitations",
      known_limitations: {
        embedded_map:
          "Embedded Map Keyboard Gaps: The interactive Google Map may not fully support navigation or feature discovery using only a keyboard. Standard keyboard commands may not work as expected.",
        screen_reader:
          "Screen Reader Access: Map markers, overlays, and visual elements may be hidden to screen readers.",
        limited_interactivity:
          "Limited Map Interactivity: Keyboard users may have limited interactivity with the map such as zoom in/out or activating map location; please refer to the Data Table View.",
        no_live_directions:
          "No Live Directions in Data View: Interactive routing is only available via the external Google Maps link.",
        vendor_updates:
          "Dependent on Vendor Updates: Accessibility of Google Maps is subject to change.",
      },

      // Non-Visual Component (NVC) - Primary accessible content
      location_details_heading: "Location Details",

      full_address_label: "Full Address:",
      office_name: "Disability Empowerment Society Nepal (DESN)",

      landmark_label: "Key Landmark:",
      landmark_description:
        "Near Siddhi Pokhari (pond) in Mahalaxmi Municipality. The office is easily identifiable by the DESN signboard at the entrance.",

      transit_label: "Transit Details:",
      transit_description:
        "The nearest bus stop is 'Pulchowk' on the Ring Road. From there, it's approximately a 10-minute walk towards Sanepa. Local taxis and ride-sharing services (Pathao, InDrive) can bring you directly to the location.",

      guided_directions_label: "Guided Directions:",
      get_directions:
        "Get turn-by-turn walking, driving, or transit directions",
      directions_tip:
        "Opens Google Maps in a new tab for guided navigation to DESN office",

      visual_reference:
        "For a visual representation of this location, please see the interactive map on the right (or below on mobile devices).",

      // Optional Visual Component (OVC)
      iframe_title:
        "Interactive Google Map showing the precise location of DESN office on Siddhi Road, Mahalaxmi Municipality, Lalitpur 44700, Nepal",

      // Accessibility information
      accessibility_title: "Accessibility Features",
      accessibility_description:
        "Our office is fully accessible with wheelchair ramps, accessible restrooms, tactile paving at the entrance, and assistive technology available. We have staff trained to assist visitors with disabilities. Please contact us in advance at +977-1-5555555 if you require any specific accommodations for your visit.",

      // Legacy keys (kept for backward compatibility if needed)
      office_title: "Our Office",
      province: "Bagmati Province",
      directions_title: "Getting Here",
      directions_description:
        "Our office is easily accessible by public transportation and private vehicles. Parking is available on-site.",
    },
  },
};

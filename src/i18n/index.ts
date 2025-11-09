import i18n from "i18next";
import { initReactI18next } from "react-i18next";

const resources = {
  en: {
    translation: {
      // Navigation
      skip_to_content: "Skip to main content",

      // Hero Section
      hero_title: "The Disability Empowerment Society Nepal (DESN)",
      hero_subtitle:
        "Empowering Persons with Disabilities Through Accessibility, Inclusion, and Innovation",
      hero_alt:
        "DESN team members and volunteers working together at a community event in Nepal, showing collaboration and inclusion",
      mission_statement:
        "Creating a rights-based, barrier-free and inclusive society for persons with disabilities, helpless individuals, and single women across Nepal.",
      hero_description_1:
        "The Disability Empowerment Society Nepal (DESN) is a non-profit, non-political social organization founded and led by persons with disabilities in 2004 (2060 B.S.). Established under the Organization Registration Act, 1972, DESN works for the welfare and empowerment of persons with disabilities, helpless people, and single women through advocacy, education, technology, and livelihood support.",
      hero_description_2:
        "Our mission is to build an inclusive Nepal where everyone, regardless of ability, can live independently, with dignity and equal opportunities.",

      // About Section
      about_heading: "ABOUT DESN",
      about_description:
        "DESN has been consistently advocating for equal rights, participation, and accessibility to ensure that persons with disabilities and marginalized women can live in a barrier-free, inclusive environment with improved socio-economic conditions.",
      about_button: "more about us",
      about_alt:
        "DESN staff and community members engaged in disability empowerment activities",

      // Programs Section
      programs_heading: "Program & services",
      programs_button: "Learn more about our Programs",
      program_disability_title: "Disability & Inclusion",
      program_disability_desc:
        "Promoting equal access, rights, and participation for persons with disabilities through policy advocacy and awareness programs.",
      program_women_title: "Helpless & Single Women Empowerment",
      program_women_desc:
        "Supporting vulnerable women through skill training, income generation, and community inclusion",
      program_ict_title: "Accessible ICTs and Assistive Technology",
      program_ict_desc:
        "Advancing accessible digital tools, inclusive information systems, and assistive technologies for equal digital participation.",
      program_livelihood_title: "Livelihood Development",
      program_livelihood_desc:
        "Strengthening the economic status of persons with disabilities through vocational training and entrepreneurship.",
      program_life_skills_title: "Life Skills and Education Development",
      program_life_skills_desc:
        "Enhancing self-reliance and confidence among youth and children with disabilities through education and practical life skills",
      program_community_title: "Community Programs",
      program_community_desc:
        "Building inclusive communities through awareness, training, and accessibility initiatives.",

      // Get Involved Section
      get_involved_heading: "Get Involved",
      get_involved_cta:
        "Join us in creating an inclusive society Through volunteering, donating, or membership",
      get_involved_button: "Get Involved",
      get_involved_alt_1:
        "Volunteers working with persons with disabilities at a community event",
      get_involved_alt_2:
        "DESN team members facilitating an inclusive community workshop",

      // Events Section
      events_heading: "Upcoming Events",
      event_1_title: "AIR Mid-Point Check-In",
      event_1_desc:
        "Reviewing DESN's accessible website progress with the Digital A11y Alliance.",
      event_1_alt:
        "AIR Mid-Point Check-In event - team meeting reviewing accessible website progress",
      event_1_date: "OCT 24",
      event_1_time: "10:00 AM - 2:00 PM",
      event_2_title: "International day of persons with disabilities",
      event_2_desc:
        'Celebrating "innovation for inclusion" through awareness and advocacy.',
      event_2_alt:
        "International Day of Persons with Disabilities celebration event",
      event_2_date: "DEC 2",
      event_2_time: "10:00 AM - 2:00 PM",
      event_3_title: "AIR award ceremony",
      event_3_desc:
        "Recognition of completed accessible website by knowbility.",
      event_3_alt:
        "AIR Award Ceremony - celebration of accessible website completion",
      event_3_date: "JAN 15",
      event_3_time: "10:00 AM - 2:00 PM",
      event_organizer: "Organizer:",

      // Partners Section
      partners_heading: "Grantors and Partners",

      // Newsletter Section
      newsletter_heading: "subscribe our newsletter",
      newsletter_placeholder: "enter your email",
      newsletter_button: "Subscribe now",
      newsletter_aria_label: "Email address for newsletter subscription",

      // Footer CTA
      footer_cta_heading: "Join Our Programs Today",
      footer_cta_description:
        "Whether you're seeking support, want to volunteer, or partner with us, there are many ways to get involved in our transformative programs.",
      footer_button_get_involved: "Get Involved",
      footer_button_donate: "Donate",

      // Footer
      footer_about_heading: "About DESN",
      footer_about_text:
        "Established in 2004, DESN advocates for equal rights and accessibility for persons with disabilities in Nepal.",
      footer_quick_links: "Quick Links",
      footer_link_about: "About Us",
      footer_link_programs: "Programs",
      footer_link_events: "Events",
      footer_link_resources: "Resources",
      footer_link_get_involved: "Get Involved",
      footer_contact_heading: "Contact Us",
      footer_legal_heading: "Legal",
      footer_link_privacy: "Privacy Policy",
      footer_link_terms: "Terms of Service",
      footer_link_accessibility: "Accessibility Statement",
      footer_copyright: "© Copyright 2025 DESN. All Rights Reserved",
      footer_donate_button: "Donate",
    },
  },
  ne: {
    translation: {
      // Navigation
      skip_to_content: "मुख्य सामग्रीमा जानुहोस्",

      // Hero Section
      hero_title: "अपाङ्गता सशक्तीकरण समाज नेपाल (DESN)",
      hero_subtitle:
        "पहुँच, समावेशीकरण र नवप्रवर्तन मार्फत अपाङ्गता भएका व्यक्तिहरूलाई सशक्त बनाउँदै",
      hero_alt:
        "नेपालमा सामुदायिक कार्यक्रममा सँगै काम गर्दै DESN टोलीका सदस्यहरू र स्वयंसेवकहरू, सहयोग र समावेशीकरण देखाउँदै",
      mission_statement:
        "नेपालभरि अपाङ्गता भएका व्यक्तिहरू, असहाय व्यक्तिहरू र एकल महिलाहरूका लागि अधिकारमा आधारित, बाधारहित र समावेशी समाज सिर्जना गर्दै।",
      hero_description_1:
        "अपाङ्गता सशक्तीकरण समाज नेपाल (DESN) एक गैर-नाफामूलक, गैर-राजनीतिक सामाजिक संस्था हो जुन २०६० साल (2004 AD) मा अपाङ्गता भएका व्यक्तिहरूद्वारा स्थापित र नेतृत्व गरिएको हो। संस्था दर्ता ऐन, १९७२ अन्तर्गत स्थापित, DESN ले अपाङ्गता भएका व्यक्तिहरू, असहाय मानिसहरू र एकल महिलाहरूको कल्याण र सशक्तीकरणको लागि वकालत, शिक्षा, प्रविधि र जीविकोपार्जन समर्थन मार्फत काम गर्दछ।",
      hero_description_2:
        "हाम्रो मिशन समावेशी नेपाल निर्माण गर्नु हो जहाँ सबै, क्षमतालाई ध्यान नदिई, स्वतन्त्र रूपमा, सम्मानका साथ र समान अवसरहरूका साथ बाँच्न सक्छन्।",

      // About Section
      about_heading: "DESN को बारेमा",
      about_description:
        "DESN ले समान अधिकार, सहभागिता र पहुँचको लागि निरन्तर वकालत गर्दै आएको छ ताकि अपाङ्गता भएका व्यक्तिहरू र सीमान्तकृत महिलाहरू बाधारहित, समावेशी वातावरणमा सुधारिएको सामाजिक-आर्थिक अवस्थाका साथ बाँच्न सकून्।",
      about_button: "हाम्रो बारेमा थप जान्नुहोस्",
      about_alt:
        "अपाङ्गता सशक्तीकरण गतिविधिहरूमा संलग्न DESN कर्मचारी र समुदायका सदस्यहरू",

      // Programs Section
      programs_heading: "कार्यक्रम र सेवाहरू",
      programs_button: "हाम्रा कार्यक्रमहरूको बारेमा थप जान्नुहोस्",
      program_disability_title: "अपाङ्गता र समावेशीकरण",
      program_disability_desc:
        "नीति वकालत र सचेतना कार्यक्रमहरू मार्फत अपाङ्गता भएका व्यक्तिहरूको लागि समान पहुँच, अधिकार र सहभागिता प्रवर्द्धन गर्दै।",
      program_women_title: "असहाय र एकल महिला सशक्तीकरण",
      program_women_desc:
        "सीप तालिम, आय सृजना र समुदाय समावेशीकरण मार्फत जोखिममा रहेका महिलाहरूलाई समर्थन गर्दै",
      program_ict_title: "पहुँचयोग्य ICT र सहायक प्रविधि",
      program_ict_desc:
        "समान डिजिटल सहभागिताको लागि पहुँचयोग्य डिजिटल उपकरणहरू, समावेशी सूचना प्रणाली र सहायक प्रविधिहरू अगाडि बढाउँदै।",
      program_livelihood_title: "जीविकोपार्जन विकास",
      program_livelihood_desc:
        "व्यावसायिक तालिम र उद्यमशीलता मार्फत अपाङ्गता भएका व्यक्तिहरूको आर्थिक स्थिति सुदृढ गर्दै।",
      program_life_skills_title: "जीवन सीप र शिक्षा विकास",
      program_life_skills_desc:
        "शिक्षा र व्यावहारिक जीवन सीप मार्फत अपाङ्गता भएका युवा र बालबालिकाहरू बीच आत्मनिर्भरता र आत्मविश्वास बढाउँदै",
      program_community_title: "सामुदायिक कार्यक्रमहरू",
      program_community_desc:
        "सचेतना, तालिम र पहुँच पहलहरू मार्फत समावेशी समुदायहरू निर्माण गर्दै।",

      // Get Involved Section
      get_involved_heading: "संलग्न हुनुहोस्",
      get_involved_cta:
        "स्वयंसेवा, दान वा सदस्यता मार्फत समावेशी समाज सिर्जना गर्न हामीसँग सामेल हुनुहोस्",
      get_involved_button: "संलग्न हुनुहोस्",
      get_involved_alt_1:
        "सामुदायिक कार्यक्रममा अपाङ्गता भएका व्यक्तिहरूसँग काम गर्दै स्वयंसेवकहरू",
      get_involved_alt_2:
        "समावेशी सामुदायिक कार्यशाला सञ्चालन गर्दै DESN टोलीका सदस्यहरू",

      // Events Section
      events_heading: "आगामी कार्यक्रमहरू",
      event_1_title: "AIR मध्य-बिन्दु जाँच",
      event_1_desc:
        "डिजिटल A11y गठबन्धनसँग DESN को पहुँचयोग्य वेबसाइट प्रगति समीक्षा गर्दै।",
      event_1_alt:
        "AIR मध्य-बिन्दु जाँच कार्यक्रम - पहुँचयोग्य वेबसाइट प्रगति समीक्षा गर्दै टोली बैठक",
      event_1_date: "कार्तिक २४",
      event_1_time: "बिहान १०:०० - दिउँसो २:००",
      event_2_title: "अन्तर्राष्ट्रिय अपाङ्गता भएका व्यक्तिहरूको दिवस",
      event_2_desc:
        'सचेतना र वकालत मार्फत "समावेशीकरणको लागि नवप्रवर्तन" मनाउँदै।',
      event_2_alt:
        "अन्तर्राष्ट्रिय अपाङ्गता भएका व्यक्तिहरूको दिवस उत्सव कार्यक्रम",
      event_2_date: "मंसिर २",
      event_2_time: "बिहान १०:०० - दिउँसो २:००",
      event_3_title: "AIR पुरस्कार समारोह",
      event_3_desc:
        "knowbility द्वारा पूरा गरिएको पहुँचयोग्य वेबसाइटको मान्यता।",
      event_3_alt: "AIR पुरस्कार समारोह - पहुँचयोग्य वेबसाइट पूर्णताको उत्सव",
      event_3_date: "माघ १५",
      event_3_time: "बिहान १०:०० - दिउँसो २:००",
      event_organizer: "आयोजक:",

      // Partners Section
      partners_heading: "अनुदानदाता र साझेदारहरू",

      // Newsletter Section
      newsletter_heading: "हाम्रो न्यूजलेटर सदस्यता लिनुहोस्",
      newsletter_placeholder: "आफ्नो इमेल प्रविष्ट गर्नुहोस्",
      newsletter_button: "अहिले सदस्यता लिनुहोस्",
      newsletter_aria_label: "न्यूजलेटर सदस्यताको लागि इमेल ठेगाना",

      // Footer CTA
      footer_cta_heading: "आज हाम्रा कार्यक्रमहरूमा सामेल हुनुहोस्",
      footer_cta_description:
        "चाहे तपाईं समर्थन खोज्दै हुनुहुन्छ, स्वयंसेवा गर्न चाहनुहुन्छ, वा हामीसँग साझेदारी गर्न चाहनुहुन्छ, हाम्रा परिवर्तनकारी कार्यक्रमहरूमा संलग्न हुने धेरै तरिकाहरू छन्।",
      footer_button_get_involved: "संलग्न हुनुहोस्",
      footer_button_donate: "दान गर्नुहोस्",

      // Footer
      footer_about_heading: "DESN को बारेमा",
      footer_about_text:
        "२०६० सालमा स्थापित, DESN ले नेपालमा अपाङ्गता भएका व्यक्तिहरूको समान अधिकार र पहुँचको लागि वकालत गर्दछ।",
      footer_quick_links: "द्रुत लिङ्कहरू",
      footer_link_about: "हाम्रो बारेमा",
      footer_link_programs: "कार्यक्रमहरू",
      footer_link_events: "कार्यक्रमहरू",
      footer_link_resources: "स्रोतहरू",
      footer_link_get_involved: "संलग्न हुनुहोस्",
      footer_contact_heading: "हामीलाई सम्पर्क गर्नुहोस्",
      footer_legal_heading: "कानूनी",
      footer_link_privacy: "गोपनीयता नीति",
      footer_link_terms: "सेवाका सर्तहरू",
      footer_link_accessibility: "पहुँच कथन",
      footer_copyright: "© प्रतिलिपि अधिकार २०२५ DESN। सबै अधिकार सुरक्षित",
      footer_donate_button: "दान गर्नुहोस्",
    },
  },
};

i18n.use(initReactI18next).init({
  resources,
  lng: "en",
  fallbackLng: "en",
  interpolation: {
    escapeValue: false,
  },
});

export default i18n;

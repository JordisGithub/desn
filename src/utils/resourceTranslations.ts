// Resource translations mapping
// This maps resource IDs to their translations in different languages

export interface ResourceTranslation {
  title: string;
  description: string;
}

export interface ResourceTranslations {
  [resourceId: number]: {
    en: ResourceTranslation;
    ne: ResourceTranslation;
    new: ResourceTranslation;
    mai: ResourceTranslation;
  };
}

export const resourceTranslations: ResourceTranslations = {
  // Annual Progress Reports
  1: {
    en: {
      title: "Annual Progress Report 2078-79",
      description: "Annual progress report for fiscal year 2078-79",
    },
    ne: {
      title: "वार्षिक प्रगति प्रतिवेदन २०७८-७९",
      description: "आर्थिक वर्ष २०७८-७९ को वार्षिक प्रगति प्रतिवेदन",
    },
    new: {
      title: "वार्षिक प्रगति प्रतिवेदन २०७८-७९",
      description: "आर्थिक वर्ष २०७८-७९ या वार्षिक प्रगति प्रतिवेदन",
    },
    mai: {
      title: "वार्षिक प्रगति प्रतिवेदन २०७८-७९",
      description: "आर्थिक वर्ष २०७८-७९ क वार्षिक प्रगति प्रतिवेदन",
    },
  },
  2: {
    en: {
      title: "Annual Progress Report 2080-81",
      description: "Annual progress report for fiscal year 2080-81",
    },
    ne: {
      title: "वार्षिक प्रगति प्रतिवेदन २०८०-८१",
      description: "आर्थिक वर्ष २०८०-८१ को वार्षिक प्रगति प्रतिवेदन",
    },
    new: {
      title: "वार्षिक प्रगति प्रतिवेदन २०८०-८१",
      description: "आर्थिक वर्ष २०८०-८१ या वार्षिक प्रगति प्रतिवेदन",
    },
    mai: {
      title: "वार्षिक प्रगति प्रतिवेदन २०८०-८१",
      description: "आर्थिक वर्ष २०८०-८१ क वार्षिक प्रगति प्रतिवेदन",
    },
  },

  // Board Members CVs
  3: {
    en: {
      title: "Chairperson - Tek Nath Neopane CV",
      description: "Curriculum Vitae of Chairperson Tek Nath Neopane",
    },
    ne: {
      title: "अध्यक्ष - टेक नाथ नेपाने सीभी",
      description: "अध्यक्ष टेक नाथ नेपानेको पाठ्यक्रम विवरण",
    },
    new: {
      title: "अध्यक्ष - टेक नाथ नेपाने सीभी",
      description: "अध्यक्ष टेक नाथ नेपानेया पाठ्यक्रम विवरण",
    },
    mai: {
      title: "अध्यक्ष - टेक नाथ नेपाने सीभी",
      description: "अध्यक्ष टेक नाथ नेपानेक पाठ्यक्रम विवरण",
    },
  },
  4: {
    en: {
      title: "DESN Board and Staff",
      description: "Information about DESN board members and staff",
    },
    ne: {
      title: "DESN बोर्ड र कर्मचारी",
      description: "DESN बोर्ड सदस्य र कर्मचारीहरूको जानकारी",
    },
    new: {
      title: "DESN बोर्ड व कर्मचारी",
      description: "DESN बोर्ड सदस्य व कर्मचारीफुया जानकारी",
    },
    mai: {
      title: "DESN बोर्ड आ कर्मचारी",
      description: "DESN बोर्ड सदस्य आ कर्मचारीसभक जानकारी",
    },
  },
  5: {
    en: {
      title: "Executive Member - Gopal Prasad Ghimire CV",
      description: "Curriculum Vitae of Executive Member Gopal Prasad Ghimire",
    },
    ne: {
      title: "कार्यकारी सदस्य - गोपाल प्रसाद घिमिरे सीभी",
      description: "कार्यकारी सदस्य गोपाल प्रसाद घिमिरेको पाठ्यक्रम विवरण",
    },
    new: {
      title: "कार्यकारी सदस्य - गोपाल प्रसाद घिमिरे सीभी",
      description: "कार्यकारी सदस्य गोपाल प्रसाद घिमिरेया पाठ्यक्रम विवरण",
    },
    mai: {
      title: "कार्यकारी सदस्य - गोपाल प्रसाद घिमिरे सीभी",
      description: "कार्यकारी सदस्य गोपाल प्रसाद घिमिरेक पाठ्यक्रम विवरण",
    },
  },
  6: {
    en: {
      title: "Krishna CV",
      description: "Curriculum Vitae of board member Krishna",
    },
    ne: {
      title: "कृष्ण सीभी",
      description: "बोर्ड सदस्य कृष्णको पाठ्यक्रम विवरण",
    },
    new: {
      title: "कृष्ण सीभी",
      description: "बोर्ड सदस्य कृष्णया पाठ्यक्रम विवरण",
    },
    mai: {
      title: "कृष्ण सीभी",
      description: "बोर्ड सदस्य कृष्णक पाठ्यक्रम विवरण",
    },
  },
  7: {
    en: {
      title: "Tika Bajgain CV",
      description: "Curriculum Vitae of board member Tika Bajgain",
    },
    ne: {
      title: "टिका बज्गैं सीभी",
      description: "बोर्ड सदस्य टिका बज्गैंको पाठ्यक्रम विवरण",
    },
    new: {
      title: "टिका बज्गैं सीभी",
      description: "बोर्ड सदस्य टिका बज्गैंया पाठ्यक्रम विवरण",
    },
    mai: {
      title: "टिका बज्गैं सीभी",
      description: "बोर्ड सदस्य टिका बज्गैंक पाठ्यक्रम विवरण",
    },
  },

  // Registration Documents
  8: {
    en: {
      title: "District Administration Office Registration (Translation)",
      description:
        "English translation of District Administration Office registration",
    },
    ne: {
      title: "जिल्ला प्रशासन कार्यालय दर्ता (अनुवाद)",
      description: "जिल्ला प्रशासन कार्यालय दर्ताको अंग्रेजी अनुवाद",
    },
    new: {
      title: "जिल्ला प्रशासन कार्यालय दर्ता (अनुवाद)",
      description: "जिल्ला प्रशासन कार्यालय दर्ताया अंग्रेजी अनुवाद",
    },
    mai: {
      title: "जिल्ला प्रशासन कार्यालय दर्ता (अनुवाद)",
      description: "जिल्ला प्रशासन कार्यालय दर्ताक अंग्रेजी अनुवाद",
    },
  },
  9: {
    en: {
      title: "IRD Registration (Translation)",
      description:
        "English translation of Inland Revenue Department registration",
    },
    ne: {
      title: "आईआरडी दर्ता (अनुवाद)",
      description: "आन्तरिक राजस्व विभाग दर्ताको अंग्रेजी अनुवाद",
    },
    new: {
      title: "आईआरडी दर्ता (अनुवाद)",
      description: "आन्तरिक राजस्व विभाग दर्ताया अंग्रेजी अनुवाद",
    },
    mai: {
      title: "आईआरडी दर्ता (अनुवाद)",
      description: "आन्तरिक राजस्व विभाग दर्ताक अंग्रेजी अनुवाद",
    },
  },
  10: {
    en: {
      title: "Municipality Registration (Translation)",
      description: "English translation of Municipality registration",
    },
    ne: {
      title: "नगरपालिका दर्ता (अनुवाद)",
      description: "नगरपालिका दर्ताको अंग्रेजी अनुवाद",
    },
    new: {
      title: "नगरपालिका दर्ता (अनुवाद)",
      description: "नगरपालिका दर्ताया अंग्रेजी अनुवाद",
    },
    mai: {
      title: "नगरपालिका दर्ता (अनुवाद)",
      description: "नगरपालिका दर्ताक अंग्रेजी अनुवाद",
    },
  },
  11: {
    en: {
      title: "Social Welfare Council Registration (Translation)",
      description: "English translation of Social Welfare Council registration",
    },
    ne: {
      title: "समाज कल्याण परिषद दर्ता (अनुवाद)",
      description: "समाज कल्याण परिषद दर्ताको अंग्रेजी अनुवाद",
    },
    new: {
      title: "समाज कल्याण परिषद दर्ता (अनुवाद)",
      description: "समाज कल्याण परिषद दर्ताया अंग्रेजी अनुवाद",
    },
    mai: {
      title: "समाज कल्याण परिषद दर्ता (अनुवाद)",
      description: "समाज कल्याण परिषद दर्ताक अंग्रेजी अनुवाद",
    },
  },
  12: {
    en: {
      title: "District Administration Office Registration",
      description:
        "Official District Administration Office registration document",
    },
    ne: {
      title: "जिल्ला प्रशासन कार्यालय दर्ता",
      description: "आधिकारिक जिल्ला प्रशासन कार्यालय दर्ता कागजात",
    },
    new: {
      title: "जिल्ला प्रशासन कार्यालय दर्ता",
      description: "आधिकारिक जिल्ला प्रशासन कार्यालय दर्ता कागजात",
    },
    mai: {
      title: "जिल्ला प्रशासन कार्यालय दर्ता",
      description: "आधिकारिक जिल्ला प्रशासन कार्यालय दर्ता कागजात",
    },
  },
  13: {
    en: {
      title: "Inland Revenue Certificate (PAN)",
      description:
        "Permanent Account Number certificate from Inland Revenue Department",
    },
    ne: {
      title: "आन्तरिक राजस्व प्रमाणपत्र (पान)",
      description: "आन्तरिक राजस्व विभागबाट स्थायी खाता नम्बर प्रमाणपत्र",
    },
    new: {
      title: "आन्तरिक राजस्व प्रमाणपत्र (पान)",
      description: "आन्तरिक राजस्व विभागतःगु स्थायी खाता नम्बर प्रमाणपत्र",
    },
    mai: {
      title: "आन्तरिक राजस्व प्रमाणपत्र (पान)",
      description: "आन्तरिक राजस्व विभागसँ स्थायी खाता नम्बर प्रमाणपत्र",
    },
  },
  14: {
    en: {
      title: "Municipality Registration",
      description: "Official Municipality registration document",
    },
    ne: {
      title: "नगरपालिका दर्ता",
      description: "आधिकारिक नगरपालिका दर्ता कागजात",
    },
    new: {
      title: "नगरपालिका दर्ता",
      description: "आधिकारिक नगरपालिका दर्ता कागजात",
    },
    mai: {
      title: "नगरपालिका दर्ता",
      description: "आधिकारिक नगरपालिका दर्ता कागजात",
    },
  },
  15: {
    en: {
      title: "NFDN Registration",
      description: "National Federation of the Disabled Nepal registration",
    },
    ne: {
      title: "NFDN दर्ता",
      description: "राष्ट्रिय अपाङ्ग महासंघ नेपाल दर्ता",
    },
    new: {
      title: "NFDN दर्ता",
      description: "राष्ट्रिय अपाङ्ग महासंघ नेपाल दर्ता",
    },
    mai: {
      title: "NFDN दर्ता",
      description: "राष्ट्रिय अपाङ्ग महासंघ नेपाल दर्ता",
    },
  },
  16: {
    en: {
      title: "Social Welfare Council Registration",
      description: "Official Social Welfare Council registration document",
    },
    ne: {
      title: "समाज कल्याण परिषद दर्ता",
      description: "आधिकारिक समाज कल्याण परिषद दर्ता कागजात",
    },
    new: {
      title: "समाज कल्याण परिषद दर्ता",
      description: "आधिकारिक समाज कल्याण परिषद दर्ता कागजात",
    },
    mai: {
      title: "समाज कल्याण परिषद दर्ता",
      description: "आधिकारिक समाज कल्याण परिषद दर्ता कागजात",
    },
  },

  // DESN Policies
  17: {
    en: {
      title: "Communication Policy (Signed)",
      description: "Official signed communication policy of DESN",
    },
    ne: {
      title: "सञ्चार नीति (हस्ताक्षरित)",
      description: "DESN को आधिकारिक हस्ताक्षरित सञ्चार नीति",
    },
    new: {
      title: "सञ्चार नीति (हस्ताक्षरित)",
      description: "DESN या आधिकारिक हस्ताक्षरित सञ्चार नीति",
    },
    mai: {
      title: "सञ्चार नीति (हस्ताक्षरित)",
      description: "DESN क आधिकारिक हस्ताक्षरित सञ्चार नीति",
    },
  },
  18: {
    en: {
      title: "Communication Policy",
      description: "Communication policy of DESN",
    },
    ne: {
      title: "सञ्चार नीति",
      description: "DESN को सञ्चार नीति",
    },
    new: {
      title: "सञ्चार नीति",
      description: "DESN या सञ्चार नीति",
    },
    mai: {
      title: "सञ्चार नीति",
      description: "DESN क सञ्चार नीति",
    },
  },
  19: {
    en: {
      title: "Computer Policy (Signed)",
      description: "Official signed computer usage policy of DESN",
    },
    ne: {
      title: "कम्प्युटर नीति (हस्ताक्षरित)",
      description: "DESN को आधिकारिक हस्ताक्षरित कम्प्युटर प्रयोग नीति",
    },
    new: {
      title: "कम्प्युटर नीति (हस्ताक्षरित)",
      description: "DESN या आधिकारिक हस्ताक्षरित कम्प्युटर प्रयोग नीति",
    },
    mai: {
      title: "कम्प्युटर नीति (हस्ताक्षरित)",
      description: "DESN क आधिकारिक हस्ताक्षरित कम्प्युटर प्रयोग नीति",
    },
  },
  20: {
    en: {
      title: "Computer Policy",
      description: "Computer usage policy of DESN",
    },
    ne: {
      title: "कम्प्युटर नीति",
      description: "DESN को कम्प्युटर प्रयोग नीति",
    },
    new: {
      title: "कम्प्युटर नीति",
      description: "DESN या कम्प्युटर प्रयोग नीति",
    },
    mai: {
      title: "कम्प्युटर नीति",
      description: "DESN क कम्प्युटर प्रयोग नीति",
    },
  },
  21: {
    en: {
      title: "PSEA Policy (Signed)",
      description:
        "Official signed Protection from Sexual Exploitation and Abuse policy",
    },
    ne: {
      title: "PSEA नीति (हस्ताक्षरित)",
      description:
        "आधिकारिक हस्ताक्षरित यौन शोषण र दुर्व्यवहारबाट संरक्षण नीति",
    },
    new: {
      title: "PSEA नीति (हस्ताक्षरित)",
      description:
        "आधिकारिक हस्ताक्षरित यौन शोषण व दुर्व्यवहारतःगु संरक्षण नीति",
    },
    mai: {
      title: "PSEA नीति (हस्ताक्षरित)",
      description: "आधिकारिक हस्ताक्षरित यौन शोषण आ दुर्व्यवहारसँ संरक्षण नीति",
    },
  },

  // Publications
  22: {
    en: {
      title: "Digital Literacy Training Manual",
      description:
        "Comprehensive training manual for digital literacy programs",
    },
    ne: {
      title: "डिजिटल साक्षरता तालिम पुस्तिका",
      description: "डिजिटल साक्षरता कार्यक्रमहरूको लागि व्यापक तालिम पुस्तिका",
    },
    new: {
      title: "डिजिटल साक्षरता तालिम पुस्तिका",
      description: "डिजिटल साक्षरता कार्यक्रमफुया लागि व्यापक तालिम पुस्तिका",
    },
    mai: {
      title: "डिजिटल साक्षरता तालिम पुस्तिका",
      description: "डिजिटल साक्षरता कार्यक्रमसभक लेल व्यापक तालिम पुस्तिका",
    },
  },
  23: {
    en: {
      title: "Local Handicraft Training Manual",
      description: "Training manual for local handicraft and skill development",
    },
    ne: {
      title: "स्थानीय हस्तकला तालिम पुस्तिका",
      description: "स्थानीय हस्तकला र सीप विकासको लागि तालिम पुस्तिका",
    },
    new: {
      title: "स्थानीय हस्तकला तालिम पुस्तिका",
      description: "स्थानीय हस्तकला व सीप विकासया लागि तालिम पुस्तिका",
    },
    mai: {
      title: "स्थानीय हस्तकला तालिम पुस्तिका",
      description: "स्थानीय हस्तकला आ सीप विकासक लेल तालिम पुस्तिका",
    },
  },
  24: {
    en: {
      title: "Samadristi Magazine 15th Edition",
      description:
        "15th edition of Samadristi magazine featuring disability rights and advocacy",
    },
    ne: {
      title: "समदृष्टि पत्रिका १५औं संस्करण",
      description:
        "अपाङ्गता अधिकार र वकालत प्रस्तुत गर्ने समदृष्टि पत्रिकाको १५औं संस्करण",
    },
    new: {
      title: "समदृष्टि पत्रिका १५औं संस्करण",
      description:
        "अपाङ्गता अधिकार व वकालत प्रस्तुत याये समदृष्टि पत्रिकाया १५औं संस्करण",
    },
    mai: {
      title: "समदृष्टि पत्रिका १५म संस्करण",
      description:
        "अपांगता अधिकार आ वकालत प्रस्तुत करैत समदृष्टि पत्रिकाक १५म संस्करण",
    },
  },
};

/**
 * Get translated resource title and description
 * Falls back to original if translation not found
 */
export function getResourceTranslation(
  resourceId: number,
  originalTitle: string,
  originalDescription: string,
  language: string
): ResourceTranslation {
  const translations = resourceTranslations[resourceId];

  if (!translations) {
    return { title: originalTitle, description: originalDescription };
  }

  const langKey = language as keyof typeof translations;
  const translation = translations[langKey];

  if (!translation) {
    return { title: originalTitle, description: originalDescription };
  }

  return translation;
}

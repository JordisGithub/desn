# Resource Translations Guide

This guide explains how to add translations for resources (publications, reports, etc.) so they appear in the correct language when users switch languages.

## Overview

Resources are stored in the backend database with English titles and descriptions. To display them in multiple languages, we use a translation mapping file on the frontend.

## How to Add Translations

### Step 1: Find the Resource ID

First, you need to find the ID of the resource you want to translate:

1. Open your browser's Developer Tools (F12)
2. Go to the Resources page on your website
3. Look at the Network tab and find the API call to `/api/resources`
4. In the response, find your resource and note its `id` field

For example, if "Research on Employment Barriers" has `"id": 42`, you'll use `42` as the key.

### Step 2: Add Translation to the File

Open the file: `src/utils/resourceTranslations.ts`

Add a new entry with the resource ID and translations for all four languages:

```typescript
export const resourceTranslations: ResourceTranslations = {
  42: {
    // Use the actual ID from your API
    en: {
      title: "Research on Employment Barriers",
      description:
        "Study on employment challenges faced by persons with disabilities in urban Nepal",
    },
    ne: {
      title: "रोजगार बाधाहरूमा अनुसन्धान",
      description:
        "शहरी नेपालमा अपाङ्गता भएका व्यक्तिहरूले सामना गर्ने रोजगार चुनौतीहरूको अध्ययन",
    },
    new: {
      title: "रोजगार बाधाफुय अनुसन्धान",
      description:
        "शहरी नेपालय अपाङ्गता भयाः व्यक्तिफुं सामना याये रोजगार चुनौतीफुया अध्ययन",
    },
    mai: {
      title: "रोजगार बाधासभपर अनुसन्धान",
      description:
        "शहरी नेपालमे अपांगता भेल व्यक्तिसभ सामना करैत रोजगार चुनौतीसभक अध्ययन",
    },
  },
  // Add more resources here...
};
```

### Step 3: Test

1. Save the file
2. Rebuild your application: `npm run build`
3. Refresh the Resources page
4. Toggle between languages to verify the translations appear correctly

## Translation Guidelines

### Nepali (ne)

- Uses Devanagari script
- Formal language style
- Common particles: का, को, मा, ले

### Newari (new)

- Uses Devanagari script with Nepal Bhasa grammar
- Common particles: या, य, फु (plural), तः
- Different verb forms: यायेगु (to do), च्वयेगु (to see)

### Maithili (mai)

- Uses Devanagari script
- Common particles: क, मे, सभ (plural)
- Different verb forms: करू (to do), देखू (to see)

## Quick Reference

### Common Terms

| English    | Nepali (ne) | Newari (new) | Maithili (mai) |
| ---------- | ----------- | ------------ | -------------- |
| Report     | प्रतिवेदन   | प्रतिवेदन    | प्रतिवेदन      |
| Research   | अनुसन्धान   | अनुसन्धान    | अनुसन्धान      |
| Study      | अध्ययन      | अध्ययन       | अध्ययन         |
| Annual     | वार्षिक     | वार्षिक      | वार्षिक        |
| Policy     | नीति        | नीति         | नीति           |
| Guidelines | दिशानिर्देश | दिशानिर्देश  | दिशानिर्देश    |
| Training   | तालिम       | तालिम        | तालिम          |
| Manual     | पुस्तिका    | पुस्तिका     | पुस्तिका       |

## Troubleshooting

### Translations not appearing?

1. Clear browser cache
2. Check that you used the correct resource ID
3. Verify the language code matches: `en`, `ne`, `new`, `mai`
4. Check browser console for errors

### Finding resource IDs quickly?

Run this in the browser console on the Resources page:

```javascript
// This will log all resources with their IDs
fetch("/api/resources")
  .then((r) => r.json())
  .then((data) =>
    console.table(data.resources.map((r) => ({ id: r.id, title: r.title })))
  );
```

## Need Help?

If you need assistance with translations or technical issues, please contact the development team.

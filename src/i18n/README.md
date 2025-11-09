# i18n Translations Structure

This directory contains all internationalization translations organized by page/section for better maintainability.

## Directory Structure

```
i18n/
├── index.ts                 # Main i18n configuration
└── locales/
    ├── en/                  # English translations
    │   ├── index.ts         # Aggregates all English translations
    │   ├── common.ts        # Common translations (navigation, etc.)
    │   ├── home.ts          # Home page translations
    │   ├── about.ts         # About page translations
    │   └── footer.ts        # Footer translations
    └── ne/                  # Nepali translations
        ├── index.ts         # Aggregates all Nepali translations
        ├── common.ts        # Common translations (navigation, etc.)
        ├── home.ts          # Home page translations
        ├── about.ts         # About page translations
        └── footer.ts        # Footer translations
```

## File Organization

### `common.ts`

Contains translations used across multiple pages:

- Navigation elements
- Accessibility features
- Common UI elements

### `home.ts`

Contains translations specific to the Home page:

- Hero section
- About section preview
- Programs section
- Get Involved section
- Events section
- Partners section
- Newsletter section

### `about.ts`

Contains translations specific to the About page:

- Hero section
- Introduction section
- Legal status section
- Mission & Vision
- Objectives
- Values

### `footer.ts`

Contains translations for the footer:

- Footer CTA section
- Footer links and content
- Copyright information

## Adding New Pages

When adding a new page:

1. Create a new translation file for each language:

   ```
   src/i18n/locales/en/new-page.ts
   src/i18n/locales/ne/new-page.ts
   ```

2. Export default object with translation keys:

   ```typescript
   export default {
     key1: "Translation 1",
     key2: "Translation 2",
     // ... more translations
   };
   ```

3. Import and spread in the respective language index file:

   ```typescript
   // src/i18n/locales/en/index.ts
   import newPage from "./new-page";

   export default {
     ...common,
     ...home,
     ...about,
     ...footer,
     ...newPage, // Add your new translations
   };
   ```

## Usage

Translations are accessed the same way throughout the app:

```typescript
import { useTranslation } from "react-i18next";

function MyComponent() {
  const { t } = useTranslation();

  return <h1>{t("translation_key")}</h1>;
}
```

## Benefits

- **Maintainability**: Each page has its own translation file
- **Scalability**: Easy to add new pages without bloating a single file
- **Clarity**: Clear organization makes it easy to find and update translations
- **Team Collaboration**: Multiple developers can work on different translation files without conflicts

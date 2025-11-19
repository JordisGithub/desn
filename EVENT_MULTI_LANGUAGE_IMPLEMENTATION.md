# Event Management Multi-Language Support Implementation

## Overview

Implemented comprehensive multi-language support for the event management system with image upload capability, alt text support, and featured event flagging across 4 supported languages: English (en), Nepali (ne), Newari (new), and Maithili (mai).

## Features Implemented

### 1. Frontend - EventManagementPanel Component (`src/components/admin/EventManagementPanel.tsx`)

#### New Capabilities:

- **Multi-Language Editing Interface**: Language tabs (Tabs component) allowing admins to switch between en, ne, new, mai
- **Image Upload**: Drag-and-drop file upload with preview functionality
- **Featured Event Flag**: Checkbox to mark events as featured
- **Language-Specific Fields**: Title, description, and alt text can be entered in all 4 languages
- **Accessibility**: Alt text fields support language-specific descriptions for accessibility compliance

#### New State Management:

```tsx
const [imagePreview, setImagePreview] = useState<string | null>(null);
const [currentLanguage, setCurrentLanguage] = useState<string>("en");
```

#### Updated Interfaces:

```tsx
interface EventFormData {
  title: string;
  description: string;
  altText: string;
  titleTranslations: Record<string, string>; // { en: "...", ne: "...", new: "...", mai: "..." }
  descriptionTranslations: Record<string, string>;
  altTextTranslations: Record<string, string>;
  startDate: string;
  endDate: string;
  location: string;
  maxAttendees: number | "";
  featured: boolean;
}
```

#### New Handlers:

- `handleImageUpload()`: Handles file selection and converts to base64 preview
- Updated `handleOpenDialog()`: Parses translation JSON from backend
- Updated `handleSaveEvent()`: Serializes translations to JSON before sending to backend

### 2. Backend - Event Entity (`backend/src/main/java/com/example/proxy/entity/Event.java`)

#### New Fields Added (as TEXT/JSON columns):

```java
private String altText;                           // VARCHAR - accessibility alt text
private String titleTranslations;                 // TEXT - JSON: { "en": "...", "ne": "...", "new": "...", "mai": "..." }
private String descriptionTranslations;           // TEXT - JSON
private String altTextTranslations;               // TEXT - JSON
```

#### Getter/Setter Methods:

- `getAltText()`, `setAltText(String)`
- `getTitleTranslations()`, `setTitleTranslations(String)`
- `getDescriptionTranslations()`, `setDescriptionTranslations(String)`
- `getAltTextTranslations()`, `setAltTextTranslations(String)`

### 3. Backend - AdminEventController (`backend/src/main/java/com/example/proxy/controller/AdminEventController.java`)

#### Enhanced Update Method:

Added support for updating the new translation fields:

```java
if (event.getAltText() != null) {
    existingEvent.setAltText(event.getAltText());
}
if (event.getTitleTranslations() != null) {
    existingEvent.setTitleTranslations(event.getTitleTranslations());
}
if (event.getDescriptionTranslations() != null) {
    existingEvent.setDescriptionTranslations(event.getDescriptionTranslations());
}
if (event.getAltTextTranslations() != null) {
    existingEvent.setAltTextTranslations(event.getAltTextTranslations());
}
```

### 4. Frontend - EventService (`src/services/EventService.ts`)

#### Updated EventResponse Interface:

```tsx
interface EventResponse {
  id: number;
  title: string;
  description: string;
  altText?: string;
  titleTranslations?: string | Record<string, string>;
  descriptionTranslations?: string | Record<string, string>;
  altTextTranslations?: string | Record<string, string>;
  startDate: string;
  endDate: string;
  location: string;
  maxAttendees: number;
  currentAttendees: number;
  status?: string;
  featured?: boolean;
  imageUrl?: string;
}
```

## UI Components Updated

### EventManagementPanel Dialog Form:

1. **Image Upload Section**:

   - Drag-and-drop area with CloudUploadIcon
   - Image preview display
   - File input handler

2. **Featured Checkbox**:

   - FormControlLabel with Checkbox
   - Controls `featured` boolean field

3. **Language Tabs**:

   - Tabs component showing: English | नेपाली | नेवारी | मैथिली
   - Active tab determines which language fields are shown

4. **Language-Specific Input Fields**:

   - Title field (language-aware label)
   - Description field (multiline)
   - Alt Text field (with accessibility helper text)

5. **Common Fields** (not language-specific):
   - Location
   - Start Date
   - End Date
   - Max Attendees

## Data Flow

### Creating/Editing an Event:

1. Admin opens EventManagementPanel dialog
2. Can click image upload area to select event image
3. Selects featured checkbox if desired
4. Uses language tabs to enter data in each language:
   - English tab entered first (required for validation)
   - Other language tabs filled as needed
5. Clicks "Create" or "Update" button
6. Frontend:
   - Validates English title and description are present
   - Converts translation objects to JSON strings
   - Sends to `/api/admin/events` or `/api/admin/events/{id}` endpoint
7. Backend:
   - Stores translations as JSON strings in database
   - Stores altText and featured flag
8. Dialog closes, event list refreshes

### Retrieving Event Data:

1. Admin page fetches from `/api/admin/events`
2. Backend returns Event objects with translation fields as JSON strings
3. Frontend parses JSON strings back to objects for editing
4. When dialog opens for edit, translations are available in all language tabs

## Technical Specifications

### Supported Languages:

- **en** - English
- **ne** - Nepali (नेपाली)
- **new** - Newari (नेवारी)
- **mai** - Maithili (मैथिली)

### Database Schema Updates Needed:

The following columns need to be added to the `events` table:

```sql
ALTER TABLE events ADD COLUMN alt_text VARCHAR(255);
ALTER TABLE events ADD COLUMN title_translations TEXT;
ALTER TABLE events ADD COLUMN description_translations TEXT;
ALTER TABLE events ADD COLUMN alt_text_translations TEXT;
ALTER TABLE events ADD COLUMN featured TINYINT(1) DEFAULT 0;
```

### Storage Format:

Translations are stored as JSON strings in the database for flexibility:

```json
{
  "en": "English title",
  "ne": "नेपाली शीर्षक",
  "new": "नेवारी शीर्षक",
  "mai": "मैथिली शीर्षक"
}
```

## Build Status

### Frontend:

✅ **Build Successful** (1.73s)

- TypeScript compilation: Pass
- Vite build: Pass
- No errors or warnings

### Backend:

✅ **Build Successful** (7.818s)

- Maven compilation: Pass
- Package created: `/Users/jordi/git/desn/backend/target/proxy-backend-0.0.1-SNAPSHOT.jar`

## Next Steps (Future Work)

1. **Database Migration**: Run Flyway/Liquibase migration or Hibernate auto-update to add new columns
2. **Image Upload Endpoint**: Implement backend endpoint for image file upload and storage
3. **Translation Sync**: Display translations on public-facing event pages
4. **Language Auto-Detection**: Enhanced language detection when entering alt text
5. **Bulk Translation Tools**: Integration with translation APIs (Google Translate, etc.)
6. **Event Card Display**: Update EventsSection to show language-specific content based on user language preference

## Testing Checklist

- [ ] Open EventManagementPanel dialog
- [ ] Verify language tabs are visible
- [ ] Enter event data in English tab
- [ ] Switch to other language tabs and enter translations
- [ ] Upload image and verify preview
- [ ] Check featured checkbox
- [ ] Save event and verify data persists
- [ ] Edit event and verify translations load correctly
- [ ] Verify data is stored as JSON in database
- [ ] Test with partial translations (some languages empty)

## Files Modified

1. `/Users/jordi/git/desn/src/components/admin/EventManagementPanel.tsx`
2. `/Users/jordi/git/desn/backend/src/main/java/com/example/proxy/entity/Event.java`
3. `/Users/jordi/git/desn/backend/src/main/java/com/example/proxy/controller/AdminEventController.java`
4. `/Users/jordi/git/desn/src/services/EventService.ts`

## API Contracts

### POST /api/admin/events

**Request Body:**

```json
{
  "title": "English Title",
  "description": "English Description",
  "altText": "Alt text for English",
  "titleTranslations": "{\"en\":\"English Title\",\"ne\":\"नेपाली\",\"new\":\"नेवारी\",\"mai\":\"मैथिली\"}",
  "descriptionTranslations": "{...}",
  "altTextTranslations": "{...}",
  "startDate": "2025-12-01T09:00:00.000Z",
  "endDate": "2025-12-01T17:00:00.000Z",
  "location": "Kathmandu",
  "maxAttendees": 100,
  "featured": true
}
```

### PUT /api/admin/events/{id}

Same structure as POST for partial updates.

## Benefits

- ✅ Admins can enter event information in multiple languages simultaneously
- ✅ Improved accessibility with language-aware alt text support
- ✅ Featured events can be promoted to homepage
- ✅ Image upload enables rich event presentations
- ✅ Flexible JSON storage allows for future language additions
- ✅ UI is intuitive with clear language tabs and visual feedback

# Accessible Forms Implementation Guide

## Overview

The DESN application implements comprehensive accessibility features across its forms, particularly in the **Get Involved** section which includes the Volunteer and Membership forms. This document details the accessibility patterns, standards compliance, and implementation best practices used throughout the forms.

## Table of Contents

1. [WCAG 2.2 Compliance](#wcag-22-compliance)
2. [Form Architecture](#form-architecture)
3. [Accessibility Features](#accessibility-features)
4. [Component Breakdown](#component-breakdown)
5. [Keyboard Navigation](#keyboard-navigation)
6. [Screen Reader Support](#screen-reader-support)
7. [Error Handling](#error-handling)
8. [Testing Approach](#testing-approach)
9. [Best Practices](#best-practices)

---

## WCAG 2.2 Compliance

The DESN application aims to conform to **WCAG 2.2 Level AA** standards. The forms specifically address:

### Relevant WCAG Success Criteria

| Criterion                        | Implementation                                     |
| -------------------------------- | -------------------------------------------------- |
| **1.4.3 Contrast (Minimum)**     | All text meets 4.5:1 contrast ratio                |
| **2.1.1 Keyboard**               | All functionality accessible via keyboard          |
| **2.1.2 No Keyboard Trap**       | Focus can be moved away from components            |
| **2.4.3 Focus Order**            | Tab order is logical and meaningful                |
| **2.4.7 Focus Visible**          | Clear visual focus indicators (3px yellow border)  |
| **3.2.1 On Focus**               | No unexpected context changes on focus             |
| **3.2.2 On Input**               | Users notified before data submission              |
| **3.3.1 Error Identification**   | Errors identified in text and color                |
| **3.3.2 Labels or Instructions** | Form fields have associated labels                 |
| **3.3.3 Error Suggestion**       | Error messages provide correction guidance         |
| **3.3.4 Error Prevention**       | Form validation prevents data loss                 |
| **4.1.2 Name, Role, Value**      | Form fields have proper ARIA attributes            |
| **4.1.3 Status Messages**        | Success/error messages announced to screen readers |

---

## Form Architecture

### File Structure

```
src/components/getinvolved/
├── MembershipSection.tsx          # Membership form container
├── VolunteerSection.tsx           # Volunteer form container
├── VolunteerForm.tsx              # Volunteer form (inline component)
└── styles/ (MUI styled components)
```

### Key Principles

1. **Component Separation**: Forms are split into containers (Section components) and form components
2. **State Management**: React hooks (`useState`) manage form state
3. **Styled Components**: MUI `styled()` provides accessible styling
4. **Internationalization**: All labels and messages use i18n for multi-language support
5. **API Integration**: `postWithAuth` service handles secure submissions

---

## Accessibility Features

### 1. Semantic HTML & ARIA

#### Section-Level Semantics

```tsx
<Section
  id='membership-section'
  role='region'
  aria-labelledby='membership-section-title'
>
  <SectionTitle as='h2' id='membership-section-title'>
    {t("get_involved.membership.title")}
  </SectionTitle>
</Section>
```

**Features:**

- `role='region'` identifies the section as a landmark
- `aria-labelledby` links the region to its title (h2)
- Proper heading hierarchy (h2 for main sections, h3 for subsections)

#### Dialog/Modal Accessibility

```tsx
<Dialog
  id='membership-dialog'
  open={isModalOpen}
  onClose={handleCloseModal}
  aria-labelledby='membership-dialog-title'
  aria-describedby='membership-dialog-desc'
  maxWidth='md'
  fullWidth
>
```

**Features:**

- Dialog properly labeled with `aria-labelledby`
- Description provided with `aria-describedby`
- Close button with `aria-label`
- MUI Dialog handles focus management automatically

### 2. Form Field Accessibility

#### Proper Labeling

```tsx
<StyledTextField
  id='membership-fullName'
  name='fullName'
  label={t("get_involved.membership.form.full_name")}
  slotProps={{
    input: {
      "aria-label": "Full Name",
      "aria-required": "true",
      "aria-invalid": !!validationErrors.fullName,
      "aria-describedby": validationErrors.fullName
        ? "membership-fullName-error"
        : undefined,
    },
  }}
  FormHelperTextProps={{
    id: "membership-fullName-error",
    role: "alert",
  }}
/>
```

**Features:**

- `id` for form field enables label association
- `aria-label` for additional context
- `aria-required="true"` indicates required fields
- `aria-invalid` reflects error state
- `aria-describedby` links to error message

#### Visual Error Indication

- **Field-level**: `error={!!validationErrors.fullName}` turns border red
- **Helper text**: Shows error message below field with `role="alert"`
- **Error summary**: Collects all errors in accessible alert box

### 3. Error Handling & Validation

#### Client-Side Validation

```tsx
const validateForm = (): boolean => {
  const errors: { fullName?: string; email?: string; phone?: string } = {};

  if (!formData.fullName.trim()) {
    errors.fullName = t(
      "get_involved.membership.form.errors.full_name_required"
    );
  }

  if (!formData.email.trim()) {
    errors.email = t("get_involved.membership.form.errors.email_required");
  } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
    errors.email = t("get_involved.membership.form.errors.email_invalid");
  }

  setValidationErrors(errors);
  return Object.keys(errors).length === 0;
};
```

#### Error Summary Alert

```tsx
{Object.keys(validationErrors).length > 0 && (
  <Alert
    severity='error'
    role='alert'
    aria-live='assertive'
    aria-atomic='true'
    sx={{...}}
    ref={errorSummaryRef}
    tabIndex={-1}
  >
    <Box component='div' sx={{ fontWeight: 700, mb: 1 }}>
      {t("get_involved.membership.form.errors.summary_title")}
    </Box>
    <Box component='ul' sx={{ m: 0, pl: 2 }}>
      {validationErrors.fullName && (
        <li>
          <a
            href='#membership-fullName'
            onClick={(e) => {
              e.preventDefault();
              document.getElementById("membership-fullName")?.focus();
            }}
          >
            {validationErrors.fullName}
          </a>
        </li>
      )}
    </Box>
  </Alert>
)}
```

**Accessibility Features:**

- `role='alert'` announces errors immediately
- `aria-live='assertive'` ensures screen readers interrupt to announce
- `aria-atomic='true'` reads entire alert content
- Clickable links focus corresponding form fields
- `tabIndex={-1}` allows programmatic focus
- Error summary ref focuses when validation fails: `setTimeout(() => { errorSummaryRef.current?.focus(); }, 100);`

#### Success Messages

```tsx
{
  submitSuccess && (
    <Alert
      severity='success'
      role='status'
      aria-live='polite'
      sx={{ mb: 3, maxWidth: "768px", margin: "0 auto 24px" }}
    >
      {t("get_involved.membership.form.success_message")}
    </Alert>
  );
}
```

**Features:**

- `role='status'` indicates status message
- `aria-live='polite'` announces without interrupting
- Auto-closes after 2 seconds via `setTimeout`

---

## Component Breakdown

### 1. MembershipSection Component

**Location:** `src/components/getinvolved/MembershipSection.tsx`

**Purpose:** Container for membership information and form

**Key Features:**

- Displays membership introduction with image
- Lists membership benefits in accessible grid
- Opens membership form in dialog on button click
- Full inline form implementation (not separated component)
- Handles full membership application (full name, email, phone)

**Accessibility Highlights:**

```tsx
<BenefitsGrid
  role='list'
  aria-label={t("get_involved.membership.benefits.title")}
>
  {benefits.map((benefit, index) => (
    <BenefitCard key={index} role='listitem'>
      <CheckCircleIcon sx={{ color: "#00a77f", fontSize: 24 }} />
      <BenefitText>{benefit}</BenefitText>
    </BenefitCard>
  ))}
</BenefitsGrid>
```

- Benefits displayed as list with proper roles
- Each benefit item marked with `role='listitem'`
- Icons marked as `aria-hidden='true'` (decorative)

### 2. VolunteerSection Component

**Location:** `src/components/getinvolved/VolunteerSection.tsx`

**Purpose:** Container for volunteer information and opportunities

**Key Features:**

- Displays volunteer introduction and benefits
- Shows 4 volunteer opportunity cards with images
- Opens volunteer form in dialog on button click
- Delegates to separate VolunteerForm component

**Accessibility Highlights:**

```tsx
<OpportunitiesGrid
  role='list'
  aria-label={t("get_involved.volunteer.opportunities_list_aria_label")}
>
  {opportunities.map((opportunity, index) => (
    <OpportunityCard key={index} role='listitem'>
      {/* Card content */}
    </OpportunityCard>
  ))}
</OpportunitiesGrid>
```

### 3. VolunteerForm Component

**Location:** `src/components/getinvolved/VolunteerForm.tsx`

**Purpose:** Reusable volunteer form with full accessibility

**Key Features:**

- Accepts props: `onSuccess`, `dialogTitleId`, `dialogDescId`
- Auto-focuses first input when opened
- Handles two fields: full name and email
- Programmatically manages focus and errors
- Used within Dialog in VolunteerSection

**Accessibility Highlights:**

```tsx
const firstInputRef = useRef<HTMLInputElement | null>(null);

useEffect(() => {
  if (firstInputRef.current) {
    firstInputRef.current.focus();
  }
}, []);
```

- Auto-focuses first input on dialog open
- Improves keyboard navigation experience

---

## Keyboard Navigation

### Tab Order

Forms follow a logical tab order:

1. **Button to open form** → Opens dialog
2. **First form field** (auto-focused) → Auto-focus on dialog open
3. **Subsequent form fields** → Logical left-to-right, top-to-bottom
4. **Submit button** → Tab naturally to form submission
5. **Close button** → Accessible via tab navigation

### Key Interactions

| Key         | Action                                      |
| ----------- | ------------------------------------------- |
| `Tab`       | Move to next form field                     |
| `Shift+Tab` | Move to previous form field                 |
| `Enter`     | Submit form (when focused on submit button) |
| `Space`     | Activate buttons                            |
| `Escape`    | Close modal (MUI Dialog default)            |

### Focus Management

```tsx
// Auto-focus first input
const firstInputRef = useRef<HTMLInputElement | null>(null);
useEffect(() => {
  if (firstInputRef.current) {
    firstInputRef.current.focus();
  }
}, []);

// Focus error summary after validation failure
setTimeout(() => {
  errorSummaryRef.current?.focus();
}, 100);
```

### Focus Indicators

```tsx
"&.Mui-focused fieldset": {
  borderColor: "#f6d469",
  borderWidth: "3px",
}
```

- **Color:** Yellow (#f6d469) - high contrast
- **Style:** 3px border on outline
- **Clear visibility:** Easy to see on any background

---

## Screen Reader Support

### Announcements

#### Form Submission

1. **Validation errors** → Alert with `aria-live='assertive'` immediately announces
2. **Success message** → Alert with `aria-live='polite'` announces after 2 seconds
3. **Field errors** → Helper text with `role='alert'` announces when set

#### Dialog Opening

```tsx
<Dialog
  aria-labelledby='membership-dialog-title'
  aria-describedby='membership-dialog-desc'
>
```

- Screen reader announces dialog title and description
- Focus trapped within dialog automatically
- Close button accessible

### Tested Screen Readers

Based on accessibility statement, forms tested with:

- **NVDA** (Windows)
- **VoiceOver** (macOS/iOS)
- **JAWS** (Windows) - implied through WCAG compliance

### Content in All Languages

All form labels, errors, and messages support:

- **English (en)**
- **Nepali (ne)**
- **Maithili (mai)**
- **Newari (new)**

```tsx
import { useTranslation } from "react-i18next";

const { t } = useTranslation();
```

---

## Error Handling

### Validation Strategy

#### Real-time Validation

```tsx
const handleChange = (
  e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
) => {
  const { name, value } = e.target;
  setFormData({
    ...formData,
    [name]: value,
  });

  // Clear field-specific validation error when user starts typing
  if (validationErrors[name as keyof typeof validationErrors]) {
    setValidationErrors((prev) => {
      const updated = { ...prev };
      delete updated[name as keyof typeof validationErrors];
      return updated;
    });
  }
  // Clear general errors when user starts typing
  if (submitError) setSubmitError(null);
  if (submitSuccess) setSubmitSuccess(false);
};
```

**Features:**

- Errors clear as user corrects them
- Improves user experience by not showing stale errors
- Real-time feedback without page reload

#### Submission Validation

```tsx
const handleSubmit = async (e: React.FormEvent) => {
  e.preventDefault();
  setSubmitError(null);
  setSubmitSuccess(false);

  if (!validateForm()) {
    setTimeout(() => {
      errorSummaryRef.current?.focus();
    }, 100);
    return;
  }
  // ... API call
};
```

### Error Messages

#### Membership Form

```
Field                    Error Message
─────────────────────────────────────────────────
Full Name                Full name is required
Email                    Email address is required
                         Please enter a valid email address
Phone                    Phone number is required
```

#### Volunteer Form

```
Field                    Error Message
─────────────────────────────────────────────────
Full Name                Full name is required
Email                    Email address is required
                         Please enter a valid email address
```

### Error Display Strategy

**User sees THREE error representations:**

1. **Field-level error**

   - Red outline on field
   - Helper text below field with role="alert"
   - `aria-invalid="true"` on input
   - `aria-describedby` links to error

2. **Error summary**

   - Collects all errors in Alert box
   - `aria-live="assertive"` announces immediately
   - Focus programmatically moves to alert
   - Contains clickable links to fields

3. **Submit disabled**
   - Submit button disabled during processing
   - Shows loading spinner via `CircularProgress`

---

## Testing Approach

### Unit Tests

**Location:** `src/tests/forms/FormErrorHandling.test.tsx`

#### Test Coverage

**Volunteer Form Tests:**

- Display error summary on empty form submission
- Show error for missing full name
- Show error for invalid email format
- Verify `aria-invalid` attribute on fields
- Verify field errors clear on user input
- Verify role="alert" on error summary
- Verify aria-live attributes

**Membership Form Tests:**

- Display error summary on empty form submission
- Show errors for all required fields (full name, email, phone)
- Validate email format
- Verify clickable links in error summary
- Verify proper ARIA attributes on all fields

#### Accessibility Assertions

```tsx
expect(nameInput).toHaveAttribute("aria-invalid", "true");
expect(errorSummary).toHaveAttribute("aria-live", "assertive");
expect(errorSummary).toHaveAttribute("aria-atomic", "true");
```

### Manual Testing Checklist

**Keyboard Navigation:**

- [ ] Tab through all form fields in order
- [ ] Shift+Tab navigates backward
- [ ] Enter submits form from submit button
- [ ] Escape closes modal
- [ ] No keyboard traps

**Screen Reader (NVDA/VoiceOver):**

- [ ] Dialog title announced
- [ ] All form labels announced
- [ ] Required fields announced
- [ ] Errors announced immediately (aria-live)
- [ ] Error summary links navigable
- [ ] Success message announced
- [ ] All 4 languages work

**Visual:**

- [ ] Focus indicators visible on all fields
- [ ] Contrast ratios meet WCAG AA (4.5:1 minimum)
- [ ] Error text readable on highlighted background
- [ ] Mobile layout accessible (touch targets ≥44px)
- [ ] Zoom to 200% works without overflow

---

## Best Practices

### 1. Semantic HTML First

✅ **Good:**

```tsx
<SectionTitle as='h2' id='membership-section-title'>
  {t("get_involved.membership.title")}
</SectionTitle>
```

❌ **Avoid:**

```tsx
<Typography variant='h2' role='heading' aria-level={2}>
  {t("get_involved.membership.title")}
</Typography>
```

### 2. ARIA Labels vs Visual Labels

✅ **Good:**

```tsx
<TextField
  label='Full Name' // Visual label
  slotProps={{
    input: {
      "aria-label": "Full Name", // For screen readers
    },
  }}
/>
```

### 3. Error Prevention & Recovery

✅ **Good:**

```tsx
// 1. Validate before submission
if (!validateForm()) return;

// 2. Focus error summary
errorSummaryRef.current?.focus();

// 3. Provide clickable links to fields
// 4. Clear errors as user fixes them
```

### 4. Color Not Sole Indicator

✅ **Good:**

```tsx
// Error indicated by:
// 1. Red outline (color)
// 2. Red helper text (text/color)
// 3. aria-invalid="true" (programmatic)
// 4. Alert box with text (text)
```

❌ **Avoid:**

```tsx
// Only showing red border without text explanation
```

### 5. Form Submission UX

✅ **Good:**

```tsx
// 1. Show loading state
setIsSubmitting(true);

// 2. Disable form fields
disabled={isSubmitting}

// 3. Show spinner in button
endIcon={isSubmitting ? <CircularProgress /> : <SendIcon />}

// 4. Show success/error messages
{submitSuccess && <Alert ...>}
{submitError && <Alert ...>}

// 5. Auto-close on success
setTimeout(() => onSuccess?.(), 2000);
```

### 6. Internationalization

✅ **Good:**

```tsx
// All user-facing text translated
label={t("get_involved.membership.form.full_name")}
error_message={t("get_involved.membership.form.errors.full_name_required")}
```

### 7. API Integration

✅ **Good:**

```tsx
// Use typed responses
interface SubmissionResponse {
  success: boolean;
  message?: string;
}

// Handle errors gracefully
try {
  const response = await postWithAuth<SubmissionResponse>(...);
  if (response.success) {
    setSubmitSuccess(true);
  } else {
    setSubmitError(response.message || "Failed to submit");
  }
} catch (error) {
  setSubmitError("Failed to submit application. Please try again.");
}
```

---

## Styling Considerations

### Color Scheme

| Element        | Color            | Purpose                        |
| -------------- | ---------------- | ------------------------------ |
| Focus border   | #f6d469 (Yellow) | High contrast, clearly visible |
| Success        | #00a77f (Green)  | Standard success color         |
| Error          | #c00 (Red)       | Standard error color           |
| Primary text   | #004c91 (Blue)   | Main brand color               |
| Secondary text | #364153 (Gray)   | Body text                      |

### Spacing

- Form fields have `gap: theme.spacing(4)` between them
- Benefits grid has `gap: 24px` for scanability
- Mobile breakpoints adjust spacing proportionally

### Typography

- **Heading (h2):** 32px, fontWeight 400, Open Sans
- **Form labels:** 16px, fontWeight 400
- **Helper text:** 14px, smaller for secondary info
- **Error text:** 14px, bold red color

---

## API Endpoints

### Volunteer Form

```
POST /api/forms/volunteer
Content-Type: application/json

{
  "fullName": string,
  "email": string,
  "language": string (en, ne, mai, new)
}

Response: { success: boolean, message?: string }
```

### Membership Form

```
POST /api/forms/membership
Content-Type: application/json

{
  "fullName": string,
  "email": string,
  "phone": string,
  "language": string (en, ne, mai, new)
}

Response: { success: boolean, message?: string }
```

---

## Known Limitations

Based on the accessibility statement, known limitations include:

1. **Third-party payment gateways** - May have limited accessibility in Khalti integration
2. **PDF documents** - Legacy PDFs may not be fully accessible
3. **Legacy images** - Some generic alt text being updated

---

## Resources

### Related Files

- **Accessibility Statement:** `src/i18n/locales/en/accessibility.ts`
- **Translations:** `src/i18n/locales/[en,ne,mai,new]/`
- **Tests:** `src/tests/forms/FormErrorHandling.test.tsx`
- **API Service:** `src/services/ApiService.ts`

### References

- [WCAG 2.2 Guidelines](https://www.w3.org/WAI/WCAG22/quickref/)
- [WAI-ARIA Authoring Practices](https://www.w3.org/WAI/ARIA/apg/)
- [MUI Accessibility](https://mui.com/material-ui/guides/accessibility/)
- [React i18n](https://www.i18next.com/)

### Standards

- WCAG 2.2 Level AA
- Section 508 (Federal)
- ADA (Americans with Disabilities Act)
- AODA (Accessibility for Ontarians with Disabilities Act)

---

## Version History

| Date       | Changes                                                  |
| ---------- | -------------------------------------------------------- |
| 2025-01-15 | Initial documentation of accessible forms implementation |

---

## Contact & Support

For accessibility questions or issues:

- **Email:** info@desnnepal.org
- **Phone:** +977 1 5970140
- **Address:** Kathmandu, Nepal

**Response time:** Within 5 business days

---

_This document reflects the current accessibility implementation as of the latest commit. Please ensure all future form modifications maintain these accessibility standards._

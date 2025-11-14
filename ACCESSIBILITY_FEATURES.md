# Accessibility Enhancements Documentation

This document describes all accessibility improvements implemented in the DESN application to ensure WCAG 2.2 AA compliance and provide an inclusive user experience.

## Overview

The application now includes comprehensive accessibility features including:

- Focus management for route changes
- Skip navigation links
- Enhanced form validation announcements
- High contrast mode support
- Focus-visible styles for keyboard users
- Reduced motion support
- Automated accessibility monitoring in CI/CD

## 1. Focus Management

### Route Change Focus Management (`useFocusManagement` hook)

**Location**: `src/hooks/useFocusManagement.ts`

**Features**:

- Automatically scrolls to top of page on navigation
- Moves focus to main heading (h1) or main content area
- Announces page changes to screen readers via live region
- Temporarily adds tabindex="-1" to elements for programmatic focus

**Usage**:

```tsx
import { useFocusManagement } from "../hooks/useFocusManagement";

const announcementRef = useFocusManagement();
```

**Implementation in Layout**: The hook is integrated into the main Layout component, ensuring all route changes are handled consistently.

### Announcer Hook (`useAnnouncer`)

**Location**: `src/hooks/useAnnouncer.ts`

**Features**:

- Provides a reusable way to announce dynamic content changes
- Supports both "polite" and "assertive" announcements
- Creates and manages a hidden live region element
- Ensures screen readers catch announcements with proper timing

**Usage**:

```tsx
import { useAnnouncer } from "../hooks/useAnnouncer";

const { announce } = useAnnouncer();

// Polite announcement (default)
announce("Content loaded successfully");

// Assertive announcement (interrupts screen reader)
announce("Error occurred", "assertive");
```

## 2. Skip Navigation

### Skip to Main Content Link

**Location**: `src/components/Header.tsx`

**Features**:

- Provides keyboard users a way to skip repetitive navigation
- Visually hidden by default (positioned off-screen)
- Becomes visible when focused via keyboard (Tab key)
- Styled with high contrast for visibility
- Programmatically focuses main content area when activated

**Appearance**:

- Hidden: positioned at `-9999px` (off-screen)
- Focused: positioned at `8px, 8px` (top-left of viewport)
- Styled with blue background (#004c91) and white text
- Clear "Skip to main content" label

**Target**: The link focuses the `<main id="main-content">` element in the Layout component.

## 3. Form Validation Announcements

### Enhanced Error Messages

**Locations**:

- `src/views/Login.tsx`
- `src/views/Register.tsx`

**Features**:

- All error Alert components now have `role="alert"`
- Enhanced with `aria-live="assertive"` for immediate announcement
- Ensures screen readers immediately notify users of validation errors
- Works with existing Material-UI Alert components

**Implementation**:

```tsx
{
  error && (
    <Alert severity='error' role='alert' aria-live='assertive' sx={{ mb: 3 }}>
      {error}
    </Alert>
  );
}
```

## 4. High Contrast Mode Support

**Location**: `src/index.css`

**Features**:

- Detects system-level high contrast preference via `@media (prefers-contrast: high)`
- Automatically enhances visual contrast for all elements
- Forces borders to use current text color
- Underlines all links for better visibility
- Increases border width on interactive elements

**CSS Rules**:

```css
@media (prefers-contrast: high) {
  * {
    border-color: currentColor !important;
  }

  a {
    text-decoration: underline !important;
  }

  button,
  input,
  select,
  textarea {
    border: 2px solid currentColor !important;
  }
}
```

## 5. Focus-Visible Styles

**Location**: `src/index.css`

**Features**:

- Clear focus indicators (3px solid blue outline) for keyboard navigation
- Uses `:focus-visible` to show focus only for keyboard users
- Removes focus outline for mouse/touch interactions
- Consistent styling across all interactive elements
- 2px offset for better visibility

**Supported Elements**:

- Links (`<a>`)
- Buttons (`<button>`)
- Form inputs (`<input>`, `<textarea>`, `<select>`)
- ARIA elements (`[role="button"]`, `[role="link"]`)
- Tabbable elements (`[tabindex]`)

**CSS Rules**:

```css
*:focus-visible {
  outline: 3px solid #004c91;
  outline-offset: 2px;
  border-radius: 2px;
}

*:focus:not(:focus-visible) {
  outline: none;
}
```

## 6. Reduced Motion Support

**Location**: `src/index.css`

**Features**:

- Respects user's system-level motion preferences
- Disables animations for users with vestibular disorders
- Reduces animation duration to near-instant (0.01ms)
- Forces animations to run only once
- Disables smooth scrolling

**CSS Rules**:

```css
@media (prefers-reduced-motion: reduce) {
  *,
  *::before,
  *::after {
    animation-duration: 0.01ms !important;
    animation-iteration-count: 1 !important;
    transition-duration: 0.01ms !important;
    scroll-behavior: auto !important;
  }
}
```

**Affected Features**:

- All CSS transitions
- All CSS animations
- Smooth scroll behavior
- Before/after pseudo-elements

## 7. Automated Accessibility Monitoring

### GitHub Actions Workflow

**Location**: `.github/workflows/accessibility.yml`

**Features**:

- Runs on all pushes to master and feature branches
- Runs on all pull requests to master
- Executes full accessibility test suite
- Generates and uploads test results
- Provides PR comments with results

**Jobs**:

#### 1. Accessibility Tests

- Installs dependencies
- Runs `npm run test:a11y` (full Vitest test suite)
- Generates test summary in GitHub Actions summary
- Uploads test results as artifacts (30-day retention)

#### 2. Lighthouse Audit (PR only)

- Builds the application
- Serves it locally
- Runs Lighthouse CI on 7 main pages:
  - Home
  - About
  - Programs
  - Events
  - Get Involved
  - Resources
  - Contact
- Comments on PR with results link
- Uploads audit artifacts

### Lighthouse CI Configuration

**Location**: `lighthouserc.json`

**Configuration**:

- Runs 3 times per page (for consistency)
- Desktop preset
- Focuses on: accessibility, best-practices, SEO
- Minimum scores:
  - Accessibility: 90% (error if below)
  - Best Practices: 85% (warning if below)
  - SEO: 85% (warning if below)

**Enforced Rules**:

- Color contrast (error)
- Heading order (error)
- HTML lang attributes (error)
- Image alt text (error)
- Form labels (error)
- Link names (error)
- Button names (error)
- Document titles (error)
- All ARIA rules (error)

### Package Scripts

**Location**: `package.json`

**New Script**:

```json
"test:a11y": "vitest run --reporter=verbose"
```

**Usage**:

```bash
npm run test:a11y  # Run all accessibility tests
```

## 8. Screen Reader Only Utility Class

**Location**: `src/index.css`

**Class**: `.sr-only`

**Features**:

- Visually hides content while keeping it accessible to screen readers
- Properly removes element from visual flow
- Maintains element in accessibility tree

**CSS**:

```css
.sr-only {
  position: absolute;
  width: 1px;
  height: 1px;
  padding: 0;
  margin: -1px;
  overflow: hidden;
  clip: rect(0, 0, 0, 0);
  white-space: nowrap;
  border-width: 0;
}
```

**Usage Examples**:

- Hidden labels for icon-only buttons
- Additional context for screen reader users
- Skip links (though our skip link uses custom inline styles)

## Testing

### Current Test Coverage

**Files**: 11 test files covering all major pages
**Tests**: 61 total accessibility tests
**Status**: ✅ All tests passing

**Test Types**:

1. WCAG 2.2 AA compliance (axe-core)
2. Heading hierarchy validation
3. Form label verification
4. ARIA attribute checks
5. Keyboard navigation support
6. Color contrast verification
7. Focus management validation

### Manual Testing Recommendations

1. **Keyboard Navigation**:

   - Test Tab key navigation through all interactive elements
   - Verify focus indicators are visible
   - Ensure skip link appears on first Tab press
   - Check that Enter/Space activate buttons and links

2. **Screen Readers**:

   - **Windows**: NVDA (free) or JAWS
   - **macOS**: VoiceOver (built-in)
   - **iOS**: VoiceOver (built-in)
   - **Android**: TalkBack (built-in)

3. **High Contrast Mode**:

   - **Windows**: Settings > Ease of Access > High Contrast
   - **macOS**: Settings > Accessibility > Display > Increase Contrast
   - Verify all text and borders are visible

4. **Reduced Motion**:

   - **Windows**: Settings > Ease of Access > Display > Show animations
   - **macOS**: Settings > Accessibility > Display > Reduce motion
   - Verify animations are minimal or disabled

5. **Zoom Testing**:
   - Test at 200% zoom level
   - Ensure no content is cut off
   - Verify text remains readable

## Browser Support

All accessibility features are supported in:

- Chrome/Edge 88+
- Firefox 85+
- Safari 14+
- Mobile browsers (iOS Safari 14+, Chrome Android 88+)

## WCAG 2.2 AA Compliance

The application meets WCAG 2.2 Level AA standards including:

### Perceivable

- ✅ Text alternatives for images
- ✅ Captions and alternatives for multimedia
- ✅ Adaptable layouts (responsive)
- ✅ Distinguishable content (color contrast, text resize)

### Operable

- ✅ Keyboard accessible
- ✅ Enough time for interactions
- ✅ No seizure-inducing content
- ✅ Navigable (skip links, page titles, focus order)
- ✅ Input modalities (beyond keyboard/mouse)

### Understandable

- ✅ Readable text (language tags, definitions)
- ✅ Predictable navigation
- ✅ Input assistance (labels, error messages)

### Robust

- ✅ Compatible with assistive technologies
- ✅ Valid HTML/ARIA
- ✅ Proper semantic markup

## Future Enhancements

Potential improvements for consideration:

1. Dark mode with proper contrast ratios
2. Adjustable font size controls
3. Additional skip links (skip to search, skip to footer)
4. Custom focus styles per brand guidelines
5. Voice control optimization
6. Switch control support
7. Automatic language detection
8. Text spacing adjustments support

## Resources

- [WCAG 2.2 Guidelines](https://www.w3.org/WAI/WCAG22/quickref/)
- [axe DevTools](https://www.deque.com/axe/devtools/)
- [NVDA Screen Reader](https://www.nvaccess.org/)
- [WebAIM Resources](https://webaim.org/)
- [A11y Project](https://www.a11yproject.com/)

## Support

For accessibility issues or questions:

- File an issue in the GitHub repository
- Contact the development team
- Review test files for implementation examples

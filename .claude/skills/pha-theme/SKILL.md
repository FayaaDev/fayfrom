---
name: pha-theme
description: PHA company theme specification including logo, fonts, colors, and styling patterns used across the React Form Hub application.
---

# PHA Theme - Company Brand Guidelines

## When to Use This Skill

Use this skill when you need to:
- Apply PHA branding to new components or pages
- Maintain consistent theming across the application
- Reference official brand colors, fonts, and styling patterns
- Implement new forms or features that should match PHA's visual identity
- Create documentation that follows PHA's design system

## Theme Overview

The PHA theme provides a professional, accessible design system with:
- **Primary Color:** Teal/Dark Cyan (`#09595c`)
- **Custom Font:** Majalla (supports Arabic and English)
- **RTL Support:** Full right-to-left layout for Arabic
- **Logo:** PHAlogo.svg (scalable vector graphic)

---

## Color Palette

### Primary Colors

```css
/* Main brand color - used for headers, buttons, links */
--pha-primary: #09595c;

/* Darker shade - hover states, secondary text */
--pha-primary-dark: #063e40;

/* Text color */
--pha-text: #063e40;

/* Background */
--pha-background: #ffffff;
```

### Secondary Colors

```css
/* Light backgrounds, cards */
--pha-gray-light: #f5f5f5;

/* Borders, dividers */
--pha-gray-medium: #e0e0e0;

/* Disabled states */
--pha-gray-disabled: #cccccc;

/* Border variants */
--pha-border: #ccc;
```

### Usage Guidelines

- **Buttons:** Primary color `#09595c` with dark hover `#063e40`
- **Text:** Body text uses `#063e40` for better readability
- **Links:** Primary color `#09595c`, hover to `#063e40`
- **Backgrounds:** White `#ffffff` for main areas, `#f5f5f5` for cards
- **Borders:** Use `#e0e0e0` for subtle borders, `#ccc` for more prominent ones

---

## Typography

### Font Family

```css
@font-face {
  font-family: "Majalla";
  src: url("/font/majalla.ttf") format("truetype");
  font-weight: normal;
  font-style: normal;
}
```

**Font Location:** `react-form-hub/public/font/majalla.ttf`

### Font Usage

```css
/* Apply Majalla font globally */
font-family: "Majalla", sans-serif;
```

The Majalla font is:
- Used throughout the entire application
- Supports both Arabic and English text
- Provides clean, professional appearance
- Works well for both UI elements and content

### Font Sizes

```css
/* Headings */
h1 { font-size: 2.5em; }

/* Body text */
body { font-size: 1em; line-height: 1.5; }

/* Buttons */
button { font-size: 1em; }

/* Large action buttons */
.main-action-btn { font-size: 1.2em; }

/* Form links */
.form-link-card { font-size: 1.2em; }

/* Small navigation items */
.nav-link { font-size: 13px; }

/* Language toggle */
.lang-toggle { font-size: 16px; }
```

---

## Logo

### Logo File

**Location:** `react-form-hub/public/PHAlogo.svg`

The logo is a complex SVG graphic that should be used as-is without modifications.

### Logo Implementation

```jsx
<div className="logo">
  <img src="/PHAlogo.svg" alt="PHA Logo" />
</div>
```

### Logo Styling

```css
.logo {
  position: fixed;
  top: 20px;
  right: 20px;  /* left: 20px in RTL mode */
  z-index: 1000;
}

.logo img {
  height: 60px;
  width: auto;
}
```

**Guidelines:**
- Always use fixed positioning for consistent placement
- Height should be 60px (width auto-scales)
- High z-index (1000) to stay above other content
- Position switches in RTL layout

---

## Component Patterns

### Buttons

#### Primary Action Button

```css
.main-action-btn {
  background-color: #09595c;
  color: white;
  border: none;
  padding: 20px 40px;
  font-size: 1.2em;
  border-radius: 10px;
  cursor: pointer;
  transition: transform 0.2s, background-color 0.2s;
  min-width: 200px;
  font-family: "Majalla", sans-serif;
}

.main-action-btn:hover {
  background-color: #063e40;
  transform: translateY(-2px);
}
```

#### Language Toggle Button

```css
.lang-toggle {
  position: fixed;
  top: 20px;
  left: 20px;  /* right: 20px in RTL mode */
  z-index: 1000;
  padding: 10px 20px;
  background-color: #09595c;
  color: #ffffff;
  border: none;
  border-radius: 5px;
  cursor: pointer;
  font-family: "Majalla", sans-serif;
  font-size: 16px;
  transition: background-color 0.3s;
}

.lang-toggle:hover {
  background-color: #063e40;
}
```

#### Standard Button

```css
button {
  border-radius: 5px;
  border: 1px solid transparent;
  padding: 0.6em 1.2em;
  font-size: 1em;
  font-weight: 500;
  font-family: "Majalla", sans-serif;
  cursor: pointer;
  transition: all 0.3s;
}

button:focus,
button:focus-visible {
  outline: 2px solid #09595c;
}
```

### Navigation Links

```css
.nav-link {
  padding: 6px 12px;
  background-color: rgba(245, 245, 245, 0.95);
  color: #063e40;
  text-decoration: none;
  border-radius: 5px;
  font-family: "Majalla", sans-serif;
  font-size: 13px;
  transition: background-color 0.3s;
  text-align: center;
}

.nav-link:hover {
  background-color: #e0e0e0;
}
```

### Card Components

```css
.form-link-card {
  display: block;
  padding: 20px;
  background-color: #f5f5f5;
  border-radius: 8px;
  text-decoration: none;
  color: #063e40;
  font-size: 1.2em;
  transition: background-color 0.2s;
  border: 1px solid #e0e0e0;
}

.form-link-card:hover {
  background-color: #e0e0e0;
}
```

### Form Inputs

```css
.name-input {
  width: 100%;
  padding: 15px;
  font-size: 1.1em;
  border: 2px solid #e0e0e0;
  border-radius: 8px;
  font-family: "Majalla", sans-serif;
}

.name-input:focus {
  border-color: #09595c;
  outline: none;
}
```

---

## Layout Patterns

### Fixed Positioning Elements

```css
/* Logo - top right (LTR) / top left (RTL) */
.logo {
  position: fixed;
  top: 20px;
  right: 20px;
  z-index: 1000;
}

/* Language toggle - top left (LTR) / top right (RTL) */
.lang-toggle {
  position: fixed;
  top: 20px;
  left: 20px;
  z-index: 1000;
}

/* Navigation menu - left side (LTR) / right side (RTL) */
.nav-menu {
  position: fixed;
  top: 90px;
  left: 20px;
  z-index: 999;
  display: flex;
  flex-direction: column;
  gap: 8px;
  max-width: 150px;
}
```

### Container Layouts

```css
/* Main form container */
.form-container {
  width: 100%;
  min-height: 100vh;
  max-width: 800px;
  margin: 0 auto;
  padding: 20px;
}

/* Hub layout wrapper */
.hub-layout {
  min-height: 100vh;
  position: relative;
}
```

---

## RTL (Right-to-Left) Support

### RTL Layout Switching

The theme fully supports Arabic RTL layout with automatic mirroring:

```css
/* Navigation menu switches to right side in RTL */
[dir="rtl"] .nav-menu {
  left: auto;
  right: 20px;
}

/* Form content alignment */
.fmd-root[dir="rtl"] .fmd-label,
.fmd-root[dir="rtl"] .fmd-question {
  text-align: right;
}
```

### RTL Implementation in React

```jsx
useEffect(() => {
  // Update document direction based on language
  document.documentElement.dir = currentLang === "ar" ? "rtl" : "ltr";
  document.documentElement.lang = currentLang;
}, [currentLang]);
```

---

## Transitions & Animations

### Hover Effects

```css
/* Smooth color transitions */
transition: background-color 0.3s;

/* Combined transitions for buttons */
transition: transform 0.2s, background-color 0.2s;

/* Lift effect on hover */
.main-action-btn:hover {
  transform: translateY(-2px);
}
```

### Standard Transition

```css
transition: all 0.3s;
```

Use this for general interactive elements that change multiple properties.

---

## Accessibility

### Focus States

```css
button:focus,
button:focus-visible {
  outline: 2px solid #09595c;
}

.name-input:focus {
  border-color: #09595c;
  outline: none;
}
```

**Guidelines:**
- Always provide visible focus indicators
- Use primary color `#09595c` for focus outlines
- Ensure sufficient color contrast (meets WCAG AA standards)

### Font Rendering

```css
font-synthesis: none;
text-rendering: optimizeLegibility;
-webkit-font-smoothing: antialiased;
-moz-osx-font-smoothing: grayscale;
```

---

## Quick Start Templates

### Adding PHA Theme to a New Component

```jsx
import './styles.css'; // Ensure global styles are loaded

function MyComponent() {
  return (
    <div style={{ fontFamily: '"Majalla", sans-serif' }}>
      <button style={{
        backgroundColor: '#09595c',
        color: 'white',
        padding: '20px 40px',
        border: 'none',
        borderRadius: '10px',
        cursor: 'pointer',
        fontFamily: '"Majalla", sans-serif',
        fontSize: '1.2em'
      }}>
        Action Button
      </button>
    </div>
  );
}
```

### Using CSS Classes

```jsx
function MyComponent() {
  return (
    <div className="hub-layout">
      <div className="logo">
        <img src="/PHAlogo.svg" alt="PHA Logo" />
      </div>

      <button className="main-action-btn">
        Get Started
      </button>

      <div className="form-link-card">
        Card Content
      </div>
    </div>
  );
}
```

---

## Reference Files

- **Main CSS:** `react-form-hub/src/index.css` - Global styles and font definition
- **Component CSS:** `react-form-hub/src/App.css` - PHA theme components
- **Logo:** `react-form-hub/public/PHAlogo.svg` - Company logo
- **Font:** `react-form-hub/public/font/majalla.ttf` - Majalla font file

---

## Related Skills

- **form-creator** - Use this skill when creating new forms that need PHA theming

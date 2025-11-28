# PHA Theme Quick Reference

Quick lookup guide for the most commonly used PHA theme elements.

## Colors (Hex Values)

| Element              | Color      | Hex Code  |
| -------------------- | ---------- | --------- |
| Primary              | Teal       | `#09595c` |
| Primary Dark (Hover) | Dark Teal  | `#063e40` |
| Text                 | Dark Teal  | `#063e40` |
| Background           | White      | `#ffffff` |
| Secondary Background | Light Gray | `#f5f5f5` |
| Border Light         | Light Gray | `#e0e0e0` |
| Border Medium        | Gray       | `#ccc`    |
| Disabled             | Gray       | `#cccccc` |

## Typography

| Property     | Value                   |
| ------------ | ----------------------- |
| Font Family  | `"Majalla", sans-serif` |
| Font File    | `/font/majalla.ttf`     |
| H1 Size      | `2.5em`                 |
| Body Size    | `1em`                   |
| Line Height  | `1.5`                   |
| Button Size  | `1em`                   |
| Large Button | `1.2em`                 |

## Logo

| Property  | Value                         |
| --------- | ----------------------------- |
| File Path | `/PHAlogo.svg`                |
| Height    | `60px`                        |
| Width     | `auto`                        |
| Position  | Fixed, top: 20px, right: 20px |
| Z-Index   | `1000`                        |

## Button Styles

### Primary Action Button

```css
background: #09595c
color: white
padding: 20px 40px
border-radius: 10px
font-size: 1.2em
```

### Standard Button

```css
background: #09595c
color: white
padding: 0.6em 1.2em
border-radius: 5px
font-size: 1em
```

### Hover State

```css
background: #063e40
transform: translateY(-2px)
```

## Component Spacing

| Element             | Spacing     |
| ------------------- | ----------- |
| Fixed Elements Top  | `20px`      |
| Fixed Elements Side | `20px`      |
| Logo Height         | `60px`      |
| Nav Menu Top        | `90px`      |
| Card Padding        | `20px`      |
| Input Padding       | `15px`      |
| Button Padding      | `10px 20px` |
| Container Max Width | `800px`     |

## Border Radius

| Element       | Radius |
| ------------- | ------ |
| Buttons       | `5px`  |
| Large Buttons | `10px` |
| Cards         | `8px`  |
| Inputs        | `8px`  |

## Transitions

| Element          | Transition |
| ---------------- | ---------- |
| Background Color | `0.3s`     |
| Transform + BG   | `0.2s`     |
| General          | `all 0.3s` |

## Z-Index Layers

| Element         | Z-Index |
| --------------- | ------- |
| Logo            | `1000`  |
| Language Toggle | `1000`  |
| Navigation Menu | `999`   |

## RTL Support

| Property             | RTL Value     |
| -------------------- | ------------- |
| Direction            | `rtl`         |
| Logo Position        | `left: 20px`  |
| Lang Toggle Position | `right: 20px` |
| Nav Menu Position    | `right: 20px` |
| Text Align           | `right`       |

## Import Statements

### React Component

```jsx
import "./App.css";
```

### Font Face

```css
@font-face {
	font-family: "Majalla";
	src: url("/font/majalla.ttf") format("truetype");
}
```

### Logo

```jsx
<img src="/PHAlogo.svg" alt="PHA Logo" />
```

## Common Class Names

- `.hub-layout` - Main layout wrapper
- `.logo` - Logo container
- `.lang-toggle` - Language toggle button
- `.nav-menu` - Navigation menu
- `.nav-link` - Navigation link items
- `.form-container` - Main form container
- `.main-action-btn` - Primary action buttons
- `.form-link-card` - Card-style links
- `.name-input` - Text input fields

## File Locations

| Resource         | Path                                       |
| ---------------- | ------------------------------------------ |
| Global CSS       | `react-form-hub/src/index.css`             |
| App CSS          | `react-form-hub/src/App.css`               |
| Logo SVG         | `react-form-hub/public/PHAlogo.svg`        |
| Font TTF         | `react-form-hub/public/font/majalla.ttf`   |
| Layout Component | `react-form-hub/src/layouts/HubLayout.jsx` |

# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

Forms.md is an open-source form builder library that creates multi-step forms and surveys. The project consists of:

1. **Core library** (`src/`) - Vanilla JavaScript form builder with two main APIs:
   - `Composer` class for programmatically creating forms
   - `Formsmd` class for rendering and managing form instances
2. **React Form Hub** (`react-form-hub/`) - React application demonstrating Forms.md usage with multi-language support
3. **Static Site Generator** (`bin/`) - CLI tool to generate static HTML sites from Markdown files
4. **Google Apps Script** (`google-apps-script/`) - Backend for Google Sheets integration

## Commands

### Core Library

```bash
# Full build (TypeScript types, lint, format, CSS minification, webpack bundles)
npm run build

# Run all tests (Jest with JSDOM)
npm run test

# Lint and auto-fix JavaScript files in bin/, google-apps-script/, src/, tests/
npm run lint

# Format all files with Prettier (uses tabs, quoteProps: "consistent")
npm run format

# Build webpack bundles only (creates formsmd.bundle.min.js and composer.bundle.min.js)
npm run webpack
```

### React Form Hub

```bash
# Development server (in react-form-hub/)
cd react-form-hub && npm run dev

# Build production version (in react-form-hub/)
cd react-form-hub && npm run build

# Preview production build (in react-form-hub/)
cd react-form-hub && npm run preview

# Lint React app (in react-form-hub/)
cd react-form-hub && npm run lint
```

### Static Site Generator

```bash
# Generate static site from Markdown files
npx formsmd -i <input-dir> -o <output-dir> -s <static-dir-name>

# Example: Generate from src/ to site/ with static files in static/
npx formsmd -i src -o site -s static
```

## Architecture

### Core Library Structure

The library is split into multiple specialized modules in `src/`:

- **Entry points:**
  - `index.js` - Main export file exposing `Composer`, `Formsmd`, and `translate`
  - `main.js` - Contains the `Formsmd` class for rendering and managing forms
  - `composer.js` - Contains the `Composer` class for building form templates

- **Parsing modules:**
  - `settings-parse.js` - Parses form settings from template strings
  - `slides-parse.js` - Parses slide structures and navigation
  - `data-blocks-parse.js` - Parses data blocks in templates
  - `attrs-parse.js` - Parses HTML attributes from template syntax
  - `div-span-parse.js` - Parses div and span elements
  - `spreadsheet-data-parse.js` - Parses spreadsheet data format

- **Rendering modules:**
  - `templates-create.js` - Generates HTML templates for forms
  - `form-field-create.js` - Creates individual form field elements
  - `marked-renderer.js` - Custom Markdown renderer using marked.js

- **Utilities:**
  - `translations.js` - Internationalization support (en, ar, bn, de, es, fr, ja, pt, zh)
  - `phone-numbers.js` - Country calling codes and phone number placeholders
  - `helpers.js` - General utility functions

### Build Pipeline

The build process (`npm run build`) runs in sequence:
1. Generate RTL CSS from LTR using rtlcss
2. Generate TypeScript definitions with tsc (from `src/*.js` to `types/`)
3. Lint with ESLint
4. Format with Prettier
5. Minify CSS with csso
6. Bundle with webpack (two bundles: formsmd and composer)
7. Transpile bundles with Babel (@babel/preset-env)
8. Minify bundles with terser

### Webpack Configuration

Creates two separate bundles (`webpack.config.js`):
- `formsmd.bundle.min.js` - Full library bundle (entry: `src/main.js`)
- `composer.bundle.min.js` - Composer-only bundle (entry: `src/composer.js`)
- Both use `libraryTarget: "window"` for browser global exposure

### Testing

Tests use Jest with JSDOM environment. Test files in `tests/` mirror the structure of `src/` files. Tests cover individual functions and classes from the parsing, rendering, and composition modules.

### React Form Hub Architecture

A React SPA demonstrating Forms.md integration:

- **Routing:** React Router v7 with outlet-based layout
- **Structure:**
  - `components/FormRenderer.jsx` - Reusable wrapper that initializes Formsmd instances
  - `forms/` - Form definitions using Composer class
  - `layouts/HubLayout.jsx` - Main layout with navigation and language toggle
  - `pages/` - Page components for each form route
  - `utils/translate.js` - Translation helper for multilingual forms

- **Internationalization:** Supports English and Arabic with RTL layout switching
- **Form lifecycle:** Forms are recreated when language changes to ensure proper localization

### ESLint Configuration

Root project uses flat config (`eslint.config.mjs`):
- Files: `**/*.js` (CommonJS)
- Rules: `dot-notation: error`, `curly: error`
- Globals: Both browser and Node.js

React Form Hub has separate ESLint config for React/JSX.

### Google Sheets Integration

The `google-apps-script/Code.js` provides a backend for form submissions:
- Handles POST requests from forms
- Validates reCAPTCHA tokens
- Stores submissions in Google Sheets
- Supports file uploads to Google Drive
- See `demo/GOOGLE_SHEETS_SETUP.md` for setup instructions

## Key Concepts

### Composer API

The `Composer` class provides methods to programmatically build form templates:
- Initialize with settings: `new Composer({ id, postUrl, localization, ... })`
- Add fields: `textInput()`, `emailInput()`, `choiceInput()`, `selectBox()`, etc.
- Control flow: `slide()`, `startSlide()` for multi-step forms
- Output: `composer.template` contains the generated template string

### Formsmd API

The `Formsmd` class renders and manages form instances:
- Initialize: `new Formsmd(template, container, options)`
- Render: `formsmd.init()`
- Options include themes, reCAPTCHA, state saving, validation, etc.

### Template Syntax

Forms.md uses a custom Markdown-based syntax for form definitions. Templates can be:
1. Created programmatically with `Composer`
2. Written manually in Markdown files (for static site generator)

### Localization

The `translate()` function takes a localization code and translations object:
```javascript
translate('ar', { en: 'Hello', ar: 'مرحبا' }) // Returns 'مرحبا'
```

Forms support RTL languages with separate CSS files (`formsmd.rtl.min.css`).

## Distribution

The library provides multiple distribution formats:
- **CSS:** `dist/css/formsmd.min.css` (LTR) and `formsmd.rtl.min.css` (RTL)
- **JavaScript bundles:** `dist/js/formsmd.bundle.min.js` and `composer.bundle.min.js`
- **TypeScript types:** `types/*.d.ts` generated from JSDoc comments
- **NPM package:** Main entry is `src/index.js` with types at `types/index.d.ts`

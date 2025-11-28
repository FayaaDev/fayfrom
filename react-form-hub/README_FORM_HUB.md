# Form Hub - React App

A React-based form hub built with Forms.md, allowing you to create and manage multiple forms with a consistent theme and layout.

## Features

- 🌍 **Multi-language support** (English & Arabic with RTL)
- 🎨 **Consistent theming** across all forms
- 🔄 **Easy form creation** - add new forms in minutes
- 📱 **Responsive design**
- 🚀 **Built with Vite** for fast development

## Getting Started

### Installation

```bash
npm install
```

### Development

```bash
npm run dev
```

The app will be available at `http://localhost:5173/`

### Build

```bash
npm run build
```

### Preview Production Build

```bash
npm run preview
```

## Project Structure

```
src/
├── components/
│   └── FormRenderer.jsx      # Reusable component that renders Forms.md forms
├── forms/
│   └── definitions.js        # Form definitions and configurations
├── layouts/
│   └── HubLayout.jsx         # Main layout with navigation and language toggle
├── pages/
│   ├── HomePage.jsx          # Landing page
│   ├── DemoFormPage.jsx      # Demo form page
│   └── FeedbackFormPage.jsx  # Feedback form page
├── utils/
│   └── translate.js          # Translation utility
├── App.jsx                   # Main app with routing
└── main.jsx                  # Entry point
```

## How to Add a New Form

### Step 1: Create Form Definition

Open `src/forms/definitions.js` and add a new form composer function:

```javascript
export function createMyNewFormComposer(localization = 'en') {
  if (!window.Composer) {
    console.error('Composer not loaded yet');
    return null;
  }

  const composer = new window.Composer({
    id: "my-new-form",
    formStyle: "conversational",
    fontSize: "lg",
    rounded: "pill",
    restartButton: "show",
    buttonAlignment: "end",
    paddingInlineBottom: 80,
    paddingInlineTop: 100,
    colorScheme: "light",
    accent: "#09595C",
    accentForeground: "#ffffff",
    backgroundColor: "#ffffff",
    color: "#063E40",
    postUrl: GOOGLE_SCRIPT_URL, // Or your custom endpoint
    localization: localization,
    dir: localization === "ar" ? "rtl" : "ltr",
  });

  // Add your form fields
  composer.h1(
    translate(localization, {
      en: "My New Form",
      ar: "النموذج الجديد",
    })
  );
  
  composer.startSlide({
    buttonText: translate(localization, {
      en: "Start",
      ar: "ابدأ",
    }),
  });

  composer.slide({ pageProgress: "1/1" });
  composer.textInput("fieldName", {
    question: translate(localization, {
      en: "Your question here?",
      ar: "سؤالك هنا؟",
    }),
    required: true,
  });

  return composer;
}
```

### Step 2: Create a Page Component

Create a new file `src/pages/MyNewFormPage.jsx`:

```javascript
import { useOutletContext } from "react-router-dom";
import { useEffect, useState } from "react";
import FormRenderer from "../components/FormRenderer";
import { createMyNewFormComposer, getFormOptions } from "../forms/definitions";

const MyNewFormPage = () => {
  const { currentLang } = useOutletContext();
  const [composer, setComposer] = useState(null);
  const [options, setOptions] = useState(null);

  useEffect(() => {
    const newComposer = createMyNewFormComposer(currentLang);
    const newOptions = getFormOptions(currentLang);
    
    setComposer(newComposer);
    setOptions(newOptions);
  }, [currentLang]);

  if (!composer || !options) {
    return <div>Loading...</div>;
  }

  return (
    <FormRenderer 
      composer={composer} 
      options={options}
      id="my-new-form-container"
    />
  );
};

export default MyNewFormPage;
```

### Step 3: Add Route

Open `src/App.jsx` and add your new route:

```javascript
import MyNewFormPage from "./pages/MyNewFormPage";

// ... in the Routes component
<Route path="my-new-form" element={<MyNewFormPage />} />
```

### Step 4: Add Navigation Link

Open `src/layouts/HubLayout.jsx` and add a navigation link:

```javascript
<Link to="/my-new-form" className="nav-link">
  {currentLang === "ar" ? "النموذج الجديد" : "My New Form"}
</Link>
```

That's it! Your new form is now accessible at `/my-new-form`

## Shared Settings

All forms use the same settings defined in the form definitions. To change the theme globally:

1. Open `src/forms/definitions.js`
2. Modify the `Composer` configuration object
3. Update the `getFormOptions` function

### Common Settings:

- **Colors**: `accent`, `accentForeground`, `backgroundColor`, `color`
- **Style**: `formStyle` ("conversational" or "classic")
- **Size**: `fontSize` ("sm", "md", "lg")
- **Borders**: `rounded` ("none", "sm", "md", "lg", "pill")
- **Controls**: `restartButton`, `slideControls`, `pageProgress`

## Form Field Types

Forms.md supports various field types:

- `textInput()` - Text input
- `emailInput()` - Email input with validation
- `urlInput()` - URL input with validation
- `numberInput()` - Number input
- `selectBox()` - Dropdown select
- `choiceInput()` - Multiple choice (radio buttons)
- `checkboxInput()` - Checkboxes
- `dateInput()` - Date picker
- `timeInput()` - Time picker
- `fileInput()` - File upload

See the [Forms.md documentation](https://docs.forms.md/) for more details.

## Language Support

To add a new language:

1. Update the `createFormComposer` functions in `definitions.js`
2. Add translations using the `translate()` utility
3. Update the language toggle in `HubLayout.jsx`

## Google Sheets Integration

To connect forms to Google Sheets:

1. Follow the instructions in `../demo/GOOGLE_SHEETS_SETUP.md`
2. Update the `GOOGLE_SCRIPT_URL` in `src/forms/definitions.js`

## License

This project uses Forms.md under its license. See the parent project for details.

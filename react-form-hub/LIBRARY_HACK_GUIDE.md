# The "FormsMD" Override Guide

This document explains how we successfully modified the behavior of the `formsmd` library (which is resistant to modification) and how to use the `useFormController` hook to apply these customizations to new forms easily.

## 🏴‍☠️ How We "Broke" the Library

The `formsmd` library is distributed as a minified bundle (`formsmd.bundle.min.js`) that controls the DOM aggressively. It:
1.  **Hard-binds event listeners**: It attaches its own `click` handlers to navigation buttons immediately upon creation.
2.  **Renders dynamically**: It creates and destroys DOM elements (like the "Next" button) as the user navigates, making them hard to target with simple scripts.
3.  **Resists standard React patterns**: Since it operates outside the React virtual DOM, standard `onClick` props often fail or conflict with its internal listeners.

### The Strategy: "Intercept & Clone"

To bypass this, we implemented a "Nuclear Option" strategy in `useFormController.js`:

1.  **MutationObserver**: We set up a persistent watcher on the form container. Every time the library changes the DOM (e.g., sliding to the next question), our code wakes up.
2.  **Target Identification**: We hunt for specific elements, like the "Next" button on the final slide. We use aggressive heuristics (checking for text like "Next", specific classes, or icon SVGs) to find them even if the library changes their ID.
3.  **Node Cloning**: To remove the library's hard-coded event listeners (which cause the "Error" or unwanted submission), we **clone the button element**:
    ```javascript
    const newBtn = btn.cloneNode(true); // Creates a copy WITHOUT event listeners
    btn.parentNode.replaceChild(newBtn, btn); // Swaps the original with our "clean" copy
    ```
4.  **Custom Logic**: We then attach our *own* event listener to this clean clone, allowing us to run whatever logic we want (like showing a completion message) without the library interfering.

---

## 🛠️ How to Use `useFormController`

We have abstracted all this complex logic into a single React hook: `useFormController`.

### 1. Import the Hook
```javascript
import { useFormController } from "../hooks/useFormController.js";
```

### 2. Initialize in Your Component
Call the hook inside your page component. You need to pass the ID of the container where the form will be rendered.

```javascript
const { formInstance, setFormInstance, containerProps } = useFormController({
    formId: "my-new-form-container", // MUST match the ID passed to FormRenderer
    currentLang: "en",               // "en" or "ar"
    
    // Optional: Define custom hotkeys
    hotkeys: {
        y: { en: "Yes", ar: "نعم" },
        n: { en: "No", ar: "لا" }
    },

    // Optional: Override the "Next" button on the last slide
    onLastSlideNext: (e, lastSlide) => {
        // Your custom logic here (e.g., show a message, redirect, etc.)
        alert("Form Finished!"); 
    }
});
```

### 3. Connect to the UI
You must connect the hook to your JSX in two places:
1.  **The Container**: Spread `{...containerProps}` onto the wrapping `div`. This handles keyboard safety.
2.  **The Renderer**: Pass `setFormInstance` to the `onMount` prop of `FormRenderer`.

```jsx
return (
    <div 
        {...containerProps} // <--- 1. Connect Container Props
    >
        <FormRenderer
            composer={composer}
            options={options}
            id="my-new-form-container" // <--- Must match formId above
            onMount={setFormInstance}  // <--- 2. Connect Form Instance
        />
    </div>
);
```

## ✅ Checklist for New Forms
When creating a new form page (e.g., `BurnoutSurveyPage.jsx`), ensure you:
- [ ] Import `useFormController`.
- [ ] Define a unique `id` for your form container.
- [ ] Pass that `id` to both the hook and the `FormRenderer`.
- [ ] Spread `containerProps` on the parent `div`.
- [ ] Pass `setFormInstance` to `onMount`.

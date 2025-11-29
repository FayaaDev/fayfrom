# Challenge: Implementing Custom "Maybe" Hotkey

Implementing a custom "C" hotkey for the "Maybe" choice in the Neurology History Form presented several interesting technical challenges. Here is a breakdown of why it was difficult and how we solved it.

## The Challenges

### 1. Library Limitations
The form library (`Formsmd`) automatically handles keyboard shortcuts, typically mapping the first letter of a choice to its selection (e.g., "Y" for Yes, "N" for No). However, adding a third option "Maybe" with a specific hotkey "C" (which doesn't match the first letter "M") required bypassing or augmenting this default behavior. The library's configuration options for custom keys (`downkeys`) did not behave as expected for this specific use case.

### 2. DOM Structure Ambiguity
Initial attempts assumed the choice inputs were rendered as standard `<button>` elements. However, debugging revealed a more complex DOM structure:
-   The choices are wrapped in `<div>` containers.
-   The clickable text is inside a `<label>` element.
-   The actual state is managed by a hidden or associated `<input>` element.
-   This meant `document.querySelectorAll("button")` failed to find the "Maybe" option.

### 3. Event Handling & Propagation
Simply adding a `keydown` listener wasn't enough. The form library likely consumes keyboard events to prevent unwanted side effects or to handle its own navigation. This meant our custom listener wasn't always receiving the "C" key press, or the library was overriding our actions.

### 4. Focus State Management
Once we successfully triggered the click, the "Maybe" option would remain in a "focused" or highlighted state. This prevented the user from re-selecting it or switching options smoothly using the keyboard, as the browser maintained focus on the clicked element.

### 5. Input Field Interference
A critical issue arose where typing in text input fields (e.g., "Details") would inadvertently trigger the global hotkey listeners. For instance, typing "yes" in a text box would trigger the "Y" hotkey, changing the selection of a previous question. This happened because the keyboard events bubbled up from the input field to the `window` level where our custom listener was active.

### 6. Hardcoded logic in keydown listener

## The Problem
Despite updating the form configuration in `NeurologyHistoryForm.js` to specify `downkeys: ["Y", "N", "M"]`, the frontend continued to display **"C"** as the visual hint for the "Maybe" option.

## Root Cause Analysis
Upon investigating the compiled library file `public/formsmd.bundle.min.js`, we discovered that the library contained **hardcoded logic** specifically targeting the `neurology-history-form` ID.

### Hardcoded Visual Hints
The library had a specific check for the form ID:
```javascript
return "neurology-history-form" === o && (b[0] = "Y", b[1] = "N"), ...
```
This logic manually forced the first two options to "Y" and "N" but left the subsequent options to fall back to the default alphabet generation (A, B, C...), resulting in the third option being "C".

### Hardcoded Event Handling
Similarly, the internal keyboard event listener had hardcoded logic for this specific form ID:
```javascript
"neurology-history-form" === n.state.settings.id ? "Y" === t ? r = 0 : "N" === t && (r = 1) : ...
```
This meant the library was only listening for "Y" and "N" keys for this specific form, completely ignoring any custom configuration passed for other keys.

## The Solution for Hardcoded Event Handling
To resolve this without access to the library's source code, we applied binary patches to `public/formsmd.bundle.min.js` to inject the logic for the "M" key.

1.  **Patched Visual Hints**:
    Updated the logic to explicitly assign "M" to the third index:
    ```javascript
    // Before
    (b[0]="Y",b[1]="N")
    // After
    (b[0]="Y",b[1]="N",b[2]="M")
    ```

2.  **Patched Event Handler**:
    Updated the keydown listener to map the "M" key to index 2:
    ```javascript
    // Before
    "Y"===t?r=0:"N"===t&&(r=1)
    // After
    "Y"===t?r=0:"N"===t?r=1:"M"===t&&(r=2)
    ```

## Recommendations
This fix is **brittle** because it relies on modifying a minified bundle.
1.  **Risk**: If `formsmd.bundle.min.js` is ever updated or re-downloaded, these patches will be overwritten.
2.  **Long-term Fix**: The `formsmd` library should be updated to support custom key mappings via the configuration object (e.g., reading the `downkeys` array) instead of relying on hardcoded ID checks. This would allow any form to define its own hotkeys (like Y/N/M) without library code changes.


## The Solution

We implemented a robust, manual event handling strategy in [NeurologyHistoryFormPage.jsx](file:///Users/fayaa/fayfrom/react-form-hub/src/pages/NeurologyHistoryFormPage.jsx):

### 1. Capture-Phase Event Listener
We used `window.addEventListener("keydown", handler, true)` with the `true` parameter. This enables **event capturing**, allowing us to intercept the "C" key press *before* it reaches the form library or other elements that might swallow it.

### 2. Dynamic Element Discovery
Instead of relying on hardcoded IDs or assuming `<button>` tags, we implemented a dynamic search strategy:
-   We search for all `<label>` elements with the class `.fmd-form-check-label`.
-   We filter these labels to find the one containing the text "Maybe" (or "ربما" in Arabic).
-   This ensures the hotkey works regardless of the language selected.

### 3. Direct Input Interaction
To ensure the form state is updated correctly and to fix the focus issue:
-   We locate the `<input>` element associated with the found label.
-   We programmatically call `.click()` on the input to toggle the selection.
-   Crucially, we immediately call `.blur()` on the input. This removes the focus ring, preventing the "stuck" highlight effect and allowing for repeated interactions.

```javascript
// Simplified Logic
const input = label.closest(".fmd-form-check").querySelector("input");
if (input) {
    input.click(); // Select the option
    input.blur();  // Remove focus to fix UI state
}
```

This approach provides a seamless user experience that feels native to the form, bridging the gap between the library's defaults and the user's custom requirements.

### 4. Event Propagation Control
To prevent typing in text fields from triggering hotkeys, we implemented a strict event propagation control:
-   We attached a `keydown`, `keypress`, and `keyup` listener to the form's container `div`.
-   In this handler, we check `e.target.tagName`.
-   If the target is an `INPUT` or `TEXTAREA`, we call `e.stopPropagation()`.
-   This ensures that keystrokes intended for text entry are "consumed" locally and never reach the global hotkey listener.

```javascript
const handleInputKeyEvents = (e) => {
    // Stop propagation for inputs to prevent library's global hotkeys from triggering
    if (e.target.tagName === "INPUT" || e.target.tagName === "TEXTAREA") {
        e.stopPropagation();
    }
};
```

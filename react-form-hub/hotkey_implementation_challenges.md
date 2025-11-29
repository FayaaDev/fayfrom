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

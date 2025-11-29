
/**
 * Generate a patient story using Gemini API
 * @param {Object} formData - The form data collected from the user
 * @param {string} apiKey - The Gemini API key
 * @returns {Promise<string>} The generated patient story
 */
/**
 * Generate a patient story using Netlify Function (proxies to Gemini API)
 * @param {Object} formData - The form data collected from the user
 * @returns {Promise<string>} The generated patient story
 */
export async function generatePatientStory(formData) {
    try {
        const response = await fetch("/.netlify/functions/generate-story", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({ formData }),
        });

        if (!response.ok) {
            const errorData = await response.json();
            throw new Error(errorData.error || "Failed to generate story");
        }

        const data = await response.json();
        return data.story;
    } catch (error) {
        console.error("Story Generation Error:", error);
        throw error;
    }
}


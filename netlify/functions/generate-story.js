export const handler = async (event) => {
    if (event.httpMethod !== "POST") {
        return { statusCode: 405, body: "Method Not Allowed" };
    }

    try {
        const { formData } = JSON.parse(event.body);
        const apiKey = process.env.GEMINI_API_KEY || process.env.VITE_GEMINI_API_KEY;

        if (!apiKey) {
            console.error("API key missing in environment variables");
            return {
                statusCode: 500,
                body: JSON.stringify({ error: "Server configuration error" }),
            };
        }

        // Format the data for the prompt
        const entries = Object.entries(formData)
            .filter(([key, value]) => {
                // Filter out empty values, "No", "false", and metadata
                return (
                    value &&
                    value !== "No" &&
                    value !== "" &&
                    value !== "false" &&
                    !key.startsWith("id_") // Filter out internal IDs if any
                );
            })
            .map(([key, value]) => `- ${key}: ${value}`)
            .join("\n");

        if (!entries.trim()) {
            return {
                statusCode: 400,
                body: JSON.stringify({ error: "No sufficient data to generate a story." }),
            };
        }

        const systemPrompt = `You are a medical professional writing a full clinical history.

Generate a professional clinical history from patient form data.
- Write in past tense, third person
- Start with patient demographics (age, gender if available)
- Then describe chief complaints and positive findings
- Include all medical history
- Never say "Review of systems is positive" Be specific in every complaint
- Mention the specific symptoms and findings, don't say "positive findings"
- Use proper medical terminology
- Create a cohesive, flowing narrative, mention every detail in the form data
- Never use any complaints not mentioned in the form data
- Never use any findings not mentioned in the form data
- Don't miss any complains, include all data in the story

Format: "This is a patient who presented with [complaints]. [Relevant history]. [Additional findings]."`;

        const userPrompt = `Create a full clinical history from this patient data:

${entries}

Write a professional, full clinical history.`;

        const response = await fetch(
            `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.5-flash:generateContent?key=${apiKey}`,
            {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({
                    contents: [
                        {
                            role: "user",
                            parts: [{ text: systemPrompt + "\n\n" + userPrompt }],
                        },
                    ],
                    generationConfig: {
                        temperature: 0.3,
                    },
                }),
            }
        );

        if (!response.ok) {
            const errorData = await response.json();
            throw new Error(
                errorData.error?.message || "Failed to generate content from Gemini"
            );
        }

        const data = await response.json();
        const candidate = data.candidates?.[0];
        let story = "";

        if (candidate?.content?.parts) {
            story = candidate.content.parts
                .filter((part) => part.text)
                .map((part) => part.text)
                .join("");
        }

        return {
            statusCode: 200,
            body: JSON.stringify({ story: story.trim() || "Unable to generate story." }),
        };
    } catch (error) {
        console.error("Gemini API Error:", error);
        return {
            statusCode: 500,
            body: JSON.stringify({ error: error.message }),
        };
    }
};

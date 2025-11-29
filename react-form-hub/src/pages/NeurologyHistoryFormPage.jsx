import { useOutletContext } from "react-router-dom";
import { useEffect, useState } from "react";
import FormRenderer from "../components/FormRenderer";
import { createNeurologyHistoryFormComposer } from "../forms/NeurologyHistoryForm.js";
import { getFormOptions } from "../forms/formUtils.js";

import { generatePatientStory } from "../utils/gemini.js";

const NeurologyHistoryFormPage = () => {
    const { currentLang } = useOutletContext();
    const [composer, setComposer] = useState(null);
    const [options, setOptions] = useState(null);
    const [formInstance, setFormInstance] = useState(null);

    useEffect(() => {
        const newComposer = createNeurologyHistoryFormComposer(currentLang);
        const newOptions = getFormOptions(currentLang);

        setComposer(newComposer);
        setOptions(newOptions);
    }, [currentLang]);

    const handleGenerateStory = async () => {
        if (!formInstance) return;

        const btn = document.getElementById("btn-generate-story");
        const resultDiv = document.getElementById("story-result");

        if (!btn || !resultDiv) return;

        const originalText = btn.innerText;
        const loadingText = btn.getAttribute("data-loading-text");

        try {
            btn.disabled = true;
            btn.innerText = loadingText;
            resultDiv.style.display = "none";
            resultDiv.innerText = "";

            // Get form data from the instance
            const formData = formInstance.state.formData;

            const story = await generatePatientStory(formData);

            resultDiv.innerText = story;
            resultDiv.style.display = "block";

            const copyBtn = document.getElementById("btn-copy-story");
            if (copyBtn) {
                copyBtn.style.display = "inline-block";
                copyBtn.innerText = currentLang === "ar" ? "نسخ" : "Copy";
            }
        } catch (error) {
            console.error("Story generation failed:", error);
            alert(currentLang === "ar" ? "فشل توليد القصة. يرجى المحاولة مرة أخرى." : "Failed to generate story. Please try again.");
        } finally {
            btn.disabled = false;
            btn.innerText = originalText;
        }
    };

    const handleCopyStory = () => {
        const resultDiv = document.getElementById("story-result");
        const copyBtn = document.getElementById("btn-copy-story");
        if (!resultDiv) return;

        const textToCopy = resultDiv.innerText;
        navigator.clipboard.writeText(textToCopy).then(() => {
            const originalText = copyBtn.innerText;
            copyBtn.innerText = currentLang === "ar" ? "تم النسخ!" : "Copied!";
            setTimeout(() => {
                copyBtn.innerText = originalText;
            }, 2000);
        }).catch(err => {
            console.error("Failed to copy text: ", err);
        });
    };

    // Event delegation for the button since it's injected as raw HTML
    const handleContainerClick = (e) => {
        if (e.target && e.target.id === "btn-generate-story") {
            handleGenerateStory();
        } else if (e.target && e.target.id === "btn-copy-story") {
            handleCopyStory();
        }
    };

    if (!composer || !options) {
        return <div>Loading...</div>;
    }

    return (
        <div onClick={handleContainerClick}>
            <FormRenderer
                composer={composer}
                options={options}
                id="neurology-history-form-container"
                onMount={setFormInstance}
            />
        </div>
    );
};

export default NeurologyHistoryFormPage;

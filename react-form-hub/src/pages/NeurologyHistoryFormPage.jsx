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
        const newOptions = {
            ...getFormOptions(currentLang),
            // Disable form submission since this is a template generator, not a submittable form
            postUrl: null,
            // Disable restart button on final slide
            restartButton: "hide",
            // Disable thank you message
            thankYouScreenTitle: "",
            thankYouScreenDescription: "",
        };

        setComposer(newComposer);
        setOptions(newOptions);
    }, [currentLang]);

    // Remove default navigation buttons on the last slide after form mounts
    useEffect(() => {
        if (!formInstance) return;

        const container = document.getElementById("neurology-history-form-container");
        if (!container) return;

        // Function to clean up unwanted buttons and completion elements
        const cleanupButtons = () => {
            // Check if we are on the last slide by checking if our custom button is visible
            const generateStoryBtn = container.querySelector("#btn-generate-story");

            // If the custom button doesn't exist or isn't visible, we likely aren't on the last slide
            if (!generateStoryBtn || generateStoryBtn.offsetParent === null) return;

            // Find the active slide (usually the one containing the visible generate button)
            const lastSlide = generateStoryBtn.closest('.fmd-slide');

            // Find ALL buttons in the container (navigation might be outside the slide)
            const allButtons = container.querySelectorAll('button');

            allButtons.forEach(btn => {
                // Skip our custom buttons and modal buttons
                if (btn.id === 'btn-generate-story' ||
                    btn.closest('#btn-generate-story') ||
                    btn.id === 'btn-copy-story' ||
                    btn.id === 'btn-clear-data' ||
                    btn.closest('#clear-data-modal')) {
                    return;
                }

                const btnText = (btn.innerText || btn.textContent).toLowerCase();
                const isBackBtn = btnText.includes('back') || btnText.includes('السابق') || btn.classList.contains('fmd-btn-prev');

                // Handle "Next" buttons (text or arrow)
                // It is a next button if:
                // 1. It has "next" text
                // 2. OR it has "fmd-btn-next" class
                // 3. OR it is NOT a back button AND (has no text but has SVG OR is in fmd-next-controls)
                const isNextBtn = btnText.includes('next') ||
                    btnText.includes('التالي') ||
                    btn.classList.contains('fmd-btn-next') ||
                    (!isBackBtn && (btn.querySelector('svg') || btn.closest('.fmd-next-controls')));

                if (isNextBtn) {
                    if (btn.dataset.customized === "true") return;

                    const newBtn = btn.cloneNode(true);
                    newBtn.dataset.customized = "true";

                    newBtn.onclick = (e) => {
                        e.preventDefault();
                        e.stopPropagation();
                        e.stopImmediatePropagation();

                        const msgId = "form-completion-message";
                        let msgDiv = document.getElementById(msgId);

                        if (!msgDiv && lastSlide) {
                            msgDiv = document.createElement("div");
                            msgDiv.id = msgId;
                            msgDiv.style.cssText = "margin-top: 15px; padding: 15px; background-color: #cff4fc; color: #055160; border: 1px solid #b6effb; border-radius: 4px; text-align: center; width: 100%; font-weight: bold;";
                            lastSlide.appendChild(msgDiv);
                        }

                        if (msgDiv) {
                            msgDiv.innerText = "The form has concluded, don't forget to clear out patient data";
                            msgDiv.scrollIntoView({ behavior: 'smooth', block: 'center' });
                        }
                    };

                    btn.parentNode.replaceChild(newBtn, btn);
                }

                // Remove Submit buttons if any appear
                if (btn.getAttribute('type') === 'submit') {
                    btn.remove();
                }
            });

            // Remove thank you screens if they appear
            const thankYouScreens = container.querySelectorAll(".fmd-thank-you-screen");
            thankYouScreens.forEach(screen => screen.remove());
        };

        // Initial cleanup
        const timer = setTimeout(cleanupButtons, 100);

        // Also observe for any dynamic changes
        const observer = new MutationObserver(() => {
            cleanupButtons();
        });

        observer.observe(container, {
            childList: true,
            subtree: true,
            attributes: true,
            attributeFilter: ['class', 'style']
        });

        return () => {
            clearTimeout(timer);
            observer.disconnect();
        };
    }, [formInstance]);

    // Custom hotkeys for choices (Y, N, M)
    useEffect(() => {
        const handleKeyDown = (e) => {
            // Only trigger if not typing in an input field
            if (e.target.tagName === "INPUT" || e.target.tagName === "TEXTAREA") return;

            const key = e.key.toLowerCase();
            const keyMap = {
                m: { en: "Maybe", ar: "ربما" },
                y: { en: "Yes", ar: "نعم" },
                n: { en: "No", ar: "لا" },
            };

            if (keyMap[key]) {
                const targetText = keyMap[key][currentLang]; // Directly use the map for translation
                const container = document.getElementById("neurology-history-form-container");
                if (!container) return;

                // Find all labels that might contain the text
                const labels = Array.from(container.querySelectorAll(".fmd-form-check-label"));

                // Find the one that matches our text and is visible
                const targetLabel = labels.find((label) => {
                    const text = label.innerText || label.textContent;
                    // Check visibility by ensuring it has an offsetParent
                    return label.offsetParent !== null && text.toLowerCase().includes(targetText.toLowerCase());
                });

                if (targetLabel) {
                    // Try to find the input associated with this label
                    // It's usually a sibling in the .fmd-form-check container
                    const parent = targetLabel.closest(".fmd-form-check");
                    const input = parent ? parent.querySelector("input") : null;

                    if (input) {
                        console.log(`Clicking input for ${key.toUpperCase()}`);
                        input.click();
                        // Blur to remove focus ring which might be confusing the user
                        input.blur();
                    } else {
                        // Fallback to clicking label if input not found
                        console.log(`Input not found for ${key.toUpperCase()}, clicking label`);
                        targetLabel.click();
                    }

                    e.preventDefault();
                    e.stopPropagation();
                }
            }
        };

        window.addEventListener("keydown", handleKeyDown, true);
        return () => window.removeEventListener("keydown", handleKeyDown, true);
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

    const handleClearData = () => {
        const modal = document.getElementById("clear-data-modal");
        if (modal) {
            modal.style.display = "flex";
        }
    };

    const handleModalCancel = () => {
        const modal = document.getElementById("clear-data-modal");
        if (modal) {
            modal.style.display = "none";
        }
    };

    const handleModalConfirm = () => {
        window.location.reload();
    };

    // Event delegation for the button since it's injected as raw HTML
    const handleContainerClick = (e) => {
        const target = e.target;
        if (!target) return;

        if (target.id === "btn-generate-story" || target.closest("#btn-generate-story")) {
            handleGenerateStory();
        } else if (target.id === "btn-copy-story") {
            handleCopyStory();
        } else if (target.id === "btn-clear-data") {
            handleClearData();
        } else if (target.id === "btn-modal-cancel") {
            handleModalCancel();
        } else if (target.id === "btn-modal-confirm") {
            handleModalConfirm();
        }
    };

    const handleInputKeyEvents = (e) => {
        // Stop propagation for inputs to prevent library's global hotkeys from triggering
        if (e.target.tagName === "INPUT" || e.target.tagName === "TEXTAREA") {
            e.stopPropagation();
        }
    };

    if (!composer || !options) {
        return <div>Loading...</div>;
    }

    return (
        <div
            onClick={handleContainerClick}
            onKeyDown={handleInputKeyEvents}
            onKeyPress={handleInputKeyEvents}
            onKeyUp={handleInputKeyEvents}
        >
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

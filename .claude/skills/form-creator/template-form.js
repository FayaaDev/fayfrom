/**
 * Form Template
 *
 * Copy this file to create a new form in the React Form Hub.
 *
 * Steps:
 * 1. Copy this file to: react-form-hub/src/forms/YourFormName.js
 * 2. Replace all instances of:
 *    - "TemplateName" with your form's name (PascalCase)
 *    - "template-form" with your form's ID (kebab-case)
 *    - "Template Form" with your form's display name
 *    - "النموذج النموذجي" with Arabic translation
 * 3. Customize fields, questions, and logic
 * 4. Update endpoint URL (postUrl)
 */

import { translate } from "../utils/translate.js";
import { getSharedFormConfig, GOOGLE_SCRIPT_URL } from "./formUtils.js";

export function createTemplateFormComposer(localization = "en") {
	if (!window.Composer) {
		console.error("Composer not loaded yet");
		return null;
	}

	const composer = new window.Composer({
		id: "template-form",
		...getSharedFormConfig(localization),
		postUrl: GOOGLE_SCRIPT_URL, // or your custom endpoint
	});

	// Header
	composer.h1(
		translate(localization, {
			en: "Template Form",
			ar: "النموذج النموذجي",
		}),
	);

	// Optional: Add introductory text
	composer.p(
		translate(localization, {
			en: "Brief description of what this form is for.",
			ar: "وصف موجز لما هو هذا النموذج.",
		}),
	);

	// ============================================================================
	// Slide 1: Basic Information
	// ============================================================================
	composer.slide({ pageProgress: "1/3" });

	composer.textInput("name", {
		question: translate(localization, {
			en: "What is your name?",
			ar: "ما اسمك؟",
		}),
		required: true,
	});

	// ============================================================================
	// Slide 2: Category Selection (with conditional "Other" field)
	// ============================================================================
	composer.slide({ pageProgress: "2/3" });

	composer.choiceInput("category", {
		question: translate(localization, {
			en: "Select a category",
			ar: "اختر فئة",
		}),
		choices: [
			translate(localization, { en: "Option 1", ar: "الخيار 1" }),
			translate(localization, { en: "Option 2", ar: "الخيار 2" }),
			translate(localization, { en: "Option 3", ar: "الخيار 3" }),
			translate(localization, { en: "Other", ar: "أخرى" }),
		],
		required: true,
	});

	// Conditional field: only show if "Other" is selected
	composer.textInput("categoryOther", {
		question: translate(localization, {
			en: "Please specify",
			ar: "يرجى التحديد",
		}),
		required: true,
		displayCondition: {
			dependencies: ["category"],
			condition: `category == '${translate(localization, { en: "Other", ar: "أخرى" })}'`,
		},
	});

	// ============================================================================
	// Slide 3: Additional Information
	// ============================================================================
	composer.slide({ pageProgress: "3/3" });

	composer.emailInput("email", {
		question: translate(localization, {
			en: "What is your email address?",
			ar: "ما هو عنوان بريدك الإلكتروني؟",
		}),
		description: translate(localization, {
			en: "We'll never share your email with anyone else.",
			ar: "لن نشارك بريدك الإلكتروني مع أي شخص آخر.",
		}),
		required: true,
	});

	composer.textareaInput("comments", {
		question: translate(localization, {
			en: "Any additional comments?",
			ar: "أي تعليقات إضافية؟",
		}),
		required: false,
	});

	return composer;
}

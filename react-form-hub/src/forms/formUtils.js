// Google Apps Script Web App URL
export const GOOGLE_SCRIPT_URL =
	"https://script.google.com/macros/s/AKfycbwNyLO_fWiudzmMVmU6OEaPI2PAjGWlV0kU8nd_QsmNjrFL2fidoRiGIfJ8QqA325osRQ/exec";

/**
 * Get form options with callbacks
 * @param {string} localization - Language code
 * @returns {Object} Form options
 */
export function getFormOptions(localization = "en") {
	return {
		colorScheme: "light",
		formsmdBranding: "hide",
		fontSize: "lg",
		restartButton: "show",
		slideControls: "show",
		pageProgress: "show",
		paddingInlineBottom: 80,
		paddingInlineTop: 300,
		accent: "#09595C",
		accentForeground: "#ffffff",
		backgroundColor: "#ffffff",
		color: "#063E40",
		onSubmit: (data) => {
			console.log("Form submitted - data object:", data);
			console.log("Form submitted - JSON:", JSON.stringify(data, null, 2));
			alert(
				localization === "ar"
					? "تم إرسال النموذج بنجاح! تحقق من جدول Google الخاص بك."
					: "Form submitted successfully! Check your Google Sheet.",
			);
		},
		onSubmitError: (error) => {
			console.error("Submission error:", error);
			alert(
				localization === "ar"
					? "خطأ في إرسال النموذج. تحقق من وحدة التحكم للحصول على التفاصيل."
					: "Error submitting form. Check console for details.",
			);
		},
	};
}

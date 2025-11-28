/**
 * Simple translation utility
 * @param {string} locale - The current locale (e.g., 'en', 'ar')
 * @param {Object} translations - Object with locale keys and translation values
 * @returns {string} The translated string
 */
export function translate(locale, translations) {
	return translations[locale] || translations["en"] || "";
}

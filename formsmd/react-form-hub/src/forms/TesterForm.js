import { translate } from '../utils/translate.js';
import { GOOGLE_SCRIPT_URL } from './formUtils.js';

export function createTesterFormComposer(localization = 'en') {
  if (!window.Composer) return null;

  const composer = new window.Composer({
    id: "tester-form",
    formStyle: "conversational",
    fontSize: "lg",
    rounded: "pill",
    restartButton: "show",
    buttonAlignment: "end",
    paddingInlineBottom: 80,
    paddingInlineTop: 100,
    colorScheme: "light",
    accent: "#09595C",
    accentForeground: "#ffffff",
    backgroundColor: "#ffffff",
    color: "#063E40",
    postUrl: GOOGLE_SCRIPT_URL,
    localization: localization,
    dir: localization === "ar" ? "rtl" : "ltr",
  });

  composer.h1("Tester");
  composer.startSlide({
    buttonText: localization === "ar" ? "ابدأ" : "Start",
  });

  // 1. Text Field
  composer.slide({ pageProgress: "1/3" });
  composer.textInput("question1", {
    question: localization === "ar" ? "سؤال نصي؟" : "Text Question?",
    required: true,
  });

  // 2. Dropdown Menu (SelectBox)
  composer.slide({ pageProgress: "2/3" });
  composer.selectBox("question2", {
    question: localization === "ar" ? "سؤال القائمة المنسدلة؟" : "Dropdown Question?",
    options: localization === "ar" 
      ? ["خيار 1", "خيار 2", "خيار 3"] 
      : ["Option 1", "Option 2", "Option 3"],
    required: true,
  });

  // 3. Select Box (ChoiceInput)
  composer.slide({ pageProgress: "3/3" });
  composer.choiceInput("question3", {
    question: localization === "ar" ? "سؤال الاختيار؟" : "Selection Question?",
    choices: localization === "ar" 
      ? ["خيار أ", "خيار ب"] 
      : ["Choice A", "Choice B"],
    required: true,
  });

  return composer;
}

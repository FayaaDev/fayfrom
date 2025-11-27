import { useState } from "react";
import { Link, useOutletContext } from "react-router-dom";

const HomePage = () => {
  const { currentLang } = useOutletContext();
  const [view, setView] = useState("main"); // main, review, create
  const [newFormName, setNewFormName] = useState("");
  const [generatedCode, setGeneratedCode] = useState("");

  const translations = {
    welcome: { en: "Welcome to the Form Hub", ar: "مرحباً بك في مركز النماذج" },
    subtitle: { en: "Select an option to proceed", ar: "اختر خياراً للمتابعة" },
    createBtn: { en: "Create New Form", ar: "إنشاء نموذج جديد" },
    reviewBtn: { en: "Review Forms", ar: "مراجعة النماذج" },
    backBtn: { en: "Back", ar: "رجوع" },
    availableForms: { en: "Available Forms", ar: "النماذج المتاحة" },
    demoForm: { en: "Demo Form", ar: "النموذج التجريبي" },
    feedbackForm: { en: "Feedback Form", ar: "نموذج الملاحظات" },
    enterName: { en: "Enter Form Name (e.g., Contact)", ar: "أدخل اسم النموذج (مثلاً: تواصل)" },
    generate: { en: "Generate Code", ar: "توليد الكود" },
    copyCode: { en: "Copy Code", ar: "نسخ الكود" },
    codeInstructions: {
      en: "Copy this code into a new file (e.g., src/forms/YourFormName.js) and create a new page component.",
      ar: "انسخ هذا الكود إلى ملف جديد (مثلاً: src/forms/YourFormName.js) وأنشئ مكون صفحة جديد."
    }
  };

  const txt = (key) => translations[key][currentLang];

  const generateCode = () => {
    const name = newFormName.replace(/\s+/g, '');
    const code = `import { translate } from '../utils/translate.js';
import { GOOGLE_SCRIPT_URL } from './formUtils.js';

export function create${name}FormComposer(localization = 'en') {
  if (!window.Composer) return null;

  const composer = new window.Composer({
    id: "${name.toLowerCase()}-form",
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

  composer.h1("${newFormName}");
  composer.startSlide({
    buttonText: localization === "ar" ? "ابدأ" : "Start",
  });

  // Add your questions here
  composer.slide({ pageProgress: "1/1" });
  composer.textInput("example", {
    question: localization === "ar" ? "سؤال مثال؟" : "Example Question?",
    required: true,
  });

  return composer;
}
`;
    setGeneratedCode(code);
  };

  return (
    <div className="home-page">
      <h1>{txt('welcome')}</h1>

      {view === "main" && (
        <div className="action-buttons">
          <button className="main-action-btn" onClick={() => setView("create")}>
            {txt('createBtn')}
          </button>
          <button className="main-action-btn" onClick={() => setView("review")}>
            {txt('reviewBtn')}
          </button>
        </div>
      )}

      {view === "review" && (
        <div className="review-section">
          <h2>{txt('availableForms')}</h2>
          <div className="form-list">
            <Link to="/demo-form" className="form-link-card">
              {txt('demoForm')}
            </Link>
            <Link to="/feedback-form" className="form-link-card">
              {txt('feedbackForm')}
            </Link>
          </div>
          <button className="back-btn" onClick={() => setView("main")}>{txt('backBtn')}</button>
        </div>
      )}

      {view === "create" && (
        <div className="create-section">
          {!generatedCode ? (
            <>
              <input
                type="text"
                value={newFormName}
                onChange={(e) => setNewFormName(e.target.value)}
                placeholder={txt('enterName')}
                className="name-input"
              />
              <button className="generate-btn" onClick={generateCode} disabled={!newFormName}>
                {txt('generate')}
              </button>
            </>
          ) : (
            <div className="code-display">
              <p>{txt('codeInstructions')}</p>
              <textarea readOnly value={generatedCode} rows={20} className="code-textarea" />
              <div className="code-actions">
                <button className="copy-btn" onClick={() => { navigator.clipboard.writeText(generatedCode) }}>{txt('copyCode')}</button>
                <button className="reset-btn" onClick={() => { setGeneratedCode(""); setNewFormName(""); }}>{txt('backBtn')}</button>
              </div>
            </div>
          )}
          {!generatedCode && <button className="back-btn" onClick={() => setView("main")}>{txt('backBtn')}</button>}
        </div>
      )}
    </div>
  );
};

export default HomePage;

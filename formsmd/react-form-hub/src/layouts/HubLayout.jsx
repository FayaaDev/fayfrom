import { Outlet, Link } from "react-router-dom";
import { useState, useEffect } from "react";

const HubLayout = () => {
  const [currentLang, setCurrentLang] = useState(() => {
    return localStorage.getItem("localization") || "ar";
  });

  const toggleLanguage = () => {
    const newLang = currentLang === "ar" ? "en" : "ar";
    setCurrentLang(newLang);
    localStorage.setItem("localization", newLang);

    // Update stylesheet
    const stylesheet = document.getElementById("formsmd-stylesheet");
    if (stylesheet) {
      if (newLang === "ar") {
        stylesheet.href = "/formsmd.rtl.min.css";
      } else {
        stylesheet.href = "/formsmd.min.css";
      }
    }

    // Reload the page to apply new language
    window.location.reload();
  };

  useEffect(() => {
    // Update document direction based on language
    document.documentElement.dir = currentLang === "ar" ? "rtl" : "ltr";
    document.documentElement.lang = currentLang;
  }, [currentLang]);

  return (
    <div className="hub-layout">
      {/* Logo */}
      <div className="logo">
        <img src="/PHAlogo.png" alt="Logo" />
      </div>

      {/* Language Toggle */}
      <button className="lang-toggle" onClick={toggleLanguage}>
        {currentLang === "ar" ? "English" : "العربية"}
      </button>



      {/* Main content area where forms will render */}
      <main className="form-container">
        <Outlet context={{ currentLang }} />
      </main>
    </div>
  );
};

export default HubLayout;

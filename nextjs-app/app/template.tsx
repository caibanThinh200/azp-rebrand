"use client";

import { useEffect } from "react";
import { CookiesProvider } from "react-cookie";

const Template: React.FC<React.PropsWithChildren> = ({ children }) => {
  const googleTranslateElementInit = () => {
    new (window as any).google.translate.TranslateElement(
      {
        pageLanguage: "vi",
        autoDisplay: false,
        // layout: (window as any).google.translate.TranslateElement.InlineLayout.SIMPLE
      },
      "google_translate_element"
    );
  };

  useEffect(() => {
    if (typeof window !== undefined) {
      var addScript = document.createElement("script");
      addScript.setAttribute(
        "src",
        "//translate.google.com/translate_a/element.js?cb=googleTranslateElementInit"
      );
      document.body.appendChild(addScript);
      (window as any).googleTranslateElementInit = googleTranslateElementInit;

      const sheetScript = document.createElement("script");
      sheetScript.setAttribute(
        "src",
        "https://sbt.0soft.dev/sheet-best-templates.min.js"
      );
    }
  }, []);


  return (
    <CookiesProvider defaultSetOptions={{ path: "/" }}>
      {children}
      {/* asdasdpoask */}
    </CookiesProvider>
  );
};

export default Template;

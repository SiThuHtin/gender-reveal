"use client";
import { createContext, useContext, useState } from "react";
import { t } from "../translations";

const LANGS = ["en", "ja"];

const LanguageContext = createContext({ lang: "en", setLang: () => {} });

export function LanguageProvider({ children }) {
  const [lang, setLang] = useState("en");
  return (
    <LanguageContext.Provider value={{ lang, setLang }}>
      {children}
    </LanguageContext.Provider>
  );
}

export { LANGS };

export function useLanguage() {
  return useContext(LanguageContext);
}

export function useT(section) {
  const { lang } = useContext(LanguageContext);
  return t[lang][section];
}

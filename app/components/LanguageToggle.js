"use client";
import { useLanguage } from "../context/LanguageContext";

const OPTIONS = [
  { value: "en", label: "EN" },
  { value: "ja", label: "日本語" },
];

export default function LanguageToggle() {
  const { lang, setLang } = useLanguage();
  return (
    <div className="fixed top-4 right-4 z-50 flex items-center bg-white/90 backdrop-blur-md border border-white/60 shadow-lg rounded-full p-1 gap-0.5 font-montserrat text-xs">
      {OPTIONS.map(({ value, label }) => (
        <button
          key={value}
          onClick={() => setLang(value)}
          className={`px-3 py-1.5 rounded-full font-semibold tracking-wide transition-all duration-200 ${
            lang === value
              ? "bg-charcoal text-white shadow-sm"
              : "text-charcoal/40 hover:text-charcoal/70"
          }`}
        >
          {label}
        </button>
      ))}
    </div>
  );
}

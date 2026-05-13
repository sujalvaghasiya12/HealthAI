import React from "react";
import { LANGUAGES } from "../constants";
import { Language } from "../types";

interface LanguageSelectorProps {
  current: Language;
  onSelect: (code: Language) => void;
}

const LanguageSelector: React.FC<LanguageSelectorProps> = ({
  current,
  onSelect,
}) => {
  return (
    <div
      className="flex w-full flex-wrap justify-center gap-1 rounded-full border border-[#E2E8F0] bg-white p-1.5 shadow-sm sm:w-fit sm:justify-start"
      style={{ fontFamily: "Calibri, Arial, sans-serif" }}
    >
      {LANGUAGES.map((lang) => {
        const active = current === lang.code;

        return (
          <button
            key={lang.code}
            onClick={() => onSelect(lang.code as Language)}
            className={`relative min-w-[88px] flex-1 overflow-hidden rounded-full px-4 py-2 text-center text-[14px] font-bold whitespace-nowrap transition-all duration-300 sm:flex-none ${
              active
                ? "bg-gradient-to-r from-[#14B8A6] to-[#10B981] text-white shadow-[0_10px_24px_rgba(20,184,166,0.22)]"
                : "text-[#64748B] hover:bg-[#F0FDFA] hover:text-[#14B8A6]"
            }`}
          >
            <span className="relative z-10">{lang.label}</span>
          </button>
        );
      })}
    </div>
  );
};

export default LanguageSelector;


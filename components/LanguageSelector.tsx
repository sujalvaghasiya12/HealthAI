import React, { useState, useRef, useEffect } from "react";
import { Language } from "../types";

interface Props {
  current: Language;
  onSelect: (lang: Language) => void;
}

const languages = [
  {
    code: "en",
    label: "English",
    flag: "🇺🇸",
  },
  {
    code: "hi",
    label: "हिन्दी",
    flag: "🇮🇳",
  },
  {
    code: "gu",
    label: "ગુજરાતી",
    flag: "🇮🇳",
  },
];

const LanguageSelector: React.FC<Props> = ({
  current,
  onSelect,
}) => {
  const [open, setOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  const selectedLanguage =
    languages.find((lang) => lang.code === current) || languages[0];

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target as Node)
      ) {
        setOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);

    return () => {
      document.removeEventListener(
        "mousedown",
        handleClickOutside
      );
    };
  }, []);

  return (
    <div className="relative" ref={dropdownRef}>
      {/* Main Button */}
      <button
        onClick={() => setOpen(!open)}
        className="
          group
          flex
          items-center
          gap-3
          rounded-full
          border
          border-white/30
          bg-white/80
          backdrop-blur-xl
          px-4
          py-2.5
          shadow-lg
          transition-all
          duration-300
          hover:scale-[1.03]
          hover:border-[#14B8A6]/40
          hover:shadow-xl
          active:scale-95
        "
      >
        {/* Flag */}
        <span className="text-lg leading-none">
          {selectedLanguage.flag}
        </span>

        {/* Language */}
        <span className="text-sm font-semibold tracking-wide text-[#0F172A]">
          {selectedLanguage.label}
        </span>

        {/* Arrow */}
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className={`h-4 w-4 text-[#64748B] transition-transform duration-300 ${
            open ? "rotate-180" : ""
          }`}
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
          strokeWidth={2.5}
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M6 9l6 6 6-6"
          />
        </svg>
      </button>

      {/* Dropdown */}
      <div
        className={`
          absolute
          right-0
          z-50
          mt-3
          w-48
          overflow-hidden
          rounded-2xl
          border
          border-white/20
          bg-white/90
          backdrop-blur-2xl
          shadow-2xl
          transition-all
          duration-300
          ${
            open
              ? "visible translate-y-0 opacity-100"
              : "invisible -translate-y-2 opacity-0"
          }
        `}
      >
        {languages.map((language) => (
          <button
            key={language.code}
            onClick={() => {
              onSelect(language.code as Language);
              setOpen(false);
            }}
            className={`
              flex
              w-full
              items-center
              gap-3
              px-4
              py-3
              text-left
              transition-all
              duration-200
              hover:bg-[#14B8A6]/10
              ${
                current === language.code
                  ? "bg-[#14B8A6]/10 text-[#14B8A6]"
                  : "text-[#0F172A]"
              }
            `}
          >
            <span className="text-lg">
              {language.flag}
            </span>

            <span className="text-sm font-medium">
              {language.label}
            </span>

            {current === language.code && (
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="ml-auto h-4 w-4"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                strokeWidth={2.5}
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M5 13l4 4L19 7"
                />
              </svg>
            )}
          </button>
        ))}
      </div>
    </div>
  );
};

export default LanguageSelector;
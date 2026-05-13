<<<<<<< HEAD
﻿import React from "react";
import { LANGUAGES } from "../constants";
import { Language } from "../types";
=======

import React from 'react';
import { LANGUAGES } from '../constants';
import { Language } from '../types';
>>>>>>> 0cf126cafec8e3b33b1466dcc1055144f7316f8f

interface LanguageSelectorProps {
  current: Language;
  onSelect: (code: Language) => void;
}

<<<<<<< HEAD
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
=======
const LanguageSelector: React.FC<LanguageSelectorProps> = ({ current, onSelect }) => {
  return (
    <div className="flex flex-wrap gap-2 p-1 bg-slate-100 rounded-lg w-fit">
      {LANGUAGES.map(lang => (
        <button
          key={lang.code}
          onClick={() => onSelect(lang.code as Language)}
          className={`px-4 py-1.5 text-xs font-bold rounded-md transition-all whitespace-nowrap ${
            current === lang.code 
            ? 'bg-white text-teal-600 shadow-sm' 
            : 'text-slate-500 hover:text-slate-800'
          }`}
        >
          {lang.label}
        </button>
      ))}
>>>>>>> 0cf126cafec8e3b33b1466dcc1055144f7316f8f
    </div>
  );
};

export default LanguageSelector;
<<<<<<< HEAD

=======
>>>>>>> 0cf126cafec8e3b33b1466dcc1055144f7316f8f

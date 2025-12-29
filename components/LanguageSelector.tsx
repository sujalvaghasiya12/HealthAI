
import React from 'react';
import { LANGUAGES } from '../constants';
import { Language } from '../types';

interface LanguageSelectorProps {
  current: Language;
  onSelect: (code: Language) => void;
}

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
    </div>
  );
};

export default LanguageSelector;

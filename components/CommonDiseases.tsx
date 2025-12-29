
import React from 'react';
import { COMMON_DISEASES } from '../constants';
import { Language, UIStrings } from '../types';

interface CommonDiseasesProps {
  lang: Language;
  ui: UIStrings;
  onSelect: (diseaseId: string) => void;
}

const CommonDiseases: React.FC<CommonDiseasesProps> = ({ lang, ui, onSelect }) => {
  return (
    <div className="space-y-8 animate-in fade-in duration-500">
      <div className="bg-white rounded-[2.5rem] p-8 md:p-12 border border-slate-200 shadow-xl shadow-slate-200/50">
        <h2 className="text-4xl font-black text-slate-900 mb-4 tracking-tight">{ui.commonTitle}</h2>
        <p className="text-slate-500 text-lg leading-relaxed max-w-2xl">
          {ui.commonDesc}
        </p>
      </div>

      <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {COMMON_DISEASES.map((disease) => (
          <button
            key={disease.id}
            onClick={() => onSelect(disease.id)}
            className="group relative bg-white border border-slate-200 rounded-[2rem] p-8 text-left hover:border-teal-500 hover:shadow-2xl hover:shadow-teal-500/10 transition-all active:scale-[0.98] flex flex-col h-full"
          >
            <div className="flex justify-between items-start mb-6">
              <div className="bg-teal-50 p-3 rounded-2xl text-teal-600 group-hover:bg-teal-600 group-hover:text-white transition-all duration-300">
                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="M11 2a2 2 0 0 0-2 2v5H4a2 2 0 0 0-2 2v2c0 1.1.9 2 2 2h5v5c0 1.1.9 2 2 2h2a2 2 0 0 0 2-2v-5h5a2 2 0 0 0 2-2v-2a2 2 0 0 0-2-2h-5V4a2 2 0 0 0-2-2h-2z"/></svg>
              </div>
              <div className="text-[10px] font-black text-slate-300 group-hover:text-teal-500 tracking-widest transition-colors">{ui.commonStaticData}</div>
            </div>
            <h3 className="text-xl font-black text-slate-900 mb-3 group-hover:text-teal-600 transition-colors">{disease.name[lang]}</h3>
            <p className="text-sm text-slate-500 mb-6 flex-1">{disease.description[lang]}</p>
            <div className="flex flex-wrap gap-2 pt-4 border-t border-slate-50">
              {disease.symptoms[lang].map((s, idx) => (
                <span key={idx} className="text-[10px] font-bold text-slate-500 bg-slate-50 px-3 py-1 rounded-full border border-slate-100 group-hover:bg-teal-50 group-hover:border-teal-100 transition-colors">
                  {s}
                </span>
              ))}
            </div>
          </button>
        ))}
      </div>
    </div>
  );
};

export default CommonDiseases;

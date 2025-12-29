
import React from 'react';
import { UIStrings } from '../types';

const ExercisesView: React.FC<{ ui: UIStrings }> = ({ ui }) => {
  return (
    <div className="space-y-8 animate-in fade-in duration-500">
      <div className="bg-white rounded-3xl p-8 md:p-12 border border-slate-200 shadow-sm relative overflow-hidden">
        <div className="absolute top-0 right-0 w-64 h-64 bg-teal-50 rounded-full -mr-32 -mt-32 opacity-50"></div>
        <div className="relative z-10">
          <h2 className="text-4xl font-black text-slate-900 mb-4 tracking-tight">{ui.exercisePageTitle}</h2>
          <p className="text-slate-500 text-lg max-w-2xl leading-relaxed font-medium">
            {ui.exercisePageDesc}
          </p>
        </div>
      </div>

      <div className="grid md:grid-cols-2 gap-6">
        {ui.yogaList.map((yoga, i) => (
          <div key={i} className="bg-white p-8 rounded-[2.5rem] border border-slate-200 hover:border-teal-400 transition-all group shadow-sm hover:shadow-xl hover:shadow-teal-500/5">
            <div className="flex items-start justify-between mb-6">
              <div className="bg-teal-50 text-teal-600 font-black text-[10px] uppercase tracking-widest px-4 py-1.5 rounded-full group-hover:bg-teal-600 group-hover:text-white transition-colors border border-teal-100">
                {yoga.benefit}
              </div>
              <div className="text-teal-200 group-hover:text-teal-500 transition-colors">
                 <svg xmlns="http://www.w3.org/2000/svg" width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="10"/><path d="m9 12 2 2 4-4"/></svg>
              </div>
            </div>
            <h3 className="text-2xl font-black text-slate-900 mb-3">{yoga.name}</h3>
            <p className="text-slate-500 text-base leading-relaxed font-medium">{yoga.desc}</p>
          </div>
        ))}
      </div>

      <div className="bg-amber-50 border-2 border-amber-200 rounded-[2.5rem] p-10 shadow-lg shadow-amber-900/5">
        <h4 className="text-2xl font-black text-amber-900 mb-6 flex items-center gap-3">
          <svg className="w-8 h-8 shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth="3"><path strokeLinecap="round" strokeLinejoin="round" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z"></path></svg>
          {ui.exercisePrecautionTitle}
        </h4>
        <ul className="grid sm:grid-cols-2 gap-6">
          {ui.exercisePrecautions.map((text, idx) => (
            <li key={idx} className="text-lg text-amber-900 font-bold flex gap-4 bg-white/50 p-4 rounded-2xl border border-amber-100">
              <span className="text-amber-500 font-black shrink-0">•</span> 
              <span className="leading-tight">{text}</span>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default ExercisesView;

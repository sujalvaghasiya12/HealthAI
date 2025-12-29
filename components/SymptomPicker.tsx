
import React from 'react';
import { Symptom, UIStrings, Language } from '../types';
import { SYMPTOMS, CATEGORIES } from '../constants';

interface SymptomPickerProps {
  selected: string[];
  onToggle: (id: string) => void;
  onAnalyze: () => void;
  ui: UIStrings;
  lang: Language;
}

const SymptomPicker: React.FC<SymptomPickerProps> = ({ selected, onToggle, onAnalyze, ui, lang }) => {
  return (
    <div className="bg-white rounded-2xl shadow-sm border border-slate-200 overflow-hidden">
      <div className="p-6 md:p-8">
        <h2 className="text-2xl font-bold text-slate-800 mb-2">{ui.symptomPickerTitle}</h2>
        <p className="text-slate-500 mb-8">{ui.symptomPickerDesc}</p>
        
        <div className="space-y-8">
          {CATEGORIES.map(category => (
            <div key={category}>
              <h3 className="text-sm font-semibold text-slate-400 uppercase tracking-wider mb-4">
                {ui.categoryLabels[category] || category}
              </h3>
              <div className="flex flex-wrap gap-2">
                {SYMPTOMS.filter(s => s.category === category).map(symptom => {
                  const isSelected = selected.includes(symptom.id);
                  return (
                    <button
                      key={symptom.id}
                      onClick={() => onToggle(symptom.id)}
                      className={`px-4 py-2 rounded-full text-sm font-medium transition-all border ${
                        isSelected 
                        ? 'bg-teal-50 border-teal-600 text-teal-700 shadow-sm' 
                        : 'bg-white border-slate-200 text-slate-600 hover:border-teal-300 hover:bg-slate-50'
                      }`}
                    >
                      {symptom.label[lang]}
                    </button>
                  );
                })}
              </div>
            </div>
          ))}
        </div>
      </div>
      
      <div className="bg-slate-50 px-8 py-6 border-t border-slate-200 flex flex-col md:flex-row items-center justify-between gap-4">
        <div className="text-sm text-slate-500">
          <span className="font-bold text-teal-600">{selected.length}</span> {ui.symptomSelectedCount}
        </div>
        <button
          disabled={selected.length === 0}
          onClick={onAnalyze}
          className={`w-full md:w-auto px-8 py-3 rounded-xl font-semibold text-white shadow-lg transition-all ${
            selected.length > 0 
            ? 'bg-teal-600 hover:bg-teal-700 active:scale-95' 
            : 'bg-slate-300 cursor-not-allowed'
          }`}
        >
          {ui.predictButton}
        </button>
      </div>
    </div>
  );
};

export default SymptomPicker;

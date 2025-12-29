
import React from 'react';
import { PredictionResponse, UIStrings } from '../types';

interface ResultViewProps {
  data: PredictionResponse;
  onReset: () => void;
  ui: UIStrings;
}

const ResultView: React.FC<ResultViewProps> = ({ data, onReset, ui }) => {
  const urgencyColor = {
    Low: 'bg-green-100 text-green-800',
    Moderate: 'bg-amber-100 text-amber-800',
    High: 'bg-red-100 text-red-800'
  }[data.urgency];

  return (
    <div className="space-y-6 animate-in fade-in slide-in-from-bottom-4 duration-700">
      <div className="bg-white rounded-3xl shadow-sm border border-slate-200 overflow-hidden">
        <div className="p-6 md:p-10 flex flex-col md:flex-row gap-6 items-start">
          <div className="flex-1">
            <div className="flex items-center gap-3 mb-4">
              <span className={`text-xs font-black uppercase tracking-widest px-3 py-1.5 rounded-lg ${urgencyColor}`}>
                {ui.urgencyLabels[data.urgency]} {ui.resultPriority}
              </span>
              <span className="text-slate-400 text-sm">•</span>
              <span className="text-sm font-bold text-slate-500">
                {ui.resultConfidence}: {Math.round(data.confidence * 100)}%
              </span>
            </div>
            <h2 className="text-4xl font-black text-slate-900 mb-3">{data.disease}</h2>
            <p className="text-slate-600 text-lg leading-relaxed max-w-2xl">{data.description}</p>
            
            {data.symptoms && data.symptoms.length > 0 && (
              <div className="mt-6">
                <p className="text-xs font-black text-slate-400 uppercase tracking-widest mb-3">{ui.resultSymptoms}</p>
                <div className="flex flex-wrap gap-2">
                  {data.symptoms.map((s, idx) => (
                    <span key={idx} className="bg-slate-100 text-slate-600 text-xs font-bold px-3 py-1 rounded-full border border-slate-200">
                      {s}
                    </span>
                  ))}
                </div>
              </div>
            )}
          </div>
          <button 
            onClick={onReset}
            className="px-6 py-3 bg-teal-50 text-teal-700 font-black rounded-2xl hover:bg-teal-600 hover:text-white transition-all duration-300 flex items-center gap-2 shadow-sm"
          >
            <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"><path d="M3 12a9 9 0 1 0 9-9 9.75 9.75 0 0 0-6.74 2.74L3 8"/><path d="M3 3v5h5"/></svg>
            {ui.resultReset}
          </button>
        </div>
      </div>

      <div className="grid md:grid-cols-2 gap-6">
        <div className="bg-white rounded-[2.5rem] shadow-sm border border-slate-200 p-8 md:p-10">
          <div className="flex items-center gap-4 mb-8">
            <div className="p-3 bg-emerald-50 rounded-2xl text-emerald-600 shadow-sm shadow-emerald-100">
              <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="M11 2a2 2 0 0 0-2 2v5H4a2 2 0 0 0-2 2v2c0 1.1.9 2 2 2h5v5c0 1.1.9 2 2 2h2a2 2 0 0 0 2-2v-5h5a2 2 0 0 0 2-2v-2a2 2 0 0 0-2-2h-5V4a2 2 0 0 0-2-2h-2z"/></svg>
            </div>
            <h3 className="text-2xl font-black text-slate-900">{ui.resultRemedies}</h3>
          </div>
          <ul className="space-y-4">
            {data.homeRemedies.map((remedy, idx) => (
              <li key={idx} className="flex gap-4 text-slate-700 font-medium bg-slate-50/50 p-3 rounded-2xl">
                <span className="w-2 h-2 rounded-full bg-emerald-500 mt-2 shrink-0" />
                {remedy}
              </li>
            ))}
          </ul>
        </div>

        <div className="bg-white rounded-[2.5rem] shadow-sm border border-slate-200 p-8 md:p-10">
          <div className="flex items-center gap-4 mb-8">
            <div className="p-3 bg-indigo-50 rounded-2xl text-indigo-600 shadow-sm shadow-indigo-100">
              <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="M12 2a10 10 0 1 0 10 10A10 10 0 0 0 12 2zm0 18a8 8 0 1 1 8-8 8 8 0 0 1-8 8z"/><path d="M12 7v5l3 3"/></svg>
            </div>
            <h3 className="text-2xl font-black text-slate-900">{ui.resultYoga}</h3>
          </div>
          <div className="space-y-6">
            <div>
              <p className="text-xs font-black text-slate-400 uppercase tracking-widest mb-3">{ui.resultYogaPoses}</p>
              <div className="flex flex-wrap gap-2">
                {data.yogaAndExercise.yogaPoses.map((item, idx) => (
                  <span key={idx} className="bg-indigo-50 text-indigo-700 text-sm font-bold px-4 py-2 rounded-xl shadow-sm shadow-indigo-100">{item}</span>
                ))}
              </div>
            </div>
            <div>
              <p className="text-xs font-black text-slate-400 uppercase tracking-widest mb-3">{ui.resultExercises}</p>
              <ul className="space-y-2">
                {data.yogaAndExercise.exercises.map((item, idx) => (
                  <li key={idx} className="text-slate-700 font-medium flex gap-3 p-2 bg-slate-50/50 rounded-lg">
                    <span className="text-indigo-500 font-black">•</span> {item}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </div>

      <div className="bg-white rounded-[3rem] shadow-sm border border-slate-200 overflow-hidden">
        <div className="p-8 md:px-10 border-b border-slate-100 bg-slate-50/50">
          <h3 className="text-2xl font-black text-slate-900">{ui.resultRecovery}</h3>
        </div>
        <div className="divide-y divide-slate-100">
          <div className="p-8 md:px-10 flex flex-col md:flex-row gap-6">
            <div className="w-40 shrink-0 font-black text-slate-400 text-xs uppercase tracking-widest pt-1">{ui.resultRest}</div>
            <div className="flex-1 text-slate-800 font-bold text-lg">{data.recoveryPlan.rest}</div>
          </div>
          <div className="p-8 md:px-10 flex flex-col md:flex-row gap-6">
            <div className="w-40 shrink-0 font-black text-slate-400 text-xs uppercase tracking-widest pt-1">{ui.resultDiet}</div>
            <div className="flex-1 flex flex-wrap gap-2">
               {data.recoveryPlan.diet.map((item, idx) => (
                  <span key={idx} className="bg-orange-50 text-orange-700 text-sm font-bold px-4 py-2 rounded-2xl shadow-sm shadow-orange-100">{item}</span>
                ))}
            </div>
          </div>
          <div className="p-8 md:px-10 grid md:grid-cols-2 gap-10">
            <div>
              <div className="text-xs font-black text-emerald-600 uppercase tracking-widest mb-6">{ui.resultDos}</div>
              <ul className="space-y-4">
                {data.recoveryPlan.dos.map((item, idx) => (
                  <li key={idx} className="flex items-start gap-3 text-slate-700 font-bold bg-emerald-50/30 p-4 rounded-2xl border border-emerald-100">
                    <svg className="w-5 h-5 text-emerald-600 mt-0.5 shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth="3"><path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7"></path></svg>
                    {item}
                  </li>
                ))}
              </ul>
            </div>
            <div>
              <div className="text-xs font-black text-rose-600 uppercase tracking-widest mb-6">{ui.resultDonts}</div>
              <ul className="space-y-4">
                {data.recoveryPlan.donts.map((item, idx) => (
                  <li key={idx} className="flex items-start gap-3 text-slate-700 font-bold bg-rose-50/30 p-4 rounded-2xl border border-rose-100">
                    <svg className="w-5 h-5 text-rose-600 mt-0.5 shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth="3"><path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12"></path></svg>
                    {item}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </div>

      <div className="bg-amber-50 border-2 border-amber-200 rounded-[2.5rem] p-8 md:p-10 shadow-lg shadow-amber-900/5">
        <div className="flex items-start gap-4">
          <svg className="w-8 h-8 text-amber-600 shrink-0 mt-1" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth="2.5"><path strokeLinecap="round" strokeLinejoin="round" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z"></path></svg>
          <div>
            <h4 className="font-black text-amber-900 text-xl mb-2">{ui.resultDisclaimer}</h4>
            <p className="text-amber-800 font-bold leading-relaxed italic">{data.disclaimer}</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ResultView;

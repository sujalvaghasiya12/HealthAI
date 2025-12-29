
import React, { useState } from 'react';
import Header from './components/Header';
import ResultView from './components/ResultView';
import LoadingState from './components/LoadingState';
import CommonDiseases from './components/CommonDiseases';
import ExercisesView from './components/ExercisesView';
import SymptomPicker from './components/SymptomPicker';
import { AppStep, PredictionResponse, Language } from './types';
import { getPredictionFromAI } from './services/aiService';
import { UI_TRANSLATIONS, COMMON_DISEASES, SYMPTOMS } from './constants';

const App: React.FC = () => {
  const [step, setStep] = useState<AppStep>(AppStep.HOME);
  const [lang, setLang] = useState<Language>('en');
  const [symptomText, setSymptomText] = useState("");
  const [selectedSymptoms, setSelectedSymptoms] = useState<string[]>([]);
  const [prediction, setPrediction] = useState<PredictionResponse | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const ui = UI_TRANSLATIONS[lang];

  const handleAnalyze = async (manualText?: string) => {
    // Map selected symptom IDs to their localized labels for the AI prompt
    const selectedLabels = selectedSymptoms.map(id => {
      const sym = SYMPTOMS.find(s => s.id === id);
      return sym ? sym.label[lang] : id;
    });

    const combinedSymptoms = [
      ...selectedLabels,
      manualText || symptomText
    ].filter(Boolean).join(", ");

    if (!combinedSymptoms.trim()) return;
    
    setStep(AppStep.PREDICTING);
    setError(null);
    
    try {
      const result = await getPredictionFromAI(combinedSymptoms, lang);
      setPrediction(result);
      setStep(AppStep.RESULTS);
    } catch (err) {
      console.error(err);
      setError(ui.errorGeneric);
      setStep(AppStep.SYMPTOMS_SELECTION);
    }
  };

  const handleCommonDiseaseSelect = (diseaseId: string) => {
    const disease = COMMON_DISEASES.find(d => d.id === diseaseId);
    if (!disease) return;
    
    const result = { ...disease.fullData[lang], symptoms: disease.symptoms[lang] };
    setPrediction(result);
    setStep(AppStep.RESULTS);
  };

  const reset = () => {
    setStep(AppStep.SYMPTOMS_SELECTION);
    setSymptomText("");
    setSelectedSymptoms([]);
    setPrediction(null);
    setError(null);
  };

  const navigateToStep = (newStep: AppStep) => {
    setStep(newStep);
    setIsMenuOpen(false);
    if (newStep !== AppStep.RESULTS) {
       setPrediction(null);
    }
  };

  const toggleSymptom = (id: string) => {
    setSelectedSymptoms(prev => 
      prev.includes(id) ? prev.filter(s => s !== id) : [...prev, id]
    );
  };

  return (
    <div className="min-h-screen bg-slate-50 flex flex-col selection:bg-teal-100 selection:text-teal-900">
      <Header 
        currentStep={step} 
        onNavigate={navigateToStep} 
        ui={ui} 
        lang={lang} 
        onLanguageChange={setLang}
        isMenuOpen={isMenuOpen}
        onMenuToggle={setIsMenuOpen}
      />
      
      <div className={`flex-1 flex flex-col transition-all duration-500 ${isMenuOpen ? 'blur-md brightness-90 pointer-events-none' : 'blur-0 brightness-100'}`}>
        <main className="flex-1 max-w-7xl mx-auto w-full px-4 lg:px-8 py-8 md:py-16">
          {step === AppStep.HOME && (
            <div className="animate-in fade-in duration-700">
              <div className="text-center mb-16 pt-10">
                 <h2 className="text-sm font-bold text-teal-600 uppercase tracking-[0.3em] mb-6">{ui.homeWelcome}</h2>
                 <h3 className="text-6xl md:text-7xl font-black text-slate-900 leading-[1.1] mb-8">
                   {ui.homeSubtitle1} <br />
                   <span className="text-transparent bg-clip-text bg-gradient-to-r from-teal-600 to-emerald-500">{ui.homeSubtitle2}</span>
                 </h3>
                 <p className="max-w-2xl mx-auto text-slate-500 text-xl leading-relaxed mb-12 font-medium">
                   {ui.homeDesc}
                 </p>
                 <div className="flex flex-col sm:flex-row items-center justify-center gap-5">
                    <button 
                      onClick={() => setStep(AppStep.SYMPTOMS_SELECTION)}
                      className="w-full sm:w-auto px-12 py-5 bg-teal-600 hover:bg-teal-700 text-white font-black rounded-2xl shadow-2xl shadow-teal-100 transition-all hover:-translate-y-1 active:scale-95"
                    >
                      {ui.homeStartBtn}
                    </button>
                    <button 
                      onClick={() => setStep(AppStep.COMMON_DISEASES)}
                      className="w-full sm:w-auto px-12 py-5 bg-white border-2 border-slate-200 text-slate-700 font-black rounded-2xl shadow-sm hover:border-teal-500 transition-all active:scale-95"
                    >
                      {ui.homeCommonBtn}
                    </button>
                 </div>
              </div>

              <div className="grid md:grid-cols-3 gap-8">
                {[
                  { title: ui.feature1Title, desc: ui.feature1Desc, icon: "🌿" },
                  { title: ui.feature2Title, desc: ui.feature2Desc, icon: "🧘" },
                  { title: ui.feature3Title, desc: ui.feature3Desc, icon: "🌏" }
                ].map((feature, i) => (
                  <div key={i} className="bg-white p-10 rounded-[2.5rem] border border-slate-100 shadow-xl shadow-slate-100/50 hover:shadow-teal-500/5 transition-shadow">
                    <div className="text-5xl mb-6">{feature.icon}</div>
                    <h4 className="text-2xl font-black text-slate-900 mb-3">{feature.title}</h4>
                    <p className="text-slate-500 text-base leading-relaxed font-medium">{feature.desc}</p>
                  </div>
                ))}
              </div>
            </div>
          )}

          {error && (
            <div className="mb-8 p-6 bg-red-50 border-2 border-red-100 rounded-[2rem] text-red-600 font-black text-base flex items-center gap-4 animate-in shake duration-500 shadow-sm">
               <div className="bg-red-100 p-2.5 rounded-xl">
                 <svg className="w-6 h-6 shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth="3"><path strokeLinecap="round" strokeLinejoin="round" d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"></path></svg>
               </div>
               {error}
            </div>
          )}

          {step === AppStep.SYMPTOMS_SELECTION && (
            <div className="space-y-6">
              <SymptomPicker 
                selected={selectedSymptoms} 
                onToggle={toggleSymptom} 
                onAnalyze={handleAnalyze} 
                ui={ui}
                lang={lang}
              />

              <div className="bg-white rounded-[3rem] shadow-2xl shadow-slate-200/50 border border-slate-200 overflow-hidden animate-in slide-in-from-bottom-8 duration-500">
                <div className="p-8 md:p-16">
                  <div className="flex items-center gap-4 mb-8">
                    <div className="w-12 h-12 bg-teal-50 rounded-2xl flex items-center justify-center text-teal-600 shadow-sm shadow-teal-100">
                      <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3"><path d="M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0z"/><path d="M9 12h6"/><path d="M12 9v6"/></svg>
                    </div>
                    <h2 className="text-3xl font-black text-slate-900 tracking-tight">{ui.predictTitle}</h2>
                  </div>
                  <p className="text-slate-500 text-lg mb-8 font-medium">{ui.predictDesc}</p>
                  
                  <div className="mb-6">
                    <label className="block text-xs font-black text-slate-400 uppercase tracking-widest mb-3 ml-2">{ui.inputLabel}</label>
                    <textarea
                      value={symptomText}
                      onChange={(e) => setSymptomText(e.target.value)}
                      placeholder={ui.inputPlaceholder}
                      className="w-full h-56 p-8 rounded-[2rem] border-2 border-slate-100 focus:ring-8 focus:ring-teal-500/5 focus:border-teal-500 transition-all outline-none resize-none text-xl font-bold text-slate-800 placeholder:text-slate-300 shadow-inner bg-slate-50/30"
                    />
                  </div>

                  <div className="flex flex-wrap gap-3">
                    <span className="text-xs font-black text-slate-400 uppercase tracking-widest block w-full mb-2">{ui.popularSearches}</span>
                    {ui.examples.map((example, idx) => (
                      <button 
                        key={idx} 
                        onClick={() => setSymptomText(example.text)} 
                        className="text-sm bg-white border border-slate-200 px-6 py-3 rounded-2xl hover:bg-teal-50 hover:border-teal-400 hover:text-teal-700 text-slate-600 font-bold transition-all shadow-sm active:scale-95"
                      >
                        {example.label}
                      </button>
                    ))}
                  </div>
                </div>
                
                <div className="bg-slate-50/50 px-8 md:px-16 py-10 border-t border-slate-200 flex flex-col md:flex-row items-center justify-end gap-5">
                  <button
                    disabled={!symptomText.trim() && selectedSymptoms.length === 0}
                    onClick={() => handleAnalyze()}
                    className={`w-full md:w-auto px-16 py-5 rounded-[1.5rem] font-black text-white shadow-2xl transition-all active:scale-95 ${
                      (symptomText.trim() || selectedSymptoms.length > 0)
                      ? 'bg-teal-600 hover:bg-teal-700 shadow-teal-600/20' 
                      : 'bg-slate-300 cursor-not-allowed shadow-none'
                    }`}
                  >
                    {ui.predictButton}
                  </button>
                </div>
              </div>
            </div>
          )}

          {step === AppStep.COMMON_DISEASES && (
            <CommonDiseases lang={lang} ui={ui} onSelect={handleCommonDiseaseSelect} />
          )}

          {step === AppStep.EXERCISES && <ExercisesView ui={ui} />}

          {step === AppStep.ABOUT && (
            <div className="bg-white rounded-[3rem] p-8 md:p-16 border border-slate-200 shadow-sm animate-in slide-in-from-bottom-8 duration-500">
              <h2 className="text-4xl font-black text-slate-900 mb-8 tracking-tight">{ui.aboutPageTitle}</h2>
              <div className="grid md:grid-cols-2 gap-12">
                 <div className="space-y-6 text-slate-600 text-lg leading-relaxed font-medium">
                    <p>{ui.aboutContent1}</p>
                    <p>{ui.aboutContent2}</p>
                 </div>
                 <div className="bg-teal-50 p-10 rounded-[2.5rem] border border-teal-100 shadow-sm shadow-teal-50">
                    <h3 className="text-2xl font-black text-teal-900 mb-6">{ui.aboutMissionTitle}</h3>
                    <p className="text-teal-800 font-bold mb-8 leading-relaxed">{ui.aboutMissionContent}</p>
                    <h3 className="text-xl font-black text-teal-900 mb-4">{ui.aboutTechTitle2}</h3>
                    <ul className="space-y-4">
                      {ui.aboutTechList.map((item, idx) => (
                        <li key={idx} className="flex gap-4">
                          <div className="bg-white p-2.5 rounded-xl shadow-sm text-teal-600">
                            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth="2.5"><path strokeLinecap="round" strokeLinejoin="round" d="M9 12l2 2 4-4"></path></svg>
                          </div>
                          <span className="text-teal-800 font-bold pt-1">{item}</span>
                        </li>
                      ))}
                    </ul>
                 </div>
              </div>
            </div>
          )}

          {step === AppStep.DISCLAIMER && (
            <div className="bg-amber-50 border-4 border-amber-200 rounded-[3rem] p-8 md:p-16 shadow-xl shadow-amber-900/5 animate-in slide-in-from-bottom-8 duration-500">
              <div className="flex items-center gap-4 mb-8">
                 <div className="bg-amber-100 p-4 rounded-2xl text-amber-600 shadow-sm shadow-amber-200">
                   <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"><path d="m21.73 18-8-14a2 2 0 0 0-3.48 0l-8 14A2 2 0 0 0 4 21h16a2 2 0 0 0 1.73-3Z"/><line x1="12" x2="12" y1="9" y2="13"/><line x1="12" x2="12.01" y1="17" y2="17"/></svg>
                 </div>
                 <h2 className="text-4xl font-black text-amber-900 tracking-tight">{ui.disclaimerPageTitle}</h2>
              </div>
              <div className="text-amber-800 space-y-8 text-lg font-bold leading-relaxed">
                <p className="bg-white/60 p-8 rounded-[2rem] border border-amber-200 shadow-sm text-amber-900 font-black text-xl">
                  {ui.disclaimerWarning}
                </p>
                <p>{ui.disclaimerContent1}</p>
                <p>{ui.disclaimerContent2}</p>
                <div className="p-8 bg-amber-900/5 rounded-[2rem] border-2 border-dashed border-amber-200">
                  <p className="text-amber-900 font-black mb-4">🚨 {ui.disclaimerEmergency}</p>
                </div>
                <p className="text-amber-600 italic font-medium">{ui.disclaimerContent3}</p>
              </div>
            </div>
          )}

          {step === AppStep.PREDICTING && <LoadingState ui={ui} />}

          {step === AppStep.RESULTS && prediction && (
            <ResultView data={prediction} onReset={reset} ui={ui} />
          )}
        </main>

        <footer className="bg-white border-t border-slate-200 py-20 mt-auto">
          <div className="max-w-7xl mx-auto px-4 lg:px-8 text-center text-slate-400 text-[10px] font-black tracking-widest uppercase">
            <p>© {new Date().getFullYear()} {ui.brandName.toUpperCase()} ASSISTANT. {ui.footerCopyright}</p>
            <div className="mt-4 flex gap-8 justify-center items-center">
               <span className="flex items-center gap-2"><div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div> {ui.footerStatus}</span>
            </div>
          </div>
        </footer>
      </div>
    </div>
  );
};

export default App;

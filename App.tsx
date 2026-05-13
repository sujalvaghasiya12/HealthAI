<<<<<<< HEAD
﻿import React, { useState } from "react";
import Header from "./components/Header";
import ResultView from "./components/ResultView";
import LoadingState from "./components/LoadingState";
import CommonDiseases from "./components/CommonDiseases";
import ExercisesView from "./components/ExercisesView";
import SymptomPicker from "./components/SymptomPicker";
import AboutView from "./components/AboutView";
import DisclaimerView from "./components/DisclaimerView";

import {
  AppStep,
  PredictionResponse,
  Language,
} from "./types";

import { getPredictionFromAI } from "./services/aiService";

import {
  UI_TRANSLATIONS,
  COMMON_DISEASES,
  SYMPTOMS,
} from "./constants";

const App: React.FC = () => {
  const [step, setStep] = useState<AppStep>(AppStep.HOME);
  const [lang, setLang] = useState<Language>("en");
  const [symptomText, setSymptomText] = useState("");
  const [selectedSymptoms, setSelectedSymptoms] = useState<
    string[]
  >([]);
  const [prediction, setPrediction] =
    useState<PredictionResponse | null>(null);
=======

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
>>>>>>> 0cf126cafec8e3b33b1466dcc1055144f7316f8f
  const [error, setError] = useState<string | null>(null);
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const ui = UI_TRANSLATIONS[lang];

  const handleAnalyze = async (manualText?: string) => {
<<<<<<< HEAD
    const selectedLabels = selectedSymptoms.map((id) => {
      const sym = SYMPTOMS.find((s) => s.id === id);

=======
    // Map selected symptom IDs to their localized labels for the AI prompt
    const selectedLabels = selectedSymptoms.map(id => {
      const sym = SYMPTOMS.find(s => s.id === id);
>>>>>>> 0cf126cafec8e3b33b1466dcc1055144f7316f8f
      return sym ? sym.label[lang] : id;
    });

    const combinedSymptoms = [
      ...selectedLabels,
<<<<<<< HEAD
      manualText || symptomText,
    ]
      .filter(Boolean)
      .join(", ");

    if (!combinedSymptoms.trim()) return;

    setStep(AppStep.PREDICTING);
    setError(null);

    try {
      const result = await getPredictionFromAI(
        combinedSymptoms,
        lang
      );

=======
      manualText || symptomText
    ].filter(Boolean).join(", ");

    if (!combinedSymptoms.trim()) return;
    
    setStep(AppStep.PREDICTING);
    setError(null);
    
    try {
      const result = await getPredictionFromAI(combinedSymptoms, lang);
>>>>>>> 0cf126cafec8e3b33b1466dcc1055144f7316f8f
      setPrediction(result);
      setStep(AppStep.RESULTS);
    } catch (err) {
      console.error(err);
      setError(ui.errorGeneric);
      setStep(AppStep.SYMPTOMS_SELECTION);
    }
  };

  const handleCommonDiseaseSelect = (diseaseId: string) => {
<<<<<<< HEAD
    const disease = COMMON_DISEASES.find(
      (d) => d.id === diseaseId
    );

    if (!disease) return;

    const result = {
      ...disease.fullData[lang],
      symptoms: disease.symptoms[lang],
    };

=======
    const disease = COMMON_DISEASES.find(d => d.id === diseaseId);
    if (!disease) return;
    
    const result = { ...disease.fullData[lang], symptoms: disease.symptoms[lang] };
>>>>>>> 0cf126cafec8e3b33b1466dcc1055144f7316f8f
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
<<<<<<< HEAD

    if (newStep !== AppStep.RESULTS) {
      setPrediction(null);
=======
    if (newStep !== AppStep.RESULTS) {
       setPrediction(null);
>>>>>>> 0cf126cafec8e3b33b1466dcc1055144f7316f8f
    }
  };

  const toggleSymptom = (id: string) => {
<<<<<<< HEAD
    setSelectedSymptoms((prev) =>
      prev.includes(id)
        ? prev.filter((s) => s !== id)
        : [...prev, id]
=======
    setSelectedSymptoms(prev => 
      prev.includes(id) ? prev.filter(s => s !== id) : [...prev, id]
>>>>>>> 0cf126cafec8e3b33b1466dcc1055144f7316f8f
    );
  };

  return (
<<<<<<< HEAD
    <div
      className="relative min-h-screen overflow-hidden bg-[#F8FAFC] text-[#0F172A] selection:bg-[#99F6E4] selection:text-[#0F172A]"
      style={{
        fontFamily: "Calibri, Arial, sans-serif",
      }}
    >
      <div className="pointer-events-none fixed inset-0 overflow-hidden">
        <div className="absolute -left-40 top-0 h-[520px] w-[520px] rounded-full bg-[#14B8A6]/12 blur-3xl" />
        <div className="absolute right-0 top-[18%] h-[420px] w-[420px] rounded-full bg-[#10B981]/10 blur-3xl" />
        <div className="absolute bottom-0 left-[20%] h-[460px] w-[460px] rounded-full bg-[#14B8A6]/8 blur-3xl" />
      </div>

      <Header
        currentStep={step}
        onNavigate={navigateToStep}
        ui={ui}
        lang={lang}
=======
    <div className="min-h-screen bg-slate-50 flex flex-col selection:bg-teal-100 selection:text-teal-900">
      <Header 
        currentStep={step} 
        onNavigate={navigateToStep} 
        ui={ui} 
        lang={lang} 
>>>>>>> 0cf126cafec8e3b33b1466dcc1055144f7316f8f
        onLanguageChange={setLang}
        isMenuOpen={isMenuOpen}
        onMenuToggle={setIsMenuOpen}
      />
<<<<<<< HEAD

      <div
        className={`relative z-10 flex min-h-screen flex-col transition-all duration-500 ${
          isMenuOpen
            ? "pointer-events-none blur-md brightness-95"
            : "blur-0 brightness-100"
        }`}
      >
        <main className="mx-auto w-full max-w-7xl flex-1 px-4 py-8 sm:px-6 lg:px-8 lg:py-12">
          {step === AppStep.HOME && (
            <section className="animate-in fade-in slide-in-from-bottom-4 duration-700">
              <div className="relative overflow-hidden rounded-[2.25rem] border border-[#E2E8F0] bg-white/95 px-6 py-12 shadow-[0_32px_90px_rgba(15,23,42,0.08)] backdrop-blur-2xl sm:px-8 md:rounded-[3rem] md:px-14 md:py-20">
                <div className="absolute -right-24 -top-24 h-80 w-80 rounded-full bg-[#14B8A6]/14 blur-3xl" />
                <div className="absolute -left-24 bottom-0 h-72 w-72 rounded-full bg-[#10B981]/12 blur-3xl" />

                <div className="relative z-10 text-center">
                  <span className="mb-6 inline-flex rounded-full border border-[#99F6E4] bg-[#F0FDFA] px-5 py-2 text-[13px] font-bold uppercase tracking-[0.18em] text-[#14B8A6] sm:text-[14px]">
                    {ui.homeWelcome}
                  </span>

                  <h2 className="mx-auto max-w-5xl text-[38px] font-bold leading-[1.05] tracking-tight text-[#0F172A] sm:text-[46px] md:text-[78px]">
                    {ui.homeSubtitle1}

                    <br />

                    <span className="bg-gradient-to-r from-[#14B8A6] to-[#10B981] bg-clip-text text-transparent">
                      {ui.homeSubtitle2}
                    </span>
                  </h2>

                  <p className="mx-auto mt-8 max-w-3xl text-[18px] leading-8 text-[#64748B] sm:text-[20px] sm:leading-9">
                    {ui.homeDesc}
                  </p>

                  <div className="mt-12 flex flex-col items-center justify-center gap-4 sm:flex-row sm:gap-5">
                    <button
                      onClick={() =>
                        setStep(
                          AppStep.SYMPTOMS_SELECTION
                        )
                      }
                      className="group flex items-center gap-3 rounded-[1.4rem] bg-gradient-to-r from-[#14B8A6] to-[#10B981] px-8 py-4 text-[17px] font-bold text-white shadow-[0_20px_50px_rgba(20,184,166,0.24)] transition-all duration-300 hover:-translate-y-1 hover:shadow-[0_26px_60px_rgba(20,184,166,0.28)] active:scale-[0.98] sm:px-10 sm:py-5 sm:text-[18px]"
                    >
                      {ui.homeStartBtn}

                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="2.5"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1"
                      >
                        <path d="M5 12h14" />
                        <path d="m13 5 7 7-7 7" />
                      </svg>
                    </button>

                    <button
                      onClick={() =>
                        setStep(
                          AppStep.COMMON_DISEASES
                        )
                      }
                      className="rounded-[1.4rem] border border-[#E2E8F0] bg-white px-8 py-4 text-[17px] font-bold text-[#0F172A] shadow-sm transition-all duration-300 hover:-translate-y-1 hover:border-[#14B8A6]/40 hover:bg-[#F0FDFA] hover:text-[#14B8A6] active:scale-[0.98] sm:px-10 sm:py-5 sm:text-[18px]"
                    >
                      {ui.homeCommonBtn}
                    </button>
                  </div>
                </div>
              </div>

              <div className="mt-10 grid gap-6 md:grid-cols-3">
                {[
                  {
                    title: ui.feature1Title,
                    desc: ui.feature1Desc,
                    icon: "Health",
                  },
                  {
                    title: ui.feature2Title,
                    desc: ui.feature2Desc,
                    icon: "Recovery",
                  },
                  {
                    title: ui.feature3Title,
                    desc: ui.feature3Desc,
                    icon: "Support",
                  },
                ].map((feature, i) => (
                  <div
                    key={i}
                    className="group rounded-[2rem] border border-[#E2E8F0] bg-white p-8 shadow-[0_18px_50px_rgba(15,23,42,0.05)] transition-all duration-300 hover:-translate-y-1 hover:border-[#14B8A6]/30 hover:shadow-[0_25px_70px_rgba(20,184,166,0.10)]"
                  >
                    <div className="mb-6 inline-flex rounded-full border border-[#CCFBF1] bg-[#F0FDFA] px-4 py-2 text-[12px] font-bold uppercase tracking-[0.18em] text-[#14B8A6]">
                      {feature.icon}
                    </div>

                    <h4 className="mb-4 text-[30px] font-bold tracking-tight text-[#0F172A]">
                      {feature.title}
                    </h4>

                    <p className="text-[17px] leading-8 text-[#64748B]">
                      {feature.desc}
                    </p>
                  </div>
                ))}
              </div>
            </section>
          )}

          {step === AppStep.SYMPTOMS_SELECTION && (
            <div className="space-y-8">
              <SymptomPicker
                selected={selectedSymptoms}
                onToggle={toggleSymptom}
                onAnalyze={handleAnalyze}
                ui={ui}
                lang={lang}
                symptomText={symptomText}
                onSymptomTextChange={setSymptomText}
              />
=======
      
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
>>>>>>> 0cf126cafec8e3b33b1466dcc1055144f7316f8f
            </div>
          )}

          {step === AppStep.COMMON_DISEASES && (
<<<<<<< HEAD
            <CommonDiseases
              lang={lang}
              ui={ui}
              onSelect={handleCommonDiseaseSelect}
            />
          )}

          {step === AppStep.EXERCISES && (
            <ExercisesView ui={ui} lang={lang} />
          )}

          {step === AppStep.ABOUT && (
            <AboutView ui={ui} />
          )}

          {step === AppStep.DISCLAIMER && (
            <DisclaimerView ui={ui} />
          )}

          {step === AppStep.PREDICTING && (
            <LoadingState ui={ui} />
          )}

          {step === AppStep.RESULTS &&
            prediction && (
              <ResultView
                data={prediction}
                onReset={reset}
                ui={ui}
                lang={lang}
              />
            )}
        </main>

        <footer className="relative mt-auto overflow-hidden border-t border-[#E2E8F0] bg-white/92 py-14 backdrop-blur-2xl">
          <div className="absolute inset-0 bg-gradient-to-r from-[#14B8A6]/6 via-transparent to-[#10B981]/6" />

          <div className="relative z-10 mx-auto max-w-7xl px-4 text-center sm:px-6 lg:px-8">
            <h3 className="text-[25px] font-bold tracking-tight text-[#0F172A]">
              {ui.brandName}
            </h3>

            <p className="mx-auto mt-4 max-w-2xl text-[16px] leading-7 text-[#64748B]">
              AI-powered healthcare guidance designed
              for smarter wellness, symptom analysis,
              and healthy lifestyle recommendations.
            </p>

            <div className="mt-8 flex flex-wrap items-center justify-center gap-4 sm:gap-6">
              <div className="flex items-center gap-3 rounded-full border border-[#E2E8F0] bg-white px-5 py-2 shadow-sm">
                <span className="h-2.5 w-2.5 animate-pulse rounded-full bg-[#10B981]" />

                <span className="text-[14px] font-bold text-[#64748B]">
                  {ui.footerStatus}
                </span>
              </div>

              <div className="rounded-full border border-[#E2E8F0] bg-white px-5 py-2 text-[14px] font-bold text-[#64748B] shadow-sm">
                Secure AI Analysis
              </div>

              <div className="rounded-full border border-[#E2E8F0] bg-white px-5 py-2 text-[14px] font-bold text-[#64748B] shadow-sm">
                Multi Language Support
              </div>
            </div>

            <div className="mt-10 border-t border-[#E2E8F0] pt-6 text-[13px] font-bold uppercase tracking-[0.2em] text-[#64748B]">
              {new Date().getFullYear()}{" "}
              {ui.brandName.toUpperCase()} |{" "}
              {ui.footerCopyright}
=======
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
>>>>>>> 0cf126cafec8e3b33b1466dcc1055144f7316f8f
            </div>
          </div>
        </footer>
      </div>
    </div>
  );
};

export default App;
<<<<<<< HEAD

=======
>>>>>>> 0cf126cafec8e3b33b1466dcc1055144f7316f8f

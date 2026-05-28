import React, { useState } from "react";
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
  const [error, setError] = useState<string | null>(null);
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const ui = UI_TRANSLATIONS[lang];

  const handleAnalyze = async (manualText?: string) => {
    const selectedLabels = selectedSymptoms.map((id) => {
      const sym = SYMPTOMS.find((s) => s.id === id);

      return sym ? sym.label[lang] : id;
    });

    const combinedSymptoms = [
      ...selectedLabels,
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

      setPrediction(result);
      setStep(AppStep.RESULTS);
    } catch (err) {
      console.error(err);
      setError(ui.errorGeneric);
      setStep(AppStep.SYMPTOMS_SELECTION);
    }
  };

  const handleCommonDiseaseSelect = (diseaseId: string) => {
    const disease = COMMON_DISEASES.find(
      (d) => d.id === diseaseId
    );

    if (!disease) return;

    const result = {
      ...disease.fullData[lang],
      symptoms: disease.symptoms[lang],
    };

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
    setSelectedSymptoms((prev) =>
      prev.includes(id)
        ? prev.filter((s) => s !== id)
        : [...prev, id]
    );
  };

  return (
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
        onLanguageChange={setLang}
        isMenuOpen={isMenuOpen}
        onMenuToggle={setIsMenuOpen}
      />

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
            </div>
          )}

          {step === AppStep.COMMON_DISEASES && (
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
            </div>
          </div>
        </footer>
      </div>
    </div>
  );
};

export default App;


import React, { useEffect, useRef, useState } from "react";
import { UIStrings, Language } from "../types";
import { SYMPTOMS, CATEGORIES } from "../constants";

interface SymptomPickerProps {
  selected: string[];
  onToggle: (id: string) => void;
  onAnalyze: (manualText?: string) => void;
  ui: UIStrings;
  lang: Language;
  symptomText: string;
  onSymptomTextChange: (value: string) => void;
}

interface SpeechRecognitionAlternativeLike {
  transcript: string;
}

interface SpeechRecognitionResultLike {
  readonly isFinal: boolean;
  readonly length: number;
  [index: number]: SpeechRecognitionAlternativeLike;
}

interface SpeechRecognitionEventLike {
  readonly resultIndex: number;
  readonly results: ArrayLike<SpeechRecognitionResultLike>;
}

interface SpeechRecognitionLike {
  continuous: boolean;
  interimResults: boolean;
  lang: string;
  onresult: ((event: SpeechRecognitionEventLike) => void) | null;
  onerror: (() => void) | null;
  onend: (() => void) | null;
  start: () => void;
  stop: () => void;
}

interface SpeechRecognitionConstructor {
  new (): SpeechRecognitionLike;
}

const VOICE_COPY = {
  en: {
    start: "Start voice input",
    stop: "Stop voice input",
    listening: "Listening now. Speak your symptoms naturally.",
    helper: "Use your microphone to describe symptoms faster.",
    unsupported: "Voice input is not supported in this browser.",
    error: "Voice input could not start. Please try again.",
    preview: "Live voice preview",
  },
  hi: {
    start: "Voice input shuru karein",
    stop: "Voice input rokein",
    listening: "Sun raha hai. Apne lakshan normal tareeke se boliye.",
    helper: "Microphone se bolkar lakshan jaldi likh sakte hain.",
    unsupported: "Is browser mein voice input support nahin hai.",
    error: "Voice input shuru nahin ho saka. Kripya phir se koshish karein.",
    preview: "Live voice preview",
  },
  gu: {
    start: "Voice input sharu karo",
    stop: "Voice input band karo",
    listening: "Sambhali rahyu chhe. Tamara lakshano saaf rite bolo.",
    helper: "Microphone thi boline lakshano jhadapthi lakhavi shako cho.",
    unsupported: "Aa browser ma voice input support nathi.",
    error: "Voice input sharu thai shakyu nathi. Krupaya fari prayatna karo.",
    preview: "Live voice preview",
  },
} satisfies Record<
  Language,
  {
    start: string;
    stop: string;
    listening: string;
    helper: string;
    unsupported: string;
    error: string;
    preview: string;
  }
>;

const VOICE_LANG_MAP: Record<Language, string> = {
  en: "en-US",
  hi: "hi-IN",
  gu: "gu-IN",
};

const SymptomPicker: React.FC<SymptomPickerProps> = ({
  selected,
  onToggle,
  onAnalyze,
  ui,
  lang,
  symptomText,
  onSymptomTextChange,
}) => {
  const [isListening, setIsListening] = useState(false);
  const [voiceError, setVoiceError] = useState("");
  const [interimTranscript, setInterimTranscript] = useState("");
  const recognitionRef = useRef<SpeechRecognitionLike | null>(null);
  const baseTextRef = useRef("");
  const finalTranscriptRef = useRef("");
  const canAnalyze =
    selected.length > 0 || symptomText.trim().length > 0;
  const voiceText = VOICE_COPY[lang];

  useEffect(() => {
    return () => {
      recognitionRef.current?.stop();
      recognitionRef.current = null;
    };
  }, []);

  const mergeVoiceText = (
    baseText: string,
    finalText: string,
    liveText = ""
  ) =>
    [baseText.trim(), finalText.trim(), liveText.trim()]
      .filter(Boolean)
      .join(" ");

  const stopListening = () => {
    recognitionRef.current?.stop();
  };

  const handleVoiceToggle = () => {
    if (isListening) {
      stopListening();
      return;
    }

    if (typeof window === "undefined") {
      setVoiceError(voiceText.unsupported);
      return;
    }

    const speechWindow = window as Window &
      typeof globalThis & {
        SpeechRecognition?: SpeechRecognitionConstructor;
        webkitSpeechRecognition?: SpeechRecognitionConstructor;
      };

    const SpeechRecognitionApi =
      speechWindow.SpeechRecognition ||
      speechWindow.webkitSpeechRecognition;

    if (!SpeechRecognitionApi) {
      setVoiceError(voiceText.unsupported);
      return;
    }

    const recognition = new SpeechRecognitionApi();

    baseTextRef.current = symptomText.trim();
    finalTranscriptRef.current = "";
    setInterimTranscript("");
    setVoiceError("");

    recognition.continuous = false;
    recognition.interimResults = true;
    recognition.lang = VOICE_LANG_MAP[lang];

    recognition.onresult = (event) => {
      let updatedFinal = finalTranscriptRef.current;
      let updatedInterim = "";

      for (
        let index = event.resultIndex;
        index < event.results.length;
        index += 1
      ) {
        const result = event.results[index];
        const transcript = result[0]?.transcript?.trim();

        if (!transcript) {
          continue;
        }

        if (result.isFinal) {
          updatedFinal = `${updatedFinal} ${transcript}`.trim();
        } else {
          updatedInterim = `${updatedInterim} ${transcript}`.trim();
        }
      }

      finalTranscriptRef.current = updatedFinal;
      setInterimTranscript(updatedInterim);
      onSymptomTextChange(
        mergeVoiceText(
          baseTextRef.current,
          updatedFinal,
          updatedInterim
        )
      );
    };

    recognition.onerror = () => {
      setVoiceError(voiceText.error);
      setIsListening(false);
      setInterimTranscript("");
      recognitionRef.current = null;
    };

    recognition.onend = () => {
      onSymptomTextChange(
        mergeVoiceText(
          baseTextRef.current,
          finalTranscriptRef.current
        )
      );
      setIsListening(false);
      setInterimTranscript("");
      recognitionRef.current = null;
    };

    recognitionRef.current = recognition;
    setIsListening(true);
    recognition.start();
  };

  return (
    <section
      className="animate-in fade-in slide-in-from-bottom-4 relative overflow-hidden rounded-[2rem] border border-[#E2E8F0] bg-white/95 shadow-[0_25px_80px_rgba(15,23,42,0.08)] duration-700 sm:rounded-[2.5rem]"
      style={{ fontFamily: "Calibri, Arial, sans-serif" }}
    >
      <div className="absolute -right-24 -top-24 h-72 w-72 rounded-full bg-[#14B8A6]/12 blur-3xl" />
      <div className="absolute -bottom-24 -left-24 h-72 w-72 rounded-full bg-[#10B981]/10 blur-3xl" />

      <div className="relative z-10 p-5 sm:p-7 md:p-10">
        <div className="mb-8 max-w-3xl sm:mb-10">
          <span className="mb-4 inline-flex rounded-full border border-[#99F6E4] bg-[#F0FDFA] px-3.5 py-1.5 text-[13px] font-bold tracking-wide text-[#14B8A6] sm:px-4 sm:text-[14px]">
            Symptom Checker
          </span>

          <h2 className="text-[30px] font-bold leading-tight tracking-tight text-[#0F172A] sm:text-[34px] md:text-[44px]">
            {ui.symptomPickerTitle}
          </h2>

          <p className="mt-4 text-[16px] leading-7 text-[#64748B] sm:text-[18px] sm:leading-8">
            {ui.symptomPickerDesc}
          </p>
        </div>

        <div className="mb-6 rounded-[1.6rem] border border-[#E2E8F0] bg-[#F8FAFC] p-4 sm:mb-8 sm:p-5">
          <div className="mb-3 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
            <label className="block text-[15px] font-bold text-[#0F172A]">
              {ui.inputLabel}
            </label>

            <button
              type="button"
              onClick={handleVoiceToggle}
              className={`inline-flex items-center justify-center gap-2 self-start rounded-full border px-4 py-2 text-[14px] font-bold transition-all duration-300 sm:self-auto ${
                isListening
                  ? "border-[#14B8A6] bg-[#F0FDFA] text-[#14B8A6] shadow-[0_12px_30px_rgba(20,184,166,0.12)]"
                  : "border-[#E2E8F0] bg-white text-[#0F172A] hover:border-[#14B8A6]/35 hover:bg-[#F0FDFA] hover:text-[#14B8A6]"
              }`}
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
                className="h-4 w-4"
              >
                <path d="M12 3a3 3 0 0 0-3 3v6a3 3 0 0 0 6 0V6a3 3 0 0 0-3-3Z" />
                <path d="M19 10a7 7 0 0 1-14 0" />
                <path d="M12 17v4" />
                <path d="M8 21h8" />
              </svg>

              <span>
                {isListening ? voiceText.stop : voiceText.start}
              </span>
            </button>
          </div>

          <textarea
            value={symptomText}
            onChange={(e) =>
              onSymptomTextChange(e.target.value)
            }
            rows={4}
            placeholder={ui.inputPlaceholder}
            className="w-full resize-none rounded-[1.25rem] border border-[#E2E8F0] bg-white px-4 py-3 text-[16px] leading-7 text-[#0F172A] outline-none transition-colors duration-300 placeholder:text-[#64748B] focus:border-[#14B8A6]"
          />

          <div className="mt-3 flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between">
            <p
              className={`text-[14px] font-medium ${
                isListening ? "text-[#14B8A6]" : "text-[#64748B]"
              }`}
            >
              {isListening
                ? voiceText.listening
                : voiceText.helper}
            </p>

            {interimTranscript && (
              <span className="inline-flex w-fit rounded-full border border-[#99F6E4] bg-[#F0FDFA] px-3 py-1 text-[13px] font-semibold text-[#14B8A6]">
                {voiceText.preview}: {interimTranscript}
              </span>
            )}
          </div>

          {voiceError && (
            <p className="mt-3 text-[14px] font-semibold text-[#DC2626]">
              {voiceError}
            </p>
          )}

          <div className="mt-4 flex justify-end">
            <button
              type="button"
              disabled={!canAnalyze}
              onClick={() => onAnalyze(symptomText)}
              className={`group inline-flex items-center gap-3 rounded-full px-5 py-3 text-[15px] font-bold text-white transition-all duration-300 ${
                canAnalyze
                  ? "bg-gradient-to-r from-[#14B8A6] to-[#10B981] shadow-[0_16px_36px_rgba(20,184,166,0.22)] hover:-translate-y-0.5 hover:shadow-[0_20px_40px_rgba(20,184,166,0.26)] active:scale-[0.98]"
                  : "cursor-not-allowed bg-[#CBD5E1] shadow-none"
              }`}
            >
              {ui.predictButton}

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
          </div>

          <div className="mt-4">
            <p className="mb-3 text-[13px] font-bold uppercase tracking-[0.16em] text-[#64748B]">
              {ui.popularSearches}
            </p>

            <div className="flex flex-wrap gap-2.5">
              {ui.examples.map((example) => (
                <button
                  key={example.label}
                  type="button"
                  onClick={() =>
                    onSymptomTextChange(example.text)
                  }
                  className="rounded-full border border-[#E2E8F0] bg-white px-4 py-2 text-[14px] font-semibold text-[#64748B] transition-all duration-300 hover:border-[#14B8A6]/35 hover:bg-[#F0FDFA] hover:text-[#14B8A6]"
                >
                  {example.label}
                </button>
              ))}
            </div>
          </div>
        </div>

        <div className="space-y-6 sm:space-y-8">
          {CATEGORIES.map((category, categoryIndex) => (
            <div
              key={category}
              className="rounded-[1.6rem] border border-[#E2E8F0] bg-white p-4 shadow-sm transition-all duration-300 hover:border-[#14B8A6]/25 hover:shadow-[0_15px_45px_rgba(20,184,166,0.08)] sm:rounded-[2rem] sm:p-5 md:p-6"
              style={{ animationDelay: `${categoryIndex * 80}ms` }}
            >
              <div className="mb-4 flex items-center gap-3 sm:mb-5">
                <span className="flex h-8 w-8 items-center justify-center rounded-xl bg-[#F0FDFA] text-[14px] font-black text-[#14B8A6] sm:h-9 sm:w-9 sm:text-[15px]">
                  {categoryIndex + 1}
                </span>

                <h3 className="text-[14px] font-black uppercase tracking-[0.2em] text-[#64748B]">
                  {ui.categoryLabels[category] || category}
                </h3>
              </div>

              <div className="flex flex-wrap gap-3">
                {SYMPTOMS.filter((s) => s.category === category).map(
                  (symptom) => {
                    const isSelected = selected.includes(symptom.id);

                    return (
                      <button
                        key={symptom.id}
                        onClick={() => onToggle(symptom.id)}
                        className={`group flex w-full items-center justify-center gap-2 rounded-full border px-4 py-2.5 text-center text-[16px] font-bold transition-all duration-300 active:scale-[0.97] sm:w-auto sm:justify-start sm:text-left ${
                          isSelected
                            ? "border-[#14B8A6] bg-gradient-to-r from-[#14B8A6] to-[#10B981] text-white shadow-[0_14px_30px_rgba(20,184,166,0.22)]"
                            : "border-[#E2E8F0] bg-white text-[#64748B] hover:-translate-y-0.5 hover:border-[#14B8A6]/35 hover:bg-[#F0FDFA] hover:text-[#14B8A6]"
                        }`}
                      >
                        {isSelected && (
                          <svg
                            className="h-4 w-4 shrink-0"
                            fill="none"
                            stroke="currentColor"
                            viewBox="0 0 24 24"
                            strokeWidth="3"
                          >
                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              d="M5 13l4 4L19 7"
                            />
                          </svg>
                        )}

                        <span>{symptom.label[lang]}</span>
                      </button>
                    );
                  }
                )}
              </div>
            </div>
          ))}
        </div>
      </div>

      <div className="relative z-10 border-t border-[#E2E8F0] bg-[#F8FAFC] px-5 py-5 sm:px-7 sm:py-6 md:px-10">
        <div className="flex flex-col items-stretch justify-between gap-4 md:flex-row md:items-center md:gap-5">
          <div className="flex w-full items-center justify-center gap-3 rounded-2xl border border-[#E2E8F0] bg-white px-5 py-3 shadow-sm md:w-auto md:justify-start">
            <span className="flex h-9 w-9 items-center justify-center rounded-xl bg-[#F0FDFA] text-[18px] font-black text-[#14B8A6]">
              {selected.length}
            </span>

            <span className="text-[16px] font-semibold text-[#64748B]">
              {ui.symptomSelectedCount}
            </span>
          </div>

          <button
            disabled={!canAnalyze}
            onClick={() => onAnalyze(symptomText)}
            className={`group flex w-full items-center justify-center gap-3 rounded-2xl px-8 py-4 text-[17px] font-bold text-white transition-all duration-300 md:min-w-[220px] md:w-auto ${
              canAnalyze
                ? "bg-gradient-to-r from-[#14B8A6] to-[#10B981] shadow-[0_20px_45px_rgba(20,184,166,0.24)] hover:-translate-y-1 hover:shadow-[0_24px_50px_rgba(20,184,166,0.28)] active:scale-[0.97]"
                : "cursor-not-allowed bg-[#CBD5E1] shadow-none"
            }`}
          >
            {ui.predictButton}

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
        </div>
      </div>
    </section>
  );
};

export default SymptomPicker;

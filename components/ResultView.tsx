import React from "react";
import { Language, PredictionResponse, UIStrings } from "../types";
import {
  findWellnessItem,
  PoseType,
} from "./wellnessContent";

interface ResultViewProps {
  data: PredictionResponse;
  onReset: () => void;
  ui: UIStrings;
  lang: Language;
}

const renderPoseSticker = (poseType?: PoseType) => {
  const sharedProps = {
    fill: "none",
    stroke: "currentColor",
    strokeWidth: "2.2",
    strokeLinecap: "round" as const,
    strokeLinejoin: "round" as const,
  };

  switch (poseType) {
    case "deep-rest":
      return (
        <svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 64 64"
          className="h-20 w-20"
        >
          <circle cx="20" cy="23" r="5" {...sharedProps} />
          <path d="M26 28h14c6 0 10 4 12 8" {...sharedProps} />
          <path d="M17 40h32" {...sharedProps} />
          <path d="M30 28l-6 12" {...sharedProps} />
          <path d="M40 29l4 11" {...sharedProps} />
        </svg>
      );
    case "active-breath":
      return (
        <svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 64 64"
          className="h-20 w-20"
        >
          <circle cx="32" cy="14" r="5" {...sharedProps} />
          <path d="M32 19v16" {...sharedProps} />
          <path d="M22 27l10 8 10-8" {...sharedProps} />
          <path d="M24 47c3-4 8-6 8-12" {...sharedProps} />
          <path d="M40 47c-3-4-8-6-8-12" {...sharedProps} />
          <path d="M48 16c4 2 6 6 6 10" {...sharedProps} />
        </svg>
      );
    case "reclined-knee":
      return (
        <svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 64 64"
          className="h-20 w-20"
        >
          <circle cx="18" cy="26" r="5" {...sharedProps} />
          <path d="M23 30h14l8 8" {...sharedProps} />
          <path d="M45 38l-4 10" {...sharedProps} />
          <path d="M33 30l-6 12" {...sharedProps} />
          <path d="M27 42l12 1" {...sharedProps} />
          <path d="M12 47h38" {...sharedProps} />
        </svg>
      );
    case "child-rest":
      return (
        <svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 64 64"
          className="h-20 w-20"
        >
          <circle cx="42" cy="24" r="4.5" {...sharedProps} />
          <path d="M18 39c8-10 13-15 20-15" {...sharedProps} />
          <path d="M18 39h28" {...sharedProps} />
          <path d="M18 39l-5 8" {...sharedProps} />
          <path d="M32 39l-3 9" {...sharedProps} />
        </svg>
      );
    case "standing-align":
      return (
        <svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 64 64"
          className="h-20 w-20"
        >
          <circle cx="32" cy="14" r="5" {...sharedProps} />
          <path d="M32 19v22" {...sharedProps} />
          <path d="M20 26h24" {...sharedProps} />
          <path d="M32 41l-8 12" {...sharedProps} />
          <path d="M32 41l8 12" {...sharedProps} />
        </svg>
      );
    case "tabletop-flow":
      return (
        <svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 64 64"
          className="h-20 w-20"
        >
          <circle cx="44" cy="16" r="4.5" {...sharedProps} />
          <path d="M18 30c7-6 14-10 24-10" {...sharedProps} />
          <path d="M18 30l-4 12" {...sharedProps} />
          <path d="M28 29l-2 13" {...sharedProps} />
          <path d="M41 24l7 10" {...sharedProps} />
          <path d="M48 34l4 10" {...sharedProps} />
        </svg>
      );
    case "seated-breath":
    default:
      return (
        <svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 64 64"
          className="h-20 w-20"
        >
          <circle cx="32" cy="14" r="5" {...sharedProps} />
          <path d="M32 20v14" {...sharedProps} />
          <path d="M22 28l10 6 10-6" {...sharedProps} />
          <path d="M18 46c5-7 11-10 14-12" {...sharedProps} />
          <path d="M46 46c-5-7-11-10-14-12" {...sharedProps} />
          <path d="M18 46h28" {...sharedProps} />
        </svg>
      );
  }
};

const ResultView: React.FC<ResultViewProps> = ({
  data,
  onReset,
  ui,
  lang,
}) => {
  const detailLabels = {
    en: {
      pose: "Pose",
      exercise: "Exercise",
      duration: "Duration",
      focus: "Best For",
      cue: "Practice Cue",
      poseGuide: "Pose Guide",
      preview: "Pose Preview",
      steps: "How To Perform",
      aiTitle: "AI Disease Details",
      aiTag: "Groq AI Based",
      aiNote:
        "These points are generated from the Groq API analysis of the symptoms you entered.",
    },
    hi: {
      pose: "Pose",
      exercise: "Exercise",
      duration: "Duration",
      focus: "Best For",
      cue: "Practice Cue",
      poseGuide: "Pose Guide",
      preview: "Pose Preview",
      steps: "How To Perform",
      aiTitle: "AI Disease Details",
      aiTag: "Groq AI Based",
      aiNote:
        "These points are generated from the Groq API analysis of the symptoms you entered.",
    },
    gu: {
      pose: "Pose",
      exercise: "Exercise",
      duration: "Duration",
      focus: "Best For",
      cue: "Practice Cue",
      poseGuide: "Pose Guide",
      preview: "Pose Preview",
      steps: "How To Perform",
      aiTitle: "AI Disease Details",
      aiTag: "Groq AI Based",
      aiNote:
        "These points are generated from the Groq API analysis of the symptoms you entered.",
    },
  }[lang];

  const urgencyConfig = {
    Low: {
      bg: "bg-[#ECFDF5]",
      text: "text-[#10B981]",
      border: "border border-[#A7F3D0]",
      glow: "shadow-[0_12px_28px_rgba(16,185,129,0.10)]",
    },
    Moderate: {
      bg: "bg-[#F0FDFA]",
      text: "text-[#14B8A6]",
      border: "border border-[#99F6E4]",
      glow: "shadow-[0_12px_28px_rgba(20,184,166,0.10)]",
    },
    High: {
      bg: "bg-[#0F172A]",
      text: "text-white",
      border: "border border-[#0F172A]",
      glow: "shadow-[0_12px_28px_rgba(15,23,42,0.18)]",
    },
  }[data.urgency];

  const poseDetails = data.yogaAndExercise.yogaPoses.map(
    (item) =>
      findWellnessItem(lang, "poses", item) || {
        name: item,
        desc: item,
        benefit: ui.resultYoga,
        duration: "5-10 minutes",
        bestFor: ui.resultRecovery,
        cue: ui.exercisePageDesc,
        poseType: "seated-breath" as PoseType,
        steps: [
          "Find a stable and comfortable starting position.",
          "Move into the pose slowly without forcing the body.",
          "Breathe evenly and stop if discomfort increases.",
        ],
      }
  );

  const exerciseDetails = data.yogaAndExercise.exercises.map(
    (item) =>
      findWellnessItem(lang, "exercises", item) || {
        name: item,
        desc: item,
        benefit: ui.resultExercises,
        duration: "5-10 minutes",
        bestFor: ui.resultRecovery,
        cue: ui.exercisePageDesc,
      }
  );

  const aiInsights = (data.aiInsights || [])
    .map((item) => item.trim())
    .filter(Boolean)
    .slice(0, 4);

  return (
    <section
      className="animate-in fade-in slide-in-from-bottom-5 space-y-5 duration-700 sm:space-y-7"
      style={{ fontFamily: '"Times New Roman", Times, serif' }}
    >
      <div className="relative overflow-hidden rounded-[2rem] border border-[#E2E8F0] bg-white/95 shadow-[0_25px_80px_rgba(15,23,42,0.08)] sm:rounded-[2.5rem]">
        <div className="absolute -right-20 -top-20 h-64 w-64 rounded-full bg-[#14B8A6]/12 blur-3xl" />
        <div className="absolute -bottom-20 -left-20 h-64 w-64 rounded-full bg-[#10B981]/10 blur-3xl" />

        <div className="relative z-10 flex flex-col gap-6 p-5 sm:gap-8 sm:p-7 md:flex-row md:items-start md:p-10">
          <div className="flex-1">
            <div className="mb-5 flex flex-wrap items-center gap-2 sm:gap-3">
              <span
                className={`rounded-2xl px-4 py-2 text-[12px] font-black uppercase tracking-[0.18em] ${urgencyConfig.bg} ${urgencyConfig.text} ${urgencyConfig.border} ${urgencyConfig.glow}`}
              >
                {ui.urgencyLabels[data.urgency]} {ui.resultPriority}
              </span>

              <div className="w-full rounded-2xl border border-[#E2E8F0] bg-[#F8FAFC] px-4 py-2 shadow-sm sm:w-auto">
                <span className="text-[13px] font-bold uppercase tracking-wide text-[#64748B]">
                  {ui.resultConfidence}
                </span>

                <span className="ml-2 text-[16px] font-black text-[#0F172A]">
                  {Math.round(data.confidence)}%
                </span>
              </div>
            </div>

            <h2 className="text-[34px] font-bold leading-tight tracking-tight text-[#0F172A] sm:text-[40px] md:text-[50px]">
              {data.disease}
            </h2>

            <p className="mt-5 max-w-3xl text-[18px] leading-9 text-[#64748B] sm:text-[20px] sm:leading-10">
              {data.description}
            </p>

            {data.symptoms && data.symptoms.length > 0 && (
              <div className="mt-8">
                <p className="mb-4 text-[12px] font-black uppercase tracking-[0.2em] text-[#64748B]">
                  {ui.resultSymptoms}
                </p>

                <div className="flex flex-wrap gap-3">
                  {data.symptoms.map((s, idx) => (
                    <span
                      key={idx}
                      className="rounded-full border border-[#E2E8F0] bg-[#F8FAFC] px-4 py-2 text-[13px] font-bold text-[#64748B] shadow-sm transition-all duration-300 hover:border-[#99F6E4] hover:bg-[#F0FDFA] hover:text-[#14B8A6] sm:text-[14px]"
                    >
                      {s}
                    </span>
                  ))}
                </div>
              </div>
            )}
          </div>

          <button
            onClick={onReset}
            className="group flex w-full items-center justify-center gap-3 rounded-[1.3rem] bg-gradient-to-r from-[#14B8A6] to-[#10B981] px-6 py-4 text-[16px] font-bold text-white shadow-[0_15px_40px_rgba(20,184,166,0.24)] transition-all duration-300 hover:-translate-y-1 hover:shadow-[0_20px_50px_rgba(20,184,166,0.28)] active:scale-[0.98] sm:w-auto sm:self-start"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="19"
              height="19"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2.8"
              strokeLinecap="round"
              strokeLinejoin="round"
              className="transition-transform duration-300 group-hover:rotate-180"
            >
              <path d="M3 12a9 9 0 1 0 9-9 9.75 9.75 0 0 0-6.74 2.74L3 8" />
              <path d="M3 3v5h5" />
            </svg>

            {ui.resultReset}
          </button>
        </div>
      </div>

      <div className="grid gap-6 lg:grid-cols-2">
        {aiInsights.length > 0 && (
          <div className="group rounded-[1.6rem] border border-[#99F6E4] bg-white/95 p-5 shadow-[0_15px_45px_rgba(15,23,42,0.05)] transition-all duration-300 hover:-translate-y-1 hover:border-[#14B8A6]/30 hover:shadow-[0_25px_70px_rgba(20,184,166,0.10)] sm:rounded-[2rem] sm:p-7 md:p-9 lg:col-span-2">
            <div className="mb-6 flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between">
              <div className="flex items-center gap-3 sm:gap-4">
                <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-[#F0FDFA] text-[#14B8A6] shadow-sm sm:h-14 sm:w-14">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="26"
                    height="26"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2.4"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  >
                    <path d="M12 3l7 4v5c0 5-3.5 8-7 9-3.5-1-7-4-7-9V7l7-4z" />
                    <path d="M9.5 12.5 11 14l3.5-4" />
                  </svg>
                </div>

                <div>
                  <h3 className="text-[27px] font-bold text-[#0F172A] sm:text-[32px]">
                    {detailLabels.aiTitle}
                  </h3>
                  <p className="mt-2 text-[16px] leading-8 text-[#64748B] sm:text-[17px]">
                    {detailLabels.aiNote}
                  </p>
                </div>
              </div>

              <span className="rounded-full border border-[#99F6E4] bg-[#F0FDFA] px-4 py-1.5 text-[12px] font-bold uppercase tracking-[0.18em] text-[#14B8A6]">
                {detailLabels.aiTag}
              </span>
            </div>

            <div className="grid gap-4 md:grid-cols-2">
              {aiInsights.map((item, idx) => (
                <div
                  key={idx}
                  className="rounded-[1.4rem] border border-[#CCFBF1] bg-[#F8FAFC] p-4 shadow-sm"
                >
                  <div className="flex items-start gap-3">
                    <span className="mt-0.5 flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-[#F0FDFA] text-[14px] font-black text-[#14B8A6]">
                      {idx + 1}
                    </span>

                    <p className="text-[16px] leading-8 text-[#0F172A] sm:text-[17px]">
                      {item}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        <div className="group rounded-[1.6rem] border border-[#E2E8F0] bg-white/95 p-5 shadow-[0_15px_45px_rgba(15,23,42,0.05)] transition-all duration-300 hover:-translate-y-1 hover:border-[#10B981]/30 hover:shadow-[0_25px_70px_rgba(16,185,129,0.10)] sm:rounded-[2rem] sm:p-7 md:p-9">
          <div className="mb-6 flex items-center gap-3 sm:mb-8 sm:gap-4">
            <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-[#ECFDF5] text-[#10B981] shadow-sm sm:h-14 sm:w-14">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="26"
                height="26"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2.5"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <path d="M11 2a2 2 0 0 0-2 2v5H4a2 2 0 0 0-2 2v2c0 1.1.9 2 2 2h5v5c0 1.1.9 2 2 2h2a2 2 0 0 0 2-2v-5h5a2 2 0 0 0 2-2v-2a2 2 0 0 0-2-2h-5V4a2 2 0 0 0-2-2h-2z" />
              </svg>
            </div>

            <h3 className="text-[27px] font-bold text-[#0F172A] sm:text-[32px]">
              {ui.resultRemedies}
            </h3>
          </div>

          <ul className="space-y-4">
            {data.homeRemedies.map((remedy, idx) => (
              <li
                key={idx}
                className="flex gap-4 rounded-2xl border border-[#A7F3D0] bg-[#ECFDF5] p-4 text-[17px] font-semibold leading-8 text-[#0F172A] transition-all duration-300 hover:bg-[#F0FDF4] sm:text-[18px] sm:leading-9"
              >
                <span className="mt-2 h-2.5 w-2.5 shrink-0 rounded-full bg-[#10B981]" />
                {remedy}
              </li>
            ))}
          </ul>
        </div>

        <div className="group rounded-[1.6rem] border border-[#E2E8F0] bg-white/95 p-5 shadow-[0_15px_45px_rgba(15,23,42,0.05)] transition-all duration-300 hover:-translate-y-1 hover:border-[#14B8A6]/30 hover:shadow-[0_25px_70px_rgba(20,184,166,0.10)] sm:rounded-[2rem] sm:p-7 md:p-9">
          <div className="mb-6 flex items-center gap-3 sm:mb-8 sm:gap-4">
            <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-[#F0FDFA] text-[#14B8A6] shadow-sm sm:h-14 sm:w-14">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="26"
                height="26"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2.5"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <path d="M12 2a10 10 0 1 0 10 10A10 10 0 0 0 12 2z" />
                <path d="M12 7v5l3 3" />
              </svg>
            </div>

            <h3 className="text-[27px] font-bold text-[#0F172A] sm:text-[32px]">
              {ui.resultYoga}
            </h3>
          </div>

          <div className="space-y-7">
            <div>
              <div className="mb-4 flex flex-wrap items-center gap-2">
                <p className="text-[12px] font-black uppercase tracking-[0.2em] text-[#64748B]">
                  {ui.resultYogaPoses}
                </p>

                <span className="rounded-full border border-[#99F6E4] bg-[#F0FDFA] px-3 py-1 text-[11px] font-bold uppercase tracking-[0.16em] text-[#14B8A6]">
                  {detailLabels.poseGuide}
                </span>
              </div>

              <div className="grid gap-3">
                {poseDetails.map((item, idx) => (
                  <div
                    key={idx}
                    className="rounded-[1.4rem] border border-[#99F6E4] bg-[#F0FDFA] p-4 shadow-sm"
                  >
                    <div className="mb-2 flex flex-wrap items-center gap-2">
                      <span className="rounded-full border border-[#99F6E4] bg-white px-3 py-1 text-[11px] font-bold uppercase tracking-[0.16em] text-[#14B8A6]">
                        {detailLabels.pose}
                      </span>

                      <span className="rounded-full border border-[#E2E8F0] bg-white px-3 py-1 text-[11px] font-bold uppercase tracking-[0.16em] text-[#64748B]">
                        {item.benefit}
                      </span>
                    </div>

                    <h5 className="text-[18px] font-bold text-[#0F172A]">
                      {item.name}
                    </h5>

                    <div className="mt-4 overflow-hidden rounded-[1.4rem] border border-[#CCFBF1] bg-[radial-gradient(circle_at_top,_rgba(20,184,166,0.14),_rgba(255,255,255,0.98)_62%)] p-4">
                      <div className="mb-3 flex items-center justify-between gap-3">
                        <p className="text-[11px] font-bold uppercase tracking-[0.16em] text-[#14B8A6]">
                          {detailLabels.preview}
                        </p>

                        <span className="rounded-full border border-[#99F6E4] bg-white px-3 py-1 text-[10px] font-bold uppercase tracking-[0.14em] text-[#14B8A6]">
                          {detailLabels.pose}
                        </span>
                      </div>

                      <div className="flex items-center justify-center rounded-[1.2rem] border border-white/90 bg-white/85 py-3 text-[#14B8A6] shadow-sm">
                        {renderPoseSticker(item.poseType)}
                      </div>
                    </div>

                    <p className="mt-4 text-[16px] leading-7 text-[#64748B]">
                      {item.desc}
                    </p>

                    <div className="mt-4 grid gap-3 sm:grid-cols-2">
                      <div className="rounded-2xl border border-[#CCFBF1] bg-white p-3">
                        <p className="text-[11px] font-bold uppercase tracking-[0.16em] text-[#64748B]">
                          {detailLabels.duration}
                        </p>
                        <p className="mt-2 text-[15px] font-semibold leading-7 text-[#0F172A]">
                          {item.duration}
                        </p>
                      </div>

                      <div className="rounded-2xl border border-[#CCFBF1] bg-white p-3">
                        <p className="text-[11px] font-bold uppercase tracking-[0.16em] text-[#64748B]">
                          {detailLabels.focus}
                        </p>
                        <p className="mt-2 text-[15px] font-semibold leading-7 text-[#0F172A]">
                          {item.bestFor}
                        </p>
                      </div>
                    </div>

                    <div className="mt-3 rounded-2xl border border-[#99F6E4] bg-white p-3">
                      <p className="text-[11px] font-bold uppercase tracking-[0.16em] text-[#14B8A6]">
                        {detailLabels.cue}
                      </p>
                      <p className="mt-2 text-[15px] leading-7 text-[#0F172A]">
                        {item.cue}
                      </p>
                    </div>

                    {item.steps && item.steps.length > 0 && (
                      <div className="mt-3 rounded-2xl border border-[#CCFBF1] bg-white p-3">
                        <p className="text-[11px] font-bold uppercase tracking-[0.16em] text-[#64748B]">
                          {detailLabels.steps}
                        </p>

                        <div className="mt-3 space-y-3">
                          {item.steps.map((step, stepIndex) => (
                            <div
                              key={step}
                              className="flex gap-3 rounded-2xl border border-[#E2E8F0] bg-[#F8FAFC] p-3"
                            >
                              <span className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-[#F0FDFA] text-[13px] font-black text-[#14B8A6]">
                                {stepIndex + 1}
                              </span>

                              <p className="text-[15px] leading-6 text-[#0F172A]">
                                {step}
                              </p>
                            </div>
                          ))}
                        </div>
                      </div>
                    )}
                  </div>
                ))}
              </div>
            </div>

            <div>
              <p className="mb-4 text-[12px] font-black uppercase tracking-[0.2em] text-[#64748B]">
                {ui.resultExercises}
              </p>

              <div className="space-y-3">
                {exerciseDetails.map((item, idx) => (
                  <div
                    key={idx}
                    className="rounded-[1.25rem] border border-[#E2E8F0] bg-[#F8FAFC] p-4"
                  >
                    <div className="mb-2 flex flex-wrap items-center gap-2">
                      <span className="rounded-full border border-[#A7F3D0] bg-white px-3 py-1 text-[11px] font-bold uppercase tracking-[0.16em] text-[#10B981]">
                        {detailLabels.exercise}
                      </span>

                      <span className="rounded-full border border-[#E2E8F0] bg-white px-3 py-1 text-[11px] font-bold uppercase tracking-[0.16em] text-[#64748B]">
                        {item.benefit}
                      </span>
                    </div>

                    <h5 className="text-[18px] font-bold text-[#0F172A]">
                      {item.name}
                    </h5>

                    <p className="mt-2 text-[16px] leading-7 text-[#64748B]">
                      {item.desc}
                    </p>

                    <div className="mt-4 grid gap-3 sm:grid-cols-2">
                      <div className="rounded-2xl border border-[#E2E8F0] bg-white p-3">
                        <p className="text-[11px] font-bold uppercase tracking-[0.16em] text-[#64748B]">
                          {detailLabels.duration}
                        </p>
                        <p className="mt-2 text-[15px] font-semibold leading-7 text-[#0F172A]">
                          {item.duration}
                        </p>
                      </div>

                      <div className="rounded-2xl border border-[#E2E8F0] bg-white p-3">
                        <p className="text-[11px] font-bold uppercase tracking-[0.16em] text-[#64748B]">
                          {detailLabels.focus}
                        </p>
                        <p className="mt-2 text-[15px] font-semibold leading-7 text-[#0F172A]">
                          {item.bestFor}
                        </p>
                      </div>
                    </div>

                    <div className="mt-3 rounded-2xl border border-[#A7F3D0] bg-white p-3">
                      <p className="text-[11px] font-bold uppercase tracking-[0.16em] text-[#10B981]">
                        {detailLabels.cue}
                      </p>
                      <p className="mt-2 text-[15px] leading-7 text-[#0F172A]">
                        {item.cue}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="overflow-hidden rounded-[2rem] border border-[#E2E8F0] bg-white/95 shadow-[0_20px_60px_rgba(15,23,42,0.06)] sm:rounded-[2.5rem]">
        <div className="border-b border-[#E2E8F0] bg-[#F8FAFC] px-5 py-5 sm:px-8 sm:py-7 md:px-10">
          <h3 className="text-[27px] font-bold text-[#0F172A] sm:text-[34px]">
            {ui.resultRecovery}
          </h3>
        </div>

        <div className="divide-y divide-[#E2E8F0]">
          <div className="flex flex-col gap-4 px-5 py-6 sm:gap-5 sm:px-8 sm:py-8 md:flex-row md:px-10">
            <div className="w-full shrink-0 text-[12px] font-black uppercase tracking-[0.2em] text-[#64748B] md:w-40">
              {ui.resultRest}
            </div>

            <div className="flex-1 text-[18px] font-bold leading-8 text-[#0F172A] sm:text-[20px] sm:leading-9">
              {data.recoveryPlan.rest}
            </div>
          </div>

          <div className="flex flex-col gap-4 px-5 py-6 sm:gap-5 sm:px-8 sm:py-8 md:flex-row md:px-10">
            <div className="w-full shrink-0 text-[12px] font-black uppercase tracking-[0.2em] text-[#64748B] md:w-40">
              {ui.resultDiet}
            </div>

            <div className="flex flex-wrap gap-3">
              {data.recoveryPlan.diet.map((item, idx) => (
                <span
                  key={idx}
                  className="rounded-2xl bg-[#ECFDF5] px-4 py-2 text-[16px] font-bold text-[#10B981] shadow-sm"
                >
                  {item}
                </span>
              ))}
            </div>
          </div>

          <div className="grid gap-6 px-5 py-6 sm:gap-10 sm:px-8 sm:py-8 md:grid-cols-2 md:px-10">
            <div>
              <div className="mb-6 text-[12px] font-black uppercase tracking-[0.2em] text-[#10B981]">
                {ui.resultDos}
              </div>

              <ul className="space-y-4">
                {data.recoveryPlan.dos.map((item, idx) => (
                  <li
                    key={idx}
                    className="flex gap-4 rounded-2xl border border-[#A7F3D0] bg-[#ECFDF5] p-4 text-[17px] font-bold leading-8 text-[#0F172A]"
                  >
                    <svg
                      className="mt-0.5 h-5 w-5 shrink-0 text-[#10B981]"
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

                    {item}
                  </li>
                ))}
              </ul>
            </div>

            <div>
              <div className="mb-6 text-[12px] font-black uppercase tracking-[0.2em] text-[#14B8A6]">
                {ui.resultDonts}
              </div>

              <ul className="space-y-4">
                {data.recoveryPlan.donts.map((item, idx) => (
                  <li
                    key={idx}
                    className="flex gap-4 rounded-2xl border border-[#99F6E4] bg-[#F0FDFA] p-4 text-[17px] font-bold leading-8 text-[#0F172A]"
                  >
                    <svg
                      className="mt-0.5 h-5 w-5 shrink-0 text-[#14B8A6]"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                      strokeWidth="3"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M6 18L18 6M6 6l12 12"
                      />
                    </svg>

                    {item}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </div>

      <div className="rounded-[1.6rem] border border-[#99F6E4] bg-[#F0FDFA] p-5 shadow-[0_15px_50px_rgba(20,184,166,0.08)] sm:rounded-[2rem] sm:p-7 md:p-9">
        <div className="flex flex-col gap-4 sm:flex-row sm:gap-5">
          <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl bg-white text-[#14B8A6] shadow-sm sm:h-14 sm:w-14">
            <svg
              className="h-7 w-7"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              strokeWidth="2.5"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z"
              />
            </svg>
          </div>

          <div>
            <h4 className="mb-3 text-[25px] font-bold text-[#0F172A] sm:text-[27px]">
              {ui.resultDisclaimer}
            </h4>

            <p className="text-[17px] font-semibold italic leading-8 text-[#64748B] sm:text-[18px] sm:leading-9">
              {data.disclaimer}
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ResultView;

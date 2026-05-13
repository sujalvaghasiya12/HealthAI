<<<<<<< HEAD
import React from "react";
import { Language, UIStrings } from "../types";
import { getWellnessContent, PoseType } from "./wellnessContent";

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
          className="h-24 w-24"
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
          className="h-24 w-24"
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
          className="h-24 w-24"
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
          className="h-24 w-24"
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
          className="h-24 w-24"
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
          className="h-24 w-24"
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
          className="h-24 w-24"
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

const ExercisesView: React.FC<{
  ui: UIStrings;
  lang: Language;
}> = ({ ui, lang }) => {
  const wellness = getWellnessContent(lang);
  const labels = {
    en: {
      showPoses: "Show Poses",
      pose: "Pose",
      exercise: "Exercise",
      dailySupport: "Daily Support",
      focus: "Best For",
      duration: "Duration",
      cue: "Practice Cue",
      preview: "Pose Preview",
      steps: "How To Perform",
      routineTitle: "Suggested Routine",
      routineDesc:
        "A gentle order to follow when you want a calm recovery-focused session.",
      routineStep1: "Begin with deep breathing to settle the body.",
      routineStep2: "Move into one or two yoga poses without strain.",
      routineStep3: "Finish with a short walk or full relaxation.",
      stat1: "Recovery Friendly",
      stat2: "Low Impact",
      stat3: "Breath Led",
    },
    hi: {
      showPoses: "Show Poses",
      pose: "Pose",
      exercise: "Exercise",
      dailySupport: "Daily Support",
      focus: "Best For",
      duration: "Duration",
      cue: "Practice Cue",
      preview: "Pose Preview",
      steps: "How To Perform",
      routineTitle: "Suggested Routine",
      routineDesc:
        "A gentle order to follow when you want a calm recovery-focused session.",
      routineStep1: "Begin with deep breathing to settle the body.",
      routineStep2: "Move into one or two yoga poses without strain.",
      routineStep3: "Finish with a short walk or full relaxation.",
      stat1: "Recovery Friendly",
      stat2: "Low Impact",
      stat3: "Breath Led",
    },
    gu: {
      showPoses: "Show Poses",
      pose: "Pose",
      exercise: "Exercise",
      dailySupport: "Daily Support",
      focus: "Best For",
      duration: "Duration",
      cue: "Practice Cue",
      preview: "Pose Preview",
      steps: "How To Perform",
      routineTitle: "Suggested Routine",
      routineDesc:
        "A gentle order to follow when you want a calm recovery-focused session.",
      routineStep1: "Begin with deep breathing to settle the body.",
      routineStep2: "Move into one or two yoga poses without strain.",
      routineStep3: "Finish with a short walk or full relaxation.",
      stat1: "Recovery Friendly",
      stat2: "Low Impact",
      stat3: "Breath Led",
    },
  }[lang];

  return (
    <section
      className="animate-in fade-in slide-in-from-bottom-4 space-y-8 duration-700"
      style={{ fontFamily: "Calibri, Arial, sans-serif" }}
    >
      <div className="relative overflow-hidden rounded-[1.6rem] border border-[#E2E8F0] bg-white px-5 py-6 shadow-[0_20px_60px_rgba(15,23,42,0.08)] sm:rounded-[2rem] sm:px-7 sm:py-8 md:px-10 md:py-11">
        <div className="absolute -right-16 -top-16 h-56 w-56 rounded-full bg-[#14B8A6]/12 blur-2xl" />
        <div className="absolute -bottom-20 -left-16 h-52 w-52 rounded-full bg-[#10B981]/10 blur-3xl" />

        <div className="relative z-10 max-w-3xl">
          <span className="mb-4 inline-flex rounded-full border border-[#99F6E4] bg-[#F0FDFA] px-3.5 py-1.5 text-[13px] font-bold tracking-wide text-[#14B8A6] sm:px-4 sm:text-[14px]">
            Yoga & Recovery
          </span>

          <h2 className="text-[30px] font-bold leading-tight text-[#0F172A] sm:text-[32px] md:text-[42px]">
            {ui.exercisePageTitle}
          </h2>

          <p className="mt-4 max-w-2xl text-[16px] leading-7 text-[#64748B] sm:text-[18px] sm:leading-8">
=======

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
>>>>>>> 0cf126cafec8e3b33b1466dcc1055144f7316f8f
            {ui.exercisePageDesc}
          </p>
        </div>
      </div>

<<<<<<< HEAD
      <div className="grid gap-4 sm:grid-cols-3">
        {[labels.stat1, labels.stat2, labels.stat3].map(
          (item, index) => (
            <div
              key={index}
              className="rounded-[1.4rem] border border-[#E2E8F0] bg-white px-5 py-4 shadow-sm"
            >
              <p className="text-[12px] font-bold uppercase tracking-[0.18em] text-[#64748B]">
                {index + 1}
              </p>
              <p className="mt-2 text-[19px] font-bold text-[#0F172A]">
                {item}
              </p>
            </div>
          )
        )}
      </div>

      <div className="space-y-5">
        <div className="flex items-center justify-between gap-3">
          <h3 className="text-[23px] font-bold text-[#0F172A] sm:text-[26px]">
            {ui.resultYogaPoses}
          </h3>

          <span className="rounded-full border border-[#99F6E4] bg-[#F0FDFA] px-4 py-1.5 text-[12px] font-bold uppercase tracking-[0.18em] text-[#14B8A6]">
            {labels.showPoses}
          </span>
        </div>

        <div className="grid gap-5 lg:grid-cols-2">
          {wellness.poses.map((yoga, i) => (
            <div
              key={i}
              className="group relative overflow-hidden rounded-[1.5rem] border border-[#E2E8F0] bg-white p-5 shadow-[0_10px_35px_rgba(15,23,42,0.06)] transition-all duration-300 ease-out hover:-translate-y-1 hover:border-[#14B8A6]/30 hover:shadow-[0_24px_70px_rgba(20,184,166,0.12)] sm:rounded-[1.8rem] sm:p-7"
              style={{ animationDelay: `${i * 80}ms` }}
            >
              <div className="absolute inset-x-0 top-0 h-1 bg-gradient-to-r from-[#14B8A6] to-[#10B981] opacity-0 transition-opacity duration-300 group-hover:opacity-100" />

              <div className="mb-6 flex flex-col items-start gap-4 sm:flex-row sm:justify-between">
                <div className="flex flex-wrap gap-2">
                  <span className="rounded-full border border-[#99F6E4] bg-[#F0FDFA] px-4 py-1.5 text-[12px] font-bold uppercase tracking-[0.18em] text-[#14B8A6] transition-all duration-300 group-hover:bg-[#14B8A6] group-hover:text-white">
                    {yoga.benefit}
                  </span>

                  <span className="rounded-full border border-[#E2E8F0] bg-white px-4 py-1.5 text-[12px] font-bold uppercase tracking-[0.18em] text-[#64748B]">
                    {labels.pose}
                  </span>
                </div>

                <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-[#F0FDFA] text-[#14B8A6] transition-all duration-300 group-hover:scale-110 group-hover:bg-[#14B8A6] group-hover:text-white group-hover:shadow-[0_16px_34px_rgba(20,184,166,0.20)]">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="23"
                    height="23"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2.4"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  >
                    <circle cx="12" cy="12" r="10" />
                    <path d="m9 12 2 2 4-4" />
                  </svg>
                </div>
              </div>

              <h3 className="mb-3 text-[23px] font-bold leading-snug text-[#0F172A] transition-colors duration-300 group-hover:text-[#14B8A6] sm:text-[25px]">
                {yoga.name}
              </h3>

              <div className="mb-5 overflow-hidden rounded-[1.6rem] border border-[#CCFBF1] bg-[radial-gradient(circle_at_top,_rgba(20,184,166,0.14),_rgba(255,255,255,0.98)_62%)] p-4">
                <div className="mb-3 flex items-center justify-between gap-3">
                  <p className="text-[12px] font-bold uppercase tracking-[0.16em] text-[#14B8A6]">
                    {labels.preview}
                  </p>

                  <span className="rounded-full border border-[#99F6E4] bg-white px-3 py-1 text-[11px] font-bold uppercase tracking-[0.14em] text-[#14B8A6]">
                    {labels.pose}
                  </span>
                </div>

                <div className="flex items-center justify-center rounded-[1.3rem] border border-white/80 bg-white/80 py-3 text-[#14B8A6] shadow-sm">
                  {renderPoseSticker(yoga.poseType)}
                </div>
              </div>

              <p className="text-[16px] leading-7 text-[#64748B] sm:text-[17px] sm:leading-8">
                {yoga.desc}
              </p>

              <div className="mt-5 grid gap-3 sm:grid-cols-2">
                <div className="rounded-2xl border border-[#E2E8F0] bg-[#F8FAFC] p-4">
                  <p className="text-[12px] font-bold uppercase tracking-[0.16em] text-[#64748B]">
                    {labels.duration}
                  </p>
                  <p className="mt-2 text-[15px] font-semibold text-[#0F172A]">
                    {yoga.duration}
                  </p>
                </div>

                <div className="rounded-2xl border border-[#E2E8F0] bg-[#F8FAFC] p-4">
                  <p className="text-[12px] font-bold uppercase tracking-[0.16em] text-[#64748B]">
                    {labels.focus}
                  </p>
                  <p className="mt-2 text-[15px] font-semibold text-[#0F172A]">
                    {yoga.bestFor}
                  </p>
                </div>
              </div>

              <div className="mt-3 rounded-2xl border border-[#99F6E4] bg-[#F0FDFA] p-4">
                <p className="text-[12px] font-bold uppercase tracking-[0.16em] text-[#14B8A6]">
                  {labels.cue}
                </p>
                <p className="mt-2 text-[15px] leading-6 text-[#0F172A]">
                  {yoga.cue}
                </p>
              </div>

              {yoga.steps && yoga.steps.length > 0 && (
                <div className="mt-3 rounded-2xl border border-[#E2E8F0] bg-[#F8FAFC] p-4">
                  <p className="text-[12px] font-bold uppercase tracking-[0.16em] text-[#64748B]">
                    {labels.steps}
                  </p>

                  <div className="mt-3 space-y-3">
                    {yoga.steps.map((step, stepIndex) => (
                      <div
                        key={step}
                        className="flex gap-3 rounded-2xl border border-[#E2E8F0] bg-white p-3"
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

      <div className="space-y-5">
        <div className="flex items-center justify-between gap-3">
          <h3 className="text-[23px] font-bold text-[#0F172A] sm:text-[26px]">
            {ui.resultExercises}
          </h3>

          <span className="rounded-full border border-[#A7F3D0] bg-[#ECFDF5] px-4 py-1.5 text-[12px] font-bold uppercase tracking-[0.18em] text-[#10B981]">
            {labels.dailySupport}
          </span>
        </div>

        <div className="grid gap-5 lg:grid-cols-2">
          {wellness.exercises.map((exercise, i) => (
            <div
              key={i}
              className="group relative overflow-hidden rounded-[1.5rem] border border-[#E2E8F0] bg-white p-5 shadow-[0_10px_35px_rgba(15,23,42,0.06)] transition-all duration-300 ease-out hover:-translate-y-1 hover:border-[#10B981]/30 hover:shadow-[0_24px_70px_rgba(16,185,129,0.10)] sm:rounded-[1.8rem] sm:p-7"
            >
              <div className="absolute inset-x-0 top-0 h-1 bg-gradient-to-r from-[#10B981] to-[#14B8A6] opacity-0 transition-opacity duration-300 group-hover:opacity-100" />

              <div className="mb-6 flex flex-col items-start gap-4 sm:flex-row sm:justify-between">
                <div className="flex flex-wrap gap-2">
                  <span className="rounded-full border border-[#A7F3D0] bg-[#ECFDF5] px-4 py-1.5 text-[12px] font-bold uppercase tracking-[0.18em] text-[#10B981]">
                    {exercise.benefit}
                  </span>

                  <span className="rounded-full border border-[#E2E8F0] bg-white px-4 py-1.5 text-[12px] font-bold uppercase tracking-[0.18em] text-[#64748B]">
                    {labels.exercise}
                  </span>
                </div>

                <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-[#ECFDF5] text-[#10B981] transition-all duration-300 group-hover:scale-110 group-hover:bg-[#10B981] group-hover:text-white group-hover:shadow-[0_16px_34px_rgba(16,185,129,0.18)]">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="23"
                    height="23"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2.4"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  >
                    <path d="M6 12h12" />
                    <path d="M12 6v12" />
                  </svg>
                </div>
              </div>

              <h3 className="mb-3 text-[23px] font-bold leading-snug text-[#0F172A] transition-colors duration-300 group-hover:text-[#10B981] sm:text-[25px]">
                {exercise.name}
              </h3>

              <p className="text-[16px] leading-7 text-[#64748B] sm:text-[17px] sm:leading-8">
                {exercise.desc}
              </p>

              <div className="mt-5 grid gap-3 sm:grid-cols-2">
                <div className="rounded-2xl border border-[#E2E8F0] bg-[#F8FAFC] p-4">
                  <p className="text-[12px] font-bold uppercase tracking-[0.16em] text-[#64748B]">
                    {labels.duration}
                  </p>
                  <p className="mt-2 text-[15px] font-semibold text-[#0F172A]">
                    {exercise.duration}
                  </p>
                </div>

                <div className="rounded-2xl border border-[#E2E8F0] bg-[#F8FAFC] p-4">
                  <p className="text-[12px] font-bold uppercase tracking-[0.16em] text-[#64748B]">
                    {labels.focus}
                  </p>
                  <p className="mt-2 text-[15px] font-semibold text-[#0F172A]">
                    {exercise.bestFor}
                  </p>
                </div>
              </div>

              <div className="mt-3 rounded-2xl border border-[#A7F3D0] bg-[#ECFDF5] p-4">
                <p className="text-[12px] font-bold uppercase tracking-[0.16em] text-[#10B981]">
                  {labels.cue}
                </p>
                <p className="mt-2 text-[15px] leading-6 text-[#0F172A]">
                  {exercise.cue}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>

      <div className="rounded-[1.8rem] border border-[#E2E8F0] bg-white p-5 shadow-[0_16px_45px_rgba(15,23,42,0.05)] sm:p-7 md:p-8">
        <h4 className="text-[23px] font-bold text-[#0F172A] sm:text-[26px]">
          {labels.routineTitle}
        </h4>
        <p className="mt-3 max-w-3xl text-[16px] leading-7 text-[#64748B] sm:text-[17px]">
          {labels.routineDesc}
        </p>

        <div className="mt-6 grid gap-4 md:grid-cols-3">
          {[labels.routineStep1, labels.routineStep2, labels.routineStep3].map(
            (item, index) => (
              <div
                key={index}
                className="rounded-[1.4rem] border border-[#E2E8F0] bg-[#F8FAFC] p-4"
              >
                <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-[#F0FDFA] text-[15px] font-black text-[#14B8A6]">
                  {index + 1}
                </div>
                <p className="mt-3 text-[15px] leading-7 text-[#0F172A]">
                  {item}
                </p>
              </div>
            )
          )}
        </div>
      </div>

      <div className="relative overflow-hidden rounded-[1.6rem] border border-[#99F6E4] bg-[#F0FDFA] p-5 shadow-[0_18px_50px_rgba(20,184,166,0.08)] sm:rounded-[2rem] sm:p-7 md:p-9">
        <div className="absolute -right-16 -top-16 h-48 w-48 rounded-full bg-[#14B8A6]/12 blur-3xl" />

        <div className="relative z-10">
          <h4 className="mb-6 flex items-start gap-3 text-[23px] font-bold text-[#0F172A] sm:items-center sm:text-[26px]">
            <span className="flex h-11 w-11 items-center justify-center rounded-2xl bg-white text-[#14B8A6] shadow-sm sm:h-12 sm:w-12">
              <svg
                className="h-7 w-7 shrink-0"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
                strokeWidth="2.6"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z"
                />
              </svg>
            </span>
            {ui.exercisePrecautionTitle}
          </h4>

          <ul className="grid gap-4 lg:grid-cols-2">
            {ui.exercisePrecautions.map((text, idx) => (
              <li
                key={idx}
                className="flex gap-4 rounded-2xl border border-[#E2E8F0] bg-white p-4 text-[16px] font-bold text-[#0F172A] shadow-sm transition-all duration-300 hover:-translate-y-0.5 hover:border-[#14B8A6]/25 sm:text-[17px]"
              >
                <span className="mt-1 flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-[#F0FDFA] text-[14px] font-black text-[#14B8A6]">
                  {idx + 1}
                </span>
                <span className="leading-7 text-[#64748B]">{text}</span>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </section>
=======
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
>>>>>>> 0cf126cafec8e3b33b1466dcc1055144f7316f8f
  );
};

export default ExercisesView;

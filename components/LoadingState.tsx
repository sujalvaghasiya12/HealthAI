<<<<<<< HEAD
﻿import React, { useState, useEffect } from "react";
import { UIStrings } from "../types";
=======

import React, { useState, useEffect } from 'react';
import { UIStrings } from '../types';
>>>>>>> 0cf126cafec8e3b33b1466dcc1055144f7316f8f

interface LoadingStateProps {
  ui: UIStrings;
}

const LoadingState: React.FC<LoadingStateProps> = ({ ui }) => {
  const [msgIdx, setMsgIdx] = useState(0);
<<<<<<< HEAD

=======
>>>>>>> 0cf126cafec8e3b33b1466dcc1055144f7316f8f
  const messages = ui.loadingMessages;

  useEffect(() => {
    const timer = setInterval(() => {
<<<<<<< HEAD
      setMsgIdx((prev) => (prev + 1) % messages.length);
    }, 1800);

=======
      setMsgIdx(prev => (prev + 1) % messages.length);
    }, 1500);
>>>>>>> 0cf126cafec8e3b33b1466dcc1055144f7316f8f
    return () => clearInterval(timer);
  }, [messages.length]);

  return (
<<<<<<< HEAD
    <section
      className="relative overflow-hidden rounded-[2rem] border border-[#E2E8F0] bg-white/95 px-5 py-12 shadow-[0_20px_70px_rgba(15,23,42,0.08)] sm:rounded-[2.5rem] sm:px-6 sm:py-16"
      style={{ fontFamily: "Calibri, Arial, sans-serif" }}
    >
      <div className="absolute -top-20 right-0 h-56 w-56 rounded-full bg-[#14B8A6]/14 blur-3xl" />
      <div className="absolute -bottom-20 left-0 h-56 w-56 rounded-full bg-[#10B981]/12 blur-3xl" />

      <div className="relative z-10 flex flex-col items-center justify-center text-center">
        <div className="relative mb-8 flex h-24 w-24 items-center justify-center sm:h-28 sm:w-28">
          <div className="absolute inset-0 animate-pulse rounded-full bg-[#14B8A6]/14 blur-2xl" />
          <div className="absolute inset-0 rounded-full border-[6px] border-[#CCFBF1]" />
          <div className="absolute inset-0 animate-spin rounded-full border-[6px] border-transparent border-t-[#14B8A6] border-r-[#10B981] shadow-lg" />

          <div className="flex h-14 w-14 items-center justify-center rounded-full bg-gradient-to-br from-[#14B8A6] to-[#10B981] shadow-[0_10px_30px_rgba(20,184,166,0.28)] sm:h-16 sm:w-16">
            <svg
              className="h-8 w-8 text-white"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              strokeWidth="2.5"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
              />
            </svg>
          </div>
        </div>

        <div className="max-w-2xl">
          <h3 className="mb-3 text-[25px] font-bold tracking-tight text-[#0F172A] sm:text-[30px] md:text-[32px]">
            AI Health Analysis
          </h3>

          <p className="animate-in fade-in min-h-[72px] text-[17px] font-semibold leading-7 text-[#64748B] transition-all duration-500 sm:min-h-[60px] sm:text-[19px] sm:leading-8">
            {messages[msgIdx]}
          </p>

          <p className="mt-3 text-[16px] leading-7 text-[#64748B]">
            {ui.loadingSub}
          </p>
        </div>

        <div className="mt-8 flex items-center gap-2">
          <span className="h-3 w-3 animate-bounce rounded-full bg-[#14B8A6] [animation-delay:-0.3s]" />
          <span className="h-3 w-3 animate-bounce rounded-full bg-[#10B981] [animation-delay:-0.15s]" />
          <span className="h-3 w-3 animate-bounce rounded-full bg-[#14B8A6]/50" />
        </div>

        <div className="mt-10 w-full max-w-md rounded-2xl border border-[#E2E8F0] bg-[#F8FAFC] px-5 py-4 text-center shadow-sm sm:px-6">
          <p className="text-[14px] font-semibold tracking-wide text-[#64748B]">
            Secure AI-powered symptom evaluation in progress
          </p>
        </div>
      </div>
    </section>
=======
    <div className="flex flex-col items-center justify-center py-20 bg-white rounded-[3rem] border border-slate-200 shadow-sm">
      <div className="relative w-20 h-20 mb-6">
        <div className="absolute top-0 left-0 w-full h-full border-4 border-teal-100 rounded-full"></div>
        <div className="absolute top-0 left-0 w-full h-full border-4 border-teal-600 rounded-full border-t-transparent animate-spin"></div>
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2">
           <svg className="w-8 h-8 text-teal-600" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"></path></svg>
        </div>
      </div>
      <p className="text-lg font-bold text-slate-800 animate-pulse text-center px-4">{messages[msgIdx]}</p>
      <p className="text-sm text-slate-400 mt-2">{ui.loadingSub}</p>
    </div>
>>>>>>> 0cf126cafec8e3b33b1466dcc1055144f7316f8f
  );
};

export default LoadingState;
<<<<<<< HEAD

=======
>>>>>>> 0cf126cafec8e3b33b1466dcc1055144f7316f8f

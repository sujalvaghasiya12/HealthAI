import React from "react";
import { UIStrings } from "../types";

interface DisclaimerViewProps {
  ui: UIStrings;
}

const DisclaimerView: React.FC<DisclaimerViewProps> = ({
  ui,
}) => {
  const points = [
    ui.disclaimerContent1,
    ui.disclaimerContent2,
    ui.disclaimerContent3,
  ];

  return (
    <section
      className="animate-in fade-in slide-in-from-bottom-4 space-y-8 duration-700"
      style={{ fontFamily: "Calibri, Arial, sans-serif" }}
    >
      <div className="relative overflow-hidden rounded-[1.8rem] border border-[#99F6E4] bg-[#F0FDFA] px-5 py-7 shadow-[0_20px_60px_rgba(20,184,166,0.08)] sm:rounded-[2.2rem] sm:px-8 sm:py-10 md:px-10 md:py-12">
        <div className="absolute -right-16 -top-16 h-56 w-56 rounded-full bg-[#14B8A6]/14 blur-3xl" />

        <div className="relative z-10 max-w-4xl">
          <span className="mb-4 inline-flex rounded-full border border-[#99F6E4] bg-white px-4 py-1.5 text-[13px] font-bold uppercase tracking-[0.18em] text-[#14B8A6]">
            {ui.navDisclaimer}
          </span>

          <h2 className="text-[32px] font-bold leading-tight text-[#0F172A] sm:text-[38px] md:text-[46px]">
            {ui.disclaimerPageTitle}
          </h2>

          <p className="mt-5 text-[19px] font-bold uppercase tracking-[0.08em] text-[#14B8A6]">
            {ui.disclaimerWarning}
          </p>
        </div>
      </div>

      <div className="grid gap-6 lg:grid-cols-[1.05fr_0.95fr]">
        <div className="rounded-[1.8rem] border border-[#E2E8F0] bg-white p-6 shadow-[0_16px_45px_rgba(15,23,42,0.05)] sm:p-8">
          <h3 className="mb-5 text-[25px] font-bold text-[#0F172A]">
            {ui.resultDisclaimer}
          </h3>

          <div className="space-y-3">
            {points.map((point, index) => (
              <div
                key={index}
                className="flex items-start gap-3 rounded-2xl border border-[#E2E8F0] bg-[#F8FAFC] p-4"
              >
                <span className="mt-1 flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-[#F0FDFA] text-[13px] font-black text-[#14B8A6]">
                  {index + 1}
                </span>

                <span className="text-[16px] font-semibold leading-7 text-[#64748B]">
                  {point}
                </span>
              </div>
            ))}
          </div>
        </div>

        <div className="rounded-[1.8rem] border border-[#E2E8F0] bg-white p-6 shadow-[0_16px_45px_rgba(15,23,42,0.05)] sm:p-8">
          <div className="rounded-[1.6rem] border border-[#99F6E4] bg-[#F0FDFA] p-5">
            <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-2xl bg-white text-[#14B8A6] shadow-sm">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2.4"
                strokeLinecap="round"
                strokeLinejoin="round"
                className="h-6 w-6"
              >
                <path d="M12 9v4" />
                <path d="M12 17h.01" />
                <path d="M10.29 3.86 1.82 18a2 2 0 0 0 1.71 3h16.94a2 2 0 0 0 1.71-3L13.71 3.86a2 2 0 0 0-3.42 0z" />
              </svg>
            </div>

            <p className="text-[17px] font-semibold leading-8 text-[#64748B]">
              {ui.disclaimerEmergency}
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default DisclaimerView;


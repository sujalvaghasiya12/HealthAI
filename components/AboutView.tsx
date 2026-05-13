import React from "react";
import { UIStrings } from "../types";

interface AboutViewProps {
  ui: UIStrings;
}

const AboutView: React.FC<AboutViewProps> = ({ ui }) => {
  return (
    <section
      className="animate-in fade-in slide-in-from-bottom-4 space-y-8 duration-700"
      style={{ fontFamily: "Calibri, Arial, sans-serif" }}
    >
      <div className="relative overflow-hidden rounded-[1.8rem] border border-[#E2E8F0] bg-white px-5 py-7 shadow-[0_20px_60px_rgba(15,23,42,0.08)] sm:rounded-[2.2rem] sm:px-8 sm:py-10 md:px-10 md:py-12">
        <div className="absolute -right-16 -top-16 h-56 w-56 rounded-full bg-[#14B8A6]/12 blur-3xl" />
        <div className="absolute -bottom-16 -left-16 h-48 w-48 rounded-full bg-[#10B981]/10 blur-3xl" />

        <div className="relative z-10 max-w-4xl">
          <span className="mb-4 inline-flex rounded-full border border-[#99F6E4] bg-[#F0FDFA] px-4 py-1.5 text-[13px] font-bold uppercase tracking-[0.18em] text-[#14B8A6]">
            {ui.navAbout}
          </span>

          <h2 className="text-[32px] font-bold leading-tight text-[#0F172A] sm:text-[38px] md:text-[46px]">
            {ui.aboutPageTitle}
          </h2>

          <p className="mt-5 text-[17px] leading-8 text-[#64748B] sm:text-[18px]">
            {ui.aboutContent1}
          </p>

          <p className="mt-4 text-[17px] leading-8 text-[#64748B] sm:text-[18px]">
            {ui.aboutContent2}
          </p>
        </div>
      </div>

      <div className="grid gap-6 lg:grid-cols-[1.15fr_0.85fr]">
        <div className="rounded-[1.8rem] border border-[#E2E8F0] bg-white p-6 shadow-[0_16px_45px_rgba(15,23,42,0.05)] sm:p-8">
          <div className="mb-5 flex items-center gap-4">
            <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-[#F0FDFA] text-[#14B8A6]">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2.3"
                strokeLinecap="round"
                strokeLinejoin="round"
                className="h-6 w-6"
              >
                <path d="M12 2v20" />
                <path d="M2 12h20" />
              </svg>
            </div>

            <h3 className="text-[25px] font-bold text-[#0F172A]">
              {ui.aboutMissionTitle}
            </h3>
          </div>

          <p className="text-[17px] leading-8 text-[#64748B]">
            {ui.aboutMissionContent}
          </p>
        </div>

        <div className="rounded-[1.8rem] border border-[#E2E8F0] bg-white p-6 shadow-[0_16px_45px_rgba(15,23,42,0.05)] sm:p-8">
          <div className="mb-5 flex items-center gap-4">
            <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-[#ECFDF5] text-[#10B981]">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2.3"
                strokeLinecap="round"
                strokeLinejoin="round"
                className="h-6 w-6"
              >
                <path d="M12 20h9" />
                <path d="M12 4h9" />
                <path d="M4 9h16" />
                <path d="M4 15h16" />
              </svg>
            </div>

            <div>
              <h3 className="text-[23px] font-bold text-[#0F172A]">
                {ui.aboutTechTitle}
              </h3>

              <p className="text-[15px] font-semibold text-[#64748B]">
                {ui.aboutTechTitle2}
              </p>
            </div>
          </div>

          <div className="space-y-3">
            {ui.aboutTechList.map((item, index) => (
              <div
                key={index}
                className="flex items-start gap-3 rounded-2xl border border-[#E2E8F0] bg-[#F8FAFC] p-4"
              >
                <span className="mt-1 flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-[#F0FDFA] text-[13px] font-black text-[#14B8A6]">
                  {index + 1}
                </span>

                <span className="text-[16px] font-semibold leading-7 text-[#64748B]">
                  {item}
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default AboutView;


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
    </section>
  );
};

export default AboutView;


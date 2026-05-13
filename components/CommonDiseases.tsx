import React, { useEffect, useMemo, useRef, useState } from "react";
import { COMMON_DISEASES } from "../constants";
import { Language, UIStrings } from "../types";

interface CommonDiseasesProps {
  lang: Language;
  ui: UIStrings;
  onSelect: (diseaseId: string) => void;
}

const CommonDiseases: React.FC<CommonDiseasesProps> = ({
  lang,
  ui,
  onSelect,
}) => {
  const sliderRef = useRef<HTMLDivElement | null>(null);
  const [activeIndex, setActiveIndex] = useState(0);
  const totalSlides = COMMON_DISEASES.length;

  const cardWidth = useMemo(() => {
    if (typeof window === "undefined") return 320;
    if (window.innerWidth >= 1280) return 360;
    if (window.innerWidth >= 768) return 340;
    return window.innerWidth - 56;
  }, []);

  const scrollToIndex = (index: number) => {
    const container = sliderRef.current;
    if (!container) return;

    const nextIndex = Math.max(0, Math.min(index, totalSlides - 1));

    container.scrollTo({
      left: nextIndex * cardWidth,
      behavior: "smooth",
    });

    setActiveIndex(nextIndex);
  };

  const handlePrev = () => scrollToIndex(activeIndex - 1);
  const handleNext = () => scrollToIndex(activeIndex + 1);

  useEffect(() => {
    const container = sliderRef.current;
    if (!container) return;

    const handleScroll = () => {
      const nextIndex = Math.round(container.scrollLeft / cardWidth);
      setActiveIndex(
        Math.max(0, Math.min(nextIndex, totalSlides - 1))
      );
    };

    container.addEventListener("scroll", handleScroll, {
      passive: true,
    });

    return () => {
      container.removeEventListener("scroll", handleScroll);
    };
  }, [cardWidth, totalSlides]);

  return (
    <section
      className="animate-in fade-in slide-in-from-bottom-4 space-y-8 duration-700"
      style={{ fontFamily: "Calibri, Arial, sans-serif" }}
    >
      <div className="relative overflow-hidden rounded-[1.6rem] border border-[#E2E8F0] bg-white px-5 py-6 shadow-[0_20px_60px_rgba(15,23,42,0.08)] sm:rounded-[2rem] sm:px-7 sm:py-8 md:px-10 md:py-11">
        <div className="absolute right-0 top-0 h-40 w-40 rounded-full bg-[#14B8A6]/12 blur-3xl" />
        <div className="absolute bottom-0 left-0 h-32 w-32 rounded-full bg-[#10B981]/10 blur-3xl" />

        <div className="relative max-w-3xl">
          <span className="mb-4 inline-flex rounded-full border border-[#99F6E4] bg-[#F0FDFA] px-3.5 py-1.5 text-[13px] font-bold tracking-wide text-[#14B8A6] sm:px-4 sm:text-[14px]">
            Health Library
          </span>

          <h2 className="text-[30px] font-bold leading-tight text-[#0F172A] sm:text-[32px] md:text-[42px]">
            {ui.commonTitle}
          </h2>

          <p className="mt-4 max-w-2xl text-[16px] leading-7 text-[#64748B] sm:text-[18px] sm:leading-8">
            {ui.commonDesc}
          </p>
        </div>
      </div>

      <div className="space-y-5">
        <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
          <div className="flex items-center gap-3">
            <span className="rounded-full border border-[#99F6E4] bg-[#F0FDFA] px-4 py-1.5 text-[12px] font-bold uppercase tracking-[0.18em] text-[#14B8A6]">
              Slider View
            </span>

            <span className="text-[14px] font-bold text-[#64748B]">
              {activeIndex + 1} / {totalSlides}
            </span>
          </div>

          <div className="flex items-center gap-3">
            <button
              type="button"
              onClick={handlePrev}
              disabled={activeIndex === 0}
              className="flex h-11 w-11 items-center justify-center rounded-2xl border border-[#E2E8F0] bg-white text-[#0F172A] shadow-sm transition-all duration-300 hover:-translate-y-0.5 hover:border-[#14B8A6]/35 hover:bg-[#F0FDFA] hover:text-[#14B8A6] disabled:cursor-not-allowed disabled:opacity-45"
              aria-label="Previous disease"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2.4"
                strokeLinecap="round"
                strokeLinejoin="round"
                className="h-4 w-4"
              >
                <path d="m15 18-6-6 6-6" />
              </svg>
            </button>

            <button
              type="button"
              onClick={handleNext}
              disabled={activeIndex === totalSlides - 1}
              className="flex h-11 w-11 items-center justify-center rounded-2xl border border-[#E2E8F0] bg-white text-[#0F172A] shadow-sm transition-all duration-300 hover:-translate-y-0.5 hover:border-[#14B8A6]/35 hover:bg-[#F0FDFA] hover:text-[#14B8A6] disabled:cursor-not-allowed disabled:opacity-45"
              aria-label="Next disease"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2.4"
                strokeLinecap="round"
                strokeLinejoin="round"
                className="h-4 w-4"
              >
                <path d="m9 18 6-6-6-6" />
              </svg>
            </button>
          </div>
        </div>

        <div
          ref={sliderRef}
          className="flex snap-x snap-mandatory gap-5 overflow-x-auto pb-3 [scrollbar-width:none] [-ms-overflow-style:none] [&::-webkit-scrollbar]:hidden"
        >
          {COMMON_DISEASES.map((disease, index) => (
            <button
              key={disease.id}
              onClick={() => onSelect(disease.id)}
              className="group relative flex h-full min-h-[100%] w-[calc(100vw-3.5rem)] max-w-[360px] shrink-0 snap-center flex-col overflow-hidden rounded-[1.5rem] border border-[#E2E8F0] bg-white p-5 text-left shadow-[0_10px_35px_rgba(15,23,42,0.06)] transition-all duration-300 ease-out hover:-translate-y-1 hover:border-[#14B8A6]/35 hover:shadow-[0_24px_70px_rgba(20,184,166,0.12)] active:scale-[0.98] sm:w-[340px] sm:rounded-[1.8rem] sm:p-6 xl:w-[360px]"
              style={{
                animationDelay: `${index * 70}ms`,
              }}
            >
              <div className="absolute inset-x-0 top-0 h-1 bg-gradient-to-r from-[#14B8A6] to-[#10B981] opacity-0 transition-opacity duration-300 group-hover:opacity-100" />

              <div className="mb-6 flex flex-col items-start gap-4 sm:flex-row sm:justify-between">
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
                    <path d="M11 2a2 2 0 0 0-2 2v5H4a2 2 0 0 0-2 2v2c0 1.1.9 2 2 2h5v5c0 1.1.9 2 2 2h2a2 2 0 0 0 2-2v-5h5a2 2 0 0 0 2-2v-2a2 2 0 0 0-2-2h-5V4a2 2 0 0 0-2-2h-2z" />
                  </svg>
                </div>

                <span className="rounded-full bg-[#F8FAFC] px-3 py-1 text-[11px] font-bold uppercase tracking-[0.18em] text-[#64748B] transition-colors duration-300 group-hover:bg-[#F0FDFA] group-hover:text-[#14B8A6]">
                  {ui.commonStaticData}
                </span>
              </div>

              <h3 className="mb-3 text-[20px] font-bold leading-snug text-[#0F172A] transition-colors duration-300 group-hover:text-[#14B8A6] sm:text-[21px]">
                {disease.name[lang]}
              </h3>

              <p className="mb-6 flex-1 text-[16px] leading-7 text-[#64748B]">
                {disease.description[lang]}
              </p>

              <div className="mt-auto border-t border-[#E2E8F0] pt-4">
                <div className="flex flex-wrap gap-2">
                  {disease.symptoms[lang].slice(0, 4).map((symptom, idx) => (
                    <span
                      key={idx}
                      className="rounded-full border border-[#E2E8F0] bg-[#F8FAFC] px-3 py-1.5 text-[13px] font-semibold text-[#64748B] transition-all duration-300 group-hover:border-[#99F6E4] group-hover:bg-[#F0FDFA] group-hover:text-[#14B8A6]"
                    >
                      {symptom}
                    </span>
                  ))}
                </div>
              </div>

              <div className="mt-5 flex items-center justify-between text-[15px] font-bold text-[#14B8A6]">
                <span>View details</span>

                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2.4"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1"
                >
                  <path d="M5 12h14" />
                  <path d="m13 5 7 7-7 7" />
                </svg>
              </div>
            </button>
          ))}
        </div>

        <div className="flex flex-wrap items-center justify-center gap-2">
          {COMMON_DISEASES.map((disease, index) => (
            <button
              key={disease.id}
              type="button"
              onClick={() => scrollToIndex(index)}
              className={`h-2.5 rounded-full transition-all duration-300 ${
                activeIndex === index
                  ? "w-8 bg-[#14B8A6]"
                  : "w-2.5 bg-[#CBD5E1] hover:bg-[#94A3B8]"
              }`}
              aria-label={`Go to ${disease.name[lang]}`}
            />
          ))}
        </div>
      </div>
    </section>
  );
};

export default CommonDiseases;


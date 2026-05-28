import { AppStep, UIStrings, Language } from "../types";
import LanguageSelector from "./LanguageSelector";

interface HeaderProps {
  currentStep: AppStep;
  onNavigate: (step: AppStep) => void;
  ui: UIStrings;
  lang: Language;
  onLanguageChange: (lang: Language) => void;
  isMenuOpen: boolean;
  onMenuToggle: (isOpen: boolean) => void;
}

const Header: React.FC<HeaderProps> = ({
  currentStep,
  onNavigate,
  ui,
  lang,
  onLanguageChange,
  isMenuOpen,
  onMenuToggle,
}) => {
  const navItems = [
    { step: AppStep.HOME, label: ui.navHome },
    { step: AppStep.SYMPTOMS_SELECTION, label: ui.navPredict },
    { step: AppStep.COMMON_DISEASES, label: ui.navCommon },
    { step: AppStep.EXERCISES, label: ui.navExercises },
    { step: AppStep.ABOUT, label: ui.navAbout },
    { step: AppStep.DISCLAIMER, label: ui.navDisclaimer },
  ];

  const handleNavClick = (step: AppStep) => {
    onNavigate(step);
    onMenuToggle(false);
  };

  const languageMap: Record<Language, string> = {
    en: "English",
    hi: "हिन्दी",
    gu: "ગુજરાતી",
  };

  return (
    <header
      className="sticky top-0 z-50 px-4 pt-4 sm:px-6 lg:px-8"
      style={{
        fontFamily: "Calibri, Arial, sans-serif",
      }}
    >
      <div className="mx-auto max-w-7xl rounded-[1.8rem] border border-[#E2E8F0] bg-white/95 shadow-[0_18px_50px_rgba(15,23,42,0.08)] backdrop-blur-2xl">
        <div className="flex items-center gap-3 px-4 py-3 sm:px-5">
          {/* Logo */}
          <div
            className="group flex cursor-pointer items-center gap-3"
            onClick={() => handleNavClick(AppStep.HOME)}
          >
            <div className="relative flex h-11 w-11 items-center justify-center overflow-hidden rounded-[1.1rem] bg-gradient-to-br from-[#14B8A6] to-[#10B981] shadow-[0_12px_28px_rgba(20,184,166,0.24)] transition-all duration-300 group-hover:scale-105 group-hover:-rotate-3 sm:h-12 sm:w-12">
              <div className="absolute inset-0 bg-white/10 opacity-0 transition-opacity duration-300 group-hover:opacity-100" />

              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="22"
                height="22"
                viewBox="0 0 24 24"
                fill="none"
                stroke="white"
                strokeWidth="2.7"
                strokeLinecap="round"
                strokeLinejoin="round"
                className="relative z-10"
              >
                <path d="m12 14 4-4" />
                <path d="M3.34 19a10 10 0 1 1 17.32 0" />
                <path d="m9.01 19 1.4-1.4a.48.48 0 0 0 0-.7l-.3-.3a.48.48 0 0 0-.7 0L8.01 18" />
                <path d="m14.99 19-1.4-1.4a.48.48 0 0 1 0-.7l.3-.3a.48.48 0 0 1 .7 0l1.4 1.4" />
              </svg>
            </div>

            <div className="hidden sm:block">
              <h1 className="text-[25px] font-bold tracking-tight text-[#0F172A]">
                {ui.brandName}
              </h1>

              <p className="text-[14px] font-semibold tracking-[0.14em] text-[#64748B]">
                Smart Healthcare Assistant
              </p>
            </div>
          </div>

          {/* Desktop Navigation */}
          <div className="hidden flex-1 justify-center xl:flex">
            <nav className="inline-flex items-center gap-1 rounded-full border border-[#E2E8F0] bg-[#F8FAFC] p-1.5">
              {navItems.map((item) => {
                const active = currentStep === item.step;

                return (
                  <button
                    key={item.step}
                    onClick={() => handleNavClick(item.step)}
                    className={`rounded-full px-5 py-2.5 text-[15px] font-bold transition-all duration-300 ${
                      active
                        ? "bg-gradient-to-r from-[#14B8A6] to-[#10B981] text-white shadow-[0_12px_28px_rgba(20,184,166,0.24)]"
                        : "text-[#64748B] hover:bg-white hover:text-[#14B8A6]"
                    }`}
                  >
                    {item.label}
                  </button>
                );
              })}
            </nav>
          </div>

          {/* Right Side */}
          <div className="ml-auto flex items-center gap-2 sm:gap-3">
            {/* Professional Language Selector */}
            <div className="hidden lg:block">
              <div className="group flex items-center gap-3 rounded-full border border-[#E2E8F0] bg-[#F8FAFC] px-3 py-2 shadow-sm transition-all duration-300 hover:border-[#14B8A6]/30 hover:bg-white">
                {/* Icon */}
                <div className="flex h-9 w-9 items-center justify-center rounded-full bg-gradient-to-br from-[#14B8A6] to-[#10B981] text-white shadow-md">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="18"
                    height="18"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2.2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  >
                    <path d="M5 8l6 6" />
                    <path d="M4 14l6-6 2-3" />
                    <path d="M2 5h12" />
                    <path d="M7 2h1" />
                    <path d="M22 22l-5-10-5 10" />
                    <path d="M14 18h6" />
                  </svg>
                </div>

                {/* Text */}
                <div className="flex flex-col leading-tight">
                  <span className="text-[11px] font-bold uppercase tracking-[0.14em] text-[#94A3B8]">
                    Language
                  </span>

                  <span className="text-[14px] font-bold text-[#0F172A]">
                    {languageMap[lang]}
                  </span>
                </div>

                {/* Selector */}
                <div className="rounded-full bg-white p-1 shadow-sm">
                  <LanguageSelector
                    current={lang}
                    onSelect={onLanguageChange}
                  />
                </div>
              </div>
            </div>

            {/* Mobile Menu Button */}
            <button
              onClick={() => onMenuToggle(!isMenuOpen)}
              className="flex h-11 w-11 items-center justify-center rounded-full border border-[#E2E8F0] bg-[#F8FAFC] text-[#0F172A] shadow-sm transition-all duration-300 hover:border-[#14B8A6]/35 hover:bg-white hover:text-[#14B8A6] xl:hidden"
              aria-label="Toggle menu"
            >
              <div className="relative h-5 w-6">
                <span
                  className={`absolute left-0 block h-[2.5px] w-6 rounded-full bg-current transition-all duration-300 ${
                    isMenuOpen ? "top-2 rotate-45" : "top-0"
                  }`}
                />

                <span
                  className={`absolute left-0 top-2 block h-[2.5px] w-6 rounded-full bg-current transition-all duration-300 ${
                    isMenuOpen
                      ? "translate-x-3 opacity-0"
                      : "opacity-100"
                  }`}
                />

                <span
                  className={`absolute left-0 block h-[2.5px] w-6 rounded-full bg-current transition-all duration-300 ${
                    isMenuOpen ? "top-2 -rotate-45" : "top-4"
                  }`}
                />
              </div>
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      <div
        className={`fixed inset-x-4 bottom-4 top-[92px] z-40 rounded-[2rem] border border-[#E2E8F0] bg-white/96 shadow-[0_28px_70px_rgba(15,23,42,0.12)] backdrop-blur-2xl transition-all duration-500 xl:hidden sm:inset-x-6 sm:top-[96px] ${
          isMenuOpen
            ? "visible translate-y-0 opacity-100"
            : "invisible -translate-y-3 opacity-0"
        }`}
      >
        <div className="flex h-full flex-col overflow-y-auto p-4 sm:p-6">
          {/* Mobile Language Section */}
          <div className="mb-6 rounded-[1.75rem] border border-[#E2E8F0] bg-[#F8FAFC] p-5 shadow-sm">
            <div className="mb-4 flex items-center justify-between">
              <div>
                <p className="text-[12px] font-bold uppercase tracking-[0.22em] text-[#64748B]">
                  {ui.navLangLabel}
                </p>

                <h3 className="mt-1 text-[18px] font-bold text-[#0F172A]">
                  {languageMap[lang]}
                </h3>
              </div>

              <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-gradient-to-br from-[#14B8A6] to-[#10B981] text-white shadow-lg">
                🌐
              </div>
            </div>

            <LanguageSelector
              current={lang}
              onSelect={onLanguageChange}
            />
          </div>

          {/* Mobile Nav */}
          <div className="space-y-3">
            {navItems.map((item, index) => {
              const active = currentStep === item.step;

              return (
                <button
                  key={item.step}
                  onClick={() => handleNavClick(item.step)}
                  style={{
                    transitionDelay: isMenuOpen
                      ? `${index * 70}ms`
                      : "0ms",
                  }}
                  className={`group flex w-full items-center justify-between rounded-[1.4rem] border px-5 py-4 text-left text-[17px] font-bold transition-all duration-500 sm:px-6 sm:py-5 sm:text-[18px] ${
                    isMenuOpen
                      ? "translate-y-0 opacity-100"
                      : "translate-y-5 opacity-0"
                  } ${
                    active
                      ? "border-[#14B8A6]/20 bg-gradient-to-r from-[#14B8A6] to-[#10B981] text-white shadow-[0_18px_35px_rgba(20,184,166,0.24)]"
                      : "border-[#E2E8F0] bg-[#F8FAFC] text-[#0F172A] hover:border-[#14B8A6]/25 hover:bg-white hover:text-[#14B8A6]"
                  }`}
                >
                  <span>{item.label}</span>

                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2.4"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    className={`h-4 w-4 transition-transform duration-300 ${
                      active
                        ? "translate-x-1"
                        : "group-hover:translate-x-1"
                    }`}
                  >
                    <path d="M5 12h14" />
                    <path d="m13 5 7 7-7 7" />
                  </svg>
                </button>
              );
            })}
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;
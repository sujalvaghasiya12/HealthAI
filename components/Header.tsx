
import { AppStep, UIStrings, Language } from '../types';
import LanguageSelector from './LanguageSelector';

interface HeaderProps {
  currentStep: AppStep;
  onNavigate: (step: AppStep) => void;
  ui: UIStrings;
  lang: Language;
  onLanguageChange: (lang: Language) => void;
  isMenuOpen: boolean;
  onMenuToggle: (isOpen: boolean) => void;
}

const Header: React.FC<HeaderProps> = ({ currentStep, onNavigate, ui, lang, onLanguageChange, isMenuOpen, onMenuToggle }) => {
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

  return (
    <header className="bg-white/80 backdrop-blur-md border-b border-slate-200 sticky top-0 z-50 transition-all duration-300">
      <div className="max-w-7xl mx-auto px-4 lg:px-8 h-16 flex items-center justify-between relative z-50">
        {/* Logo */}
        <div 
          className="flex items-center gap-2.5 cursor-pointer group"
          onClick={() => handleNavClick(AppStep.HOME)}
        >
          <div className="bg-gradient-to-br from-teal-500 to-teal-700 p-2 rounded-xl shadow-lg shadow-teal-100 group-hover:scale-105 transition-transform duration-300">
            <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"><path d="m12 14 4-4"/><path d="M3.34 19a10 10 0 1 1 17.32 0"/><path d="m9.01 19 1.4-1.4a.48.48 0 0 0 0-.7l-.3-.3a.48.48 0 0 0-.7 0L8.01 18"/><path d="m14.99 19-1.4-1.4a.48.48 0 0 1 0-.7l.3-.3a.48.48 0 0 1 .7 0l1.4 1.4"/></svg>
          </div>
          <h1 className="text-xl font-black text-slate-900 tracking-tight hidden sm:block">
            {ui.brandName}
          </h1>
        </div>

        {/* Desktop Nav */}
        <nav className="hidden xl:flex items-center gap-1.5">
          {navItems.map((item) => (
            <button
              key={item.step}
              onClick={() => handleNavClick(item.step)}
              className={`px-4 py-2 text-sm font-bold rounded-xl transition-all duration-200 ${
                currentStep === item.step
                ? 'bg-teal-600 text-white shadow-md shadow-teal-100'
                : 'text-slate-600 hover:text-teal-600 hover:bg-teal-50'
              }`}
            >
              {item.label}
            </button>
          ))}
        </nav>

        <div className="flex items-center gap-4">
          <div className="hidden lg:block">
            <LanguageSelector current={lang} onSelect={onLanguageChange} />
          </div>
          
          {/* Mobile Menu Toggle */}
          <button 
            onClick={() => onMenuToggle(!isMenuOpen)}
            className="xl:hidden p-2 text-slate-600 hover:bg-slate-100 rounded-xl transition-colors border border-slate-200"
            aria-label="Toggle menu"
          >
            <div className="relative w-6 h-6">
              <span className={`absolute block h-0.5 w-6 bg-current rounded-full transition-all duration-300 ease-in-out ${isMenuOpen ? 'rotate-45 top-2.5' : 'top-1'}`}></span>
              <span className={`absolute block h-0.5 w-6 bg-current rounded-full transition-all duration-300 ease-in-out top-2.5 ${isMenuOpen ? 'opacity-0 translate-x-3' : 'opacity-100'}`}></span>
              <span className={`absolute block h-0.5 w-6 bg-current rounded-full transition-all duration-300 ease-in-out ${isMenuOpen ? '-rotate-45 top-2.5' : 'top-4'}`}></span>
            </div>
          </button>
        </div>
      </div>

      {/* Mobile Menu Overlay with smooth transition */}
      <div className={`xl:hidden fixed inset-0 top-16 bg-white/95 backdrop-blur-xl z-40 transition-all duration-500 ease-in-out ${
        isMenuOpen 
        ? 'opacity-100 translate-y-0 visible' 
        : 'opacity-0 -translate-y-8 invisible pointer-events-none'
      }`}>
        <div className="flex flex-col p-6 gap-3">
          <div className="pb-6 border-b border-slate-100 mb-2">
            <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest px-2 mb-4">{ui.navLangLabel}</p>
            <div className="px-1">
              <LanguageSelector current={lang} onSelect={onLanguageChange} />
            </div>
          </div>
          {navItems.map((item, index) => (
            <button
              key={item.step}
              onClick={() => handleNavClick(item.step)}
              style={{ transitionDelay: isMenuOpen ? `${index * 50}ms` : '0ms' }}
              className={`w-full px-5 py-4 text-left font-bold rounded-2xl transition-all duration-300 transform ${
                isMenuOpen ? 'translate-x-0 opacity-100' : '-translate-x-4 opacity-0'
              } ${
                currentStep === item.step
                ? 'bg-teal-600 text-white shadow-lg shadow-teal-100'
                : 'text-slate-700 hover:bg-slate-50 border border-transparent hover:border-slate-200'
              }`}
            >
              {item.label}
            </button>
          ))}
        </div>
      </div>
    </header>
  );
};

export default Header;

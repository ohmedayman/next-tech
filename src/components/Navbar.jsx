import React from 'react';
import { 
  Rocket, 
  Satellite, 
  ArrowLeft, 
  ArrowRight, 
  Home, 
  LayoutDashboard, 
  Sliders, 
  Languages, 
  Droplets,
  Layers
} from 'lucide-react';
import { TRANSLATIONS } from '../data/translations';

export function Navbar({ currentView, setView, farmData, lang = 'en', onToggleLang }) {
  const t = TRANSLATIONS[lang];
  const isRtl = lang === 'ar';

  return (
    <header className="sticky top-0 z-50 w-full border-b border-[#1F1F24] bg-[#000000]/85 backdrop-blur-md">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-20 flex items-center justify-between gap-4">
        
        {/* Brand Logo & Title */}
        <div 
          onClick={() => setView('landing')}
          className="flex items-center gap-3 cursor-pointer group flex-shrink-0"
        >
          <div className="relative">
            <div className="w-11 h-11 sm:w-12 sm:h-12 rounded-xl overflow-hidden border border-[#B27BFF]/40 bg-[#0A0A0A] p-1 flex items-center justify-center group-hover:border-[#B27BFF] transition-all group-hover:shadow-[0_0_15px_#B27BFF]">
              <img 
                src="/logo.jpeg" 
                alt="Nex Tech Logo" 
                className="w-full h-full object-contain filter drop-shadow"
              />
            </div>
            {/* Live radar dot */}
            <span className="absolute -top-1 -right-1 flex h-3 w-3">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#B27BFF] opacity-75"></span>
              <span className="relative inline-flex rounded-full h-3 w-3 bg-[#B27BFF]"></span>
            </span>
          </div>

          <div className="flex flex-col">
            <div className="flex items-center gap-2">
              <span className="text-xl sm:text-2xl font-black tracking-wide text-white">
                Nex <span className="text-[#B27BFF]">Tech</span>
              </span>
              <span className="text-[10px] px-2 py-0.5 rounded-full bg-[#B27BFF]/15 text-[#B27BFF] border border-[#B27BFF]/30 font-medium hidden sm:flex items-center gap-1">
                <Satellite className="w-3 h-3 text-[#B27BFF]" />
                {t.nasaBadge}
              </span>
            </div>
            <span className="text-xs text-[#9CA3AF] font-medium hidden md:inline">
              {t.tagline}
            </span>
          </div>
        </div>

        {/* Navigation links */}
        <nav className="hidden lg:flex items-center gap-6">
          <button 
            onClick={() => setView('landing')}
            className={`text-sm font-semibold transition-colors flex items-center gap-1.5 ${
              currentView === 'landing' ? 'text-[#B27BFF]' : 'text-[#9CA3AF] hover:text-white'
            }`}
          >
            <Home className="w-4 h-4" />
            <span>{t.navHome}</span>
          </button>
          
          <button 
            onClick={() => setView('onboarding')}
            className={`text-sm font-semibold transition-colors flex items-center gap-1.5 ${
              currentView === 'onboarding' ? 'text-[#B27BFF]' : 'text-[#9CA3AF] hover:text-white'
            }`}
          >
            <Sliders className="w-4 h-4" />
            <span>{t.navSetup}</span>
          </button>

          {farmData && (
            <button 
              onClick={() => setView('dashboard')}
              className={`text-sm font-semibold transition-colors flex items-center gap-1.5 ${
                currentView === 'dashboard' ? 'text-[#B27BFF]' : 'text-[#9CA3AF] hover:text-white'
              }`}
            >
              <LayoutDashboard className="w-4 h-4" />
              <span>{t.navDashboard}</span>
            </button>
          )}

          {/* Special Module: Moghra Land */}
          <button 
            onClick={() => setView('moghra')}
            className={`text-sm font-bold transition-all flex items-center gap-1.5 px-3 py-1 rounded-lg border ${
              currentView === 'moghra'
                ? 'bg-[#B27BFF]/20 border-[#B27BFF] text-[#B27BFF] shadow-[0_0_12px_rgba(178,123,255,0.3)]'
                : 'border-amber-500/30 text-amber-300 hover:border-amber-400 bg-amber-500/5'
            }`}
          >
            <Droplets className="w-3.5 h-3.5 text-amber-400" />
            <span>{t.navMoghra}</span>
            <span className="text-[9px] bg-amber-500/20 px-1.5 py-0.2 rounded font-mono">
              250k
            </span>
          </button>
        </nav>

        {/* Action Controls: Language Toggle & Enter/CTA button */}
        <div className="flex items-center gap-2.5 sm:gap-3">
          
          {/* Language Switcher Button (English Default, User toggles from top) */}
          <button
            onClick={onToggleLang}
            className="px-3 py-2 rounded-xl text-xs font-bold bg-[#0A0A0A] hover:bg-[#141414] border border-[#222226] hover:border-[#B27BFF] text-white transition-all flex items-center gap-1.5 shadow-sm group"
            title={lang === 'en' ? 'التحويل إلى اللغة العربية' : 'Switch to English'}
          >
            <Languages className="w-3.5 h-3.5 text-[#B27BFF] group-hover:rotate-12 transition-transform" />
            <span className="font-mono text-[#B27BFF]">{lang === 'en' ? 'AR' : 'EN'}</span>
            <span className="text-gray-300 hidden sm:inline">{t.langToggle}</span>
          </button>

          {/* Primary View Action Button */}
          {currentView === 'landing' ? (
            <button
              onClick={() => setView(farmData ? 'dashboard' : 'onboarding')}
              className="relative group px-4 sm:px-5 py-2.5 rounded-xl font-bold text-xs sm:text-sm text-black bg-[#B27BFF] hover:bg-[#9E5FF5] transition-all duration-300 shadow-[0_0_15px_#B27BFF] hover:shadow-[0_0_25px_#B27BFF] flex items-center gap-2 transform active:scale-95 whitespace-nowrap"
            >
              <span>{farmData ? t.goToDashboard : t.enterApp}</span>
              <Rocket className="w-4 h-4 text-black group-hover:translate-x-0.5 transition-transform" />
            </button>
          ) : currentView === 'onboarding' ? (
            <button
              onClick={() => setView('landing')}
              className="px-3.5 py-2 rounded-xl text-xs sm:text-sm font-medium text-[#9CA3AF] hover:text-white bg-[#0A0A0A] hover:bg-[#141414] border border-[#222226] transition-all flex items-center gap-1.5"
            >
              <span>{t.backToHome}</span>
              {isRtl ? <ArrowLeft className="w-4 h-4 rotate-180" /> : <ArrowRight className="w-4 h-4" />}
            </button>
          ) : currentView === 'moghra' ? (
            <button
              onClick={() => setView('dashboard')}
              className="px-3.5 py-2 rounded-xl text-xs sm:text-sm font-semibold text-black bg-[#B27BFF] hover:bg-[#9E5FF5] shadow-[0_0_12px_#B27BFF] transition-all flex items-center gap-1.5"
            >
              <LayoutDashboard className="w-4 h-4 text-black" />
              <span>{t.navDashboard}</span>
            </button>
          ) : (
            <div className="flex items-center gap-2">
              <button
                onClick={() => setView('moghra')}
                className="px-3 py-2 rounded-xl text-xs font-bold text-amber-300 bg-amber-500/10 hover:bg-amber-500/20 border border-amber-500/30 transition-all flex items-center gap-1 lg:hidden"
              >
                <Droplets className="w-3.5 h-3.5 text-amber-400" />
                <span>{lang === 'ar' ? 'المغرة' : 'Moghra'}</span>
              </button>

              <button
                onClick={() => setView('onboarding')}
                className="px-3 py-2 rounded-xl text-xs sm:text-sm font-medium text-[#9CA3AF] hover:text-white bg-[#0A0A0A] hover:bg-[#141414] border border-[#222226] hover:border-[#B27BFF]/40 transition-all flex items-center gap-1.5"
                title={t.editFarm}
              >
                <Sliders className="w-3.5 h-3.5 text-[#B27BFF]" />
                <span className="hidden sm:inline">{t.editFarm}</span>
              </button>

              <button
                onClick={() => setView('landing')}
                className="px-3 py-2 rounded-xl text-xs sm:text-sm font-medium text-white bg-[#0A0A0A] hover:bg-[#141414] border border-[#222226] hover:border-[#B27BFF] transition-all"
              >
                {t.navHome}
              </button>
            </div>
          )}
        </div>

      </div>
    </header>
  );
}

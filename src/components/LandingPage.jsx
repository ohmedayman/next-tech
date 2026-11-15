import React from 'react';
import { 
  Satellite, 
  Sparkles, 
  CloudSun, 
  ScanLine, 
  ShoppingBag, 
  ArrowLeft, 
  ArrowRight,
  ShieldCheck, 
  Activity, 
  Droplets, 
  Compass, 
  TrendingUp, 
  CheckCircle2,
  ChevronDown,
  Layers,
  Leaf
} from 'lucide-react';
import { TRANSLATIONS } from '../data/translations';

export function LandingPage({ onRegisterClick, onExploreClick, onGoMoghra, lang = 'en' }) {
  const t = TRANSLATIONS[lang];
  const isRtl = lang === 'ar';

  const scrollToFeatures = () => {
    const el = document.getElementById('features-section');
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <div className="relative overflow-hidden">
      {/* Background ambient lighting */}
      <div className="absolute top-0 right-1/4 w-96 h-96 bg-[#B27BFF]/10 rounded-full blur-[140px] pointer-events-none -z-10" />
      <div className="absolute top-1/3 left-10 w-80 h-80 bg-[#7B42BC]/10 rounded-full blur-[120px] pointer-events-none -z-10" />

      {/* 1. Hero Section */}
      <section className="relative pt-12 pb-20 md:pt-20 md:pb-28 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
        <div className="flex flex-col items-center text-center">
          
          {/* Top Pill / Badge */}
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-[#0A0A0A] border border-[#B27BFF]/40 text-xs sm:text-sm text-gray-300 mb-8 shadow-[0_0_12px_rgba(178,123,255,0.2)]">
            <span className="flex h-2 w-2 rounded-full bg-[#B27BFF]"></span>
            <span>{t.heroBadge1}</span>
            <span className="font-bold text-[#B27BFF] font-mono">{t.heroBadge2}</span>
          </div>

          {/* Big Bold Headline with Ample Line Height & Spacing */}
          <h1 className="text-4xl sm:text-6xl md:text-7xl font-extrabold text-white tracking-tight leading-[1.3] sm:leading-[1.25] md:leading-[1.2] max-w-4xl mb-6">
            {t.heroTitlePart1}{' '}
            <span className="text-transparent bg-clip-text bg-gradient-to-l from-[#B27BFF] via-[#D3AFFF] to-white drop-shadow-[0_0_20px_rgba(178,123,255,0.4)]">
              {t.heroTitlePart2}
            </span>
          </h1>

          {/* Subtitle with generous line height and spacing */}
          <p className="text-base sm:text-lg md:text-xl text-[#9CA3AF] max-w-2xl leading-relaxed sm:leading-loose mb-10 px-2">
            {t.heroSubtitle}
          </p>

          {/* Two Buttons */}
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 w-full sm:w-auto">
            <button
              onClick={onRegisterClick}
              className="w-full sm:w-auto px-8 py-4 rounded-xl font-bold text-base text-black bg-[#B27BFF] hover:bg-[#9E5FF5] transition-all duration-300 shadow-[0_0_20px_#B27BFF] hover:shadow-[0_0_30px_#B27BFF] flex items-center justify-center gap-3 transform hover:-translate-y-0.5 active:translate-y-0"
            >
              <span>{t.btnRegisterFarm}</span>
              {isRtl ? <ArrowLeft className="w-5 h-5 text-black" /> : <ArrowRight className="w-5 h-5 text-black" />}
            </button>

            <button
              onClick={scrollToFeatures}
              className="w-full sm:w-auto px-8 py-4 rounded-xl font-bold text-base text-white bg-[#0A0A0A] hover:bg-[#141414] border border-[#222226] hover:border-[#B27BFF]/60 transition-all duration-300 flex items-center justify-center gap-3 group"
            >
              <span>{t.btnExploreFeatures}</span>
              <ChevronDown className="w-5 h-5 text-[#9CA3AF] group-hover:text-[#B27BFF] transition-colors" />
            </button>
          </div>

          {/* Dedicated Callout Banner: Moghra Region Lands */}
          {onGoMoghra && (
            <div 
              onClick={onGoMoghra}
              className="mt-8 cursor-pointer max-w-3xl w-full p-4 rounded-2xl bg-gradient-to-r from-amber-500/10 via-[#0A0A0A] to-amber-500/5 border border-amber-500/30 hover:border-amber-500 transition-all duration-300 shadow-[0_0_20px_rgba(245,158,11,0.15)] flex flex-col sm:flex-row items-center justify-between gap-4 text-right"
            >
              <div className="flex items-center gap-3 text-right">
                <div className="p-2.5 rounded-xl bg-amber-500/20 text-amber-400 flex-shrink-0">
                  <Droplets className="w-6 h-6 animate-pulse" />
                </div>
                <div>
                  <div className="flex items-center gap-2">
                    <span className="text-xs font-bold text-amber-300 uppercase tracking-wider">
                      {lang === 'ar' ? 'نظام متخصص جديد' : 'New Specialized Module'}
                    </span>
                    <span className="text-[10px] bg-amber-500/20 text-amber-300 px-2 py-0.2 rounded-full font-mono">
                      250,000 Feddans
                    </span>
                  </div>
                  <h3 className="text-sm sm:text-base font-bold text-white mt-0.5">
                    {lang === 'ar' ? 'منظومة أراضي المغرة لمواجهة ملوحة الآبار والتربة' : 'Moghra Region Salinity & Resilient Crops Management'}
                  </h3>
                </div>
              </div>

              <div className="flex items-center gap-2 text-xs font-bold text-amber-400 group flex-shrink-0">
                <span>{lang === 'ar' ? 'استكشف نظام المغرة' : 'Open Moghra Module'}</span>
                {isRtl ? <ArrowLeft className="w-4 h-4" /> : <ArrowRight className="w-4 h-4" />}
              </div>
            </div>
          )}

          {/* Hero Live Mock Visual / Orbit Card */}
          <div className="mt-14 w-full max-w-5xl relative">
            <div className="relative rounded-2xl border border-[#222226] bg-[#0A0A0A]/95 p-4 sm:p-6 backdrop-blur-xl shadow-[0_0_50px_rgba(178,123,255,0.15)] overflow-hidden">
              
              {/* Top Bar of the Mock Satellite Interface */}
              <div className="flex flex-wrap items-center justify-between pb-4 mb-6 border-b border-[#1F1F24] gap-4">
                <div className="flex items-center gap-3">
                  <div className="w-3 h-3 rounded-full bg-red-500/80"></div>
                  <div className="w-3 h-3 rounded-full bg-yellow-500/80"></div>
                  <div className="w-3 h-3 rounded-full bg-green-500/80"></div>
                  <span className="text-xs text-[#9CA3AF] font-mono">
                    NASA-GPM / LANDSAT-9 / REALTIME-ANALYZER
                  </span>
                </div>
                <div className="flex items-center gap-2 text-xs text-[#B27BFF] bg-[#B27BFF]/10 px-3 py-1 rounded-full border border-[#B27BFF]/30">
                  <Satellite className="w-3.5 h-3.5 animate-spin" style={{ animationDuration: '12s' }} />
                  <span>{t.previewRadarStatus}</span>
                </div>
              </div>

              {/* Grid of live satellite preview stats */}
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-start">
                
                <div className="p-4 rounded-xl bg-[#000000] border border-[#1F1F24] hover:border-[#B27BFF]/50 transition-all space-y-1">
                  <div className="flex items-center justify-between text-[#9CA3AF]">
                    <span className="text-xs">{t.previewMoistureRes}</span>
                    <Droplets className="w-4 h-4 text-[#B27BFF]" />
                  </div>
                  <div className="text-2xl font-black text-white font-mono">10m²</div>
                  <div className="text-[11px] text-emerald-400 flex items-center gap-1">
                    <CheckCircle2 className="w-3 h-3" />
                    <span>{t.previewSentinel}</span>
                  </div>
                </div>

                <div className="p-4 rounded-xl bg-[#000000] border border-[#1F1F24] hover:border-[#B27BFF]/50 transition-all space-y-1">
                  <div className="flex items-center justify-between text-[#9CA3AF]">
                    <span className="text-xs">{t.previewNdvi}</span>
                    <Leaf className="w-4 h-4 text-emerald-400" />
                  </div>
                  <div className="text-2xl font-black text-white font-mono">0.82</div>
                  <div className="text-[11px] text-[#B27BFF]">
                    {t.previewInfrared}
                  </div>
                </div>

                <div className="p-4 rounded-xl bg-[#000000] border border-[#1F1F24] hover:border-[#B27BFF]/50 transition-all space-y-1">
                  <div className="flex items-center justify-between text-[#9CA3AF]">
                    <span className="text-xs">{t.previewFrostForecast}</span>
                    <CloudSun className="w-4 h-4 text-amber-400" />
                  </div>
                  <div className="text-2xl font-black text-white font-mono">48h</div>
                  <div className="text-[11px] text-amber-400">
                    {t.previewAdvanceNotice}
                  </div>
                </div>

                <div className="p-4 rounded-xl bg-[#000000] border border-[#1F1F24] hover:border-[#B27BFF]/50 transition-all space-y-1">
                  <div className="flex items-center justify-between text-[#9CA3AF]">
                    <span className="text-xs">{t.previewAiAccuracy}</span>
                    <ScanLine className="w-4 h-4 text-[#B27BFF]" />
                  </div>
                  <div className="text-2xl font-black text-white font-mono">96.8%</div>
                  <div className="text-[11px] text-[#B27BFF]">
                    {t.previewVisionModel}
                  </div>
                </div>

              </div>

              {/* Graphic Banner */}
              <div className="mt-5 p-4 rounded-xl bg-gradient-to-r from-[#B27BFF]/15 via-transparent to-[#B27BFF]/10 border border-[#B27BFF]/20 flex items-center justify-between flex-wrap gap-3">
                <div className="flex items-center gap-2.5">
                  <div className="p-2 rounded-lg bg-[#B27BFF]/20 text-[#B27BFF]">
                    <Sparkles className="w-4 h-4" />
                  </div>
                  <p className="text-xs sm:text-sm text-gray-200 leading-relaxed">
                    {t.readyToStart}
                  </p>
                </div>
                <button
                  onClick={onRegisterClick}
                  className="text-xs font-bold text-[#B27BFF] hover:text-white flex items-center gap-1 transition-colors"
                >
                  <span>{t.btnTryDemo}</span>
                  {isRtl ? <ArrowLeft className="w-3.5 h-3.5" /> : <ArrowRight className="w-3.5 h-3.5" />}
                </button>
              </div>

            </div>
          </div>

        </div>
      </section>

      {/* 2. Features Section (The 3 Core Features Requested) */}
      <section id="features-section" className="py-20 md:py-28 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto border-t border-[#1F1F24]/80">
        <div className="text-center mb-16 space-y-3">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#0A0A0A] border border-[#222226] text-xs text-[#B27BFF]">
            <Layers className="w-3.5 h-3.5" />
            <span>{t.featuresHeadingPre}</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-white leading-tight">
            {t.featuresHeading}
          </h2>
          <p className="text-[#9CA3AF] max-w-2xl mx-auto text-sm sm:text-base leading-relaxed">
            {t.featuresSubheading}
          </p>
        </div>

        {/* The 3 Cards with Ample Internal Spacing */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          
          {/* Feature Card 1: Weather & Irrigation (جدولة الري) */}
          <div className="group relative rounded-2xl bg-[#0A0A0A] border border-[#222226] hover:border-[#B27BFF] p-6 sm:p-8 transition-all duration-300 hover:shadow-[0_0_25px_rgba(178,123,255,0.25)] flex flex-col justify-between space-y-6">
            <div className="absolute top-0 right-0 w-24 h-24 bg-[#B27BFF]/5 rounded-bl-full pointer-events-none group-hover:bg-[#B27BFF]/10 transition-colors" />
            
            <div className="space-y-4">
              <div className="w-14 h-14 rounded-xl bg-[#B27BFF]/10 border border-[#B27BFF]/30 flex items-center justify-center text-[#B27BFF] group-hover:scale-110 group-hover:shadow-[0_0_15px_#B27BFF] transition-all">
                <CloudSun className="w-7 h-7" />
              </div>

              <div className="text-xs font-semibold text-[#B27BFF] uppercase tracking-wider">
                {t.feat1Badge}
              </div>
              <h3 className="text-xl sm:text-2xl font-bold text-white leading-snug">
                {t.feat1Title}
              </h3>
              <p className="text-[#9CA3AF] text-sm leading-relaxed">
                {t.feat1Desc}
              </p>
            </div>

            <ul className="space-y-2.5 text-xs text-gray-300 border-t border-[#1F1F24] pt-4">
              <li className="flex items-start gap-2.5">
                <CheckCircle2 className="w-4 h-4 text-[#B27BFF] flex-shrink-0 mt-0.5" />
                <span className="leading-relaxed">{t.feat1Point1}</span>
              </li>
              <li className="flex items-start gap-2.5">
                <CheckCircle2 className="w-4 h-4 text-[#B27BFF] flex-shrink-0 mt-0.5" />
                <span className="leading-relaxed">{t.feat1Point2}</span>
              </li>
              <li className="flex items-start gap-2.5">
                <CheckCircle2 className="w-4 h-4 text-[#B27BFF] flex-shrink-0 mt-0.5" />
                <span className="leading-relaxed">{t.feat1Point3}</span>
              </li>
            </ul>
          </div>

          {/* Feature Card 2: Smart AI Diagnosis (التشخيص الذكي) */}
          <div className="group relative rounded-2xl bg-[#0A0A0A] border border-[#222226] hover:border-[#B27BFF] p-6 sm:p-8 transition-all duration-300 hover:shadow-[0_0_25px_rgba(178,123,255,0.25)] flex flex-col justify-between space-y-6">
            <div className="absolute top-0 right-0 w-24 h-24 bg-[#B27BFF]/5 rounded-bl-full pointer-events-none group-hover:bg-[#B27BFF]/10 transition-colors" />
            
            <div className="space-y-4">
              <div className="w-14 h-14 rounded-xl bg-[#B27BFF]/10 border border-[#B27BFF]/30 flex items-center justify-center text-[#B27BFF] group-hover:scale-110 group-hover:shadow-[0_0_15px_#B27BFF] transition-all">
                <ScanLine className="w-7 h-7" />
              </div>

              <div className="text-xs font-semibold text-[#B27BFF] uppercase tracking-wider">
                {t.feat2Badge}
              </div>
              <h3 className="text-xl sm:text-2xl font-bold text-white leading-snug">
                {t.feat2Title}
              </h3>
              <p className="text-[#9CA3AF] text-sm leading-relaxed">
                {t.feat2Desc}
              </p>
            </div>

            <ul className="space-y-2.5 text-xs text-gray-300 border-t border-[#1F1F24] pt-4">
              <li className="flex items-start gap-2.5">
                <CheckCircle2 className="w-4 h-4 text-[#B27BFF] flex-shrink-0 mt-0.5" />
                <span className="leading-relaxed">{t.feat2Point1}</span>
              </li>
              <li className="flex items-start gap-2.5">
                <CheckCircle2 className="w-4 h-4 text-[#B27BFF] flex-shrink-0 mt-0.5" />
                <span className="leading-relaxed">{t.feat2Point2}</span>
              </li>
              <li className="flex items-start gap-2.5">
                <CheckCircle2 className="w-4 h-4 text-[#B27BFF] flex-shrink-0 mt-0.5" />
                <span className="leading-relaxed">{t.feat2Point3}</span>
              </li>
            </ul>
          </div>

          {/* Feature Card 3: Marketplace (سوق المستلزمات) */}
          <div className="group relative rounded-2xl bg-[#0A0A0A] border border-[#222226] hover:border-[#B27BFF] p-6 sm:p-8 transition-all duration-300 hover:shadow-[0_0_25px_rgba(178,123,255,0.25)] flex flex-col justify-between space-y-6">
            <div className="absolute top-0 right-0 w-24 h-24 bg-[#B27BFF]/5 rounded-bl-full pointer-events-none group-hover:bg-[#B27BFF]/10 transition-colors" />
            
            <div className="space-y-4">
              <div className="w-14 h-14 rounded-xl bg-[#B27BFF]/10 border border-[#B27BFF]/30 flex items-center justify-center text-[#B27BFF] group-hover:scale-110 group-hover:shadow-[0_0_15px_#B27BFF] transition-all">
                <ShoppingBag className="w-7 h-7" />
              </div>

              <div className="text-xs font-semibold text-[#B27BFF] uppercase tracking-wider">
                {t.feat3Badge}
              </div>
              <h3 className="text-xl sm:text-2xl font-bold text-white leading-snug">
                {t.feat3Title}
              </h3>
              <p className="text-[#9CA3AF] text-sm leading-relaxed">
                {t.feat3Desc}
              </p>
            </div>

            <ul className="space-y-2.5 text-xs text-gray-300 border-t border-[#1F1F24] pt-4">
              <li className="flex items-start gap-2.5">
                <CheckCircle2 className="w-4 h-4 text-[#B27BFF] flex-shrink-0 mt-0.5" />
                <span className="leading-relaxed">{t.feat3Point1}</span>
              </li>
              <li className="flex items-start gap-2.5">
                <CheckCircle2 className="w-4 h-4 text-[#B27BFF] flex-shrink-0 mt-0.5" />
                <span className="leading-relaxed">{t.feat3Point2}</span>
              </li>
              <li className="flex items-start gap-2.5">
                <CheckCircle2 className="w-4 h-4 text-[#B27BFF] flex-shrink-0 mt-0.5" />
                <span className="leading-relaxed">{t.feat3Point3}</span>
              </li>
            </ul>
          </div>

        </div>
      </section>

      {/* 3. Call to Action Banner */}
      <section className="py-16 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
        <div className="rounded-3xl border border-[#B27BFF]/30 bg-gradient-to-b from-[#0A0A0A] to-[#120e18] p-8 sm:p-14 text-center relative overflow-hidden shadow-[0_0_40px_rgba(178,123,255,0.15)]">
          <div className="absolute -top-24 -left-24 w-64 h-64 bg-[#B27BFF]/20 rounded-full blur-3xl pointer-events-none" />
          
          <h2 className="text-3xl sm:text-4xl font-extrabold text-white mb-4 leading-snug">
            {t.ctaTitle}
          </h2>
          <p className="text-[#9CA3AF] max-w-xl mx-auto text-base sm:text-lg mb-8 leading-relaxed">
            {t.ctaDesc}
          </p>

          <button
            onClick={onRegisterClick}
            className="px-10 py-4 rounded-xl font-bold text-base text-black bg-[#B27BFF] hover:bg-[#9E5FF5] transition-all duration-300 shadow-[0_0_20px_#B27BFF] hover:shadow-[0_0_35px_#B27BFF] inline-flex items-center gap-3 transform hover:scale-105 active:scale-95"
          >
            <span>{t.btnStartOnboarding}</span>
            {isRtl ? <ArrowLeft className="w-5 h-5 text-black" /> : <ArrowRight className="w-5 h-5 text-black" />}
          </button>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-[#1F1F24] py-8 text-center text-xs text-[#9CA3AF]">
        <div className="max-w-7xl mx-auto px-4 flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-2">
            <span className="font-bold text-white">Nex Tech</span>
            <span>- {t.footerRights}</span>
          </div>
          <div className="flex items-center gap-4 text-xs">
            <span>{t.footerCollab}</span>
          </div>
        </div>
      </footer>
    </div>
  );
}

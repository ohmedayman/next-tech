import React, { useState } from 'react';
import { 
  Droplets, 
  Sprout, 
  Activity, 
  AlertTriangle, 
  CheckCircle2, 
  Scale, 
  ShieldAlert, 
  Sparkles, 
  ShoppingBag, 
  ArrowLeft, 
  ArrowRight,
  TrendingDown, 
  Cpu, 
  Beaker, 
  Layers, 
  RefreshCw,
  Info
} from 'lucide-react';
import { MOGHRA_METRICS, RESILIENT_CROPS_STRESS, COST_COMPARISON, MOGHRA_PRODUCTS } from '../data/moghraData';
import { TRANSLATIONS } from '../data/translations';
import { OrderModal } from './widgets/OrderModal';

export function MoghraModule({ lang = 'en', onOrderProduct, onReturnDashboard }) {
  const t = TRANSLATIONS[lang];
  const isRtl = lang === 'ar';

  // Live simulation states
  const [waterSalinity, setWaterSalinity] = useState(MOGHRA_METRICS.waterSalinityPpm);
  const [soilSalinity, setSoilSalinity] = useState(MOGHRA_METRICS.soilSalinityEc);
  const [soilPh, setSoilPh] = useState(MOGHRA_METRICS.soilPh);
  const [selectedCrop, setSelectedCrop] = useState(RESILIENT_CROPS_STRESS[0]);
  const [selectedProductForOrder, setSelectedProductForOrder] = useState(null);
  const [isSimulatingFlush, setIsSimulatingFlush] = useState(false);

  // Simulate applying chemical salinity displacer (reduces sodium & buffers pH)
  const handleApplyDisplacerSimulation = () => {
    setIsSimulatingFlush(true);
    setTimeout(() => {
      setSoilSalinity(prev => Math.max(4.5, Number((prev - 3.2).toFixed(1))));
      setSoilPh(prev => Math.max(6.7, Number((prev - 0.8).toFixed(1))));
      setIsSimulatingFlush(false);
    }, 1200);
  };

  const handleResetMetrics = () => {
    setWaterSalinity(MOGHRA_METRICS.waterSalinityPpm);
    setSoilSalinity(MOGHRA_METRICS.soilSalinityEc);
    setSoilPh(MOGHRA_METRICS.soilPh);
  };

  const isPhHigh = soilPh > 7.0;

  return (
    <div className="min-h-screen py-8 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto space-y-8 animate-fadeIn">
      
      {/* 1. Module Header & Context Notice */}
      <div className="rounded-2xl bg-[#0A0A0A] border border-[#B27BFF]/30 p-6 sm:p-8 shadow-[0_0_35px_rgba(178,123,255,0.1)] relative overflow-hidden">
        <div className="absolute top-0 right-0 w-80 h-80 bg-[#B27BFF]/5 rounded-bl-full pointer-events-none" />
        
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 relative z-10">
          <div className="space-y-3">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#B27BFF]/15 border border-[#B27BFF]/40 text-xs font-bold text-[#B27BFF]">
              <Layers className="w-3.5 h-3.5" />
              <span>{t.moghraBadge}</span>
            </div>

            <h1 className="text-2xl sm:text-3xl md:text-4xl font-extrabold text-white leading-snug">
              {t.moghraTitle}
            </h1>

            <p className="text-sm sm:text-base text-[#9CA3AF] max-w-3xl leading-relaxed">
              {t.moghraChallengeNotice}
            </p>
          </div>

          <div className="flex items-center gap-3 flex-shrink-0">
            {onReturnDashboard && (
              <button
                onClick={onReturnDashboard}
                className="px-4 py-2.5 rounded-xl text-xs sm:text-sm font-semibold text-white bg-[#000000] hover:bg-[#141414] border border-[#222226] hover:border-[#B27BFF] transition-all flex items-center gap-2"
              >
                {isRtl ? <ArrowRight className="w-4 h-4" /> : <ArrowLeft className="w-4 h-4" />}
                <span>{t.btnBackToDashboard}</span>
              </button>
            )}
          </div>
        </div>

        {/* Live Simulation Control Strip */}
        <div className="mt-6 pt-5 border-t border-[#1F1F24] flex flex-wrap items-center justify-between gap-4 text-xs">
          <div className="flex items-center gap-2 text-gray-300">
            <span className="w-2.5 h-2.5 rounded-full bg-amber-400 animate-ping" />
            <span className="font-semibold text-white">
              {lang === 'ar' ? 'المساحة المستهدفة:' : 'Target Acreage:'}
            </span>
            <span className="font-mono text-[#B27BFF] font-bold">250,000 {t.acresUnit}</span>
            <span className="text-gray-500">|</span>
            <span>{lang === 'ar' ? 'حوض المغرة الجوفي' : 'Moghra Aquifer System'}</span>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={handleApplyDisplacerSimulation}
              disabled={isSimulatingFlush}
              className="px-3.5 py-1.5 rounded-lg bg-[#B27BFF]/15 hover:bg-[#B27BFF]/25 border border-[#B27BFF]/40 text-[#B27BFF] font-semibold transition-all flex items-center gap-1.5 disabled:opacity-50"
            >
              <Beaker className={`w-3.5 h-3.5 ${isSimulatingFlush ? 'animate-spin' : ''}`} />
              <span>{lang === 'ar' ? 'محاكاة حقن طارد الأملاح الكيميائي' : 'Simulate Chemical Displacer Flush'}</span>
            </button>

            <button
              onClick={handleResetMetrics}
              className="p-1.5 rounded-lg bg-[#000000] border border-[#222226] text-gray-400 hover:text-white transition-colors"
              title={lang === 'ar' ? 'إعادة ضبط القيم للمستوى الأصلي' : 'Reset Baseline Values'}
            >
              <RefreshCw className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>
      </div>

      {/* 2. REQUIREMENT 1: Salinity & pH Monitor Widget */}
      <div className="rounded-2xl bg-[#0A0A0A] border border-[#222226] p-6 sm:p-8 shadow-[0_0_25px_rgba(178,123,255,0.06)] space-y-6">
        
        {/* Widget Header */}
        <div className="flex items-center justify-between border-b border-[#1F1F24] pb-4">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-[#B27BFF]/10 border border-[#B27BFF]/30 flex items-center justify-center text-[#B27BFF]">
              <Droplets className="w-5 h-5" />
            </div>
            <div>
              <h2 className="text-xl font-bold text-white leading-snug">
                {t.moghraSalinityTitle}
              </h2>
              <p className="text-xs text-[#9CA3AF] mt-0.5">
                {lang === 'ar' ? 'قراءات كهرومغناطيسية وطيفية لمياه الآبار وتربة المغرة' : 'Electromagnetic & spectral readings for Moghra wells & soil'}
              </p>
            </div>
          </div>

          <span className="text-xs px-2.5 py-1 rounded-full bg-red-500/10 text-red-400 border border-red-500/20 font-bold">
            {lang === 'ar' ? 'منطقة إجهاد ملحي عالي' : 'High Salinity Risk Zone'}
          </span>
        </div>

        {/* 3 Metric Cards: Water Salinity, Soil Salinity, Soil pH */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
          
          {/* Card 1: Water Salinity (PPM) */}
          <div className="p-5 rounded-xl bg-[#000000] border border-[#1F1F24] hover:border-[#B27BFF]/50 transition-all space-y-3">
            <div className="flex items-center justify-between text-[#9CA3AF]">
              <span className="text-xs font-semibold flex items-center gap-1.5">
                <Droplets className="w-4 h-4 text-cyan-400" />
                <span>{t.moghraWaterSalinity}</span>
              </span>
              <span className="text-[10px] text-red-400 font-bold">
                {lang === 'ar' ? 'مياه آبار شديدة الملوحة' : 'Severe Well Salinity'}
              </span>
            </div>

            <div className="flex items-baseline gap-2">
              <span className="text-3xl font-black text-white font-mono">
                {waterSalinity.toLocaleString()}
              </span>
              <span className="text-xs font-bold text-[#B27BFF]">{t.moghraPpmUnit}</span>
            </div>

            {/* Salinity Meter Bar */}
            <div>
              <div className="w-full bg-[#1A1A1E] h-2.5 rounded-full overflow-hidden">
                <div 
                  className="bg-gradient-to-r from-emerald-500 via-amber-500 to-red-500 h-full rounded-full"
                  style={{ width: `${Math.min(100, (waterSalinity / 10000) * 100)}%` }}
                />
              </div>
              <div className="flex justify-between text-[10px] text-gray-400 mt-1.5">
                <span>عذبة (500)</span>
                <span className="text-amber-400">الحد الطبيعي (3500)</span>
                <span className="text-red-400 font-bold">حرج (10,000)</span>
              </div>
            </div>

            <p className="text-[11px] text-gray-400 leading-relaxed border-t border-[#1F1F24] pt-2">
              {lang === 'ar' 
                ? 'تحتوي مياه آبار المغرة على تركيزات عالية من كلوريد الصوديوم وكبريتات المغنسيوم.'
                : 'Moghra well water contains elevated sodium chloride and magnesium sulfate ions.'}
            </p>
          </div>

          {/* Card 2: Soil Salinity (ECe) */}
          <div className="p-5 rounded-xl bg-[#000000] border border-[#1F1F24] hover:border-[#B27BFF]/50 transition-all space-y-3">
            <div className="flex items-center justify-between text-[#9CA3AF]">
              <span className="text-xs font-semibold flex items-center gap-1.5">
                <Activity className="w-4 h-4 text-[#B27BFF]" />
                <span>{t.moghraSoilSalinity}</span>
              </span>
              <span className="text-[10px] text-amber-400 font-bold">
                {soilSalinity > 8 ? (lang === 'ar' ? 'تربة ملحية صودية' : 'Saline-Sodic Soil') : (lang === 'ar' ? 'معالجة جزئية' : 'Partially Leached')}
              </span>
            </div>

            <div className="flex items-baseline gap-2">
              <span className="text-3xl font-black text-white font-mono">
                {soilSalinity}
              </span>
              <span className="text-xs font-bold text-[#B27BFF]">{t.moghraEcUnit}</span>
            </div>

            {/* Soil EC Bar */}
            <div>
              <div className="w-full bg-[#1A1A1E] h-2.5 rounded-full overflow-hidden">
                <div 
                  className="bg-gradient-to-r from-emerald-500 to-amber-500 h-full rounded-full transition-all duration-500"
                  style={{ width: `${Math.min(100, (soilSalinity / 16) * 100)}%` }}
                />
              </div>
              <div className="flex justify-between text-[10px] text-gray-400 mt-1.5">
                <span>مثالي (&lt; 2)</span>
                <span className="text-amber-400">تحمل النخيل (8-10)</span>
                <span className="text-red-400 font-bold">شديد (&gt; 12)</span>
              </div>
            </div>

            <p className="text-[11px] text-gray-400 leading-relaxed border-t border-[#1F1F24] pt-2">
              {lang === 'ar'
                ? 'تراكم الأملاح في منطقة الجذور السطحية نتيجة ارتفاع معدل البخر الشمسي (8.4 مم/يوم).'
                : 'Salts accumulate in upper root zones driven by high solar evapotranspiration (8.4 mm/day).'}
            </p>
          </div>

          {/* Card 3: Soil pH Level Gauge with WARNING if > 7.0 */}
          <div className={`p-5 rounded-xl border transition-all space-y-3 ${
            isPhHigh 
              ? 'bg-amber-950/20 border-amber-500/50 shadow-[0_0_20px_rgba(245,158,11,0.15)]' 
              : 'bg-[#000000] border-[#1F1F24]'
          }`}>
            <div className="flex items-center justify-between">
              <span className="text-xs font-semibold text-[#9CA3AF] flex items-center gap-1.5">
                <Activity className="w-4 h-4 text-amber-400" />
                <span>{t.moghraPhLevel}</span>
              </span>
              <span className={`text-[10px] px-2 py-0.5 rounded-full font-bold ${
                isPhHigh ? 'bg-amber-500/20 text-amber-300 border border-amber-500/30' : 'bg-emerald-500/20 text-emerald-400'
              }`}>
                {isPhHigh ? (lang === 'ar' ? 'قلوية مرتفعة > 7.0' : 'High Alkalinity > 7.0') : (lang === 'ar' ? 'متعادل مثالي' : 'Optimal pH')}
              </span>
            </div>

            <div className="flex items-baseline gap-2">
              <span className={`text-3xl font-black font-mono ${isPhHigh ? 'text-amber-300' : 'text-emerald-400'}`}>
                {soilPh}
              </span>
              <span className="text-xs font-bold text-[#B27BFF]">pH</span>
              <span className="text-[11px] text-gray-400 mr-auto">
                {isPhHigh ? (lang === 'ar' ? 'قاعدي قاسي' : 'Strong Alkaline') : (lang === 'ar' ? 'بيئة مثالية' : 'Buffered')}
              </span>
            </div>

            {/* pH Visual Gauge */}
            <div>
              <div className="w-full bg-[#1A1A1E] h-2.5 rounded-full overflow-hidden flex">
                <div className="w-1/3 bg-blue-500 h-full" title="Acidic (< 6.0)" />
                <div className="w-1/3 bg-emerald-500 h-full" title="Neutral (6.5 - 7.0)" />
                <div className="w-1/3 bg-amber-500 h-full" title="Alkaline (> 7.5)" />
              </div>
              <div className="flex justify-between text-[10px] text-gray-400 mt-1.5">
                <span>حمضي (5.5)</span>
                <span className="text-emerald-400 font-bold">المثالي (6.5 - 6.8)</span>
                <span className="text-amber-400 font-bold">قلوي (8.5)</span>
              </div>
            </div>

            <p className="text-[11px] text-gray-400 leading-relaxed border-t border-[#1F1F24] pt-2">
              {t.moghraPhSafeNotice}
            </p>
          </div>

        </div>

        {/* Dedicated Warning Box if Soil pH > 7.0 (Strictly requested by User) */}
        {isPhHigh && (
          <div className="rounded-xl border border-amber-500/40 bg-gradient-to-r from-amber-500/10 via-[#0A0A0A] to-amber-500/5 p-4 sm:p-5 flex items-start gap-3.5 animate-pulse-slow">
            <div className="p-2.5 rounded-lg bg-amber-500/20 text-amber-400 flex-shrink-0 mt-0.5">
              <AlertTriangle className="w-6 h-6" />
            </div>
            <div className="space-y-1.5 flex-1">
              <div className="flex items-center justify-between flex-wrap gap-2">
                <h3 className="text-sm sm:text-base font-bold text-amber-300">
                  {t.moghraPhWarningTitle}
                </h3>
                <span className="text-[10px] px-2.5 py-0.5 rounded-full bg-amber-500/20 text-amber-300 border border-amber-500/30 font-bold">
                  {lang === 'ar' ? 'توصية زراعية عاجلة' : 'Action Recommended'}
                </span>
              </div>
              <p className="text-xs sm:text-sm text-gray-300 leading-relaxed">
                {t.moghraPhWarningDesc}
              </p>
              <div className="pt-2 flex items-center gap-2 text-xs text-white">
                <span className="text-amber-400 font-bold">
                  {lang === 'ar' ? 'الحل الموصى به:' : 'Recommended Action:'}
                </span>
                <span>
                  {lang === 'ar'
                    ? 'حقن منظم الـ pH الكيميائي «ميلانو سلفا-بي إتش» لخفض الحموضة إلى 6.8 بأمان دون حرق الشعيرات الجذرية.'
                    : 'Inject pH regulator "Milano Sulfa-pH" to safely buffer rhizosphere down to 6.8 without scorching root hairs.'}
                </span>
              </div>
            </div>
          </div>
        )}

      </div>

      {/* 3. REQUIREMENT 2: Stress Management for Resilient Crops (Palms & Olives) */}
      <div className="rounded-2xl bg-[#0A0A0A] border border-[#222226] p-6 sm:p-8 shadow-[0_0_25px_rgba(178,123,255,0.06)] space-y-6">
        
        {/* Section Header */}
        <div className="flex items-center justify-between border-b border-[#1F1F24] pb-4">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-emerald-500/10 border border-emerald-500/30 flex items-center justify-center text-emerald-400">
              <Sprout className="w-5 h-5" />
            </div>
            <div>
              <h2 className="text-xl font-bold text-white leading-snug">
                {t.moghraResilientTitle}
              </h2>
              <p className="text-xs text-[#9CA3AF] mt-0.5">
                {t.moghraResilientSub}
              </p>
            </div>
          </div>

          <span className="text-xs text-[#B27BFF] font-semibold bg-[#B27BFF]/10 px-3 py-1 rounded-full border border-[#B27BFF]/20">
            {lang === 'ar' ? 'مؤشرات حيوية حية' : 'Physiological Biomarkers'}
          </span>
        </div>

        {/* Crops Selector Tabs */}
        <div className="flex items-center gap-3 overflow-x-auto pb-2 scrollbar-none">
          {RESILIENT_CROPS_STRESS.map((crop) => (
            <button
              key={crop.id}
              onClick={() => setSelectedCrop(crop)}
              className={`px-4 py-2.5 rounded-xl text-xs sm:text-sm font-bold transition-all flex items-center gap-2 whitespace-nowrap ${
                selectedCrop.id === crop.id
                  ? 'bg-[#B27BFF] text-black shadow-[0_0_15px_#B27BFF]'
                  : 'bg-[#000000] border border-[#222226] text-[#9CA3AF] hover:text-white'
              }`}
            >
              <Sprout className="w-4 h-4" />
              <span>{crop.name[lang]}</span>
              <span className={`text-[10px] px-2 py-0.2 rounded-full ${
                selectedCrop.id === crop.id
                  ? 'bg-black/20 text-black'
                  : 'bg-[#141414] text-gray-400'
              }`}>
                {crop.currentStressLevel}% {lang === 'ar' ? 'إجهاد' : 'Stress'}
              </span>
            </button>
          ))}
        </div>

        {/* Selected Crop Deep-Dive Detail Card */}
        <div className="p-6 rounded-xl bg-[#000000] border border-[#222226] space-y-6">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-[#1F1F24] pb-4">
            <div>
              <span className="text-xs text-[#B27BFF] font-semibold">
                {selectedCrop.category[lang]}
              </span>
              <h3 className="text-lg font-bold text-white mt-0.5">
                {selectedCrop.name[lang]}
              </h3>
            </div>

            <div className="flex items-center gap-4">
              <div className="text-right sm:text-left">
                <span className="text-xs text-[#9CA3AF] block">
                  {t.toleranceLimitLabel}
                </span>
                <span className="text-sm font-black text-white font-mono">
                  {selectedCrop.salinityToleranceLimitPpm.toLocaleString()} PPM
                </span>
              </div>

              <div className="h-8 w-px bg-[#1F1F24]" />

              <div className="text-right sm:text-left">
                <span className="text-xs text-[#9CA3AF] block">
                  {lang === 'ar' ? 'مستوى الإجهاد الملحي:' : 'Saline Stress Level:'}
                </span>
                <span className={`text-sm font-black font-mono ${
                  selectedCrop.stressSeverity === 'red' ? 'text-red-400' :
                  selectedCrop.stressSeverity === 'amber' ? 'text-amber-400' : 'text-emerald-400'
                }`}>
                  {selectedCrop.currentStressLevel}% ({selectedCrop.stressLevelLabel[lang]})
                </span>
              </div>
            </div>
          </div>

          {/* Root Absorption Efficiency Meter */}
          <div className="space-y-2">
            <div className="flex items-center justify-between text-xs font-semibold">
              <span className="text-gray-300">
                {t.rootAbsorptionLabel}
              </span>
              <span className="text-[#B27BFF] font-mono font-bold">
                {selectedCrop.rootAbsorptionEfficiency}
              </span>
            </div>
            <div className="w-full bg-[#1A1A1E] h-2.5 rounded-full overflow-hidden">
              <div 
                className="bg-gradient-to-r from-red-500 via-amber-500 to-emerald-500 h-full rounded-full"
                style={{ width: selectedCrop.rootAbsorptionEfficiency }}
              />
            </div>
          </div>

          {/* Symptoms and Mitigation Action Plan Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs">
            <div className="p-4 rounded-xl bg-[#0A0A0A] border border-[#1F1F24] space-y-1.5">
              <span className="font-bold text-amber-400 flex items-center gap-1.5">
                <AlertTriangle className="w-4 h-4 text-amber-400" />
                <span>{t.stressSymptomsLabel}</span>
              </span>
              <p className="text-gray-300 leading-relaxed">
                {selectedCrop.symptoms[lang]}
              </p>
            </div>

            <div className="p-4 rounded-xl bg-[#B27BFF]/10 border border-[#B27BFF]/30 space-y-1.5">
              <span className="font-bold text-white flex items-center gap-1.5">
                <Sparkles className="w-4 h-4 text-[#B27BFF]" />
                <span>{t.actionProtocolLabel}</span>
              </span>
              <p className="text-gray-200 leading-relaxed">
                {selectedCrop.actionPlan[lang]}
              </p>
            </div>
          </div>

        </div>

      </div>

      {/* 4. REQUIREMENT 3: Cost-Effective Treatment Recommender (Devices vs Chemicals) */}
      <div className="rounded-2xl bg-[#0A0A0A] border border-[#222226] p-6 sm:p-8 shadow-[0_0_25px_rgba(178,123,255,0.06)] space-y-6">
        
        {/* Section Header */}
        <div className="flex items-center justify-between border-b border-[#1F1F24] pb-4">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-[#B27BFF]/10 border border-[#B27BFF]/30 flex items-center justify-center text-[#B27BFF]">
              <Scale className="w-5 h-5" />
            </div>
            <div>
              <h2 className="text-xl font-bold text-white leading-snug">
                {t.moghraCostTitle}
              </h2>
              <p className="text-xs text-[#9CA3AF] mt-0.5">
                {t.moghraCostSub}
              </p>
            </div>
          </div>

          <span className="text-xs px-2.5 py-1 rounded-full bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 font-bold">
            {lang === 'ar' ? 'دراسة جدوى معتمدة' : 'Economic Feasibility Study'}
          </span>
        </div>

        {/* Side-by-Side Comparison: Engineering Devices vs Smart Chemical Solutions */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          
          {/* Column A: Engineering Desalination Devices */}
          <div className="p-6 rounded-2xl bg-[#000000] border border-red-500/30 space-y-4 relative">
            <div className="flex items-center justify-between">
              <span className="text-xs font-semibold px-2.5 py-1 rounded-md bg-red-500/10 text-red-400 border border-red-500/20">
                {lang === 'ar' ? 'حلول هندسية / ميكانيكية' : 'Mechanical / Engineering Units'}
              </span>
              <span className="text-xs text-gray-500 font-mono">Capex Heavy</span>
            </div>

            <h3 className="text-lg font-bold text-white">
              {COST_COMPARISON.desalinationDevices.title[lang]}
            </h3>

            {/* Financial Numbers */}
            <div className="space-y-2 p-3.5 rounded-xl bg-[#0A0A0A] border border-[#1F1F24] text-xs">
              <div className="flex justify-between items-center">
                <span className="text-[#9CA3AF]">{t.capexLabel}</span>
                <span className="font-bold text-red-400 font-mono text-sm">
                  {lang === 'ar' ? COST_COMPARISON.desalinationDevices.capexPer20Feddan.amount : COST_COMPARISON.desalinationDevices.capexPer20Feddan.enAmount}
                </span>
              </div>
              <div className="flex justify-between items-center border-t border-[#1F1F24] pt-2">
                <span className="text-[#9CA3AF]">{t.opexLabel}</span>
                <span className="font-bold text-gray-300 font-mono">
                  {lang === 'ar' ? COST_COMPARISON.desalinationDevices.opexAnnual.amount : COST_COMPARISON.desalinationDevices.opexAnnual.enAmount}
                </span>
              </div>
            </div>

            {/* Key Drawbacks */}
            <div className="space-y-2">
              <span className="text-xs font-bold text-gray-400">
                {t.majorDrawbacks}
              </span>
              <ul className="space-y-2 text-xs text-gray-400">
                {COST_COMPARISON.desalinationDevices.challenges.map((c, idx) => (
                  <li key={idx} className="flex items-start gap-2">
                    <span className="text-red-400 font-bold mt-0.5">✕</span>
                    <span className="leading-relaxed">{c[lang]}</span>
                  </li>
                ))}
              </ul>
            </div>

            <div className="pt-2 text-[11px] text-red-400 border-t border-[#1F1F24]">
              {lang === 'ar' ? COST_COMPARISON.desalinationDevices.recommendationRating : COST_COMPARISON.desalinationDevices.enRecommendationRating}
            </div>
          </div>

          {/* Column B: Smart Chemical Solutions (Recommended) */}
          <div className="p-6 rounded-2xl bg-gradient-to-b from-[#B27BFF]/10 via-[#000000] to-[#0A0A0A] border-2 border-[#B27BFF] shadow-[0_0_25px_rgba(178,123,255,0.2)] space-y-4 relative">
            <div className="flex items-center justify-between">
              <span className="text-xs font-bold px-2.5 py-1 rounded-md bg-[#B27BFF] text-black shadow-[0_0_10px_#B27BFF]">
                {lang === 'ar' ? 'الحل الأوفر والموصى به' : 'Recommended Smart Solution'}
              </span>
              <span className="text-xs text-emerald-400 font-mono font-bold">75%+ Savings</span>
            </div>

            <h3 className="text-lg font-bold text-white">
              {COST_COMPARISON.smartChemicalSolutions.title[lang]}
            </h3>

            {/* Financial Numbers */}
            <div className="space-y-2 p-3.5 rounded-xl bg-[#000000] border border-[#B27BFF]/30 text-xs">
              <div className="flex justify-between items-center">
                <span className="text-[#9CA3AF]">{t.capexLabel}</span>
                <span className="font-bold text-emerald-400 font-mono text-sm">
                  {lang === 'ar' ? COST_COMPARISON.smartChemicalSolutions.capexPer20Feddan.amount : COST_COMPARISON.smartChemicalSolutions.capexPer20Feddan.enAmount}
                </span>
              </div>
              <div className="flex justify-between items-center border-t border-[#1F1F24] pt-2">
                <span className="text-[#9CA3AF]">{t.opexLabel}</span>
                <span className="font-bold text-[#B27BFF] font-mono">
                  {lang === 'ar' ? COST_COMPARISON.smartChemicalSolutions.opexAnnual.amount : COST_COMPARISON.smartChemicalSolutions.opexAnnual.enAmount}
                </span>
              </div>
            </div>

            {/* Key Advantages */}
            <div className="space-y-2">
              <span className="text-xs font-bold text-gray-200">
                {t.majorBenefits}
              </span>
              <ul className="space-y-2 text-xs text-gray-300">
                {COST_COMPARISON.smartChemicalSolutions.advantages.map((adv, idx) => (
                  <li key={idx} className="flex items-start gap-2">
                    <CheckCircle2 className="w-4 h-4 text-emerald-400 flex-shrink-0 mt-0.5" />
                    <span className="leading-relaxed">{adv[lang]}</span>
                  </li>
                ))}
              </ul>
            </div>

            <div className="pt-2 text-[11px] text-emerald-400 font-bold border-t border-[#1F1F24]">
              {lang === 'ar' ? COST_COMPARISON.smartChemicalSolutions.recommendationRating : COST_COMPARISON.smartChemicalSolutions.enRecommendationRating}
            </div>
          </div>

        </div>

        {/* Detailed Agronomic Banner & Call to Action */}
        <div className="p-5 rounded-xl bg-gradient-to-r from-[#B27BFF]/15 via-[#0A0A0A] to-[#B27BFF]/10 border border-[#B27BFF]/30 flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
          <div className="space-y-1">
            <h4 className="text-sm font-bold text-white flex items-center gap-2">
              <Sparkles className="w-4 h-4 text-[#B27BFF]" />
              <span>{t.savingsBannerTitle}</span>
            </h4>
            <p className="text-xs text-gray-300 leading-relaxed max-w-3xl">
              {t.savingsBannerDesc}
            </p>
          </div>

          <button
            onClick={() => setSelectedProductForOrder(MOGHRA_PRODUCTS[0])}
            className="px-6 py-3 rounded-xl font-bold text-xs text-black bg-[#B27BFF] hover:bg-[#9E5FF5] transition-all duration-300 shadow-[0_0_15px_#B27BFF] hover:shadow-[0_0_25px_#B27BFF] flex items-center gap-2 whitespace-nowrap self-stretch md:self-auto justify-center"
          >
            <span>{t.btnOrderDisplacer}</span>
            <ShoppingBag className="w-4 h-4 text-black" />
          </button>
        </div>

        {/* Specialized Moghra Anti-Salinity Products Grid */}
        <div className="space-y-4 pt-4 border-t border-[#1F1F24]">
          <div className="flex items-center justify-between">
            <h3 className="text-sm font-bold text-white flex items-center gap-2">
              <ShoppingBag className="w-4 h-4 text-[#B27BFF]" />
              <span>{lang === 'ar' ? 'المركبات الكيميائية الذكية الموصى بها لأراضي المغرة:' : 'Recommended Chemical Formulations for Moghra Soils:'}</span>
            </h3>
            <span className="text-xs text-[#9CA3AF]">
              {lang === 'ar' ? 'توريد معتمد من شركة ميلانو' : 'Certified Supply by Milano Agro'}
            </span>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {MOGHRA_PRODUCTS.map((prod) => (
              <div 
                key={prod.id}
                className="p-4 rounded-xl bg-[#000000] border border-[#1F1F24] hover:border-[#B27BFF] transition-all duration-300 flex flex-col justify-between space-y-3 group"
              >
                <div>
                  <div className="relative h-36 rounded-lg overflow-hidden mb-3 bg-[#0A0A0A] border border-[#222226]">
                    <img 
                      src={prod.image} 
                      alt={prod.name[lang]} 
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                    />
                    <div className="absolute top-2 right-2 bg-black/80 px-2 py-0.5 rounded text-[10px] text-[#B27BFF] font-bold border border-[#B27BFF]/30">
                      {prod.badge[lang]}
                    </div>
                  </div>

                  <span className="text-[10px] text-gray-400 font-medium">
                    {prod.category[lang]}
                  </span>
                  <h4 className="text-sm font-bold text-white group-hover:text-[#B27BFF] transition-colors mt-0.5">
                    {prod.name[lang]}
                  </h4>

                  <div className="text-[11px] text-emerald-400 mt-1.5 flex items-center gap-1 font-semibold">
                    <CheckCircle2 className="w-3.5 h-3.5" />
                    <span>{prod.effectOnPh[lang]}</span>
                  </div>

                  <div className="text-[10px] text-gray-400 mt-1">
                    <strong className="text-gray-300">{lang === 'ar' ? 'الجرعة:' : 'Dosage:'} </strong>
                    {prod.dosage[lang]}
                  </div>
                </div>

                <div className="border-t border-[#1F1F24] pt-3 flex items-center justify-between">
                  <div>
                    <div className="text-base font-black text-white font-mono">
                      {prod.price} <span className="text-xs text-[#B27BFF]">EGP</span>
                    </div>
                    <span className="text-[10px] text-gray-500 line-through">
                      {prod.originalPrice} EGP
                    </span>
                  </div>

                  <button
                    onClick={() => setSelectedProductForOrder(prod)}
                    className="px-4 py-2 rounded-lg font-bold text-xs text-black bg-[#B27BFF] hover:bg-[#9E5FF5] transition-all shadow-[0_0_10px_#B27BFF] flex items-center gap-1.5"
                  >
                    <span>{t.btnBuyNow}</span>
                    <ShoppingBag className="w-3.5 h-3.5 text-black" />
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>

      </div>

      {/* Order Modal for Moghra Products */}
      {selectedProductForOrder && (
        <OrderModal 
          product={{
            ...selectedProductForOrder,
            name: typeof selectedProductForOrder.name === 'object' ? (selectedProductForOrder.name[lang] || selectedProductForOrder.name.en) : selectedProductForOrder.name,
            category: typeof selectedProductForOrder.category === 'object' ? (selectedProductForOrder.category[lang] || selectedProductForOrder.category.en) : selectedProductForOrder.category,
            unit: typeof selectedProductForOrder.unit === 'object' ? (selectedProductForOrder.unit[lang] || selectedProductForOrder.unit.en) : selectedProductForOrder.unit,
            badge: typeof selectedProductForOrder.badge === 'object' ? (selectedProductForOrder.badge[lang] || selectedProductForOrder.badge.en) : selectedProductForOrder.badge
          }}
          farmData={{
            farmName: lang === 'ar' ? 'مزرعة المغرة النموذجية' : 'Moghra Model Farm',
            locationName: lang === 'ar' ? 'منطقة المغرة - الريف المصري' : 'Moghra Region - Egyptian Countryside',
            size: 25
          }}
          onClose={() => setSelectedProductForOrder(null)}
          lang={lang}
        />
      )}

    </div>
  );
}

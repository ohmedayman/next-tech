import React, { useState } from 'react';
import { 
  MapPin, 
  Sprout, 
  Maximize2, 
  Satellite, 
  Sparkles, 
  Sliders, 
  CheckCircle2, 
  Layers,
  Leaf,
  Droplets,
  ArrowRight,
  ArrowLeft
} from 'lucide-react';
import { NasaClimateWidget } from './widgets/NasaClimateWidget';
import { AiCropDiagnosisWidget } from './widgets/AiCropDiagnosisWidget';
import { MarketplaceWidget } from './widgets/MarketplaceWidget';
import { TRANSLATIONS } from '../data/translations';

export function Dashboard({ farmData, onEditFarm, onGoHome, onGoMoghra, lang = 'en' }) {
  const t = TRANSLATIONS[lang];
  const isRtl = lang === 'ar';

  // Synchronized state between Diagnosis and Marketplace
  const [highlightedProductIds, setHighlightedProductIds] = useState(['prod-1', 'prod-2']);

  const handleSelectProductForDiagnosis = (productIds) => {
    setHighlightedProductIds(productIds);
    // Smooth scroll down to marketplace widget
    const marketplaceEl = document.getElementById('marketplace-widget');
    if (marketplaceEl) {
      marketplaceEl.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const isMoghraFarm = farmData?.location === 'moghra' || farmData?.locationName?.includes('المغرة');

  return (
    <div className="min-h-screen py-8 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto space-y-8 animate-fadeIn">
      
      {/* 1. Farm Overview & Satellite Status Header */}
      <div className="rounded-2xl bg-[#0A0A0A] border border-[#222226] p-6 sm:p-8 shadow-[0_0_30px_rgba(178,123,255,0.06)]">
        <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-6">
          
          {/* Farm Details with generous spacing */}
          <div className="space-y-3">
            <div className="flex items-center gap-2 flex-wrap">
              <span className="text-xs px-2.5 py-0.5 rounded-full bg-[#B27BFF]/15 text-[#B27BFF] border border-[#B27BFF]/30 font-bold flex items-center gap-1.5">
                <Satellite className="w-3.5 h-3.5" />
                <span>{t.activeOrbit}</span>
              </span>

              <span className="text-xs text-[#9CA3AF] flex items-center gap-1.5">
                <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400" />
                <span>{t.farmVerified}</span>
              </span>
            </div>

            <h1 className="text-2xl sm:text-3xl font-black text-white flex items-center gap-3 flex-wrap leading-snug">
              <span>{farmData?.farmName || 'Al-Wadi Farm'}</span>
              <span className="text-sm font-normal text-[#9CA3AF]">
                ({farmData?.farmerName || 'Farmer'})
              </span>
            </h1>

            {/* Farm Badges */}
            <div className="flex items-center gap-3 sm:gap-4 flex-wrap text-xs text-gray-300 pt-1">
              <div className="flex items-center gap-1.5 bg-[#000000] px-3 py-1.5 rounded-xl border border-[#1F1F24]">
                <MapPin className="w-3.5 h-3.5 text-[#B27BFF]" />
                <span>{farmData?.locationName || 'Fayoum'}</span>
              </div>

              <div className="flex items-center gap-1.5 bg-[#000000] px-3 py-1.5 rounded-xl border border-[#1F1F24]">
                <Sprout className="w-3.5 h-3.5 text-emerald-400" />
                <span>{t.cropLabel} <strong className="text-white">{farmData?.cropName || 'Wheat'}</strong></span>
              </div>

              <div className="flex items-center gap-1.5 bg-[#000000] px-3 py-1.5 rounded-xl border border-[#1F1F24]">
                <Maximize2 className="w-3.5 h-3.5 text-blue-400" />
                <span>{t.areaLabel} <strong className="text-white font-mono">{farmData?.size || 15}</strong> {t.acresUnit}</span>
              </div>
            </div>
          </div>

          {/* Quick Actions & Moghra Direct Access */}
          <div className="flex items-center gap-3 self-start lg:self-center flex-wrap">
            {onGoMoghra && (
              <button
                onClick={onGoMoghra}
                className="px-4 py-2.5 rounded-xl text-xs sm:text-sm font-bold text-amber-300 bg-amber-500/10 hover:bg-amber-500/20 border border-amber-500/30 transition-all flex items-center gap-2"
                title={lang === 'ar' ? 'عرض رصد الملوحة الخاص بأراضي المغرة' : 'Access Moghra Salinity System'}
              >
                <Droplets className="w-4 h-4 text-amber-400" />
                <span>{t.navMoghra}</span>
              </button>
            )}

            <button
              onClick={onEditFarm}
              className="px-4 py-2.5 rounded-xl text-xs sm:text-sm font-semibold text-white bg-[#000000] hover:bg-[#141414] border border-[#222226] hover:border-[#B27BFF] transition-all flex items-center gap-2"
            >
              <Sliders className="w-4 h-4 text-[#B27BFF]" />
              <span>{t.btnEditFarm}</span>
            </button>

            <button
              onClick={onGoHome}
              className="px-4 py-2.5 rounded-xl text-xs sm:text-sm font-semibold text-[#9CA3AF] hover:text-white bg-[#000000] hover:bg-[#141414] border border-[#222226] transition-all"
            >
              {t.navHome}
            </button>
          </div>

        </div>
      </div>

      {/* Special Moghra Notice Banner if Moghra Farm */}
      {isMoghraFarm && onGoMoghra && (
        <div className="p-4 sm:p-5 rounded-2xl bg-gradient-to-r from-amber-500/15 via-[#0A0A0A] to-amber-500/10 border border-amber-500/40 flex items-center justify-between flex-wrap gap-4">
          <div className="flex items-center gap-3">
            <div className="p-2.5 rounded-xl bg-amber-500/20 text-amber-400">
              <Droplets className="w-6 h-6 animate-pulse" />
            </div>
            <div>
              <h4 className="text-sm font-bold text-amber-300">
                {lang === 'ar' ? 'تنبيه منظومة المغرة: رصد ملوحة الآبار وحموضة التربة نشط' : 'Moghra Region Salinity & Soil pH Active Monitoring'}
              </h4>
              <p className="text-xs text-gray-300 mt-0.5 leading-relaxed">
                {lang === 'ar'
                  ? 'تم رصد ملوحة مياه بئر مرتفعة (6,850 PPM) وقلوية pH 7.9. يمكنك الاطلاع على تحليلات الإجهاد ومعالجات خفض الملوحة.'
                  : 'High well salinity detected (6,850 PPM) & pH 7.9. Explore crop stress analysis and chemical displacers.'}
              </p>
            </div>
          </div>

          <button
            onClick={onGoMoghra}
            className="px-4 py-2 rounded-xl text-xs font-bold text-black bg-amber-400 hover:bg-amber-300 transition-all flex items-center gap-1.5 shadow-[0_0_12px_rgba(245,158,11,0.3)]"
          >
            <span>{lang === 'ar' ? 'افتح منظومة المغرة' : 'Open Moghra System'}</span>
            {isRtl ? <ArrowLeft className="w-3.5 h-3.5 text-black" /> : <ArrowRight className="w-3.5 h-3.5 text-black" />}
          </button>
        </div>
      )}

      {/* 2. Main Content Area: CSS Grid with the 3 Main Widgets */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        
        {/* Widget 1: NASA Climate & Soil Widget */}
        <div className="w-full">
          <NasaClimateWidget farmData={farmData} lang={lang} />
        </div>

        {/* Widget 2: AI Crop Diagnosis Widget */}
        <div className="w-full">
          <AiCropDiagnosisWidget 
            onSelectProductForDiagnosis={handleSelectProductForDiagnosis}
            lang={lang}
          />
        </div>

      </div>

      {/* Widget 3: B2B/B2C Marketplace Widget */}
      <div id="marketplace-widget" className="w-full">
        <MarketplaceWidget 
          farmData={farmData}
          recommendedProductIds={highlightedProductIds}
          lang={lang}
        />
      </div>

    </div>
  );
}

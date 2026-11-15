import React, { useState, useEffect } from 'react';
import { 
  MapPin, 
  Sprout, 
  Maximize2, 
  Satellite, 
  Sparkles, 
  ArrowLeft, 
  ArrowRight,
  CheckCircle2, 
  Loader2,
  Radio,
  Layers,
  Wheat,
  Info,
  Droplets
} from 'lucide-react';
import { GOVERNORATES, CROPS } from '../data/mockData';
import { TRANSLATIONS } from '../data/translations';

export function Onboarding({ initialData, onComplete, lang = 'en' }) {
  const t = TRANSLATIONS[lang];
  const isRtl = lang === 'ar';

  // Form state
  const [formData, setFormData] = useState(
    initialData || {
      farmName: 'Al-Wadi Farm',
      location: 'moghra',
      crop: 'wheat',
      size: 15,
      farmerName: 'Mahmoud Abdullah'
    }
  );

  // Loading simulation state
  const [isLoading, setIsLoading] = useState(false);
  const [progress, setProgress] = useState(0);
  const [analysisStep, setAnalysisStep] = useState(0);

  const steps = [
    { title: t.simStep1Title, detail: t.simStep1Detail },
    { title: t.simStep2Title, detail: t.simStep2Detail },
    { title: t.simStep3Title, detail: t.simStep3Detail },
    { title: t.simStep4Title, detail: t.simStep4Detail },
  ];

  const handleSubmit = (e) => {
    e.preventDefault();
    setIsLoading(true);
    setProgress(5);
    setAnalysisStep(0);
  };

  // Realistic simulation timer
  useEffect(() => {
    if (!isLoading) return;

    const timer = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 100) {
          clearInterval(timer);
          setTimeout(() => {
            const locObj = GOVERNORATES.find(g => g.id === formData.location) || GOVERNORATES[0];
            const cropObj = CROPS.find(c => c.id === formData.crop) || CROPS[0];
            
            onComplete({
              ...formData,
              locationName: locObj.name,
              cropName: cropObj.name,
              cropCategory: cropObj.category,
              idealMoisture: cropObj.idealMoisture
            });
          }, 600);
          return 100;
        }

        const next = prev + 5;
        if (next >= 25 && next < 50) setAnalysisStep(1);
        else if (next >= 50 && next < 75) setAnalysisStep(2);
        else if (next >= 75) setAnalysisStep(3);

        return next;
      });
    }, 120);

    return () => clearInterval(timer);
  }, [isLoading, formData, onComplete]);

  const isMoghraSelected = formData.location === 'moghra';

  return (
    <div className="relative min-h-[calc(100vh-80px)] py-12 px-4 sm:px-6 lg:px-8 flex items-center justify-center">
      {/* Background glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[550px] h-[550px] bg-[#B27BFF]/10 rounded-full blur-[160px] pointer-events-none -z-10" />

      <div className="w-full max-w-2xl">
        
        {/* Main Card with generous padding and space */}
        <div className="relative rounded-2xl bg-[#0A0A0A] border border-[#222226] p-6 sm:p-10 shadow-[0_0_35px_rgba(178,123,255,0.12)]">
          
          {/* Card Header */}
          <div className="text-center mb-8 space-y-2">
            <div className="inline-flex items-center justify-center w-16 h-16 rounded-2xl bg-[#B27BFF]/10 border border-[#B27BFF]/30 text-[#B27BFF] mb-3 shadow-[0_0_15px_rgba(178,123,255,0.3)]">
              <Satellite className="w-8 h-8 animate-pulse" />
            </div>
            
            <h2 className="text-2xl sm:text-3xl font-extrabold text-white leading-snug">
              {t.onboardTitle}
            </h2>
            <p className="text-sm text-[#9CA3AF] max-w-lg mx-auto leading-relaxed">
              {t.onboardSubtitle}
            </p>
          </div>

          {isLoading ? (
            /* NASA Data Fetching Loading Simulation */
            <div className="py-6 flex flex-col items-center text-center">
              
              {/* Radar Orbit Visual */}
              <div className="relative w-36 h-36 mb-8 flex items-center justify-center">
                <div className="absolute inset-0 rounded-full border border-[#B27BFF]/20 animate-ping opacity-30" />
                <div className="absolute inset-3 rounded-full border border-dashed border-[#B27BFF]/40 animate-spin" style={{ animationDuration: '8s' }} />
                <div className="absolute inset-8 rounded-full border border-[#B27BFF]/60 animate-pulse" />
                <div className="w-16 h-16 rounded-full bg-[#000000] border border-[#B27BFF] flex items-center justify-center text-[#B27BFF] shadow-[0_0_20px_#B27BFF]">
                  <Satellite className="w-8 h-8 animate-bounce" />
                </div>
              </div>

              {/* Progress Percentage */}
              <div className="text-3xl font-black text-white font-mono mb-2 flex items-center gap-1">
                <span>{progress}%</span>
              </div>

              {/* Active Step Indicator */}
              <div className="w-full max-w-md bg-[#000000] rounded-full h-3 border border-[#222226] overflow-hidden mb-6 p-0.5">
                <div 
                  className="bg-gradient-to-l from-[#B27BFF] to-[#D3AFFF] h-full rounded-full transition-all duration-200 shadow-[0_0_12px_#B27BFF]" 
                  style={{ width: `${progress}%` }}
                />
              </div>

              {/* Current Step Description */}
              <div className="w-full bg-[#121215] border border-[#222226] rounded-xl p-4 text-start mb-4 space-y-1">
                <div className="flex items-center gap-2 text-xs font-bold text-[#B27BFF]">
                  <Radio className="w-3.5 h-3.5 animate-pulse" />
                  <span>{t.stageLabel} {analysisStep + 1} {t.ofLabel} 4</span>
                </div>
                <div className="text-sm font-semibold text-white leading-relaxed">
                  {steps[analysisStep].title}
                </div>
                <div className="text-xs text-[#9CA3AF] leading-relaxed">
                  {steps[analysisStep].detail}
                </div>
              </div>

              <div className="text-xs text-gray-400 flex items-center gap-2">
                <Loader2 className="w-4 h-4 animate-spin text-[#B27BFF]" />
                <span>{t.simProcessing}</span>
              </div>
            </div>

          ) : (

            /* Farm Setup Form */
            <form onSubmit={handleSubmit} className="space-y-6">
              
              {/* 1. Farm Location (Dropdown) */}
              <div className="space-y-2">
                <label className="block text-sm font-semibold text-white text-start flex items-center justify-between">
                  <span className="flex items-center gap-1.5">
                    <MapPin className="w-4 h-4 text-[#B27BFF]" />
                    <span>{t.lblLocation}</span>
                  </span>
                  <span className="text-xs text-[#9CA3AF] font-normal">{t.lblLocationHint}</span>
                </label>
                
                <div className="relative">
                  <select
                    value={formData.location}
                    onChange={(e) => setFormData({ ...formData, location: e.target.value })}
                    required
                    className="w-full px-4 py-3.5 rounded-xl bg-[#000000] border border-[#222226] text-white focus:outline-none focus:border-[#B27BFF] focus:ring-1 focus:ring-[#B27BFF] transition-all cursor-pointer text-sm"
                  >
                    {GOVERNORATES.map((gov) => (
                      <option key={gov.id} value={gov.id} className="bg-[#0A0A0A] text-white py-2">
                        {gov.name}
                      </option>
                    ))}
                  </select>
                </div>

                {/* Moghra Special Badge if selected */}
                {isMoghraSelected && (
                  <div className="p-3 rounded-xl bg-amber-500/10 border border-amber-500/30 text-xs text-amber-300 flex items-center gap-2 animate-fadeIn">
                    <Droplets className="w-4 h-4 text-amber-400 flex-shrink-0" />
                    <span>
                      {lang === 'ar' 
                        ? 'أراضي المغرة: سيتم تفعيل وحدة رصد الملوحة ومعالجات الصوديوم والـ pH تلقائياً لمزرعتك!'
                        : 'Moghra Region: Salinity, pH monitoring & chemical displacer module will be activated for your farm!'}
                    </span>
                  </div>
                )}
              </div>

              {/* 2. Crop Type (Dropdown) */}
              <div className="space-y-2">
                <label className="block text-sm font-semibold text-white text-start flex items-center justify-between">
                  <span className="flex items-center gap-1.5">
                    <Sprout className="w-4 h-4 text-[#B27BFF]" />
                    <span>{t.lblCrop}</span>
                  </span>
                  <span className="text-xs text-[#9CA3AF] font-normal">{t.lblCropHint}</span>
                </label>

                <div className="relative">
                  <select
                    value={formData.crop}
                    onChange={(e) => setFormData({ ...formData, crop: e.target.value })}
                    required
                    className="w-full px-4 py-3.5 rounded-xl bg-[#000000] border border-[#222226] text-white focus:outline-none focus:border-[#B27BFF] focus:ring-1 focus:ring-[#B27BFF] transition-all cursor-pointer text-sm"
                  >
                    {CROPS.map((crop) => (
                      <option key={crop.id} value={crop.id} className="bg-[#0A0A0A] text-white py-2">
                        {crop.name} ({crop.category} - {crop.season})
                      </option>
                    ))}
                  </select>
                </div>

                {/* Crop Quick Presets */}
                <div className="flex flex-wrap gap-2 pt-1">
                  {CROPS.slice(0, 5).map((c) => (
                    <button
                      type="button"
                      key={c.id}
                      onClick={() => setFormData({ ...formData, crop: c.id })}
                      className={`text-xs px-2.5 py-1 rounded-lg border transition-all ${
                        formData.crop === c.id
                          ? 'bg-[#B27BFF]/20 border-[#B27BFF] text-[#B27BFF]'
                          : 'bg-[#000000] border-[#1F1F24] text-[#9CA3AF] hover:text-white'
                      }`}
                    >
                      {c.name}
                    </button>
                  ))}
                </div>
              </div>

              {/* 3. Farm Size in acres (فدان) */}
              <div className="space-y-2">
                <label className="block text-sm font-semibold text-white text-start flex items-center justify-between">
                  <span className="flex items-center gap-1.5">
                    <Maximize2 className="w-4 h-4 text-[#B27BFF]" />
                    <span>{t.lblSize}</span>
                  </span>
                  <span className="text-xs text-[#B27BFF] font-semibold">{formData.size} {t.acresUnit}</span>
                </label>

                <div className="relative flex items-center">
                  <input
                    type="number"
                    min="1"
                    max="5000"
                    value={formData.size}
                    onChange={(e) => setFormData({ ...formData, size: Number(e.target.value) || 1 })}
                    required
                    className="w-full px-4 py-3.5 rounded-xl bg-[#000000] border border-[#222226] text-white focus:outline-none focus:border-[#B27BFF] focus:ring-1 focus:ring-[#B27BFF] transition-all text-sm font-mono"
                    placeholder="15"
                  />
                  <div className={`absolute ${isRtl ? 'left-4' : 'right-4'} text-xs font-bold text-[#9CA3AF] pointer-events-none`}>
                    {t.acresUnit}
                  </div>
                </div>

                {/* Quick Presets for Acres */}
                <div className="grid grid-cols-4 gap-2 pt-1">
                  {[5, 10, 20, 50].map((sizeVal) => (
                    <button
                      type="button"
                      key={sizeVal}
                      onClick={() => setFormData({ ...formData, size: sizeVal })}
                      className={`py-1.5 px-2 rounded-lg text-xs font-semibold border transition-all ${
                        formData.size === sizeVal 
                          ? 'bg-[#B27BFF] text-black border-[#B27BFF] shadow-[0_0_10px_#B27BFF]' 
                          : 'bg-[#000000] border-[#1F1F24] text-[#9CA3AF] hover:border-[#B27BFF]/50'
                      }`}
                    >
                      {sizeVal} {t.acresUnit}
                    </button>
                  ))}
                </div>
              </div>

              {/* Extra Details (Farm Name) */}
              <div className="space-y-2">
                <label className="block text-sm font-semibold text-white text-start">
                  {t.lblFarmName}
                </label>
                <input
                  type="text"
                  value={formData.farmName}
                  onChange={(e) => setFormData({ ...formData, farmName: e.target.value })}
                  className="w-full px-4 py-3.5 rounded-xl bg-[#000000] border border-[#222226] text-white focus:outline-none focus:border-[#B27BFF] focus:ring-1 focus:ring-[#B27BFF] transition-all text-sm"
                  placeholder={t.lblFarmNamePlaceholder}
                />
              </div>

              {/* Notice badge */}
              <div className="p-3.5 rounded-xl bg-[#121215] border border-[#1F1F24] flex items-start gap-2.5 text-xs text-[#9CA3AF] leading-relaxed">
                <Info className="w-4 h-4 text-[#B27BFF] flex-shrink-0 mt-0.5" />
                <span>{t.infoNotice}</span>
              </div>

              {/* Submit Button */}
              <button
                type="submit"
                className="w-full py-4 px-6 rounded-xl font-bold text-base text-black bg-[#B27BFF] hover:bg-[#9E5FF5] transition-all duration-300 shadow-[0_0_20px_#B27BFF] hover:shadow-[0_0_30px_#B27BFF] flex items-center justify-center gap-2 transform active:scale-98"
              >
                <span>{t.btnAnalyzeLand}</span>
                <Satellite className="w-5 h-5 text-black" />
              </button>

            </form>
          )}

        </div>

      </div>
    </div>
  );
}

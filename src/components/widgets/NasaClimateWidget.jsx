import React, { useState } from 'react';
import { 
  Satellite, 
  Thermometer, 
  Droplets, 
  AlertTriangle, 
  Wind, 
  Sun, 
  Calendar, 
  RefreshCw, 
  CheckCircle2, 
  Activity, 
  Layers,
  Clock,
  Sparkles
} from 'lucide-react';
import { NASA_SATELLITE_FEED } from '../../data/mockData';
import { TRANSLATIONS } from '../../data/translations';

export function NasaClimateWidget({ farmData, lang = 'en' }) {
  const t = TRANSLATIONS[lang];
  const [feed, setFeed] = useState(NASA_SATELLITE_FEED);
  const [isRefreshing, setIsRefreshing] = useState(false);
  const [activeTab, setActiveTab] = useState('overview'); // 'overview' | 'irrigation'

  const handleRefresh = () => {
    setIsRefreshing(true);
    setTimeout(() => {
      setFeed(prev => ({
        ...prev,
        weatherMetrics: {
          ...prev.weatherMetrics,
          temp: 24 + (Math.random() > 0.5 ? 1 : -1),
          soilMoisture: Math.min(65, Math.max(25, prev.weatherMetrics.soilMoisture + (Math.random() > 0.5 ? 2 : -2))),
          humidity: Math.min(80, Math.max(30, prev.weatherMetrics.humidity + (Math.random() > 0.5 ? 3 : -3)))
        }
      }));
      setIsRefreshing(false);
    }, 800);
  };

  const { weatherMetrics, frostAlert, irrigationSchedule } = feed;

  return (
    <div className="relative rounded-2xl bg-[#0A0A0A] border border-[#222226] p-6 sm:p-7 shadow-[0_0_25px_rgba(178,123,255,0.08)] flex flex-col justify-between space-y-6">
      
      {/* Widget Header with generous line height and spacing */}
      <div className="space-y-5">
        <div className="flex items-center justify-between border-b border-[#1F1F24] pb-4">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-[#B27BFF]/10 border border-[#B27BFF]/30 flex items-center justify-center text-[#B27BFF] shadow-[0_0_10px_rgba(178,123,255,0.2)]">
              <Satellite className="w-5 h-5 animate-pulse-slow" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h3 className="text-lg font-bold text-white leading-snug">{t.widgetClimateTitle}</h3>
                <span className="text-[10px] px-2 py-0.5 rounded-full bg-[#B27BFF]/15 text-[#B27BFF] border border-[#B27BFF]/30 font-medium">
                  NASA Telemetry
                </span>
              </div>
              <p className="text-xs text-[#9CA3AF] mt-0.5">
                {t.widgetClimateSub} {farmData?.locationName ? farmData.locationName.split(' ')[0] : 'Farm'}
              </p>
            </div>
          </div>

          <button
            onClick={handleRefresh}
            disabled={isRefreshing}
            className="p-2 rounded-xl bg-[#000000] border border-[#1F1F24] hover:border-[#B27BFF] text-[#9CA3AF] hover:text-white transition-all disabled:opacity-50"
            title={t.btnRefreshTelemetry}
          >
            <RefreshCw className={`w-4 h-4 ${isRefreshing ? 'animate-spin text-[#B27BFF]' : ''}`} />
          </button>
        </div>

        {/* Tab Switcher: Overview vs Irrigation Calendar */}
        <div className="flex items-center gap-2 bg-[#000000] p-1.5 rounded-xl border border-[#1F1F24] text-xs font-semibold">
          <button
            onClick={() => setActiveTab('overview')}
            className={`flex-1 py-2 rounded-lg transition-all flex items-center justify-center gap-1.5 ${
              activeTab === 'overview'
                ? 'bg-[#B27BFF] text-black shadow-[0_0_12px_rgba(178,123,255,0.4)] font-bold'
                : 'text-[#9CA3AF] hover:text-white'
            }`}
          >
            <Activity className="w-3.5 h-3.5" />
            <span>{t.tabOverview}</span>
          </button>
          
          <button
            onClick={() => setActiveTab('irrigation')}
            className={`flex-1 py-2 rounded-lg transition-all flex items-center justify-center gap-1.5 ${
              activeTab === 'irrigation'
                ? 'bg-[#B27BFF] text-black shadow-[0_0_12px_rgba(178,123,255,0.4)] font-bold'
                : 'text-[#9CA3AF] hover:text-white'
            }`}
          >
            <Calendar className="w-3.5 h-3.5" />
            <span>{t.tabIrrigation}</span>
          </button>
        </div>

        {/* Tab 1: Overview Indicators */}
        {activeTab === 'overview' && (
          <div className="space-y-4">
            
            {/* Critical Recommendation Alert Box */}
            <div className="rounded-xl border border-amber-500/40 bg-gradient-to-r from-amber-500/10 via-[#0A0A0A] to-amber-500/5 p-4 sm:p-5 relative overflow-hidden">
              <div className="flex items-start gap-3.5">
                <div className="p-2.5 rounded-lg bg-amber-500/20 text-amber-400 mt-0.5 flex-shrink-0">
                  <AlertTriangle className="w-5 h-5 animate-bounce" />
                </div>
                <div className="flex-1 space-y-2">
                  <div className="flex items-center justify-between flex-wrap gap-2">
                    <h4 className="text-sm font-bold text-amber-300 leading-snug">
                      {t.frostAlertTitle}
                    </h4>
                    <span className="text-[10px] px-2 py-0.5 rounded-full bg-amber-500/20 text-amber-300 border border-amber-500/30 font-bold">
                      {t.frostAlertBadge}
                    </span>
                  </div>
                  <p className="text-xs text-gray-300 leading-relaxed">
                    {t.frostAlertDesc}
                  </p>
                  <div className="text-xs font-semibold text-white bg-[#000000]/70 p-3 rounded-lg border border-amber-500/30 flex items-start gap-2 leading-relaxed">
                    <span className="text-amber-400 flex-shrink-0 font-bold">{t.frostActionLabel}</span>
                    <span>{t.frostActionText}</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Main Primary Metrics Grid: Temperature & Soil Moisture */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              
              {/* Temperature Card */}
              <div className="p-4 sm:p-5 rounded-xl bg-[#000000] border border-[#1F1F24] hover:border-[#B27BFF]/50 transition-all space-y-2.5">
                <div className="flex items-center justify-between">
                  <span className="text-xs text-[#9CA3AF] flex items-center gap-1.5">
                    <Thermometer className="w-4 h-4 text-[#B27BFF]" />
                    <span>{t.airTempLabel}</span>
                  </span>
                  <span className="text-[11px] text-gray-400">
                    {weatherMetrics.tempMin}° / {weatherMetrics.tempMax}°
                  </span>
                </div>
                
                <div className="flex items-baseline gap-2">
                  <span className="text-3xl font-black text-white font-mono">
                    {weatherMetrics.temp}
                  </span>
                  <span className="text-base font-bold text-[#B27BFF]">°C</span>
                  <span className="text-xs text-[#9CA3AF] ml-auto">
                    {t.tempFeelsLike} {weatherMetrics.tempFeelsLike}°C
                  </span>
                </div>

                <div className="flex items-center justify-between text-[11px] text-gray-400 border-t border-[#1F1F24] pt-2">
                  <span className="flex items-center gap-1">
                    <Sun className="w-3 h-3 text-amber-400" />
                    <span>{t.solarRadLabel} {weatherMetrics.solarRadiation}</span>
                  </span>
                  <span className="flex items-center gap-1">
                    <Wind className="w-3 h-3 text-blue-400" />
                    <span>{t.windLabel} {weatherMetrics.windSpeed}</span>
                  </span>
                </div>
              </div>

              {/* Soil Moisture Card */}
              <div className="p-4 sm:p-5 rounded-xl bg-[#000000] border border-[#1F1F24] hover:border-[#B27BFF]/50 transition-all space-y-2.5">
                <div className="flex items-center justify-between">
                  <span className="text-xs text-[#9CA3AF] flex items-center gap-1.5">
                    <Droplets className="w-4 h-4 text-cyan-400" />
                    <span>{t.soilMoistureLabel}</span>
                  </span>
                  <span className="text-[11px] text-cyan-400 font-semibold">
                    {t.soilDepthNotice}
                  </span>
                </div>

                <div className="flex items-baseline gap-2">
                  <span className="text-3xl font-black text-white font-mono">
                    {weatherMetrics.soilMoisture}%
                  </span>
                  <span className="text-xs text-amber-400 font-semibold ml-auto">
                    {weatherMetrics.soilStatus}
                  </span>
                </div>

                {/* Moisture Bar */}
                <div>
                  <div className="w-full bg-[#1A1A1E] h-2 rounded-full overflow-hidden">
                    <div 
                      className="bg-gradient-to-l from-cyan-400 to-[#B27BFF] h-full rounded-full transition-all duration-500 shadow-[0_0_8px_cyan]"
                      style={{ width: `${weatherMetrics.soilMoisture}%` }}
                    />
                  </div>
                  <div className="flex justify-between text-[10px] text-gray-500 mt-1">
                    <span>0%</span>
                    <span className="text-emerald-400">{t.soilIdealHint} ({farmData?.idealMoisture || '35% - 50%'})</span>
                    <span>100%</span>
                  </div>
                </div>
              </div>

            </div>

            {/* Satellite NDVI Index Bar */}
            <div className="p-4 rounded-xl bg-[#000000] border border-[#1F1F24] flex items-center justify-between flex-wrap gap-3">
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 rounded-lg bg-emerald-500/10 border border-emerald-500/30 flex items-center justify-center text-emerald-400">
                  <Activity className="w-4 h-4" />
                </div>
                <div>
                  <div className="text-xs font-bold text-white flex items-center gap-2">
                    <span>{t.ndviLabel}</span>
                    <span className="text-emerald-400 font-mono font-black">{weatherMetrics.ndvi}</span>
                  </div>
                  <div className="text-[11px] text-[#9CA3AF] mt-0.5">
                    {weatherMetrics.ndviStatus}
                  </div>
                </div>
              </div>

              <div className="text-[11px] text-gray-400 font-mono">
                <span>{t.etLabel} {weatherMetrics.evapotranspiration}</span>
              </div>
            </div>

          </div>
        )}

        {/* Tab 2: Irrigation Schedule */}
        {activeTab === 'irrigation' && (
          <div className="space-y-3">
            <div className="text-xs text-[#9CA3AF] mb-2 flex items-center justify-between flex-wrap gap-2">
              <span>{t.irrigationScheduleHeading}</span>
              <span className="text-[#B27BFF] font-semibold">{farmData?.cropName || 'Wheat'}</span>
            </div>

            <div className="space-y-2.5">
              {irrigationSchedule.map((item, idx) => (
                <div 
                  key={idx}
                  className={`p-3.5 rounded-xl border transition-all flex items-center justify-between gap-3 ${
                    idx === 0 
                      ? 'bg-[#B27BFF]/10 border-[#B27BFF]/40 shadow-[0_0_12px_rgba(178,123,255,0.15)]' 
                      : 'bg-[#000000] border-[#1F1F24]'
                  }`}
                >
                  <div className="flex items-center gap-3">
                    <div className={`w-8 h-8 rounded-lg flex items-center justify-center text-xs font-bold ${
                      idx === 0 ? 'bg-[#B27BFF] text-black font-black' : 'bg-[#141414] text-gray-300'
                    }`}>
                      {idx + 1}
                    </div>
                    <div>
                      <div className="text-xs font-bold text-white flex items-center gap-2">
                        <span>{item.day}</span>
                        {idx === 0 && (
                          <span className="text-[10px] px-2 py-0.2 rounded-full bg-[#B27BFF]/20 text-[#B27BFF]">
                            {lang === 'ar' ? 'الليلة' : 'Tonight'}
                          </span>
                        )}
                      </div>
                      <div className="text-[11px] text-[#9CA3AF] mt-0.5 leading-relaxed">
                        {item.reason}
                      </div>
                    </div>
                  </div>

                  <div className="text-start sm:text-end flex-shrink-0">
                    <div className="text-xs font-bold text-[#B27BFF] font-mono">
                      {item.duration}
                    </div>
                    <div className="text-[10px] text-gray-400 mt-0.5">
                      {item.timing}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

      </div>

      {/* Widget Footer */}
      <div className="pt-3 border-t border-[#1F1F24] flex items-center justify-between text-[11px] text-[#9CA3AF]">
        <span className="flex items-center gap-1.5">
          <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse"></span>
          <span>{t.satelliteLinkStable}</span>
        </span>
        <span>{t.lastSatelliteSync}</span>
      </div>

    </div>
  );
}

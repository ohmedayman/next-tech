import React, { useState, useRef } from 'react';
import { 
  Camera, 
  Upload, 
  ScanLine, 
  AlertCircle, 
  CheckCircle, 
  Sparkles, 
  RefreshCw, 
  ShieldAlert, 
  ArrowLeft, 
  ArrowRight,
  Cpu, 
  Layers, 
  Leaf, 
  ExternalLink 
} from 'lucide-react';
import { MOCK_DIAGNOSES } from '../../data/mockData';
import { TRANSLATIONS } from '../../data/translations';

export function AiCropDiagnosisWidget({ onSelectProductForDiagnosis, lang = 'en' }) {
  const t = TRANSLATIONS[lang];
  const isRtl = lang === 'ar';

  const [selectedSample, setSelectedSample] = useState(MOCK_DIAGNOSES[0]);
  const [imagePreview, setImagePreview] = useState(MOCK_DIAGNOSES[0].leafImage);
  const [isScanning, setIsScanning] = useState(false);
  const [scanProgress, setScanProgress] = useState(0);
  const [diagnosisResult, setDiagnosisResult] = useState(MOCK_DIAGNOSES[0]);
  const fileInputRef = useRef(null);

  const handleFileUpload = (e) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setImagePreview(reader.result);
        setDiagnosisResult(null);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSelectPreset = (sample) => {
    setSelectedSample(sample);
    setImagePreview(sample.leafImage);
    setDiagnosisResult(null);
  };

  const handleScan = () => {
    setIsScanning(true);
    setScanProgress(0);
    setDiagnosisResult(null);

    const interval = setInterval(() => {
      setScanProgress((prev) => {
        if (prev >= 100) {
          clearInterval(interval);
          setIsScanning(false);
          setDiagnosisResult(selectedSample);
          return 100;
        }
        return prev + 10;
      });
    }, 150);
  };

  return (
    <div className="relative rounded-2xl bg-[#0A0A0A] border border-[#222226] p-6 sm:p-7 shadow-[0_0_25px_rgba(178,123,255,0.08)] flex flex-col justify-between space-y-6">
      
      {/* Header */}
      <div className="space-y-4">
        <div className="flex items-center justify-between border-b border-[#1F1F24] pb-4">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-[#B27BFF]/10 border border-[#B27BFF]/30 flex items-center justify-center text-[#B27BFF] shadow-[0_0_10px_rgba(178,123,255,0.2)]">
              <ScanLine className="w-5 h-5" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h3 className="text-lg font-bold text-white leading-snug">{t.widgetDiagnosisTitle}</h3>
                <span className="text-[10px] px-2 py-0.5 rounded-full bg-[#B27BFF]/15 text-[#B27BFF] border border-[#B27BFF]/30 font-medium">
                  Vision AI
                </span>
              </div>
              <p className="text-xs text-[#9CA3AF] mt-0.5">
                {t.widgetDiagnosisSub}
              </p>
            </div>
          </div>

          {diagnosisResult && (
            <button
              onClick={() => setDiagnosisResult(null)}
              className="text-xs text-[#9CA3AF] hover:text-[#B27BFF] flex items-center gap-1 transition-colors"
            >
              <RefreshCw className="w-3.5 h-3.5" />
              <span>{t.btnNewDiagnosis}</span>
            </button>
          )}
        </div>

        {/* Upload & Leaf Preview Area */}
        <div className="relative rounded-xl overflow-hidden border border-[#222226] bg-[#000000] group">
          
          {/* Main Leaf Image Display */}
          <div className="relative h-56 sm:h-64 w-full bg-[#050505] flex items-center justify-center overflow-hidden">
            <img 
              src={imagePreview} 
              alt="Leaf Preview" 
              className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
            />
            
            <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-black/30 pointer-events-none" />

            {/* AI Scanning Animation Overlay */}
            {isScanning && (
              <div className="absolute inset-0 z-20 flex flex-col justify-between p-4 pointer-events-none">
                <div 
                  className="w-full h-1 bg-[#B27BFF] shadow-[0_0_15px_#B27BFF,0_0_30px_#B27BFF] transition-all duration-150"
                  style={{ transform: `translateY(${scanProgress * 2.3}px)` }}
                />

                <div className="absolute top-1/4 right-1/4 w-32 h-28 border-2 border-dashed border-[#B27BFF] rounded-lg animate-pulse flex items-start justify-end p-1">
                  <span className="text-[10px] bg-[#B27BFF] text-black font-bold px-1.5 py-0.5 rounded">
                    {scanProgress}%
                  </span>
                </div>

                <div className="absolute bottom-4 left-4 bg-black/80 backdrop-blur-md px-3 py-1.5 rounded-lg border border-[#B27BFF]/40 text-xs text-[#B27BFF] flex items-center gap-2">
                  <Cpu className="w-3.5 h-3.5 animate-spin" />
                  <span>{t.scanningStatus}</span>
                </div>
              </div>
            )}

            {/* Bounding box when diagnosis is ready */}
            {!isScanning && diagnosisResult && (
              <div className="absolute top-1/4 right-1/4 w-36 h-32 border-2 border-[#B27BFF] bg-[#B27BFF]/10 rounded-lg flex items-start justify-end p-1 shadow-[0_0_15px_rgba(178,123,255,0.4)] pointer-events-none">
                <span className="text-[10px] bg-[#B27BFF] text-black font-black px-1.5 py-0.5 rounded shadow">
                  {t.diseaseDetectedBadge} ({diagnosisResult.confidence}%)
                </span>
              </div>
            )}

            {/* Upload/Camera Overlay controls */}
            <div className="absolute bottom-3 right-3 left-3 flex items-center justify-between z-10">
              <span className="text-xs text-white/90 bg-black/70 backdrop-blur-md px-2.5 py-1 rounded-md border border-white/10 flex items-center gap-1.5">
                <Leaf className="w-3.5 h-3.5 text-emerald-400" />
                <span>{t.currentSampleBadge}</span>
              </span>

              <div className="flex items-center gap-2">
                <input 
                  type="file" 
                  ref={fileInputRef}
                  onChange={handleFileUpload}
                  accept="image/*"
                  className="hidden" 
                />
                
                <button
                  type="button"
                  onClick={() => fileInputRef.current?.click()}
                  className="px-3 py-1.5 rounded-lg bg-black/80 hover:bg-black border border-white/20 hover:border-[#B27BFF] text-white text-xs font-semibold backdrop-blur-md transition-all flex items-center gap-1.5 hover:shadow-[0_0_10px_rgba(178,123,255,0.3)]"
                >
                  <Camera className="w-3.5 h-3.5 text-[#B27BFF]" />
                  <span>{t.btnSnapLeaf}</span>
                </button>
              </div>
            </div>

          </div>

          {/* Quick preset selector buttons */}
          <div className="p-3 bg-[#0A0A0A] border-t border-[#1F1F24] flex items-center justify-between flex-wrap gap-2 text-xs">
            <span className="text-[#9CA3AF] text-[11px] font-medium">{t.orSelectPreset}</span>
            <div className="flex items-center gap-1.5 flex-wrap">
              {MOCK_DIAGNOSES.map((diag) => (
                <button
                  key={diag.id}
                  onClick={() => handleSelectPreset(diag)}
                  className={`px-2.5 py-1 rounded-md text-[11px] font-medium transition-all ${
                    selectedSample.id === diag.id
                      ? 'bg-[#B27BFF]/20 text-[#B27BFF] border border-[#B27BFF]'
                      : 'bg-[#141414] text-[#9CA3AF] border border-[#222226] hover:text-white'
                  }`}
                >
                  {diag.crop}: {diag.name.slice(0, 16)}...
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Scan Action Button */}
        {!diagnosisResult && !isScanning && (
          <button
            onClick={handleScan}
            className="w-full py-3.5 px-4 rounded-xl font-bold text-sm text-black bg-[#B27BFF] hover:bg-[#9E5FF5] transition-all duration-300 shadow-[0_0_15px_#B27BFF] hover:shadow-[0_0_25px_#B27BFF] flex items-center justify-center gap-2 transform active:scale-98"
          >
            <ScanLine className="w-4 h-4 text-black" />
            <span>{t.btnStartScan}</span>
          </button>
        )}

        {/* Result Area */}
        {diagnosisResult && (
          <div className="rounded-xl border border-[#B27BFF]/30 bg-[#000000] p-4 sm:p-5 space-y-4 animate-fadeIn">
            
            {/* Title & Badges */}
            <div className="flex items-start justify-between gap-3 border-b border-[#1F1F24] pb-3">
              <div>
                <div className="flex items-center gap-2">
                  <span className="w-2.5 h-2.5 rounded-full bg-[#B27BFF] animate-ping" />
                  <h4 className="text-base font-extrabold text-white leading-snug">
                    {diagnosisResult.name}
                  </h4>
                </div>
                <div className="text-[11px] text-[#9CA3AF] font-mono mt-0.5">
                  {diagnosisResult.scientificName}
                </div>
              </div>

              <div className="flex flex-col items-end gap-1 flex-shrink-0">
                <span className="text-[11px] px-2 py-0.5 rounded-full bg-emerald-500/15 text-emerald-400 border border-emerald-500/30 font-bold font-mono">
                  {t.confidenceLabel} {diagnosisResult.confidence}%
                </span>
                <span className={`text-[10px] px-2 py-0.5 rounded-full font-bold ${
                  diagnosisResult.severityColor === 'red' 
                    ? 'bg-red-500/20 text-red-400 border border-red-500/30' 
                    : diagnosisResult.severityColor === 'amber'
                    ? 'bg-amber-500/20 text-amber-400 border border-amber-500/30'
                    : 'bg-emerald-500/20 text-emerald-400 border border-emerald-500/30'
                }`}>
                  {t.severityLabel} {diagnosisResult.severity}
                </span>
              </div>
            </div>

            {/* Symptoms & Cause with ample line height */}
            <div className="space-y-2.5 text-xs">
              <div className="text-gray-300 leading-relaxed">
                <strong className="text-white">{t.observedSymptoms} </strong>
                {diagnosisResult.symptoms}
              </div>

              <div className="text-[#9CA3AF] bg-[#0A0A0A] p-3 rounded-lg border border-[#1F1F24] leading-relaxed">
                <strong className="text-[#B27BFF]">{t.nasaCorrelationLabel} </strong>
                {diagnosisResult.nasaCorrelation}
              </div>
            </div>

            {/* Recommendation Box */}
            <div className="p-3.5 rounded-xl bg-[#B27BFF]/10 border border-[#B27BFF]/30 text-xs space-y-1">
              <div className="font-bold text-white flex items-center gap-1.5">
                <Sparkles className="w-3.5 h-3.5 text-[#B27BFF]" />
                <span>{t.treatmentProtocol}</span>
              </div>
              <div className="text-gray-200 leading-relaxed">
                {diagnosisResult.recommendation}
              </div>
            </div>

            {/* Action CTA */}
            <button
              onClick={() => onSelectProductForDiagnosis(diagnosisResult.recommendedProducts)}
              className="w-full py-2.5 px-3 rounded-lg font-bold text-xs text-black bg-[#B27BFF] hover:bg-[#9E5FF5] transition-all flex items-center justify-center gap-2 shadow-[0_0_12px_rgba(178,123,255,0.4)]"
            >
              <span>{t.btnShowProducts}</span>
              {isRtl ? <ArrowLeft className="w-3.5 h-3.5 text-black" /> : <ArrowRight className="w-3.5 h-3.5 text-black" />}
            </button>

          </div>
        )}

      </div>

      {/* Widget Footer */}
      <div className="pt-3 border-t border-[#1F1F24] flex items-center justify-between text-[11px] text-[#9CA3AF]">
        <span>{t.pathogenDbStats}</span>
        <span className="text-[#B27BFF]">{t.aiModelAccuracy}</span>
      </div>

    </div>
  );
}

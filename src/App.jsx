import React, { useState, useEffect } from 'react';
import { Navbar } from './components/Navbar';
import { LandingPage } from './components/LandingPage';
import { Onboarding } from './components/Onboarding';
import { Dashboard } from './components/Dashboard';
import { MoghraModule } from './components/MoghraModule';

export function App() {
  // CRITICAL USER RULE: Language starts in ENGLISH ('en') by default!
  const [lang, setLang] = useState('en');

  // Navigation state: 'landing' | 'onboarding' | 'dashboard' | 'moghra'
  const [currentView, setView] = useState('landing');

  // Farm Setup State (defaulting with English labels as default, adaptable to Arabic)
  const [farmData, setFarmData] = useState({
    farmName: 'Al-Wadi Farm',
    farmerName: 'Mahmoud Abdullah',
    location: 'moghra',
    locationName: 'Moghra Region (Egyptian Countryside - High Salinity)',
    crop: 'wheat',
    cropName: 'Wheat',
    cropCategory: 'Grains',
    size: 15,
    idealMoisture: '35% - 50%'
  });

  // Dynamically update document dir and lang attributes when language toggles
  useEffect(() => {
    document.documentElement.lang = lang;
    document.documentElement.dir = lang === 'ar' ? 'rtl' : 'ltr';
  }, [lang]);

  const toggleLanguage = () => {
    setLang((prev) => (prev === 'en' ? 'ar' : 'en'));
  };

  const handleOnboardingComplete = (data) => {
    setFarmData(data);
    // If the farmer selected Moghra, lead them to the specialized Moghra module or Dashboard
    if (data.location === 'moghra') {
      setView('dashboard');
    } else {
      setView('dashboard');
    }
  };

  return (
    <div className={`min-h-screen bg-[#000000] text-white flex flex-col font-cairo selection:bg-[#B27BFF] selection:text-black ${
      lang === 'ar' ? 'font-cairo' : 'font-sans'
    }`}>
      {/* Top Dynamic Navbar with Language Switcher & Moghra Tab */}
      <Navbar 
        currentView={currentView}
        setView={setView}
        farmData={farmData}
        lang={lang}
        onToggleLang={toggleLanguage}
      />

      {/* Main View Router */}
      <main className="flex-1">
        {currentView === 'landing' && (
          <LandingPage 
            onRegisterClick={() => setView('onboarding')}
            onExploreClick={() => {
              const el = document.getElementById('features-section');
              if (el) el.scrollIntoView({ behavior: 'smooth' });
            }}
            onGoMoghra={() => setView('moghra')}
            lang={lang}
          />
        )}

        {currentView === 'onboarding' && (
          <Onboarding 
            initialData={farmData}
            onComplete={handleOnboardingComplete}
            lang={lang}
          />
        )}

        {currentView === 'dashboard' && (
          <Dashboard 
            farmData={farmData}
            onEditFarm={() => setView('onboarding')}
            onGoHome={() => setView('landing')}
            onGoMoghra={() => setView('moghra')}
            lang={lang}
          />
        )}

        {currentView === 'moghra' && (
          <MoghraModule 
            lang={lang}
            onReturnDashboard={() => setView('dashboard')}
          />
        )}
      </main>
    </div>
  );
}

export default App;

// Specialized Data for Moghra Region (أراضي المغرة - الريف المصري)
// Addressing severe groundwater & soil salinity across 250,000 feddans

export const MOGHRA_METRICS = {
  region: {
    ar: 'منطقة المغرة (جنوب منخفض القطارة - مشروع 1.5 مليون فدان)',
    en: 'Moghra Region (South Qattara Depression - 1.5M Feddans Project)'
  },
  totalAreaFeddans: 250000,
  waterSalinityPpm: 6850, // groundwater well salinity in ppm
  waterSalinityThreshold: 3500, // acceptable baseline
  waterSalinityStatus: {
    ar: 'ملوحة مياه شديدة (حاجة لمعالجة فورية)',
    en: 'Severe Water Salinity (Immediate Treatment Needed)'
  },
  soilSalinityEc: 12.8, // dS/m
  soilSalinityStatus: {
    ar: 'تربة ملحية قلوية (تراكم كلوريد الصوديوم)',
    en: 'Saline-Alkaline Soil (High NaCl Accumulation)'
  },
  soilPh: 7.9, // alkaline! > 7.0 triggers warning
  soilPhStatus: {
    ar: 'قلوية مرتفعة تعطل امتصاص الفوسفور والعناصر الصغرى',
    en: 'High Alkalinity Inhibiting Phosphorus & Micronutrient Uptake'
  },
  evaporationRate: '8.4 mm/day',
  aquiferDepth: '85 - 120 meters'
};

export const RESILIENT_CROPS_STRESS = [
  {
    id: 'palms',
    name: { ar: 'نخيل البلح (مجدول، برحي، صعيدي)', en: 'Date Palms (Medjool, Barhi, Saidi)' },
    category: { ar: 'محصول رئيسي مقاوم', en: 'Primary Resilient Crop' },
    salinityToleranceLimitPpm: 8000,
    currentStressLevel: 68, // percentage 0-100
    stressLevelLabel: { ar: 'إجهاد ملحي متوسط إلى مرتفع', en: 'Moderate-High Saline Stress' },
    stressSeverity: 'amber',
    rootAbsorptionEfficiency: '54%',
    symptoms: {
      ar: 'احتراق أطراف السعف القديم، بطء خروج الفسائل، تراجع نسبة العقد في الثمار.',
      en: 'Tip scorch on older fronds, delayed offshoot emergence, reduced fruit set.'
    },
    actionPlan: {
      ar: 'حقن طارد أملاح كلسي جهازي (بولي هيدروكسي كربوكسيل) مع ماء الري كل 14 يوماً مع ري غسيل شهري.',
      en: 'Inject calcium-based salinity displace agent via fertigation every 14 days + monthly leaching flush.'
    },
    recommendedProductIds: ['prod-moghra-1', 'prod-moghra-2']
  },
  {
    id: 'olives',
    name: { ar: 'أشجار الزيتون (بيكوال، مانزانيلا، كوراتينا)', en: 'Olive Orchards (Picual, Manzanilla, Coratina)' },
    category: { ar: 'محصول زيتي مقاوم', en: 'Oil & Table Resilient Crop' },
    salinityToleranceLimitPpm: 5500,
    currentStressLevel: 82, // percentage (higher stress because well is 6850 ppm)
    stressLevelLabel: { ar: 'إجهاد ملحي حرج (تعدى حاجز التحمل)', en: 'Critical Saline Stress (Exceeded Limit)' },
    stressSeverity: 'red',
    rootAbsorptionEfficiency: '38%',
    symptoms: {
      ar: 'جفاف القمم النامية، اصفرار مفرط للأوراق، إجهاض زهري مبكر وتراجع نسبة الزيت في الثمار.',
      en: 'Dieback of apical shoots, excessive leaf chlorosis, flower abortion, drop in oil yield.'
    },
    actionPlan: {
      ar: 'استخدام منظم حموضة التربة لخفض الـ pH إلى 6.8 وتثبيط الصوديوم بجركن طارد أملاح مركب ومخلبيات حديد EDDHA.',
      en: 'Apply pH regulator to shift rhizosphere pH to 6.8 + chelated sodium disrupter and EDDHA iron.'
    },
    recommendedProductIds: ['prod-moghra-1', 'prod-moghra-3']
  },
  {
    id: 'jojoba',
    name: { ar: 'شجيرات الهوهوبا والرمان الصحراوي', en: 'Jojoba & Desert Pomegranate' },
    category: { ar: 'محصول واعد للمغرة', en: 'Promising Moghra Alternative' },
    salinityToleranceLimitPpm: 9500,
    currentStressLevel: 32,
    stressLevelLabel: { ar: 'إجهاد منخفض - استجابة ممتازة', en: 'Low Stress - Excellent Adaptation' },
    stressSeverity: 'emerald',
    rootAbsorptionEfficiency: '85%',
    symptoms: {
      ar: 'نمو خضري نشط مع تكوين براعم زهرية متوازنة وتفوق في تحمل مياه الآبار العميقة.',
      en: 'Vigorous vegetative flush, balanced floral buds, superior tolerance to deep well water.'
    },
    actionPlan: {
      ar: 'الحفاظ على التسميد البوتاسي المتوازن لتثبيت الخلايا ضد الإجهاد الأسموزي.',
      en: 'Maintain balanced potassium fertigation to reinforce osmotic regulation.'
    },
    recommendedProductIds: ['prod-moghra-2']
  }
];

export const COST_COMPARISON = {
  desalinationDevices: {
    title: { ar: 'أجهزة التحلية الهندسية والممغنطة', en: 'Engineering Desalination & Magnetic Units' },
    type: 'mechanical',
    capexPer20Feddan: {
      amount: '450,000 - 850,000 ج.م',
      enAmount: '450k - 850k EGP'
    },
    opexAnnual: {
      amount: '95,000 ج.م سنوياً (كهرباء + فلاتر)',
      enAmount: '95,000 EGP / year (Power + Filters)'
    },
    challenges: [
      { ar: 'انسداد الأغشية وتكلسها خلال 6 أشهر بسبب ارتفاع الكالسيوم والسيليكا بالمغرة', en: 'Membrane fouling & scaling within 6 months due to high Ca/Silica in Moghra' },
      { ar: 'إهدار 30% - 40% من مياه البئر كمياه تصريف عالية الملوحة شديدة الضرر للبيئة', en: '30% - 40% reject water brine disposal issue' },
      { ar: 'استهلاك طاقة ضخم يتطلب مولدات ديزل أو طاقة شمسية باهظة التكلفة', en: 'High energy consumption requiring expensive diesel or massive solar PV' }
    ],
    recommendationRating: 'منخفض الجدوى الاقتصادية لصغار ومتوسطي المزارعين',
    enRecommendationRating: 'Low Economic Feasibility for Small & Medium Farmers'
  },
  smartChemicalSolutions: {
    title: { ar: 'المعالجات الكيميائية الذكية المتخصصة', en: 'Smart Chemical & Salinity Displacer Solutions' },
    type: 'chemical',
    capexPer20Feddan: {
      amount: '0 ج.م (لا تتطلب معدات أو أجهزة رأسمالية)',
      enAmount: '0 EGP (Zero Capital Equipment Required)'
    },
    opexAnnual: {
      amount: '1,600 - 2,800 ج.م للفدان / موسم',
      enAmount: '1,600 - 2,800 EGP / Feddan / Season'
    },
    advantages: [
      { ar: 'إحلال أيونات الكالسيوم العضوي محل الصوديوم الضار وطرده لعمق أسفل الجذور', en: 'Displaces harmful Na+ with active organic Ca++ and leaches it past root zone' },
      { ar: 'خفض pH التربة من 7.9 إلى 6.8 لتحرير الفوسفور والحديد المحبوسين فورياً', en: 'Safely buffers rhizosphere pH from 7.9 to 6.8 to unlock phosphorus & iron' },
      { ar: 'حقن مباشر مع شبكة الري بالتنقيط القائمة دون أي هدر في كميات مياه الآبار', en: 'Injected directly into existing drip network without wasting a drop of well water' }
    ],
    savingsPercentage: 'وفر مالي يتجاوز 75% مقارنة بمحطات التحلية الميكانيكية',
    enSavingsPercentage: 'Over 75% cost savings compared to mechanical desalination plants',
    recommendationRating: 'الحل الموصى به علمياً واقتصادياً لأراضي المغرة',
    enRecommendationRating: 'Scientifically & Economically Recommended Solution for Moghra'
  }
};

export const MOGHRA_PRODUCTS = [
  {
    id: 'prod-moghra-1',
    name: { ar: 'ميلانو ديسالت بلس (طارد الأملاح الكلسي)', en: 'Milano De-Salts Plus (Calcium Salinity Displacer)' },
    supplier: 'شركة ميلانو للمستلزمات الزراعية',
    category: { ar: 'طارد أملاح ومعالج ملوحة التربة والماء', en: 'Salinity Displacer & Soil Conditioner' },
    activeIngredient: 'بولي هيدروكسي كربوكسيل 25% + كالسيوم عضوي مخلبي 14%',
    price: 490,
    originalPrice: 580,
    unit: { ar: 'جركن 5 لتر عالي التركيز', en: '5-Liter Concentrated Jerrican' },
    rating: 4.95,
    reviewsCount: 188,
    badge: { ar: 'مُصمم خصيصاً لآبار المغرة', en: 'Specially Engineered for Moghra Wells' },
    effectOnPh: { ar: 'آمن تماماً: لا يرفع القلوية ويعمل على تفكيك أملاح الصوديوم', en: '100% pH Safe: Does not spike alkalinity, flushes Na+' },
    dosage: { ar: '2 - 3 لتر للفدان مع مياه الري كل 15 يوماً', en: '2 - 3 Liters / Feddan via fertigation every 15 days' },
    deliveryDays: { ar: 'شحن مخصص لأراضي المغرة والريف المصري خلال 24-48 ساعة', en: 'Dedicated shipping to Moghra within 24-48 hours' },
    stock: 85,
    image: 'https://images.unsplash.com/photo-1587293852726-70cdb56c2866?auto=format&fit=crop&w=500&q=80'
  },
  {
    id: 'prod-moghra-2',
    name: { ar: 'ميلانو سلفا-بي إتش (مخفض قلوية التربة الذكي)', en: 'Milano Sulfa-pH (Smart Soil Acidifier & Buffer)' },
    supplier: 'شركة ميلانو للمستلزمات الزراعية',
    category: { ar: 'منظم ومنخفض الـ pH ومحرر العناصر', en: 'Soil pH Buffer & Micronutrient Unblocker' },
    activeIngredient: 'حمض بولي فوسفوريك نقي 60% + كبريت مخلب عضوي',
    price: 360,
    originalPrice: 420,
    unit: { ar: 'جركن 5 لتر', en: '5-Liter Jerrican' },
    rating: 4.9,
    reviewsCount: 142,
    badge: { ar: 'يعيد الـ pH من 8.0 إلى 6.8', en: 'Resets pH from 8.0 down to 6.8' },
    effectOnPh: { ar: 'يضبط حموضة بيئة الجذور لامتصاص مثالي', en: 'Buffers rhizosphere pH for optimal root uptake' },
    dosage: { ar: '1.5 لتر للفدان حقناً بالسمادة أسبوعياً', en: '1.5 Liters / Feddan weekly via injector' },
    deliveryDays: { ar: 'شحن سريع للمزارع', en: 'Fast Delivery to Farms' },
    stock: 92,
    image: 'https://images.unsplash.com/photo-1584308666744-24d5c474f2ae?auto=format&fit=crop&w=500&q=80'
  },
  {
    id: 'prod-moghra-3',
    name: { ar: 'ميلانو هيوماكس-أيرون (حديد وفولفيك مضاد للإجهاد)', en: 'Milano Humax-Iron (Anti-Salinity Chelate)' },
    supplier: 'شركة ميلانو للمستلزمات الزراعية',
    category: { ar: 'مخصبات مقاومة الصدمات الملحية', en: 'Anti-Osmotic Shock Fertilizers' },
    activeIngredient: 'حديد EDDHA 6% أورثو-أورثو 4.8% + فولفيك أسيد نقي',
    price: 430,
    originalPrice: 490,
    unit: { ar: 'عبوة 1 كجم بودرة دقيقة', en: '1 kg Soluble Micro-Granules' },
    rating: 4.85,
    reviewsCount: 110,
    badge: { ar: 'يعالج اصفرار النخيل والزيتون بالمغرة', en: 'Reverses Chlorosis in Moghra Palms & Olives' },
    effectOnPh: { ar: 'مستقر وثابت حتى درجات قلوية pH 9.0', en: 'Stable in extreme alkaline soils up to pH 9.0' },
    dosage: { ar: '500 جم للفدان حقناً مع الري', en: '500g / Feddan via fertigation' },
    deliveryDays: { ar: 'شحن فوري لأراضي المغرة', en: 'Express Delivery to Moghra' },
    stock: 64,
    image: 'https://images.unsplash.com/photo-1585314062340-f1a5a7c9328d?auto=format&fit=crop&w=500&q=80'
  }
];

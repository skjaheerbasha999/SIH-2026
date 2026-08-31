import React, { useState } from 'react';
import {
  Sprout,
  Droplets,
  TrendingUp,
  ShieldCheck,
  CloudSunRain,
  MapPin,
  Truck,
  PhoneCall,
  X,
  ChevronRight,
  ArrowUpRight,
  ArrowDownRight,
  Phone,
  Wind
} from 'lucide-react';

const translations = {
  en: {
    sectionTitle: "Farmer Support & Tools",
    sectionSubtitle: "Simple tools to help you make better farming decisions.",
    toggleLang: "తెలుగులో చూడండి",
    features: [
      { id: 'crop', title: "Crop Recommendation", desc: "Know before you grow", icon: Sprout },
      { id: 'fertilizer', title: "Fertilizer & Seed", desc: "Best inputs for your land", icon: Droplets },
      { id: 'market', title: "Market Prices", desc: "Current rates & trends", icon: TrendingUp },
      { id: 'schemes', title: "Government Schemes", desc: "Benefits & Subsidies", icon: ShieldCheck },
      { id: 'weather', title: "Weather Advice", desc: "Rainfall & farming tips", icon: CloudSunRain },
      { id: 'center', title: "Nearest Center", desc: "Procurement locations", icon: MapPin },
      { id: 'track', title: "Track My Crop", desc: "Status of your sale", icon: Truck },
      { id: 'helpline', title: "Toll-Free Helpline", desc: "Call for assistance", icon: PhoneCall, highlight: true }
    ],
    close: "Close",
    submit: "Check Now",
    loading: "Loading...",
    // Form Labels
    location: "Location / Village",
    soilType: "Soil Type",
    season: "Season",
    landArea: "Land Area (Acres)",
    waterAvailability: "Water Availability",
    crop: "Select Crop",
    regId: "Registration ID or Phone Number",
    // Options
    soilOptions: ["Black Soil", "Red Soil", "Alluvial", "Laterite"],
    seasonOptions: ["Kharif (Monsoon)", "Rabi (Winter)", "Zaid (Summer)"],
    waterOptions: ["Rainfed", "Canal Irrigation", "Borewell/Tube well", "Drip/Sprinkler"],
    cropOptions: ["Paddy", "Cotton", "Maize", "Chilli", "Groundnut"],
    // Mock Data Results
    mockCropResult: {
      crop: "Paddy (MTU-1010)",
      cost: "₹20,000 - ₹25,000 per Acre",
      yield: "25 - 30 Quintals per Acre",
      price: "₹2,183 per Quintal (MSP)",
      center: "Guntur Main Market Yard (12 km)"
    },
    mockFertilizerResult: {
      recommendation: "Urea (45kg) + DAP (50kg) + MOP (25kg) per Acre",
      subsidy: "Government Subsidy Available (PM-PRANAM)",
      availability: "Available at PACs, Amaravati Branch",
    },
    mockSchemes: [
      { name: "PM-KISAN", benefit: "₹6,000 per year income support", eligibility: "Small and marginal farmers" },
      { name: "YSR Rythu Bharosa", benefit: "₹13,500 per year (AP only)", eligibility: "Landholding farmer families" },
      { name: "Pradhan Mantri Fasal Bima Yojana", benefit: "Crop Insurance against natural calamities", eligibility: "All farmers growing notified crops" }
    ],
    mockWeather: {
      condition: "Light Rain Expected",
      temp: "28°C",
      forecast: "Moderate rainfall expected over the next 48 hours.",
      advice: "Delay fertilizer application by 2 days to prevent runoff. Ensure proper drainage in fields."
    },
    mockCenters: [
      { name: "Tenali Procurement Center", distance: "5.2 km", capacity: "High Availability", contact: "9876543210", type: "Good Crop" },
      { name: "Guntur Waste Collection", distance: "12.5 km", capacity: "Medium Availability", contact: "9876543211", type: "Waste/Stubble" }
    ],
    helplineOptions: [
      "Crop Recommendation", "Fertilizer & Seeds", "Market Price", "Weather Advisory",
      "Government Schemes", "Nearest Procurement Center", "Track My Crop", "Talk to Assistant"
    ]
  },
  te: {
    sectionTitle: "రైతు మద్దతు & సాధనాలు",
    sectionSubtitle: "మంచి వ్యవసాయ నిర్ణయాలు తీసుకోవడంలో మీకు సహాయపడే సాధనాలు.",
    toggleLang: "View in English",
    features: [
      { id: 'crop', title: "పంట సిఫార్సు", desc: "సాగుకు ముందు తెలుసుకోండి", icon: Sprout },
      { id: 'fertilizer', title: "ఎరువులు & విత్తనాలు", desc: "మీ భూమికి ఉత్తమమైనవి", icon: Droplets },
      { id: 'market', title: "మార్కెట్ ధరలు", desc: "ప్రస్తుత ధరలు & ట్రెండ్స్", icon: TrendingUp },
      { id: 'schemes', title: "ప్రభుత్వ పథకాలు", desc: "ప్రయోజనాలు & సబ్సిడీలు", icon: ShieldCheck },
      { id: 'weather', title: "వాతావరణ సలహా", desc: "వర్షపాతం & సలహాలు", icon: CloudSunRain },
      { id: 'center', title: "సమీప కేంద్రం", desc: "సేకరణ స్థలాలు", icon: MapPin },
      { id: 'track', title: "నా పంటను ట్రాక్ చేయండి", desc: "మీ విక్రయ స్థితి", icon: Truck },
      { id: 'helpline', title: "టోల్-ఫ్రీ హెల్ప్‌లైన్", desc: "సహాయం కోసం కాల్ చేయండి", icon: PhoneCall, highlight: true }
    ],
    close: "మూసివేయు",
    submit: "ఇప్పుడు తనిఖీ చేయండి",
    loading: "లోడ్ అవుతోంది...",
    location: "స్థానం / గ్రామం",
    soilType: "నేల రకం",
    season: "సీజన్",
    landArea: "భూమి విస్తీర్ణం (ఎకరాలు)",
    waterAvailability: "నీటి లభ్యత",
    crop: "పంటను ఎంచుకోండి",
    regId: "నమోదు ID లేదా ఫోన్ నంబర్",
    soilOptions: ["నల్ల నేల", "ఎర్ర నేల", "ఒండ్రు నేల", "లాటరైట్"],
    seasonOptions: ["ఖరీఫ్ (వర్షాకాలం)", "రబీ (చలికాలం)", "జైద్ (వేసవి)"],
    waterOptions: ["వర్షాధారిత", "కాలువ నీటిపారుదల", "బోరుబావి", "బిందు/తుంపర పారుదల"],
    cropOptions: ["వరి", "పత్తి", "మొక్కజొన్న", "మిర్చి", "వేరుశెనగ"],
    mockCropResult: {
      crop: "వరి (MTU-1010)",
      cost: "ఎకరానికి ₹20,000 - ₹25,000",
      yield: "ఎకరానికి 25 - 30 క్వింటాళ్లు",
      price: "క్వింటాల్‌కు ₹2,183 (MSP)",
      center: "గుంటూరు ప్రధాన మార్కెట్ యార్డ్ (12 కి.మీ)"
    },
    mockFertilizerResult: {
      recommendation: "యూరియా (45kg) + DAP (50kg) + MOP (25kg) ఎకరానికి",
      subsidy: "ప్రభుత్వ సబ్సిడీ అందుబాటులో ఉంది (PM-PRANAM)",
      availability: "ప్రాథమిక వ్యవసాయ సహకార సంఘాలు, అమరావతి బ్రాంచ్‌లో అందుబాటులో ఉంది",
    },
    mockSchemes: [
      { name: "PM-KISAN", benefit: "సంవత్సరానికి ₹6,000 ఆదాయ మద్దతు", eligibility: "సన్నకారు మరియు ఉపాంత రైతులు" },
      { name: "YSR రైతు భరోసా", benefit: "సంవత్సరానికి ₹13,500 (AP మాత్రమే)", eligibility: "భూమి ఉన్న రైతు కుటుంబాలు" },
      { name: "ప్రధాన మంత్రి ఫసల్ బీమా యోజన", benefit: "ప్రకృతి వైపరీత్యాల నుండి పంటల బీమా", eligibility: "నోటిఫైడ్ పంటలు పండించే రైతులందరికీ" }
    ],
    mockWeather: {
      condition: "తేలికపాటి వర్షం ఆశించబడుతోంది",
      temp: "28°C",
      forecast: "రాబోయే 48 గంటల్లో ఓ మోస్తరు వర్షపాతం నమోదయ్యే అవకాశం ఉంది.",
      advice: "కొట్టుకుపోకుండా ఉండటానికి ఎరువుల వాడకాన్ని 2 రోజులు వాయిదా వేయండి. పొలాల్లో సరైన నీటి పారుదల ఉండేలా చూసుకోండి."
    },
    mockCenters: [
      { name: "తెనాలి సేకరణ కేంద్రం", distance: "5.2 కి.మీ", capacity: "అధిక లభ్యత", contact: "9876543210", type: "మంచి పంట" },
      { name: "గుంటూరు వ్యర్థాల సేకరణ", distance: "12.5 కి.మీ", capacity: "మధ్యస్థ లభ్యత", contact: "9876543211", type: "వ్యర్థం/చెత్త" }
    ],
    helplineOptions: [
      "పంట సిఫార్సు", "ఎరువులు & విత్తనాలు", "మార్కెట్ ధర", "వాతావరణ సలహా",
      "ప్రభుత్వ పథకాలు", "సమీప సేకరణ కేంద్రం", "నా పంటను ట్రాక్ చేయండి", "సహాయకుడితో మాట్లాడండి"
    ]
  }
};

const mockMarketPrices = [
  { crop: "Paddy (Common)", price: "₹2,183", trend: "up", change: "+₹50" },
  { crop: "Cotton", price: "₹6,620", trend: "down", change: "-₹100" },
  { crop: "Maize", price: "₹2,090", trend: "up", change: "+₹20" },
  { crop: "Chilli (Teja)", price: "₹18,500", trend: "up", change: "+₹200" },
];

export const FarmerSupport = () => {
  const [lang, setLang] = useState('en');
  const [activeModal, setActiveModal] = useState(null);
  const [showResult, setShowResult] = useState(false);

  const t = translations[lang];

  const handleOpenModal = (id) => {
    setActiveModal(id);
    setShowResult(false);
  };

  const handleSimulateSubmit = (e) => {
    e.preventDefault();
    setShowResult(true);
  };

  const InputField = ({ label, type = "text", placeholder }) => (
    <div className="mb-4">
      <label className="block text-sm font-bold text-slate-700 mb-1">{label}</label>
      <input
        type={type}
        placeholder={placeholder}
        className="w-full px-4 py-3 rounded-xl border border-slate-300 focus:border-[#00a86b] focus:ring-2 focus:ring-[#00a86b]/20 transition-all outline-none text-slate-700"
        required
      />
    </div>
  );

  const SelectField = ({ label, options }) => (
    <div className="mb-4">
      <label className="block text-sm font-bold text-slate-700 mb-1">{label}</label>
      <select className="w-full px-4 py-3 rounded-xl border border-slate-300 focus:border-[#00a86b] focus:ring-2 focus:ring-[#00a86b]/20 transition-all outline-none text-slate-700 appearance-none bg-white">
        <option value="" disabled selected>Select an option</option>
        {options.map((opt, i) => (
          <option key={i} value={opt}>{opt}</option>
        ))}
      </select>
    </div>
  );

  const renderModalContent = () => {
    switch (activeModal) {
      case 'crop':
        return (
          <div className="space-y-4">
            {!showResult ? (
              <form onSubmit={handleSimulateSubmit}>
                <InputField label={t.location} placeholder="E.g. Tenali" />
                <SelectField label={t.soilType} options={t.soilOptions} />
                <SelectField label={t.season} options={t.seasonOptions} />
                <SelectField label={t.waterAvailability} options={t.waterOptions} />
                <InputField label={t.landArea} type="number" placeholder="2.5" />
                <button type="submit" className="w-full py-3 bg-[#00a86b] text-white rounded-xl font-bold hover:bg-[#008f5a] transition-colors">
                  {t.submit}
                </button>
              </form>
            ) : (
              <div className="bg-emerald-50 rounded-xl p-5 border border-emerald-100">
                <h4 className="font-bold text-emerald-800 text-lg mb-4 text-center">Recommendation Found!</h4>
                <div className="space-y-3 text-sm">
                  <p><span className="font-semibold text-slate-600">Recommended Crop:</span> <span className="font-bold text-slate-900">{t.mockCropResult.crop}</span></p>
                  <p><span className="font-semibold text-slate-600">Est. Cultivation Cost:</span> <span className="font-bold text-slate-900">{t.mockCropResult.cost}</span></p>
                  <p><span className="font-semibold text-slate-600">Expected Yield:</span> <span className="font-bold text-slate-900">{t.mockCropResult.yield}</span></p>
                  <p><span className="font-semibold text-slate-600">Indicative Price:</span> <span className="font-bold text-slate-900">{t.mockCropResult.price}</span></p>
                  <p><span className="font-semibold text-slate-600">Nearest Center:</span> <span className="font-bold text-slate-900">{t.mockCropResult.center}</span></p>
                </div>
              </div>
            )}
          </div>
        );

      case 'fertilizer':
        return (
          <div className="space-y-4">
            {!showResult ? (
              <form onSubmit={handleSimulateSubmit}>
                <SelectField label={t.crop} options={t.cropOptions} />
                <InputField label={t.landArea} type="number" placeholder="2.5" />
                <button type="submit" className="w-full py-3 bg-[#00a86b] text-white rounded-xl font-bold hover:bg-[#008f5a] transition-colors">
                  {t.submit}
                </button>
              </form>
            ) : (
              <div className="bg-blue-50 rounded-xl p-5 border border-blue-100">
                <h4 className="font-bold text-blue-800 text-lg mb-4 text-center">Required Inputs</h4>
                <div className="space-y-3 text-sm">
                  <p><span className="font-semibold text-slate-600">Recommendation:</span> <br /><span className="font-bold text-slate-900">{t.mockFertilizerResult.recommendation}</span></p>
                  <p><span className="font-semibold text-slate-600">Subsidy Info:</span> <br /><span className="font-bold text-[#00a86b]">{t.mockFertilizerResult.subsidy}</span></p>
                  <p><span className="font-semibold text-slate-600">Availability:</span> <br /><span className="font-bold text-slate-900">{t.mockFertilizerResult.availability}</span></p>
                </div>
              </div>
            )}
          </div>
        );

      case 'market':
        return (
          <div className="space-y-3">
            {mockMarketPrices.map((item, idx) => (
              <div key={idx} className="flex items-center justify-between p-4 rounded-xl border border-slate-200 bg-white shadow-sm">
                <span className="font-bold text-slate-800">{item.crop}</span>
                <div className="text-right">
                  <div className="font-bold text-lg text-slate-900">{item.price}</div>
                  <div className={`flex items-center text-xs font-bold justify-end ${item.trend === 'up' ? 'text-emerald-600' : 'text-red-500'}`}>
                    {item.trend === 'up' ? <ArrowUpRight className="w-3 h-3 mr-1" /> : <ArrowDownRight className="w-3 h-3 mr-1" />}
                    {item.change}
                  </div>
                </div>
              </div>
            ))}
            <p className="text-xs text-center text-slate-500 mt-4">*Prices are indicative Mandi rates (per Quintal)</p>
          </div>
        );

      case 'schemes':
        return (
          <div className="space-y-4">
            {t.mockSchemes.map((scheme, idx) => (
              <div key={idx} className="p-4 rounded-xl border border-slate-200 bg-orange-50/50">
                <h4 className="font-bold text-orange-800 mb-2">{scheme.name}</h4>
                <p className="text-sm text-slate-700 mb-1"><span className="font-semibold text-slate-500">Benefit:</span> {scheme.benefit}</p>
                <p className="text-sm text-slate-700"><span className="font-semibold text-slate-500">Eligibility:</span> {scheme.eligibility}</p>
              </div>
            ))}
          </div>
        );

      case 'weather':
        return (
          <div className="space-y-4">
            <div className="flex items-center justify-center p-6 bg-gradient-to-r from-blue-400 to-blue-500 rounded-xl text-white">
              <CloudSunRain className="w-16 h-16 mr-4 opacity-90" />
              <div>
                <div className="text-4xl font-black">{t.mockWeather.temp}</div>
                <div className="text-sm font-medium opacity-90">{t.mockWeather.condition}</div>
              </div>
            </div>
            <div className="bg-slate-50 p-4 rounded-xl border border-slate-200">
              <h5 className="font-bold text-slate-800 mb-1 flex items-center"><Wind className="w-4 h-4 mr-2 text-blue-500" /> Forecast</h5>
              <p className="text-sm text-slate-600">{t.mockWeather.forecast}</p>
            </div>
            <div className="bg-emerald-50 p-4 rounded-xl border border-emerald-200">
              <h5 className="font-bold text-emerald-800 mb-1 flex items-center"><Sprout className="w-4 h-4 mr-2 text-emerald-600" /> Farming Advice</h5>
              <p className="text-sm text-slate-700">{t.mockWeather.advice}</p>
            </div>
          </div>
        );

      case 'center':
        return (
          <div className="space-y-4">
            {t.mockCenters.map((center, idx) => (
              <div key={idx} className="p-4 rounded-xl border border-slate-200 bg-white relative overflow-hidden">
                <div className={`absolute top-0 left-0 w-1 h-full ${center.type === 'Good Crop' ? 'bg-[#00a86b]' : 'bg-orange-400'}`}></div>
                <h4 className="font-bold text-slate-800">{center.name}</h4>
                <div className="grid grid-cols-2 gap-2 mt-3 text-sm">
                  <div>
                    <span className="text-slate-500 block text-xs">Distance</span>
                    <span className="font-semibold">{center.distance}</span>
                  </div>
                  <div>
                    <span className="text-slate-500 block text-xs">Capacity</span>
                    <span className={`font-semibold ${center.capacity.includes('High') ? 'text-[#00a86b]' : 'text-orange-500'}`}>{center.capacity}</span>
                  </div>
                  <div className="col-span-2 pt-2 border-t border-slate-100 mt-1">
                    <span className="text-slate-500 block text-xs">Contact</span>
                    <span className="font-bold text-[#00a86b]">{center.contact}</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        );

      case 'track':
        return (
          <div className="space-y-4">
            {!showResult ? (
              <form onSubmit={handleSimulateSubmit}>
                <InputField label={t.regId} placeholder="e.g., REG123456" />
                <button type="submit" className="w-full py-3 bg-[#00a86b] text-white rounded-xl font-bold hover:bg-[#008f5a] transition-colors">
                  {t.submit}
                </button>
              </form>
            ) : (
              <div className="bg-white rounded-xl p-5 border border-slate-200">
                <h4 className="font-bold text-slate-800 mb-6">Status: Collection Pending</h4>
                <div className="relative border-l-2 border-emerald-500 ml-3 space-y-6">

                  <div className="relative pl-6">
                    <div className="absolute w-4 h-4 bg-emerald-500 rounded-full -left-[9px] top-1 border-4 border-white shadow-sm"></div>
                    <h5 className="font-bold text-sm text-slate-800">Registration Complete</h5>
                    <p className="text-xs text-slate-500">Aug 28, 2026</p>
                  </div>

                  <div className="relative pl-6">
                    <div className="absolute w-4 h-4 bg-emerald-500 rounded-full -left-[9px] top-1 border-4 border-white shadow-sm"></div>
                    <h5 className="font-bold text-sm text-slate-800">Center Allocated</h5>
                    <p className="text-xs text-slate-500">Tenali Procurement Center</p>
                  </div>

                  <div className="relative pl-6">
                    <div className="absolute w-4 h-4 bg-slate-300 rounded-full -left-[9px] top-1 border-4 border-white shadow-sm"></div>
                    <h5 className="font-bold text-sm text-slate-400">Collection & Quality Check</h5>
                    <p className="text-xs text-slate-400">Pending arrival</p>
                  </div>

                  <div className="relative pl-6">
                    <div className="absolute w-4 h-4 bg-slate-300 rounded-full -left-[9px] top-1 border-4 border-white shadow-sm"></div>
                    <h5 className="font-bold text-sm text-slate-400">Payment Processed</h5>
                    <p className="text-xs text-slate-400">Pending</p>
                  </div>

                </div>
              </div>
            )}
          </div>
        );

      case 'helpline':
        return (
          <div className="space-y-4">
            <div className="text-center mb-6">
              <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-emerald-100 text-emerald-600 mb-3 animate-pulse">
                <PhoneCall className="w-8 h-8" />
              </div>
              <h3 className="text-2xl font-black text-slate-900 tracking-tight">1800-123-4567</h3>
              <p className="text-sm text-slate-500 mt-1">Dial the number or select an option below</p>
            </div>

            <div className="bg-slate-50 rounded-2xl p-4 border border-slate-200">
              <div className="grid grid-cols-1 gap-2">
                {t.helplineOptions.map((opt, idx) => (
                  <button key={idx} className="flex items-center justify-between w-full p-3 rounded-xl bg-white border border-slate-200 hover:border-emerald-500 hover:bg-emerald-50 hover:text-emerald-700 transition-colors group">
                    <div className="flex items-center">
                      <span className="w-8 h-8 rounded-lg bg-slate-100 text-slate-600 font-bold flex items-center justify-center mr-3 group-hover:bg-emerald-100 group-hover:text-emerald-700">
                        {idx + 1}
                      </span>
                      <span className="font-medium text-sm text-left">{opt}</span>
                    </div>
                    <Phone className="w-4 h-4 opacity-30 group-hover:opacity-100" />
                  </button>
                ))}
              </div>
            </div>
          </div>
        );

      default:
        return null;
    }
  };

  return (
    <section className="py-16 md:py-24 bg-slate-50 relative border-t border-slate-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

        {/* Header Section */}
        <div className="flex flex-col md:flex-row items-center justify-between mb-12 text-center md:text-left gap-4">
          <div>
            <h2 className="text-3xl md:text-4xl font-black tracking-tight text-slate-900 mb-2">
              {t.sectionTitle}
            </h2>
            <p className="text-slate-600 max-w-2xl text-sm md:text-base">
              {t.sectionSubtitle}
            </p>
          </div>

          <button
            onClick={() => setLang(lang === 'en' ? 'te' : 'en')}
            className="inline-flex items-center px-4 py-2 rounded-full bg-white border border-slate-300 text-sm font-bold text-slate-700 shadow-sm hover:bg-slate-50 transition-colors"
          >
            {t.toggleLang}
          </button>
        </div>

        {/* Features Grid */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-6">
          {t.features.map((feature) => (
            <button
              key={feature.id}
              onClick={() => handleOpenModal(feature.id)}
              className={`flex flex-col items-center justify-center p-6 rounded-2xl border transition-all text-center group h-40
                ${feature.highlight
                  ? 'bg-[#00a86b] text-white border-transparent hover:bg-[#008f5a] shadow-md hover:shadow-lg'
                  : 'bg-white border-slate-200 text-slate-800 hover:border-emerald-400 hover:shadow-md'
                }
              `}
            >
              <div className={`p-3 rounded-full mb-3 transition-transform group-hover:scale-110 
                ${feature.highlight ? 'bg-white/20' : 'bg-emerald-50 text-emerald-600'}
              `}>
                <feature.icon className="w-7 h-7" />
              </div>
              <h3 className="font-bold text-sm md:text-base leading-tight mb-1">{feature.title}</h3>
              {!feature.highlight && <p className="text-xs text-slate-500 opacity-80">{feature.desc}</p>}
            </button>
          ))}
        </div>

      </div>

      {/* Modal Overlay */}
      {activeModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-sm">
          <div className="bg-white rounded-3xl w-full max-w-md shadow-2xl overflow-hidden flex flex-col max-h-[90vh]">

            {/* Modal Header */}
            <div className="flex items-center justify-between p-5 border-b border-slate-100">
              <div className="flex items-center space-x-3">
                {(() => {
                  const feature = t.features.find(f => f.id === activeModal);
                  const Icon = feature?.icon || Sprout;
                  return (
                    <>
                      <div className="p-2 rounded-lg bg-emerald-50 text-emerald-600">
                        <Icon className="w-5 h-5" />
                      </div>
                      <h3 className="font-black text-lg text-slate-900">{feature?.title}</h3>
                    </>
                  );
                })()}
              </div>
              <button
                onClick={() => setActiveModal(null)}
                className="p-2 rounded-full hover:bg-slate-100 text-slate-500 transition-colors"
                aria-label={t.close}
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Modal Body */}
            <div className="p-6 overflow-y-auto">
              {renderModalContent()}
            </div>

          </div>
        </div>
      )}

    </section>
  );
};

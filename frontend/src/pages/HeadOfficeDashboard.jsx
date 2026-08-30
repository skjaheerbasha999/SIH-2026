import React, { useState } from 'react';
import {
  Sprout,
  Users,
  Building2,
  Scale,
  ArrowLeft,
  CheckCircle2,
  Plus,
  Eye,
  LogOut,
  User,
  X,
  Sparkles,
  Search,
  Filter,
  Send,
  CheckCircle,
  RefreshCw,
  Sliders,
  Check,
  ArrowUpDown,
  Save,
  MapPin,
  Truck,
  MessageSquare,
  Package,
  Boxes,
  PieChart,
  TrendingUp,
  AlertTriangle,
  FileText,
  Clock,
  PhoneCall,
  ShieldCheck,
  Award,
  BarChart3,
  Globe,
  Layers,
  ArrowUpRight,
  UserCheck,
  Briefcase
} from 'lucide-react';
import { useApp } from '../context/AppContext';

// ==========================================
// MOCK DATA FOR HEAD OFFICE STAKEHOLDERS
// ==========================================

const INDIA_STATES_DISTRICTS = {
  'Haryana': ['Sonipat', 'Ambala', 'Karnal', 'Kurukshetra', 'Panipat', 'Hisar', 'Rohtak', 'Sirsa', 'Yamunanagar', 'Fatehabad'],
  'Punjab': ['Ludhiana', 'Sangrur', 'Patiala', 'Jalandhar', 'Amritsar', 'Bathinda', 'Firozpur', 'Moga', 'Gurdaspur', 'Hoshiarpur'],
  'Uttar Pradesh': ['Lakhimpur Kheri', 'Aligarh', 'Mathura', 'Meerut', 'Agra', 'Varanasi', 'Gorakhpur', 'Bareilly', 'Moradabad', 'Ayodhya'],
  'Madhya Pradesh': ['Ujjain', 'Indore', 'Bhopal', 'Jabalpur', 'Gwalior', 'Hoshangabad', 'Vidisha', 'Dewas', 'Sagar', 'Chhindwara'],
  'Rajasthan': ['Ganganagar', 'Hanumangarh', 'Kota', 'Jaipur', 'Alwar', 'Bharatpur', 'Jodhpur', 'Bikaner', 'Sikar', 'Udaipur'],
  'Maharashtra': ['Nashik', 'Pune', 'Nagpur', 'Aurangabad', 'Solapur', 'Kolhapur', 'Ahmednagar', 'Satara', 'Latur', 'Amravati'],
  'Andhra Pradesh': ['Guntur', 'Krishna', 'West Godavari', 'East Godavari', 'Kurnool', 'Anantapur', 'Prakasam', 'Nellore', 'Chittoor', 'Vizianagaram'],
  'Telangana': ['Karimnagar', 'Nalgonda', 'Nizamabad', 'Khammam', 'Warangal', 'Rangareddy', 'Mahabubnagar', 'Medak', 'Adilabad', 'Suryapet'],
  'Karnataka': ['Belagavi', 'Davangere', 'Shivamogga', 'Mandya', 'Haveri', 'Tumakuru', 'Ballari', 'Kalaburagi', 'Mysuru', 'Bagalkote'],
  'Tamil Nadu': ['Thanjavur', 'Tiruvarur', 'Madurai', 'Coimbatore', 'Salem', 'Erode', 'Tiruchirappalli', 'Villupuram', 'Cuddalore', 'Dindigul'],
  'West Bengal': ['Burdwan', 'Hooghly', 'Murshidabad', 'Nadia', 'North 24 Parganas', 'Birbhum', 'Malda', 'Bankura', 'Purulia', 'Dinajpur'],
  'Gujarat': ['Rajkot', 'Junagadh', 'Surat', 'Vadodara', 'Bhavnagar', 'Mehsana', 'Banaskantha', 'Amreli', 'Jamnagar', 'Anand'],
  'Bihar': ['Rohtas', 'West Champaran', 'East Champaran', 'Katihar', 'Nalanda', 'Gaya', 'Begusarai', 'Muzaffarpur', 'Samastipur', 'Bhojpur']
};

const FARMERS_DATA = [
  { id: 'FARM-1001', name: 'Ramesh Kumar', mobile: '9876543211', village: 'Sonipat Khas', state: 'Haryana', district: 'Sonipat', crops: 'Wheat PBW 550, Mustard', areaAcres: 4.5, totalQtyKg: 14200, status: 'Active' },
  { id: 'FARM-1002', name: 'Sujata Devi', mobile: '9876543212', village: 'Rampur', state: 'Haryana', district: 'Sonipat', crops: 'Mustard Sarson', areaAcres: 2.8, totalQtyKg: 9400, status: 'Active' },
  { id: 'FARM-1003', name: 'Mahesh Patel', mobile: '9876543213', village: 'Sonipat East', state: 'Haryana', district: 'Sonipat', crops: 'Paddy Basmati 1121', areaAcres: 5.0, totalQtyKg: 11500, status: 'Active' },
  { id: 'FARM-1004', name: 'Harpreet Singh', mobile: '9876543214', village: 'Kotla', state: 'Punjab', district: 'Ludhiana', crops: 'Sharbati Wheat', areaAcres: 6.2, totalQtyKg: 12800, status: 'Active' },
  { id: 'FARM-1005', name: 'Sunita Yadav', mobile: '9876543215', village: 'Kisan Nagar', state: 'Haryana', district: 'Sonipat', crops: 'Cotton Bt Hybrid', areaAcres: 3.5, totalQtyKg: 4200, status: 'Pending Verification' },
  { id: 'FARM-1006', name: 'Devinder Singh', mobile: '9876543216', village: 'Sangrur Mandi', state: 'Punjab', district: 'Sangrur', crops: 'Paddy PB-1, Maize', areaAcres: 5.5, totalQtyKg: 10900, status: 'Active' },
  { id: 'FARM-1007', name: 'Karan Sharma', mobile: '9876543217', village: 'Ambala Cantt', state: 'Haryana', district: 'Ambala', crops: 'Wheat & Mustard', areaAcres: 3.2, totalQtyKg: 7800, status: 'Active' }
];

const VOLUNTEERS_DATA = [
  { id: 'VOL-401', name: 'Gurpreet Singh', mobile: '9876543210', state: 'Haryana', district: 'Sonipat', mandal: 'Sonipat Mandal', deliveries: 48, totalVolumeKg: 112400, vehicle: 'Mahindra Bolero (HR-10-AB-4321)', status: 'Active' },
  { id: 'VOL-402', name: 'Anita Devi', mobile: '9876598765', state: 'Haryana', district: 'Sonipat', mandal: 'Sonipat Mandal', deliveries: 36, totalVolumeKg: 89000, vehicle: 'Tata Ace Gold (HR-10-C-8899)', status: 'Active' },
  { id: 'VOL-403', name: 'Sunita Sharma', mobile: '9811223344', state: 'Punjab', district: 'Ludhiana', mandal: 'Ludhiana Central', deliveries: 42, totalVolumeKg: 98500, vehicle: 'Eicher Mini Truck (PB-10-E-9012)', status: 'Active' },
  { id: 'VOL-404', name: 'Rajender Kumar', mobile: '9822334455', state: 'Punjab', district: 'Sangrur', mandal: 'Sangrur North', deliveries: 29, totalVolumeKg: 64200, vehicle: 'Force Trump (PB-13-F-5544)', status: 'Active' },
  { id: 'VOL-405', name: 'Vikram Choudhary', mobile: '9833445566', state: 'Haryana', district: 'Ambala', mandal: 'Ambala Sadar', deliveries: 24, totalVolumeKg: 52100, vehicle: 'Mahindra Pickup (HR-01-G-1122)', status: 'Active' }
];

const CENTERS_DATA = [
  { id: 'CENTER-A', name: 'A Center (Priority Collection Center)', officer: 'Dr. Vikram Sharma', state: 'Haryana', district: 'Sonipat', capacityKg: 5000, currentStockKg: 3800, availableKg: 1200, status: 'AVAILABLE (76% Full)', category: 'Priority' },
  { id: 'CENTER-B', name: 'B Center (Secondary Collection Center)', officer: 'Er. Rajesh Verma', state: 'Haryana', district: 'Sonipat', capacityKg: 5000, currentStockKg: 4700, availableKg: 300, status: 'LIMITED (94% Full)', category: 'Secondary' },
  { id: 'CENTER-C', name: 'C Center (Overflow Collection Center)', officer: 'Mrs. Sunita Patel', state: 'Haryana', district: 'Sonipat', capacityKg: 5000, currentStockKg: 5000, availableKg: 0, status: 'FULL (100% Full)', category: 'Overflow' },
  { id: 'CENTER-18', name: 'Ludhiana Central Procurement Hub #18', officer: 'Sardar Balwinder Singh', state: 'Punjab', district: 'Ludhiana', capacityKg: 80000, currentStockKg: 58400, availableKg: 21600, status: 'Operating Online', category: 'Priority' }
];

const CROP_RATIO_DATA = [
  { cropName: 'Wheat (PBW 550 & Sharbati)', totalQtyKg: 204000, percentageShare: 42.0, color: 'bg-emerald-600', textColor: 'text-emerald-700' },
  { cropName: 'Paddy Basmati (1121 & PB 1)', totalQtyKg: 170000, percentageShare: 35.0, color: 'bg-amber-500', textColor: 'text-amber-700' },
  { cropName: 'Mustard Sarson Oilseed', totalQtyKg: 72800, percentageShare: 15.0, color: 'bg-yellow-500', textColor: 'text-yellow-700' },
  { cropName: 'Maize & Cotton Industrial', totalQtyKg: 38800, percentageShare: 8.0, color: 'bg-[#00a86b]', textColor: 'text-[#00a86b]' }
];

const DISTRICT_PERFORMANCE = [
  { district: 'Sonipat', centersCount: 34, volumeKg: 142000, gradeARatio: 72, mspDisbursed: '₹ 4.26 Cr' },
  { district: 'Ludhiana', centersCount: 42, volumeKg: 168500, gradeARatio: 75, mspDisbursed: '₹ 5.05 Cr' },
  { district: 'Sangrur', centersCount: 38, volumeKg: 118500, gradeARatio: 68, mspDisbursed: '₹ 3.55 Cr' },
  { district: 'Ambala', centersCount: 28, volumeKg: 95400, gradeARatio: 64, mspDisbursed: '₹ 2.86 Cr' }
];

export const HeadOfficeDashboard = () => {
  const { userSession, navigateTo, showToast } = useApp();

  const officialName = userSession?.name || 'Director S. K. Roy';
  const officialRole = 'State Head Office Director';
  const stateJurisdiction = 'Haryana & Punjab Procurement Board';

  // MAIN TABS: 'overview' | 'analytics'
  const [activeMainTab, setActiveMainTab] = useState('overview');

  // OVERVIEW DRILL-DOWN SUB TABS: 'farmers' | 'volunteers' | 'centers'
  const [activeStakeholderTab, setActiveStakeholderTab] = useState('farmers');

  // FILTERS STATE
  const [selectedState, setSelectedState] = useState('ALL');
  const [selectedDistrict, setSelectedDistrict] = useState('ALL');
  const [selectedStatusFilter, setSelectedStatusFilter] = useState('ALL');
  const [searchQuery, setSearchQuery] = useState('');

  // FILTERED STAKEHOLDER DATA
  const filteredFarmers = FARMERS_DATA.filter(f => {
    const matchesState = selectedState === 'ALL' || f.state === selectedState;
    const matchesDistrict = selectedDistrict === 'ALL' || f.district === selectedDistrict;
    const matchesStatus = selectedStatusFilter === 'ALL' || f.status === selectedStatusFilter;
    const matchesSearch = f.name.toLowerCase().includes(searchQuery.toLowerCase()) || f.id.toLowerCase().includes(searchQuery.toLowerCase()) || f.village.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesState && matchesDistrict && matchesStatus && matchesSearch;
  });

  const filteredVolunteers = VOLUNTEERS_DATA.filter(v => {
    const matchesState = selectedState === 'ALL' || v.state === selectedState;
    const matchesDistrict = selectedDistrict === 'ALL' || v.district === selectedDistrict;
    const matchesStatus = selectedStatusFilter === 'ALL' || v.status === selectedStatusFilter;
    const matchesSearch = v.name.toLowerCase().includes(searchQuery.toLowerCase()) || v.id.toLowerCase().includes(searchQuery.toLowerCase()) || v.mandal.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesState && matchesDistrict && matchesStatus && matchesSearch;
  });

  const filteredCenters = CENTERS_DATA.filter(c => {
    const matchesState = selectedState === 'ALL' || c.state === selectedState;
    const matchesDistrict = selectedDistrict === 'ALL' || c.district === selectedDistrict;
    const matchesSearch = c.name.toLowerCase().includes(searchQuery.toLowerCase()) || c.officer.toLowerCase().includes(searchQuery.toLowerCase()) || c.id.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesState && matchesDistrict && matchesSearch;
  });

  return (
    <div className="min-h-screen bg-slate-50 text-slate-900 flex flex-col justify-between selection:bg-emerald-100 selection:text-emerald-900">

      {/* HEADER BAR */}
      <header className="bg-[#00a86b] text-white py-3.5 px-4 sm:px-8 sticky top-0 z-40 shadow-md">
        <div className="max-w-7xl mx-auto flex items-center justify-between">

          <div className="flex items-center space-x-3">
            <button
              onClick={() => navigateTo('home')}
              className="p-1.5 rounded-xl bg-[#008f5a] hover:bg-[#007d4f] text-white transition-colors"
              title="Return Home"
            >
              <ArrowLeft className="w-4 h-4" />
            </button>
            <div className="w-8.5 h-8.5 rounded-full bg-white text-[#00a86b] flex items-center justify-center font-bold shadow-xs">
              <Globe className="w-5 h-5" />
            </div>
            <div>
              <span className="text-sm font-black text-white block leading-none tracking-tight">Head Office Command Center</span>
              <span className="text-[9px] text-emerald-200 uppercase tracking-widest font-bold mt-0.5 block">
                {stateJurisdiction}
              </span>
            </div>
          </div>

          {/* MAIN TABS SWITCHER */}
          <div className="hidden sm:flex items-center space-x-1 text-xs font-bold bg-[#008f5a] p-1.5 rounded-2xl border border-white/20 shadow-inner">
            {[
              { id: 'overview', label: '👥 Platform Stakeholder Summary' },
              { id: 'analytics', label: '📊 Crop Analytics & Ratios' }
            ].map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveMainTab(tab.id)}
                className={`px-4 py-2 rounded-xl transition-all ${activeMainTab === tab.id
                    ? 'bg-white text-[#00a86b] shadow-sm font-extrabold'
                    : 'text-emerald-100 hover:text-white hover:bg-[#007d4f]'
                  }`}
              >
                {tab.label}
              </button>
            ))}
          </div>

          {/* OFFICER PROFILE & LOGOUT */}
          <div className="flex items-center space-x-3">
            <div className="hidden sm:flex flex-col text-right">
              <span className="text-xs font-bold text-white">{officialName}</span>
              <span className="text-[10px] text-emerald-200">{officialRole}</span>
            </div>
            <button
              onClick={() => {
                showToast('Logged out of Head Office Command Portal');
                navigateTo('login');
              }}
              className="flex items-center space-x-1 px-3 py-1.5 rounded-xl bg-[#008f5a] hover:bg-[#007d4f] text-white text-xs font-bold transition-colors"
            >
              <LogOut className="w-3.5 h-3.5" />
              <span className="hidden sm:inline">Logout</span>
            </button>
          </div>

        </div>
      </header>

      {/* MOBILE HEADER TABS */}
      <div className="sm:hidden bg-[#008f5a] text-white px-2 py-2 flex items-center justify-center space-x-2 text-xs font-bold shadow-xs">
        {[
          { id: 'overview', label: '👥 Stakeholders' },
          { id: 'analytics', label: '📊 Crop Ratios' }
        ].map((tab) => (
          <button
            key={tab.id}
            onClick={() => setActiveMainTab(tab.id)}
            className={`px-4 py-1.5 rounded-lg ${activeMainTab === tab.id ? 'bg-white text-[#00a86b] font-extrabold' : 'text-emerald-200'
              }`}
          >
            {tab.label}
          </button>
        ))}
      </div>

      {/* MAIN CONTENT AREA */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 w-full space-y-8 my-auto">

        {/* HERO INFORMATIONAL BANNER */}
        <div className="bg-white rounded-3xl p-6 border border-slate-200 shadow-xs flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div className="space-y-1">
            <div className="flex items-center space-x-2">
              <span className="text-[10px] font-black text-emerald-800 bg-emerald-100 px-2.5 py-0.5 rounded-full uppercase tracking-wider">
                CENTRAL PROCUREMENT MONITORING &amp; GOVERNANCE
              </span>
              <span className="text-xs text-slate-400 font-semibold">• Real-Time Analytics Active</span>
            </div>
            <h1 className="text-2xl sm:text-3xl font-black text-slate-900">
              State Agricultural Head Office Portal
            </h1>
            <p className="text-xs text-slate-500 font-medium">
              Monitor network-wide registered farmers, active volunteers, center in-charges, crop production ratio share, quality distribution, and pipeline flows.
            </p>
          </div>

          <div className="bg-emerald-50 p-4 rounded-2xl border border-emerald-200 text-xs font-bold text-slate-800 flex items-center space-x-4 flex-shrink-0">
            <div>
              <span className="text-[10px] text-slate-500 uppercase block">Total Network Procurement</span>
              <span className="text-lg font-black text-[#00a86b]">4,85,600 kg (MSP ₹1.45 Cr)</span>
            </div>
            <div className="w-10 h-10 rounded-2xl bg-[#00a86b] text-white flex items-center justify-center font-black">
              <BarChart3 className="w-5 h-5" />
            </div>
          </div>
        </div>

        {/* ========================================================================= */}
        {/* SECTION 1: PLATFORM OVERVIEW / STAKEHOLDER SUMMARY                        */}
        {/* ========================================================================= */}
        {activeMainTab === 'overview' && (
          <div className="space-y-8">

            {/* SUMMARY CARDS / WIDGETS (4 KEY STAKEHOLDER METRICS) */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-xs font-bold">
              <div className="bg-white p-5 rounded-3xl border border-slate-200 shadow-xs space-y-1">
                <div className="flex justify-between items-center text-slate-400">
                  <span className="uppercase tracking-wider text-[10px]">Registered Farmers</span>
                  <Users className="w-4 h-4 text-emerald-700" />
                </div>
                <span className="text-3xl font-black text-slate-900">12,450</span>
                <span className="text-emerald-700 block text-[10px]">11,890 Active (95.5%)</span>
              </div>

              <div className="bg-white p-5 rounded-3xl border border-slate-200 shadow-xs space-y-1">
                <div className="flex justify-between items-center text-slate-400">
                  <span className="uppercase tracking-wider text-[10px]">Active Volunteers</span>
                  <UserCheck className="w-4 h-4 text-blue-700" />
                </div>
                <span className="text-3xl font-black text-blue-700">840</span>
                <span className="text-blue-700 block text-[10px]">785 On Duty (93.4%)</span>
              </div>

              <div className="bg-white p-5 rounded-3xl border border-slate-200 shadow-xs space-y-1">
                <div className="flex justify-between items-center text-slate-400">
                  <span className="uppercase tracking-wider text-[10px]">Center-In-Charges</span>
                  <Briefcase className="w-4 h-4 text-purple-700" />
                </div>
                <span className="text-3xl font-black text-purple-700">142</span>
                <span className="text-purple-700 block text-[10px]">Licensed Officers</span>
              </div>

              <div className="bg-white p-5 rounded-3xl border border-slate-200 shadow-xs space-y-1">
                <div className="flex justify-between items-center text-slate-400">
                  <span className="uppercase tracking-wider text-[10px]">Collection Hubs</span>
                  <Building2 className="w-4 h-4 text-amber-700" />
                </div>
                <span className="text-3xl font-black text-amber-700">142 Hubs</span>
                <span className="text-amber-700 block text-[10px]">7,10,000 MT Capacity</span>
              </div>
            </div>

            {/* STAKEHOLDER DRILL-DOWN CONTAINER */}
            <div className="bg-white rounded-3xl p-6 border border-slate-200 shadow-xs space-y-6">

              <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 pb-4 border-b border-slate-100">
                <div>
                  <h2 className="text-xl font-black text-slate-900">Stakeholder Directory &amp; Performance Drill-Down</h2>
                  <p className="text-xs text-slate-500 font-medium">Filter and inspect individual registered Farmers, active Volunteers, and Center-in-Charges.</p>
                </div>

                {/* FILTERS BAR */}
                <div className="flex flex-wrap items-center gap-3 text-xs font-bold">
                  <div className="relative min-w-[180px]">
                    <Search className="w-4 h-4 absolute left-3 top-2.5 text-slate-400" />
                    <input
                      type="text"
                      value={searchQuery}
                      onChange={(e) => setSearchQuery(e.target.value)}
                      placeholder="Search Name, ID, Mandal..."
                      className="w-full pl-9 pr-3 py-2 bg-slate-50 rounded-xl border border-slate-200 font-semibold text-slate-900 focus:ring-2 focus:ring-[#00a86b] focus:outline-none"
                    />
                  </div>

                  {/* State Select */}
                  <select
                    value={selectedState}
                    onChange={(e) => {
                      setSelectedState(e.target.value);
                      setSelectedDistrict('ALL');
                    }}
                    className="py-2 px-3 bg-slate-50 rounded-xl border border-slate-200 text-slate-800 font-bold"
                  >
                    <option value="ALL">All States (Pan-India)</option>
                    {Object.keys(INDIA_STATES_DISTRICTS).map((st) => (
                      <option key={st} value={st}>{st}</option>
                    ))}
                  </select>

                  {/* District Select */}
                  <select
                    value={selectedDistrict}
                    onChange={(e) => setSelectedDistrict(e.target.value)}
                    className="py-2 px-3 bg-slate-50 rounded-xl border border-slate-200 text-slate-800 font-bold"
                  >
                    <option value="ALL">All Districts ({selectedState === 'ALL' ? 'State' : selectedState})</option>
                    {selectedState !== 'ALL' ? (
                      INDIA_STATES_DISTRICTS[selectedState]?.map((dst) => (
                        <option key={dst} value={dst}>{dst} District</option>
                      ))
                    ) : (
                      Array.from(new Set(Object.values(INDIA_STATES_DISTRICTS).flat())).sort().map((dst) => (
                        <option key={dst} value={dst}>{dst} District</option>
                      ))
                    )}
                  </select>

                  <select
                    value={selectedStatusFilter}
                    onChange={(e) => setSelectedStatusFilter(e.target.value)}
                    className="py-2 px-3 bg-slate-50 rounded-xl border border-slate-200 text-slate-800"
                  >
                    <option value="ALL">All Statuses</option>
                    <option value="Active">Active</option>
                    <option value="Pending Verification">Pending Verification</option>
                  </select>
                </div>
              </div>

              {/* DRILL-DOWN SUB TABS */}
              <div className="flex items-center space-x-2 border-b border-slate-200 text-xs font-extrabold pb-3">
                {[
                  { id: 'farmers', label: `Registered Farmers (${filteredFarmers.length})` },
                  { id: 'volunteers', label: `Volunteers (${filteredVolunteers.length})` },
                  { id: 'centers', label: `Center-in-Charges & Hubs (${filteredCenters.length})` }
                ].map((tab) => (
                  <button
                    key={tab.id}
                    onClick={() => setActiveStakeholderTab(tab.id)}
                    className={`px-4 py-2 rounded-xl transition-all ${activeStakeholderTab === tab.id
                        ? 'bg-[#00a86b] text-white shadow-xs'
                        : 'text-slate-600 hover:text-slate-900 hover:bg-slate-100'
                      }`}
                  >
                    {tab.label}
                  </button>
                ))}
              </div>

              {/* TAB 1: FARMERS DRILL-DOWN TABLE */}
              {activeStakeholderTab === 'farmers' && (
                <div className="overflow-x-auto">
                  <table className="w-full text-left text-xs">
                    <thead>
                      <tr className="border-b border-slate-200 text-slate-400 font-bold uppercase text-[10px]">
                        <th className="py-3 px-3">Farmer ID &amp; Name</th>
                        <th className="py-3 px-3">Contact Details</th>
                        <th className="py-3 px-3">Location (Village, District)</th>
                        <th className="py-3 px-3">Crops Registered</th>
                        <th className="py-3 px-3">Cultivated Area</th>
                        <th className="py-3 px-3">Total Qty Supplied</th>
                        <th className="py-3 px-3">Verification Status</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-slate-100 font-semibold text-slate-800">
                      {filteredFarmers.map((farmer) => (
                        <tr key={farmer.id} className="hover:bg-slate-50 transition-colors">
                          <td className="py-3.5 px-3">
                            <span className="font-mono font-black text-[#00a86b] text-xs block">{farmer.id}</span>
                            <span className="font-extrabold text-slate-900">{farmer.name}</span>
                          </td>
                          <td className="py-3.5 px-3 text-slate-600">+91 {farmer.mobile}</td>
                          <td className="py-3.5 px-3">
                            <span className="font-bold text-slate-900 block">{farmer.village}</span>
                            <span className="text-[10px] text-slate-500">{farmer.district} District</span>
                          </td>
                          <td className="py-3.5 px-3">
                            <span className="bg-emerald-50 text-[#00a86b] px-2 py-0.5 rounded-md font-bold text-[11px] border border-emerald-200">
                              {farmer.crops}
                            </span>
                          </td>
                          <td className="py-3.5 px-3 font-bold text-slate-700">{farmer.areaAcres} Acres</td>
                          <td className="py-3.5 px-3 font-black text-[#00a86b] text-sm">{farmer.totalQtyKg.toLocaleString()} kg</td>
                          <td className="py-3.5 px-3">
                            <span className={`text-[10px] font-black px-2.5 py-0.5 rounded-full border ${farmer.status === 'Active' ? 'bg-emerald-100 text-[#00a86b] border-emerald-300' : 'bg-amber-100 text-amber-900 border-amber-300'
                              }`}>
                              ✓ {farmer.status.toUpperCase()}
                            </span>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              )}

              {/* TAB 2: VOLUNTEERS DRILL-DOWN TABLE */}
              {activeStakeholderTab === 'volunteers' && (
                <div className="overflow-x-auto">
                  <table className="w-full text-left text-xs">
                    <thead>
                      <tr className="border-b border-slate-200 text-slate-400 font-bold uppercase text-[10px]">
                        <th className="py-3 px-3">Volunteer ID &amp; Name</th>
                        <th className="py-3 px-3">Contact</th>
                        <th className="py-3 px-3">Assigned Region / Mandal</th>
                        <th className="py-3 px-3">Deliveries Completed</th>
                        <th className="py-3 px-3">Total Volume Transported</th>
                        <th className="py-3 px-3">Assigned Vehicle</th>
                        <th className="py-3 px-3">Duty Status</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-slate-100 font-semibold text-slate-800">
                      {filteredVolunteers.map((vol) => (
                        <tr key={vol.id} className="hover:bg-slate-50 transition-colors">
                          <td className="py-3.5 px-3">
                            <span className="font-mono font-black text-blue-700 text-xs block">{vol.id}</span>
                            <span className="font-extrabold text-slate-900">{vol.name}</span>
                          </td>
                          <td className="py-3.5 px-3 text-slate-600">+91 {vol.mobile}</td>
                          <td className="py-3.5 px-3">
                            <span className="font-bold text-slate-900 block">{vol.mandal}</span>
                            <span className="text-[10px] text-slate-500">{vol.district} District</span>
                          </td>
                          <td className="py-3.5 px-3 font-black text-slate-900 text-sm">{vol.deliveries} Pickups</td>
                          <td className="py-3.5 px-3 font-black text-blue-800 text-sm">{vol.totalVolumeKg.toLocaleString()} kg</td>
                          <td className="py-3.5 px-3 text-slate-600 text-[11px] font-medium">{vol.vehicle}</td>
                          <td className="py-3.5 px-3">
                            <span className="text-[10px] font-black px-2.5 py-0.5 rounded-full border bg-blue-100 text-blue-900 border-blue-300">
                              ● {vol.status.toUpperCase()}
                            </span>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              )}

              {/* TAB 3: CENTER IN-CHARGES DRILL-DOWN TABLE */}
              {activeStakeholderTab === 'centers' && (
                <div className="overflow-x-auto">
                  <table className="w-full text-left text-xs">
                    <thead>
                      <tr className="border-b border-slate-200 text-slate-400 font-bold uppercase text-[10px]">
                        <th className="py-3 px-3">Center ID &amp; Name</th>
                        <th className="py-3 px-3">Center In-Charge Officer</th>
                        <th className="py-3 px-3">District Location</th>
                        <th className="py-3 px-3">Current Stock Occupancy</th>
                        <th className="py-3 px-3">Crops Handled</th>
                        <th className="py-3 px-3">Active Volunteers</th>
                        <th className="py-3 px-3">Center Status</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-slate-100 font-semibold text-slate-800">
                      {filteredCenters.map((center) => (
                        <tr key={center.id} className="hover:bg-slate-50 transition-colors">
                          <td className="py-3.5 px-3">
                            <span className="font-mono font-black text-purple-700 text-xs block">{center.id}</span>
                            <span className="font-extrabold text-slate-900">{center.name}</span>
                          </td>
                          <td className="py-3.5 px-3 font-bold text-slate-800">{center.officer}</td>
                          <td className="py-3.5 px-3 text-slate-600">{center.district} District</td>
                          <td className="py-3.5 px-3">
                            <span className="font-black text-[#00a86b] text-sm block">
                              {center.currentStockKg.toLocaleString()} / {center.capacityKg.toLocaleString()} kg
                            </span>
                            <span className="text-[10px] text-slate-500 font-bold">
                              ({Math.round((center.currentStockKg / center.capacityKg) * 100)}% Capacity Used)
                            </span>
                          </td>
                          <td className="py-3.5 px-3 text-[11px] text-slate-700 font-medium">{center.cropsHandled}</td>
                          <td className="py-3.5 px-3 font-bold text-slate-800">{center.activeVolunteers} Volunteers</td>
                          <td className="py-3.5 px-3">
                            <span className="text-[10px] font-black px-2.5 py-0.5 rounded-full border bg-emerald-100 text-[#00a86b] border-emerald-300">
                              ● {center.status.toUpperCase()}
                            </span>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              )}

            </div>

          </div>
        )}

        {/* ========================================================================= */}
        {/* SECTION 2: CROP ANALYTICS & RATIO SECTION                                 */}
        {/* ========================================================================= */}
        {activeMainTab === 'analytics' && (
          <div className="space-y-8">

            {/* CROP RATIO SHARE & QUALITY DISTRIBUTION GRID */}
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">

              {/* Crop-Wise Percentage Share Donut/Bar Visual Card */}
              <div className="lg:col-span-2 bg-white rounded-3xl p-6 border border-slate-200 shadow-xs space-y-6">
                <div className="pb-3 border-b border-slate-100">
                  <h3 className="text-lg font-black text-slate-900">Network Crop Production Share &amp; Ratio Analysis</h3>
                  <p className="text-xs text-slate-500 font-medium">Total volume breakdown across all crop varieties in the procurement network.</p>
                </div>

                {/* PROGRESS BAR RATIO VISUAL */}
                <div className="space-y-2">
                  <div className="flex justify-between items-center text-xs font-black text-slate-800">
                    <span>Overall Network Volume: 4,85,600 kg</span>
                    <span>100% Total Procurement</span>
                  </div>
                  <div className="w-full h-5 rounded-2xl bg-slate-100 overflow-hidden flex p-0.5 border border-slate-200">
                    {CROP_RATIO_DATA.map((crop) => (
                      <div
                        key={crop.cropName}
                        style={{ width: `${crop.percentageShare}%` }}
                        className={`${crop.color} h-full first:rounded-l-xl last:rounded-r-xl transition-all duration-500`}
                        title={`${crop.cropName}: ${crop.percentageShare}%`}
                      />
                    ))}
                  </div>
                </div>

                {/* CROP RATIOS GRID */}
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
                  {CROP_RATIO_DATA.map((crop) => (
                    <div key={crop.cropName} className="p-4 bg-slate-50 rounded-2xl border border-slate-200 space-y-1">
                      <div className="flex items-center space-x-2">
                        <span className={`w-3 h-3 rounded-full ${crop.color}`} />
                        <span className="text-[10px] font-black text-slate-500 uppercase tracking-wider block truncate">{crop.cropName}</span>
                      </div>
                      <div className={`text-2xl font-black ${crop.textColor}`}>{crop.percentageShare}%</div>
                      <span className="text-xs font-extrabold text-slate-900 block">{crop.totalQtyKg.toLocaleString()} kg</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Category Allocation Distribution Card */}
              <div className="bg-white rounded-3xl p-6 border border-slate-200 shadow-xs space-y-4 flex flex-col justify-between">
                <div className="pb-3 border-b border-slate-100">
                  <h3 className="text-base font-black text-slate-900">State Category Allocation Ratio</h3>
                  <p className="text-xs text-slate-500 font-medium">Category distribution across all verified crop harvests</p>
                </div>

                <div className="space-y-4 text-xs font-bold">
                  <div>
                    <div className="flex justify-between font-extrabold text-[#00a86b] mb-1">
                      <span>Category A (&le; 5,000 kg)</span>
                      <span>68% (3,30,208 kg)</span>
                    </div>
                    <div className="w-full h-3 bg-slate-100 rounded-full overflow-hidden">
                      <div className="h-full bg-emerald-600 rounded-full" style={{ width: '68%' }} />
                    </div>
                  </div>

                  <div>
                    <div className="flex justify-between font-extrabold text-amber-800 mb-1">
                      <span>Category B (5,001 - 10,000 kg)</span>
                      <span>24% (1,16,544 kg)</span>
                    </div>
                    <div className="w-full h-3 bg-slate-100 rounded-full overflow-hidden">
                      <div className="h-full bg-amber-500 rounded-full" style={{ width: '24%' }} />
                    </div>
                  </div>

                  <div>
                    <div className="flex justify-between font-extrabold text-rose-800 mb-1">
                      <span>Category C (&gt; 10,000 kg)</span>
                      <span>8% (38,848 kg)</span>
                    </div>
                    <div className="w-full h-3 bg-slate-100 rounded-full overflow-hidden">
                      <div className="h-full bg-rose-500 rounded-full" style={{ width: '8%' }} />
                    </div>
                  </div>
                </div>

                <div className="p-3 bg-emerald-50 rounded-2xl border border-emerald-200 text-[11px] text-[#00a86b] font-semibold">
                  ✓ <strong>Target Exceeded:</strong> Grade A ratio is +6% higher than state target benchmark of 62%.
                </div>
              </div>

            </div>

            {/* FARMER LEADERBOARD & REGIONAL PERFORMANCE */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">

              {/* Top Farmer Leaderboard */}
              <div className="bg-white rounded-3xl p-6 border border-slate-200 shadow-xs space-y-4">
                <div className="pb-3 border-b border-slate-100 flex items-center justify-between">
                  <div>
                    <h3 className="text-base font-black text-slate-900">🏆 Top Producing Farmers Leaderboard</h3>
                    <p className="text-xs text-slate-500 font-medium">Highest volume crop contributors this season</p>
                  </div>
                  <Award className="w-6 h-6 text-amber-500" />
                </div>

                <div className="overflow-x-auto">
                  <table className="w-full text-left text-xs">
                    <thead>
                      <tr className="border-b border-slate-100 text-slate-400 font-bold uppercase text-[10px]">
                        <th className="py-2.5">Rank &amp; Farmer</th>
                        <th className="py-2.5">Location</th>
                        <th className="py-2.5">Crops Supplied</th>
                        <th className="py-2.5 text-right">Total Volume</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-slate-100 font-semibold text-slate-800">
                      <tr>
                        <td className="py-3 font-extrabold text-slate-900 flex items-center space-x-2">
                          <span className="w-6 h-6 rounded-full bg-amber-100 text-amber-900 font-black flex items-center justify-center text-xs">#1</span>
                          <span>Ramesh Kumar</span>
                        </td>
                        <td className="py-3 text-slate-600">Sonipat Khas</td>
                        <td className="py-3 text-emerald-800 font-bold">Wheat &amp; Mustard</td>
                        <td className="py-3 text-right font-black text-[#00a86b] text-sm">14,200 kg</td>
                      </tr>
                      <tr>
                        <td className="py-3 font-extrabold text-slate-900 flex items-center space-x-2">
                          <span className="w-6 h-6 rounded-full bg-slate-200 text-slate-800 font-black flex items-center justify-center text-xs">#2</span>
                          <span>Harpreet Singh</span>
                        </td>
                        <td className="py-3 text-slate-600">Kotla, Ludhiana</td>
                        <td className="py-3 text-emerald-800 font-bold">Wheat Sharbati</td>
                        <td className="py-3 text-right font-black text-[#00a86b] text-sm">12,800 kg</td>
                      </tr>
                      <tr>
                        <td className="py-3 font-extrabold text-slate-900 flex items-center space-x-2">
                          <span className="w-6 h-6 rounded-full bg-amber-700/20 text-amber-900 font-black flex items-center justify-center text-xs">#3</span>
                          <span>Mahesh Patel</span>
                        </td>
                        <td className="py-3 text-slate-600">Sonipat East</td>
                        <td className="py-3 text-amber-800 font-bold">Paddy Basmati</td>
                        <td className="py-3 text-right font-black text-[#00a86b] text-sm">11,500 kg</td>
                      </tr>
                    </tbody>
                  </table>
                </div>
              </div>

              {/* Regional District Performance Comparison */}
              <div className="bg-white rounded-3xl p-6 border border-slate-200 shadow-xs space-y-4">
                <div className="pb-3 border-b border-slate-100">
                  <h3 className="text-base font-black text-slate-900">District Procurement &amp; Inflow Comparison</h3>
                  <p className="text-xs text-slate-500 font-medium">Volume received and MSP disbursed across districts</p>
                </div>

                <div className="space-y-3 text-xs">
                  {DISTRICT_PERFORMANCE.map((dist) => (
                    <div key={dist.district} className="p-3 bg-slate-50 rounded-2xl border border-slate-200 space-y-1.5">
                      <div className="flex justify-between items-center font-extrabold text-slate-900">
                        <span>{dist.district} District ({dist.centersCount} Centers)</span>
                        <span className="text-[#00a86b] font-black">{dist.volumeKg.toLocaleString()} kg</span>
                      </div>
                      <div className="w-full h-2 bg-slate-200 rounded-full overflow-hidden">
                        <div className="h-full bg-[#00a86b] rounded-full" style={{ width: `${Math.round((dist.volumeKg / 170000) * 100)}%` }} />
                      </div>
                      <div className="flex justify-between text-[10px] text-slate-500 font-semibold">
                        <span>Grade A Ratio: {dist.gradeARatio}%</span>
                        <span>Total MSP Disbursed: {dist.mspDisbursed}</span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

            </div>

            {/* FARMER -> VOLUNTEER -> CENTER FLOW PIPELINE */}
            <div className="bg-white rounded-3xl p-6 border border-slate-200 shadow-xs space-y-6">
              <div className="pb-3 border-b border-slate-100">
                <h3 className="text-lg font-black text-slate-900">Farmer → Volunteer → Center Supply Pipeline Flow</h3>
                <p className="text-xs text-slate-500 font-medium">Tracking stage-by-stage crop movement and throughput efficiency</p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-center">

                <div className="p-6 bg-slate-50 rounded-3xl border border-slate-200 space-y-2">
                  <span className="text-[10px] font-black text-slate-400 uppercase tracking-wider block">STAGE 1: FARMER HARVESTS</span>
                  <div className="text-3xl font-black text-slate-900">5,10,000 kg</div>
                  <span className="text-xs font-bold text-slate-500 block">Reported by 12,450 Farmers</span>
                  <div className="pt-2 text-[10px] text-emerald-800 font-black bg-emerald-100 py-1 rounded-xl">100% Registered</div>
                </div>

                <div className="p-6 bg-slate-50 rounded-3xl border border-slate-200 space-y-2 relative">
                  <span className="text-[10px] font-black text-blue-700 uppercase tracking-wider block">STAGE 2: VOLUNTEER TRANSPORT</span>
                  <div className="text-3xl font-black text-blue-700">4,92,000 kg</div>
                  <span className="text-xs font-bold text-slate-500 block">Transported by 840 Volunteers</span>
                  <div className="pt-2 text-[10px] text-blue-800 font-black bg-blue-100 py-1 rounded-xl">96.5% Pickup Efficiency</div>
                </div>

                <div className="p-6 bg-slate-50 rounded-3xl border border-slate-200 space-y-2">
                  <span className="text-[10px] font-black text-[#00a86b] uppercase tracking-wider block">STAGE 3: CENTER VERIFIED &amp; STORED</span>
                  <div className="text-3xl font-black text-[#00a86b]">4,85,600 kg</div>
                  <span className="text-xs font-bold text-slate-500 block">Verified by 142 Center Hubs</span>
                  <div className="pt-2 text-[10px] text-emerald-800 font-black bg-emerald-100 py-1 rounded-xl">₹ 1.45 Cr MSP Disbursed</div>
                </div>

              </div>
            </div>

          </div>
        )}

      </main>

      {/* FOOTER */}
      <footer className="bg-white border-t border-slate-200 py-4 text-center text-xs text-slate-500">
        © 2026 Smart Agricultural Crop Category &amp; Center Management System • Authorized Head Office Portal Session
      </footer>

    </div>
  );
};

export default HeadOfficeDashboard;

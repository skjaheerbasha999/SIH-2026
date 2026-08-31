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
  Award
} from 'lucide-react';
import { useApp } from '../context/AppContext';

// ==========================================
// MOCK DATA & CONSTANTS FOR CENTER IN-CHARGE
// ==========================================

const INITIAL_CROPS = [
  {
    id: 'CROP-801',
    farmerId: 'FARM-1001',
    farmerName: 'Ramesh Kumar',
    farmerMobile: '9876543211',
    village: 'Sonipat Khas',
    district: 'Sonipat',
    cropName: 'Wheat',
    variety: 'PBW 550',
    quantityKg: 2400,
    qualityGrade: 'A',
    qualityLevel: 'High Quality',
    moisturePercent: '11.2%',
    purityPercent: '98.5%',
    defectPercent: '0.4%',
    dateReported: '2026-08-28 09:30 AM',
    status: 'In Transit', // 'New' | 'Price Sent' | 'Assigned' | 'In Transit' | 'Delivered' | 'Verified'
    offeredPricePerKg: 24.50,
    assignedVolunteer: {
      name: 'Gurpreet Singh',
      mobile: '9876543210',
      vehicle: 'Mahindra Bolero Pickup (HR-10-AB-4321)',
      location: 'En route on NH-44, 4.2 km from Center'
    },
    transportTimeline: [
      { stage: 'Assigned', time: '2026-08-28 10:00 AM', status: 'Completed', detail: 'Volunteer Gurpreet assigned' },
      { stage: 'Picked Up', time: '2026-08-28 11:15 AM', status: 'Completed', detail: 'Picked up 2,400 kg at Sonipat Khas' },
      { stage: 'In Transit', time: '2026-08-28 11:45 AM', status: 'Active', detail: 'En route to Silo Hub #42' },
      { stage: 'Delivered', time: 'Pending', status: 'Pending', detail: 'Awaiting arrival at gate' },
      { stage: 'Verified at Center', time: 'Pending', status: 'Pending', detail: 'Quality & weight check pending' }
    ]
  },
  {
    id: 'CROP-802',
    farmerId: 'FARM-1002',
    farmerName: 'Sujata Devi',
    farmerMobile: '9876543212',
    village: 'Rampur',
    district: 'Sonipat',
    cropName: 'Mustard',
    variety: 'Sarson Grade-A',
    quantityKg: 1250,
    qualityGrade: 'A',
    qualityLevel: 'High Quality',
    moisturePercent: '6.2%',
    purityPercent: '97.9%',
    defectPercent: '0.6%',
    dateReported: '2026-08-28 10:15 AM',
    status: 'Verified',
    offeredPricePerKg: 54.00,
    assignedVolunteer: {
      name: 'Anita Devi',
      mobile: '9876598765',
      vehicle: 'Tata Ace Gold (HR-10-C-8899)',
      location: 'Delivered & Verified at Silo Hub #42'
    },
    receivedQtyKg: 1250,
    receivedQualityGrade: 'A',
    receivedMoisture: '6.2%',
    discrepancyNote: 'Zero variance. Exact weight match.',
    transportTimeline: [
      { stage: 'Assigned', time: '2026-08-28 10:30 AM', status: 'Completed', detail: 'Volunteer Anita assigned' },
      { stage: 'Picked Up', time: '2026-08-28 11:00 AM', status: 'Completed', detail: 'Picked up at Rampur' },
      { stage: 'In Transit', time: '2026-08-28 11:30 AM', status: 'Completed', detail: 'Transport completed' },
      { stage: 'Delivered', time: '2026-08-28 12:15 PM', status: 'Completed', detail: 'Delivered to Bay 2' },
      { stage: 'Verified at Center', time: '2026-08-28 12:30 PM', status: 'Completed', detail: 'Verified by Dr. Vikram Sharma' }
    ]
  },
  {
    id: 'CROP-803',
    farmerId: 'FARM-1003',
    farmerName: 'Mahesh Patel',
    farmerMobile: '9876543213',
    village: 'Sonipat East',
    district: 'Sonipat',
    cropName: 'Paddy Basmati',
    variety: 'Basmati 1121',
    quantityKg: 6500,
    qualityGrade: 'B',
    qualityLevel: 'Medium Quality',
    moisturePercent: '13.8%',
    purityPercent: '92.1%',
    defectPercent: '2.4%',
    dateReported: '2026-08-29 08:00 AM',
    status: 'New',
    offeredPricePerKg: null,
    assignedVolunteer: null,
    transportTimeline: [
      { stage: 'Assigned', time: 'Pending', status: 'Pending', detail: 'Awaiting price offer & volunteer dispatch' },
      { stage: 'Picked Up', time: 'Pending', status: 'Pending', detail: 'Pending pickup' },
      { stage: 'In Transit', time: 'Pending', status: 'Pending', detail: 'Pending transport' },
      { stage: 'Delivered', time: 'Pending', status: 'Pending', detail: 'Pending delivery' },
      { stage: 'Verified at Center', time: 'Pending', status: 'Pending', detail: 'Pending verification' }
    ]
  },
  {
    id: 'CROP-804',
    farmerId: 'FARM-1005',
    farmerName: 'Sunita Yadav',
    farmerMobile: '9876543215',
    village: 'Kisan Nagar',
    district: 'Sonipat',
    cropName: 'Cotton',
    variety: 'Bt Hybrid',
    quantityKg: 12000,
    qualityGrade: 'C',
    qualityLevel: 'Low Quality (Industrial)',
    moisturePercent: '9.4%',
    purityPercent: '84.2%',
    defectPercent: '5.8%',
    dateReported: '2026-08-29 09:00 AM',
    status: 'Assigned',
    offeredPricePerKg: 35.00,
    assignedVolunteer: {
      name: 'Sunita Sharma',
      mobile: '9811223344',
      vehicle: 'Eicher Mini Truck (HR-10-E-9012)',
      location: 'Volunteer accepted order. En route to Kisan Nagar'
    },
    transportTimeline: [
      { stage: 'Assigned', time: '2026-08-29 09:30 AM', status: 'Completed', detail: 'Volunteer Sunita accepted' },
      { stage: 'Picked Up', time: 'Pending', status: 'Pending', detail: 'En route to pickup location' },
      { stage: 'In Transit', time: 'Pending', status: 'Pending', detail: 'Pending transport' },
      { stage: 'Delivered', time: 'Pending', status: 'Pending', detail: 'Pending delivery' },
      { stage: 'Verified at Center', time: 'Pending', status: 'Pending', detail: 'Pending verification' }
    ]
  }
];

const AVAILABLE_VOLUNTEERS = [
  { name: 'Gurpreet Singh', mobile: '9876543210', mandal: 'Sonipat Mandal', vehicle: 'Mahindra Bolero Pickup (HR-10-AB-4321)' },
  { name: 'Anita Devi', mobile: '9876598765', mandal: 'Sonipat Mandal', vehicle: 'Tata Ace Gold (HR-10-C-8899)' },
  { name: 'Sunita Sharma', mobile: '9811223344', mandal: 'Sonipat Mandal', vehicle: 'Eicher Mini Truck (HR-10-E-9012)' },
  { name: 'Rajender Kumar', mobile: '9822334455', mandal: 'Sonipat Mandal', vehicle: 'Force Trump 400 (HR-10-F-5544)' }
];

const STORAGE_INVENTORY_BY_CROP = [
  {
    cropName: 'Wheat (PBW 550 & Sharbati)',
    totalStockKg: 23000,
    catA: 3800,   // Total from ≤ 5,000 kg batches
    catB: 6700,   // Total from 5,001 - 10,000 kg batches
    catC: 12500,  // Total from > 10,000 kg batches
    lastUpdate: '2026-08-29 11:30 AM',
    sources: ['Ramesh Kumar (Sonipat Khas)', 'Gurpreet Singh (Kotla)', 'Harpreet Singh (Sonipat)']
  },
  {
    cropName: 'Mustard (Sarson Oilseed)',
    totalStockKg: 8900,
    catA: 2800,   // Total from ≤ 5,000 kg batches
    catB: 6100,   // Total from 5,001 - 10,000 kg batches
    catC: 0,
    lastUpdate: '2026-08-28 04:45 PM',
    sources: ['Sujata Devi (Rampur)', 'Devinder Singh (Rampur)']
  },
  {
    cropName: 'Paddy Basmati (1121 & PB 1)',
    totalStockKg: 11200,
    catA: 4500,   // Total from ≤ 5,000 kg batches
    catB: 6700,   // Total from 5,001 - 10,000 kg batches
    catC: 0,
    lastUpdate: '2026-08-29 10:15 AM',
    sources: ['Mahesh Patel (Sonipat East)', 'Karan Sharma (Grama Ward 3)']
  },
  {
    cropName: 'Maize & Cotton Industrial',
    totalStockKg: 14200,
    catA: 1200,   // Total from ≤ 5,000 kg batches
    catB: 0,
    catC: 13000,  // Total from > 10,000 kg batches
    lastUpdate: '2026-08-27 02:00 PM',
    sources: ['Sunita Yadav (Kisan Nagar)', 'Vikram Choudhary (Bishanpur)']
  }
];

export const CenterInChargeDashboard = () => {
  const { userSession, navigateTo, showToast } = useApp();

  const officerName = userSession?.name || 'Dr. Vikram Sharma';
  const officerRole = 'Category A Center In-Charge';
  const centerName = 'Category A National Grain Silo & Storage Hub';
  const centerLocation = 'Plot 42, Agro-Logistics Park, Sonipat, Haryana';
  const totalStorageCapacityKg = 50000; // in MT or 50,000 kg demo capacity

  // Category Helper Function
  const getCategoryFromQuantity = (qtyVal) => {
    const num = typeof qtyVal === 'number' ? qtyVal : parseFloat(String(qtyVal).replace(/[^0-9.]/g, '')) || 0;
    if (num <= 5000) return 'Category A';
    if (num >= 5001 && num <= 10000) return 'Category B';
    return 'Category C';
  };

  // TOP LEVEL MAIN TABS: 'dispatch' | 'storage'
  const [activeTab, setActiveTab] = useState('dispatch');

  // CROPS STATE
  const [crops, setCrops] = useState(INITIAL_CROPS);

  // SEARCH & FILTER FOR CROPS LISTING
  const [cropSearch, setCropSearch] = useState('');
  const [cropStatusFilter, setCropStatusFilter] = useState('ALL');

  // MODAL: SELECT CROP & OFFER PRICE & DISPATCH VOLUNTEER
  const [selectedCropForOffer, setSelectedCropForOffer] = useState(null);
  const [offeredPriceInput, setOfferedPriceInput] = useState('');
  const [selectedVolunteerName, setSelectedVolunteerName] = useState(AVAILABLE_VOLUNTEERS[0].name);

  // MODAL: SMS DISPATCH LOG PROMPT
  const [dispatchedSmsLog, setDispatchedSmsLog] = useState(null);

  // MODAL: VERIFY & RECEIVE SHIPMENT AT CENTER
  const [selectedCropForVerify, setSelectedCropForVerify] = useState(null);
  const [verifyReceivedQty, setVerifyReceivedQty] = useState('');
  const [verifyMoisture, setVerifyMoisture] = useState('');
  const [verifyGrade, setVerifyGrade] = useState('A');
  const [verifyDiscrepancyNote, setVerifyDiscrepancyNote] = useState('');

  // COMPUTED METRICS FOR STORAGE OVERVIEW
  // Since this is a Category A Center, it only stores Category A (catA) crops
  const currentTotalStockKg = STORAGE_INVENTORY_BY_CROP.reduce((sum, item) => sum + (item.catA || 0), 0);
  const capacityUsedPercent = Math.round((currentTotalStockKg / totalStorageCapacityKg) * 100);
  const availableCapacityKg = totalStorageCapacityKg - currentTotalStockKg;

  const totalGradeAStock = STORAGE_INVENTORY_BY_CROP.reduce((sum, item) => sum + (item.catA || 0), 0);
  const totalGradeBStock = STORAGE_INVENTORY_BY_CROP.reduce((sum, item) => sum + (item.catB || 0), 0);
  const totalGradeCStock = STORAGE_INVENTORY_BY_CROP.reduce((sum, item) => sum + (item.catC || 0), 0);

  const getCategoryBadge = (cat) => {
    const str = String(cat || '');
    if (str.includes('A')) {
      return 'bg-emerald-50 text-emerald-800 border-emerald-300/80';
    } else if (str.includes('B')) {
      return 'bg-amber-50 text-amber-900 border-amber-300/80';
    } else {
      return 'bg-rose-50 text-rose-900 border-rose-300/80';
    }
  };

  // ------------------------------------------
  // HANDLERS
  // ------------------------------------------

  // Open Offer Price & Dispatch Modal
  const handleOpenDispatchModal = (crop) => {
    setSelectedCropForOffer(crop);
    const defaultPrice = crop.qualityGrade === 'A' ? '24.50' : crop.qualityGrade === 'B' ? '20.00' : '15.00';
    setOfferedPriceInput(defaultPrice);
    setSelectedVolunteerName(AVAILABLE_VOLUNTEERS[0].name);
  };

  // Submit Price Offer & Dispatch SMS to Volunteer
  const handleConfirmDispatchToVolunteer = (e) => {
    e.preventDefault();
    if (!offeredPriceInput || isNaN(offeredPriceInput)) {
      showToast('Please enter a valid offered price');
      return;
    }

    const volunteerObj = AVAILABLE_VOLUNTEERS.find(v => v.name === selectedVolunteerName) || AVAILABLE_VOLUNTEERS[0];
    const priceNum = parseFloat(offeredPriceInput);

    const updatedCrops = crops.map(c => {
      if (c.id === selectedCropForOffer.id) {
        return {
          ...c,
          status: 'Price Sent',
          offeredPricePerKg: priceNum,
          assignedVolunteer: {
            name: volunteerObj.name,
            mobile: volunteerObj.mobile,
            vehicle: volunteerObj.vehicle,
            location: `SMS Dispatched to ${volunteerObj.name}. Awaiting pickup acceptance.`
          },
          transportTimeline: c.transportTimeline.map((log, idx) => {
            if (idx === 0) return { ...log, status: 'Active', time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }), detail: `Dispatched to ${volunteerObj.name} at ₹${priceNum}/kg` };
            return log;
          })
        };
      }
      return c;
    });

    setCrops(updatedCrops);

    // Generate simulated SMS Log
    const smsContent = `[AUTOMATED SMS DISPATCHED]\nTo Volunteer: ${volunteerObj.name} (+91 ${volunteerObj.mobile})\n\nPickup Request #${selectedCropForOffer.id}:\nCrop: ${selectedCropForOffer.cropName} (${selectedCropForOffer.variety})\nQuantity: ${selectedCropForOffer.quantityKg.toLocaleString()} kg\nQuality Grade: Grade ${selectedCropForOffer.qualityGrade} (${selectedCropForOffer.qualityLevel})\nFarmer: ${selectedCropForOffer.farmerName} (${selectedCropForOffer.village})\nOffered Center Price: ₹${priceNum}/kg (Total ₹${(selectedCropForOffer.quantityKg * priceNum).toLocaleString()})\n\nPlease open your Volunteer App to ACCEPT pickup.`;

    setDispatchedSmsLog(smsContent);
    setSelectedCropForOffer(null);
    showToast(`Price offer ₹${priceNum}/kg dispatched to Volunteer ${volunteerObj.name}!`);
  };

  // Simulate Volunteer Accept Pickup
  const handleSimulateVolunteerAccept = (cropId) => {
    setCrops(crops.map(c => {
      if (c.id === cropId) {
        const volunteer = c.assignedVolunteer || {
          name: 'Gurpreet Singh',
          mobile: '9876543210',
          vehicle: 'Mahindra Bolero Pickup (HR-10-AB-4321)',
          location: 'Volunteer accepted pickup order. Traveling to farmer field.'
        };
        return {
          ...c,
          status: 'Assigned',
          offeredPricePerKg: c.offeredPricePerKg || 24.50,
          assignedVolunteer: {
            ...volunteer,
            location: 'Volunteer accepted pickup order. Traveling to farmer field.'
          },
          transportTimeline: c.transportTimeline.map((log, idx) => {
            if (idx === 0) return { ...log, status: 'Completed', detail: `Accepted by ${volunteer.name}` };
            if (idx === 1) return { ...log, status: 'Active', time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }), detail: 'En route to pickup point' };
            return log;
          })
        };
      }
      return c;
    }));

    showToast(`Volunteer accepted proposal for ${cropId}! Live crop tracking active below.`);
  };

  // Advance Transport Stage Simulator
  const handleAdvanceTransportStage = (cropId) => {
    setCrops(crops.map(c => {
      if (c.id === cropId) {
        if (c.status === 'Assigned') {
          return {
            ...c,
            status: 'In Transit',
            assignedVolunteer: {
              ...c.assignedVolunteer,
              location: 'Crop loaded onto truck. En route on NH-44 to Silo Hub #42.'
            },
            transportTimeline: c.transportTimeline.map((log, idx) => {
              if (idx <= 1) return { ...log, status: 'Completed' };
              if (idx === 2) return { ...log, status: 'Active', time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }), detail: 'En route to Center' };
              return log;
            })
          };
        } else if (c.status === 'In Transit') {
          return {
            ...c,
            status: 'Delivered',
            assignedVolunteer: {
              ...c.assignedVolunteer,
              location: 'Truck arrived at Receiving Bay #2. Awaiting Center verification.'
            },
            transportTimeline: c.transportTimeline.map((log, idx) => {
              if (idx <= 2) return { ...log, status: 'Completed' };
              if (idx === 3) return { ...log, status: 'Active', time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }), detail: 'Arrived at Gate' };
              return log;
            })
          };
        }
      }
      return c;
    }));

    showToast('Shipment transport stage updated!');
  };

  // Open Verify & Receive Modal
  const handleOpenVerifyModal = (crop) => {
    setSelectedCropForVerify(crop);
    setVerifyReceivedQty(crop.quantityKg.toString());
    setVerifyMoisture(crop.moisturePercent || '11.5%');
    setVerifyGrade(crop.qualityGrade);
    setVerifyDiscrepancyNote('Weighbridge verified. Zero discrepancy.');
  };

  // Confirm Verification & Receive at Center
  const handleConfirmVerifyAndReceive = (e) => {
    e.preventDefault();
    if (!verifyReceivedQty || isNaN(verifyReceivedQty)) {
      showToast('Please enter a valid received quantity');
      return;
    }

    const recQty = parseFloat(verifyReceivedQty);

    setCrops(crops.map(c => {
      if (c.id === selectedCropForVerify.id) {
        return {
          ...c,
          status: 'Verified',
          receivedQtyKg: recQty,
          receivedQualityGrade: verifyGrade,
          receivedMoisture: verifyMoisture,
          discrepancyNote: verifyDiscrepancyNote || 'Verified at Weighbridge & Silo Entry',
          transportTimeline: c.transportTimeline.map(log => ({ ...log, status: 'Completed', time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }) }))
        };
      }
      return c;
    }));

    setSelectedCropForVerify(null);
    showToast(`Shipment ${selectedCropForVerify.id} Verified & Received (${recQty.toLocaleString()} kg added to stock)!`);
  };

  // Filtered Crops
  const filteredCrops = crops.filter(c => {
    const matchesSearch =
      c.cropName.toLowerCase().includes(cropSearch.toLowerCase()) ||
      c.id.toLowerCase().includes(cropSearch.toLowerCase()) ||
      c.farmerName.toLowerCase().includes(cropSearch.toLowerCase()) ||
      c.village.toLowerCase().includes(cropSearch.toLowerCase());

    const matchesStatus = cropStatusFilter === 'ALL' || c.status === cropStatusFilter;

    return matchesSearch && matchesStatus;
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
              title="Return"
            >
              <ArrowLeft className="w-4 h-4" />
            </button>
            <div className="w-8.5 h-8.5 rounded-full bg-white text-[#00a86b] flex items-center justify-center font-bold shadow-xs">
              <Building2 className="w-5 h-5" />
            </div>
            <div>
              <span className="text-sm font-black text-white block leading-none tracking-tight">Smart &amp; Fair Center Portal</span>
              <span className="text-[9px] text-emerald-200 uppercase tracking-widest font-bold mt-0.5 block">
                {centerName}
              </span>
            </div>
          </div>

          {/* MAIN NAVIGATION TABS */}
          <div className="hidden sm:flex items-center space-x-1 text-xs font-bold bg-[#008f5a] p-1.5 rounded-2xl border border-white/20 shadow-inner">
            {[
              { id: 'dispatch', label: 'Crop Details & Dispatch' },
              { id: 'storage', label: 'Crop Analysis & Storage' }
            ].map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`px-4 py-2 rounded-xl transition-all ${activeTab === tab.id
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
              <span className="text-xs font-bold text-white">{officerName}</span>
              <span className="text-[10px] text-emerald-200">{officerRole}</span>
            </div>
            <button
              onClick={() => {
                showToast('Logged out of Center In-Charge session');
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
          { id: 'dispatch', label: '📦 Crop Dispatch' },
          { id: 'storage', label: '📊 Storage Overview' }
        ].map((tab) => (
          <button
            key={tab.id}
            onClick={() => setActiveTab(tab.id)}
            className={`px-4 py-1.5 rounded-lg ${activeTab === tab.id ? 'bg-white text-[#00a86b] font-extrabold' : 'text-emerald-200'
              }`}
          >
            {tab.label}
          </button>
        ))}
      </div>

      {/* MAIN CONTENT AREA */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 w-full space-y-8 my-auto">

        {/* CENTER HERO INFORMATION BANNER */}
        <div className="bg-white rounded-3xl p-6 border border-slate-200 shadow-xs flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div className="space-y-1">
            <div className="flex items-center space-x-2">
              <span className="text-[10px] font-black text-emerald-800 bg-emerald-100 px-2.5 py-0.5 rounded-full uppercase tracking-wider">
                CATEGORY CENTER COMMAND HUB
              </span>
              <span className="text-xs text-slate-400 font-semibold">• {centerLocation}</span>
            </div>
            <h1 className="text-2xl sm:text-3xl font-black text-slate-900">
              {centerName}
            </h1>
            <p className="text-xs text-slate-500 font-medium">
              Assess incoming crops, send price offers, dispatch volunteer pickups, track live transport, and inspect warehouse storage inventory.
            </p>
          </div>

          <div className="bg-emerald-50 p-4 rounded-2xl border border-emerald-200 text-xs font-bold text-slate-800 flex items-center space-x-4 flex-shrink-0">
            <div>
              <span className="text-[10px] text-slate-500 uppercase block">Total Warehouse Storage</span>
              <span className="text-lg font-black text-[#00a86b]">{currentTotalStockKg.toLocaleString()} / {totalStorageCapacityKg.toLocaleString()} kg</span>
            </div>
            <div className="w-12 h-12 rounded-full border-4 border-emerald-600 flex items-center justify-center text-[11px] font-black text-[#00a86b]">
              {capacityUsedPercent}%
            </div>
          </div>
        </div>

        {/* ========================================================================= */}
        {/* SECTION 1: CROP DETAILS & DISPATCH SECTION                                */}
        {/* ========================================================================= */}
        {activeTab === 'dispatch' && (
          <div className="space-y-8">

            {/* KPI METRIC CARDS FOR DISPATCH */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-xs font-bold">
              <div className="bg-white p-5 rounded-3xl border border-slate-200 shadow-xs space-y-1">
                <span className="text-slate-400 uppercase tracking-wider text-[10px] block">Total Reported Batches</span>
                <span className="text-3xl font-black text-slate-900">{crops.filter(c => getCategoryFromQuantity(c.quantityKg) === 'Category A').length} Batches</span>
                <span className="text-emerald-700 block text-[10px]">Awaiting / In Dispatch</span>
              </div>

              <div className="bg-white p-5 rounded-3xl border border-slate-200 shadow-xs space-y-1">
                <span className="text-slate-400 uppercase tracking-wider text-[10px] block">New Unassigned Crops</span>
                <span className="text-3xl font-black text-amber-600">{crops.filter(c => c.status === 'New' && getCategoryFromQuantity(c.quantityKg) === 'Category A').length}</span>
                <span className="text-amber-700 block text-[10px]">Requires Price Offer</span>
              </div>

              <div className="bg-white p-5 rounded-3xl border border-slate-200 shadow-xs space-y-1">
                <span className="text-slate-400 uppercase tracking-wider text-[10px] block">Active Transport Shipments</span>
                <span className="text-3xl font-black text-blue-700">{crops.filter(c => ['Assigned', 'In Transit', 'Price Sent'].includes(c.status) && getCategoryFromQuantity(c.quantityKg) === 'Category A').length}</span>
                <span className="text-blue-700 block text-[10px]">Volunteer Transport Active</span>
              </div>

              <div className="bg-white p-5 rounded-3xl border border-slate-200 shadow-xs space-y-1">
                <span className="text-slate-400 uppercase tracking-wider text-[10px] block">Verified at Center</span>
                <span className="text-3xl font-black text-emerald-800">{crops.filter(c => c.status === 'Verified' && getCategoryFromQuantity(c.quantityKg) === 'Category A').length}</span>
                <span className="text-emerald-800 block text-[10px]">Received &amp; Stocked</span>
              </div>
            </div>

            {/* CROP LISTING VIEW & ACTION TABLE */}
            <div className="bg-white rounded-3xl p-6 border border-slate-200 shadow-xs space-y-6">

              <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 pb-4 border-b border-slate-100">
                <div>
                  <h2 className="text-xl font-black text-slate-900">Crop Harvest Listing &amp; Volunteer Dispatch</h2>
                  <p className="text-xs text-slate-500 font-medium">
                    Review reported crop harvests, set purchase price, dispatch pickup SMS to volunteers, and track live transport.
                  </p>
                </div>

                {/* SEARCH & FILTER CONTROLS */}
                <div className="flex flex-wrap items-center gap-3 text-xs">
                  <div className="relative min-w-[200px]">
                    <Search className="w-4 h-4 absolute left-3 top-2.5 text-slate-400" />
                    <input
                      type="text"
                      value={cropSearch}
                      onChange={(e) => setCropSearch(e.target.value)}
                      placeholder="Search Crop, ID, Farmer..."
                      className="w-full pl-9 pr-3 py-2 bg-slate-50 rounded-xl border border-slate-200 font-semibold text-slate-900 focus:ring-2 focus:ring-[#00a86b] focus:outline-none"
                    />
                  </div>

                  <select
                    value={cropStatusFilter}
                    onChange={(e) => setCropStatusFilter(e.target.value)}
                    className="py-2 px-3 bg-slate-50 rounded-xl border border-slate-200 font-bold text-slate-800"
                  >
                    <option value="ALL">All Shipment Statuses</option>
                    <option value="New">New (Needs Price Offer)</option>
                    <option value="Price Sent">Price Sent / Awaiting Volunteer</option>
                    <option value="Assigned">Assigned to Volunteer</option>
                    <option value="In Transit">In Transit</option>
                    <option value="Delivered">Delivered (Awaiting Verification)</option>
                    <option value="Verified">Verified &amp; Received</option>
                  </select>
                </div>
              </div>

              {/* CROPS TABLE */}
              <div className="overflow-x-auto">
                <table className="w-full text-left text-xs">
                  <thead>
                    <tr className="border-b border-slate-200 text-slate-400 font-bold uppercase text-[10px]">
                      <th className="py-3.5 px-3">Crop ID &amp; Name</th>
                      <th className="py-3.5 px-3">Quantity</th>
                      <th className="py-3.5 px-3">CATEGORY ALLOCATION &amp; METRICS</th>
                      <th className="py-3.5 px-3">Farmer &amp; Source Location</th>
                      <th className="py-3.5 px-3">Offered Price</th>
                      <th className="py-3.5 px-3">Assigned Volunteer</th>
                      <th className="py-3.5 px-3">Shipment Status</th>
                      <th className="py-3.5 px-3 text-right">Actions</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-100 font-semibold text-slate-800">
                    {filteredCrops.filter(c => getCategoryFromQuantity(c.quantityKg) === 'Category A').map((crop) => (
                      <tr key={crop.id} className="hover:bg-slate-50/80 transition-colors">

                        <td className="py-4 px-3">
                          <span className="font-mono font-black text-[#00a86b] text-xs block">{crop.id}</span>
                          <span className="font-extrabold text-slate-900 text-sm">{crop.cropName}</span>
                          <span className="text-[10px] text-slate-500 block">{crop.variety}</span>
                        </td>

                        <td className="py-4 px-3 font-black text-slate-900 text-sm">
                          {crop.quantityKg.toLocaleString()} kg
                        </td>

                        <td className="py-4 px-3 space-y-1">
                          {(() => {
                            const catName = getCategoryFromQuantity(crop.quantityKg);
                            return (
                              <span className={`inline-flex items-center gap-1.5 text-[11px] font-bold px-2.5 py-0.5 rounded-full border whitespace-nowrap shadow-2xs ${getCategoryBadge(catName)}`}>
                                <span className="w-1.5 h-1.5 rounded-full bg-current opacity-75" />
                                {catName}
                              </span>
                            );
                          })()}
                          <div className="text-[10px] text-slate-500 font-medium">
                            Moisture: {crop.moisturePercent} • Purity: {crop.purityPercent}
                          </div>
                        </td>

                        <td className="py-4 px-3">
                          <span className="font-bold text-slate-900 block">{crop.farmerName}</span>
                          <span className="text-[10px] text-slate-500 font-medium">{crop.village}, {crop.district}</span>
                          <span className="text-[10px] text-slate-400 block">+91 {crop.farmerMobile}</span>
                        </td>

                        <td className="py-4 px-3">
                          {crop.offeredPricePerKg ? (
                            <div>
                              <span className="font-black text-[#00a86b] text-sm block">₹{crop.offeredPricePerKg.toFixed(2)}/kg</span>
                              <span className="text-[10px] text-slate-500">Total: ₹{(crop.quantityKg * crop.offeredPricePerKg).toLocaleString()}</span>
                            </div>
                          ) : (
                            <span className="text-[11px] font-bold text-amber-700 bg-amber-50 px-2 py-0.5 rounded-md border border-amber-200">
                              Price Not Set
                            </span>
                          )}
                        </td>

                        <td className="py-4 px-3">
                          {crop.assignedVolunteer ? (
                            <div>
                              <span className="font-bold text-slate-900 block">{crop.assignedVolunteer.name}</span>
                              <span className="text-[10px] text-slate-500">+91 {crop.assignedVolunteer.mobile}</span>
                            </div>
                          ) : (
                            <span className="text-slate-400 text-xs">Unassigned</span>
                          )}
                        </td>

                        <td className="py-4 px-3 whitespace-nowrap">
                          <span className={`inline-flex items-center gap-1.5 text-[10px] font-black px-2.5 py-1 rounded-full border whitespace-nowrap shadow-2xs ${crop.status === 'New' ? 'bg-amber-50 text-amber-900 border-amber-300' :
                              crop.status === 'Price Sent' ? 'bg-purple-50 text-purple-900 border-purple-300' :
                                crop.status === 'Assigned' ? 'bg-blue-50 text-blue-900 border-blue-300' :
                                  crop.status === 'In Transit' ? 'bg-indigo-50 text-indigo-900 border-indigo-300' :
                                    crop.status === 'Delivered' ? 'bg-teal-50 text-teal-900 border-teal-300' :
                                      'bg-emerald-50 text-emerald-800 border-emerald-300'
                            }`}>
                            <span className="w-1.5 h-1.5 rounded-full bg-current" />
                            {crop.status.toUpperCase()}
                          </span>
                        </td>

                        <td className="py-4 px-3 text-right space-y-1">
                          {/* ACTION 1: OFFER PRICE & SEND TO VOLUNTEER */}
                          {crop.status === 'New' && (
                            <button
                              onClick={() => handleOpenDispatchModal(crop)}
                              className="px-3.5 py-1.5 rounded-xl bg-[#00a86b] text-white font-bold text-xs hover:bg-[#008f5a] transition-all inline-flex items-center space-x-1 shadow-xs"
                            >
                              <Send className="w-3.5 h-3.5 text-emerald-200" />
                              <span>Set Price &amp; Dispatch →</span>
                            </button>
                          )}

                          {/* SIMULATE VOLUNTEER ACCEPTANCE */}
                          {crop.status === 'Price Sent' && (
                            <button
                              onClick={() => handleSimulateVolunteerAccept(crop.id)}
                              className="px-3 py-1.5 rounded-xl bg-purple-700 text-white font-bold text-xs hover:bg-purple-800 transition-all inline-flex items-center space-x-1 shadow-xs"
                            >
                              <CheckCircle className="w-3.5 h-3.5" />
                              <span>Simulate Volunteer Accept</span>
                            </button>
                          )}

                          {/* ADVANCE TRANSPORT STAGE */}
                          {(crop.status === 'Assigned' || crop.status === 'In Transit') && (
                            <button
                              onClick={() => handleAdvanceTransportStage(crop.id)}
                              className="px-3 py-1.5 rounded-xl bg-blue-700 text-white font-bold text-xs hover:bg-blue-800 transition-all inline-flex items-center space-x-1 shadow-xs"
                            >
                              <Truck className="w-3.5 h-3.5" />
                              <span>Advance Transport Stage →</span>
                            </button>
                          )}

                          {/* ACTION 2: VERIFY & RECEIVE AT CENTER */}
                          {(crop.status === 'Delivered' || crop.status === 'In Transit') && (
                            <button
                              onClick={() => handleOpenVerifyModal(crop)}
                              className="px-3.5 py-1.5 rounded-xl bg-emerald-700 text-white font-bold text-xs hover:bg-emerald-800 transition-all inline-flex items-center space-x-1 shadow-xs"
                            >
                              <ShieldCheck className="w-3.5 h-3.5" />
                              <span>Verify &amp; Receive at Center</span>
                            </button>
                          )}

                          {crop.status === 'Verified' && (
                            <span className="text-[10px] font-black text-emerald-800 bg-emerald-50 px-2.5 py-1 rounded-lg border border-emerald-200 inline-block">
                              ✓ Received &amp; Stocked
                            </span>
                          )}
                        </td>

                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>

            </div>

            {/* LIVE SHIPMENT TRACKING & TIMELINE SECTION */}
            <div className="bg-white rounded-3xl p-6 border border-slate-200 shadow-xs space-y-6">
              <div className="pb-3 border-b border-slate-100">
                <h3 className="text-lg font-black text-slate-900">Live Active Transport Shipments &amp; Stage Timestamps</h3>
                <p className="text-xs text-slate-500 font-medium">Real-time status per crop shipment from volunteer pickup to center gate receiving.</p>
              </div>

              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                {crops.filter(c => c.assignedVolunteer).map((crop) => (
                  <div key={crop.id} className="p-6 rounded-3xl bg-slate-50 border border-slate-200 space-y-4 shadow-xs">

                    <div className="flex justify-between items-start border-b border-slate-200 pb-3">
                      <div>
                        <div className="flex items-center space-x-2">
                          <span className="font-mono font-black text-[#00a86b] text-xs">{crop.id}</span>
                          <span className={`inline-flex items-center gap-1 text-[9px] font-black px-2 py-0.5 rounded-full border whitespace-nowrap ${getCategoryBadge(getCategoryFromQuantity(crop.quantityKg))}`}>
                            {getCategoryFromQuantity(crop.quantityKg)}
                          </span>
                          <span className="text-[9px] font-bold text-[#00a86b] bg-emerald-50 px-2 py-0.5 rounded-full border border-emerald-200 flex items-center space-x-1">
                            <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-ping inline-block" />
                            <span>LIVE TRACKING</span>
                          </span>
                        </div>
                        <h4 className="text-base font-extrabold text-slate-900 mt-0.5">{crop.cropName} ({crop.quantityKg.toLocaleString()} kg)</h4>
                        <p className="text-xs text-slate-500 font-medium">Farmer: {crop.farmerName} ({crop.village})</p>
                      </div>

                      <div className="text-right">
                        <span className="text-xs font-bold text-slate-400 uppercase block">Assigned Volunteer</span>
                        <span className="text-sm font-extrabold text-slate-900 block">{crop.assignedVolunteer.name}</span>
                        <span className="text-[10px] text-slate-500">+91 {crop.assignedVolunteer.mobile}</span>
                        {crop.assignedVolunteer.vehicle && (
                          <span className="text-[9px] font-semibold text-slate-600 block bg-slate-100 px-2 py-0.5 rounded-md mt-1 border border-slate-200">
                            🚚 {crop.assignedVolunteer.vehicle}
                          </span>
                        )}
                      </div>
                    </div>

                    <div className="bg-white p-3.5 rounded-2xl border border-slate-200 text-xs space-y-1">
                      <div className="flex items-center justify-between text-[#00a86b] font-bold">
                        <div className="flex items-center space-x-1.5">
                          <MapPin className="w-4 h-4 text-emerald-600 flex-shrink-0" />
                          <span>Live Location &amp; Transport Status:</span>
                        </div>
                        <span className="text-[10px] text-slate-400 font-normal">GPS Active</span>
                      </div>
                      <p className="text-slate-800 font-bold pl-5">{crop.assignedVolunteer.location}</p>
                    </div>

                    {/* TIMELINE STAGES */}
                    <div className="space-y-2 pt-2">
                      <div className="flex items-center justify-between">
                        <span className="text-[10px] font-black text-slate-400 uppercase tracking-wider block">Shipment Stage Timeline</span>
                        {(crop.status === 'Assigned' || crop.status === 'In Transit') && (
                          <button
                            onClick={() => handleAdvanceTransportStage(crop.id)}
                            className="text-[10px] font-bold text-white bg-[#00a86b] hover:bg-[#008f5a] px-2.5 py-1 rounded-lg transition-colors flex items-center space-x-1"
                          >
                            <Truck className="w-3 h-3" />
                            <span>Advance Stage →</span>
                          </button>
                        )}
                      </div>
                      <div className="grid grid-cols-5 gap-1 text-center">
                        {crop.transportTimeline.map((step, idx) => (
                          <div key={step.stage} className="space-y-1">
                            <div className={`h-2 rounded-full ${step.status === 'Completed' ? 'bg-[#00a86b]' : step.status === 'Active' ? 'bg-amber-500 animate-pulse' : 'bg-slate-200'
                              }`} />
                            <span className="text-[9px] font-bold text-slate-700 block leading-tight">{step.stage}</span>
                            <span className="text-[8px] text-slate-400 block">{step.time}</span>
                          </div>
                        ))}
                      </div>
                    </div>

                    {/* DISCREPANCY NOTE IF VERIFIED */}
                    {crop.status === 'Verified' && (
                      <div className="p-3 bg-emerald-50 rounded-2xl border border-emerald-200 text-xs text-[#00a86b] space-y-0.5">
                        <span className="font-extrabold block">✓ Verified at Center: {crop.receivedQtyKg?.toLocaleString()} kg Received</span>
                        <span className="text-[11px] text-slate-600 block">{crop.discrepancyNote}</span>
                      </div>
                    )}

                  </div>
                ))}
              </div>
            </div>

          </div>
        )}

        {/* ========================================================================= */}
        {/* SECTION 2: CROP ANALYSIS & STORAGE SECTION                                */}
        {/* ========================================================================= */}
        {activeTab === 'storage' && (
          <div className="space-y-8">

            {/* STORAGE OVERVIEW METRICS */}
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">

              {/* Storage Capacity Gauge Card */}
              <div className="bg-white rounded-3xl p-6 border border-slate-200 shadow-xs space-y-4">
                <div className="pb-3 border-b border-slate-100">
                  <h3 className="text-base font-black text-slate-900">Storage Capacity Overview</h3>
                  <p className="text-xs text-slate-500 font-medium">{centerName}</p>
                </div>

                <div className="space-y-4 text-xs font-bold">
                  <div className="flex justify-between items-center">
                    <span className="text-slate-500">Total Center Capacity:</span>
                    <span className="text-slate-900 font-black text-sm">{totalStorageCapacityKg.toLocaleString()} kg (50 MT)</span>
                  </div>

                  <div className="flex justify-between items-center">
                    <span className="text-slate-500">Current Occupied Stock:</span>
                    <span className="text-[#00a86b] font-black text-sm">{currentTotalStockKg.toLocaleString()} kg ({capacityUsedPercent}%)</span>
                  </div>

                  <div className="flex justify-between items-center">
                    <span className="text-slate-500">Available Remaining Space:</span>
                    <span className="text-emerald-700 font-black text-sm">{availableCapacityKg.toLocaleString()} kg</span>
                  </div>

                  {/* VISUAL CAPACITY BAR */}
                  <div className="space-y-1 pt-2">
                    <div className="w-full bg-slate-100 h-4 rounded-full overflow-hidden p-0.5 border border-slate-200">
                      <div
                        className="h-full bg-gradient-to-r from-[#00a86b] to-emerald-500 rounded-full transition-all duration-500"
                        style={{ width: `${capacityUsedPercent}%` }}
                      />
                    </div>
                    <div className="flex justify-between text-[10px] text-slate-400 font-bold">
                      <span>0 kg</span>
                      <span>{capacityUsedPercent}% Capacity Used</span>
                      <span>50,000 kg</span>
                    </div>
                  </div>
                </div>
              </div>

              {/* Collection Center Category Capacity Status Card */}
              <div className="lg:col-span-2 bg-white rounded-3xl p-6 border border-slate-200 shadow-xs space-y-4 flex flex-col justify-between">
                <div className="pb-3 border-b border-slate-100">
                  <h3 className="text-base font-black text-slate-900">Collection Center Category Capacity Status</h3>
                  <p className="text-xs text-slate-500 font-medium">Real-time load and storage distribution across A (Priority), B (Secondary), and C (Overflow) Centers</p>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                  <div className="p-4 bg-emerald-50 rounded-2xl border border-emerald-200 space-y-2">
                    <div className="flex justify-between items-center">
                      <span className="text-xs font-black text-[#00a86b] uppercase">A CENTER (Priority)</span>
                      <span className="text-[10px] font-bold bg-emerald-200 text-[#00a86b] px-2 py-0.5 rounded-full">AVAILABLE</span>
                    </div>
                    <div className="text-2xl font-black text-slate-900">3,800 / 5,000 kg</div>
                    <span className="text-[10px] text-emerald-800 font-bold block">
                      76% Capacity Used (1,200 kg Available)
                    </span>
                  </div>

                  <div className="p-4 bg-amber-50 rounded-2xl border border-amber-200 space-y-2">
                    <div className="flex justify-between items-center">
                      <span className="text-xs font-black text-amber-900 uppercase">B CENTER (Secondary)</span>
                      <span className="text-[10px] font-bold bg-amber-200 text-amber-900 px-2 py-0.5 rounded-full">LIMITED</span>
                    </div>
                    <div className="text-2xl font-black text-slate-900">4,700 / 5,000 kg</div>
                    <span className="text-[10px] text-amber-800 font-bold block">
                      94% Capacity Used (300 kg Available)
                    </span>
                  </div>

                  <div className="p-4 bg-rose-50 rounded-2xl border border-rose-200 space-y-2">
                    <div className="flex justify-between items-center">
                      <span className="text-xs font-black text-rose-900 uppercase">C CENTER (Overflow)</span>
                      <span className="text-[10px] font-bold bg-rose-200 text-rose-900 px-2 py-0.5 rounded-full">FULL</span>
                    </div>
                    <div className="text-2xl font-black text-slate-900">5,000 / 5,000 kg</div>
                    <span className="text-[10px] text-rose-800 font-bold block">
                      100% Capacity Used (0 kg Available)
                    </span>
                  </div>
                </div>

                <div className="pt-2 text-xs text-slate-500 font-medium">
                  💡 <strong>Capacity Routing Rule:</strong> Crops automatically route to A Center first. If A is full, system routes to B Center, then C Center.
                </div>
              </div>

            </div>

            {/* CROP-WISE BREAKDOWN TABLE */}
            <div className="bg-white rounded-3xl p-6 border border-slate-200 shadow-xs space-y-6">
              <div className="pb-3 border-b border-slate-100 flex items-center justify-between">
                <div>
                  <h3 className="text-lg font-black text-slate-900">Crop-Wise Warehouse Breakdown Table</h3>
                  <p className="text-xs text-slate-500 font-medium">Complete list of stored crop varieties, Category breakdown, and source contributors.</p>
                </div>
                <span className="text-xs font-bold text-[#00a86b] bg-emerald-100 px-3 py-1 rounded-full border border-emerald-200">
                  Total {STORAGE_INVENTORY_BY_CROP.length} Crop Categories
                </span>
              </div>

              <div className="overflow-x-auto">
                <table className="w-full text-left text-xs">
                  <thead>
                    <tr className="border-b border-slate-200 text-slate-400 font-bold uppercase text-[10px]">
                      <th className="py-3.5 px-3">Crop Name &amp; Variety</th>
                      <th className="py-3.5 px-3">Quantity in Stock</th>
                      <th className="py-3.5 px-3">Category Breakdown</th>
                      <th className="py-3.5 px-3">Last Stock Update</th>
                      <th className="py-3.5 px-3">Source Contributors (Farmers/Volunteers)</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-100 font-semibold text-slate-800">
                    {STORAGE_INVENTORY_BY_CROP.map((inv) => (
                      <tr key={inv.cropName} className="hover:bg-slate-50/80 transition-colors">

                        <td className="py-4 px-3 font-extrabold text-slate-900 text-sm">
                          {inv.cropName}
                        </td>

                        <td className="py-4 px-3 font-black text-[#00a86b] text-base">
                          {inv.totalStockKg.toLocaleString()} kg
                        </td>

                        <td className="py-4 px-3 space-y-1.5">
                          <div className="flex items-center space-x-2">
                            <span className="w-32 text-[10px] text-slate-500 font-bold">Category A (&le;5k kg):</span>
                            <span className="font-extrabold text-[#00a86b]">{inv.catA.toLocaleString()} kg</span>
                          </div>
                          <div className="flex items-center space-x-2">
                            <span className="w-32 text-[10px] text-slate-500 font-bold">Category B (5k-10k kg):</span>
                            <span className="font-extrabold text-amber-700">{inv.catB.toLocaleString()} kg</span>
                          </div>
                          <div className="flex items-center space-x-2">
                            <span className="w-32 text-[10px] text-slate-500 font-bold">Category C (&gt;10k kg):</span>
                            <span className="font-extrabold text-rose-700">{inv.catC.toLocaleString()} kg</span>
                          </div>
                        </td>

                        <td className="py-4 px-3 text-slate-500">
                          {inv.lastUpdate}
                        </td>

                        <td className="py-4 px-3">
                          <div className="space-y-1">
                            {inv.sources.map((src, idx) => (
                              <span key={idx} className="block text-[11px] text-slate-700 bg-slate-100 px-2 py-0.5 rounded-md font-medium">
                                • {src}
                              </span>
                            ))}
                          </div>
                        </td>

                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>

            </div>

          </div>
        )}

      </main>

      {/* MODAL 1: SET PRICE OFFER & DISPATCH TO VOLUNTEER */}
      {selectedCropForOffer && (
        <div className="fixed inset-0 z-50 bg-slate-900/60 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-white rounded-3xl p-6 sm:p-8 max-w-lg w-full space-y-5 shadow-2xl border border-slate-100 animate-scale-up">

            <div className="flex items-center justify-between pb-3 border-b border-slate-100">
              <div>
                <span className="text-[10px] font-black text-emerald-800 bg-emerald-100 px-2 py-0.5 rounded-full uppercase">
                  DISPATCH ORDER {selectedCropForOffer.id}
                </span>
                <h3 className="text-lg font-black text-slate-900 mt-1">Set Price &amp; Select Volunteer</h3>
              </div>
              <button onClick={() => setSelectedCropForOffer(null)} className="p-1.5 rounded-xl hover:bg-slate-100 text-slate-400">
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="p-4 bg-slate-50 rounded-2xl border border-slate-200 text-xs space-y-1.5">
              <div className="flex justify-between"><span className="text-slate-500">Crop Variety:</span><strong className="text-slate-900">{selectedCropForOffer.cropName} ({selectedCropForOffer.variety})</strong></div>
              <div className="flex justify-between"><span className="text-slate-500">Quantity Available:</span><strong className="text-slate-900">{selectedCropForOffer.quantityKg.toLocaleString()} kg</strong></div>
              <div className="flex justify-between"><span className="text-slate-500">Category Allocation:</span><strong className="text-emerald-800">{getCategoryFromQuantity(selectedCropForOffer.quantityKg)}</strong></div>
              <div className="flex justify-between"><span className="text-slate-500">Farmer Source:</span><strong className="text-slate-900">{selectedCropForOffer.farmerName} ({selectedCropForOffer.village})</strong></div>
            </div>

            <form onSubmit={handleConfirmDispatchToVolunteer} className="space-y-4 text-xs font-semibold">
              <div>
                <label className="block text-slate-700 font-bold mb-1">Set Offered Purchase Price (₹ / kg) *</label>
                <input
                  type="number"
                  step="0.50"
                  value={offeredPriceInput}
                  onChange={(e) => setOfferedPriceInput(e.target.value)}
                  placeholder="e.g. 24.50"
                  className="w-full px-4 py-3 bg-slate-50 rounded-xl border border-slate-200 text-slate-900 font-black text-sm focus:ring-2 focus:ring-[#00a86b] focus:outline-none"
                />
                <span className="text-[10px] text-slate-400 mt-1 block">
                  Total Offered Payout: <strong>₹{(selectedCropForOffer.quantityKg * (parseFloat(offeredPriceInput) || 0)).toLocaleString()}</strong>
                </span>
              </div>

              <div>
                <label className="block text-slate-700 font-bold mb-1">Select Transport Volunteer *</label>
                <select
                  value={selectedVolunteerName}
                  onChange={(e) => setSelectedVolunteerName(e.target.value)}
                  className="w-full px-4 py-3 bg-slate-50 rounded-2xl border border-slate-200 text-xs font-bold text-slate-900 focus:ring-2 focus:ring-[#00a86b] focus:outline-none"
                >
                  {AVAILABLE_VOLUNTEERS.map(v => (
                    <option key={v.name} value={v.name}>{v.name} (+91 {v.mobile}) — {v.vehicle}</option>
                  ))}
                </select>
              </div>

              <button
                type="submit"
                className="w-full py-3.5 rounded-2xl bg-[#00a86b] text-white font-black text-xs shadow-md hover:bg-[#008f5a] transition-all flex items-center justify-center space-x-2"
              >
                <Send className="w-4 h-4 text-emerald-300" />
                <span>Confirm &amp; Dispatch SMS to Volunteer →</span>
              </button>
            </form>

          </div>
        </div>
      )}

      {/* MODAL 2: DISPATCHED SMS LOG MODAL */}
      {dispatchedSmsLog && (
        <div className="fixed inset-0 z-50 bg-slate-900/60 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-white rounded-3xl p-6 max-w-md w-full space-y-4 shadow-2xl border border-slate-100 animate-scale-up">
            <div className="flex items-center space-x-2 text-[#00a86b]">
              <MessageSquare className="w-5 h-5" />
              <h3 className="text-base font-black">SMS Notification Sent Successfully</h3>
            </div>

            <div className="p-4 bg-slate-950 text-emerald-300 rounded-2xl font-mono text-xs whitespace-pre-wrap leading-relaxed border border-slate-800 shadow-inner">
              {dispatchedSmsLog}
            </div>

            <button
              onClick={() => setDispatchedSmsLog(null)}
              className="w-full py-2.5 rounded-xl bg-[#00a86b] text-white font-bold text-xs hover:bg-[#008f5a]"
            >
              Close SMS Log
            </button>
          </div>
        </div>
      )}

      {/* MODAL 3: VERIFY & RECEIVE AT CENTER */}
      {selectedCropForVerify && (
        <div className="fixed inset-0 z-50 bg-slate-900/60 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-white rounded-3xl p-6 sm:p-8 max-w-lg w-full space-y-5 shadow-2xl border border-slate-100 animate-scale-up">

            <div className="flex items-center justify-between pb-3 border-b border-slate-100">
              <div>
                <span className="text-[10px] font-black text-emerald-800 bg-emerald-100 px-2 py-0.5 rounded-full uppercase">
                  CENTER RECEIVING GATE &amp; WEIGHBRIDGE
                </span>
                <h3 className="text-lg font-black text-slate-900 mt-1">Verify Shipment #{selectedCropForVerify.id}</h3>
              </div>
              <button onClick={() => setSelectedCropForVerify(null)} className="p-1.5 rounded-xl hover:bg-slate-100 text-slate-400">
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleConfirmVerifyAndReceive} className="space-y-4 text-xs font-semibold">
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-slate-700 font-bold mb-1">Expected Harvest Qty</label>
                  <input type="text" value={`${selectedCropForVerify.quantityKg.toLocaleString()} kg`} disabled className="w-full px-3.5 py-2.5 bg-slate-100 rounded-xl border border-slate-200 text-slate-500 font-bold" />
                </div>
                <div>
                  <label className="block text-slate-700 font-bold mb-1">Actual Received Qty (Kg) *</label>
                  <input
                    type="number"
                    value={verifyReceivedQty}
                    onChange={(e) => setVerifyReceivedQty(e.target.value)}
                    className="w-full px-3.5 py-2.5 bg-white rounded-xl border border-slate-200 text-slate-900 font-black text-sm focus:ring-2 focus:ring-[#00a86b] focus:outline-none"
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-slate-700 font-bold mb-1">Verified Moisture Level</label>
                  <input
                    type="text"
                    value={verifyMoisture}
                    onChange={(e) => setVerifyMoisture(e.target.value)}
                    className="w-full px-3.5 py-2.5 bg-white rounded-xl border border-slate-200 text-slate-900 font-bold"
                  />
                </div>
                <div>
                  <label className="block text-slate-700 font-bold mb-1">Verified Category Allocation</label>
                  <select
                    value={verifyGrade}
                    onChange={(e) => setVerifyGrade(e.target.value)}
                    className="w-full px-3.5 py-2.5 bg-white rounded-xl border border-slate-200 text-slate-900 font-bold"
                  >
                    <option value="A">Category A (&le; 5,000 kg)</option>
                    <option value="B">Category B (5,001 - 10,000 kg)</option>
                    <option value="C">Category C (&gt; 10,000 kg)</option>
                  </select>
                </div>
              </div>

              <div>
                <label className="block text-slate-700 font-bold mb-1">Discrepancy / Receiving Remarks</label>
                <textarea
                  rows={2}
                  value={verifyDiscrepancyNote}
                  onChange={(e) => setVerifyDiscrepancyNote(e.target.value)}
                  placeholder="e.g. Weighbridge verified. Zero variance."
                  className="w-full px-3.5 py-2.5 bg-white rounded-xl border border-slate-200 text-slate-900 font-medium focus:ring-2 focus:ring-[#00a86b] focus:outline-none"
                />
              </div>

              <button
                type="submit"
                className="w-full py-3.5 rounded-2xl bg-[#00a86b] text-white font-black text-xs shadow-md hover:bg-[#008f5a] transition-all flex items-center justify-center space-x-2"
              >
                <ShieldCheck className="w-4 h-4 text-emerald-300" />
                <span>Mark as Received &amp; Add Stock to Center Inventory →</span>
              </button>
            </form>

          </div>
        </div>
      )}

      {/* FOOTER */}
      <footer className="bg-white border-t border-slate-200 py-4 text-center text-xs text-slate-500">
        © 2026 Smart Agricultural Crop Category &amp; Center Management System • Authorized Center In-Charge Portal
      </footer>

    </div>
  );
};

export default CenterInChargeDashboard;

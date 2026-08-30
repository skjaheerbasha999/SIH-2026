// Mock data for Smart & Fair Crop Procurement System

export const SYSTEM_STATS = [
  {
    id: 'farmers',
    title: 'Total Farmers',
    value: '5,632',
    trend: '+12% this month',
    trendUp: true,
    icon: 'Users',
    subtext: 'Registered across 142 villages'
  },
  {
    id: 'centers',
    title: 'Collection Centers',
    value: '86',
    trend: '+4 active centers',
    trendUp: true,
    icon: 'Building2',
    subtext: 'Village level access points'
  },
  {
    id: 'procured',
    title: 'Total Procured',
    value: '1,25,780 kg',
    trend: 'Worth ₹34.8 Lakhs',
    trendUp: true,
    icon: 'Scale',
    subtext: 'Direct farmer payouts'
  },
  {
    id: 'deliveries',
    title: 'Pending Deliveries',
    value: '18',
    trend: 'In-transit to Hubs',
    trendUp: false,
    icon: 'Truck',
    subtext: 'GPS tracked transport'
  }
];

export const CENTER_CAPACITIES = {
  A: {
    category: 'A',
    name: 'A CENTER',
    type: 'Priority Collection Center',
    capacityKg: 5000,
    currentStockKg: 3800,
    availableKg: 1200,
    fillPercentage: 76,
    status: 'AVAILABLE',
    color: 'emerald',
    badgeClass: 'bg-emerald-100 text-emerald-800 border-emerald-300'
  },
  B: {
    category: 'B',
    name: 'B CENTER',
    type: 'Secondary Collection Center',
    capacityKg: 5000,
    currentStockKg: 4700,
    availableKg: 300,
    fillPercentage: 94,
    status: 'LIMITED',
    color: 'amber',
    badgeClass: 'bg-amber-100 text-amber-800 border-amber-300'
  },
  C: {
    category: 'C',
    name: 'C CENTER',
    type: 'Overflow Collection Center',
    capacityKg: 5000,
    currentStockKg: 5000,
    availableKg: 0,
    fillPercentage: 100,
    status: 'FULL',
    color: 'red',
    badgeClass: 'bg-red-100 text-red-800 border-red-300'
  }
};

export const PROCESS_STEPS = [
  { step: '01', title: 'Register Farmer', description: 'Procurement Mitra inputs farmer, crop, and expected quantity details.', icon: 'UserPlus' },
  { step: '02', title: 'Smart Center Allocation', description: 'System checks center capacity & automatically assigns A → B → C Center.', icon: 'Building2' },
  { step: '03', title: 'Notify Farmer', description: 'Instant notification sent with assigned center, date, and time slot.', icon: 'BellRing' },
  { step: '04', title: 'Weighing & Procurement', description: 'Farmer arrives at assigned center for physical weighing & quality grading.', icon: 'Scale' },
  { step: '05', title: 'Digital Receipt', description: 'Transparent receipt generated with direct bank transfer payout.', icon: 'FileText' }
];

export const CROP_TYPES = [
  { id: 'wheat', name: 'Wheat', basePrice: 2275, unit: 'Qtl', gradeAMultiplier: 1.05, gradeBMultiplier: 1.0, gradeCMultiplier: 0.9 },
  { id: 'mustard', name: 'Mustard (Sarson)', basePrice: 5650, unit: 'Qtl', gradeAMultiplier: 1.06, gradeBMultiplier: 1.0, gradeCMultiplier: 0.88 },
  { id: 'paddy', name: 'Paddy (Basmati)', basePrice: 3835, unit: 'Qtl', gradeAMultiplier: 1.08, gradeBMultiplier: 1.0, gradeCMultiplier: 0.85 },
  { id: 'cotton', name: 'Cotton', basePrice: 6620, unit: 'Qtl', gradeAMultiplier: 1.04, gradeBMultiplier: 1.0, gradeCMultiplier: 0.9 }
];

export const RECENT_RECEIPTS = [
  { id: 'FMR-9041', name: 'Ramesh Kumar', village: 'Rampur Kalan', crop: 'Wheat', weight: '45 Qtl', status: 'Assigned A Center', time: '10 mins ago', payout: '₹1,17,730' },
  { id: 'FMR-9042', name: 'Sujata Devi', village: 'Bishanpur', crop: 'Mustard', weight: '22 Qtl', status: 'Assigned A Center', time: '25 mins ago', payout: '₹1,43,010' },
  { id: 'FMR-9043', name: 'Gurpreet Singh', village: 'Kotla Nadhu', crop: 'Paddy', weight: '80 Qtl', status: 'Assigned B Center', time: '1 hour ago', payout: '₹1,97,380' },
  { id: 'FMR-9044', name: 'Bhupendra Yadav', village: 'Kisan Nagar', crop: 'Wheat', weight: '30 Qtl', status: 'Assigned B Center', time: '2 hours ago', payout: '₹68,250' }
];

export const RECENT_ACTIVITY = [
  { id: 1, title: 'A Center Capacity Alert', desc: 'A Center reached 76% capacity (1,200 kg available).', time: '15m ago' },
  { id: 2, title: 'Smart Center Allocation', desc: 'Wheat harvest batch auto-allocated to B Center due to slot availability.', time: '40m ago' },
  { id: 3, title: 'Procurement Notification', desc: 'Dispatched arrival SMS to 450 farmers for collection schedule.', time: '2h ago' }
];

export const LANGUAGES = [
  { code: 'en', label: 'English' },
  { code: 'hi', label: 'हिन्दी (Hindi)' },
  { code: 'pb', label: 'ਪੰਜਾਬੀ (Punjabi)' }
];



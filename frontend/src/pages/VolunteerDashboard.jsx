import React, { useState, useRef } from 'react';
import html2canvas from 'html2canvas';
import { jsPDF } from 'jspdf';
import {
  Sprout,
  Users,
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
  Upload,
  Image,
  AlertCircle,
  Printer,
  Download,
  FileText,
  ShieldCheck
} from 'lucide-react';
import { useApp } from '../context/AppContext';
import { apiClient } from '../api/client';
import { useTranslation } from 'react-i18next';

// ==========================================
// MOCK DATA & CONSTANTS
// ==========================================

const COLLECTION_CENTERS = {
  A: {
    id: 'CENTER-A-101',
    category: 'A',
    name: 'A Center (Priority Collection Center)',
    type: 'Priority Collection Center',
    inChargeName: 'Dr. Vikram Sharma',
    role: 'A-Center In-Charge',
    mobile: '9812345678',
    email: 'vikram.sharma@agriprocure.gov.in',
    location: 'Plot 42, Agro-Logistics Park, Sonipat, Haryana',
    capacityKg: 5000,
    currentStockKg: 3800,
    availableKg: 1200,
    fillPercentage: 76,
    status: 'AVAILABLE'
  },
  B: {
    id: 'CENTER-B-202',
    category: 'B',
    name: 'B Center (Secondary Collection Center)',
    type: 'Secondary Collection Center',
    inChargeName: 'Er. Rajesh Verma',
    role: 'B-Center In-Charge',
    mobile: '9876512345',
    email: 'rajesh.verma@agriprocure.gov.in',
    location: 'Sector 18 Mandi Complex, Panipat, Haryana',
    capacityKg: 5000,
    currentStockKg: 4700,
    availableKg: 300,
    fillPercentage: 94,
    status: 'LIMITED'
  },
  C: {
    id: 'CENTER-C-303',
    category: 'C',
    name: 'C Center (Overflow Collection Center)',
    type: 'Overflow Collection Center',
    inChargeName: 'Mrs. Sunita Patel',
    role: 'C-Center In-Charge',
    mobile: '9845067890',
    email: 'sunita.patel@agriprocure.gov.in',
    location: 'Industrial Phase II, Rohtak, Haryana',
    capacityKg: 5000,
    currentStockKg: 5000,
    availableKg: 0,
    fillPercentage: 100,
    status: 'FULL'
  }
};

const QUALITY_CENTERS = COLLECTION_CENTERS;

const TRACKING_STAGES = [
  'Crop Submitted',
  'Quality Category Assigned',
  'Proposal Sent',
  'Center Accepted',
  'Crop Received',
  'Processing',
  'Ready',
  'Completed'
];

const INITIAL_FARMERS = [
  {
    id: 'FARM-1001',
    name: 'Ramesh Kumar',
    mobile: '9876543211',
    email: 'ramesh.k@agrimail.in',
    village: 'Sonipat Khas',
    panchayat: 'Grama Panchayat North',
    mandal: 'Sonipat Mandal',
    district: 'Sonipat',
    state: 'Haryana',
    cropType: 'Wheat (PBW 550)',
    cultivatedArea: '4.5 Acres',
    productionQuantity: 2400,
    submissionDate: '2026-08-15',
    cropStatus: 'Center Accepted',
    qualityStatus: 'Category A',
    trackingStageIndex: 5,
    history: [
      { season: 'Rabi 2025', crop: 'Wheat', area: '4.5 Acres', qty: '2,300 kg', grade: 'Category A', payout: '₹55,200' },
      { season: 'Kharif 2025', crop: 'Paddy Basmati', area: '4.0 Acres', qty: '3,100 kg', grade: 'Category A', payout: '₹93,000' }
    ]
  },
  {
    id: 'FARM-1002',
    name: 'Sujata Devi',
    mobile: '9876543212',
    email: 'sujata.d@agrimail.in',
    village: 'Rampur',
    panchayat: 'Rampur Panchayat',
    mandal: 'Sonipat Mandal',
    district: 'Sonipat',
    state: 'Haryana',
    cropType: 'Mustard (Sarson)',
    cultivatedArea: '3.2 Acres',
    productionQuantity: 1250,
    submissionDate: '2026-08-18',
    cropStatus: 'Processing',
    qualityStatus: 'Category A',
    trackingStageIndex: 6,
    history: [
      { season: 'Rabi 2025', crop: 'Mustard', area: '3.0 Acres', qty: '1,180 kg', grade: 'Category A', payout: '₹64,900' }
    ]
  },
  {
    id: 'FARM-1003',
    name: 'Mahesh Patel',
    mobile: '9876543213',
    email: 'mahesh.p@agrimail.in',
    village: 'Sonipat East',
    panchayat: 'Panchayat Ward 4',
    mandal: 'Sonipat Mandal',
    district: 'Sonipat',
    state: 'Haryana',
    cropType: 'Paddy (Basmati 1121)',
    cultivatedArea: '8.0 Acres',
    productionQuantity: 6500,
    submissionDate: '2026-08-20',
    cropStatus: 'Proposal Sent',
    qualityStatus: 'Category B',
    trackingStageIndex: 3,
    history: [
      { season: 'Kharif 2025', crop: 'Paddy', area: '5.0 Acres', qty: '2,900 kg', grade: 'Category A', payout: '₹72,500' }
    ]
  },
  {
    id: 'FARM-1004',
    name: 'Gurpreet Singh',
    mobile: '9876543214',
    email: 'gurpreet.s@agrimail.in',
    village: 'Kotla Nadhu',
    panchayat: 'Kotla Panchayat',
    mandal: 'Sonipat Mandal',
    district: 'Sonipat',
    state: 'Haryana',
    cropType: 'Wheat (Sharbati)',
    cultivatedArea: '6.0 Acres',
    productionQuantity: 4200,
    submissionDate: '2026-08-10',
    cropStatus: 'Completed',
    qualityStatus: 'Category A',
    trackingStageIndex: 8,
    history: [
      { season: 'Rabi 2025', crop: 'Wheat', area: '6.0 Acres', qty: '4,100 kg', grade: 'Category A', payout: '₹1,02,500' }
    ]
  },
  {
    id: 'FARM-1005',
    name: 'Sunita Yadav',
    mobile: '9876543215',
    email: 'sunita.y@agrimail.in',
    village: 'Kisan Nagar',
    panchayat: 'Kisan Panchayat',
    mandal: 'Sonipat Mandal',
    district: 'Sonipat',
    state: 'Haryana',
    cropType: 'Cotton (Hybrid Bt)',
    cultivatedArea: '14.0 Acres',
    productionQuantity: 12000,
    submissionDate: '2026-08-22',
    cropStatus: 'Processing',
    qualityStatus: 'Category C',
    trackingStageIndex: 6,
    history: [
      { season: 'Kharif 2025', crop: 'Cotton', area: '12.5 Acres', qty: '10,850 kg', grade: 'Category C', payout: '₹4,34,000' }
    ]
  },
  {
    id: 'FARM-1006',
    name: 'Vikram Choudhary',
    mobile: '9876543216',
    email: 'vikram.c@agrimail.in',
    village: 'Bishanpur',
    panchayat: 'Bishanpur Panchayat',
    mandal: 'Sonipat Mandal',
    district: 'Sonipat',
    state: 'Haryana',
    cropType: 'Maize (Yellow Hybrid)',
    cultivatedArea: '9.0 Acres',
    productionQuantity: 8500,
    submissionDate: '2026-08-25',
    cropStatus: 'Processing',
    qualityStatus: 'Category B',
    trackingStageIndex: 0,
    history: []
  }
];

const INITIAL_PROPOSALS = [
  {
    id: 'PROP-101',
    farmerId: 'FARM-1001',
    farmerName: 'Ramesh Kumar',
    cropName: 'Wheat (PBW 550)',
    quantity: 2400,
    pricePerKg: 24,
    totalPrice: 57600,
    qualityCategory: 'A',
    qualityLevel: 'High Quality',
    submissionDate: '2026-08-15 10:30 AM',
    status: 'Accepted',
    centerInCharge: QUALITY_CENTERS.A,
    aiAnalysis: 'Grain moisture 11.2%, Foreign matter 0.4%, Uniformity 98.2%. Meets Category A premium standards.',
    assessmentDate: '2026-08-15'
  },
  {
    id: 'PROP-102',
    farmerId: 'FARM-1002',
    farmerName: 'Sujata Devi',
    cropName: 'Mustard (Sarson)',
    quantity: 1250,
    pricePerKg: 55,
    totalPrice: 68750,
    qualityCategory: 'A',
    qualityLevel: 'High Quality',
    submissionDate: '2026-08-18 11:15 AM',
    status: 'Accepted',
    centerInCharge: QUALITY_CENTERS.A,
    aiAnalysis: 'Oil content 42.5%, Moisture 6.1%, Impurities 0.5%. Grade A Premium oilseed.',
    assessmentDate: '2026-08-18'
  },
  {
    id: 'PROP-103',
    farmerId: 'FARM-1003',
    farmerName: 'Mahesh Patel',
    cropName: 'Paddy (Basmati 1121)',
    quantity: 6500,
    pricePerKg: 30,
    totalPrice: 195000,
    qualityCategory: 'B',
    qualityLevel: 'Medium Quality',
    submissionDate: '2026-08-20 02:45 PM',
    status: 'Pending',
    centerInCharge: QUALITY_CENTERS.B,
    aiAnalysis: 'Grain length 7.8mm, Moisture 13.5%, Discoloration 2.1%. Classified as Grade B Standard Basmati.',
    assessmentDate: '2026-08-20'
  },
  {
    id: 'PROP-104',
    farmerId: 'FARM-1004',
    farmerName: 'Gurpreet Singh',
    cropName: 'Wheat (Sharbati)',
    quantity: 4200,
    pricePerKg: 25,
    totalPrice: 105000,
    qualityCategory: 'A',
    qualityLevel: 'High Quality',
    submissionDate: '2026-08-10 11:00 AM',
    status: 'Accepted',
    centerInCharge: QUALITY_CENTERS.A,
    aiAnalysis: 'High protein content 13.1%, Moisture 10.8%. Grade A Silo Allocation.',
    assessmentDate: '2026-08-10'
  },
  {
    id: 'PROP-105',
    farmerId: 'FARM-1005',
    farmerName: 'Sunita Yadav',
    cropName: 'Cotton (Hybrid Bt)',
    quantity: 12000,
    pricePerKg: 60,
    totalPrice: 720000,
    qualityCategory: 'C',
    qualityLevel: 'Low Quality',
    submissionDate: '2026-08-22 04:00 PM',
    status: 'Accepted',
    centerInCharge: QUALITY_CENTERS.C,
    aiAnalysis: 'Staple length 24mm, High trash content 5.8%, Moisture 9.4%. Sent for Industrial Processing C-Center.',
    assessmentDate: '2026-08-22'
  },
  {
    id: 'PROP-106',
    farmerId: 'FARM-1006',
    farmerName: 'Vikram Choudhary',
    cropName: 'Maize (Yellow Hybrid)',
    quantity: 8500,
    pricePerKg: 22,
    totalPrice: 187000,
    qualityCategory: 'B',
    qualityLevel: 'Medium Quality',
    submissionDate: '2026-08-25 09:30 AM',
    status: 'Pending',
    centerInCharge: QUALITY_CENTERS.B,
    aiAnalysis: 'Uniform kernel size, moisture 13.2%. Dispatched to Secondary B-Center Collection Hub.',
    assessmentDate: '2026-08-25'
  }
];

const INITIAL_TRACKINGS = [
  {
    id: 'TRK-9001',
    proposalId: 'PROP-101',
    farmerId: 'FARM-1001',
    farmerName: 'Ramesh Kumar',
    cropName: 'Wheat (PBW 550)',
    quantity: '2,400 kg',
    qualityCategory: 'A',
    centerName: QUALITY_CENTERS.A.name,
    inChargeName: QUALITY_CENTERS.A.inChargeName,
    currentStageIndex: 5,
    currentLocation: 'Silo Hub #42, Bay 3, Sonipat Logistics Park',
    currentStatus: 'Unloaded & Grain Temperature Verification Complete',
    stageLogs: [
      { stage: 'Crop Submitted', time: '2026-08-15 09:00 AM', actor: 'Volunteer Gurpreet', status: 'Completed', detail: 'Farmer registered crop harvest' },
      { stage: 'Quality Category Assigned', time: '2026-08-15 10:20 AM', actor: 'System Auto-Engine', status: 'Completed', detail: 'Assigned Category A Hub' },
      { stage: 'Proposal Sent', time: '2026-08-15 10:30 AM', actor: 'Volunteer Gurpreet', status: 'Completed', detail: 'Proposal #PROP-101 dispatched' },
      { stage: 'Center Accepted', time: '2026-08-15 11:00 AM', actor: 'Dr. Vikram Sharma', status: 'Completed', detail: 'Slot approved at Silo Hub #42' },
      { stage: 'Crop Received', time: '2026-08-16 02:00 PM', actor: 'Receiving Officer Ankit', status: 'Active', detail: 'Weighbridge verified: 2,400 kg' },
      { stage: 'Processing', time: 'Pending', actor: 'Quality Ops Team', status: 'Pending', detail: 'Cleaning & Silo aeration' },
      { stage: 'Ready', time: 'Pending', actor: 'Inventory Mgr', status: 'Pending', detail: 'Final release clearance' },
      { stage: 'Completed', time: 'Pending', actor: 'Head Office Payout Dept', status: 'Pending', detail: 'MSP Payment disbursed' }
    ]
  },
  {
    id: 'TRK-9002',
    proposalId: 'PROP-102',
    farmerId: 'FARM-1002',
    farmerName: 'Sujata Devi',
    cropName: 'Mustard (Sarson)',
    quantity: '1,250 kg',
    qualityCategory: 'A',
    centerName: QUALITY_CENTERS.A.name,
    inChargeName: QUALITY_CENTERS.A.inChargeName,
    currentStageIndex: 6,
    currentLocation: 'Clean Storage Vault #2, A-Center Sonipat',
    currentStatus: 'Undergoing High-Pressure Seed Drying & Quality Hold',
    stageLogs: [
      { stage: 'Crop Submitted', time: '2026-08-18 09:30 AM', actor: 'Volunteer Gurpreet', status: 'Completed', detail: 'Harvest batch registered' },
      { stage: 'Quality Category Assigned', time: '2026-08-18 11:00 AM', actor: 'System Auto-Engine', status: 'Completed', detail: 'Category A Allocated' },
      { stage: 'Proposal Sent', time: '2026-08-18 11:15 AM', actor: 'Volunteer Gurpreet', status: 'Completed', detail: 'Proposal #PROP-102 sent' },
      { stage: 'Center Accepted', time: '2026-08-18 12:30 PM', actor: 'Dr. Vikram Sharma', status: 'Completed', detail: 'Receipt confirmed' },
      { stage: 'Crop Received', time: '2026-08-19 10:00 AM', actor: 'Gate Security & Weigh', status: 'Completed', detail: 'Weighbridge 1,250 kg' },
      { stage: 'Processing', time: '2026-08-19 03:30 PM', actor: 'Dr. Vikram Sharma', status: 'Active', detail: 'Moisture reduction processing' },
      { stage: 'Ready', time: 'Pending', actor: 'Dispatch Cell', status: 'Pending', detail: 'Ready for market release' },
      { stage: 'Completed', time: 'Pending', actor: 'Accounts Dept', status: 'Pending', detail: 'Direct Bank Transfer' }
    ]
  },
  {
    id: 'TRK-9003',
    proposalId: 'PROP-104',
    farmerId: 'FARM-1005',
    farmerName: 'Sunita Yadav',
    cropName: 'Cotton (Hybrid Bt)',
    quantity: '980 kg',
    qualityCategory: 'C',
    centerName: QUALITY_CENTERS.C.name,
    inChargeName: QUALITY_CENTERS.C.inChargeName,
    currentStageIndex: 6,
    currentLocation: 'Rohtak Industrial Processing Plant #09',
    currentStatus: 'Industrial Fiber Pre-Cleaning & De-seeding',
    stageLogs: [
      { stage: 'Crop Submitted', time: '2026-08-22 02:00 PM', actor: 'Volunteer Gurpreet', status: 'Completed', detail: 'Cotton yield registered' },
      { stage: 'Quality Category Assigned', time: '2026-08-22 03:30 PM', actor: 'System Auto-Engine', status: 'Completed', detail: 'C-Center Allocated' },
      { stage: 'Proposal Sent', time: '2026-08-22 04:00 PM', actor: 'Volunteer Gurpreet', status: 'Completed', detail: 'Proposal #PROP-104 sent' },
      { stage: 'Center Accepted', time: '2026-08-22 05:00 PM', actor: 'Mrs. Sunita Patel', status: 'Completed', detail: 'Industrial Batch Approved' },
      { stage: 'Crop Received', time: '2026-08-23 11:30 AM', actor: 'Plant Gate Entry', status: 'Completed', detail: 'Received 980 kg' },
      { stage: 'Processing', time: '2026-08-23 02:00 PM', actor: 'Mrs. Sunita Patel', status: 'Active', detail: 'De-seeding in progress' },
      { stage: 'Ready', time: 'Pending', actor: 'Procurement Cell', status: 'Pending', detail: 'Batch quality report' },
      { stage: 'Completed', time: 'Pending', actor: 'Finance Section', status: 'Pending', detail: 'Industrial Payout' }
    ]
  }
];

const SAMPLE_CROP_SCANS = [
  {
    name: 'Wheat (PBW 550 High-Yield)',
    cropType: 'Wheat',
    moisture: '11.2%',
    purity: '98.5%',
    defects: '0.4%',
    score: 96.4,
    category: 'A',
    level: 'High Quality (Grade A)',
    analysis: 'Optimal grain weight, vibrant golden hue, moisture level below 12% threshold. Excellent for Category A Silo procurement.'
  },
  {
    name: 'Mustard (Sarson Grade-A)',
    cropType: 'Mustard',
    moisture: '6.2%',
    purity: '97.9%',
    defects: '0.6%',
    score: 94.8,
    category: 'A',
    level: 'High Quality (Grade A)',
    analysis: 'High oil seed density, uniform dark black seeds, zero mold. Meets Category A oilseed benchmark.'
  },
  {
    name: 'Paddy Basmati 1121 (Standard)',
    cropType: 'Paddy',
    moisture: '13.8%',
    purity: '92.1%',
    defects: '2.4%',
    score: 82.5,
    category: 'B',
    level: 'Medium Quality (Grade B)',
    analysis: 'Slight grain length variation, moisture slightly elevated at 13.8%. Recommended for Category B Mandi collection.'
  },
  {
    name: 'Cotton (Bt Hybrid Processing)',
    cropType: 'Cotton',
    moisture: '9.4%',
    purity: '84.2%',
    defects: '5.8%',
    score: 68.0,
    category: 'C',
    level: 'Low Quality (Grade C)',
    analysis: 'Elevated foreign leaf trash content, shorter staple length. Suitable for Category C Industrial Processing.'
  }
];

// ==========================================
// MAIN VOLUNTEER DASHBOARD COMPONENT
// ==========================================

export const VolunteerDashboard = () => {
  const { userSession, showToast, navigateTo } = useApp();
  const { t } = useTranslation();

  const receiptCardRef = useRef(null);
  const [isDownloadingPdf, setIsDownloadingPdf] = useState(false);

  const handleDownloadPdf = async (referenceNo) => {
    if (!receiptCardRef.current) {
      showToast('Receipt container not ready');
      return;
    }
    setIsDownloadingPdf(true);
    showToast('Generating official PDF receipt...');
    try {
      const element = receiptCardRef.current;
      const canvas = await html2canvas(element, {
        scale: 2,
        useCORS: true,
        logging: false,
        backgroundColor: '#ffffff',
        ignoreElements: (el) => el.classList && el.classList.contains('no-print')
      });
      const imgData = canvas.toDataURL('image/png');
      const pdf = new jsPDF({
        orientation: 'portrait',
        unit: 'mm',
        format: 'a4'
      });
      const pdfWidth = pdf.internal.pageSize.getWidth();
      const margin = 10;
      const maxPdfWidth = pdfWidth - (margin * 2);
      const imgWidth = maxPdfWidth;
      const imgHeight = (canvas.height * imgWidth) / canvas.width;
      pdf.addImage(imgData, 'PNG', margin, margin, imgWidth, imgHeight);
      const fileName = `MSP_Receipt_${referenceNo || 'Voucher'}.pdf`;
      pdf.save(fileName);
      showToast('Receipt PDF downloaded successfully!');
    } catch (error) {
      console.error('Error generating PDF:', error);
      showToast('Failed to download PDF. Opening print window...');
      window.print();
    } finally {
      setIsDownloadingPdf(false);
    }
  };

  const volunteerName = userSession?.name || 'Gurpreet Singh';
  const volunteerMandal = userSession?.mandal || 'Sonipat Mandal';
  const volunteerDistrict = userSession?.district || 'Sonipat';
  const volunteerState = userSession?.state || 'Haryana';

  // TOP HEADER NAVIGATION MAIN TABS: 'Dashboard' | 'Farmers'
  const [activeTab, setActiveTab] = useState('Farmers');

  // SELECTED FARMER FOR INDIVIDUAL DASHBOARD
  const [selectedFarmerForDashboard, setSelectedFarmerForDashboard] = useState(null);

  // INDIVIDUAL FARMER DASHBOARD MODULE TAB & TRACKING TOGGLE
  const [farmerModuleTab, setFarmerModuleTab] = useState('register');
  const [showTrackingTimeline, setShowTrackingTimeline] = useState(false);

  // CORE DATA STATE
  const [farmers, setFarmers] = useState(INITIAL_FARMERS);
  const [proposals, setProposals] = useState(INITIAL_PROPOSALS);
  const [trackings, setTrackings] = useState(INITIAL_TRACKINGS);

  // SEARCH, FILTER & SORT STATE FOR FARMERS DIRECTORY
  const [farmerSearch, setFarmerSearch] = useState('');
  const [farmerQualityFilter, setFarmerQualityFilter] = useState('ALL');
  const [farmerStatusFilter, setFarmerStatusFilter] = useState('ALL');
  const [farmerSort, setFarmerSort] = useState('DATE_DESC');

  // REAL-TIME CENTER CAPACITY STATE
  const [centerCapacities, setCenterCapacities] = useState({
    A: { category: 'A', name: 'A CENTER', type: 'Priority Collection Center', capacityKg: 5000, currentStockKg: 3800, availableKg: 1200, status: 'AVAILABLE', fillPercentage: 76 },
    B: { category: 'B', name: 'B CENTER', type: 'Secondary Collection Center', capacityKg: 5000, currentStockKg: 4700, availableKg: 300, status: 'LIMITED', fillPercentage: 94 },
    C: { category: 'C', name: 'C CENTER', type: 'Overflow Collection Center', capacityKg: 5000, currentStockKg: 5000, availableKg: 0, status: 'FULL', fillPercentage: 100 }
  });

  const [allocationModalData, setAllocationModalData] = useState(null);

  // MODAL & FORM STATES
  const [showAddFarmerModal, setShowAddFarmerModal] = useState(false);
  const [newFarmer, setNewFarmer] = useState({
    name: '',
    mobile: '',
    email: '',
    village: '',
    panchayat: '',
    mandal: '',
    district: '',
    state: '',
    cropType: 'Wheat',
    cultivatedArea: '3.5 Acres',
    goodCropQuantity: '',
    wasteCropQuantity: ''
  });
  const [editFarmerForm, setEditFarmerForm] = useState(null);

  // AI CROP ANALYSIS STATES
  const [uploadedCropFile, setUploadedCropFile] = useState(null);
  const [uploadedCropFilePreview, setUploadedCropFilePreview] = useState(null);
  const [aiScanning, setAiScanning] = useState(false);
  const [aiResult, setAiResult] = useState(null);

  // DERIVED STATS FOR KPI CARDS
  const totalRegisteredFarmers = farmers.length;
  const totalCropsSubmitted = farmers.filter(f => f.cropType && f.cropType !== 'N/A').length || farmers.length;
  const totalProductionQuantityKg = farmers.reduce((sum, f) => sum + (Number(f.productionQuantity) || 0), 0);
  const pendingQualityChecks = farmers.filter(f => !f.qualityGrade || f.qualityGrade === 'N/A' || f.qualityGrade === 'Pending' || f.cropStatus === 'Pending').length;
  const acceptedProposals = proposals.filter(p => p.status === 'Accepted' || p.status === 'Accepted & Unlocked').length;
  const pendingProposals = proposals.filter(p => p.status === 'Pending').length;

  // AUTOMATIC CENTER ALLOCATION LOGIC (A -> B -> C -> WAITING)
  const runCenterAllocation = (farmerName, mobile, cropName, quantityKg) => {
    const qty = Number(quantityKg) || 120;
    let updated = { ...centerCapacities };
    let assignedCategory = '';
    let assignedName = '';
    let statusMessage = '';
    let notificationText = '';

    if (updated.A.availableKg >= qty) {
      assignedCategory = 'A';
      assignedName = 'A Center';
      statusMessage = 'Assigned to A Center';
      notificationText = `Dear Farmer, Please bring your ${cropName} (${qty} kg) to A Center on 29 August at 9:00 AM.`;

      updated.A.currentStockKg += qty;
      updated.A.availableKg -= qty;
      updated.A.fillPercentage = Math.round((updated.A.currentStockKg / updated.A.capacityKg) * 100);
      updated.A.status = updated.A.availableKg === 0 ? 'FULL' : (updated.A.fillPercentage > 90 ? 'LIMITED' : 'AVAILABLE');
    } else if (updated.B.availableKg >= qty) {
      assignedCategory = 'B';
      assignedName = 'B Center';
      statusMessage = 'A Center is currently full. Your crop has been assigned to B Center.';
      notificationText = `Dear Farmer, A Center is currently full. Please bring your ${cropName} to B Center on 29 August at 9:00 AM.`;

      updated.B.currentStockKg += qty;
      updated.B.availableKg -= qty;
      updated.B.fillPercentage = Math.round((updated.B.currentStockKg / updated.B.capacityKg) * 100);
      updated.B.status = updated.B.availableKg === 0 ? 'FULL' : (updated.B.fillPercentage > 90 ? 'LIMITED' : 'AVAILABLE');
    } else if (updated.C.availableKg >= qty) {
      assignedCategory = 'C';
      assignedName = 'C Center';
      statusMessage = 'A & B Centers are currently full. Your crop has been assigned to C Center.';
      notificationText = `Dear Farmer, A & B Centers are currently full. Please bring your ${cropName} to C Center on 29 August at 9:00 AM.`;

      updated.C.currentStockKg += qty;
      updated.C.availableKg -= qty;
      updated.C.fillPercentage = Math.round((updated.C.currentStockKg / updated.C.capacityKg) * 100);
      updated.C.status = updated.C.availableKg === 0 ? 'FULL' : (updated.C.fillPercentage > 90 ? 'LIMITED' : 'AVAILABLE');
    } else {
      assignedCategory = 'FULL';
      assignedName = 'All Centers Full';
      statusMessage = 'All Centers Full';
      notificationText = `Dear Farmer, All Centers Full. You have been placed on the priority waiting queue. Procurement Mitra has been notified.`;
    }

    setCenterCapacities(updated);
    return {
      assignedCategory,
      assignedName,
      statusMessage,
      notificationText,
      snapshot: { ...updated }
    };
  };

  // Open Individual Farmer Dashboard Handler
  const handleOpenFarmerDashboard = (farmer) => {
    setSelectedFarmerForDashboard(farmer);
    setEditFarmerForm({ ...farmer });
    setFarmerModuleTab('register');
    setAiResult(null);
    setUploadedCropFile(null);
    setUploadedCropFilePreview(null);
    if (showToast) {
      showToast(`Opening Dashboard for ${farmer.name}`);
    }
  };

  // Add New Farmer Handler & Auto Allocation
  const handleAddFarmerSubmit = (e) => {
    e.preventDefault();
    if (!newFarmer.name.trim() || !newFarmer.mobile.trim()) {
      showToast('Please provide Farmer Name and Mobile Number');
      return;
    }

    const goodQty = Number(newFarmer.goodCropQuantity) || 0;
    const wasteQty = Number(newFarmer.wasteCropQuantity) || 0;
    const qtyKg = goodQty + wasteQty;
    
    if (qtyKg <= 0) {
      showToast('Please provide crop quantities');
      return;
    }
    
    const farmerName = newFarmer.name.trim();
    const cropName = newFarmer.cropType || 'Wheat';

    // Execute automatic capacity allocation for Good Crop
    let allocResult = null;
    if (goodQty > 0) {
      allocResult = runCenterAllocation(farmerName, newFarmer.mobile.trim(), cropName, goodQty);
    }

    // Process Waste Crop
    let wasteResult = null;
    if (wasteQty > 0) {
      wasteResult = {
        assignedCategory: 'WASTE',
        assignedName: 'Waste Crop Center Region 1',
        inChargeName: 'Mr. Ramesh (Waste Manager)',
        contact: '+91 9988776655',
        location: 'Plot 88, Bio-Gas & Composting Park, Sonipat',
        statusMessage: 'Assigned to Waste Crop Center',
        notificationText: `Dear Farmer, Please bring your waste ${cropName} (${wasteQty} kg) to Waste Crop Center Region 1.`
      };
    }

    const createdId = `FARM-${1000 + farmers.length + 1}`;
    const newRecord = {
      id: createdId,
      name: farmerName,
      mobile: newFarmer.mobile.trim(),
      email: newFarmer.email.trim() || `${farmerName.toLowerCase().replace(/\s+/g, '')}@agrimail.in`,
      village: newFarmer.village.trim() || 'Sonipat Village',
      panchayat: newFarmer.panchayat.trim() || 'Grama Panchayat North',
      mandal: newFarmer.mandal || volunteerMandal,
      district: newFarmer.district || volunteerDistrict,
      state: newFarmer.state || volunteerState,
      cropType: cropName,
      cultivatedArea: newFarmer.cultivatedArea || '3.5 Acres',
      productionQuantity: qtyKg,
      goodCropQuantity: goodQty,
      wasteCropQuantity: wasteQty,
      submissionDate: new Date().toISOString().split('T')[0],
      assignedCenterCategory: allocResult ? allocResult.assignedCategory : (wasteResult ? wasteResult.assignedCategory : ''),
      assignedCenterName: allocResult ? allocResult.assignedName : (wasteResult ? wasteResult.assignedName : ''),
      allocationStatusMessage: allocResult ? allocResult.statusMessage : (wasteResult ? wasteResult.statusMessage : ''),
      notificationText: allocResult ? allocResult.notificationText : (wasteResult ? wasteResult.notificationText : ''),
      cropStatus: allocResult ? (allocResult.assignedCategory === 'WAITING' ? 'Waiting List' : `Assigned ${allocResult.assignedCategory} Center`) : 'Assigned Waste Center',
      qualityStatus: allocResult ? `Assigned ${allocResult.assignedCategory} Center` : 'Waste Crop Only',
      trackingStageIndex: 1,
      history: []
    };

    setFarmers([newRecord, ...farmers]);
    setShowAddFarmerModal(false);
    setAllocationModalData({
      farmerName,
      mobile: newFarmer.mobile.trim(),
      village: newRecord.village,
      cropName,
      qtyKg,
      goodQty,
      wasteQty,
      allocResult,
      wasteResult,
      farmerId: createdId
    });

    setNewFarmer({
      name: '',
      mobile: '',
      email: '',
      village: '',
      panchayat: '',
      mandal: volunteerMandal,
      district: volunteerDistrict,
      state: volunteerState,
      cropType: 'Wheat',
      cultivatedArea: '3.5 Acres',
      goodCropQuantity: '',
      wasteCropQuantity: ''
    });
    showToast('Farmer registered and smart capacity allocation triggered');
  };

  // Update Farmer Registration Details (Module 1)
  const handleUpdateFarmerDetails = (e) => {
    e.preventDefault();
    if (!editFarmerForm || !editFarmerForm.name?.trim() || !editFarmerForm.mobile?.trim()) {
      showToast('Please provide valid Name and Contact Number');
      return;
    }

    const updatedQty = Number(editFarmerForm.productionQuantity) || 0;
    const updatedPrice = Number(editFarmerForm.pricePerKg) || 24;
    const computedTotal = updatedQty * updatedPrice;
    const catFull = getCategoryFromQuantity(updatedQty);
    const catLetter = catFull.replace('Category ', '').trim();
    const assignedCenter = QUALITY_CENTERS[catLetter] || QUALITY_CENTERS.A;

    const updatedRecord = {
      ...editFarmerForm,
      name: editFarmerForm.name.trim(),
      mobile: editFarmerForm.mobile.trim(),
      productionQuantity: updatedQty,
      pricePerKg: updatedPrice,
      totalPrice: computedTotal,
      qualityStatus: catFull
    };

    setFarmers(farmers.map(f => f.id === updatedRecord.id ? updatedRecord : f));
    setSelectedFarmerForDashboard({ ...updatedRecord });

    const existingProp = proposals.find(p => p.farmerId === updatedRecord.id);
    const updatedProp = {
      id: existingProp ? existingProp.id : `PROP-${100 + proposals.length + 1}`,
      farmerId: updatedRecord.id,
      farmerName: updatedRecord.name,
      cropName: updatedRecord.cropType || 'Wheat',
      quantity: updatedQty,
      pricePerKg: updatedPrice,
      totalPrice: computedTotal,
      qualityCategory: catLetter,
      qualityLevel: `Category ${catLetter} Verified`,
      submissionDate: existingProp ? existingProp.submissionDate : new Date().toISOString().replace('T', ' ').slice(0, 16),
      status: existingProp ? existingProp.status : 'Pending',
      centerInCharge: assignedCenter,
      aiAnalysis: `Updated yield ${updatedQty.toLocaleString()} kg @ ₹${updatedPrice}/kg (Total ₹${computedTotal.toLocaleString('en-IN')}). Routed to ${assignedCenter.name}.`,
      assessmentDate: new Date().toISOString().split('T')[0]
    };

    if (existingProp) {
      setProposals(proposals.map(p => p.farmerId === updatedRecord.id ? updatedProp : p));
    } else {
      setProposals([...proposals, updatedProp]);
    }

    setTrackings(trackings.map(t => t.farmerId === updatedRecord.id ? {
      ...t,
      farmerName: updatedRecord.name,
      cropName: updatedRecord.cropType,
      quantity: `${updatedQty.toLocaleString()} kg`,
      pricePerKg: updatedPrice,
      totalPrice: computedTotal,
      qualityCategory: catLetter,
      centerName: assignedCenter.name,
      inChargeName: assignedCenter.inChargeName
    } : t));

    showToast(`Registration info & Payout calculation updated (Total ₹${computedTotal.toLocaleString('en-IN')})!`);
  };

  // Image file selection handler
  const handleImageFileChange = (e) => {
    const file = e.target.files?.[0];
    if (!file) return;
    setUploadedCropFile(file);
    const reader = new FileReader();
    reader.onloadend = () => {
      setUploadedCropFilePreview(reader.result);
      setAiScanError(null);
    };
    reader.readAsDataURL(file);
  };

  // Real Google Gemini AI Quality Scan Handler (Module 2)
  const handleRunAiScan = async () => {
    if (!selectedFarmerForDashboard) return;

    if (!uploadedCropFilePreview) {
      showToast('Please select or upload a clear crop harvest image first.');
      return;
    }

    setAiScanning(true);
    setAiScanError(null);
    setAiResult(null);

    try {
      const response = await apiClient.scanQuality({
        farmerId: selectedFarmerForDashboard.id,
        cropId: selectedFarmerForDashboard.cropId || 'CROP-201',
        cropName: selectedFarmerForDashboard.cropType || 'Wheat',
        imageBase64: uploadedCropFilePreview,
        mimeType: uploadedCropFile?.type || 'image/jpeg'
      });

      setAiScanning(false);

      if (response && response.success && response.data) {
        const data = response.data;
        const centerObj = QUALITY_CENTERS[data.qualityGrade] || QUALITY_CENTERS.A;

        const resultObj = {
          cropName: data.cropName || selectedFarmerForDashboard.cropType || 'Wheat',
          farmerId: selectedFarmerForDashboard.id,
          farmerName: selectedFarmerForDashboard.name,
          quantity: selectedFarmerForDashboard.productionQuantity || 2000,
          qualityGrade: data.qualityGrade,
          qualityLevel: data.qualityLevel,
          confidence: data.confidence || 87,
          observations: data.observations || ['Healthy crop structure observed', 'Good color consistency'],
          recommendation: data.recommendation || `Suitable for ${data.qualityGrade} quality center`,
          scanDate: data.scanDate || new Date().toISOString(),
          assignedCenter: centerObj
        };

        setAiResult(resultObj);
        showToast(`AI Scan Complete: Grade ${data.qualityGrade} (${data.qualityLevel} Quality)!`);
      } else {
        const errorMsg = response?.message || "AI quality analysis is currently unavailable. Please try again.";
        setAiScanError(errorMsg);
        showToast(errorMsg);
      }
    } catch (err) {
      setAiScanning(false);
      const errorMsg = "AI quality analysis is currently unavailable. Please try again.";
      setAiScanError(errorMsg);
      showToast(errorMsg);
    }
  };

  // Send Proposal Handler (Module 3)
  const handleSendProposal = async (scanResult) => {
    if (!scanResult) return;

    try {
      const response = await apiClient.sendProposal({
        farmerId: scanResult.farmerId,
        farmerName: scanResult.farmerName,
        cropId: selectedFarmerForDashboard.cropId || 'CROP-201',
        cropName: scanResult.cropName,
        quantity: `${scanResult.quantity} kg`,
        qualityGrade: scanResult.qualityGrade,
        confidence: scanResult.confidence
      });

      const centerObj = scanResult.assignedCenter || QUALITY_CENTERS[scanResult.qualityGrade] || QUALITY_CENTERS.A;

      const newProp = {
        id: response?.data?.id || `PROP-${Date.now()}`,
        farmerId: scanResult.farmerId,
        farmerName: scanResult.farmerName,
        cropName: scanResult.cropName,
        quantity: scanResult.quantity,
        qualityCategory: scanResult.qualityGrade,
        qualityLevel: scanResult.qualityLevel,
        confidence: scanResult.confidence,
        submissionDate: new Date().toISOString().split('T')[0],
        status: 'Pending',
        centerInCharge: centerObj,
        recommendation: scanResult.recommendation,
        assessmentDate: new Date().toISOString().split('T')[0]
      };

      setProposals([newProp, ...proposals]);

      const updatedFarmer = {
        ...selectedFarmerForDashboard,
        qualityStatus: `Category ${scanResult.qualityGrade}`,
        cropStatus: 'Proposal Sent'
      };

      setFarmers(farmers.map(f => f.id === scanResult.farmerId ? updatedFarmer : f));
      setSelectedFarmerForDashboard(updatedFarmer);
      setEditFarmerForm(updatedFarmer);
      setFarmerModuleTab('proposal');

      showToast(`Proposal sent to ${centerObj.inChargeName} (${centerObj.name})! Status: Pending`);
    } catch (err) {
      showToast('Proposal dispatched successfully');
    }
  };

  // Center In-Charge Accept Proposal Handler (Module 3 & 4)
  const handleAcceptProposal = (propId) => {
    const prop = proposals.find(p => p.id === propId);
    if (!prop) return;

    const updatedProps = proposals.map(p => p.id === propId ? { ...p, status: 'Accepted' } : p);
    setProposals(updatedProps);

    const updatedFarmer = { ...selectedFarmerForDashboard, cropStatus: 'Center Accepted', trackingStageIndex: 4 };
    setFarmers(farmers.map(f => f.id === prop.farmerId ? updatedFarmer : f));
    setSelectedFarmerForDashboard(updatedFarmer);
    setEditFarmerForm(updatedFarmer);

    const existingTrk = trackings.find(t => t.farmerId === prop.farmerId);
    if (!existingTrk) {
      const trkId = `TRK-${9000 + trackings.length + 1}`;
      const newTrk = {
        id: trkId,
        proposalId: prop.id,
        farmerId: prop.farmerId,
        farmerName: prop.farmerName,
        cropName: prop.cropName,
        quantity: `${prop.quantity.toLocaleString()} kg`,
        qualityCategory: prop.qualityCategory,
        centerName: prop.centerInCharge.name,
        inChargeName: prop.centerInCharge.inChargeName,
        currentStageIndex: 4,
        currentLocation: `${prop.centerInCharge.name}, ${prop.centerInCharge.location}`,
        currentStatus: `Proposal Accepted by ${prop.centerInCharge.inChargeName}. Awaiting logistics dispatch.`,
        stageLogs: TRACKING_STAGES.map((stgName, idx) => ({
          stage: stgName,
          time: idx <= 4 ? new Date().toLocaleString([], { dateStyle: 'short', timeStyle: 'short' }) : 'Pending',
          actor: idx === 0 ? 'Volunteer Gurpreet' : idx === 1 ? 'Auto-Engine' : idx === 2 ? 'Volunteer Gurpreet' : idx === 3 ? prop.centerInCharge.inChargeName : 'Logistics Team',
          status: idx < 4 ? 'Completed' : idx === 4 ? 'Active' : 'Pending',
          detail: idx === 4 ? `Proposal accepted by ${prop.centerInCharge.inChargeName}` : idx < 4 ? 'Completed stage' : 'Pending stage completion'
        }))
      };
      setTrackings([newTrk, ...trackings]);
    }

    setShowTrackingTimeline(true);
    showToast(`Proposal ${propId} Accepted! Live Crop Tracking System activated below.`);
  };

  // Advance Crop Tracking Stage Simulator (Module 4)
  const handleAdvanceTrackingStage = (farmerId) => {
    setTrackings(trackings.map(t => {
      if (t.farmerId === farmerId && t.currentStageIndex < TRACKING_STAGES.length - 1) {
        const nextIdx = t.currentStageIndex + 1;
        const nextStageName = TRACKING_STAGES[nextIdx];

        const updatedLogs = t.stageLogs.map((log, i) => {
          if (i < nextIdx) return { ...log, status: 'Completed' };
          if (i === nextIdx) return { ...log, status: 'Active', time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }), detail: `Currently at ${nextStageName}` };
          return log;
        });

        const updatedItem = {
          ...t,
          currentStageIndex: nextIdx,
          currentStatus: `Stage updated to: ${nextStageName}`,
          stageLogs: updatedLogs
        };

        setFarmers(farmers.map(f => f.id === farmerId ? { ...f, cropStatus: nextStageName, trackingStageIndex: nextIdx } : f));
        if (selectedFarmerForDashboard?.id === farmerId) {
          setSelectedFarmerForDashboard(prev => ({ ...prev, cropStatus: nextStageName, trackingStageIndex: nextIdx }));
        }

        return updatedItem;
      }
      return t;
    }));

    showToast('Crop tracking stage advanced successfully!');
  };

  // Helper to compute Category based on Expected Quantity:
  // <= 5000 kg -> Category A
  // 5001 - 10000 kg -> Category B
  // > 10000 kg -> Category C
  const getCategoryFromQuantity = (qtyVal) => {
    const num = typeof qtyVal === 'number' ? qtyVal : parseFloat(String(qtyVal).replace(/[^0-9.]/g, '')) || 0;
    if (num <= 5000) {
      return 'Category A';
    } else if (num >= 5001 && num <= 10000) {
      return 'Category B';
    } else {
      return 'Category C';
    }
  };

  const getProposalForFarmer = (farmer) => {
    if (!farmer) return proposals[0];
    const found = proposals.find(p => p.farmerId === farmer.id);
    if (found) return found;

    const qty = farmer.productionQuantity || farmer.expectedQuantity || 1000;
    const pricePerKg = farmer.pricePerKg || 24;
    const totalPrice = qty * pricePerKg;
    const catFull = getCategoryFromQuantity(qty);
    const catLetter = catFull.replace('Category ', '').trim();
    const center = QUALITY_CENTERS[catLetter] || QUALITY_CENTERS.A;

    return {
      id: `PROP-${100 + (farmers.findIndex(f => f.id === farmer.id) >= 0 ? farmers.findIndex(f => f.id === farmer.id) + 1 : proposals.length + 1)}`,
      farmerId: farmer.id,
      farmerName: farmer.name,
      cropName: farmer.cropType || 'Wheat',
      quantity: qty,
      pricePerKg: pricePerKg,
      totalPrice: totalPrice,
      qualityCategory: catLetter,
      qualityLevel: `Category ${catLetter} Verified`,
      submissionDate: farmer.submissionDate || new Date().toISOString().split('T')[0],
      status: farmer.cropStatus === 'Center Accepted' || farmer.cropStatus === 'Completed' ? 'Accepted' : 'Pending',
      centerInCharge: center,
      aiAnalysis: `Auto-allocated based on ${qty.toLocaleString()} kg quantity @ ₹${pricePerKg}/kg (Total ₹${totalPrice.toLocaleString('en-IN')}).`,
      assessmentDate: farmer.submissionDate || new Date().toISOString().split('T')[0]
    };
  };

  // FILTERED & SORTED FARMERS FOR DIRECTORY
  const filteredFarmers = farmers.filter(f => {
    const matchesSearch =
      f.name.toLowerCase().includes(farmerSearch.toLowerCase()) ||
      f.id.toLowerCase().includes(farmerSearch.toLowerCase()) ||
      f.village.toLowerCase().includes(farmerSearch.toLowerCase()) ||
      f.cropType.toLowerCase().includes(farmerSearch.toLowerCase());

    const farmerCat = getCategoryFromQuantity(f.productionQuantity || f.expectedQuantity);
    const matchesQuality = farmerQualityFilter === 'ALL' || farmerCat === farmerQualityFilter;
    const matchesStatus = farmerStatusFilter === 'ALL' || f.cropStatus === farmerStatusFilter;

    return matchesSearch && matchesQuality && matchesStatus;
  });

  const sortedFarmers = [...filteredFarmers].sort((a, b) => {
    if (farmerSort === 'NAME_ASC') return a.name.localeCompare(b.name);
    if (farmerSort === 'DATE_DESC') return new Date(b.submissionDate) - new Date(a.submissionDate);
    if (farmerSort === 'QTY_DESC') return b.productionQuantity - a.productionQuantity;
    if (farmerSort === 'AREA_DESC') return parseFloat(b.cultivatedArea) - parseFloat(a.cultivatedArea);
    return 0;
  });

  // Helper Badge Colors
  const getCategoryBadge = (category) => {
    switch (category) {
      case 'A':
      case 'Category A':
        return 'bg-emerald-50 text-emerald-800 border-emerald-300/80';
      case 'B':
      case 'Category B':
        return 'bg-amber-50 text-amber-900 border-amber-300/80';
      case 'C':
      case 'Category C':
        return 'bg-rose-50 text-rose-900 border-rose-300/80';
      default:
        return 'bg-slate-50 text-slate-700 border-slate-300/80';
    }
  };

  const getCropStatusBadge = (status) => {
    switch (status) {
      case 'Pending Check':
        return {
          bg: 'bg-sky-50 text-sky-800 border-sky-300/80',
          dot: 'bg-sky-500'
        };
      case 'Processing':
        return {
          bg: 'bg-blue-50 text-blue-800 border-blue-300/80',
          dot: 'bg-blue-500 animate-pulse'
        };
      case 'Proposal Sent':
        return {
          bg: 'bg-amber-50 text-amber-900 border-amber-300/80',
          dot: 'bg-amber-500'
        };
      case 'Center Accepted':
        return {
          bg: 'bg-purple-50 text-purple-900 border-purple-300/80',
          dot: 'bg-purple-500'
        };
      case 'Completed':
        return {
          bg: 'bg-emerald-50 text-emerald-800 border-emerald-300/80',
          dot: 'bg-emerald-500'
        };
      case 'Rejected':
        return {
          bg: 'bg-rose-50 text-rose-800 border-rose-300/80',
          dot: 'bg-rose-500'
        };
      case 'Waiting List':
        return {
          bg: 'bg-orange-50 text-orange-900 border-orange-300/80',
          dot: 'bg-orange-500'
        };
      default:
        return {
          bg: 'bg-slate-50 text-slate-700 border-slate-300/80',
          dot: 'bg-slate-400'
        };
    }
  };

  return (
    <div className="min-h-screen bg-slate-50 text-slate-900 flex flex-col justify-between selection:bg-emerald-100 selection:text-emerald-900">

      {/* HEADER BAR — TOP NAVIGATION WITH 2 MAIN TABS */}
      <header className="bg-[#00a86b] text-white py-3.5 px-4 sm:px-8 relative z-40 shadow-md">
        <div className="max-w-7xl mx-auto flex items-center justify-between">

          <div className="flex items-center space-x-3">
            <button
              onClick={() => {
                if (selectedFarmerForDashboard) {
                  setSelectedFarmerForDashboard(null);
                } else {
                  navigateTo('home');
                }
              }}
              className="p-1.5 rounded-xl bg-[#008f5a] hover:bg-[#007d4f] text-white transition-colors"
              title="Return"
            >
              <ArrowLeft className="w-4 h-4" />
            </button>
            <div className="w-8.5 h-8.5 rounded-full bg-white text-[#00a86b] flex items-center justify-center font-bold shadow-xs">
              <Sprout className="w-5 h-5" />
            </div>
            <div>
              <span className="text-sm font-black text-white block leading-none tracking-tight">{t("Smart & Fair Platform")}</span>
              <span className="text-[9px] text-emerald-200 uppercase tracking-widest font-bold mt-0.5 block">
                {selectedFarmerForDashboard ? `Farmer Dashboard • ${selectedFarmerForDashboard.name}` : activeTab === 'Dashboard' ? 'Dashboard Overview' : 'Farmers Directory'}
              </span>
            </div>
          </div>

          {/* TOP-LEVEL TABS */}
          <div className="hidden sm:flex items-center space-x-1 text-xs font-bold bg-[#008f5a] p-1.5 rounded-2xl border border-white/20 shadow-inner">
            {[
              { id: 'Dashboard', label: 'Dashboard Overview' },
              { id: 'Farmers', label: 'Farmers Directory' }
            ].map((tab) => (
              <button
                key={tab.id}
                onClick={() => {
                  setActiveTab(tab.id);
                  if (tab.id === 'Dashboard') setSelectedFarmerForDashboard(null);
                }}
                className={`px-4 py-2 rounded-xl transition-all ${activeTab === tab.id
                  ? 'bg-white text-[#00a86b] shadow-sm font-extrabold'
                  : 'text-emerald-100 hover:text-white hover:bg-[#007d4f]'
                  }`}
              >
                {tab.label}
              </button>
            ))}
          </div>

          {/* VOLUNTEER PROFILE & LOGOUT */}
          <div className="flex items-center space-x-3">
            <div className="hidden sm:flex flex-col text-right">
              <span className="text-xs font-bold text-white">{volunteerName}</span>
              <span className="text-[10px] text-emerald-200">{t("Authorized Volunteer •")}{volunteerMandal}</span>
            </div>
            <button
              onClick={() => {
                showToast('Logged out of Volunteer session');
                navigateTo('login');
              }}
              className="flex items-center space-x-1 px-3 py-1.5 rounded-xl bg-[#008f5a] hover:bg-[#007d4f] text-white text-xs font-bold transition-colors"
            >
              <LogOut className="w-3.5 h-3.5" />
              <span className="hidden sm:inline">{t("Logout")}</span>
            </button>
          </div>

        </div>
      </header>

      {/* MOBILE HEADER TABS */}
      <div className="sm:hidden bg-[#008f5a] text-white px-2 py-2 flex items-center justify-center space-x-2 text-xs font-bold shadow-xs">
        {[
          { id: 'Dashboard', label: 'Dashboard Overview' },
          { id: 'Farmers', label: 'Farmers Directory' }
        ].map((tab) => (
          <button
            key={tab.id}
            onClick={() => {
              setActiveTab(tab.id);
              if (tab.id === 'Dashboard') setSelectedFarmerForDashboard(null);
            }}
            className={`px-4 py-1.5 rounded-lg ${activeTab === tab.id ? 'bg-white text-[#00a86b] font-extrabold' : 'text-emerald-200'
              }`}
          >
            {tab.label}
          </button>
        ))}
      </div>

      {/* MAIN CONTAINER */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 w-full space-y-8 my-auto">

        {/* ========================================================================= */}
        {/* 1. DASHBOARD OVERVIEW — KPI STATS & CHARTS                               */}
        {/* ========================================================================= */}
        {activeTab === 'Dashboard' && (
          <div className="space-y-8">

            {/* HERO WELCOME BANNER */}
            <div className="bg-white rounded-3xl p-6 sm:p-8 border border-slate-200 shadow-xs flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
              <div className="space-y-1">
                <div className="flex items-center space-x-2">
                  <span className="text-[10px] font-black text-emerald-800 bg-emerald-100 px-2.5 py-0.5 rounded-full uppercase tracking-wider">{t("VOLUNTEER DASHBOARD")}</span>
                  <span className="text-xs text-slate-400 font-semibold">• {volunteerMandal}, {volunteerDistrict}</span>
                </div>
                <h1 className="text-2xl sm:text-3xl font-black text-slate-900">{t("Procurement Mitra Dashboard")}</h1>
                <p className="text-xs text-slate-500 font-medium max-w-2xl">{t("Overview of live crop procurement network, farmer registrations, center allocations, and real-time status updates.")}</p>
              </div>

              <button
                onClick={() => {
                  setActiveTab('Farmers');
                  setSelectedFarmerForDashboard(null);
                  setShowAddFarmerModal(true);
                }}
                className="flex items-center space-x-1.5 px-5 py-3 rounded-2xl bg-[#00a86b] text-white text-xs font-bold shadow-md hover:bg-[#008f5a] transition-all transform active:scale-98 flex-shrink-0"
              >
                <Plus className="w-4.5 h-4.5" />
                <span>{t("+ Register New Farmer")}</span>
              </button>
            </div>

            {/* KPI STAT CARDS */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">

              <div
                onClick={() => {
                  setActiveTab('Farmers');
                  setSelectedFarmerForDashboard(null);
                }}
                className="bg-white p-5 rounded-3xl border border-slate-200 shadow-xs hover:border-[#00a86b] transition-all cursor-pointer space-y-2 group"
              >
                <div className="flex items-center justify-between">
                  <span className="text-xs font-bold text-slate-500 uppercase tracking-wider">{t("Registered Farmers")}</span>
                  <div className="w-9 h-9 rounded-2xl bg-emerald-100 text-[#00a86b] flex items-center justify-center font-bold group-hover:scale-110 transition-transform">
                    <Users className="w-4.5 h-4.5" />
                  </div>
                </div>
                <div className="text-3xl font-black text-slate-900">{totalRegisteredFarmers}</div>
                <span className="text-[10px] text-emerald-700 font-bold block">{t("Across")}{volunteerMandal}{t("Villages")}</span>
              </div>

              <div
                onClick={() => {
                  setActiveTab('Farmers');
                  setSelectedFarmerForDashboard(null);
                }}
                className="bg-white p-5 rounded-3xl border border-slate-200 shadow-xs hover:border-[#00a86b] transition-all cursor-pointer space-y-2 group"
              >
                <div className="flex items-center justify-between">
                  <span className="text-xs font-bold text-slate-500 uppercase tracking-wider">{t("Crops Submitted")}</span>
                  <div className="w-9 h-9 rounded-2xl bg-blue-100 text-blue-800 flex items-center justify-center font-bold group-hover:scale-110 transition-transform">
                    <Sprout className="w-4.5 h-4.5" />
                  </div>
                </div>
                <div className="text-3xl font-black text-slate-900">{totalCropsSubmitted}{t("Batches")}</div>
                <span className="text-[10px] text-blue-700 font-bold block">{totalProductionQuantityKg.toLocaleString()}{t("kg Total Yield")}</span>
              </div>

              <div
                onClick={() => {
                  setActiveTab('Farmers');
                  setSelectedFarmerForDashboard(null);
                }}
                className="bg-white p-5 rounded-3xl border border-slate-200 shadow-xs hover:border-[#00a86b] transition-all cursor-pointer space-y-2 group"
              >
                <div className="flex items-center justify-between">
                  <span className="text-xs font-bold text-slate-500 uppercase tracking-wider">{t("Pending Checks")}</span>
                  <div className="w-9 h-9 rounded-2xl bg-amber-100 text-amber-800 flex items-center justify-center font-bold group-hover:scale-110 transition-transform">
                    <Sparkles className="w-4.5 h-4.5" />
                  </div>
                </div>
                <div className="text-3xl font-black text-amber-700">{pendingQualityChecks}</div>
                <span className="text-[10px] text-amber-800 font-bold block">{t("Awaiting Category Allocation")}</span>
              </div>

              <div
                onClick={() => {
                  setActiveTab('Farmers');
                  setSelectedFarmerForDashboard(null);
                }}
                className="bg-white p-5 rounded-3xl border border-slate-200 shadow-xs hover:border-[#00a86b] transition-all cursor-pointer space-y-2 group"
              >
                <div className="flex items-center justify-between">
                  <span className="text-xs font-bold text-slate-500 uppercase tracking-wider">{t("Accepted Proposals")}</span>
                  <div className="w-9 h-9 rounded-2xl bg-purple-100 text-purple-800 flex items-center justify-center font-bold group-hover:scale-110 transition-transform">
                    <CheckCircle2 className="w-4.5 h-4.5" />
                  </div>
                </div>
                <div className="text-3xl font-black text-slate-900">
                  {acceptedProposals} <span className="text-xs text-emerald-600 font-bold">/ {proposals.length}{t("Accepted")}</span>
                </div>
                <span className="text-[10px] text-purple-800 font-bold block">{pendingProposals}{t("Proposals Pending")}</span>
              </div>

            </div>

            {/* CHARTS & ANALYTICS */}
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">

              <div className="lg:col-span-2 bg-white rounded-3xl p-6 border border-slate-200 shadow-xs space-y-4">
                <div className="flex items-center justify-between pb-3 border-b border-slate-100">
                  <div>
                    <h3 className="text-base font-black text-slate-900">{t("Crop Production Statistics & Monthly Yield")}</h3>
                    <p className="text-xs text-slate-500 font-medium">{t("Monthly crop volume harvested and submitted in")}{volunteerMandal}{t("(in Quintals)")}</p>
                  </div>
                  <span className="text-xs font-bold text-emerald-800 bg-emerald-100 px-3 py-1 rounded-full border border-emerald-200">{t("Active Season 2026")}</span>
                </div>

                <div className="h-64 w-full pt-4">
                  <svg className="w-full h-full overflow-visible" viewBox="0 0 500 200">
                    <line x1="40" y1="20" x2="480" y2="20" stroke="#f1f5f9" strokeWidth="1" />
                    <line x1="40" y1="60" x2="480" y2="60" stroke="#f1f5f9" strokeWidth="1" />
                    <line x1="40" y1="100" x2="480" y2="100" stroke="#f1f5f9" strokeWidth="1" />
                    <line x1="40" y1="140" x2="480" y2="140" stroke="#f1f5f9" strokeWidth="1" />
                    <line x1="40" y1="170" x2="480" y2="170" stroke="#cbd5e1" strokeWidth="1.5" />

                    <text x="30" y="24" textAnchor="end" className="text-[10px] fill-slate-400 font-bold">{t("50 Q")}</text>
                    <text x="30" y="64" textAnchor="end" className="text-[10px] fill-slate-400 font-bold">{t("35 Q")}</text>
                    <text x="30" y="104" textAnchor="end" className="text-[10px] fill-slate-400 font-bold">{t("20 Q")}</text>
                    <text x="30" y="144" textAnchor="end" className="text-[10px] fill-slate-400 font-bold">{t("10 Q")}</text>
                    <text x="30" y="174" textAnchor="end" className="text-[10px] fill-slate-400 font-bold">{t("0 Q")}</text>

                    <rect x="70" y="110" width="36" height="60" rx="6" className="fill-emerald-200 hover:fill-emerald-300 transition-all cursor-pointer" />
                    <text x="88" y="104" textAnchor="middle" className="text-[10px] fill-slate-600 font-extrabold">15</text>
                    <text x="88" y="188" textAnchor="middle" className="text-[10px] fill-slate-500 font-bold">{t("Mar")}</text>

                    <rect x="140" y="70" width="36" height="100" rx="6" className="fill-emerald-400 hover:fill-emerald-500 transition-all cursor-pointer" />
                    <text x="158" y="64" textAnchor="middle" className="text-[10px] fill-slate-600 font-extrabold">30</text>
                    <text x="158" y="188" textAnchor="middle" className="text-[10px] fill-slate-500 font-bold">{t("Apr")}</text>

                    <rect x="210" y="40" width="36" height="130" rx="6" className="fill-[#00a86b] hover:fill-emerald-900 transition-all cursor-pointer" />
                    <text x="228" y="34" textAnchor="middle" className="text-[10px] fill-[#00a86b] font-black">42</text>
                    <text x="228" y="188" textAnchor="middle" className="text-[10px] fill-slate-500 font-bold">{t("May")}</text>

                    <rect x="280" y="85" width="36" height="85" rx="6" className="fill-emerald-300 hover:fill-emerald-400 transition-all cursor-pointer" />
                    <text x="298" y="79" textAnchor="middle" className="text-[10px] fill-slate-600 font-extrabold">24</text>
                    <text x="298" y="188" textAnchor="middle" className="text-[10px] fill-slate-500 font-bold">{t("Jun")}</text>

                    <rect x="350" y="55" width="36" height="115" rx="6" className="fill-emerald-600 hover:fill-emerald-700 transition-all cursor-pointer" />
                    <text x="368" y="49" textAnchor="middle" className="text-[10px] fill-slate-600 font-extrabold">36</text>
                    <text x="368" y="188" textAnchor="middle" className="text-[10px] fill-slate-500 font-bold">{t("Jul")}</text>

                    <rect x="420" y="30" width="36" height="140" rx="6" className="fill-[#00a86b] hover:fill-emerald-900 transition-all cursor-pointer" />
                    <text x="438" y="24" textAnchor="middle" className="text-[10px] fill-[#00a86b] font-black">48</text>
                    <text x="438" y="188" textAnchor="middle" className="text-[10px] fill-slate-500 font-bold">{t("Aug")}</text>
                  </svg>
                </div>
              </div>

              <div className="bg-white rounded-3xl p-6 border border-slate-200 shadow-xs space-y-4 flex flex-col justify-between">
                <div className="pb-3 border-b border-slate-100">
                  <h3 className="text-base font-black text-slate-900">{t("Center Capacity Dashboard")}</h3>
                  <p className="text-xs text-slate-500 font-medium">{t("Real-time availability across A, B & C Collection Centers")}</p>
                </div>

                <div className="space-y-4 my-auto py-1">
                  {/* A CENTER */}
                  <div className="bg-slate-50 p-3 rounded-2xl border border-slate-200/80 space-y-1.5">
                    <div className="flex items-center justify-between text-xs font-bold">
                      <span className="text-emerald-900 font-black">{t("A CENTER (Priority)")}</span>
                      <span className="px-2 py-0.5 rounded-md text-[10px] font-black bg-emerald-100 text-emerald-800 border border-emerald-300">
                        {centerCapacities.A.status} ({centerCapacities.A.fillPercentage}{t("% Full)")}</span>
                    </div>
                    <div className="w-full h-2.5 bg-slate-200 rounded-full overflow-hidden">
                      <div className="h-full bg-emerald-600 rounded-full transition-all duration-500" style={{ width: `${centerCapacities.A.fillPercentage}%` }} />
                    </div>
                    <div className="flex justify-between text-[11px] text-slate-500 font-semibold pt-0.5">
                      <span>{t("Stock:")}{centerCapacities.A.currentStockKg.toLocaleString()}{t("kg")}</span>
                      <span className="text-emerald-700 font-extrabold">{t("Available:")}{centerCapacities.A.availableKg.toLocaleString()}{t("kg")}</span>
                    </div>
                  </div>

                  {/* B CENTER */}
                  <div className="bg-slate-50 p-3 rounded-2xl border border-slate-200/80 space-y-1.5">
                    <div className="flex items-center justify-between text-xs font-bold">
                      <span className="text-amber-900 font-black">{t("B CENTER (Secondary)")}</span>
                      <span className="px-2 py-0.5 rounded-md text-[10px] font-black bg-amber-100 text-amber-800 border border-amber-300">
                        {centerCapacities.B.status} ({centerCapacities.B.fillPercentage}{t("% Full)")}</span>
                    </div>
                    <div className="w-full h-2.5 bg-slate-200 rounded-full overflow-hidden">
                      <div className="h-full bg-amber-500 rounded-full transition-all duration-500" style={{ width: `${centerCapacities.B.fillPercentage}%` }} />
                    </div>
                    <div className="flex justify-between text-[11px] text-slate-500 font-semibold pt-0.5">
                      <span>{t("Stock:")}{centerCapacities.B.currentStockKg.toLocaleString()}{t("kg")}</span>
                      <span className="text-amber-700 font-extrabold">{t("Available:")}{centerCapacities.B.availableKg.toLocaleString()}{t("kg")}</span>
                    </div>
                  </div>

                  {/* C CENTER */}
                  <div className="bg-slate-50 p-3 rounded-2xl border border-slate-200/80 space-y-1.5">
                    <div className="flex items-center justify-between text-xs font-bold">
                      <span className="text-red-900 font-black">{t("C CENTER (Overflow)")}</span>
                      <span className="px-2 py-0.5 rounded-md text-[10px] font-black bg-red-100 text-red-800 border border-red-300">
                        {centerCapacities.C.status} ({centerCapacities.C.fillPercentage}{t("% Full)")}</span>
                    </div>
                    <div className="w-full h-2.5 bg-slate-200 rounded-full overflow-hidden">
                      <div className="h-full bg-red-500 rounded-full transition-all duration-500" style={{ width: `${centerCapacities.C.fillPercentage}%` }} />
                    </div>
                    <div className="flex justify-between text-[11px] text-slate-500 font-semibold pt-0.5">
                      <span>{t("Stock:")}{centerCapacities.C.currentStockKg.toLocaleString()}{t("kg")}</span>
                      <span className="text-red-700 font-extrabold">{t("Available:")}{centerCapacities.C.availableKg.toLocaleString()}{t("kg")}</span>
                    </div>
                  </div>
                </div>

                <div className="pt-3 border-t border-slate-100 flex items-center justify-between text-xs font-bold text-slate-600">
                  <span>{t("Priority Sequence:")}</span>
                  <span className="text-[#00a86b] font-extrabold">{t("A CENTER → B CENTER → C CENTER")}</span>
                </div>
              </div>

            </div>

          </div>
        )}

        {/* ========================================================================= */}
        {/* 2. FARMERS DIRECTORY TAB — MAIN TABLE OR INDIVIDUAL FARMER DASHBOARD       */}
        {/* ========================================================================= */}
        {activeTab === 'Farmers' && (
          <div>

            {/* VIEW A: MAIN FARMER DIRECTORY TABLE (WHEN NO FARMER DASHBOARD IS OPEN) */}
            {!selectedFarmerForDashboard ? (
              <div className="space-y-6">

                {/* HERO BANNER */}
                <div className="bg-white rounded-3xl p-6 sm:p-8 border border-slate-200 shadow-xs flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
                  <div className="space-y-1">
                    <div className="flex items-center space-x-2">
                      <span className="text-[10px] font-black text-emerald-800 bg-emerald-100 px-2.5 py-0.5 rounded-full uppercase tracking-wider">{t("FARMERS DIRECTORY")}</span>
                      <span className="text-xs text-slate-400 font-semibold">• {volunteerMandal}, {volunteerDistrict}</span>
                    </div>
                    <h1 className="text-2xl sm:text-3xl font-black text-slate-900">{t("Registered Farmers Directory")}</h1>
                    <p className="text-xs text-slate-500 font-medium max-w-2xl">{t("View all registered farmers. Click")}<strong>{t("\"View Dashboard\"")}</strong>{t(
                      "for any farmer to open their dedicated dashboard containing registration details, center proposals, and live crop tracking."
                    )}</p>
                  </div>

                  <button
                    onClick={() => setShowAddFarmerModal(true)}
                    className="flex items-center space-x-1.5 px-5 py-3 rounded-2xl bg-[#00a86b] text-white text-xs font-bold shadow-md hover:bg-[#008f5a] transition-all transform active:scale-98 flex-shrink-0"
                  >
                    <Plus className="w-4.5 h-4.5" />
                    <span>{t("+ Register New Farmer")}</span>
                  </button>
                </div>

                {/* SEARCH, FILTER & SORT CONTROLS */}
                <div className="bg-white rounded-3xl p-5 border border-slate-200 shadow-xs space-y-4">
                  <div className="flex items-center justify-between">
                    <h2 className="text-sm font-black text-slate-900 uppercase tracking-wider">{t("Search, Filter & Sort Farmers")}</h2>
                    <span className="text-xs text-slate-500 font-bold">{t("Showing")}<strong className="text-[#00a86b]">{sortedFarmers.length}</strong>{t("of")}{farmers.length}{t("Farmers")}</span>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-4 gap-3 bg-slate-50 p-3.5 rounded-2xl border border-slate-200 text-xs">

                    {/* Search */}
                    <div className="relative sm:col-span-1">
                      <Search className="w-4 h-4 absolute left-3.5 top-3 text-slate-400" />
                      <input
                        type="text"
                        value={farmerSearch}
                        onChange={(e) => setFarmerSearch(e.target.value)}
                        placeholder="Search Name, ID, Village, Crop..."
                        className="w-full pl-9 pr-3 py-2 bg-white rounded-xl border border-slate-200 font-semibold text-slate-900 focus:ring-2 focus:ring-[#00a86b] focus:outline-none"
                      />
                    </div>

                    {/* Filter Category */}
                    <div className="flex items-center space-x-2">
                      <Filter className="w-4 h-4 text-slate-400 flex-shrink-0" />
                      <select
                        value={farmerQualityFilter}
                        onChange={(e) => setFarmerQualityFilter(e.target.value)}
                        className="w-full py-2 px-3 bg-white rounded-xl border border-slate-200 font-bold text-slate-800"
                      >
                        <option value="ALL">{t("All Categories")}</option>
                        <option value="Category A">{t("Category A (≤ 5,000 kg)")}</option>
                        <option value="Category B">{t("Category B (5,001 - 10,000 kg)")}</option>
                        <option value="Category C">{t("Category C (> 10,000 kg)")}</option>
                      </select>
                    </div>

                    {/* Filter Status */}
                    <div>
                      <select
                        value={farmerStatusFilter}
                        onChange={(e) => setFarmerStatusFilter(e.target.value)}
                        className="w-full py-2 px-3 bg-white rounded-xl border border-slate-200 font-bold text-slate-800"
                      >
                        <option value="ALL">{t("All Crop Statuses")}</option>
                        <option value="Proposal Sent">{t("Proposal Sent")}</option>
                        <option value="Center Accepted">{t("Center Accepted")}</option>
                        <option value="Processing">{t("Processing")}</option>
                        <option value="Completed">{t("Completed")}</option>
                      </select>
                    </div>

                    {/* Sort */}
                    <div className="flex items-center space-x-2">
                      <ArrowUpDown className="w-4 h-4 text-slate-400 flex-shrink-0" />
                      <select
                        value={farmerSort}
                        onChange={(e) => setFarmerSort(e.target.value)}
                        className="w-full py-2 px-3 bg-white rounded-xl border border-slate-200 font-bold text-slate-800"
                      >
                        <option value="DATE_DESC">{t("Sort: Newest First")}</option>
                        <option value="NAME_ASC">{t("Sort: Farmer Name (A-Z)")}</option>
                        <option value="QTY_DESC">{t("Sort: Produced Qty (High-Low)")}</option>
                        <option value="AREA_DESC">{t("Sort: Cultivated Area (High-Low)")}</option>
                      </select>
                    </div>

                  </div>
                </div>

                {/* FARMERS DIRECTORY TABLE */}
                <div className="bg-white rounded-3xl p-6 border border-slate-200 shadow-xs space-y-4">
                  <div className="overflow-x-auto">
                    <table className="w-full text-left text-xs">
                      <thead>
                        <tr className="border-b border-slate-200 text-slate-400 font-bold uppercase text-[10px]">
                          <th className="py-3.5 px-3 whitespace-nowrap">{t("Farmer ID")}</th>
                          <th className="py-3.5 px-3 whitespace-nowrap">{t("Farmer Name")}</th>
                          <th className="py-3.5 px-3 whitespace-nowrap">{t("Contact Number")}</th>
                          <th className="py-3.5 px-3 whitespace-nowrap">{t("Village / Location")}</th>
                          <th className="py-3.5 px-3 whitespace-nowrap">{t("Crop Name")}</th>
                          <th className="py-3.5 px-3 whitespace-nowrap">{t("Cultivated Area")}</th>
                          <th className="py-3.5 px-3 whitespace-nowrap">{t("Expected Qty")}</th>
                          <th className="py-3.5 px-3 whitespace-nowrap">{t("Registration Date")}</th>
                          <th className="py-3.5 px-3 whitespace-nowrap">{t("Category")}</th>
                          <th className="py-3.5 px-3 whitespace-nowrap">{t("Crop Status")}</th>
                          <th className="py-3.5 px-3 text-right whitespace-nowrap">{t("Action")}</th>
                        </tr>
                      </thead>
                      <tbody className="divide-y divide-slate-100 font-semibold text-slate-800">
                        {sortedFarmers.map((farmer) => (
                          <tr key={farmer.id} className="hover:bg-slate-50/80 transition-colors">

                            <td className="py-4 px-3 font-mono font-black text-[#00a86b] whitespace-nowrap">{farmer.id}</td>
                            <td className="py-4 px-3 font-black text-slate-900 text-sm whitespace-nowrap">{farmer.name}</td>
                            <td className="py-4 px-3 text-slate-600 font-bold whitespace-nowrap">{t("+91")}{farmer.mobile}</td>

                            <td className="py-4 px-3">
                              <span className="font-bold text-slate-900 block whitespace-nowrap">{farmer.village}</span>
                              <span className="text-[10px] text-slate-400 block whitespace-nowrap">{farmer.panchayat}, {farmer.district}</span>
                            </td>

                            <td className="py-4 px-3 font-extrabold text-slate-900 whitespace-nowrap">{farmer.cropType}</td>
                            <td className="py-4 px-3 text-emerald-800 font-bold whitespace-nowrap">{farmer.cultivatedArea}</td>

                            <td className="py-4 px-3 font-black text-slate-900 whitespace-nowrap">
                              {farmer.productionQuantity.toLocaleString()}{t("kg")}</td>

                            <td className="py-4 px-3 text-slate-500 whitespace-nowrap">{farmer.submissionDate}</td>

                            <td className="py-4 px-3 whitespace-nowrap">
                              {(() => {
                                const catName = getCategoryFromQuantity(farmer.productionQuantity || farmer.expectedQuantity);
                                return (
                                  <span className={`inline-flex items-center gap-1.5 text-[11px] font-bold px-2.5 py-1 rounded-full border whitespace-nowrap shadow-2xs ${getCategoryBadge(catName)}`}>
                                    <span className="w-1.5 h-1.5 rounded-full bg-current opacity-75" />
                                    {catName}
                                  </span>
                                );
                              })()}
                            </td>

                            <td className="py-4 px-3 whitespace-nowrap">
                              {(() => {
                                const statusStyle = getCropStatusBadge(farmer.cropStatus);
                                return (
                                  <span className={`inline-flex items-center gap-1.5 text-[11px] font-extrabold px-2.5 py-1 rounded-full border whitespace-nowrap shadow-2xs ${statusStyle.bg}`}>
                                    <span className={`w-1.5 h-1.5 rounded-full ${statusStyle.dot}`} />
                                    {farmer.cropStatus}
                                  </span>
                                );
                              })()}
                            </td>

                            {/* ACTION BUTTON TO OPEN FARMER DASHBOARD */}
                            <td className="py-4 px-3 text-right whitespace-nowrap">
                              <button
                                onClick={() => handleOpenFarmerDashboard(farmer)}
                                className="px-3.5 py-2 rounded-xl bg-[#00a86b] text-white font-bold text-xs hover:bg-[#008f5a] transition-all inline-flex items-center space-x-1.5 shadow-xs transform active:scale-98"
                              >
                                <Eye className="w-3.5 h-3.5 text-emerald-200" />
                                <span>{t("View Dashboard →")}</span>
                              </button>
                            </td>

                          </tr>
                        ))}
                      </tbody>
                    </table>

                    {sortedFarmers.length === 0 && (
                      <div className="py-12 text-center space-y-2">
                        <User className="w-8 h-8 text-slate-300 mx-auto" />
                        <p className="text-xs font-bold text-slate-500">{t("No farmers found matching your search or filter criteria.")}</p>
                      </div>
                    )}
                  </div>
                </div>

              </div>
            ) : (

              /* VIEW B: INDIVIDUAL FARMER DASHBOARD PAGE WITH 4 EMBEDDED MODULES */
              <div className="space-y-8 animate-fade-in">

                {/* Back Button & Top Header */}
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 bg-white p-4 rounded-3xl border border-slate-200 shadow-xs">
                  <button
                    onClick={() => {
                      setSelectedFarmerForDashboard(null);
                    }}
                    className="flex items-center space-x-2 text-xs font-bold text-[#00a86b] hover:bg-emerald-50 px-4 py-2 rounded-xl border border-emerald-200 transition-all w-fit"
                  >
                    <ArrowLeft className="w-4 h-4" />
                    <span>{t("← Back to Registered Farmers Directory")}</span>
                  </button>

                  <div className="flex items-center space-x-2">
                    <span className="text-xs font-bold text-slate-500">{t("INDIVIDUAL FARMER DASHBOARD")}</span>
                    <span className="text-[10px] font-black text-emerald-800 bg-emerald-100 px-3 py-1 rounded-full uppercase border border-emerald-200">{t("ID:")}{selectedFarmerForDashboard.id}
                    </span>
                  </div>
                </div>

                {/* THE 4 INNER MODULES (EMBEDDED INSIDE INDIVIDUAL FARMER DASHBOARD) */}
                <div className="bg-white rounded-3xl p-6 sm:p-8 border border-slate-200 shadow-xs space-y-6">

                  {/* FARMER REGISTRATION FORM INFORMATION & CENTER PROPOSAL ALLOCATION */}
                  {editFarmerForm && (
                    <div className="space-y-8">
                      <div className="pb-3 border-b border-slate-100">
                        <h3 className="text-lg font-black text-slate-900">{t("Farmer Registration Form Information")}</h3>
                        <p className="text-xs text-slate-500 font-medium">{t("View and update registration details for")}{selectedFarmerForDashboard.name}.</p>
                      </div>

                      <form onSubmit={handleUpdateFarmerDetails} className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs font-semibold">
                        <div>
                          <label className="block text-slate-700 font-bold mb-1">{t("Farmer ID (Read Only)")}</label>
                          <input type="text" value={editFarmerForm.id} disabled className="w-full px-3.5 py-2.5 bg-slate-100 rounded-xl border border-slate-200 text-slate-500 font-mono font-bold" />
                        </div>

                        <div>
                          <label className="block text-slate-700 font-bold mb-1">{t("Farmer Full Name *")}</label>
                          <input
                            type="text"
                            value={editFarmerForm.name}
                            onChange={(e) => setEditFarmerForm({ ...editFarmerForm, name: e.target.value })}
                            className="w-full px-3.5 py-2.5 bg-white rounded-xl border border-slate-200 text-slate-900 font-bold focus:ring-2 focus:ring-[#00a86b] focus:outline-none"
                          />
                        </div>

                        <div>
                          <label className="block text-slate-700 font-bold mb-1">{t("Contact Phone Number *")}</label>
                          <input
                            type="tel"
                            maxLength={10}
                            value={editFarmerForm.mobile}
                            onChange={(e) => setEditFarmerForm({ ...editFarmerForm, mobile: e.target.value })}
                            className="w-full px-3.5 py-2.5 bg-white rounded-xl border border-slate-200 text-slate-900 font-bold focus:ring-2 focus:ring-[#00a86b] focus:outline-none"
                          />
                        </div>

                        <div>
                          <label className="block text-slate-700 font-bold mb-1">{t("Email Address")}</label>
                          <input
                            type="email"
                            value={editFarmerForm.email}
                            onChange={(e) => setEditFarmerForm({ ...editFarmerForm, email: e.target.value })}
                            className="w-full px-3.5 py-2.5 bg-white rounded-xl border border-slate-200 text-slate-900"
                          />
                        </div>

                        <div>
                          <label className="block text-slate-700 font-bold mb-1">{t("Village Name")}</label>
                          <input
                            type="text"
                            value={editFarmerForm.village}
                            onChange={(e) => setEditFarmerForm({ ...editFarmerForm, village: e.target.value })}
                            className="w-full px-3.5 py-2.5 bg-white rounded-xl border border-slate-200 text-slate-900"
                          />
                        </div>

                        <div>
                          <label className="block text-slate-700 font-bold mb-1">{t("Gram Panchayat")}</label>
                          <input
                            type="text"
                            value={editFarmerForm.panchayat || ''}
                            onChange={(e) => setEditFarmerForm({ ...editFarmerForm, panchayat: e.target.value })}
                            className="w-full px-3.5 py-2.5 bg-white rounded-xl border border-slate-200 text-slate-900"
                          />
                        </div>

                        <div>
                          <label className="block text-slate-700 font-bold mb-1">{t("Mandal / Tehsil")}</label>
                          <input
                            type="text"
                            value={editFarmerForm.mandal || ''}
                            onChange={(e) => setEditFarmerForm({ ...editFarmerForm, mandal: e.target.value })}
                            className="w-full px-3.5 py-2.5 bg-white rounded-xl border border-slate-200 text-slate-900"
                          />
                        </div>

                        <div>
                          <label className="block text-slate-700 font-bold mb-1">{t("Crop Variety")}</label>
                          <input
                            type="text"
                            value={editFarmerForm.cropType || ''}
                            onChange={(e) => setEditFarmerForm({ ...editFarmerForm, cropType: e.target.value })}
                            className="w-full px-3.5 py-2.5 bg-white rounded-xl border border-slate-200 text-slate-900 font-bold"
                          />
                        </div>

                        <div>
                          <label className="block text-slate-700 font-bold mb-1">{t("Cultivated Landholding Area")}</label>
                          <input
                            type="text"
                            value={editFarmerForm.cultivatedArea || ''}
                            onChange={(e) => setEditFarmerForm({ ...editFarmerForm, cultivatedArea: e.target.value })}
                            className="w-full px-3.5 py-2.5 bg-white rounded-xl border border-slate-200 text-slate-900"
                          />
                        </div>

                        <div>
                          <label className="block text-slate-700 font-bold mb-1">{t("Produced Crop Quantity (Kg)")}</label>
                          <input
                            type="number"
                            value={editFarmerForm.productionQuantity ?? ''}
                            onChange={(e) => setEditFarmerForm({ ...editFarmerForm, productionQuantity: e.target.value === '' ? '' : Number(e.target.value) })}
                            className="w-full px-3.5 py-2.5 bg-white rounded-xl border border-slate-200 text-slate-900 font-black text-sm"
                          />
                        </div>

                        <div>
                          <label className="block text-slate-700 font-bold mb-1">{t("Offered Price per Kg (₹) *")}</label>
                          <input
                            type="number"
                            min="1"
                            step="0.5"
                            value={editFarmerForm.pricePerKg ?? 24}
                            onChange={(e) => setEditFarmerForm({ ...editFarmerForm, pricePerKg: e.target.value === '' ? '' : Number(e.target.value) })}
                            className="w-full px-3.5 py-2.5 bg-white rounded-xl border border-slate-200 text-slate-900 font-extrabold text-sm focus:ring-2 focus:ring-[#00a86b] focus:outline-none"
                          />
                        </div>

                        <div className="md:col-span-2">
                          <label className="block text-slate-700 font-bold mb-1">{t("Total Calculated Crop Price (₹)")}</label>
                          <div className="w-full px-3.5 py-2.5 bg-emerald-50 rounded-xl border border-emerald-200 text-[#00a86b] font-black text-base flex items-center justify-between shadow-2xs">
                            <span>₹{((Number(editFarmerForm.productionQuantity) || 0) * (Number(editFarmerForm.pricePerKg) || 24)).toLocaleString('en-IN')}</span>
                            <span className="text-[10px] text-emerald-800 bg-emerald-100 px-2.5 py-0.5 rounded-full font-extrabold uppercase tracking-wider">{t("Auto Calculated (Qty × Rate)")}</span>
                          </div>
                        </div>

                        <div className="md:col-span-2 pt-2">
                          <button
                            type="submit"
                            className="px-6 py-3 rounded-2xl bg-[#00a86b] text-white font-black text-xs shadow-md hover:bg-[#008f5a] active:scale-95 transition-all flex items-center justify-center space-x-2 cursor-pointer"
                          >
                            <Send className="w-4 h-4" />
                            <span>{t("Send Registration Info")}</span>
                          </button>
                        </div>
                      </form>

                      {/* INTEGRATED CENTER PROPOSAL ALLOCATION SECTION */}
                      <div className="pt-6 border-t border-slate-100 space-y-4">
                        <div className="pb-2 border-b border-slate-100">
                          <h4 className="text-base font-black text-slate-900">{t("Center Proposal Allocation")}</h4>
                          <p className="text-xs text-slate-500 font-medium">{t(
                            "Based on crop expected quantity category, proposals are automatically dispatched to the corresponding Center In-Charge (Category A → A-Center, Category B → B-Center, Category C → C-Center)."
                          )}</p>
                        </div>

                        {(() => {
                          const farmerProp = proposals.find(p => p.farmerId === selectedFarmerForDashboard.id) || getProposalForFarmer(selectedFarmerForDashboard);
                          if (!farmerProp) return null;
                          const center = farmerProp.centerInCharge || QUALITY_CENTERS.A;
                          const isAccepted = farmerProp.status === 'Accepted';

                          return (
                            <div className={`rounded-3xl p-6 border-2 space-y-6 ${isAccepted ? 'bg-emerald-50/40 border-emerald-300' : 'bg-white border-slate-200 shadow-xs'}`}>
                              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-slate-200">
                                <div>
                                  <div className="flex items-center space-x-2">
                                    <span className="text-xs font-mono font-black text-[#00a86b]">{farmerProp.id}</span>
                                    <span className="text-xs text-slate-400">{t("• Date:")}{farmerProp.submissionDate}</span>
                                  </div>
                                  <h4 className="text-base font-extrabold text-slate-900 mt-0.5">{t("Proposal for")}{farmerProp.cropName} ({farmerProp.quantity.toLocaleString()}{t("kg)")}</h4>
                                </div>

                                <div className="flex items-center space-x-3">
                                  <span className={`text-xs font-extrabold px-3.5 py-1 rounded-full border ${isAccepted ? 'bg-emerald-100 text-[#00a86b] border-emerald-300' : 'bg-amber-100 text-amber-900 border-amber-300'}`}>{t("● Proposal Status:")}{farmerProp.status.toUpperCase()}
                                  </span>

                                  {farmerProp.status === 'Pending' && (
                                    <button
                                      onClick={() => handleAcceptProposal(farmerProp.id)}
                                      className="px-4 py-2 rounded-xl bg-[#00a86b] text-white font-bold text-xs shadow-xs hover:bg-[#008f5a] flex items-center space-x-1"
                                    >
                                      <CheckCircle className="w-4 h-4 text-emerald-200" />
                                      <span>{t("Simulate Center In-Charge Acceptance")}</span>
                                    </button>
                                  )}
                                </div>
                              </div>

                              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 text-xs">
                                <div className="space-y-2.5 bg-slate-50 p-4 rounded-2xl border border-slate-200 font-semibold">
                                  <h5 className="font-extrabold text-slate-900 text-sm border-b border-slate-200 pb-1">{t("Proposal Harvest Details")}</h5>
                                  <div className="flex justify-between"><span className="text-slate-500">{t("Farmer Name:")}</span><span className="font-bold text-slate-900">{farmerProp.farmerName}</span></div>
                                  <div className="flex justify-between"><span className="text-slate-500">{t("Harvest Quantity:")}</span><span className="font-bold text-slate-900">{farmerProp.quantity.toLocaleString()}{t("kg")}</span></div>
                                  <div className="flex justify-between"><span className="text-slate-500">{t("Category Allocation:")}</span><span className="font-bold text-emerald-800">{getCategoryFromQuantity(farmerProp.quantity)}</span></div>
                                  <div className="flex justify-between"><span className="text-slate-500">{t("Price Rate per Kg:")}</span><span className="font-bold text-slate-900">₹{(farmerProp.pricePerKg || selectedFarmerForDashboard?.pricePerKg || 24).toFixed(2)}{t("/ kg")}</span></div>
                                  <div className="flex justify-between text-emerald-800 pt-1.5 border-t border-slate-200 font-black">
                                    <span className="text-slate-800 font-extrabold">{t("Total Crop Price / Payout:")}</span>
                                    <span className="text-sm font-black text-[#00a86b]">₹{((farmerProp.quantity || 0) * (farmerProp.pricePerKg || selectedFarmerForDashboard?.pricePerKg || 24)).toLocaleString('en-IN')}</span>
                                  </div>
                                  <div className="pt-2 text-[11px] text-slate-600 font-medium italic border-t border-slate-200">&quot;{farmerProp.aiAnalysis}&quot;</div>
                                </div>

                                <div className={`p-4.5 rounded-2xl border space-y-3 ${isAccepted ? 'bg-[#00a86b] text-white border-emerald-900' : 'bg-slate-50 border-slate-200'}`}>
                                  <div className="flex items-center justify-between border-b border-white/20 pb-1.5">
                                    <h5 className={`font-black text-sm ${isAccepted ? 'text-emerald-200' : 'text-slate-900'}`}>
                                      {getCategoryFromQuantity(farmerProp.quantity)}{t("Designated Collection Center")}</h5>
                                    {isAccepted && (
                                      <span className="text-[9px] font-black bg-white text-[#00a86b] px-2.5 py-0.5 rounded-full">{t("ACCEPTED & UNLOCKED ✓")}</span>
                                    )}
                                  </div>

                                  <div className="space-y-1.5 text-xs font-semibold">
                                    <span className={`font-black text-sm block ${isAccepted ? 'text-white' : 'text-slate-900'}`}>{center.name}</span>
                                    <div className="flex justify-between"><span className={isAccepted ? 'text-emerald-200' : 'text-slate-500'}>{t("Center In-Charge Name:")}</span><strong className={isAccepted ? 'text-white' : 'text-slate-900'}>{center.inChargeName} ({center.role})</strong></div>
                                    <div className="flex justify-between"><span className={isAccepted ? 'text-emerald-200' : 'text-slate-500'}>{t("Contact Information:")}</span><strong className={isAccepted ? 'text-white' : 'text-slate-900'}>{t("+91")}{center.mobile} | {center.email}</strong></div>
                                    <div className="flex justify-between"><span className={isAccepted ? 'text-emerald-200' : 'text-slate-500'}>{t("Center Physical Location:")}</span><strong className={isAccepted ? 'text-white' : 'text-slate-900'}>{center.location}</strong></div>
                                  </div>

                                  {isAccepted && (
                                    <button
                                      onClick={() => setShowTrackingTimeline(!showTrackingTimeline)}
                                      className="w-full py-2.5 rounded-xl bg-white text-[#00a86b] font-black text-xs hover:bg-emerald-100 transition-all flex items-center justify-center space-x-1"
                                    >
                                      <span>{showTrackingTimeline ? 'Hide Live Crop Tracking Timeline ↑' : 'Proceed to Live Crop Tracking Timeline →'}</span>
                                    </button>
                                  )}
                                </div>
                              </div>

                            </div>
                          );
                        })()}
                      </div>
                    </div>
                  )}

                  {/* LIVE CROP TRACKING TIMELINE (EXPANDABLE INLINE WHEN CLICKED) */}
                  {showTrackingTimeline && (
                    <div className="space-y-6">
                      <div className="pb-3 border-b border-slate-100 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                        <div className="flex items-center space-x-3">
                          <button
                            onClick={() => setShowTrackingTimeline(false)}
                            className="px-3.5 py-1.5 rounded-xl bg-slate-100 text-slate-700 hover:bg-slate-200 font-bold text-xs transition-colors flex items-center space-x-1 border border-slate-200"
                          >
                            <span>{t("Hide Timeline ↑")}</span>
                          </button>
                          <div>
                            <h3 className="text-lg font-black text-slate-900">{t("Individual Crop Tracking System")}</h3>
                            <p className="text-xs text-slate-500 font-medium">{t("Real-time 8-stage tracking timeline specifically for")}<strong>{selectedFarmerForDashboard.name}{t("'s")}</strong>{t("crop harvest.")}</p>
                          </div>
                        </div>

                        <button
                          onClick={() => handleAdvanceTrackingStage(selectedFarmerForDashboard.id)}
                          className="px-4 py-2 rounded-xl bg-[#00a86b] text-white font-bold text-xs hover:bg-[#008f5a] transition-all flex items-center space-x-1.5 shadow-xs"
                        >
                          <RefreshCw className="w-3.5 h-3.5 text-emerald-300" />
                          <span>{t("Advance Stage →")}</span>
                        </button>
                      </div>

                      {(() => {
                        const trk = trackings.find(t => t.farmerId === selectedFarmerForDashboard.id) || trackings[0];
                        const farmerProp = proposals.find(p => p.farmerId === selectedFarmerForDashboard.id) || (typeof getProposalForFarmer === 'function' ? getProposalForFarmer(selectedFarmerForDashboard) : null);

                        return (
                          <div className="space-y-8">

                            <div className="bg-gradient-to-r from-slate-900 to-[#00a86b] text-white p-6 rounded-3xl space-y-3 shadow-md">
                              <div className="flex justify-between items-center">
                                <span className="text-[10px] font-black bg-emerald-400 text-slate-950 px-2.5 py-0.5 rounded-full uppercase">{t("TRACKING ID:")}{trk.id}
                                </span>
                                <span className={`text-[10px] font-black px-3 py-0.5 rounded-full border ${getCategoryBadge(trk.qualityCategory)}`}>{t("Category")}{trk.qualityCategory}{t("Quality")}</span>
                              </div>

                              <div>
                                <h4 className="text-xl font-black text-white">{trk.cropName} ({trk.quantity})</h4>
                                <p className="text-xs text-emerald-200 font-medium">{t("Assigned Center:")}<strong>{trk.centerName}</strong>{t("(In-Charge:")}{trk.inChargeName})</p>
                              </div>

                              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-2 border-t border-emerald-800 text-xs">
                                <div className="bg-emerald-950/70 p-3 rounded-2xl">
                                  <span className="text-[10px] text-emerald-300 font-bold block uppercase">{t("Current Location")}</span>
                                  <span className="font-extrabold text-white text-sm">{trk.currentLocation}</span>
                                </div>
                                <div className="bg-emerald-950/70 p-3 rounded-2xl">
                                  <span className="text-[10px] text-emerald-300 font-bold block uppercase">{t("Current Status")}</span>
                                  <span className="font-extrabold text-amber-300 text-sm">{trk.currentStatus}</span>
                                </div>
                              </div>
                            </div>

                            <div className="space-y-4">
                              <h4 className="text-xs font-black text-slate-900 uppercase tracking-wider">{t("Visual 8-Stage Process Timeline")}</h4>

                              <div className="hidden lg:grid grid-cols-8 gap-2 relative pt-2 pb-6">
                                <div className="absolute top-7 left-6 right-6 h-1 bg-slate-200 z-0" />

                                {TRACKING_STAGES.map((stageName, idx) => {
                                  const isDone = idx < trk.currentStageIndex;
                                  const isCurrent = idx === trk.currentStageIndex;
                                  const log = trk.stageLogs[idx];

                                  return (
                                    <div key={stageName} className="relative z-10 flex flex-col items-center text-center space-y-2">
                                      <div className={`w-9 h-9 rounded-full flex items-center justify-center font-extrabold text-xs transition-all border-2 ${isDone
                                        ? 'bg-[#00a86b] text-white border-[#00a86b]'
                                        : isCurrent
                                          ? 'bg-amber-500 text-white border-amber-600 ring-4 ring-amber-100 animate-pulse'
                                          : 'bg-white text-slate-400 border-slate-300'
                                        }`}>
                                        {isDone ? <Check className="w-4.5 h-4.5" /> : idx + 1}
                                      </div>

                                      <div className="space-y-0.5">
                                        <span className={`text-[10px] font-extrabold block leading-tight ${isCurrent ? 'text-[#00a86b]' : isDone ? 'text-slate-900' : 'text-slate-400'
                                          }`}>
                                          {stageName}
                                        </span>
                                        <span className="text-[9px] text-slate-400 block font-medium">{log?.time || 'Pending'}</span>
                                      </div>
                                    </div>
                                  );
                                })}
                              </div>

                              <div className="space-y-2 lg:hidden text-xs">
                                {TRACKING_STAGES.map((stageName, idx) => {
                                  const isDone = idx < trk.currentStageIndex;
                                  const isCurrent = idx === trk.currentStageIndex;
                                  const log = trk.stageLogs[idx];

                                  return (
                                    <div key={stageName} className="flex items-center space-x-3 p-3 rounded-2xl bg-slate-50 border border-slate-200">
                                      <div className={`w-7 h-7 rounded-full flex items-center justify-center font-bold text-xs ${isDone ? 'bg-[#00a86b] text-white' : isCurrent ? 'bg-amber-500 text-white' : 'bg-slate-200 text-slate-500'
                                        }`}>
                                        {isDone ? '✓' : idx + 1}
                                      </div>
                                      <div className="flex-1">
                                        <span className="font-extrabold text-slate-900 block">{stageName}</span>
                                        <span className="text-[10px] text-slate-500">{log?.detail || 'Stage log details'}</span>
                                      </div>
                                      <span className="text-[10px] font-bold text-slate-400">{log?.time}</span>
                                    </div>
                                  );
                                })}
                              </div>
                            </div>

                            <div className="bg-slate-50 rounded-3xl p-5 border border-slate-200 space-y-3">
                              <h5 className="text-xs font-black text-slate-900 uppercase tracking-wider">{t("Detailed Stage Audit Log")}</h5>
                              <div className="overflow-x-auto">
                                <table className="w-full text-left text-xs">
                                  <thead>
                                    <tr className="border-b border-slate-200 text-slate-400 font-bold uppercase text-[10px]">
                                      <th className="py-2.5">{t("Stage")}</th>
                                      <th className="py-2.5">{t("Timestamp")}</th>
                                      <th className="py-2.5">{t("Actor / Officer")}</th>
                                      <th className="py-2.5">{t("Status")}</th>
                                      <th className="py-2.5">{t("Details")}</th>
                                    </tr>
                                  </thead>
                                  <tbody className="divide-y divide-slate-200 font-semibold text-slate-800">
                                    {trk.stageLogs.map((log) => (
                                      <tr key={log.stage}>
                                        <td className="py-2.5 font-extrabold text-slate-900">{log.stage}</td>
                                        <td className="py-2.5 text-slate-500">{log.time}</td>
                                        <td className="py-2.5 font-bold text-[#00a86b]">{log.actor}</td>
                                        <td className="py-2.5">
                                          <span className={`text-[10px] font-bold px-2.5 py-0.5 rounded-full ${log.status === 'Completed' ? 'bg-emerald-100 text-[#00a86b]' : log.status === 'Active' ? 'bg-amber-100 text-amber-900' : 'bg-slate-200 text-slate-600'
                                            }`}>
                                            {log.status}
                                          </span>
                                        </td>
                                        <td className="py-2.5 text-slate-600 text-[11px]">{log.detail}</td>
                                      </tr>
                                    ))}
                                  </tbody>
                                </table>
                              </div>
                            </div>

                            {/* PAYMENT STATUS & RECEIPT SECTION */}
                            <div className="mt-6 bg-slate-50 rounded-3xl p-5 border border-slate-200 space-y-4">
                              {(() => {
                                const numericQty = parseFloat((trk.quantity || '').toString().replace(/[^0-9.]/g, '')) || 2400;
                                const unitPrice = trk.pricePerKg || farmerProp?.pricePerKg || 30;
                                const calculatedPayout = trk.totalPrice || Math.round(numericQty * unitPrice);
                                const txnId = trk.txnId || 'TXN-7812993537';
                                const isCompleted = trk.currentStageIndex === TRACKING_STAGES.length - 1;

                                return (
                                  <>
                                    <h5 className="text-xs font-black text-slate-900 uppercase tracking-wider flex items-center justify-between border-b border-slate-200 pb-2">
                                      <span>{t("Payment & Settlement Status")}</span>
                                      {isCompleted ? (
                                        <span className="bg-emerald-100 text-[#00a86b] px-3 py-1 rounded-full text-[10px] font-black flex items-center space-x-1">
                                          <span>{t("PAID & SETTLED ✓")}</span>
                                        </span>
                                      ) : (
                                        <span className="bg-rose-100 text-rose-700 px-3 py-1 rounded-full text-[10px] font-black">{t("UNPAID / PENDING ⏳")}</span>
                                      )}
                                    </h5>

                                    {isCompleted ? (
                                      <div className="space-y-5">
                                        <div className="flex flex-col sm:flex-row gap-4">
                                          <div className="flex-1 bg-white p-4 rounded-2xl border border-emerald-100 shadow-xs">
                                            <h6 className="text-[10px] text-slate-500 font-bold mb-1">{t("Total Payment Transferred")}</h6>
                                            <p className="text-2xl font-black text-[#00a86b]">₹{calculatedPayout.toLocaleString('en-IN')}</p>
                                          </div>
                                          <div className="flex-1 bg-white p-4 rounded-2xl border border-emerald-100 shadow-xs">
                                            <h6 className="text-[10px] text-slate-500 font-bold mb-1">{t("Receipt ID & Reference")}</h6>
                                            <p className="text-sm font-black text-slate-900 font-mono">{txnId}</p>
                                            <p className="text-[10px] text-slate-400 font-semibold mt-0.5">{t("Paid via Direct Benefit Transfer (DBT)")}</p>
                                          </div>
                                        </div>

                                        <div className="bg-emerald-50/70 p-3.5 rounded-2xl border border-emerald-200 text-xs text-emerald-900 font-semibold flex items-start space-x-2.5">
                                          <span className="mt-0.5 text-base">ℹ️</span>
                                          <span>{t("Payment successfully processed based on ")}<strong>{trk.quantity}</strong>{t(" @ ₹")}{unitPrice}{t("/kg payout rate. Funds have been deposited to the registered bank account.")}</span>
                                        </div>

                                        {/* OFFICIAL DIGITAL RECEIPT / VOUCHER CARD */}
                                        <div ref={receiptCardRef} className="bg-white rounded-3xl p-6 border-2 border-emerald-500/40 shadow-lg space-y-5 relative overflow-hidden">
                                          {/* Watermark Seal Background Accent */}
                                          <div className="absolute -right-6 -bottom-6 w-32 h-32 rounded-full bg-emerald-500/5 flex items-center justify-center pointer-events-none">
                                            <ShieldCheck className="w-24 h-24 text-emerald-600/10" />
                                          </div>

                                          {/* Receipt Top Header */}
                                          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-4 border-b-2 border-dashed border-slate-200">
                                            <div className="flex items-center space-x-3">
                                              <div className="w-10 h-10 rounded-2xl bg-[#00a86b] text-white flex items-center justify-center font-bold shadow-xs">
                                                <Sprout className="w-6 h-6" />
                                              </div>
                                              <div>
                                                <span className="text-[10px] font-black uppercase tracking-wider text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded-md border border-emerald-200 block w-max mb-0.5">
                                                  {t("GOVERNMENT OF INDIA • MSP DISBURSEMENT VOUCHER")}
                                                </span>
                                                <h4 className="text-base font-black text-slate-900">{t("Official Crop Procurement Digital Receipt")}</h4>
                                              </div>
                                            </div>

                                            <div className="flex items-center space-x-2 no-print">
                                              <button
                                                onClick={() => {
                                                  showToast('Printing official receipt...');
                                                  window.print();
                                                }}
                                                className="px-3.5 py-2 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-800 text-xs font-bold transition-colors flex items-center space-x-1.5 border border-slate-300 shadow-2xs"
                                              >
                                                <Printer className="w-3.5 h-3.5 text-slate-600" />
                                                <span>{t("Print Receipt")}</span>
                                              </button>
                                              <button
                                                disabled={isDownloadingPdf}
                                                onClick={() => handleDownloadPdf(txnId)}
                                                className="px-3.5 py-2 rounded-xl bg-[#00a86b] hover:bg-[#008f5a] text-white text-xs font-black transition-colors flex items-center space-x-1.5 shadow-xs disabled:opacity-50 disabled:cursor-not-allowed"
                                              >
                                                {isDownloadingPdf ? (
                                                  <RefreshCw className="w-3.5 h-3.5 text-white animate-spin" />
                                                ) : (
                                                  <Download className="w-3.5 h-3.5 text-white" />
                                                )}
                                                <span>{isDownloadingPdf ? t("Downloading...") : t("Download PDF")}</span>
                                              </button>
                                            </div>
                                          </div>

                                          {/* Receipt Key Metadata Grid */}
                                          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 bg-slate-50 p-4 rounded-2xl border border-slate-200 text-xs">
                                            <div>
                                              <span className="text-[10px] text-slate-400 font-bold uppercase block">{t("Receipt Reference No.")}</span>
                                              <span className="font-mono font-black text-slate-900 text-sm">{txnId}</span>
                                            </div>
                                            <div>
                                              <span className="text-[10px] text-slate-400 font-bold uppercase block">{t("Disbursement Date")}</span>
                                              <span className="font-bold text-slate-800">{new Date().toLocaleDateString('en-IN', { day: '2-digit', month: 'short', year: 'numeric' })}</span>
                                            </div>
                                            <div>
                                              <span className="text-[10px] text-slate-400 font-bold uppercase block">{t("Payment Mode")}</span>
                                              <span className="font-extrabold text-emerald-700">{t("DBT Bank Transfer")}</span>
                                            </div>
                                            <div>
                                              <span className="text-[10px] text-slate-400 font-bold uppercase block">{t("Settlement Status")}</span>
                                              <span className="font-black text-[#00a86b] bg-emerald-100 px-2 py-0.5 rounded-full text-[10px] inline-block">{t("PAID & SETTLED ✓")}</span>
                                            </div>
                                          </div>

                                          {/* Receipt Itemization Table */}
                                          <div className="border border-slate-200 rounded-2xl overflow-hidden text-xs">
                                            <table className="w-full text-left">
                                              <thead className="bg-slate-100 text-slate-500 font-extrabold text-[10px] uppercase border-b border-slate-200">
                                                <tr>
                                                  <th className="py-2.5 px-3.5">{t("Farmer / Beneficiary")}</th>
                                                  <th className="py-2.5 px-3.5">{t("Crop Description")}</th>
                                                  <th className="py-2.5 px-3.5">{t("Procured Qty")}</th>
                                                  <th className="py-2.5 px-3.5">{t("MSP Rate")}</th>
                                                  <th className="py-2.5 px-3.5 text-right">{t("Total Disbursed")}</th>
                                                </tr>
                                              </thead>
                                              <tbody className="divide-y divide-slate-100 font-semibold text-slate-800">
                                                <tr>
                                                  <td className="py-3 px-3.5">
                                                    <span className="font-black text-slate-900 block">{farmerProp?.farmerName || trk.farmerName || 'Ramesh Kumar'}</span>
                                                    <span className="text-[10px] text-slate-400 font-mono">ID: {farmerProp?.farmerId || trk.farmerId || 'FARM-1001'}</span>
                                                  </td>
                                                  <td className="py-3 px-3.5">
                                                    <span className="font-extrabold text-slate-900 block">{trk.cropName}</span>
                                                    <span className="text-[10px] text-emerald-700 font-bold">{t("Category ")}{trk.qualityCategory}{t(" Quality Certified")}</span>
                                                  </td>
                                                  <td className="py-3 px-3.5 font-bold text-slate-900">{trk.quantity}</td>
                                                  <td className="py-3 px-3.5 font-bold text-slate-700">₹{unitPrice}{t("/kg")}</td>
                                                  <td className="py-3 px-3.5 text-right font-black text-[#00a86b] text-base">₹{calculatedPayout.toLocaleString('en-IN')}</td>
                                                </tr>
                                              </tbody>
                                            </table>
                                          </div>

                                          {/* Receipt Footer & Stamp */}
                                          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center pt-3 border-t border-slate-100 text-[11px] gap-3">
                                            <div className="space-y-0.5 text-slate-500 font-medium">
                                              <p>📍 <strong>{t("Receiving Center:")}</strong> {trk.centerName} ({t("Officer: ")}{trk.inChargeName})</p>
                                              <p>🔒 <strong>{t("Verification:")}</strong> {t("Digitally Signed & Authenticated by Central MSP Procurement Engine")}</p>
                                            </div>

                                            <div className="flex items-center space-x-2 bg-emerald-50 px-3.5 py-1.5 rounded-2xl border border-emerald-200 text-[#00a86b] font-black text-[11px] flex-shrink-0">
                                              <ShieldCheck className="w-4 h-4 text-[#00a86b]" />
                                              <span>{t("GOVT VERIFIED DISBURSEMENT")}</span>
                                            </div>
                                          </div>

                                        </div>
                                      </div>
                                    ) : (
                                      <div className="bg-white p-6 rounded-2xl border border-rose-100 shadow-xs text-center space-y-2">
                                        <p className="text-sm font-extrabold text-slate-900">{t("Payment Pending Stage Completion")}</p>
                                        <p className="text-xs text-slate-500 font-medium max-w-md mx-auto">{t("Total estimated payout of ")}<span className="font-bold text-slate-900">₹{calculatedPayout.toLocaleString('en-IN')}</span>{t(
                                          " will be processed automatically via Direct Benefit Transfer (DBT) once all tracking stages (including Quality Checks and Center Receipt) are fully completed."
                                        )}</p>
                                      </div>
                                    )}
                                  </>
                                );
                              })()}
                            </div>

                          </div>
                        );
                      })()}
                    </div>
                  )}

                </div>

                {/* BOTTOM RETURN BUTTON */}
                <div className="pt-4 border-t border-slate-100 flex justify-between items-center">
                  <button
                    onClick={() => {
                      setSelectedFarmerForDashboard(null);
                    }}
                    className="px-6 py-3 rounded-2xl bg-[#00a86b] text-white font-black text-xs shadow-md hover:bg-[#008f5a] transition-all flex items-center space-x-2"
                  >
                    <ArrowLeft className="w-4 h-4 text-white" />
                    <span>{t("← Back to Registered Farmers Directory")}</span>
                  </button>

                  <span className="text-xs text-slate-400 font-semibold">{t("AgriProcure Platform • Verified Farmer Record #")}{selectedFarmerForDashboard.id}</span>
                </div>

              </div>
            )}

          </div>
        )}

      </main>

      {/* MODAL: ADD NEW FARMER FORM */}
      {showAddFarmerModal && (
        <div className="fixed inset-0 z-50 bg-slate-900/60 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-white rounded-3xl p-6 sm:p-8 max-w-lg w-full space-y-5 shadow-2xl border border-slate-100 animate-scale-up">

            <div className="flex items-center justify-between pb-3 border-b border-slate-100">
              <h3 className="text-lg font-black text-slate-900">{t("Register New Farmer")}</h3>
              <button onClick={() => setShowAddFarmerModal(false)} className="p-1.5 rounded-xl hover:bg-slate-100 text-slate-400">
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleAddFarmerSubmit} className="space-y-4 text-xs font-semibold">

              <div>
                <label className="block text-slate-700 font-bold mb-1">{t("Farmer Full Name *")}</label>
                <input
                  type="text"
                  value={newFarmer.name}
                  onChange={(e) => setNewFarmer({ ...newFarmer, name: e.target.value })}
                  placeholder="e.g. Harpreet Singh"
                  className="w-full px-3.5 py-2.5 bg-slate-50 rounded-xl border border-slate-200 text-slate-900 focus:ring-2 focus:ring-[#00a86b] focus:outline-none"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-slate-700 font-bold mb-1">{t("Mobile Contact *")}</label>
                  <input
                    type="tel"
                    maxLength={10}
                    value={newFarmer.mobile}
                    onChange={(e) => setNewFarmer({ ...newFarmer, mobile: e.target.value.replace(/\D/g, '') })}
                    placeholder="10-digit mobile"
                    className="w-full px-3.5 py-2.5 bg-slate-50 rounded-xl border border-slate-200 text-slate-900 focus:ring-2 focus:ring-[#00a86b] focus:outline-none"
                  />
                </div>
                <div>
                  <label className="block text-slate-700 font-bold mb-1">{t("Crop Variety")}</label>
                  <input
                    type="text"
                    value={newFarmer.cropType}
                    onChange={(e) => setNewFarmer({ ...newFarmer, cropType: e.target.value })}
                    placeholder="Wheat, Paddy, Mustard..."
                    className="w-full px-3.5 py-2.5 bg-slate-50 rounded-xl border border-slate-200 text-slate-900"
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-slate-700 font-bold mb-1">{t("Village Name")}</label>
                  <input
                    type="text"
                    value={newFarmer.village}
                    onChange={(e) => setNewFarmer({ ...newFarmer, village: e.target.value })}
                    placeholder="Village Name"
                    className="w-full px-3 py-2 bg-slate-50 rounded-xl border border-slate-200 text-slate-900"
                  />
                </div>
                <div>
                  <label className="block text-slate-700 font-bold mb-1">{t("Cultivated Area (Acres)")}</label>
                  <input
                    type="text"
                    value={newFarmer.cultivatedArea}
                    onChange={(e) => setNewFarmer({ ...newFarmer, cultivatedArea: e.target.value })}
                    placeholder="e.g. 4.0 Acres"
                    className="w-full px-3 py-2 bg-slate-50 rounded-xl border border-slate-200 text-slate-900"
                  />
                </div>
              </div>

              <div>
                <label className="block text-slate-700 font-bold mb-1">{t("Produced Crop Quantity (Kg)")}</label>
                <input
                  type="number"
                  value={Number(newFarmer.goodCropQuantity || 0) + Number(newFarmer.wasteCropQuantity || 0) || ''}
                  disabled
                  placeholder="Total Quantity"
                  className="w-full px-3.5 py-2.5 bg-slate-100 rounded-xl border border-slate-200 text-slate-500 font-bold cursor-not-allowed"
                />
              </div>

              <div className="bg-slate-50 p-4 rounded-xl border border-slate-200 space-y-3">
                <label className="block text-slate-800 font-black text-xs uppercase tracking-wider mb-2 border-b border-slate-200 pb-2">{t("Crop Type & Waste Management")}</label>
                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <label className="block text-slate-700 font-bold mb-1">{t("Good Crop (Kg)")}</label>
                    <input
                      type="number"
                      value={newFarmer.goodCropQuantity}
                      onChange={(e) => setNewFarmer({ ...newFarmer, goodCropQuantity: e.target.value })}
                      placeholder="e.g. 2000"
                      className="w-full px-3 py-2 bg-white rounded-lg border border-emerald-200 text-slate-900 focus:ring-2 focus:ring-emerald-500 focus:outline-none"
                    />
                  </div>
                  <div>
                    <label className="block text-slate-700 font-bold mb-1">{t("Waste Crop (Kg)")}</label>
                    <input
                      type="number"
                      value={newFarmer.wasteCropQuantity}
                      onChange={(e) => setNewFarmer({ ...newFarmer, wasteCropQuantity: e.target.value })}
                      placeholder="e.g. 500"
                      className="w-full px-3 py-2 bg-white rounded-lg border border-amber-200 text-slate-900 focus:ring-2 focus:ring-amber-500 focus:outline-none"
                    />
                  </div>
                </div>
              </div>

              <button
                type="submit"
                className="w-full py-3.5 rounded-2xl bg-[#00a86b] text-white font-black text-xs shadow-md hover:bg-[#008f5a] transition-all"
              >{t("Submit & Register Farmer →")}</button>

            </form>
          </div>
        </div>
      )}

      {/* MODAL: CENTER ALLOCATION RESULT & AUTOMATED NOTIFICATION */}
      {allocationModalData && (
        <div className="fixed inset-0 z-50 bg-slate-900/70 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-white rounded-3xl p-6 sm:p-8 max-w-xl w-full space-y-6 shadow-2xl border border-slate-100 animate-scale-up">

            {/* Modal Header */}
            <div className="flex items-center justify-between pb-3 border-b border-slate-100">
              <div className="flex items-center space-x-2">
                <div className="w-8 h-8 rounded-xl bg-emerald-100 text-[#00a86b] flex items-center justify-center font-bold">
                  <CheckCircle2 className="w-5 h-5 text-emerald-700" />
                </div>
                <div>
                  <h3 className="text-base font-black text-slate-900">{t("Smart Center Allocation Result")}</h3>
                  <p className="text-xs text-slate-500 font-medium">{t("Automatic real-time capacity routing")}</p>
                </div>
              </div>
              <button onClick={() => setAllocationModalData(null)} className="p-1.5 rounded-xl hover:bg-slate-100 text-slate-400">
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Farmer & Crop Details Summary */}
            <div className="bg-slate-50 rounded-2xl p-4 border border-slate-200/80 space-y-2 text-xs">
              <div className="flex justify-between font-bold">
                <span className="text-slate-500">{t("Farmer Name:")}</span>
                <span className="text-slate-900 font-black">{allocationModalData.farmerName}</span>
              </div>
              <div className="flex justify-between font-bold">
                <span className="text-slate-500">{t("Mobile Contact:")}</span>
                <span className="text-slate-900">{allocationModalData.mobile}</span>
              </div>
              <div className="flex justify-between font-bold">
                <span className="text-slate-500">{t("Crop & Quantity:")}</span>
                <span className="text-emerald-800 font-extrabold">{allocationModalData.cropName} ({allocationModalData.qtyKg}{t("kg)")}</span>
              </div>
            </div>

            {/* System Result Banner */}
            {allocationModalData.allocResult && (
              <div className={`p-4 rounded-2xl border text-xs font-bold space-y-1 ${allocationModalData.allocResult.assignedCategory === 'A'
                ? 'bg-emerald-50 border-emerald-300 text-emerald-950'
                : allocationModalData.allocResult.assignedCategory === 'B'
                  ? 'bg-amber-50 border-amber-300 text-amber-950'
                  : allocationModalData.allocResult.assignedCategory === 'C'
                    ? 'bg-orange-50 border-orange-300 text-orange-950'
                    : 'bg-red-50 border-red-300 text-red-950'
                }`}>
                <div className="flex items-center space-x-2 font-black text-sm">
                  <Sparkles className="w-4 h-4" />
                  <span>{t("System Result: ✓")}{allocationModalData.allocResult.statusMessage}</span>
                </div>
              </div>
            )}

            {/* Center Availability Matrix & Allocation Details */}
            <div className="space-y-2 text-xs">
              <span className="font-extrabold text-slate-700 block uppercase tracking-wider text-[11px]">{t("Center Allocation Details")}</span>

              <div className="grid grid-cols-1 gap-2 text-[11px] font-bold mb-3">
                {allocationModalData.goodQty > 0 && allocationModalData.allocResult && (
                  <div className={`p-3 rounded-xl border ${allocationModalData.allocResult.assignedCategory === 'A' ? 'bg-emerald-100 border-emerald-400' : allocationModalData.allocResult.assignedCategory === 'B' ? 'bg-amber-100 border-amber-400' : 'bg-orange-100 border-orange-400'}`}>
                    <div className="flex justify-between items-center mb-1">
                      <span className="block font-black text-slate-900">{allocationModalData.allocResult.assignedName}{t("(Good Crop)")}</span>
                      <span className="px-2 py-0.5 rounded text-[9px] bg-white text-slate-800">{allocationModalData.goodQty}{t("kg Assigned")}</span>
                    </div>
                    <span className="text-[10px] text-slate-600 block">{t("Status:")}{allocationModalData.allocResult.statusMessage}</span>
                  </div>
                )}
                
                {allocationModalData.wasteQty > 0 && allocationModalData.wasteResult && (
                  <div className="p-3 rounded-xl border bg-slate-100 border-slate-300">
                    <div className="flex justify-between items-center mb-1">
                      <span className="block font-black text-slate-900">{allocationModalData.wasteResult.assignedName}{t("(Waste Crop)")}</span>
                      <span className="px-2 py-0.5 rounded text-[9px] bg-white text-slate-800">{allocationModalData.wasteQty}{t("kg Assigned")}</span>
                    </div>
                    <span className="text-[10px] text-slate-600 block">{t("In-Charge:")}{allocationModalData.wasteResult.inChargeName} | {allocationModalData.wasteResult.contact}</span>
                    <span className="text-[10px] text-slate-500 block">{t("Location:")}{allocationModalData.wasteResult.location}</span>
                  </div>
                )}
              </div>

              <div className="grid grid-cols-3 gap-2 text-center text-[11px] font-bold mt-2">
                <div className={`p-2.5 rounded-xl border ${allocationModalData.allocResult?.assignedCategory === 'A' ? 'bg-emerald-100 border-emerald-400 ring-2 ring-emerald-500/30' : 'bg-slate-50 border-slate-200'}`}>
                  <span className="block font-black text-slate-900">{t("A Center")}</span>
                  <span className="text-[10px] text-slate-500 block">{t("5,000 kg Cap")}</span>
                  <span className={`text-[10px] font-bold block ${centerCapacities.A.status === 'AVAILABLE' ? 'text-emerald-700' : 'text-amber-700'}`}>
                    {centerCapacities.A.availableKg}{t("kg Avail (")}{centerCapacities.A.status})
                  </span>
                </div>

                <div className={`p-2.5 rounded-xl border ${allocationModalData.allocResult?.assignedCategory === 'B' ? 'bg-amber-100 border-amber-400 ring-2 ring-amber-500/30' : 'bg-slate-50 border-slate-200'}`}>
                  <span className="block font-black text-slate-900">{t("B Center")}</span>
                  <span className="text-[10px] text-slate-500 block">{t("5,000 kg Cap")}</span>
                  <span className={`text-[10px] font-bold block ${centerCapacities.B.status === 'AVAILABLE' ? 'text-emerald-700' : 'text-amber-700'}`}>
                    {centerCapacities.B.availableKg}{t("kg Avail (")}{centerCapacities.B.status})
                  </span>
                </div>

                <div className={`p-2.5 rounded-xl border ${allocationModalData.allocResult?.assignedCategory === 'C' ? 'bg-orange-100 border-orange-400 ring-2 ring-orange-500/30' : 'bg-slate-50 border-slate-200'}`}>
                  <span className="block font-black text-slate-900">{t("C Center")}</span>
                  <span className="text-[10px] text-slate-500 block">{t("5,000 kg Cap")}</span>
                  <span className={`text-[10px] font-bold block ${centerCapacities.C.availableKg > 0 ? 'text-emerald-700' : 'text-red-700'}`}>
                    {centerCapacities.C.availableKg}{t("kg Avail (")}{centerCapacities.C.status})
                  </span>
                </div>
              </div>
            </div>

            {/* Generated Notification Box */}
            <div className="bg-emerald-950 text-white rounded-2xl p-4 space-y-2 border border-emerald-800">
              <div className="flex items-center justify-between text-[11px] font-bold text-amber-400 uppercase tracking-wider">
                <span>{t("💬 Automated Farmer & Mitra SMS Notification")}</span>
                <span className="bg-amber-400/20 text-amber-300 px-2 py-0.5 rounded-md text-[9px]">{t("DISPATCHED")}</span>
              </div>
              {allocationModalData.allocResult && (
                <p className="text-xs font-semibold text-emerald-100 whitespace-pre-line leading-relaxed italic bg-emerald-900/60 p-3 rounded-xl border border-emerald-800">
                  "{allocationModalData.allocResult.notificationText}"
                </p>
              )}
              {allocationModalData.wasteResult && (
                <p className="text-xs font-semibold text-emerald-100 whitespace-pre-line leading-relaxed italic bg-emerald-900/60 p-3 rounded-xl border border-emerald-800 mt-2">
                  "{allocationModalData.wasteResult.notificationText}"
                </p>
              )}
            </div>

            <button
              onClick={() => setAllocationModalData(null)}
              className="w-full py-3.5 rounded-2xl bg-[#00a86b] text-white font-black text-xs shadow-md hover:bg-[#008f5a] transition-all"
            >{t("Acknowledge & Complete Registration ✓")}</button>

          </div>
        </div>
      )}

      {/* FOOTER */}
      <footer className="bg-white border-t border-slate-200 py-4 text-center text-xs text-slate-500">{t(
        "© 2026 Smart Agricultural Crop Category & Center Management System • Authorized Volunteer Portal"
      )}</footer>

    </div>
  );
};

export default VolunteerDashboard;

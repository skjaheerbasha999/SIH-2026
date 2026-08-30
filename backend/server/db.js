import mongoose from 'mongoose';

// SCHEMAS & MODELS
const userSchema = new mongoose.Schema({
  id: { type: String, required: true, unique: true },
  name: { type: String, required: true },
  mobile: { type: String, required: true },
  password: { type: String, default: '' },
  category: { type: String, default: 'Volunteer' },
  village: { type: String, default: '' },
  mandal: { type: String, default: '' },
  panchayat: { type: String, default: '' },
  wardNumber: { type: String, default: '' },
  district: { type: String, default: '' },
  state: { type: String, default: 'Haryana' },
  createdAt: { type: Date, default: Date.now }
});

const farmerSchema = new mongoose.Schema({
  id: { type: String, required: true, unique: true },
  name: { type: String, required: true },
  mobile: { type: String, required: true },
  village: { type: String, default: '' },
  panchayat: { type: String, default: '' },
  mandal: { type: String, default: '' },
  district: { type: String, default: '' },
  state: { type: String, default: 'Haryana' },
  registeredDate: { type: String, default: () => new Date().toISOString().split('T')[0] }
});

const cropSchema = new mongoose.Schema({
  id: { type: String, required: true, unique: true },
  farmerId: { type: String, required: true },
  farmerName: { type: String, required: true },
  cropName: { type: String, required: true },
  cropCategory: { type: String, default: 'Cereal' },
  sowingDate: { type: String },
  expectedHarvestDate: { type: String },
  currentStage: { type: String, default: 'Planted' },
  quantity: { type: String, default: '0 kg' },
  cropStatus: { type: String, default: 'Active' },
  remarks: { type: String, default: '' }
});

const quantitySchema = new mongoose.Schema({
  category: { type: String, required: true, unique: true },
  name: { type: String, default: '' },
  capacity: { type: Number, required: true, default: 5000 },
  currentStock: { type: Number, required: true, default: 0 },
  available: { type: Number, required: true, default: 5000 },
  status: { type: String, default: 'AVAILABLE' }
});

const centerSchema = new mongoose.Schema({
  name: { type: String, required: true },
  mobile: { type: String, required: true },
  centerNameId: { type: String, required: true },
  village: { type: String },
  panchayat: { type: String },
  mandal: { type: String },
  district: { type: String },
  state: { type: String },
  email: { type: String },
  status: { type: String, default: 'Active & Operations Live' }
});

const qualityScanSchema = new mongoose.Schema({
  farmerId: { type: String, required: true },
  cropId: { type: String, required: true },
  cropName: { type: String, required: true },
  qualityGrade: { type: String, enum: ['A', 'B', 'C'], required: true },
  qualityLevel: { type: String, enum: ['High', 'Medium', 'Low'], required: true },
  confidence: { type: Number, required: true },
  observations: [{ type: String }],
  recommendation: { type: String, default: '' },
  scanDate: { type: String, default: () => new Date().toISOString() },
  imageUrl: { type: String, default: '' }
});

const centerProposalSchema = new mongoose.Schema({
  id: { type: String, required: true, unique: true },
  farmerId: { type: String, required: true },
  farmerName: { type: String, required: true },
  cropId: { type: String, required: true },
  cropName: { type: String, required: true },
  quantity: { type: String, default: '0 kg' },
  qualityGrade: { type: String, required: true },
  confidence: { type: Number, required: true },
  centerName: { type: String, required: true },
  status: { type: String, enum: ['Pending', 'Accepted', 'Rejected'], default: 'Pending' },
  createdDate: { type: String, default: () => new Date().toISOString() }
});

const cropTrackingSchema = new mongoose.Schema({
  id: { type: String, required: true, unique: true },
  farmerId: { type: String, required: true },
  cropId: { type: String, required: true },
  proposalId: { type: String, required: true },
  cropName: { type: String, required: true },
  currentStage: {
    type: String,
    enum: [
      'Crop Submitted',
      'AI Quality Checked',
      'Quality Grade Assigned',
      'Proposal Sent',
      'Center Accepted',
      'Crop Received',
      'Processing',
      'Completed'
    ],
    default: 'Center Accepted'
  },
  stageHistory: [{ stage: String, timestamp: String, remarks: String }],
  lastUpdated: { type: String, default: () => new Date().toISOString() }
});

export const User = mongoose.models.User || mongoose.model('User', userSchema);
export const Farmer = mongoose.models.Farmer || mongoose.model('Farmer', farmerSchema);
export const Crop = mongoose.models.Crop || mongoose.model('Crop', cropSchema);
export const Quantity = mongoose.models.Quantity || mongoose.model('Quantity', quantitySchema);
export const Center = mongoose.models.Center || mongoose.model('Center', centerSchema);
export const QualityScanResult = mongoose.models.QualityScanResult || mongoose.model('QualityScanResult', qualityScanSchema);
export const CenterProposal = mongoose.models.CenterProposal || mongoose.model('CenterProposal', centerProposalSchema);
export const CropTrackingRecord = mongoose.models.CropTrackingRecord || mongoose.model('CropTrackingRecord', cropTrackingSchema);

// INITIAL DEFAULT SEED DATA
const initialUsers = [
  {
    id: 'USER-1',
    name: 'Gurpreet Singh',
    mobile: '9876543210',
    category: 'Volunteer',
    village: 'Sonipat Village',
    mandal: 'Sonipat Mandal',
    district: 'Sonipat',
    state: 'Haryana'
  }
];

const initialFarmers = [
  {
    id: 'FARM-1001',
    name: 'Ramesh Kumar',
    mobile: '9876543211',
    village: 'Sonipat Khas',
    panchayat: 'Grama Panchayat North',
    mandal: 'Sonipat Mandal',
    district: 'Sonipat',
    state: 'Haryana',
    registeredDate: '2026-08-15'
  },
  {
    id: 'FARM-1002',
    name: 'Sujata Devi',
    mobile: '9876543212',
    village: 'Rampur',
    panchayat: 'Rampur Panchayat',
    mandal: 'Sonipat Mandal',
    district: 'Sonipat',
    state: 'Haryana',
    registeredDate: '2026-08-18'
  },
  {
    id: 'FARM-1003',
    name: 'Mahesh Patel',
    mobile: '9876543213',
    village: 'Sonipat East',
    panchayat: 'Panchayat Ward 4',
    mandal: 'Sonipat Mandal',
    district: 'Sonipat',
    state: 'Haryana',
    registeredDate: '2026-08-20'
  }
];

const initialQuantities = [
  { category: 'A', name: 'A Center (Priority)', capacity: 5000, currentStock: 3800, available: 1200, status: 'AVAILABLE' },
  { category: 'B', name: 'B Center (Secondary)', capacity: 5000, currentStock: 4700, available: 300, status: 'LIMITED' },
  { category: 'C', name: 'C Center (Overflow)', capacity: 5000, currentStock: 5000, available: 0, status: 'FULL' }
];

const initialCenter = {
  name: 'Dr. Vikram Sharma',
  mobile: '9812345678',
  centerNameId: 'Center #42 - Sonipat Procurement Hub',
  village: 'Sonipat Central',
  panchayat: 'Sonipat Main Panchayat',
  mandal: 'Sonipat Mandal',
  district: 'Sonipat',
  state: 'Haryana',
  email: 'vikram.sharma@procurement.gov.in',
  status: 'Active & Operations Live'
};

const initialCrops = [
  {
    id: 'CROP-201',
    farmerId: 'FARM-1001',
    farmerName: 'Ramesh Kumar',
    cropName: 'Wheat (PBW 550)',
    cropCategory: 'Cereal',
    sowingDate: '2026-05-10',
    expectedHarvestDate: '2026-09-15',
    currentStage: 'Growing',
    quantity: '1,250 kg',
    cropStatus: 'Healthy - No Pest Threats',
    remarks: 'Moisture target optimal for Grade A harvest'
  },
  {
    id: 'CROP-202',
    farmerId: 'FARM-1002',
    farmerName: 'Sujata Devi',
    cropName: 'Mustard (Sarson)',
    cropCategory: 'Oilseed',
    sowingDate: '2026-04-20',
    expectedHarvestDate: '2026-08-25',
    currentStage: 'Ready for Harvest',
    quantity: '650 kg',
    cropStatus: 'Ready for Collection Center Dispatch',
    remarks: 'High oil density expected'
  },
  {
    id: 'CROP-203',
    farmerId: 'FARM-1003',
    farmerName: 'Mahesh Patel',
    cropName: 'Paddy (Basmati 1121)',
    cropCategory: 'Cereal',
    sowingDate: '2026-03-01',
    expectedHarvestDate: '2026-08-01',
    currentStage: 'Harvested',
    quantity: '180 kg',
    cropStatus: 'Procured & Verified at Center #42',
    remarks: 'Receipt generated & paid'
  }
];

// AUTOMATIC SEEDING FUNCTION
export async function seedInitialData() {
  try {
    const userCount = await User.countDocuments();
    if (userCount === 0) {
      await User.insertMany(initialUsers);
      console.log('🌱 Seeded initial Users into MongoDB');
    }

    const farmerCount = await Farmer.countDocuments();
    if (farmerCount === 0) {
      await Farmer.insertMany(initialFarmers);
      console.log('🌱 Seeded initial Farmers into MongoDB');
    }

    const quantityCount = await Quantity.countDocuments();
    if (quantityCount === 0) {
      await Quantity.insertMany(initialQuantities);
      console.log('🌱 Seeded initial Quantities into MongoDB');
    }

    const centerCount = await Center.countDocuments();
    if (centerCount === 0) {
      await Center.create(initialCenter);
      console.log('🌱 Seeded initial Center details into MongoDB');
    }

    const cropCount = await Crop.countDocuments();
    if (cropCount === 0) {
      await Crop.insertMany(initialCrops);
      console.log('🌱 Seeded initial Crops into MongoDB');
    }
  } catch (err) {
    console.error('Error seeding MongoDB initial data:', err.message);
  }
}

let isConnected = false;
let connectionError = null;

export async function connectDB() {
  const uri = process.env.MONGODB_URI;

  if (!uri || uri.includes('<db_password>')) {
    connectionError = 'MONGODB_URI contains placeholder <db_password>. Please update backend/.env with your actual password.';
    console.warn('⚠️  MongoDB Warning:', connectionError);
    return false;
  }

  try {
    await mongoose.connect(uri, {
      serverSelectionTimeoutMS: 5000
    });
    isConnected = true;
    connectionError = null;
    console.log('✅ Connected successfully to MongoDB Atlas!');
    await seedInitialData();
    return true;
  } catch (err) {
    isConnected = false;
    connectionError = err.message;
    console.error('❌ MongoDB Connection Error:', err.message);
    return false;
  }
}

export function getDBStatus() {
  return {
    isConnected,
    readyState: mongoose.connection.readyState,
    statusText: isConnected ? 'Connected' : (connectionError || 'Disconnected'),
    error: connectionError
  };
}

import http from 'http';
import url from 'url';
import dotenv from 'dotenv';
import {
  connectDB,
  getDBStatus,
  User,
  Farmer,
  Crop,
  Quantity,
  Center,
  QualityScanResult,
  CenterProposal,
  CropTrackingRecord
} from './db.js';

// Load Environment Variables
dotenv.config();

let currentPort = parseInt(process.env.PORT, 10) || 5000;

// IN-MEMORY FALLBACK ARRAYS
let fallbackQualityScans = [];
let fallbackProposals = [];
let fallbackTrackings = [];

// GOOGLE GEMINI API AI CROP ANALYSIS HELPER
async function analyzeCropWithGemini(imageBase64, mimeType = 'image/jpeg', cropName = 'Crop') {
  const apiKey = process.env.GEMINI_API_KEY;

  if (!apiKey || apiKey.trim() === '' || apiKey.includes('YOUR_')) {
    throw new Error('GEMINI_API_KEY is not configured in backend environment variables.');
  }

  // Clean base64 string if data URL prefix exists
  let cleanBase64 = imageBase64;
  let detectedMime = mimeType || 'image/jpeg';

  if (imageBase64.includes(';base64,')) {
    const parts = imageBase64.split(';base64,');
    cleanBase64 = parts[1];
    const mimeMatch = parts[0].match(/data:(.*?);/);
    if (mimeMatch) {
      detectedMime = mimeMatch[1];
    }
  }

  const promptText = `You are an expert agricultural crop inspector. Analyze the provided image of the crop '${cropName}'.
Classify the visible crop quality into EXACTLY ONE of these categories:
A = High Quality
B = Medium Quality
C = Low Quality

You MUST respond with ONLY a valid JSON object matching this schema exactly, with no markdown code blocks or formatting:
{
  "cropName": "${cropName}",
  "qualityGrade": "A",
  "qualityLevel": "High",
  "confidence": 87,
  "observations": [
    "Healthy appearance",
    "Good color consistency",
    "No obvious visible damage"
  ],
  "recommendation": "Suitable for A quality center"
}`;

  const geminiUrl = `https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash:generateContent?key=${apiKey.trim()}`;

  const requestBody = {
    contents: [
      {
        parts: [
          { text: promptText },
          {
            inline_data: {
              mime_type: detectedMime,
              data: cleanBase64
            }
          }
        ]
      }
    ]
  };

  const response = await fetch(geminiUrl, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(requestBody)
  });

  if (!response.ok) {
    const errorText = await response.text();
    console.error('Gemini API HTTP Error:', response.status, errorText);
    throw new Error(`Gemini API Error (HTTP ${response.status})`);
  }

  const result = await response.json();
  const rawText = result.candidates?.[0]?.content?.parts?.[0]?.text;

  if (!rawText) {
    throw new Error('Gemini API returned no analysis candidate text.');
  }

  // Parse JSON response safely
  let jsonString = rawText.trim();
  if (jsonString.startsWith('```json')) {
    jsonString = jsonString.replace(/^```json/, '').replace(/```$/, '').trim();
  } else if (jsonString.startsWith('```')) {
    jsonString = jsonString.replace(/^```/, '').replace(/```$/, '').trim();
  }

  const parsed = JSON.parse(jsonString);

  // Validate qualityGrade strictly
  if (!['A', 'B', 'C'].includes(parsed.qualityGrade)) {
    throw new Error(`Gemini returned invalid qualityGrade '${parsed.qualityGrade}'. Must be A, B, or C.`);
  }

  const validLevelMap = { A: 'High', B: 'Medium', C: 'Low' };
  const finalLevel = validLevelMap[parsed.qualityGrade] || parsed.qualityLevel || 'High';
  const confidenceNum = Math.min(100, Math.max(0, parseInt(parsed.confidence, 10) || 85));

  return {
    cropName: parsed.cropName || cropName,
    qualityGrade: parsed.qualityGrade,
    qualityLevel: finalLevel,
    confidence: confidenceNum,
    observations: Array.isArray(parsed.observations) && parsed.observations.length > 0
      ? parsed.observations
      : ['Healthy grain structure observed', 'Proper moisture levels indicated', 'Clear surface texture'],
    recommendation: parsed.recommendation || `Suitable for ${parsed.qualityGrade} quality center`
  };
}

// IN-MEMORY FALLBACK DATABASE (Used if MongoDB is offline or initial setup is incomplete)
let fallbackUsers = [
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

let fallbackFarmers = [
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

let fallbackQuantities = {
  A: { category: 'A', name: 'A Center (Priority)', capacity: 5000, currentStock: 3800, available: 1200, status: 'AVAILABLE' },
  B: { category: 'B', name: 'B Center (Secondary)', capacity: 5000, currentStock: 4700, available: 300, status: 'LIMITED' },
  C: { category: 'C', name: 'C Center (Overflow)', capacity: 5000, currentStock: 5000, available: 0, status: 'FULL' }
};

let fallbackCenter = {
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

let fallbackCrops = [
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

// HELPER: Send JSON response
const sendJSON = (res, statusCode, data) => {
  res.writeHead(statusCode, {
    'Content-Type': 'application/json',
    'Access-Control-Allow-Origin': '*',
    'Access-Control-Allow-Methods': 'GET, POST, PUT, DELETE, OPTIONS',
    'Access-Control-Allow-Headers': 'Content-Type, Authorization'
  });
  res.end(JSON.stringify(data));
};

// HELPER: Parse JSON body
const parseBody = (req) => {
  return new Promise((resolve, reject) => {
    let body = '';
    req.on('data', (chunk) => (body += chunk.toString()));
    req.on('end', () => {
      try {
        resolve(body ? JSON.parse(body) : {});
      } catch (err) {
        reject(err);
      }
    });
  });
};

// SERVER ROUTER
const server = http.createServer(async (req, res) => {
  // Handle CORS preflight
  if (req.method === 'OPTIONS') {
    res.writeHead(204, {
      'Access-Control-Allow-Origin': '*',
      'Access-Control-Allow-Methods': 'GET, POST, PUT, DELETE, OPTIONS',
      'Access-Control-Allow-Headers': 'Content-Type, Authorization'
    });
    res.end();
    return;
  }

  const parsedUrl = url.parse(req.url, true);
  const pathname = parsedUrl.pathname;
  const method = req.method;
  const dbStatus = getDBStatus();

  try {
    // 1. HEALTH CHECK
    if (method === 'GET' && pathname === '/api/health') {
      return sendJSON(res, 200, {
        status: 'online',
        system: 'Smart & Fair Crop Procurement System REST API',
        mongodb: dbStatus,
        timestamp: new Date().toISOString()
      });
    }

    // 2. DB STATUS CHECK
    if (method === 'GET' && pathname === '/api/db-status') {
      return sendJSON(res, 200, {
        success: true,
        mongodb: dbStatus
      });
    }

    // 3. AUTH: LOGIN
    if (method === 'POST' && pathname === '/api/auth/login') {
      const body = await parseBody(req);
      const { identifier, role } = body;

      if (dbStatus.isConnected) {
        let foundUser = await User.findOne({
          $or: [
            { mobile: identifier },
            { name: new RegExp(`^${identifier}$`, 'i') }
          ]
        });

        const getDefaultName = (rawIdentifier, userRole) => {
          const normRole = (userRole || '').toLowerCase();
          if (normRole.includes('head')) return 'Director S. K. Roy (Head Office)';
          if (normRole.includes('center')) return 'Dr. Vikram Sharma (Center In-Charge)';
          if (rawIdentifier && !rawIdentifier.includes('@')) return rawIdentifier;
          return 'Gurpreet Singh (Procurement Mitra)';
        };

        if (!foundUser) {
          foundUser = {
            id: `USER-${Date.now()}`,
            name: getDefaultName(identifier, role),
            mobile: identifier || '9876543210',
            category: role || 'Volunteer',
            role: role || 'Volunteer',
            village: 'Sonipat Village',
            mandal: 'Sonipat Mandal',
            district: 'Sonipat',
            state: 'Haryana'
          };
        }

        return sendJSON(res, 200, {
          success: true,
          message: 'Login successful (MongoDB)',
          user: foundUser
        });
      } else {
        const foundUser = fallbackUsers.find(u => u.mobile === identifier || u.name.toLowerCase() === identifier.toLowerCase()) || {
          id: `USER-${Date.now()}`,
          name: (role && role.toLowerCase().includes('head'))
            ? 'Director S. K. Roy (Head Office)'
            : (role && role.toLowerCase().includes('center'))
            ? 'Dr. Vikram Sharma (Center In-Charge)'
            : (identifier && !identifier.includes('@') ? identifier : 'Gurpreet Singh (Procurement Mitra)'),
          mobile: identifier || '9876543210',
          category: role || 'Volunteer',
          role: role || 'Volunteer',
          village: 'Sonipat Village',
          mandal: 'Sonipat Mandal',
          district: 'Sonipat',
          state: 'Haryana'
        };

        return sendJSON(res, 200, {
          success: true,
          message: 'Login successful (Fallback Mode)',
          user: foundUser
        });
      }
    }

    // 4. AUTH: REGISTER / CREATE ACCOUNT
    if (method === 'POST' && pathname === '/api/auth/register') {
      const body = await parseBody(req);
      const newUserObj = {
        id: `USER-${Date.now()}`,
        name: body.name || 'Member',
        mobile: body.mobile || '9876543210',
        password: body.password || '',
        category: body.category || 'Volunteer',
        village: body.village || '',
        mandal: body.mandal || '',
        panchayat: body.panchayat || '',
        wardNumber: body.wardNumber || '',
        district: body.district || '',
        state: body.state || 'Haryana',
        createdAt: new Date()
      };

      if (dbStatus.isConnected) {
        const createdUser = await User.create(newUserObj);
        return sendJSON(res, 201, {
          success: true,
          message: 'Account created successfully in MongoDB',
          user: createdUser
        });
      } else {
        fallbackUsers.push(newUserObj);
        return sendJSON(res, 201, {
          success: true,
          message: 'Account created successfully (Fallback Mode)',
          user: newUserObj
        });
      }
    }

    // 5. FARMERS: GET ALL
    if (method === 'GET' && pathname === '/api/farmers') {
      if (dbStatus.isConnected) {
        const farmersList = await Farmer.find().sort({ _id: -1 });
        return sendJSON(res, 200, {
          success: true,
          count: farmersList.length,
          data: farmersList,
          storage: 'MongoDB'
        });
      } else {
        return sendJSON(res, 200, {
          success: true,
          count: fallbackFarmers.length,
          data: fallbackFarmers,
          storage: 'Fallback'
        });
      }
    }

    // 6. FARMERS: CREATE
    if (method === 'POST' && pathname === '/api/farmers') {
      const body = await parseBody(req);

      if (dbStatus.isConnected) {
        const count = await Farmer.countDocuments();
        const newFarmerObj = {
          id: `FARM-${1000 + count + 1}`,
          name: body.name || 'Farmer',
          mobile: body.mobile || '9876543210',
          village: body.village || 'Sonipat Village',
          panchayat: body.panchayat || 'Panchayat 1',
          mandal: body.mandal || 'Sonipat Mandal',
          district: body.district || 'Sonipat',
          state: body.state || 'Haryana',
          registeredDate: new Date().toISOString().split('T')[0]
        };

        const created = await Farmer.create(newFarmerObj);
        return sendJSON(res, 201, {
          success: true,
          message: 'Farmer registered in MongoDB',
          data: created
        });
      } else {
        const newFarmer = {
          id: `FARM-${1000 + fallbackFarmers.length + 1}`,
          name: body.name || 'Farmer',
          mobile: body.mobile || '9876543210',
          village: body.village || 'Sonipat Village',
          panchayat: body.panchayat || 'Panchayat 1',
          mandal: body.mandal || 'Sonipat Mandal',
          district: body.district || 'Sonipat',
          state: body.state || 'Haryana',
          registeredDate: new Date().toISOString().split('T')[0]
        };

        fallbackFarmers.unshift(newFarmer);
        return sendJSON(res, 201, {
          success: true,
          message: 'Farmer registered successfully (Fallback Mode)',
          data: newFarmer
        });
      }
    }

    // 7. FARMERS: UPDATE
    if (method === 'PUT' && pathname.startsWith('/api/farmers/')) {
      const id = pathname.replace('/api/farmers/', '');
      const body = await parseBody(req);

      if (dbStatus.isConnected) {
        const updated = await Farmer.findOneAndUpdate({ id }, body, { new: true });
        return sendJSON(res, 200, {
          success: true,
          message: 'Farmer updated in MongoDB',
          data: updated
        });
      } else {
        fallbackFarmers = fallbackFarmers.map(f => (f.id === id ? { ...f, ...body } : f));
        const updated = fallbackFarmers.find(f => f.id === id);
        return sendJSON(res, 200, {
          success: true,
          message: 'Farmer updated successfully (Fallback Mode)',
          data: updated
        });
      }
    }

    // 8. QUANTITIES: GET ALL
    if (method === 'GET' && pathname === '/api/quantities') {
      if (dbStatus.isConnected) {
        const list = await Quantity.find();
        const quantitiesObj = {};
        let total = 0;

        list.forEach(q => {
          quantitiesObj[q.category] = {
            category: q.category,
            quantity: q.quantity,
            status: q.status
          };
          total += q.quantity;
        });

        // Ensure default structure if empty
        ['A', 'B', 'C'].forEach(cat => {
          if (!quantitiesObj[cat]) {
            quantitiesObj[cat] = fallbackQuantities[cat];
          }
        });

        return sendJSON(res, 200, {
          success: true,
          totalQuantity: total,
          data: quantitiesObj,
          storage: 'MongoDB'
        });
      } else {
        const total = fallbackQuantities.A.quantity + fallbackQuantities.B.quantity + fallbackQuantities.C.quantity;
        return sendJSON(res, 200, {
          success: true,
          totalQuantity: total,
          data: fallbackQuantities,
          storage: 'Fallback'
        });
      }
    }

    // 9. QUANTITIES: UPDATE
    if (method === 'PUT' && pathname.startsWith('/api/quantities/')) {
      const category = pathname.replace('/api/quantities/', '').toUpperCase();
      const body = await parseBody(req);

      if (['A', 'B', 'C'].includes(category)) {
        if (dbStatus.isConnected) {
          await Quantity.findOneAndUpdate(
            { category },
            { quantity: Number(body.quantity) },
            { new: true, upsert: true }
          );

          const list = await Quantity.find();
          const quantitiesObj = {};
          let total = 0;
          list.forEach(q => {
            quantitiesObj[q.category] = {
              category: q.category,
              quantity: q.quantity,
              status: q.status
            };
            total += q.quantity;
          });

          return sendJSON(res, 200, {
            success: true,
            message: `Category ${category} quantity updated in MongoDB`,
            totalQuantity: total,
            data: quantitiesObj
          });
        } else {
          fallbackQuantities[category].quantity = Number(body.quantity);
          const total = fallbackQuantities.A.quantity + fallbackQuantities.B.quantity + fallbackQuantities.C.quantity;

          return sendJSON(res, 200, {
            success: true,
            message: `Category ${category} quantity updated (Fallback Mode)`,
            totalQuantity: total,
            data: fallbackQuantities
          });
        }
      }

      return sendJSON(res, 400, { success: false, message: 'Invalid category' });
    }

    // 10. CENTER IN CHARGE: GET DETAILS
    if (method === 'GET' && pathname === '/api/center') {
      if (dbStatus.isConnected) {
        const centerData = await Center.findOne();
        return sendJSON(res, 200, {
          success: true,
          data: centerData || fallbackCenter,
          storage: 'MongoDB'
        });
      } else {
        return sendJSON(res, 200, {
          success: true,
          data: fallbackCenter,
          storage: 'Fallback'
        });
      }
    }

    // 10b. CENTER ALLOCATION: POST /api/centers/allocate
    if (method === 'POST' && pathname === '/api/centers/allocate') {
      const body = await parseBody(req);
      const { farmerName, mobile, cropName, quantityKg } = body;
      const qty = Number(quantityKg) || 0;

      let centerData = fallbackQuantities;

      if (dbStatus.isConnected) {
        const list = await Quantity.find();
        if (list && list.length > 0) {
          list.forEach(q => {
            centerData[q.category] = {
              category: q.category,
              name: q.name || `${q.category} Center`,
              capacity: q.capacity || 5000,
              currentStock: q.currentStock || 0,
              available: q.available !== undefined ? q.available : (q.capacity || 5000) - (q.currentStock || 0),
              status: q.status || 'AVAILABLE'
            };
          });
        }
      }

      let assignedCategory = null;
      let assignedName = '';
      let statusMessage = '';
      let notificationText = '';

      if (centerData.A.available >= qty) {
        assignedCategory = 'A';
        assignedName = 'A Center (Priority Collection Center)';
        statusMessage = 'Assigned to A Center';
        notificationText = `Dear Farmer, Please bring your ${cropName || 'Crop'} (${qty} kg) to A Center on 29 August at 9:00 AM.`;
        centerData.A.currentStock += qty;
        centerData.A.available -= qty;
        centerData.A.status = centerData.A.available === 0 ? 'FULL' : (centerData.A.available < 1000 ? 'LIMITED' : 'AVAILABLE');
      } else if (centerData.B.available >= qty) {
        assignedCategory = 'B';
        assignedName = 'B Center (Secondary Collection Center)';
        statusMessage = 'A Center is currently full. Your crop has been assigned to B Center.';
        notificationText = `Dear Farmer, A Center is currently full. Please bring your ${cropName || 'Crop'} to B Center on 29 August at 9:00 AM.`;
        centerData.B.currentStock += qty;
        centerData.B.available -= qty;
        centerData.B.status = centerData.B.available === 0 ? 'FULL' : (centerData.B.available < 1000 ? 'LIMITED' : 'AVAILABLE');
      } else if (centerData.C.available >= qty) {
        assignedCategory = 'C';
        assignedName = 'C Center (Overflow Collection Center)';
        statusMessage = 'A & B Centers are currently full. Your crop has been assigned to C Center.';
        notificationText = `Dear Farmer, A & B Centers are currently full. Please bring your ${cropName || 'Crop'} to C Center on 29 August at 9:00 AM.`;
        centerData.C.currentStock += qty;
        centerData.C.available -= qty;
        centerData.C.status = centerData.C.available === 0 ? 'FULL' : (centerData.C.available < 1000 ? 'LIMITED' : 'AVAILABLE');
      } else {
        assignedCategory = 'WAITING';
        assignedName = 'Waiting Queue';
        statusMessage = 'All Collection Centers Full';
        notificationText = `Dear Farmer, All Collection Centers are currently full. You have been added to the waiting list. Procurement Mitra has been notified.`;
      }

      if (dbStatus.isConnected && ['A', 'B', 'C'].includes(assignedCategory)) {
        await Quantity.findOneAndUpdate(
          { category: assignedCategory },
          {
            currentStock: centerData[assignedCategory].currentStock,
            available: centerData[assignedCategory].available,
            status: centerData[assignedCategory].status
          },
          { upsert: true }
        );
      }

      return sendJSON(res, 200, {
        success: true,
        assignedCategory,
        assignedName,
        statusMessage,
        notificationText,
        centers: centerData
      });
    }

    // 11. CROPS: GET ALL
    if (method === 'GET' && pathname === '/api/crops') {
      if (dbStatus.isConnected) {
        const cropsList = await Crop.find().sort({ _id: -1 });
        return sendJSON(res, 200, {
          success: true,
          count: cropsList.length,
          data: cropsList,
          storage: 'MongoDB'
        });
      } else {
        return sendJSON(res, 200, {
          success: true,
          count: fallbackCrops.length,
          data: fallbackCrops,
          storage: 'Fallback'
        });
      }
    }

    // 12. CROPS: CREATE TRACK
    if (method === 'POST' && pathname === '/api/crops') {
      const body = await parseBody(req);

      if (dbStatus.isConnected) {
        const count = await Crop.countDocuments();
        const newCropObj = {
          id: `CROP-${200 + count + 1}`,
          farmerId: body.farmerId || 'FARM-1001',
          farmerName: body.farmerName || 'Ramesh Kumar',
          cropName: body.cropName || 'Wheat',
          cropCategory: body.cropCategory || 'Cereal',
          sowingDate: body.sowingDate || '2026-05-15',
          expectedHarvestDate: body.expectedHarvestDate || '2026-09-20',
          currentStage: body.currentStage || 'Planted',
          quantity: body.quantity || '500 kg',
          cropStatus: `Tracking - Stage: ${body.currentStage || 'Planted'}`,
          remarks: body.remarks || 'Initial tracking started'
        };

        const created = await Crop.create(newCropObj);
        return sendJSON(res, 201, {
          success: true,
          message: 'Crop tracking record created in MongoDB',
          data: created
        });
      } else {
        const newCrop = {
          id: `CROP-${200 + fallbackCrops.length + 1}`,
          farmerId: body.farmerId || 'FARM-1001',
          farmerName: body.farmerName || 'Ramesh Kumar',
          cropName: body.cropName || 'Wheat',
          cropCategory: body.cropCategory || 'Cereal',
          sowingDate: body.sowingDate || '2026-05-15',
          expectedHarvestDate: body.expectedHarvestDate || '2026-09-20',
          currentStage: body.currentStage || 'Planted',
          quantity: body.quantity || '500 kg',
          cropStatus: `Tracking - Stage: ${body.currentStage || 'Planted'}`,
          remarks: body.remarks || 'Initial tracking started'
        };

        fallbackCrops.unshift(newCrop);
        return sendJSON(res, 201, {
          success: true,
          message: 'Crop tracking record created (Fallback Mode)',
          data: newCrop
        });
      }
    }

    // 13. AI QUALITY SCAN: POST /api/quality-scan
    if (method === 'POST' && pathname === '/api/quality-scan') {
      const body = await parseBody(req);
      const { farmerId, cropId, cropName, imageBase64, mimeType } = body;

      if (!farmerId || !cropId) {
        return sendJSON(res, 400, {
          success: false,
          message: 'farmerId and cropId are required'
        });
      }

      if (!imageBase64) {
        return sendJSON(res, 400, {
          success: false,
          message: 'Crop image is required for AI Quality Scan'
        });
      }

      try {
        const aiResult = await analyzeCropWithGemini(imageBase64, mimeType, cropName || 'Crop');

        const scanData = {
          farmerId,
          cropId,
          cropName: aiResult.cropName,
          qualityGrade: aiResult.qualityGrade,
          qualityLevel: aiResult.qualityLevel,
          confidence: aiResult.confidence,
          observations: aiResult.observations,
          recommendation: aiResult.recommendation,
          scanDate: new Date().toISOString(),
          imageUrl: imageBase64.substring(0, 100) + '...'
        };

        if (dbStatus.isConnected) {
          const savedResult = await QualityScanResult.findOneAndUpdate(
            { farmerId, cropId },
            scanData,
            { new: true, upsert: true }
          );
          return sendJSON(res, 200, {
            success: true,
            message: 'AI Quality Scan completed successfully',
            data: savedResult
          });
        } else {
          fallbackQualityScans = fallbackQualityScans.filter(s => !(s.farmerId === farmerId && s.cropId === cropId));
          fallbackQualityScans.push(scanData);
          return sendJSON(res, 200, {
            success: true,
            message: 'AI Quality Scan completed successfully (Fallback Mode)',
            data: scanData
          });
        }
      } catch (err) {
        console.error('AI Quality Scan Error:', err.message);
        return sendJSON(res, 503, {
          success: false,
          message: 'AI quality analysis is currently unavailable. Please try again.'
        });
      }
    }

    // 14. AI QUALITY SCAN: GET /api/quality-scan
    if (method === 'GET' && pathname === '/api/quality-scan') {
      const farmerId = parsedUrl.query.farmerId;
      const cropId = parsedUrl.query.cropId;

      if (dbStatus.isConnected) {
        const result = await QualityScanResult.findOne({ farmerId, cropId });
        return sendJSON(res, 200, {
          success: true,
          data: result || null
        });
      } else {
        const result = fallbackQualityScans.find(s => s.farmerId === farmerId && s.cropId === cropId);
        return sendJSON(res, 200, {
          success: true,
          data: result || null
        });
      }
    }

    // 15. CENTER PROPOSALS: POST /api/proposals
    if (method === 'POST' && pathname === '/api/proposals') {
      const body = await parseBody(req);
      const { farmerId, farmerName, cropId, cropName, quantity, qualityGrade, confidence } = body;

      const centerMap = {
        A: 'A Quality Center (Silo Hub #42)',
        B: 'B Quality Center (Standard Procurement Hub #18)',
        C: 'C Quality Center (Industrial Processing Hub #05)'
      };

      const proposalData = {
        id: `PROP-${Date.now()}`,
        farmerId: farmerId || 'FARM-1001',
        farmerName: farmerName || 'Ramesh Kumar',
        cropId: cropId || 'CROP-201',
        cropName: cropName || 'Wheat',
        quantity: quantity || '0 kg',
        qualityGrade: qualityGrade || 'A',
        confidence: confidence || 85,
        centerName: centerMap[qualityGrade] || 'A Quality Center',
        status: 'Pending',
        createdDate: new Date().toISOString()
      };

      if (dbStatus.isConnected) {
        const created = await CenterProposal.create(proposalData);
        return sendJSON(res, 201, {
          success: true,
          message: 'Proposal sent to Quality Center',
          data: created
        });
      } else {
        fallbackProposals.push(proposalData);
        return sendJSON(res, 201, {
          success: true,
          message: 'Proposal sent to Quality Center (Fallback Mode)',
          data: proposalData
        });
      }
    }

    // 16. CENTER PROPOSALS: GET /api/proposals
    if (method === 'GET' && pathname === '/api/proposals') {
      const farmerId = parsedUrl.query.farmerId;
      const cropId = parsedUrl.query.cropId;

      if (dbStatus.isConnected) {
        const query = (farmerId && cropId) ? { farmerId, cropId } : {};
        const list = await CenterProposal.find(query).sort({ _id: -1 });
        return sendJSON(res, 200, {
          success: true,
          data: (farmerId && cropId) ? (list[0] || null) : list
        });
      } else {
        if (farmerId && cropId) {
          const found = fallbackProposals.find(p => p.farmerId === farmerId && p.cropId === cropId);
          return sendJSON(res, 200, { success: true, data: found || null });
        }
        return sendJSON(res, 200, { success: true, data: fallbackProposals });
      }
    }

    // 17. CENTER PROPOSALS: POST /api/proposals/accept & reject
    if (method === 'POST' && (pathname === '/api/proposals/accept' || pathname === '/api/proposals/reject')) {
      const body = await parseBody(req);
      const { proposalId } = body;
      const isAccept = pathname.endsWith('/accept');
      const newStatus = isAccept ? 'Accepted' : 'Rejected';

      if (dbStatus.isConnected) {
        const proposal = await CenterProposal.findOneAndUpdate(
          { id: proposalId },
          { status: newStatus },
          { new: true }
        );

        let tracking = null;
        if (isAccept && proposal) {
          tracking = await CropTrackingRecord.findOneAndUpdate(
            { farmerId: proposal.farmerId, cropId: proposal.cropId },
            {
              id: `TRACK-${Date.now()}`,
              farmerId: proposal.farmerId,
              cropId: proposal.cropId,
              proposalId: proposal.id,
              cropName: proposal.cropName,
              currentStage: 'Center Accepted',
              stageHistory: [
                { stage: 'Crop Submitted', timestamp: new Date(Date.now() - 3600000 * 4).toISOString(), remarks: 'Farmer registered harvest' },
                { stage: 'AI Quality Checked', timestamp: new Date(Date.now() - 3600000 * 3).toISOString(), remarks: `Grade ${proposal.qualityGrade} assigned via Gemini AI` },
                { stage: 'Quality Grade Assigned', timestamp: new Date(Date.now() - 3600000 * 2).toISOString(), remarks: `Grade ${proposal.qualityGrade} verified` },
                { stage: 'Proposal Sent', timestamp: new Date(Date.now() - 3600000 * 1).toISOString(), remarks: `Sent to ${proposal.centerName}` },
                { stage: 'Center Accepted', timestamp: new Date().toISOString(), remarks: 'Proposal accepted by Center in Charge' }
              ],
              lastUpdated: new Date().toISOString()
            },
            { new: true, upsert: true }
          );
        }

        return sendJSON(res, 200, {
          success: true,
          message: `Proposal ${newStatus.toLowerCase()} successfully`,
          proposal,
          tracking
        });
      } else {
        fallbackProposals = fallbackProposals.map(p => p.id === proposalId ? { ...p, status: newStatus } : p);
        const proposal = fallbackProposals.find(p => p.id === proposalId);

        let tracking = null;
        if (isAccept && proposal) {
          tracking = {
            id: `TRACK-${Date.now()}`,
            farmerId: proposal.farmerId,
            cropId: proposal.cropId,
            proposalId: proposal.id,
            cropName: proposal.cropName,
            currentStage: 'Center Accepted',
            stageHistory: [
              { stage: 'Crop Submitted', timestamp: new Date(Date.now() - 3600000 * 4).toISOString(), remarks: 'Farmer registered harvest' },
              { stage: 'AI Quality Checked', timestamp: new Date(Date.now() - 3600000 * 3).toISOString(), remarks: `Grade ${proposal.qualityGrade} assigned via Gemini AI` },
              { stage: 'Quality Grade Assigned', timestamp: new Date(Date.now() - 3600000 * 2).toISOString(), remarks: `Grade ${proposal.qualityGrade} verified` },
              { stage: 'Proposal Sent', timestamp: new Date(Date.now() - 3600000 * 1).toISOString(), remarks: `Sent to ${proposal.centerName}` },
              { stage: 'Center Accepted', timestamp: new Date().toISOString(), remarks: 'Proposal accepted by Center in Charge' }
            ],
            lastUpdated: new Date().toISOString()
          };
          fallbackTrackings.push(tracking);
        }

        return sendJSON(res, 200, {
          success: true,
          message: `Proposal ${newStatus.toLowerCase()} successfully (Fallback Mode)`,
          proposal,
          tracking
        });
      }
    }

    // 18. CROP TRACKING: GET /api/tracking
    if (method === 'GET' && pathname === '/api/tracking') {
      const farmerId = parsedUrl.query.farmerId;
      const cropId = parsedUrl.query.cropId;

      if (dbStatus.isConnected) {
        const tracking = await CropTrackingRecord.findOne({ farmerId, cropId });
        return sendJSON(res, 200, {
          success: true,
          data: tracking || null
        });
      } else {
        const tracking = fallbackTrackings.find(t => t.farmerId === farmerId && t.cropId === cropId);
        return sendJSON(res, 200, {
          success: true,
          data: tracking || null
        });
      }
    }

    // 19. CROP TRACKING: POST /api/tracking/advance
    if (method === 'POST' && pathname === '/api/tracking/advance') {
      const body = await parseBody(req);
      const { farmerId, cropId, nextStage } = body;

      if (dbStatus.isConnected) {
        const tracking = await CropTrackingRecord.findOne({ farmerId, cropId });
        if (tracking) {
          tracking.currentStage = nextStage;
          tracking.stageHistory.push({
            stage: nextStage,
            timestamp: new Date().toISOString(),
            remarks: `Stage advanced to ${nextStage}`
          });
          tracking.lastUpdated = new Date().toISOString();
          await tracking.save();
        }
        return sendJSON(res, 200, {
          success: true,
          message: `Tracking advanced to ${nextStage}`,
          data: tracking
        });
      } else {
        let tracking = fallbackTrackings.find(t => t.farmerId === farmerId && t.cropId === cropId);
        if (tracking) {
          tracking.currentStage = nextStage;
          tracking.stageHistory.push({
            stage: nextStage,
            timestamp: new Date().toISOString(),
            remarks: `Stage advanced to ${nextStage}`
          });
          tracking.lastUpdated = new Date().toISOString();
        }
        return sendJSON(res, 200, {
          success: true,
          message: `Tracking advanced to ${nextStage} (Fallback Mode)`,
          data: tracking
        });
      }
    }

    // Fallback 404
    sendJSON(res, 404, { success: false, message: 'API Endpoint Not Found' });
  } catch (error) {
    console.error('API Error:', error);
    sendJSON(res, 500, { success: false, message: 'Internal Server Error', error: error.message });
  }
});

// SERVER ERROR HANDLING & DYNAMIC PORT FALLBACK
server.on('error', (err) => {
  if (err.code === 'EADDRINUSE') {
    console.warn(`\n⚠️  Port ${currentPort} is currently in use (EADDRINUSE).`);
    console.warn(`👉 Automatically picking alternative available port: ${currentPort + 1}...\n`);
    currentPort += 1;
    setTimeout(() => {
      server.listen(currentPort);
    }, 300);
  } else {
    console.error('❌ Server error:', err.message);
  }
});

server.on('listening', async () => {
  const address = server.address();
  const actualPort = typeof address === 'string' ? address : address.port;
  console.log(`🚀 Smart & Fair Crop Procurement REST API Server running on http://127.0.0.1:${actualPort}`);
  console.log('🔄 Connecting to MongoDB Atlas...');
  await connectDB();
});

// START SERVER
server.listen(currentPort);

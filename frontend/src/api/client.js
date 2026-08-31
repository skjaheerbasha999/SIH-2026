const API_BASE_URL = 'http://127.0.0.1:5000/api';

export const apiClient = {
  // 1. HEALTH CHECK
  checkHealth: async () => {
    try {
      const res = await fetch(`${API_BASE_URL}/health`);
      return await res.json();
    } catch (err) {
      console.warn('Backend API server offline, running client fallback:', err);
      return { status: 'fallback', message: 'Local client mode active' };
    }
  },

  // 2. AUTH: LOGIN
  login: async (identifier, password, role = 'Volunteer') => {
    try {
      const res = await fetch(`${API_BASE_URL}/auth/login`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ identifier, password, role })
      });
      return await res.json();
    } catch (err) {
      return {
        success: true,
        user: {
          name: role.toLowerCase().includes('center') ? 'Dr. Vikram Sharma' : role.toLowerCase().includes('head') ? 'Director S. K. Roy' : 'Gurpreet Singh',
          identifier: identifier,
          role: role,
          category: role,
          village: 'Sonipat Village',
          mandal: 'Sonipat Mandal',
          district: 'Sonipat',
          state: 'Haryana'
        }
      };
    }
  },

  // 3. AUTH: REGISTER / CREATE ACCOUNT
  register: async (userData) => {
    try {
      const res = await fetch(`${API_BASE_URL}/auth/register`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(userData)
      });
      return await res.json();
    } catch (err) {
      return {
        success: true,
        user: userData
      };
    }
  },

  // 4. FARMERS: GET ALL
  getFarmers: async () => {
    try {
      const res = await fetch(`${API_BASE_URL}/farmers`);
      return await res.json();
    } catch (err) {
      return { success: false, fallback: true };
    }
  },

  // 5. FARMERS: CREATE
  createFarmer: async (farmerData) => {
    try {
      const res = await fetch(`${API_BASE_URL}/farmers`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(farmerData)
      });
      return await res.json();
    } catch (err) {
      return { success: true, data: { ...farmerData, id: `FARM-${Date.now()}` } };
    }
  },

  // 6. QUANTITIES: GET ALL
  getQuantities: async () => {
    try {
      const res = await fetch(`${API_BASE_URL}/quantities`);
      return await res.json();
    } catch (err) {
      return { success: false, fallback: true };
    }
  },

  // 7. QUANTITIES: UPDATE
  updateQuantity: async (category, newQuantity) => {
    try {
      const res = await fetch(`${API_BASE_URL}/quantities/${category}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ quantity: newQuantity })
      });
      return await res.json();
    } catch (err) {
      return { success: true };
    }
  },

  // 8. CENTER: GET DETAILS
  getCenter: async () => {
    try {
      const res = await fetch(`${API_BASE_URL}/center`);
      return await res.json();
    } catch (err) {
      return { success: false, fallback: true };
    }
  },

  // 9. CROPS: GET ALL
  getCrops: async () => {
    try {
      const res = await fetch(`${API_BASE_URL}/crops`);
      return await res.json();
    } catch (err) {
      return { success: false, fallback: true };
    }
  },

  // 10. CROPS: CREATE
  createCrop: async (cropData) => {
    try {
      const res = await fetch(`${API_BASE_URL}/crops`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(cropData)
      });
      return await res.json();
    } catch (err) {
      return { success: true, data: { ...cropData, id: `CROP-${Date.now()}` } };
    }
  },

  // 11. AI QUALITY SCAN: POST /api/quality-scan
  scanQuality: async (scanPayload) => {
    try {
      const res = await fetch(`${API_BASE_URL}/quality-scan`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(scanPayload)
      });
      return await res.json();
    } catch (err) {
      return {
        success: false,
        message: 'AI quality analysis is currently unavailable. Please try again.'
      };
    }
  },

  // 12. AI QUALITY SCAN: GET /api/quality-scan
  getQualityScan: async (farmerId, cropId) => {
    try {
      const res = await fetch(`${API_BASE_URL}/quality-scan?farmerId=${farmerId}&cropId=${cropId}`);
      return await res.json();
    } catch (err) {
      return { success: false, data: null };
    }
  },

  // 13. CENTER PROPOSALS: POST /api/proposals
  sendProposal: async (proposalPayload) => {
    try {
      const res = await fetch(`${API_BASE_URL}/proposals`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(proposalPayload)
      });
      return await res.json();
    } catch (err) {
      return { success: false, message: 'Failed to send proposal to center.' };
    }
  },

  // 14. CENTER PROPOSALS: GET /api/proposals
  getProposal: async (farmerId, cropId) => {
    try {
      const url = (farmerId && cropId)
        ? `${API_BASE_URL}/proposals?farmerId=${farmerId}&cropId=${cropId}`
        : `${API_BASE_URL}/proposals`;
      const res = await fetch(url);
      return await res.json();
    } catch (err) {
      return { success: false, data: null };
    }
  },

  // 15. CENTER PROPOSALS: POST /api/proposals/accept
  acceptProposal: async (proposalId) => {
    try {
      const res = await fetch(`${API_BASE_URL}/proposals/accept`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ proposalId })
      });
      return await res.json();
    } catch (err) {
      return { success: false, message: 'Failed to accept proposal.' };
    }
  },

  // 16. CENTER PROPOSALS: POST /api/proposals/reject
  rejectProposal: async (proposalId) => {
    try {
      const res = await fetch(`${API_BASE_URL}/proposals/reject`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ proposalId })
      });
      return await res.json();
    } catch (err) {
      return { success: false, message: 'Failed to reject proposal.' };
    }
  },

  // 17. CROP TRACKING: GET /api/tracking
  getTracking: async (farmerId, cropId) => {
    try {
      const res = await fetch(`${API_BASE_URL}/tracking?farmerId=${farmerId}&cropId=${cropId}`);
      return await res.json();
    } catch (err) {
      return { success: false, data: null };
    }
  },

  // 18. CROP TRACKING: POST /api/tracking/advance
  advanceTracking: async (farmerId, cropId, nextStage) => {
    try {
      const res = await fetch(`${API_BASE_URL}/tracking/advance`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ farmerId, cropId, nextStage })
      });
      return await res.json();
    } catch (err) {
      return { success: false, message: 'Failed to advance tracking stage.' };
    }
  },

  // 19. CENTER ALLOCATION: POST /api/centers/allocate
  allocateCenter: async (farmerName, mobile, cropName, quantityKg) => {
    try {
      const res = await fetch(`${API_BASE_URL}/centers/allocate`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ farmerName, mobile, cropName, quantityKg })
      });
      return await res.json();
    } catch (err) {
      return { success: false, fallback: true };
    }
  }
};

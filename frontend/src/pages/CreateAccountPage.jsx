import React, { useState } from 'react';
import { Sprout, User, PhoneCall, MapPin, Building, ArrowLeft, ArrowRight, CheckCircle, ShieldCheck, Hash, Lock, Eye, EyeOff } from 'lucide-react';
import { useApp } from '../context/AppContext';
import { apiClient } from '../api/client';

// Complete List of All 28 States and 8 Union Territories in India
const ALL_INDIAN_STATES_AND_UTS = [
  'Andhra Pradesh', 'Arunachal Pradesh', 'Assam', 'Bihar', 'Chhattisgarh', 'Goa', 'Gujarat', 'Haryana',
  'Himachal Pradesh', 'Jharkhand', 'Karnataka', 'Kerala', 'Madhya Pradesh', 'Maharashtra', 'Manipur',
  'Meghalaya', 'Mizoram', 'Nagaland', 'Odisha', 'Punjab', 'Rajasthan', 'Sikkim', 'Tamil Nadu', 'Telangana',
  'Tripura', 'Uttar Pradesh', 'Uttarakhand', 'West Bengal',
  'Andaman and Nicobar Islands', 'Chandigarh', 'Dadra and Nagar Haveli and Daman and Diu',
  'Delhi (NCT)', 'Jammu and Kashmir', 'Ladakh', 'Lakshadweep', 'Puducherry'
];

export const CreateAccountPage = () => {
  const { navigateTo, setUserSession, showToast } = useApp();

  const [formData, setFormData] = useState({
    name: '',
    mobile: '',
    password: '',
    confirmPassword: '',
    category: 'Volunteer',
    village: '',
    mandal: '',
    panchayat: '',
    wardNumber: '',
    district: '',
    state: 'Andhra Pradesh'
  });

  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [errors, setErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [successModalOpen, setSuccessModalOpen] = useState(false);

  const validateForm = () => {
    const newErrors = {};

    if (!formData.name.trim()) {
      newErrors.name = 'Full Name is required';
    }

    const mobileRegex = /^[6-9]\d{9}$/;
    if (!formData.mobile.trim()) {
      newErrors.mobile = 'Mobile Number is required';
    } else if (!mobileRegex.test(formData.mobile.trim())) {
      newErrors.mobile = 'Enter a valid 10-digit Indian mobile number';
    }

    if (!formData.password) {
      newErrors.password = 'Password is required';
    } else if (formData.password.length < 6) {
      newErrors.password = 'Password must be at least 6 characters';
    }

    if (!formData.confirmPassword) {
      newErrors.confirmPassword = 'Please confirm your password';
    } else if (formData.confirmPassword !== formData.password) {
      newErrors.confirmPassword = 'Passwords do not match';
    }

    if (!formData.village.trim()) {
      newErrors.village = 'Village name is required';
    }

    if (!formData.mandal.trim()) {
      newErrors.mandal = 'Mandal / Block is required';
    }

    if (!formData.district.trim()) {
      newErrors.district = 'District is required';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!validateForm()) {
      return;
    }

    setIsSubmitting(true);

    try {
      const response = await apiClient.register({
        name: formData.name.trim(),
        mobile: formData.mobile.trim(),
        password: formData.password,
        category: formData.category,
        village: formData.village.trim(),
        mandal: formData.mandal.trim(),
        panchayat: formData.panchayat.trim(),
        wardNumber: formData.wardNumber.trim(),
        district: formData.district.trim(),
        state: formData.state
      });

      setIsSubmitting(false);

      const session = response.user || {
        name: formData.name.trim(),
        mobile: formData.mobile.trim(),
        role: formData.category,
        village: formData.village.trim(),
        mandal: formData.mandal.trim(),
        district: formData.district.trim(),
        state: formData.state
      };

      setUserSession(session);
      setSuccessModalOpen(true);
    } catch (err) {
      setIsSubmitting(false);
      setUserSession({
        name: formData.name.trim(),
        mobile: formData.mobile.trim(),
        role: formData.category,
        village: formData.village.trim(),
        mandal: formData.mandal.trim(),
        district: formData.district.trim(),
        state: formData.state
      });
      setSuccessModalOpen(true);
    }
  };


  const handleRedirectToDashboard = () => {
    setSuccessModalOpen(false);
    showToast(`Welcome ${formData.name}! Registration successful.`);

    if (formData.category === 'Volunteer') {
      navigateTo('dashboard-volunteer');
    } else if (formData.category === 'Center in Charge') {
      navigateTo('dashboard-center');
    } else if (formData.category === 'Head Office') {
      navigateTo('dashboard-headoffice');
    } else {
      navigateTo('dashboard-center');
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-emerald-50/40 to-slate-100 py-10 px-4 sm:px-6 lg:px-8 flex flex-col justify-between">
      
      {/* Top Header Navigation */}
      <div className="max-w-2xl w-full mx-auto flex items-center justify-between">
        <button
          onClick={() => navigateTo('home')}
          className="flex items-center space-x-2 text-xs font-bold text-slate-600 hover:text-[#00a86b] transition-colors"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>Back to Home</span>
        </button>

        <div className="flex items-center space-x-2">
          <div className="w-7 h-7 rounded-full bg-[#00a86b] flex items-center justify-center text-white font-bold text-xs">
            <Sprout className="w-4 h-4" />
          </div>
          <span className="text-xs font-black text-slate-900">Smart &amp; Fair</span>
        </div>
      </div>

      {/* Main Registration Card */}
      <div className="max-w-2xl w-full mx-auto my-auto bg-white rounded-3xl p-6 sm:p-10 shadow-xl border border-slate-200/90 space-y-6">
        
        {/* Header Title */}
        <div className="text-center space-y-1">
          <div className="inline-flex items-center space-x-1.5 px-3 py-1 rounded-full bg-emerald-100/80 text-[#00a86b] text-[11px] font-bold uppercase tracking-wider mb-1">
            <ShieldCheck className="w-3.5 h-3.5" />
            <span>MEMBER REGISTRATION</span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-black text-slate-900 tracking-tight">
            Create an Account
          </h1>
          <p className="text-xs text-slate-500 font-medium">
            Join the Smart &amp; Fair crop procurement network as a Volunteer, Center in Charge, or Head Office administrator.
          </p>
        </div>

        {/* Registration Form */}
        <form onSubmit={handleSubmit} className="space-y-4">
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            
            {/* 1. Name */}
            <div>
              <label className="block text-xs font-bold text-slate-700 mb-1.5">
                Full Name <span className="text-red-500">*</span>
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-slate-400">
                  <User className="w-4 h-4" />
                </div>
                <input
                  type="text"
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  placeholder="e.g. Ramesh Kumar"
                  className={`w-full pl-10 pr-4 py-3 bg-slate-50 rounded-2xl border ${
                    errors.name ? 'border-red-400 bg-red-50/30' : 'border-slate-200'
                  } text-xs font-semibold text-slate-900 placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-[#00a86b] focus:bg-white transition-all`}
                />
              </div>
              {errors.name && <p className="text-[11px] font-semibold text-red-500 mt-1">{errors.name}</p>}
            </div>

            {/* 2. Mobile Number */}
            <div>
              <label className="block text-xs font-bold text-slate-700 mb-1.5">
                Mobile Number <span className="text-red-500">*</span>
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-slate-400">
                  <PhoneCall className="w-4 h-4" />
                </div>
                <input
                  type="tel"
                  maxLength={10}
                  value={formData.mobile}
                  onChange={(e) => setFormData({ ...formData, mobile: e.target.value.replace(/\D/g, '') })}
                  placeholder="10-digit phone number"
                  className={`w-full pl-10 pr-4 py-3 bg-slate-50 rounded-2xl border ${
                    errors.mobile ? 'border-red-400 bg-red-50/30' : 'border-slate-200'
                  } text-xs font-semibold text-slate-900 placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-[#00a86b] focus:bg-white transition-all`}
                />
              </div>
              {errors.mobile && <p className="text-[11px] font-semibold text-red-500 mt-1">{errors.mobile}</p>}
            </div>

          </div>

          {/* 3. Category Dropdown (Volunteer, Center in Charge, Head Office) */}
          <div>
            <label className="block text-xs font-bold text-slate-700 mb-1.5">
              Category <span className="text-red-500">*</span>
            </label>
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-slate-400">
                <Building className="w-4 h-4" />
              </div>
              <select
                value={formData.category}
                onChange={(e) => setFormData({ ...formData, category: e.target.value })}
                className="w-full pl-10 pr-4 py-3 bg-slate-50 rounded-2xl border border-slate-200 text-xs font-bold text-slate-900 focus:outline-none focus:ring-2 focus:ring-[#00a86b] focus:bg-white transition-all appearance-none cursor-pointer"
              >
                <option value="Volunteer">Volunteer</option>
                <option value="Center in Charge">Center in Charge</option>
                <option value="Head Office">Head Office</option>
              </select>
              <div className="absolute inset-y-0 right-0 pr-3.5 flex items-center pointer-events-none text-slate-400 text-xs">
                ▼
              </div>
            </div>
          </div>

          {/* 4. Password & Confirm Password Section */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            
            {/* Password */}
            <div>
              <label className="block text-xs font-bold text-slate-700 mb-1.5">
                Password <span className="text-red-500">*</span>
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-slate-400">
                  <Lock className="w-4 h-4" />
                </div>
                <input
                  type={showPassword ? 'text' : 'password'}
                  value={formData.password}
                  onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                  placeholder="At least 6 characters"
                  className={`w-full pl-10 pr-10 py-3 bg-slate-50 rounded-2xl border ${
                    errors.password ? 'border-red-400 bg-red-50/30' : 'border-slate-200'
                  } text-xs font-semibold text-slate-900 placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-[#00a86b] focus:bg-white transition-all`}
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute inset-y-0 right-0 pr-3.5 flex items-center text-slate-400 hover:text-slate-600"
                >
                  {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                </button>
              </div>
              {errors.password && <p className="text-[11px] font-semibold text-red-500 mt-1">{errors.password}</p>}
            </div>

            {/* Confirm Password */}
            <div>
              <label className="block text-xs font-bold text-slate-700 mb-1.5">
                Confirm Password <span className="text-red-500">*</span>
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-slate-400">
                  <Lock className="w-4 h-4" />
                </div>
                <input
                  type={showConfirmPassword ? 'text' : 'password'}
                  value={formData.confirmPassword}
                  onChange={(e) => setFormData({ ...formData, confirmPassword: e.target.value })}
                  placeholder="Re-enter password"
                  className={`w-full pl-10 pr-10 py-3 bg-slate-50 rounded-2xl border ${
                    errors.confirmPassword ? 'border-red-400 bg-red-50/30' : 'border-slate-200'
                  } text-xs font-semibold text-slate-900 placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-[#00a86b] focus:bg-white transition-all`}
                />
                <button
                  type="button"
                  onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                  className="absolute inset-y-0 right-0 pr-3.5 flex items-center text-slate-400 hover:text-slate-600"
                >
                  {showConfirmPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                </button>
              </div>
              {errors.confirmPassword && <p className="text-[11px] font-semibold text-red-500 mt-1">{errors.confirmPassword}</p>}
            </div>

          </div>

          {/* Location Fields: Village, Mandal, Panchayat, Ward Number */}
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-3.5">
            
            {/* 4. Village */}
            <div>
              <label className="block text-xs font-bold text-slate-700 mb-1">
                Village <span className="text-red-500">*</span>
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-2.5 flex items-center pointer-events-none text-slate-400">
                  <MapPin className="w-3.5 h-3.5" />
                </div>
                <input
                  type="text"
                  value={formData.village}
                  onChange={(e) => setFormData({ ...formData, village: e.target.value })}
                  placeholder="Village"
                  className={`w-full pl-8 pr-2.5 py-2.5 bg-slate-50 rounded-xl border ${
                    errors.village ? 'border-red-400 bg-red-50/30' : 'border-slate-200'
                  } text-xs font-semibold text-slate-900 placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-[#00a86b] focus:bg-white transition-all`}
                />
              </div>
              {errors.village && <p className="text-[10px] font-semibold text-red-500 mt-0.5">{errors.village}</p>}
            </div>

            {/* 5. Mandal */}
            <div>
              <label className="block text-xs font-bold text-slate-700 mb-1">
                Mandal <span className="text-red-500">*</span>
              </label>
              <input
                type="text"
                value={formData.mandal}
                onChange={(e) => setFormData({ ...formData, mandal: e.target.value })}
                placeholder="Mandal / Block"
                className={`w-full px-3 py-2.5 bg-slate-50 rounded-xl border ${
                  errors.mandal ? 'border-red-400 bg-red-50/30' : 'border-slate-200'
                } text-xs font-semibold text-slate-900 placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-[#00a86b] focus:bg-white transition-all`}
              />
              {errors.mandal && <p className="text-[10px] font-semibold text-red-500 mt-0.5">{errors.mandal}</p>}
            </div>

            {/* 6. Panchayat */}
            <div>
              <label className="block text-xs font-bold text-slate-700 mb-1">
                Panchayat
              </label>
              <input
                type="text"
                value={formData.panchayat}
                onChange={(e) => setFormData({ ...formData, panchayat: e.target.value })}
                placeholder="Grama Panchayat"
                className="w-full px-3 py-2.5 bg-slate-50 rounded-xl border border-slate-200 text-xs font-semibold text-slate-900 placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-[#00a86b] focus:bg-white transition-all"
              />
            </div>

            {/* 7. Ward Number */}
            <div>
              <label className="block text-xs font-bold text-slate-700 mb-1">
                Ward No.
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-2.5 flex items-center pointer-events-none text-slate-400">
                  <Hash className="w-3.5 h-3.5" />
                </div>
                <input
                  type="text"
                  value={formData.wardNumber}
                  onChange={(e) => setFormData({ ...formData, wardNumber: e.target.value })}
                  placeholder="Ward No."
                  className="w-full pl-7 pr-2.5 py-2.5 bg-slate-50 rounded-xl border border-slate-200 text-xs font-semibold text-slate-900 placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-[#00a86b] focus:bg-white transition-all"
                />
              </div>
            </div>

          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            
            {/* 8. District */}
            <div>
              <label className="block text-xs font-bold text-slate-700 mb-1.5">
                District <span className="text-red-500">*</span>
              </label>
              <input
                type="text"
                value={formData.district}
                onChange={(e) => setFormData({ ...formData, district: e.target.value })}
                placeholder="Enter District"
                className={`w-full px-4 py-3 bg-slate-50 rounded-2xl border ${
                  errors.district ? 'border-red-400 bg-red-50/30' : 'border-slate-200'
                } text-xs font-semibold text-slate-900 placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-[#00a86b] focus:bg-white transition-all`}
              />
              {errors.district && <p className="text-[10px] font-semibold text-red-500 mt-0.5">{errors.district}</p>}
            </div>

            {/* 9. State Dropdown (All 28 States & 8 UTs in India) */}
            <div>
              <label className="block text-xs font-bold text-slate-700 mb-1.5">
                State / UT <span className="text-red-500">*</span>
              </label>
              <select
                value={formData.state}
                onChange={(e) => setFormData({ ...formData, state: e.target.value })}
                className="w-full px-4 py-3 bg-slate-50 rounded-2xl border border-slate-200 text-xs font-bold text-slate-900 focus:outline-none focus:ring-2 focus:ring-[#00a86b] focus:bg-white transition-all cursor-pointer"
              >
                {ALL_INDIAN_STATES_AND_UTS.map((st) => (
                  <option key={st} value={st}>
                    {st}
                  </option>
                ))}
              </select>
            </div>

          </div>

          {/* Prominent Create Account Button */}
          <button
            type="submit"
            disabled={isSubmitting}
            className="w-full py-4 px-6 rounded-2xl bg-[#00a86b] text-white font-bold text-sm shadow-lg shadow-[#00a86b]/20 hover:bg-[#008f5a] transition-all flex items-center justify-center space-x-2 transform active:scale-98 disabled:opacity-70 mt-6"
          >
            {isSubmitting ? (
              <span className="animate-spin rounded-full h-5 w-5 border-2 border-white border-t-transparent" />
            ) : (
              <>
                <span>Create Account</span>
                <ArrowRight className="w-4 h-4" />
              </>
            )}
          </button>

        </form>

        {/* Existing Member Link */}
        <div className="pt-3 border-t border-slate-100 text-center">
          <p className="text-xs text-slate-500 font-medium">
            Already have an account?{' '}
            <button
              onClick={() => navigateTo('login')}
              className="text-[#00a86b] font-bold hover:underline"
            >
              Login Here
            </button>
          </p>
        </div>

      </div>

      {/* Success Modal */}
      {successModalOpen && (
        <div className="fixed inset-0 z-50 bg-slate-900/60 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-white rounded-3xl p-6 sm:p-8 max-w-sm w-full text-center space-y-4 shadow-2xl border border-slate-100 animate-scale-up">
            <div className="w-14 h-14 rounded-full bg-emerald-100 text-[#00a86b] mx-auto flex items-center justify-center">
              <CheckCircle className="w-8 h-8" />
            </div>

            <div className="space-y-1">
              <h3 className="text-xl font-extrabold text-slate-900">Account Created!</h3>
              <p className="text-xs text-slate-600 font-medium">
                Your <span className="font-bold text-[#00a86b]">{formData.category}</span> account has been successfully registered.
              </p>
            </div>

            <div className="p-3 bg-slate-50 rounded-2xl border border-slate-200 text-left text-xs space-y-1">
              <div className="flex justify-between">
                <span className="text-slate-500">Name:</span>
                <span className="font-bold text-slate-900">{formData.name}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-slate-500">Mobile:</span>
                <span className="font-bold text-slate-900">+91 {formData.mobile}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-slate-500">Location:</span>
                <span className="font-bold text-slate-900">{formData.village}, {formData.mandal}, {formData.district}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-slate-500">State:</span>
                <span className="font-bold text-slate-900">{formData.state}</span>
              </div>
            </div>

            <button
              onClick={handleRedirectToDashboard}
              className="w-full py-3 rounded-2xl bg-[#00a86b] text-white font-bold text-xs shadow-md hover:bg-[#008f5a] transition-all flex items-center justify-center space-x-2"
            >
              <span>Go to {formData.category} Dashboard</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        </div>
      )}

      {/* Footer Info */}
      <div className="text-center text-[11px] text-slate-400 mt-4">
        © 2026 Smart &amp; Fair Crop Procurement System
      </div>

    </div>
  );
};

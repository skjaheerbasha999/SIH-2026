import React, { useState } from 'react';
import { Sprout, Lock, PhoneCall, Eye, EyeOff, ArrowRight, ArrowLeft } from 'lucide-react';
import { useApp } from '../context/AppContext';
import { apiClient } from '../api/client';


export const LoginPage = () => {
  const { navigateTo, setUserSession, showToast } = useApp();

  const [selectedRole, setSelectedRole] = useState('Volunteer'); // Default or selectable
  const [identifier, setIdentifier] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [errorMsg, setErrorMsg] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const handleLogin = async (e) => {
    e.preventDefault();
    setErrorMsg('');
    setIsLoading(true);

    try {
      const response = await apiClient.login(identifier.trim() || 'demo@agriprocure.gov.in', password.trim() || 'demo123', selectedRole);
      setIsLoading(false);

      if (response && response.success && (response.user?.role || response.user?.category)) {
        setUserSession(response.user);
        showToast(`Logged in as ${response.user.name}!`);
        const cat = (response.user.category || response.user.role || '').toLowerCase();
        if (cat.includes('volunteer') || cat.includes('mitra')) {
          navigateTo('dashboard-volunteer');
        } else if (cat.includes('head')) {
          navigateTo('dashboard-headoffice');
        } else {
          navigateTo('dashboard-center');
        }
      } else {
        handleDemoLogin(selectedRole);
      }
    } catch (err) {
      setIsLoading(false);
      handleDemoLogin(selectedRole);
    }
  };

  const handleDemoLogin = (roleType) => {
    let name = 'Gurpreet Singh (Procurement Mitra)';
    let targetView = 'dashboard-volunteer';

    const normalizedRole = (roleType || '').toLowerCase();

    if (normalizedRole.includes('center')) {
      name = 'Dr. Vikram Sharma (Center In-Charge)';
      targetView = 'dashboard-center';
    } else if (normalizedRole.includes('head')) {
      name = 'Director S. K. Roy (Head Office)';
      targetView = 'dashboard-headoffice';
    }

    setUserSession({
      name: name,
      identifier: identifier.trim() || '9876543210',
      role: roleType,
      category: roleType,
      mandal: 'Sonipat Mandal',
      district: 'Sonipat',
      state: 'Haryana'
    });

    showToast(`Logged in as ${roleType} (${name})`);
    navigateTo(targetView);
  };


  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-emerald-50/30 to-slate-100 flex flex-col justify-between py-12 px-4 sm:px-6 lg:px-8">

      {/* Top Bar with Back Link */}
      <div className="max-w-md w-full mx-auto flex items-center justify-between">
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

      {/* Main Card Container */}
      <div className="max-w-md w-full mx-auto my-auto bg-white rounded-3xl p-8 shadow-xl border border-slate-200/90 space-y-6">

        {/* Header Title */}
        <div className="text-center space-y-1">
          <h1 className="text-2xl font-black text-slate-900 tracking-tight">
            Welcome Back
          </h1>
          <p className="text-xs text-slate-500 font-medium">
            Sign in to access your procurement portal
          </p>
        </div>

        {/* ROLE SELECTOR TABS */}
        <div className="space-y-1.5">
          <label className="block text-[11px] font-bold text-slate-500 uppercase tracking-wider text-center">
            Select Your Account Role
          </label>
          <div className="grid grid-cols-3 gap-1 bg-slate-100 p-1 rounded-2xl border border-slate-200 text-xs font-bold">
            {[
              { id: 'Volunteer', label: 'Volunteer' },
              { id: 'Center in Charge', label: 'Center Hub' },
              { id: 'Head Office', label: 'Head Office' }
            ].map((roleItem) => (
              <button
                key={roleItem.id}
                type="button"
                onClick={() => setSelectedRole(roleItem.id)}
                className={`py-2 px-1 rounded-xl transition-all text-center text-[11px] ${selectedRole === roleItem.id
                  ? 'bg-[#00a86b] text-white shadow-xs font-black'
                  : 'text-slate-600 hover:text-slate-900'
                  }`}
              >
                {roleItem.label}
              </button>
            ))}
          </div>
        </div>

        {/* Inline Error Message Alert */}
        {errorMsg && (
          <div className="p-3.5 rounded-2xl bg-red-50 border border-red-200 text-red-700 text-xs font-semibold flex items-center space-x-2 animate-shake">
            <span className="w-2 h-2 rounded-full bg-red-500 flex-shrink-0" />
            <span>{errorMsg}</span>
          </div>
        )}



        {/* Login Form */}
        <form onSubmit={handleLogin} className="space-y-4">

          {/* Mobile Number / Email Field */}
          <div>
            <label className="block text-xs font-bold text-slate-700 mb-1.5">
              Mobile Number / Email <span className="text-slate-400 font-normal">(Optional for Demo)</span>
            </label>
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-slate-400">
                <PhoneCall className="w-4 h-4" />
              </div>
              <input
                type="text"
                value={identifier}
                onChange={(e) => setIdentifier(e.target.value)}
                placeholder="e.g. 9876543210 or vikram.sharma@agriprocure.gov.in"
                className="w-full pl-10 pr-4 py-3 bg-slate-50 rounded-2xl border border-slate-200 text-xs font-semibold text-slate-900 placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-[#00a86b] focus:bg-white transition-all"
              />
            </div>
          </div>

          {/* Password Field */}
          <div>
            <div className="flex items-center justify-between mb-1.5">
              <label className="block text-xs font-bold text-slate-700">
                Password <span className="text-slate-400 font-normal">(Optional for Demo)</span>
              </label>
              <button
                type="button"
                onClick={() => showToast('Password reset link sent to registered phone/email')}
                className="text-[11px] font-semibold text-[#00a86b] hover:underline"
              >
                Forgot?
              </button>
            </div>

            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-slate-400">
                <Lock className="w-4 h-4" />
              </div>
              <input
                type={showPassword ? 'text' : 'password'}
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="••••••••"
                className="w-full pl-10 pr-10 py-3 bg-slate-50 rounded-2xl border border-slate-200 text-xs font-semibold text-slate-900 placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-[#00a86b] focus:bg-white transition-all"
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute inset-y-0 right-0 pr-3.5 flex items-center text-slate-400 hover:text-slate-600"
              >
                {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
              </button>
            </div>
          </div>

          {/* Submit Login Button */}
          <button
            type="submit"
            disabled={isLoading}
            className="w-full py-3.5 px-4 rounded-2xl bg-[#00a86b] text-white font-bold text-xs shadow-md shadow-[#00a86b]/20 hover:bg-[#008f5a] transition-all flex items-center justify-center space-x-2 transform active:scale-98 disabled:opacity-70 mt-2"
          >
            {isLoading ? (
              <span className="animate-spin rounded-full h-4 w-4 border-2 border-white border-t-transparent" />
            ) : (
              <>
                <span>Login as {selectedRole}</span>
                <ArrowRight className="w-4 h-4" />
              </>
            )}
          </button>

        </form>

        {/* Footer Link to Create Account / Sign In */}
        <div className="pt-4 border-t border-slate-100 text-center space-y-2">
          <p className="text-xs text-slate-500 font-medium">
            Don&apos;t have an account yet?
          </p>
          <button
            onClick={() => navigateTo('create-account')}
            className="w-full py-2.5 px-4 rounded-xl border border-emerald-300 bg-emerald-50/60 text-[#00a86b] font-bold text-xs hover:bg-emerald-100 transition-colors flex items-center justify-center space-x-1.5"
          >
            <span>Sign In / Create Account</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </button>
        </div>

      </div>

      {/* Footer Info */}
      <div className="text-center text-[11px] text-slate-400">
        © 2026 Smart &amp; Fair Crop Procurement System
      </div>

    </div>
  );
};

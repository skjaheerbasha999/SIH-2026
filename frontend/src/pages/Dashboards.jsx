import React, { useState } from 'react';
import { Sprout, Users, Building2, Scale, ArrowLeft, CheckCircle2, ShieldCheck, FileCheck, IndianRupee, Bell, LogOut, Award, RefreshCw } from 'lucide-react';
import { useApp } from '../context/AppContext';
import VolunteerDashboard from './VolunteerDashboard';
import CenterInChargeDashboard from './CenterInChargeDashboard';
import HeadOfficeDashboard from './HeadOfficeDashboard';

export const Dashboards = () => {
  const { currentView, userSession, navigateTo, showToast } = useApp();

  const sessionRole = userSession?.role || userSession?.category;

  // 1. Explicit view route takes highest priority!
  if (currentView === 'dashboard-volunteer') {
    return <VolunteerDashboard />;
  }
  if (currentView === 'dashboard-center') {
    return <CenterInChargeDashboard />;
  }
  if (currentView === 'dashboard-headoffice') {
    return <HeadOfficeDashboard />;
  }

  // 2. Otherwise fall back to userSession role
  if (sessionRole === 'Volunteer') {
    return <VolunteerDashboard />;
  }
  if (sessionRole === 'Center in Charge' || sessionRole === 'Center In-Charge' || sessionRole === 'Center') {
    return <CenterInChargeDashboard />;
  }
  if (sessionRole === 'Head Office' || sessionRole === 'HeadOffice') {
    return <HeadOfficeDashboard />;
  }

  // Default fallback
  return <VolunteerDashboard />;

  // Center in Charge State
  const [moistureLevel, setMoistureLevel] = useState('11.5');
  const [weightKg, setWeightKg] = useState('120');
  const [calculatedGrade, setCalculatedGrade] = useState('A');
  const [receiptGenerated, setReceiptGenerated] = useState(false);

  const handleCalculatePayout = (e) => {
    e.preventDefault();
    setReceiptGenerated(true);
    showToast(`Digital Receipt #${Math.floor(100000 + Math.random() * 900000)} generated successfully!`);
  };

  return (
    <div className="min-h-screen bg-slate-50 text-slate-900 flex flex-col justify-between">

      {/* Top Portal Header */}
      <header className="bg-[#00a86b] text-white py-4 px-4 sm:px-8 shadow-md">
        <div className="max-w-7xl mx-auto flex items-center justify-between">

          <div className="flex items-center space-x-3">
            <button
              onClick={() => navigateTo('home')}
              className="p-1.5 rounded-lg bg-emerald-900/60 hover:bg-emerald-900 text-white transition-colors"
            >
              <ArrowLeft className="w-4 h-4" />
            </button>
            <div className="w-8 h-8 rounded-full bg-white text-[#00a86b] flex items-center justify-center font-bold">
              <Sprout className="w-4.5 h-4.5" />
            </div>
            <div>
              <span className="text-sm font-black text-white block leading-none">Smart &amp; Fair</span>
              <span className="text-[10px] text-emerald-200 uppercase tracking-widest font-bold mt-0.5 block">
                {role} Portal
              </span>
            </div>
          </div>

          <div className="flex items-center space-x-4">
            <div className="hidden sm:flex flex-col text-right">
              <span className="text-xs font-bold text-white">{userName}</span>
              <span className="text-[10px] text-emerald-200 font-medium">Verified {role}</span>
            </div>
            <button
              onClick={() => {
                showToast('Logged out');
                navigateTo('home');
              }}
              className="flex items-center space-x-1 px-3 py-1.5 rounded-xl bg-emerald-900/80 hover:bg-emerald-900 text-white text-xs font-bold transition-colors"
            >
              <LogOut className="w-3.5 h-3.5" />
              <span>Logout</span>
            </button>
          </div>

        </div>
      </header>

      {/* Main Dashboard Body */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 w-full space-y-8 my-auto">

        {/* Banner Alert */}
        <div className="bg-white rounded-2xl p-4 border border-emerald-200 shadow-xs flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
          <div className="flex items-center space-x-3">
            <div className="w-10 h-10 rounded-2xl bg-emerald-100 text-[#00a86b] flex items-center justify-center flex-shrink-0 font-bold">
              <ShieldCheck className="w-5 h-5" />
            </div>
            <div>
              <h2 className="text-sm font-extrabold text-slate-900">
                {role === 'Head Office' ? 'District & State Head Office Dashboard' : 'Village Collection Center Operating Portal'}
              </h2>
              <p className="text-xs text-slate-500">
                Connected to Smart Procurement Central Engine • Real-time MSP Grade Pricing Active
              </p>
            </div>
          </div>

          <span className="text-xs font-bold text-emerald-800 bg-emerald-100 px-3 py-1 rounded-full border border-emerald-300">
            ● System Status: Online
          </span>
        </div>

        {/* ROLE: CENTER IN CHARGE DASHBOARD */}
        {role === 'Center in Charge' && (
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">

            {/* Left 2 Cols: Quality Check & Weighbridge */}
            <div className="lg:col-span-2 bg-white rounded-3xl p-6 shadow-sm border border-slate-200 space-y-6">
              <div className="flex items-center justify-between pb-3 border-b border-slate-100">
                <h3 className="text-base font-extrabold text-slate-900">Digital Moisture &amp; Weighbridge Entry</h3>
                <span className="text-xs font-bold text-emerald-700 bg-emerald-100 px-2.5 py-1 rounded-full">Center #42</span>
              </div>

              <form onSubmit={handleCalculatePayout} className="space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-bold text-slate-700 mb-1">Moisture Level (%)</label>
                    <input
                      type="number"
                      step="0.1"
                      value={moistureLevel}
                      onChange={(e) => setMoistureLevel(e.target.value)}
                      className="w-full px-4 py-3 bg-slate-50 rounded-2xl border border-slate-200 text-xs font-bold text-slate-900"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-bold text-slate-700 mb-1">Total Weight (Kg)</label>
                    <input
                      type="number"
                      value={weightKg}
                      onChange={(e) => setWeightKg(e.target.value)}
                      className="w-full px-4 py-3 bg-slate-50 rounded-2xl border border-slate-200 text-xs font-bold text-slate-900"
                    />
                  </div>
                </div>

                <div className="p-4 bg-slate-50 rounded-2xl border border-slate-200 flex items-center justify-between">
                  <div>
                    <span className="text-xs font-bold text-slate-500 block">Calculated Grade</span>
                    <span className="text-xl font-black text-[#00a86b]">Grade {calculatedGrade} (100% Clean)</span>
                  </div>
                  <div className="text-right">
                    <span className="text-xs font-bold text-slate-500 block">MSP Fair Payout</span>
                    <span className="text-xl font-black text-slate-900">₹ {(Number(weightKg) * 30).toLocaleString()}</span>
                  </div>
                </div>

                <button
                  type="submit"
                  className="w-full py-3.5 rounded-2xl bg-[#00a86b] text-white font-bold text-xs shadow-md hover:bg-[#008f5a] transition-all"
                >
                  Generate Verified Digital Receipt &amp; Trigger Bank Transfer →
                </button>
              </form>

              {receiptGenerated && (
                <div className="p-4 rounded-2xl bg-emerald-50 border border-emerald-300 text-xs space-y-2">
                  <div className="flex justify-between items-center text-[#00a86b] font-bold">
                    <span>Receipt #42-8921 Verified ✓</span>
                    <span className="text-[10px] bg-emerald-200 px-2 py-0.5 rounded-full">Bank Transfer Initiated</span>
                  </div>
                  <p className="text-slate-600 text-[11px]">
                    Payout of ₹ {(Number(weightKg) * 30).toLocaleString()} sent to farmer account. Print/SMS receipt dispatched.
                  </p>
                </div>
              )}
            </div>

            {/* Right Col: Collection Center Capacity Summary */}
            <div className="bg-white rounded-3xl p-6 shadow-sm border border-slate-200 space-y-4">
              <h3 className="text-sm font-extrabold text-slate-900">Collection Center Capacity Summary</h3>
              <div className="space-y-3 text-xs">
                <div>
                  <div className="flex justify-between font-bold text-emerald-800 mb-1">
                    <span>A Center (Priority)</span>
                    <span>76% Full (AVAILABLE)</span>
                  </div>
                  <div className="w-full h-2 bg-slate-100 rounded-full overflow-hidden">
                    <div className="h-full bg-emerald-600 rounded-full" style={{ width: '76%' }} />
                  </div>
                </div>

                <div>
                  <div className="flex justify-between font-bold text-amber-700 mb-1">
                    <span>B Center (Secondary)</span>
                    <span>94% Full (LIMITED)</span>
                  </div>
                  <div className="w-full h-2 bg-slate-100 rounded-full overflow-hidden">
                    <div className="h-full bg-amber-500 rounded-full" style={{ width: '94%' }} />
                  </div>
                </div>

                <div>
                  <div className="flex justify-between font-bold text-red-600 mb-1">
                    <span>C Center (Overflow)</span>
                    <span>100% Full (FULL)</span>
                  </div>
                  <div className="w-full h-2 bg-slate-100 rounded-full overflow-hidden">
                    <div className="h-full bg-red-500 rounded-full" style={{ width: '100%' }} />
                  </div>
                </div>
              </div>
            </div>

          </div>
        )}

        {/* ROLE: HEAD OFFICE DASHBOARD */}
        {role === 'Head Office' && (
          <div className="space-y-6">

            {/* Top 4 Stats */}
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
              <div className="bg-white p-5 rounded-3xl border border-slate-200 shadow-xs">
                <span className="text-xs font-bold text-slate-400 block mb-1">Total Registered Farmers</span>
                <span className="text-2xl sm:text-3xl font-black text-slate-900">12,450</span>
              </div>
              <div className="bg-white p-5 rounded-3xl border border-slate-200 shadow-xs">
                <span className="text-xs font-bold text-slate-400 block mb-1">Active Collection Centers</span>
                <span className="text-2xl sm:text-3xl font-black text-slate-900">142</span>
              </div>
              <div className="bg-white p-5 rounded-3xl border border-slate-200 shadow-xs">
                <span className="text-xs font-bold text-slate-400 block mb-1">Total Procured Stock</span>
                <span className="text-2xl sm:text-3xl font-black text-emerald-800">4,85,600 kg</span>
              </div>
              <div className="bg-white p-5 rounded-3xl border border-slate-200 shadow-xs">
                <span className="text-xs font-bold text-slate-400 block mb-1">Total MSP Disbursed</span>
                <span className="text-2xl sm:text-3xl font-black text-slate-900">₹ 1.45 Cr</span>
              </div>
            </div>

            {/* District Breakdown */}
            <div className="bg-white rounded-3xl p-6 shadow-sm border border-slate-200 space-y-4">
              <h3 className="text-base font-extrabold text-slate-900">District Procurement &amp; Mandi Performance</h3>
              <div className="overflow-x-auto">
                <table className="w-full text-left text-xs">
                  <thead>
                    <tr className="border-b border-slate-100 text-slate-400 font-bold uppercase text-[10px]">
                      <th className="py-2.5">District</th>
                      <th className="py-2.5">Procurement Centers</th>
                      <th className="py-2.5">Procured Volume</th>
                      <th className="py-2.5">Grade A Ratio</th>
                      <th className="py-2.5">Status</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-100 font-semibold text-slate-800">
                    <tr>
                      <td className="py-3 font-bold">Ludhiana</td>
                      <td className="py-3">34 Centers</td>
                      <td className="py-3">1,42,000 kg</td>
                      <td className="py-3 text-emerald-700 font-bold">72%</td>
                      <td className="py-3"><span className="px-2 py-0.5 rounded-full bg-emerald-100 text-emerald-800 text-[10px]">Active</span></td>
                    </tr>
                    <tr>
                      <td className="py-3 font-bold">Sangrur</td>
                      <td className="py-3">28 Centers</td>
                      <td className="py-3">1,18,500 kg</td>
                      <td className="py-3 text-emerald-700 font-bold">68%</td>
                      <td className="py-3"><span className="px-2 py-0.5 rounded-full bg-emerald-100 text-emerald-800 text-[10px]">Active</span></td>
                    </tr>
                    <tr>
                      <td className="py-3 font-bold">Ambala</td>
                      <td className="py-3">22 Centers</td>
                      <td className="py-3">95,400 kg</td>
                      <td className="py-3 text-amber-700 font-bold">58%</td>
                      <td className="py-3"><span className="px-2 py-0.5 rounded-full bg-emerald-100 text-emerald-800 text-[10px]">Active</span></td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>

          </div>
        )}

      </main>

      {/* Footer Info */}
      <footer className="bg-white border-t border-slate-200 py-4 text-center text-xs text-slate-500">
        © 2026 Smart &amp; Fair Crop Procurement System • Authorized {role} Session
      </footer>

    </div>
  );
};

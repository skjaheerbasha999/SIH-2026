import React from 'react';
import { User, HeartHandshake, Building2, Scale, IndianRupee, FileCheck, CheckCircle2 } from 'lucide-react';

export const AgriculturalVisual = () => {
  return (
    <div className="relative w-full max-w-xl mx-auto">
      {/* Background Soft Ambient Shadow Glow */}
      <div className="absolute -inset-2 bg-gradient-to-tr from-[#00a86b]/10 via-emerald-500/10 to-amber-500/10 rounded-3xl blur-2xl opacity-60" />

      {/* Main White Card Container */}
      <div className="relative bg-white rounded-3xl p-6 shadow-xl border border-slate-200/90 space-y-4 max-w-md">

        {/* Header Bar */}
        <div className="pb-3 border-b border-slate-100">
          <span className="text-[11px] font-black tracking-widest text-slate-900 uppercase">
            SMART PROCUREMENT FLOW
          </span>
        </div>

        {/* 6 Steps */}
        <div className="space-y-2.5">

          {/* Step 1 */}
          <div className="flex items-center justify-between p-2.5 rounded-2xl bg-slate-50 border border-slate-100">
            <div className="flex items-center space-x-3">
              <div className="w-8 h-8 rounded-full bg-[#00a86b] text-white flex items-center justify-center text-xs font-bold">
                <User className="w-4 h-4" />
              </div>
              <div>
                <span className="text-xs font-bold text-slate-900 block">Farmer</span>
                <span className="text-[10px] text-slate-400">Step 01</span>
              </div>
            </div>
            <span className="text-[10px] font-bold text-emerald-800 bg-emerald-100/90 px-2.5 py-1 rounded-full border border-emerald-200">
              ✓ Registered
            </span>
          </div>

          {/* Step 2 */}
          <div className="flex items-center justify-between p-2.5 rounded-2xl bg-slate-50 border border-slate-100">
            <div className="flex items-center space-x-3">
              <div className="w-8 h-8 rounded-full bg-[#00a86b] text-white flex items-center justify-center text-xs font-bold">
                <HeartHandshake className="w-4 h-4" />
              </div>
              <div>
                <span className="text-xs font-bold text-slate-900 block">Procurement Mitra</span>
                <span className="text-[10px] text-slate-400">Step 02</span>
              </div>
            </div>
            <span className="text-[10px] font-bold text-emerald-800 bg-emerald-100/90 px-2.5 py-1 rounded-full border border-emerald-200">
              ✓ Token Assigned
            </span>
          </div>

          {/* Step 3 */}
          <div className="flex items-center justify-between p-2.5 rounded-2xl bg-slate-50 border border-slate-100">
            <div className="flex items-center space-x-3">
              <div className="w-8 h-8 rounded-full bg-[#00a86b] text-white flex items-center justify-center text-xs font-bold">
                <Building2 className="w-4 h-4" />
              </div>
              <div>
                <span className="text-xs font-bold text-slate-900 block">Collection Center</span>
                <span className="text-[10px] text-slate-400">Step 03</span>
              </div>
            </div>
            <span className="text-[10px] font-bold text-white bg-slate-900 px-3 py-1 rounded-full">
              ₹ 3,600 Fair Price
            </span>
          </div>

          {/* Step 4 */}
          <div className="flex items-center justify-between p-2.5 rounded-2xl bg-slate-50 border border-slate-100">
            <div className="flex items-center space-x-3">
              <div className="w-8 h-8 rounded-full bg-[#00a86b] text-white flex items-center justify-center text-xs font-bold">
                <Scale className="w-4 h-4" />
              </div>
              <div>
                <span className="text-xs font-bold text-slate-900 block">Quality Check</span>
                <span className="text-[10px] text-slate-400">Step 04</span>
              </div>
            </div>
            <span className="text-[10px] font-bold text-emerald-800 bg-emerald-100/90 px-2.5 py-1 rounded-full border border-emerald-200">
              ✓ Quality Checked
            </span>
          </div>

          {/* Step 5 */}
          <div className="flex items-center justify-between p-2.5 rounded-2xl bg-slate-50 border border-slate-100">
            <div className="flex items-center space-x-3">
              <div className="w-8 h-8 rounded-full bg-[#00a86b] text-white flex items-center justify-center text-xs font-bold">
                <IndianRupee className="w-4 h-4" />
              </div>
              <div>
                <span className="text-xs font-bold text-slate-900 block">Fair Price</span>
                <span className="text-[10px] text-slate-400">Step 05</span>
              </div>
            </div>
            <span className="text-[10px] font-bold text-emerald-800 bg-emerald-100/90 px-2.5 py-1 rounded-full border border-emerald-200">
              ✓ Grade A Payout
            </span>
          </div>

          {/* Step 6 */}
          <div className="flex items-center justify-between p-2.5 rounded-2xl bg-slate-50 border border-slate-100">
            <div className="flex items-center space-x-3">
              <div className="w-8 h-8 rounded-full bg-slate-800 text-white flex items-center justify-center text-xs font-bold">
                <FileCheck className="w-4 h-4" />
              </div>
              <div>
                <span className="text-xs font-bold text-slate-900 block">Digital Receipt</span>
                <span className="text-[10px] text-slate-400">Generated Successfully</span>
              </div>
            </div>
          </div>

        </div>

      </div>

      {/* Floating Cards on Right Stack (Matching Reference) */}

      {/* Floating Card 1: Quality Grade */}
      <div className="absolute top-2 -right-4 bg-white rounded-2xl p-3 shadow-xl border border-slate-200 w-36 z-20 space-y-1">
        <span className="text-[9px] font-bold text-slate-400 uppercase block tracking-wider">Quality Grade</span>
        <div className="flex items-center space-x-2">
          <div className="w-6 h-6 rounded-full bg-emerald-600 text-white font-black text-xs flex items-center justify-center">
            A
          </div>
          <span className="text-xs font-bold text-slate-900">Best Quality</span>
        </div>
      </div>

      {/* Floating Card 2: Fair Price */}
      <div className="absolute top-1/3 -right-6 bg-white rounded-2xl p-3 shadow-xl border border-slate-200 w-40 z-20 space-y-1">
        <span className="text-[9px] font-bold text-slate-400 uppercase block tracking-wider">Fair Price</span>
        <div className="text-sm font-black text-slate-900">₹ 3,600</div>
        <span className="text-[10px] text-slate-500 font-medium block">120 kg • Wheat</span>
      </div>

      {/* Floating Card 3: Digital Receipt */}
      <div className="absolute bottom-4 -right-4 bg-white rounded-2xl p-3 shadow-xl border border-slate-200 w-36 z-20 space-y-1">
        <span className="text-[9px] font-bold text-slate-400 uppercase block tracking-wider">Digital Receipt</span>
        <div className="flex items-center space-x-1.5 text-xs font-bold text-emerald-700">
          <FileCheck className="w-4 h-4 text-emerald-600" />
          <span>Verified ✓</span>
        </div>
      </div>

    </div>
  );
};

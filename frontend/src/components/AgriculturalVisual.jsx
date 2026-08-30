import React from 'react';
import { User, Bell, Truck, Scale, Building2, ShieldCheck } from 'lucide-react';

export const AgriculturalVisual = () => {
  return (
    <div className="w-full max-w-md mx-auto">

      {/* Main Professional Portal Card Container */}
      <div className="bg-white rounded-2xl p-6 shadow-sm border border-slate-200 space-y-4">

        {/* Header Bar */}
        <div className="pb-3 border-b border-slate-100 flex items-center justify-between">
          <span className="text-[11px] font-black tracking-widest text-slate-900 uppercase">
            SMART PROCUREMENT FLOW
          </span>
          <span className="text-[10px] font-bold text-[#00a86b] bg-emerald-50 px-2.5 py-0.5 rounded-md border border-emerald-200">
            Official Workflow
          </span>
        </div>

        {/* Embedded Capacity & Allocation Live Status Panel */}
        <div className="bg-slate-50 p-3.5 rounded-xl border border-slate-200 text-xs space-y-1.5 font-semibold">
          <div className="flex items-center justify-between text-slate-900">
            <span className="text-slate-500 font-bold">Assigned Center:</span>
            <span className="font-extrabold text-[#00a86b] inline-flex items-center space-x-1">
              <ShieldCheck className="w-3.5 h-3.5 text-emerald-600 inline" />
              <span>A Center (Priority)</span>
            </span>
          </div>
          <div className="flex items-center justify-between text-slate-900">
            <span className="text-slate-500 font-bold">Center Capacity:</span>
            <span className="font-black text-slate-800">3,800 / 5,000 kg (76% Full)</span>
          </div>
          <div className="w-full bg-slate-200 h-1.5 rounded-full overflow-hidden">
            <div className="bg-[#00a86b] h-full rounded-full" style={{ width: '76%' }} />
          </div>
        </div>

        {/* 5 Official Workflow Steps */}
        <div className="space-y-2">

          {/* Step 1: Farmer Registration */}
          <div className="flex items-center justify-between p-2.5 rounded-xl bg-white border border-slate-200 text-xs font-semibold">
            <div className="flex items-center space-x-3">
              <div className="w-7 h-7 rounded-lg bg-emerald-50 text-[#00a86b] flex items-center justify-center text-xs font-bold border border-emerald-200">
                <User className="w-3.5 h-3.5" />
              </div>
              <div>
                <span className="font-extrabold text-slate-900 block leading-tight">Farmer Registration</span>
                <span className="text-[10px] text-slate-500">Step 01 • Harvest &amp; Qty Details</span>
              </div>
            </div>
            <span className="text-[10px] font-bold text-[#00a86b] bg-emerald-50 px-2 py-0.5 rounded-md border border-emerald-200">
              ✓ Registered
            </span>
          </div>

          {/* Step 2: Center Allocation */}
          <div className="flex items-center justify-between p-2.5 rounded-xl bg-white border border-slate-200 text-xs font-semibold">
            <div className="flex items-center space-x-3">
              <div className="w-7 h-7 rounded-lg bg-emerald-50 text-[#00a86b] flex items-center justify-center text-xs font-bold border border-emerald-200">
                <Building2 className="w-3.5 h-3.5" />
              </div>
              <div>
                <span className="font-extrabold text-slate-900 block leading-tight">Center Allocation</span>
                <span className="text-[10px] text-slate-500">Step 02 • Auto A → B → C Routing</span>
              </div>
            </div>
            <span className="text-[10px] font-bold text-[#00a86b] bg-emerald-50 px-2 py-0.5 rounded-md border border-emerald-200">
              ✓ A Center Assigned
            </span>
          </div>

          {/* Step 3: Farmer Notification */}
          <div className="flex items-center justify-between p-2.5 rounded-xl bg-white border border-slate-200 text-xs font-semibold">
            <div className="flex items-center space-x-3">
              <div className="w-7 h-7 rounded-lg bg-emerald-50 text-[#00a86b] flex items-center justify-center text-xs font-bold border border-emerald-200">
                <Bell className="w-3.5 h-3.5" />
              </div>
              <div>
                <span className="font-extrabold text-slate-900 block leading-tight">Farmer Notification</span>
                <span className="text-[10px] text-slate-500">Step 03 • SMS &amp; Token Sent</span>
              </div>
            </div>
            <span className="text-[10px] font-bold text-[#00a86b] bg-emerald-50 px-2 py-0.5 rounded-md border border-emerald-200">
              ✓ SMS Dispatched
            </span>
          </div>

          {/* Step 4: Center Arrival */}
          <div className="flex items-center justify-between p-2.5 rounded-xl bg-white border border-slate-200 text-xs font-semibold">
            <div className="flex items-center space-x-3">
              <div className="w-7 h-7 rounded-lg bg-slate-100 text-slate-700 flex items-center justify-center text-xs font-bold border border-slate-200">
                <Truck className="w-3.5 h-3.5" />
              </div>
              <div>
                <span className="font-extrabold text-slate-900 block leading-tight">Center Arrival</span>
                <span className="text-[10px] text-slate-500">Step 04 • Gate Receiving Queue</span>
              </div>
            </div>
            <span className="text-[10px] font-bold text-slate-700 bg-slate-100 px-2 py-0.5 rounded-md border border-slate-200">
              In Transit
            </span>
          </div>

          {/* Step 5: Weighing & Procurement */}
          <div className="flex items-center justify-between p-2.5 rounded-xl bg-white border border-slate-200 text-xs font-semibold">
            <div className="flex items-center space-x-3">
              <div className="w-7 h-7 rounded-lg bg-slate-100 text-slate-700 flex items-center justify-center text-xs font-bold border border-slate-200">
                <Scale className="w-3.5 h-3.5" />
              </div>
              <div>
                <span className="font-extrabold text-slate-900 block leading-tight">Weighing &amp; Procurement</span>
                <span className="text-[10px] text-slate-500">Step 05 • Physical Weight &amp; Payout</span>
              </div>
            </div>
            <span className="text-[10px] font-bold text-[#00a86b] bg-emerald-50 px-2 py-0.5 rounded-md border border-emerald-200">
              ✓ Verified Qty
            </span>
          </div>

        </div>

      </div>

    </div>
  );
};

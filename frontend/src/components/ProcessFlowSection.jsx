import React from 'react';
import { User, Building2, Bell, Truck, Scale, ShieldCheck } from 'lucide-react';

export const ProcessFlowSection = () => {
  const steps = [
    {
      number: '01',
      title: 'Farmer Registration',
      subtitle: 'Crop & Harvest Details',
      desc: 'Farmer or Procurement Mitra inputs crop harvest details, village location, and expected yield quantity.',
      icon: User
    },
    {
      number: '02',
      title: 'Center Allocation',
      subtitle: 'Capacity Routing (A → B → C)',
      desc: 'System automatically checks real-time center loads and assigns available A, B, or C Procurement Center.',
      icon: Building2
    },
    {
      number: '03',
      title: 'Farmer Notification',
      subtitle: 'SMS & Token Dispatch',
      desc: 'Automated SMS notification dispatched to farmer and volunteer with assigned center address & date token.',
      icon: Bell
    },
    {
      number: '04',
      title: 'Center Arrival',
      subtitle: 'Gate Logistics Receiving',
      desc: 'Crop transport arrives at the assigned collection center gate and enters the weighbridge queue.',
      icon: Truck
    },
    {
      number: '05',
      title: 'Weighing & Procurement',
      subtitle: 'Physical Weighing & Payout',
      desc: 'Physical weighing at center weighbridge, quantity verification, and direct fair price payout.',
      icon: Scale
    }
  ];

  return (
    <section id="how-it-works-diagram" className="py-14 sm:py-18 bg-slate-50 border-y border-slate-200 text-slate-900">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-10 space-y-2">
          <span className="inline-block px-3.5 py-1 rounded-md bg-emerald-50 text-[#00a86b] text-xs font-bold uppercase tracking-wider border border-emerald-200">
            Official System Workflow
          </span>
          <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight">
            Smart Procurement Flow
          </h2>
          <p className="text-xs sm:text-sm text-slate-600 font-medium">
            Structured 5-step agricultural procurement process from farmer registration to category allocation and payout.
          </p>
        </div>

        {/* 5-Step Process Grid */}
        <div className="grid grid-cols-1 md:grid-cols-5 gap-4 mb-8">
          {steps.map((step) => {
            const Icon = step.icon;

            return (
              <div key={step.number} className="bg-white p-5 rounded-2xl border border-slate-200 shadow-xs flex flex-col justify-between hover:border-emerald-300 transition-colors">
                <div>
                  <div className="flex items-center justify-between mb-3">
                    <div className="w-8 h-8 rounded-xl bg-emerald-50 text-[#00a86b] flex items-center justify-center border border-emerald-200 font-bold">
                      <Icon className="w-4 h-4" />
                    </div>
                    <span className="text-xs font-black text-slate-400">
                      {step.number}
                    </span>
                  </div>

                  <h3 className="text-sm font-extrabold text-slate-900 mb-0.5">
                    {step.title}
                  </h3>
                  <h4 className="text-xs font-bold text-[#00a86b] mb-2">
                    {step.subtitle}
                  </h4>
                  <p className="text-xs text-slate-600 leading-relaxed font-medium">
                    {step.desc}
                  </p>
                </div>
              </div>
            );
          })}
        </div>

        {/* Workflow Routing Logic Card */}
        <div className="bg-white rounded-2xl p-5 border border-slate-200 shadow-xs flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
          <div className="flex items-start space-x-3">
            <div className="w-8.5 h-8.5 rounded-xl bg-emerald-50 text-[#00a86b] flex items-center justify-center flex-shrink-0 mt-0.5 border border-emerald-200">
              <ShieldCheck className="w-4.5 h-4.5" />
            </div>
            <div>
              <h4 className="text-xs font-black text-slate-900 uppercase tracking-wider">
                Automated Center Capacity Allocation Logic
              </h4>
              <p className="text-xs text-slate-600 font-medium mt-0.5 leading-relaxed">
                If <strong>Category A Center</strong> is full, the system automatically allocates the crop to <strong>Category B Center</strong>. If Category B Center is also full, it allocates to <strong>Category C Center</strong>. This available category allocation is managed by the system and visible in real-time to both Procurement Mitra and Center In-Charge.
              </p>
            </div>
          </div>
          <div className="flex items-center space-x-2 text-xs font-bold text-slate-700 bg-slate-50 px-3.5 py-2.5 rounded-xl border border-slate-200 flex-shrink-0">
            <span className="text-[#00a86b] font-black">A Center (Priority)</span>
            <span className="text-slate-400">→</span>
            <span className="text-amber-700 font-black">B Center (Secondary)</span>
            <span className="text-slate-400">→</span>
            <span className="text-rose-700 font-black">C Center (Overflow)</span>
          </div>
        </div>

      </div>
    </section>
  );
};

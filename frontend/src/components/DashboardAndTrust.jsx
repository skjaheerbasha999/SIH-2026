import React from 'react';
import { Users, Building2, Scale, Truck, CheckCircle2, Clock, FileText } from 'lucide-react';

export const DashboardAndTrust = () => {
  const trustBenefits = [
    { title: 'Farmer Friendly', desc: 'Simple local language access', icon: CheckCircle2 },
    { title: 'Transparent Pricing', desc: 'Zero hidden moisture cuts', icon: CheckCircle2 },
    { title: 'Real-time Tracking', desc: 'Live GPS & batch status', icon: Clock },
    { title: 'No Smartphone Required', desc: 'Mitra-assisted registration', icon: FileText },
  ];

  return (
    <section id="dashboard" className="py-20 lg:py-28 bg-slate-50/70 border-t border-slate-100 relative overflow-hidden">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">

        {/* Section Header */}
        <div className="max-w-2xl mb-12 space-y-2">
          <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-900 tracking-tight">
            Everything Connected in One Dashboard
          </h2>
          <p className="text-sm text-slate-600">
            Real-time visibility for Procurement Mitras, collection centers and administrators.
          </p>
        </div>


        {/* Large Premium Centered Dark Navy Dashboard Mockup */}
        <div className="max-w-5xl mx-auto bg-[#0b132b] rounded-3xl p-6 sm:p-8 text-white shadow-2xl border border-slate-800 space-y-6 mb-12">

          {/* Header Bar inside Mockup */}
          <div className="flex items-center justify-end pb-2">
            <div className="flex items-center space-x-1.5 px-3 py-1 rounded-full bg-slate-900 text-xs font-bold text-slate-300 border border-slate-800">
              <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
              <span>Auto-Refresh</span>
            </div>
          </div>

          {/* 4 Core Stats Grid */}
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">

            <div className="bg-slate-900/90 rounded-2xl p-4 border border-slate-800/80">
              <div className="flex items-center justify-between text-slate-400 text-xs font-semibold mb-1">
                <span>Total Farmers</span>
                <Users className="w-4 h-4 text-emerald-400" />
              </div>
              <div className="text-2xl sm:text-3xl font-black text-white">5,632</div>
            </div>

            <div className="bg-slate-900/90 rounded-2xl p-4 border border-slate-800/80">
              <div className="flex items-center justify-between text-slate-400 text-xs font-semibold mb-1">
                <span>Collection Centers</span>
                <Building2 className="w-4 h-4 text-emerald-400" />
              </div>
              <div className="text-2xl sm:text-3xl font-black text-white">86</div>
            </div>

            {/* Total Procured with Amber Highlight */}
            <div className="bg-amber-950/40 rounded-2xl p-4 border border-amber-800/80">
              <div className="flex items-center justify-between text-amber-300/80 text-xs font-semibold mb-1">
                <span>Total Procured</span>
                <Scale className="w-4 h-4 text-amber-400" />
              </div>
              <div className="text-2xl sm:text-3xl font-black text-amber-300">1,25,780 kg</div>
            </div>

            <div className="bg-slate-900/90 rounded-2xl p-4 border border-slate-800/80">
              <div className="flex items-center justify-between text-slate-400 text-xs font-semibold mb-1">
                <span>Pending Deliveries</span>
                <Truck className="w-4 h-4 text-amber-400" />
              </div>
              <div className="text-2xl sm:text-3xl font-black text-white">18</div>
            </div>

          </div>

          {/* Charts & Feeds Grid */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">

            {/* Procurement by Grade */}
            <div className="bg-slate-900/70 rounded-2xl p-4 border border-slate-800 space-y-3">
              <span className="text-xs font-bold text-slate-300 block">Procurement by Grade</span>
              <div className="space-y-2 text-[11px]">
                <div>
                  <div className="flex justify-between text-emerald-400 font-bold mb-0.5">
                    <span>Grade A (62%)</span>
                    <span>78.4k kg</span>
                  </div>
                  <div className="w-full h-2 bg-slate-800 rounded-full overflow-hidden">
                    <div className="h-full bg-emerald-500 rounded-full" style={{ width: '62%' }} />
                  </div>
                </div>

                <div>
                  <div className="flex justify-between text-amber-400 font-bold mb-0.5">
                    <span>Grade B (28%)</span>
                    <span>35.2k kg</span>
                  </div>
                  <div className="w-full h-2 bg-slate-800 rounded-full overflow-hidden">
                    <div className="h-full bg-amber-500 rounded-full" style={{ width: '28%' }} />
                  </div>
                </div>

                <div>
                  <div className="flex justify-between text-red-400 font-bold mb-0.5">
                    <span>Grade C (10%)</span>
                    <span>12.1k kg</span>
                  </div>
                  <div className="w-full h-2 bg-slate-800 rounded-full overflow-hidden">
                    <div className="h-full bg-red-500 rounded-full" style={{ width: '10%' }} />
                  </div>
                </div>
              </div>
            </div>

            {/* Quality Distribution Ring */}
            <div className="bg-slate-900/70 rounded-2xl p-4 border border-slate-800 flex flex-col justify-between">
              <span className="text-xs font-bold text-slate-300 block">Quality Distribution</span>
              <div className="flex items-center justify-center py-2">
                <div className="w-20 h-20 rounded-full border-4 border-emerald-500 border-t-amber-500 flex items-center justify-center text-xs font-black text-white">
                  90% MSP
                </div>
              </div>
            </div>

            {/* Recent Receipts */}
            <div className="bg-slate-900/70 rounded-2xl p-4 border border-slate-800 space-y-2">
              <span className="text-xs font-bold text-slate-300 block">Recent Receipts</span>
              <div className="space-y-1.5 text-[11px] text-slate-300">
                <div className="flex justify-between border-b border-slate-800/80 pb-1">
                  <span>Ramesh K. (Wheat)</span>
                  <span className="text-emerald-400 font-bold">Grade A</span>
                </div>
                <div className="flex justify-between border-b border-slate-800/80 pb-1">
                  <span>Sujata D. (Mustard)</span>
                  <span className="text-emerald-400 font-bold">Grade A</span>
                </div>
                <div className="flex justify-between">
                  <span>Mahesh P. (Paddy)</span>
                  <span className="text-amber-400 font-bold">Grade B</span>
                </div>
              </div>
            </div>

          </div>

        </div>

        {/* 4 Compact Benefits Directly Below Dashboard */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 max-w-5xl mx-auto">
          {trustBenefits.map((b) => {
            const Icon = b.icon;
            return (
              <div key={b.title} className="bg-white rounded-2xl p-4 border border-slate-200 shadow-xs flex items-start space-x-2.5">
                <Icon className="w-5 h-5 text-[#00a86b] flex-shrink-0 mt-0.5" />
                <div>
                  <h4 className="text-xs font-bold text-slate-900">{b.title}</h4>
                  <p className="text-[10px] text-slate-500 mt-0.5">{b.desc}</p>
                </div>
              </div>
            );
          })}
        </div>

      </div>
    </section>
  );
};

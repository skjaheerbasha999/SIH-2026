import React, { useState } from 'react';
import { LayoutDashboard, Users, Building2, Scale, Truck, ArrowRight, Bell, Search, Filter, CheckCircle2, AlertTriangle, Info, TrendingUp } from 'lucide-react';
import { SYSTEM_STATS, RECENT_REGISTRATIONS, RECENT_ALERTS } from '../data/mockData';
import { useApp } from '../context/AppContext';

export const DashboardPreview = () => {
  const { navigateTo } = useApp();
  const [activeTimeframe, setActiveTimeframe] = useState('Today');

  return (
    <section id="transparency" className="py-16 sm:py-24 bg-white relative overflow-hidden">
      
      {/* Background Accent Lines */}
      <div className="absolute top-0 right-0 w-full h-full bg-grid-pattern opacity-60 pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-14 space-y-3">
          <div className="inline-flex items-center space-x-2 px-3.5 py-1 rounded-full bg-emerald-100 text-emerald-800 text-xs font-bold uppercase tracking-wider border border-emerald-300">
            <LayoutDashboard className="w-3.5 h-3.5" />
            <span>Admin &amp; District Command Center</span>
          </div>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-slate-900 tracking-tight">
            Everything Connected in One Dashboard
          </h2>
          <p className="text-base sm:text-lg text-slate-600 font-normal">
            Live monitoring giving district officers, centers, and farmers 100% transparency.
          </p>

        </div>

        {/* Dashboard Shell Container */}
        <div className="bg-slate-900 rounded-3xl p-4 sm:p-8 shadow-2xl border border-slate-800 text-white relative overflow-hidden">
          
          {/* Header Bar inside Mock Dashboard */}
          <div className="flex flex-col sm:flex-row sm:items-center justify-between pb-6 mb-6 border-b border-slate-800 gap-4">
            <div className="flex items-center space-x-3">
              <div className="w-10 h-10 rounded-xl bg-emerald-600 flex items-center justify-center font-bold text-white shadow-md">
                🌾
              </div>
              <div>
                <h3 className="text-lg font-bold text-white leading-tight">
                  District Crop Procurement Live Control
                </h3>
                <p className="text-xs text-slate-400">
                  State Procurement Hub • APMC Zone 4 • Punjab &amp; Haryana Cluster
                </p>
              </div>
            </div>

            <div className="flex items-center space-x-3">
              <div className="flex bg-slate-800 p-1 rounded-xl text-xs font-bold border border-slate-700">
                {['Today', 'This Week', 'This Season'].map((tf) => (
                  <button
                    key={tf}
                    onClick={() => setActiveTimeframe(tf)}
                    className={`px-3 py-1.5 rounded-lg transition-colors ${
                      activeTimeframe === tf
                        ? 'bg-emerald-600 text-white'
                        : 'text-slate-400 hover:text-white'
                    }`}
                  >
                    {tf}
                  </button>
                ))}
              </div>

              <div className="relative hidden md:block">
                <Search className="w-4 h-4 text-slate-400 absolute left-3 top-2.5" />
                <input
                  type="text"
                  placeholder="Search Farmer ID / Center..."
                  className="bg-slate-800 text-xs text-white placeholder-slate-500 pl-9 pr-4 py-2 rounded-xl border border-slate-700 focus:outline-none focus:border-emerald-500"
                />
              </div>
            </div>
          </div>

          {/* 4 Metric Cards Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6 mb-8">
            
            {/* Card 1: Total Farmers */}
            <div className="bg-slate-800/80 rounded-2xl p-5 border border-slate-700/80 hover:border-emerald-500 transition-all">
              <div className="flex items-center justify-between mb-3">
                <span className="text-xs font-bold text-slate-400 uppercase tracking-wider">
                  Total Farmers
                </span>
                <div className="w-8 h-8 rounded-lg bg-emerald-500/20 text-emerald-400 flex items-center justify-center">
                  <Users className="w-4 h-4" />
                </div>
              </div>
              <div className="text-3xl font-black text-white tracking-tight">5,632</div>
              <div className="mt-2 flex items-center justify-between text-[11px]">
                <span className="text-emerald-400 font-bold flex items-center">
                  <TrendingUp className="w-3 h-3 mr-1" /> +12% this month
                </span>
                <span className="text-slate-500">142 Villages</span>
              </div>
            </div>

            {/* Card 2: Total Collection Centers */}
            <div className="bg-slate-800/80 rounded-2xl p-5 border border-slate-700/80 hover:border-teal-500 transition-all">
              <div className="flex items-center justify-between mb-3">
                <span className="text-xs font-bold text-slate-400 uppercase tracking-wider">
                  Collection Centers
                </span>
                <div className="w-8 h-8 rounded-lg bg-teal-500/20 text-teal-400 flex items-center justify-center">
                  <Building2 className="w-4 h-4" />
                </div>
              </div>
              <div className="text-3xl font-black text-white tracking-tight">86</div>
              <div className="mt-2 flex items-center justify-between text-[11px]">
                <span className="text-teal-400 font-bold">+4 Active today</span>
                <span className="text-slate-500">100% Operational</span>
              </div>
            </div>

            {/* Card 3: Total Procured */}
            <div className="bg-slate-800/80 rounded-2xl p-5 border border-slate-700/80 hover:border-amber-500 transition-all">
              <div className="flex items-center justify-between mb-3">
                <span className="text-xs font-bold text-slate-400 uppercase tracking-wider">
                  Total Procured
                </span>
                <div className="w-8 h-8 rounded-lg bg-amber-500/20 text-amber-400 flex items-center justify-center">
                  <Scale className="w-4 h-4" />
                </div>
              </div>
              <div className="text-3xl font-black text-amber-400 tracking-tight">1,25,780 kg</div>
              <div className="mt-2 flex items-center justify-between text-[11px]">
                <span className="text-amber-300 font-bold">₹34.8 Lakhs Payout</span>
                <span className="text-slate-500">Direct DBT</span>
              </div>
            </div>

            {/* Card 4: Pending Deliveries */}
            <div className="bg-slate-800/80 rounded-2xl p-5 border border-slate-700/80 hover:border-blue-500 transition-all">
              <div className="flex items-center justify-between mb-3">
                <span className="text-xs font-bold text-slate-400 uppercase tracking-wider">
                  Pending Deliveries
                </span>
                <div className="w-8 h-8 rounded-lg bg-blue-500/20 text-blue-400 flex items-center justify-center">
                  <Truck className="w-4 h-4" />
                </div>
              </div>
              <div className="text-3xl font-black text-white tracking-tight">18</div>
              <div className="mt-2 flex items-center justify-between text-[11px]">
                <span className="text-blue-400 font-bold">In-Transit to Hub</span>
                <span className="text-slate-500">GPS Active</span>
              </div>
            </div>

          </div>

          {/* Charts & Analytics Row */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 mb-8">
            
            {/* Bar Chart: Collection Center Capacity Breakdown */}
            <div className="lg:col-span-7 bg-slate-800/60 rounded-2xl p-5 border border-slate-700/80">
              <div className="flex items-center justify-between mb-4">
                <div>
                  <h4 className="text-sm font-bold text-white">Collection Center Real-Time Capacities (Kg)</h4>
                  <p className="text-[11px] text-slate-400">Live storage allocation &amp; availability across centers</p>
                </div>
                <span className="text-[10px] font-bold text-emerald-400 bg-emerald-950 px-2.5 py-1 rounded-full border border-emerald-800">
                  Smart Allocation Active
                </span>
              </div>

              {/* Bar Visuals */}
              <div className="space-y-4 pt-2">
                <div>
                  <div className="flex justify-between text-xs font-bold mb-1">
                    <span className="text-emerald-400">A Center (Priority) — 3,800 / 5,000 kg</span>
                    <span className="text-emerald-300">76% Full (AVAILABLE - 1,200 kg left)</span>
                  </div>
                  <div className="w-full h-3 bg-slate-700 rounded-full overflow-hidden">
                    <div className="h-full bg-emerald-500 rounded-full" style={{ width: '76%' }} />
                  </div>
                </div>

                <div>
                  <div className="flex justify-between text-xs font-bold mb-1">
                    <span className="text-amber-400">B Center (Secondary) — 4,700 / 5,000 kg</span>
                    <span className="text-amber-300">94% Full (LIMITED - 300 kg left)</span>
                  </div>
                  <div className="w-full h-3 bg-slate-700 rounded-full overflow-hidden">
                    <div className="h-full bg-amber-500 rounded-full" style={{ width: '94%' }} />
                  </div>
                </div>

                <div>
                  <div className="flex justify-between text-xs font-bold mb-1">
                    <span className="text-red-400">C Center (Overflow) — 5,000 / 5,000 kg</span>
                    <span className="text-red-300">100% Full (FULL - 0 kg left)</span>
                  </div>
                  <div className="w-full h-3 bg-slate-700 rounded-full overflow-hidden">
                    <div className="h-full bg-red-500 rounded-full" style={{ width: '100%' }} />
                  </div>
                </div>
              </div>
            </div>

            {/* Donut Visual: Center Allocation Share */}
            <div className="lg:col-span-5 bg-slate-800/60 rounded-2xl p-5 border border-slate-700/80 flex flex-col justify-between">
              <div>
                <h4 className="text-sm font-bold text-white mb-1">Center Capacity Share</h4>
                <p className="text-[11px] text-slate-400 mb-4">Real-time load balancing across hubs</p>
                
                <div className="flex items-center justify-center py-2">
                  <div className="relative w-36 h-36 rounded-full border-8 border-emerald-500 border-t-amber-500 border-r-red-500 border-l-emerald-500 flex items-center justify-center shadow-lg">
                    <div className="text-center">
                      <span className="text-xl font-black text-white">89%</span>
                      <span className="text-[9px] text-slate-400 block uppercase">Overall Load</span>
                    </div>
                  </div>
                </div>
              </div>

              <div className="grid grid-cols-3 gap-2 text-center text-[10px] font-bold pt-3 border-t border-slate-700/80">
                <div className="text-emerald-400">● A: 76% Full</div>
                <div className="text-amber-400">● B: 94% Full</div>
                <div className="text-red-400">● C: 100% Full</div>
              </div>
            </div>

          </div>

          {/* Tables Row: Recent Farmer Registrations & Live Alerts */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
            
            {/* Recent Registrations Table */}
            <div className="lg:col-span-8 bg-slate-800/60 rounded-2xl p-5 border border-slate-700/80">
              <div className="flex items-center justify-between mb-4">
                <h4 className="text-sm font-bold text-white">Recent Farmer Registrations &amp; Center Allocations</h4>
                <span className="text-[10px] text-slate-400">Auto-allocated via Mitras</span>
              </div>

              <div className="overflow-x-auto">
                <table className="w-full text-left text-xs">
                  <thead>
                    <tr className="text-slate-400 border-b border-slate-700">
                      <th className="pb-2 font-bold">Farmer ID</th>
                      <th className="pb-2 font-bold">Name &amp; Village</th>
                      <th className="pb-2 font-bold">Crop &amp; Qty</th>
                      <th className="pb-2 font-bold">Assigned Center</th>
                      <th className="pb-2 font-bold">Est. Payout</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-700/60">
                    {RECENT_REGISTRATIONS.map((row) => (
                      <tr key={row.id} className="hover:bg-slate-700/40 transition-colors">
                        <td className="py-2.5 font-bold text-emerald-400">{row.id}</td>
                        <td className="py-2.5 text-white">
                          <span className="font-bold block">{row.name}</span>
                          <span className="text-[10px] text-slate-400">{row.village}</span>
                        </td>
                        <td className="py-2.5 text-slate-300">
                          {row.crop} • <span className="font-bold text-white">{row.weight}</span>
                        </td>
                        <td className="py-2.5">
                          <span className="px-2 py-0.5 rounded bg-emerald-950 text-emerald-300 text-[10px] font-bold border border-emerald-800">
                            {row.status}
                          </span>
                        </td>
                        <td className="py-2.5 font-bold text-amber-300">{row.payout}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>

            {/* Live Alerts Feed */}
            <div className="lg:col-span-4 bg-slate-800/60 rounded-2xl p-5 border border-slate-700/80 flex flex-col justify-between">
              <div>
                <div className="flex items-center justify-between mb-4">
                  <h4 className="text-sm font-bold text-white">Live System Alerts</h4>
                  <Bell className="w-4 h-4 text-amber-400" />
                </div>

                <div className="space-y-3">
                  {RECENT_ALERTS.map((alert) => (
                    <div key={alert.id} className="p-3 rounded-xl bg-slate-900/80 border border-slate-700 text-xs space-y-1">
                      <div className="flex items-center justify-between text-[10px] text-slate-400 font-bold">
                        <span className="text-emerald-400">SYSTEM EVENT</span>
                        <span>{alert.time}</span>
                      </div>
                      <p className="text-slate-200 text-[11px] leading-snug">{alert.text}</p>
                    </div>
                  ))}
                </div>
              </div>

              {/* Bottom CTA Button */}
              <div className="pt-4 mt-4 border-t border-slate-700">
                <button
                  onClick={() => navigateTo('/admin', { title: 'Explore Complete Dashboard', description: 'Full district monitoring, MSP audit logs, and procurement analytics.' })}
                  className="w-full py-3 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-xs shadow-md transition-all flex items-center justify-center space-x-2"
                >
                  <span>Explore Full Dashboard</span>
                  <ArrowRight className="w-4 h-4" />
                </button>
              </div>

            </div>

          </div>

        </div>

      </div>
    </section>
  );
};

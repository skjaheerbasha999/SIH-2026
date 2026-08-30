import React from 'react';
import { Sprout, HeartHandshake, Building2, Landmark, Truck, ShieldCheck, CheckCircle2 } from 'lucide-react';
import { useApp } from '../context/AppContext';

export const KeyBenefitsSection = () => {
  const { navigateTo } = useApp();

  const benefits = [
    {
      id: 'farmers',
      role: 'Farmers',
      icon: Sprout,
      description: 'Better prices based on transparent quality grading without middleman exploitation.',
      color: 'bg-emerald-100 text-emerald-800 border-emerald-300',
      iconBg: 'bg-emerald-600 text-white',
      route: '/farmer'
    },
    {
      id: 'mitras',
      role: 'Procurement Mitras',
      icon: HeartHandshake,
      description: 'Simple tools to register and assist farmers who do not own smartphones or computers.',
      color: 'bg-amber-100 text-amber-900 border-amber-300',
      iconBg: 'bg-amber-500 text-white',
      route: '/procurement-mitra'
    },
    {
      id: 'centers',
      role: 'Collection Centers',
      icon: Building2,
      description: 'Automatically route produce to available A, B, or C collection centers based on real-time capacity to prevent overload.',
      color: 'bg-teal-100 text-teal-900 border-teal-300',
      iconBg: 'bg-teal-600 text-white',
      route: '/collection-center'
    },
    {
      id: 'government',
      role: 'Government / Admin',
      icon: Landmark,
      description: 'Real-time procurement and center performance visibility with automated MSP compliance.',
      color: 'bg-slate-100 text-slate-900 border-slate-300',
      iconBg: 'bg-slate-800 text-white',
      route: '/admin'
    },
    {
      id: 'logistics',
      role: 'Logistics',
      icon: Truck,
      description: 'Track stock movement live from village collection points to district procurement hubs.',
      color: 'bg-blue-100 text-blue-900 border-blue-300',
      iconBg: 'bg-blue-600 text-white',
      route: '/logistics'
    },
    {
      id: 'transparency',
      role: 'Transparency',
      icon: ShieldCheck,
      description: 'Traceable records from farmer registration to final procurement and bank disbursement.',
      color: 'bg-emerald-100 text-emerald-900 border-emerald-300',
      iconBg: 'bg-emerald-800 text-white',
      route: '/reports'
    }
  ];

  return (
    <section id="for-farmers" className="py-16 sm:py-24 bg-slate-50 relative overflow-hidden">

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">

        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16 space-y-3">
          <span className="px-3.5 py-1 rounded-full bg-emerald-100 text-emerald-800 text-xs font-bold uppercase tracking-wider border border-emerald-300">
            Multi-Stakeholder Value
          </span>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-slate-900 tracking-tight">
            Built for Farmers, Centers &amp; Government
          </h2>
          <p className="text-base sm:text-lg text-slate-600 font-normal">
            Designed to empower every participant across the rural agricultural supply chain.
          </p>
        </div>

        {/* 6 Benefit Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {benefits.map((item) => {
            const Icon = item.icon;
            return (
              <div
                key={item.id}
                onClick={() => navigateTo(item.route, { title: `${item.role} Portal View`, description: item.description })}
                className="bg-white rounded-3xl p-7 shadow-sm hover:shadow-xl border border-slate-200/80 hover:border-emerald-400 transition-all duration-300 transform hover:-translate-y-1.5 flex flex-col justify-between cursor-pointer group"
              >
                <div>
                  <div className="flex items-center justify-between mb-5">
                    <div className={`w-13 h-13 rounded-2xl ${item.iconBg} flex items-center justify-center shadow-md group-hover:scale-110 transition-transform duration-300`}>
                      <Icon className="w-6 h-6 stroke-[2.2]" />
                    </div>
                    <span className={`text-[11px] font-bold px-3 py-1 rounded-full border ${item.color}`}>
                      {item.role}
                    </span>
                  </div>

                  <h3 className="text-xl font-bold text-slate-900 mb-3 group-hover:text-emerald-800 transition-colors">
                    {item.role}
                  </h3>

                  <p className="text-sm text-slate-600 leading-relaxed">
                    {item.description}
                  </p>
                </div>

                <div className="mt-6 pt-4 border-t border-slate-100 flex items-center justify-between text-xs font-bold text-emerald-700 group-hover:text-emerald-800">
                  <span>Explore Role Portal</span>
                  <span className="text-base group-hover:translate-x-1 transition-transform">→</span>
                </div>
              </div>
            );
          })}
        </div>

      </div>
    </section>
  );
};

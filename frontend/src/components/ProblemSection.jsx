import React from 'react';
import { Smartphone, Scale, IndianRupee, Truck, AlertTriangle } from 'lucide-react';

export const ProblemSection = () => {
  const problems = [
    {
      id: 1,
      icon: Smartphone,
      title: 'Limited Digital Access',
      description: 'Many farmers may not have smartphones or reliable internet access in remote villages.',
      color: 'from-amber-500 to-orange-600',
      badge: 'Access Barrier'
    },
    {
      id: 2,
      icon: Scale,
      title: 'Unclear Center Allocation',
      description: 'Farmers need a transparent way to understand center assignment and capacity routing without long queues.',
      color: 'from-emerald-600 to-teal-700',
      badge: 'Routing Gap'
    },
    {
      id: 3,
      icon: IndianRupee,
      title: 'Uncertain Pricing',
      description: 'Farmers need clear, guaranteed and fair prices calculated directly based on category allocation.',
      color: 'from-yellow-500 to-amber-600',
      badge: 'Financial Risk'
    },
    {
      id: 4,
      icon: Truck,
      title: 'Lack of Visibility',
      description: 'Procurement status, batch aggregation, and transportation updates are often difficult to track live.',
      color: 'from-teal-600 to-emerald-800',
      badge: 'Logistics Fog'
    }
  ];

  return (
    <section className="py-16 sm:py-20 bg-slate-50 relative overflow-hidden">

      {/* Soft Background Accent Shapes */}
      <div className="absolute top-0 right-0 w-96 h-96 bg-emerald-100/40 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-0 left-0 w-96 h-96 bg-amber-100/40 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">

        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-14 space-y-3">
          <div className="inline-flex items-center space-x-2 px-3.5 py-1 rounded-full bg-red-100 text-red-800 text-xs font-bold uppercase tracking-wider border border-red-200">
            <AlertTriangle className="w-3.5 h-3.5" />
            <span>Challenges in Traditional Agriculture</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-900 tracking-tight">
            Why Do Farmers Need a Better Procurement System?
          </h2>
          <p className="text-base sm:text-lg text-slate-600 font-normal">
            Traditional agricultural markets often penalize smallholders due to informational asymmetry, tech barriers, and opaque center allocation.
          </p>
        </div>

        {/* 4 Grid Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 lg:gap-8">
          {problems.map((problem) => {
            const Icon = problem.icon;
            return (
              <div
                key={problem.id}
                className="bg-white rounded-3xl p-6 sm:p-7 shadow-sm hover:shadow-xl border border-slate-200/80 hover:border-emerald-300 transition-all duration-300 transform hover:-translate-y-1 flex flex-col justify-between group"
              >
                <div>
                  <div className="flex items-center justify-between mb-5">
                    <div className={`w-13 h-13 rounded-2xl bg-gradient-to-br ${problem.color} text-white flex items-center justify-center shadow-md group-hover:scale-110 transition-transform duration-300`}>
                      <Icon className="w-6 h-6 stroke-[2.2]" />
                    </div>
                    <span className="text-[11px] font-semibold text-slate-400 uppercase tracking-wider bg-slate-100 px-2.5 py-1 rounded-lg">
                      {problem.badge}
                    </span>
                  </div>

                  <h3 className="text-xl font-bold text-slate-900 mb-3 group-hover:text-emerald-800 transition-colors">
                    {problem.title}
                  </h3>

                  <p className="text-sm text-slate-600 leading-relaxed">
                    {problem.description}
                  </p>
                </div>

                <div className="mt-6 pt-4 border-t border-slate-100 flex items-center justify-between text-xs font-semibold text-slate-500">
                  <span>Current Bottleneck</span>
                  <span className="text-red-600 font-bold">Needs Fix</span>
                </div>
              </div>
            );
          })}
        </div>

      </div>
    </section>
  );
};

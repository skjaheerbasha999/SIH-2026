import React from 'react';
import { UserPlus, BellRing, Scale, Truck, ShieldCheck, ArrowRight, CheckCircle } from 'lucide-react';
import { PROCESS_STEPS } from '../data/mockData';

export const SolutionSection = () => {
  const iconMap = {
    UserPlus: UserPlus,
    BellRing: BellRing,
    Scale: Scale,
    Truck: Truck,
    ShieldCheck: ShieldCheck
  };

  return (
    <section id="how-it-works" className="py-16 sm:py-24 bg-white relative overflow-hidden">
      
      {/* Background Subtle Leaf Elements */}
      <div className="absolute top-10 left-1/2 -translate-x-1/2 w-full max-w-7xl h-[500px] bg-radial-glow pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16 space-y-3">
          <div className="inline-flex items-center space-x-2 px-3.5 py-1 rounded-full bg-emerald-100 text-emerald-800 text-xs font-bold uppercase tracking-wider border border-emerald-300">
            <CheckCircle className="w-3.5 h-3.5" />
            <span>Integrated Solution Architecture</span>
          </div>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-slate-900 tracking-tight">
            One Connected System for Fair Procurement
          </h2>
          <p className="text-base sm:text-lg text-slate-600 font-normal">
            Automatically distribute incoming crop across A, B and C collection centers according to real-time capacity, preventing one center from becoming overloaded.
          </p>
        </div>

        {/* 5-Step Horizontal Flow with Connecting Desktop Arrows */}
        <div className="relative">
          
          {/* Connecting Line (Desktop) */}
          <div className="hidden lg:block absolute top-1/2 left-0 right-0 h-1 bg-gradient-to-r from-emerald-200 via-teal-300 to-emerald-600 -translate-y-10 z-0" />

          <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-5 gap-6 lg:gap-4 relative z-10">
            {PROCESS_STEPS.map((stepItem, idx) => {
              const Icon = iconMap[stepItem.icon] || UserPlus;
              const isLast = idx === PROCESS_STEPS.length - 1;

              return (
                <div key={stepItem.step} className="relative group">
                  <div className="bg-white rounded-3xl p-6 shadow-md hover:shadow-2xl border-2 border-slate-100 hover:border-emerald-500 transition-all duration-300 transform hover:-translate-y-2 flex flex-col h-full justify-between">
                    
                    <div>
                      {/* Step Header with Icon & Badge */}
                      <div className="flex items-center justify-between mb-5">
                        <div className="w-12 h-12 rounded-2xl bg-emerald-700 text-white flex items-center justify-center font-bold shadow-md shadow-emerald-700/20 group-hover:bg-emerald-800 group-hover:scale-105 transition-all">
                          <Icon className="w-6 h-6" />
                        </div>
                        <span className="text-xs font-black text-emerald-800 bg-emerald-100 px-3 py-1 rounded-full border border-emerald-200">
                          STEP {stepItem.step}
                        </span>
                      </div>

                      {/* Title & Description */}
                      <h3 className="text-lg font-bold text-slate-900 mb-2 group-hover:text-emerald-800 transition-colors">
                        {stepItem.title}
                      </h3>
                      
                      <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
                        {stepItem.description}
                      </p>
                    </div>

                    {/* Bottom Status Tag */}
                    <div className="mt-5 pt-3 border-t border-slate-100 flex items-center justify-between text-[11px] font-semibold text-emerald-700">
                      <span>Verified Workflow</span>
                      <CheckCircle className="w-3.5 h-3.5 text-emerald-600" />
                    </div>

                  </div>

                  {/* Desktop Arrow Indicator between cards */}
                  {!isLast && (
                    <div className="hidden lg:flex absolute -right-3 top-1/2 -translate-y-10 z-20 w-7 h-7 rounded-full bg-emerald-600 text-white items-center justify-center shadow-md border-2 border-white">
                      <ArrowRight className="w-4 h-4" />
                    </div>
                  )}

                </div>
              );
            })}
          </div>

        </div>

        {/* Highlight Banner Below Process */}
        <div className="mt-14 bg-gradient-to-r from-emerald-900 via-teal-900 to-emerald-900 rounded-3xl p-6 sm:p-8 text-white shadow-xl flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="space-y-1 text-center md:text-left">
            <h4 className="text-xl font-bold text-white">Ready to digitize crop procurement in your district?</h4>
            <p className="text-sm text-emerald-200">Designed specifically for Village Collection Centers (VCC) &amp; APMC mandis.</p>
          </div>
          <button
            onClick={() => window.location.href = '#how-it-works-diagram'}
            className="px-6 py-3 rounded-xl bg-amber-400 text-slate-900 font-bold text-sm hover:bg-amber-300 shadow-md transition-all flex items-center space-x-2 whitespace-nowrap"
          >
            <span>View Interactive Diagram</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </div>

      </div>
    </section>
  );
};

import React from 'react';
import { UserPlus, BellRing, Scale, FileText, Truck } from 'lucide-react';
import { RevealOnScroll } from './RevealOnScroll';

export const HowItWorks = () => {
  const steps = [
    {
      num: '01',
      icon: UserPlus,
      title: 'Register Farmer',
      desc: 'Procurement Mitra records farmer, crop, and expected quantity.'
    },
    {
      num: '02',
      icon: Truck,
      title: 'Smart Center Allocation',
      desc: 'System automatically assigns A → B → C Center based on capacity.'
    },
    {
      num: '03',
      icon: BellRing,
      title: 'Notify Farmer',
      desc: 'SMS notification sent with assigned center, date and time slot.'
    },
    {
      num: '04',
      icon: Scale,
      title: 'Center Arrival & Weighing',
      desc: 'Farmer arrives at assigned center for physical weighing and verification.'
    },
    {
      num: '05',
      icon: FileText,
      title: 'Fair Price Payout',
      desc: 'Farmer receives transparent payout calculated according to category.'
    }
  ];

  return (
    <section id="how-it-works" className="py-20 lg:py-28 bg-slate-50/70 border-y border-slate-100 relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">

        {/* Section Header */}
        <RevealOnScroll animation="fade-up" className="text-center max-w-2xl mx-auto mb-16 space-y-2">
          <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-900 tracking-tight">
            From Farmer to Fair Procurement
          </h2>
          <p className="text-sm text-slate-600">
            One transparent workflow from registration to procurement.
          </p>
        </RevealOnScroll>

        {/* 5 Cards Horizontal Row (Desktop) with Top-Right Numbers & Green Dashed Arrows */}
        <div className="grid grid-cols-1 md:grid-cols-5 gap-4 relative">
          {steps.map((st, i) => {
            const Icon = st.icon;
            const isLast = i === steps.length - 1;

            return (
              <RevealOnScroll key={st.num} animation="fade-up" delay={i * 150} className="relative h-full">
                <div className="relative flex flex-col justify-between h-full bg-white rounded-2xl p-5 shadow-xs border border-slate-200/90 hover:border-[#00a86b]/50 hover:shadow-md transition-all">
                  <div>
                    <div className="flex items-center justify-between mb-4">
                      <div className="w-8.5 h-8.5 rounded-xl bg-emerald-50 text-[#00a86b] flex items-center justify-center border border-emerald-100">
                        <Icon className="w-4 h-4" />
                      </div>
                      <span className="text-xs font-black text-slate-400">
                        {st.num}
                      </span>
                    </div>

                    <h3 className="text-sm font-bold text-slate-900 mb-1">
                      {st.title}
                    </h3>

                    <p className="text-xs text-slate-500 leading-snug">
                      {st.desc}
                    </p>
                  </div>

                  {/* Green Dashed Arrow between cards (Matching reference image) */}
                  {!isLast && (
                    <div className="hidden md:flex absolute -right-4 top-1/2 -translate-y-1/2 z-20 items-center justify-center text-emerald-600 font-bold text-xs">
                      <span className="tracking-tighter">--→</span>
                    </div>
                  )}
                </div>
              </RevealOnScroll>
            );
          })}
        </div>

      </div>
    </section>
  );
};


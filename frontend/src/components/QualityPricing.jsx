import React from 'react';
import { ChevronRight, Scale, Award, Truck, IndianRupee, FileCheck, CheckCircle2, Sprout } from 'lucide-react';
import { RevealOnScroll } from './RevealOnScroll';

export const QualityPricing = () => {
  return (
    <section id="quality" className="py-20 lg:py-28 bg-white relative overflow-hidden">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">

        {/* Section Header */}
        <RevealOnScroll animation="fade-up" className="text-center max-w-2xl mx-auto mb-16 space-y-2">
          <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-900 tracking-tight">
            Smart Capacity-Based Collection Centers
          </h2>
          <p className="text-sm text-slate-600">
            A, B, and C represent center availability &amp; real-time storage capacity — NOT crop quality.
          </p>
        </RevealOnScroll>

        {/* 3 Cards for Collection Centers A, B, C */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">

          {/* Card A */}
          <RevealOnScroll animation="fade-up" delay={100} className="h-full">
            <div className="h-full bg-white rounded-2xl p-6 border border-emerald-200 shadow-xs hover:shadow-lg transition-all flex flex-col justify-between space-y-4">
              <div className="flex items-center justify-between">
                <div>
                  <span className="text-xs font-extrabold text-emerald-700 tracking-wider block mb-1">A CENTER</span>
                  <h3 className="text-lg font-black text-slate-900 mb-0.5">Priority Center</h3>
                  <p className="text-xs text-slate-500 font-semibold">Primary Allocation (76% Full)</p>
                </div>

                {/* Green Wheat Emblem */}
                <div className="w-16 h-16 rounded-full bg-emerald-50 border-2 border-emerald-500 flex items-center justify-center text-emerald-600 shadow-xs font-black text-xl">
                  A
                </div>
              </div>

              <div className="pt-3 border-t border-slate-100 flex items-center space-x-2 text-xs font-semibold text-slate-600">
                <span className="w-2 h-2 rounded-full bg-emerald-500" />
                <span className="text-emerald-700 font-bold">Status: AVAILABLE (1,200 kg Left)</span>
              </div>
            </div>
          </RevealOnScroll>

          {/* Card B */}
          <RevealOnScroll animation="fade-up" delay={300} className="h-full">
            <div className="h-full bg-white rounded-2xl p-6 border border-amber-200 shadow-xs hover:shadow-lg transition-all flex flex-col justify-between space-y-4">
              <div className="flex items-center justify-between">
                <div>
                  <span className="text-xs font-extrabold text-amber-600 tracking-wider block mb-1">B CENTER</span>
                  <h3 className="text-lg font-black text-slate-900 mb-0.5">Secondary Center</h3>
                  <p className="text-xs text-slate-500 font-semibold">Secondary Allocation (94% Full)</p>
                </div>

                {/* Amber Wheat Emblem */}
                <div className="w-16 h-16 rounded-full bg-amber-50 border-2 border-amber-500 flex items-center justify-center text-amber-600 shadow-xs font-black text-xl">
                  B
                </div>
              </div>

              <div className="pt-3 border-t border-slate-100 flex items-center space-x-2 text-xs font-semibold text-slate-600">
                <span className="w-2 h-2 rounded-full bg-amber-500" />
                <span className="text-amber-700 font-bold">Status: LIMITED (300 kg Left)</span>
              </div>
            </div>
          </RevealOnScroll>

          {/* Card C */}
          <RevealOnScroll animation="fade-up" delay={500} className="h-full">
            <div className="h-full bg-white rounded-2xl p-6 border border-red-200 shadow-xs hover:shadow-lg transition-all flex flex-col justify-between space-y-4">
              <div className="flex items-center justify-between">
                <div>
                  <span className="text-xs font-extrabold text-red-600 tracking-wider block mb-1">C CENTER</span>
                  <h3 className="text-lg font-black text-slate-900 mb-0.5">Overflow Center</h3>
                  <p className="text-xs text-slate-500 font-semibold">Overflow Backup (100% Full)</p>
                </div>

                {/* Red Wheat Emblem */}
                <div className="w-16 h-16 rounded-full bg-red-50 border-2 border-red-500 flex items-center justify-center text-red-600 shadow-xs font-black text-xl">
                  C
                </div>
              </div>

              <div className="pt-3 border-t border-slate-100 flex items-center space-x-2 text-xs font-semibold text-slate-600">
                <span className="w-2 h-2 rounded-full bg-red-500" />
                <span className="text-red-700 font-bold">Status: FULL (0 kg Left)</span>
              </div>
            </div>
          </RevealOnScroll>

        </div>

        {/* Clean Feature Flow Pill Bar */}
        <RevealOnScroll animation="fade-up" delay={700}>
          <div className="flex flex-wrap items-center justify-center gap-3 text-xs font-bold">

            <div className="flex items-center space-x-2 px-4 py-2 rounded-2xl bg-emerald-50 border border-emerald-200 shadow-xs text-emerald-900 font-bold">
              <Truck className="w-4 h-4 text-emerald-600" />
              <span>CENTER ALLOCATION</span>
            </div>

            <span className="text-slate-400 font-bold">→</span>

            <div className="flex items-center space-x-2 px-4 py-2 rounded-2xl bg-white border border-slate-200 shadow-xs text-slate-800">
              <CheckCircle2 className="w-4 h-4 text-emerald-600" />
              <span>FARMER ARRIVES</span>
            </div>

            <span className="text-slate-400 font-bold">→</span>

            <div className="flex items-center space-x-2 px-4 py-2 rounded-2xl bg-white border border-slate-200 shadow-xs text-slate-800">
              <Scale className="w-4 h-4 text-emerald-600" />
              <span>WEIGHING</span>
            </div>

            <span className="text-slate-400 font-bold">→</span>

            <div className="flex items-center space-x-2 px-4 py-2 rounded-2xl bg-white border border-slate-200 shadow-xs text-slate-800">
              <Award className="w-4 h-4 text-emerald-600" />
              <span>CATEGORY ALLOCATION</span>
            </div>

            <span className="text-slate-400 font-bold">→</span>

            <div className="flex items-center space-x-2 px-4 py-2 rounded-2xl bg-white border border-slate-200 shadow-xs text-slate-800">
              <IndianRupee className="w-4 h-4 text-emerald-600" />
              <span>PRICE CALCULATION</span>
            </div>

            <span className="text-slate-400 font-bold">→</span>

            <div className="flex items-center space-x-2 px-4 py-2 rounded-2xl bg-emerald-700 text-white shadow-xs">
              <FileCheck className="w-4 h-4" />
              <span>FAIR PRICE PAYOUT</span>
            </div>

          </div>
        </RevealOnScroll>

      </div>
    </section>
  );
};


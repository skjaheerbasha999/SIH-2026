import React from 'react';
import { ArrowRight, CheckCircle2 } from 'lucide-react';
import { useApp } from '../context/AppContext';
import { AgriculturalVisual } from './AgriculturalVisual';

export const Hero = () => {
  const { navigateTo, setUserSession } = useApp();

  return (
    <section id="hero" className="relative pt-12 pb-20 md:pt-16 md:pb-28 overflow-hidden bg-gradient-to-b from-[#f4fbf7] via-white to-white bg-saas-grid">

      {/* Background soft ambient glow */}
      <div className="absolute top-10 right-1/4 w-[500px] h-[500px] bg-[#00a86b]/5 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8 items-center">

          {/* Left Column: Headline & Action CTA */}
          <div className="lg:col-span-7 space-y-6 text-center lg:text-left">

            {/* Small Pill Badge */}
            <div className="inline-flex items-center space-x-2 px-3.5 py-1.5 rounded-full bg-emerald-100/70 border border-emerald-300/70 text-[#00a86b] text-xs font-bold uppercase tracking-wider">
              <span>🌾</span>
              <span>SMART AGRICULTURAL PROCUREMENT</span>
            </div>

            {/* Large Desktop Headline */}
            <h1 className="text-4xl sm:text-6xl lg:text-7xl font-black tracking-tight leading-[1.08]">
              <span className="text-[#00a86b]">Fair Prices.</span> <br />
              <span className="text-slate-900">Better Quality.</span> <br />
              <span className="text-slate-900">Trusted Procurement.</span>
            </h1>

            {/* Description */}
            <p className="text-base sm:text-lg text-slate-600 font-normal leading-relaxed max-w-xl mx-auto lg:mx-0">
              A transparent platform connecting farmers, Procurement Mitras and village collection centers.
            </p>

            {/* Primary Action Button: Sign In / Login */}
            <div className="pt-2 flex flex-wrap items-center justify-center lg:justify-start gap-3">
              <button
                onClick={() => navigateTo('login')}
                className="px-8 py-3.5 rounded-xl bg-[#00a86b] text-white font-bold text-sm shadow-lg shadow-[#00a86b]/20 hover:bg-[#008f5a] hover:shadow-xl transition-all transform hover:-translate-y-0.5 flex items-center justify-center space-x-2.5"
              >
                <span>Login</span>
                <ArrowRight className="w-4 h-4" />
              </button>

              <button
                onClick={() => navigateTo('create-account')}
                className="px-6 py-3.5 rounded-xl bg-white text-slate-800 font-bold text-sm border border-slate-300 hover:border-[#00a86b] hover:text-[#00a86b] shadow-xs transition-all"
              >
                Sign In / Create Account
              </button>
            </div>

            {/* 3 Tiny Trust Bullet Points */}
            <div className="pt-4 flex flex-wrap items-center justify-center lg:justify-start gap-x-5 gap-y-2 text-xs font-semibold text-slate-600">
              <span className="flex items-center space-x-1.5">
                <CheckCircle2 className="w-4 h-4 text-[#00a86b]" />
                <span>Farmers don&apos;t need smartphones</span>
              </span>
              <span className="flex items-center space-x-1.5">
                <CheckCircle2 className="w-4 h-4 text-[#00a86b]" />
                <span>Transparent quality grading</span>
              </span>
              <div className="flex items-center space-x-2 flex-shrink-0">
                <span className="w-2 h-2 rounded-full bg-emerald-400" />
                <span className="text-emerald-200 uppercase tracking-widest text-[10px] font-black">LIVE MANDI MSP RATES 2026</span>
              </div>
            </div>

          </div>

          {/* Right Column: Premium Visual Card */}
          <div className="lg:col-span-5 flex justify-center mt-6 lg:mt-0">
            <AgriculturalVisual />
          </div>

        </div>
      </div>
    </section>
  );
};

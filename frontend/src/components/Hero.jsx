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
              <span className="text-slate-900">Better Category Routing.</span> <br />
              <span className="text-emerald-500 underline decoration-[#00a86b]/40 underline-offset-8">
                Trusted Procurement.
              </span>
            </h1>

            {/* Subtitle Paragraph */}
            <p className="text-[#3b4252] text-sm sm:text-base md:text-lg leading-relaxed max-w-xl font-semibold mx-auto lg:mx-0">
              A transparent platform connecting farmers, Procurement Mitras and village collection centers with real-time capacity routing.
            </p>

            {/* CTA Buttons */}
            <div className="flex flex-col sm:flex-row items-center justify-center lg:justify-start items-stretch sm:items-center gap-3 pt-2">
              <button
                onClick={() => navigateTo('login')}
                className="group px-7 py-3.5 rounded-2xl bg-[#00a86b] hover:bg-[#008f5a] text-white text-sm font-extrabold shadow-md hover:shadow-lg transition-all transform active:scale-98 flex items-center justify-center space-x-2"
              >
                <span>Login</span>
                <ArrowRight className="w-4 h-4 text-emerald-200 group-hover:translate-x-1 transition-transform" />
              </button>
              <button
                onClick={() => navigateTo('register')}
                className="px-7 py-3.5 rounded-2xl bg-white hover:bg-slate-100 text-slate-800 text-sm font-extrabold border border-slate-300 shadow-xs hover:border-slate-400 transition-all text-center"
              >
                Sign In / Create Account
              </button>
            </div>

            {/* Key Trust Signals */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs font-bold text-[#4c566a] pt-3 justify-items-center lg:justify-items-start">
              <div className="flex items-center space-x-2">
                <CheckCircle2 className="w-4 h-4 text-[#00a86b] flex-shrink-0" />
                <span>Farmers don't need smartphones</span>
              </div>
              <div className="flex items-center space-x-2">
                <CheckCircle2 className="w-4 h-4 text-[#00a86b] flex-shrink-0" />
                <span>Transparent category allocation</span>
              </div>
              <div className="flex items-center space-x-2 flex-shrink-0 sm:col-span-2">
                <span className="w-2 h-2 rounded-full bg-emerald-400" />
                <span className="text-emerald-400 uppercase tracking-widest text-[10px] font-black">LIVE MANDI MSP RATES 2026</span>
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

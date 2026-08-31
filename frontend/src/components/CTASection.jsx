import React from 'react';
import { ArrowRight, IndianRupee, CheckCircle2, ShieldCheck } from 'lucide-react';
import { useApp } from '../context/AppContext';
import { RevealOnScroll } from './RevealOnScroll';

export const CTASection = () => {
  const { navigateTo } = useApp();

  return (
    <section className="py-16 lg:py-24 bg-white relative overflow-hidden">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">

        {/* Deep Forest Green Banner Container */}
        <div className="bg-[#00a86b] text-white rounded-3xl p-8 sm:p-12 shadow-2xl relative overflow-hidden grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">

          {/* Subtle Leaf background texture */}
          <div className="absolute top-0 right-0 w-96 h-96 bg-emerald-500/10 rounded-full blur-3xl pointer-events-none" />

          {/* Left Side: Heading, Subtitle & Single Sign In Button */}
          <div className="lg:col-span-6 space-y-6 text-center lg:text-left z-10">
            <RevealOnScroll animation="fade-right" delay={100}>
              <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black text-white tracking-tight leading-tight">
                Let&apos;s Make Crop Procurement <br />
                <span className="text-[#f59e0b]">Fairer &amp; Smarter.</span>
              </h2>
            </RevealOnScroll>

            <RevealOnScroll animation="fade-right" delay={200}>
              <p className="text-sm text-emerald-100/90 max-w-md mx-auto lg:mx-0 font-normal leading-relaxed">
                Connecting farmers, collection centers and government through transparent category-based procurement.
              </p>
            </RevealOnScroll>

            {/* CTA Button: Sign In → */}
            <RevealOnScroll animation="fade-right" delay={300}>
              <div className="pt-2 flex justify-center lg:justify-start">
                <button
                  onClick={() => navigateTo('create-account')}
                  className="px-7 py-3.5 rounded-xl bg-white text-[#00a86b] font-bold text-sm shadow-xl hover:bg-emerald-50 transition-all flex items-center justify-center space-x-2 transform hover:-translate-y-0.5"
                >
                  <span>Sign In →</span>
                </button>
              </div>
            </RevealOnScroll>
          </div>

          {/* Middle: Indian Farmer Partnership Box */}
          <div className="lg:col-span-3 flex justify-center z-10">
            <RevealOnScroll animation="scale" delay={300}>
              <div className="relative w-44 h-56 rounded-3xl bg-emerald-950/80 border-2 border-emerald-600/60 overflow-hidden shadow-xl flex flex-col items-center justify-center text-center p-4 space-y-2">
                <span className="text-xs font-bold text-white block">Indian Farmer Partnership</span>
                <span className="text-[10px] text-emerald-200 block">Empowered via Village Mitras</span>
              </div>
            </RevealOnScroll>
          </div>

          {/* Far Right: 3 Feature Cards Stack */}
          <div className="lg:col-span-3 space-y-3 z-10">

            {/* Feature 1 */}
            <RevealOnScroll animation="fade-left" delay={400}>
              <div className="bg-emerald-950/70 rounded-2xl p-3 border border-emerald-700/80 backdrop-blur-xs flex items-center space-x-3">
                <div className="w-8 h-8 rounded-full bg-emerald-900 text-amber-300 flex items-center justify-center text-xs font-bold">
                  <IndianRupee className="w-4 h-4" />
                </div>
                <div>
                  <span className="text-xs font-bold text-white block">Fair Prices</span>
                  <span className="text-[10px] text-emerald-200">Based on category</span>
                </div>
              </div>
            </RevealOnScroll>

            {/* Feature 2 */}
            <RevealOnScroll animation="fade-left" delay={500}>
              <div className="bg-emerald-950/70 rounded-2xl p-3 border border-emerald-700/80 backdrop-blur-xs flex items-center space-x-3">
                <div className="w-8 h-8 rounded-full bg-emerald-900 text-emerald-300 flex items-center justify-center text-xs font-bold">
                  <CheckCircle2 className="w-4 h-4" />
                </div>
                <div>
                  <span className="text-xs font-bold text-white block">Transparent Process</span>
                  <span className="text-[10px] text-emerald-200">No hidden deductions</span>
                </div>
              </div>
            </RevealOnScroll>

            {/* Feature 3 */}
            <RevealOnScroll animation="fade-left" delay={600}>
              <div className="bg-emerald-950/70 rounded-2xl p-3 border border-emerald-700/80 backdrop-blur-xs flex items-center space-x-3">
                <div className="w-8 h-8 rounded-full bg-emerald-900 text-emerald-300 flex items-center justify-center text-xs font-bold">
                  <ShieldCheck className="w-4 h-4" />
                </div>
                <div>
                  <span className="text-xs font-bold text-white block">Secure &amp; Reliable</span>
                  <span className="text-[10px] text-emerald-200">End-to-end tracking</span>
                </div>
              </div>
            </RevealOnScroll>

          </div>

        </div>

      </div>
    </section>
  );
};


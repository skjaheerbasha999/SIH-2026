import React from 'react';
import { Smartphone, PhoneCall, MessageSquare, HeartHandshake, UserCheck, ArrowRight, CheckCircle2, Volume2 } from 'lucide-react';
import { useApp } from '../context/AppContext';


export const LowDigitalAccess = () => {
  const { navigateTo, selectedLanguage } = useApp();

  return (
    <section className="py-16 sm:py-24 bg-gradient-to-br from-amber-500/10 via-emerald-50 to-teal-50 relative overflow-hidden">
      
      {/* Decorative Warm Accents */}
      <div className="absolute top-0 right-10 w-80 h-80 bg-amber-200/40 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-0 left-10 w-80 h-80 bg-emerald-200/40 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="bg-white rounded-3xl p-8 sm:p-12 shadow-xl border-2 border-emerald-100/90 grid grid-cols-1 lg:grid-cols-12 gap-10 items-center">
          
          {/* Left Column: Text & Features */}
          <div className="lg:col-span-7 space-y-6">
            
            <div className="inline-flex items-center space-x-2 px-3.5 py-1 rounded-full bg-amber-100 text-amber-900 text-xs font-bold uppercase tracking-wider border border-amber-300">
              <Smartphone className="w-3.5 h-3.5 text-amber-700" />
              <span>Inclusive Rural Accessibility</span>
            </div>


            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-slate-900 tracking-tight leading-tight">
              No Smartphone? <br />
              <span className="text-emerald-700">No Problem.</span>
            </h2>

            <p className="text-base sm:text-lg text-slate-600 font-normal leading-relaxed">
              Farmers can access the procurement system through Procurement Mitras. Important updates can be delivered through SMS and voice calls in local languages.
            </p>

            {/* 3 Inclusion Pill Cards */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 pt-2">
              
              <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200/80">
                <div className="w-8 h-8 rounded-xl bg-amber-500 text-white flex items-center justify-center font-bold mb-2">
                  <PhoneCall className="w-4 h-4" />
                </div>
                <h4 className="text-xs font-bold text-slate-900">IVR Voice Calls</h4>
                <p className="text-[11px] text-slate-500 mt-0.5">Local language audio updates on basic keypad phones.</p>
              </div>

              <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200/80">
                <div className="w-8 h-8 rounded-xl bg-emerald-600 text-white flex items-center justify-center font-bold mb-2">
                  <MessageSquare className="w-4 h-4" />
                </div>
                <h4 className="text-xs font-bold text-slate-900">SMS Tokens</h4>
                <p className="text-[11px] text-slate-500 mt-0.5">Instant SMS receipt with payment transaction ID.</p>
              </div>

              <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200/80">
                <div className="w-8 h-8 rounded-xl bg-teal-600 text-white flex items-center justify-center font-bold mb-2">
                  <HeartHandshake className="w-4 h-4" />
                </div>
                <h4 className="text-xs font-bold text-slate-900">Mitra Volunteers</h4>
                <p className="text-[11px] text-slate-500 mt-0.5">Village youth trained to assist elders &amp; farmers.</p>
              </div>

            </div>

            {/* CTA Button */}
            <div className="pt-3">
              <button
                onClick={() => navigateTo('/procurement-mitra', { title: 'Procurement Mitra Network', description: 'Learn how village volunteers bridge the digital divide for smallholder farmers.' })}
                className="px-7 py-3.5 rounded-2xl bg-emerald-700 text-white font-bold text-sm shadow-lg shadow-emerald-700/20 hover:bg-emerald-800 transition-all flex items-center space-x-2"
              >
                <span>Learn More</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>

          </div>

          {/* Right Column: Visual Mitra Workflow Card */}
          <div className="lg:col-span-5">
            <div className="bg-gradient-to-br from-emerald-900 to-teal-950 text-white rounded-3xl p-6 sm:p-8 shadow-xl border border-emerald-800 space-y-6">
              
              <div className="text-center pb-4 border-b border-emerald-800/80">
                <span className="text-xs font-bold text-amber-300 uppercase tracking-widest block mb-1">
                  Human-Assisted Digital Bridge
                </span>
                <h3 className="text-xl font-extrabold text-white">
                  Farmer → Procurement Mitra → Digital System
                </h3>
              </div>

              {/* 3 Step Visual */}
              <div className="space-y-4">
                
                {/* Step 1 */}
                <div className="flex items-center space-x-4 bg-emerald-800/50 p-3.5 rounded-2xl border border-emerald-700">
                  <div className="w-10 h-10 rounded-xl bg-amber-400 text-slate-900 flex items-center justify-center font-bold text-lg">
                    🌾
                  </div>
                  <div>
                    <h4 className="text-xs font-bold text-white">1. Farmer Arrives</h4>
                    <p className="text-[11px] text-emerald-200">No smartphone needed. Carries land ID or Aadhaar.</p>
                  </div>
                </div>

                <div className="flex justify-center text-amber-300 font-bold text-xs">↓</div>

                {/* Step 2 */}
                <div className="flex items-center space-x-4 bg-emerald-800/50 p-3.5 rounded-2xl border border-emerald-700">
                  <div className="w-10 h-10 rounded-xl bg-emerald-500 text-white flex items-center justify-center font-bold">
                    <HeartHandshake className="w-5 h-5" />
                  </div>
                  <div>
                    <h4 className="text-xs font-bold text-white">2. Procurement Mitra Assists</h4>
                    <p className="text-[11px] text-emerald-200">Mitra inputs crop weight &amp; inspects moisture grade.</p>
                  </div>
                </div>

                <div className="flex justify-center text-amber-300 font-bold text-xs">↓</div>

                {/* Step 3 */}
                <div className="flex items-center space-x-4 bg-emerald-800/50 p-3.5 rounded-2xl border border-emerald-700">
                  <div className="w-10 h-10 rounded-xl bg-teal-400 text-slate-900 flex items-center justify-center font-bold">
                    <UserCheck className="w-5 h-5" />
                  </div>
                  <div>
                    <h4 className="text-xs font-bold text-white">3. Digital Bank Transfer &amp; Voice SMS</h4>
                    <p className="text-[11px] text-emerald-200">Farmer receives IVR call confirmation in local dialect.</p>
                  </div>
                </div>

              </div>

              {/* Sample Voice SMS Alert Box */}
              <div className="p-3.5 rounded-2xl bg-amber-500/20 border border-amber-400/40 flex items-center space-x-3 text-xs text-amber-200">
                <Volume2 className="w-5 h-5 text-amber-300 flex-shrink-0" />
                <p>
                  <span className="font-bold text-white block">Local IVR Sample:</span>
                  &quot;रामेश जी, आपके 45 क्विंटल गेहूं का ₹1,17,730 भुगतान खाते में भेज दिया गया है।&quot;
                </p>
              </div>

            </div>
          </div>

        </div>
      </div>
    </section>
  );
};

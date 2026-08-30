import React from 'react';
import { User, Users, Building2, Eye, Scale, FileText, Landmark, ArrowRight, ChevronRight } from 'lucide-react';

export const ProcessFlowSection = () => {
  const visualFlowSteps = [
    {
      id: 'farmer',
      title: 'FARMER',
      icon: User,
      subtitle: 'Registers harvest request',
      desc: 'Smallholders with or without smartphones',
      bgColor: 'bg-amber-500',
      borderColor: 'border-amber-400'
    },
    {
      id: 'mitra',
      title: 'PROCUREMENT MITRA',
      icon: Users,
      subtitle: 'Assists farmer registration',
      desc: 'Village volunteer inputting crop & quantity details',
      bgColor: 'bg-emerald-600',
      borderColor: 'border-emerald-500'
    },
    {
      id: 'allocation',
      title: 'SMART CENTER ALLOCATION',
      icon: Building2,
      subtitle: 'Auto Capacity Check',
      desc: 'Evaluates center load and routes A → B → C Center',
      bgColor: 'bg-[#00a86b]',
      borderColor: 'border-emerald-500'
    },
    {
      id: 'center',
      title: 'A / B / C CENTER',
      icon: Building2,
      subtitle: 'Capacity Based Routing',
      desc: 'Assigned Priority (A), Secondary (B), or Overflow (C)',
      bgColor: 'bg-[#00a86b]',
      borderColor: 'border-emerald-600'
    },
    {
      id: 'weighing',
      title: 'WEIGHING & PROCUREMENT',
      icon: Scale,
      subtitle: 'Post-arrival inspection',
      desc: 'Physical weighing and quality grading at center',
      bgColor: 'bg-[#00a86b]',
      borderColor: 'border-emerald-700'
    },
    {
      id: 'receipt',
      title: 'DIGITAL RECEIPT',
      icon: FileText,
      subtitle: 'Instant SMS & Payout',
      desc: 'Records weight, grade & direct bank transfer',
      bgColor: 'bg-[#00a86b]',
      borderColor: 'border-emerald-700'
    }
  ];

  return (
    <section id="how-it-works-diagram" className="py-16 sm:py-20 bg-emerald-950 text-white relative overflow-hidden">

      {/* Subtle Background Radial Glow */}
      <div className="absolute top-0 right-1/4 w-96 h-96 bg-emerald-500/10 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-0 left-1/4 w-96 h-96 bg-amber-500/10 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">

        {/* Section Title */}
        <div className="text-center max-w-3xl mx-auto mb-14 space-y-3">
          <span className="px-3.5 py-1 rounded-full bg-emerald-900/80 text-emerald-300 text-xs font-bold uppercase tracking-wider border border-emerald-700">
            End-to-End Visual Workflow
          </span>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight">
            How Smart &amp; Fair Procurement Works
          </h2>
          <p className="text-base text-emerald-200/80">
            A seamless chain connecting the farmer in the field to the central government hub.
          </p>
        </div>

        {/* Visual Flow Grid / Stepper */}
        <div className="space-y-4">

          {/* Desktop/Tablet Horizontal Chain */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-6 gap-3">
            {visualFlowSteps.map((step, index) => {
              const Icon = step.icon;
              const isLast = index === visualFlowSteps.length - 1;

              return (
                <div key={step.id} className="relative flex flex-col justify-between">
                  <div className={`h-full bg-emerald-900/50 backdrop-blur-xs rounded-2xl p-4 border ${step.borderColor} hover:bg-emerald-900/90 transition-all duration-300 flex flex-col justify-between group`}>

                    <div>
                      {/* Step Number & Icon */}
                      <div className="flex items-center justify-between mb-3">
                        <div className={`w-9 h-9 rounded-xl ${step.bgColor} text-white flex items-center justify-center font-bold shadow-md`}>
                          <Icon className="w-5 h-5" />
                        </div>
                        <span className="text-[10px] font-extrabold text-emerald-400">
                          0{index + 1}
                        </span>
                      </div>

                      {/* Title */}
                      <h3 className="text-xs font-black text-amber-300 uppercase tracking-wider mb-1 leading-tight group-hover:text-white transition-colors">
                        {step.title}
                      </h3>

                      {/* Subtitle */}
                      <p className="text-xs font-semibold text-emerald-100 mb-2">
                        {step.subtitle}
                      </p>
                    </div>

                    {/* Short Description */}
                    <div className="pt-2 border-t border-emerald-800/80 text-[11px] text-emerald-300/80 leading-snug">
                      {step.desc}
                    </div>

                  </div>

                  {/* Flow Arrow on Mobile/Tablet */}
                  {!isLast && (
                    <div className="lg:hidden flex justify-center py-1 text-emerald-400 font-bold">
                      ↓
                    </div>
                  )}
                </div>
              );
            })}
          </div>

          {/* Connected Flow Pill Summary */}
          <div className="mt-8 bg-emerald-900/80 rounded-2xl p-4 border border-emerald-700/80 flex flex-wrap items-center justify-center gap-2 text-xs font-bold text-emerald-200">
            <span>FARMER</span>
            <ChevronRight className="w-3.5 h-3.5 text-amber-400" />
            <span>PROCUREMENT MITRA</span>
            <ChevronRight className="w-3.5 h-3.5 text-amber-400" />
            <span className="text-amber-300 font-black">SMART CENTER ALLOCATION</span>
            <ChevronRight className="w-3.5 h-3.5 text-amber-400" />
            <span>A / B / C CENTER</span>
            <ChevronRight className="w-3.5 h-3.5 text-amber-400" />
            <span>WEIGHING &amp; PROCUREMENT</span>
            <ChevronRight className="w-3.5 h-3.5 text-amber-400" />
            <span>DIGITAL RECEIPT</span>
          </div>

        </div>

      </div>
    </section>
  );
};

import React from 'react';
import { X, ArrowRight, CheckCircle2, Sparkles } from 'lucide-react';
import { useApp } from '../context/AppContext';

export const RoleModal = () => {
  const { activeModalRoute, setActiveModalRoute } = useApp();

  if (!activeModalRoute) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/75 backdrop-blur-xs animate-in fade-in duration-200">
      <div className="bg-white rounded-3xl max-w-xl w-full p-6 sm:p-8 shadow-2xl border border-slate-200 relative overflow-hidden space-y-6">

        {/* Header Bar */}
        <div className="flex items-center justify-between pb-4 border-b border-slate-100 relative z-10">
          <div className="flex items-center space-x-2">
            <span className="px-3 py-1 rounded-full bg-[#00a86b] text-white text-xs font-bold uppercase tracking-wider">
              {activeModalRoute.path}
            </span>
            <span className="text-[11px] text-slate-400 font-semibold">Sign In Portal</span>
          </div>
          <button
            onClick={() => setActiveModalRoute(null)}
            className="p-1.5 rounded-full hover:bg-slate-100 text-slate-400 hover:text-slate-700 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Modal Title & Info */}
        <div className="space-y-2 relative z-10">
          <h3 className="text-2xl font-black text-slate-900">
            {activeModalRoute.title}
          </h3>
          <p className="text-sm text-slate-600 leading-relaxed">
            {activeModalRoute.description}
          </p>
        </div>

        {/* Capability Preview Card */}
        <div className="p-4 rounded-2xl bg-emerald-50/70 border border-emerald-200 space-y-3 relative z-10">
          <div className="flex items-center justify-between text-xs font-bold text-[#00a86b]">
            <span className="flex items-center space-x-1.5">
              <Sparkles className="w-4 h-4 text-[#00a86b]" />
              <span>Sign In Authentication</span>
            </span>
            <span className="text-emerald-700">SIH 2026 Ready</span>
          </div>

          <div className="space-y-2 text-xs text-slate-700">
            <div className="flex items-center space-x-2">
              <CheckCircle2 className="w-4 h-4 text-[#00a86b] flex-shrink-0" />
              <span>Aadhaar &amp; Mobile OTP portal verification</span>
            </div>
            <div className="flex items-center space-x-2">
              <CheckCircle2 className="w-4 h-4 text-[#00a86b] flex-shrink-0" />
              <span>Role-based access for Farmer, Mitra, Center &amp; Officer</span>
            </div>
          </div>
        </div>

        {/* Footer Actions */}
        <div className="pt-2 flex flex-col sm:flex-row items-center justify-end gap-3 relative z-10">
          <button
            onClick={() => setActiveModalRoute(null)}
            className="w-full sm:w-auto px-5 py-2.5 rounded-xl border border-slate-200 text-sm font-semibold text-slate-700 hover:bg-slate-50 transition-colors"
          >
            Close
          </button>
          <button
            onClick={() => {
              setActiveModalRoute(null);
              window.scrollTo({ top: 0, behavior: 'smooth' });
            }}
            className="w-full sm:w-auto px-6 py-2.5 rounded-xl bg-[#00a86b] text-white text-sm font-semibold shadow-md hover:bg-[#008f5a] transition-colors flex items-center justify-center space-x-2"
          >
            <span>Sign In →</span>
          </button>
        </div>

      </div>
    </div>
  );
};

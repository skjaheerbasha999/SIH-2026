import React from 'react';
import { Sprout } from 'lucide-react';
import { useApp } from '../context/AppContext';
import { RevealOnScroll } from './RevealOnScroll';

export const Footer = () => {
  const { navigateTo } = useApp();

  return (
    <footer className="bg-[#0b132b] text-slate-400 py-8 border-t border-slate-900 text-xs">
      <RevealOnScroll animation="fade-up" className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col md:flex-row items-center justify-between gap-4">

        {/* Left Logo */}
        <div className="flex items-center space-x-2.5">
          <div className="w-7 h-7 rounded-full bg-[#00a86b] flex items-center justify-center text-white font-bold">
            <Sprout className="w-4 h-4" />
          </div>
          <div className="flex flex-col">
            <span className="font-bold text-white text-xs leading-none">Smart &amp; Fair</span>
            <span className="text-[9px] font-medium text-slate-400 mt-0.5">Crop Procurement</span>
          </div>
        </div>

        {/* Center Nav Links */}
        <div className="flex items-center space-x-6 text-xs font-semibold text-slate-300">
          <a href="#hero" onClick={(e) => { e.preventDefault(); navigateTo('#hero'); }} className="hover:text-emerald-400 transition-colors">
            Home
          </a>
          <a href="#how-it-works" onClick={(e) => { e.preventDefault(); navigateTo('#how-it-works'); }} className="hover:text-emerald-400 transition-colors">
            How It Works
          </a>
          <a href="#quality" onClick={(e) => { e.preventDefault(); navigateTo('#quality'); }} className="hover:text-emerald-400 transition-colors">
            Category Allocation
          </a>
        </div>

        {/* Right Copyright */}
        <p className="text-[11px] text-slate-400">
          © 2026 Smart &amp; Fair Crop Procurement System
        </p>

      </RevealOnScroll>
    </footer>
  );
};

import React, { useState } from 'react';
import { Sprout, Menu, X, ArrowRight, Shield, Phone, HelpCircle } from 'lucide-react';
import { useApp } from '../context/AppContext';

export const Navbar = () => {
  const { navigateTo } = useApp();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const navLinks = [
    { name: 'Home', href: '#hero' },
    { name: 'Procurement Workflow', href: '#how-it-works' },
    { name: 'Category & MSP Rates', href: '#quality' },
  ];

  return (
    <header className="sticky top-0 z-50 bg-white border-b border-slate-200 shadow-xs font-sans">

      {/* OFFICIAL TOP GOVT BANNER */}
      <div className="bg-[#008f5a] text-emerald-100 py-1.5 px-4 text-[11px] font-semibold border-b border-emerald-900">
        <div className="max-w-7xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-1 text-center sm:text-left">
          <div className="flex items-center space-x-2">
            <span>Rashtriya Krishi Procurement Portal • Ministry of Agriculture &amp; Farmers Welfare</span>
          </div>
          <div className="flex items-center space-x-4">
            <span className="flex items-center space-x-1">
              <Phone className="w-3 h-3 text-emerald-300" />
              <span>Kisan Toll-Free Helpline: <strong>1800-180-1551</strong></span>
            </span>
            <span className="hidden md:inline text-emerald-300">|</span>
            <span className="hidden md:inline">Language: <strong>English / हिंदी / ਪੰਜਾਬੀ</strong></span>
          </div>
        </div>
      </div>

      {/* MAIN NAVIGATION BAR */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-3">
        <div className="flex items-center justify-between">

          {/* Brand Logo */}
          <a
            href="#hero"
            onClick={(e) => {
              e.preventDefault();
              navigateTo('home');
            }}
            className="flex items-center space-x-3 group"
          >
            <div className="w-9 h-9 rounded-xl bg-[#00a86b] flex items-center justify-center text-white shadow-xs group-hover:bg-[#008f5a] transition-colors">
              <Sprout className="w-5 h-5" />
            </div>
            <div className="flex flex-col">
              <span className="text-base font-black tracking-tight text-slate-900 leading-none">
                AgriProcure Portal
              </span>
              <span className="text-[10px] font-bold uppercase tracking-widest text-[#00a86b] mt-0.5">
                National MSP Crop Category &amp; Procurement System
              </span>
            </div>
          </a>

          {/* Center Navigation Links */}
          <nav className="hidden md:flex items-center space-x-7">
            {navLinks.map((link) => (
              <a
                key={link.name}
                href={link.href}
                onClick={(e) => {
                  e.preventDefault();
                  navigateTo(link.href);
                }}
                className="text-xs font-bold text-slate-700 hover:text-[#00a86b] transition-colors"
              >
                {link.name}
              </a>
            ))}
          </nav>

          {/* Right Action Buttons */}
          <div className="hidden md:flex items-center space-x-3">
            <button
              onClick={() => navigateTo('login')}
              className="text-xs font-bold text-slate-700 hover:text-[#00a86b] px-3.5 py-2 transition-colors border border-slate-200 rounded-xl hover:border-slate-300 bg-slate-50"
            >
              General Login
            </button>

            <button
              onClick={() => navigateTo('create-account')}
              className="flex items-center space-x-1.5 px-4 py-2 rounded-xl bg-[#00a86b] text-white text-xs font-black shadow-xs hover:bg-[#008f5a] transition-all"
            >
              <span>Sign In / Register →</span>
            </button>
          </div>

          {/* Mobile Menu Button */}
          <div className="md:hidden">
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="p-2 rounded-lg text-slate-700 hover:bg-slate-100 border border-slate-200"
            >
              {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>

        </div>
      </div>

      {/* Mobile Menu Drawer */}
      {mobileMenuOpen && (
        <div className="md:hidden bg-white border-b border-slate-200 px-4 pt-3 pb-5 space-y-3">
          {navLinks.map((link) => (
            <a
              key={link.name}
              href={link.href}
              onClick={(e) => {
                e.preventDefault();
                setMobileMenuOpen(false);
                navigateTo(link.href);
              }}
              className="block text-sm font-bold text-slate-800 hover:text-[#00a86b]"
            >
              {link.name}
            </a>
          ))}
          <div className="pt-2 border-t border-slate-100 flex flex-col space-y-2">
            <button
              onClick={() => {
                setMobileMenuOpen(false);
                navigateTo('login');
              }}
              className="w-full py-2.5 text-center text-xs font-bold text-slate-700 bg-slate-100 rounded-xl"
            >
              General Login
            </button>
            <button
              onClick={() => {
                setMobileMenuOpen(false);
                navigateTo('create-account');
              }}
              className="w-full py-2.5 text-center text-xs font-bold text-white bg-[#00a86b] rounded-xl"
            >
              Sign In / Register →
            </button>
          </div>
        </div>
      )}
    </header>
  );
};

export default Navbar;

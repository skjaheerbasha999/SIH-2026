import React, { useState } from 'react';
import { Sprout, Menu, X, ArrowRight, Shield, Phone, HelpCircle, Globe } from 'lucide-react';
import { useApp } from '../context/AppContext';
import { useTranslation } from 'react-i18next';
import { LANGUAGES } from '../data/mockData';

export const Navbar = () => {
  const { navigateTo, selectedLanguage, setSelectedLanguage } = useApp();
  const { t } = useTranslation();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const navLinks = [
    { name: t('Home'), href: '#hero' },
    { name: t('Procurement Workflow'), href: '#how-it-works' },
    { name: t('Category & MSP Rates'), href: '#quality' },
  ];

  return (
    <header className="sticky top-0 z-50 bg-white border-b border-slate-200 shadow-xs font-sans">

      {/* OFFICIAL TOP GOVT BANNER */}
      <div className="bg-[#008f5a] text-emerald-100 py-1.5 px-4 text-[11px] font-semibold border-b border-emerald-900">
        <div className="max-w-7xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-1 text-center sm:text-left">
          <div className="flex items-center space-x-2">
            <span>{t("Rashtriya Krishi Procurement Portal • Ministry of Agriculture & Farmers Welfare")}</span>
          </div>
          <div className="flex items-center space-x-3">
            <span className="flex items-center space-x-1">
              <Phone className="w-3 h-3 text-emerald-300" />
              <span>{t("Kisan Toll-Free Helpline:")} <strong>1800-180-1551</strong></span>
            </span>
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
                {t("Smart & Fair")}
              </span>
              <span className="text-[10px] font-bold uppercase tracking-widest text-[#00a86b] mt-0.5">
                {t("National MSP Crop Category & Procurement System")}
              </span>
            </div>
          </a>

          {/* Center Navigation Links */}
          <nav className="hidden md:flex items-center space-x-7">
            {navLinks.map((link) => (
              <a
                key={link.href}
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
              {t("General Login")}
            </button>

            <button
              onClick={() => navigateTo('create-account')}
              className="flex items-center space-x-1.5 px-4 py-2 rounded-xl bg-[#00a86b] text-white text-xs font-black shadow-xs hover:bg-[#008f5a] transition-all"
            >
              <span>{t("Sign In / Register →")}</span>
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
              key={link.href}
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
              {t("General Login")}
            </button>
            <button
              onClick={() => {
                setMobileMenuOpen(false);
                navigateTo('create-account');
              }}
              className="w-full py-2.5 text-center text-xs font-bold text-white bg-[#00a86b] rounded-xl"
            >
              {t("Sign In / Register →")}
            </button>
          </div>
        </div>
      )}
    </header>
  );
};

export default Navbar;

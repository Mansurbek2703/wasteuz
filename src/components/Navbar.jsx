import React, { useState } from 'react';
import { Menu, X, Globe, Shield, Sparkles } from 'lucide-react';

export default function Navbar({ lang, setLang, t, onOpenAdmin }) {
  const [isOpen, setIsOpen] = useState(false);

  const navLinks = [
    { href: '#home', label: t.nav.home },
    { href: '#about', label: t.nav.about },
    { href: '#partners', label: t.nav.partners },
    { href: '#work-packages', label: t.nav.workPackages },
    { href: '#virtual-lab', label: t.nav.virtualLab, highlight: true },
    { href: '#news', label: t.nav.news },
    { href: '#tenders', label: t.nav.tenders },
    { href: '#contact', label: t.nav.contact },
  ];

  return (
    <header className="sticky top-0 z-50 bg-white/95 backdrop-blur shadow-sm border-b border-slate-100">
      {/* EU Top Banner (Standard for Erasmus+ Official Projects) */}
      <div className="bg-slate-900 text-slate-100 text-xs py-1.5 px-4 sm:px-8 border-b border-slate-800">
        <div className="max-w-7xl mx-auto flex flex-wrap items-center justify-between gap-2">
          <div className="flex items-center gap-2.5">
            {/* European Flag representation */}
            <div className="w-6 h-4 bg-[#003399] rounded-[2px] flex items-center justify-center relative overflow-hidden shadow-xs">
              <span className="text-[10px] text-yellow-300 font-bold leading-none">★</span>
            </div>
            <span className="font-medium">
              <strong className="text-yellow-400">{t.eu.cofunded}</strong> {t.eu.euName}
            </span>
            <span className="hidden md:inline text-slate-400">|</span>
            <span className="hidden md:inline text-slate-300 font-mono text-[11px]">{t.eu.grantRef}</span>
          </div>

          <div className="flex items-center gap-3">
            <button 
              onClick={() => setLang(lang === 'en' ? 'uz' : 'en')}
              className="flex items-center gap-1.5 px-2 py-0.5 rounded bg-slate-800 hover:bg-slate-700 text-slate-200 transition font-medium text-[11px]"
              title="Change Language"
            >
              <Globe className="w-3.5 h-3.5 text-brand-blue-light" />
              <span>{lang === 'en' ? "O'zbekcha" : "English"}</span>
            </button>

            <button
              onClick={onOpenAdmin}
              className="flex items-center gap-1 px-2 py-0.5 rounded bg-brand-blue/20 hover:bg-brand-blue/30 text-sky-300 transition text-[11px]"
            >
              <Shield className="w-3 h-3" />
              <span>{t.nav.admin}</span>
            </button>
          </div>
        </div>
      </div>

      {/* Main Navbar */}
      <div className="max-w-7xl mx-auto px-4 sm:px-8 py-3.5 flex items-center justify-between">
        {/* Brand Logo */}
        <a href="#home" className="flex items-center gap-3 group">
          <img 
            src="/logo.jpg" 
            alt="WASTE-UZ Official Logo" 
            className="h-11 sm:h-12 w-auto object-contain rounded-md shadow-xs group-hover:scale-105 transition transform duration-200"
          />
          <div className="flex flex-col">
            <div className="flex items-center gap-1">
              <span className="font-extrabold text-xl sm:text-2xl tracking-tight text-slate-900 group-hover:text-brand-blue transition">
                WASTE<span className="text-brand-green">UZ</span>
              </span>
              <span className="text-[10px] uppercase font-bold tracking-wider px-1.5 py-0.5 bg-sky-100 text-brand-blue-dark rounded-full">
                101322962
              </span>
            </div>
            <span className="text-[11px] text-slate-500 hidden sm:block max-w-xs truncate">
              Waste Awareness Skills Training & Education
            </span>
          </div>
        </a>

        {/* Desktop Menu */}
        <nav className="hidden lg:flex items-center gap-1 xl:gap-2 text-[13px] font-medium text-slate-600">
          {navLinks.map((link) => (
            <a
              key={link.href}
              href={link.href}
              className={`px-3 py-1.5 rounded-lg transition duration-150 flex items-center gap-1.5 ${
                link.highlight
                  ? 'bg-emerald-50 text-emerald-700 font-semibold hover:bg-emerald-100 border border-emerald-200'
                  : 'hover:text-brand-blue hover:bg-slate-50'
              }`}
            >
              {link.highlight && <Sparkles className="w-3.5 h-3.5 text-emerald-600 animate-pulse" />}
              {link.label}
            </a>
          ))}
        </nav>

        {/* Mobile Hamburger Button */}
        <div className="flex lg:hidden items-center gap-2">
          <button
            onClick={() => setIsOpen(!isOpen)}
            className="p-2 rounded-lg text-slate-600 hover:text-slate-900 hover:bg-slate-100 transition"
            aria-label="Toggle Menu"
          >
            {isOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>
      </div>

      {/* Mobile Drawer Menu */}
      {isOpen && (
        <div className="lg:hidden border-t border-slate-100 bg-white px-4 pt-3 pb-6 space-y-1 shadow-lg animate-fadeIn">
          {navLinks.map((link) => (
            <a
              key={link.href}
              href={link.href}
              onClick={() => setIsOpen(false)}
              className={`block px-3 py-2 rounded-md text-sm font-medium ${
                link.highlight
                  ? 'bg-emerald-50 text-emerald-700 font-semibold'
                  : 'text-slate-700 hover:bg-slate-50 hover:text-brand-blue'
              }`}
            >
              {link.label}
            </a>
          ))}
        </div>
      )}
    </header>
  );
}

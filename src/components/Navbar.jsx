import React, { useState } from 'react';
import { Link, NavLink, useLocation } from 'react-router-dom';
import { Menu, X, Globe, Shield, Sparkles } from 'lucide-react';

export default function Navbar({ lang, setLang, t }) {
  const [isOpen, setIsOpen] = useState(false);
  const location = useLocation();

  const navLinks = [
    { to: '/', label: t.nav.home },
    { to: '/about', label: t.nav.about },
    { to: '/partners', label: t.nav.partners },
    { to: '/activities', label: t.nav.workPackages },
    { to: '/virtual-lab', label: t.nav.virtualLab, highlight: true },
    { to: '/news', label: t.nav.news },
    { to: '/tenders', label: t.nav.tenders },
    { to: '/contact', label: t.nav.contact },
  ];

  return (
    <header className="sticky top-0 z-50 bg-white/95 backdrop-blur-md shadow-xs border-b border-slate-200">
      {/* Top EU Co-funded Bar */}
      <div className="bg-slate-900 text-slate-100 text-xs py-2 px-4 sm:px-8 border-b border-slate-800">
        <div className="max-w-7xl mx-auto flex flex-wrap items-center justify-between gap-2">
          <div className="flex items-center gap-2.5">
            <div className="w-7 h-4.5 bg-[#003399] rounded-xs flex items-center justify-center relative overflow-hidden shadow-xs">
              <span className="text-[11px] text-yellow-300 font-bold leading-none">★</span>
            </div>
            <span className="font-medium text-[11px] sm:text-xs">
              <strong className="text-yellow-400 font-bold">{t.eu.cofunded}</strong> {t.eu.euName}
            </span>
            <span className="hidden md:inline text-slate-500">|</span>
            <span className="hidden md:inline text-slate-300 font-mono text-[11px]">
              {t.eu.grantRef}
            </span>
          </div>

          <div className="flex items-center gap-3">
            <button
              onClick={() => setLang(lang === 'en' ? 'uz' : 'en')}
              className="flex items-center gap-1.5 px-2.5 py-1 rounded bg-slate-800 hover:bg-slate-700 text-slate-200 transition font-medium text-xs"
              title="Tilni o'zgartirish"
            >
              <Globe className="w-3.5 h-3.5 text-sky-400" />
              <span>{lang === 'en' ? "O'zbekcha" : "English"}</span>
            </button>

            <Link
              to="/admin"
              className={`flex items-center gap-1.5 px-2.5 py-1 rounded font-semibold text-xs transition ${
                location.pathname.startsWith('/admin')
                  ? 'bg-brand-blue text-white'
                  : 'bg-slate-800 hover:bg-slate-700 text-sky-300'
              }`}
            >
              <Shield className="w-3.5 h-3.5" />
              <span>{t.nav.admin}</span>
            </Link>
          </div>
        </div>
      </div>

      {/* Main Header with LARGE LOGO */}
      <div className="max-w-7xl mx-auto px-4 sm:px-8 py-3 flex items-center justify-between">
        {/* Large Logo */}
        <Link to="/" className="flex items-center gap-3.5 group">
          <img
            src="/logo.jpg"
            alt="WASTE-UZ Official Logo"
            className="h-14 sm:h-16 md:h-18 w-auto object-contain rounded-lg p-0.5 border border-slate-100 shadow-xs group-hover:scale-102 transition duration-200"
          />
          <div className="flex flex-col">
            <div className="flex items-center gap-2">
              <span className="font-black text-2xl sm:text-3xl tracking-tight text-slate-900 group-hover:text-brand-blue transition">
                WASTE<span className="text-brand-green">UZ</span>
              </span>
              <span className="text-[10px] sm:text-[11px] font-bold uppercase tracking-wider px-2 py-0.5 bg-sky-100 text-brand-blue-dark rounded-full">
                101322962
              </span>
            </div>
            <span className="text-xs text-slate-500 font-medium hidden sm:block max-w-sm truncate">
              Waste Awareness Skills Training & Education — Uzbekistan
            </span>
          </div>
        </Link>

        {/* Desktop Navigation Links */}
        <nav className="hidden lg:flex items-center gap-1 xl:gap-2 text-[14px] font-semibold text-slate-700">
          {navLinks.map((link) => (
            <NavLink
              key={link.to}
              to={link.to}
              className={({ isActive }) =>
                `px-3 py-2 rounded-xl transition flex items-center gap-1.5 ${
                  isActive
                    ? 'bg-brand-blue text-white shadow-xs'
                    : link.highlight
                    ? 'bg-emerald-50 text-emerald-800 hover:bg-emerald-100 border border-emerald-200'
                    : 'hover:text-brand-blue hover:bg-slate-100/80'
                }`
              }
            >
              {link.highlight && <Sparkles className="w-3.5 h-3.5 text-emerald-600 animate-pulse" />}
              <span>{link.label}</span>
            </NavLink>
          ))}
        </nav>

        {/* Mobile Hamburger Button */}
        <div className="flex lg:hidden items-center gap-2">
          <button
            onClick={() => setIsOpen(!isOpen)}
            className="p-2.5 rounded-xl text-slate-700 hover:bg-slate-100 transition"
            aria-label="Toggle menu"
          >
            {isOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>
      </div>

      {/* Mobile Drawer Menu */}
      {isOpen && (
        <div className="lg:hidden border-t border-slate-200 bg-white px-4 pt-3 pb-6 space-y-1.5 shadow-xl animate-fadeIn">
          {navLinks.map((link) => (
            <NavLink
              key={link.to}
              to={link.to}
              onClick={() => setIsOpen(false)}
              className={({ isActive }) =>
                `block px-3.5 py-2.5 rounded-xl text-sm font-semibold transition ${
                  isActive
                    ? 'bg-brand-blue text-white'
                    : link.highlight
                    ? 'bg-emerald-50 text-emerald-800 font-bold'
                    : 'text-slate-800 hover:bg-slate-100'
                }`
              }
            >
              {link.label}
            </NavLink>
          ))}
        </div>
      )}
    </header>
  );
}

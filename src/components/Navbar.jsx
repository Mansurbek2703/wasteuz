import React, { useState, useRef, useEffect } from 'react';
import { Link, NavLink, useLocation } from 'react-router-dom';
import { Menu, X, Globe, ChevronDown, LogIn, Sparkles } from 'lucide-react';

export default function Navbar({ lang, setLang, t }) {
  const [isOpen, setIsOpen] = useState(false);
  const [aboutDropdownOpen, setAboutDropdownOpen] = useState(false);
  const location = useLocation();
  const dropdownRef = useRef(null);

  // Close dropdown on outside click
  useEffect(() => {
    function handleClickOutside(event) {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setAboutDropdownOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  // Close menu & dropdown on route change
  useEffect(() => {
    setAboutDropdownOpen(false);
    setIsOpen(false);
  }, [location.pathname]);

  const isAboutActive = location.pathname.startsWith('/about');

  return (
    <header className="sticky top-0 z-50 bg-white shadow-xs border-b border-slate-200">
      <div className="max-w-[1480px] mx-auto px-3 sm:px-6 lg:px-8 py-2.5 sm:py-3 flex items-center justify-between gap-2 sm:gap-4">
        
        {/* LEFT: Large Official Logo + EU Flag Emblem */}
        <div className="flex items-center gap-2 sm:gap-4 flex-shrink-0">
          {/* Prominent Logo */}
          <Link to="/" className="flex items-center group py-0.5">
            <img
              src="/logo.jpg"
              alt="WASTE-UZ Official Logo"
              className="h-12 sm:h-14 lg:h-16 w-auto object-contain transition duration-200 group-hover:scale-102"
            />
          </Link>

          {/* EU Co-funded Flag Emblem - visible on tablet & desktop */}
          <div className="hidden sm:flex items-center gap-2.5 pl-3 border-l border-slate-200 py-1">
            <img
              src="/eu-flag.svg"
              alt="Flag of the European Union"
              className="w-9 h-6 sm:w-10 sm:h-6.5 object-cover rounded-[2px] shadow-2xs flex-shrink-0 border border-blue-950"
            />
            <div className="flex flex-col text-[10px] sm:text-[11px] font-semibold text-[#003399] leading-[1.15] tracking-tight whitespace-nowrap select-none">
              <span>Co-funded by the</span>
              <span className="font-bold">Erasmus+ Programme</span>
              <span>of the European Union</span>
            </div>
          </div>
        </div>

        {/* DESKTOP NAVIGATION MENU (Single clean horizontal row with whitespace-nowrap) */}
        <nav className="hidden lg:flex items-center gap-1 xl:gap-1.5 2xl:gap-2 text-[13px] xl:text-[14px] font-medium text-slate-700 whitespace-nowrap">
          {/* Home as Green Pill */}
          <NavLink
            to="/"
            end
            className={({ isActive }) =>
              `px-4 xl:px-5 py-2 rounded-full font-semibold transition text-xs xl:text-sm whitespace-nowrap flex items-center ${
                isActive
                  ? 'bg-[#1b6b37] text-white shadow-xs'
                  : 'text-slate-700 hover:text-[#1b6b37] hover:bg-slate-50'
              }`
            }
          >
            {t.nav.home}
          </NavLink>

          {/* About Dropdown */}
          <div className="relative" ref={dropdownRef}>
            <button
              onClick={() => setAboutDropdownOpen(!aboutDropdownOpen)}
              onMouseEnter={() => setAboutDropdownOpen(true)}
              className={`px-3 xl:px-3.5 py-2 rounded-full transition flex items-center gap-1 text-xs xl:text-sm whitespace-nowrap ${
                isAboutActive
                  ? 'text-[#1b6b37] font-bold bg-emerald-50/70'
                  : 'text-slate-700 hover:text-[#1b6b37] hover:bg-slate-50'
              }`}
            >
              <span className="whitespace-nowrap">{t.nav.about}</span>
              <ChevronDown className={`w-3.5 h-3.5 transition-transform duration-200 flex-shrink-0 ${aboutDropdownOpen ? 'rotate-180 text-[#1b6b37]' : 'text-slate-400'}`} />
            </button>

            {aboutDropdownOpen && (
              <div 
                onMouseLeave={() => setAboutDropdownOpen(false)}
                className="absolute left-0 top-full mt-1 w-52 bg-white rounded-2xl shadow-xl border border-slate-100 py-2 z-50 animate-fadeIn"
              >
                <Link
                  to="/about"
                  className="block px-4 py-2 text-xs sm:text-sm text-slate-700 hover:bg-slate-50 hover:text-[#1b6b37] font-medium whitespace-nowrap"
                >
                  {t.nav.aboutProject}
                </Link>
                <Link
                  to="/about#objectives"
                  className="block px-4 py-2 text-xs sm:text-sm text-slate-700 hover:bg-slate-50 hover:text-[#1b6b37] font-medium whitespace-nowrap"
                >
                  {t.nav.objectives}
                </Link>
                <Link
                  to="/about#passport"
                  className="block px-4 py-2 text-xs sm:text-sm text-slate-700 hover:bg-slate-50 hover:text-[#1b6b37] font-medium whitespace-nowrap"
                >
                  {t.nav.passport}
                </Link>
              </div>
            )}
          </div>

          {/* Activities */}
          <NavLink
            to="/activities"
            className={({ isActive }) =>
              `px-3 xl:px-3.5 py-2 rounded-full transition text-xs xl:text-sm whitespace-nowrap ${
                isActive
                  ? 'text-[#1b6b37] font-bold bg-emerald-50/70'
                  : 'text-slate-700 hover:text-[#1b6b37] hover:bg-slate-50'
              }`
            }
          >
            {t.nav.workPackages}
          </NavLink>

          {/* News */}
          <NavLink
            to="/news"
            className={({ isActive }) =>
              `px-3 xl:px-3.5 py-2 rounded-full transition text-xs xl:text-sm whitespace-nowrap ${
                isActive
                  ? 'text-[#1b6b37] font-bold bg-emerald-50/70'
                  : 'text-slate-700 hover:text-[#1b6b37] hover:bg-slate-50'
              }`
            }
          >
            {t.nav.news}
          </NavLink>

          {/* Events */}
          <NavLink
            to="/events"
            className={({ isActive }) =>
              `px-3 xl:px-3.5 py-2 rounded-full transition text-xs xl:text-sm whitespace-nowrap ${
                isActive
                  ? 'text-[#1b6b37] font-bold bg-emerald-50/70'
                  : 'text-slate-700 hover:text-[#1b6b37] hover:bg-slate-50'
              }`
            }
          >
            {t.nav.events}
          </NavLink>

          {/* Tenders */}
          <NavLink
            to="/tenders"
            className={({ isActive }) =>
              `px-3 xl:px-3.5 py-2 rounded-full transition text-xs xl:text-sm whitespace-nowrap ${
                isActive
                  ? 'text-[#1b6b37] font-bold bg-emerald-50/70'
                  : 'text-slate-700 hover:text-[#1b6b37] hover:bg-slate-50'
              }`
            }
          >
            {t.nav.tenders}
          </NavLink>

          {/* Partners */}
          <NavLink
            to="/partners"
            className={({ isActive }) =>
              `px-3 xl:px-3.5 py-2 rounded-full transition text-xs xl:text-sm whitespace-nowrap ${
                isActive
                  ? 'text-[#1b6b37] font-bold bg-emerald-50/70'
                  : 'text-slate-700 hover:text-[#1b6b37] hover:bg-slate-50'
              }`
            }
          >
            {t.nav.partners}
          </NavLink>

          {/* Virtual Lab */}
          <NavLink
            to="/virtual-lab"
            className={({ isActive }) =>
              `px-3.5 py-2 rounded-full transition text-xs xl:text-sm whitespace-nowrap flex items-center gap-1.5 ${
                isActive
                  ? 'bg-emerald-600 text-white font-bold shadow-xs'
                  : 'text-emerald-700 font-semibold hover:bg-emerald-50'
              }`
            }
          >
            <Sparkles className="w-3.5 h-3.5 flex-shrink-0" />
            <span>{t.nav.virtualLab}</span>
          </NavLink>

          {/* Contact */}
          <NavLink
            to="/contact"
            className={({ isActive }) =>
              `px-3 xl:px-3.5 py-2 rounded-full transition text-xs xl:text-sm whitespace-nowrap ${
                isActive
                  ? 'text-[#1b6b37] font-bold bg-emerald-50/70'
                  : 'text-slate-700 hover:text-[#1b6b37] hover:bg-slate-50'
              }`
            }
          >
            {t.nav.contact}
          </NavLink>
        </nav>

        {/* RIGHT CONTROLS: Language & Login & Mobile Hamburger */}
        <div className="flex items-center gap-2 sm:gap-2.5 flex-shrink-0">
          {/* Language Switcher */}
          <button
            onClick={() => setLang(lang === 'en' ? 'uz' : 'en')}
            className="flex items-center gap-1 px-2.5 sm:px-3 py-1.5 rounded-full border border-slate-200 hover:border-slate-300 text-slate-700 transition font-bold text-xs"
            title="Switch Language"
          >
            <Globe className="w-3.5 h-3.5 text-slate-500" />
            <span>{lang === 'en' ? "UZ" : "EN"}</span>
          </button>

          {/* Login Button (Hidden on very small screens, placed inside mobile drawer) */}
          <Link
            to="/login"
            className="hidden sm:flex items-center gap-1.5 px-3.5 py-1.5 rounded-full border border-slate-200 hover:border-[#1b6b37] hover:text-[#1b6b37] text-slate-700 transition font-semibold text-xs bg-slate-50/80 shadow-2xs whitespace-nowrap"
            title="Consortium Login"
          >
            <LogIn className="w-3.5 h-3.5 text-slate-500" />
            <span>{t.nav.login}</span>
          </Link>

          {/* MOBILE HAMBURGER BUTTON (Clearly visible on mobile & tablet) */}
          <button
            onClick={() => setIsOpen(!isOpen)}
            className="lg:hidden p-2 rounded-xl text-slate-700 bg-slate-100 hover:bg-slate-200 active:bg-slate-300 transition"
            aria-label="Toggle menu"
          >
            {isOpen ? <X className="w-6 h-6 text-slate-900" /> : <Menu className="w-6 h-6 text-slate-900" />}
          </button>
        </div>
      </div>

      {/* MOBILE DRAWER (Full navigation links when menu is opened) */}
      {isOpen && (
        <div className="lg:hidden border-t border-slate-200 bg-white px-5 pt-4 pb-8 space-y-2 shadow-2xl animate-fadeIn">
          {/* Mobile EU Badge */}
          <div className="flex items-center gap-2.5 p-3 rounded-xl bg-slate-50 border border-slate-200 mb-3">
            <img
              src="/eu-flag.svg"
              alt="Flag of the European Union"
              className="w-8 h-5.5 object-cover rounded-[2px] shadow-2xs border border-blue-950 flex-shrink-0"
            />
            <div className="text-[11px] font-semibold text-[#003399] leading-tight">
              Co-funded by the Erasmus+ Programme of the European Union
            </div>
          </div>

          <NavLink
            to="/"
            end
            onClick={() => setIsOpen(false)}
            className={({ isActive }) =>
              `block px-4 py-2.5 rounded-xl text-sm font-semibold transition ${
                isActive ? 'bg-[#1b6b37] text-white' : 'text-slate-700 hover:bg-slate-50'
              }`
            }
          >
            {t.nav.home}
          </NavLink>

          <NavLink
            to="/about"
            onClick={() => setIsOpen(false)}
            className={({ isActive }) =>
              `block px-4 py-2.5 rounded-xl text-sm font-semibold transition ${
                isActive ? 'bg-[#1b6b37] text-white' : 'text-slate-700 hover:bg-slate-50'
              }`
            }
          >
            {t.nav.about}
          </NavLink>

          <NavLink
            to="/activities"
            onClick={() => setIsOpen(false)}
            className={({ isActive }) =>
              `block px-4 py-2.5 rounded-xl text-sm font-semibold transition ${
                isActive ? 'bg-[#1b6b37] text-white' : 'text-slate-700 hover:bg-slate-50'
              }`
            }
          >
            {t.nav.workPackages}
          </NavLink>

          <NavLink
            to="/news"
            onClick={() => setIsOpen(false)}
            className={({ isActive }) =>
              `block px-4 py-2.5 rounded-xl text-sm font-semibold transition ${
                isActive ? 'bg-[#1b6b37] text-white' : 'text-slate-700 hover:bg-slate-50'
              }`
            }
          >
            {t.nav.news}
          </NavLink>

          <NavLink
            to="/events"
            onClick={() => setIsOpen(false)}
            className={({ isActive }) =>
              `block px-4 py-2.5 rounded-xl text-sm font-semibold transition ${
                isActive ? 'bg-[#1b6b37] text-white' : 'text-slate-700 hover:bg-slate-50'
              }`
            }
          >
            {t.nav.events}
          </NavLink>

          <NavLink
            to="/tenders"
            onClick={() => setIsOpen(false)}
            className={({ isActive }) =>
              `block px-4 py-2.5 rounded-xl text-sm font-semibold transition ${
                isActive ? 'bg-[#1b6b37] text-white' : 'text-slate-700 hover:bg-slate-50'
              }`
            }
          >
            {t.nav.tenders}
          </NavLink>

          <NavLink
            to="/partners"
            onClick={() => setIsOpen(false)}
            className={({ isActive }) =>
              `block px-4 py-2.5 rounded-xl text-sm font-semibold transition ${
                isActive ? 'bg-[#1b6b37] text-white' : 'text-slate-700 hover:bg-slate-50'
              }`
            }
          >
            {t.nav.partners}
          </NavLink>

          <NavLink
            to="/virtual-lab"
            onClick={() => setIsOpen(false)}
            className={({ isActive }) =>
              `block px-4 py-2.5 rounded-xl text-sm font-semibold transition ${
                isActive ? 'bg-emerald-600 text-white' : 'text-emerald-700 font-bold hover:bg-emerald-50'
              }`
            }
          >
            {t.nav.virtualLab}
          </NavLink>

          <NavLink
            to="/contact"
            onClick={() => setIsOpen(false)}
            className={({ isActive }) =>
              `block px-4 py-2.5 rounded-xl text-sm font-semibold transition ${
                isActive ? 'bg-[#1b6b37] text-white' : 'text-slate-700 hover:bg-slate-50'
              }`
            }
          >
            {t.nav.contact}
          </NavLink>

          <div className="pt-3 border-t border-slate-100 flex items-center justify-between">
            <Link
              to="/login"
              onClick={() => setIsOpen(false)}
              className="flex items-center gap-1.5 px-4 py-2.5 rounded-xl bg-slate-900 text-white text-xs font-bold"
            >
              <LogIn className="w-4 h-4" />
              <span>{t.nav.login}</span>
            </Link>

            <button
              onClick={() => {
                setLang(lang === 'en' ? 'uz' : 'en');
                setIsOpen(false);
              }}
              className="text-xs font-bold text-slate-700 hover:text-brand-blue"
            >
              Language: {lang === 'en' ? "English" : "O'zbekcha"}
            </button>
          </div>
        </div>
      )}
    </header>
  );
}

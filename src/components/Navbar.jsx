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
    <header className="sticky top-0 z-50 bg-white shadow-md border-b-2 border-slate-200">
      <div className="max-w-[1560px] mx-auto px-4 sm:px-6 lg:px-8 h-20 flex items-center justify-between gap-4">
        
        {/* LEFT: EU Flag Emblem FIRST + Divider + Prominent WASTE-UZ Logo */}
        <div className="flex items-center gap-3 sm:gap-4 flex-shrink-0">
          {/* EU Co-funded Flag Emblem - positioned first on the left */}
          <div className="flex items-center gap-2.5 py-1">
            <img
              src="/eu-flag.svg"
              alt="Flag of the European Union"
              className="w-10 h-6.5 sm:w-11 sm:h-7.5 object-cover rounded-[2px] shadow-xs flex-shrink-0 border border-blue-950"
            />
            <div className="flex flex-col text-[10px] sm:text-[11.5px] font-bold text-[#003399] leading-[1.15] tracking-tight whitespace-nowrap select-none">
              <span>Co-funded by the</span>
              <span className="font-extrabold text-[#002266]">Erasmus+ Programme</span>
              <span>of the European Union</span>
            </div>
          </div>

          {/* Vertical Divider */}
          <div className="h-10 w-[1.5px] bg-slate-300 mx-0.5 sm:mx-1 flex-shrink-0" />

          {/* Prominent WASTE-UZ Official Logo */}
          <Link to="/" className="flex items-center group py-0.5">
            <img
              src="/logo.jpg"
              alt="WASTE-UZ Official Logo"
              className="h-12 sm:h-14 lg:h-16 w-auto object-contain transition duration-200 group-hover:scale-102"
            />
          </Link>
        </div>

        {/* FULL-HEIGHT RECTANGULAR NAVIGATION TABS */}
        <nav className="hidden lg:flex items-stretch h-full text-[14px] xl:text-[15px] font-bold whitespace-nowrap">
          {/* Home Tab */}
          <NavLink
            to="/"
            end
            className={({ isActive }) =>
              `h-full flex items-center px-4 xl:px-5 transition-all select-none border-b-4 ${
                isActive
                  ? 'bg-[#1b6b37] text-white border-b-emerald-400 font-extrabold shadow-inner'
                  : 'text-slate-800 hover:text-[#1b6b37] hover:bg-slate-50 border-b-transparent'
              }`
            }
          >
            {t.nav.home}
          </NavLink>

          {/* About Dropdown Tab */}
          <div className="relative h-full flex items-stretch" ref={dropdownRef}>
            <button
              onClick={() => setAboutDropdownOpen(!aboutDropdownOpen)}
              onMouseEnter={() => setAboutDropdownOpen(true)}
              className={`h-full flex items-center gap-1 px-3.5 xl:px-4.5 transition-all select-none border-b-4 ${
                isAboutActive
                  ? 'bg-[#1b6b37] text-white border-b-emerald-400 font-extrabold shadow-inner'
                  : 'text-slate-800 hover:text-[#1b6b37] hover:bg-slate-50 border-b-transparent'
              }`}
            >
              <span>{t.nav.about}</span>
              <ChevronDown className={`w-4 h-4 transition-transform duration-200 ${aboutDropdownOpen ? 'rotate-180' : ''}`} />
            </button>

            {aboutDropdownOpen && (
              <div
                onMouseLeave={() => setAboutDropdownOpen(false)}
                className="absolute left-0 top-full w-56 bg-white rounded-b-2xl shadow-2xl border-2 border-slate-200 py-2 z-50 animate-fadeIn"
              >
                <Link
                  to="/about"
                  className="block px-5 py-2.5 text-sm text-slate-800 hover:bg-emerald-50 hover:text-[#1b6b37] font-bold whitespace-nowrap"
                >
                  {t.nav.aboutProject}
                </Link>
                <Link
                  to="/about#objectives"
                  className="block px-5 py-2.5 text-sm text-slate-800 hover:bg-emerald-50 hover:text-[#1b6b37] font-bold whitespace-nowrap"
                >
                  {t.nav.objectives}
                </Link>
                <Link
                  to="/about#passport"
                  className="block px-5 py-2.5 text-sm text-slate-800 hover:bg-emerald-50 hover:text-[#1b6b37] font-bold whitespace-nowrap"
                >
                  {t.nav.passport}
                </Link>
              </div>
            )}
          </div>

          {/* Activities Tab */}
          <NavLink
            to="/activities"
            className={({ isActive }) =>
              `h-full flex items-center px-4 xl:px-5 transition-all select-none border-b-4 ${
                isActive
                  ? 'bg-[#1b6b37] text-white border-b-emerald-400 font-extrabold shadow-inner'
                  : 'text-slate-800 hover:text-[#1b6b37] hover:bg-slate-50 border-b-transparent'
              }`
            }
          >
            {t.nav.workPackages}
          </NavLink>

          {/* News Tab */}
          <NavLink
            to="/news"
            className={({ isActive }) =>
              `h-full flex items-center px-4 xl:px-5 transition-all select-none border-b-4 ${
                isActive
                  ? 'bg-[#1b6b37] text-white border-b-emerald-400 font-extrabold shadow-inner'
                  : 'text-slate-800 hover:text-[#1b6b37] hover:bg-slate-50 border-b-transparent'
              }`
            }
          >
            {t.nav.news}
          </NavLink>

          {/* Events Tab */}
          <NavLink
            to="/events"
            className={({ isActive }) =>
              `h-full flex items-center px-4 xl:px-5 transition-all select-none border-b-4 ${
                isActive
                  ? 'bg-[#1b6b37] text-white border-b-emerald-400 font-extrabold shadow-inner'
                  : 'text-slate-800 hover:text-[#1b6b37] hover:bg-slate-50 border-b-transparent'
              }`
            }
          >
            {t.nav.events}
          </NavLink>

          {/* Tenders Tab */}
          <NavLink
            to="/tenders"
            className={({ isActive }) =>
              `h-full flex items-center px-4 xl:px-5 transition-all select-none border-b-4 ${
                isActive
                  ? 'bg-[#1b6b37] text-white border-b-emerald-400 font-extrabold shadow-inner'
                  : 'text-slate-800 hover:text-[#1b6b37] hover:bg-slate-50 border-b-transparent'
              }`
            }
          >
            {t.nav.tenders}
          </NavLink>

          {/* Partners Tab */}
          <NavLink
            to="/partners"
            className={({ isActive }) =>
              `h-full flex items-center px-4 xl:px-5 transition-all select-none border-b-4 ${
                isActive
                  ? 'bg-[#1b6b37] text-white border-b-emerald-400 font-extrabold shadow-inner'
                  : 'text-slate-800 hover:text-[#1b6b37] hover:bg-slate-50 border-b-transparent'
              }`
            }
          >
            {t.nav.partners}
          </NavLink>

          {/* Virtual Lab Tab */}
          <NavLink
            to="/virtual-lab"
            className={({ isActive }) =>
              `h-full flex items-center gap-1.5 px-4 xl:px-5 transition-all select-none border-b-4 ${
                isActive
                  ? 'bg-[#1b6b37] text-white border-b-emerald-400 font-extrabold shadow-inner'
                  : 'text-emerald-700 hover:text-[#1b6b37] hover:bg-emerald-50/60 border-b-transparent'
              }`
            }
          >
            <Sparkles className="w-4 h-4 flex-shrink-0" />
            <span>{t.nav.virtualLab}</span>
          </NavLink>

          {/* Contact Tab */}
          <NavLink
            to="/contact"
            className={({ isActive }) =>
              `h-full flex items-center px-4 xl:px-5 transition-all select-none border-b-4 ${
                isActive
                  ? 'bg-[#1b6b37] text-white border-b-emerald-400 font-extrabold shadow-inner'
                  : 'text-slate-800 hover:text-[#1b6b37] hover:bg-slate-50 border-b-transparent'
              }`
            }
          >
            {t.nav.contact}
          </NavLink>
        </nav>

        {/* RIGHT CONTROLS: Language & Login */}
        <div className="flex items-center gap-2.5 sm:gap-3 flex-shrink-0">
          {/* Language Switcher */}
          <button
            onClick={() => setLang(lang === 'en' ? 'uz' : 'en')}
            className="flex items-center gap-1.5 px-3.5 py-2 rounded-xl border-2 border-slate-300 hover:border-[#1b6b37] text-slate-800 font-bold text-xs sm:text-sm bg-white transition hover:bg-slate-50 shadow-xs"
            title="Switch language (EN / UZ)"
          >
            <Globe className="w-4 h-4 text-[#1b6b37]" />
            <span>{lang === 'en' ? 'EN' : 'UZ'}</span>
          </button>

          {/* Login Button */}
          <Link
            to="/login"
            className="hidden sm:flex items-center gap-1.5 px-4.5 py-2 rounded-xl bg-slate-900 hover:bg-[#1b6b37] text-white font-bold text-xs sm:text-sm transition shadow-sm whitespace-nowrap"
            title="Consortium Login"
          >
            <LogIn className="w-4 h-4" />
            <span>{t.nav.login}</span>
          </Link>

          {/* Mobile Hamburger Button */}
          <button
            onClick={() => setIsOpen(!isOpen)}
            className="lg:hidden p-2.5 rounded-xl text-slate-800 bg-slate-100 hover:bg-slate-200 transition border border-slate-300"
            aria-label="Toggle menu"
          >
            {isOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>
      </div>

      {/* MOBILE DRAWER */}
      {isOpen && (
        <div className="lg:hidden border-t-2 border-slate-200 bg-white px-5 pt-4 pb-8 space-y-2 shadow-2xl animate-fadeIn">
          {/* Mobile EU Badge */}
          <div className="flex items-center gap-2.5 p-3 rounded-xl bg-slate-50 border border-slate-200 mb-3">
            <img
              src="/eu-flag.svg"
              alt="Flag of the European Union"
              className="w-8 h-5.5 object-cover rounded-[2px] shadow-2xs border border-blue-950 flex-shrink-0"
            />
            <div className="text-[11px] font-bold text-[#003399] leading-tight">
              Co-funded by the Erasmus+ Programme of the European Union
            </div>
          </div>

          <NavLink
            to="/"
            end
            onClick={() => setIsOpen(false)}
            className={({ isActive }) =>
              `block px-4 py-3 rounded-xl text-sm font-bold transition ${
                isActive ? 'bg-[#1b6b37] text-white' : 'text-slate-800 hover:bg-slate-100'
              }`
            }
          >
            {t.nav.home}
          </NavLink>

          <NavLink
            to="/about"
            onClick={() => setIsOpen(false)}
            className={({ isActive }) =>
              `block px-4 py-3 rounded-xl text-sm font-bold transition ${
                isActive ? 'bg-[#1b6b37] text-white' : 'text-slate-800 hover:bg-slate-100'
              }`
            }
          >
            {t.nav.about}
          </NavLink>

          <NavLink
            to="/activities"
            onClick={() => setIsOpen(false)}
            className={({ isActive }) =>
              `block px-4 py-3 rounded-xl text-sm font-bold transition ${
                isActive ? 'bg-[#1b6b37] text-white' : 'text-slate-800 hover:bg-slate-100'
              }`
            }
          >
            {t.nav.workPackages}
          </NavLink>

          <NavLink
            to="/news"
            onClick={() => setIsOpen(false)}
            className={({ isActive }) =>
              `block px-4 py-3 rounded-xl text-sm font-bold transition ${
                isActive ? 'bg-[#1b6b37] text-white' : 'text-slate-800 hover:bg-slate-100'
              }`
            }
          >
            {t.nav.news}
          </NavLink>

          <NavLink
            to="/events"
            onClick={() => setIsOpen(false)}
            className={({ isActive }) =>
              `block px-4 py-3 rounded-xl text-sm font-bold transition ${
                isActive ? 'bg-[#1b6b37] text-white' : 'text-slate-800 hover:bg-slate-100'
              }`
            }
          >
            {t.nav.events}
          </NavLink>

          <NavLink
            to="/tenders"
            onClick={() => setIsOpen(false)}
            className={({ isActive }) =>
              `block px-4 py-3 rounded-xl text-sm font-bold transition ${
                isActive ? 'bg-[#1b6b37] text-white' : 'text-slate-800 hover:bg-slate-100'
              }`
            }
          >
            {t.nav.tenders}
          </NavLink>

          <NavLink
            to="/partners"
            onClick={() => setIsOpen(false)}
            className={({ isActive }) =>
              `block px-4 py-3 rounded-xl text-sm font-bold transition ${
                isActive ? 'bg-[#1b6b37] text-white' : 'text-slate-800 hover:bg-slate-100'
              }`
            }
          >
            {t.nav.partners}
          </NavLink>

          <NavLink
            to="/virtual-lab"
            onClick={() => setIsOpen(false)}
            className={({ isActive }) =>
              `block px-4 py-3 rounded-xl text-sm font-bold transition ${
                isActive ? 'bg-[#1b6b37] text-white' : 'text-emerald-700 font-bold hover:bg-emerald-50'
              }`
            }
          >
            {t.nav.virtualLab}
          </NavLink>

          <NavLink
            to="/contact"
            onClick={() => setIsOpen(false)}
            className={({ isActive }) =>
              `block px-4 py-3 rounded-xl text-sm font-bold transition ${
                isActive ? 'bg-[#1b6b37] text-white' : 'text-slate-800 hover:bg-slate-100'
              }`
            }
          >
            {t.nav.contact}
          </NavLink>

          <div className="pt-4 border-t border-slate-200 flex items-center justify-between">
            <Link
              to="/login"
              onClick={() => setIsOpen(false)}
              className="flex items-center gap-1.5 px-5 py-2.5 rounded-xl bg-slate-900 text-white text-xs font-bold"
            >
              <LogIn className="w-4 h-4" />
              <span>{t.nav.login}</span>
            </Link>

            <button
              onClick={() => {
                setLang(lang === 'en' ? 'uz' : 'en');
                setIsOpen(false);
              }}
              className="text-xs font-bold text-slate-800 hover:text-[#1b6b37] px-3 py-2 rounded-lg bg-slate-100"
            >
              Language: {lang === 'en' ? "English (EN)" : "O'zbekcha (UZ)"}
            </button>
          </div>
        </div>
      )}
    </header>
  );
}

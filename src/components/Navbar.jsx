import React, { useState, useRef, useEffect } from 'react';
import { Link, NavLink, useLocation } from 'react-router-dom';
import { Menu, X, Globe, ChevronDown, User, LogIn, Sparkles } from 'lucide-react';

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

  // Close dropdown on route change
  useEffect(() => {
    setAboutDropdownOpen(false);
    setIsOpen(false);
  }, [location.pathname]);

  const isAboutActive = location.pathname.startsWith('/about');

  return (
    <header className="sticky top-0 z-50 bg-white shadow-xs border-b border-slate-200">
      <div className="max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-8 py-3 flex items-center justify-between gap-4">
        
        {/* LEFT: Project Logo + Official EU Co-funded Flag Emblem (Exact greenengine style) */}
        <div className="flex items-center gap-3 sm:gap-5 flex-shrink-0">
          {/* Main Logo */}
          <Link to="/" className="flex items-center gap-2 group">
            <img
              src="/logo.jpg"
              alt="WASTE-UZ Official Logo"
              className="h-12 sm:h-14 md:h-16 w-auto object-contain transition duration-200 group-hover:scale-102"
            />
          </Link>

          {/* EU Co-funded by Erasmus+ Emblem (as shown in image) */}
          <div className="flex items-center gap-2.5 pl-3 border-l border-slate-200/90 py-1">
            {/* European Flag with 12 stars */}
            <div className="w-9 h-6 sm:w-10 sm:h-6.5 bg-[#003399] rounded-[2px] flex items-center justify-center relative overflow-hidden shadow-2xs flex-shrink-0">
              <svg viewBox="0 0 100 66" className="w-full h-full p-0.5">
                <circle cx="50" cy="12" r="3" fill="#FFCC00" />
                <circle cx="69" cy="17" r="3" fill="#FFCC00" />
                <circle cx="81" cy="33" r="3" fill="#FFCC00" />
                <circle cx="81" cy="50" r="3" fill="#FFCC00" />
                <circle cx="69" cy="61" r="3" fill="#FFCC00" />
                <circle cx="50" cy="65" r="3" fill="#FFCC00" />
                <circle cx="31" cy="61" r="3" fill="#FFCC00" />
                <circle cx="19" cy="50" r="3" fill="#FFCC00" />
                <circle cx="19" cy="33" r="3" fill="#FFCC00" />
                <circle cx="31" cy="17" r="3" fill="#FFCC00" />
              </svg>
            </div>

            {/* Official EU Typography */}
            <div className="flex flex-col text-[10px] sm:text-[11px] font-semibold text-[#003399] leading-[1.15] tracking-tight select-none">
              <span>Co-funded by the</span>
              <span className="font-bold">Erasmus+ Programme</span>
              <span>of the European Union</span>
            </div>
          </div>
        </div>

        {/* CENTER / RIGHT: Navigation Items (exact greenengine style) */}
        <nav className="hidden xl:flex items-center gap-1.5 lg:gap-2 text-[14px] font-medium text-slate-700">
          {/* Home as Green Pill */}
          <NavLink
            to="/"
            end
            className={({ isActive }) =>
              `px-5 py-2 rounded-full font-semibold transition text-sm flex items-center ${
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
              className={`px-3.5 py-2 rounded-full transition flex items-center gap-1.5 font-medium text-sm ${
                isAboutActive
                  ? 'text-[#1b6b37] font-bold bg-emerald-50/60'
                  : 'text-slate-700 hover:text-[#1b6b37] hover:bg-slate-50'
              }`}
            >
              <span>{t.nav.about}</span>
              <ChevronDown className={`w-3.5 h-3.5 transition-transform duration-200 ${aboutDropdownOpen ? 'rotate-180 text-[#1b6b37]' : 'text-slate-400'}`} />
            </button>

            {aboutDropdownOpen && (
              <div 
                onMouseLeave={() => setAboutDropdownOpen(false)}
                className="absolute left-0 top-full mt-1 w-56 bg-white rounded-2xl shadow-xl border border-slate-100 py-2 z-50 animate-fadeIn"
              >
                <Link
                  to="/about"
                  className="block px-4 py-2.5 text-xs sm:text-sm text-slate-700 hover:bg-slate-50 hover:text-[#1b6b37] font-medium"
                >
                  {t.nav.aboutProject}
                </Link>
                <Link
                  to="/about#objectives"
                  className="block px-4 py-2.5 text-xs sm:text-sm text-slate-700 hover:bg-slate-50 hover:text-[#1b6b37] font-medium"
                >
                  {t.nav.objectives}
                </Link>
                <Link
                  to="/about#passport"
                  className="block px-4 py-2.5 text-xs sm:text-sm text-slate-700 hover:bg-slate-50 hover:text-[#1b6b37] font-medium"
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
              `px-3.5 py-2 rounded-full transition text-sm ${
                isActive
                  ? 'text-[#1b6b37] font-bold bg-emerald-50/60'
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
              `px-3.5 py-2 rounded-full transition text-sm ${
                isActive
                  ? 'text-[#1b6b37] font-bold bg-emerald-50/60'
                  : 'text-slate-700 hover:text-[#1b6b37] hover:bg-slate-50'
              }`
            }
          >
            {t.nav.news}
          </NavLink>

          {/* Events */}
          <NavLink
            to="/news?cat=Events"
            className={({ isActive }) =>
              `px-3.5 py-2 rounded-full transition text-sm ${
                location.search.includes('Events')
                  ? 'text-[#1b6b37] font-bold bg-emerald-50/60'
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
              `px-3.5 py-2 rounded-full transition text-sm ${
                isActive
                  ? 'text-[#1b6b37] font-bold bg-emerald-50/60'
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
              `px-3.5 py-2 rounded-full transition text-sm ${
                isActive
                  ? 'text-[#1b6b37] font-bold bg-emerald-50/60'
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
              `px-3.5 py-2 rounded-full transition text-sm flex items-center gap-1.5 ${
                isActive
                  ? 'bg-emerald-600 text-white font-bold shadow-xs'
                  : 'text-emerald-700 font-semibold hover:bg-emerald-50'
              }`
            }
          >
            <Sparkles className="w-3.5 h-3.5" />
            <span>{t.nav.virtualLab}</span>
          </NavLink>

          {/* Contact */}
          <NavLink
            to="/contact"
            className={({ isActive }) =>
              `px-3.5 py-2 rounded-full transition text-sm ${
                isActive
                  ? 'text-[#1b6b37] font-bold bg-emerald-50/60'
                  : 'text-slate-700 hover:text-[#1b6b37] hover:bg-slate-50'
              }`
            }
          >
            {t.nav.contact}
          </NavLink>
        </nav>

        {/* RIGHT: Language Toggle + Login Button (NOT "Admin") */}
        <div className="flex items-center gap-2.5">
          {/* Language Switcher */}
          <button
            onClick={() => setLang(lang === 'en' ? 'uz' : 'en')}
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-full border border-slate-200 hover:border-slate-300 text-slate-700 transition font-semibold text-xs"
            title="Language"
          >
            <Globe className="w-3.5 h-3.5 text-slate-500" />
            <span>{lang === 'en' ? "UZ" : "EN"}</span>
          </button>

          {/* Clean Login Button */}
          <Link
            to="/login"
            className="flex items-center gap-1.5 px-4 py-2 rounded-full border border-slate-200 hover:border-[#1b6b37] hover:text-[#1b6b37] text-slate-700 transition font-semibold text-xs bg-slate-50/80 shadow-2xs"
            title="Consortium Login"
          >
            <LogIn className="w-3.5 h-3.5 text-slate-500" />
            <span>{t.nav.login}</span>
          </Link>

          {/* Mobile Hamburger */}
          <button
            onClick={() => setIsOpen(!isOpen)}
            className="xl:hidden p-2 rounded-xl text-slate-700 hover:bg-slate-100 transition"
            aria-label="Toggle menu"
          >
            {isOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>
      </div>

      {/* Mobile Drawer */}
      {isOpen && (
        <div className="xl:hidden border-t border-slate-200 bg-white px-5 pt-3 pb-6 space-y-1.5 shadow-xl animate-fadeIn">
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
              className="flex items-center gap-1.5 px-4 py-2 rounded-xl bg-slate-100 text-slate-800 text-xs font-bold"
            >
              <LogIn className="w-4 h-4" />
              <span>{t.nav.login}</span>
            </Link>

            <button
              onClick={() => {
                setLang(lang === 'en' ? 'uz' : 'en');
                setIsOpen(false);
              }}
              className="text-xs font-bold text-slate-600 hover:text-brand-blue"
            >
              Til: {lang === 'en' ? "O'zbekcha" : "English"}
            </button>
          </div>
        </div>
      )}
    </header>
  );
}

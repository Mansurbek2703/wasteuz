import React from 'react';
import { Link } from 'react-router-dom';
import { Cpu, Clock, Layers, ArrowLeft, ArrowRight, ShieldCheck, BookOpen, GraduationCap } from 'lucide-react';

export default function VirtualLabPage({ t, lang }) {
  return (
    <div className="py-16 sm:py-24 bg-slate-50 min-h-[80vh] flex items-center">
      <div className="max-w-4xl mx-auto px-4 sm:px-8 w-full">
        {/* Breadcrumb / Back Link */}
        <div className="mb-6">
          <Link
            to="/"
            className="inline-flex items-center gap-2 text-xs font-bold text-slate-600 hover:text-[#1b6b37] transition"
          >
            <ArrowLeft className="w-4 h-4" />
            <span>{lang === 'uz' ? "Bosh sahifaga qaytish" : "Back to Home"}</span>
          </Link>
        </div>

        {/* Main Under Development Container */}
        <div className="bg-white rounded-3xl p-8 sm:p-14 border-2 border-slate-200 border-t-4 border-t-[#1b6b37] shadow-xl text-center space-y-8">
          {/* Animated Status Icon */}
          <div className="w-20 h-20 rounded-3xl bg-emerald-50 text-[#1b6b37] flex items-center justify-center mx-auto border-2 border-emerald-200 shadow-sm">
            <Clock className="w-10 h-10 text-[#1b6b37] animate-pulse" />
          </div>

          {/* Badges */}
          <div className="flex flex-wrap items-center justify-center gap-2">
            <span className="px-3.5 py-1 rounded-full bg-[#1b6b37] text-white text-xs font-bold uppercase tracking-wider">
              {t.virtualLab.tag}
            </span>
            <span className="inline-flex items-center gap-1.5 px-3.5 py-1 rounded-full bg-amber-50 text-amber-900 border border-amber-300 text-xs font-bold">
              <span className="w-2 h-2 rounded-full bg-amber-500 animate-ping" />
              <span>{lang === 'uz' ? "Hozirda ishlab chiqish jarayonida" : "Currently Under Development"}</span>
            </span>
          </div>

          {/* Heading */}
          <div className="space-y-3 max-w-2xl mx-auto">
            <h1 className="text-3xl sm:text-4xl lg:text-5xl font-black text-slate-950 tracking-tight">
              {t.virtualLab.heading}
            </h1>
            <p className="text-base sm:text-lg text-slate-700 font-medium leading-relaxed">
              {lang === 'uz' 
                ? "Ushbu bo'lim hozirda loyiha doirasida ishlab chiqish jarayonida."
                : "This section is currently under active development."}
            </p>
          </div>

          {/* Official Explanation Card */}
          <div className="bg-slate-50 p-6 sm:p-8 rounded-2xl border-2 border-slate-200 text-left space-y-4 max-w-2xl mx-auto">
            <div className="flex items-center gap-2 text-[#1b6b37] font-bold text-xs uppercase tracking-wider">
              <ShieldCheck className="w-4 h-4" />
              <span>Erasmus+ CBHE Project 101322962 • WP4</span>
            </div>
            <p className="text-sm sm:text-base text-slate-800 leading-relaxed font-normal">
              {lang === 'uz'
                ? "Erasmus+ CBHE WASTE-UZ loyihasining 4-ish paketi («WP4: Green Labs & Innovation Hubs») doirasida konsorsium hamkor universitetlari tomonidan Virtual laboratoriya platformasi va aqlli chiqindi boshqaruvi tizimlari ishlab chiqilmoqda."
                : "Under Work Package 4 («WP4: Green Labs & Innovation Hubs») of Erasmus+ CBHE Project 101322962 (WASTE-UZ), the official Virtual Laboratory and smart waste management platform is actively being engineered by consortium partner universities."}
            </p>
            <p className="text-xs sm:text-sm text-slate-600 leading-relaxed pt-2 border-t border-slate-200">
              {lang === 'uz'
                ? "Dasturiy ta'minot va simulyatsiya tizimi to'liq sinovdan o'tkazilgach, O'zbekistondagi barcha hamkor oliy ta'lim muassasalari talabalari va o'qituvchilari uchun rasman foydalanishga topshiriladi."
                : "Once the simulation architecture and telemetry system complete official validation, the platform will be made available for students, researchers, and faculty across all partner HEIs in Uzbekistan."}
            </p>
          </div>

          {/* Action Links */}
          <div className="flex flex-wrap items-center justify-center gap-4 pt-2">
            <Link
              to="/activities"
              className="inline-flex items-center gap-2 px-7 py-3.5 rounded-full bg-[#1b6b37] hover:bg-[#14532b] text-white font-bold text-sm shadow-md transition transform hover:-translate-y-0.5 border-2 border-emerald-700"
            >
              <Layers className="w-4 h-4" />
              <span>{lang === 'uz' ? "Ish paketlari (WP4) bilan tanishish" : "View Work Packages (WP4)"}</span>
              <ArrowRight className="w-4 h-4" />
            </Link>

            <Link
              to="/contact"
              className="inline-flex items-center gap-2 px-7 py-3.5 rounded-full bg-white border-2 border-slate-300 text-slate-800 font-bold text-sm hover:border-[#1b6b37] hover:bg-slate-50 transition"
            >
              <span>{lang === 'uz' ? "Kotibiyat bilan bog'lanish" : "Contact Secretariat"}</span>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}

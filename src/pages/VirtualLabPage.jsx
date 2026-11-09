import React from 'react';
import { Link } from 'react-router-dom';
import { Clock, Layers, ArrowLeft, ArrowRight } from 'lucide-react';

export default function VirtualLabPage({ t, lang }) {
  return (
    <div className="py-12 sm:py-16 bg-slate-50">
      <div className="max-w-3xl mx-auto px-4 sm:px-6">
        {/* Compact, clean card with low height */}
        <div className="bg-white rounded-2xl p-6 sm:p-8 border-2 border-slate-200 border-t-4 border-t-[#1b6b37] shadow-sm space-y-5">
          <div className="flex flex-col sm:flex-row sm:items-center gap-4">
            <div className="w-13 h-13 rounded-2xl bg-emerald-50 text-[#1b6b37] flex items-center justify-center border-2 border-emerald-200 flex-shrink-0 p-3">
              <Clock className="w-7 h-7 text-[#1b6b37]" />
            </div>
            <div className="space-y-1">
              <div className="inline-flex items-center gap-1.5 px-3 py-0.5 rounded-full bg-amber-50 text-amber-900 border border-amber-300 text-xs font-bold">
                <span className="w-2 h-2 rounded-full bg-amber-500 animate-pulse" />
                <span>{lang === 'uz' ? "Hozirda ishlab chiqish jarayonida" : "Under Development"}</span>
              </div>
              <h1 className="text-2xl sm:text-3xl font-black text-slate-950 tracking-tight">
                {lang === 'uz' ? "Virtual Laboratoriya va Innovatsiya Markazi" : "Virtual Laboratory & Innovation Hub"}
              </h1>
            </div>
          </div>

          <div className="border-t border-slate-200 pt-4 space-y-2 text-slate-700 text-sm sm:text-base leading-relaxed">
            <p className="font-semibold text-slate-900">
              {lang === 'uz'
                ? "Ushbu bo'lim hozirda Erasmus+ WASTE-UZ loyihasi doirasida ishlab chiqish jarayonida bo'lib, keyinchalik rasman to'liq ishga tushiriladi."
                : "This section is currently under development as part of the Erasmus+ WASTE-UZ project and will be officially launched in the upcoming phase."}
            </p>
            <p className="text-xs sm:text-sm text-slate-600 font-normal">
              {lang === 'uz'
                ? "4-ish paketi (WP4: Green Labs & Innovation Hubs) bo'yicha konsorsium hamkor universitetlari tomonidan o'quv dasturlari va telemetriya tizimlari bosqichma-bosqich joriy etilmoqda."
                : "Under Work Package 4 (WP4: Green Labs & Innovation Hubs), the simulation testbeds and digital curriculum modules are being engineered across partner universities."}
            </p>
          </div>

          <div className="border-t border-slate-200 pt-4 flex flex-wrap items-center justify-between gap-3">
            <Link
              to="/activities"
              className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-[#1b6b37] hover:bg-[#14532b] text-white font-bold text-xs shadow-xs transition"
            >
              <Layers className="w-4 h-4" />
              <span>{lang === 'uz' ? "WP4 Ish paketlari" : "WP4 Activities"}</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </Link>

            <Link
              to="/"
              className="inline-flex items-center gap-1.5 text-xs font-bold text-slate-700 hover:text-[#1b6b37] transition"
            >
              <ArrowLeft className="w-3.5 h-3.5" />
              <span>{lang === 'uz' ? "Bosh sahifaga qaytish" : "Back to Home"}</span>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}

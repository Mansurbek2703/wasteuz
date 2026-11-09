import React from 'react';
import { Award, ArrowRight, Layers, Cpu, Users, Calendar, Coins, Clock } from 'lucide-react';

export default function Hero({ t, lang }) {
  return (
    <section id="home" className="relative overflow-hidden pt-12 pb-20 lg:pt-20 lg:pb-28 gradient-hero border-b border-slate-200/60">
      {/* Decorative backdrop shapes */}
      <div className="absolute top-10 left-1/2 -translate-x-1/2 w-full max-w-7xl h-96 bg-gradient-to-tr from-brand-blue/10 via-brand-green/10 to-amber-200/10 blur-3xl pointer-events-none -z-10 rounded-full" />

      <div className="max-w-7xl mx-auto px-4 sm:px-8">
        <div className="text-center max-w-4xl mx-auto space-y-6">
          {/* Grant Call Pill */}
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white shadow-xs border border-slate-200 text-xs sm:text-sm font-medium text-slate-700 animate-fadeIn">
            <span className="flex h-2 w-2 rounded-full bg-emerald-500 animate-ping" />
            <Award className="w-4 h-4 text-brand-blue" />
            <span>{t.hero.badge}</span>
            <span className="hidden sm:inline text-slate-300">|</span>
            <span className="hidden sm:inline font-mono text-slate-500 text-xs">ERASMUS-EDU-2026-CBHE</span>
          </div>

          {/* Main Title */}
          <h1 className="text-3xl sm:text-5xl lg:text-6xl font-extrabold text-slate-900 tracking-tight leading-[1.15]">
            {t.hero.title}
            <span className="block mt-2 bg-gradient-to-r from-brand-blue via-brand-blue-dark to-brand-green bg-clip-text text-transparent">
              WASTE-UZBEKISTAN
            </span>
          </h1>

          {/* Subtitle */}
          <p className="text-base sm:text-xl text-slate-600 max-w-3xl mx-auto font-normal leading-relaxed">
            {t.hero.subTitle}
          </p>

          {/* Action CTAs */}
          <div className="flex flex-wrap items-center justify-center gap-3 sm:gap-4 pt-4">
            <a
              href="#about"
              className="inline-flex items-center justify-center gap-2 px-6 py-3.5 rounded-xl bg-brand-blue text-white font-semibold text-sm shadow-md shadow-brand-blue/20 hover:bg-brand-blue-dark hover:shadow-lg transition transform hover:-translate-y-0.5"
            >
              <span>{t.hero.exploreBtn}</span>
              <ArrowRight className="w-4 h-4" />
            </a>

            <a
              href="#work-packages"
              className="inline-flex items-center justify-center gap-2 px-6 py-3.5 rounded-xl bg-white border border-slate-300 text-slate-700 font-semibold text-sm shadow-xs hover:bg-slate-50 hover:border-slate-400 transition"
            >
              <Layers className="w-4 h-4 text-brand-blue" />
              <span>{t.hero.workPackagesBtn}</span>
            </a>

            <a
              href="#virtual-lab"
              className="inline-flex items-center justify-center gap-2 px-6 py-3.5 rounded-xl bg-emerald-600 text-white font-semibold text-sm shadow-md shadow-emerald-600/20 hover:bg-emerald-700 hover:shadow-lg transition transform hover:-translate-y-0.5"
            >
              <Cpu className="w-4 h-4" />
              <span>{t.hero.virtualLabBtn}</span>
            </a>
          </div>
        </div>

        {/* 5 Key Metric Cards (From Project Facts) */}
        <div className="grid grid-cols-2 md:grid-cols-5 gap-3 sm:gap-4 mt-16 max-w-6xl mx-auto">
          <div className="bg-white/90 backdrop-blur p-4 sm:p-5 rounded-2xl border border-slate-200/80 shadow-xs hover:border-brand-blue/40 transition">
            <div className="flex items-center gap-2 text-brand-blue mb-2">
              <Users className="w-5 h-5" />
              <span className="text-xs font-semibold uppercase tracking-wider text-slate-500">Consortium</span>
            </div>
            <div className="text-2xl sm:text-3xl font-black text-slate-900">6</div>
            <div className="text-xs text-slate-500 mt-1">{t.hero.statPartners}</div>
          </div>

          <div className="bg-white/90 backdrop-blur p-4 sm:p-5 rounded-2xl border border-slate-200/80 shadow-xs hover:border-brand-blue/40 transition">
            <div className="flex items-center gap-2 text-emerald-600 mb-2">
              <Calendar className="w-5 h-5" />
              <span className="text-xs font-semibold uppercase tracking-wider text-slate-500">Duration</span>
            </div>
            <div className="text-2xl sm:text-3xl font-black text-slate-900">36</div>
            <div className="text-xs text-slate-500 mt-1">{t.hero.statDuration} (2026-2029)</div>
          </div>

          <div className="bg-white/90 backdrop-blur p-4 sm:p-5 rounded-2xl border border-slate-200/80 shadow-xs hover:border-brand-blue/40 transition">
            <div className="flex items-center gap-2 text-amber-500 mb-2">
              <Coins className="w-5 h-5" />
              <span className="text-xs font-semibold uppercase tracking-wider text-slate-500">EU Grant</span>
            </div>
            <div className="text-xl sm:text-2xl font-black text-slate-900">€302,979</div>
            <div className="text-xs text-slate-500 mt-1">{t.hero.statBudget}</div>
          </div>

          <div className="bg-white/90 backdrop-blur p-4 sm:p-5 rounded-2xl border border-slate-200/80 shadow-xs hover:border-brand-blue/40 transition">
            <div className="flex items-center gap-2 text-indigo-600 mb-2">
              <Layers className="w-5 h-5" />
              <span className="text-xs font-semibold uppercase tracking-wider text-slate-500">Packages</span>
            </div>
            <div className="text-2xl sm:text-3xl font-black text-slate-900">6 WPs</div>
            <div className="text-xs text-slate-500 mt-1">{t.hero.statWPs}</div>
          </div>

          <div className="col-span-2 md:col-span-1 bg-white/90 backdrop-blur p-4 sm:p-5 rounded-2xl border border-slate-200/80 shadow-xs hover:border-brand-blue/40 transition">
            <div className="flex items-center gap-2 text-teal-600 mb-2">
              <Clock className="w-5 h-5" />
              <span className="text-xs font-semibold uppercase tracking-wider text-slate-500">Effort</span>
            </div>
            <div className="text-2xl sm:text-3xl font-black text-slate-900">122</div>
            <div className="text-xs text-slate-500 mt-1">{t.hero.statEffort}</div>
          </div>
        </div>
      </div>
    </section>
  );
}


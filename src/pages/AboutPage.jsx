import React from 'react';
import { BookOpen, Target, Sparkles, Building2, CheckCircle2, FileText, Calendar, Award } from 'lucide-react';

export default function AboutPage({ t, lang, info }) {
  const keywords = info?.keywords || [
    "environmental sustainability", "Green Deal", "smart waste management skills",
    "student-led innovation", "green transformation", "eco-friendly technology solutions", "green skills"
  ];

  return (
    <div className="py-12 sm:py-16 space-y-16">
      {/* Page Title */}
      <div className="max-w-7xl mx-auto px-4 sm:px-8">
        <div className="max-w-3xl">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-50 text-[#1b6b37] text-xs font-bold uppercase tracking-wider mb-3 border border-emerald-200">
            <BookOpen className="w-3.5 h-3.5" />
            <span>{t.about.tag}</span>
          </div>
          <h1 className="text-3xl sm:text-5xl font-black text-slate-900 tracking-tight">
            {t.about.heading}
          </h1>
          <p className="mt-4 text-slate-600 text-base sm:text-lg leading-relaxed">
            {lang === 'uz' ? info?.abstractUz : info?.abstract}
          </p>
        </div>
      </div>

      {/* Strategic Pillars */}
      <div className="max-w-7xl mx-auto px-4 sm:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          <div className="p-6 rounded-2xl bg-white border-2 border-emerald-500/25 shadow-xs hover:border-[#1b6b37] transition">
            <div className="w-12 h-12 rounded-xl bg-emerald-50 text-[#1b6b37] flex items-center justify-center mb-4 border border-emerald-200">
              <Target className="w-6 h-6" />
            </div>
            <h3 className="font-bold text-lg text-slate-900 mb-2">{t.about.pillar1Title}</h3>
            <p className="text-sm text-slate-600 leading-relaxed">{t.about.pillar1Desc}</p>
          </div>

          <div className="p-6 rounded-2xl bg-white border-2 border-emerald-500/25 shadow-xs hover:border-[#1b6b37] transition">
            <div className="w-12 h-12 rounded-xl bg-emerald-50 text-[#1b6b37] flex items-center justify-center mb-4 border border-emerald-200">
              <Sparkles className="w-6 h-6" />
            </div>
            <h3 className="font-bold text-lg text-slate-900 mb-2">{t.about.pillar2Title}</h3>
            <p className="text-sm text-slate-600 leading-relaxed">{t.about.pillar2Desc}</p>
          </div>

          <div className="p-6 rounded-2xl bg-white border-2 border-emerald-500/25 shadow-xs hover:border-[#1b6b37] transition">
            <div className="w-12 h-12 rounded-xl bg-emerald-50 text-[#1b6b37] flex items-center justify-center mb-4 border border-emerald-200">
              <Building2 className="w-6 h-6" />
            </div>
            <h3 className="font-bold text-lg text-slate-900 mb-2">{t.about.pillar3Title}</h3>
            <p className="text-sm text-slate-600 leading-relaxed">{t.about.pillar3Desc}</p>
          </div>

          <div className="p-6 rounded-2xl bg-white border-2 border-emerald-500/25 shadow-xs hover:border-[#1b6b37] transition">
            <div className="w-12 h-12 rounded-xl bg-emerald-50 text-[#1b6b37] flex items-center justify-center mb-4 border border-emerald-200">
              <CheckCircle2 className="w-6 h-6" />
            </div>
            <h3 className="font-bold text-lg text-slate-900 mb-2">{t.about.pillar4Title}</h3>
            <p className="text-sm text-slate-600 leading-relaxed">{t.about.pillar4Desc}</p>
          </div>
        </div>
      </div>

      {/* Narrative & Passport */}
      <div className="max-w-7xl mx-auto px-4 sm:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          <div className="lg:col-span-7 bg-white p-8 rounded-3xl border-2 border-emerald-500/30 shadow-xs space-y-4">
            <h3 className="text-xl font-bold text-slate-900 flex items-center gap-2">
              <FileText className="w-5 h-5 text-[#1b6b37]" />
              <span>International Cooperation & Sustainability</span>
            </h3>
            <p className="text-slate-600 leading-relaxed text-sm sm:text-base">
              {info?.abstract2 || "Through collaboration with two European Union universities, the project will bring international expertise and best practices to Uzbekistan, enhancing the quality of higher education in environmental technology and IT applications."}
            </p>
            <p className="text-slate-600 leading-relaxed text-sm sm:text-base">
              {info?.abstract3 || "This initiative aligns with national priorities for environmental sustainability, innovation, and higher education modernization, positioning participating universities as leaders in promoting technological solutions for waste management."}
            </p>

            {/* Keywords */}
            <div className="pt-6 border-t border-emerald-100 mt-6">
              <div className="text-xs font-bold text-[#1b6b37] uppercase tracking-wider mb-3">
                Thematic Keywords:
              </div>
              <div className="flex flex-wrap gap-2">
                {keywords.map((k, i) => (
                  <span
                    key={i}
                    className="px-3 py-1 rounded-lg bg-emerald-50 text-xs font-semibold text-emerald-800 border border-emerald-200"
                  >
                    #{k}
                  </span>
                ))}
              </div>
            </div>
          </div>

          <div id="passport" className="lg:col-span-5 bg-gradient-to-br from-[#0c2e17] via-slate-900 to-[#0c2e17] text-white p-8 rounded-3xl border-2 border-emerald-500/40 shadow-lg space-y-3">
            <div className="flex items-center justify-between pb-3 border-b border-emerald-900/60">
              <h4 className="text-lg font-black text-white">Project Passport</h4>
              <span className="text-xs font-mono font-bold text-yellow-400 px-2 py-0.5 rounded bg-yellow-400/20 border border-yellow-400/30">
                101322962
              </span>
            </div>

            <div className="space-y-3 text-xs sm:text-sm">
              <div className="flex justify-between py-1 border-b border-emerald-900/40">
                <span className="text-slate-300">Acronym</span>
                <span className="font-bold text-white">WASTE-UZ</span>
              </div>
              <div className="flex justify-between py-1 border-b border-emerald-900/40">
                <span className="text-slate-300">Call / Topic</span>
                <span className="text-slate-200 text-xs font-mono">ERASMUS-EDU-2026-CBHE-REGION-6</span>
              </div>
              <div className="flex justify-between py-1 border-b border-emerald-900/40">
                <span className="text-slate-300">Granting Authority</span>
                <span className="text-slate-200 text-xs">EACEA (European Commission)</span>
              </div>
              <div className="flex justify-between py-1 border-b border-emerald-900/40">
                <span className="text-slate-300">Coordinator</span>
                <span className="text-sky-300 font-bold">Al-Khwarizmi University (AKHU)</span>
              </div>
              <div className="flex justify-between py-1 border-b border-emerald-900/40">
                <span className="text-slate-300">Consortium</span>
                <span className="text-white">6 Universities (4 UZ, 2 EU)</span>
              </div>
              <div className="flex justify-between py-1 border-b border-emerald-900/40">
                <span className="text-slate-300">Action Type</span>
                <span className="text-emerald-400 font-medium">ERASMUS-LS (Lump Sum Grant)</span>
              </div>
              <div className="flex justify-between py-1 border-b border-emerald-900/40">
                <span className="text-slate-300">Total Effort</span>
                <span className="text-slate-200">122 Person-Months</span>
              </div>
              <div className="flex justify-between py-1">
                <span className="text-slate-300">Operational Period</span>
                <span className="text-emerald-400 font-medium">28.10.2026 – 28.10.2029 (36 mos)</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

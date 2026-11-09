import React from 'react';
import { BookOpen, Target, Sparkles, Building2, CheckCircle2, FileText } from 'lucide-react';

export default function AboutSection({ t, lang, info }) {
  const keywords = info?.keywords || [
    "environmental sustainability", "Green Deal", "smart waste management skills", 
    "student-led innovation", "green transformation", "eco-friendly technology solutions", "green skills"
  ];

  return (
    <section id="about" className="py-16 sm:py-24 bg-white border-b border-slate-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-8">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-sky-50 text-brand-blue-dark text-xs font-semibold uppercase tracking-wider mb-3">
            <BookOpen className="w-3.5 h-3.5" />
            <span>{t.about.tag}</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-900 tracking-tight">
            {t.about.heading}
          </h2>
          <p className="mt-4 text-slate-600 text-base sm:text-lg leading-relaxed">
            {lang === 'uz' ? info?.abstractUz : info?.abstract}
          </p>
        </div>

        {/* 4 Strategic Pillars */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-16">
          <div className="p-6 rounded-2xl bg-slate-50 border border-slate-200 hover:border-brand-blue/50 hover:shadow-md transition">
            <div className="w-12 h-12 rounded-xl bg-sky-100 text-brand-blue flex items-center justify-center mb-4">
              <Target className="w-6 h-6" />
            </div>
            <h3 className="font-bold text-lg text-slate-900 mb-2">{t.about.pillar1Title}</h3>
            <p className="text-sm text-slate-600 leading-relaxed">{t.about.pillar1Desc}</p>
          </div>

          <div className="p-6 rounded-2xl bg-slate-50 border border-slate-200 hover:border-brand-green/50 hover:shadow-md transition">
            <div className="w-12 h-12 rounded-xl bg-emerald-100 text-brand-green flex items-center justify-center mb-4">
              <Sparkles className="w-6 h-6" />
            </div>
            <h3 className="font-bold text-lg text-slate-900 mb-2">{t.about.pillar2Title}</h3>
            <p className="text-sm text-slate-600 leading-relaxed">{t.about.pillar2Desc}</p>
          </div>

          <div className="p-6 rounded-2xl bg-slate-50 border border-slate-200 hover:border-amber-500/50 hover:shadow-md transition">
            <div className="w-12 h-12 rounded-xl bg-amber-100 text-amber-600 flex items-center justify-center mb-4">
              <Building2 className="w-6 h-6" />
            </div>
            <h3 className="font-bold text-lg text-slate-900 mb-2">{t.about.pillar3Title}</h3>
            <p className="text-sm text-slate-600 leading-relaxed">{t.about.pillar3Desc}</p>
          </div>

          <div className="p-6 rounded-2xl bg-slate-50 border border-slate-200 hover:border-indigo-500/50 hover:shadow-md transition">
            <div className="w-12 h-12 rounded-xl bg-indigo-100 text-indigo-600 flex items-center justify-center mb-4">
              <CheckCircle2 className="w-6 h-6" />
            </div>
            <h3 className="font-bold text-lg text-slate-900 mb-2">{t.about.pillar4Title}</h3>
            <p className="text-sm text-slate-600 leading-relaxed">{t.about.pillar4Desc}</p>
          </div>
        </div>

        {/* Detailed Narrative & Project Passport */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          {/* Narrative & Keywords */}
          <div className="lg:col-span-7 space-y-5">
            <div className="p-6 sm:p-8 rounded-2xl bg-gradient-to-br from-slate-50 to-sky-50/40 border border-slate-200">
              <h3 className="text-xl font-bold text-slate-900 mb-3 flex items-center gap-2">
                <FileText className="w-5 h-5 text-brand-blue" />
                <span>International Cooperation & Impact</span>
              </h3>
              <p className="text-slate-600 leading-relaxed text-sm sm:text-base">
                {info?.abstract2 || "Through collaboration with two European Union universities, the project will bring international expertise and best practices to Uzbekistan, enhancing the quality of higher education in environmental technology and IT applications."}
              </p>
              <p className="text-slate-600 leading-relaxed text-sm sm:text-base mt-3">
                {info?.abstract3 || "This initiative aligns with national priorities for environmental sustainability, innovation, and higher education modernization, positioning participating universities as leaders in promoting technological solutions for waste management."}
              </p>

              {/* Keywords */}
              <div className="pt-6 border-t border-slate-200/80 mt-6">
                <div className="text-xs font-semibold text-slate-500 uppercase tracking-wider mb-2.5">
                  Priority Thematic Keywords:
                </div>
                <div className="flex flex-wrap gap-1.5">
                  {keywords.map((k, i) => (
                    <span 
                      key={i} 
                      className="px-2.5 py-1 rounded-md bg-white border border-slate-200 text-xs font-medium text-slate-700 shadow-2xs"
                    >
                      #{k}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          </div>

          {/* Project Passport Table */}
          <div className="lg:col-span-5 bg-slate-900 text-slate-100 p-6 sm:p-7 rounded-2xl shadow-xl">
            <div className="flex items-center justify-between border-b border-slate-800 pb-4 mb-4">
              <div>
                <span className="text-xs font-bold uppercase tracking-wider text-yellow-400">Official Data</span>
                <h4 className="text-lg font-black text-white">Project Passport</h4>
              </div>
              <span className="px-2.5 py-1 bg-yellow-400/20 text-yellow-300 text-xs font-mono font-bold rounded">
                CBHE 2026
              </span>
            </div>

            <div className="space-y-3 text-xs sm:text-sm">
              <div className="flex justify-between py-1.5 border-b border-slate-800/80">
                <span className="text-slate-400">Project Acronym</span>
                <span className="font-bold text-white">WASTE-UZ</span>
              </div>
              <div className="flex justify-between py-1.5 border-b border-slate-800/80">
                <span className="text-slate-400">Project Number</span>
                <span className="font-mono text-emerald-400 font-semibold">101322962</span>
              </div>
              <div className="flex justify-between py-1.5 border-b border-slate-800/80">
                <span className="text-slate-400">Call / Topic</span>
                <span className="text-right text-slate-200 text-xs">ERASMUS-EDU-2026-CBHE-REGION-6</span>
              </div>
              <div className="flex justify-between py-1.5 border-b border-slate-800/80">
                <span className="text-slate-400">Granting Authority</span>
                <span className="text-right text-slate-200 text-xs">EACEA (European Commission)</span>
              </div>
              <div className="flex justify-between py-1.5 border-b border-slate-800/80">
                <span className="text-slate-400">Coordinator</span>
                <span className="text-right text-sky-400 font-semibold">Al-Xorazmiy Univ. (AKHU)</span>
              </div>
              <div className="flex justify-between py-1.5 border-b border-slate-800/80">
                <span className="text-slate-400">Consortium</span>
                <span className="text-white">6 Universities (4 UZ, 2 EU)</span>
              </div>
              <div className="flex justify-between py-1.5 border-b border-slate-800/80">
                <span className="text-slate-400">Total EU Grant</span>
                <span className="text-yellow-400 font-bold">€302,979.07 (Lump Sum)</span>
              </div>
              <div className="flex justify-between py-1.5 border-b border-slate-800/80">
                <span className="text-slate-400">Total Effort</span>
                <span className="text-slate-200">122 Person-Months</span>
              </div>
              <div className="flex justify-between py-1.5">
                <span className="text-slate-400">Project Period</span>
                <span className="text-emerald-400 font-medium">28.10.2026 – 28.10.2029 (36 mos)</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

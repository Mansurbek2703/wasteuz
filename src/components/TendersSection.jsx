import React from 'react';
import { FileBadge, Calendar, DollarSign, CheckCircle2, Send } from 'lucide-react';

export default function TendersSection({ t, lang, tenders, onApplyTender }) {
  return (
    <section id="tenders" className="py-16 sm:py-24 bg-slate-50 border-b border-slate-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-8">
        <div className="text-center max-w-3xl mx-auto mb-14">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-amber-100 text-amber-800 text-xs font-semibold uppercase tracking-wider mb-3">
            <FileBadge className="w-3.5 h-3.5" />
            <span>{t.tenders.tag}</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-900 tracking-tight">
            {t.tenders.heading}
          </h2>
          <p className="mt-4 text-slate-600 text-base sm:text-lg">
            {t.tenders.subheading}
          </p>
        </div>

        <div className="max-w-4xl mx-auto space-y-6">
          {tenders.map((tender) => (
            <div
              key={tender.id}
              className="bg-white rounded-3xl p-6 sm:p-9 border border-slate-200 shadow-sm hover:border-amber-400/80 transition"
            >
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-6 border-b border-slate-100">
                <div>
                  <div className="flex items-center gap-2 mb-2">
                    <span className="px-2.5 py-0.5 rounded-full bg-emerald-100 text-emerald-800 text-xs font-bold">
                      {tender.status}
                    </span>
                    <span className="text-xs font-mono text-slate-400 font-semibold">
                      {tender.wp}
                    </span>
                  </div>
                  <h3 className="text-xl sm:text-2xl font-black text-slate-900">
                    {lang === 'uz' ? tender.titleUz : tender.title}
                  </h3>
                </div>

                <div className="flex sm:flex-col items-end justify-between sm:justify-center bg-amber-50 px-4 py-3 rounded-2xl border border-amber-200 flex-shrink-0">
                  <span className="text-[11px] font-bold uppercase tracking-wider text-amber-700">
                    {t.tenders.tenderBudget}
                  </span>
                  <span className="text-xl font-black text-amber-800">
                    {tender.budget}
                  </span>
                </div>
              </div>

              {/* Scope & Details */}
              <div className="py-6 space-y-4">
                <div>
                  <h4 className="text-xs font-bold uppercase tracking-wider text-slate-400 mb-1">
                    {t.tenders.tenderScope}:
                  </h4>
                  <p className="text-sm text-slate-700 leading-relaxed">
                    {lang === 'uz' ? tender.scopeUz : tender.scope}
                  </p>
                </div>

                {tender.requirements && (
                  <div>
                    <h4 className="text-xs font-bold uppercase tracking-wider text-slate-400 mb-2">
                      {t.tenders.tenderReqs}:
                    </h4>
                    <ul className="space-y-1.5 text-xs sm:text-sm text-slate-600">
                      {tender.requirements.map((req, i) => (
                        <li key={i} className="flex items-start gap-2">
                          <CheckCircle2 className="w-4 h-4 text-emerald-500 flex-shrink-0 mt-0.5" />
                          <span>{req}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                )}
              </div>

              {/* Footer CTA */}
              <div className="pt-6 border-t border-slate-100 flex flex-col sm:flex-row items-center justify-between gap-4">
                <div className="flex items-center gap-2 text-xs text-slate-500">
                  <Calendar className="w-4 h-4 text-slate-400" />
                  <span>{t.tenders.tenderDeadline}: <strong className="text-slate-800">{tender.deadline}</strong></span>
                </div>

                <a
                  href="#contact"
                  className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-5 py-2.5 rounded-xl bg-slate-900 text-white font-bold text-xs hover:bg-slate-800 transition"
                >
                  <Send className="w-3.5 h-3.5" />
                  <span>{t.tenders.applyBtn}</span>
                </a>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

import React from 'react';
import { Link } from 'react-router-dom';
import { FileBadge, Calendar, ArrowRight, Clock, AlertCircle } from 'lucide-react';

export default function TendersPage({ t, lang, tenders }) {
  return (
    <div className="py-12 sm:py-16 space-y-12">
      {/* Title */}
      <div className="max-w-7xl mx-auto px-4 sm:px-8">
        <div className="max-w-3xl">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-amber-50 text-amber-800 text-xs font-bold uppercase tracking-wider mb-3 border border-amber-200">
            <FileBadge className="w-3.5 h-3.5" />
            <span>{t.tenders.tag}</span>
          </div>
          <h1 className="text-3xl sm:text-5xl font-black text-slate-900 tracking-tight">
            {t.tenders.heading}
          </h1>
          <p className="mt-4 text-slate-600 text-base sm:text-lg">
            {t.tenders.subheading}
          </p>
        </div>
      </div>

      {/* Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-8">
        {!tenders || tenders.length === 0 ? (
          <div className="max-w-3xl mx-auto bg-white rounded-3xl p-10 sm:p-14 border border-slate-200 shadow-xs text-center space-y-4">
            <div className="w-16 h-16 rounded-2xl bg-amber-50 text-amber-600 flex items-center justify-center mx-auto border border-amber-100">
              <Clock className="w-8 h-8" />
            </div>
            <h2 className="text-xl sm:text-2xl font-bold text-slate-900">
              {lang === 'uz' 
                ? "Hozirda faol tenderlar mavjud emas" 
                : "No Active Tenders at This Time"}
            </h2>
            <p className="text-sm sm:text-base text-slate-500 max-w-xl mx-auto leading-relaxed">
              {lang === 'uz'
                ? "WASTE-UZ loyihasi doirasidagi xaridlar, ekspert tanlovlari va vakansiyalar belgilangan tartibda rasman ushbu sahifada e'lon qilinadi."
                : "There are currently no open calls or procurement procedures. Upcoming tenders and vacancies under the WASTE-UZ project will be officially published here in compliance with Erasmus+ guidelines."}
            </p>
            <div className="pt-4">
              <Link
                to="/contact"
                className="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-slate-900 hover:bg-slate-800 text-white font-bold text-xs transition"
              >
                <span>{lang === 'uz' ? "Kotibiyat bilan bog'lanish" : "Contact Secretariat"}</span>
                <ArrowRight className="w-4 h-4" />
              </Link>
            </div>
          </div>
        ) : (
          <div className="max-w-4xl space-y-6">
            {tenders.map((tender) => (
              <div
                key={tender.id}
                className="bg-white rounded-3xl p-7 sm:p-9 border border-slate-200 shadow-xs hover:border-amber-400 transition"
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
                    <h2 className="text-xl sm:text-2xl font-black text-slate-900">
                      {lang === 'uz' ? tender.titleUz : tender.title}
                    </h2>
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

                <div className="py-6 space-y-3">
                  <h3 className="text-xs font-bold uppercase tracking-wider text-slate-400">
                    {t.tenders.tenderScope}:
                  </h3>
                  <p className="text-sm text-slate-700 leading-relaxed">
                    {lang === 'uz' ? tender.scopeUz : tender.scope}
                  </p>
                </div>

                <div className="pt-6 border-t border-slate-100 flex flex-col sm:flex-row items-center justify-between gap-4">
                  <div className="flex items-center gap-2 text-xs text-slate-500">
                    <Calendar className="w-4 h-4 text-slate-400" />
                    <span>{t.tenders.tenderDeadline}: <strong className="text-slate-800">{tender.deadline}</strong></span>
                  </div>

                  <Link
                    to={`/tenders/${tender.slug}`}
                    className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-6 py-2.5 rounded-xl bg-slate-900 text-white font-bold text-xs hover:bg-slate-800 transition"
                  >
                    <span>{lang === 'uz' ? "Batafsil ma'lumot va topshirish" : "View Details & Apply"}</span>
                    <ArrowRight className="w-4 h-4" />
                  </Link>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

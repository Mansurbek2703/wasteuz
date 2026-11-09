import React from 'react';
import { Building, MapPin, ExternalLink, Award } from 'lucide-react';

export default function PartnersPage({ t, lang, partners }) {
  return (
    <div className="py-12 sm:py-16 space-y-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-8">
        <div className="max-w-3xl">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-100 text-emerald-800 text-xs font-bold uppercase tracking-wider mb-3">
            <Building className="w-3.5 h-3.5" />
            <span>{t.partners.tag}</span>
          </div>
          <h1 className="text-3xl sm:text-5xl font-black text-slate-900 tracking-tight">
            {t.partners.heading}
          </h1>
          <p className="mt-4 text-slate-600 text-base sm:text-lg">
            {t.partners.subheading}
          </p>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
          {partners.map((partner) => {
            const isCoord = partner.role === 'Coordinator';
            return (
              <div
                key={partner.id}
                className={`flex flex-col justify-between bg-white rounded-3xl p-7 border transition duration-200 hover:shadow-lg ${
                  isCoord
                    ? 'border-brand-blue ring-2 ring-brand-blue/15 shadow-md'
                    : 'border-slate-200 hover:border-slate-300 shadow-xs'
                }`}
              >
                <div>
                  <div className="flex items-center justify-between gap-2 mb-4">
                    <span
                      className={`inline-flex items-center gap-1 px-3 py-1 rounded-full text-xs font-bold ${
                        isCoord
                          ? 'bg-brand-blue text-white shadow-xs'
                          : partner.country === 'Uzbekistan'
                          ? 'bg-emerald-50 text-emerald-700 border border-emerald-200'
                          : 'bg-indigo-50 text-indigo-700 border border-indigo-200'
                      }`}
                    >
                      {isCoord && <Award className="w-3.5 h-3.5" />}
                      {partner.badge}
                    </span>
                    <span className="text-xs font-mono font-bold text-slate-400">
                      {partner.shortName}
                    </span>
                  </div>

                  <h2 className="text-xl font-bold text-slate-900 mb-2 leading-snug">
                    {partner.legalName}
                  </h2>

                  <div className="flex items-center gap-1.5 text-xs text-slate-500 mb-4 font-medium">
                    <MapPin className="w-3.5 h-3.5 text-slate-400" />
                    <span>{partner.city}, {partner.country}</span>
                  </div>

                  <p className="text-sm text-slate-600 leading-relaxed mb-6">
                    {partner.description}
                  </p>
                </div>

                <div className="pt-4 border-t border-slate-100 flex flex-col gap-3">
                  <div className="text-xs text-brand-blue-dark font-medium bg-sky-50 px-3.5 py-2 rounded-xl">
                    <strong className="block text-[11px] text-slate-500 uppercase tracking-wider mb-0.5">
                      {t.partners.leadPackage}:
                    </strong>
                    <span>{partner.leadWp}</span>
                  </div>

                  <a
                    href={partner.website}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center justify-center gap-1.5 text-xs font-bold text-slate-700 hover:text-brand-blue py-2.5 px-4 rounded-xl hover:bg-slate-50 transition border border-slate-200"
                  >
                    <span>{t.partners.visitSite}</span>
                    <ExternalLink className="w-3.5 h-3.5" />
                  </a>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}

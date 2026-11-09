import React from 'react';
import { ExternalLink, Building, MapPin, Award } from 'lucide-react';

export default function PartnersSection({ t, lang, partners }) {
  return (
    <section id="partners" className="py-16 sm:py-24 bg-slate-50 border-b border-slate-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-8">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-100 text-emerald-800 text-xs font-semibold uppercase tracking-wider mb-3">
            <Building className="w-3.5 h-3.5" />
            <span>{t.partners.tag}</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-900 tracking-tight">
            {t.partners.heading}
          </h2>
          <p className="mt-4 text-slate-600 text-base sm:text-lg">
            {t.partners.subheading}
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
          {partners.map((partner) => {
            const isCoord = partner.role === 'Coordinator';
            return (
              <div
                key={partner.id}
                className={`flex flex-col justify-between bg-white rounded-2xl p-6 sm:p-7 border transition-all duration-200 hover:-translate-y-1 hover:shadow-lg ${
                  isCoord
                    ? 'border-brand-blue/50 ring-2 ring-brand-blue/10 shadow-md'
                    : 'border-slate-200 hover:border-slate-300 shadow-xs'
                }`}
              >
                <div>
                  {/* Top Bar with Badges */}
                  <div className="flex items-center justify-between gap-2 mb-4">
                    <span
                      className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold ${
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

                    <span className="text-xs font-mono text-slate-400 font-semibold">
                      {partner.shortName}
                    </span>
                  </div>

                  {/* University Name */}
                  <h3 className="text-xl font-bold text-slate-900 tracking-tight leading-snug mb-2">
                    {partner.legalName}
                  </h3>

                  {/* Location */}
                  <div className="flex items-center gap-1.5 text-xs text-slate-500 mb-4 font-medium">
                    <MapPin className="w-3.5 h-3.5 text-slate-400" />
                    <span>{partner.city}, {partner.country}</span>
                  </div>

                  {/* Description */}
                  <p className="text-sm text-slate-600 leading-relaxed mb-6">
                    {partner.description}
                  </p>
                </div>

                {/* Footer of card */}
                <div className="pt-4 border-t border-slate-100 flex flex-col gap-3">
                  <div className="text-xs text-brand-blue-dark font-medium bg-sky-50 px-3 py-1.5 rounded-lg">
                    <strong className="block text-[11px] text-slate-500 uppercase tracking-wider">{t.partners.leadPackage}:</strong>
                    <span>{partner.leadWp}</span>
                  </div>

                  <a
                    href={partner.website}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center justify-center gap-1.5 text-xs font-semibold text-slate-700 hover:text-brand-blue py-2 px-3 rounded-lg hover:bg-slate-50 transition border border-slate-200"
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
    </section>
  );
}

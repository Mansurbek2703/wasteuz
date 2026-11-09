import React, { useState } from 'react';
import { Building, MapPin, ExternalLink, Award, Globe, Compass } from 'lucide-react';

export default function PartnersPage({ t, lang, partners }) {
  const [selectedCity, setSelectedCity] = useState(null);

  const consortiumHubs = [
    { city: 'Urgench', code: 'AKHU', name: 'Al-Khwarizmi University', role: 'Project Coordinator', lead: 'WP1 Lead', country: 'Uzbekistan', coords: '41.55° N, 60.63° E' },
    { city: 'Vigo', code: 'UVIGO', name: 'Universidad de Vigo', role: 'EU Partner (Spain)', lead: 'WP2 Lead', country: 'Spain', coords: '42.24° N, 8.72° W' },
    { city: 'Gaziantep', code: 'GANTEP', name: 'Gaziantep Universitesi', role: 'Programme Partner (Türkiye)', lead: 'WP4 Lead', country: 'Türkiye', coords: '37.06° N, 37.38° E' },
    { city: 'Bukhara', code: 'BSU', name: 'Bukhara State University', role: 'Partner University', lead: 'WP6 Lead', country: 'Uzbekistan', coords: '39.77° N, 64.42° E' },
    { city: 'Tashkent', code: 'GREEN', name: 'Central Asian Green University', role: 'Partner University', lead: 'WP5 Lead', country: 'Uzbekistan', coords: '41.31° N, 69.24° E' },
    { city: 'Fergana', code: 'FSTU', name: 'Fergana State Technical University', role: 'Partner University', lead: 'WP3 Lead', country: 'Uzbekistan', coords: '40.38° N, 71.78° E' }
  ];

  return (
    <div className="py-12 sm:py-16 space-y-12">
      {/* Title */}
      <div className="max-w-7xl mx-auto px-4 sm:px-8">
        <div className="max-w-3xl">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-50 text-[#1b6b37] text-xs font-bold uppercase tracking-wider mb-3 border border-emerald-200">
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

      {/* Consortium Geographic Nodes Map / Hubs Showcase */}
      <div className="max-w-7xl mx-auto px-4 sm:px-8">
        <div className="bg-gradient-to-br from-[#0c2e17] via-slate-900 to-[#0c2e17] text-white rounded-3xl p-6 sm:p-10 shadow-xl border-2 border-emerald-500/40">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-6 border-b border-emerald-900/60">
            <div>
              <span className="text-xs font-bold uppercase tracking-wider text-emerald-400">International Network</span>
              <h2 className="text-xl sm:text-2xl font-black text-white mt-1">
                Consortium Geographic Hubs
              </h2>
            </div>
            <span className="text-xs font-semibold px-3 py-1 rounded-full bg-emerald-950 text-emerald-200 border border-emerald-700/60 self-start sm:self-center">
              Uzbekistan • Spain • Türkiye
            </span>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3 sm:gap-4 pt-6">
            {consortiumHubs.map((hub) => (
              <div
                key={hub.code}
                onClick={() => setSelectedCity(selectedCity === hub.code ? null : hub.code)}
                className={`p-4 rounded-2xl border-2 transition-all cursor-pointer flex flex-col justify-between ${
                  selectedCity === hub.code
                    ? 'bg-emerald-900/90 border-emerald-400 text-white shadow-lg'
                    : 'bg-slate-800/80 border-emerald-500/30 text-slate-300 hover:border-emerald-400 hover:text-white'
                }`}
              >
                <div>
                  <div className="flex items-center justify-between gap-1 mb-2">
                    <span className="font-mono text-xs font-bold text-emerald-400">{hub.code}</span>
                    <span className="text-[10px] text-slate-400 font-medium">{hub.country}</span>
                  </div>
                  <div className="font-bold text-sm text-white">{hub.city}</div>
                  <div className="text-[11px] text-slate-400 line-clamp-1 mt-0.5">{hub.role}</div>
                </div>
                <div className="mt-3 pt-2 border-t border-emerald-900/40 text-[10px] font-mono text-emerald-300">
                  {hub.lead}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Detailed Partner Cards Grid */}
      <div className="max-w-7xl mx-auto px-4 sm:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
          {partners.map((partner) => {
            const isCoord = partner.role === 'Coordinator';
            return (
              <div
                key={partner.id}
                className={`flex flex-col justify-between bg-white rounded-3xl p-7 border-2 transition duration-200 hover:shadow-lg ${
                  isCoord
                    ? 'border-[#1b6b37] ring-2 ring-[#1b6b37]/20 shadow-md'
                    : 'border-emerald-500/30 hover:border-[#1b6b37] shadow-xs'
                }`}
              >
                <div>
                  <div className="flex items-center justify-between gap-2 mb-4">
                    <span
                      className={`inline-flex items-center gap-1 px-3 py-1 rounded-full text-xs font-bold ${
                        isCoord
                          ? 'bg-[#1b6b37] text-white shadow-xs'
                          : 'bg-emerald-50 text-emerald-800 border border-emerald-200'
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
                    <MapPin className="w-3.5 h-3.5 text-[#1b6b37]" />
                    <span>{partner.city}, {partner.country}</span>
                  </div>

                  <p className="text-sm text-slate-600 leading-relaxed mb-6">
                    {partner.description}
                  </p>
                </div>

                <div className="pt-4 border-t border-emerald-100 flex flex-col gap-3">
                  <div className="text-xs text-emerald-950 font-medium bg-emerald-50/70 border border-emerald-200 p-3 rounded-xl">
                    <strong className="block text-[11px] text-emerald-800 uppercase tracking-wider mb-0.5">
                      {t.partners.leadPackage}:
                    </strong>
                    <span>{partner.leadWp}</span>
                  </div>

                  <a
                    href={partner.website}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center justify-center gap-1.5 text-xs font-bold text-white bg-[#1b6b37] hover:bg-[#14532b] py-3 px-4 rounded-xl shadow-xs transition"
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

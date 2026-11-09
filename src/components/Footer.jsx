import React from 'react';

export default function Footer({ t, lang, partners }) {
  return (
    <footer className="bg-slate-950 text-slate-400 pt-16 pb-12 border-t border-slate-900">
      <div className="max-w-7xl mx-auto px-4 sm:px-8">
        {/* Top Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-10 pb-12 border-b border-slate-800">
          {/* Logo & EU Emblem */}
          <div className="lg:col-span-5 space-y-4">
            <div className="flex items-center gap-3">
              <img
                src="/logo.jpg"
                alt="WASTE-UZ"
                className="h-12 w-auto object-contain rounded-md bg-white p-1"
              />
              <div>
                <span className="font-black text-xl text-white tracking-tight">
                  WASTE<span className="text-emerald-400">UZ</span>
                </span>
                <span className="block text-xs text-slate-400">
                  Project 101322962 — Erasmus+ CBHE
                </span>
              </div>
            </div>

            <p className="text-xs sm:text-sm text-slate-400 leading-relaxed max-w-md">
              Waste Awareness Skills Training & Education — Uzbekistan. Fostering smart waste management competencies, circular economy skills, and student innovation across Uzbekistan and Europe.
            </p>

            {/* EU Co-funded Flag Box */}
            <div className="flex items-center gap-3 p-3 rounded-xl bg-slate-900 border border-slate-800 max-w-sm">
              <div className="w-10 h-7 bg-[#003399] rounded-[2px] flex items-center justify-center relative overflow-hidden flex-shrink-0">
                <span className="text-xs text-yellow-300 font-bold leading-none">★</span>
              </div>
              <div className="text-[11px] leading-tight">
                <span className="text-slate-400 block">{t.eu.cofunded}</span>
                <span className="text-white font-bold">{t.eu.euName}</span>
              </div>
            </div>
          </div>

          {/* Quick Links */}
          <div className="lg:col-span-3 space-y-3">
            <h4 className="text-xs font-bold uppercase tracking-wider text-slate-200">
              Navigation
            </h4>
            <ul className="space-y-2 text-xs sm:text-sm">
              <li><a href="#home" className="hover:text-white transition">{t.nav.home}</a></li>
              <li><a href="#about" className="hover:text-white transition">{t.nav.about}</a></li>
              <li><a href="#partners" className="hover:text-white transition">{t.nav.partners}</a></li>
              <li><a href="#work-packages" className="hover:text-white transition">{t.nav.workPackages}</a></li>
              <li><a href="#virtual-lab" className="hover:text-emerald-400 text-emerald-500 font-semibold transition">{t.nav.virtualLab}</a></li>
              <li><a href="#news" className="hover:text-white transition">{t.nav.news}</a></li>
              <li><a href="#tenders" className="hover:text-white transition">{t.nav.tenders}</a></li>
              <li><a href="#contact" className="hover:text-white transition">{t.nav.contact}</a></li>
            </ul>
          </div>

          {/* Consortium Universities */}
          <div className="lg:col-span-4 space-y-3">
            <h4 className="text-xs font-bold uppercase tracking-wider text-slate-200">
              Consortium Partners
            </h4>
            <ul className="space-y-2 text-xs">
              {partners?.map((p) => (
                <li key={p.id} className="flex items-center justify-between">
                  <a
                    href={p.website}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="hover:text-brand-blue-light transition truncate max-w-xs"
                  >
                    <span className="font-mono text-slate-300 font-semibold mr-1.5">[{p.shortName}]</span>
                    <span>{p.legalName}</span>
                  </a>
                  <span className="text-[10px] text-slate-500 font-mono">{p.country}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Mandatory EU Disclaimer */}
        <div className="pt-8 space-y-4">
          <div className="p-4 rounded-xl bg-slate-900/80 border border-slate-800 text-[11px] sm:text-xs text-slate-400 leading-relaxed">
            <strong className="text-slate-300 block mb-1">Official Erasmus+ Disclaimer:</strong>
            {t.eu.disclaimer}
          </div>

          <div className="flex flex-col sm:flex-row items-center justify-between text-xs text-slate-500 gap-2">
            <div>
              © 2026 WASTE-UZ Project Consortium (Grant Agreement 101322962). All rights reserved.
            </div>
            <div>
              Al-Xorazmiy University • Urgench, Uzbekistan • <span className="font-mono text-slate-400">wasteuz.uz</span>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}

import React from 'react';
import { Link } from 'react-router-dom';

export default function Footer({ t, lang, partners }) {
  return (
    <footer className="bg-slate-950 text-slate-400 pt-16 pb-12 border-t border-slate-900 mt-auto">
      <div className="max-w-7xl mx-auto px-4 sm:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-10 pb-12 border-b border-slate-800">
          {/* Logo & Info */}
          <div className="lg:col-span-5 space-y-4">
            <Link to="/" className="flex items-center gap-3.5 group">
              <img
                src="/logo.jpg"
                alt="WASTE-UZ"
                className="h-16 w-auto object-contain rounded-lg bg-white p-1"
              />
              <div>
                <span className="font-black text-2xl text-white tracking-tight">
                  WASTE<span className="text-emerald-400">UZ</span>
                </span>
                <span className="block text-xs text-slate-400 font-mono">
                  Erasmus+ Project 101322962
                </span>
              </div>
            </Link>

            <p className="text-xs sm:text-sm text-slate-400 leading-relaxed max-w-md">
              Waste Awareness Skills Training & Education — Uzbekistan. Fostering smart waste management competencies, circular economy skills, and student innovation across Uzbekistan and Europe.
            </p>

            {/* EU Co-funded Flag Box */}
            <div className="flex items-center gap-3 p-3 rounded-xl bg-slate-900 border border-slate-800 max-w-sm">
              <div className="w-10 h-7 bg-[#003399] rounded-xs flex items-center justify-center relative overflow-hidden flex-shrink-0">
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
            <ul className="space-y-2 text-xs sm:text-sm font-medium">
              <li><Link to="/" className="hover:text-white transition">{t.nav.home}</Link></li>
              <li><Link to="/about" className="hover:text-white transition">{t.nav.about}</Link></li>
              <li><Link to="/partners" className="hover:text-white transition">{t.nav.partners}</Link></li>
              <li><Link to="/activities" className="hover:text-white transition">{t.nav.workPackages}</Link></li>
              <li><Link to="/virtual-lab" className="hover:text-emerald-400 text-emerald-500 font-semibold transition">{t.nav.virtualLab}</Link></li>
              <li><Link to="/news" className="hover:text-white transition">{t.nav.news}</Link></li>
              <li><Link to="/tenders" className="hover:text-white transition">{t.nav.tenders}</Link></li>
              <li><Link to="/contact" className="hover:text-white transition">{t.nav.contact}</Link></li>
              <li><Link to="/admin" className="text-sky-400 hover:underline">{t.nav.admin} Panel</Link></li>
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
                    className="hover:text-sky-300 transition truncate max-w-xs"
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

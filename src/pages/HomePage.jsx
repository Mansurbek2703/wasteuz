import React from 'react';
import { Link } from 'react-router-dom';
import { Award, ArrowRight, Layers, Cpu, Users, Calendar, Clock, BookOpen, Newspaper, FileBadge, CheckCircle2, GraduationCap } from 'lucide-react';

export default function HomePage({ t, lang, info, partners, workPackages, news, tenders }) {
  return (
    <div className="space-y-16 sm:space-y-24 pb-16">
      {/* Hero Section */}
      <section className="relative overflow-hidden pt-12 pb-16 lg:pt-18 lg:pb-24 gradient-hero border-b border-slate-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-8">
          <div className="text-center max-w-4xl mx-auto space-y-6">
            {/* Grant Call Pill */}
            <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white shadow-xs border border-slate-200 text-xs sm:text-sm font-semibold text-slate-700">
              <span className="flex h-2.5 w-2.5 rounded-full bg-emerald-500 animate-ping" />
              <Award className="w-4 h-4 text-[#1b6b37]" />
              <span>{t.hero.badge}</span>
              <span className="hidden sm:inline text-slate-300">|</span>
              <span className="hidden sm:inline font-mono text-slate-500 text-xs">ERASMUS-EDU-2026-CBHE</span>
            </div>

            {/* Main Title */}
            <h1 className="text-3xl sm:text-5xl lg:text-6xl font-black text-slate-900 tracking-tight leading-[1.15]">
              {t.hero.title}
              <span className="block mt-2 bg-gradient-to-r from-[#1b6b37] via-brand-blue to-emerald-600 bg-clip-text text-transparent">
                WASTE-UZBEKISTAN
              </span>
            </h1>

            {/* Subtitle */}
            <p className="text-base sm:text-lg text-slate-600 max-w-3xl mx-auto leading-relaxed">
              {t.hero.subTitle}
            </p>

            {/* Action Buttons */}
            <div className="flex flex-wrap items-center justify-center gap-3 sm:gap-4 pt-2">
              <Link
                to="/about"
                className="inline-flex items-center justify-center gap-2 px-6 py-3.5 rounded-full bg-[#1b6b37] hover:bg-[#15542b] text-white font-bold text-sm shadow-md transition transform hover:-translate-y-0.5"
              >
                <span>{t.hero.exploreBtn}</span>
                <ArrowRight className="w-4 h-4" />
              </Link>

              <Link
                to="/activities"
                className="inline-flex items-center justify-center gap-2 px-6 py-3.5 rounded-full bg-white border border-slate-300 text-slate-700 font-bold text-sm shadow-xs hover:bg-slate-50 transition"
              >
                <Layers className="w-4 h-4 text-[#1b6b37]" />
                <span>{t.hero.workPackagesBtn}</span>
              </Link>

              <Link
                to="/virtual-lab"
                className="inline-flex items-center justify-center gap-2 px-6 py-3.5 rounded-full bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-sm shadow-md transition transform hover:-translate-y-0.5"
              >
                <Cpu className="w-4 h-4" />
                <span>{t.hero.virtualLabBtn}</span>
              </Link>
            </div>
          </div>

          {/* Key Metric Cards (NO GRANT BUDGET SUM) */}
          <div className="grid grid-cols-2 md:grid-cols-5 gap-3 sm:gap-4 mt-14 max-w-6xl mx-auto">
            <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-xs">
              <div className="flex items-center gap-2 text-brand-blue mb-2">
                <Users className="w-5 h-5" />
                <span className="text-[11px] font-bold uppercase tracking-wider text-slate-500">Consortium</span>
              </div>
              <div className="text-3xl font-black text-slate-900">6</div>
              <div className="text-xs text-slate-500 mt-1">{t.hero.statPartners}</div>
            </div>

            <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-xs">
              <div className="flex items-center gap-2 text-[#1b6b37] mb-2">
                <Calendar className="w-5 h-5" />
                <span className="text-[11px] font-bold uppercase tracking-wider text-slate-500">Duration</span>
              </div>
              <div className="text-3xl font-black text-slate-900">36</div>
              <div className="text-xs text-slate-500 mt-1">{t.hero.statDuration} (2026-2029)</div>
            </div>

            <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-xs">
              <div className="flex items-center gap-2 text-indigo-600 mb-2">
                <Layers className="w-5 h-5" />
                <span className="text-[11px] font-bold uppercase tracking-wider text-slate-500">Packages</span>
              </div>
              <div className="text-3xl font-black text-slate-900">6 WPs</div>
              <div className="text-xs text-slate-500 mt-1">{t.hero.statWPs}</div>
            </div>

            <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-xs">
              <div className="flex items-center gap-2 text-teal-600 mb-2">
                <Clock className="w-5 h-5" />
                <span className="text-[11px] font-bold uppercase tracking-wider text-slate-500">Effort</span>
              </div>
              <div className="text-3xl font-black text-slate-900">122</div>
              <div className="text-xs text-slate-500 mt-1">{t.hero.statEffort}</div>
            </div>

            <div className="col-span-2 md:col-span-1 bg-white p-5 rounded-2xl border border-slate-200 shadow-xs">
              <div className="flex items-center gap-2 text-amber-500 mb-2">
                <GraduationCap className="w-5 h-5" />
                <span className="text-[11px] font-bold uppercase tracking-wider text-slate-500">Target</span>
              </div>
              <div className="text-2xl sm:text-3xl font-black text-slate-900">500+</div>
              <div className="text-xs text-slate-500 mt-1">{t.hero.statParticipants}</div>
            </div>
          </div>
        </div>
      </section>

      {/* Abstract Spotlight */}
      <section className="max-w-7xl mx-auto px-4 sm:px-8">
        <div className="bg-white rounded-3xl border border-slate-200 p-8 sm:p-12 shadow-xs">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
            <div className="lg:col-span-8 space-y-4">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-50 text-[#1b6b37] text-xs font-bold uppercase tracking-wider">
                <BookOpen className="w-3.5 h-3.5" />
                <span>{t.about.tag}</span>
              </div>
              <h2 className="text-2xl sm:text-3xl font-black text-slate-900">
                {t.about.heading}
              </h2>
              <p className="text-slate-600 text-base leading-relaxed">
                {lang === 'uz' ? info?.abstractUz : info?.abstract}
              </p>
              <div className="pt-2">
                <Link
                  to="/about"
                  className="inline-flex items-center gap-1.5 font-bold text-sm text-[#1b6b37] hover:underline transition"
                >
                  <span>{t.hero.exploreBtn}</span>
                  <ArrowRight className="w-4 h-4" />
                </Link>
              </div>
            </div>

            <div className="lg:col-span-4 bg-slate-900 text-white p-6 sm:p-8 rounded-2xl space-y-3 text-xs sm:text-sm">
              <span className="text-yellow-400 font-bold uppercase text-xs">Erasmus+ Grant</span>
              <h3 className="text-xl font-black text-white">Project Passport</h3>
              <div className="pt-2 space-y-2 border-t border-slate-800">
                <div className="flex justify-between py-1">
                  <span className="text-slate-400">Number</span>
                  <span className="font-mono text-emerald-400 font-bold">101322962</span>
                </div>
                <div className="flex justify-between py-1">
                  <span className="text-slate-400">Coordinator</span>
                  <span className="text-sky-300 font-bold">AKHU (Urgench)</span>
                </div>
                <div className="flex justify-between py-1">
                  <span className="text-slate-400">Duration</span>
                  <span className="text-white">36 Months</span>
                </div>
                <div className="flex justify-between py-1">
                  <span className="text-slate-400">Action Type</span>
                  <span className="text-emerald-400 font-medium">ERASMUS-LS (Grant)</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Consortium Partners Preview */}
      <section className="max-w-7xl mx-auto px-4 sm:px-8">
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 mb-8">
          <div>
            <div className="text-xs font-bold uppercase tracking-wider text-[#1b6b37] mb-1">
              {t.partners.tag}
            </div>
            <h2 className="text-2xl sm:text-3xl font-black text-slate-900">
              {t.partners.heading}
            </h2>
          </div>
          <Link
            to="/partners"
            className="inline-flex items-center gap-1 text-sm font-bold text-[#1b6b37] hover:underline"
          >
            <span>Barcha hamkorlar</span>
            <ArrowRight className="w-4 h-4" />
          </Link>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {partners.slice(0, 6).map((p) => (
            <div
              key={p.id}
              className="bg-white rounded-2xl p-6 border border-slate-200 shadow-xs hover:border-slate-300 transition flex flex-col justify-between"
            >
              <div>
                <div className="flex items-center justify-between gap-2 mb-3">
                  <span className={`px-2.5 py-0.5 rounded-full text-xs font-bold ${
                    p.role === 'Coordinator'
                      ? 'bg-[#1b6b37] text-white'
                      : 'bg-emerald-50 text-emerald-700 border border-emerald-200'
                  }`}>
                    {p.badge}
                  </span>
                  <span className="text-xs font-mono font-bold text-slate-400">{p.shortName}</span>
                </div>
                <h3 className="font-bold text-lg text-slate-900 mb-2">{p.legalName}</h3>
                <p className="text-xs text-slate-500 leading-relaxed mb-4">{p.description}</p>
              </div>

              <div className="pt-3 border-t border-slate-100 flex items-center justify-between text-xs">
                <span className="text-slate-400">{p.city}, {p.country}</span>
                <a
                  href={p.website}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="font-bold text-[#1b6b37] hover:underline"
                >
                  Website →
                </a>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Latest News & Open Tenders */}
      <section className="max-w-7xl mx-auto px-4 sm:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          {/* News */}
          <div className="lg:col-span-7 space-y-6">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <Newspaper className="w-5 h-5 text-[#1b6b37]" />
                <h3 className="text-xl font-black text-slate-900">{t.news.heading}</h3>
              </div>
              <Link to="/news" className="text-xs font-bold text-[#1b6b37] hover:underline">
                Barchasi →
              </Link>
            </div>

            <div className="space-y-4">
              {news.slice(0, 3).map((item) => (
                <Link
                  key={item.id}
                  to={`/news/${item.slug}`}
                  className="block bg-white p-5 rounded-2xl border border-slate-200 hover:border-[#1b6b37]/50 hover:shadow-md transition"
                >
                  <div className="flex items-center justify-between text-xs text-slate-400 mb-1.5">
                    <span className="font-bold text-[#1b6b37] uppercase">{item.category}</span>
                    <span>{item.date}</span>
                  </div>
                  <h4 className="font-bold text-slate-900 text-base mb-1 hover:text-[#1b6b37] transition">
                    {lang === 'uz' ? item.titleUz : item.title}
                  </h4>
                  <p className="text-xs text-slate-600 line-clamp-2 leading-relaxed">
                    {lang === 'uz' ? item.summaryUz : item.summary}
                  </p>
                </Link>
              ))}
            </div>
          </div>

          {/* Open Tenders */}
          <div className="lg:col-span-5 space-y-6">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <FileBadge className="w-5 h-5 text-amber-600" />
                <h3 className="text-xl font-black text-slate-900">{t.tenders.heading}</h3>
              </div>
              <Link to="/tenders" className="text-xs font-bold text-amber-600 hover:underline">
                {lang === 'uz' ? "Barchasi →" : "View all →"}
              </Link>
            </div>

            <div className="space-y-4">
              {!tenders || tenders.length === 0 ? (
                <div className="bg-white p-6 rounded-2xl border border-slate-200/80 shadow-xs text-center py-8 space-y-3">
                  <div className="w-12 h-12 rounded-xl bg-amber-50 text-amber-600 flex items-center justify-center mx-auto border border-amber-100">
                    <Clock className="w-6 h-6" />
                  </div>
                  <div>
                    <h4 className="font-bold text-slate-900 text-sm">
                      {lang === 'uz' ? "Hozirda faol tenderlar mavjud emas" : "No active tenders at this time"}
                    </h4>
                    <p className="text-xs text-slate-500 mt-1 max-w-xs mx-auto">
                      {lang === 'uz' 
                        ? "Yangi tanlovlar va e'lonlar belgilangan tartibda ushbu bo'limda beriladi." 
                        : "Future calls and procurement notices will be officially published here."}
                    </p>
                  </div>
                  <Link
                    to="/tenders"
                    className="inline-block text-xs font-bold text-[#1b6b37] hover:underline pt-1"
                  >
                    {lang === 'uz' ? "Tenderlar sahifasi →" : "Tenders Page →"}
                  </Link>
                </div>
              ) : (
                tenders.slice(0, 2).map((tender) => (
                  <div
                    key={tender.id}
                    className="bg-white p-6 rounded-2xl border border-amber-200/80 shadow-xs space-y-3"
                  >
                    <div className="flex items-center justify-between">
                      <span className="px-2.5 py-0.5 rounded-full bg-emerald-100 text-emerald-800 text-[11px] font-bold">
                        {tender.status}
                      </span>
                      <span className="text-xs text-slate-400 font-mono">{tender.wp}</span>
                    </div>
                    <h4 className="font-bold text-slate-900 text-base">
                      {lang === 'uz' ? tender.titleUz : tender.title}
                    </h4>
                    <p className="text-xs text-slate-600 leading-relaxed line-clamp-2">
                      {lang === 'uz' ? tender.scopeUz : tender.scope}
                    </p>
                    <div className="pt-2 border-t border-slate-100 flex items-center justify-between">
                      <span className="text-xs text-slate-400">Deadline: {tender.deadline}</span>
                      <Link
                        to={`/tenders/${tender.slug}`}
                        className="px-3 py-1.5 rounded-lg bg-slate-900 text-white font-bold text-xs hover:bg-slate-800 transition"
                      >
                        {lang === 'uz' ? "Batafsil" : "Details"}
                      </Link>
                    </div>
                  </div>
                ))
              )}
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}

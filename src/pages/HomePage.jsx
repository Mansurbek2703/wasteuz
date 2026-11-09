import React from 'react';
import { Link } from 'react-router-dom';
import { 
  Award, 
  ArrowRight, 
  Layers, 
  Cpu, 
  Users, 
  Calendar, 
  Clock, 
  BookOpen, 
  Newspaper, 
  FileBadge, 
  GraduationCap, 
  ExternalLink,
  CheckCircle2,
  FolderGit2
} from 'lucide-react';

export default function HomePage({ t, lang, info, partners, workPackages, news, tenders }) {
  return (
    <div className="space-y-16 sm:space-y-24 pb-16">
      {/* Hero Section with Dark Tinted Glass Window Effect (Yomg'irdan keyingi tiniq, qoramtir shisha effekti) */}
      <section className="relative overflow-hidden pt-12 pb-20 lg:pt-18 lg:pb-28 border-b-2 border-emerald-600/40 bg-slate-950">
        {/* Background Image Layer with rich rain-washed contrast and saturation */}
        <div 
          className="absolute inset-0 bg-cover bg-center bg-no-repeat scale-[1.02] transform transition-transform duration-1000 filter brightness-[0.88] contrast-[1.18] saturate-[1.28]"
          style={{ backgroundImage: "url('/hero-bg.jpg')" }}
        />

        {/* Dark Tinted Glass Window Overlay (xuddi uy ichidan qoraytirilgan derazadan qaraganda ko'rinadigan qoramtir shisha effekti) */}
        <div className="absolute inset-0 glass-window-tint backdrop-blur-[2px]" />

        {/* Subtle glass reflection sheen across the window */}
        <div className="absolute inset-0 bg-gradient-to-tr from-emerald-500/10 via-transparent to-white/10 pointer-events-none" />

        <div className="relative max-w-7xl mx-auto px-4 sm:px-8">
          <div className="text-center max-w-4xl mx-auto space-y-6">
            {/* Grant Call Pill */}
            <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-slate-900/80 backdrop-blur-md shadow-lg border border-emerald-400/50 text-xs sm:text-sm font-semibold text-emerald-300">
              <span className="flex h-2.5 w-2.5 rounded-full bg-emerald-400 animate-ping" />
              <Award className="w-4 h-4 text-emerald-400" />
              <span className="text-emerald-300 font-bold">{t.hero.badge}</span>
              <span className="hidden sm:inline text-emerald-600">|</span>
              <span className="hidden sm:inline font-mono text-emerald-400 text-xs font-bold">ERASMUS-EDU-2026-CBHE</span>
            </div>

            {/* Main Title */}
            <h1 className="text-3xl sm:text-5xl lg:text-6xl font-black text-white tracking-tight leading-[1.15] drop-shadow-xl">
              {t.hero.title}
              <span className="block mt-2 bg-gradient-to-r from-emerald-400 via-green-300 to-teal-300 bg-clip-text text-transparent">
                WASTE-UZBEKISTAN
              </span>
            </h1>

            {/* Subtitle */}
            <p className="text-base sm:text-lg text-emerald-100/90 max-w-3xl mx-auto leading-relaxed font-medium drop-shadow-md">
              {t.hero.subTitle}
            </p>

            {/* Action Buttons */}
            <div className="flex flex-wrap items-center justify-center gap-3 sm:gap-4 pt-3">
              <Link
                to="/about"
                className="inline-flex items-center justify-center gap-2 px-6 py-3.5 rounded-full bg-[#1b6b37] hover:bg-[#14532b] text-white font-bold text-sm shadow-xl shadow-black/40 transition transform hover:-translate-y-0.5 border-2 border-emerald-400"
              >
                <span>{t.hero.exploreBtn}</span>
                <ArrowRight className="w-4 h-4" />
              </Link>

              <Link
                to="/activities"
                className="inline-flex items-center justify-center gap-2 px-6 py-3.5 rounded-full bg-slate-900/80 backdrop-blur-md hover:bg-slate-800 text-white border-2 border-emerald-400/60 font-bold text-sm shadow-lg shadow-black/30 transition transform hover:-translate-y-0.5"
              >
                <Layers className="w-4 h-4 text-emerald-400" />
                <span>{t.hero.workPackagesBtn}</span>
              </Link>

              <Link
                to="/virtual-lab"
                className="inline-flex items-center justify-center gap-2 px-6 py-3.5 rounded-full bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-sm shadow-xl shadow-black/40 transition transform hover:-translate-y-0.5 border-2 border-emerald-300"
              >
                <Cpu className="w-4 h-4" />
                <span>{t.hero.virtualLabBtn}</span>
              </Link>
            </div>
          </div>

          {/* Key Metric Cards (Tinted Glass Cards) */}
          <div className="grid grid-cols-2 md:grid-cols-5 gap-3 sm:gap-4 mt-12 max-w-6xl mx-auto">
            <div className="glass-card-dark p-5 rounded-2xl transition transform hover:-translate-y-1">
              <div className="flex items-center gap-2 text-emerald-400 mb-2">
                <Users className="w-5 h-5" />
                <span className="text-[11px] font-bold uppercase tracking-wider text-emerald-300">Consortium</span>
              </div>
              <div className="text-3xl font-black text-white">6</div>
              <div className="text-xs text-slate-300 mt-1 font-medium">{t.hero.statPartners}</div>
            </div>

            <div className="glass-card-dark p-5 rounded-2xl transition transform hover:-translate-y-1">
              <div className="flex items-center gap-2 text-emerald-400 mb-2">
                <Calendar className="w-5 h-5" />
                <span className="text-[11px] font-bold uppercase tracking-wider text-emerald-300">Duration</span>
              </div>
              <div className="text-3xl font-black text-white">36</div>
              <div className="text-xs text-slate-300 mt-1 font-medium">{t.hero.statDuration} (2026-2029)</div>
            </div>

            <div className="glass-card-dark p-5 rounded-2xl transition transform hover:-translate-y-1">
              <div className="flex items-center gap-2 text-emerald-400 mb-2">
                <Layers className="w-5 h-5" />
                <span className="text-[11px] font-bold uppercase tracking-wider text-emerald-300">Packages</span>
              </div>
              <div className="text-3xl font-black text-white">6 WPs</div>
              <div className="text-xs text-slate-300 mt-1 font-medium">{t.hero.statWPs}</div>
            </div>

            <div className="glass-card-dark p-5 rounded-2xl transition transform hover:-translate-y-1">
              <div className="flex items-center gap-2 text-emerald-400 mb-2">
                <Clock className="w-5 h-5" />
                <span className="text-[11px] font-bold uppercase tracking-wider text-emerald-300">Effort</span>
              </div>
              <div className="text-3xl font-black text-white">122</div>
              <div className="text-xs text-slate-300 mt-1 font-medium">{t.hero.statEffort}</div>
            </div>

            <div className="col-span-2 md:col-span-1 glass-card-dark p-5 rounded-2xl transition transform hover:-translate-y-1">
              <div className="flex items-center gap-2 text-emerald-400 mb-2">
                <GraduationCap className="w-5 h-5" />
                <span className="text-[11px] font-bold uppercase tracking-wider text-emerald-300">Target</span>
              </div>
              <div className="text-2xl sm:text-3xl font-black text-white">500+</div>
              <div className="text-xs text-slate-300 mt-1 font-medium">{t.hero.statParticipants}</div>
            </div>
          </div>
        </div>
      </section>

      {/* Abstract Spotlight */}
      <section className="max-w-7xl mx-auto px-4 sm:px-8">
        <div className="bg-white rounded-3xl border-2 border-emerald-500/30 p-8 sm:p-12 shadow-xs hover:border-emerald-500/50 transition">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
            <div className="lg:col-span-8 space-y-4">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-50 text-[#1b6b37] text-xs font-bold uppercase tracking-wider border border-emerald-200">
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

            <div className="lg:col-span-4 bg-gradient-to-br from-[#0c2e17] via-slate-900 to-[#0c2e17] text-white p-6 sm:p-8 rounded-2xl space-y-3 text-xs sm:text-sm border-2 border-emerald-500/40 shadow-md">
              <span className="text-yellow-400 font-bold uppercase text-xs">Erasmus+ Grant</span>
              <h3 className="text-xl font-black text-white">Project Passport</h3>
              <div className="pt-2 space-y-2 border-t border-emerald-900/60">
                <div className="flex justify-between py-1">
                  <span className="text-slate-300">Number</span>
                  <span className="font-mono text-emerald-400 font-bold">101322962</span>
                </div>
                <div className="flex justify-between py-1">
                  <span className="text-slate-300">Coordinator</span>
                  <span className="text-sky-300 font-bold">Al-Khwarizmi University</span>
                </div>
                <div className="flex justify-between py-1">
                  <span className="text-slate-300">Duration</span>
                  <span className="text-white">36 Months</span>
                </div>
                <div className="flex justify-between py-1">
                  <span className="text-slate-300">Action Type</span>
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
            <span>{lang === 'uz' ? "Barcha hamkorlar" : "All Partners"}</span>
            <ArrowRight className="w-4 h-4" />
          </Link>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {partners.slice(0, 6).map((p) => (
            <div
              key={p.id}
              className="bg-white rounded-2xl p-6 border-2 border-emerald-500/25 shadow-xs hover:border-[#1b6b37] hover:shadow-md transition flex flex-col justify-between"
            >
              <div>
                <div className="flex items-center justify-between gap-2 mb-3">
                  <span className={`px-2.5 py-0.5 rounded-full text-xs font-bold ${
                    p.role === 'Coordinator'
                      ? 'bg-[#1b6b37] text-white border border-[#1b6b37]'
                      : 'bg-emerald-50 text-emerald-800 border border-emerald-300'
                  }`}>
                    {p.badge}
                  </span>
                  <span className="text-xs font-mono font-bold text-slate-400">{p.shortName}</span>
                </div>
                <h3 className="font-bold text-lg text-slate-900 mb-2">{p.legalName}</h3>
                <p className="text-xs text-slate-600 leading-relaxed mb-4">{p.description}</p>
              </div>

              <div className="pt-3 border-t border-emerald-100 flex items-center justify-between text-xs">
                <span className="text-slate-500 font-medium">{p.city}, {p.country}</span>
                <a
                  href={p.website}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="font-bold text-[#1b6b37] hover:underline inline-flex items-center gap-1"
                >
                  <span>Website</span>
                  <ExternalLink className="w-3 h-3" />
                </a>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Work Packages Preview (Official Activities WP1-WP6) */}
      <section className="max-w-7xl mx-auto px-4 sm:px-8">
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 mb-8">
          <div>
            <div className="text-xs font-bold uppercase tracking-wider text-[#1b6b37] mb-1">
              {t.wps.tag}
            </div>
            <h2 className="text-2xl sm:text-3xl font-black text-slate-900">
              {t.wps.heading}
            </h2>
          </div>
          <Link
            to="/activities"
            className="inline-flex items-center gap-1 text-sm font-bold text-[#1b6b37] hover:underline"
          >
            <span>{lang === 'uz' ? "Barcha ish paketlari" : "View All Packages"}</span>
            <ArrowRight className="w-4 h-4" />
          </Link>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {workPackages?.slice(0, 6).map((wp) => (
            <div
              key={wp.id}
              className="bg-white rounded-2xl p-6 border-2 border-emerald-500/25 shadow-xs hover:border-[#1b6b37] hover:shadow-md transition flex flex-col justify-between"
            >
              <div>
                <div className="flex items-center justify-between gap-2 mb-3">
                  <span className="px-2.5 py-0.5 rounded-full text-xs font-bold bg-[#1b6b37] text-white">
                    {wp.code}
                  </span>
                  <span className="text-xs font-bold text-emerald-800 bg-emerald-50 px-2 py-0.5 rounded-md border border-emerald-200">
                    {wp.lead}
                  </span>
                </div>
                <h3 className="font-bold text-base text-slate-900 mb-2">
                  {lang === 'uz' ? wp.titleUz : wp.title}
                </h3>
                <p className="text-xs text-slate-600 leading-relaxed mb-4 line-clamp-3">
                  {lang === 'uz' ? wp.descriptionUz : wp.description}
                </p>
              </div>

              <div className="pt-3 border-t border-emerald-100 flex items-center justify-between text-xs text-slate-500">
                <span>{wp.duration}</span>
                <span className="font-semibold text-emerald-800">{wp.effort}</span>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Virtual Lab Interactive Feature Banner */}
      <section className="max-w-7xl mx-auto px-4 sm:px-8">
        <div className="bg-gradient-to-r from-emerald-50 via-white to-emerald-50/70 rounded-3xl border-2 border-emerald-500/35 p-8 sm:p-10 shadow-xs">
          <div className="flex flex-col lg:flex-row items-center justify-between gap-8">
            <div className="space-y-3 max-w-2xl">
              <div className="flex flex-wrap items-center gap-2">
                <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#1b6b37] text-white text-xs font-bold uppercase tracking-wider">
                  <Cpu className="w-3.5 h-3.5" />
                  <span>{t.virtualLab.tag}</span>
                </div>
                <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-amber-50 text-amber-800 text-xs font-bold border border-amber-300">
                  <span className="w-2 h-2 rounded-full bg-amber-500 animate-pulse" />
                  <span>{lang === 'uz' ? "Hozirda ishlab chiqish jarayonida" : "Under Development"}</span>
                </div>
              </div>
              <h3 className="text-2xl sm:text-3xl font-black text-slate-900">
                {t.virtualLab.heading}
              </h3>
              <p className="text-slate-600 text-sm sm:text-base leading-relaxed">
                {t.virtualLab.subheading}
              </p>
            </div>
            <Link
              to="/virtual-lab"
              className="inline-flex items-center gap-2 px-7 py-3.5 rounded-full bg-[#1b6b37] hover:bg-[#14532b] text-white font-bold text-sm shadow-md transition transform hover:-translate-y-0.5 border-2 border-emerald-700 whitespace-nowrap flex-shrink-0"
            >
              <span>{t.hero.virtualLabBtn}</span>
              <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
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
                {lang === 'uz' ? "Barchasi →" : "View all →"}
              </Link>
            </div>

            <div className="space-y-4">
              {news.slice(0, 3).map((item) => (
                <Link
                  key={item.id}
                  to={`/news/${item.slug}`}
                  className="block bg-white p-5 rounded-2xl border-2 border-emerald-500/25 hover:border-[#1b6b37] hover:shadow-md transition"
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
                <FileBadge className="w-5 h-5 text-[#1b6b37]" />
                <h3 className="text-xl font-black text-slate-900">{t.tenders.heading}</h3>
              </div>
              <Link to="/tenders" className="text-xs font-bold text-[#1b6b37] hover:underline">
                {lang === 'uz' ? "Barchasi →" : "View all →"}
              </Link>
            </div>

            <div className="space-y-4">
              {!tenders || tenders.length === 0 ? (
                <div className="bg-white p-6 rounded-2xl border-2 border-emerald-500/25 shadow-xs text-center py-8 space-y-3">
                  <div className="w-12 h-12 rounded-xl bg-emerald-50 text-[#1b6b37] flex items-center justify-center mx-auto border border-emerald-200">
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
                    className="bg-white p-6 rounded-2xl border-2 border-emerald-500/25 shadow-xs space-y-3"
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
                    <div className="pt-2 border-t border-emerald-100 flex items-center justify-between">
                      <span className="text-xs text-slate-400">Deadline: {tender.deadline}</span>
                      <Link
                        to={`/tenders/${tender.slug}`}
                        className="px-3 py-1.5 rounded-lg bg-[#1b6b37] text-white font-bold text-xs hover:bg-[#14532b] transition"
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

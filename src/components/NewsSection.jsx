import React, { useState } from 'react';
import { Newspaper, Calendar, Tag, ArrowRight, User } from 'lucide-react';

export default function NewsSection({ t, lang, news, onSelectArticle }) {
  const [filter, setFilter] = useState('All');

  const categories = ['All', 'Project News', 'Tenders & Vacancies', 'Events'];

  const filteredNews = news.filter((item) => {
    if (filter === 'All') return true;
    return item.category === filter;
  });

  return (
    <section id="news" className="py-16 sm:py-24 bg-white border-b border-slate-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-8">
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12">
          <div>
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-sky-100 text-brand-blue-dark text-xs font-semibold uppercase tracking-wider mb-3">
              <Newspaper className="w-3.5 h-3.5" />
              <span>{t.news.tag}</span>
            </div>
            <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-900 tracking-tight">
              {t.news.heading}
            </h2>
          </div>

          {/* Filter Pills */}
          <div className="flex flex-wrap gap-2">
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => setFilter(cat)}
                className={`px-3.5 py-1.5 rounded-xl text-xs font-semibold transition ${
                  filter === cat
                    ? 'bg-brand-blue text-white shadow-xs'
                    : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
                }`}
              >
                {cat === 'All' ? t.news.filterAll : cat}
              </button>
            ))}
          </div>
        </div>

        {/* News Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
          {filteredNews.map((item) => (
            <article
              key={item.id}
              className="flex flex-col justify-between bg-white rounded-2xl border border-slate-200 overflow-hidden hover:shadow-lg hover:border-slate-300 transition duration-200 group"
            >
              <div>
                {/* Image Banner */}
                <div className="h-44 bg-slate-100 relative overflow-hidden flex items-center justify-center p-4">
                  <img
                    src={item.image || '/logo.jpg'}
                    alt={item.title}
                    className="h-28 w-auto object-contain group-hover:scale-105 transition duration-300"
                  />
                  <div className="absolute top-3 right-3">
                    <span className="px-2.5 py-1 rounded-md bg-white/95 text-slate-700 font-bold text-[11px] shadow-xs border border-slate-200">
                      {item.category}
                    </span>
                  </div>
                </div>

                {/* Content */}
                <div className="p-6">
                  <div className="flex items-center gap-4 text-xs text-slate-400 mb-3 font-medium">
                    <span className="flex items-center gap-1">
                      <Calendar className="w-3.5 h-3.5" />
                      {item.date}
                    </span>
                    <span className="flex items-center gap-1">
                      <User className="w-3.5 h-3.5" />
                      {item.author}
                    </span>
                  </div>

                  <h3 className="font-bold text-lg text-slate-900 group-hover:text-brand-blue transition line-clamp-2 mb-2">
                    {lang === 'uz' ? item.titleUz : item.title}
                  </h3>

                  <p className="text-sm text-slate-600 line-clamp-3 leading-relaxed">
                    {lang === 'uz' ? item.summaryUz : item.summary}
                  </p>
                </div>
              </div>

              {/* Action */}
              <div className="p-6 pt-0 border-t border-slate-100 mt-2">
                <button
                  onClick={() => onSelectArticle(item)}
                  className="inline-flex items-center gap-1.5 text-xs font-bold text-brand-blue hover:text-brand-blue-dark pt-3 transition"
                >
                  <span>{t.news.readMore}</span>
                  <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition" />
                </button>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}


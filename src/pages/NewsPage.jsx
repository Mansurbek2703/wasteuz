import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Newspaper, Calendar, User, Search, ArrowRight } from 'lucide-react';

export default function NewsPage({ t, lang, news }) {
  const [filter, setFilter] = useState('All');
  const [search, setSearch] = useState('');

  const categories = ['All', 'Project News', 'Tenders & Vacancies', 'Events'];

  const filteredNews = news.filter((item) => {
    const matchCat = filter === 'All' || item.category === filter;
    const title = (lang === 'uz' ? item.titleUz : item.title) || '';
    const matchSearch = title.toLowerCase().includes(search.toLowerCase());
    return matchCat && matchSearch;
  });

  return (
    <div className="py-12 sm:py-16 space-y-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-8">
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
          <div className="max-w-2xl">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-sky-100 text-brand-blue-dark text-xs font-bold uppercase tracking-wider mb-3">
              <Newspaper className="w-3.5 h-3.5" />
              <span>{t.news.tag}</span>
            </div>
            <h1 className="text-3xl sm:text-5xl font-black text-slate-900 tracking-tight">
              {t.news.heading}
            </h1>
          </div>

          {/* Search bar */}
          <div className="w-full md:w-72 relative">
            <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              placeholder="Qidiruv..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="w-full pl-10 pr-4 py-2.5 rounded-xl border border-slate-200 bg-white text-sm focus:outline-hidden focus:ring-2 focus:ring-brand-blue"
            />
          </div>
        </div>

        {/* Filter pills */}
        <div className="flex flex-wrap gap-2 mt-6">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setFilter(cat)}
              className={`px-4 py-2 rounded-xl text-xs font-bold transition ${
                filter === cat
                  ? 'bg-brand-blue text-white shadow-xs'
                  : 'bg-white text-slate-600 border border-slate-200 hover:bg-slate-50'
              }`}
            >
              {cat === 'All' ? t.news.filterAll : cat}
            </button>
          ))}
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-8">
        {filteredNews.length === 0 ? (
          <div className="text-center py-16 bg-white rounded-3xl border border-slate-200 text-slate-500">
            Hech qanday yangilik topilmadi.
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
            {filteredNews.map((item) => (
              <article
                key={item.id}
                className="flex flex-col justify-between bg-white rounded-3xl border border-slate-200 overflow-hidden hover:shadow-lg transition duration-200 group"
              >
                <div>
                  <div className="h-48 bg-slate-50 relative overflow-hidden flex items-center justify-center p-4 border-b border-slate-100">
                    <img
                      src={item.image || '/logo.jpg'}
                      alt={item.title}
                      className="h-32 w-auto object-contain group-hover:scale-105 transition duration-300"
                    />
                    <div className="absolute top-3 right-3">
                      <span className="px-2.5 py-1 rounded-md bg-white text-slate-700 font-bold text-[11px] shadow-xs border border-slate-200">
                        {item.category}
                      </span>
                    </div>
                  </div>

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

                    <h2 className="font-bold text-lg text-slate-900 group-hover:text-brand-blue transition line-clamp-2 mb-2">
                      {lang === 'uz' ? item.titleUz : item.title}
                    </h2>

                    <p className="text-sm text-slate-600 line-clamp-3 leading-relaxed">
                      {lang === 'uz' ? item.summaryUz : item.summary}
                    </p>
                  </div>
                </div>

                <div className="p-6 pt-0 border-t border-slate-100 mt-2">
                  <Link
                    to={`/news/${item.slug}`}
                    className="inline-flex items-center gap-1.5 text-xs font-bold text-brand-blue hover:text-brand-blue-dark pt-3 transition"
                  >
                    <span>{t.news.readMore}</span>
                    <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition" />
                  </Link>
                </div>
              </article>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

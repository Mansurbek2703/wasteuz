import React from 'react';
import { useParams, Link } from 'react-router-dom';
import { ArrowLeft, Calendar, User, Tag, Share2 } from 'lucide-react';

export default function NewsDetailPage({ news, lang }) {
  const { slug } = useParams();
  const article = news.find((n) => n.slug === slug || n.id === slug);

  if (!article) {
    return (
      <div className="py-24 text-center max-w-xl mx-auto px-4">
        <h2 className="text-2xl font-bold text-slate-800 mb-3">Maqola topilmadi</h2>
        <p className="text-slate-500 mb-6">Ushbu e'lon mavjud emas yoki o'chirilgan bo'lishi mumkin.</p>
        <Link to="/news" className="px-5 py-2.5 rounded-xl bg-brand-blue text-white font-bold text-sm">
          Yangiliklar ro'yxatiga qaytish
        </Link>
      </div>
    );
  }

  return (
    <div className="py-12 sm:py-16">
      <div className="max-w-4xl mx-auto px-4 sm:px-8 space-y-8">
        <Link
          to="/news"
          className="inline-flex items-center gap-2 text-xs font-bold text-slate-500 hover:text-brand-blue transition"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>Barcha yangiliklar</span>
        </Link>

        {/* Header */}
        <div className="space-y-4">
          <div className="flex items-center gap-2">
            <span className="px-3 py-1 rounded-full bg-sky-100 text-brand-blue-dark font-bold text-xs">
              {article.category}
            </span>
            <span className="text-xs text-slate-400">•</span>
            <span className="flex items-center gap-1 text-xs text-slate-500">
              <Calendar className="w-3.5 h-3.5" />
              {article.date}
            </span>
            <span className="text-xs text-slate-400">•</span>
            <span className="flex items-center gap-1 text-xs text-slate-500">
              <User className="w-3.5 h-3.5" />
              {article.author}
            </span>
          </div>

          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-black text-slate-900 leading-tight">
            {lang === 'uz' ? article.titleUz : article.title}
          </h1>
        </div>

        {/* Image */}
        {article.image && (
          <div className="h-72 sm:h-96 w-full rounded-3xl overflow-hidden bg-slate-100 border border-slate-200 flex items-center justify-center p-6">
            <img
              src={article.image}
              alt={article.title}
              className="h-4/5 w-auto object-contain"
            />
          </div>
        )}

        {/* Summary box */}
        <div className="p-6 rounded-2xl bg-sky-50/70 border border-sky-100 text-slate-700 text-base sm:text-lg font-medium leading-relaxed">
          {lang === 'uz' ? article.summaryUz : article.summary}
        </div>

        {/* Full Content */}
        <div className="prose max-w-none text-slate-700 text-base sm:text-lg leading-relaxed space-y-4">
          <p>{article.content}</p>
        </div>

        {/* Footer info */}
        <div className="pt-8 border-t border-slate-200 flex items-center justify-between text-xs text-slate-500">
          <span>Erasmus+ Project 101322962 (WASTE-UZ)</span>
          <button
            onClick={() => {
              if (navigator.share) {
                navigator.share({ title: article.title, url: window.location.href });
              } else {
                navigator.clipboard.writeText(window.location.href);
                alert("Havola nusxalandi!");
              }
            }}
            className="inline-flex items-center gap-1.5 font-bold text-brand-blue hover:underline"
          >
            <Share2 className="w-4 h-4" />
            <span>Ulashish</span>
          </button>
        </div>
      </div>
    </div>
  );
}

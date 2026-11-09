import React from 'react';
import { useParams, Link } from 'react-router-dom';
import { ArrowLeft, Calendar, User, Share2 } from 'lucide-react';

export default function NewsDetailPage({ news, lang }) {
  const { slug } = useParams();
  const article = news.find((n) => n.slug === slug || n.id === slug);

  if (!article) {
    return (
      <div className="py-24 text-center max-w-xl mx-auto px-4">
        <h2 className="text-2xl font-bold text-slate-800 mb-3">
          {lang === 'uz' ? "Maqola topilmadi" : "Article Not Found"}
        </h2>
        <p className="text-slate-500 mb-6">
          {lang === 'uz' ? "Ushbu e'lon mavjud emas yoki o'chirilgan bo'lishi mumkin." : "This announcement does not exist or has been removed."}
        </p>
        <Link to="/news" className="px-5 py-2.5 rounded-xl bg-[#1b6b37] hover:bg-[#14532b] text-white font-bold text-sm">
          {lang === 'uz' ? "Yangiliklar ro'yxatiga qaytish" : "Back to News"}
        </Link>
      </div>
    );
  }

  return (
    <div className="py-12 sm:py-16">
      <div className="max-w-4xl mx-auto px-4 sm:px-8 space-y-8">
        <Link
          to="/news"
          className="inline-flex items-center gap-2 text-xs font-bold text-slate-500 hover:text-[#1b6b37] transition"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>{lang === 'uz' ? "Barcha yangiliklar" : "All News"}</span>
        </Link>

        {/* Header */}
        <div className="space-y-4">
          <div className="flex items-center gap-2">
            <span className="px-3 py-1 rounded-full bg-emerald-100 text-emerald-800 font-bold text-xs border border-emerald-200">
              {article.category}
            </span>
            <span className="text-xs text-slate-400">•</span>
            <span className="flex items-center gap-1 text-xs text-slate-500">
              <Calendar className="w-3.5 h-3.5 text-[#1b6b37]" />
              {article.date}
            </span>
            <span className="text-xs text-slate-400">•</span>
            <span className="flex items-center gap-1 text-xs text-slate-500">
              <User className="w-3.5 h-3.5 text-[#1b6b37]" />
              {article.author}
            </span>
          </div>

          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-black text-slate-900 leading-tight">
            {lang === 'uz' ? article.titleUz : article.title}
          </h1>
        </div>

        {/* Image */}
        {article.image && (
          <div className="h-72 sm:h-96 w-full rounded-3xl overflow-hidden bg-white border-2 border-emerald-500/25 flex items-center justify-center p-6 shadow-xs">
            <img
              src={article.image}
              alt={article.title}
              className="h-4/5 w-auto object-contain"
            />
          </div>
        )}

        {/* Summary box */}
        <div className="p-6 rounded-2xl bg-emerald-50/60 border-2 border-emerald-200 text-slate-800 text-base sm:text-lg font-medium leading-relaxed">
          {lang === 'uz' ? article.summaryUz : article.summary}
        </div>

        {/* Full Content */}
        <div className="prose max-w-none text-slate-700 text-base sm:text-lg leading-relaxed space-y-4">
          <p>{article.content}</p>
        </div>

        {/* Footer info */}
        <div className="pt-8 border-t border-emerald-100 flex items-center justify-between text-xs text-slate-500">
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
            className="inline-flex items-center gap-1.5 font-bold text-[#1b6b37] hover:underline"
          >
            <Share2 className="w-4 h-4" />
            <span>{lang === 'uz' ? "Ulashish" : "Share"}</span>
          </button>
        </div>
      </div>
    </div>
  );
}

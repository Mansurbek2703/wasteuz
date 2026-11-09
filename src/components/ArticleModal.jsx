import React from 'react';
import { X, Calendar, User, Tag } from 'lucide-react';

export default function ArticleModal({ article, onClose, lang }) {
  if (!article) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-xs animate-fadeIn">
      <div className="bg-white rounded-3xl max-w-2xl w-full max-h-[90vh] overflow-y-auto shadow-2xl border border-slate-200">
        <div className="sticky top-0 bg-white/95 backdrop-blur px-6 py-4 border-b border-slate-100 flex items-center justify-between z-10">
          <span className="text-xs font-bold uppercase tracking-wider text-brand-blue">
            {article.category}
          </span>
          <button
            onClick={onClose}
            className="p-1.5 rounded-full hover:bg-slate-100 text-slate-500 hover:text-slate-800 transition"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        <div className="p-6 sm:p-8 space-y-4">
          <div className="flex items-center gap-4 text-xs text-slate-400 font-medium">
            <span className="flex items-center gap-1">
              <Calendar className="w-3.5 h-3.5" />
              {article.date}
            </span>
            <span className="flex items-center gap-1">
              <User className="w-3.5 h-3.5" />
              {article.author}
            </span>
          </div>

          <h2 className="text-2xl sm:text-3xl font-black text-slate-900 leading-tight">
            {lang === 'uz' ? article.titleUz : article.title}
          </h2>

          <div className="py-2">
            <p className="text-slate-700 font-medium text-base leading-relaxed bg-slate-50 p-4 rounded-xl border border-slate-200">
              {lang === 'uz' ? article.summaryUz : article.summary}
            </p>
          </div>

          <div className="text-slate-600 text-sm sm:text-base leading-relaxed space-y-3 pt-2">
            <p>{article.content}</p>
          </div>

          <div className="pt-6 border-t border-slate-100 flex justify-end">
            <button
              onClick={onClose}
              className="px-5 py-2.5 rounded-xl bg-slate-900 text-white font-bold text-xs hover:bg-slate-800 transition"
            >
              Close
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

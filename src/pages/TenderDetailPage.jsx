import React, { useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { ArrowLeft, Calendar, Coins, CheckCircle2, Send, AlertCircle } from 'lucide-react';

export default function TenderDetailPage({ tenders, lang, t }) {
  const { slug } = useParams();
  const tender = tenders.find((item) => item.slug === slug || item.id === slug);

  const [formData, setFormData] = useState({ name: '', email: '', phone: '', proposal: '' });
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);

  if (!tender) {
    return (
      <div className="py-24 text-center max-w-xl mx-auto px-4">
        <h2 className="text-2xl font-bold text-slate-800 mb-3">Tender topilmadi</h2>
        <Link to="/tenders" className="px-5 py-2.5 rounded-xl bg-brand-blue text-white font-bold text-sm">
          Tenderlar ro'yxatiga qaytish
        </Link>
      </div>
    );
  }

  const handleApply = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          name: formData.name,
          email: formData.email,
          institution: formData.phone,
          subject: `Tender Application: ${tender.title}`,
          message: formData.proposal
        })
      });
      setSubmitted(true);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="py-12 sm:py-16">
      <div className="max-w-4xl mx-auto px-4 sm:px-8 space-y-8">
        <Link
          to="/tenders"
          className="inline-flex items-center gap-2 text-xs font-bold text-slate-500 hover:text-brand-blue transition"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>Barcha tenderlar</span>
        </Link>

        {/* Header */}
        <div className="bg-white rounded-3xl p-8 border border-slate-200 shadow-xs space-y-4">
          <div className="flex items-center justify-between gap-4">
            <span className="px-3 py-1 rounded-full bg-emerald-100 text-emerald-800 text-xs font-bold">
              {tender.status}
            </span>
            <span className="text-xs font-mono font-bold text-slate-400">{tender.wp}</span>
          </div>

          <h1 className="text-2xl sm:text-4xl font-black text-slate-900 leading-tight">
            {lang === 'uz' ? tender.titleUz : tender.title}
          </h1>

          <div className="grid grid-cols-2 sm:grid-cols-3 gap-4 pt-4 border-t border-slate-100">
            <div>
              <span className="text-[11px] font-bold text-slate-400 uppercase tracking-wider block">Byudjet:</span>
              <span className="text-xl font-black text-amber-700">{tender.budget}</span>
            </div>
            <div>
              <span className="text-[11px] font-bold text-slate-400 uppercase tracking-wider block">Oxirgi muddat:</span>
              <span className="text-sm font-bold text-slate-800">{tender.deadline}</span>
            </div>
            <div>
              <span className="text-[11px] font-bold text-slate-400 uppercase tracking-wider block">Loyiha:</span>
              <span className="text-sm font-bold text-brand-blue">WASTE-UZ (101322962)</span>
            </div>
          </div>
        </div>

        {/* Scope and Requirements */}
        <div className="bg-white rounded-3xl p-8 border border-slate-200 shadow-xs space-y-6">
          <div>
            <h2 className="text-lg font-black text-slate-900 mb-2">Vazifa doirasi (Scope of Work):</h2>
            <p className="text-slate-700 text-sm sm:text-base leading-relaxed">
              {lang === 'uz' ? tender.scopeUz : tender.scope}
            </p>
          </div>

          {tender.requirements && (
            <div>
              <h2 className="text-lg font-black text-slate-900 mb-3">Talablar (Requirements):</h2>
              <ul className="space-y-2">
                {tender.requirements.map((req, i) => (
                  <li key={i} className="flex items-start gap-2.5 text-slate-700 text-sm">
                    <CheckCircle2 className="w-4 h-4 text-emerald-600 flex-shrink-0 mt-0.5" />
                    <span>{req}</span>
                  </li>
                ))}
              </ul>
            </div>
          )}
        </div>

        {/* Application Form */}
        <div className="bg-slate-900 text-white rounded-3xl p-8 sm:p-10 shadow-xl space-y-6">
          <div>
            <h2 className="text-2xl font-black text-white">Tender arizasini topshirish</h2>
            <p className="text-xs sm:text-sm text-slate-400 mt-1">
              O'z taklifingiz va ma'lumotlaringizni to'ldiring. WASTE-UZ boshqaruv komissiyasi ko'rib chiqadi.
            </p>
          </div>

          {submitted ? (
            <div className="p-4 rounded-2xl bg-emerald-900/60 border border-emerald-500 text-emerald-300 text-sm flex items-center gap-3">
              <CheckCircle2 className="w-5 h-5 text-emerald-400 flex-shrink-0" />
              <span>Arizangiz muvaffaqiyatli qabul qilindi. Siz bilan bog'lanamiz!</span>
            </div>
          ) : (
            <form onSubmit={handleApply} className="space-y-4 text-xs sm:text-sm">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-slate-300 font-bold mb-1">To'liq ism / Tashkilot *</label>
                  <input
                    type="text"
                    required
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    className="w-full px-4 py-2.5 rounded-xl bg-slate-800 border border-slate-700 text-white focus:outline-hidden focus:border-brand-blue"
                  />
                </div>
                <div>
                  <label className="block text-slate-300 font-bold mb-1">Elektron pochta *</label>
                  <input
                    type="email"
                    required
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    className="w-full px-4 py-2.5 rounded-xl bg-slate-800 border border-slate-700 text-white focus:outline-hidden focus:border-brand-blue"
                  />
                </div>
              </div>

              <div>
                <label className="block text-slate-300 font-bold mb-1">Telefon / Telegram</label>
                <input
                  type="text"
                  value={formData.phone}
                  onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                  className="w-full px-4 py-2.5 rounded-xl bg-slate-800 border border-slate-700 text-white focus:outline-hidden focus:border-brand-blue"
                />
              </div>

              <div>
                <label className="block text-slate-300 font-bold mb-1">Taklif tavsifi va malaka *</label>
                <textarea
                  required
                  rows={4}
                  value={formData.proposal}
                  onChange={(e) => setFormData({ ...formData, proposal: e.target.value })}
                  className="w-full px-4 py-2.5 rounded-xl bg-slate-800 border border-slate-700 text-white focus:outline-hidden focus:border-brand-blue"
                  placeholder="Tajribangiz va tender bo'yicha taklifingiz..."
                />
              </div>

              <button
                type="submit"
                disabled={loading}
                className="inline-flex items-center gap-2 px-8 py-3 rounded-xl bg-brand-blue hover:bg-brand-blue-dark text-white font-bold transition disabled:opacity-50"
              >
                <Send className="w-4 h-4" />
                <span>{loading ? 'Yuborilmoqda...' : 'Arizani yuborish'}</span>
              </button>
            </form>
          )}
        </div>
      </div>
    </div>
  );
}

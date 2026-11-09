import React, { useState } from 'react';
import { Mail, MapPin, Globe, Send, CheckCircle2, AlertCircle } from 'lucide-react';

export default function ContactPage({ t, lang }) {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    institution: '',
    subject: '',
    message: ''
  });
  const [loading, setLoading] = useState(false);
  const [status, setStatus] = useState(null);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setStatus(null);

    try {
      const res = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData)
      });
      const data = await res.json();
      if (res.ok && data.success) {
        setStatus('success');
        setFormData({ name: '', email: '', institution: '', subject: '', message: '' });
      } else {
        setStatus('error');
      }
    } catch (err) {
      console.error(err);
      setStatus('error');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="py-12 sm:py-16 space-y-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-8">
        <div className="max-w-3xl">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-50 text-[#1b6b37] text-xs font-bold uppercase tracking-wider mb-3 border border-emerald-200">
            <Mail className="w-3.5 h-3.5" />
            <span>{t.contact.tag}</span>
          </div>
          <h1 className="text-3xl sm:text-5xl font-black text-slate-900 tracking-tight">
            {t.contact.heading}
          </h1>
          <p className="mt-4 text-slate-600 text-base sm:text-lg">
            {t.contact.subheading}
          </p>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-start">
          {/* Contact Details Card */}
          <div className="lg:col-span-5 bg-gradient-to-br from-[#0c2e17] via-slate-900 to-[#0c2e17] text-white rounded-3xl p-8 sm:p-10 shadow-xl space-y-8 border-2 border-emerald-500/40">
            <div>
              <span className="text-xs font-bold uppercase tracking-wider text-yellow-400">Project Leadership</span>
              <h2 className="text-2xl font-black text-white mt-1">
                {lang === 'uz' ? "Al-Xorazmiy universiteti" : "Al-Khwarizmi University"}
              </h2>
              <p className="text-sm text-slate-300 mt-2">
                Lead Coordinator of Erasmus+ Project 101322962 (WASTE-UZ)
              </p>
            </div>

            <div className="space-y-6 text-sm">
              <div className="flex items-start gap-4">
                <div className="p-3 rounded-xl bg-emerald-950/80 text-emerald-400 border border-emerald-800 flex-shrink-0">
                  <MapPin className="w-5 h-5" />
                </div>
                <div>
                  <h3 className="font-bold text-white">{t.contact.addressTitle}</h3>
                  <p className="text-slate-300 text-xs mt-1 leading-relaxed">
                    {t.contact.addressText}
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-4">
                <div className="p-3 rounded-xl bg-emerald-950/80 text-emerald-400 border border-emerald-800 flex-shrink-0">
                  <Mail className="w-5 h-5" />
                </div>
                <div>
                  <h3 className="font-bold text-white">{t.contact.emailTitle}</h3>
                  <p className="text-slate-300 text-xs mt-1">
                    {t.contact.emailText}
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-4">
                <div className="p-3 rounded-xl bg-emerald-950/80 text-emerald-400 border border-emerald-800 flex-shrink-0">
                  <Globe className="w-5 h-5" />
                </div>
                <div>
                  <h3 className="font-bold text-white">{t.contact.domainTitle}</h3>
                  <p className="text-slate-300 text-xs mt-1 font-mono">
                    https://wasteuz.uz
                  </p>
                </div>
              </div>
            </div>

            <div className="pt-6 border-t border-emerald-900/60 text-xs text-slate-400 leading-relaxed">
              Consortium inquiries, academic mobility applications, and stakeholder endorsements are handled by the Coordinator Office.
            </div>
          </div>

          {/* Form */}
          <div className="lg:col-span-7 bg-white border-2 border-emerald-500/30 rounded-3xl p-7 sm:p-10 shadow-xs">
            {status === 'success' && (
              <div className="mb-6 p-4 rounded-2xl bg-emerald-50 border border-emerald-200 text-emerald-800 text-sm flex items-center gap-3">
                <CheckCircle2 className="w-5 h-5 text-emerald-600 flex-shrink-0" />
                <span>{t.contact.successMsg}</span>
              </div>
            )}

            {status === 'error' && (
              <div className="mb-6 p-4 rounded-2xl bg-rose-50 border border-rose-200 text-rose-800 text-sm flex items-center gap-3">
                <AlertCircle className="w-5 h-5 text-rose-600 flex-shrink-0" />
                <span>Xabarni yuborishda xatolik yuz berdi. Iltimos, barcha maydonlarni tekshiring.</span>
              </div>
            )}

            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-bold uppercase tracking-wider text-slate-700 mb-1.5">
                    {t.contact.nameLabel} *
                  </label>
                  <input
                    type="text"
                    required
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    className="w-full px-4 py-3 rounded-xl border-2 border-emerald-500/25 bg-white text-sm focus:outline-hidden focus:ring-2 focus:ring-[#1b6b37] focus:border-[#1b6b37]"
                    placeholder="e.g. Dr. Aziz Rahimov"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold uppercase tracking-wider text-slate-700 mb-1.5">
                    {t.contact.emailLabel} *
                  </label>
                  <input
                    type="email"
                    required
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    className="w-full px-4 py-3 rounded-xl border-2 border-emerald-500/25 bg-white text-sm focus:outline-hidden focus:ring-2 focus:ring-[#1b6b37] focus:border-[#1b6b37]"
                    placeholder="aziz@university.uz"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-bold uppercase tracking-wider text-slate-700 mb-1.5">
                    {t.contact.instLabel}
                  </label>
                  <input
                    type="text"
                    value={formData.institution}
                    onChange={(e) => setFormData({ ...formData, institution: e.target.value })}
                    className="w-full px-4 py-3 rounded-xl border-2 border-emerald-500/25 bg-white text-sm focus:outline-hidden focus:ring-2 focus:ring-[#1b6b37] focus:border-[#1b6b37]"
                    placeholder="e.g. Tashkent State University"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold uppercase tracking-wider text-slate-700 mb-1.5">
                    {t.contact.subjectLabel}
                  </label>
                  <input
                    type="text"
                    value={formData.subject}
                    onChange={(e) => setFormData({ ...formData, subject: e.target.value })}
                    className="w-full px-4 py-3 rounded-xl border-2 border-emerald-500/25 bg-white text-sm focus:outline-hidden focus:ring-2 focus:ring-[#1b6b37] focus:border-[#1b6b37]"
                    placeholder="e.g. Academic collaboration"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-slate-700 mb-1.5">
                  {t.contact.msgLabel} *
                </label>
                <textarea
                  required
                  rows={5}
                  value={formData.message}
                  onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                  className="w-full px-4 py-3 rounded-xl border-2 border-emerald-500/25 bg-white text-sm focus:outline-hidden focus:ring-2 focus:ring-[#1b6b37] focus:border-[#1b6b37]"
                  placeholder="Xabaringiz..."
                />
              </div>

              <button
                type="submit"
                disabled={loading}
                className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-8 py-3.5 rounded-xl bg-[#1b6b37] hover:bg-[#14532b] text-white font-bold text-sm shadow-md transition disabled:opacity-50 border-2 border-emerald-700"
              >
                <Send className="w-4 h-4" />
                <span>{loading ? 'Yuborilmoqda...' : t.contact.sendBtn}</span>
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}

import React, { useState } from 'react';
import { Mail, MapPin, Globe, Send, CheckCircle2, AlertCircle } from 'lucide-react';

export default function ContactSection({ t, lang }) {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    institution: '',
    subject: '',
    message: ''
  });
  const [loading, setLoading] = useState(false);
  const [status, setStatus] = useState(null); // 'success' or 'error'

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
    <section id="contact" className="py-16 sm:py-24 bg-white border-b border-slate-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-8">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-sky-100 text-brand-blue-dark text-xs font-semibold uppercase tracking-wider mb-3">
            <Mail className="w-3.5 h-3.5" />
            <span>{t.contact.tag}</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-900 tracking-tight">
            {t.contact.heading}
          </h2>
          <p className="mt-4 text-slate-600 text-base sm:text-lg">
            {t.contact.subheading}
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-start">
          {/* Contact Details Card */}
          <div className="lg:col-span-5 bg-slate-900 text-white rounded-3xl p-8 sm:p-10 shadow-xl space-y-8">
            <div>
              <span className="text-xs font-bold uppercase tracking-wider text-yellow-400">Project Leadership</span>
              <h3 className="text-2xl font-black text-white mt-1">
                {lang === 'uz' ? "Al-Xorazmiy universiteti" : "Al-Khwarizmi University"}
              </h3>
              <p className="text-sm text-slate-400 mt-2">
                Lead Coordinator of Erasmus+ Project 101322962 (WASTE-UZ)
              </p>
            </div>

            <div className="space-y-6 text-sm">
              <div className="flex items-start gap-4">
                <div className="p-3 rounded-xl bg-slate-800 text-brand-blue-light flex-shrink-0">
                  <MapPin className="w-5 h-5" />
                </div>
                <div>
                  <h4 className="font-bold text-white">{t.contact.addressTitle}</h4>
                  <p className="text-slate-400 text-xs mt-1 leading-relaxed">
                    {t.contact.addressText}
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-4">
                <div className="p-3 rounded-xl bg-slate-800 text-emerald-400 flex-shrink-0">
                  <Mail className="w-5 h-5" />
                </div>
                <div>
                  <h4 className="font-bold text-white">{t.contact.emailTitle}</h4>
                  <p className="text-slate-400 text-xs mt-1">
                    {t.contact.emailText}
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-4">
                <div className="p-3 rounded-xl bg-slate-800 text-amber-400 flex-shrink-0">
                  <Globe className="w-5 h-5" />
                </div>
                <div>
                  <h4 className="font-bold text-white">{t.contact.domainTitle}</h4>
                  <p className="text-slate-400 text-xs mt-1 font-mono">
                    https://wasteuz.uz
                  </p>
                </div>
              </div>
            </div>

            <div className="pt-6 border-t border-slate-800 text-xs text-slate-400 leading-relaxed">
              Consortium inquiries, student mobility applications, and stakeholder endorsements are reviewed by the Steering Committee.
            </div>
          </div>

          {/* Interactive Form */}
          <div className="lg:col-span-7 bg-slate-50 border border-slate-200 rounded-3xl p-6 sm:p-10 shadow-xs">
            {status === 'success' && (
              <div className="mb-6 p-4 rounded-2xl bg-emerald-50 border border-emerald-200 text-emerald-800 text-sm flex items-center gap-3">
                <CheckCircle2 className="w-5 h-5 text-emerald-600 flex-shrink-0" />
                <span>{t.contact.successMsg}</span>
              </div>
            )}

            {status === 'error' && (
              <div className="mb-6 p-4 rounded-2xl bg-rose-50 border border-rose-200 text-rose-800 text-sm flex items-center gap-3">
                <AlertCircle className="w-5 h-5 text-rose-600 flex-shrink-0" />
                <span>Failed to dispatch message. Please check the required fields or email directly.</span>
              </div>
            )}

            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-bold uppercase tracking-wider text-slate-600 mb-1.5">
                    {t.contact.nameLabel} *
                  </label>
                  <input
                    type="text"
                    required
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    className="w-full px-4 py-3 rounded-xl border border-slate-300 bg-white text-sm focus:outline-hidden focus:ring-2 focus:ring-brand-blue"
                    placeholder="e.g. Dr. Aziz Rahimov"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold uppercase tracking-wider text-slate-600 mb-1.5">
                    {t.contact.emailLabel} *
                  </label>
                  <input
                    type="email"
                    required
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    className="w-full px-4 py-3 rounded-xl border border-slate-300 bg-white text-sm focus:outline-hidden focus:ring-2 focus:ring-brand-blue"
                    placeholder="e.g. aziz@university.uz"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-bold uppercase tracking-wider text-slate-600 mb-1.5">
                    {t.contact.instLabel}
                  </label>
                  <input
                    type="text"
                    value={formData.institution}
                    onChange={(e) => setFormData({ ...formData, institution: e.target.value })}
                    className="w-full px-4 py-3 rounded-xl border border-slate-300 bg-white text-sm focus:outline-hidden focus:ring-2 focus:ring-brand-blue"
                    placeholder="e.g. Tashkent State University"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold uppercase tracking-wider text-slate-600 mb-1.5">
                    {t.contact.subjectLabel}
                  </label>
                  <input
                    type="text"
                    value={formData.subject}
                    onChange={(e) => setFormData({ ...formData, subject: e.target.value })}
                    className="w-full px-4 py-3 rounded-xl border border-slate-300 bg-white text-sm focus:outline-hidden focus:ring-2 focus:ring-brand-blue"
                    placeholder="e.g. Inquiry regarding WP3 Training"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-slate-600 mb-1.5">
                  {t.contact.msgLabel} *
                </label>
                <textarea
                  required
                  rows={4}
                  value={formData.message}
                  onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                  className="w-full px-4 py-3 rounded-xl border border-slate-300 bg-white text-sm focus:outline-hidden focus:ring-2 focus:ring-brand-blue"
                  placeholder="Your message or collaboration proposal..."
                />
              </div>

              <button
                type="submit"
                disabled={loading}
                className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-8 py-3.5 rounded-xl bg-brand-blue hover:bg-brand-blue-dark text-white font-bold text-sm shadow-md transition disabled:opacity-50"
              >
                <Send className="w-4 h-4" />
                <span>{loading ? 'Sending...' : t.contact.sendBtn}</span>
              </button>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
}


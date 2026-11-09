import React, { useState, useEffect } from 'react';
import { Calendar, MapPin, Clock, Tag, ExternalLink, CalendarDays } from 'lucide-react';

export default function EventsPage({ t, lang }) {
  const [events, setEvents] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch('/api/events')
      .then((r) => r.json())
      .then((data) => {
        setEvents(data);
        setLoading(false);
      })
      .catch((err) => {
        console.error(err);
        setLoading(false);
      });
  }, []);

  return (
    <div className="py-12 sm:py-16 space-y-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-8">
        <div className="max-w-3xl">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-50 text-[#1b6b37] text-xs font-bold uppercase tracking-wider mb-3">
            <Calendar className="w-3.5 h-3.5" />
            <span>{t.events.tag}</span>
          </div>
          <h1 className="text-3xl sm:text-5xl font-black text-slate-900 tracking-tight">
            {t.events.heading}
          </h1>
          <p className="mt-4 text-slate-600 text-base sm:text-lg">
            {t.events.subheading}
          </p>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-8">
        {loading ? (
          <div className="text-center py-12 text-slate-400">Yuklanmoqda...</div>
        ) : events.length === 0 ? (
          <div className="text-center py-16 bg-white rounded-3xl border border-slate-200 text-slate-500">
            Hozircha yangi tadbirlar e'lon qilinmagan.
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
            {events.map((evt) => {
              const eventDate = new Date(evt.date);
              const day = eventDate.getDate() || '15';
              const month = eventDate.toLocaleString(lang === 'uz' ? 'uz-UZ' : 'en-US', { month: 'short' });
              const year = eventDate.getFullYear() || '2026';

              return (
                <div
                  key={evt.id}
                  className="bg-white rounded-3xl p-6 sm:p-7 border border-slate-200 shadow-xs hover:border-[#1b6b37]/50 hover:shadow-md transition duration-200 flex flex-col justify-between"
                >
                  <div>
                    {/* Date pill + Tag */}
                    <div className="flex items-start justify-between gap-4 mb-4">
                      <div className="flex flex-col items-center justify-center w-14 h-16 rounded-2xl bg-emerald-50 text-[#1b6b37] border border-emerald-100 flex-shrink-0">
                        <span className="text-xl font-black leading-none">{day}</span>
                        <span className="text-[11px] font-bold uppercase tracking-wider mt-0.5">{month}</span>
                      </div>

                      <span className="px-2.5 py-1 rounded-full bg-slate-100 text-slate-700 text-[11px] font-bold">
                        {evt.type}
                      </span>
                    </div>

                    <h2 className="font-bold text-lg text-slate-900 mb-3 leading-snug">
                      {lang === 'uz' ? evt.titleUz : evt.title}
                    </h2>

                    <div className="space-y-2 text-xs text-slate-500 mb-4 font-medium">
                      <div className="flex items-center gap-2">
                        <Clock className="w-3.5 h-3.5 text-slate-400" />
                        <span>{evt.time || '14:00 - 18:00 (UZT)'}</span>
                      </div>
                      <div className="flex items-start gap-2">
                        <MapPin className="w-3.5 h-3.5 text-slate-400 flex-shrink-0 mt-0.5" />
                        <span>{evt.location}</span>
                      </div>
                    </div>

                    <p className="text-xs sm:text-sm text-slate-600 leading-relaxed mb-4">
                      {evt.description}
                    </p>
                  </div>

                  <div className="pt-4 border-t border-slate-100 flex items-center justify-between text-xs">
                    <span className="text-slate-400 font-mono">{year}</span>
                    <a
                      href={`https://calendar.google.com/calendar/render?action=TEMPLATE&text=${encodeURIComponent(evt.title)}&dates=${evt.date.replace(/-/g, '')}T090000Z/${evt.date.replace(/-/g, '')}T130000Z&details=${encodeURIComponent(evt.description)}&location=${encodeURIComponent(evt.location)}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-1 font-bold text-[#1b6b37] hover:underline"
                    >
                      <CalendarDays className="w-3.5 h-3.5" />
                      <span>Kalendarga qo'shish</span>
                    </a>
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </div>
    </div>
  );
}


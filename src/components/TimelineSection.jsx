import React, { useState } from 'react';
import { Calendar, Flag, CheckCircle, Clock, ChevronRight, Award } from 'lucide-react';

const PHASES = [
  {
    year: 'Year 1',
    months: 'M1 – M12',
    period: 'Oct 2026 – Oct 2027',
    titleKey: 'year1Title',
    descKey: 'year1Desc',
    lead: 'AKHU & UVIGO',
    milestones: [
      { code: 'M1', title: 'Consortium Kick-off & Quality Assurance Board (QAB) established' },
      { code: 'M3-M6', title: 'Student field research across Uzbekistan cities & waste practice surveys' },
      { code: 'M9', title: 'Deliverable D2.1: Methodological Guidelines & Smart Waste Handbook' },
      { code: 'M12', title: 'Deliverable D1.1: Technical Progress Report Year 1 & Stakeholder Directory' }
    ]
  },
  {
    year: 'Year 2',
    months: 'M13 – M24',
    period: 'Nov 2027 – Oct 2028',
    titleKey: 'year2Title',
    descKey: 'year2Desc',
    lead: 'GANTEP & FSTU',
    milestones: [
      { code: 'M14', title: 'Online short course syllabus and interactive digital modules completed (D3.1)' },
      { code: 'M18', title: 'Virtual Laboratory & physical Green Innovation Hubs operational (D4.1)' },
      { code: 'M20', title: 'Spain Mobility: 5-day specialized training in Vigo for 24 Uzbek educators' },
      { code: 'M24', title: 'Deliverable D1.2: Technical Report Year 2 & 200 student workshops across UZ' }
    ]
  },
  {
    year: 'Year 3',
    months: 'M25 – M36',
    period: 'Nov 2028 – Oct 2029',
    titleKey: 'year3Title',
    descKey: 'year3Desc',
    lead: 'GREEN & BSU',
    milestones: [
      { code: 'M28', title: 'Curriculum integration in Uzbek universities with ECTS credit allocation (D3.3)' },
      { code: 'M30', title: 'Deliverable D5.2: Circular Economy Policy Brief presented to regional authorities' },
      { code: 'M34', title: 'Independent Scientific Assessment Panel review & national scaling roadmap' },
      { code: 'M36', title: 'Final International Conference, Scientific Journal publications (D6.3), & Project Closure' }
    ]
  }
];

export default function TimelineSection({ t, lang }) {
  const [selectedPhase, setSelectedPhase] = useState(0);

  return (
    <section id="timeline" className="py-16 sm:py-24 bg-slate-50 border-b border-slate-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-8">
        <div className="text-center max-w-3xl mx-auto mb-14">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-sky-100 text-brand-blue-dark text-xs font-semibold uppercase tracking-wider mb-3">
            <Calendar className="w-3.5 h-3.5" />
            <span>{t.timeline.tag}</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-900 tracking-tight">
            {t.timeline.heading}
          </h2>
          <p className="mt-4 text-slate-600 text-base sm:text-lg">
            {t.timeline.subheading}
          </p>
        </div>

        {/* Phase Tabs */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
          {PHASES.map((p, idx) => {
            const isSelected = selectedPhase === idx;
            return (
              <button
                key={idx}
                onClick={() => setSelectedPhase(idx)}
                className={`p-5 rounded-2xl border text-left transition-all duration-200 ${
                  isSelected
                    ? 'bg-slate-900 text-white border-slate-900 shadow-lg -translate-y-0.5'
                    : 'bg-white text-slate-700 border-slate-200 hover:border-slate-300'
                }`}
              >
                <div className="flex items-center justify-between gap-2 mb-2">
                  <span className={`text-xs font-mono font-bold px-2 py-0.5 rounded ${
                    isSelected ? 'bg-brand-blue text-white' : 'bg-slate-100 text-slate-600'
                  }`}>
                    {p.months}
                  </span>
                  <span className={`text-xs font-medium ${isSelected ? 'text-slate-400' : 'text-slate-500'}`}>
                    {p.period}
                  </span>
                </div>
                <div className="text-lg font-black">{p.year}</div>
                <div className={`text-xs mt-1 truncate ${isSelected ? 'text-slate-300' : 'text-slate-500'}`}>
                  {t.timeline[p.titleKey]}
                </div>
              </button>
            );
          })}
        </div>

        {/* Active Phase Details */}
        <div className="bg-white rounded-3xl p-6 sm:p-10 border border-slate-200 shadow-xs">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-6 border-b border-slate-100">
            <div>
              <span className="text-xs font-bold uppercase tracking-wider text-brand-blue font-mono">
                {PHASES[selectedPhase].months} • {PHASES[selectedPhase].period}
              </span>
              <h3 className="text-2xl font-black text-slate-900 mt-1">
                {t.timeline[PHASES[selectedPhase].titleKey]}
              </h3>
            </div>
            <div className="text-xs font-semibold px-3 py-1.5 rounded-lg bg-sky-50 text-brand-blue-dark self-start sm:self-center border border-sky-100">
              Coordinated by: <strong>{PHASES[selectedPhase].lead}</strong>
            </div>
          </div>

          <p className="text-slate-600 text-sm sm:text-base leading-relaxed py-6 border-b border-slate-100">
            {t.timeline[PHASES[selectedPhase].descKey]}
          </p>

          <div className="pt-6">
            <h4 className="text-xs font-bold uppercase tracking-wider text-slate-400 mb-4">
              Key Actionable Milestones & Outputs:
            </h4>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {PHASES[selectedPhase].milestones.map((m, i) => (
                <div
                  key={i}
                  className="p-4 rounded-xl bg-slate-50 border border-slate-200/80 flex items-start gap-3 hover:bg-sky-50/40 transition"
                >
                  <span className="px-2 py-1 rounded bg-white border border-slate-200 text-brand-blue font-mono text-xs font-bold flex-shrink-0 shadow-2xs">
                    {m.code}
                  </span>
                  <div className="text-xs sm:text-sm font-semibold text-slate-800 leading-snug">
                    {m.title}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

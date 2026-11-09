import React, { useState } from 'react';
import { Layers, Calendar, Clock, CheckCircle2 } from 'lucide-react';

export default function ActivitiesPage({ t, lang, workPackages }) {
  const [activeWpId, setActiveWpId] = useState(workPackages[0]?.id || 'wp1');
  const [activeTab, setActiveTab] = useState('tasks');

  const activeWp = workPackages.find((wp) => wp.id === activeWpId) || workPackages[0];

  return (
    <div className="py-12 sm:py-16 space-y-12 bg-slate-50 min-h-screen">
      <div className="max-w-7xl mx-auto px-4 sm:px-8">
        <div className="max-w-3xl space-y-3">
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-[#1b6b37] text-white text-xs font-black uppercase tracking-wider shadow-xs">
            <Layers className="w-3.5 h-3.5" />
            <span>{t.wps.tag}</span>
          </div>
          <h1 className="text-3xl sm:text-5xl font-black text-slate-950 tracking-tight">
            {t.wps.heading}
          </h1>
          <p className="text-slate-700 text-base sm:text-lg font-medium leading-relaxed">
            {t.wps.subheading}
          </p>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-8">
        {/* WP Horizontal Buttons Selector with High Contrast */}
        <div className="flex overflow-x-auto pb-4 gap-2.5 sm:gap-3.5 no-scrollbar mb-8">
          {workPackages.map((wp) => {
            const isSelected = wp.id === activeWpId;
            return (
              <button
                key={wp.id}
                onClick={() => setActiveWpId(wp.id)}
                className={`flex-shrink-0 flex items-center gap-2.5 px-5 py-3.5 rounded-2xl text-xs sm:text-sm font-black transition-all ${
                  isSelected
                    ? 'bg-[#1b6b37] text-white shadow-lg border-2 border-[#15542b] scale-102'
                    : 'bg-white text-slate-800 border-2 border-slate-300 hover:border-[#1b6b37] hover:text-[#1b6b37] shadow-xs'
                }`}
              >
                <span className={`px-2 py-0.5 rounded text-[11px] font-mono font-black ${
                  isSelected ? 'bg-white/25 text-white' : 'bg-slate-100 text-slate-700'
                }`}>
                  {wp.code}
                </span>
                <span>{wp.lead}</span>
              </button>
            );
          })}
        </div>

        {/* Active WP Detail Card */}
        {activeWp && (
          <div className="bg-white border-2 border-slate-200 border-t-4 border-t-[#1b6b37] rounded-3xl p-6 sm:p-10 shadow-lg space-y-6">
            <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-6 pb-6 border-b border-slate-200">
              <div className="space-y-3">
                <div className="flex flex-wrap items-center gap-3">
                  <span className="px-3.5 py-1.5 rounded-lg bg-[#1b6b37] text-white font-mono font-black text-sm shadow-xs">
                    {activeWp.code}
                  </span>
                  <span className="px-3.5 py-1.5 rounded-lg bg-slate-100 text-slate-900 text-xs font-bold border border-slate-300">
                    {t.wps.leadBy}: <strong className="text-[#1b6b37]">{activeWp.lead}</strong>
                  </span>
                  <span className="flex items-center gap-1 text-xs text-slate-700 font-bold bg-slate-100 px-3 py-1.5 rounded-lg">
                    <Calendar className="w-3.5 h-3.5 text-[#1b6b37]" />
                    <span>{activeWp.duration}</span>
                  </span>
                  <span className="flex items-center gap-1 text-xs text-slate-700 font-bold bg-slate-100 px-3 py-1.5 rounded-lg">
                    <Clock className="w-3.5 h-3.5 text-[#1b6b37]" />
                    <span>{activeWp.personMonths} Person-Months</span>
                  </span>
                </div>

                <h2 className="text-2xl sm:text-3xl lg:text-4xl font-black text-slate-950 tracking-tight leading-tight">
                  {lang === 'uz' ? activeWp.titleUz : activeWp.title}
                </h2>
              </div>

              {/* Sub-tabs with High Contrast */}
              <div className="flex items-center gap-1.5 bg-slate-100 p-1.5 rounded-2xl border border-slate-300 self-start lg:self-center">
                <button
                  onClick={() => setActiveTab('tasks')}
                  className={`px-5 py-2.5 rounded-xl text-xs font-black transition-all ${
                    activeTab === 'tasks'
                      ? 'bg-[#1b6b37] text-white shadow-md'
                      : 'text-slate-700 hover:text-slate-950 hover:bg-slate-200'
                  }`}
                >
                  {t.wps.tasksTab} ({activeWp.tasks?.length || 0})
                </button>
                <button
                  onClick={() => setActiveTab('deliverables')}
                  className={`px-5 py-2.5 rounded-xl text-xs font-black transition-all ${
                    activeTab === 'deliverables'
                      ? 'bg-[#1b6b37] text-white shadow-md'
                      : 'text-slate-700 hover:text-slate-950 hover:bg-slate-200'
                  }`}
                >
                  {t.wps.deliverablesTab} ({activeWp.deliverables?.length || 0})
                </button>
              </div>
            </div>

            {/* Objectives Box */}
            <div className="bg-slate-50 p-6 rounded-2xl border border-slate-200 space-y-2">
              <h3 className="text-xs font-black uppercase tracking-wider text-[#1b6b37]">
                Work Package Objectives:
              </h3>
              <p className="text-slate-800 text-sm sm:text-base leading-relaxed font-medium">
                {lang === 'uz' ? activeWp.objectivesUz : activeWp.objectives}
              </p>
            </div>

            {/* Tab content */}
            <div className="pt-2">
              {activeTab === 'tasks' ? (
                <div className="space-y-4">
                  <h4 className="text-xs font-black uppercase tracking-wider text-slate-500 mb-3">
                    Defined Implementation Tasks:
                  </h4>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {activeWp.tasks?.map((task, idx) => (
                      <div
                        key={idx}
                        className="bg-white p-6 rounded-2xl border-2 border-slate-200 hover:border-[#1b6b37] hover:shadow-md transition space-y-2"
                      >
                        <div className="flex items-center justify-between gap-2">
                          <span className="font-mono text-xs font-black px-2.5 py-1 rounded bg-[#1b6b37] text-white shadow-2xs">
                            {task.code}
                          </span>
                          <span className="text-xs text-slate-500 font-bold">
                            Part: {task.participants}
                          </span>
                        </div>
                        <h5 className="font-black text-slate-950 text-base pt-1">{task.name}</h5>
                        <p className="text-xs sm:text-sm text-slate-700 leading-relaxed font-normal">{task.desc}</p>
                      </div>
                    ))}
                  </div>
                </div>
              ) : (
                <div className="space-y-4">
                  <h4 className="text-xs font-black uppercase tracking-wider text-slate-500 mb-3">
                    Official Project Deliverables:
                  </h4>
                  <div className="overflow-x-auto rounded-2xl border-2 border-slate-200 shadow-xs">
                    <table className="w-full text-left text-xs sm:text-sm bg-white overflow-hidden">
                      <thead className="bg-slate-900 text-white uppercase font-black text-xs border-b border-slate-900">
                        <tr>
                          <th className="py-3.5 px-4 font-black">Code</th>
                          <th className="py-3.5 px-4 font-black">Deliverable Title</th>
                          <th className="py-3.5 px-4 font-black">Due Date</th>
                          <th className="py-3.5 px-4 font-black">Level</th>
                          <th className="py-3.5 px-4 font-black">Scope & Description</th>
                        </tr>
                      </thead>
                      <tbody className="divide-y divide-slate-200 font-medium text-slate-800">
                        {activeWp.deliverables?.map((deliv, idx) => (
                          <tr key={idx} className="hover:bg-slate-50 transition">
                            <td className="py-4 px-4 font-mono font-black text-[#1b6b37] whitespace-nowrap">
                              {deliv.code}
                            </td>
                            <td className="py-4 px-4 font-bold text-slate-950">
                              {deliv.name}
                            </td>
                            <td className="py-4 px-4 font-mono text-xs text-slate-700 whitespace-nowrap font-bold">
                              {deliv.due}
                            </td>
                            <td className="py-4 px-4 whitespace-nowrap">
                              <span
                                className={`px-2.5 py-1 rounded-md text-[11px] font-black border ${
                                  deliv.level === 'Public'
                                    ? 'bg-emerald-100 text-emerald-900 border-emerald-300'
                                    : 'bg-amber-100 text-amber-900 border-amber-300'
                                }`}
                              >
                                {deliv.level}
                              </span>
                            </td>
                            <td className="py-4 px-4 text-xs text-slate-700 max-w-md leading-relaxed">
                              {deliv.desc}
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </div>
              )}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

import React, { useState } from 'react';
import { Layers, Calendar, Clock, CheckCircle2 } from 'lucide-react';

export default function ActivitiesPage({ t, lang, workPackages }) {
  const [activeWpId, setActiveWpId] = useState(workPackages[0]?.id || 'wp1');
  const [activeTab, setActiveTab] = useState('tasks');

  const activeWp = workPackages.find((wp) => wp.id === activeWpId) || workPackages[0];

  return (
    <div className="py-12 sm:py-16 space-y-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-8">
        <div className="max-w-3xl">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-indigo-100 text-indigo-800 text-xs font-bold uppercase tracking-wider mb-3">
            <Layers className="w-3.5 h-3.5" />
            <span>{t.wps.tag}</span>
          </div>
          <h1 className="text-3xl sm:text-5xl font-black text-slate-900 tracking-tight">
            {t.wps.heading}
          </h1>
          <p className="mt-4 text-slate-600 text-base sm:text-lg">
            {t.wps.subheading}
          </p>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-8">
        {/* WP Horizontal Pills Selector */}
        <div className="flex overflow-x-auto pb-4 gap-2 sm:gap-3 no-scrollbar mb-8">
          {workPackages.map((wp) => {
            const isSelected = wp.id === activeWpId;
            return (
              <button
                key={wp.id}
                onClick={() => setActiveWpId(wp.id)}
                className={`flex-shrink-0 flex items-center gap-2 px-4 py-3 rounded-2xl text-xs sm:text-sm font-bold transition ${
                  isSelected
                    ? 'bg-slate-900 text-white shadow-md'
                    : 'bg-white text-slate-700 border border-slate-200 hover:bg-slate-50'
                }`}
              >
                <span className={`px-2 py-0.5 rounded text-[11px] font-mono ${isSelected ? 'bg-brand-blue text-white' : 'bg-slate-100 text-slate-700'}`}>
                  {wp.code}
                </span>
                <span>{wp.lead}</span>
              </button>
            );
          })}
        </div>

        {/* Active WP Detail Card */}
        {activeWp && (
          <div className="bg-white border border-slate-200 rounded-3xl p-6 sm:p-10 shadow-xs">
            <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-6 pb-6 border-b border-slate-100">
              <div className="space-y-2">
                <div className="flex flex-wrap items-center gap-3">
                  <span className="px-3 py-1 rounded-lg bg-brand-blue text-white font-mono font-bold text-sm">
                    {activeWp.code}
                  </span>
                  <span className="px-3 py-1 rounded-lg bg-emerald-100 text-emerald-800 text-xs font-bold">
                    {t.wps.leadBy}: <strong>{activeWp.lead}</strong>
                  </span>
                  <span className="flex items-center gap-1 text-xs text-slate-500 font-medium">
                    <Calendar className="w-3.5 h-3.5" />
                    <span>{activeWp.duration}</span>
                  </span>
                  <span className="flex items-center gap-1 text-xs text-slate-500 font-medium">
                    <Clock className="w-3.5 h-3.5" />
                    <span>{activeWp.personMonths} Person-Months</span>
                  </span>
                </div>

                <h2 className="text-2xl sm:text-3xl font-black text-slate-900 tracking-tight">
                  {lang === 'uz' ? activeWp.titleUz : activeWp.title}
                </h2>
              </div>

              {/* Sub-tabs */}
              <div className="flex items-center gap-1 bg-slate-100 p-1 rounded-xl self-start lg:self-center">
                <button
                  onClick={() => setActiveTab('tasks')}
                  className={`px-4 py-2 rounded-lg text-xs font-bold transition ${
                    activeTab === 'tasks' ? 'bg-white text-slate-900 shadow-xs' : 'text-slate-600 hover:text-slate-900'
                  }`}
                >
                  {t.wps.tasksTab} ({activeWp.tasks?.length || 0})
                </button>
                <button
                  onClick={() => setActiveTab('deliverables')}
                  className={`px-4 py-2 rounded-lg text-xs font-bold transition ${
                    activeTab === 'deliverables' ? 'bg-white text-slate-900 shadow-xs' : 'text-slate-600 hover:text-slate-900'
                  }`}
                >
                  {t.wps.deliverablesTab} ({activeWp.deliverables?.length || 0})
                </button>
              </div>
            </div>

            {/* Objectives */}
            <div className="py-6 border-b border-slate-100">
              <h3 className="text-xs font-bold uppercase tracking-wider text-slate-400 mb-2">
                Work Package Objectives:
              </h3>
              <p className="text-slate-700 text-sm sm:text-base leading-relaxed">
                {lang === 'uz' ? activeWp.objectivesUz : activeWp.objectives}
              </p>
            </div>

            {/* Tab content */}
            <div className="pt-6">
              {activeTab === 'tasks' ? (
                <div className="space-y-4">
                  <h4 className="text-xs font-bold uppercase tracking-wider text-slate-400 mb-4">
                    Defined Implementation Tasks:
                  </h4>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {activeWp.tasks?.map((task, idx) => (
                      <div
                        key={idx}
                        className="bg-slate-50 p-5 rounded-2xl border border-slate-200 hover:border-brand-blue/50 transition"
                      >
                        <div className="flex items-center justify-between gap-2 mb-2">
                          <span className="font-mono text-xs font-bold px-2 py-0.5 rounded bg-white text-brand-blue border border-slate-200">
                            {task.code}
                          </span>
                          <span className="text-[11px] text-slate-500 font-medium">
                            Part: {task.participants}
                          </span>
                        </div>
                        <h5 className="font-bold text-slate-900 text-sm mb-1.5">{task.name}</h5>
                        <p className="text-xs text-slate-600 leading-relaxed">{task.desc}</p>
                      </div>
                    ))}
                  </div>
                </div>
              ) : (
                <div className="space-y-4">
                  <h4 className="text-xs font-bold uppercase tracking-wider text-slate-400 mb-4">
                    Official Project Deliverables:
                  </h4>
                  <div className="overflow-x-auto">
                    <table className="w-full text-left text-xs sm:text-sm bg-white rounded-2xl overflow-hidden border border-slate-200">
                      <thead className="bg-slate-50 text-slate-700 uppercase font-bold text-[11px] border-b border-slate-200">
                        <tr>
                          <th className="py-3 px-4">Code</th>
                          <th className="py-3 px-4">Deliverable Title</th>
                          <th className="py-3 px-4">Due</th>
                          <th className="py-3 px-4">Level</th>
                          <th className="py-3 px-4">Scope & Description</th>
                        </tr>
                      </thead>
                      <tbody className="divide-y divide-slate-100">
                        {activeWp.deliverables?.map((deliv, idx) => (
                          <tr key={idx} className="hover:bg-slate-50 transition">
                            <td className="py-3.5 px-4 font-mono font-bold text-brand-blue whitespace-nowrap">
                              {deliv.code}
                            </td>
                            <td className="py-3.5 px-4 font-bold text-slate-900">
                              {deliv.name}
                            </td>
                            <td className="py-3.5 px-4 font-mono text-xs text-slate-600 whitespace-nowrap">
                              {deliv.due}
                            </td>
                            <td className="py-3.5 px-4 whitespace-nowrap">
                              <span
                                className={`px-2.5 py-1 rounded-md text-[11px] font-bold ${
                                  deliv.level === 'Public'
                                    ? 'bg-emerald-100 text-emerald-800'
                                    : 'bg-amber-100 text-amber-800'
                                }`}
                              >
                                {deliv.level}
                              </span>
                            </td>
                            <td className="py-3.5 px-4 text-xs text-slate-600 max-w-md">
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

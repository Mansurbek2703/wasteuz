import React, { useState } from 'react';
import { Cpu, Play, RefreshCw, BarChart2, ShieldCheck, Zap, Leaf, CheckCircle2 } from 'lucide-react';

const STREAMS = [
  {
    id: 'plastics',
    name: 'PET & HDPE Polymers',
    category: 'Thermoplastics',
    recyclability: 92,
    co2KgPerTon: 1450,
    economicYield: '$380 / ton',
    sensorMethod: 'Near-Infrared (NIR) Optical Sorting + Density Floatation',
  },
  {
    id: 'organic',
    name: 'Municipal Organic Waste',
    category: 'Biomass & Food Scraps',
    recyclability: 88,
    co2KgPerTon: 620,
    economicYield: '$140 / ton (Bio-fertilizer & Methane)',
    sensorMethod: 'Spectroscopic Moisture Sensor + Aerobic Anaerobic Digestion',
  },
  {
    id: 'ewaste',
    name: 'Electronic Waste & PCBs',
    category: 'High-Value WEEE',
    recyclability: 96,
    co2KgPerTon: 2800,
    economicYield: '$1,250 / ton (Copper, Gold, Rare Earths)',
    sensorMethod: 'X-Ray Fluorescence (XRF) + Eddy Current Separation',
  },
  {
    id: 'paper',
    name: 'Paper & Cardboard Fiber',
    category: 'Cellulose Fibers',
    recyclability: 85,
    co2KgPerTon: 980,
    economicYield: '$220 / ton',
    sensorMethod: 'Optical Color Scanner + Air Classifier Dewatering',
  },
  {
    id: 'glass',
    name: 'Silica Glass & Cullet',
    category: 'Inorganic Mineral',
    recyclability: 99,
    co2KgPerTon: 530,
    economicYield: '$110 / ton (Infinite cycle)',
    sensorMethod: 'CCD Trichromatic Laser Optical Sortation',
  }
];

export default function VirtualLabPage({ t, lang }) {
  const [selectedStream, setSelectedStream] = useState(STREAMS[0]);
  const [isRunning, setIsRunning] = useState(false);
  const [logs, setLogs] = useState([
    'System standby. Work Package 4 Virtual Laboratory engine initialized.',
    'Connected to Gaziantep University simulation hub and Uzbek testbed nodes.'
  ]);

  const handleRunSimulation = () => {
    setIsRunning(true);
    setLogs((prev) => [
      `[${new Date().toLocaleTimeString()}] >> Dispatching simulation batch for ${selectedStream.name}...`,
      ...prev
    ]);

    setTimeout(() => {
      setLogs((prev) => [
        `[${new Date().toLocaleTimeString()}] >> Sensor engaged: ${selectedStream.sensorMethod}`,
        `[${new Date().toLocaleTimeString()}] >> Sorting purity score: ${selectedStream.recyclability}%`,
        `[${new Date().toLocaleTimeString()}] >> Net carbon avoidance calculated: ${selectedStream.co2KgPerTon} kg CO2e / ton`,
        `[${new Date().toLocaleTimeString()}] >> Stream valorization complete. Telemetry recorded in WP4 hub.`,
        ...prev
      ]);
      setIsRunning(false);
    }, 1200);
  };

  return (
    <div className="py-12 sm:py-16 space-y-12 bg-slate-900 text-white min-h-[85vh]">
      <div className="max-w-7xl mx-auto px-4 sm:px-8">
        <div className="max-w-3xl">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-500/20 text-emerald-400 text-xs font-bold uppercase tracking-wider mb-3 border border-emerald-500/30">
            <Cpu className="w-3.5 h-3.5" />
            <span>{t.virtualLab.tag}</span>
          </div>
          <h1 className="text-3xl sm:text-5xl font-black tracking-tight text-white">
            {t.virtualLab.heading}
          </h1>
          <p className="mt-4 text-slate-400 text-base sm:text-lg">
            {t.virtualLab.subheading}
          </p>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch">
          {/* Controls */}
          <div className="lg:col-span-5 bg-slate-800/90 border border-slate-700 rounded-3xl p-6 sm:p-8 flex flex-col justify-between shadow-xl">
            <div>
              <div className="flex items-center gap-2 text-emerald-400 mb-3">
                <Zap className="w-5 h-5" />
                <h3 className="font-bold text-lg text-white">{t.virtualLab.simulatorTitle}</h3>
              </div>
              <p className="text-xs sm:text-sm text-slate-300 mb-6 leading-relaxed">
                {t.virtualLab.simulatorDesc}
              </p>

              <div className="space-y-2.5 mb-6">
                <label className="text-xs font-bold uppercase tracking-wider text-slate-400 block mb-2">
                  {t.virtualLab.selectMaterial}:
                </label>
                {STREAMS.map((s) => (
                  <button
                    key={s.id}
                    onClick={() => setSelectedStream(s)}
                    className={`w-full text-left p-3.5 rounded-xl border transition flex items-center justify-between text-xs sm:text-sm ${
                      selectedStream.id === s.id
                        ? 'bg-slate-700 border-emerald-400 text-white shadow-md'
                        : 'bg-slate-900/60 border-slate-700 text-slate-400 hover:text-white hover:border-slate-600'
                    }`}
                  >
                    <div>
                      <div className="font-bold">{s.name}</div>
                      <div className="text-[11px] text-slate-400">{s.category}</div>
                    </div>
                    {selectedStream.id === s.id && (
                      <CheckCircle2 className="w-4 h-4 text-emerald-400 flex-shrink-0" />
                    )}
                  </button>
                ))}
              </div>
            </div>

            <button
              onClick={handleRunSimulation}
              disabled={isRunning}
              className="w-full flex items-center justify-center gap-2 py-3.5 px-6 rounded-xl bg-gradient-to-r from-emerald-500 to-brand-blue font-bold text-sm text-white hover:opacity-95 transition shadow-lg shadow-emerald-500/20 disabled:opacity-50"
            >
              {isRunning ? (
                <>
                  <RefreshCw className="w-4 h-4 animate-spin" />
                  <span>Processing Telemetry...</span>
                </>
              ) : (
                <>
                  <Play className="w-4 h-4 fill-white" />
                  <span>{t.virtualLab.runSimBtn}</span>
                </>
              )}
            </button>
          </div>

          {/* Results & Terminal */}
          <div className="lg:col-span-7 flex flex-col gap-6">
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              <div className="bg-slate-800/90 border border-slate-700 p-5 rounded-2xl">
                <div className="text-[11px] font-bold uppercase tracking-wider text-slate-400 mb-1">
                  {t.virtualLab.recyclability}
                </div>
                <div className="text-3xl font-black text-emerald-400">
                  {selectedStream.recyclability}%
                </div>
                <div className="w-full bg-slate-700 h-1.5 rounded-full mt-3 overflow-hidden">
                  <div
                    className="bg-emerald-400 h-full rounded-full transition-all duration-500"
                    style={{ width: `${selectedStream.recyclability}%` }}
                  />
                </div>
              </div>

              <div className="bg-slate-800/90 border border-slate-700 p-5 rounded-2xl">
                <div className="text-[11px] font-bold uppercase tracking-wider text-slate-400 mb-1">
                  {t.virtualLab.co2Saved}
                </div>
                <div className="text-2xl sm:text-3xl font-black text-sky-400">
                  {selectedStream.co2KgPerTon} <span className="text-xs font-normal text-slate-400">kg/t</span>
                </div>
                <div className="text-[11px] text-slate-400 mt-2 flex items-center gap-1">
                  <Leaf className="w-3.5 h-3.5 text-emerald-400" />
                  <span>Avoided greenhouse gas</span>
                </div>
              </div>

              <div className="bg-slate-800/90 border border-slate-700 p-5 rounded-2xl">
                <div className="text-[11px] font-bold uppercase tracking-wider text-slate-400 mb-1">
                  {t.virtualLab.recoveryPotential}
                </div>
                <div className="text-xl sm:text-2xl font-black text-amber-400">
                  {selectedStream.economicYield}
                </div>
                <div className="text-[11px] text-slate-400 mt-2">
                  Market circular valuation
                </div>
              </div>
            </div>

            <div className="bg-slate-800/60 border border-slate-700 p-4 rounded-2xl flex items-center gap-3">
              <div className="p-2.5 rounded-xl bg-slate-700 text-sky-400">
                <ShieldCheck className="w-5 h-5" />
              </div>
              <div className="text-xs sm:text-sm">
                <strong className="text-slate-200 block font-medium">Telemetry & Sensor Mechanism:</strong>
                <span className="text-slate-400">{selectedStream.sensorMethod}</span>
              </div>
            </div>

            <div className="flex-1 bg-black/90 border border-slate-800 rounded-2xl p-5 font-mono text-xs overflow-hidden flex flex-col justify-between">
              <div className="flex items-center justify-between border-b border-slate-800 pb-2 mb-3">
                <span className="text-slate-400 font-bold">WP4_SIMULATOR_VIRTUAL_HUB.bin</span>
                <span className="text-[10px] text-emerald-400 font-bold">● ONLINE</span>
              </div>
              <div className="space-y-1.5 overflow-y-auto max-h-48 text-slate-300">
                {logs.map((log, idx) => (
                  <div key={idx} className="leading-relaxed">
                    <span className="text-emerald-500 select-none">$ </span>
                    <span>{log}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

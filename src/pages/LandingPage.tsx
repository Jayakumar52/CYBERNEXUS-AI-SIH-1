import React from 'react';
import { ArrowRight, Play, ShieldAlert, TrendingUp, Layers, CheckCircle2, ChevronRight } from 'lucide-react';
import { PageId } from '../types/index.js';

interface Props {
  onEnter: () => void;
  onLaunchDemo: () => void;
}

export const LandingPage: React.FC<Props> = ({ onEnter, onLaunchDemo }) => {
  return (
    <div className="min-h-screen bg-slate-900 text-white flex flex-col justify-between selection:bg-blue-600 selection:text-white">
      {/* Top Banner Bar */}
      <div className="border-b border-slate-800 px-8 py-4 flex items-center justify-between">
        <div className="flex items-center gap-2.5">
          <div className="w-8 h-8 rounded-lg bg-blue-600 flex items-center justify-center font-mono font-bold text-white text-sm shadow-xs">
            CN
          </div>
          <div>
            <span className="font-extrabold tracking-tight text-white text-base">CYBERNEXUS AI</span>
            <span className="text-xs text-slate-400 ml-2 hidden sm:inline font-mono">SIH Prototype</span>
          </div>
        </div>

        <div className="flex items-center gap-4 text-xs">
          <span className="text-slate-400 hidden md:inline">Target Enterprise:</span>
          <span className="text-blue-400 font-semibold hidden md:inline">Nexa Financial Services</span>
          <button
            onClick={onLaunchDemo}
            className="px-3 py-1.5 bg-slate-800 hover:bg-slate-700 text-blue-300 border border-slate-700 rounded-md font-medium transition-colors flex items-center gap-1.5"
          >
            <Play className="w-3 h-3 fill-current" />
            <span>Executive Demo</span>
          </button>
        </div>
      </div>

      {/* Hero Section */}
      <main className="max-w-5xl mx-auto px-6 py-16 flex-1 flex flex-col justify-center text-center">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-950/80 border border-blue-800/80 text-blue-300 text-xs font-mono font-medium mx-auto mb-6">
          <span className="w-2 h-2 rounded-full bg-blue-500 animate-pulse" />
          <span>Smart India Hackathon Prototype · Zero-Cost Architecture</span>
        </div>

        <h1 className="text-4xl sm:text-5xl md:text-6xl font-extrabold tracking-tight text-white max-w-4xl mx-auto leading-tight">
          From Cyber Risk Ratings to <span className="text-blue-400">Financial Decision Intelligence.</span>
        </h1>

        <p className="mt-6 text-base sm:text-lg text-slate-300 max-w-2xl mx-auto leading-relaxed font-normal">
          Know your cyber exposure. Understand what drives it. Invest where it matters most.
        </p>

        {/* Action Buttons */}
        <div className="mt-10 flex flex-col sm:flex-row items-center justify-center gap-4">
          <button
            onClick={onEnter}
            className="w-full sm:w-auto px-8 py-3.5 bg-blue-600 hover:bg-blue-500 text-white font-bold rounded-lg text-sm transition-all shadow-lg shadow-blue-900/30 flex items-center justify-center gap-2"
          >
            <span>Enter Demo Environment</span>
            <ArrowRight className="w-4 h-4" />
          </button>
          <button
            onClick={onLaunchDemo}
            className="w-full sm:w-auto px-6 py-3.5 bg-slate-800 hover:bg-slate-700 text-slate-200 border border-slate-700 font-semibold rounded-lg text-sm transition-colors flex items-center justify-center gap-2"
          >
            <Play className="w-4 h-4 fill-current text-blue-400" />
            <span>Run 3-Minute SIH Presentation</span>
          </button>
        </div>

        {/* 5 Core Pillars */}
        <div className="mt-16 grid grid-cols-2 md:grid-cols-5 gap-3 max-w-4xl mx-auto text-left">
          <div className="p-3.5 rounded-lg bg-slate-800/50 border border-slate-800">
            <div className="text-[11px] font-mono font-bold text-blue-400 uppercase">1. Continuous</div>
            <div className="text-xs text-slate-300 mt-1">Real-time risk recalculation as telemetry shifts.</div>
          </div>
          <div className="p-3.5 rounded-lg bg-slate-800/50 border border-slate-800">
            <div className="text-[11px] font-mono font-bold text-blue-400 uppercase">2. Quantified</div>
            <div className="text-xs text-slate-300 mt-1">Expressed in Rupee financial exposure (₹ Cr).</div>
          </div>
          <div className="p-3.5 rounded-lg bg-slate-800/50 border border-slate-800">
            <div className="text-[11px] font-mono font-bold text-blue-400 uppercase">3. Explainable</div>
            <div className="text-xs text-slate-300 mt-1">Auditable math from raw CVEs to EAL.</div>
          </div>
          <div className="p-3.5 rounded-lg bg-slate-800/50 border border-slate-800">
            <div className="text-[11px] font-mono font-bold text-blue-400 uppercase">4. Actionable</div>
            <div className="text-xs text-slate-300 mt-1">Prioritized mitigations with verified ROSI.</div>
          </div>
          <div className="p-3.5 rounded-lg bg-slate-800/50 border border-slate-800 col-span-2 md:col-span-1">
            <div className="text-[11px] font-mono font-bold text-blue-400 uppercase">5. Optimized</div>
            <div className="text-xs text-slate-300 mt-1">0/1 Knapsack spending per rupee of budget.</div>
          </div>
        </div>
      </main>

      {/* Footer */}
      <footer className="border-t border-slate-800 py-4 px-8 text-center text-xs text-slate-500">
        CYBERNEXUS AI · Prototype / Synthetic Enterprise Telemetry for Nexa Financial Services · Free & Open Source Stack
      </footer>
    </div>
  );
};

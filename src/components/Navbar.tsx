import React from 'react';
import { Play, Sparkles, RefreshCw, ShieldCheck, Activity } from 'lucide-react';
import { PageId } from '../types/index.js';

interface Props {
  activePage: PageId;
  onNavigate: (page: PageId) => void;
  onOpenDemo: () => void;
  onOpenAssistant: () => void;
  onRefreshTelemetry: () => void;
  isRefreshing: boolean;
  demoMode: boolean;
  onToggleDemoMode: () => void;
  onToggleLanding?: () => void;
}

const PAGE_TITLES: Record<PageId, string> = {
  'overview': 'Executive Overview',
  'risk-quantification': 'Financial Risk Engine',
  'risk-drivers': 'Top Risk Drivers',
  'attack-paths': 'Attack Path Graph',
  'assets': 'Enterprise Assets',
  'vulnerabilities': 'Vulnerability Matrix',
  'controls': 'Control Effectiveness',
  'recommendations': 'AI Mitigation Engine',
  'scenarios': 'What-If Risk Simulator',
  'investment': 'Investment Optimizer',
  'compliance': 'Regulatory Frameworks',
  'reports': 'Executive Reports',
  'sources': 'Telemetry Data Sources'
};

export const Navbar: React.FC<Props> = ({
  activePage,
  onNavigate,
  onOpenDemo,
  onOpenAssistant,
  onRefreshTelemetry,
  isRefreshing,
  demoMode,
  onToggleDemoMode,
  onToggleLanding
}) => {
  return (
    <header className="h-14 bg-white/95 backdrop-blur-md border-b border-slate-200/90 px-6 flex items-center justify-between z-30 shrink-0 sticky top-0 shadow-xs">
      {/* Zone 1: Single text element wordmark with gradient */}
      <div className="flex items-center gap-3">
        <a
          href="#overview"
          onClick={e => {
            e.preventDefault();
            onNavigate('overview');
          }}
          className="text-base font-extrabold tracking-tight text-slate-900 flex items-center gap-2 hover:opacity-90 transition-opacity"
        >
          <div className="w-7 h-7 rounded-lg bg-gradient-to-tr from-cyan-600 via-blue-600 to-indigo-600 flex items-center justify-center text-white text-xs font-bold font-mono shadow-sm shadow-blue-500/30">
            CN
          </div>
          <span className="bg-gradient-to-r from-slate-900 via-slate-800 to-blue-950 bg-clip-text text-transparent font-black tracking-tight">
            CYBERNEXUS AI
          </span>
        </a>
        <span className="text-slate-300 hidden sm:inline" aria-hidden="true">/</span>
        <span className="text-xs text-slate-500 hidden sm:inline font-medium">
          Nexa Financial Services
        </span>
      </div>

      {/* Zone 2: Contextual Breadcrumb */}
      <div className="hidden lg:flex items-center gap-2 text-xs text-slate-600 font-medium">
        <span className="text-slate-400">Current View:</span>
        <span className="text-slate-900 font-semibold">{PAGE_TITLES[activePage]}</span>
        <span aria-hidden="true" className="text-slate-300">·</span>
        <div className="flex items-center gap-1.5 text-emerald-700 bg-emerald-50 border border-emerald-200/60 px-2 py-0.5 rounded text-[11px]">
          <span className="w-1.5 h-1.5 rounded-full bg-emerald-600 animate-pulse" />
          <span>Continuous Telemetry Active</span>
        </div>
      </div>

      {/* Zone 3: Primary Action Controls */}
      <div className="flex items-center gap-2.5">
        {/* Toggle Parallax Landing Screen */}
        {onToggleLanding && (
          <button
            onClick={onToggleLanding}
            title="View animated Parallax Presentation Hero"
            className="px-2.5 py-1.5 text-xs font-medium text-slate-700 bg-slate-100 hover:bg-slate-200 border border-slate-200 rounded-md transition-all flex items-center gap-1.5"
          >
            <span className="w-2 h-2 rounded-full bg-gradient-to-r from-cyan-500 to-blue-500" />
            <span className="hidden sm:inline">Landing Hero</span>
          </button>
        )}

        {/* Refresh Telemetry */}
        <button
          onClick={onRefreshTelemetry}
          disabled={isRefreshing}
          title="Ingest latest synthetic security telemetry"
          className="px-2.5 py-1.5 text-xs text-slate-700 bg-slate-100 hover:bg-slate-200 border border-slate-200 rounded-md transition-colors flex items-center gap-1.5 disabled:opacity-50"
        >
          <RefreshCw className={`w-3.5 h-3.5 ${isRefreshing ? 'animate-spin text-blue-600' : 'text-slate-500'}`} />
          <span className="hidden sm:inline">Refresh Telemetry</span>
        </button>

        {/* Ask AI Assistant */}
        <button
          onClick={onOpenAssistant}
          className="px-2.5 py-1.5 text-xs font-medium text-blue-700 bg-blue-50 hover:bg-blue-100 border border-blue-200 rounded-md transition-colors flex items-center gap-1.5"
        >
          <Sparkles className="w-3.5 h-3.5 text-blue-600" />
          <span>Ask AI</span>
        </button>

        {/* Run Executive Demo button with gradient accent */}
        <button
          onClick={onOpenDemo}
          className="px-3.5 py-1.5 text-xs font-bold text-white bg-gradient-to-r from-slate-900 via-blue-950 to-slate-900 hover:from-blue-900 hover:to-indigo-900 border border-slate-800 rounded-md transition-all flex items-center gap-1.5 shadow-sm shadow-blue-900/20 hover:scale-105 active:scale-95"
        >
          <Play className="w-3 h-3 fill-current text-cyan-400" />
          <span>Run Demo</span>
        </button>

        {/* Demo Mode Toggle */}
        <button
          onClick={onToggleDemoMode}
          title="Toggle synthetic SIH demo dataset"
          className={`text-[11px] font-mono px-2 py-1 rounded border transition-colors ${
            demoMode
              ? 'bg-amber-50 border-amber-300 text-amber-800 font-semibold'
              : 'bg-slate-50 border-slate-200 text-slate-600'
          }`}
        >
          DEMO MODE
        </button>
      </div>
    </header>
  );
};

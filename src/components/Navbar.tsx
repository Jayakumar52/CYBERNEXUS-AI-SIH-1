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
  onToggleDemoMode
}) => {
  return (
    <header className="h-14 bg-white border-b border-slate-200 px-6 flex items-center justify-between z-30 shrink-0 sticky top-0">
      {/* Zone 1: Single text element wordmark */}
      <div className="flex items-center gap-3">
        <a
          href="#overview"
          onClick={e => {
            e.preventDefault();
            onNavigate('overview');
          }}
          className="text-base font-extrabold tracking-tight text-slate-900 flex items-center gap-2 hover:opacity-90 transition-opacity"
        >
          <div className="w-6 h-6 rounded bg-slate-900 flex items-center justify-center text-white text-xs font-bold font-mono">
            CN
          </div>
          <span>CYBERNEXUS AI</span>
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
        <div className="flex items-center gap-1.5 text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded text-[11px]">
          <span className="w-1.5 h-1.5 rounded-full bg-emerald-600 animate-pulse" />
          <span>Continuous Telemetry Active</span>
        </div>
      </div>

      {/* Zone 3: Primary Action Controls */}
      <div className="flex items-center gap-2.5">
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

        {/* Run Executive Demo button */}
        <button
          onClick={onOpenDemo}
          className="px-3 py-1.5 text-xs font-semibold text-white bg-slate-900 hover:bg-slate-800 rounded-md transition-colors flex items-center gap-1.5 shadow-xs"
        >
          <Play className="w-3 h-3 fill-current" />
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

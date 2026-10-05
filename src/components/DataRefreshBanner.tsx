import React from 'react';
import { Activity, X } from 'lucide-react';

interface Props {
  message: string;
  timestamp: string;
  onDismiss: () => void;
}

export const DataRefreshBanner: React.FC<Props> = ({ message, timestamp, onDismiss }) => {
  return (
    <div className="bg-slate-900 text-white border-b border-slate-800 px-6 py-2.5 flex items-center justify-between text-xs animate-in slide-in-from-top duration-150">
      <div className="flex items-center gap-2.5 truncate">
        <Activity className="w-3.5 h-3.5 text-emerald-400 shrink-0 animate-pulse" />
        <span className="font-semibold text-emerald-400">[Continuous Telemetry]</span>
        <span className="text-slate-300 truncate">{message}</span>
        <span className="text-slate-500 font-mono text-[11px] hidden sm:inline">({timestamp})</span>
      </div>
      <button
        onClick={onDismiss}
        className="text-slate-400 hover:text-white p-1 rounded transition-colors shrink-0 ml-2"
      >
        <X className="w-3.5 h-3.5" />
      </button>
    </div>
  );
};

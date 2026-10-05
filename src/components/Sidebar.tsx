import React from 'react';
import {
  LayoutDashboard,
  Calculator,
  Flame,
  GitBranch,
  Server,
  Bug,
  ShieldCheck,
  Sparkles,
  Sliders,
  DollarSign,
  FileCheck2,
  FileText,
  Radio,
  ExternalLink
} from 'lucide-react';
import { PageId } from '../types/index.js';

interface Props {
  activePage: PageId;
  onNavigate: (page: PageId) => void;
}

interface NavItem {
  id: PageId;
  label: string;
  icon: React.ElementType;
  badge?: string;
}

const NAV_GROUPS: { groupLabel: string; items: NavItem[] }[] = [
  {
    groupLabel: 'Decision Intelligence',
    items: [
      { id: 'overview', label: 'Overview', icon: LayoutDashboard },
      { id: 'risk-quantification', label: 'Risk Quantification', icon: Calculator },
      { id: 'risk-drivers', label: 'Risk Drivers', icon: Flame, badge: 'Top 5' },
      { id: 'attack-paths', label: 'Attack Paths', icon: GitBranch }
    ]
  },
  {
    groupLabel: 'Enterprise Telemetry',
    items: [
      { id: 'assets', label: 'Assets', icon: Server, badge: '10' },
      { id: 'vulnerabilities', label: 'Vulnerabilities', icon: Bug, badge: '6' },
      { id: 'controls', label: 'Controls', icon: ShieldCheck, badge: '7' }
    ]
  },
  {
    groupLabel: 'Optimization & Action',
    items: [
      { id: 'recommendations', label: 'AI Recommendations', icon: Sparkles },
      { id: 'scenarios', label: 'Scenario Simulator', icon: Sliders },
      { id: 'investment', label: 'Investment Optimization', icon: DollarSign }
    ]
  },
  {
    groupLabel: 'Governance & Output',
    items: [
      { id: 'compliance', label: 'Compliance & Frameworks', icon: FileCheck2 },
      { id: 'reports', label: 'Reports', icon: FileText },
      { id: 'sources', label: 'Data Sources', icon: Radio, badge: '7 Connected' }
    ]
  }
];

export const Sidebar: React.FC<Props> = ({ activePage, onNavigate }) => {
  return (
    <aside className="w-64 bg-slate-900 text-slate-300 flex flex-col shrink-0 border-r border-slate-800 select-none">
      {/* Platform Title Sub-banner */}
      <div className="px-5 py-4 border-b border-slate-800/80">
        <div className="text-[11px] font-mono text-blue-400 font-semibold tracking-wider uppercase">
          SIH Prototype v4.2
        </div>
        <div className="text-xs text-slate-400 mt-0.5 font-medium">
          Continuous Risk Engine
        </div>
      </div>

      {/* Nav List */}
      <nav className="flex-1 overflow-y-auto px-3 py-4 space-y-6">
        {NAV_GROUPS.map((group, gIdx) => (
          <div key={gIdx} className="space-y-1">
            <div className="px-3 text-[10px] font-mono uppercase tracking-wider text-slate-500 font-semibold">
              {group.groupLabel}
            </div>
            {group.items.map(item => {
              const Icon = item.icon;
              const isActive = activePage === item.id;
              return (
                <button
                  key={item.id}
                  onClick={() => onNavigate(item.id)}
                  className={`w-full flex items-center justify-between px-3 py-2 rounded-md text-xs font-medium transition-colors ${
                    isActive
                      ? 'bg-blue-600 text-white font-semibold shadow-xs'
                      : 'text-slate-300 hover:text-white hover:bg-slate-800'
                  }`}
                >
                  <div className="flex items-center gap-2.5 truncate">
                    <Icon className={`w-4 h-4 shrink-0 ${isActive ? 'text-white' : 'text-slate-400'}`} />
                    <span className="truncate">{item.label}</span>
                  </div>
                  {item.badge && (
                    <span
                      className={`text-[10px] font-mono px-1.5 py-0.5 rounded text-right shrink-0 ${
                        isActive
                          ? 'bg-blue-700 text-white'
                          : 'bg-slate-800 text-slate-400'
                      }`}
                    >
                      {item.badge}
                    </span>
                  )}
                </button>
              );
            })}
          </div>
        ))}
      </nav>

      {/* Footer info */}
      <div className="p-4 border-t border-slate-800 bg-slate-950/40 text-[11px] text-slate-400 space-y-1">
        <div className="flex items-center justify-between text-slate-300 font-medium">
          <span>Target Environment</span>
          <span className="text-emerald-400 font-mono text-[10px]">● SYNTHETIC</span>
        </div>
        <div className="text-[10px] text-slate-500 truncate">
          Nexa Financial Services (Banking)
        </div>
      </div>
    </aside>
  );
};

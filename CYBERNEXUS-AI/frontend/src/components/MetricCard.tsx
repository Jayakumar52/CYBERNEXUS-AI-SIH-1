import React from 'react';
import { HelpCircle, TrendingDown, TrendingUp } from 'lucide-react';

interface Props {
  title: string;
  value: string;
  subtitle?: string;
  change?: string;
  changeType?: 'positive' | 'negative' | 'neutral';
  onWhyClick?: () => void;
  accentColor?: string;
}

export const MetricCard: React.FC<Props> = ({
  title,
  value,
  subtitle,
  change,
  changeType = 'neutral',
  onWhyClick
}) => {
  return (
    <div className="bg-white border border-slate-200 rounded-lg p-4 transition-shadow hover:shadow-xs flex flex-col justify-between">
      <div className="flex items-start justify-between">
        <span className="text-xs font-medium text-slate-500">{title}</span>
        {onWhyClick && (
          <button
            onClick={onWhyClick}
            title="Inspect explainable calculation"
            className="text-slate-400 hover:text-blue-600 transition-colors p-0.5 rounded"
          >
            <HelpCircle className="w-3.5 h-3.5" />
          </button>
        )}
      </div>

      <div className="mt-2">
        <div className="text-2xl font-bold font-mono tracking-tight text-slate-900 tabular-nums">
          {value}
        </div>
      </div>

      <div className="mt-2 pt-2 border-t border-slate-100 flex items-center justify-between text-xs">
        {subtitle && <span className="text-slate-500 truncate">{subtitle}</span>}
        {change && (
          <div
            className={`flex items-center gap-1 font-mono text-[11px] font-medium shrink-0 ${
              changeType === 'positive'
                ? 'text-emerald-700'
                : changeType === 'negative'
                ? 'text-red-600'
                : 'text-slate-600'
            }`}
          >
            {changeType === 'positive' && <TrendingUp className="w-3 h-3" />}
            {changeType === 'negative' && <TrendingDown className="w-3 h-3" />}
            <span>{change}</span>
          </div>
        )}
      </div>
    </div>
  );
};

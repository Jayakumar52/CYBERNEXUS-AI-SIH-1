import React from 'react';
import { Control, PageId } from '../types/index.js';
import { ShieldCheck, ShieldAlert, AlertTriangle, ArrowRight, CheckCircle2 } from 'lucide-react';

interface Props {
  controls: Control[];
  onNavigate: (page: PageId) => void;
}

export const ControlsPage: React.FC<Props> = ({ controls, onNavigate }) => {
  const avgEffectiveness = Math.round(controls.reduce((sum, c) => sum + c.effectivenessPct, 0) / controls.length);
  const avgCoverage = Math.round(controls.reduce((sum, c) => sum + c.coveragePct, 0) / controls.length);
  const totalReductionOpp = Number(controls.reduce((sum, c) => sum + c.potentialRiskReductionCr, 0).toFixed(1));

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="bg-white border border-slate-200 rounded-lg p-6">
        <div className="flex items-center justify-between">
          <div>
            <div className="flex items-center gap-2 text-xs font-semibold text-blue-700 uppercase tracking-wider">
              <ShieldCheck className="w-4 h-4" />
              <span>Defense-in-Depth Measurement</span>
            </div>
            <h2 className="text-xl font-bold text-slate-900 mt-1">Control Effectiveness & Gap Quantification</h2>
            <p className="text-xs text-slate-500 mt-1 max-w-3xl leading-relaxed">
              Evaluating enterprise security mechanisms across identity, network, and endpoints. Weak or partial control coverage creates downstream financial exposure.
            </p>
          </div>
          <div className="text-right shrink-0">
            <div className="text-xs text-slate-500">Total Risk Reduction Potential</div>
            <div className="font-mono text-2xl font-bold text-emerald-600">
              ₹{totalReductionOpp} Cr
            </div>
            <div className="text-[11px] text-slate-400 font-mono">Across {controls.length} Active Controls</div>
          </div>
        </div>
      </div>

      {/* Aggregate Metrics Bar */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <div className="bg-white border border-slate-200 rounded-lg p-4">
          <div className="text-xs text-slate-500 font-medium">Average Control Effectiveness</div>
          <div className="text-2xl font-bold font-mono text-slate-900 mt-1">{avgEffectiveness}%</div>
          <div className="text-[11px] text-slate-400 mt-0.5">Benchmarked against industry standards</div>
        </div>
        <div className="bg-white border border-slate-200 rounded-lg p-4">
          <div className="text-xs text-slate-500 font-medium">Average Enterprise Coverage</div>
          <div className="text-2xl font-bold font-mono text-slate-900 mt-1">{avgCoverage}%</div>
          <div className="text-[11px] text-amber-600 mt-0.5">Gaps in 29% privileged accounts & endpoints</div>
        </div>
        <div className="bg-white border border-slate-200 rounded-lg p-4">
          <div className="text-xs text-slate-500 font-medium">Critical Control Deficiencies</div>
          <div className="text-2xl font-bold font-mono text-red-600 mt-1">
            {controls.filter(c => c.status === 'Critical Gap').length} Deficiencies
          </div>
          <div className="text-[11px] text-slate-400 mt-0.5">Privileged MFA & Network Micro-segmentation</div>
        </div>
      </div>

      {/* Controls Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
        {controls.map(control => {
          const isCriticalGap = control.status === 'Critical Gap';
          const isOptimal = control.status === 'Optimal';

          return (
            <div
              key={control.id}
              className={`bg-white rounded-lg border p-5 flex flex-col justify-between transition-all ${
                isCriticalGap ? 'border-red-200 shadow-xs' : 'border-slate-200 hover:border-slate-300'
              }`}
            >
              <div>
                <div className="flex items-center justify-between text-xs mb-2">
                  <span className="font-mono text-[10px] text-slate-400 uppercase font-semibold">
                    {control.category}
                  </span>
                  <span className={`text-[10px] font-mono px-2 py-0.5 rounded font-semibold ${
                    isCriticalGap ? 'bg-red-50 text-red-700 border border-red-200' :
                    isOptimal ? 'bg-emerald-50 text-emerald-800' : 'bg-amber-50 text-amber-800'
                  }`}>
                    {control.status}
                  </span>
                </div>

                <h3 className="text-sm font-bold text-slate-900 leading-snug">{control.name}</h3>
                <p className="text-xs text-slate-600 mt-2 leading-relaxed">
                  {control.description}
                </p>

                {/* Performance Gauges */}
                <div className="mt-4 space-y-2 pt-3 border-t border-slate-100 text-xs">
                  <div>
                    <div className="flex justify-between text-slate-600 mb-1">
                      <span>Effectiveness</span>
                      <span className="font-mono font-semibold text-slate-900">{control.effectivenessPct}%</span>
                    </div>
                    <div className="w-full bg-slate-100 h-1.5 rounded-full overflow-hidden">
                      <div className="bg-blue-600 h-1.5 rounded-full" style={{ width: `${control.effectivenessPct}%` }} />
                    </div>
                  </div>

                  <div>
                    <div className="flex justify-between text-slate-600 mb-1">
                      <span>Coverage</span>
                      <span className="font-mono font-semibold text-slate-900">{control.coveragePct}%</span>
                    </div>
                    <div className="w-full bg-slate-100 h-1.5 rounded-full overflow-hidden">
                      <div className="bg-emerald-600 h-1.5 rounded-full" style={{ width: `${control.coveragePct}%` }} />
                    </div>
                  </div>

                  <div>
                    <div className="flex justify-between text-slate-600 mb-1">
                      <span>Failure / Bypass Rate</span>
                      <span className="font-mono font-semibold text-red-600">{control.failureRatePct}%</span>
                    </div>
                    <div className="w-full bg-slate-100 h-1.5 rounded-full overflow-hidden">
                      <div className="bg-red-500 h-1.5 rounded-full" style={{ width: `${control.failureRatePct}%` }} />
                    </div>
                  </div>
                </div>

                {/* Framework impact chips */}
                <div className="mt-4 pt-3 border-t border-slate-100">
                  <div className="text-[10px] text-slate-400 uppercase font-semibold">Regulatory Mappings</div>
                  <div className="flex flex-wrap gap-1 mt-1">
                    {control.frameworkMappings.slice(0, 3).map((f, i) => (
                      <span key={i} className="text-[10px] font-mono px-1.5 py-0.5 bg-slate-50 text-slate-600 rounded border border-slate-200">
                        {f}
                      </span>
                    ))}
                  </div>
                </div>
              </div>

              {/* Bottom Rupee Metric & Simulation Action */}
              <div className="mt-5 pt-3 border-t border-slate-100 flex items-center justify-between">
                <div>
                  <div className="text-[10px] text-slate-400">Potential Risk Reduction</div>
                  <div className="text-sm font-bold font-mono text-emerald-700">
                    ₹{control.potentialRiskReductionCr.toFixed(1)} Cr
                  </div>
                </div>
                <button
                  onClick={() => onNavigate('scenarios')}
                  className="px-2.5 py-1 text-xs font-semibold text-blue-700 bg-blue-50 hover:bg-blue-100 rounded border border-blue-200 transition-colors"
                >
                  Simulate
                </button>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

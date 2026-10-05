import React, { useState } from 'react';
import { RiskDriver, PageId } from '../types/index.js';
import { ExplainabilityData } from '../components/ExplainabilityModal.js';
import { Flame, ArrowRight, ShieldAlert, ChevronRight, HelpCircle, Server } from 'lucide-react';

interface Props {
  riskDrivers: RiskDriver[];
  onNavigate: (page: PageId) => void;
  onOpenExplainability: (data: ExplainabilityData) => void;
}

export const RiskDriversPage: React.FC<Props> = ({
  riskDrivers,
  onNavigate,
  onOpenExplainability
}) => {
  const [selectedDriverId, setSelectedDriverId] = useState<string>(riskDrivers[0]?.id || 'rd-01');

  const selectedDriver = riskDrivers.find(d => d.id === selectedDriverId) || riskDrivers[0];
  const maxExposure = Math.max(...riskDrivers.map(d => d.financialExposureCr));

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="bg-white border border-slate-200 rounded-lg p-6">
        <div className="flex items-center gap-2 text-xs font-semibold text-red-600 uppercase tracking-wider">
          <Flame className="w-4 h-4" />
          <span>Vulnerability & Attack Vector Telemetry</span>
        </div>
        <h2 className="text-xl font-bold text-slate-900 mt-1">Top Risk Drivers</h2>
        <p className="text-xs text-slate-500 mt-1 max-w-3xl leading-relaxed">
          These are the primary root-cause conditions responsible for the majority of Nexa Financial Services' ₹18.4 Cr financial cyber exposure. Click any driver to inspect its affected assets and remediation roadmap.
        </p>
      </div>

      {/* Main Grid: Horizontal Bar Chart & Selected Driver Detail */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Horizontal Bar Chart (Left 2 Columns) */}
        <div className="lg:col-span-2 bg-white border border-slate-200 rounded-lg p-5">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-sm font-bold text-slate-900">Financial Exposure Contribution (₹ Crore)</h3>
            <span className="text-xs text-slate-500 font-mono">Ranked by Downstream Loss</span>
          </div>

          <div className="space-y-4">
            {riskDrivers.map((driver, idx) => {
              const isSelected = driver.id === selectedDriverId;
              const widthPct = Math.round((driver.financialExposureCr / maxExposure) * 100);

              return (
                <div
                  key={driver.id}
                  onClick={() => setSelectedDriverId(driver.id)}
                  className={`p-3.5 rounded-lg border transition-all cursor-pointer ${
                    isSelected
                      ? 'border-blue-500 bg-blue-50/40 shadow-xs'
                      : 'border-slate-200 hover:border-slate-300 hover:bg-slate-50/60'
                  }`}
                >
                  <div className="flex items-center justify-between text-xs mb-1.5">
                    <div className="flex items-center gap-2">
                      <span className="font-mono font-bold text-slate-400">0{idx + 1}.</span>
                      <span className="font-semibold text-slate-900">{driver.title}</span>
                    </div>
                    <div className="flex items-center gap-2 shrink-0">
                      <span className="font-mono font-bold text-red-600 text-sm">
                        ₹{driver.financialExposureCr.toFixed(1)} Cr
                      </span>
                      <span className="text-[11px] text-slate-400 font-mono">
                        ({driver.percentageContribution}%)
                      </span>
                    </div>
                  </div>

                  {/* Visual Bar */}
                  <div className="w-full bg-slate-100 h-2 rounded-full overflow-hidden">
                    <div
                      className={`h-2 rounded-full transition-all duration-300 ${
                        idx === 0
                          ? 'bg-red-600'
                          : idx === 1
                          ? 'bg-red-500'
                          : idx === 2
                          ? 'bg-amber-500'
                          : 'bg-blue-600'
                      }`}
                      style={{ width: `${widthPct}%` }}
                    />
                  </div>

                  <div className="mt-2 flex items-center justify-between text-[11px] text-slate-500">
                    <span>Category: {driver.category}</span>
                    <span>{driver.affectedAssets.length} Affected Asset{driver.affectedAssets.length > 1 ? 's' : ''}</span>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Selected Driver Drill-Down (Right Column) */}
        <div className="bg-white border border-slate-200 rounded-lg p-5 flex flex-col justify-between">
          <div>
            <div className="flex items-center justify-between">
              <span className="text-[11px] font-mono uppercase text-blue-700 font-bold bg-blue-50 px-2 py-0.5 rounded">
                Driver Drill-Down
              </span>
              <button
                onClick={() => {
                  onOpenExplainability({
                    title: selectedDriver.title,
                    category: selectedDriver.category,
                    assetName: selectedDriver.affectedAssets.join(', '),
                    likelihoodFormula: `Driver Probability: Calculated across ${selectedDriver.affectedAssets.length} endpoints`,
                    likelihoodResult: `${selectedDriver.percentageContribution}% of Aggregate Portfolio Exposure`,
                    impactBreakdown: {
                      downtime: Number((selectedDriver.financialExposureCr * 0.3).toFixed(2)),
                      breach: Number((selectedDriver.financialExposureCr * 0.35).toFixed(2)),
                      recovery: Number((selectedDriver.financialExposureCr * 0.12).toFixed(2)),
                      regulatory: Number((selectedDriver.financialExposureCr * 0.08).toFixed(2)),
                      disruption: Number((selectedDriver.financialExposureCr * 0.1).toFixed(2)),
                      reputation: Number((selectedDriver.financialExposureCr * 0.05).toFixed(2)),
                      total: selectedDriver.financialExposureCr
                    },
                    ealFormula: `Direct Exposure Contribution = ₹${selectedDriver.financialExposureCr.toFixed(2)} Cr`,
                    mitigationAction: selectedDriver.recommendedMitigation,
                    evidenceNotes: selectedDriver.rootCause
                  });
                }}
                className="text-xs text-blue-600 hover:text-blue-800 font-semibold flex items-center gap-1"
              >
                <HelpCircle className="w-3.5 h-3.5" />
                <span>Why?</span>
              </button>
            </div>

            <h3 className="text-base font-bold text-slate-900 mt-3">{selectedDriver.title}</h3>

            <div className="mt-4 p-3 bg-red-50 border border-red-200 rounded-lg">
              <div className="text-xs text-red-700 font-medium">Downstream Financial Exposure</div>
              <div className="text-2xl font-bold font-mono text-red-900 mt-0.5">
                ₹{selectedDriver.financialExposureCr.toFixed(2)} Crore
              </div>
              <div className="text-[11px] text-red-600 mt-0.5">
                Accounts for {selectedDriver.percentageContribution}% of total enterprise risk
              </div>
            </div>

            <div className="mt-4 space-y-3 text-xs">
              <div>
                <div className="font-semibold text-slate-800">Root Cause Analysis</div>
                <p className="text-slate-600 mt-1 leading-relaxed bg-slate-50 p-2.5 rounded border border-slate-100">
                  {selectedDriver.rootCause}
                </p>
              </div>

              <div>
                <div className="font-semibold text-slate-800">Affected Mission-Critical Assets</div>
                <div className="mt-1.5 space-y-1">
                  {selectedDriver.affectedAssets.map((assetName, idx) => (
                    <div
                      key={idx}
                      onClick={() => onNavigate('assets')}
                      className="p-2 rounded bg-slate-50 border border-slate-200 flex items-center justify-between hover:bg-blue-50/50 cursor-pointer"
                    >
                      <div className="flex items-center gap-2">
                        <Server className="w-3.5 h-3.5 text-slate-400" />
                        <span className="font-medium text-slate-900">{assetName}</span>
                      </div>
                      <ChevronRight className="w-3.5 h-3.5 text-slate-400" />
                    </div>
                  ))}
                </div>
              </div>

              <div>
                <div className="font-semibold text-slate-800">Recommended Security Mitigation</div>
                <p className="text-slate-700 mt-1 leading-relaxed bg-emerald-50/60 p-2.5 rounded border border-emerald-200 text-emerald-900">
                  {selectedDriver.recommendedMitigation}
                </p>
              </div>
            </div>
          </div>

          <div className="mt-6 pt-4 border-t border-slate-100">
            <button
              onClick={() => onNavigate('scenarios')}
              className="w-full py-2 px-3 bg-slate-900 hover:bg-slate-800 text-white rounded text-xs font-semibold flex items-center justify-center gap-1.5 transition-colors"
            >
              <span>Simulate Mitigation in What-If Simulator</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

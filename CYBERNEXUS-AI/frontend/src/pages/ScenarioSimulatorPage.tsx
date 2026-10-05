import React, { useState, useEffect } from 'react';
import { ScenarioPreset, ScenarioSimulationResult, PageId } from '../types/index.js';
import { api } from '../services/api.js';
import { Sliders, ArrowRight } from 'lucide-react';

interface Props {
  scenarios: ScenarioPreset[];
  onNavigate: (page: PageId) => void;
}

export const ScenarioSimulatorPage: React.FC<Props> = ({ scenarios, onNavigate }) => {
  const [selectedScenarioId, setSelectedScenarioId] = useState<string>('scen-mfa');
  const [rolloutPercentage, setRolloutPercentage] = useState<number>(100);
  const [simulationResult, setSimulationResult] = useState<ScenarioSimulationResult | null>(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    runSimulation(selectedScenarioId, rolloutPercentage);
  }, [selectedScenarioId, rolloutPercentage]);

  const runSimulation = async (scenId: string, rolloutPct: number) => {
    setLoading(true);
    try {
      const multiplier = rolloutPct / 100;
      const res = await api.simulateScenario(scenId, multiplier);
      setSimulationResult(res);
    } catch (e) {
      console.error('Simulation error', e);
    } finally {
      setLoading(false);
    }
  };

  const selectedPreset = scenarios.find(s => s.id === selectedScenarioId) || scenarios[0];
  const isNegative = selectedPreset.isNegativeScenario ?? false;

  return (
    <div className="space-y-6">
      <div className="bg-white border border-slate-200 rounded-lg p-6">
        <div className="flex items-center justify-between">
          <div>
            <div className="flex items-center gap-2 text-xs font-semibold text-blue-700 uppercase tracking-wider">
              <Sliders className="w-4 h-4" />
              <span>Interactive Decision Modeling</span>
            </div>
            <h2 className="text-xl font-bold text-slate-900 mt-1">Cyber Risk What-If Simulator</h2>
            <p className="text-xs text-slate-500 mt-1 max-w-3xl leading-relaxed">
              Test strategic security interventions before spending capital. Model the immediate financial impact on incident likelihood, enterprise exposure, and expected annual loss.
            </p>
          </div>
          <button
            onClick={() => onNavigate('investment')}
            className="px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded text-xs font-semibold flex items-center gap-1.5 transition-colors shadow-xs"
          >
            <span>Proceed to Investment Optimizer</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3.5">
        {scenarios.map((scen, idx) => {
          const isSelected = scen.id === selectedScenarioId;
          const isNeg = scen.isNegativeScenario ?? false;

          return (
            <div
              key={scen.id}
              onClick={() => setSelectedScenarioId(scen.id)}
              className={`p-4 rounded-lg border text-left cursor-pointer transition-all ${
                isSelected
                  ? isNeg
                    ? 'border-red-600 bg-red-50/50 ring-2 ring-red-500/20 shadow-xs'
                    : 'border-blue-600 bg-blue-50/40 ring-2 ring-blue-500/20 shadow-xs'
                  : isNeg
                  ? 'border-red-200 bg-red-50/20 hover:border-red-300'
                  : 'border-slate-200 bg-white hover:border-slate-300 hover:bg-slate-50'
              }`}
            >
              <div className="flex items-center justify-between text-xs mb-1.5">
                <span className="font-mono text-[10px] text-slate-400 font-bold">SCENARIO 0{idx + 1}</span>
                <span className={`text-[10px] font-mono px-1.5 py-0.5 rounded font-semibold ${
                  isNeg ? 'bg-red-100 text-red-800' : 'bg-slate-100 text-slate-700'
                }`}>
                  {scen.category}
                </span>
              </div>

              <h3 className="text-sm font-bold text-slate-900 leading-snug">{scen.title}</h3>
              <p className="text-xs text-slate-600 mt-1 line-clamp-2">{scen.description}</p>

              <div className="mt-3 pt-3 border-t border-slate-100 flex items-center justify-between text-xs font-mono">
                <span className="text-slate-500">
                  {scen.costLakh > 0 ? `Cost: ₹${scen.costLakh} Lakh` : 'Cost: ₹0'}
                </span>
                <span className={`font-bold ${isNeg ? 'text-red-600' : 'text-emerald-700'}`}>
                  {isNeg ? `+₹${Math.abs(scen.exposureReductionCr)} Cr Risk` : `-₹${scen.exposureReductionCr} Cr Risk`}
                </span>
              </div>
            </div>
          );
        })}
      </div>

      {simulationResult && (
        <div className="bg-white border border-slate-200 rounded-lg p-6 space-y-6">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-slate-100">
            <div>
              <div className="text-xs text-slate-400 font-mono">ACTIVE WHAT-IF SCENARIO</div>
              <h3 className="text-lg font-bold text-slate-900 mt-0.5">{simulationResult.scenarioTitle}</h3>
            </div>

            <div className="flex items-center gap-3 bg-slate-50 px-4 py-2 rounded-lg border border-slate-200">
              <span className="text-xs text-slate-600 font-medium">Rollout Depth:</span>
              <input
                type="range"
                min="25"
                max="100"
                step="25"
                value={rolloutPercentage}
                onChange={e => setRolloutPercentage(parseInt(e.target.value))}
                className="w-28 accent-blue-600 cursor-pointer"
              />
              <span className="font-mono font-bold text-xs text-slate-900 w-12 text-right">
                {rolloutPercentage}%
              </span>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="bg-slate-50 border border-slate-200 rounded-lg p-5">
              <div className="text-xs font-mono uppercase text-slate-400 font-bold">1. Current State (Before)</div>
              <div className="mt-3">
                <div className="text-xs text-slate-500">Financial Exposure</div>
                <div className="text-3xl font-extrabold font-mono text-slate-900 mt-0.5">
                  ₹{simulationResult.before.financialExposureCr.toFixed(1)} Cr
                </div>
              </div>
              <div className="mt-4 pt-3 border-t border-slate-200/80 space-y-1.5 text-xs text-slate-600 font-mono">
                <div className="flex justify-between">
                  <span>Incident Probability:</span>
                  <span className="font-bold text-slate-800">{simulationResult.before.incidentProbabilityPct}%</span>
                </div>
                <div className="flex justify-between">
                  <span>Expected Annual Loss:</span>
                  <span className="font-bold text-slate-800">₹{simulationResult.before.expectedAnnualLossCr.toFixed(1)} Cr</span>
                </div>
                <div className="flex justify-between">
                  <span>Enterprise Risk Score:</span>
                  <span className="font-bold text-slate-800">{simulationResult.before.enterpriseRiskScore} / 100</span>
                </div>
              </div>
            </div>

            <div className={`border rounded-lg p-5 ${
              isNegative ? 'bg-red-50/60 border-red-200' : 'bg-blue-50/50 border-blue-200'
            }`}>
              <div className={`text-xs font-mono uppercase font-bold ${isNegative ? 'text-red-700' : 'text-blue-700'}`}>
                2. After Proposed Control
              </div>
              <div className="mt-3">
                <div className="text-xs text-slate-500">Projected Exposure</div>
                <div className={`text-3xl font-extrabold font-mono mt-0.5 ${
                  isNegative ? 'text-red-700' : 'text-blue-900'
                }`}>
                  ₹{simulationResult.after.financialExposureCr.toFixed(1)} Cr
                </div>
              </div>
              <div className="mt-4 pt-3 border-t border-blue-200/60 space-y-1.5 text-xs font-mono">
                <div className="flex justify-between text-slate-700">
                  <span>Incident Probability:</span>
                  <span className={`font-bold ${isNegative ? 'text-red-700' : 'text-blue-700'}`}>
                    {simulationResult.after.incidentProbabilityPct}%
                  </span>
                </div>
                <div className="flex justify-between text-slate-700">
                  <span>Expected Annual Loss:</span>
                  <span className="font-bold text-slate-900">₹{simulationResult.after.expectedAnnualLossCr.toFixed(1)} Cr</span>
                </div>
                <div className="flex justify-between text-slate-700">
                  <span>Enterprise Risk Score:</span>
                  <span className="font-bold text-slate-900">{simulationResult.after.enterpriseRiskScore} / 100</span>
                </div>
              </div>
            </div>

            <div className={`border rounded-lg p-5 flex flex-col justify-between ${
              isNegative ? 'bg-amber-50 border-amber-200' : 'bg-emerald-50/60 border-emerald-200'
            }`}>
              <div>
                <div className={`text-xs font-mono uppercase font-bold ${isNegative ? 'text-amber-800' : 'text-emerald-800'}`}>
                  3. Net Risk Reduction & ROSI
                </div>
                <div className="mt-3">
                  <div className="text-xs text-slate-500">{isNegative ? 'Exposure Escalation' : 'Total Risk Reduction'}</div>
                  <div className={`text-3xl font-extrabold font-mono mt-0.5 ${
                    isNegative ? 'text-red-700' : 'text-emerald-700'
                  }`}>
                    {isNegative ? `+₹${Math.abs(simulationResult.delta.exposureDeltaCr).toFixed(1)} Cr` : `₹${simulationResult.delta.riskReductionCr.toFixed(1)} Cr`}
                  </div>
                </div>

                <div className="mt-4 pt-3 border-t border-emerald-200/60 space-y-1.5 text-xs font-mono">
                  <div className="flex justify-between text-slate-700">
                    <span>Implementation Cost:</span>
                    <span className="font-bold text-slate-900">₹{simulationResult.investmentCostLakh} Lakh</span>
                  </div>
                  {!isNegative && (
                    <div className="flex justify-between text-slate-700">
                      <span>Estimated ROSI:</span>
                      <span className="font-extrabold text-emerald-800 text-sm">{simulationResult.rosiPct}%</span>
                    </div>
                  )}
                </div>
              </div>

              {!isNegative && (
                <div className="mt-3 text-[11px] font-semibold text-emerald-800 bg-emerald-100/70 p-2 rounded text-center">
                  Protected ₹{((simulationResult.delta.riskReductionCr / (simulationResult.investmentCostCr || 0.1)) || 0).toFixed(2)} per ₹1 invested
                </div>
              )}
            </div>
          </div>

          <div className="p-4 bg-slate-50 border border-slate-200 rounded-lg text-xs text-slate-700 leading-relaxed">
            <strong className="text-slate-900">Decision Analysis: </strong>
            {simulationResult.explanation}
          </div>
        </div>
      )}
    </div>
  );
};

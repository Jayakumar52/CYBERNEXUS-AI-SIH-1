import React, { useState, useEffect } from 'react';
import { OptimizationResult, InvestmentCurvePoint, SecurityAction, PageId } from '../types/index.js';
import { api } from '../services/api.js';
import { DollarSign, CheckCircle2, Sparkles } from 'lucide-react';
import confetti from 'canvas-confetti';

interface Props {
  onNavigate: (page: PageId) => void;
}

export const InvestmentOptimizerPage: React.FC<Props> = ({ onNavigate }) => {
  const [budgetLakh, setBudgetLakh] = useState<number>(100);
  const [optimization, setOptimization] = useState<OptimizationResult | null>(null);
  const [curve, setCurve] = useState<InvestmentCurvePoint[]>([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    fetchOptimization(budgetLakh);
  }, [budgetLakh]);

  const fetchOptimization = async (budget: number) => {
    setLoading(true);
    try {
      const data = await api.optimizeInvestment(budget);
      setOptimization(data.result);
      setCurve(data.investmentCurve);
    } catch (e) {
      console.error('Optimization error', e);
    } finally {
      setLoading(false);
    }
  };

  const handleBudgetPreset = (lakh: number) => {
    setBudgetLakh(lakh);
    if (lakh === 100 || lakh === 80) {
      try {
        confetti({ particleCount: 50, spread: 50, origin: { y: 0.7 } });
      } catch (e) {}
    }
  };

  return (
    <div className="space-y-6">
      <div className="bg-white border border-slate-200 rounded-lg p-6">
        <div className="flex items-center justify-between">
          <div>
            <div className="flex items-center gap-2 text-xs font-semibold text-emerald-700 uppercase tracking-wider">
              <DollarSign className="w-4 h-4" />
              <span>Algorithmic Capital Allocation</span>
            </div>
            <h2 className="text-xl font-bold text-slate-900 mt-1">Security Investment Optimizer (ROSI Engine)</h2>
            <p className="text-xs text-slate-500 mt-1 max-w-3xl leading-relaxed">
              Solves the executive mandate: <em>"Where should we spend our next ₹1 Crore?"</em> CYBERNEXUS AI executes a 0/1 Knapsack Dynamic Programming algorithm to mathematically maximize risk reduction per rupee under your budget envelope.
            </p>
          </div>
          <div className="text-right shrink-0 hidden md:block">
            <div className="text-xs text-slate-500">Methodology</div>
            <div className="font-mono text-xs font-bold text-blue-700 bg-blue-50 px-2 py-1 rounded mt-0.5">
              0/1 Knapsack DP + ROSI
            </div>
          </div>
        </div>

        <div className="mt-5 pt-4 border-t border-slate-100 flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
          <div className="flex items-center gap-3 w-full md:w-auto">
            <span className="text-xs font-bold text-slate-900 whitespace-nowrap">Available Budget:</span>
            <input
              type="range"
              min="20"
              max="200"
              step="10"
              value={budgetLakh}
              onChange={e => setBudgetLakh(parseInt(e.target.value))}
              className="w-48 sm:w-64 accent-emerald-600 cursor-pointer"
            />
            <span className="font-mono font-extrabold text-slate-900 text-sm w-24">
              ₹{(budgetLakh / 100).toFixed(2)} Cr
            </span>
          </div>

          <div className="flex items-center gap-1.5 flex-wrap">
            <span className="text-xs text-slate-400 mr-1 hidden sm:inline">Presets:</span>
            {[35, 50, 80, 100, 150, 200].map(val => (
              <button
                key={val}
                onClick={() => handleBudgetPreset(val)}
                className={`px-2.5 py-1 text-xs rounded font-medium transition-colors ${
                  budgetLakh === val
                    ? 'bg-slate-900 text-white font-bold'
                    : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
                }`}
              >
                {val >= 100 ? `₹${(val / 100).toFixed(1)} Cr` : `₹${val} Lakh`}
              </button>
            ))}
          </div>
        </div>
      </div>

      {optimization && (
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <div className="lg:col-span-2 space-y-6">
            <div className="bg-emerald-50/70 border border-emerald-200 rounded-lg p-5">
              <div className="flex items-center justify-between text-xs mb-3">
                <span className="font-mono uppercase font-bold text-emerald-800 flex items-center gap-1.5">
                  <Sparkles className="w-3.5 h-3.5" />
                  <span>Recommended Optimal Allocation under ₹{optimization.budgetCrore.toFixed(2)} Cr</span>
                </span>
                <span className="font-mono text-emerald-800 font-bold bg-emerald-100 px-2 py-0.5 rounded">
                  {optimization.selectedActions.length} Actions Funded
                </span>
              </div>

              <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 text-center my-3">
                <div className="p-3 bg-white rounded border border-emerald-200 shadow-2xs">
                  <div className="text-[11px] text-slate-500">Allocated Cost</div>
                  <div className="text-xl font-bold font-mono text-slate-900 mt-0.5">
                    ₹{optimization.totalCostLakh} L
                  </div>
                  <div className="text-[10px] text-slate-400">Budget: ₹{optimization.budgetLakh} L</div>
                </div>

                <div className="p-3 bg-white rounded border border-emerald-200 shadow-2xs">
                  <div className="text-[11px] text-slate-500">Risk Reduction</div>
                  <div className="text-xl font-bold font-mono text-emerald-700 mt-0.5">
                    ₹{optimization.totalRiskReductionCrore.toFixed(1)} Cr
                  </div>
                  <div className="text-[10px] text-emerald-600">Saved from Exposure</div>
                </div>

                <div className="p-3 bg-white rounded border border-emerald-200 shadow-2xs">
                  <div className="text-[11px] text-slate-500">Return on Security</div>
                  <div className="text-xl font-bold font-mono text-blue-700 mt-0.5">
                    {optimization.rosiPercentage}%
                  </div>
                  <div className="text-[10px] text-blue-600 font-mono">ROSI Formula</div>
                </div>

                <div className="p-3 bg-white rounded border border-emerald-200 shadow-2xs">
                  <div className="text-[11px] text-slate-500">Rupee Multiplier</div>
                  <div className="text-xl font-bold font-mono text-emerald-800 mt-0.5">
                    ₹{optimization.roiMultiplier}
                  </div>
                  <div className="text-[10px] text-slate-500">Per ₹1 Spent</div>
                </div>
              </div>

              <div className="text-xs text-emerald-900 p-2.5 bg-emerald-100/60 rounded border border-emerald-200 mt-2">
                <strong>Algorithmic Explanation: </strong>
                {optimization.rationale}
              </div>
            </div>

            <div className="bg-white border border-slate-200 rounded-lg p-5">
              <h3 className="text-sm font-bold text-slate-900 mb-3">Portfolio Breakdown & Prioritization</h3>
              <div className="space-y-3">
                {optimization.selectedActions.map(action => (
                  <div
                    key={action.id}
                    className="p-3.5 rounded-lg border border-emerald-200 bg-emerald-50/20 flex flex-col sm:flex-row sm:items-center justify-between gap-3"
                  >
                    <div className="flex items-start gap-2.5">
                      <div className="w-5 h-5 rounded-full bg-emerald-600 text-white flex items-center justify-center shrink-0 mt-0.5">
                        <CheckCircle2 className="w-3.5 h-3.5" />
                      </div>
                      <div>
                        <div className="flex items-center gap-2">
                          <span className="text-xs font-bold text-slate-900">{action.name}</span>
                          <span className="text-[10px] font-mono text-slate-500 bg-slate-100 px-1.5 py-0.5 rounded">
                            {action.category}
                          </span>
                        </div>
                        <p className="text-xs text-slate-600 mt-1">{action.rationale}</p>
                      </div>
                    </div>

                    <div className="text-right shrink-0 flex sm:flex-col justify-between items-end gap-1">
                      <div className="text-xs font-mono font-bold text-slate-900">
                        Cost: ₹{action.costLakh} Lakh
                      </div>
                      <div className="text-xs font-mono font-bold text-emerald-700">
                        Risk Cut: ₹{action.riskReductionCr.toFixed(1)} Cr
                      </div>
                    </div>
                  </div>
                ))}

                {optimization.unselectedActions.map(action => (
                  <div
                    key={action.id}
                    className="p-3 rounded-lg border border-slate-200 bg-slate-50/60 opacity-60 flex items-center justify-between text-xs"
                  >
                    <div>
                      <span className="font-medium text-slate-700">{action.name}</span>
                      <span className="text-[10px] text-slate-400 ml-2 font-mono">Excluded (Exceeds current budget)</span>
                    </div>
                    <div className="text-right font-mono text-slate-500">
                      Cost: ₹{action.costLakh} L · Potential: ₹{action.riskReductionCr.toFixed(1)} Cr
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          <div className="space-y-6">
            <div className="bg-white border border-slate-200 rounded-lg p-5">
              <div className="flex items-center justify-between mb-3">
                <div>
                  <h4 className="text-sm font-bold text-slate-900">Risk Exposure vs Investment Curve</h4>
                  <p className="text-[11px] text-slate-500">Diminishing returns & optimal capital frontier</p>
                </div>
              </div>

              <div className="h-52 w-full pt-2">
                <svg viewBox="0 0 300 170" className="w-full h-full overflow-visible">
                  <line x1="30" y1="20" x2="30" y2="140" stroke="#cbd5e1" strokeWidth="1" />
                  <line x1="30" y1="140" x2="280" y2="140" stroke="#cbd5e1" strokeWidth="1" />

                  <text x="25" y="24" fontSize="8" fill="#94a3b8" textAnchor="end" fontFamily="monospace">₹18Cr</text>
                  <text x="25" y="80" fontSize="8" fill="#94a3b8" textAnchor="end" fontFamily="monospace">₹14Cr</text>
                  <text x="25" y="140" fontSize="8" fill="#94a3b8" textAnchor="end" fontFamily="monospace">₹10Cr</text>

                  <rect x="115" y="20" width="40" height="120" fill="#10b981" fillOpacity="0.08" />
                  <text x="135" y="32" fontSize="7" fill="#059669" textAnchor="middle" fontWeight="bold">
                    OPTIMAL ZONE
                  </text>

                  <path
                    d="M 30 25 Q 90 70, 130 95 T 270 125"
                    fill="none"
                    stroke="#dc2626"
                    strokeWidth="2.5"
                    strokeLinecap="round"
                  />

                  {(() => {
                    const cx = 30 + ((budgetLakh - 20) / 180) * 240;
                    return (
                      <g>
                        <line x1={cx} y1="20" x2={cx} y2="140" stroke="#2563eb" strokeWidth="1.5" strokeDasharray="3 3" />
                        <circle cx={cx} cy="95" r="4.5" fill="#2563eb" stroke="#ffffff" strokeWidth="1.5" />
                        <text x={cx} y="152" fontSize="8" fill="#2563eb" textAnchor="middle" fontWeight="bold" fontFamily="monospace">
                          ₹{(budgetLakh / 100).toFixed(1)}Cr
                        </text>
                      </g>
                    );
                  })()}

                  <circle cx="40" cy="165" r="3" fill="#dc2626" />
                  <text x="47" y="168" fontSize="8" fill="#64748b">Residual Exposure</text>
                </svg>
              </div>

              <div className="mt-2 text-[11px] text-slate-500 leading-relaxed p-2 bg-slate-50 rounded">
                Notice the steep slope between ₹0 and ₹80 Lakh (high ROSI), tapering into diminishing returns past ₹1.5 Cr.
              </div>
            </div>

            <div className="bg-slate-900 text-white rounded-lg p-5">
              <div className="text-xs font-mono text-blue-400 uppercase font-semibold">
                Financial Formula Transparency
              </div>
              <h4 className="text-sm font-bold text-white mt-1">Return on Security Investment (ROSI)</h4>

              <div className="mt-3 p-3 bg-slate-800 rounded font-mono text-xs text-blue-300">
                ROSI = (Risk Reduction − Investment) ÷ Investment × 100
              </div>

              <div className="mt-3 text-xs space-y-1 text-slate-300 font-mono">
                <div>Risk Reduction = ₹{optimization.totalRiskReductionCrore.toFixed(1)} Cr</div>
                <div>Security Investment = ₹{optimization.totalCostCrore.toFixed(2)} Cr</div>
                <div className="pt-2 border-t border-slate-700 text-emerald-400 font-bold text-sm">
                  ROSI = ({optimization.totalRiskReductionCrore.toFixed(1)} − {optimization.totalCostCrore.toFixed(2)}) ÷ {optimization.totalCostCrore.toFixed(2)} × 100 = {optimization.rosiPercentage}%
                </div>
              </div>

              <div className="mt-4 pt-3 border-t border-slate-800 text-center">
                <span className="text-xs text-slate-400">
                  Defensible for CFO and Board Audit Review
                </span>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

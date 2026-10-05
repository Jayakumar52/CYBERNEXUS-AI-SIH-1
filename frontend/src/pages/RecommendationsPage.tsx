import React from 'react';
import { AIRecommendation, PageId } from '../types/index.js';
import { ExplainabilityData } from '../components/ExplainabilityModal.js';
import { Sparkles, ArrowRight, CheckCircle2, TrendingUp, HelpCircle, DollarSign } from 'lucide-react';

interface Props {
  recommendations: AIRecommendation[];
  onNavigate: (page: PageId) => void;
  onOpenExplainability: (data: ExplainabilityData) => void;
}

export const RecommendationsPage: React.FC<Props> = ({
  recommendations,
  onNavigate,
  onOpenExplainability
}) => {
  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="bg-white border border-slate-200 rounded-lg p-6">
        <div className="flex items-center justify-between">
          <div>
            <div className="flex items-center gap-2 text-xs font-semibold text-blue-700 uppercase tracking-wider">
              <Sparkles className="w-4 h-4" />
              <span>Prioritized Decision Support</span>
            </div>
            <h2 className="text-xl font-bold text-slate-900 mt-1">AI Mitigation Recommendations</h2>
            <p className="text-xs text-slate-500 mt-1 max-w-3xl leading-relaxed">
              Derived dynamically by evaluating current exposure, control deficiencies, and cost-to-remediate. Ranked by risk reduction per rupee spent (ROSI).
            </p>
          </div>
          <button
            onClick={() => onNavigate('investment')}
            className="px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded text-xs font-semibold flex items-center gap-1.5 transition-colors shadow-xs"
          >
            <span>Optimize Budget in Knapsack Engine</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </button>
        </div>
      </div>

      {/* Recommendations Cards */}
      <div className="space-y-4">
        {recommendations.map((rec, idx) => (
          <div
            key={rec.id}
            className="bg-white border border-slate-200 rounded-lg p-5 hover:border-slate-300 transition-all shadow-xs"
          >
            <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4 pb-4 border-b border-slate-100">
              <div className="flex items-start gap-3">
                <div className="w-7 h-7 rounded bg-blue-50 text-blue-700 font-mono font-bold text-xs flex items-center justify-center shrink-0 mt-0.5">
                  0{idx + 1}
                </div>
                <div>
                  <div className="flex items-center gap-2">
                    <span className={`text-[10px] font-mono px-2 py-0.5 rounded font-bold ${
                      rec.priority === 'CRITICAL' ? 'bg-red-50 text-red-700 border border-red-200' :
                      rec.priority === 'HIGH' ? 'bg-amber-50 text-amber-800 border border-amber-200' :
                      'bg-blue-50 text-blue-700'
                    }`}>
                      {rec.priority} PRIORITY
                    </span>
                    <span className="text-xs text-slate-400">·</span>
                    <span className="text-xs text-slate-500 font-medium">{rec.category}</span>
                    <span className="text-xs text-slate-400">·</span>
                    <span className="text-xs text-slate-600 font-semibold">{rec.affectedAsset}</span>
                  </div>
                  <h3 className="text-base font-bold text-slate-900 mt-1">{rec.title}</h3>
                </div>
              </div>

              {/* Financial Metrics Strip */}
              <div className="flex flex-wrap items-center gap-4 text-xs font-mono shrink-0">
                <div className="p-2 bg-slate-50 rounded border border-slate-100">
                  <div className="text-[10px] text-slate-400 uppercase">Current Risk</div>
                  <div className="font-bold text-slate-900 text-sm">₹{rec.currentRiskCr.toFixed(1)} Cr</div>
                </div>
                <div className="p-2 bg-blue-50 rounded border border-blue-100">
                  <div className="text-[10px] text-blue-600 uppercase">After Control</div>
                  <div className="font-bold text-blue-900 text-sm">₹{rec.riskAfterControlCr.toFixed(1)} Cr</div>
                </div>
                <div className="p-2 bg-emerald-50 rounded border border-emerald-100">
                  <div className="text-[10px] text-emerald-600 uppercase">Risk Reduction</div>
                  <div className="font-bold text-emerald-800 text-sm">₹{rec.riskReductionCr.toFixed(1)} Cr</div>
                </div>
                <div className="p-2 bg-slate-50 rounded border border-slate-100">
                  <div className="text-[10px] text-slate-400 uppercase">Cost</div>
                  <div className="font-bold text-slate-900 text-sm">₹{rec.implementationCostLakh} L</div>
                </div>
                <div className="p-2 bg-emerald-100 text-emerald-900 rounded border border-emerald-200">
                  <div className="text-[10px] uppercase font-bold text-emerald-700">Estimated ROSI</div>
                  <div className="font-bold text-base">{rec.rosiPct}%</div>
                </div>
              </div>
            </div>

            {/* Rationale and Step-by-Step Evidence */}
            <div className="mt-4 pt-1 flex flex-col md:flex-row md:items-center justify-between gap-4 text-xs">
              <div className="flex-1 text-slate-600 leading-relaxed">
                <strong className="text-slate-800">Business & Technical Rationale: </strong>
                {rec.reason}
              </div>

              <div className="flex items-center gap-2 shrink-0">
                <button
                  onClick={() => {
                    onOpenExplainability({
                      title: rec.title,
                      category: `${rec.category} Mitigation`,
                      assetName: rec.affectedAsset,
                      cveOrRef: rec.cveOrThreatRef,
                      likelihoodFormula: rec.stepByStepEvidence.likelihoodCalculation,
                      likelihoodResult: 'Actionable ROI Derivation',
                      impactBreakdown: {
                        downtime: Number((rec.currentRiskCr * 0.28).toFixed(2)),
                        breach: Number((rec.currentRiskCr * 0.35).toFixed(2)),
                        recovery: Number((rec.currentRiskCr * 0.12).toFixed(2)),
                        regulatory: Number((rec.currentRiskCr * 0.10).toFixed(2)),
                        disruption: Number((rec.currentRiskCr * 0.10).toFixed(2)),
                        reputation: Number((rec.currentRiskCr * 0.05).toFixed(2)),
                        total: rec.currentRiskCr
                      },
                      ealFormula: `Net Risk Reduction = ₹${rec.riskReductionCr.toFixed(2)} Cr · Cost: ₹${rec.implementationCostLakh} Lakh`,
                      mitigationAction: rec.reason,
                      rosi: `${rec.rosiPct}% ROSI`,
                      evidenceNotes: `${rec.stepByStepEvidence.telemetrySource} | Severity: ${rec.stepByStepEvidence.vulnerabilitySeverity}`
                    });
                  }}
                  className="px-3 py-1.5 text-xs text-blue-700 bg-blue-50 hover:bg-blue-100 border border-blue-200 rounded font-semibold flex items-center gap-1 transition-colors"
                >
                  <HelpCircle className="w-3.5 h-3.5" />
                  <span>Explain Math (Why?)</span>
                </button>

                <button
                  onClick={() => onNavigate('scenarios')}
                  className="px-3 py-1.5 text-xs text-slate-700 bg-slate-100 hover:bg-slate-200 border border-slate-200 rounded font-semibold flex items-center gap-1 transition-colors"
                >
                  <span>Simulate Impact</span>
                  <ArrowRight className="w-3 h-3" />
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

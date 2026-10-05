import React, { useState } from 'react';
import { Asset, EnterpriseMetrics, FinancialBreakdown } from '../types/index.js';
import { ExplainabilityData } from '../components/ExplainabilityModal.js';
import { Calculator } from 'lucide-react';

interface Props {
  metrics: EnterpriseMetrics;
  financialBreakdown: FinancialBreakdown;
  assets: Asset[];
  onOpenExplainability: (data: ExplainabilityData) => void;
}

export const RiskQuantificationPage: React.FC<Props> = ({
  metrics,
  financialBreakdown,
  assets,
  onOpenExplainability
}) => {
  const [selectedAssetId, setSelectedAssetId] = useState<string>(assets[0]?.id || 'ast-01');
  const selectedAsset = assets.find(a => a.id === selectedAssetId) || assets[0];

  const [downtime, setDowntime] = useState(2.5);
  const [breach, setBreach] = useState(3.0);
  const [recovery, setRecovery] = useState(1.2);
  const [regulatory, setRegulatory] = useState(0.8);
  const [disruption, setDisruption] = useState(1.5);
  const [reputation, setReputation] = useState(0.7);

  const customTotalImpact = Number((downtime + breach + recovery + regulatory + disruption + reputation).toFixed(2));
  const customProbability = 0.42;
  const customEal = Number((customProbability * customTotalImpact).toFixed(2));

  return (
    <div className="space-y-6">
      <div className="bg-white border border-slate-200 rounded-lg p-6">
        <div className="flex items-center gap-2 text-xs font-semibold text-blue-700 uppercase tracking-wider">
          <Calculator className="w-4 h-4" />
          <span>Explainable Financial Risk Engine</span>
        </div>
        <h2 className="text-xl font-bold text-slate-900 mt-1">Cyber Risk Quantification & Loss Forecasting</h2>
        <p className="text-xs text-slate-500 mt-1 max-w-3xl leading-relaxed">
          CYBERNEXUS AI replaces arbitrary red/amber/green heatmaps with quantitative financial models inspired by FAIR. Every number is derived from transparent, auditable mathematical formulas.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="bg-white border border-slate-200 rounded-lg p-5">
          <div className="flex items-center justify-between mb-3">
            <div>
              <h3 className="text-sm font-bold text-slate-900">1. Incident Likelihood Model</h3>
              <p className="text-xs text-slate-500">Normalized multi-factor probability equation (0–100%)</p>
            </div>
            <span className="font-mono text-xs font-bold text-blue-700 bg-blue-50 px-2 py-0.5 rounded">
              Likelihood: {selectedAsset?.incidentLikelihoodPct || 48}%
            </span>
          </div>

          <div className="p-3 bg-slate-900 text-slate-100 rounded-md font-mono text-xs leading-relaxed overflow-x-auto">
            Likelihood = (Vuln Risk × 0.30 + Threat Activity × 0.20 + Exposure × 0.20 + Control Weakness × 0.20 + Exploit Prob × 0.10)
          </div>

          <div className="mt-4 space-y-2 text-xs text-slate-600">
            <div className="flex items-center justify-between p-2 bg-slate-50 rounded border border-slate-100">
              <span>Vulnerability Risk (CVSS & Exposure Weight) × 0.30</span>
              <span className="font-mono font-semibold text-slate-900">{(selectedAsset?.riskScore || 84) * 0.3} pts</span>
            </div>
            <div className="flex items-center justify-between p-2 bg-slate-50 rounded border border-slate-100">
              <span>Threat Intel Activity Score × 0.20</span>
              <span className="font-mono font-semibold text-slate-900">{(selectedAsset?.threatActivityScore || 78) * 0.2} pts</span>
            </div>
            <div className="flex items-center justify-between p-2 bg-slate-50 rounded border border-slate-100">
              <span>Perimeter Internet Exposure Factor × 0.20</span>
              <span className="font-mono font-semibold text-slate-900">{selectedAsset?.internetExposed ? '18.0 pts' : '8.0 pts'}</span>
            </div>
            <div className="flex items-center justify-between p-2 bg-slate-50 rounded border border-slate-100">
              <span>Control Weakness Score × 0.20</span>
              <span className="font-mono font-semibold text-slate-900">{(selectedAsset?.controlWeaknessScore || 62) * 0.2} pts</span>
            </div>
            <div className="flex items-center justify-between p-2 bg-slate-50 rounded border border-slate-100">
              <span>EPSS Weaponized Exploit Likelihood × 0.10</span>
              <span className="font-mono font-semibold text-slate-900">{(selectedAsset?.exploitProbabilityScore || 81) * 0.1} pts</span>
            </div>
          </div>
        </div>

        <div className="bg-white border border-slate-200 rounded-lg p-5">
          <div className="flex items-center justify-between mb-3">
            <div>
              <h3 className="text-sm font-bold text-slate-900">2. Financial Impact Model</h3>
              <p className="text-xs text-slate-500">Six primary economic loss categories in ₹ Crore</p>
            </div>
            <span className="font-mono text-xs font-bold text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded">
              Total Impact: ₹{customTotalImpact.toFixed(2)} Cr
            </span>
          </div>

          <div className="p-3 bg-slate-900 text-slate-100 rounded-md font-mono text-xs leading-relaxed overflow-x-auto">
            Financial Impact = Downtime + Data Breach + Recovery + Regulatory + Disruption + Reputation
          </div>

          <div className="mt-4 grid grid-cols-2 gap-2 text-xs">
            <div className="p-2.5 bg-slate-50 rounded border border-slate-100">
              <div className="flex justify-between items-center text-slate-500">
                <span>Downtime Cost</span>
                <span className="font-mono font-bold text-slate-900">₹{downtime.toFixed(2)} Cr</span>
              </div>
              <input
                type="range"
                min="0.5"
                max="5.0"
                step="0.1"
                value={downtime}
                onChange={e => setDowntime(parseFloat(e.target.value))}
                className="w-full mt-1.5 h-1 accent-blue-600 cursor-pointer"
              />
            </div>
            <div className="p-2.5 bg-slate-50 rounded border border-slate-100">
              <div className="flex justify-between items-center text-slate-500">
                <span>Data Breach Cost</span>
                <span className="font-mono font-bold text-slate-900">₹{breach.toFixed(2)} Cr</span>
              </div>
              <input
                type="range"
                min="0.5"
                max="6.0"
                step="0.1"
                value={breach}
                onChange={e => setBreach(parseFloat(e.target.value))}
                className="w-full mt-1.5 h-1 accent-blue-600 cursor-pointer"
              />
            </div>
            <div className="p-2.5 bg-slate-50 rounded border border-slate-100">
              <div className="flex justify-between items-center text-slate-500">
                <span>Incident Recovery</span>
                <span className="font-mono font-bold text-slate-900">₹{recovery.toFixed(2)} Cr</span>
              </div>
              <input
                type="range"
                min="0.2"
                max="3.0"
                step="0.1"
                value={recovery}
                onChange={e => setRecovery(parseFloat(e.target.value))}
                className="w-full mt-1.5 h-1 accent-blue-600 cursor-pointer"
              />
            </div>
            <div className="p-2.5 bg-slate-50 rounded border border-slate-100">
              <div className="flex justify-between items-center text-slate-500">
                <span>Regulatory Fines</span>
                <span className="font-mono font-bold text-slate-900">₹{regulatory.toFixed(2)} Cr</span>
              </div>
              <input
                type="range"
                min="0.1"
                max="3.0"
                step="0.1"
                value={regulatory}
                onChange={e => setRegulatory(parseFloat(e.target.value))}
                className="w-full mt-1.5 h-1 accent-blue-600 cursor-pointer"
              />
            </div>
            <div className="p-2.5 bg-slate-50 rounded border border-slate-100">
              <div className="flex justify-between items-center text-slate-500">
                <span>Business Disruption</span>
                <span className="font-mono font-bold text-slate-900">₹{disruption.toFixed(2)} Cr</span>
              </div>
              <input
                type="range"
                min="0.2"
                max="4.0"
                step="0.1"
                value={disruption}
                onChange={e => setDisruption(parseFloat(e.target.value))}
                className="w-full mt-1.5 h-1 accent-blue-600 cursor-pointer"
              />
            </div>
            <div className="p-2.5 bg-slate-50 rounded border border-slate-100">
              <div className="flex justify-between items-center text-slate-500">
                <span>Reputation Impact</span>
                <span className="font-mono font-bold text-slate-900">₹{reputation.toFixed(2)} Cr</span>
              </div>
              <input
                type="range"
                min="0.1"
                max="3.0"
                step="0.1"
                value={reputation}
                onChange={e => setReputation(parseFloat(e.target.value))}
                className="w-full mt-1.5 h-1 accent-blue-600 cursor-pointer"
              />
            </div>
          </div>
        </div>
      </div>

      <div className="bg-slate-900 text-white rounded-lg p-5">
        <div className="flex items-center justify-between mb-2">
          <span className="text-xs font-mono uppercase tracking-wider text-blue-400 font-semibold">
            Expected Annual Loss (EAL) Mathematical Equation
          </span>
          <span className="text-xs font-mono text-slate-400">FAIR Loss Magnitude Index</span>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 items-center mt-3">
          <div className="p-4 bg-slate-800 rounded-lg text-center">
            <div className="text-xs text-slate-400 font-medium">Annual Incident Probability</div>
            <div className="text-2xl font-bold font-mono text-blue-400 mt-1">
              {(customProbability * 100).toFixed(0)}% (0.42)
            </div>
          </div>

          <div className="p-4 bg-slate-800 rounded-lg text-center">
            <div className="text-xs text-slate-400 font-medium">Single Loss Event Impact</div>
            <div className="text-2xl font-bold font-mono text-emerald-400 mt-1">
              ₹{customTotalImpact.toFixed(2)} Cr
            </div>
          </div>

          <div className="p-4 bg-blue-600/30 border border-blue-500/40 rounded-lg text-center">
            <div className="text-xs text-blue-300 font-medium">Expected Annual Loss (EAL)</div>
            <div className="text-3xl font-extrabold font-mono text-white mt-1">
              ₹{customEal.toFixed(2)} Cr
            </div>
          </div>
        </div>

        <div className="mt-3 text-xs text-slate-400 text-center font-mono">
          EAL = 0.42 × ₹{customTotalImpact.toFixed(2)} Cr = ₹{customEal.toFixed(2)} Cr
        </div>
      </div>

      <div className="bg-white border border-slate-200 rounded-lg p-5">
        <div className="flex items-center justify-between mb-4">
          <div>
            <h3 className="text-sm font-bold text-slate-900">Asset-Level Financial Risk Registry</h3>
            <p className="text-xs text-slate-500">Select an asset to view its individual derivation parameters</p>
          </div>
          <span className="text-xs text-slate-500 font-mono">10 Tier-1 Banking Assets</span>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead>
              <tr className="border-b border-slate-200 text-slate-500 font-semibold">
                <th className="pb-2">Asset Name</th>
                <th className="pb-2">Type</th>
                <th className="pb-2">Criticality</th>
                <th className="pb-2 text-right">Business Value</th>
                <th className="pb-2 text-right">Incident Likelihood</th>
                <th className="pb-2 text-right">Financial Impact</th>
                <th className="pb-2 text-right">Expected Loss (EAL)</th>
                <th className="pb-2 text-center">Inspect</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {assets.map(asset => {
                const isSelected = asset.id === selectedAssetId;
                return (
                  <tr
                    key={asset.id}
                    onClick={() => setSelectedAssetId(asset.id)}
                    className={`cursor-pointer transition-colors ${isSelected ? 'bg-blue-50/60 font-medium' : 'hover:bg-slate-50'}`}
                  >
                    <td className="py-2.5 font-semibold text-slate-900">{asset.name}</td>
                    <td className="py-2.5 text-slate-600">{asset.type}</td>
                    <td className="py-2.5">
                      <span className={`font-mono text-[11px] ${
                        asset.criticality === 'Critical' ? 'text-red-700 font-bold' :
                        asset.criticality === 'High' ? 'text-amber-700 font-semibold' : 'text-slate-600'
                      }`}>
                        {asset.criticality}
                      </span>
                    </td>
                    <td className="py-2.5 text-right font-mono text-slate-700">₹{asset.businessValueCr.toFixed(1)} Cr</td>
                    <td className="py-2.5 text-right font-mono text-blue-700 font-semibold">{asset.incidentLikelihoodPct}%</td>
                    <td className="py-2.5 text-right font-mono text-slate-900">₹{asset.financialImpactCr.toFixed(1)} Cr</td>
                    <td className="py-2.5 text-right font-mono font-bold text-red-600">₹{asset.expectedAnnualLossCr.toFixed(2)} Cr</td>
                    <td className="py-2.5 text-center">
                      <button
                        onClick={e => {
                          e.stopPropagation();
                          onOpenExplainability({
                            title: `Risk Quantification: ${asset.name}`,
                            category: `${asset.type} · ${asset.criticality} Criticality`,
                            assetName: asset.name,
                            cveOrRef: asset.criticalVulns.join(', ') || 'Architecture & Access Gaps',
                            likelihoodFormula: `Likelihood = (Vuln ${asset.riskScore}×0.30 + Threat ${asset.threatActivityScore}×0.20 + Exp ${asset.internetExposed ? 90 : 40}×0.20 + Weakness ${asset.controlWeaknessScore}×0.20 + Exploit ${asset.exploitProbabilityScore}×0.10)`,
                            likelihoodResult: `${asset.incidentLikelihoodPct}% / Year`,
                            impactBreakdown: {
                              downtime: Number((asset.financialImpactCr * 0.26).toFixed(2)),
                              breach: Number((asset.financialImpactCr * 0.31).toFixed(2)),
                              recovery: Number((asset.financialImpactCr * 0.12).toFixed(2)),
                              regulatory: Number((asset.financialImpactCr * 0.08).toFixed(2)),
                              disruption: Number((asset.financialImpactCr * 0.15).toFixed(2)),
                              reputation: Number((asset.financialImpactCr * 0.08).toFixed(2)),
                              total: asset.financialImpactCr
                            },
                            ealFormula: `EAL = ${asset.incidentLikelihoodPct}% × ₹${asset.financialImpactCr.toFixed(2)} Cr = ₹${asset.expectedAnnualLossCr.toFixed(2)} Cr`,
                            mitigationAction: `Active Controls: ${asset.controlsActive.join(', ')}. Remediate deficient controls: ${asset.controlsDeficient.join(', ')}.`,
                            evidenceNotes: `Continuous telemetry tracked by Nexa SecOps. Dependencies: ${asset.dependencies.join(', ') || 'Standalone'}.`
                          });
                        }}
                        className="text-xs text-blue-600 hover:text-blue-800 font-semibold"
                      >
                        Why?
                      </button>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

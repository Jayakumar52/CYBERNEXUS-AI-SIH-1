import React from 'react';
import { X, Calculator, CheckCircle2, Info } from 'lucide-react';

export interface ExplainabilityData {
  title: string;
  category: string;
  assetName?: string;
  cveOrRef?: string;
  likelihoodFormula?: string;
  likelihoodResult?: string;
  impactBreakdown?: {
    downtime: number;
    breach: number;
    recovery: number;
    regulatory: number;
    disruption: number;
    reputation: number;
    total: number;
  };
  ealFormula?: string;
  mitigationAction?: string;
  rosi?: string;
  evidenceNotes?: string;
}

interface Props {
  isOpen: boolean;
  onClose: () => void;
  data: ExplainabilityData | null;
}

export const ExplainabilityModal: React.FC<Props> = ({ isOpen, onClose, data }) => {
  if (!isOpen || !data) return null;

  const impact = data.impactBreakdown || {
    downtime: 2.5,
    breach: 3.0,
    recovery: 1.2,
    regulatory: 0.8,
    disruption: 1.5,
    reputation: 0.7,
    total: 9.7
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-950/60 backdrop-blur-xs p-4 overflow-y-auto">
      <div className="bg-white rounded-xl shadow-2xl border border-slate-200 w-full max-w-2xl my-8 overflow-hidden animate-in fade-in zoom-in-95 duration-150">
        <div className="px-6 py-4 border-b border-slate-200 bg-slate-50 flex items-start justify-between">
          <div>
            <div className="flex items-center gap-2 text-xs font-semibold text-blue-700 uppercase tracking-wider">
              <Calculator className="w-3.5 h-3.5" />
              <span>Explainable AI Risk Decomposition</span>
            </div>
            <h3 className="text-lg font-bold text-slate-900 mt-1">{data.title}</h3>
            <div className="flex items-center gap-2 text-xs text-slate-500 mt-0.5">
              <span>{data.category}</span>
              {data.assetName && (
                <>
                  <span aria-hidden="true">·</span>
                  <span>Target: {data.assetName}</span>
                </>
              )}
              {data.cveOrRef && (
                <>
                  <span aria-hidden="true">·</span>
                  <span className="font-mono">{data.cveOrRef}</span>
                </>
              )}
            </div>
          </div>
          <button
            onClick={onClose}
            className="text-slate-400 hover:text-slate-600 p-1.5 rounded-lg hover:bg-slate-100 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        <div className="p-6 space-y-6 max-h-[75vh] overflow-y-auto text-sm text-slate-700">
          <div className="border border-slate-200 rounded-lg p-4 bg-slate-50/50">
            <div className="flex items-center gap-2 text-xs font-bold text-slate-900 mb-2">
              <span className="flex items-center justify-center w-5 h-5 rounded-full bg-blue-100 text-blue-800 text-xs font-mono">1</span>
              <span>Raw Security Telemetry Evidence</span>
            </div>
            <p className="text-slate-600 text-xs leading-relaxed">
              {data.evidenceNotes || 'Continuous telemetry aggregated from Qualys VMDR vulnerability scans, Splunk SIEM network access logs, and Azure AD privileged identity governance reports.'}
            </p>
          </div>

          <div className="border border-slate-200 rounded-lg p-4 bg-white">
            <div className="flex items-center gap-2 text-xs font-bold text-slate-900 mb-2">
              <span className="flex items-center justify-center w-5 h-5 rounded-full bg-blue-100 text-blue-800 text-xs font-mono">2</span>
              <span>Incident Likelihood Mathematical Formula</span>
            </div>
            <div className="p-3 bg-slate-900 text-slate-100 font-mono text-xs rounded-md leading-relaxed overflow-x-auto">
              {data.likelihoodFormula || 'Likelihood = (Vuln Risk × 0.30 + Threat Activity × 0.20 + Exposure × 0.20 + Control Weakness × 0.20 + Exploit Prob × 0.10)'}
            </div>
            <div className="mt-2 text-xs text-slate-600 flex items-center justify-between">
              <span>Normalized Incident Likelihood:</span>
              <span className="font-bold text-blue-700 font-mono text-sm">{data.likelihoodResult || '42% / Year'}</span>
            </div>
          </div>

          <div className="border border-slate-200 rounded-lg p-4 bg-white">
            <div className="flex items-center justify-between text-xs font-bold text-slate-900 mb-3">
              <div className="flex items-center gap-2">
                <span className="flex items-center justify-center w-5 h-5 rounded-full bg-blue-100 text-blue-800 text-xs font-mono">3</span>
                <span>Financial Impact Model (₹ Crore)</span>
              </div>
              <span className="font-mono text-emerald-700 font-bold">Total: ₹{impact.total.toFixed(2)} Cr</span>
            </div>
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-2.5 text-xs">
              <div className="p-2.5 bg-slate-50 rounded border border-slate-100">
                <div className="text-slate-500">Downtime Cost</div>
                <div className="font-mono font-semibold text-slate-900 text-sm mt-0.5">₹{impact.downtime.toFixed(2)} Cr</div>
              </div>
              <div className="p-2.5 bg-slate-50 rounded border border-slate-100">
                <div className="text-slate-500">Data Breach Cost</div>
                <div className="font-mono font-semibold text-slate-900 text-sm mt-0.5">₹{impact.breach.toFixed(2)} Cr</div>
              </div>
              <div className="p-2.5 bg-slate-50 rounded border border-slate-100">
                <div className="text-slate-500">Incident Recovery</div>
                <div className="font-mono font-semibold text-slate-900 text-sm mt-0.5">₹{impact.recovery.toFixed(2)} Cr</div>
              </div>
              <div className="p-2.5 bg-slate-50 rounded border border-slate-100">
                <div className="text-slate-500">Regulatory Impact</div>
                <div className="font-mono font-semibold text-slate-900 text-sm mt-0.5">₹{impact.regulatory.toFixed(2)} Cr</div>
              </div>
              <div className="p-2.5 bg-slate-50 rounded border border-slate-100">
                <div className="text-slate-500">Business Disruption</div>
                <div className="font-mono font-semibold text-slate-900 text-sm mt-0.5">₹{impact.disruption.toFixed(2)} Cr</div>
              </div>
              <div className="p-2.5 bg-slate-50 rounded border border-slate-100">
                <div className="text-slate-500">Reputation Impact</div>
                <div className="font-mono font-semibold text-slate-900 text-sm mt-0.5">₹{impact.reputation.toFixed(2)} Cr</div>
              </div>
            </div>
          </div>

          <div className="border border-slate-200 rounded-lg p-4 bg-slate-50">
            <div className="flex items-center gap-2 text-xs font-bold text-slate-900 mb-2">
              <span className="flex items-center justify-center w-5 h-5 rounded-full bg-blue-100 text-blue-800 text-xs font-mono">4</span>
              <span>Expected Annual Loss (EAL) Derivation</span>
            </div>
            <div className="p-2.5 bg-white border border-slate-200 font-mono text-xs rounded text-slate-800">
              EAL = Annual Incident Likelihood × Total Financial Impact
              <div className="mt-1 font-semibold text-blue-700">
                {data.ealFormula || 'EAL = 0.42 × ₹9.70 Cr = ₹4.07 Cr'}
              </div>
            </div>
          </div>

          {data.mitigationAction && (
            <div className="border border-emerald-200 rounded-lg p-4 bg-emerald-50/40">
              <div className="flex items-center justify-between text-xs font-bold text-emerald-900 mb-1.5">
                <div className="flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                  <span>Recommended Actionable Mitigation</span>
                </div>
                {data.rosi && <span className="font-mono text-emerald-700 font-bold">ROSI: {data.rosi}</span>}
              </div>
              <p className="text-xs text-emerald-800 leading-relaxed">
                {data.mitigationAction}
              </p>
            </div>
          )}
        </div>

        <div className="px-6 py-3.5 border-t border-slate-200 bg-slate-50 flex items-center justify-between">
          <div className="flex items-center gap-1.5 text-xs text-slate-500">
            <Info className="w-3.5 h-3.5 text-slate-400" />
            <span>Deterministic mathematical model · No paid API dependencies</span>
          </div>
          <button
            onClick={onClose}
            className="px-4 py-1.5 text-xs font-medium text-slate-700 bg-white border border-slate-200 rounded-md hover:bg-slate-100 transition-colors"
          >
            Close Inspector
          </button>
        </div>
      </div>
    </div>
  );
};

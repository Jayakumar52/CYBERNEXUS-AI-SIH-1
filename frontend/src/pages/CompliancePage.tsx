import React, { useState } from 'react';
import { ComplianceControlMapping, FrameworkScore, PageId } from '../types/index.js';
import { FileCheck2 } from 'lucide-react';

interface Props {
  frameworks: FrameworkScore[];
  mappings: ComplianceControlMapping[];
  overallReadinessPct: number;
  onNavigate: (page: PageId) => void;
}

export const CompliancePage: React.FC<Props> = ({
  frameworks,
  mappings,
  overallReadinessPct,
  onNavigate
}) => {
  const [selectedFramework, setSelectedFramework] = useState<string>('ALL');
  const [selectedMapping, setSelectedMapping] = useState<ComplianceControlMapping | null>(null);

  const filteredMappings = mappings.filter(m => {
    if (selectedFramework === 'ALL') return true;
    if (selectedFramework === 'RBI') return m.rbiFramework.length > 0;
    if (selectedFramework === 'SEBI') return m.sebiFramework.length > 0;
    if (selectedFramework === 'NIST') return m.nistCsf.length > 0;
    if (selectedFramework === 'ISO') return m.iso27001.length > 0;
    return true;
  });

  return (
    <div className="space-y-6">
      <div className="bg-white border border-slate-200 rounded-lg p-6">
        <div className="flex items-center justify-between">
          <div>
            <div className="flex items-center gap-2 text-xs font-semibold text-blue-700 uppercase tracking-wider">
              <FileCheck2 className="w-4 h-4" />
              <span>Multi-Regulatory Alignment</span>
            </div>
            <h2 className="text-xl font-bold text-slate-900 mt-1">Compliance & Framework Mapping Engine</h2>
            <p className="text-xs text-slate-500 mt-1 max-w-3xl leading-relaxed">
              Demonstration mappings connecting real technical telemetry findings directly to regulatory mandates from the Reserve Bank of India (RBI), SEBI, NIST CSF 2.0, and ISO/IEC 27001.
            </p>
          </div>
          <div className="text-right shrink-0">
            <div className="text-xs text-slate-500">Overall Readiness</div>
            <div className="font-mono text-3xl font-bold text-blue-700">
              {overallReadinessPct}%
            </div>
            <div className="text-[11px] text-slate-400 font-mono">5 Major Frameworks</div>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-3.5">
        {frameworks.map(fw => {
          const isSelected = selectedFramework === fw.code.split('-')[0];
          return (
            <div
              key={fw.code}
              onClick={() => setSelectedFramework(fw.code.split('-')[0])}
              className={`p-4 rounded-lg border cursor-pointer transition-all bg-white ${
                isSelected
                  ? 'border-blue-600 ring-2 ring-blue-500/20 shadow-xs'
                  : 'border-slate-200 hover:border-slate-300'
              }`}
            >
              <div className="text-[10px] font-mono uppercase text-slate-400 font-bold truncate">
                {fw.regulatorOrBody}
              </div>
              <h3 className="text-xs font-bold text-slate-900 mt-1 truncate">{fw.name}</h3>

              <div className="mt-3 flex items-baseline justify-between">
                <span className="text-2xl font-bold font-mono text-slate-900">{fw.readinessPct}%</span>
                <span className="text-[10px] font-mono text-slate-400">
                  {fw.compliantControls}/{fw.totalControls} Controls
                </span>
              </div>

              <div className="mt-2 w-full bg-slate-100 h-1.5 rounded-full overflow-hidden">
                <div
                  className="bg-blue-600 h-1.5 rounded-full"
                  style={{ width: `${fw.readinessPct}%` }}
                />
              </div>

              <div className="mt-2 text-[10px] text-red-600 font-mono">
                {fw.gapControls} Audit Gap{fw.gapControls > 1 ? 's' : ''} Identified
              </div>
            </div>
          );
        })}
      </div>

      <div className="bg-white border border-slate-200 rounded-lg overflow-hidden">
        <div className="p-4 border-b border-slate-200 bg-slate-50 flex items-center justify-between">
          <div>
            <h3 className="text-sm font-bold text-slate-900">Regulatory Gap & Evidence Traceability Matrix</h3>
            <p className="text-xs text-slate-500">Finding → Security Control → Framework Control → Compliance Status → Evidence</p>
          </div>

          <div className="flex items-center gap-1.5">
            {['ALL', 'RBI', 'SEBI', 'NIST', 'ISO'].map(f => (
              <button
                key={f}
                onClick={() => setSelectedFramework(f)}
                className={`px-2.5 py-1 text-xs rounded font-medium transition-colors ${
                  selectedFramework === f
                    ? 'bg-slate-900 text-white'
                    : 'bg-white border border-slate-200 text-slate-600 hover:bg-slate-100'
                }`}
              >
                {f}
              </button>
            ))}
          </div>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead>
              <tr className="border-b border-slate-200 text-slate-500 font-semibold bg-white">
                <th className="py-3 px-4">Risk Finding</th>
                <th className="py-3 px-3">Affected Asset</th>
                <th className="py-3 px-3">NIST CSF 2.0</th>
                <th className="py-3 px-3">RBI Banking Framework</th>
                <th className="py-3 px-3">SEBI CSCRF</th>
                <th className="py-3 px-3">Status</th>
                <th className="py-3 px-4 text-center">Audit Evidence</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {filteredMappings.map(item => {
                const isGap = item.status === 'Gap Identified';
                const isPartial = item.status === 'Partially Met';

                return (
                  <tr key={item.id} className="hover:bg-slate-50/80 transition-colors">
                    <td className="py-3 px-4 font-semibold text-slate-900 max-w-[200px]">
                      <div>{item.findingTitle}</div>
                      <div className="text-[10px] text-slate-400 font-normal mt-0.5">
                        Mapped Control: {item.mappedControl}
                      </div>
                    </td>
                    <td className="py-3 px-3 text-slate-700 font-medium">
                      {item.affectedAsset}
                    </td>
                    <td className="py-3 px-3 text-slate-600 font-mono text-[11px] max-w-[150px] truncate">
                      {item.nistCsf}
                    </td>
                    <td className="py-3 px-3 text-slate-600 font-mono text-[11px] max-w-[150px] truncate">
                      {item.rbiFramework}
                    </td>
                    <td className="py-3 px-3 text-slate-600 font-mono text-[11px] max-w-[150px] truncate">
                      {item.sebiFramework}
                    </td>
                    <td className="py-3 px-3">
                      <span className={`text-[10px] font-mono px-2 py-0.5 rounded font-bold ${
                        isGap ? 'bg-red-50 text-red-700 border border-red-200' :
                        isPartial ? 'bg-amber-50 text-amber-800 border border-amber-200' :
                        'bg-emerald-50 text-emerald-800 border border-emerald-200'
                      }`}>
                        {item.status}
                      </span>
                    </td>
                    <td className="py-3 px-4 text-center">
                      <button
                        onClick={() => setSelectedMapping(item)}
                        className="px-2.5 py-1 text-xs text-blue-700 bg-blue-50 hover:bg-blue-100 border border-blue-200 rounded font-semibold transition-colors"
                      >
                        Inspect Evidence
                      </button>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>

      {selectedMapping && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-950/60 backdrop-blur-xs p-4">
          <div className="bg-white rounded-xl shadow-2xl border border-slate-200 w-full max-w-lg overflow-hidden animate-in zoom-in-95 duration-150">
            <div className="px-6 py-4 border-b border-slate-200 bg-slate-50 flex items-center justify-between">
              <div>
                <span className="text-[10px] font-mono uppercase font-bold text-blue-700">Audit Proof Log</span>
                <h3 className="text-sm font-bold text-slate-900 mt-0.5">{selectedMapping.findingTitle}</h3>
              </div>
              <button onClick={() => setSelectedMapping(null)} className="text-slate-400 hover:text-slate-600 p-1">
                ✕
              </button>
            </div>

            <div className="p-6 space-y-4 text-xs text-slate-700">
              <div className="p-3 bg-slate-50 rounded border border-slate-200">
                <div className="font-semibold text-slate-900 mb-1">Telemetry Evidence Log</div>
                <p className="font-mono text-slate-800 leading-relaxed bg-white p-2.5 rounded border border-slate-100">
                  {selectedMapping.evidence}
                </p>
              </div>

              <div className="space-y-2">
                <div className="font-semibold text-slate-900">Regulatory Clause Citations:</div>
                <div className="p-2 bg-slate-50 rounded border border-slate-100 font-mono">
                  <strong>NIST CSF: </strong> {selectedMapping.nistCsf}
                </div>
                <div className="p-2 bg-slate-50 rounded border border-slate-100 font-mono">
                  <strong>ISO 27001: </strong> {selectedMapping.iso27001}
                </div>
                <div className="p-2 bg-slate-50 rounded border border-slate-100 font-mono">
                  <strong>RBI Cyber Security Framework: </strong> {selectedMapping.rbiFramework}
                </div>
                <div className="p-2 bg-slate-50 rounded border border-slate-100 font-mono">
                  <strong>SEBI CSCRF: </strong> {selectedMapping.sebiFramework}
                </div>
              </div>
            </div>

            <div className="px-6 py-3 bg-slate-50 border-t border-slate-200 flex justify-end">
              <button
                onClick={() => setSelectedMapping(null)}
                className="px-4 py-1.5 text-xs font-medium text-slate-700 bg-white border border-slate-200 rounded hover:bg-slate-100"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

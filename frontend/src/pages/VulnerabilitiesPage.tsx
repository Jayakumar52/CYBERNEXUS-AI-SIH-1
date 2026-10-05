import React, { useState } from 'react';
import { Vulnerability, PageId } from '../types/index.js';
import { ExplainabilityData } from '../components/ExplainabilityModal.js';
import { Bug, Search } from 'lucide-react';

interface Props {
  vulnerabilities: Vulnerability[];
  onNavigate: (page: PageId) => void;
  onOpenExplainability: (data: ExplainabilityData) => void;
}

export const VulnerabilitiesPage: React.FC<Props> = ({
  vulnerabilities,
  onNavigate,
  onOpenExplainability
}) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState<string>('All');

  const filteredVulns = vulnerabilities.filter(v => {
    const matchesSearch = v.cve.toLowerCase().includes(searchTerm.toLowerCase()) ||
                          v.assetName.toLowerCase().includes(searchTerm.toLowerCase()) ||
                          v.description.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus = statusFilter === 'All' || v.exploitStatus === statusFilter;
    return matchesSearch && matchesStatus;
  });

  return (
    <div className="space-y-6">
      <div className="bg-white border border-slate-200 rounded-lg p-6">
        <div className="flex items-center justify-between">
          <div>
            <div className="flex items-center gap-2 text-xs font-semibold text-red-600 uppercase tracking-wider">
              <Bug className="w-4 h-4" />
              <span>Vulnerability Telemetry & Threat Ingestion</span>
            </div>
            <h2 className="text-xl font-bold text-slate-900 mt-1">Vulnerability Matrix & Rupee Risk Contribution</h2>
            <p className="text-xs text-slate-500 mt-1 max-w-3xl leading-relaxed">
              Sample / Simulated Vulnerability Data: Correlating CVSS base severity, EPSS exploit likelihood, and asset criticality to calculate exact financial risk contribution in ₹ Crore.
            </p>
          </div>
          <span className="text-[11px] font-mono text-slate-500 bg-slate-100 px-2.5 py-1 rounded">
            Qualys VMDR · Live Scan
          </span>
        </div>
      </div>

      <div className="bg-white border border-slate-200 rounded-lg p-4 flex flex-col sm:flex-row items-center justify-between gap-3">
        <div className="relative w-full sm:w-72">
          <Search className="w-4 h-4 text-slate-400 absolute left-3 top-2.5" />
          <input
            type="text"
            placeholder="Search CVE, asset name, or exploit status..."
            value={searchTerm}
            onChange={e => setSearchTerm(e.target.value)}
            className="w-full text-xs pl-9 pr-3 py-2 bg-slate-50 border border-slate-200 rounded-md focus:outline-none focus:ring-1 focus:ring-blue-600 focus:border-blue-600"
          />
        </div>

        <div className="flex items-center gap-2 w-full sm:w-auto overflow-x-auto pb-1 sm:pb-0">
          <span className="text-xs text-slate-500 font-medium shrink-0">Exploit Status:</span>
          {['All', 'Active in Wild', 'PoC Available', 'Weaponized'].map(st => (
            <button
              key={st}
              onClick={() => setStatusFilter(st)}
              className={`px-2.5 py-1 text-xs rounded font-medium whitespace-nowrap transition-colors ${
                statusFilter === st
                  ? 'bg-slate-900 text-white'
                  : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
              }`}
            >
              {st}
            </button>
          ))}
        </div>
      </div>

      <div className="bg-white border border-slate-200 rounded-lg overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead>
              <tr className="bg-slate-50 border-b border-slate-200 text-slate-500 font-semibold">
                <th className="py-3 px-4">CVE ID</th>
                <th className="py-3 px-3">Asset</th>
                <th className="py-3 px-3 text-right">CVSS</th>
                <th className="py-3 px-3 text-right">EPSS</th>
                <th className="py-3 px-3">Exploit Status</th>
                <th className="py-3 px-3">Exposure</th>
                <th className="py-3 px-3 text-right">Potential Impact</th>
                <th className="py-3 px-3 text-right">Risk Contribution</th>
                <th className="py-3 px-4 text-center">Explain</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {filteredVulns.map(v => (
                <tr key={v.id} className="hover:bg-slate-50/80 transition-colors">
                  <td className="py-3 px-4 font-mono font-bold text-slate-900">
                    <div>{v.cve}</div>
                    <div className="text-[10px] text-slate-400 font-normal truncate max-w-[140px]">{v.description}</div>
                  </td>
                  <td className="py-3 px-3 text-slate-800 font-medium max-w-[140px] truncate">
                    {v.assetName}
                  </td>
                  <td className="py-3 px-3 text-right font-mono font-bold text-red-600">
                    {v.cvss.toFixed(1)}
                  </td>
                  <td className="py-3 px-3 text-right font-mono text-slate-700">
                    {v.epss.toFixed(2)}
                  </td>
                  <td className="py-3 px-3">
                    <span className={`text-[10px] font-mono px-2 py-0.5 rounded font-semibold ${
                      v.exploitStatus === 'Active in Wild' ? 'bg-red-50 text-red-700 border border-red-200' :
                      v.exploitStatus === 'Weaponized' ? 'bg-amber-50 text-amber-800 border border-amber-200' :
                      'bg-slate-100 text-slate-700'
                    }`}>
                      {v.exploitStatus}
                    </span>
                  </td>
                  <td className="py-3 px-3 text-slate-600 font-mono text-[11px]">
                    {v.exposure}
                  </td>
                  <td className="py-3 px-3 text-right font-mono text-slate-800">
                    ₹{v.financialImpactCr.toFixed(1)} Cr
                  </td>
                  <td className="py-3 px-3 text-right font-mono font-bold text-red-600">
                    ₹{v.riskContributionCr.toFixed(1)} Cr
                  </td>
                  <td className="py-3 px-4 text-center">
                    <button
                      onClick={() => {
                        onOpenExplainability({
                          title: `${v.cve} on ${v.assetName}`,
                          category: 'Vulnerability Risk Attribution',
                          assetName: v.assetName,
                          cveOrRef: `${v.cve} (CVSS ${v.cvss} / EPSS ${v.epss})`,
                          likelihoodFormula: `Exploit Likelihood = (CVSS ${v.cvss} × 0.40) + (EPSS ${v.epss * 10} × 0.35) + (Exposure × 0.25)`,
                          likelihoodResult: `${(v.epss * 100).toFixed(0)}% Probability`,
                          impactBreakdown: {
                            downtime: Number((v.financialImpactCr * 0.25).toFixed(2)),
                            breach: Number((v.financialImpactCr * 0.35).toFixed(2)),
                            recovery: Number((v.financialImpactCr * 0.12).toFixed(2)),
                            regulatory: Number((v.financialImpactCr * 0.08).toFixed(2)),
                            disruption: Number((v.financialImpactCr * 0.12).toFixed(2)),
                            reputation: Number((v.financialImpactCr * 0.08).toFixed(2)),
                            total: v.financialImpactCr
                          },
                          ealFormula: `Risk Contribution = Annual Exploit Likelihood × Maximum Asset Exposure = ₹${v.riskContributionCr.toFixed(2)} Cr`,
                          mitigationAction: v.remediationAction,
                          evidenceNotes: v.description
                        });
                      }}
                      className="text-xs text-blue-600 hover:text-blue-800 font-semibold"
                    >
                      Why?
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

import React, { useState } from 'react';
import { Asset, PageId } from '../types/index.js';
import { ExplainabilityData } from '../components/ExplainabilityModal.js';
import { Server, Search } from 'lucide-react';

interface Props {
  assets: Asset[];
  onNavigate: (page: PageId) => void;
  onOpenExplainability: (data: ExplainabilityData) => void;
}

export const AssetsPage: React.FC<Props> = ({
  assets,
  onNavigate,
  onOpenExplainability
}) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [criticalityFilter, setCriticalityFilter] = useState<string>('All');
  const [selectedAsset, setSelectedAsset] = useState<Asset | null>(null);

  const filteredAssets = assets.filter(asset => {
    const matchesSearch = asset.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                          asset.type.toLowerCase().includes(searchTerm.toLowerCase()) ||
                          asset.owner.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCrit = criticalityFilter === 'All' || asset.criticality === criticalityFilter;
    return matchesSearch && matchesCrit;
  });

  return (
    <div className="space-y-6">
      <div className="bg-white border border-slate-200 rounded-lg p-6">
        <div className="flex items-center gap-2 text-xs font-semibold text-blue-700 uppercase tracking-wider">
          <Server className="w-4 h-4" />
          <span>Continuous Asset Criticality Telemetry</span>
        </div>
        <h2 className="text-xl font-bold text-slate-900 mt-1">Enterprise Asset Inventory & Risk Attribution</h2>
        <p className="text-xs text-slate-500 mt-1 max-w-3xl leading-relaxed">
          Aggregated from ServiceNow CMDB and cloud resource registries. Every asset is continuously scored by business valuation, perimeter exposure, and downstream dependency chains.
        </p>
      </div>

      <div className="bg-white border border-slate-200 rounded-lg p-4 flex flex-col sm:flex-row items-center justify-between gap-3">
        <div className="relative w-full sm:w-72">
          <Search className="w-4 h-4 text-slate-400 absolute left-3 top-2.5" />
          <input
            type="text"
            placeholder="Search assets, owners, types..."
            value={searchTerm}
            onChange={e => setSearchTerm(e.target.value)}
            className="w-full text-xs pl-9 pr-3 py-2 bg-slate-50 border border-slate-200 rounded-md focus:outline-none focus:ring-1 focus:ring-blue-600 focus:border-blue-600"
          />
        </div>

        <div className="flex items-center gap-2 w-full sm:w-auto">
          <span className="text-xs text-slate-500 font-medium">Criticality:</span>
          {['All', 'Critical', 'High', 'Medium', 'Low'].map(crit => (
            <button
              key={crit}
              onClick={() => setCriticalityFilter(crit)}
              className={`px-2.5 py-1 text-xs rounded font-medium transition-colors ${
                criticalityFilter === crit
                  ? 'bg-slate-900 text-white'
                  : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
              }`}
            >
              {crit}
            </button>
          ))}
        </div>
      </div>

      <div className="bg-white border border-slate-200 rounded-lg overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead>
              <tr className="bg-slate-50 border-b border-slate-200 text-slate-500 font-semibold">
                <th className="py-3 px-4">Asset Name</th>
                <th className="py-3 px-3">Type</th>
                <th className="py-3 px-3">Criticality</th>
                <th className="py-3 px-3 text-right">Business Value</th>
                <th className="py-3 px-3 text-center">Exposure</th>
                <th className="py-3 px-3">Data Sensitivity</th>
                <th className="py-3 px-3 text-right">Likelihood</th>
                <th className="py-3 px-3 text-right">Exposure (₹ Cr)</th>
                <th className="py-3 px-4 text-center">Action</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {filteredAssets.map(asset => (
                <tr key={asset.id} className="hover:bg-slate-50/80 transition-colors">
                  <td className="py-3 px-4 font-semibold text-slate-900">
                    <div>{asset.name}</div>
                    <div className="text-[10px] text-slate-400 font-normal">{asset.owner}</div>
                  </td>
                  <td className="py-3 px-3 text-slate-600">
                    {asset.type}
                  </td>
                  <td className="py-3 px-3">
                    <span className={`font-mono text-[11px] font-bold ${
                      asset.criticality === 'Critical' ? 'text-red-700' :
                      asset.criticality === 'High' ? 'text-amber-700' :
                      asset.criticality === 'Medium' ? 'text-blue-700' : 'text-slate-500'
                    }`}>
                      {asset.criticality}
                    </span>
                  </td>
                  <td className="py-3 px-3 text-right font-mono text-slate-800">
                    ₹{asset.businessValueCr.toFixed(1)} Cr
                  </td>
                  <td className="py-3 px-3 text-center">
                    {asset.internetExposed ? (
                      <span className="text-[10px] font-mono font-semibold text-red-700 bg-red-50 px-2 py-0.5 rounded">
                        Public Edge
                      </span>
                    ) : (
                      <span className="text-[10px] font-mono text-slate-600 bg-slate-100 px-2 py-0.5 rounded">
                        Internal
                      </span>
                    )}
                  </td>
                  <td className="py-3 px-3 text-slate-600 truncate max-w-[130px]">
                    {asset.dataSensitivity}
                  </td>
                  <td className="py-3 px-3 text-right font-mono font-semibold text-blue-700">
                    {asset.incidentLikelihoodPct}%
                  </td>
                  <td className="py-3 px-3 text-right font-mono font-bold text-red-600">
                    ₹{asset.financialExposureCr.toFixed(2)} Cr
                  </td>
                  <td className="py-3 px-4 text-center">
                    <button
                      onClick={() => setSelectedAsset(asset)}
                      className="px-2.5 py-1 text-xs font-medium text-slate-700 bg-white border border-slate-200 rounded hover:bg-slate-100 transition-colors"
                    >
                      Inspect
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {selectedAsset && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-950/60 backdrop-blur-xs p-4">
          <div className="bg-white rounded-xl shadow-2xl border border-slate-200 w-full max-w-xl overflow-hidden animate-in zoom-in-95 duration-150">
            <div className="px-6 py-4 border-b border-slate-200 bg-slate-50 flex items-center justify-between">
              <div>
                <span className="text-xs font-mono font-bold text-blue-700 uppercase">{selectedAsset.type} Asset</span>
                <h3 className="text-base font-bold text-slate-900 mt-0.5">{selectedAsset.name}</h3>
              </div>
              <button
                onClick={() => setSelectedAsset(null)}
                className="text-slate-400 hover:text-slate-600 p-1.5 rounded"
              >
                ✕
              </button>
            </div>

            <div className="p-6 space-y-4 max-h-[70vh] overflow-y-auto text-xs text-slate-700">
              <div className="grid grid-cols-3 gap-3 text-center">
                <div className="p-2.5 bg-slate-50 rounded border border-slate-200">
                  <div className="text-slate-500">Business Value</div>
                  <div className="font-mono font-bold text-slate-900 text-sm mt-0.5">₹{selectedAsset.businessValueCr} Cr</div>
                </div>
                <div className="p-2.5 bg-slate-50 rounded border border-slate-200">
                  <div className="text-slate-500">Likelihood</div>
                  <div className="font-mono font-bold text-blue-700 text-sm mt-0.5">{selectedAsset.incidentLikelihoodPct}%</div>
                </div>
                <div className="p-2.5 bg-red-50 rounded border border-red-200">
                  <div className="text-red-700">Financial Exposure</div>
                  <div className="font-mono font-bold text-red-900 text-sm mt-0.5">₹{selectedAsset.financialExposureCr.toFixed(2)} Cr</div>
                </div>
              </div>

              <div>
                <div className="font-semibold text-slate-900">Active Security Controls</div>
                <div className="flex flex-wrap gap-1.5 mt-1.5">
                  {selectedAsset.controlsActive.map((c, i) => (
                    <span key={i} className="px-2 py-0.5 bg-emerald-50 text-emerald-800 border border-emerald-200 rounded font-mono text-[11px]">
                      ✓ {c}
                    </span>
                  ))}
                </div>
              </div>

              <div>
                <div className="font-semibold text-slate-900">Deficient Controls & Gaps</div>
                <div className="flex flex-wrap gap-1.5 mt-1.5">
                  {selectedAsset.controlsDeficient.map((c, i) => (
                    <span key={i} className="px-2 py-0.5 bg-red-50 text-red-800 border border-red-200 rounded font-mono text-[11px]">
                      ⚠️ {c}
                    </span>
                  ))}
                </div>
              </div>

              <div>
                <div className="font-semibold text-slate-900">Architecture Dependencies</div>
                <p className="text-slate-600 mt-1">
                  {selectedAsset.dependencies.length > 0 ? selectedAsset.dependencies.join(', ') : 'No upstream dependencies mapped.'}
                </p>
              </div>
            </div>

            <div className="px-6 py-3 bg-slate-50 border-t border-slate-200 flex justify-end">
              <button
                onClick={() => setSelectedAsset(null)}
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

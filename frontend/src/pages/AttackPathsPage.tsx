import React, { useState } from 'react';
import { PageId } from '../types/index.js';
import { GitBranch, ShieldAlert, CheckCircle2, ArrowRight, AlertTriangle, ShieldCheck, Zap } from 'lucide-react';

interface Props {
  onNavigate: (page: PageId) => void;
}

interface PathNode {
  id: string;
  step: number;
  label: string;
  category: 'Perimeter' | 'Application' | 'Vulnerability' | 'Compute' | 'Identity' | 'Target Asset' | 'Financial Impact';
  assetName: string;
  controlStatus: string;
  exploitLikelihood: string;
  exposureContributionCr: number;
  isSevered?: boolean;
  description: string;
}

export const AttackPathsPage: React.FC<Props> = ({ onNavigate }) => {
  const [selectedNodeId, setSelectedNodeId] = useState<string>('node-5');
  const [isMfaSevered, setIsMfaSevered] = useState<boolean>(false);
  const [isPatchSevered, setIsPatchSevered] = useState<boolean>(false);

  const initialNodes: PathNode[] = [
    {
      id: 'node-1',
      step: 1,
      label: 'Internet Attacker / Public Recon',
      category: 'Perimeter',
      assetName: 'Public Ingress Edge (WAF)',
      controlStatus: 'WAF Active (Rule gaps on API payload bodies)',
      exploitLikelihood: 'High (Automated Bot Scans)',
      exposureContributionCr: 0.0,
      description: 'Threat actors conduct reconnaissance on public banking endpoints looking for unauthenticated REST endpoints.'
    },
    {
      id: 'node-2',
      step: 2,
      label: 'Public Web Application Ingress',
      category: 'Application',
      assetName: 'Core Banking API & Payment Gateway',
      controlStatus: 'TLS 1.3 Active · Lacks Mutual TLS Authentication',
      exploitLikelihood: '78% Recon Infiltration',
      exposureContributionCr: 1.2,
      description: 'Ingress traffic reaches the payment gateway container cluster via publicly exposed API route /v1/transfer.'
    },
    {
      id: 'node-3',
      step: 3,
      label: 'Exploitable Vulnerability (CVE-2025-2144)',
      category: 'Vulnerability',
      assetName: 'Core Banking API Gateway Container',
      controlStatus: isPatchSevered ? 'Mitigated via Hotfix v4.8.2' : 'Unpatched (16-day SLA breach)',
      exploitLikelihood: isPatchSevered ? '0% (Severed)' : '81% EPSS Exploit Rate',
      exposureContributionCr: isPatchSevered ? 0.0 : 1.8,
      isSevered: isPatchSevered,
      description: 'Critical deserialization flaw allows remote code execution without valid credentials, granting remote shell inside DMZ.'
    },
    {
      id: 'node-4',
      step: 4,
      label: 'DMZ Application Server Compromise',
      category: 'Compute',
      assetName: 'Core Banking Workload Node',
      controlStatus: 'Local Antivirus Active · No Micro-Segmentation',
      exploitLikelihood: isPatchSevered ? '0%' : '65% Pivot Likelihood',
      exposureContributionCr: isPatchSevered ? 0.0 : 1.4,
      isSevered: isPatchSevered,
      description: 'Attacker obtains low-privilege bash shell on Kubernetes pod and scrapes environment variables for internal credentials.'
    },
    {
      id: 'node-5',
      step: 5,
      label: 'Privileged Administrative Account',
      category: 'Identity',
      assetName: 'Domain Admin / DB SysAdmin (Active Directory)',
      controlStatus: isMfaSevered ? 'Protected by Hardware FIDO2 MFA' : 'Deficient (Password-Only / No MFA)',
      exploitLikelihood: isMfaSevered ? '0.8% (Near Impossible)' : '74% Credential Reuse Success',
      exposureContributionCr: isMfaSevered ? 0.0 : 2.4,
      isSevered: isMfaSevered,
      description: 'Cached administrative domain credentials allow privilege escalation. The absence of hardware MFA enables remote session hijacking.'
    },
    {
      id: 'node-6',
      step: 6,
      label: 'Customer Database Exfiltration',
      category: 'Target Asset',
      assetName: 'Customer Database (Tier-1 RDS)',
      controlStatus: 'Transparent Data Encryption Active · Open Ingress Port 1521',
      exploitLikelihood: (isMfaSevered || isPatchSevered) ? '0%' : '58% Direct Data Dump Rate',
      exposureContributionCr: (isMfaSevered || isPatchSevered) ? 0.0 : 4.93,
      isSevered: isMfaSevered || isPatchSevered,
      description: 'Attacker authenticates with hijacked SysAdmin role and executes bulk SELECT on unmasked customer banking records.'
    },
    {
      id: 'node-7',
      step: 7,
      label: 'Financial Cyber Loss Realization',
      category: 'Financial Impact',
      assetName: 'Enterprise Balance Sheet',
      controlStatus: 'Incident Response & Cyber Insurance',
      exploitLikelihood: (isMfaSevered || isPatchSevered) ? 'Low' : 'Critical Exposure',
      exposureContributionCr: (isMfaSevered || isPatchSevered) ? 0.0 : 14.5,
      isSevered: isMfaSevered || isPatchSevered,
      description: 'Ransomware extortion, regulatory penalty under RBI DPDP guidelines, customer notification, and business disruption.'
    }
  ];

  const selectedNode = initialNodes.find(n => n.id === selectedNodeId) || initialNodes[4];
  const isChainBroken = isMfaSevered || isPatchSevered;
  const currentPathExposureCr = isChainBroken ? 0.4 : 2.8;

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="bg-white border border-slate-200 rounded-lg p-6">
        <div className="flex items-center justify-between">
          <div>
            <div className="flex items-center gap-2 text-xs font-semibold text-blue-700 uppercase tracking-wider">
              <GitBranch className="w-4 h-4" />
              <span>Multi-Hop Threat Progression</span>
            </div>
            <h2 className="text-xl font-bold text-slate-900 mt-1">Attack Path Graph Visualization</h2>
            <p className="text-xs text-slate-500 mt-1 max-w-3xl leading-relaxed">
              Cyber attackers do not compromise isolated servers—they traverse multi-hop credential and network chains. This graph models the highest-risk attack path leading from perimeter ingress to Tier-1 financial databases.
            </p>
          </div>
          <div className="text-right shrink-0">
            <div className="text-xs text-slate-500">Path Exposure Impact</div>
            <div className={`font-mono text-2xl font-bold ${isChainBroken ? 'text-emerald-600' : 'text-red-600'}`}>
              ₹{currentPathExposureCr.toFixed(1)} Cr
            </div>
            <div className="text-[11px] text-slate-500 font-mono">
              {isChainBroken ? '✓ Path Severed & Defended' : '⚠️ Highest-Risk Active Path'}
            </div>
          </div>
        </div>

        {/* Path Severance Simulation Controls */}
        <div className="mt-4 pt-4 border-t border-slate-100 flex flex-wrap items-center gap-4 bg-slate-50 p-3 rounded-lg">
          <span className="text-xs font-semibold text-slate-800">Simulate Path Severance Controls:</span>
          <label className="flex items-center gap-2 text-xs text-slate-700 cursor-pointer select-none">
            <input
              type="checkbox"
              checked={isMfaSevered}
              onChange={e => setIsMfaSevered(e.target.checked)}
              className="rounded text-blue-600 focus:ring-blue-500 w-4 h-4"
            />
            <span className="font-medium">Enforce MFA on Privileged Account (Node 5)</span>
          </label>
          <label className="flex items-center gap-2 text-xs text-slate-700 cursor-pointer select-none">
            <input
              type="checkbox"
              checked={isPatchSevered}
              onChange={e => setIsPatchSevered(e.target.checked)}
              className="rounded text-blue-600 focus:ring-blue-500 w-4 h-4"
            />
            <span className="font-medium">Patch CVE-2025-2144 on Banking API (Node 3)</span>
          </label>
        </div>
      </div>

      {/* Attack Path Node Chain with Cyber Grid & Animated Energy Beam */}
      <div className="relative bg-slate-950 text-white rounded-xl p-6 overflow-x-auto border border-slate-800 shadow-xl">
        <div className="absolute inset-0 cyber-grid-dark opacity-40 pointer-events-none" />
        
        <div className="relative z-10 flex items-center justify-between mb-4 pb-3 border-b border-slate-800/80">
          <div className="text-xs font-semibold text-cyan-400 font-mono uppercase tracking-wider flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-cyan-400 animate-ping" />
            <span>Interactive Lateral Movement Sequence (Click Node to Inspect)</span>
          </div>
          <div className="text-[11px] font-mono text-slate-400">
            {isChainBroken ? (
              <span className="text-emerald-400 font-bold bg-emerald-950/60 border border-emerald-800/60 px-2 py-0.5 rounded">
                ✓ CHAIN SEVERED AT DEFENSE BARRIER
              </span>
            ) : (
              <span className="text-red-400 font-bold bg-red-950/60 border border-red-800/60 px-2 py-0.5 rounded animate-pulse">
                ⚡ ACTIVE ATTACK PATH VECTOR
              </span>
            )}
          </div>
        </div>

        <div className="relative z-10 flex items-center gap-2.5 min-w-[960px] py-4">
          {initialNodes.map((node, idx) => {
            const isSelected = node.id === selectedNodeId;
            const isSevered = node.isSevered;
            const isTarget = node.id === 'node-6';
            const isPriv = node.id === 'node-5';

            return (
              <React.Fragment key={node.id}>
                {/* Node Card */}
                <div
                  onClick={() => setSelectedNodeId(node.id)}
                  className={`flex-1 p-3.5 rounded-xl border text-xs cursor-pointer transition-all duration-300 relative group ${
                    isSelected
                      ? 'border-cyan-400 ring-2 ring-cyan-500/40 shadow-lg shadow-cyan-500/20 bg-gradient-to-b from-slate-900 to-slate-950 scale-105 z-20'
                      : isSevered
                      ? 'border-emerald-500/60 bg-gradient-to-b from-emerald-950/40 to-slate-950 opacity-80 shadow-sm shadow-emerald-900/20'
                      : isPriv || isTarget
                      ? 'border-rose-500/60 bg-gradient-to-b from-rose-950/30 to-slate-950 hover:border-rose-400 shadow-md shadow-rose-950/30'
                      : 'border-slate-800 bg-gradient-to-b from-slate-900/90 to-slate-950 hover:border-slate-700 hover:bg-slate-900'
                  }`}
                >
                  <div className="flex items-center justify-between text-[10px] text-slate-400 font-mono mb-1.5">
                    <span className="text-cyan-400/80 font-bold">STEP 0{node.step}</span>
                    <span className={`px-1.5 py-0.5 rounded text-[9px] font-bold uppercase tracking-wider ${
                      isSevered ? 'bg-emerald-900/80 text-emerald-300 border border-emerald-700/60' :
                      isPriv ? 'bg-rose-900/80 text-rose-300 border border-rose-700/60' :
                      isTarget ? 'bg-amber-900/80 text-amber-300 border border-amber-700/60' :
                      'bg-slate-800 text-slate-300 border border-slate-700'
                    }`}>
                      {node.category}
                    </span>
                  </div>

                  <div className="font-bold text-white leading-snug line-clamp-2 group-hover:text-cyan-300 transition-colors">
                    {node.label}
                  </div>

                  <div className="mt-2 text-[11px] text-slate-400 truncate font-mono">
                    {node.assetName}
                  </div>

                  <div className="mt-2.5 pt-2 border-t border-slate-800/80 flex items-center justify-between font-mono text-[10px]">
                    <span className={isSevered ? 'text-emerald-400 font-bold' : 'text-rose-400 font-semibold'}>
                      {isSevered ? 'DEFENDED' : node.exploitLikelihood}
                    </span>
                    {node.exposureContributionCr > 0 && !isSevered && (
                      <span className="font-bold text-amber-300">
                        ₹{node.exposureContributionCr.toFixed(1)} Cr
                      </span>
                    )}
                  </div>
                </div>

                {/* Connecting Animated Beam / Arrow */}
                {idx < initialNodes.length - 1 && (
                  <div className="shrink-0 flex items-center px-1">
                    <div className="relative flex items-center justify-center">
                      <ArrowRight className={`w-5 h-5 transition-colors ${
                        isSevered || (idx >= 2 && isPatchSevered) || (idx >= 4 && isMfaSevered)
                          ? 'text-emerald-500/40'
                          : 'text-rose-500 animate-pulse'
                      }`} />
                    </div>
                  </div>
                )}
              </React.Fragment>
            );
          })}
        </div>
      </div>

      {/* Selected Node Deep Dive Inspector */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="md:col-span-2 bg-white border border-slate-200 rounded-lg p-5">
          <div className="flex items-center justify-between mb-3">
            <div className="flex items-center gap-2">
              <span className="font-mono text-xs font-bold text-blue-700 bg-blue-50 px-2 py-0.5 rounded">
                Step 0{selectedNode.step} Analysis
              </span>
              <h3 className="text-base font-bold text-slate-900">{selectedNode.label}</h3>
            </div>
            {selectedNode.isSevered ? (
              <span className="text-xs font-semibold text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded flex items-center gap-1">
                <CheckCircle2 className="w-3.5 h-3.5" />
                <span>Path Severed</span>
              </span>
            ) : (
              <span className="text-xs font-semibold text-red-700 bg-red-50 px-2 py-0.5 rounded flex items-center gap-1">
                <AlertTriangle className="w-3.5 h-3.5" />
                <span>Exploitable Hop</span>
              </span>
            )}
          </div>

          <p className="text-xs text-slate-600 leading-relaxed bg-slate-50 p-3 rounded-lg border border-slate-100">
            {selectedNode.description}
          </p>

          <div className="grid grid-cols-2 gap-3 mt-4 text-xs">
            <div className="p-3 bg-white border border-slate-200 rounded">
              <div className="text-slate-500">Asset / Resource</div>
              <div className="font-semibold text-slate-900 mt-0.5">{selectedNode.assetName}</div>
            </div>
            <div className="p-3 bg-white border border-slate-200 rounded">
              <div className="text-slate-500">Current Security Controls</div>
              <div className="font-semibold text-slate-900 mt-0.5">{selectedNode.controlStatus}</div>
            </div>
          </div>
        </div>

        {/* Path Impact Summary Card */}
        <div className="bg-slate-900 text-white rounded-lg p-5 flex flex-col justify-between">
          <div>
            <div className="text-xs font-mono text-blue-400 uppercase tracking-wider font-semibold">
              Attack Chain Financial Intelligence
            </div>
            <h4 className="text-sm font-bold text-white mt-1">Tier-1 Database Exfiltration Risk</h4>
            <div className="mt-4 p-3 bg-slate-800 rounded-lg">
              <div className="text-xs text-slate-400">Total Path Exposure Contribution</div>
              <div className="text-3xl font-bold font-mono text-emerald-400 mt-1">
                {isChainBroken ? '₹0.4 Cr' : '₹2.8 Cr'}
              </div>
              <p className="text-[11px] text-slate-400 mt-1">
                {isChainBroken
                  ? 'Mitigation controls have successfully eliminated the high-impact lateral exfiltration route.'
                  : 'This attack path contributes ₹2.8 Cr to estimated financial exposure.'}
              </p>
            </div>
          </div>

          <div className="mt-4 pt-3 border-t border-slate-800">
            <button
              onClick={() => onNavigate('scenarios')}
              className="w-full py-2 px-3 bg-blue-600 hover:bg-blue-500 text-white rounded text-xs font-semibold flex items-center justify-center gap-1.5 transition-colors"
            >
              <span>Simulate in What-If Engine</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

import React, { useState } from 'react';
import { MetricCard } from '../components/MetricCard.js';
import { EnterpriseMetrics, FinancialBreakdown, RiskDriver, Vulnerability, PageId } from '../types/index.js';
import { ExplainabilityData } from '../components/ExplainabilityModal.js';
import { ArrowRight, ShieldAlert, Sparkles, TrendingUp, ChevronRight, Activity, Calendar, ShieldCheck } from 'lucide-react';

interface Props {
  metrics: EnterpriseMetrics;
  financialBreakdown: FinancialBreakdown;
  topRiskDrivers: RiskDriver[];
  recentVulnerabilities: Vulnerability[];
  historicalTrend: any[];
  onNavigate: (page: PageId) => void;
  onOpenExplainability: (data: ExplainabilityData) => void;
}

export const OverviewPage: React.FC<Props> = ({
  metrics,
  financialBreakdown,
  topRiskDrivers,
  recentVulnerabilities,
  historicalTrend,
  onNavigate,
  onOpenExplainability
}) => {
  const [selectedConfidence, setSelectedConfidence] = useState<90 | 95 | 99>(95);

  const varValues: Record<90 | 95 | 99, { value: string; desc: string }> = {
    90: { value: '₹8.4 Cr', desc: 'At 90% confidence, annual cybersecurity losses are projected not to exceed ₹8.4 Cr.' },
    95: { value: '₹12.6 Cr', desc: 'At 95% confidence, annual cybersecurity losses are projected not to exceed ₹12.6 Cr under simulated extreme stress.' },
    99: { value: '₹17.9 Cr', desc: 'At 99% confidence, 1-in-100 year tail catastrophic breach loss is estimated at ₹17.9 Cr.' }
  };

  const handleInspectOverviewMetric = (type: string) => {
    onOpenExplainability({
      title: 'Enterprise Cyber Risk Exposure Assessment',
      category: 'Executive Decision Intelligence',
      assetName: 'Nexa Financial Services Portfolio',
      likelihoodFormula: 'Aggregate Likelihood = Σ(Asset Likelihood × Asset Weight) = 42%',
      likelihoodResult: `${metrics.overallIncidentProbabilityPct}% / Year`,
      impactBreakdown: {
        downtime: financialBreakdown.downtimeCostCr,
        breach: financialBreakdown.dataBreachCostCr,
        recovery: financialBreakdown.recoveryCostCr,
        regulatory: financialBreakdown.regulatoryImpactCr,
        disruption: financialBreakdown.businessDisruptionCr,
        reputation: financialBreakdown.reputationImpactCr,
        total: financialBreakdown.totalFinancialImpactCr
      },
      ealFormula: `EAL = ${metrics.overallIncidentProbabilityPct}% × ₹${financialBreakdown.totalFinancialImpactCr} Cr = ₹${metrics.expectedAnnualLossCr} Cr`,
      mitigationAction: 'Targeted funding of Privileged MFA, Core Banking Hotfix, and Database Micro-segmentation lowers exposure to ₹15.0 Cr.',
      rosi: '325% on ₹80 Lakh investment',
      evidenceNotes: 'Continuous normalized telemetry aggregated across Qualys VMDR, Splunk SIEM, Azure AD IAM, and CrowdStrike EDR.'
    });
  };

  return (
    <div className="space-y-6">
      {/* Top Hero Banner with Cyber Gradient & Parallax feel */}
      <div className="relative overflow-hidden rounded-xl p-5 bg-gradient-to-r from-slate-950 via-blue-950 to-slate-900 border border-slate-800 text-white shadow-lg">
        <div className="absolute inset-0 cyber-grid-dark opacity-40 pointer-events-none" />
        <div className="absolute -top-12 -right-12 w-64 h-64 bg-cyan-500/10 rounded-full blur-2xl pointer-events-none" />
        
        <div className="relative z-10 flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div className="flex items-start sm:items-center gap-3">
            <div className="w-10 h-10 rounded-lg bg-gradient-to-tr from-cyan-500 to-blue-600 flex items-center justify-center text-white shrink-0 shadow-md shadow-cyan-500/20">
              <Activity className="w-5 h-5" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <span className="text-xs font-mono font-bold uppercase text-cyan-400 tracking-wider">
                  Real-Time Decision Intelligence
                </span>
                <span className="text-[10px] bg-cyan-950/80 text-cyan-300 border border-cyan-800/80 px-2 py-0.5 rounded-full font-mono">
                  FAIR & Cyber-VaR Engine
                </span>
              </div>
              <p className="text-xs sm:text-sm text-slate-300 mt-1 leading-snug">
                Converting technical security telemetry into defensible ₹ exposure, risk reduction, and 0/1 knapsack investment optimization.
              </p>
            </div>
          </div>

          <button
            onClick={() => onNavigate('scenarios')}
            className="px-4 py-2 bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-400 hover:to-blue-500 text-slate-950 font-bold rounded-lg text-xs transition-all shadow-md shadow-cyan-500/20 whitespace-nowrap flex items-center gap-1.5 self-start md:self-auto hover:scale-105 active:scale-95"
          >
            <span className="text-white">Run What-If Simulation</span>
            <ArrowRight className="w-3.5 h-3.5 text-white" />
          </button>
        </div>
      </div>

      {/* 6 KPI Cards with 3D Parallax Tilt and Gradient Highlights */}
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-3.5">
        <MetricCard
          title="Enterprise Cyber Risk"
          value={`${metrics.enterpriseRiskScore} / 100`}
          subtitle="Score: High Risk Tier"
          change="-2 pts MoM"
          changeType="positive"
          gradientTop="purple"
          onWhyClick={() => handleInspectOverviewMetric('score')}
        />
        <MetricCard
          title="Total Financial Exposure"
          value={`₹${metrics.totalFinancialExposureCr.toFixed(1)} Cr`}
          subtitle="Across 10 Banking Assets"
          change="-₹0.3 Cr MoM"
          changeType="positive"
          gradientTop="red"
          onWhyClick={() => handleInspectOverviewMetric('exposure')}
        />
        <MetricCard
          title="Expected Annual Loss"
          value={`₹${metrics.expectedAnnualLossCr.toFixed(1)} Cr`}
          subtitle="Annual Prob: 42%"
          change="Likelihood × Impact"
          changeType="neutral"
          gradientTop="amber"
          onWhyClick={() => handleInspectOverviewMetric('eal')}
        />
        <MetricCard
          title="Risk Reduction Opp."
          value={`₹${metrics.riskReductionOpportunityCr.toFixed(1)} Cr`}
          subtitle="Top 3 Actionable Gaps"
          change="+₹0.4 Cr Potential"
          changeType="positive"
          gradientTop="cyan"
          onWhyClick={() => onNavigate('recommendations')}
        />
        <MetricCard
          title="Security Investment"
          value={`₹${metrics.currentSecurityInvestmentCr.toFixed(1)} Cr`}
          subtitle="Annual InfoSec Budget"
          change="Optimal: ₹0.80 Cr"
          changeType="neutral"
          gradientTop="blue"
          onWhyClick={() => onNavigate('investment')}
        />
        <MetricCard
          title="Estimated ROSI"
          value={`${metrics.currentRosiPct}%`}
          subtitle="Return on Security Spend"
          change="325% on Top 3"
          changeType="positive"
          gradientTop="emerald"
          onWhyClick={() => onNavigate('investment')}
        />
      </div>

      {/* Middle Row: Exposure Trend Chart & Cyber VaR Selector */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Historical Exposure Trend Line Chart */}
        <div className="lg:col-span-2 bg-white border border-slate-200 rounded-lg p-5">
          <div className="flex items-center justify-between mb-4">
            <div>
              <h3 className="text-sm font-bold text-slate-900">Financial Cyber Exposure Trend (₹ Crore)</h3>
              <p className="text-xs text-slate-500">6-Month historical trajectory based on telemetry updates</p>
            </div>
            <div className="text-xs font-mono text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded font-medium">
              -15.6% Exposure Trajectory
            </div>
          </div>

          {/* SVG Line / Area Chart */}
          <div className="h-56 w-full pt-2">
            <svg viewBox="0 0 540 180" className="w-full h-full overflow-visible">
              <defs>
                <linearGradient id="exposureGrad" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="0%" stopColor="#06b6d4" stopOpacity="0.35" />
                  <stop offset="60%" stopColor="#2563eb" stopOpacity="0.12" />
                  <stop offset="100%" stopColor="#4f46e5" stopOpacity="0.0" />
                </linearGradient>
                <linearGradient id="lineGrad" x1="0" y1="0" x2="1" y2="0">
                  <stop offset="0%" stopColor="#06b6d4" />
                  <stop offset="50%" stopColor="#2563eb" />
                  <stop offset="100%" stopColor="#4f46e5" />
                </linearGradient>
                <filter id="glow" x="-20%" y="-20%" width="140%" height="140%">
                  <feDropShadow dx="0" dy="3" stdDeviation="3" floodColor="#2563eb" floodOpacity="0.4" />
                </filter>
              </defs>

              {/* Grid Lines */}
              <line x1="40" y1="20" x2="520" y2="20" stroke="#f1f5f9" strokeWidth="1" />
              <line x1="40" y1="60" x2="520" y2="60" stroke="#f1f5f9" strokeWidth="1" />
              <line x1="40" y1="100" x2="520" y2="100" stroke="#f1f5f9" strokeWidth="1" />
              <line x1="40" y1="140" x2="520" y2="140" stroke="#f1f5f9" strokeWidth="1" />

              {/* Y Axis Labels */}
              <text x="32" y="24" fontSize="10" fill="#94a3b8" textAnchor="end" fontFamily="monospace">₹24Cr</text>
              <text x="32" y="64" fontSize="10" fill="#94a3b8" textAnchor="end" fontFamily="monospace">₹21Cr</text>
              <text x="32" y="104" fontSize="10" fill="#94a3b8" textAnchor="end" fontFamily="monospace">₹18Cr</text>
              <text x="32" y="144" fontSize="10" fill="#94a3b8" textAnchor="end" fontFamily="monospace">₹15Cr</text>

              {/* Chart Path with Multi-Color Gradient */}
              <path
                d="M 50 52 L 125 44 L 200 68 L 275 79 L 350 88 L 425 94 L 500 98 L 500 150 L 50 150 Z"
                fill="url(#exposureGrad)"
              />
              <path
                d="M 50 52 L 125 44 L 200 68 L 275 79 L 350 88 L 425 94 L 500 98"
                fill="none"
                stroke="url(#lineGrad)"
                strokeWidth="3"
                strokeLinecap="round"
                strokeLinejoin="round"
                filter="url(#glow)"
              />

              {/* Dots and Labels */}
              {[
                { x: 50, y: 52, val: '₹21.8', label: 'Apr' },
                { x: 125, y: 44, val: '₹22.4', label: 'May' },
                { x: 200, y: 68, val: '₹20.6', label: 'Jun' },
                { x: 275, y: 79, val: '₹19.8', label: 'Jul' },
                { x: 350, y: 88, val: '₹19.1', label: 'Aug' },
                { x: 425, y: 94, val: '₹18.7', label: 'Sep' },
                { x: 500, y: 98, val: '₹18.4', label: 'Oct (Live)', isCurrent: true }
              ].map((pt, idx) => (
                <g key={idx}>
                  <circle
                    cx={pt.x}
                    cy={pt.y}
                    r={pt.isCurrent ? "5" : "3.5"}
                    fill={pt.isCurrent ? "#2563eb" : "#ffffff"}
                    stroke="#2563eb"
                    strokeWidth="2"
                  />
                  <text
                    x={pt.x}
                    y={pt.y - 10}
                    fontSize="9.5"
                    fill="#1e293b"
                    textAnchor="middle"
                    fontFamily="monospace"
                    fontWeight="600"
                  >
                    {pt.val}
                  </text>
                  <text
                    x={pt.x}
                    y="166"
                    fontSize="10"
                    fill={pt.isCurrent ? "#2563eb" : "#64748b"}
                    textAnchor="middle"
                    fontWeight={pt.isCurrent ? "700" : "500"}
                  >
                    {pt.label}
                  </text>
                </g>
              ))}
            </svg>
          </div>
        </div>

        {/* Cyber VaR (Value at Risk) Card - Section 12 in Prompt */}
        <div className="bg-white border border-slate-200 rounded-lg p-5 flex flex-col justify-between">
          <div>
            <div className="flex items-center justify-between">
              <span className="text-xs font-semibold uppercase text-slate-500 tracking-wider">Statistical Cyber VaR</span>
              <span className="text-[11px] font-mono text-blue-700 bg-blue-50 px-2 py-0.5 rounded">FAIR Model</span>
            </div>

            <div className="mt-4 flex items-center gap-1.5 p-1 bg-slate-100 rounded-lg">
              {([90, 95, 99] as const).map(conf => (
                <button
                  key={conf}
                  onClick={() => setSelectedConfidence(conf)}
                  className={`flex-1 py-1.5 text-xs font-semibold rounded transition-colors ${
                    selectedConfidence === conf
                      ? 'bg-white text-slate-900 shadow-xs'
                      : 'text-slate-600 hover:text-slate-900'
                  }`}
                >
                  {conf}% VaR
                </button>
              ))}
            </div>

            <div className="mt-5 text-center">
              <div className="text-xs text-slate-500 font-medium">
                {selectedConfidence}% Confidence Cyber VaR
              </div>
              <div className="text-4xl font-extrabold font-mono text-slate-900 mt-1 tabular-nums">
                {varValues[selectedConfidence].value}
              </div>
            </div>

            <div className="mt-4 p-3 bg-slate-50 rounded border border-slate-200 text-xs text-slate-600 leading-relaxed">
              <blockquote className="italic">"{varValues[selectedConfidence].desc}"</blockquote>
            </div>
          </div>

          <div className="mt-4 pt-3 border-t border-slate-100 flex items-center justify-between text-xs">
            <span className="text-slate-500">Loss Exceedance Analysis</span>
            <button
              onClick={() => onNavigate('risk-quantification')}
              className="text-blue-600 hover:text-blue-800 font-semibold flex items-center gap-1"
            >
              <span>Exceedance Curve</span>
              <ChevronRight className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>
      </div>

      {/* Bottom Row: Top Risk Drivers & Recent Vulnerabilities */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Top Risk Drivers Preview */}
        <div className="bg-white border border-slate-200 rounded-lg p-5">
          <div className="flex items-center justify-between mb-4">
            <div>
              <h3 className="text-sm font-bold text-slate-900">Top Factors Driving Exposure</h3>
              <p className="text-xs text-slate-500">Root causes with highest downstream rupee impact</p>
            </div>
            <button
              onClick={() => onNavigate('risk-drivers')}
              className="text-xs text-blue-600 hover:text-blue-800 font-semibold flex items-center gap-1"
            >
              <span>View All Drivers</span>
              <ChevronRight className="w-3.5 h-3.5" />
            </button>
          </div>

          <div className="space-y-3">
            {topRiskDrivers.map((driver, idx) => (
              <div
                key={driver.id}
                onClick={() => onNavigate('risk-drivers')}
                className="p-3 rounded-lg border border-slate-100 hover:border-slate-300 hover:bg-slate-50/60 transition-all cursor-pointer flex items-center justify-between"
              >
                <div className="flex-1 pr-4">
                  <div className="flex items-center gap-2">
                    <span className="text-xs font-mono font-bold text-slate-400">0{idx + 1}.</span>
                    <span className="text-xs font-semibold text-slate-900 line-clamp-1">{driver.title}</span>
                  </div>
                  <div className="mt-1.5 flex items-center gap-2">
                    <div className="w-36 bg-slate-100 h-1.5 rounded-full overflow-hidden">
                      <div
                        className="bg-red-500 h-1.5 rounded-full"
                        style={{ width: `${driver.percentageContribution * 2.8}%` }}
                      />
                    </div>
                    <span className="text-[11px] text-slate-500 font-mono">{driver.category}</span>
                  </div>
                </div>
                <div className="text-right shrink-0">
                  <div className="font-mono font-bold text-sm text-red-600">
                    ₹{driver.financialExposureCr.toFixed(1)} Cr
                  </div>
                  <div className="text-[10px] text-slate-400 font-mono">
                    {driver.percentageContribution}% exposure
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Recent Critical Vulnerabilities Preview */}
        <div className="bg-white border border-slate-200 rounded-lg p-5">
          <div className="flex items-center justify-between mb-4">
            <div>
              <h3 className="text-sm font-bold text-slate-900">Critical Active Vulnerabilities</h3>
              <p className="text-xs text-slate-500">Aggregated via Qualys VMDR scan telemetry</p>
            </div>
            <button
              onClick={() => onNavigate('vulnerabilities')}
              className="text-xs text-blue-600 hover:text-blue-800 font-semibold flex items-center gap-1"
            >
              <span>Vulnerability Matrix</span>
              <ChevronRight className="w-3.5 h-3.5" />
            </button>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs">
              <thead>
                <tr className="border-b border-slate-200 text-slate-500 font-semibold">
                  <th className="pb-2">CVE</th>
                  <th className="pb-2">Asset</th>
                  <th className="pb-2 text-right">CVSS</th>
                  <th className="pb-2 text-right">EPSS</th>
                  <th className="pb-2 text-right">Risk Value</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                {recentVulnerabilities.map(v => (
                  <tr key={v.id} className="hover:bg-slate-50/80 transition-colors">
                    <td className="py-2.5 font-mono font-semibold text-slate-900">
                      {v.cve}
                    </td>
                    <td className="py-2.5 text-slate-600 max-w-[130px] truncate">
                      {v.assetName}
                    </td>
                    <td className="py-2.5 text-right font-mono font-bold text-red-600">
                      {v.cvss.toFixed(1)}
                    </td>
                    <td className="py-2.5 text-right font-mono text-slate-700">
                      {v.epss.toFixed(2)}
                    </td>
                    <td className="py-2.5 text-right font-mono font-bold text-slate-900">
                      ₹{v.riskContributionCr.toFixed(1)} Cr
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          <div className="mt-4 pt-3 border-t border-slate-100 flex items-center justify-between">
            <span className="text-[11px] text-slate-400">Sample / Simulated Vulnerability Telemetry</span>
            <button
              onClick={() => onNavigate('attack-paths')}
              className="text-xs text-blue-600 hover:text-blue-800 font-semibold flex items-center gap-1"
            >
              <span>Inspect Attack Paths</span>
              <ArrowRight className="w-3 h-3" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

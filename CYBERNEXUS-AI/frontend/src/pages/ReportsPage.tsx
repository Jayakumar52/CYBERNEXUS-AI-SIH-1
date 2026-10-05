import React, { useState } from 'react';
import { EnterpriseMetrics, RiskDriver, Vulnerability, PageId } from '../types/index.js';
import { FileText, Printer, Download, CheckCircle2, ShieldCheck, DollarSign, Calendar, Building, Award } from 'lucide-react';

interface Props {
  metrics: EnterpriseMetrics;
  topRiskDrivers: RiskDriver[];
  vulnerabilities: Vulnerability[];
  onNavigate: (page: PageId) => void;
}

export const ReportsPage: React.FC<Props> = ({
  metrics,
  topRiskDrivers,
  vulnerabilities,
  onNavigate
}) => {
  const [reportDate] = useState('October 5, 2026');

  const handlePrint = () => {
    window.print();
  };

  return (
    <div className="space-y-6">
      {/* Header Bar */}
      <div className="bg-white border border-slate-200 rounded-lg p-6 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2 text-xs font-semibold text-blue-700 uppercase tracking-wider">
            <FileText className="w-4 h-4" />
            <span>Boardroom Executive Reporting</span>
          </div>
          <h2 className="text-xl font-bold text-slate-900 mt-1">Executive Cyber Risk & Investment Audit Report</h2>
          <p className="text-xs text-slate-500 mt-1">
            Print-friendly, auditable financial risk disclosure formatted for the Board of Directors and Chief Risk Officer.
          </p>
        </div>

        <div className="flex items-center gap-2">
          <button
            onClick={handlePrint}
            className="px-4 py-2 bg-slate-900 hover:bg-slate-800 text-white rounded text-xs font-semibold flex items-center gap-2 transition-colors shadow-xs"
          >
            <Printer className="w-3.5 h-3.5" />
            <span>Print / Save as PDF</span>
          </button>
        </div>
      </div>

      {/* Printable Report Document Sheet */}
      <div className="bg-white border border-slate-200 rounded-xl shadow-xs p-8 max-w-4xl mx-auto print:border-none print:shadow-none print:p-0">
        {/* Document Header */}
        <div className="border-b-2 border-slate-900 pb-6 flex flex-col sm:flex-row sm:items-end justify-between gap-4">
          <div>
            <div className="flex items-center gap-2">
              <div className="w-6 h-6 rounded bg-slate-900 text-white font-mono font-bold text-xs flex items-center justify-center">
                CN
              </div>
              <span className="font-extrabold text-slate-900 text-base tracking-tight">CYBERNEXUS AI</span>
            </div>
            <h1 className="text-2xl font-black text-slate-900 mt-3 tracking-tight">
              EXECUTIVE CYBER RISK QUANTIFICATION REPORT
            </h1>
            <div className="text-xs text-slate-500 mt-1 font-mono">
              Audit Period: Q3/Q4 2026 · Document Ref: NEXA-CRQ-2026-10
            </div>
          </div>

          <div className="text-right text-xs space-y-1">
            <div className="font-bold text-slate-900">NEXA FINANCIAL SERVICES</div>
            <div className="text-slate-500">Digital Banking & Core Treasury Division</div>
            <div className="text-slate-400 font-mono">Classification: STRICTLY CONFIDENTIAL</div>
          </div>
        </div>

        {/* Section 1: Executive Summary */}
        <div className="mt-6 space-y-3">
          <h2 className="text-xs font-bold uppercase tracking-wider text-slate-500 font-mono">
            1. Executive Briefing & Financial Summary
          </h2>
          <p className="text-xs text-slate-700 leading-relaxed text-justify">
            During continuous automated telemetry analysis across ten Tier-1 banking applications and identity directories, CYBERNEXUS AI established enterprise cyber financial exposure at <strong>₹{metrics.totalFinancialExposureCr.toFixed(1)} Crore</strong>, with an <strong>Expected Annual Loss (EAL) of ₹{metrics.expectedAnnualLossCr.toFixed(1)} Crore</strong> based on an aggregate annual incident likelihood of {metrics.overallIncidentProbabilityPct}%.
          </p>
          <p className="text-xs text-slate-700 leading-relaxed text-justify">
            Algorithmic 0/1 knapsack optimization confirms that an allocated capital deployment of <strong>₹80 Lakh (₹0.80 Cr)</strong> will achieve an immediate <strong>₹3.4 Crore risk reduction</strong>, generating a defensible <strong>325% Return on Security Investment (ROSI)</strong> and directly satisfying compliance mandates under RBI and SEBI cybersecurity frameworks.
          </p>
        </div>

        {/* Section 2: Core KPI Metrics Grid */}
        <div className="mt-6 pt-4 border-t border-slate-100">
          <h2 className="text-xs font-bold uppercase tracking-wider text-slate-500 font-mono mb-3">
            2. Verified Quantitative Risk Indicators
          </h2>
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 text-center">
            <div className="p-3 bg-slate-50 border border-slate-200 rounded">
              <div className="text-[10px] text-slate-500 uppercase">Enterprise Cyber Risk</div>
              <div className="text-xl font-bold font-mono text-slate-900 mt-0.5">
                {metrics.enterpriseRiskScore} / 100
              </div>
            </div>
            <div className="p-3 bg-slate-50 border border-slate-200 rounded">
              <div className="text-[10px] text-slate-500 uppercase">Total Exposure</div>
              <div className="text-xl font-bold font-mono text-red-600 mt-0.5">
                ₹{metrics.totalFinancialExposureCr.toFixed(1)} Cr
              </div>
            </div>
            <div className="p-3 bg-slate-50 border border-slate-200 rounded">
              <div className="text-[10px] text-slate-500 uppercase">Expected Annual Loss</div>
              <div className="text-xl font-bold font-mono text-amber-700 mt-0.5">
                ₹{metrics.expectedAnnualLossCr.toFixed(1)} Cr
              </div>
            </div>
            <div className="p-3 bg-slate-50 border border-slate-200 rounded">
              <div className="text-[10px] text-slate-500 uppercase">Optimized ROSI</div>
              <div className="text-xl font-bold font-mono text-emerald-700 mt-0.5">
                325%
              </div>
            </div>
          </div>
        </div>

        {/* Section 3: Top Risk Drivers Table */}
        <div className="mt-6 pt-4 border-t border-slate-100">
          <h2 className="text-xs font-bold uppercase tracking-wider text-slate-500 font-mono mb-3">
            3. Top Downstream Risk Drivers
          </h2>
          <table className="w-full text-left text-xs border border-slate-200 rounded">
            <thead>
              <tr className="bg-slate-50 border-b border-slate-200 text-slate-600 font-semibold">
                <th className="py-2 px-3">Driver Finding</th>
                <th className="py-2 px-3">Category</th>
                <th className="py-2 px-3 text-right">Exposure (₹ Cr)</th>
                <th className="py-2 px-3 text-right">% Portfolio</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {topRiskDrivers.slice(0, 4).map(d => (
                <tr key={d.id}>
                  <td className="py-2 px-3 font-semibold text-slate-900">{d.title}</td>
                  <td className="py-2 px-3 text-slate-600">{d.category}</td>
                  <td className="py-2 px-3 text-right font-mono font-bold text-red-600">
                    ₹{d.financialExposureCr.toFixed(1)} Cr
                  </td>
                  <td className="py-2 px-3 text-right font-mono text-slate-700">
                    {d.percentageContribution}%
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Section 4: Recommended Capital Allocation */}
        <div className="mt-6 pt-4 border-t border-slate-100">
          <h2 className="text-xs font-bold uppercase tracking-wider text-slate-500 font-mono mb-2">
            4. Board-Approved Security Investment Recommendation
          </h2>
          <div className="p-4 bg-emerald-50/50 border border-emerald-200 rounded-lg text-xs space-y-2">
            <div className="flex justify-between font-bold text-emerald-900">
              <span>Optimal Portfolio under ₹1.00 Crore Cap:</span>
              <span className="font-mono">Total Cost: ₹80 Lakh (₹0.8 Cr) · Reduction: ₹3.4 Cr</span>
            </div>
            <ul className="list-disc list-inside space-y-1 text-emerald-800">
              <li><strong>Privileged MFA Enforcement:</strong> Enforce FIDO2 hardware tokens across 122 admin accounts (₹35 L).</li>
              <li><strong>Critical Patch Acceleration Program:</strong> Cut MTTR to 36h for CVSS 9+ vulnerabilities (₹25 L).</li>
              <li><strong>Cloud Security Hardening & CSPM:</strong> Auto-remediate open S3 buckets & IAM drift (₹20 L).</li>
            </ul>
            <div className="pt-2 text-[11px] text-emerald-900 font-mono border-t border-emerald-200">
              Expected Residual Exposure Post-Remediation: ₹15.0 Cr (Incident Probability reduced to 31%).
            </div>
          </div>
        </div>

        {/* Section 5: Sign-Off and Audit Certification */}
        <div className="mt-8 pt-6 border-t-2 border-slate-900 grid grid-cols-2 text-xs">
          <div>
            <div className="text-slate-400 font-mono uppercase text-[10px]">Model Validation</div>
            <div className="font-bold text-slate-900 mt-1">CYBERNEXUS Decision Engine v4.2</div>
            <div className="text-slate-500 text-[11px]">Factor Analysis of Information Risk (FAIR) Compliant</div>
          </div>

          <div className="text-right">
            <div className="text-slate-400 font-mono uppercase text-[10px]">CISO Sign-Off</div>
            <div className="font-bold text-slate-900 mt-1">Dr. A. Verma, CISO</div>
            <div className="text-slate-500 text-[11px]">Nexa Financial Services SecOps Division</div>
          </div>
        </div>
      </div>
    </div>
  );
};

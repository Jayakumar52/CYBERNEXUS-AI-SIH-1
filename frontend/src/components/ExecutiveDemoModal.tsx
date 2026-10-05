import React, { useState } from 'react';
import { X, Play, ChevronRight, ChevronLeft, CheckCircle2 } from 'lucide-react';
import { PageId } from '../types/index.js';
import confetti from 'canvas-confetti';

interface Props {
  isOpen: boolean;
  onClose: () => void;
  onNavigate: (page: PageId) => void;
}

const DEMO_STEPS = [
  {
    step: 1,
    title: 'The Core Enterprise Problem',
    subtitle: 'From Qualitative Fear to Quantitative Financial Intelligence',
    targetPage: 'overview' as PageId,
    content: (
      <div className="space-y-4">
        <p className="text-sm text-slate-700 leading-relaxed">
          Traditional security dashboards tell leadership: <span className="font-bold text-red-600">"You have 4 Critical Vulnerabilities."</span>
        </p>
        <p className="text-sm text-slate-700 leading-relaxed">
          The Board of Directors and CFO always ask: <span className="font-bold text-slate-900">"What is our actual financial exposure in Rupees, and which project should we fund first?"</span>
        </p>
        <div className="p-4 bg-slate-50 border border-slate-200 rounded-lg">
          <div className="text-xs uppercase font-bold text-blue-700 tracking-wider">CYBERNEXUS AI Pipeline</div>
          <div className="text-xs font-mono mt-1 text-slate-800">
            Telemetry → Asset Criticality → AI Risk Engine → Financial Exposure → What-If Simulation → 0/1 Knapsack Investment Optimization
          </div>
        </div>
      </div>
    )
  },
  {
    step: 2,
    title: 'Current Enterprise Risk Baseline',
    subtitle: 'Nexa Financial Services Continuous Exposure Audit',
    targetPage: 'risk-quantification' as PageId,
    content: (
      <div className="space-y-3">
        <div className="grid grid-cols-2 gap-3">
          <div className="p-3 bg-red-50 border border-red-200 rounded-lg">
            <div className="text-xs text-red-700 font-semibold">Total Financial Exposure</div>
            <div className="text-2xl font-bold font-mono text-red-900 mt-0.5">₹18.4 Cr</div>
            <div className="text-[11px] text-red-600 mt-0.5">Across 10 Tier-1 Banking Assets</div>
          </div>
          <div className="p-3 bg-amber-50 border border-amber-200 rounded-lg">
            <div className="text-xs text-amber-700 font-semibold">Expected Annual Loss (EAL)</div>
            <div className="text-2xl font-bold font-mono text-amber-900 mt-0.5">₹7.8 Cr</div>
            <div className="text-[11px] text-amber-600 mt-0.5">Annual Incident Prob: 42%</div>
          </div>
        </div>
        <p className="text-xs text-slate-600 leading-relaxed">
          Every rupee is derived through our transparent financial impact model: Downtime (₹2.5 Cr) + Data Breach (₹3.0 Cr) + Recovery (₹1.2 Cr) + Regulatory (₹0.8 Cr) + Disruption (₹1.5 Cr) + Reputation (₹0.7 Cr) = ₹9.7 Cr baseline event.
        </p>
      </div>
    )
  },
  {
    step: 3,
    title: 'Top Risk Driver Identification',
    subtitle: 'Uncovering the Highest Downstream Exposure',
    targetPage: 'risk-drivers' as PageId,
    content: (
      <div className="space-y-3">
        <div className="p-3 bg-slate-50 border border-slate-200 rounded-lg">
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold text-slate-900">#1 Driver: Privileged Accounts Without MFA</span>
            <span className="font-mono text-sm font-bold text-red-600">₹2.4 Cr Exposure</span>
          </div>
          <p className="text-xs text-slate-600 mt-1">
            29 domain and database administrative accounts lack hardware MFA, creating an unhindered escalation path into Tier-1 databases.
          </p>
        </div>
        <div className="p-3 bg-slate-50 border border-slate-200 rounded-lg">
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold text-slate-900">#2 Driver: Core Banking API Deserialization (CVE-2025-2144)</span>
            <span className="font-mono text-sm font-bold text-red-600">₹1.8 Cr Exposure</span>
          </div>
          <p className="text-xs text-slate-600 mt-1">
            CVSS 9.8 vulnerability with active weaponized exploit in the wild on public perimeter gateway.
          </p>
        </div>
      </div>
    )
  },
  {
    step: 4,
    title: 'Attack Path Visualization',
    subtitle: 'Tracing the Lateral Progression to Tier-1 Databases',
    targetPage: 'attack-paths' as PageId,
    content: (
      <div className="space-y-3">
        <div className="p-3 bg-slate-900 text-slate-100 rounded-lg text-xs font-mono leading-relaxed overflow-x-auto">
          Internet → Public Web API → CVE-2025-2144 → App Server → Privileged Account (No MFA) → Customer DB (₹14.5 Cr Impact)
        </div>
        <p className="text-xs text-slate-600 leading-relaxed">
          CYBERNEXUS AI maps dependencies across asset tiers. Severing any weak link in the chain disrupts the attacker's economics and shields the underlying critical database.
        </p>
      </div>
    )
  },
  {
    step: 5,
    title: 'Cyber Risk What-If Simulation',
    subtitle: 'Scenario 1: Enforce MFA for All Privileged Accounts',
    targetPage: 'scenarios' as PageId,
    content: (
      <div className="space-y-3">
        <div className="grid grid-cols-3 gap-2 text-center">
          <div className="p-2.5 bg-slate-50 border border-slate-200 rounded">
            <div className="text-[11px] text-slate-500">Current Exposure</div>
            <div className="font-mono font-bold text-slate-900 text-sm mt-0.5">₹18.4 Cr</div>
            <div className="text-[10px] text-slate-500">Prob: 42%</div>
          </div>
          <div className="p-2.5 bg-blue-50 border border-blue-200 rounded">
            <div className="text-[11px] text-blue-700">After Privileged MFA</div>
            <div className="font-mono font-bold text-blue-900 text-sm mt-0.5">₹15.2 Cr</div>
            <div className="text-[10px] text-blue-600">Prob: 31%</div>
          </div>
          <div className="p-2.5 bg-emerald-50 border border-emerald-200 rounded">
            <div className="text-[11px] text-emerald-700">Risk Reduction</div>
            <div className="font-mono font-bold text-emerald-800 text-sm mt-0.5">₹3.2 Cr</div>
            <div className="text-[10px] text-emerald-600 font-semibold">ROSI: 814%</div>
          </div>
        </div>
        <div className="text-xs text-slate-700 p-2.5 bg-slate-50 rounded border border-slate-200">
          <strong>Decision Insight:</strong> Enforcing MFA on 122 privileged administrators requires only <strong>₹35 Lakh</strong> but protects <strong>₹3.2 Crore</strong> of exposure immediately.
        </div>
      </div>
    )
  },
  {
    step: 6,
    title: '0/1 Knapsack Security Investment Optimization',
    subtitle: 'Solving "Where Should We Spend Our Next ₹1 Crore?"',
    targetPage: 'investment' as PageId,
    content: (
      <div className="space-y-3">
        <div className="p-3 bg-emerald-50 border border-emerald-200 rounded-lg">
          <div className="flex items-center justify-between text-xs font-bold text-emerald-900">
            <span>Optimal Portfolio under ₹1.00 Cr Budget:</span>
            <span className="font-mono text-sm text-emerald-700">3 Initiatives Selected</span>
          </div>
          <ul className="mt-2 space-y-1 text-xs text-emerald-800">
            <li>✓ <strong>Privileged MFA Enforcement</strong> (Cost: ₹35 L · Reduction: ₹1.5 Cr)</li>
            <li>✓ <strong>Critical Patch Remediation Program</strong> (Cost: ₹25 L · Reduction: ₹1.1 Cr)</li>
            <li>✓ <strong>Cloud Security Hardening & CSPM</strong> (Cost: ₹20 L · Reduction: ₹0.8 Cr)</li>
          </ul>
        </div>
        <div className="grid grid-cols-3 gap-2 text-center text-xs">
          <div className="p-2 bg-slate-50 border border-slate-200 rounded">
            <div className="text-slate-500">Total Investment</div>
            <div className="font-mono font-bold text-slate-900 mt-0.5">₹80 Lakh</div>
          </div>
          <div className="p-2 bg-slate-50 border border-slate-200 rounded">
            <div className="text-slate-500">Risk Reduction</div>
            <div className="font-mono font-bold text-emerald-700 mt-0.5">₹3.4 Cr</div>
          </div>
          <div className="p-2 bg-slate-50 border border-slate-200 rounded">
            <div className="text-slate-500">ROSI</div>
            <div className="font-mono font-bold text-blue-700 mt-0.5">325%</div>
          </div>
        </div>
        <div className="text-center text-xs font-semibold text-slate-800 bg-slate-100 p-2 rounded">
          ₹1.00 Invested → ₹4.25 Estimated Risk Value Protected
        </div>
      </div>
    )
  },
  {
    step: 7,
    title: 'Regulatory Compliance & Executive Sign-Off',
    subtitle: 'Dual Benefit: Measurable Risk Reduction + Regulatory Readiness',
    targetPage: 'compliance' as PageId,
    content: (
      <div className="space-y-3">
        <p className="text-xs text-slate-600 leading-relaxed">
          The same optimized ₹80 Lakh security deployment directly satisfies critical mandates across Reserve Bank of India (RBI CSF Sec 3.1) and SEBI CSCRF guidelines:
        </p>
        <div className="grid grid-cols-2 gap-2 text-xs">
          <div className="p-2 bg-slate-50 rounded border border-slate-200">
            <div className="font-semibold text-slate-800">RBI Cyber Security Framework</div>
            <div className="text-slate-500 mt-0.5">Readiness climbs: 84% → 94%</div>
          </div>
          <div className="p-2 bg-slate-50 rounded border border-slate-200">
            <div className="font-semibold text-slate-800">SEBI Cyber Resilience Framework</div>
            <div className="text-slate-500 mt-0.5">Readiness climbs: 80% → 91%</div>
          </div>
        </div>
        <div className="p-3 bg-blue-50 border border-blue-200 rounded-lg text-xs text-blue-900">
          <strong>Summary for SIH Judges:</strong> CYBERNEXUS AI transitions cybersecurity from an unquantified IT cost center into a financially optimized, mathematically defensible executive decision discipline.
        </div>
      </div>
    )
  }
];

export const ExecutiveDemoModal: React.FC<Props> = ({ isOpen, onClose, onNavigate }) => {
  const [currentStepIdx, setCurrentStepIdx] = useState(0);

  if (!isOpen) return null;

  const current = DEMO_STEPS[currentStepIdx];
  const isFirst = currentStepIdx === 0;
  const isLast = currentStepIdx === DEMO_STEPS.length - 1;

  const handleNext = () => {
    if (!isLast) {
      const nextIdx = currentStepIdx + 1;
      setCurrentStepIdx(nextIdx);
      onNavigate(DEMO_STEPS[nextIdx].targetPage);
    } else {
      try {
        confetti({ particleCount: 80, spread: 60, origin: { y: 0.6 } });
      } catch (e) {}
      onClose();
    }
  };

  const handlePrev = () => {
    if (!isFirst) {
      const prevIdx = currentStepIdx - 1;
      setCurrentStepIdx(prevIdx);
      onNavigate(DEMO_STEPS[prevIdx].targetPage);
    }
  };

  const handleJumpToLivePage = () => {
    onNavigate(current.targetPage);
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-950/60 backdrop-blur-xs p-4">
      <div className="bg-white rounded-xl shadow-2xl border border-slate-200 w-full max-w-xl overflow-hidden animate-in zoom-in-95 duration-150">
        <div className="px-6 py-4 border-b border-slate-200 bg-slate-900 text-white flex items-center justify-between">
          <div className="flex items-center gap-2.5">
            <div className="w-7 h-7 rounded bg-blue-600 flex items-center justify-center text-white">
              <Play className="w-3.5 h-3.5 fill-current" />
            </div>
            <div>
              <div className="text-xs uppercase tracking-wider text-blue-400 font-semibold">Smart India Hackathon Walkthrough</div>
              <h2 className="text-sm font-bold">Executive Decision Demo ({current.step} / {DEMO_STEPS.length})</h2>
            </div>
          </div>
          <button onClick={onClose} className="text-slate-400 hover:text-white transition-colors">
            <X className="w-5 h-5" />
          </button>
        </div>

        <div className="w-full bg-slate-100 h-1">
          <div
            className="bg-blue-600 h-1 transition-all duration-300"
            style={{ width: `${((currentStepIdx + 1) / DEMO_STEPS.length) * 100}%` }}
          />
        </div>

        <div className="p-6">
          <div className="mb-4">
            <h3 className="text-base font-bold text-slate-900">{current.title}</h3>
            <p className="text-xs text-slate-500 mt-0.5">{current.subtitle}</p>
          </div>

          <div className="min-h-[220px]">
            {current.content}
          </div>
        </div>

        <div className="px-6 py-3.5 bg-slate-50 border-t border-slate-200 flex items-center justify-between">
          <button
            onClick={handleJumpToLivePage}
            className="text-xs text-blue-600 hover:text-blue-800 font-medium hover:underline flex items-center gap-1"
          >
            <span>Jump directly to this module</span>
            <ChevronRight className="w-3.5 h-3.5" />
          </button>

          <div className="flex items-center gap-2">
            <button
              onClick={handlePrev}
              disabled={isFirst}
              className="px-3 py-1.5 text-xs text-slate-600 bg-white border border-slate-200 rounded disabled:opacity-40 hover:bg-slate-100 transition-colors flex items-center gap-1"
            >
              <ChevronLeft className="w-3.5 h-3.5" />
              <span>Back</span>
            </button>
            <button
              onClick={handleNext}
              className="px-4 py-1.5 text-xs font-medium text-white bg-blue-600 hover:bg-blue-700 rounded transition-colors flex items-center gap-1 shadow-xs"
            >
              <span>{isLast ? 'Complete Demo' : 'Next Step'}</span>
              <ChevronRight className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

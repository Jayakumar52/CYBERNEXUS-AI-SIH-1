import { INITIAL_ASSETS, INITIAL_RISK_DRIVERS, INITIAL_VULNERABILITIES } from '../data/seedData.js';
import { investmentOptimizer } from './investmentOptimizer.js';
import { scenarioEngine } from './scenarioEngine.js';

export interface AssistantResponse {
  query: string;
  intent: string;
  answer: string;
  keyMetrics: { label: string; value: string; sentiment?: 'neutral' | 'positive' | 'negative' }[];
  dataReferences: { type: string; title: string; linkPage: string }[];
  suggestedAction?: { label: string; targetPage: string };
  followUpQuestions: string[];
}

export class AssistantEngineService {
  public processQuery(rawQuery: string): AssistantResponse {
    const q = rawQuery.toLowerCase().trim();

    if (q.includes('highest financial') || q.includes('highest risk') || q.includes('top risk') || q.includes('biggest risk')) {
      const topDriver = INITIAL_RISK_DRIVERS[0];
      const topVuln = INITIAL_VULNERABILITIES[0];
      return {
        query: rawQuery,
        intent: 'TOP_FINANCIAL_RISK',
        answer: `Our highest individual financial cyber risk today is **${topDriver.title}**, contributing **₹${topDriver.financialExposureCr} Cr** to enterprise exposure. The primary catalyst is **${topVuln.cve}** (CVSS ${topVuln.cvss}, EPSS ${topVuln.epss}) on the **${topVuln.assetName}**, paired with **Privileged Accounts lacking MFA** (₹1.5 Cr downstream exposure).`,
        keyMetrics: [
          { label: 'Top Driver Exposure', value: `₹${topDriver.financialExposureCr} Cr`, sentiment: 'negative' },
          { label: 'Total Enterprise Exposure', value: '₹18.4 Cr', sentiment: 'neutral' },
          { label: 'Expected Annual Loss', value: '₹7.8 Cr', sentiment: 'neutral' }
        ],
        dataReferences: [
          { type: 'Risk Driver', title: topDriver.title, linkPage: 'risk-drivers' },
          { type: 'Vulnerability', title: `${topVuln.cve} on ${topVuln.assetName}`, linkPage: 'vulnerabilities' },
          { type: 'Asset', title: 'Core Banking API', linkPage: 'assets' }
        ],
        suggestedAction: { label: 'Inspect Risk Drivers', targetPage: 'risk-drivers' },
        followUpQuestions: [
          'What happens if we enable MFA for privileged users?',
          'Where should we spend ₹1 crore?',
          'Which vulnerabilities contribute most to expected losses?'
        ]
      };
    }

    if (q.includes('spend') || q.includes('budget') || q.includes('invest') || q.includes('1 crore') || q.includes('allocation')) {
      const opt = investmentOptimizer.optimizeInvestment(100);
      const names = opt.selectedActions.map(a => a.name).join(', ');
      return {
        query: rawQuery,
        intent: 'INVESTMENT_OPTIMIZATION',
        answer: `Under a **₹1 Crore** security budget, our 0/1 Knapsack Decision Engine recommends funding: **${names}**.\n\nThis deployment costs **₹${opt.totalCostLakh} Lakh (₹0.8 Cr)** and achieves **₹${opt.totalRiskReductionCrore} Cr** in estimated risk reduction, delivering a **${opt.rosiPercentage}% Return on Security Investment (ROSI)**. Every ₹1 invested protects **₹${opt.roiMultiplier}** in enterprise financial value.`,
        keyMetrics: [
          { label: 'Optimal Budget Spent', value: `₹${opt.totalCostLakh} L / ₹1 Cr`, sentiment: 'positive' },
          { label: 'Total Risk Reduction', value: `₹${opt.totalRiskReductionCrore} Cr`, sentiment: 'positive' },
          { label: 'ROSI', value: `${opt.rosiPercentage}%`, sentiment: 'positive' },
          { label: 'Rupee Multiplier', value: `₹1 → ₹${opt.roiMultiplier}`, sentiment: 'positive' }
        ],
        dataReferences: opt.selectedActions.map(a => ({
          type: 'Security Action',
          title: a.name,
          linkPage: 'investment'
        })),
        suggestedAction: { label: 'Open Investment Optimizer', targetPage: 'investment' },
        followUpQuestions: [
          'What is our highest financial cyber risk today?',
          'What happens if we enable MFA for privileged users?',
          'What happens if we delay remediation by 30 days?'
        ]
      };
    }

    if (q.includes('mfa') || q.includes('privileged') || q.includes('enable mfa')) {
      const sim = scenarioEngine.simulateScenario('scen-mfa');
      return {
        query: rawQuery,
        intent: 'SCENARIO_MFA_SIMULATION',
        answer: `Enforcing hardware-bound MFA across all privileged accounts drops enterprise financial exposure from **₹${sim.before.financialExposureCr} Cr** to **₹${sim.after.financialExposureCr} Cr**, generating an immediate **₹${sim.delta.riskReductionCr} Cr risk reduction**.\n\nAnnual incident likelihood falls from **${sim.before.incidentProbabilityPct}% to ${sim.after.incidentProbabilityPct}%**. At an implementation cost of only **₹35 Lakh**, this yields a phenomenal **${sim.rosiPct}% ROSI**.`,
        keyMetrics: [
          { label: 'Exposure Before', value: `₹${sim.before.financialExposureCr} Cr`, sentiment: 'neutral' },
          { label: 'Exposure After MFA', value: `₹${sim.after.financialExposureCr} Cr`, sentiment: 'positive' },
          { label: 'Immediate Reduction', value: `₹${sim.delta.riskReductionCr} Cr`, sentiment: 'positive' },
          { label: 'ROSI', value: `${sim.rosiPct}%`, sentiment: 'positive' }
        ],
        dataReferences: [
          { type: 'Scenario', title: 'Enable MFA for all privileged accounts', linkPage: 'scenarios' },
          { type: 'Control', title: 'Multi-Factor Authentication (Privileged & SSO)', linkPage: 'controls' },
          { type: 'Asset', title: 'Employee IAM & SSO Platform', linkPage: 'assets' }
        ],
        suggestedAction: { label: 'Run Scenario Simulator', targetPage: 'scenarios' },
        followUpQuestions: [
          'Where should we spend ₹1 crore?',
          'Which asset has the highest risk?',
          'What risk can be reduced by patching critical vulnerabilities?'
        ]
      };
    }

    if (q.includes('vulnerabilit') || q.includes('cve') || q.includes('patch')) {
      const topVulns = INITIAL_VULNERABILITIES.slice(0, 3);
      const totalVulnRisk = topVulns.reduce((sum, v) => sum + v.riskContributionCr, 0).toFixed(1);
      return {
        query: rawQuery,
        intent: 'VULNERABILITY_IMPACT',
        answer: `Our top 3 active vulnerabilities contribute **₹${totalVulnRisk} Cr** to overall expected loss:\n1. **${topVulns[0].cve}** on ${topVulns[0].assetName} (CVSS ${topVulns[0].cvss}, EPSS ${topVulns[0].epss}) → **₹${topVulns[0].riskContributionCr} Cr**\n2. **${topVulns[1].cve}** on ${topVulns[1].assetName} (CVSS ${topVulns[1].cvss}) → **₹${topVulns[1].riskContributionCr} Cr**\n3. **${topVulns[2].cve}** on ${topVulns[2].assetName} (CVSS ${topVulns[2].cvss}) → **₹${topVulns[2].riskContributionCr} Cr**\n\nDeploying an expedited 48-hour patching program for critical items reduces exposure by **₹2.7 Cr** for an investment of **₹25 Lakh**.`,
        keyMetrics: [
          { label: 'Top 3 Vuln Exposure', value: `₹${totalVulnRisk} Cr`, sentiment: 'negative' },
          { label: 'Open Critical CVEs', value: '2 Active in Wild', sentiment: 'negative' },
          { label: 'Patch Program Cost', value: '₹25 Lakh', sentiment: 'positive' }
        ],
        dataReferences: topVulns.map(v => ({
          type: 'Vulnerability',
          title: `${v.cve} (${v.assetName})`,
          linkPage: 'vulnerabilities'
        })),
        suggestedAction: { label: 'View Vulnerability Matrix', targetPage: 'vulnerabilities' },
        followUpQuestions: [
          'What happens if we enable MFA for privileged users?',
          'Where should we spend ₹1 crore?',
          'Which asset has the highest risk?'
        ]
      };
    }

    if (q.includes('asset') || q.includes('banking api') || q.includes('customer db') || q.includes('database')) {
      const topAsset = INITIAL_ASSETS[0];
      const dbAsset = INITIAL_ASSETS[1];
      return {
        query: rawQuery,
        intent: 'ASSET_RISK_PROFILE',
        answer: `The asset with the highest annual financial risk is **${topAsset.name}** at **₹${topAsset.financialExposureCr} Cr exposure** (Likelihood: ${topAsset.incidentLikelihoodPct}%, Max Impact: ₹${topAsset.financialImpactCr} Cr). Close behind is **${dbAsset.name}** with **₹${dbAsset.financialExposureCr} Cr exposure** and the highest single breach penalty liability (₹${dbAsset.financialImpactCr} Cr).`,
        keyMetrics: [
          { label: 'Core Banking API Risk', value: `₹${topAsset.financialExposureCr} Cr`, sentiment: 'negative' },
          { label: 'Customer DB Impact', value: `₹${dbAsset.financialImpactCr} Cr`, sentiment: 'negative' },
          { label: 'Asset Portfolio Size', value: '10 Mapped Tier-1 Assets', sentiment: 'neutral' }
        ],
        dataReferences: [
          { type: 'Asset', title: topAsset.name, linkPage: 'assets' },
          { type: 'Asset', title: dbAsset.name, linkPage: 'assets' },
          { type: 'Attack Path', title: 'Banking DMZ to Core Database Path', linkPage: 'attack-paths' }
        ],
        suggestedAction: { label: 'Explore Assets Directory', targetPage: 'assets' },
        followUpQuestions: [
          'What is our highest financial cyber risk today?',
          'What happens if we enable MFA for privileged users?',
          'Where should we spend ₹1 crore?'
        ]
      };
    }

    if (q.includes('compliance') || q.includes('rbi') || q.includes('sebi') || q.includes('nist') || q.includes('iso')) {
      return {
        query: rawQuery,
        intent: 'COMPLIANCE_STATUS',
        answer: `Our overall compliance readiness across regulated frameworks is **82%**:\n* **NIST CSF 2.0**: 86%\n* **RBI Cyber Security Framework**: 84%\n* **SEBI Cyber Resilience Framework**: 80%\n* **ISO/IEC 27001**: 81%\n* **CIS Controls v8**: 78%\n\nThe two most severe regulatory gaps flagged during continuous audit are **RBI Baseline 3.1** (29 admin accounts without hardware MFA) and **SEBI Section 7.3** (CVE-2025-2144 remediation lag).`,
        keyMetrics: [
          { label: 'Overall Readiness', value: '82%', sentiment: 'positive' },
          { label: 'RBI CSF Score', value: '84%', sentiment: 'positive' },
          { label: 'SEBI CSCRF Score', value: '80%', sentiment: 'positive' },
          { label: 'Critical Audit Gaps', value: '2 Active Findings', sentiment: 'negative' }
        ],
        dataReferences: [
          { type: 'Framework', title: 'RBI Cyber Security Framework', linkPage: 'compliance' },
          { type: 'Framework', title: 'SEBI CSCRF', linkPage: 'compliance' }
        ],
        suggestedAction: { label: 'Review Compliance Mapping', targetPage: 'compliance' },
        followUpQuestions: [
          'What happens if we enable MFA for privileged users?',
          'Where should we spend ₹1 crore?',
          'What is our highest financial cyber risk today?'
        ]
      };
    }

    return {
      query: rawQuery,
      intent: 'GENERAL_RISK_QUERY',
      answer: `CYBERNEXUS AI quantifies financial cyber exposure for **Nexa Financial Services** at **₹18.4 Cr** with an **Expected Annual Loss of ₹7.8 Cr**. Based on current security telemetry, the top strategic priorities are:\n1. **Privileged Account MFA** (Potential reduction: ₹1.5 Cr, ROSI: 329%)\n2. **Patching Core Banking API Deserialization Flaw** (Reduction: ₹1.4 Cr, ROSI: 460%)\n3. **Database Micro-Segmentation** (Reduction: ₹1.4 Cr, ROSI: 211%).`,
      keyMetrics: [
        { label: 'Financial Exposure', value: '₹18.4 Cr', sentiment: 'neutral' },
        { label: 'Expected Annual Loss', value: '₹7.8 Cr', sentiment: 'neutral' },
        { label: 'Risk Score', value: '78 / 100', sentiment: 'negative' },
        { label: 'Reduction Opportunity', value: '₹5.2 Cr', sentiment: 'positive' }
      ],
      dataReferences: [
        { type: 'Overview', title: 'Executive Cyber Risk Dashboard', linkPage: 'overview' },
        { type: 'Recommendations', title: 'Prioritized AI Recommendations', linkPage: 'recommendations' }
      ],
      suggestedAction: { label: 'Open Overview Dashboard', targetPage: 'overview' },
      followUpQuestions: [
        'What is our highest financial cyber risk today?',
        'Where should we spend ₹1 crore?',
        'What happens if we enable MFA for privileged users?'
      ]
    };
  }
}

export const assistantEngine = new AssistantEngineService();

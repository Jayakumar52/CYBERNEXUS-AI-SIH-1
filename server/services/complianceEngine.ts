import { COMPLIANCE_MAPPINGS, ComplianceControlMapping } from '../data/seedData.js';

export interface FrameworkScore {
  code: string;
  name: string;
  readinessPct: number;
  totalControls: number;
  compliantControls: number;
  partialControls: number;
  gapControls: number;
  description: string;
  regulatorOrBody: string;
}

export interface ComplianceSummary {
  overallReadinessPct: number;
  frameworkScores: FrameworkScore[];
  mappings: ComplianceControlMapping[];
  activeAuditGapsCount: number;
  criticalRegulatoryExposures: string[];
}

export class ComplianceEngineService {
  private frameworks: FrameworkScore[] = [
    {
      code: 'NIST-CSF',
      name: 'NIST Cybersecurity Framework 2.0',
      readinessPct: 86,
      totalControls: 108,
      compliantControls: 88,
      partialControls: 14,
      gapControls: 6,
      description: 'Global standard across Govern, Identify, Protect, Detect, Respond, and Recover tiers.',
      regulatorOrBody: 'NIST / U.S. Commerce'
    },
    {
      code: 'ISO-27001',
      name: 'ISO/IEC 27001:2022 (ISMS)',
      readinessPct: 81,
      totalControls: 93,
      compliantControls: 71,
      partialControls: 16,
      gapControls: 6,
      description: 'International Information Security Management Systems specifications across Annex A controls.',
      regulatorOrBody: 'International Organization for Standardization'
    },
    {
      code: 'CIS-V8',
      name: 'CIS Critical Security Controls v8',
      readinessPct: 78,
      totalControls: 153,
      compliantControls: 110,
      partialControls: 28,
      gapControls: 15,
      description: 'Prioritized set of actions to mitigate the most common cyber-attacks on systems and networks.',
      regulatorOrBody: 'Center for Internet Security'
    },
    {
      code: 'RBI-CSF',
      name: 'RBI Cyber Security Framework for Banks',
      readinessPct: 84,
      totalControls: 64,
      compliantControls: 51,
      partialControls: 9,
      gapControls: 4,
      description: 'Mandatory cybersecurity instructions for Scheduled Commercial Banks and Urban Co-op Banks.',
      regulatorOrBody: 'Reserve Bank of India (RBI)'
    },
    {
      code: 'SEBI-CSCRF',
      name: 'SEBI Cybersecurity & Cyber Resilience Framework',
      readinessPct: 80,
      totalControls: 78,
      compliantControls: 59,
      partialControls: 12,
      gapControls: 7,
      description: 'Cyber resilience and incident reporting mandates for regulated financial market intermediaries.',
      regulatorOrBody: 'Securities and Exchange Board of India (SEBI)'
    }
  ];

  public getSummary(): ComplianceSummary {
    const totalReady = Math.round(this.frameworks.reduce((sum, f) => sum + f.readinessPct, 0) / this.frameworks.length);
    const gaps = COMPLIANCE_MAPPINGS.filter(m => m.status === 'Gap Identified');

    return {
      overallReadinessPct: totalReady, // 82%
      frameworkScores: this.frameworks,
      mappings: COMPLIANCE_MAPPINGS,
      activeAuditGapsCount: gaps.length,
      criticalRegulatoryExposures: [
        'RBI Baseline Control 3.1: 29 privileged administration accounts non-compliant with hardware MFA mandate.',
        'SEBI Section 7.3: Critical vulnerability CVE-2025-2144 exceeds 48-hour patching remediation window.'
      ]
    };
  }

  public getMappings(): ComplianceControlMapping[] {
    return COMPLIANCE_MAPPINGS;
  }
}

export const complianceEngine = new ComplianceEngineService();

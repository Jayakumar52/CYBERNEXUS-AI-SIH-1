export interface AIRecommendation {
  id: string;
  title: string;
  category: 'Identity' | 'Vulnerability' | 'Network' | 'Endpoint' | 'Cloud';
  priority: 'CRITICAL' | 'HIGH' | 'MEDIUM';
  currentRiskCr: number;
  riskAfterControlCr: number;
  riskReductionCr: number;
  implementationCostLakh: number;
  implementationCostCr: number;
  rosiPct: number;
  affectedAsset: string;
  cveOrThreatRef?: string;
  reason: string;
  stepByStepEvidence: {
    telemetrySource: string;
    vulnerabilitySeverity: string;
    likelihoodCalculation: string;
    financialExposureImpact: string;
    mitigationValidation: string;
  };
}

export const RECOMMENDATIONS: AIRecommendation[] = [
  {
    id: 'rec-01',
    title: 'Enable MFA for all privileged accounts',
    category: 'Identity',
    priority: 'CRITICAL',
    currentRiskCr: 4.2,
    riskAfterControlCr: 2.7,
    riskReductionCr: 1.5,
    implementationCostLakh: 35,
    implementationCostCr: 0.35,
    rosiPct: 329,
    affectedAsset: 'Employee IAM & SSO Platform',
    cveOrThreatRef: 'CVE-2024-4577 & AD Privileged Accounts Audit',
    reason: 'Privileged accounts provide an unhindered high-impact attack path into Tier-1 banking databases. Enforcing FIDO2 hardware MFA neutralizes the credential compromise vector across 122 admin accounts.',
    stepByStepEvidence: {
      telemetrySource: 'Active Directory & Azure AD Audit Logs (29 privileged accounts currently lacking hardware MFA)',
      vulnerabilitySeverity: 'Critical (CVSS 9.1 session hijacking in authentication gateway)',
      likelihoodCalculation: 'Likelihood: 46% = (Vuln 82×0.30 + Threat 84×0.20 + Exposure 80×0.20 + Weakness 74×0.20 + Exploit 70×0.10)',
      financialExposureImpact: 'Asset business value: ₹40 Cr. Downstream Tier-1 DB compromise exposure: ₹14.5 Cr. Direct annual loss: ₹3.86 Cr.',
      mitigationValidation: 'Hardware FIDO2 MFA slashes credential reuse success rate by 99.2%, reducing expected loss by ₹1.5 Cr.'
    }
  },
  {
    id: 'rec-02',
    title: 'Patch Core Banking API remote code execution flaw',
    category: 'Vulnerability',
    priority: 'CRITICAL',
    currentRiskCr: 3.8,
    riskAfterControlCr: 2.4,
    riskReductionCr: 1.4,
    implementationCostLakh: 25,
    implementationCostCr: 0.25,
    rosiPct: 460,
    affectedAsset: 'Core Banking API',
    cveOrThreatRef: 'CVE-2025-2144 (CVSS 9.8, EPSS 0.81)',
    reason: 'CVE-2025-2144 has an active weaponized exploit in the wild and sits on an internet-facing API processing payment instructions. Immediate vendor hotfix closes unauthenticated deserialization.',
    stepByStepEvidence: {
      telemetrySource: 'Qualys VMDR scan confirmed open state for 16 days on public IP gateway.',
      vulnerabilitySeverity: 'Critical (CVSS 9.8, EPSS 0.81 - top 1% exploit likelihood in CISA KEV catalog).',
      likelihoodCalculation: 'Likelihood: 48% = (Vuln 98×0.30 + Threat 78×0.20 + Exposure 90×0.20 + Weakness 62×0.20 + Exploit 81×0.10)',
      financialExposureImpact: 'Banking transactions downtime cost: ₹2.5 Cr + breach notification: ₹3.0 Cr = ₹11.2 Cr max impact.',
      mitigationValidation: 'Vendor patch v4.8.2 deployment eliminates deserialization entry point completely.'
    }
  },
  {
    id: 'rec-03',
    title: 'Enforce zero-trust micro-segmentation to database subnet',
    category: 'Network',
    priority: 'HIGH',
    currentRiskCr: 3.5,
    riskAfterControlCr: 2.1,
    riskReductionCr: 1.4,
    implementationCostLakh: 45,
    implementationCostCr: 0.45,
    rosiPct: 211,
    affectedAsset: 'Customer Database (Tier-1 RDS)',
    cveOrThreatRef: 'DMZ-to-Internal Flat Routing Audit',
    reason: 'Direct network connectivity between DMZ web containers and core database allows lateral pivot if any perimeter service is breached. Micro-segmentation eliminates lateral reachability.',
    stepByStepEvidence: {
      telemetrySource: 'Splunk network flow logs detected uninspected port 1521/5432 ingress from staging and web DMZ.',
      vulnerabilitySeverity: 'High architectural defect (Absence of stateful Layer 7 proxy between DMZ and DB).',
      likelihoodCalculation: 'Likelihood: 34% with high downstream propagation index.',
      financialExposureImpact: 'Tier-1 database contains 4.2M customer financial records. Regulatory penalty exposure: ₹0.8 Cr.',
      mitigationValidation: 'Software-defined micro-segmentation restricts DB access exclusively to verified API gateway tokens.'
    }
  },
  {
    id: 'rec-04',
    title: 'Close 29% EDR telemetry coverage void on employee endpoints',
    category: 'Endpoint',
    priority: 'HIGH',
    currentRiskCr: 2.2,
    riskAfterControlCr: 1.4,
    riskReductionCr: 0.8,
    implementationCostLakh: 30,
    implementationCostCr: 0.30,
    rosiPct: 167,
    affectedAsset: 'Endpoint Fleet (5,000 Workstations)',
    cveOrThreatRef: 'CrowdStrike Falcon Fleet Audit (1,450 Unmonitored Nodes)',
    reason: 'Remote workers on legacy VPN without active EDR represent the top initial access vector for ransomware and phishing credentials.',
    stepByStepEvidence: {
      telemetrySource: 'CrowdStrike Falcon reporting 3,550 of 5,000 laptops active (1,450 sensor gaps).',
      vulnerabilitySeverity: 'Medium-High operational drift.',
      likelihoodCalculation: 'Likelihood: 39% endpoint compromise probability.',
      financialExposureImpact: 'Ransomware propagation recovery cost: ₹1.2 Cr + workstation reimaging: ₹0.44 Cr.',
      mitigationValidation: 'Automated GPO push and VPN NAC quarantine for unmonitored endpoints restores 100% sensor coverage.'
    }
  },
  {
    id: 'rec-05',
    title: 'Remediate over-permissive S3 bucket ACLs & enforce KMS encryption',
    category: 'Cloud',
    priority: 'MEDIUM',
    currentRiskCr: 1.9,
    riskAfterControlCr: 1.2,
    riskReductionCr: 0.7,
    implementationCostLakh: 20,
    implementationCostCr: 0.20,
    rosiPct: 250,
    affectedAsset: 'Cloud Storage (KYC Documents Vault)',
    cveOrThreatRef: 'Prisma Cloud CSPM Policy Alert #4810',
    reason: 'Legacy KYC archive bucket allows cross-account read policies. Auto-remediation enforces VPC-only private endpoints and customer-managed KMS keys.',
    stepByStepEvidence: {
      telemetrySource: 'Prisma Cloud CSPM continuous audit flag.',
      vulnerabilitySeverity: 'High misconfiguration severity.',
      likelihoodCalculation: 'Likelihood: 32% data leakage probability.',
      financialExposureImpact: 'PII document breach regulatory fines under RBI DPDP guidelines: ₹0.8 Cr.',
      mitigationValidation: 'Automated cloud policy remediation restores zero public egress in under 5 minutes.'
    }
  }
];

export class RecommendationEngineService {
  public getRecommendations(): AIRecommendation[] {
    return RECOMMENDATIONS;
  }
}

export const recommendationEngine = new RecommendationEngineService();

// Simulated Enterprise Telemetry and Asset Data for NEXA FINANCIAL SERVICES
export interface Asset {
  id: string;
  name: string;
  type: 'Application' | 'Database' | 'Identity' | 'Storage' | 'Server' | 'Endpoint' | 'Network';
  criticality: 'Critical' | 'High' | 'Medium' | 'Low';
  businessValueCr: number; // in ₹ Cr
  internetExposed: boolean;
  dataSensitivity: 'Tier 1 (PCI/PII)' | 'Tier 2 (Confidential)' | 'Tier 3 (Internal)' | 'Tier 4 (Public)';
  owner: string;
  dependencies: string[];
  vulnerabilitiesCount: number;
  criticalVulns: string[];
  controlsActive: string[];
  controlsDeficient: string[];
  incidentLikelihoodPct: number; // 0 - 100
  financialImpactCr: number; // in ₹ Cr
  expectedAnnualLossCr: number; // in ₹ Cr
  financialExposureCr: number; // in ₹ Cr
  riskScore: number; // 0 - 100
  threatActivityScore: number; // 0 - 100
  controlWeaknessScore: number; // 0 - 100
  exploitProbabilityScore: number; // 0 - 100
}

export interface Vulnerability {
  id: string;
  cve: string;
  assetId: string;
  assetName: string;
  cvss: number;
  epss: number;
  exploitStatus: 'Active in Wild' | 'PoC Available' | 'Weaponized' | 'No Known Exploit';
  assetCriticality: 'Critical' | 'High' | 'Medium' | 'Low';
  exposure: 'Internet-Facing' | 'Internal Network' | 'Restricted Zone';
  financialImpactCr: number;
  riskContributionCr: number;
  status: 'Open' | 'Remediation In Progress' | 'Mitigated';
  discoveredDate: string;
  remediationAction: string;
  description: string;
}

export interface Control {
  id: string;
  name: string;
  category: 'Identity' | 'Endpoint' | 'Network' | 'Vulnerability' | 'Data Protection' | 'Monitoring' | 'Cloud';
  effectivenessPct: number;
  coveragePct: number;
  failureRatePct: number;
  potentialRiskReductionCr: number;
  implementationCostLakh: number;
  status: 'Needs Enhancement' | 'Optimal' | 'Critical Gap';
  description: string;
  frameworkMappings: string[];
}

export interface RiskDriver {
  id: string;
  title: string;
  category: string;
  financialExposureCr: number;
  percentageContribution: number;
  affectedAssets: string[];
  severity: 'Critical' | 'High' | 'Medium';
  rootCause: string;
  recommendedMitigation: string;
}

export interface SecurityAction {
  id: string;
  name: string;
  category: string;
  costLakh: number; // Cost in ₹ Lakh
  costCr: number; // Cost in ₹ Cr
  riskReductionCr: number; // Reduction in ₹ Cr
  implementationDays: number;
  complexity: 'Low' | 'Medium' | 'High';
  targetRiskDriverId: string;
  targetAssets: string[];
  frameworkImpact: string[];
  rationale: string;
}

export interface ComplianceControlMapping {
  id: string;
  findingTitle: string;
  mappedControl: string;
  nistCsf: string;
  iso27001: string;
  cisControls: string;
  rbiFramework: string;
  sebiFramework: string;
  status: 'Gap Identified' | 'Partially Met' | 'Compliant';
  evidence: string;
  affectedAsset: string;
}

export const INITIAL_ASSETS: Asset[] = [
  {
    id: 'ast-01',
    name: 'Core Banking API',
    type: 'Application',
    criticality: 'Critical',
    businessValueCr: 85.0,
    internetExposed: true,
    dataSensitivity: 'Tier 1 (PCI/PII)',
    owner: 'Digital Banking Operations',
    dependencies: ['Customer Database', 'Employee IAM & SSO'],
    vulnerabilitiesCount: 3,
    criticalVulns: ['CVE-2025-2144'],
    controlsActive: ['WAF', 'TLS 1.3', 'Network IDS'],
    controlsDeficient: ['API Rate Limiting', 'Mutual TLS'],
    incidentLikelihoodPct: 48,
    financialImpactCr: 11.2,
    expectedAnnualLossCr: 5.38,
    financialExposureCr: 5.38,
    riskScore: 84,
    threatActivityScore: 78,
    controlWeaknessScore: 62,
    exploitProbabilityScore: 81
  },
  {
    id: 'ast-02',
    name: 'Customer Database (Tier-1 RDS)',
    type: 'Database',
    criticality: 'Critical',
    businessValueCr: 120.0,
    internetExposed: false,
    dataSensitivity: 'Tier 1 (PCI/PII)',
    owner: 'Data Infrastructure Team',
    dependencies: ['Cloud Storage S3 (KYC)'],
    vulnerabilitiesCount: 2,
    criticalVulns: ['CVE-2024-38812'],
    controlsActive: ['Static Data Masking', 'Daily Snapshots'],
    controlsDeficient: ['TDE Key Auto-Rotation', 'DB Activity Monitoring'],
    incidentLikelihoodPct: 34,
    financialImpactCr: 14.5,
    expectedAnnualLossCr: 4.93,
    financialExposureCr: 4.93,
    riskScore: 79,
    threatActivityScore: 65,
    controlWeaknessScore: 48,
    exploitProbabilityScore: 54
  },
  {
    id: 'ast-03',
    name: 'Payment Gateway Integration',
    type: 'Application',
    criticality: 'Critical',
    businessValueCr: 95.0,
    internetExposed: true,
    dataSensitivity: 'Tier 1 (PCI/PII)',
    owner: 'Payment Channels Eng',
    dependencies: ['Core Banking API'],
    vulnerabilitiesCount: 4,
    criticalVulns: ['CVE-2025-1089'],
    controlsActive: ['HSM Tokenization', 'Fraud Rules Engine'],
    controlsDeficient: ['Granular IAM Session Timeout'],
    incidentLikelihoodPct: 41,
    financialImpactCr: 9.8,
    expectedAnnualLossCr: 4.02,
    financialExposureCr: 4.02,
    riskScore: 76,
    threatActivityScore: 72,
    controlWeaknessScore: 55,
    exploitProbabilityScore: 68
  },
  {
    id: 'ast-04',
    name: 'Employee IAM & SSO Platform',
    type: 'Identity',
    criticality: 'High',
    businessValueCr: 40.0,
    internetExposed: true,
    dataSensitivity: 'Tier 2 (Confidential)',
    owner: 'Enterprise Identity & Access',
    dependencies: [],
    vulnerabilitiesCount: 2,
    criticalVulns: ['CVE-2024-4577'],
    controlsActive: ['SSO for Web Apps', 'Password Complexity Policy'],
    controlsDeficient: ['Privileged MFA Enforcement', 'PAM Session Recording'],
    incidentLikelihoodPct: 46,
    financialImpactCr: 8.4,
    expectedAnnualLossCr: 3.86,
    financialExposureCr: 3.86,
    riskScore: 82,
    threatActivityScore: 84,
    controlWeaknessScore: 74,
    exploitProbabilityScore: 70
  },
  {
    id: 'ast-05',
    name: 'SWIFT & Interbank Transfer Node',
    type: 'Application',
    criticality: 'Critical',
    businessValueCr: 110.0,
    internetExposed: false,
    dataSensitivity: 'Tier 1 (PCI/PII)',
    owner: 'Treasury Systems',
    dependencies: ['Core Banking API'],
    vulnerabilitiesCount: 1,
    criticalVulns: [],
    controlsActive: ['Dedicated Hardware Security Module', 'Dual Control Authorization'],
    controlsDeficient: ['Air-Gap Automated Validation'],
    incidentLikelihoodPct: 18,
    financialImpactCr: 16.0,
    expectedAnnualLossCr: 2.88,
    financialExposureCr: 2.88,
    riskScore: 58,
    threatActivityScore: 40,
    controlWeaknessScore: 28,
    exploitProbabilityScore: 22
  },
  {
    id: 'ast-06',
    name: 'Cloud Storage (KYC Documents Vault)',
    type: 'Storage',
    criticality: 'High',
    businessValueCr: 35.0,
    internetExposed: true,
    dataSensitivity: 'Tier 1 (PCI/PII)',
    owner: 'Compliance & Onboarding',
    dependencies: [],
    vulnerabilitiesCount: 3,
    criticalVulns: ['CVE-2024-21626'],
    controlsActive: ['Server-Side Encryption AES-256', 'Access Logging'],
    controlsDeficient: ['Strict S3 Bucket Policy', 'Data Loss Prevention (DLP)'],
    incidentLikelihoodPct: 32,
    financialImpactCr: 6.5,
    expectedAnnualLossCr: 2.08,
    financialExposureCr: 2.08,
    riskScore: 68,
    threatActivityScore: 52,
    controlWeaknessScore: 60,
    exploitProbabilityScore: 48
  },
  {
    id: 'ast-07',
    name: 'Endpoint Fleet (5,000 Workstations)',
    type: 'Endpoint',
    criticality: 'Medium',
    businessValueCr: 25.0,
    internetExposed: true,
    dataSensitivity: 'Tier 3 (Internal)',
    owner: 'End User Computing',
    dependencies: ['Employee IAM & SSO Platform'],
    vulnerabilitiesCount: 6,
    criticalVulns: ['CVE-2025-0120'],
    controlsActive: ['Antivirus Engine', 'USB Port Lockdown'],
    controlsDeficient: ['100% EDR Agent Coverage (Currently 71%)'],
    incidentLikelihoodPct: 39,
    financialImpactCr: 4.2,
    expectedAnnualLossCr: 1.64,
    financialExposureCr: 1.64,
    riskScore: 64,
    threatActivityScore: 66,
    controlWeaknessScore: 58,
    exploitProbabilityScore: 50
  },
  {
    id: 'ast-08',
    name: 'HR Portal & Internal Payroll',
    type: 'Application',
    criticality: 'Medium',
    businessValueCr: 18.0,
    internetExposed: false,
    dataSensitivity: 'Tier 2 (Confidential)',
    owner: 'Human Resources Ops',
    dependencies: ['Employee IAM & SSO Platform'],
    vulnerabilitiesCount: 2,
    criticalVulns: [],
    controlsActive: ['Role-Based Access Control', 'Daily Database Backup'],
    controlsDeficient: ['Static Code Analysis Audit'],
    incidentLikelihoodPct: 24,
    financialImpactCr: 2.8,
    expectedAnnualLossCr: 0.67,
    financialExposureCr: 0.67,
    riskScore: 48,
    threatActivityScore: 35,
    controlWeaknessScore: 42,
    exploitProbabilityScore: 30
  },
  {
    id: 'ast-09',
    name: 'Central SIEM & Log Aggregator',
    type: 'Server',
    criticality: 'High',
    businessValueCr: 30.0,
    internetExposed: false,
    dataSensitivity: 'Tier 2 (Confidential)',
    owner: 'Cyber Defense Center (SOC)',
    dependencies: [],
    vulnerabilitiesCount: 1,
    criticalVulns: [],
    controlsActive: ['Log Redundancy', '24/7 SOC Rotation'],
    controlsDeficient: ['Automated Threat Playbook Orchestration (SOAR)'],
    incidentLikelihoodPct: 15,
    financialImpactCr: 3.5,
    expectedAnnualLossCr: 0.52,
    financialExposureCr: 0.52,
    riskScore: 42,
    threatActivityScore: 30,
    controlWeaknessScore: 32,
    exploitProbabilityScore: 18
  },
  {
    id: 'ast-10',
    name: 'Development & Test VPC Cluster',
    type: 'Server',
    criticality: 'Low',
    businessValueCr: 8.0,
    internetExposed: true,
    dataSensitivity: 'Tier 4 (Public)',
    owner: 'Engineering Platform Team',
    dependencies: [],
    vulnerabilitiesCount: 5,
    criticalVulns: ['CVE-2024-2961'],
    controlsActive: ['Synthetic Test Data Isolation'],
    controlsDeficient: ['Dev Secrets Vault Management'],
    incidentLikelihoodPct: 28,
    financialImpactCr: 1.9,
    expectedAnnualLossCr: 0.53,
    financialExposureCr: 0.53,
    riskScore: 51,
    threatActivityScore: 45,
    controlWeaknessScore: 50,
    exploitProbabilityScore: 42
  }
];

export const INITIAL_VULNERABILITIES: Vulnerability[] = [
  {
    id: 'vuln-01',
    cve: 'CVE-2025-2144',
    assetId: 'ast-01',
    assetName: 'Core Banking API',
    cvss: 9.8,
    epss: 0.81,
    exploitStatus: 'Active in Wild',
    assetCriticality: 'Critical',
    exposure: 'Internet-Facing',
    financialImpactCr: 11.2,
    riskContributionCr: 2.4,
    status: 'Open',
    discoveredDate: '2026-09-14',
    remediationAction: 'Deploy vendor hotfix v4.8.2 and enforce header schema validation',
    description: 'Remote unauthenticated deserialization flaw allowing arbitrary code execution in API gateway handler.'
  },
  {
    id: 'vuln-02',
    cve: 'CVE-2024-4577',
    assetId: 'ast-04',
    assetName: 'Employee IAM & SSO Platform',
    cvss: 9.1,
    epss: 0.74,
    exploitStatus: 'Active in Wild',
    assetCriticality: 'High',
    exposure: 'Internet-Facing',
    financialImpactCr: 8.4,
    riskContributionCr: 1.8,
    status: 'Open',
    discoveredDate: '2026-09-18',
    remediationAction: 'Enforce hardware-bound FIDO2 MFA on administrative roles and update runtime',
    description: 'Authentication bypass and privileged account session hijacking vulnerability in identity gateway.'
  },
  {
    id: 'vuln-03',
    cve: 'CVE-2024-38812',
    assetId: 'ast-02',
    assetName: 'Customer Database (Tier-1 RDS)',
    cvss: 8.8,
    epss: 0.62,
    exploitStatus: 'PoC Available',
    assetCriticality: 'Critical',
    exposure: 'Internal Network',
    financialImpactCr: 14.5,
    riskContributionCr: 1.6,
    status: 'Remediation In Progress',
    discoveredDate: '2026-09-22',
    remediationAction: 'Isolate database subnet with strict micro-segmentation rules',
    description: 'Privilege escalation flaw in database engine internal query parser.'
  },
  {
    id: 'vuln-04',
    cve: 'CVE-2025-1089',
    assetId: 'ast-03',
    assetName: 'Payment Gateway Integration',
    cvss: 8.4,
    epss: 0.58,
    exploitStatus: 'PoC Available',
    assetCriticality: 'Critical',
    exposure: 'Internet-Facing',
    financialImpactCr: 9.8,
    riskContributionCr: 1.3,
    status: 'Open',
    discoveredDate: '2026-09-27',
    remediationAction: 'Patch webhook verification library and rotate shared signature secret',
    description: 'Cryptographic timing attack vulnerability on webhook request signature validation.'
  },
  {
    id: 'vuln-05',
    cve: 'CVE-2024-21626',
    assetId: 'ast-06',
    assetName: 'Cloud Storage (KYC Documents Vault)',
    cvss: 7.9,
    epss: 0.44,
    exploitStatus: 'PoC Available',
    assetCriticality: 'High',
    exposure: 'Internet-Facing',
    financialImpactCr: 6.5,
    riskContributionCr: 0.9,
    status: 'Open',
    discoveredDate: '2026-09-29',
    remediationAction: 'Restrict IAM bucket policy to VPC endpoints only; upgrade container runtime',
    description: 'Container breakout flaw allowing unauthorized host filesystem leak into storage bucket mounts.'
  },
  {
    id: 'vuln-06',
    cve: 'CVE-2025-0120',
    assetId: 'ast-07',
    assetName: 'Endpoint Fleet (5,000 Workstations)',
    cvss: 7.5,
    epss: 0.38,
    exploitStatus: 'Weaponized',
    assetCriticality: 'Medium',
    exposure: 'Internet-Facing',
    financialImpactCr: 4.2,
    riskContributionCr: 0.8,
    status: 'Open',
    discoveredDate: '2026-10-01',
    remediationAction: 'Push mass EDR update and enforce automated browser extension blacklisting',
    description: 'Memory corruption in Chromium browser renderer exploited in phishing campaigns.'
  }
];

export const INITIAL_CONTROLS: Control[] = [
  {
    id: 'ctrl-01',
    name: 'Multi-Factor Authentication (Privileged & SSO)',
    category: 'Identity',
    effectivenessPct: 62,
    coveragePct: 71,
    failureRatePct: 29,
    potentialRiskReductionCr: 1.5,
    implementationCostLakh: 35,
    status: 'Critical Gap',
    description: 'Enterprise MFA policy; current gap leaves 29% of privileged administration accounts on SMS/password-only.',
    frameworkMappings: ['NIST PR.AC-7', 'ISO 27001 A.9.4.2', 'CIS Control 6.5', 'RBI Sec 3.1', 'SEBI CS-4']
  },
  {
    id: 'ctrl-02',
    name: 'Critical Patch & Vulnerability Remediation Program',
    category: 'Vulnerability',
    effectivenessPct: 68,
    coveragePct: 74,
    failureRatePct: 26,
    potentialRiskReductionCr: 1.1,
    implementationCostLakh: 25,
    status: 'Needs Enhancement',
    description: 'SLA-driven automated patch deployment workflow across internet-exposed and mission-critical assets.',
    frameworkMappings: ['NIST PR.IP-12', 'ISO 27001 A.12.6.1', 'CIS Control 7.4', 'RBI Sec 4.2', 'SEBI CS-7']
  },
  {
    id: 'ctrl-03',
    name: 'Zero-Trust Network Micro-Segmentation',
    category: 'Network',
    effectivenessPct: 54,
    coveragePct: 60,
    failureRatePct: 40,
    potentialRiskReductionCr: 1.8,
    implementationCostLakh: 45,
    status: 'Critical Gap',
    description: 'Subnet isolation preventing lateral movement from perimeter web applications to Tier-1 database clusters.',
    frameworkMappings: ['NIST PR.AC-5', 'ISO 27001 A.13.1.3', 'CIS Control 12.2', 'RBI Sec 5.3', 'SEBI CS-9']
  },
  {
    id: 'ctrl-04',
    name: 'Endpoint Detection & Response (EDR) Fleet Expansion',
    category: 'Endpoint',
    effectivenessPct: 73,
    coveragePct: 71,
    failureRatePct: 29,
    potentialRiskReductionCr: 0.9,
    implementationCostLakh: 30,
    status: 'Needs Enhancement',
    description: 'EDR coverage across remaining 1,450 employee endpoints with automated heuristic behavioral isolation.',
    frameworkMappings: ['NIST DE.CM-4', 'ISO 27001 A.12.2.1', 'CIS Control 10.1', 'RBI Sec 6.1', 'SEBI CS-11']
  },
  {
    id: 'ctrl-05',
    name: 'Cloud Security Posture Management & Hardening (CSPM)',
    category: 'Cloud',
    effectivenessPct: 65,
    coveragePct: 68,
    failureRatePct: 32,
    potentialRiskReductionCr: 0.8,
    implementationCostLakh: 20,
    status: 'Needs Enhancement',
    description: 'Automated remediation of open S3 storage buckets, over-permissive IAM roles, and VPC peering gaps.',
    frameworkMappings: ['NIST PR.IP-1', 'ISO 27001 A.14.2.8', 'CIS Control 3.3', 'RBI Sec 8.4', 'SEBI CS-14']
  },
  {
    id: 'ctrl-06',
    name: 'Immutable Ransomware Backup & Rapid Recovery',
    category: 'Data Protection',
    effectivenessPct: 81,
    coveragePct: 85,
    failureRatePct: 15,
    potentialRiskReductionCr: 0.6,
    implementationCostLakh: 18,
    status: 'Optimal',
    description: 'WORM-compliant air-gapped database snapshot replication with 2-hour RTO/RPO target.',
    frameworkMappings: ['NIST RC.RP-1', 'ISO 27001 A.12.3.1', 'CIS Control 11.2', 'RBI Sec 9.2', 'SEBI CS-18']
  },
  {
    id: 'ctrl-07',
    name: 'Privileged Access Management (PAM) Vaulting',
    category: 'Identity',
    effectivenessPct: 70,
    coveragePct: 65,
    failureRatePct: 35,
    potentialRiskReductionCr: 0.7,
    implementationCostLakh: 22,
    status: 'Needs Enhancement',
    description: 'Just-in-time credential checkout and keystroke recording for all database and infrastructure administrators.',
    frameworkMappings: ['NIST PR.AC-4', 'ISO 27001 A.9.2.3', 'CIS Control 5.4', 'RBI Sec 3.4', 'SEBI CS-5']
  }
];

export const INITIAL_RISK_DRIVERS: RiskDriver[] = [
  {
    id: 'rd-01',
    title: 'Internet-facing payment and banking APIs',
    category: 'Perimeter Exposure',
    financialExposureCr: 2.4,
    percentageContribution: 31,
    affectedAssets: ['Core Banking API', 'Payment Gateway Integration'],
    severity: 'Critical',
    rootCause: 'Publicly exposed endpoints lacking mTLS and granular rate-limiting protections.',
    recommendedMitigation: 'Implement mutual TLS, WAF API inspection, and strict schema validation.'
  },
  {
    id: 'rd-02',
    title: 'Unpatched critical deserialization vulnerabilities',
    category: 'Vulnerability Management',
    financialExposureCr: 1.8,
    percentageContribution: 23,
    affectedAssets: ['Core Banking API', 'Employee IAM & SSO Platform'],
    severity: 'Critical',
    rootCause: 'Delays in maintenance windows causing 14+ day lag in deploying vendor security patches.',
    recommendedMitigation: 'Accelerate critical patch rollout cycle to under 48 hours for CVSS >= 9.0.'
  },
  {
    id: 'rd-03',
    title: 'Privileged administrative accounts lacking MFA',
    category: 'Identity & Access',
    financialExposureCr: 1.5,
    percentageContribution: 19,
    affectedAssets: ['Employee IAM & SSO Platform', 'Customer Database (Tier-1 RDS)'],
    severity: 'Critical',
    rootCause: 'Legacy admin consoles and system service accounts exempt from FIDO2/MFA policies.',
    recommendedMitigation: 'Mandate hardware-bound MFA tokens on all elevated domain and database accounts.'
  },
  {
    id: 'rd-04',
    title: 'Weak endpoint controls across distributed workforce',
    category: 'Endpoint Security',
    financialExposureCr: 0.9,
    percentageContribution: 12,
    affectedAssets: ['Endpoint Fleet (5,000 Workstations)'],
    severity: 'High',
    rootCause: '29% of remote workstations missing active EDR telemetry and automated isolation triggers.',
    recommendedMitigation: 'Push automated EDR deployment script and enforce NAC health checks on VPN.'
  },
  {
    id: 'rd-05',
    title: 'Cloud storage and IAM misconfiguration',
    category: 'Cloud Posture',
    financialExposureCr: 0.7,
    percentageContribution: 9,
    affectedAssets: ['Cloud Storage (KYC Documents Vault)', 'Development & Test VPC Cluster'],
    severity: 'Medium',
    rootCause: 'Over-broad IAM role trust policies and absence of automated CSPM remediation.',
    recommendedMitigation: 'Deploy CSPM with auto-remediation policies and restrict bucket access to VPC.'
  },
  {
    id: 'rd-06',
    title: 'Lateral movement paths between perimeter and database tier',
    category: 'Network Architecture',
    financialExposureCr: 0.5,
    percentageContribution: 6,
    affectedAssets: ['Core Banking API', 'Customer Database (Tier-1 RDS)'],
    severity: 'Medium',
    rootCause: 'Flat internal network segments permitting direct database port traversal from DMZ.',
    recommendedMitigation: 'Deploy software-defined micro-segmentation and strict port egress policies.'
  }
];

export const SECURITY_ACTIONS: SecurityAction[] = [
  {
    id: 'act-01',
    name: 'Privileged Account MFA Enforcement',
    category: 'Identity Security',
    costLakh: 35,
    costCr: 0.35,
    riskReductionCr: 1.5,
    implementationDays: 14,
    complexity: 'Medium',
    targetRiskDriverId: 'rd-03',
    targetAssets: ['Employee IAM & SSO Platform', 'Core Banking API'],
    frameworkImpact: ['NIST CSF PR.AC-7 (+6%)', 'ISO 27001 A.9.4 (+5%)', 'RBI CSF Sec 3.1 (+7%)'],
    rationale: 'Hardware-backed MFA eliminates single-factor compromise on all privileged infrastructure and domain accounts.'
  },
  {
    id: 'act-02',
    name: 'Critical Patch Acceleration Program',
    category: 'Vulnerability Remediation',
    costLakh: 25,
    costCr: 0.25,
    riskReductionCr: 1.1,
    implementationDays: 10,
    complexity: 'Low',
    targetRiskDriverId: 'rd-02',
    targetAssets: ['Core Banking API', 'Customer Database (Tier-1 RDS)'],
    frameworkImpact: ['NIST CSF PR.IP-12 (+5%)', 'CIS Control 7.4 (+6%)', 'SEBI CS-7 (+6%)'],
    rationale: 'Automated patch pipeline cuts median time to remediate (MTTR) for high CVSS vulnerabilities from 21 days to 36 hours.'
  },
  {
    id: 'act-03',
    name: 'Zero-Trust Network Micro-Segmentation',
    category: 'Network Defense',
    costLakh: 45,
    costCr: 0.45,
    riskReductionCr: 1.8,
    implementationDays: 45,
    complexity: 'High',
    targetRiskDriverId: 'rd-06',
    targetAssets: ['Core Banking API', 'Customer Database (Tier-1 RDS)', 'Payment Gateway Integration'],
    frameworkImpact: ['NIST CSF PR.AC-5 (+8%)', 'ISO 27001 A.13.1 (+7%)', 'RBI CSF Sec 5.3 (+9%)'],
    rationale: 'Severing the direct DMZ-to-database network paths neutralizes lateral propagation during perimeter compromises.'
  },
  {
    id: 'act-04',
    name: 'EDR Fleet Expansion & 100% Agent Enrolment',
    category: 'Endpoint Security',
    costLakh: 30,
    costCr: 0.30,
    riskReductionCr: 0.9,
    implementationDays: 21,
    complexity: 'Medium',
    targetRiskDriverId: 'rd-04',
    targetAssets: ['Endpoint Fleet (5,000 Workstations)'],
    frameworkImpact: ['NIST CSF DE.CM-4 (+5%)', 'CIS Control 10.1 (+7%)', 'SEBI CS-11 (+5%)'],
    rationale: 'Closing the 29% endpoint telemetry void terminates ransomware execution staging on corporate endpoints.'
  },
  {
    id: 'act-05',
    name: 'Cloud Security Hardening & Automated CSPM',
    category: 'Cloud Posture',
    costLakh: 20,
    costCr: 0.20,
    riskReductionCr: 0.8,
    implementationDays: 14,
    complexity: 'Low',
    targetRiskDriverId: 'rd-05',
    targetAssets: ['Cloud Storage (KYC Documents Vault)', 'Development & Test VPC Cluster'],
    frameworkImpact: ['NIST CSF PR.IP-1 (+4%)', 'ISO 27001 A.14.2 (+4%)', 'RBI CSF Sec 8.4 (+5%)'],
    rationale: 'Real-time policy guardrails instantly revoke accidental public bucket exposures and wild IAM role grants.'
  },
  {
    id: 'act-06',
    name: 'Air-Gapped Immutable Backup System',
    category: 'Business Continuity',
    costLakh: 18,
    costCr: 0.18,
    riskReductionCr: 0.6,
    implementationDays: 30,
    complexity: 'Medium',
    targetRiskDriverId: 'rd-01',
    targetAssets: ['Customer Database (Tier-1 RDS)', 'Core Banking API'],
    frameworkImpact: ['NIST CSF RC.RP-1 (+6%)', 'ISO 27001 A.12.3 (+5%)', 'RBI CSF Sec 9.2 (+6%)'],
    rationale: 'Cryptographically sealed off-site snapshot mirrors prevent extortion leverage by guaranteeing rapid bare-metal restore.'
  },
  {
    id: 'act-07',
    name: 'Privileged Session PAM Vaulting & Keystroke Audit',
    category: 'Identity Security',
    costLakh: 22,
    costCr: 0.22,
    riskReductionCr: 0.7,
    implementationDays: 28,
    complexity: 'Medium',
    targetRiskDriverId: 'rd-03',
    targetAssets: ['Customer Database (Tier-1 RDS)', 'Employee IAM & SSO Platform'],
    frameworkImpact: ['NIST CSF PR.AC-4 (+5%)', 'ISO 27001 A.9.2 (+4%)', 'SEBI CS-5 (+6%)'],
    rationale: 'Ephemeral credentials and session logging stop credential harvesting by insider threats and compromised admins.'
  }
];

export const COMPLIANCE_MAPPINGS: ComplianceControlMapping[] = [
  {
    id: 'cmp-01',
    findingTitle: 'Privileged administration accounts lacking MFA enforcement',
    mappedControl: 'Identity & Access Management (FIDO2 Hardware Key Enrolment)',
    nistCsf: 'PR.AC-7 (Users, devices, and other assets are authenticated)',
    iso27001: 'A.9.4.2 (Secure log-on procedures)',
    cisControls: 'Control 6.5 (Require MFA for Administrative Access)',
    rbiFramework: 'Baseline Control 3.1 (Multi-factor authentication for admin access)',
    sebiFramework: 'Section 4.1 (Access Control & Privileged User Identification)',
    status: 'Gap Identified',
    evidence: 'Active Directory audit log shows 29 service & admin accounts with password-only authentication.',
    affectedAsset: 'Employee IAM & SSO Platform'
  },
  {
    id: 'cmp-02',
    findingTitle: 'Unpatched critical remote code execution vulnerability (CVSS 9.8)',
    mappedControl: 'Vulnerability Management & Patch Governance',
    nistCsf: 'PR.IP-12 (Vulnerability management plan is developed and implemented)',
    iso27001: 'A.12.6.1 (Management of technical vulnerabilities)',
    cisControls: 'Control 7.4 (Perform Automated Application Patch Management)',
    rbiFramework: 'Baseline Control 4.2 (Timely patching of critical vulnerabilities within 48h)',
    sebiFramework: 'Section 7.3 (Vulnerability Assessment & Remediation Cycle)',
    status: 'Gap Identified',
    evidence: 'Qualys scan confirmed open CVE-2025-2144 on production Core Banking ingress gateway for 16 days.',
    affectedAsset: 'Core Banking API'
  },
  {
    id: 'cmp-03',
    findingTitle: 'Direct unrestricted ingress network routes to database tier',
    mappedControl: 'Network Micro-Segmentation & Boundary Defense',
    nistCsf: 'PR.AC-5 (Network integrity is protected, network separation implemented)',
    iso27001: 'A.13.1.3 (Segregation in networks)',
    cisControls: 'Control 12.2 (Separate Enterprise Networks)',
    rbiFramework: 'Baseline Control 5.3 (Demarcation of DMZ, Application, and DB zones)',
    sebiFramework: 'Section 9.2 (Network Segmentation & Traffic Filtering)',
    status: 'Partially Met',
    evidence: 'Network routing tables allow application container subnet to access database ports without inspection.',
    affectedAsset: 'Customer Database (Tier-1 RDS)'
  },
  {
    id: 'cmp-04',
    findingTitle: 'Endpoint telemetry gap on remote employee workstations (29% unmonitored)',
    mappedControl: 'Continuous Endpoint Monitoring & Threat Detection',
    nistCsf: 'DE.CM-4 (Malicious code is detected)',
    iso27001: 'A.12.2.1 (Controls against malware)',
    cisControls: 'Control 10.1 (Deploy Automated Anti-Malware Software)',
    rbiFramework: 'Baseline Control 6.1 (Continuous endpoint detection and logging)',
    sebiFramework: 'Section 11.4 (Threat Hunting & Host Telemetry Validation)',
    status: 'Partially Met',
    evidence: 'CrowdStrike console confirms only 3,550 of 5,000 active laptop inventory running current sensor.',
    affectedAsset: 'Endpoint Fleet (5,000 Workstations)'
  },
  {
    id: 'cmp-05',
    findingTitle: 'Public read accessibility risks on KYC cloud storage buckets',
    mappedControl: 'Cloud Security Posture Management & Object ACLs',
    nistCsf: 'PR.IP-1 (Baseline configuration of information systems created)',
    iso27001: 'A.14.2.8 (System security testing)',
    cisControls: 'Control 3.3 (Configure Data Access Control Lists)',
    rbiFramework: 'Baseline Control 8.4 (Cloud customer data residency & access isolation)',
    sebiFramework: 'Section 14.1 (Cloud Governance & Encryption Key Isolation)',
    status: 'Partially Met',
    evidence: 'Prisma Cloud scan flagged wildcard policy `s3:GetObject` on legacy KYC archive bucket.',
    affectedAsset: 'Cloud Storage (KYC Documents Vault)'
  },
  {
    id: 'cmp-06',
    findingTitle: 'Database transaction backup immutable WORM compliance',
    mappedControl: 'Data Protection & Disaster Recovery Verification',
    nistCsf: 'RC.RP-1 (Recovery plan is executed during or after an incident)',
    iso27001: 'A.12.3.1 (Information backup)',
    cisControls: 'Control 11.2 (Perform Automated Backups)',
    rbiFramework: 'Baseline Control 9.2 (Offsite air-gapped immutable backup restoration drills)',
    sebiFramework: 'Section 18.2 (Cyber Resilience & Disaster Recovery Mandates)',
    status: 'Compliant',
    evidence: 'Quarterly restoration drill validated 90-minute restore for core ledger from WORM storage vault.',
    affectedAsset: 'SWIFT & Interbank Transfer Node'
  }
];

export const TELEMETRY_SOURCES = [
  {
    id: 'src-01',
    name: 'Vulnerability Management (Qualys VMDR)',
    type: 'Vulnerability Scanner',
    status: 'Connected',
    health: 'Optimal',
    lastSync: '4 minutes ago',
    ingestedRecords: '14,820 assets / 184 CVEs',
    coveragePct: 98
  },
  {
    id: 'src-02',
    name: 'SIEM & SOC Telemetry (Splunk Enterprise)',
    type: 'Log & Event Analyzer',
    status: 'Connected',
    health: 'Optimal',
    lastSync: 'Just now',
    ingestedRecords: '28.4M events/day',
    coveragePct: 95
  },
  {
    id: 'src-03',
    name: 'Identity & Access (Azure AD / Okta SSO)',
    type: 'IAM Telemetry',
    status: 'Connected',
    health: 'Optimal',
    lastSync: '2 minutes ago',
    ingestedRecords: '5,840 identities / 122 admin accounts',
    coveragePct: 99
  },
  {
    id: 'src-04',
    name: 'Endpoint Security (CrowdStrike Falcon)',
    type: 'EDR Agent Fleet',
    status: 'Connected',
    health: 'Degraded',
    lastSync: '8 minutes ago',
    ingestedRecords: '3,550 active sensors / 5,000 inventory',
    coveragePct: 71
  },
  {
    id: 'src-05',
    name: 'Cloud Security Posture (Wiz & Prisma)',
    type: 'CSPM / CNAPP',
    status: 'Connected',
    health: 'Optimal',
    lastSync: '12 minutes ago',
    ingestedRecords: '42 cloud accounts / 618 storage buckets',
    coveragePct: 92
  },
  {
    id: 'src-06',
    name: 'Asset Inventory & CMDB (ServiceNow)',
    type: 'Asset Registry',
    status: 'Connected',
    health: 'Optimal',
    lastSync: '15 minutes ago',
    ingestedRecords: '1,420 mapped configuration items',
    coveragePct: 100
  },
  {
    id: 'src-07',
    name: 'Threat Intelligence (Mandiant & AlienVault OTX)',
    type: 'Threat Intel Feed',
    status: 'Connected',
    health: 'Optimal',
    lastSync: '1 minute ago',
    ingestedRecords: '420 active threat campaigns tracked',
    coveragePct: 100
  }
];

export const HISTORICAL_EXPOSURE_TREND = [
  { month: 'Apr 2026', financialExposureCr: 21.8, expectedAnnualLossCr: 9.4, enterpriseRiskScore: 84 },
  { month: 'May 2026', financialExposureCr: 22.4, expectedAnnualLossCr: 9.8, enterpriseRiskScore: 86 },
  { month: 'Jun 2026', financialExposureCr: 20.6, expectedAnnualLossCr: 8.9, enterpriseRiskScore: 82 },
  { month: 'Jul 2026', financialExposureCr: 19.8, expectedAnnualLossCr: 8.4, enterpriseRiskScore: 80 },
  { month: 'Aug 2026', financialExposureCr: 19.1, expectedAnnualLossCr: 8.1, enterpriseRiskScore: 79 },
  { month: 'Sep 2026', financialExposureCr: 18.7, expectedAnnualLossCr: 7.9, enterpriseRiskScore: 78 },
  { month: 'Oct 2026 (Live)', financialExposureCr: 18.4, expectedAnnualLossCr: 7.8, enterpriseRiskScore: 78 }
];

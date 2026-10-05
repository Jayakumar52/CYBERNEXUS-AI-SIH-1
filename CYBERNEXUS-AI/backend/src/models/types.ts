export interface Asset {
  id: string;
  name: string;
  type: 'Application' | 'Database' | 'Identity' | 'Storage' | 'Server' | 'Endpoint' | 'Network';
  criticality: 'Critical' | 'High' | 'Medium' | 'Low';
  criticalityScore: number; // 1 - 5
  owner: string;
  ipOrEndpoint: string;
  financialValueCr: number; // Asset intrinsic business value in Crore INR
  dailyRevenueCr: number; // Direct daily transactional revenue dependance in Crore INR
  piiRecordsCount: number; // Number of sensitive customer records
  exposure: 'Internet-Facing' | 'Internal-DMZ' | 'Internal-Isolated';
  activeVulnerabilities: number;
}

export interface Vulnerability {
  id: string;
  cveId: string;
  title: string;
  severity: 'CRITICAL' | 'HIGH' | 'MEDIUM' | 'LOW';
  cvssScore: number;
  epssScore: number; // 0.0 - 1.0 Exploit Prediction Scoring System
  exploitAvailable: boolean;
  affectedAssetId: string;
  affectedAssetName: string;
  assetCriticality: 'Critical' | 'High' | 'Medium' | 'Low';
  discoverySource: string;
  status: 'Open' | 'Remediating' | 'Mitigated';
  discoveryDate: string;
}

export interface Control {
  id: string;
  name: string;
  category: 'Identity & Access' | 'Vulnerability & Patch' | 'Network Defense' | 'Endpoint & EDR' | 'Cloud & Governance';
  effectivenessPct: number; // 0 - 100%
  status: 'Healthy' | 'Degraded' | 'Missing';
  coveragePct: number;
  costLakh: number;
  riskReductionCr: number;
  frameworkRef: string;
}

export interface RiskDriver {
  id: string;
  title: string;
  category: 'Identity Gaps' | 'Critical CVEs' | 'Cloud Misconfiguration' | 'Detection Gaps' | 'Access Creep' | 'Supply Chain';
  financialExposureCr: number;
  percentageContribution: number;
  affectedAsset: string;
  likelihoodPct: number;
  rootCauseTelemetry: string;
  recommendedMitigation: string;
  mitigationCostLakh: number;
}

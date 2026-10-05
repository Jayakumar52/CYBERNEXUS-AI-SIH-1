export type PageId =
  | 'overview'
  | 'risk-quantification'
  | 'risk-drivers'
  | 'attack-paths'
  | 'assets'
  | 'vulnerabilities'
  | 'controls'
  | 'recommendations'
  | 'scenarios'
  | 'investment'
  | 'compliance'
  | 'reports'
  | 'sources';

export interface EnterpriseMetrics {
  enterpriseRiskScore: number;
  totalFinancialExposureCr: number;
  expectedAnnualLossCr: number;
  riskReductionOpportunityCr: number;
  currentSecurityInvestmentCr: number;
  currentRosiPct: number;
  overallIncidentProbabilityPct: number;
  cyberVaR95Cr: number;
  activeAssetsCount: number;
  openCriticalVulnsCount: number;
  unmitigatedRiskDriversCount: number;
  lastTelemetryTimestamp: string;
}

export interface FinancialBreakdown {
  downtimeCostCr: number;
  dataBreachCostCr: number;
  recoveryCostCr: number;
  regulatoryImpactCr: number;
  businessDisruptionCr: number;
  reputationImpactCr: number;
  totalFinancialImpactCr: number;
}

export interface Asset {
  id: string;
  name: string;
  type: 'Application' | 'Database' | 'Identity' | 'Storage' | 'Server' | 'Endpoint' | 'Network';
  criticality: 'Critical' | 'High' | 'Medium' | 'Low';
  businessValueCr: number;
  internetExposed: boolean;
  dataSensitivity: string;
  owner: string;
  dependencies: string[];
  vulnerabilitiesCount: number;
  criticalVulns: string[];
  controlsActive: string[];
  controlsDeficient: string[];
  incidentLikelihoodPct: number;
  financialImpactCr: number;
  expectedAnnualLossCr: number;
  financialExposureCr: number;
  riskScore: number;
  threatActivityScore: number;
  controlWeaknessScore: number;
  exploitProbabilityScore: number;
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
  category: string;
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
  costLakh: number;
  costCr: number;
  riskReductionCr: number;
  implementationDays: number;
  complexity: 'Low' | 'Medium' | 'High';
  targetRiskDriverId: string;
  targetAssets: string[];
  frameworkImpact: string[];
  rationale: string;
}

export interface AIRecommendation {
  id: string;
  title: string;
  category: string;
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

export interface ScenarioPreset {
  id: string;
  title: string;
  description: string;
  category: string;
  costLakh: number;
  exposureReductionCr: number;
  probabilityDeltaPct: number;
  riskScoreDelta: number;
  implementationWeeks: number;
  isNegativeScenario?: boolean;
}

export interface ScenarioSimulationResult {
  scenarioId: string;
  scenarioTitle: string;
  before: {
    financialExposureCr: number;
    expectedAnnualLossCr: number;
    incidentProbabilityPct: number;
    enterpriseRiskScore: number;
  };
  after: {
    financialExposureCr: number;
    expectedAnnualLossCr: number;
    incidentProbabilityPct: number;
    enterpriseRiskScore: number;
  };
  delta: {
    exposureDeltaCr: number;
    riskReductionCr: number;
    probabilityDeltaPct: number;
    riskScoreDelta: number;
  };
  investmentCostLakh: number;
  investmentCostCr: number;
  rosiPct: number;
  explanation: string;
}

export interface OptimizationResult {
  budgetLakh: number;
  budgetCrore: number;
  totalCostLakh: number;
  totalCostCrore: number;
  totalRiskReductionCrore: number;
  rosiPercentage: number;
  roiMultiplier: number;
  selectedActions: SecurityAction[];
  unselectedActions: SecurityAction[];
  methodology: string;
  rationale: string;
}

export interface InvestmentCurvePoint {
  investmentLakh: number;
  investmentCrore: number;
  riskReductionCrore: number;
  residualExposureCrore: number;
  rosiPct: number;
  isOptimalPoint?: boolean;
}

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

export interface TelemetrySource {
  id: string;
  name: string;
  type: string;
  status: string;
  health: string;
  lastSync: string;
  ingestedRecords: string;
  coveragePct: number;
}

export interface AssistantResponse {
  query: string;
  intent: string;
  answer: string;
  keyMetrics: { label: string; value: string; sentiment?: 'neutral' | 'positive' | 'negative' }[];
  dataReferences: { type: string; title: string; linkPage: string }[];
  suggestedAction?: { label: string; targetPage: string };
  followUpQuestions: string[];
}

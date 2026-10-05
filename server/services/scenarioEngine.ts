export interface ScenarioPreset {
  id: string;
  title: string;
  description: string;
  category: string;
  costLakh: number;
  exposureReductionCr: number; // positive = risk reduction, negative = risk increase
  probabilityDeltaPct: number; // negative = probability drops
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

export const SCENARIO_PRESETS: ScenarioPreset[] = [
  {
    id: 'scen-mfa',
    title: 'Enable MFA for all privileged accounts',
    description: 'Enforce hardware-bound FIDO2 multi-factor authentication across all domain, cloud, and database administration accounts.',
    category: 'Identity Security',
    costLakh: 35,
    exposureReductionCr: 3.2,
    probabilityDeltaPct: -11, // drops from 42% to 31%
    riskScoreDelta: -14,
    implementationWeeks: 2
  },
  {
    id: 'scen-patch',
    title: 'Patch all critical vulnerabilities (CVSS >= 9.0)',
    description: 'Accelerate deployment of verified hotfixes across Core Banking API and IAM gateways to resolve CVE-2025-2144 and CVE-2024-4577.',
    category: 'Vulnerability Management',
    costLakh: 25,
    exposureReductionCr: 2.7,
    probabilityDeltaPct: -9,
    riskScoreDelta: -12,
    implementationWeeks: 1.5
  },
  {
    id: 'scen-segmentation',
    title: 'Deploy zero-trust network segmentation',
    category: 'Network Architecture',
    description: 'Enforce micro-segmentation firewalls between the internet DMZ, internal application cluster, and Tier-1 database tier.',
    costLakh: 45,
    exposureReductionCr: 2.9,
    probabilityDeltaPct: -8,
    riskScoreDelta: -11,
    implementationWeeks: 6
  },
  {
    id: 'scen-edr',
    title: 'Increase EDR coverage to 100% of endpoint fleet',
    category: 'Endpoint Security',
    description: 'Deploy CrowdStrike Falcon sensor to the remaining 1,450 employee endpoints and enforce quarantine on unmonitored devices.',
    costLakh: 30,
    exposureReductionCr: 1.6,
    probabilityDeltaPct: -5,
    riskScoreDelta: -7,
    implementationWeeks: 3
  },
  {
    id: 'scen-cloud',
    title: 'Improve cloud security posture & auto-remediation',
    category: 'Cloud Governance',
    description: 'Enable automated CSPM guardrails to close open storage bucket permissions and enforce least-privilege IAM roles.',
    costLakh: 20,
    exposureReductionCr: 1.4,
    probabilityDeltaPct: -4,
    riskScoreDelta: -6,
    implementationWeeks: 2
  },
  {
    id: 'scen-delay',
    title: 'Delay remediation program by 30 days',
    category: 'Business Risk Inaction',
    description: 'Postpone currently planned patching and credential security maintenance to the next fiscal quarter.',
    costLakh: 0,
    exposureReductionCr: -3.8, // Exposure INCREASES by ₹3.8 Cr!
    probabilityDeltaPct: +16, // Probability jumps to 58%!
    riskScoreDelta: +11,
    implementationWeeks: 0,
    isNegativeScenario: true
  }
];

export class ScenarioEngineService {
  private baseExposureCr = 18.4;
  private baseProbabilityPct = 42;
  private baseRiskScore = 78;
  private baseEalCr = 7.8;

  public getScenarios(): ScenarioPreset[] {
    return SCENARIO_PRESETS;
  }

  public simulateScenario(scenarioId: string, customMultiplier: number = 1.0): ScenarioSimulationResult {
    const scenario = SCENARIO_PRESETS.find(s => s.id === scenarioId) || SCENARIO_PRESETS[0];

    const isNegative = scenario.isNegativeScenario ?? false;
    let exposureDelta = scenario.exposureReductionCr * customMultiplier;
    let probDelta = scenario.probabilityDeltaPct * customMultiplier;
    let scoreDelta = scenario.riskScoreDelta * customMultiplier;

    let afterExposure: number;
    let afterProb: number;
    let afterScore: number;

    if (isNegative) {
      afterExposure = Number((this.baseExposureCr + Math.abs(exposureDelta)).toFixed(2));
      afterProb = Math.min(95, this.baseProbabilityPct + Math.abs(probDelta));
      afterScore = Math.min(99, this.baseRiskScore + Math.abs(scoreDelta));
    } else {
      afterExposure = Number(Math.max(6.0, this.baseExposureCr - exposureDelta).toFixed(2));
      afterProb = Math.max(10, this.baseProbabilityPct + probDelta);
      afterScore = Math.max(20, this.baseRiskScore + scoreDelta);
    }

    const afterEal = Number(((afterProb / 100) * (afterExposure * 0.95)).toFixed(2));
    const riskReduction = Number((this.baseExposureCr - afterExposure).toFixed(2));
    const costCr = Number((scenario.costLakh / 100).toFixed(2));

    const rosi = !isNegative && costCr > 0
      ? Math.round(((riskReduction - costCr) / costCr) * 100)
      : 0;

    let explanation = '';
    if (isNegative) {
      explanation = `Warning: Inaction causes threat actors time to operationalize zero-day exploits. Estimated financial exposure escalates by ₹${Math.abs(exposureDelta).toFixed(2)} Cr and incident probability surges to ${afterProb}%.`;
    } else if (scenario.id === 'scen-mfa') {
      explanation = `Implementing hardware-backed MFA across privileged accounts dismantles the primary administrative attack path into Tier-1 databases, slashing financial exposure by ₹${riskReduction} Cr (from ₹${this.baseExposureCr} Cr to ₹${afterExposure} Cr) with an exceptional ROSI of ${rosi}%.`;
    } else {
      explanation = `Deploying ${scenario.title} reduces enterprise financial exposure by ₹${riskReduction} Cr while cutting annual incident probability from ${this.baseProbabilityPct}% to ${afterProb}%.`;
    }

    return {
      scenarioId: scenario.id,
      scenarioTitle: scenario.title,
      before: {
        financialExposureCr: this.baseExposureCr,
        expectedAnnualLossCr: this.baseEalCr,
        incidentProbabilityPct: this.baseProbabilityPct,
        enterpriseRiskScore: this.baseRiskScore
      },
      after: {
        financialExposureCr: afterExposure,
        expectedAnnualLossCr: afterEal,
        incidentProbabilityPct: afterProb,
        enterpriseRiskScore: afterScore
      },
      delta: {
        exposureDeltaCr: Number((afterExposure - this.baseExposureCr).toFixed(2)),
        riskReductionCr: riskReduction,
        probabilityDeltaPct: afterProb - this.baseProbabilityPct,
        riskScoreDelta: afterScore - this.baseRiskScore
      },
      investmentCostLakh: scenario.costLakh,
      investmentCostCr: costCr,
      rosiPct: rosi,
      explanation
    };
  }
}

export const scenarioEngine = new ScenarioEngineService();

import {
  EnterpriseMetrics,
  FinancialBreakdown,
  Asset,
  Vulnerability,
  Control,
  RiskDriver,
  AIRecommendation,
  ScenarioPreset,
  ScenarioSimulationResult,
  OptimizationResult,
  InvestmentCurvePoint,
  ComplianceControlMapping,
  FrameworkScore,
  TelemetrySource,
  AssistantResponse,
  SecurityAction
} from '../types/index.js';

import {
  INITIAL_ASSETS,
  INITIAL_CONTROLS,
  INITIAL_RISK_DRIVERS,
  INITIAL_VULNERABILITIES,
  TELEMETRY_SOURCES,
  HISTORICAL_EXPOSURE_TREND,
  COMPLIANCE_MAPPINGS,
  SECURITY_ACTIONS
} from '../../../backend/src/data/seedData.js';

import { SCENARIO_PRESETS } from '../../../backend/src/services/scenarioEngine.js';
import { RECOMMENDATIONS } from '../../../backend/src/services/recommendationEngine.js';

class ApiService {
  private baseUrl = '/api';

  public async getDashboard(): Promise<{
    metrics: EnterpriseMetrics;
    financialBreakdown: FinancialBreakdown;
    lossDistribution: any[];
    historicalTrend: any[];
    topRiskDrivers: RiskDriver[];
    recentVulnerabilities: Vulnerability[];
    enterpriseName: string;
    mode: string;
  }> {
    try {
      const res = await fetch(`${this.baseUrl}/dashboard`);
      if (res.ok) return await res.json();
    } catch (e) {
      console.warn('API fetch fallback to local store for dashboard', e);
    }

    return {
      metrics: {
        enterpriseRiskScore: 78,
        totalFinancialExposureCr: 18.4,
        expectedAnnualLossCr: 7.8,
        riskReductionOpportunityCr: 5.2,
        currentSecurityInvestmentCr: 2.0,
        currentRosiPct: 260,
        overallIncidentProbabilityPct: 42,
        cyberVaR95Cr: 12.6,
        activeAssetsCount: INITIAL_ASSETS.length,
        openCriticalVulnsCount: INITIAL_VULNERABILITIES.filter(v => v.status === 'Open' && v.cvss >= 9.0).length,
        unmitigatedRiskDriversCount: INITIAL_RISK_DRIVERS.length,
        lastTelemetryTimestamp: new Date().toISOString()
      },
      financialBreakdown: {
        downtimeCostCr: 2.5,
        dataBreachCostCr: 3.0,
        recoveryCostCr: 1.2,
        regulatoryImpactCr: 0.8,
        businessDisruptionCr: 1.5,
        reputationImpactCr: 0.7,
        totalFinancialImpactCr: 9.7
      },
      lossDistribution: [
        { exceedanceProbPct: 90, estimatedLossCr: 7.0 },
        { exceedanceProbPct: 50, estimatedLossCr: 15.1 },
        { exceedanceProbPct: 5, estimatedLossCr: 32.4 }
      ],
      historicalTrend: HISTORICAL_EXPOSURE_TREND,
      topRiskDrivers: INITIAL_RISK_DRIVERS.slice(0, 5),
      recentVulnerabilities: INITIAL_VULNERABILITIES.slice(0, 4),
      enterpriseName: 'NEXA FINANCIAL SERVICES',
      mode: 'PROTOTYPE_SIMULATED_ENTERPRISE'
    };
  }

  public async getAssets(): Promise<Asset[]> {
    try {
      const res = await fetch(`${this.baseUrl}/assets`);
      if (res.ok) {
        const data = await res.json();
        return data.assets;
      }
    } catch (e) {
      console.warn('API fallback for assets', e);
    }
    return INITIAL_ASSETS;
  }

  public async getVulnerabilities(): Promise<Vulnerability[]> {
    try {
      const res = await fetch(`${this.baseUrl}/vulnerabilities`);
      if (res.ok) {
        const data = await res.json();
        return data.vulnerabilities;
      }
    } catch (e) {
      console.warn('API fallback for vulnerabilities', e);
    }
    return INITIAL_VULNERABILITIES;
  }

  public async getRiskDrivers(): Promise<RiskDriver[]> {
    try {
      const res = await fetch(`${this.baseUrl}/risk-drivers`);
      if (res.ok) {
        const data = await res.json();
        return data.riskDrivers;
      }
    } catch (e) {
      console.warn('API fallback for risk-drivers', e);
    }
    return INITIAL_RISK_DRIVERS;
  }

  public async getControls(): Promise<Control[]> {
    try {
      const res = await fetch(`${this.baseUrl}/controls`);
      if (res.ok) {
        const data = await res.json();
        return data.controls;
      }
    } catch (e) {
      console.warn('API fallback for controls', e);
    }
    return INITIAL_CONTROLS;
  }

  public async getRecommendations(): Promise<AIRecommendation[]> {
    try {
      const res = await fetch(`${this.baseUrl}/recommendations`);
      if (res.ok) {
        const data = await res.json();
        return data.recommendations;
      }
    } catch (e) {
      console.warn('API fallback for recommendations', e);
    }
    return RECOMMENDATIONS;
  }

  public async getScenarios(): Promise<ScenarioPreset[]> {
    try {
      const res = await fetch(`${this.baseUrl}/scenarios`);
      if (res.ok) {
        const data = await res.json();
        return data.scenarios;
      }
    } catch (e) {
      console.warn('API fallback for scenarios', e);
    }
    return SCENARIO_PRESETS;
  }

  public async simulateScenario(scenarioId: string, customMultiplier: number = 1.0): Promise<ScenarioSimulationResult> {
    try {
      const res = await fetch(`${this.baseUrl}/scenarios/simulate`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ scenarioId, customMultiplier })
      });
      if (res.ok) return await res.json();
    } catch (e) {
      console.warn('API fallback for simulateScenario', e);
    }

    const scen = SCENARIO_PRESETS.find(s => s.id === scenarioId) || SCENARIO_PRESETS[0];
    const isNegative = scen.isNegativeScenario ?? false;
    const baseExp = 18.4;
    const baseProb = 42;
    const afterExp = isNegative ? 22.2 : Number((baseExp - scen.exposureReductionCr).toFixed(2));
    const afterProb = isNegative ? 58 : baseProb + scen.probabilityDeltaPct;
    const reduction = isNegative ? 0 : scen.exposureReductionCr;
    const costCr = scen.costLakh / 100;
    const rosi = !isNegative && costCr > 0 ? Math.round(((reduction - costCr) / costCr) * 100) : 0;

    return {
      scenarioId: scen.id,
      scenarioTitle: scen.title,
      before: {
        financialExposureCr: baseExp,
        expectedAnnualLossCr: 7.8,
        incidentProbabilityPct: baseProb,
        enterpriseRiskScore: 78
      },
      after: {
        financialExposureCr: afterExp,
        expectedAnnualLossCr: Number(((afterProb / 100) * afterExp).toFixed(2)),
        incidentProbabilityPct: afterProb,
        enterpriseRiskScore: 78 + scen.riskScoreDelta
      },
      delta: {
        exposureDeltaCr: Number((afterExp - baseExp).toFixed(2)),
        riskReductionCr: reduction,
        probabilityDeltaPct: scen.probabilityDeltaPct,
        riskScoreDelta: scen.riskScoreDelta
      },
      investmentCostLakh: scen.costLakh,
      investmentCostCr: costCr,
      rosiPct: rosi,
      explanation: `Simulation completed for ${scen.title}.`
    };
  }

  public async optimizeInvestment(budgetLakh: number): Promise<{
    result: OptimizationResult;
    investmentCurve: InvestmentCurvePoint[];
    allActions: SecurityAction[];
  }> {
    try {
      const res = await fetch(`${this.baseUrl}/investment/optimize`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ budgetLakh })
      });
      if (res.ok) return await res.json();
    } catch (e) {
      console.warn('API fallback for optimizeInvestment', e);
    }

    const actions = SECURITY_ACTIONS;
    const budget = Math.max(10, Math.floor(budgetLakh));
    const n = actions.length;
    const costs = actions.map(a => Math.round(a.costLakh));
    const values = actions.map(a => Math.round(a.riskReductionCr * 1000));
    const dp: number[][] = Array.from({ length: n + 1 }, () => Array(budget + 1).fill(0));

    for (let i = 1; i <= n; i++) {
      for (let w = 0; w <= budget; w++) {
        if (costs[i - 1] <= w) {
          dp[i][w] = Math.max(dp[i - 1][w], dp[i - 1][w - costs[i - 1]] + values[i - 1]);
        } else {
          dp[i][w] = dp[i - 1][w];
        }
      }
    }

    let w = budget;
    const selectedIndices: number[] = [];
    for (let i = n; i > 0; i--) {
      if (dp[i][w] !== dp[i - 1][w]) {
        selectedIndices.push(i - 1);
        w -= costs[i - 1];
      }
    }

    const selectedActions = selectedIndices.reverse().map(idx => actions[idx]);
    const selectedIdSet = new Set(selectedActions.map(a => a.id));
    const unselectedActions = actions.filter(a => !selectedIdSet.has(a.id));
    const totalCostLakh = selectedActions.reduce((s, a) => s + a.costLakh, 0);
    const totalCostCr = Number((totalCostLakh / 100).toFixed(2));
    const totalRedCr = Number(selectedActions.reduce((s, a) => s + a.riskReductionCr, 0).toFixed(2));
    const rosi = totalCostCr > 0 ? Math.round(((totalRedCr - totalCostCr) / totalCostCr) * 100) : 0;
    const multiplier = totalCostCr > 0 ? Number((totalRedCr / totalCostCr).toFixed(2)) : 0;

    const curve: InvestmentCurvePoint[] = [
      { investmentLakh: 0, investmentCrore: 0, riskReductionCrore: 0, residualExposureCrore: 18.4, rosiPct: 0 },
      { investmentLakh: 35, investmentCrore: 0.35, riskReductionCrore: 1.5, residualExposureCrore: 16.9, rosiPct: 329 },
      { investmentLakh: 60, investmentCrore: 0.60, riskReductionCrore: 2.6, residualExposureCrore: 15.8, rosiPct: 333 },
      { investmentLakh: 80, investmentCrore: 0.80, riskReductionCrore: 3.4, residualExposureCrore: 15.0, rosiPct: 325, isOptimalPoint: true },
      { investmentLakh: 100, investmentCrore: 1.00, riskReductionCrore: 3.4, residualExposureCrore: 15.0, rosiPct: 240, isOptimalPoint: true },
      { investmentLakh: 150, investmentCrore: 1.50, riskReductionCrore: 5.2, residualExposureCrore: 13.2, rosiPct: 247 },
      { investmentLakh: 200, investmentCrore: 2.00, riskReductionCrore: 6.7, residualExposureCrore: 11.7, rosiPct: 235 }
    ];

    return {
      result: {
        budgetLakh,
        budgetCrore: Number((budgetLakh / 100).toFixed(2)),
        totalCostLakh,
        totalCostCrore: totalCostCr,
        totalRiskReductionCrore: totalRedCr,
        rosiPercentage: rosi,
        roiMultiplier: multiplier,
        selectedActions,
        unselectedActions,
        methodology: '0/1 Knapsack Dynamic Programming & ROSI Maximization',
        rationale: `Selected ${selectedActions.length} security initiatives to optimize risk reduction under budget limit.`
      },
      investmentCurve: curve,
      allActions: actions
    };
  }

  public async getCompliance(): Promise<{
    overallReadinessPct: number;
    frameworkScores: FrameworkScore[];
    mappings: ComplianceControlMapping[];
    activeAuditGapsCount: number;
    criticalRegulatoryExposures: string[];
  }> {
    try {
      const res = await fetch(`${this.baseUrl}/compliance`);
      if (res.ok) return await res.json();
    } catch (e) {
      console.warn('API fallback for compliance', e);
    }

    return {
      overallReadinessPct: 82,
      frameworkScores: [
        { code: 'NIST-CSF', name: 'NIST Cybersecurity Framework 2.0', readinessPct: 86, totalControls: 108, compliantControls: 88, partialControls: 14, gapControls: 6, description: 'Standard framework', regulatorOrBody: 'NIST' },
        { code: 'ISO-27001', name: 'ISO/IEC 27001:2022', readinessPct: 81, totalControls: 93, compliantControls: 71, partialControls: 16, gapControls: 6, description: 'ISMS specifications', regulatorOrBody: 'ISO' },
        { code: 'CIS-V8', name: 'CIS Critical Security Controls v8', readinessPct: 78, totalControls: 153, compliantControls: 110, partialControls: 28, gapControls: 15, description: 'Prioritized security actions', regulatorOrBody: 'CIS' },
        { code: 'RBI-CSF', name: 'RBI Cyber Security Framework', readinessPct: 84, totalControls: 64, compliantControls: 51, partialControls: 9, gapControls: 4, description: 'Mandatory banking cyber guidelines', regulatorOrBody: 'RBI' },
        { code: 'SEBI-CSCRF', name: 'SEBI Cyber Resilience Framework', readinessPct: 80, totalControls: 78, compliantControls: 59, partialControls: 12, gapControls: 7, description: 'Market resilience instructions', regulatorOrBody: 'SEBI' }
      ],
      mappings: COMPLIANCE_MAPPINGS,
      activeAuditGapsCount: 2,
      criticalRegulatoryExposures: [
        'RBI Baseline Control 3.1: Privileged accounts lacking hardware MFA',
        'SEBI Section 7.3: Vulnerability patch latency'
      ]
    };
  }

  public async getSources(): Promise<TelemetrySource[]> {
    try {
      const res = await fetch(`${this.baseUrl}/sources`);
      if (res.ok) {
        const data = await res.json();
        return data.sources;
      }
    } catch (e) {
      console.warn('API fallback for sources', e);
    }
    return TELEMETRY_SOURCES;
  }

  public async refreshTelemetry(): Promise<{ message: string; refreshedAt: string; deltaExposureCr: number; updatedMetrics?: EnterpriseMetrics }> {
    try {
      const res = await fetch(`${this.baseUrl}/telemetry/refresh`, { method: 'POST' });
      if (res.ok) return await res.json();
    } catch (e) {
      console.warn('API fallback for refreshTelemetry', e);
    }
    return {
      message: 'Continuous telemetry streams successfully normalized from 7 connected sources.',
      refreshedAt: new Date().toLocaleTimeString(),
      deltaExposureCr: 0.02
    };
  }

  public async queryAssistant(query: string): Promise<AssistantResponse> {
    try {
      const res = await fetch(`${this.baseUrl}/assistant/query`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ query })
      });
      if (res.ok) return await res.json();
    } catch (e) {
      console.warn('API fallback for queryAssistant', e);
    }

    return {
      query,
      intent: 'GENERAL_RISK_QUERY',
      answer: `CYBERNEXUS AI quantifies financial cyber exposure for Nexa Financial Services at ₹18.4 Cr with an Expected Annual Loss of ₹7.8 Cr.`,
      keyMetrics: [
        { label: 'Financial Exposure', value: '₹18.4 Cr' },
        { label: 'Expected Annual Loss', value: '₹7.8 Cr' }
      ],
      dataReferences: [{ type: 'Overview', title: 'Dashboard', linkPage: 'overview' }],
      followUpQuestions: [
        'What is our highest financial cyber risk today?',
        'Where should we spend ₹1 crore?',
        'What happens if we enable MFA for privileged users?'
      ]
    };
  }

  public async getReportData(): Promise<any> {
    try {
      const res = await fetch(`${this.baseUrl}/reports`);
      if (res.ok) return await res.json();
    } catch (e) {
      console.warn('API fallback for getReportData', e);
    }
    return {
      reportTitle: 'Executive Cyber Risk Quantification & Investment Portfolio Audit',
      organization: 'NEXA FINANCIAL SERVICES',
      industry: 'Financial Services & Digital Banking',
      reportDate: new Date().toLocaleDateString('en-IN', { year: 'numeric', month: 'long', day: 'numeric' }),
      version: 'Q4-2026-FINAL',
      classification: 'CONFIDENTIAL // BOARD OF DIRECTORS'
    };
  }
}

export const api = new ApiService();

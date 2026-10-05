import { Router, Request, Response } from 'express';
import {
  INITIAL_CONTROLS,
  INITIAL_RISK_DRIVERS,
  INITIAL_VULNERABILITIES,
  TELEMETRY_SOURCES,
  HISTORICAL_EXPOSURE_TREND,
  INITIAL_ASSETS
} from '../data/seedData.js';
import { riskEngine } from '../services/riskEngine.js';
import { financialModel } from '../services/financialModel.js';
import { investmentOptimizer } from '../services/investmentOptimizer.js';
import { recommendationEngine } from '../services/recommendationEngine.js';
import { scenarioEngine } from '../services/scenarioEngine.js';
import { complianceEngine } from '../services/complianceEngine.js';
import { assistantEngine } from '../services/assistantEngine.js';

export const apiRouter = Router();

apiRouter.get('/dashboard', (req: Request, res: Response) => {
  const metrics = riskEngine.getEnterpriseMetrics();
  const financialBreakdown = financialModel.getEnterpriseBaselineBreakdown();
  const lossDistribution = financialModel.getLossExceedanceDistribution(metrics.totalFinancialExposureCr);
  const topDrivers = INITIAL_RISK_DRIVERS.slice(0, 5);
  const recentVulns = INITIAL_VULNERABILITIES.slice(0, 4);

  res.json({
    metrics,
    financialBreakdown,
    lossDistribution,
    historicalTrend: HISTORICAL_EXPOSURE_TREND,
    topRiskDrivers: topDrivers,
    recentVulnerabilities: recentVulns,
    enterpriseName: 'NEXA FINANCIAL SERVICES',
    mode: 'PROTOTYPE_SIMULATED_ENTERPRISE'
  });
});

apiRouter.get('/assets', (req: Request, res: Response) => {
  const assets = riskEngine.getAssets();
  res.json({
    assets,
    totalCount: assets.length,
    criticalCount: assets.filter(a => a.criticality === 'Critical').length,
    internetExposedCount: assets.filter(a => a.internetExposed).length
  });
});

apiRouter.get('/vulnerabilities', (req: Request, res: Response) => {
  res.json({
    vulnerabilities: INITIAL_VULNERABILITIES,
    totalCount: INITIAL_VULNERABILITIES.length,
    activeExploitsCount: INITIAL_VULNERABILITIES.filter(v => v.exploitStatus === 'Active in Wild').length
  });
});

apiRouter.get('/risks', (req: Request, res: Response) => {
  const metrics = riskEngine.getEnterpriseMetrics();
  const baselineImpact = financialModel.getEnterpriseBaselineBreakdown();
  const var90 = financialModel.calculateCyberVaR(metrics.expectedAnnualLossCr, 90);
  const var95 = financialModel.calculateCyberVaR(metrics.expectedAnnualLossCr, 95);
  const var99 = financialModel.calculateCyberVaR(metrics.expectedAnnualLossCr, 99);

  res.json({
    metrics,
    baselineImpact,
    cyberVaR: { var90, var95, var99 },
    lossExceedanceCurve: financialModel.getLossExceedanceDistribution(metrics.totalFinancialExposureCr)
  });
});

apiRouter.get('/risk-drivers', (req: Request, res: Response) => {
  res.json({
    riskDrivers: INITIAL_RISK_DRIVERS,
    totalExposureCr: INITIAL_RISK_DRIVERS.reduce((sum, d) => sum + d.financialExposureCr, 0)
  });
});

apiRouter.get('/controls', (req: Request, res: Response) => {
  res.json({
    controls: INITIAL_CONTROLS,
    averageEffectivenessPct: Math.round(INITIAL_CONTROLS.reduce((sum, c) => sum + c.effectivenessPct, 0) / INITIAL_CONTROLS.length),
    totalPotentialReductionCr: Number(INITIAL_CONTROLS.reduce((sum, c) => sum + c.potentialRiskReductionCr, 0).toFixed(2))
  });
});

apiRouter.get('/recommendations', (req: Request, res: Response) => {
  const recommendations = recommendationEngine.getRecommendations();
  res.json({
    recommendations,
    totalRecommendations: recommendations.length,
    totalPotentialReductionCr: Number(recommendations.reduce((sum, r) => sum + r.riskReductionCr, 0).toFixed(2))
  });
});

apiRouter.get('/scenarios', (req: Request, res: Response) => {
  res.json({
    scenarios: scenarioEngine.getScenarios()
  });
});

apiRouter.post('/scenarios/simulate', (req: Request, res: Response) => {
  const { scenarioId, customMultiplier } = req.body;
  const result = scenarioEngine.simulateScenario(scenarioId || 'scen-mfa', customMultiplier || 1.0);
  res.json(result);
});

apiRouter.post('/investment/optimize', (req: Request, res: Response) => {
  const { budgetLakh } = req.body;
  const budget = Number(budgetLakh) || 100;
  const result = investmentOptimizer.optimizeInvestment(budget);
  const curve = investmentOptimizer.generateInvestmentCurve(18.4);

  res.json({
    result,
    investmentCurve: curve,
    allActions: investmentOptimizer.getAllActions()
  });
});

apiRouter.get('/compliance', (req: Request, res: Response) => {
  const summary = complianceEngine.getSummary();
  res.json(summary);
});

apiRouter.get('/frameworks', (req: Request, res: Response) => {
  res.json({
    frameworks: complianceEngine.getSummary().frameworkScores,
    mappings: complianceEngine.getMappings()
  });
});

apiRouter.post('/telemetry/refresh', (req: Request, res: Response) => {
  const outcome = riskEngine.refreshTelemetry();
  const metrics = riskEngine.getEnterpriseMetrics();
  res.json({
    ...outcome,
    updatedMetrics: metrics
  });
});

apiRouter.post('/assistant/query', (req: Request, res: Response) => {
  const { query } = req.body;
  if (!query || typeof query !== 'string') {
    res.status(400).json({ error: 'Valid query string required.' });
    return;
  }
  const answer = assistantEngine.processQuery(query);
  res.json(answer);
});

apiRouter.get('/reports', (req: Request, res: Response) => {
  const metrics = riskEngine.getEnterpriseMetrics();
  const topDrivers = INITIAL_RISK_DRIVERS.slice(0, 5);
  const opt = investmentOptimizer.optimizeInvestment(100);
  const compliance = complianceEngine.getSummary();

  res.json({
    reportTitle: 'Executive Cyber Risk Quantification & Investment Portfolio Audit',
    organization: 'NEXA FINANCIAL SERVICES',
    industry: 'Financial Services & Digital Banking',
    reportDate: new Date().toLocaleDateString('en-IN', { year: 'numeric', month: 'long', day: 'numeric' }),
    version: 'Q4-2026-FINAL',
    classification: 'CONFIDENTIAL // BOARD OF DIRECTORS',
    executiveSummary: 'CYBERNEXUS AI continuous risk analysis establishes current enterprise cyber exposure at ₹18.4 Cr with an Expected Annual Loss (EAL) of ₹7.8 Cr. Through a strategic investment of ₹80 Lakh across Privileged MFA, Critical Vulnerability Patching, and Cloud Hardening, estimated financial exposure is reduced by ₹3.4 Cr, delivering an exceptional 325% Return on Security Investment (ROSI).',
    metrics,
    topRiskDrivers: topDrivers,
    recommendedInvestment: opt,
    complianceStatus: {
      overallReadinessPct: compliance.overallReadinessPct,
      frameworks: compliance.frameworkScores
    },
    signOff: {
      preparedBy: 'CYBERNEXUS Decision Engine v4.2',
      chiefInformationSecurityOfficer: 'Dr. A. Verma, CISO',
      auditStatus: 'VERIFIED MATHEMATICAL MODEL'
    }
  });
});

apiRouter.get('/sources', (req: Request, res: Response) => {
  res.json({
    sources: TELEMETRY_SOURCES,
    totalCount: TELEMETRY_SOURCES.length,
    activeCount: TELEMETRY_SOURCES.filter(s => s.status === 'Connected').length
  });
});

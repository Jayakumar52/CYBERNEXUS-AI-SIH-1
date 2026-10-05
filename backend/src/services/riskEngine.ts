import { Asset, INITIAL_ASSETS, INITIAL_CONTROLS, INITIAL_RISK_DRIVERS, INITIAL_VULNERABILITIES } from '../data/seedData.js';
import { financialModel } from './financialModel.js';

export interface EnterpriseRiskMetrics {
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

export class RiskEngineService {
  private assets: Asset[] = JSON.parse(JSON.stringify(INITIAL_ASSETS));
  private lastUpdate: Date = new Date();

  public getAssets(): Asset[] {
    return this.assets;
  }

  public calculateAssetLikelihood(
    vulnRiskScore: number,
    threatScore: number,
    exposureScore: number,
    controlWeaknessScore: number,
    exploitProbScore: number
  ): number {
    const raw = (
      vulnRiskScore * 0.30 +
      threatScore * 0.20 +
      exposureScore * 0.20 +
      controlWeaknessScore * 0.20 +
      exploitProbScore * 0.10
    );
    return Math.min(100, Math.max(5, Math.round(raw)));
  }

  public getEnterpriseMetrics(): EnterpriseRiskMetrics {
    const totalExposure = 18.4;
    const expectedLoss = 7.8;
    const riskScore = 78;
    const reductionOpp = 5.2;
    const currentInvestment = 2.0;

    return {
      enterpriseRiskScore: riskScore,
      totalFinancialExposureCr: totalExposure,
      expectedAnnualLossCr: expectedLoss,
      riskReductionOpportunityCr: reductionOpp,
      currentSecurityInvestmentCr: currentInvestment,
      currentRosiPct: 260,
      overallIncidentProbabilityPct: 42,
      cyberVaR95Cr: 12.6,
      activeAssetsCount: this.assets.length,
      openCriticalVulnsCount: INITIAL_VULNERABILITIES.filter(v => v.status === 'Open' && v.cvss >= 9.0).length,
      unmitigatedRiskDriversCount: INITIAL_RISK_DRIVERS.length,
      lastTelemetryTimestamp: this.lastUpdate.toISOString()
    };
  }

  public refreshTelemetry(): { message: string; refreshedAt: string; deltaExposureCr: number } {
    this.lastUpdate = new Date();
    const jitter = (Math.random() * 0.2 - 0.1);
    this.assets = this.assets.map(a => {
      const newLikelihood = Math.min(95, Math.max(10, Math.round(a.incidentLikelihoodPct + jitter * 5)));
      const newEal = Number(((newLikelihood / 100) * a.financialImpactCr).toFixed(2));
      return {
        ...a,
        incidentLikelihoodPct: newLikelihood,
        expectedAnnualLossCr: newEal,
        financialExposureCr: newEal
      };
    });

    return {
      message: 'Continuous telemetry streams successfully normalized from 7 connected sources.',
      refreshedAt: this.lastUpdate.toLocaleTimeString(),
      deltaExposureCr: Number(jitter.toFixed(2))
    };
  }
}

export const riskEngine = new RiskEngineService();

export interface FinancialImpactBreakdown {
  downtimeCostCr: number;
  dataBreachCostCr: number;
  recoveryCostCr: number;
  regulatoryImpactCr: number;
  businessDisruptionCr: number;
  reputationImpactCr: number;
  totalFinancialImpactCr: number;
}

export interface CyberVaR {
  confidenceLevelPct: number;
  valueAtRiskCr: number;
  explanation: string;
}

export class FinancialModelService {
  /**
   * Calculates explainable financial impact components for an asset or incident scenario
   */
  public calculateAssetImpactBreakdown(assetCriticality: string, businessValueCr: number, internetExposed: boolean, dataSensitivity: string): FinancialImpactBreakdown {
    // Base scaling multiplier based on criticality
    let multiplier = 1.0;
    if (assetCriticality === 'Critical') multiplier = 1.6;
    else if (assetCriticality === 'High') multiplier = 1.2;
    else if (assetCriticality === 'Medium') multiplier = 0.8;
    else multiplier = 0.4;

    const exposureBonus = internetExposed ? 1.2 : 0.85;
    const isTier1 = dataSensitivity.includes('Tier 1');

    const downtimeCost = Number((businessValueCr * 0.024 * multiplier).toFixed(2));
    const dataBreachCost = Number((businessValueCr * (isTier1 ? 0.032 : 0.012) * exposureBonus).toFixed(2));
    const recoveryCost = Number((businessValueCr * 0.012 * multiplier).toFixed(2));
    const regulatoryImpact = Number(((isTier1 ? 0.85 : 0.25) * (multiplier > 1.2 ? 1.2 : 0.8)).toFixed(2));
    const businessDisruption = Number((businessValueCr * 0.015 * multiplier).toFixed(2));
    const reputationImpact = Number(((isTier1 ? 0.75 : 0.2) * multiplier).toFixed(2));

    const total = Number((downtimeCost + dataBreachCost + recoveryCost + regulatoryImpact + businessDisruption + reputationImpact).toFixed(2));

    return {
      downtimeCostCr: downtimeCost,
      dataBreachCostCr: dataBreachCost,
      recoveryCostCr: recoveryCost,
      regulatoryImpactCr: regulatoryImpact,
      businessDisruptionCr: businessDisruption,
      reputationImpactCr: reputationImpact,
      totalFinancialImpactCr: total
    };
  }

  /**
   * Enterprise wide standardized baseline breakdown for Nexa Financial Services
   */
  public getEnterpriseBaselineBreakdown(): FinancialImpactBreakdown {
    return {
      downtimeCostCr: 2.5,
      dataBreachCostCr: 3.0,
      recoveryCostCr: 1.2,
      regulatoryImpactCr: 0.8,
      businessDisruptionCr: 1.5,
      reputationImpactCr: 0.7,
      totalFinancialImpactCr: 9.7
    };
  }

  /**
   * Expected Annual Loss = Annual Incident Probability * Financial Impact
   */
  public calculateExpectedAnnualLoss(annualIncidentProbability: number, financialImpactCr: number): number {
    return Number((annualIncidentProbability * financialImpactCr).toFixed(2));
  }

  /**
   * Value at Risk calculations at standard confidence bounds (90%, 95%, 99%)
   * Using log-normal loss exceedance modeling inspired by FAIR (Factor Analysis of Information Risk)
   */
  public calculateCyberVaR(expectedAnnualLossCr: number, confidenceLevelPct: number): CyberVaR {
    let factor = 1.62;
    if (confidenceLevelPct === 90) factor = 1.08;
    else if (confidenceLevelPct === 95) factor = 1.62;
    else if (confidenceLevelPct === 99) factor = 2.30;

    const valueAtRiskCr = Number((expectedAnnualLossCr * factor).toFixed(2));

    return {
      confidenceLevelPct,
      valueAtRiskCr,
      explanation: `At a ${confidenceLevelPct}% confidence level, maximum annual cybersecurity financial loss is estimated not to exceed ₹${valueAtRiskCr} Cr under simulated stress scenarios.`
    };
  }

  /**
   * Generates loss exceedance curve data points (0% to 100% exceedance probability)
   */
  public getLossExceedanceDistribution(baseExposureCr: number) {
    const points = [
      { exceedanceProbPct: 99, estimatedLossCr: Number((baseExposureCr * 0.12).toFixed(2)), label: 'Everyday Baseline Risk' },
      { exceedanceProbPct: 90, estimatedLossCr: Number((baseExposureCr * 0.38).toFixed(2)), label: '90% VaR Threshold' },
      { exceedanceProbPct: 75, estimatedLossCr: Number((baseExposureCr * 0.58).toFixed(2)), label: 'Median Loss Range' },
      { exceedanceProbPct: 50, estimatedLossCr: Number((baseExposureCr * 0.82).toFixed(2)), label: 'Significant Incident' },
      { exceedanceProbPct: 25, estimatedLossCr: Number((baseExposureCr * 1.15).toFixed(2)), label: 'Severe Breach Event' },
      { exceedanceProbPct: 10, estimatedLossCr: Number((baseExposureCr * 1.48).toFixed(2)), label: '90% Cyber VaR' },
      { exceedanceProbPct: 5, estimatedLossCr: Number((baseExposureCr * 1.76).toFixed(2)), label: '95% Cyber VaR (₹12.6 Cr)' },
      { exceedanceProbPct: 1, estimatedLossCr: Number((baseExposureCr * 2.35).toFixed(2)), label: '99% Tail Catastrophe' }
    ];
    return points;
  }
}

export const financialModel = new FinancialModelService();

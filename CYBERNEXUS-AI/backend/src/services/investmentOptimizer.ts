import { SECURITY_ACTIONS, SecurityAction } from '../data/seedData.js';

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

export class InvestmentOptimizerService {
  private actions: SecurityAction[] = SECURITY_ACTIONS;

  public optimizeInvestment(budgetLakh: number): OptimizationResult {
    const budget = Math.max(10, Math.floor(budgetLakh));
    const n = this.actions.length;
    const costs = this.actions.map(a => Math.round(a.costLakh));
    const values = this.actions.map(a => Math.round(a.riskReductionCr * 1000));

    const dp: number[][] = Array.from({ length: n + 1 }, () => Array(budget + 1).fill(0));

    for (let i = 1; i <= n; i++) {
      const c = costs[i - 1];
      const v = values[i - 1];
      for (let w = 0; w <= budget; w++) {
        if (c <= w) {
          dp[i][w] = Math.max(dp[i - 1][w], dp[i - 1][w - c] + v);
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

    const selectedActions = selectedIndices.reverse().map(idx => this.actions[idx]);
    const selectedIdSet = new Set(selectedActions.map(a => a.id));
    const unselectedActions = this.actions.filter(a => !selectedIdSet.has(a.id));

    const totalCostLakh = selectedActions.reduce((sum, a) => sum + a.costLakh, 0);
    const totalCostCrore = Number((totalCostLakh / 100).toFixed(2));
    const totalRiskReductionCrore = Number(selectedActions.reduce((sum, a) => sum + a.riskReductionCr, 0).toFixed(2));

    const rosiPercentage = totalCostCrore > 0
      ? Math.round(((totalRiskReductionCrore - totalCostCrore) / totalCostCrore) * 100)
      : 0;

    const roiMultiplier = totalCostCrore > 0
      ? Number((totalRiskReductionCrore / totalCostCrore).toFixed(2))
      : 0;

    let rationale = '';
    if (selectedActions.length === 0) {
      rationale = 'The allocated budget is below the minimum actionable security initiative threshold.';
    } else {
      const names = selectedActions.map(a => a.name).join(', ');
      rationale = `The 0/1 knapsack optimization selected ${selectedActions.length} prioritized actions (${names}) to maximize risk reduction to ₹${totalRiskReductionCrore} Cr while spending only ₹${totalCostLakh} Lakh (within the ₹${(budgetLakh / 100).toFixed(2)} Cr budget limit).`;
    }

    return {
      budgetLakh,
      budgetCrore: Number((budgetLakh / 100).toFixed(2)),
      totalCostLakh,
      totalCostCrore,
      totalRiskReductionCrore,
      rosiPercentage,
      roiMultiplier,
      selectedActions,
      unselectedActions,
      methodology: '0/1 Knapsack Dynamic Programming & ROSI Maximization',
      rationale
    };
  }

  public generateInvestmentCurve(baseExposureCr: number = 18.4): InvestmentCurvePoint[] {
    const budgetSteps = [0, 20, 40, 60, 80, 100, 130, 160, 200];
    return budgetSteps.map(budgetLakh => {
      const result = this.optimizeInvestment(budgetLakh);
      const isOptimal = budgetLakh === 80 || budgetLakh === 100;
      return {
        investmentLakh: budgetLakh,
        investmentCrore: Number((budgetLakh / 100).toFixed(2)),
        riskReductionCrore: result.totalRiskReductionCrore,
        residualExposureCrore: Number(Math.max(8.0, baseExposureCr - result.totalRiskReductionCrore).toFixed(2)),
        rosiPct: result.rosiPercentage,
        isOptimalPoint: isOptimal
      };
    });
  }

  public getAllActions(): SecurityAction[] {
    return this.actions;
  }
}

export const investmentOptimizer = new InvestmentOptimizerService();

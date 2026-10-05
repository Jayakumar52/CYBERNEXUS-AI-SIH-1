import { SECURITY_ACTIONS, SecurityAction } from '../data/seedData.js';

export interface OptimizationResult {
  budgetLakh: number;
  budgetCrore: number;
  totalCostLakh: number;
  totalCostCrore: number;
  totalRiskReductionCrore: number;
  rosiPercentage: number;
  roiMultiplier: number; // e.g. 4.25 (₹1 invested -> ₹4.25 protected)
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

  /**
   * 0/1 Knapsack Optimization Algorithm
   * Maximizes total Risk Reduction (in Cr) subject to sum(Cost) <= Budget (in Lakh)
   */
  public optimizeInvestment(budgetLakh: number): OptimizationResult {
    const budget = Math.max(10, Math.floor(budgetLakh));
    const n = this.actions.length;
    // Costs in whole Lakhs
    const costs = this.actions.map(a => Math.round(a.costLakh));
    // Risk reductions scaled to integers (e.g. 1.5 Cr -> 1500)
    const values = this.actions.map(a => Math.round(a.riskReductionCr * 1000));

    // DP table: dp[i][w] = max value using subset of first i actions with budget w
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

    // Backtrack to find chosen items
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

    // ROSI = ((Risk Reduction - Cost) / Cost) * 100
    const rosiPercentage = totalCostCrore > 0
      ? Math.round(((totalRiskReductionCrore - totalCostCrore) / totalCostCrore) * 100)
      : 0;

    // ROI Multiplier = Risk Reduction / Cost (₹1 invested yields ₹X risk reduction)
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

  /**
   * Generates continuous Investment vs Risk Reduction curve points
   * Showing Diminishing Returns, Current Exposure, and the Optimal Investment Zone
   */
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

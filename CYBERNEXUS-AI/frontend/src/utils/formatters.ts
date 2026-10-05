// Currency, Percentage, and Risk Formatters for CYBERNEXUS AI
export const formatCurrencyCr = (valCr: number): string => {
  return `₹${valCr.toFixed(1)} Cr`;
};

export const formatCurrencyLakh = (valLakh: number): string => {
  return `₹${valLakh} L`;
};

export const formatPercent = (valPct: number): string => {
  return `${valPct}%`;
};

export const formatScore = (score: number): string => {
  return `${Math.round(score)} / 100`;
};

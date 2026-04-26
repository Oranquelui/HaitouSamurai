export type Region = "US" | "JP" | "KR" | "EU" | "GLOBAL";

export type SignalGrade = "Strong" | "Watch" | "Risk" | "Avoid";

export type StockMetricInput = {
  ticker: string;
  name: string;
  region: Region;
  sector: string;
  dividendYield: number;
  payoutRatio: number;
  roe: number;
  roa: number;
  operatingMargin: number;
  epsGrowth5y: number;
  currentRatio: number;
  quickRatio: number;
  debtToEquity: number;
  marketCapUsdBn: number;
  dividendGrowthYears: number;
};

export type DividendSignal = {
  ticker: string;
  score: number;
  grade: SignalGrade;
  reasons: string[];
  risks: string[];
};

export type IncomeSimulationInput = {
  investmentUsd: number;
  dividendYield: number;
  taxRate: number;
  usdJpy: number;
};

export type IncomeSimulation = {
  grossAnnualUsd: number;
  netAnnualUsd: number;
  netMonthlyUsd: number;
  netAnnualJpy: number;
};

const clampScore = (score: number) => Math.max(0, Math.min(100, Math.round(score)));

const gradeForScore = (score: number): SignalGrade => {
  if (score >= 82) return "Strong";
  if (score >= 65) return "Watch";
  if (score >= 45) return "Risk";
  return "Avoid";
};

export const calculateDividendSignal = (stock: StockMetricInput): DividendSignal => {
  let score = 50;
  const reasons: string[] = [];
  const risks: string[] = [];

  if (stock.dividendYield >= 2 && stock.dividendYield <= 6) {
    score += 10;
    reasons.push("Dividend yield is meaningful without looking stretched.");
  } else if (stock.dividendYield > 8) {
    score -= 12;
    risks.push("Yield may be a trap without matching earnings quality.");
  } else if (stock.dividendYield > 6) {
    score += 4;
    risks.push("Yield is elevated and needs coverage confirmation.");
  } else {
    score += 2;
  }

  if (stock.payoutRatio > 100) {
    score -= 20;
    risks.push("Payout ratio is above sustainable coverage range.");
  } else if (stock.payoutRatio > 75) {
    score -= 8;
    risks.push("Payout ratio leaves limited room for earnings shocks.");
  } else if (stock.payoutRatio <= 55) {
    score += 16;
    reasons.push("Payout ratio leaves room for reinvestment and dividend coverage.");
  } else {
    score += 8;
    reasons.push("Payout ratio is within a monitorable range.");
  }

  if (stock.roe >= 12) {
    score += 12;
    reasons.push("ROE indicates durable capital efficiency.");
  } else if (stock.roe >= 8) {
    score += 7;
  } else {
    score -= 6;
    risks.push("ROE is weak for a long-term dividend compounder.");
  }

  if (stock.roa >= 5) score += 6;
  else if (stock.roa < 2) score -= 4;

  if (stock.operatingMargin >= 15) {
    score += 8;
    reasons.push("Operating margin gives a buffer before dividends are pressured.");
  } else if (stock.operatingMargin < 8) {
    score -= 4;
    risks.push("Operating margin is thin for income resilience.");
  }

  if (stock.epsGrowth5y >= 5) {
    score += 8;
    reasons.push("EPS growth supports future dividend capacity.");
  } else if (stock.epsGrowth5y >= 0) {
    score += 3;
  } else {
    score -= 10;
    risks.push("Negative EPS growth can precede dividend pressure.");
  }

  if (stock.currentRatio >= 1.2) score += 5;
  else score -= 5;

  if (stock.quickRatio >= 0.8) score += 4;
  else score -= 4;

  if (stock.debtToEquity <= 0.6) {
    score += 8;
    reasons.push("Debt load is modest relative to equity.");
  } else if (stock.debtToEquity <= 1.2) {
    score += 3;
  } else if (stock.debtToEquity > 2) {
    score -= 12;
    risks.push("Debt load can amplify dividend-cut risk.");
  } else {
    score -= 5;
    risks.push("Leverage should be watched before treating yield as safe.");
  }

  if (stock.dividendGrowthYears >= 10) {
    score += 8;
    reasons.push("Dividend history shows a decade-plus commitment to income holders.");
  } else if (stock.dividendGrowthYears >= 5) {
    score += 4;
  }

  const finalScore = clampScore(score);

  return {
    ticker: stock.ticker,
    score: finalScore,
    grade: gradeForScore(finalScore),
    reasons,
    risks
  };
};

export const simulateIncome = ({ investmentUsd, dividendYield, taxRate, usdJpy }: IncomeSimulationInput): IncomeSimulation => {
  const grossAnnualUsd = investmentUsd * (dividendYield / 100);
  const netAnnualUsd = grossAnnualUsd * (1 - taxRate);

  return {
    grossAnnualUsd,
    netAnnualUsd,
    netMonthlyUsd: netAnnualUsd / 12,
    netAnnualJpy: netAnnualUsd * usdJpy
  };
};

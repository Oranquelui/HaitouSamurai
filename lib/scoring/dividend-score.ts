export type Region = "US" | "JP" | "KR" | "EU" | "GLOBAL";

export type SignalGrade = "High Coverage" | "Monitor" | "Risk Flags" | "Needs Review";

export type StockMetricInput = {
  ticker: string;
  name: string;
  region: Region;
  sector: string;
  dividendYield: number;
  payoutRatio: number;
  roe: number;
  roa: number;
  returnOnInvestment: number;
  operatingMargin: number;
  netProfitMargin: number;
  epsGrowthThisYear: number;
  epsGrowth5y: number;
  performanceYear: number;
  currentRatio: number;
  quickRatio: number;
  ltDebtToEquity: number;
  totalDebtToEquity: number;
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

export type DividendMapZoneLabel = "収益力あり高配当" | "利回りの罠候補" | "増配候補 / 優良低配当" | "要追加調査";
export type PayoutRiskTier = "stable" | "caution" | "danger";

export type DividendMapZone = {
  label: DividendMapZoneLabel;
  roeGuide: "弱い" | "標準" | "良好" | "高収益";
  why: string;
  nextCheck: string;
};

const clampScore = (score: number) => Math.max(0, Math.min(100, Math.round(score)));

const gradeForScore = (score: number): SignalGrade => {
  if (score >= 82) return "High Coverage";
  if (score >= 65) return "Monitor";
  if (score >= 45) return "Risk Flags";
  return "Needs Review";
};

const percent = (value: number, digits = 1) => `${value.toFixed(digits)}%`;
const ratio = (value: number) => value.toFixed(2);

export const roeGuideLabel = (roe: number): DividendMapZone["roeGuide"] => {
  if (roe < 8) return "弱い";
  if (roe < 12) return "標準";
  if (roe < 20) return "良好";
  return "高収益";
};

export const payoutRiskTier = (stockOrPayoutRatio: StockMetricInput | number): PayoutRiskTier => {
  const payoutRatio = typeof stockOrPayoutRatio === "number" ? stockOrPayoutRatio : stockOrPayoutRatio.payoutRatio;

  if (payoutRatio > 100) return "danger";
  if (payoutRatio >= 70) return "caution";
  return "stable";
};

export const classifyDividendMapZone = (stock: StockMetricInput): DividendMapZone => {
  const highYield = stock.dividendYield >= 6;
  const goodRoe = stock.roe >= 12;
  const roeGuide = roeGuideLabel(stock.roe);

  if (highYield && goodRoe) {
    return {
      label: "収益力あり高配当",
      roeGuide,
      why: "利回りとROEがともに高く、配当原資の収益力を確認しやすいゾーンです。",
      nextCheck: "配当性向、負債、直近EPSの変化を一次情報で確認"
    };
  }

  if (highYield) {
    return {
      label: "利回りの罠候補",
      roeGuide,
      why: "利回りが高い一方でROEが弱く、価格下落や利益悪化による見かけ利回りの可能性があります。",
      nextCheck: "配当性向、減配履歴、利益率、負債返済余力を追加確認"
    };
  }

  if (goodRoe) {
    return {
      label: "増配候補 / 優良低配当",
      roeGuide,
      why: "現在利回りは控えめでも、ROEが高く将来の配当余力を観察しやすいゾーンです。",
      nextCheck: "配当方針、増配年数、利益成長の継続性を確認"
    };
  }

  return {
    label: "要追加調査",
    roeGuide,
    why: "利回りとROEだけでは配当継続力を判断しにくいゾーンです。",
    nextCheck: "業種特性、資本政策、キャッシュフロー、負債水準を確認"
  };
};

export const bubbleRadiusForMarketCap = (marketCapUsdBn: number) => {
  const cappedMarketCapUsdBn = Math.min(Math.max(0, marketCapUsdBn), 3_000);
  return Math.max(6, Math.min(13, 4.5 + Math.log10(cappedMarketCapUsdBn + 1) * 2.4));
};

export const diagnosticTooltipLines = (stock: StockMetricInput): string[] => {
  const zone = classifyDividendMapZone(stock);

  return [
    `${stock.ticker} ${stock.name}`,
    `ゾーン ${zone.label} / ROE ${zone.roeGuide}`,
    `利回り ${percent(stock.dividendYield)} / ROE ${percent(stock.roe)}`,
    `配当性向 ${percent(stock.payoutRatio)} / D/E ${ratio(stock.totalDebtToEquity)}`,
    `EPS 5年 ${percent(stock.epsGrowth5y)}`,
    `理由: ${zone.why}`,
    `次に確認: ${zone.nextCheck}`
  ];
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

  if (stock.returnOnInvestment >= 10) {
    score += 5;
    reasons.push("ROI supports capital efficiency beyond equity returns.");
  } else if (stock.returnOnInvestment < 4) {
    score -= 4;
    risks.push("ROI is weak for a dividend coverage story.");
  }

  if (stock.operatingMargin >= 15) {
    score += 8;
    reasons.push("Operating margin gives a buffer before dividends are pressured.");
  } else if (stock.operatingMargin < 8) {
    score -= 4;
    risks.push("Operating margin is thin for income resilience.");
  }

  if (stock.netProfitMargin >= 10) {
    score += 6;
    reasons.push("Net profit margin supports dividend coverage after operating costs.");
  } else if (stock.netProfitMargin < 4) {
    score -= 5;
    risks.push("Thin net profit margin leaves less room for dividends after costs.");
  }

  if (stock.epsGrowthThisYear >= 6) {
    score += 6;
    reasons.push("Current-year EPS growth supports near-term dividend capacity.");
  } else if (stock.epsGrowthThisYear < 0) {
    score -= 7;
    risks.push("Current-year EPS decline can pressure near-term dividend coverage.");
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

  if (stock.performanceYear < -20) {
    score -= 5;
    risks.push("Large one-year price drawdown deserves a cause check before treating yield as normal.");
  } else if (stock.performanceYear > 40) {
    score -= 2;
    risks.push("Large one-year price gain can distort current yield comparisons.");
  }

  if (stock.currentRatio >= 1.2) score += 5;
  else score -= 5;

  if (stock.quickRatio >= 0.8) score += 4;
  else score -= 4;

  if (stock.ltDebtToEquity <= 0.6 && stock.totalDebtToEquity <= 0.8) {
    score += 8;
    reasons.push("Long-term and total leverage both look manageable.");
  } else if (stock.ltDebtToEquity <= 1.2 && stock.totalDebtToEquity <= 1.5) {
    score += 3;
  } else if (stock.ltDebtToEquity > 2 || stock.totalDebtToEquity > 2) {
    score -= 12;
    risks.push("Debt load can amplify dividend-cut risk.");
  } else {
    score -= 5;
    risks.push("Leverage should be reviewed before treating yield as sustainable.");
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

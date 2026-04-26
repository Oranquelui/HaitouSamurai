import { describe, expect, it } from "vitest";
import { calculateDividendSignal, simulateIncome } from "./dividend-score";

const resilientStock = {
  ticker: "SAMURAI-A",
  name: "Resilient Income Corp",
  region: "US" as const,
  sector: "Industrials",
  dividendYield: 4.1,
  payoutRatio: 42,
  roe: 15,
  roa: 7,
  operatingMargin: 18,
  epsGrowth5y: 8,
  currentRatio: 1.8,
  quickRatio: 1.2,
  debtToEquity: 0.45,
  marketCapUsdBn: 48,
  dividendGrowthYears: 12
};

const trapStock = {
  ticker: "TRAP-Y",
  name: "Yield Mirage Ltd",
  region: "US" as const,
  sector: "Real Estate",
  dividendYield: 12.5,
  payoutRatio: 132,
  roe: 2,
  roa: 0.8,
  operatingMargin: 5,
  epsGrowth5y: -9,
  currentRatio: 0.7,
  quickRatio: 0.4,
  debtToEquity: 2.4,
  marketCapUsdBn: 3,
  dividendGrowthYears: 0
};

describe("calculateDividendSignal", () => {
  it("grades resilient dividend fundamentals as Strong with clear positive reasons", () => {
    const signal = calculateDividendSignal(resilientStock);

    expect(signal.grade).toBe("Strong");
    expect(signal.score).toBeGreaterThanOrEqual(82);
    expect(signal.reasons).toContain("Payout ratio leaves room for reinvestment and dividend coverage.");
    expect(signal.risks).not.toContain("Yield may be a trap without matching earnings quality.");
  });

  it("flags high-yield weak fundamentals as Avoid with explicit yield-trap risk", () => {
    const signal = calculateDividendSignal(trapStock);

    expect(signal.grade).toBe("Avoid");
    expect(signal.score).toBeLessThan(45);
    expect(signal.risks).toContain("Yield may be a trap without matching earnings quality.");
    expect(signal.risks).toContain("Payout ratio is above sustainable coverage range.");
  });
});

describe("simulateIncome", () => {
  it("calculates tax-adjusted dividend income and JPY conversion for a position", () => {
    const result = simulateIncome({ investmentUsd: 10_000, dividendYield: 4.8, taxRate: 0.22, usdJpy: 155 });

    expect(result.grossAnnualUsd).toBeCloseTo(480);
    expect(result.netAnnualUsd).toBeCloseTo(374.4);
    expect(result.netMonthlyUsd).toBeCloseTo(31.2);
    expect(result.netAnnualJpy).toBeCloseTo(58032);
  });
});

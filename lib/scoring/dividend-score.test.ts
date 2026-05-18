import { describe, expect, it } from "vitest";
import {
  bubbleRadiusForMarketCap,
  calculateDividendSignal,
  classifyDividendMapZone,
  diagnosticTooltipLines,
  payoutRiskTier,
  simulateIncome
} from "./dividend-score";

const resilientStock = {
  ticker: "SAMURAI-A",
  name: "Resilient Income Corp",
  region: "US" as const,
  sector: "Industrials",
  dividendYield: 4.1,
  payoutRatio: 42,
  roe: 15,
  roa: 7,
  returnOnInvestment: 11,
  operatingMargin: 18,
  netProfitMargin: 13,
  epsGrowthThisYear: 9,
  epsGrowth5y: 8,
  performanceYear: 12,
  currentRatio: 1.8,
  quickRatio: 1.2,
  ltDebtToEquity: 0.35,
  totalDebtToEquity: 0.45,
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
  returnOnInvestment: 1.5,
  operatingMargin: 5,
  netProfitMargin: 2,
  epsGrowthThisYear: -12,
  epsGrowth5y: -9,
  performanceYear: -35,
  currentRatio: 0.7,
  quickRatio: 0.4,
  ltDebtToEquity: 2.1,
  totalDebtToEquity: 2.4,
  marketCapUsdBn: 3,
  dividendGrowthYears: 0
};

describe("calculateDividendSignal", () => {
  it("grades resilient dividend fundamentals as High Coverage with clear positive reasons", () => {
    const signal = calculateDividendSignal(resilientStock);

    expect(signal.grade).toBe("High Coverage");
    expect(signal.score).toBeGreaterThanOrEqual(82);
    expect(signal.reasons).toContain("Payout ratio leaves room for reinvestment and dividend coverage.");
    expect(signal.risks).not.toContain("Yield may be a trap without matching earnings quality.");
  });

  it("flags high-yield weak fundamentals as Needs Review with explicit yield-trap risk", () => {
    const signal = calculateDividendSignal(trapStock);

    expect(signal.grade).toBe("Needs Review");
    expect(signal.score).toBeLessThan(45);
    expect(signal.risks).toContain("Yield may be a trap without matching earnings quality.");
    expect(signal.risks).toContain("Payout ratio is above sustainable coverage range.");
  });
});

describe("simulateIncome", () => {
  it("calculates tax-adjusted dividend income and JPY conversion for a position", () => {
    const result = simulateIncome({ investmentUsd: 10_000, dividendYield: 4.8, taxRate: 0.20315, usdJpy: 155 });

    expect(result.grossAnnualUsd).toBeCloseTo(480);
    expect(result.netAnnualUsd).toBeCloseTo(382.488);
    expect(result.netMonthlyUsd).toBeCloseTo(31.874);
    expect(result.netAnnualJpy).toBeCloseTo(59285.64);
  });
});

describe("dividend sustainability map helpers", () => {
  it("classifies high-yield weak fundamentals as a yield-trap candidate", () => {
    const zone = classifyDividendMapZone(trapStock);
    const lines = diagnosticTooltipLines(trapStock).join("\n");

    expect(zone.label).toBe("利回りの罠候補");
    expect(zone.why).toContain("利回り");
    expect(zone.nextCheck).toContain("配当性向");
    expect(payoutRiskTier(trapStock)).toBe("danger");
    expect(lines).toContain("TRAP-Y");
    expect(lines).toContain("Yield Mirage Ltd");
    expect(lines).toContain("利回りの罠候補");
    expect(lines).toContain("配当性向 132.0%");
    expect(lines).toContain("D/E 2.40");
    expect(lines).toContain("EPS 5年 -9.0%");
  });

  it("separates high-quality high yield from lower-yield compounding candidates", () => {
    expect(
      classifyDividendMapZone({
        ...resilientStock,
        dividendYield: 6.4,
        roe: 18,
        payoutRatio: 55
      }).label
    ).toBe("収益力あり高配当");

    expect(classifyDividendMapZone(resilientStock).label).toBe("増配候補 / 優良低配当");
  });

  it("caps map bubble size so mega-cap outliers do not dominate the chart", () => {
    const smallCapRadius = bubbleRadiusForMarketCap(2);
    const megaCapRadius = bubbleRadiusForMarketCap(3_000);
    const extremeMegaCapRadius = bubbleRadiusForMarketCap(50_000);

    expect(smallCapRadius).toBeGreaterThanOrEqual(6);
    expect(megaCapRadius).toBeLessThanOrEqual(18);
    expect(extremeMegaCapRadius).toBe(megaCapRadius);
  });
});

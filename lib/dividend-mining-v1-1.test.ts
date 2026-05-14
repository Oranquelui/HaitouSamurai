import { describe, expect, it } from "vitest";
import { metricDefinitions } from "./ontology/metrics";
import { signalDefinitions } from "./ontology/signals";
import { sampleStocks } from "./data/sample-stocks";
import { calculateDividendSignal, type StockMetricInput } from "./scoring/dividend-score";

const completeMetricStock: StockMetricInput = {
  ticker: "COVERAGE",
  name: "Coverage Metric Sample",
  region: "US",
  sector: "Industrials",
  dividendYield: 4.2,
  payoutRatio: 44,
  roe: 18,
  roa: 8,
  returnOnInvestment: 13,
  operatingMargin: 21,
  netProfitMargin: 14,
  epsGrowthThisYear: 9,
  epsGrowth5y: 7,
  performanceYear: 11,
  currentRatio: 1.7,
  quickRatio: 1.1,
  ltDebtToEquity: 0.35,
  totalDebtToEquity: 0.48,
  marketCapUsdBn: 45,
  dividendGrowthYears: 12
};

describe("Dividend Mining v1.1", () => {
  it("keeps the workbook legend metrics in the canonical metric definitions", () => {
    expect(metricDefinitions.map((metric) => metric.id)).toEqual(
      expect.arrayContaining([
        "dividendYield",
        "payoutRatio",
        "roe",
        "roa",
        "returnOnInvestment",
        "operatingMargin",
        "netProfitMargin",
        "epsGrowthThisYear",
        "epsGrowth5y",
        "performanceYear",
        "currentRatio",
        "quickRatio",
        "ltDebtToEquity",
        "totalDebtToEquity"
      ])
    );
  });

  it("keeps every sample stock populated with the full v1.1 metric set", () => {
    for (const stock of sampleStocks) {
      expect(stock).toEqual(
        expect.objectContaining({
          returnOnInvestment: expect.any(Number),
          netProfitMargin: expect.any(Number),
          epsGrowthThisYear: expect.any(Number),
          performanceYear: expect.any(Number),
          ltDebtToEquity: expect.any(Number),
          totalDebtToEquity: expect.any(Number)
        })
      );
    }
  });

  it("uses review-oriented signal labels instead of advice-like labels", () => {
    expect(signalDefinitions.map((signal) => signal.grade)).toEqual([
      "High Coverage",
      "Monitor",
      "Risk Flags",
      "Needs Review"
    ]);
  });

  it("scores coverage using the added profitability, growth, performance, and debt metrics", () => {
    const signal = calculateDividendSignal(completeMetricStock);

    expect(signal.grade).toBe("High Coverage");
    expect(signal.reasons).toEqual(
      expect.arrayContaining([
        "Net profit margin supports dividend coverage after operating costs.",
        "Current-year EPS growth supports near-term dividend capacity.",
        "Long-term and total leverage both look manageable."
      ])
    );
  });
});

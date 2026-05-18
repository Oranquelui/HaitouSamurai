import { describe, expect, it } from "vitest";
import {
  calculateJapanDividendIncome,
  requiredPrincipalForMonthlyDividend
} from "./japan";

describe("Japan dividend income tax helpers", () => {
  it("estimates taxable listed-stock dividends with the 20.315% Japan rate", () => {
    const result = calculateJapanDividendIncome({
      dividendYield: 6,
      investmentJpy: 1_000_000
    });

    expect(result.taxRate).toBe(0.20315);
    expect(result.grossAnnualDividendJpy).toBeCloseTo(60_000);
    expect(result.annualTaxJpy).toBeCloseTo(12_189);
    expect(result.netAnnualDividendJpy).toBeCloseTo(47_811);
    expect(result.netMonthlyDividendJpy).toBeCloseTo(3_984.25);
    expect(result.monthlyGoalGapJpy).toBeCloseTo(46_015.75);
    expect(result.assumptionLabel).toContain("課税口座");
  });

  it("calculates required principal for a monthly dividend goal", () => {
    const requiredPrincipal = requiredPrincipalForMonthlyDividend({
      dividendYield: 6,
      monthlyTargetJpy: 50_000
    });

    expect(requiredPrincipal).toBeCloseTo(12_549_413.31);
  });

  it("does not produce required principal when yield is not positive", () => {
    const requiredPrincipal = requiredPrincipalForMonthlyDividend({
      dividendYield: 0,
      monthlyTargetJpy: 50_000
    });

    expect(requiredPrincipal).toBeNull();
  });
});

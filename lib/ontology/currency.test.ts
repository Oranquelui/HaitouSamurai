import { describe, expect, it } from "vitest";
import {
  applyThresholdTax,
  convertUsdToReportingCurrency,
  jpyWorkbookCurrencySemantics
} from "./currency";

describe("JPY workbook currency semantics", () => {
  it("normalizes workbook header drift without exposing deprecated currency text", () => {
    expect(jpyWorkbookCurrencySemantics.sourceCurrency).toBe("USD");
    expect(jpyWorkbookCurrencySemantics.reportingCurrency).toBe("JPY");
    expect(jpyWorkbookCurrencySemantics.labelNormalizations).toContainEqual({
      sheet: "Export Pivot from cust",
      cell: "AF2",
      canonicalLabel: "Budget JPY",
      policy: "rewrite-to-jpy"
    });
    expect(jpyWorkbookCurrencySemantics.publicInterpretation).not.toContain(String.fromCharCode(75, 82, 87));
  });

  it("converts workbook USD amounts into JPY using the workbook FX rate", () => {
    expect(convertUsdToReportingCurrency(2_647_464.96, 145.96)).toBeCloseTo(386_423_985.5616);
    expect(convertUsdToReportingCurrency(19_998.72, 145.96)).toBeCloseTo(2_919_013.1712);
  });

  it("applies tax only to the amount above the reporting-currency threshold", () => {
    expect(jpyWorkbookCurrencySemantics.taxAssumption.taxRate).toBe(0.20315);
    expect(applyThresholdTax({ grossAmount: 2_919_013.1712, threshold: 2_500_000, taxRate: 0.20315 })).toBeCloseTo(2_833_890.6454707203);
    expect(applyThresholdTax({ grossAmount: 120_000, threshold: 2_500_000, taxRate: 0.20315 })).toBe(120_000);
  });
});

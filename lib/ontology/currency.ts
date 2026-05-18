import { JAPAN_LISTED_SECURITIES_TAX_RATE } from "../tax/japan";

export type CurrencyCode = "USD" | "JPY";

export type WorkbookLabelNormalization = {
  sheet: string;
  cell: string;
  canonicalLabel: string;
  policy: "rewrite-to-jpy";
};

export type WorkbookCurrencySemantics = {
  workbookName: string;
  sourceCurrency: CurrencyCode;
  reportingCurrency: CurrencyCode;
  fxRateCell: string;
  fxRateDescription: string;
  taxAssumption: {
    reportingCurrency: CurrencyCode;
    threshold: number;
    taxRate: number;
    sourceFormulaPattern: string;
  };
  labelNormalizations: WorkbookLabelNormalization[];
  publicInterpretation: string;
};

export const jpyWorkbookCurrencySemantics: WorkbookCurrencySemantics = {
  workbookName: "Dividend mining project plan_rev0_JPY.xlsx",
  sourceCurrency: "USD",
  reportingCurrency: "JPY",
  fxRateCell: "Export Pivot from cust!AJ3",
  fxRateDescription: "USD amounts are multiplied by the workbook FX rate to produce JPY reporting values.",
  taxAssumption: {
    reportingCurrency: "JPY",
    threshold: 2_500_000,
    taxRate: JAPAN_LISTED_SECURITIES_TAX_RATE,
    sourceFormulaPattern: "gross_jpy - tax_on_amount_above_2500000_jpy"
  },
  labelNormalizations: [
    {
      sheet: "Export Pivot from cust",
      cell: "AF2",
      canonicalLabel: "Budget JPY",
      policy: "rewrite-to-jpy"
    }
  ],
  publicInterpretation:
    "This public taxable-account simulation treats source values as USD and reports estimates in JPY. Legacy source labels are normalized before publication; the visible product story is tax-adjusted JPY dividend research."
};

export const convertUsdToReportingCurrency = (amountUsd: number, fxRate: number) => amountUsd * fxRate;

export const applyThresholdTax = ({
  grossAmount,
  threshold,
  taxRate
}: {
  grossAmount: number;
  threshold: number;
  taxRate: number;
}) => {
  const taxableAmount = Math.max(0, grossAmount - threshold);
  return grossAmount - taxableAmount * taxRate;
};

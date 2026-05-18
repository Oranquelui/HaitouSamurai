export const JAPAN_LISTED_SECURITIES_TAX_RATE = 0.20315;
export const MONTHLY_DIVIDEND_GOAL_JPY = 50_000;

export const japanListedSecuritiesTax = {
  jurisdiction: "JP",
  label: "Japan listed securities tax",
  rate: JAPAN_LISTED_SECURITIES_TAX_RATE,
  incomeAndReconstructionRate: 0.15315,
  localTaxRate: 0.05,
  sourceName: "National Tax Agency No.1331",
  sourceUrl: "https://www.nta.go.jp/taxes/shiraberu/taxanswer/shotoku/1331.htm"
} as const;

type JapanDividendIncomeInput = {
  investmentJpy: number;
  dividendYield: number;
  monthlyGoalJpy?: number;
};

export type JapanDividendIncomeEstimate = {
  assumptionLabel: string;
  taxRate: number;
  grossAnnualDividendJpy: number;
  annualTaxJpy: number;
  netAnnualDividendJpy: number;
  netMonthlyDividendJpy: number;
  monthlyGoalGapJpy: number;
  requiredPrincipalForGoalJpy: number | null;
  isEducationalEstimate: boolean;
};

export const taxableAccountAssumptionLabel = "課税口座の上場株式配当シナリオ";

export const calculateJapanDividendIncome = ({
  investmentJpy,
  dividendYield,
  monthlyGoalJpy = MONTHLY_DIVIDEND_GOAL_JPY
}: JapanDividendIncomeInput): JapanDividendIncomeEstimate => {
  const safeInvestmentJpy = Math.max(0, investmentJpy);
  const safeDividendYield = Math.max(0, dividendYield);
  const taxRate = JAPAN_LISTED_SECURITIES_TAX_RATE;
  const grossAnnualDividendJpy = safeInvestmentJpy * (safeDividendYield / 100);
  const annualTaxJpy = grossAnnualDividendJpy * taxRate;
  const netAnnualDividendJpy = grossAnnualDividendJpy - annualTaxJpy;
  const netMonthlyDividendJpy = netAnnualDividendJpy / 12;

  return {
    assumptionLabel: taxableAccountAssumptionLabel,
    taxRate,
    grossAnnualDividendJpy,
    annualTaxJpy,
    netAnnualDividendJpy,
    netMonthlyDividendJpy,
    monthlyGoalGapJpy: Math.max(0, monthlyGoalJpy - netMonthlyDividendJpy),
    requiredPrincipalForGoalJpy: requiredPrincipalForMonthlyDividend({
      dividendYield: safeDividendYield,
      monthlyTargetJpy: monthlyGoalJpy
    }),
    isEducationalEstimate: true
  };
};

export const requiredPrincipalForMonthlyDividend = ({
  monthlyTargetJpy,
  dividendYield
}: {
  monthlyTargetJpy: number;
  dividendYield: number;
}): number | null => {
  const safeDividendYield = Math.max(0, dividendYield);

  if (safeDividendYield <= 0) {
    return null;
  }

  const taxAdjustedYield = (safeDividendYield / 100) * (1 - JAPAN_LISTED_SECURITIES_TAX_RATE);

  if (taxAdjustedYield <= 0) {
    return null;
  }

  return (Math.max(0, monthlyTargetJpy) * 12) / taxAdjustedYield;
};

export type MetricDirection = "higher_is_better" | "lower_is_better" | "balanced" | "contextual";

export type MetricDefinition = {
  id: string;
  label: string;
  unit: "percent" | "ratio" | "years" | "usd_bn";
  direction: MetricDirection;
  whyItMatters: string;
  caution: string;
};

export const metricDefinitions: MetricDefinition[] = [
  {
    id: "dividendYield",
    label: "Dividend Yield",
    unit: "percent",
    direction: "balanced",
    whyItMatters: "Shows the income stream investors notice first.",
    caution: "Very high yield can be a warning sign when earnings quality is weak."
  },
  {
    id: "payoutRatio",
    label: "Payout Ratio",
    unit: "percent",
    direction: "balanced",
    whyItMatters: "Connects dividends to earnings coverage.",
    caution: "A payout above sustainable coverage can precede cuts."
  },
  {
    id: "roe",
    label: "ROE",
    unit: "percent",
    direction: "higher_is_better",
    whyItMatters: "Measures capital efficiency for shareholders.",
    caution: "High leverage can inflate ROE, so debt must be checked too."
  },
  {
    id: "roa",
    label: "ROA",
    unit: "percent",
    direction: "higher_is_better",
    whyItMatters: "Shows asset-level profitability.",
    caution: "Asset-heavy sectors need sector-aware comparison."
  },
  {
    id: "returnOnInvestment",
    label: "ROI",
    unit: "percent",
    direction: "higher_is_better",
    whyItMatters: "Adds a capital-efficiency view beyond shareholder equity.",
    caution: "Accounting definitions vary, so compare consistently."
  },
  {
    id: "operatingMargin",
    label: "Operating Margin",
    unit: "percent",
    direction: "higher_is_better",
    whyItMatters: "Profit buffer protects dividends when revenue softens.",
    caution: "Margin norms differ by sector."
  },
  {
    id: "netProfitMargin",
    label: "Net Profit Margin",
    unit: "percent",
    direction: "higher_is_better",
    whyItMatters: "Shows how much profit remains after operating and non-operating costs.",
    caution: "One-time gains or charges can distort the period."
  },
  {
    id: "epsGrowthThisYear",
    label: "EPS Growth This Year",
    unit: "percent",
    direction: "higher_is_better",
    whyItMatters: "Near-term EPS pressure can affect the next dividend decision.",
    caution: "Short-term growth should be checked against one-time factors."
  },
  {
    id: "epsGrowth5y",
    label: "EPS Growth 5Y",
    unit: "percent",
    direction: "higher_is_better",
    whyItMatters: "Future dividends require future earnings power.",
    caution: "One-time rebounds can distort growth."
  },
  {
    id: "performanceYear",
    label: "Performance Year",
    unit: "percent",
    direction: "contextual",
    whyItMatters: "A large price move can explain why yield suddenly looks high or low.",
    caution: "Performance is context, not a recommendation signal by itself."
  },
  {
    id: "currentRatio",
    label: "Current Ratio",
    unit: "ratio",
    direction: "higher_is_better",
    whyItMatters: "Short-term liquidity helps companies absorb shocks.",
    caution: "Too much idle liquidity can also signal low reinvestment."
  },
  {
    id: "quickRatio",
    label: "Quick Ratio",
    unit: "ratio",
    direction: "higher_is_better",
    whyItMatters: "Checks liquidity without relying on inventory.",
    caution: "Sector context matters for inventory-heavy businesses."
  },
  {
    id: "ltDebtToEquity",
    label: "LT Debt / Equity",
    unit: "ratio",
    direction: "lower_is_better",
    whyItMatters: "Long-term leverage can limit future dividend flexibility.",
    caution: "Large capital investment cycles can temporarily raise this metric."
  },
  {
    id: "totalDebtToEquity",
    label: "Total Debt / Equity",
    unit: "ratio",
    direction: "lower_is_better",
    whyItMatters: "Total leverage can turn high yield into dividend-cut risk.",
    caution: "Utilities and REITs need sector-aware leverage interpretation."
  }
];

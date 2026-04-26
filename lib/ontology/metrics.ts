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
    id: "operatingMargin",
    label: "Operating Margin",
    unit: "percent",
    direction: "higher_is_better",
    whyItMatters: "Profit buffer protects dividends when revenue softens.",
    caution: "Margin norms differ by sector."
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
    id: "debtToEquity",
    label: "Debt / Equity",
    unit: "ratio",
    direction: "lower_is_better",
    whyItMatters: "Leverage can turn high yield into dividend-cut risk.",
    caution: "Utilities and REITs need sector-aware leverage interpretation."
  }
];

# 配当サムライ / Haitou Samurai v1.1 Design

## Goal

Bring 配当サムライ / Haitou Samurai closer to the original workbook purpose: help users mine dividend candidates, inspect dividend sustainability metrics, and estimate after-tax income without providing investment advice or ticker recommendations.

## Buyer-Facing Positioning

Use buyer language instead of abstract platform language:

- "利回り高いけど大丈夫？"を、数値で確かめる。
- Tax-adjusted dividend income, risk flags, and target-income planning are the product story.
- "Semantic" stays internal; public copy should say dividend research, screening, tax-adjusted income, and user-controlled thresholds.

## Metric Coverage

The MVP should not drop core workbook metrics. The v1.1 data model must include:

- Dividend Yield
- Payout Ratio
- ROE
- ROA
- ROI
- Operating Margin
- Net Profit Margin
- EPS Growth This Year
- EPS Growth Past 5 Years
- Performance Year
- Current Ratio
- Quick Ratio
- LT Debt/Equity
- Total Debt/Equity
- Market Cap
- Dividend Growth Years

## Signal Language

Avoid labels that sound like advice:

- Do not use Buy, Sell, Hold, Recommended, Safe, or Avoid.
- Replace the public grade labels with coverage/review language:
  - High Coverage
  - Monitor
  - Risk Flags
  - Needs Review

The score is a metric-coverage score, not a recommendation.

## Monetization Boundary

Free:

- Sample data dashboard
- Basic dividend screener view
- Single-position after-tax simulation
- Metric explanations

Pro validation:

- Watchlist
- Target dividend income planner
- Saved scenarios
- Custom thresholds
- CSV/Excel export
- Portfolio-level tax simulation

Pro must sell workflow efficiency, not investment judgment.

## Compliance Guardrails

- No personalized ticker advice.
- No buy/sell/hold language.
- No profit, dividend, or FIRE outcome guarantees.
- Any presets must be editable examples, not default recommendations.
- Legal copy should say the service is an educational research and screening tool. Users make their own decisions and should verify data from primary sources.

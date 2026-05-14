# 配当サムライ / Haitou Samurai

**"利回り高いけど大丈夫？"を、数値で確かめる。**

Haitou Samurai is an open-source dividend research dashboard for checking dividend candidates, risk flags, and after-tax income scenarios. It does not recommend tickers. It helps users inspect the numbers they want to verify before doing their own research.

## Demo

- Demo URL: `TODO: add deployed URL`
- Local dashboard: `http://localhost:3000/dashboard`
- GitHub: `https://github.com/Oranquelui/HaitouSamurai`

## What It Does

- Screens dividend candidates across income, coverage, profitability, growth, liquidity, and debt metrics
- Shows risk flags without buy/sell/hold language
- Includes workbook-aligned metrics: dividend yield, payout ratio, ROE, ROA, ROI, operating margin, net margin, EPS growth, one-year performance, current ratio, quick ratio, LT debt/equity, and total debt/equity
- Maps yield against ROE with Chart.js
- Shows a clickable metric table and explanation panel
- Simulates after-tax income from a sample `$10,000` position
- Uses static sample data while live data and portfolio features are still being validated

## What It Does Not Do

Haitou Samurai does not provide investment advice, financial advice, securities recommendations, ticker recommendations, or buy/sell/hold instructions. Scores, tables, charts, and simulations are educational screening outputs only.

Static sample data may be stale, approximate, incomplete, or intentionally simplified. Verify financial data, market data, tax assumptions, exchange rates, and company fundamentals from primary sources before making financial decisions.

## Buyer Problem

Dividend investors repeatedly ask:

- "利回り高いけど大丈夫？"
- "減配リスクのサインはどこを見る？"
- "税引後でいくら残る？"
- "月5万円、月10万円の配当にはどれくらい必要？"
- "Excel管理が面倒。見るべき数字を一画面にまとめたい。"

Haitou Samurai focuses on that workflow: mine candidates, check coverage, simulate after-tax income, and decide what to research next.

## Free vs Pro Direction

Free MVP:

- Sample dashboard
- Basic screening view
- Single-position after-tax simulation
- Metric explanations

Future Pro validation:

- Watchlist
- Target dividend income planner
- Saved scenarios
- Custom thresholds
- CSV/Excel export
- Portfolio-level tax simulation

Pro is intended to sell workflow efficiency, not investment judgment.

## Quick Start

```bash
npm install
npm run dev
```

Open:

```txt
http://localhost:3000
http://localhost:3000/dashboard
```

Verification:

```bash
npm test
npm run lint
npm run build
```

## Tech Stack

- Next.js 16
- React 19
- TypeScript
- Tailwind CSS
- Chart.js 4
- TanStack Table
- Vitest

## Docs

- [Research notes](docs/RESEARCH.md)
- [Legal disclaimer](docs/LEGAL_DISCLAIMER.md)
- [Public launch notes](docs/PUBLIC_LAUNCH.md)
- [配当サムライ v1.1 design](docs/superpowers/specs/2026-05-14-haitou-samurai-v1-1-design.md)

## License

MIT License.

# HaitouSamurai

**Don't chase yield. Study sustainable dividend signals.**

HaitouSamurai is an open-source semantic dividend dashboard for researching dividend sustainability, yield-trap risk, and after-tax income scenarios. It is built for people who want a clear research workflow without treating a model score as investment advice.

> 利回りだけで買うな。配当が“続く理由”を見ろ。

## Demo

- Demo URL: `TODO: add deployed URL`
- Local dashboard: `http://localhost:3000/dashboard`
- GitHub: `https://github.com/Oranquelui/HaitouSamurai`

## What It Does

- Scores dividend sustainability from payout, profitability, growth, liquidity, debt, scale, and dividend history signals
- Flags possible yield-trap conditions for further research
- Shows a Chart.js yield-vs-quality map
- Provides a clickable signal table and explanation panel
- Simulates after-tax income from a sample `$10,000` position
- Uses static sample data so the product flow can be reviewed before live data integration

## What It Does Not Do

HaitouSamurai does not provide investment advice, financial advice, securities recommendations, or buy/sell instructions. Scores, tables, charts, and simulations are educational research outputs only.

Static sample data may be stale, approximate, incomplete, or intentionally simplified. Verify financial data, market data, tax assumptions, exchange rates, and company fundamentals from primary sources before making financial decisions.

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

## Current MVP

- Next.js 16 App Router static MVP
- Landing page with dashboard, GitHub star, and Lifetime Pro waitlist CTAs
- Static dashboard demo with sample stock metrics
- Dividend score calculation tests with Vitest
- Chart.js scatter plot
- TanStack Table signal table
- Legal disclaimer and research notes

## Tech Stack

- Next.js 16
- React 19
- TypeScript
- Tailwind CSS
- Chart.js 4
- TanStack Table
- Vitest

## Roadmap

- Phase 0: Public repository, README, disclaimer, and research-backed positioning
- Phase 1: Static landing page and dashboard MVP
- Phase 2: Reproducible scoring data pipeline
- Phase 3: Live data refresh for Japan, US, and global dividend names
- Phase 4: Optional Lifetime Pro convenience features such as watchlists, exports, data refresh, and private support

## Docs

- [Research notes](docs/RESEARCH.md)
- [Legal disclaimer](docs/LEGAL_DISCLAIMER.md)
- [Public launch notes](docs/PUBLIC_LAUNCH.md)

## License

MIT License.

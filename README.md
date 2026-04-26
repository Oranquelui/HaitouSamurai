# HaitouSamurai

**Don't chase yield. Mine sustainable dividend signals.**

HaitouSamurai is an open-source semantic dividend dashboard for finding sustainable high-yield stock signals. It is designed for dividend investors who want income, but do not want to get trapped by dividend cuts, weak fundamentals, or misleading headline yield.

> 利回りだけで買うな。配当が“続く理由”を見ろ。

## What This Builds

HaitouSamurai turns dividend stock analysis into an explainable dashboard:

- Dividend sustainability scoring
- Yield-trap risk checks
- Payout ratio, ROE/ROA, margin, EPS growth, liquidity, and debt semantics
- Yield vs quality visualization with Chart.js
- After-tax $10k income simulation
- Future Japan/US/global stock data refresh
- Future one-time Lifetime Pro license for convenience features

## Current MVP

This repository now includes a Next.js 16 static MVP:

- Landing page with research-backed positioning
- Telic Recursion / Decision Loop section inspired by the provided concept image
- Static dashboard demo
- Chart.js yield-quality map
- Clickable dividend signal table
- Signal explanation panel
- Tax-adjusted income simulation

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

## Positioning

This is not another generic stock screener.

HaitouSamurai focuses on one question:

```txt
Can this dividend plausibly continue?
```

The project treats outputs as **signals**, not recommendations.

## Planned Stack

- Next.js 16 App Router
- React 19
- TypeScript
- Tailwind CSS
- Chart.js 4
- TanStack Table
- FastAPI + pandas for the future scoring backend

## Roadmap

- Phase 0: Public repository, README, disclaimer, research-backed positioning
- Phase 1: Static landing page and Chart.js dashboard MVP
- Phase 2: Excel-derived scoring logic ported to FastAPI/pandas
- Phase 3: Realtime data integrations and Japan stock support
- Phase 4: Lifetime Pro offer with exports, watchlists, and dividend calendar

## Research Basis

Initial public social research found repeated demand around:

- Dividend income and psychological stability
- New NISA and high-dividend stock allocation
- Avoiding yield traps and dividend cuts
- Explaining why a stock is safe, risky, or worth watching
- Simple checklist-style screening that can be shared on X/GitHub

See:

- `docs/RESEARCH.md`
- `docs/LEGAL_DISCLAIMER.md`
- `docs/superpowers/plans/2026-04-26-haitou-samurai-mvp-lp-plan.md`

## Legal Disclaimer

HaitouSamurai is for educational and research purposes only. It does not provide investment advice, financial advice, securities recommendations, or solicitation to buy or sell any financial product.

All scores, charts, simulations, and signals are informational tools. Users are responsible for their own investment decisions and should consult qualified professionals where appropriate.

## License

MIT License.

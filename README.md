# 配当サムライ / Haitou Samurai

**A public dividend research workflow built with Python data processing and a TypeScript product UI.**

Haitou Samurai demonstrates a public dividend research workflow with a small Python data core, typed artifacts, and a Japanese-first Next.js dashboard for dividend sustainability research.

## Legal Boundary

This project is for educational research and portfolio demonstration. It does not provide investment advice, financial advice, securities recommendations, ticker recommendations, personalized portfolio advice, or specific trading instructions.

Scores, tables, charts, tax estimates, and monthly income simulations are simplified screening outputs. Static sample data may be stale, approximate, incomplete, or intentionally simplified. Verify financial data, market data, tax assumptions, exchange rates, company fundamentals, and tax treatment from primary sources before making financial decisions.

## Implemented

- Python data exporter for public assumptions
- Static sample stock universe generated from public research records
- Japanese dashboard for selecting multiple tickers and sorting metrics
- Dividend sustainability score with coverage, profitability, growth, liquidity, and leverage signals
- 「配当継続力マップ」 with yield-trap zones, ROE guide bands, payout-risk borders, and diagnostic tooltips
- Japan taxable-account estimate using the listed-stock dividend rate of 20.315%
- Monthly and annual after-tax dividend estimates
- 「月5万円まであと」 and required-principal estimate
- Simplified monthly dividend calendar model
- Educational disclaimers and static/sample-data notices

## Planned

- Real deployment URL after the public MVP is hosted
- Portfolio save/load and scenario history
- User-defined thresholds and watchlists
- CSV/export workflow for user-owned analysis
- Actual dividend month handling when reliable source data is available
- Future support for shareholder benefit notes where the data source is explicit
- Legal review before paid, live-data, or personalized portfolio features

## Product Question

Dividend-focused users repeatedly ask:

- 「利回りは高いけど、継続できるのか」
- 「税引後で毎月いくら残るのか」
- 「月5万円の配当には、どれくらい元本が必要か」
- 「配当候補を、見える形にできないか」

Haitou Samurai focuses on that workflow: select candidates, inspect coverage, simulate after-tax income, and decide what to research next.

## Local Preview

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
npm run lint
npm test
npm run build
```

## Python Data Core

Private source files stay outside the repository. To export a public JSON artifact from a local source file:

```bash
npm run data:workbook -- --workbook /path/to/private/source.xlsx --output public/data/workbook-assumptions.json
```

The exporter reads only the fields needed for public assumptions, normalizes labels into JPY reporting language, and omits private source header text.

## Tech Stack

- Next.js 16
- React 19
- TypeScript
- Python 3
- Tailwind CSS
- Chart.js 4
- TanStack Table
- Vitest

## Docs

- [Ontology](docs/ONTOLOGY.md)
- [Language decision](docs/LANGUAGE_DECISION.md)
- [Research notes](docs/RESEARCH.md)
- [Legal disclaimer](docs/LEGAL_DISCLAIMER.md)
- [Public launch notes](docs/PUBLIC_LAUNCH.md)
- [配当サムライ v1.1 design](docs/superpowers/specs/2026-05-14-haitou-samurai-v1-1-design.md)

## License

MIT License.

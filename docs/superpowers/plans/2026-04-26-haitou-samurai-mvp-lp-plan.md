# HaitouSamurai MVP + LP Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Build a public-facing HaitouSamurai MVP that attracts GitHub stars, demonstrates sustainable dividend screening, and creates a clear path to a lifetime-license Pro offer.

**Architecture:** Use a Next.js 16 App Router frontend for the landing page and dashboard, with static seed data exported from the Excel workbook for Phase 1. Keep financial scoring semantics in versioned JSON/TypeScript modules so the dashboard, README, and future FastAPI backend share the same meaning layer.

**Tech Stack:** Next.js 16, React 19, TypeScript, Tailwind CSS, shadcn/ui, Chart.js 4, TanStack Table, FastAPI later in Phase 2, pandas later in Phase 2.

---

## Research Basis

X API recent-search sample collected on 2026-04-26:

- 346 unique public posts
- Japanese: 184
- English: 162
- Strong Japanese themes: dividend income, ranking/checklist content, sustainability metrics
- Strong English themes: yield traps, dividend cuts, ETF income products, payout/FCF checks

Core user job:

```txt
I want dividend income that feels safe, but I do not want to get trapped by high yield, dividend cuts, or unclear fundamentals.
```

Primary positioning:

```txt
Don't chase yield. Mine sustainable dividend signals.
```

Japanese positioning:

```txt
利回りだけで買うな。配当が“続く理由”を見ろ。
```

---

## Target Outcomes

- GitHub visitors understand the project in under 5 seconds.
- Investors can try a live dashboard without installing anything.
- Developers see a clean OSS stack worth starring.
- Recruiters/clients see evidence of product, data, frontend, and finance-domain execution.
- Lifetime License offer is framed as optional Pro access, not as investment advice.

---

## Planned File Structure

Create:

- `package.json` - Next.js 16 app scripts and dependencies.
- `next.config.ts` - Next configuration.
- `tsconfig.json` - TypeScript configuration.
- `tailwind.config.ts` - Tailwind theme tokens.
- `postcss.config.mjs` - Tailwind PostCSS config.
- `app/layout.tsx` - Global layout and metadata.
- `app/page.tsx` - Landing page.
- `app/dashboard/page.tsx` - MVP dashboard route.
- `app/globals.css` - Global styling and visual identity.
- `components/landing/Hero.tsx` - Above-the-fold LP section.
- `components/landing/ProofStrip.tsx` - Research-backed proof points.
- `components/landing/ObjectionSection.tsx` - Objection/counter-objection blocks.
- `components/landing/PricingTeaser.tsx` - OSS vs Lifetime Pro teaser.
- `components/dashboard/YieldQualityScatter.tsx` - Chart.js scatter plot.
- `components/dashboard/DividendSignalTable.tsx` - Ranking table.
- `components/dashboard/SignalExplainer.tsx` - Why this signal panel.
- `components/dashboard/IncomeSimulation.tsx` - $10k after-tax simulation card.
- `lib/ontology/metrics.ts` - Canonical metric definitions.
- `lib/ontology/signals.ts` - Signal grade definitions.
- `lib/scoring/dividend-score.ts` - Phase 1 static scoring logic.
- `lib/data/sample-stocks.ts` - Sanitized sample stock data.
- `lib/disclaimer.ts` - Legal/financial disclaimer copy.
- `README.md` - GitHub-facing project pitch.
- `docs/RESEARCH.md` - X/Reddit/5ch/Yahoo research summary.
- `docs/LEGAL_DISCLAIMER.md` - Detailed disclaimer.

Later Phase 2:

- `api/main.py` - FastAPI entrypoint.
- `api/app/scoring.py` - pandas scoring implementation.
- `api/app/data_sources.py` - yfinance/polygon integration.
- `api/tests/test_scoring.py` - scoring regression tests against Excel-derived fixtures.

---

## Phase 0: Project Foundation

**Goal:** Turn the empty repository plus Excel workbook into a credible OSS project shell.

- [ ] Create Next.js 16 app structure in the repository root.
- [ ] Add TypeScript, Tailwind, Chart.js, TanStack Table, and lint scripts.
- [ ] Add `README.md` with project name, positioning, demo placeholder, disclaimer, and roadmap.
- [ ] Add `docs/LEGAL_DISCLAIMER.md` with explicit non-advice language.
- [ ] Add `docs/RESEARCH.md` summarizing X/Reddit/forum demand signals.
- [ ] Commit: `chore: initialize haitou samurai project shell`

Verification:

```bash
npm install
npm run lint
npm run build
```

Expected: app builds successfully.

---

## Phase 1: Landing Page That Converts

**Goal:** Build a LP optimized for stars, demo clicks, and lifetime-license interest.

Hero message:

```txt
利回りだけで買うな。配当が“続く理由”を見ろ。
```

Primary CTA:

```txt
Star on GitHub
```

Secondary CTA:

```txt
Try Live Demo
```

Tertiary CTA:

```txt
Lifetime Pro Waitlist
```

- [ ] Create `components/landing/Hero.tsx` with dashboard preview mock.
- [ ] Create `components/landing/ProofStrip.tsx` with research-backed user pains: yield traps, dividend cuts, monthly cashflow.
- [ ] Create `components/landing/ObjectionSection.tsx` with O/CO blocks.
- [ ] Create `components/landing/PricingTeaser.tsx` showing OSS free and Lifetime Pro future.
- [ ] Wire sections into `app/page.tsx`.
- [ ] Add strong disclaimer near CTAs.
- [ ] Commit: `feat: add conversion-focused landing page`

Verification:

```bash
npm run build
```

Expected: no TypeScript or build errors.

---

## Phase 2: Semantic Dividend Dashboard MVP

**Goal:** Show the product's core promise with static data before backend integration.

Required UI:

- Yield vs ROE scatter chart.
- Bubble size = market cap.
- Color = dividend sustainability signal.
- Ranking table.
- Signal explainer.
- $10k simulation with tax and JPY conversion assumptions.

- [ ] Create `lib/ontology/metrics.ts` with payout, ROE, ROA, margin, EPS growth, current ratio, quick ratio, debt/equity, dividend yield.
- [ ] Create `lib/ontology/signals.ts` with `Strong`, `Watch`, `Risk`, `Avoid` definitions.
- [ ] Create `lib/data/sample-stocks.ts` with sanitized sample data from the Excel workbook or manually curated placeholder records.
- [ ] Create `lib/scoring/dividend-score.ts` with deterministic scoring logic.
- [ ] Create `components/dashboard/YieldQualityScatter.tsx` using Chart.js.
- [ ] Create `components/dashboard/DividendSignalTable.tsx` using TanStack Table.
- [ ] Create `components/dashboard/SignalExplainer.tsx` to explain score components.
- [ ] Create `components/dashboard/IncomeSimulation.tsx` for $10k simulation.
- [ ] Wire dashboard into `app/dashboard/page.tsx`.
- [ ] Commit: `feat: add semantic dividend dashboard mvp`

Verification:

```bash
npm run build
```

Expected: dashboard renders with static data and no hydration errors.

---

## Phase 3: GitHub Star Engine

**Goal:** Make the repository star-worthy before public launch.

- [ ] Add README hero image or screenshot.
- [ ] Add GIF/demo placeholder.
- [ ] Add architecture diagram.
- [ ] Add `Why not just chase yield?` section.
- [ ] Add `Roadmap` section.
- [ ] Add `Contributing` section.
- [ ] Add `Not financial advice` section.
- [ ] Commit: `docs: improve github launch materials`

Verification:

```bash
npm run build
```

Expected: docs and app still build.

---

## Phase 4: Pro Offer Teaser

**Goal:** Validate willingness to pay without building full licensing yet.

Free OSS:

- Static dashboard.
- Basic scoring.
- Sample global stocks.
- README documentation.

Future Lifetime Pro:

- Real-time data refresh.
- Japan stock presets.
- Export CSV.
- Watchlist.
- Dividend calendar.
- Advanced yield-trap detector.
- Private Discord access.

- [ ] Add `Lifetime Pro` teaser to LP.
- [ ] Add waitlist CTA or payment placeholder.
- [ ] Add clear copy: `One-time purchase, no subscription.`
- [ ] Add copy: `Educational research tool. Not investment advice.`
- [ ] Commit: `feat: add lifetime pro teaser`

Verification:

```bash
npm run build
```

Expected: Pro copy exists without implying guaranteed investment outcomes.

---

## Phase 5: FastAPI + Excel Logic Port

**Goal:** Move from static demo to reproducible data pipeline.

- [ ] Export workbook sheets to CSV fixtures.
- [ ] Create `api/main.py`.
- [ ] Create `api/app/scoring.py`.
- [ ] Write tests comparing Python output against known Excel-derived rows.
- [ ] Add endpoint: `GET /signals`.
- [ ] Add endpoint: `GET /signals/{ticker}`.
- [ ] Add endpoint: `POST /simulate`.
- [ ] Connect Next.js dashboard to API behind feature flag.
- [ ] Commit: `feat: add fastapi scoring backend`

Verification:

```bash
pytest api/tests -q
npm run build
```

Expected: scoring tests pass and frontend builds.

---

## CRO Objection Map

| Objection | Counter-Objection |
|---|---|
| Is this investment advice? | No. It is an educational screening and visualization tool. |
| Can I trust the score? | Every signal explains its component metrics and assumptions. |
| Is high dividend always good? | No. The product explicitly detects yield traps and payout risk. |
| Why not use Yahoo/TradingView? | HaitouSamurai focuses on semantic dividend sustainability, not generic charting. |
| Is it hard to use? | The live demo requires no install; developers can self-host from GitHub. |
| Why pay if OSS is free? | Lifetime Pro pays for convenience: data refresh, exports, presets, and private support. |

---

## Launch Checklist

- [ ] Local build passes.
- [ ] README has screenshots.
- [ ] LP has strong hero and CTA.
- [ ] Dashboard has at least 30 sample stocks.
- [ ] Disclaimer appears in README, LP, and dashboard.
- [ ] GitHub repo has topics: `dividend`, `finance`, `nextjs`, `chartjs`, `fastapi`, `stock-screener`, `open-source`.
- [ ] Publish Vercel demo.
- [ ] Post launch thread on X.
- [ ] Post technical article on Zenn/Qiita.
- [ ] Post English version to Reddit only after disclaimer and demo are polished.

---

## Timeline

- Day 1: Project shell, README, disclaimer, research doc.
- Day 2: LP hero, proof sections, CTA flow.
- Day 3: Static sample data and ontology layer.
- Day 4: Chart.js scatter and ranking table.
- Day 5: Signal explainer and $10k simulation.
- Day 6: README screenshots, GitHub polish, deploy.
- Day 7: Launch copy, X thread, Zenn/Qiita article.
- Week 2: FastAPI scoring backend and Excel regression fixtures.
- Week 3: Realtime data and Pro waitlist/payment validation.

---

## Do Not Do Yet

- Do not lead with CTMU.
- Do not promise prediction accuracy.
- Do not call outputs `recommendations`.
- Do not build licensing before waitlist/payment interest is validated.
- Do not overbuild RDF/OWL ontology in Phase 1.
- Do not use browser MCPs globally or startup auto-connect browser tooling.

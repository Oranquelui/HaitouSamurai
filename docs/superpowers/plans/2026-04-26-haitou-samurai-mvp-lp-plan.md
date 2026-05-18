# HaitouSamurai MVP + LP Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Build a public-facing HaitouSamurai MVP that demonstrates sustainable dividend screening, gives reviewers a clear product path, and keeps future commercial ideas separated from the educational launch surface.

**Architecture:** Use a Next.js 16 App Router frontend for the landing page and dashboard, with static seed data exported from public-safe source snapshots for Phase 1. Keep financial scoring semantics in versioned JSON/TypeScript modules so the dashboard, README, and future FastAPI backend share the same meaning layer.

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

- Public reviewers understand the project in under 5 seconds.
- Investors can try a live dashboard without installing anything.
- Developers see a clean product/data stack worth inspecting.
- Recruiters/clients see evidence of product, data, frontend, and finance-domain execution.
- Future commercial ideas are framed as optional workflow convenience, not as investment advice.

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
- `components/landing/PricingTeaser.tsx` - Future workflow roadmap teaser.
- `components/dashboard/YieldQualityScatter.tsx` - Chart.js scatter plot.
- `components/dashboard/DividendSignalTable.tsx` - Ranking table.
- `components/dashboard/SignalExplainer.tsx` - Why this signal panel.
- `components/dashboard/IncomeSimulation.tsx` - User-set after-tax simulation card.
- `lib/ontology/metrics.ts` - Canonical metric definitions.
- `lib/ontology/signals.ts` - Signal grade definitions.
- `lib/scoring/dividend-score.ts` - Phase 1 static scoring logic.
- `lib/data/sample-stocks.ts` - Sanitized sample stock data.
- `lib/disclaimer.ts` - Legal/financial disclaimer copy.
- `README.md` - Public-facing project pitch.
- `docs/RESEARCH.md` - X/Reddit/5ch/Yahoo research summary.
- `docs/LEGAL_DISCLAIMER.md` - Detailed disclaimer.

Later Phase 2:

- `api/main.py` - FastAPI entrypoint.
- `api/app/scoring.py` - pandas scoring implementation.
- `api/app/data_sources.py` - yfinance/polygon integration.
- `api/tests/test_scoring.py` - scoring regression tests against source-derived fixtures.

---

## Phase 0: Project Foundation

**Goal:** Turn the empty repository plus public-safe source snapshots into a credible project shell.

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

**Goal:** Build a LP optimized for simulator entry, user clarity, and public trust.

Hero message:

```txt
利回りだけで買うな。配当が“続く理由”を見ろ。
```

Primary CTA:

```txt
配当を試算する
```

Secondary CTA:

```txt
使い方を見る
```

Tertiary CTA:

```txt
今後の機能を見る
```

- [ ] Create `components/landing/Hero.tsx` with dashboard preview mock.
- [ ] Create `components/landing/ProofStrip.tsx` with research-backed user pains: yield traps, dividend cuts, monthly cashflow.
- [ ] Create `components/landing/ObjectionSection.tsx` with O/CO blocks.
- [ ] Create `components/landing/PricingTeaser.tsx` showing public demo scope and future workflow ideas.
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
- User-set simulation with tax and JPY conversion assumptions.

- [ ] Create `lib/ontology/metrics.ts` with payout, ROE, ROA, margin, EPS growth, current ratio, quick ratio, debt/equity, dividend yield.
- [ ] Create `lib/ontology/signals.ts` with `Strong`, `Watch`, `Risk`, `Avoid` definitions.
- [ ] Create `lib/data/sample-stocks.ts` with sanitized sample data from public-safe source records or manually curated placeholder records.
- [ ] Create `lib/scoring/dividend-score.ts` with deterministic scoring logic.
- [ ] Create `components/dashboard/YieldQualityScatter.tsx` using Chart.js.
- [ ] Create `components/dashboard/DividendSignalTable.tsx` using TanStack Table.
- [ ] Create `components/dashboard/SignalExplainer.tsx` to explain score components.
- [ ] Create `components/dashboard/IncomeSimulation.tsx` for user-set investment simulation.
- [ ] Wire dashboard into `app/dashboard/page.tsx`.
- [ ] Commit: `feat: add semantic dividend dashboard mvp`

Verification:

```bash
npm run build
```

Expected: dashboard renders with static data and no hydration errors.

---

## Phase 3: Public Repo Evidence

**Goal:** Make the repository review-ready before public launch.

- [ ] Add README hero image or screenshot.
- [ ] Add GIF/demo placeholder.
- [ ] Add architecture diagram.
- [ ] Add `Why not just chase yield?` section.
- [ ] Add `Roadmap` section.
- [ ] Add `Contributing` section.
- [ ] Add `Not financial advice` section.
- [ ] Commit: `docs: improve public launch materials`

Verification:

```bash
npm run build
```

Expected: docs and app still build.

---

## Phase 4: Future Workflow Teaser

**Goal:** Validate future workflow interest without building paid features yet.

Public demo:

- Static dashboard.
- Basic scoring.
- Sample global stocks.
- README documentation.

Future workflow ideas:

- Real-time data refresh.
- Japan stock presets.
- Export CSV.
- Watchlist.
- Dividend calendar.
- Advanced yield-trap detector.
- Private support notes if a paid product is legally reviewed later.

- [ ] Add future workflow teaser to LP.
- [ ] Add feedback CTA placeholder.
- [ ] Add clear copy that no paid feature is offered before legal review.
- [ ] Add copy: `Educational research tool. Not investment advice.`
- [ ] Commit: `feat: add future workflow teaser`

Verification:

```bash
npm run build
```

Expected: future workflow copy exists without implying guaranteed investment outcomes.

---

## Phase 5: FastAPI + Source Logic Port

**Goal:** Move from static demo to reproducible data pipeline.

- [ ] Export source snapshots to CSV fixtures.
- [ ] Create `api/main.py`.
- [ ] Create `api/app/scoring.py`.
- [ ] Write tests comparing Python output against known source-derived rows.
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
| Is it hard to use? | The live demo requires no install; developers can self-host the project. |
| Why a future product? | Future workflow convenience could cover data refresh, exports, presets, and support after legal review. |

---

## Launch Checklist

- [ ] Local build passes.
- [ ] README has screenshots.
- [ ] LP has strong hero and CTA.
- [ ] Dashboard has at least 30 sample stocks.
- [ ] Disclaimer appears in README, LP, and dashboard.
- [ ] Repository has topics: `dividend`, `finance`, `nextjs`, `chartjs`, `fastapi`, `stock-screener`, `open-source`.
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
- Day 5: Signal explainer and user-set simulation.
- Day 6: README screenshots, public repo polish, deploy.
- Day 7: Launch copy, X thread, Zenn/Qiita article.
- Week 2: FastAPI scoring backend and source regression fixtures.
- Week 3: Realtime data and future paid-feature validation.

---

## Do Not Do Yet

- Do not lead with CTMU.
- Do not promise prediction accuracy.
- Do not call outputs `recommendations`.
- Do not build licensing before user interest is validated.
- Do not overbuild RDF/OWL ontology in Phase 1.
- Do not use browser MCPs globally or startup auto-connect browser tooling.

# Haitou Samurai Ontology

Haitou Samurai is not an investment advice product. It is an open-source data product for public dividend research: typed data processing, visible metric definitions, and an explainable TypeScript/Next.js dashboard.

```txt
Private source records -> meaning layer -> typed data processing -> visible dashboard
```

The project demonstrates how raw dividend research inputs become a public-safe product surface with explicit assumptions, repeatable tests, and clear user-control boundaries.

## Scope

This ontology covers the product-core layer:

- What public objects the product exposes
- How dividend-related metrics relate to listed assets
- How source records map into pipeline and dashboard artifacts
- How USD source data is converted into JPY reporting views
- How source labels are normalized before publication

It does not define buy/sell recommendations, portfolio advice, target allocations, personal suitability, or model portfolios.

## Canonical Entities

| Entity | Meaning | Owner | Identifier |
|---|---|---|---|
| `SourceSnapshot` | A private local input snapshot used to create public-safe artifacts | Human operator | source filename + run timestamp |
| `Asset` | A listed security row such as a stock or ETF | Source data provider | ticker + exchange/country context |
| `AssetMetadata` | Company, country, exchange, sector, industry, IPO date, employees | Source data provider | ticker + metadata timestamp |
| `MetricDefinition` | A named metric with unit, direction, meaning, and caution | Haitou Samurai ontology | metric id |
| `MetricObservation` | A metric value for an asset at a source snapshot | Pipeline | asset id + metric id + snapshot id |
| `DividendSignal` | A qualitative screening label derived from metric observations | Scoring module | asset id + scoring version |
| `RiskFlag` | A specific caution surfaced by the scoring model | Scoring module | asset id + risk reason |
| `IncomeSimulation` | A scenario result from budget, yield, FX, and tax assumptions | Simulation module | scenario id |
| `CurrencyAssumption` | Source/reporting currency, FX rate, tax rule, and rate | Ontology module | assumption id |
| `DashboardView` | A visible UI composition of metrics, signals, charts, and tables | Frontend | route + component name |

## Relationship Map

```txt
SourceSnapshot produces PipelineInput
PipelineInput produces public artifact

Asset has AssetMetadata
Asset has many MetricObservation
MetricObservation conforms to MetricDefinition
MetricObservation contributes to DividendSignal
DividendSignal contains RiskFlag

IncomeSimulation uses Asset
IncomeSimulation uses CurrencyAssumption
IncomeSimulation reports gross income and tax-adjusted income

DashboardView renders Asset, MetricObservation, DividendSignal, RiskFlag, and IncomeSimulation
```

## Public Source Mapping

| Source area | Ontology role | Public interpretation |
|---|---|---|
| Metric notes | Metric meaning layer | Human-written metric semantics, including why a ratio matters for dividend screening |
| Raw market rows | Source layer | Imported market/fundamental source table |
| Current price data | Current price and metadata layer | Price, market cap, exchange, instrument type, country, and active source metadata |
| Canonical asset metrics | Normalized asset table | Asset rows and core dividend/fundamental metrics |
| Analysis-ready view | Screening view | Filterable metrics organized for research |
| Simulation view | Income estimate layer | Budget, quantity, gross dividend, reporting-currency income, and tax-adjusted income |
| Summary view | Aggregation layer | Sector and industry summary pivots |

## Currency Semantics

The current public assumption is a JPY reporting variant.

Canonical interpretation:

| Concept | Canonical value |
|---|---|
| Source currency | `USD` |
| Reporting currency | `JPY` |
| Inspected FX value | `145.96` |
| Gross reporting formula | `gross_usd * usd_jpy` |
| Tax-adjusted reporting formula | `gross_jpy - taxable_portion * tax_rate` |
| Tax rate | `20.315%` Japan listed-securities assumption: income and reconstruction tax `15.315%` + local tax `5%` |
| Tax source | National Tax Agency No.1331 |

Source header drift is not carried into public documentation or UI. The active calculations use JPY reporting columns and public Japanese labels.

The public code applies the Japan listed-securities tax assumption only to the taxable portion of the reporting amount. That prevents sub-rule income from being increased by a generalized formula.

## Unit System

| Audience | Unit | Why |
|---|---|---|
| Public reader | Dashboard view | Understand what the project visualizes |
| Developer reviewer | TypeScript module / test | Verify reproducible semantics |
| Product reviewer | Data-to-product transformation | See source-to-dashboard modeling skill |
| Data pipeline | Asset metric observation | Normalize wide source rows |
| Simulation | Scenario | Keep FX, budget, yield, and tax assumptions explicit |
| Trust boundary | Assumption | Separate visible data processing from advice |

## Mapping To Code

| Ontology area | Code artifact |
|---|---|
| Source ingestion | `data_core/haitou_samurai/*` |
| Public assumption export | `data_core/scripts/*` |
| Metric definitions | `lib/ontology/metrics.ts` |
| Signal definitions | `lib/ontology/signals.ts` |
| Currency semantics | `lib/ontology/currency.ts` |
| Static sample assets | `lib/data/sample-stocks.ts` |
| Scoring behavior | `lib/scoring/dividend-score.ts` |
| Dashboard view | `components/dashboard/*` |
| Landing page narrative | `components/landing/*` |
| Trust boundary | `lib/disclaimer.ts`, `docs/LEGAL_DISCLAIMER.md` |

## Public Boundary

Use these labels:

- `Signal`
- `Screening`
- `Metric`
- `Risk flag`
- `Simulation`
- `Assumption`
- `Educational research output`

Avoid these labels:

- `Recommendation`
- `Buy`
- `Sell`
- `Hold`
- `Safe stock`
- `Guaranteed income`
- `Best ticker`
- `Personal advice`

## Open Ambiguities

- Whether the current JPY reporting rule should remain fixed or become user-configurable.
- Whether JPY reporting should be the default public view or one selectable reporting currency among several.
- Whether future live data should be imported directly or treated as a separate source snapshot table for auditability.

# Haitou Samurai Ontology

Haitou Samurai is not an investment advice product. It is an open-source data product that reconstructs a personal dividend-mining workbook into Python-oriented data processing, visible metric definitions, and an explainable TypeScript/Next.js dashboard.

```txt
Workbook logic -> meaning layer -> typed data processing -> visible dashboard
```

The project is intended to show FDE-style work: take an operational spreadsheet, extract the meaning layer, model the entities and relationships, make the transformation reproducible, and expose the results in a product UI.

## Scope

This ontology covers the product-core layer:

- What objects the workbook is made of
- How dividend-related metrics relate to assets
- How workbook pivots map into pipeline and dashboard artifacts
- How USD source data is converted into JPY reporting views
- How workbook labels are normalized before publication

It does not define buy/sell recommendations, portfolio advice, target allocations, personal suitability, or model portfolios.

## Canonical Entities

| Entity | Meaning | Owner | Identifier |
|---|---|---|---|
| `WorkbookSource` | The original Excel artifact and its sheet-level workflow | Human operator | workbook filename + sheet name |
| `Asset` | A listed security row such as a stock or ETF | Source data provider / workbook import | ticker + exchange/country context |
| `AssetMetadata` | Company, country, exchange, sector, industry, IPO date, employees | Source data provider | ticker + metadata timestamp |
| `MetricDefinition` | A named metric with unit, direction, meaning, and caution | Haitou Samurai ontology | metric id |
| `MetricObservation` | A metric value for an asset at a source snapshot | Pipeline | asset id + metric id + snapshot id |
| `DividendSignal` | A qualitative screening label derived from metric observations | Scoring module | asset id + scoring version |
| `RiskFlag` | A specific caution surfaced by the scoring model | Scoring module | asset id + risk reason |
| `IncomeSimulation` | A scenario result from budget, yield, FX, and tax assumptions | Simulation module | scenario id |
| `CurrencyAssumption` | Source/reporting currency, FX rate, tax threshold, and tax rate | Ontology module | assumption id + workbook cell reference |
| `DashboardView` | A visible UI composition of metrics, signals, charts, and tables | Frontend | route + component name |

## Relationship Map

```txt
WorkbookSource contains Sheet
Sheet produces WorkbookView
WorkbookView becomes PipelineInput

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

## Workbook Sheet Mapping

| Workbook sheet | Ontology role | Public interpretation |
|---|---|---|
| `Legend` | Metric meaning layer | Human-written metric semantics, including why a ratio matters for dividend mining |
| `All sorce` | Raw source layer | Wide imported market/fundamental source table |
| `Active Price data` | Current price and metadata layer | Price, market cap, exchange, instrument type, country, and active source metadata |
| `Pivot Native` | Canonical asset metric table | Normalized asset rows and core dividend/fundamental metrics |
| `custom pivot` | Analysis-ready view | Filterable metrics organized for screening |
| `Export Pivot from cust` | Simulation view | Budget, buy quantity, gross dividend, reporting-currency income, and tax-adjusted income |
| `Pivot For summary` | Aggregation layer | Sector and industry summary pivots |
| `Summary` | Reserved output layer | Empty in the inspected workbook |

## Currency Semantics

The inspected workbook is:

```txt
/Users/louistoyozaki/Desktop/Dividend mining project plan_rev0_JPY.xlsx
```

It is treated as a JPY reporting variant.

Canonical interpretation:

| Concept | Canonical value |
|---|---|
| Source currency | `USD` |
| Reporting currency | `JPY` |
| FX cell | `Export Pivot from cust!AJ3` |
| Inspected FX value | `145.96` |
| Gross reporting formula | `gross_usd * usd_jpy` |
| Tax-adjusted reporting formula | `gross_jpy - tax_on_amount_above_threshold` |
| Tax rate | `20.315%` Japan listed-securities assumption: income and reconstruction tax `15.315%` + local tax `5%` |
| Tax source | National Tax Agency No.1331 |
| Tax threshold | `2,500,000 JPY` |

Workbook header normalization:

| Sheet | Cell | Public canonical label | Policy |
|---|---|---|---|
| `Export Pivot from cust` | `AF2` | `Budget JPY` | Rewrite to JPY before publication |

Source header drift is not carried into public documentation or UI. The active calculations use the JPY FX cell and JPY reporting columns.

The source workbook formula pattern is:

```txt
gross_jpy - tax_on_amount_above_2500000_jpy
```

The public code applies the Japan listed-securities tax assumption only to the amount above the threshold. That prevents sub-threshold income from being increased by the formula when generalized beyond the original workbook rows.

## Unit System

| Audience | Unit | Why |
|---|---|---|
| Public reader | Dashboard view | Understand what the project visualizes |
| Developer reviewer | TypeScript module / test | Verify reproducible semantics |
| FDE portfolio reviewer | Excel-to-product transformation | See operational spreadsheet conversion skill |
| Data pipeline | Asset metric observation | Normalize wide spreadsheet rows |
| Simulation | Scenario | Keep FX, budget, yield, and tax assumptions explicit |
| Trust boundary | Assumption | Separate visible data processing from advice |

## Mapping To Code

| Ontology area | Code artifact |
|---|---|
| Workbook ingestion | `data_core/haitou_samurai/workbook_xlsx.py` |
| Workbook assumption export | `data_core/haitou_samurai/workbook_artifact.py` |
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

- Whether the `2,500,000 JPY` tax threshold should remain a sample workbook assumption or become a user-configurable scenario input.
- Whether JPY reporting should be the default public view or one selectable reporting currency among several.
- Whether the original source-language metric notes should be preserved as comments, translated into English/Japanese, or both.
- Whether future live data should be imported directly or treated as a separate source snapshot table for auditability.

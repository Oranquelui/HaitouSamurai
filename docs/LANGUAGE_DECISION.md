# Language Decision

Decision: use Python for the data core and TypeScript/Next.js for the product surface.

## Why This Stack

Python is the right first language for the workbook-to-data layer:

- It is strong for spreadsheet ingestion, tabular transforms, metric normalization, and reproducible batch jobs.
- It keeps the original workbook logic close to the data-processing code.
- It is easy to review as an FDE portfolio artifact because inputs, assumptions, and output records can be tested directly.

TypeScript and Next.js are the right first stack for the public product:

- The repository already uses Next.js, React, TypeScript, Tailwind, Chart.js, TanStack Table, and Vitest.
- TypeScript keeps dashboard props, scoring records, assumptions, and UI state explicit.
- Next.js gives a clear path from static portfolio demo to route handlers and API-backed screens later.

## Not Chosen For MVP

Go is a later option for high-concurrency ingestion workers, scheduled API services, or a small backend binary. It is not needed before the data model and dashboard interactions are stable.

Rust is a later option for performance-sensitive parsers, local binaries, or safety-critical transformations. It is too expensive for the current MVP because the hard part is semantic modeling, not CPU speed.

## Target Shape

```txt
Workbook / source snapshots
  -> Python ingestion and normalization in data_core/
  -> JSON or Parquet typed artifacts
  -> TypeScript domain types
  -> Next.js dashboard and public demo
```

The public story should be:

```txt
Python data core + TypeScript product UI
```

Avoid positioning the project as an advice engine, ticker picker, or model portfolio.

## Current Implementation

- `data_core/haitou_samurai/workbook_xlsx.py` reads selected cells from `.xlsx` files using the Python standard library.
- `data_core/haitou_samurai/workbook_artifact.py` exports the public currency/tax assumption artifact.
- `data_core/scripts/export_workbook_artifact.py` is the CLI entrypoint.
- `npm test` runs both Vitest and Python `unittest` checks.

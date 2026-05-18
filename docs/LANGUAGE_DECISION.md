# Language Decision

Decision: use Python for the data core and TypeScript/Next.js for the product surface.

## Why This Stack

Python is the right first language for the source-data layer:

- It is strong for tabular ingestion, metric normalization, and reproducible batch jobs.
- It keeps assumptions and output records easy to test directly.
- It can run locally without requiring a hosted backend for the MVP.

TypeScript and Next.js are the right first stack for the public product:

- The repository already uses Next.js, React, TypeScript, Tailwind, Chart.js, TanStack Table, and Vitest.
- TypeScript keeps dashboard props, scoring records, assumptions, and UI state explicit.
- Next.js gives a clear path from static portfolio demo to route handlers and API-backed screens later.

## Not Chosen For MVP

Go is a later option for high-concurrency ingestion workers, scheduled API services, or a small backend binary. It is not needed before the data model and dashboard interactions are stable.

Rust is a later option for performance-sensitive parsers, local binaries, or safety-critical transformations. It is too expensive for the current MVP because the hard part is semantic modeling, not CPU speed.

## Target Shape

```txt
Private source snapshots
  -> Python ingestion and normalization in data_core/
  -> Public-safe JSON artifacts
  -> TypeScript domain types
  -> Next.js dashboard and public demo
```

The public story should be:

```txt
Python data core + TypeScript product UI
```

Avoid positioning the project as an advice engine, ticker picker, or model portfolio.

## Current Implementation

- Python exporters create public assumption and sample-stock artifacts.
- TypeScript modules define currency assumptions, metric definitions, and scoring behavior.
- `npm test` runs both Vitest and Python `unittest` checks.

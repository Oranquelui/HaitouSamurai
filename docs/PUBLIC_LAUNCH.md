# Public Launch Notes

配当サムライ / Haitou Samurai should be framed as a public dividend research workflow with Python data processing, typed artifacts, and a TypeScript dashboard.

Public sample:

- https://haitou-samurai.oranque.jp
- Dashboard: https://haitou-samurai.oranque.jp/dashboard
- Release v1.1.0: https://github.com/Oranquelui/HaitouSamurai/releases/tag/v1.1.0

## Trust Boundary

- Educational research output only.
- Static/sample data is not real-time market data.
- Screens, scores, charts, and tax estimates are simplified.
- The app does not provide investment advice, securities recommendations, personalized portfolio advice, or specific trading instructions.
- Users must verify data, tax assumptions, exchange rates, and company fundamentals from primary sources.

## Implemented

- Hosted public URL and dashboard route.
- Japanese landing path to the dashboard simulator.
- Multi-stock selection and sortable dividend metric table.
- Japan taxable-account estimate using 20.315% for listed-stock dividend scenarios.
- Monthly/annual after-tax income, gap to monthly ¥50,000, and required-principal estimate.
- Dividend sustainability map with yield-trap zones and payout-risk borders.
- Simplified monthly dividend calendar model, clearly labeled as not actual payment months.
- Public disclaimers and static-data notices.

## Planned

- Screenshot or short demo video for README/docs.
- Saved scenarios and watchlists.
- Custom screening rules and user-owned export.
- Reliable payout-month data if an explicit source is added.
- Shareholder benefit notes only when source data is explicit.
- Legal review before paid, live-data, or personalized portfolio features.

## Public Copy Direction

- Primary CTA: `配当を試算する`
- Avoid implementation-first framing on the first screen.
- Keep Python/TypeScript details in docs, not in the user-facing dashboard hero.
- Use 「配当あり銘柄」, 「税引後手取り」, 「月5万円配当」, 「減配リスク」, and 「配当継続力」 as user-facing concepts.
- Do not sell model portfolios, personal advice, member-only ticker lists, or trading instructions.

import { simulateIncome } from "@/lib/scoring/dividend-score";
import type { StockSignalRecord } from "@/lib/data/sample-stocks";

const yen = new Intl.NumberFormat("ja-JP", { style: "currency", currency: "JPY", maximumFractionDigits: 0 });
const usd = new Intl.NumberFormat("en-US", { style: "currency", currency: "USD", maximumFractionDigits: 0 });

export function IncomeSimulation({ stock }: { stock: StockSignalRecord }) {
  const sim = simulateIncome({ investmentUsd: 10_000, dividendYield: stock.dividendYield, taxRate: 0.22, usdJpy: 155 });

  return (
    <div className="glow-panel rounded-[1.75rem] p-5">
      <p className="kicker">$10k Simulation</p>
      <h2 className="mt-1 text-2xl font-black text-white">After-tax income lens</h2>
      <div className="mt-5 grid gap-3 sm:grid-cols-3">
        <Card label="Gross / year" value={usd.format(sim.grossAnnualUsd)} />
        <Card label="Net / month" value={usd.format(sim.netMonthlyUsd)} />
        <Card label="Net / year JPY" value={yen.format(sim.netAnnualJpy)} />
      </div>
      <p className="mt-4 text-xs leading-6 text-slate-500">Assumes $10,000 investment, 22% tax, and USD/JPY 155. Static demo only.</p>
    </div>
  );
}

function Card({ label, value }: { label: string; value: string }) {
  return (
    <div className="rounded-2xl border border-amber-300/15 bg-amber-300/10 p-4">
      <p className="text-xs uppercase tracking-[0.16em] text-amber-100/70">{label}</p>
      <p className="mt-2 text-2xl font-black text-amber-100">{value}</p>
    </div>
  );
}

import type { StockSignalRecord } from "@/lib/data/sample-stocks";
import { signalColorByGrade } from "@/lib/ontology/signals";

export function SignalExplainer({ stock }: { stock: StockSignalRecord }) {
  return (
    <aside className="glow-panel rounded-[1.75rem] p-5">
      <div className="flex items-start justify-between gap-4">
        <div>
          <p className="kicker">Why This Signal?</p>
          <h2 className="mt-1 text-3xl font-black text-white">{stock.ticker}</h2>
          <p className="mt-1 text-sm text-slate-400">{stock.name}</p>
        </div>
        <div className="rounded-2xl px-4 py-3 text-center" style={{ backgroundColor: `${signalColorByGrade[stock.signal.grade]}22`, color: signalColorByGrade[stock.signal.grade] }}>
          <p className="text-3xl font-black">{stock.signal.score}</p>
          <p className="text-xs font-black uppercase">{stock.signal.grade}</p>
        </div>
      </div>
      <div className="mt-6 grid grid-cols-2 gap-3 text-sm">
        <Metric label="Yield" value={`${stock.dividendYield.toFixed(1)}%`} />
        <Metric label="Payout" value={`${stock.payoutRatio.toFixed(0)}%`} />
        <Metric label="ROE" value={`${stock.roe.toFixed(1)}%`} />
        <Metric label="Debt/Eq" value={stock.debtToEquity.toFixed(2)} />
      </div>
      <div className="mt-6 space-y-4">
        <div>
          <p className="text-sm font-black text-emerald-200">Positive conditions</p>
          <ul className="mt-3 space-y-2 text-sm leading-6 text-slate-300">
            {stock.signal.reasons.slice(0, 4).map((reason) => <li key={reason}>+ {reason}</li>)}
            {stock.signal.reasons.length === 0 ? <li>No strong positive condition found in static demo data.</li> : null}
          </ul>
        </div>
        <div>
          <p className="text-sm font-black text-rose-200">Risks to verify</p>
          <ul className="mt-3 space-y-2 text-sm leading-6 text-slate-300">
            {stock.signal.risks.slice(0, 4).map((risk) => <li key={risk}>- {risk}</li>)}
            {stock.signal.risks.length === 0 ? <li>No major risk flag in the demo scoring model.</li> : null}
          </ul>
        </div>
      </div>
    </aside>
  );
}

function Metric({ label, value }: { label: string; value: string }) {
  return (
    <div className="rounded-2xl border border-white/10 bg-white/[0.035] p-3">
      <p className="text-xs uppercase tracking-[0.16em] text-slate-500">{label}</p>
      <p className="mt-1 text-lg font-black text-white">{value}</p>
    </div>
  );
}

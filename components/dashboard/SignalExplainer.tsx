import type { StockSignalRecord } from "@/lib/data/sample-stocks";
import { signalColorByGrade } from "@/lib/ontology/signals";
import type { ReactNode } from "react";

export function SignalExplainer({ stock }: { stock: StockSignalRecord }) {
  return (
    <aside className="glow-panel rounded-[1.75rem] p-5">
      <div className="flex items-start justify-between gap-4">
        <div>
          <p className="kicker">Why This Review Label?</p>
          <h2 className="mt-1 text-3xl font-black text-white">{stock.ticker}</h2>
          <p className="mt-1 text-sm text-slate-400">{stock.name}</p>
        </div>
        <div className="rounded-2xl px-4 py-3 text-center" style={{ backgroundColor: `${signalColorByGrade[stock.signal.grade]}22`, color: signalColorByGrade[stock.signal.grade] }}>
          <p className="text-3xl font-black">{stock.signal.score}</p>
          <p className="text-xs font-black uppercase">{stock.signal.grade}</p>
        </div>
      </div>

      <div className="mt-6 space-y-4">
        <MetricGroup title="Income / Coverage">
          <Metric label="Yield" value={percent(stock.dividendYield)} />
          <Metric label="Payout" value={percent(stock.payoutRatio, 0)} />
          <Metric label="Operating Margin" value={percent(stock.operatingMargin)} />
          <Metric label="Net Margin" value={percent(stock.netProfitMargin)} />
        </MetricGroup>

        <MetricGroup title="Profitability / Growth">
          <Metric label="ROE" value={percent(stock.roe)} />
          <Metric label="ROA" value={percent(stock.roa)} />
          <Metric label="ROI" value={percent(stock.returnOnInvestment)} />
          <Metric label="EPS This Year" value={percent(stock.epsGrowthThisYear)} />
          <Metric label="EPS 5Y" value={percent(stock.epsGrowth5y)} />
          <Metric label="Perf Year" value={percent(stock.performanceYear)} />
        </MetricGroup>

        <MetricGroup title="Liquidity / Debt">
          <Metric label="Current" value={ratio(stock.currentRatio)} />
          <Metric label="Quick" value={ratio(stock.quickRatio)} />
          <Metric label="LT D/E" value={ratio(stock.ltDebtToEquity)} />
          <Metric label="Total D/E" value={ratio(stock.totalDebtToEquity)} />
        </MetricGroup>
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

const percent = (value: number, digits = 1) => `${value.toFixed(digits)}%`;
const ratio = (value: number) => value.toFixed(2);

function MetricGroup({ title, children }: { title: string; children: ReactNode }) {
  return (
    <div>
      <p className="text-xs font-black uppercase tracking-[0.16em] text-cyan-200">{title}</p>
      <div className="mt-3 grid grid-cols-2 gap-3 text-sm">
        {children}
      </div>
    </div>
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

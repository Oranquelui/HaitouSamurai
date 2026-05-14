"use client";

import { useMemo, useState } from "react";
import type { StockSignalRecord } from "@/lib/data/sample-stocks";
import { DividendSignalTable } from "@/components/dashboard/DividendSignalTable";
import { IncomeSimulation } from "@/components/dashboard/IncomeSimulation";
import { SignalExplainer } from "@/components/dashboard/SignalExplainer";
import { YieldQualityScatter } from "@/components/dashboard/YieldQualityScatter";
import { sampleDataNotice } from "@/lib/disclaimer";
import { dashboardTrustCopy } from "@/lib/public-links";

export function DashboardShell({ stocks }: { stocks: StockSignalRecord[] }) {
  const sortedStocks = useMemo(() => [...stocks].sort((a, b) => b.signal.score - a.signal.score), [stocks]);
  const [selected, setSelected] = useState<StockSignalRecord>(sortedStocks[0]);
  const highCoverageCount = stocks.filter((stock) => stock.signal.grade === "High Coverage").length;
  const needsReviewCount = stocks.filter((stock) => stock.signal.grade === "Needs Review").length;
  const averageYield = stocks.reduce((sum, stock) => sum + stock.dividendYield, 0) / stocks.length;

  return (
    <div className="mx-auto max-w-7xl px-5 py-8 sm:px-8 lg:px-10">
      <div className="mb-8 flex flex-col gap-6 lg:flex-row lg:items-end lg:justify-between">
        <div>
          <p className="kicker">Dividend Mining / Sample Dataset</p>
          <h1 className="jp-serif mt-3 text-5xl font-black text-white sm:text-7xl">配当 Mining Deck</h1>
          <p className="mt-4 max-w-2xl text-sm leading-7 text-slate-400">{sampleDataNotice}</p>
        </div>
        <div className="grid grid-cols-2 gap-3 text-center sm:grid-cols-4">
          <Stat label="Sample Rows" value={String(stocks.length)} />
          <Stat label="High Coverage" value={String(highCoverageCount)} />
          <Stat label="Needs Review" value={String(needsReviewCount)} />
          <Stat label="Avg Yield" value={`${averageYield.toFixed(1)}%`} />
        </div>
      </div>

      <div className="mb-5 grid gap-3 lg:grid-cols-3">
        {dashboardTrustCopy.map((item) => (
          <div key={item} className="rounded-2xl border border-white/10 bg-white/[0.035] p-4 text-xs leading-6 text-slate-400">
            {item}
          </div>
        ))}
      </div>

      <div className="grid gap-5 xl:grid-cols-[1.4fr_0.85fr]">
        <YieldQualityScatter stocks={stocks} />
        <SignalExplainer stock={selected} />
      </div>
      <div className="mt-5">
        <IncomeSimulation stock={selected} />
      </div>
      <div className="mt-5">
        <DividendSignalTable stocks={sortedStocks} selectedTicker={selected.ticker} onSelect={setSelected} />
      </div>
    </div>
  );
}

function Stat({ label, value }: { label: string; value: string }) {
  return (
    <div className="glow-panel min-w-28 rounded-2xl px-4 py-3">
      <p className="text-xs uppercase tracking-[0.16em] text-slate-500">{label}</p>
      <p className="mt-1 text-2xl font-black text-white">{value}</p>
    </div>
  );
}

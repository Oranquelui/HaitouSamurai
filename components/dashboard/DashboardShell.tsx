"use client";

import { useMemo, useState } from "react";
import type { StockSignalRecord } from "@/lib/data/sample-stocks";
import { DividendCalendar } from "@/components/dashboard/DividendCalendar";
import { DividendSignalTable } from "@/components/dashboard/DividendSignalTable";
import { IncomeSimulation } from "@/components/dashboard/IncomeSimulation";
import { SignalExplainer } from "@/components/dashboard/SignalExplainer";
import { YieldQualityScatter } from "@/components/dashboard/YieldQualityScatter";
import { sampleDataNotice, stockUniverseNotice } from "@/lib/disclaimer";
import { dashboardTrustCopy } from "@/lib/public-links";

export function DashboardShell({ stocks }: { stocks: StockSignalRecord[] }) {
  const sortedStocks = useMemo(() => [...stocks].sort((a, b) => b.signal.score - a.signal.score), [stocks]);
  const [selectedTickers, setSelectedTickers] = useState<string[]>(() => sortedStocks[0] ? [sortedStocks[0].ticker] : []);
  const [focusedTicker, setFocusedTicker] = useState(sortedStocks[0]?.ticker ?? "");
  const [investmentJpy, setInvestmentJpy] = useState(1_000_000);
  const stocksByTicker = useMemo(() => new Map(stocks.map((stock) => [stock.ticker, stock])), [stocks]);
  const selectedStocks = useMemo(
    () => selectedTickers.map((ticker) => stocksByTicker.get(ticker)).filter((stock): stock is StockSignalRecord => Boolean(stock)),
    [selectedTickers, stocksByTicker]
  );
  const focusedStock = stocksByTicker.get(focusedTicker) ?? selectedStocks[0] ?? sortedStocks[0];
  const highCoverageCount = stocks.filter((stock) => stock.signal.grade === "High Coverage").length;
  const needsReviewCount = stocks.filter((stock) => stock.signal.grade === "Needs Review").length;
  const averageYield = stocks.reduce((sum, stock) => sum + stock.dividendYield, 0) / stocks.length;
  const toggleStockSelection = (stock: StockSignalRecord) => {
    setFocusedTicker(stock.ticker);
    setSelectedTickers((current) => current.includes(stock.ticker) ? current.filter((ticker) => ticker !== stock.ticker) : [...current, stock.ticker]);
  };

  return (
    <div className="mx-auto max-w-7xl px-5 py-8 sm:px-8 lg:px-10">
      <div className="mb-8 flex flex-col gap-6 lg:flex-row lg:items-end lg:justify-between">
        <div>
          <p className="kicker">配当シミュレーター</p>
          <h1 className="jp-serif mt-3 max-w-3xl text-4xl font-bold leading-tight text-blue-950 sm:text-6xl">自分の投資額で、毎月の手取りを試算</h1>
          <p className="mt-4 max-w-2xl text-sm leading-7 text-blue-950/65">{sampleDataNotice}</p>
          <p className="mt-2 max-w-2xl text-sm leading-7 text-blue-950/65">{stockUniverseNotice}</p>
        </div>
        <div className="grid grid-cols-2 gap-3 text-center sm:grid-cols-4">
          <Stat label="候補数" value={String(stocks.length)} />
          <Stat label="良好" value={String(highCoverageCount)} />
          <Stat label="要確認" value={String(needsReviewCount)} />
          <Stat label="平均利回り" value={`${averageYield.toFixed(1)}%`} />
        </div>
      </div>

      <div className="mb-5 grid gap-3 lg:grid-cols-3">
        {dashboardTrustCopy.map((item) => (
          <div key={item} className="dashboard-panel p-4 text-xs leading-6 text-blue-950/65">
            {item}
          </div>
        ))}
      </div>

      <div id="portfolio-simulator" className="grid gap-5">
        <IncomeSimulation
          investmentJpy={investmentJpy}
          stocks={selectedStocks}
          onInvestmentJpyChange={setInvestmentJpy}
        />
        <SignalExplainer stock={focusedStock} />
      </div>
      <div className="mt-5">
        <DividendCalendar investmentJpy={investmentJpy} stocks={selectedStocks} />
      </div>
      <div className="mt-5">
        <YieldQualityScatter stocks={stocks} />
      </div>
      <div className="mt-5">
        <DividendSignalTable stocks={sortedStocks} selectedTickers={selectedTickers} onToggleSelection={toggleStockSelection} />
      </div>
    </div>
  );
}

function Stat({ label, value }: { label: string; value: string }) {
  return (
    <div className="dashboard-panel min-w-28 px-4 py-3">
      <p className="text-xs font-semibold tracking-[0.14em] text-blue-950/45">{label}</p>
      <p className="mt-1 text-xl font-bold text-blue-950">{value}</p>
    </div>
  );
}

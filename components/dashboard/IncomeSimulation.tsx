"use client";

import { useEffect, useMemo, useState, type FormEvent } from "react";
import type { StockSignalRecord } from "@/lib/data/sample-stocks";
import {
  calculateJapanDividendIncome,
  MONTHLY_DIVIDEND_GOAL_JPY
} from "@/lib/tax/japan";

const yen = new Intl.NumberFormat("ja-JP", { style: "currency", currency: "JPY", maximumFractionDigits: 0 });
const taxRateCopy = "日本の税率20.315%";

type IncomeSimulationProps = {
  stocks: StockSignalRecord[];
  investmentJpy: number;
  onInvestmentJpyChange: (value: number) => void;
};

export function IncomeSimulation({
  stocks,
  investmentJpy,
  onInvestmentJpyChange
}: IncomeSimulationProps) {
  const [draftInvestmentJpy, setDraftInvestmentJpy] = useState(() => String(investmentJpy));
  const selectedTickerCopy = stocks.length > 0 ? stocks.slice(0, 4).map((stock) => stock.ticker).join(" / ") : "未選択";
  const selectedStockCopy = stocks.length > 4 ? `${selectedTickerCopy} ほか${stocks.length - 4}件` : selectedTickerCopy;
  const parsedDraftInvestmentJpy = Number(draftInvestmentJpy);
  const inputIsInvalid = !Number.isFinite(parsedDraftInvestmentJpy) || parsedDraftInvestmentJpy < 0;
  const hasPendingInvestment = !inputIsInvalid && Math.round(parsedDraftInvestmentJpy) !== investmentJpy;
  const simulation = useMemo(() => {
    const averageDividendYield = stocks.length > 0 ? stocks.reduce((sum, stock) => sum + stock.dividendYield, 0) / stocks.length : 0;
    const income = calculateJapanDividendIncome({
      dividendYield: averageDividendYield,
      investmentJpy,
      monthlyGoalJpy: MONTHLY_DIVIDEND_GOAL_JPY
    });

    return {
      averageDividendYield,
      ...income
    };
  }, [investmentJpy, stocks]);
  const handleApplyInvestment = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    if (inputIsInvalid) {
      return;
    }

    onInvestmentJpyChange(Math.round(parsedDraftInvestmentJpy));
  };

  useEffect(() => {
    setDraftInvestmentJpy(String(investmentJpy));
  }, [investmentJpy]);

  return (
    <section className="dashboard-panel p-5">
      <div className="flex flex-col gap-5 sm:flex-row sm:items-start sm:justify-between">
        <div>
          <p className="kicker">毎月の手取り</p>
          <h2 className="mt-1 text-3xl font-bold text-blue-950">自分の投資額で配当を試算</h2>
          <p className="mt-3 max-w-xl text-sm leading-7 text-blue-950/65">
            課税口座で受け取る前提です。選択した{stocks.length}銘柄に均等配分し、平均利回り {simulation.averageDividendYield.toFixed(1)}% と
            <span className="font-semibold text-[var(--landing-tax-accent)]">{taxRateCopy}</span>
            を反映します。表示は教育用の簡易試算で、銘柄推奨ではありません。
          </p>
        </div>
        <div className="rounded-md border border-blue-950/15 bg-blue-950/[0.04] px-4 py-3 text-sm text-blue-950">
          選択中: <span className="font-semibold">{selectedStockCopy}</span>
        </div>
      </div>

      <label className="mt-6 block text-sm font-semibold text-blue-950" htmlFor="investment-jpy">
        投資額
      </label>
      <form className="mt-2 grid gap-2 sm:grid-cols-[1fr_auto]" onSubmit={handleApplyInvestment}>
        <input
          id="investment-jpy"
          className="min-h-12 w-full rounded-md border border-blue-950/20 bg-white/75 px-4 text-lg font-semibold text-blue-950 outline-none transition focus:border-blue-900 focus:ring-4 focus:ring-blue-900/10"
          inputMode="numeric"
          min={0}
          step={10000}
          type="number"
          value={draftInvestmentJpy}
          onChange={(event) => setDraftInvestmentJpy(event.target.value)}
        />
        <button
          className="min-h-12 rounded-md border border-blue-950 bg-blue-950 px-5 text-sm font-bold text-[#fffdf7] transition hover:bg-blue-900 disabled:cursor-not-allowed disabled:border-blue-950/20 disabled:bg-blue-950/20 disabled:text-blue-950/40"
          disabled={inputIsInvalid}
          type="submit"
        >
          試算に反映
        </button>
      </form>
      <p className={hasPendingInvestment ? "mt-2 text-xs font-semibold text-[var(--landing-tax-accent)]" : "mt-2 text-xs text-blue-950/45"}>
        {hasPendingInvestment ? "未反映の入力があります。ボタンで試算に反映してください。" : `反映中: ${yen.format(investmentJpy)}`}
      </p>

      <div className="mt-5 grid gap-3 sm:grid-cols-2 xl:grid-cols-4">
        <Card label="毎月の手取り" value={yen.format(simulation.netMonthlyDividendJpy)} emphasis />
        <Card label="年間の手取り" value={yen.format(simulation.netAnnualDividendJpy)} />
        <Card label="年間の税額" value={yen.format(simulation.annualTaxJpy)} />
        <Card label="月5万円まであと" value={yen.format(simulation.monthlyGoalGapJpy)} />
      </div>

      <div className="mt-4 grid gap-3 sm:grid-cols-2">
        <div className="rounded-md border border-blue-950/12 bg-white/60 p-4">
          <p className="text-xs font-semibold tracking-[0.14em] text-blue-950/45">必要元本</p>
          <p className="mt-1 text-xl font-bold text-blue-950">
            {simulation.requiredPrincipalForGoalJpy === null ? "計算不可" : yen.format(simulation.requiredPrincipalForGoalJpy)}
          </p>
          <p className="mt-1 text-sm leading-6 text-blue-950/70">現在の平均利回りで月5万円の手取りを目指す場合の概算です。</p>
        </div>
        <div className="rounded-md border border-[var(--landing-tax-accent)]/30 bg-[var(--landing-tax-accent)]/8 p-4">
          <p className="text-xs font-semibold tracking-[0.14em] text-[var(--landing-tax-accent)]">前提</p>
          <p className="mt-1 text-sm leading-6 text-blue-950/70">
            {simulation.assumptionLabel}。外国税・制度変更・個別条件は含めません。
          </p>
        </div>
      </div>
    </section>
  );
}

function Card({ label, value, emphasis = false }: { label: string; value: string; emphasis?: boolean }) {
  return (
    <div className={emphasis ? "rounded-md border border-blue-950/25 bg-blue-950 px-4 py-4 text-[#fffdf7]" : "rounded-md border border-blue-950/12 bg-white/65 px-4 py-4 text-blue-950"}>
      <p className={emphasis ? "text-xs font-semibold tracking-[0.14em] text-[#fffdf7]/65" : "text-xs font-semibold tracking-[0.14em] text-blue-950/45"}>{label}</p>
      <p className="mt-2 text-xl font-bold">{value}</p>
    </div>
  );
}

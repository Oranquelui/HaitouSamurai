import type { StockSignalRecord } from "@/lib/data/sample-stocks";
import { calculateJapanDividendIncome } from "@/lib/tax/japan";

const yen = new Intl.NumberFormat("ja-JP", { style: "currency", currency: "JPY", maximumFractionDigits: 0 });
const monthLabels = ["1月", "2月", "3月", "4月", "5月", "6月", "7月", "8月", "9月", "10月", "11月", "12月"];

type DividendCalendarProps = {
  stocks: StockSignalRecord[];
  investmentJpy: number;
};

export function DividendCalendar({ stocks, investmentJpy }: DividendCalendarProps) {
  const averageDividendYield = stocks.length > 0 ? stocks.reduce((sum, stock) => sum + stock.dividendYield, 0) / stocks.length : 0;
  const estimate = calculateJapanDividendIncome({
    dividendYield: averageDividendYield,
    investmentJpy
  });
  const monthlyEstimate = estimate.netMonthlyDividendJpy;
  const selectedTickerCopy = stocks.length > 0 ? stocks.slice(0, 6).map((stock) => stock.ticker).join(" / ") : "未選択";

  return (
    <section className="dashboard-panel p-5">
      <div className="flex flex-col gap-4 lg:flex-row lg:items-end lg:justify-between">
        <div>
          <p className="kicker">月別配当</p>
          <h2 className="mt-1 text-2xl font-bold text-blue-950">月ごとの手取りイメージ</h2>
          <p className="mt-2 max-w-2xl text-sm leading-7 text-blue-950/65">
            簡易モデルとして年間の税引後手取りを12か月に均等配分しています。実際の支払月ではありません。
          </p>
        </div>
        <div className="rounded-md border border-blue-950/12 bg-white/60 px-4 py-3 text-sm text-blue-950/70">
          対象: <span className="font-semibold text-blue-950">{selectedTickerCopy}</span>
        </div>
      </div>

      <div className="mt-5 grid gap-2 sm:grid-cols-6 lg:grid-cols-12">
        {monthLabels.map((month) => (
          <div key={month} className="rounded-md border border-blue-950/12 bg-white/64 p-3">
            <div className="flex items-center justify-between gap-2">
              <p className="text-xs font-semibold text-blue-950/55">{month}</p>
              <p className="text-[0.65rem] font-semibold text-blue-950/40">均等</p>
            </div>
            <p className="mt-4 text-[0.65rem] font-semibold tracking-[0.1em] text-blue-950/42">税引後手取り</p>
            <p className="mt-1 text-base font-bold text-blue-950">{yen.format(monthlyEstimate)}</p>
            <div className="mt-3 h-1.5 rounded-full bg-blue-950/[0.08]">
              <div className="h-full rounded-full bg-[var(--coverage-jade)]" style={{ width: monthlyEstimate > 0 ? "100%" : "4%" }} />
            </div>
          </div>
        ))}
      </div>

      <div className="mt-4 grid gap-3 text-sm sm:grid-cols-3">
        <div className="rounded-md border border-blue-950/12 bg-white/55 p-3">
          <p className="text-xs font-semibold tracking-[0.14em] text-blue-950/45">簡易モデル</p>
          <p className="mt-1 text-blue-950/70">実際の権利月・支払月・為替換算日は反映していません。</p>
        </div>
        <div className="rounded-md border border-blue-950/12 bg-white/55 p-3">
          <p className="text-xs font-semibold tracking-[0.14em] text-blue-950/45">年間手取り</p>
          <p className="mt-1 font-bold text-blue-950">{yen.format(estimate.netAnnualDividendJpy)}</p>
        </div>
        <div className="rounded-md border border-blue-950/12 bg-white/55 p-3">
          <p className="text-xs font-semibold tracking-[0.14em] text-blue-950/45">口座前提</p>
          <p className="mt-1 text-blue-950/70">{estimate.assumptionLabel}</p>
        </div>
      </div>
    </section>
  );
}

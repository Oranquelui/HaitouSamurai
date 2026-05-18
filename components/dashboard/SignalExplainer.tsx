import type { StockSignalRecord } from "@/lib/data/sample-stocks";
import {
  classifyDividendMapZone,
  payoutRiskTier,
  type PayoutRiskTier,
  type SignalGrade
} from "@/lib/scoring/dividend-score";
import type { ReactNode } from "react";

const gradeMeta: Record<SignalGrade, { label: string; className: string }> = {
  "High Coverage": { label: "良好", className: "border-blue-900/20 bg-blue-950 text-[#fffdf7]" },
  Monitor: { label: "通常", className: "border-blue-900/20 bg-blue-100 text-blue-950" },
  "Risk Flags": { label: "注意", className: "border-amber-700/25 bg-amber-100 text-amber-900" },
  "Needs Review": { label: "要確認", className: "border-rose-800/20 bg-rose-100 text-rose-900" }
};

const payoutRiskMeta: Record<PayoutRiskTier, { label: string; className: string }> = {
  stable: { label: "守", className: "border-[var(--coverage-jade)]/25 bg-[rgba(31,122,98,0.1)] text-[var(--coverage-jade)]" },
  caution: { label: "修", className: "border-[var(--dividend-gold)]/30 bg-[rgba(184,135,18,0.11)] text-[var(--dividend-gold)]" },
  danger: { label: "罠", className: "border-[var(--risk-vermilion)]/25 bg-[rgba(180,63,43,0.1)] text-[var(--risk-vermilion)]" }
};

export function SignalExplainer({ stock }: { stock: StockSignalRecord }) {
  const confirmationPoints = buildConfirmationPoints(stock);
  const riskChecks = buildRiskChecks(stock);
  const grade = gradeMeta[stock.signal.grade];
  const mapZone = classifyDividendMapZone(stock);
  const payoutRisk = payoutRiskMeta[payoutRiskTier(stock)];

  return (
    <aside className="dashboard-panel p-5">
      <div className="flex items-start justify-between gap-4">
        <div>
          <p className="kicker">選択中の銘柄</p>
          <h2 className="mt-1 text-3xl font-bold text-blue-950">{stock.ticker}</h2>
          <p className="mt-1 text-sm text-blue-950/60">{stock.name}</p>
        </div>
        <div className={`rounded-md border px-4 py-3 text-center ${grade.className}`}>
          <p className="text-3xl font-bold">{stock.signal.score}</p>
          <p className="text-xs font-semibold">{grade.label}</p>
        </div>
      </div>

      <div className="mt-5 rounded-md border border-blue-950/12 bg-white/58 p-4">
        <div className="flex items-start justify-between gap-3">
          <div>
            <p className="text-xs font-semibold tracking-[0.14em] text-blue-950/45">配当継続力</p>
            <p className="mt-1 text-lg font-bold text-blue-950">{mapZone.label}</p>
            <p className="mt-2 text-sm leading-6 text-blue-950/65">{mapZone.why}</p>
          </div>
          <span className={`rounded-md border px-3 py-2 text-sm font-bold ${payoutRisk.className}`}>{payoutRisk.label}</span>
        </div>
        <p className="mt-3 text-sm leading-6 text-blue-950/65">次に確認: {mapZone.nextCheck}</p>
      </div>

      <div className="mt-6 space-y-4">
        <MetricGroup title="配当の前提">
          <Metric label="配当利回り" value={percent(stock.dividendYield)} />
          <Metric label="配当性向" value={percent(stock.payoutRatio, 0)} />
          <Metric label="営業利益率" value={percent(stock.operatingMargin)} />
          <Metric label="純利益率" value={percent(stock.netProfitMargin)} />
        </MetricGroup>

        <MetricGroup title="収益性と成長">
          <Metric label="ROE" value={percent(stock.roe)} />
          <Metric label="ROA" value={percent(stock.roa)} />
          <Metric label="投下資本効率" value={percent(stock.returnOnInvestment)} />
          <Metric label="EPS成長" value={percent(stock.epsGrowthThisYear)} />
        </MetricGroup>

        <MetricGroup title="財務の余裕">
          <Metric label="流動比率" value={ratio(stock.currentRatio)} />
          <Metric label="当座比率" value={ratio(stock.quickRatio)} />
          <Metric label="長期D/E" value={ratio(stock.ltDebtToEquity)} />
          <Metric label="総D/E" value={ratio(stock.totalDebtToEquity)} />
        </MetricGroup>
      </div>

      <div className="mt-6 grid gap-4 sm:grid-cols-2">
        <Checklist title="確認できている点" items={confirmationPoints} tone="blue" />
        <Checklist title="投資前に見る点" items={riskChecks} tone="amber" />
      </div>
    </aside>
  );
}

const percent = (value: number, digits = 1) => `${value.toFixed(digits)}%`;
const ratio = (value: number) => value.toFixed(2);

function buildConfirmationPoints(stock: StockSignalRecord) {
  return [
    `利回り ${percent(stock.dividendYield)} を試算に利用`,
    stock.payoutRatio <= 55 ? "配当性向は余裕を確認しやすい水準" : "配当性向は追加確認が必要",
    stock.roe >= 12 ? "ROEは収益性の確認材料になる" : "ROEは過信せず他指標と見る",
    stock.dividendGrowthYears >= 10 ? "増配年数は長期確認の材料になる" : "増配履歴は短めに扱う"
  ];
}

function buildRiskChecks(stock: StockSignalRecord) {
  return [
    stock.dividendYield > 6 ? "高利回りは減配リスクとセットで見る" : "利回りだけで判断しない",
    stock.payoutRatio > 75 ? "配当性向が高く、利益変動に弱い可能性" : "配当原資の継続性を一次情報で確認",
    stock.totalDebtToEquity > 1.5 ? "負債水準が高め。金利と返済余力を確認" : "負債は業種特性と一緒に確認",
    "外国税、為替、配当変更は別シナリオで確認"
  ];
}

function MetricGroup({ title, children }: { title: string; children: ReactNode }) {
  return (
    <div>
      <p className="text-xs font-semibold tracking-[0.16em] text-blue-900">{title}</p>
      <div className="mt-3 grid grid-cols-2 gap-3 text-sm">
        {children}
      </div>
    </div>
  );
}

function Metric({ label, value }: { label: string; value: string }) {
  return (
    <div className="rounded-md border border-blue-950/12 bg-white/60 p-3">
      <p className="text-xs font-semibold tracking-[0.14em] text-blue-950/45">{label}</p>
      <p className="mt-1 text-lg font-bold text-blue-950">{value}</p>
    </div>
  );
}

function Checklist({ title, items, tone }: { title: string; items: string[]; tone: "blue" | "amber" }) {
  const titleClass = tone === "blue" ? "text-blue-900" : "text-amber-800";

  return (
    <div className="rounded-md border border-blue-950/12 bg-white/58 p-4">
      <p className={`text-sm font-semibold ${titleClass}`}>{title}</p>
      <ul className="mt-3 space-y-2 text-sm leading-6 text-blue-950/70">
        {items.map((item) => (
          <li key={item}>- {item}</li>
        ))}
      </ul>
    </div>
  );
}

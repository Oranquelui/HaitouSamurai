"use client";

import { useMemo, useState } from "react";
import {
  Chart as ChartJS,
  LinearScale,
  PointElement,
  Tooltip,
  Legend,
  type ChartData,
  type ChartOptions,
  type Plugin
} from "chart.js";
import { Bubble } from "react-chartjs-2";
import type { StockSignalRecord } from "@/lib/data/sample-stocks";
import {
  bubbleRadiusForMarketCap,
  classifyDividendMapZone,
  clampDividendMapRoe,
  DIVIDEND_MAP_ROE_MAX,
  DIVIDEND_MAP_ROE_MIN,
  diagnosticTooltipLines,
  payoutRiskTier,
  type DividendMapZoneLabel,
  type PayoutRiskTier
} from "@/lib/scoring/dividend-score";

ChartJS.register(LinearScale, PointElement, Tooltip, Legend);

type BubblePoint = {
  x: number;
  y: number;
  r: number;
  stock: StockSignalRecord;
  zoneLabel: DividendMapZoneLabel;
  payoutRisk: PayoutRiskTier;
};

const zoneFillColor: Record<DividendMapZoneLabel, string> = {
  "高利回り・高ROE要確認": "rgba(184, 135, 18, 0.76)",
  "利回りの罠候補": "rgba(180, 63, 43, 0.74)",
  "低利回り・高ROE観察": "rgba(31, 122, 98, 0.72)",
  "要追加調査": "rgba(20, 32, 77, 0.46)"
};

const zoneLayerOrder = Object.keys(zoneFillColor) as DividendMapZoneLabel[];

const payoutBorderColor: Record<PayoutRiskTier, string> = {
  stable: "#1f7a62",
  caution: "#b88712",
  danger: "#b43f2b"
};

const payoutBorderWidth: Record<PayoutRiskTier, number> = {
  stable: 1.5,
  caution: 2.5,
  danger: 3.5
};

const guideLabels = [
  { label: "利回りの罠候補", x: 1, y: 10.5 },
  { label: "高利回り・高ROE要確認", x: 15, y: 10.5 },
  { label: "要追加調査", x: 1, y: 3.1 },
  { label: "低利回り・高ROE観察", x: 15, y: 3.1 }
] as const;

const roeGuides = [
  { value: 8, label: "弱い <8%" },
  { value: 12, label: "標準 8-12%" },
  { value: 20, label: "良好 12-20%" },
  { value: 28, label: "高収益 20%+" }
] as const;

const createDividendSustainabilityGuidePlugin = (activeZoneSet: Set<DividendMapZoneLabel>): Plugin<"bubble"> => ({
  id: "dividendSustainabilityGuidePlugin",
  beforeDatasetsDraw: (chart) => {
    const { ctx, chartArea, scales } = chart;
    const xScale = scales.x;
    const yScale = scales.y;
    const highYieldY = yScale.getPixelForValue(6);

    ctx.save();

    if (Number.isFinite(highYieldY)) {
      ctx.fillStyle = "rgba(180, 63, 43, 0.075)";
      ctx.fillRect(chartArea.left, chartArea.top, chartArea.right - chartArea.left, Math.max(0, highYieldY - chartArea.top));
      ctx.strokeStyle = "rgba(180, 63, 43, 0.38)";
      ctx.setLineDash([6, 5]);
      ctx.beginPath();
      ctx.moveTo(chartArea.left, highYieldY);
      ctx.lineTo(chartArea.right, highYieldY);
      ctx.stroke();
      ctx.setLineDash([]);
      ctx.fillStyle = "#b43f2b";
      ctx.font = "600 11px Hiragino Sans, Yu Gothic, sans-serif";
      ctx.fillText("高利回り注意 6%+", chartArea.left + 10, highYieldY - 8);
    }

    [8, 12, 20].forEach((value) => {
      const x = xScale.getPixelForValue(value);
      ctx.strokeStyle = "rgba(20, 32, 77, 0.14)";
      ctx.beginPath();
      ctx.moveTo(x, chartArea.top);
      ctx.lineTo(x, chartArea.bottom);
      ctx.stroke();
    });

    ctx.restore();
  },
  afterDatasetsDraw: (chart) => {
    const { ctx, scales } = chart;
    const xScale = scales.x;
    const yScale = scales.y;

    ctx.save();
    ctx.font = "700 12px Hiragino Sans, Yu Gothic, sans-serif";
    guideLabels.filter((guide) => activeZoneSet.has(guide.label)).forEach((guide) => {
      const x = xScale.getPixelForValue(guide.x);
      const y = yScale.getPixelForValue(guide.y);
      const width = ctx.measureText(guide.label).width + 14;

      ctx.fillStyle = "rgba(255, 253, 247, 0.86)";
      ctx.fillRect(x - 6, y - 15, width, 22);
      ctx.strokeStyle = "rgba(20, 32, 77, 0.16)";
      ctx.strokeRect(x - 6, y - 15, width, 22);
      ctx.fillStyle = "rgba(20, 32, 77, 0.78)";
      ctx.fillText(guide.label, x, y);
    });

    ctx.restore();
  }
});

export const dividendSustainabilityGuidePlugin = createDividendSustainabilityGuidePlugin(new Set(zoneLayerOrder));

export function YieldQualityScatter({ stocks }: { stocks: StockSignalRecord[] }) {
  const [activeZoneLabels, setActiveZoneLabels] = useState<DividendMapZoneLabel[]>(zoneLayerOrder);
  const activeZoneSet = useMemo(() => new Set(activeZoneLabels), [activeZoneLabels]);
  const activeGuidePlugin = useMemo(() => createDividendSustainabilityGuidePlugin(activeZoneSet), [activeZoneSet]);
  const points: BubblePoint[] = useMemo(() => stocks.map((stock) => {
    const zone = classifyDividendMapZone(stock);
    const payoutRisk = payoutRiskTier(stock);

    return {
      x: clampDividendMapRoe(stock.roe),
      y: stock.dividendYield,
      r: bubbleRadiusForMarketCap(stock.marketCapUsdBn),
      stock,
      zoneLabel: zone.label,
      payoutRisk
    };
  }), [stocks]);
  const filteredPoints = useMemo(() => points.filter((point) => activeZoneSet.has(point.zoneLabel)), [activeZoneSet, points]);
  const zoneCounts = useMemo(() => zoneLayerOrder.reduce<Record<DividendMapZoneLabel, number>>((counts, label) => {
    counts[label] = points.filter((point) => point.zoneLabel === label).length;
    return counts;
  }, {} as Record<DividendMapZoneLabel, number>), [points]);
  const toggleZoneLayer = (label: DividendMapZoneLabel) => {
    setActiveZoneLabels((current) => {
      if (current.length === 1 && current[0] === label) {
        return zoneLayerOrder;
      }

      return [label];
    });
  };

  const data: ChartData<"bubble", BubblePoint[]> = {
    datasets: [
      {
        label: "配当継続力マップ",
        data: filteredPoints,
        backgroundColor: filteredPoints.map((point) => zoneFillColor[point.zoneLabel]),
        borderColor: filteredPoints.map((point) => payoutBorderColor[point.payoutRisk]),
        borderWidth: filteredPoints.map((point) => payoutBorderWidth[point.payoutRisk]),
        hoverBorderWidth: 4
      }
    ]
  };

  const maxYield = Math.max(10, Math.ceil(Math.max(...stocks.map((stock) => stock.dividendYield), 8) + 2));
  const options: ChartOptions<"bubble"> = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        display: false
      },
      tooltip: {
        backgroundColor: "rgba(20, 32, 77, 0.96)",
        borderColor: "rgba(255, 253, 247, 0.35)",
        borderWidth: 1,
        padding: 12,
        titleFont: { size: 13, weight: "bold" },
        bodyFont: { size: 12 },
        callbacks: {
          title: (items) => {
            const point = items[0]?.raw as BubblePoint | undefined;
            return point ? `${point.stock.ticker} ${point.stock.name}` : "";
          },
          label: (context) => {
            const point = context.raw as BubblePoint;
            return diagnosticTooltipLines(point.stock).slice(1);
          }
        }
      }
    },
    scales: {
      x: {
        min: DIVIDEND_MAP_ROE_MIN,
        max: DIVIDEND_MAP_ROE_MAX,
        title: { display: true, text: "ROE (%)", color: "#14204d" },
        grid: { color: "rgba(20, 32, 77, 0.11)" },
        ticks: { color: "#5a6689" }
      },
      y: {
        min: 0,
        max: maxYield,
        title: { display: true, text: "配当利回り (%)", color: "#b88712" },
        grid: { color: "rgba(20, 32, 77, 0.11)" },
        ticks: { color: "#5a6689" }
      }
    }
  };

  return (
    <section className="dashboard-panel p-5">
      <div className="mb-4 flex flex-col gap-4 xl:flex-row xl:items-start xl:justify-between">
        <div>
          <p className="kicker">配当継続力マップ</p>
          <h2 className="mt-1 text-2xl font-bold text-blue-950">配当継続力マップ</h2>
          <p className="mt-2 max-w-2xl text-sm leading-7 text-blue-950/65">
            利回り、ROE、配当性向を重ねて、高配当が収益力に支えられているかを確認します。銘柄推奨ではありません。
          </p>
          <p className="mt-2 text-xs font-semibold tracking-[0.14em] text-blue-950/45">
            表示中 {filteredPoints.length} / {points.length} 件
          </p>
        </div>
        <div className="grid gap-2 text-xs sm:grid-cols-2 xl:min-w-[27rem]">
          <GuidePill label="高利回り注意" value="6%以上" tone="danger" />
          <GuidePill label="円の縁" value="配当性向リスク" tone="gold" />
          <GuidePill label="円の大きさ" value="時価総額上限あり" tone="indigo" />
          <GuidePill label="ROE帯" value={roeGuides.map((guide) => guide.label).join(" / ")} tone="jade" />
        </div>
      </div>

      <div className="grid gap-4 xl:grid-cols-[1fr_15rem]">
        <div className="h-[390px] rounded-md border border-blue-950/10 bg-white/55 p-3">
          <Bubble data={data} options={options} plugins={[activeGuidePlugin]} />
        </div>
        <div className="grid gap-3 text-sm">
          <button
            className="rounded-md border border-blue-950/15 bg-blue-950 px-3 py-2 text-left text-xs font-bold text-[#fffdf7] transition hover:bg-blue-900"
            type="button"
            onClick={() => setActiveZoneLabels(zoneLayerOrder)}
          >
            全ゾーンを表示
          </button>
          {zoneLayerOrder.map((label) => {
            const isActive = activeZoneSet.has(label);

            return (
              <button
                key={label}
                aria-pressed={isActive}
                className={`rounded-md border p-3 text-left transition ${isActive ? "border-blue-950/12 bg-white/58 opacity-100" : "border-blue-950/8 bg-white/25 opacity-45 hover:opacity-80"}`}
                type="button"
                onClick={() => toggleZoneLayer(label)}
              >
                <div className="flex items-center gap-2">
                  <span className="h-3 w-3 rounded-sm" style={{ backgroundColor: zoneFillColor[label] }} />
                  <p className="font-bold text-blue-950">{label}</p>
                  <span className="ml-auto rounded border border-blue-950/10 bg-white/70 px-1.5 py-0.5 text-[0.65rem] font-bold text-blue-950/55">{zoneCounts[label]}</span>
                </div>
                <p className="mt-2 text-xs leading-5 text-blue-950/60">{zoneDescription(label)}</p>
              </button>
            );
          })}
        </div>
      </div>
    </section>
  );
}

function GuidePill({ label, value, tone }: { label: string; value: string; tone: "danger" | "gold" | "indigo" | "jade" }) {
  const toneClass = {
    danger: "border-[var(--risk-vermilion)]/25 bg-[rgba(180,63,43,0.08)] text-[var(--risk-vermilion)]",
    gold: "border-[var(--dividend-gold)]/25 bg-[rgba(184,135,18,0.1)] text-[var(--dividend-gold)]",
    indigo: "border-blue-950/15 bg-blue-950/[0.04] text-blue-950",
    jade: "border-[var(--coverage-jade)]/25 bg-[rgba(31,122,98,0.09)] text-[var(--coverage-jade)]"
  }[tone];

  return (
    <div className={`rounded-md border px-3 py-2 ${toneClass}`}>
      <p className="font-bold">{label}</p>
      <p className="mt-1 text-[0.7rem] leading-4 opacity-75">{value}</p>
    </div>
  );
}

function zoneDescription(label: DividendMapZoneLabel) {
  if (label === "高利回り・高ROE要確認") return "高い利回りをROEで補強できているかを見るゾーン。配当性向は必ず確認。";
  if (label === "利回りの罠候補") return "高利回りでも収益力が弱い候補。減配・価格下落・負債を追加確認。";
  if (label === "低利回り・高ROE観察") return "足元利回りは低めでも収益力がある候補。配当方針と利益成長の観察向け。";
  return "利回りとROEだけでは判断しにくい候補。業種特性と財務を確認。";
}

"use client";

import {
  Chart as ChartJS,
  LinearScale,
  PointElement,
  Tooltip,
  Legend,
  type ChartData,
  type ChartOptions
} from "chart.js";
import { Bubble } from "react-chartjs-2";
import type { StockSignalRecord } from "@/lib/data/sample-stocks";
import { signalColorByGrade } from "@/lib/ontology/signals";

ChartJS.register(LinearScale, PointElement, Tooltip, Legend);

type BubblePoint = {
  x: number;
  y: number;
  r: number;
  ticker: string;
  name: string;
  grade: string;
  score: number;
};

export function YieldQualityScatter({ stocks }: { stocks: StockSignalRecord[] }) {
  const points: BubblePoint[] = stocks.map((stock) => ({
    x: stock.roe,
    y: stock.dividendYield,
    r: Math.max(6, Math.min(26, Math.sqrt(stock.marketCapUsdBn) * 1.35)),
    ticker: stock.ticker,
    name: stock.name,
    grade: stock.signal.grade,
    score: stock.signal.score
  }));

  const data: ChartData<"bubble", BubblePoint[]> = {
    datasets: [
      {
        label: "Dividend coverage metrics",
        data: points,
        backgroundColor: points.map((point) => `${signalColorByGrade[point.grade as keyof typeof signalColorByGrade]}AA`),
        borderColor: points.map((point) => signalColorByGrade[point.grade as keyof typeof signalColorByGrade]),
        borderWidth: 1.5
      }
    ]
  };

  const options: ChartOptions<"bubble"> = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        display: false
      },
      tooltip: {
        backgroundColor: "rgba(4, 8, 12, 0.92)",
        borderColor: "rgba(53, 214, 255, 0.3)",
        borderWidth: 1,
        callbacks: {
          label: (context) => {
            const raw = context.raw as BubblePoint;
            return `${raw.ticker} ${raw.grade} ${raw.score} | Yield ${raw.y}% | ROE ${raw.x}%`;
          }
        }
      }
    },
    scales: {
      x: {
        title: { display: true, text: "ROE (%)", color: "#9dddf4" },
        grid: { color: "rgba(255,255,255,0.08)" },
        ticks: { color: "#9aa8b7" }
      },
      y: {
        title: { display: true, text: "Dividend Yield (%)", color: "#ffd48a" },
        grid: { color: "rgba(255,255,255,0.08)" },
        ticks: { color: "#9aa8b7" }
      }
    }
  };

  return (
    <div className="glow-panel h-[420px] rounded-[1.75rem] p-5">
      <div className="mb-4 flex items-center justify-between">
        <div>
          <p className="kicker">Yield vs Quality Map</p>
          <h2 className="mt-1 text-2xl font-black text-white">Yield × ROE coverage</h2>
        </div>
        <span className="rounded-full border border-white/10 bg-white/[0.04] px-3 py-1 text-xs text-slate-300">bubble = market cap</span>
      </div>
      <div className="h-[320px]">
        <Bubble data={data} options={options} />
      </div>
    </div>
  );
}

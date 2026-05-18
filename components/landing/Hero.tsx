import Link from "next/link";
import { shortDisclaimer, stockUniverseNotice } from "@/lib/disclaimer";

const heroCta = { label: "配当を試算する", href: "/dashboard" };

const radarMetrics = [
  { label: "投資額", value: "¥1,000,000", status: "入力", tone: "text-blue-950" },
  { label: "配当利回り", value: "5.4%", status: "サンプル", tone: "text-[var(--landing-tax-accent)]" },
  { label: "税率", value: "20.315%", status: "日本", tone: "text-blue-900" },
  { label: "毎月の手取り", value: "¥3,585", status: "目安", tone: "text-blue-950" }
];

const factorRows = [
  ["投資額", "¥1,000,000", "ユーザー入力", "text-blue-950"],
  ["年間配当", "¥54,000", "税引前", "text-[var(--landing-tax-accent)]"],
  ["年間手取り", "¥43,030", "20.315%反映", "text-blue-950"],
  ["毎月の手取り", "¥3,585", "目安", "text-blue-900"]
];

export function Hero() {
  return (
    <section className="relative mx-auto grid min-h-screen w-full max-w-7xl items-center gap-8 px-5 py-10 sm:px-8 lg:grid-cols-[0.9fr_1.1fr] lg:px-10">
      <div className="pointer-events-none absolute inset-x-5 top-10 hidden h-px bg-stone-950/15 lg:block" />
      <div className="pointer-events-none absolute inset-y-10 left-5 hidden w-px bg-stone-950/15 lg:block" />
      <div className="reveal-up border-y border-stone-950/15 py-8 lg:border-y-0 lg:py-0">
        <div className="grid gap-6">
          <div className="grid grid-cols-[auto_1fr] items-center gap-4 border-b border-stone-950/15 pb-5">
            <span className="display-font text-6xl leading-none text-blue-950/20">01</span>
            <div>
              <p className="kicker">配当シミュレーター</p>
              <p className="mt-1 text-xs uppercase tracking-[0.22em] text-stone-500">投資額から手取り配当を試算</p>
            </div>
          </div>

          <h1 className="jp-serif max-w-[38rem] text-balance text-[clamp(2.65rem,5.5vw,4.45rem)] font-bold leading-[1.12] text-blue-950">
            いくら投資すると、
            <span className="block text-blue-900">毎月いくら残るか。</span>
          </h1>
          <p className="jp-serif max-w-[34rem] text-balance text-[clamp(1.35rem,2.25vw,2rem)] font-bold leading-[1.28] text-blue-950">
            配当あり銘柄と金額を選び、税引後の配当を試算する。
          </p>
          <p className="max-w-2xl text-lg leading-8 text-blue-950/75 sm:text-xl">
            ユーザーが選んだ銘柄と投資額に対して、<span className="font-bold text-[var(--landing-tax-accent)]">日本の税率20.315%</span> を反映し、年間・毎月の税引後配当の目安を表示します。
          </p>
          <p className="max-w-2xl rounded-md border border-blue-950/12 bg-white/45 px-4 py-3 text-sm leading-6 text-blue-950/65">{stockUniverseNotice}</p>

          <div className="flex flex-col gap-3 sm:flex-row sm:flex-wrap">
            <Link className="samurai-button" href={heroCta.href}>
              {heroCta.label}
            </Link>
          </div>

          <div className="grid border border-blue-950/15 bg-white/35 text-[0.68rem] uppercase tracking-[0.16em] text-blue-950/55 sm:grid-cols-3">
            <div className="border-b border-blue-950/15 p-3 sm:border-b-0 sm:border-r">
              <span className="block text-blue-950">投資額</span>
              自分で入力
            </div>
            <div className="border-b border-blue-950/15 p-3 sm:border-b-0 sm:border-r">
              <span className="block text-blue-950">対象銘柄</span>
              配当あり銘柄
            </div>
            <div className="p-3">
              <span className="block text-blue-950">手取り</span>
              税率20.315%
            </div>
          </div>

          <p className="max-w-xl border-l border-[var(--landing-tax-accent)]/35 pl-4 text-xs leading-6 text-blue-950/55">{shortDisclaimer}</p>
        </div>
      </div>

      <div className="reveal-up bright-panel" style={{ animationDelay: "140ms" }}>
        <div className="grid border-b border-stone-950/15 md:grid-cols-[1fr_auto]">
          <div className="p-4 sm:p-5">
            <p className="kicker">Scenario Preview</p>
            <h2 className="jp-serif mt-2 text-4xl font-black leading-tight text-blue-950 sm:text-5xl">配当プラン</h2>
          </div>
          <div className="flex items-center justify-between gap-8 border-t border-blue-950/15 p-4 text-xs uppercase tracking-[0.2em] text-blue-950/55 md:border-l md:border-t-0 sm:p-5">
            <span>試算サンプル</span>
            <span className="text-[var(--landing-tax-accent)]">助言ではありません</span>
          </div>
        </div>

        <div className="grid border-b border-blue-950/15 sm:grid-cols-4">
          {radarMetrics.map((metric) => (
            <div key={metric.label} className="min-h-32 min-w-0 border-b border-blue-950/15 p-4 last:border-b-0 sm:border-b-0 sm:border-r sm:last:border-r-0">
              <p className="text-[0.68rem] uppercase tracking-[0.18em] text-blue-950/55">{metric.label}</p>
              <p className={`mt-4 whitespace-nowrap text-[clamp(0.95rem,1.35vw,1.1rem)] font-black leading-none tracking-normal tabular-nums ${metric.tone}`}>{metric.value}</p>
              <p className="mt-2 text-xs uppercase tracking-[0.16em] text-blue-950/55">{metric.status}</p>
            </div>
          ))}
        </div>

        <div className="grid lg:grid-cols-[1.05fr_0.95fr]">
          <div className="border-b border-blue-950/15 p-4 sm:p-5 lg:border-b-0 lg:border-r">
            <div className="mb-4 flex items-center justify-between text-xs uppercase tracking-[0.18em] text-blue-950/55">
              <span>投資額と手取り</span>
              <span>自分で組み合わせ</span>
            </div>
            <div className="relative h-72 border border-blue-950/15 bg-[linear-gradient(rgba(23,37,84,0.065)_1px,transparent_1px),linear-gradient(90deg,rgba(23,37,84,0.055)_1px,transparent_1px)] bg-[size:40px_40px]">
              <div className="absolute bottom-6 left-6 right-4 top-4 border-l border-b border-blue-950/30">
                <div className="absolute bottom-[18%] left-[16%] h-3 w-3 bg-slate-500 shadow-[0_0_18px_rgba(71,85,105,0.22)]" />
                <div className="absolute bottom-[38%] left-[48%] h-3 w-3 bg-[var(--landing-tax-accent)] shadow-[0_0_18px_rgba(184,135,18,0.24)]" />
                <div className="absolute bottom-[64%] left-[72%] h-3 w-3 bg-blue-950 shadow-[0_0_18px_rgba(23,37,84,0.22)]" />
                <div className="absolute bottom-[52%] left-[30%] h-2 w-2 bg-blue-800" />
                <div className="absolute bottom-[28%] left-[82%] h-2 w-2 bg-blue-800" />
                <span className="absolute -bottom-5 right-0 text-[0.65rem] uppercase tracking-[0.18em] text-blue-950/55">投資額</span>
                <span className="absolute -left-5 top-0 -rotate-90 text-[0.65rem] uppercase tracking-[0.18em] text-blue-950/55">手取り</span>
              </div>
            </div>
          </div>

          <div className="grid">
            <div className="border-b border-blue-950/15 p-4 sm:p-5">
              <div className="mb-4 flex items-center justify-between">
                <p className="text-xs uppercase tracking-[0.18em] text-blue-950/55">試算内訳</p>
                <p className="text-xs uppercase tracking-[0.18em] text-[var(--landing-tax-accent)]">試算であり助言ではありません</p>
              </div>
              <div className="grid gap-2">
                {factorRows.map(([label, value, note, tone]) => (
                  <div key={label} className="grid grid-cols-[0.7fr_0.55fr_1fr] items-center gap-2 border border-blue-950/10 bg-white/45 px-3 py-3 text-sm">
                    <span className="font-bold text-blue-950">{label}</span>
                    <span className={`text-sm font-black tracking-normal tabular-nums ${tone}`}>{value}</span>
                    <span className="text-right text-xs text-blue-950/55">{note}</span>
                  </div>
                ))}
              </div>
            </div>

            <div className="p-4 sm:p-5">
              <p className="mb-4 text-xs uppercase tracking-[0.18em] text-blue-950/55">使い方</p>
              <div className="grid border border-blue-950/15 text-xs font-bold uppercase tracking-[0.15em] text-blue-950/75">
                <span className="border-b border-blue-950/15 p-3">1. 銘柄を選ぶ</span>
                <span className="border-b border-blue-950/15 p-3">2. 投資額を入れる</span>
                <span className="p-3">3. 税引後の配当を見る</span>
              </div>
              <p className="mt-4 text-sm leading-7 text-blue-950/65">
                表示される金額は、ユーザー入力とサンプルデータに基づく配当収入の目安です。銘柄推奨や売買指示ではありません。
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

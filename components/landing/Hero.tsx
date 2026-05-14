import Link from "next/link";
import { shortDisclaimer } from "@/lib/disclaimer";
import { landingCtas } from "@/lib/public-links";

const signalRows = [
  ["JNJ", "High Coverage", "88", "3.1%"],
  ["2914.T", "Monitor", "74", "4.7%"],
  ["QYLD", "Needs Review", "28", "11.4%"]
];

export function Hero() {
  return (
    <section className="relative mx-auto grid min-h-screen w-full max-w-7xl items-center gap-12 px-5 py-12 sm:px-8 lg:grid-cols-[1.05fr_0.95fr] lg:px-10">
      <div className="reveal-up space-y-8">
        <div className="inline-flex rounded-full border border-cyan-300/25 bg-cyan-300/10 px-4 py-2 text-xs font-bold uppercase tracking-[0.24em] text-cyan-200">
          Dividend Mining / Japan + US ETF research
        </div>
        <div className="space-y-5">
          <h1 className="jp-serif text-balance text-5xl font-black leading-[1.02] text-white sm:text-7xl lg:text-8xl">
            利回り高いけど
            <span className="block text-cyan-200">大丈夫？</span>
          </h1>
          <p className="max-w-2xl text-xl leading-8 text-slate-200 sm:text-2xl">
            配当候補を掘り、<span className="text-amber-300">減配リスクのサイン</span> と税引後の手取りを一画面で確認するリサーチツール。
          </p>
          <p className="max-w-xl text-sm leading-7 text-slate-400">
            配当利回り、配当性向、ROE/ROA、利益率、EPS成長、流動性、負債をまとめて整理。HaitouSamuraiは銘柄を推奨せず、自分で判断するための数字を見える化します。
          </p>
        </div>
        <div className="flex flex-col gap-3 sm:flex-row sm:flex-wrap">
          {landingCtas.map((cta) => {
            const className = cta.priority === "primary" ? "samurai-button" : "ghost-button";

            return cta.href.startsWith("http") ? (
              <a key={cta.label} className={className} href={cta.href} target="_blank" rel="noreferrer">
                {cta.label}
              </a>
            ) : (
              <Link key={cta.label} className={className} href={cta.href}>
                {cta.label}
              </Link>
            );
          })}
        </div>
        <p className="max-w-xl border-l border-cyan-300/30 pl-4 text-xs leading-6 text-slate-500">{shortDisclaimer}</p>
      </div>

      <div className="reveal-up glow-panel relative overflow-hidden rounded-[2rem] p-5" style={{ animationDelay: "140ms" }}>
        <div className="absolute right-8 top-8 h-24 w-24 rounded-full bg-cyan-300/20 blur-3xl" />
        <div className="absolute bottom-8 left-8 h-28 w-28 rounded-full bg-amber-300/20 blur-3xl" />
        <div className="relative space-y-5">
          <div className="flex items-center justify-between border-b border-white/10 pb-4">
            <div>
              <p className="kicker">Samurai Radar</p>
              <h2 className="display-font text-4xl text-white">Yield Trap Detector</h2>
            </div>
            <div className="rounded-full border border-cyan-300/30 px-3 py-1 text-xs text-cyan-200">DEMO</div>
          </div>

          <div className="grid gap-3 sm:grid-cols-3">
            {signalRows.map(([ticker, grade, score, yieldValue]) => (
              <div key={ticker} className="rounded-2xl border border-white/10 bg-white/[0.035] p-4">
                <div className="flex items-center justify-between text-xs text-slate-400">
                  <span>{ticker}</span>
                  <span>{yieldValue}</span>
                </div>
                <div className="mt-4 text-3xl font-black text-white">{score}</div>
                <div className={`mt-1 text-sm font-bold ${grade === "Needs Review" ? "text-rose-300" : grade === "High Coverage" ? "text-emerald-300" : "text-cyan-200"}`}>{grade}</div>
              </div>
            ))}
          </div>

          <div className="rounded-3xl border border-cyan-300/20 bg-black/30 p-5">
            <div className="mb-4 flex items-center justify-between text-xs uppercase tracking-[0.2em] text-slate-400">
              <span>Research Loop</span>
              <span>screening not advice</span>
            </div>
            <div className="grid grid-cols-4 gap-2 text-center text-xs font-bold text-slate-200">
              {['Mine', 'Check', 'Simulate', 'Review'].map((label, index) => (
                <div key={label} className="relative rounded-2xl border border-cyan-300/20 bg-cyan-300/10 px-2 py-5">
                  <span>{label}</span>
                  {index < 3 ? <span className="absolute -right-2 top-1/2 text-cyan-200">→</span> : null}
                </div>
              ))}
            </div>
          </div>

          <div className="rounded-3xl border border-amber-300/20 bg-amber-300/10 p-5">
            <p className="text-sm leading-7 text-amber-50">
              This does not predict future income. It shows sample metrics, risk flags, and after-tax scenarios so users can decide what to research next.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}

import Link from "next/link";
import { WAITLIST_ISSUE_URL } from "@/lib/public-links";

export function PricingTeaser() {
  return (
    <section className="mx-auto max-w-7xl px-5 py-16 sm:px-8 lg:px-10">
      <div className="glow-panel overflow-hidden rounded-[2rem] p-6 sm:p-8">
        <div className="grid gap-8 lg:grid-cols-[1fr_0.9fr] lg:items-center">
          <div>
            <p className="kicker">Free Research / Pro Workflow</p>
            <h2 className="jp-serif mt-3 text-4xl font-black text-white sm:text-5xl">無料で試し、Proで調査時間を短縮する。</h2>
            <p className="mt-5 max-w-2xl text-sm leading-7 text-slate-400">
              Core dashboardはOSSで公開。Lifetime Pro候補は、watchlist、目標配当プランナー、保存シナリオ、custom thresholds、CSV/Excel exportなど、判断ではなく作業効率に課金する設計です。課金実装はまだありません。
            </p>
            <div className="mt-6 flex flex-col gap-3 sm:flex-row sm:flex-wrap">
              <Link className="samurai-button" href="/dashboard">
                Try Dashboard
              </Link>
              <a className="ghost-button" href={WAITLIST_ISSUE_URL} target="_blank" rel="noreferrer">
                Join Waitlist
              </a>
            </div>
          </div>
          <div className="rounded-3xl border border-amber-300/25 bg-amber-300/10 p-6">
            <p className="display-font text-5xl text-amber-200">Waitlist</p>
            <p className="mt-3 text-3xl font-black text-white">Pro workflow interest</p>
            <p className="mt-3 text-sm leading-7 text-amber-50/80">
              Lightweight GitHub issue flow. No payment, no subscription, no ticker recommendations.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}

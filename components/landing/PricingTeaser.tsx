import Link from "next/link";
import { WAITLIST_ISSUE_URL } from "@/lib/public-links";

export function PricingTeaser() {
  return (
    <section className="mx-auto max-w-7xl px-5 py-16 sm:px-8 lg:px-10">
      <div className="glow-panel overflow-hidden rounded-[2rem] p-6 sm:p-8">
        <div className="grid gap-8 lg:grid-cols-[1fr_0.9fr] lg:items-center">
          <div>
            <p className="kicker">OSS First / Lifetime Later</p>
            <h2 className="jp-serif mt-3 text-4xl font-black text-white sm:text-5xl">無料で信頼を作り、買い切りの需要を検証する。</h2>
            <p className="mt-5 max-w-2xl text-sm leading-7 text-slate-400">
              Core dashboardはOSSで公開。Lifetime Proは、データ更新、watchlist、export、private supportなど、調査時間を短縮する便利機能への関心を検証する段階です。課金実装はまだありません。
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
            <p className="mt-3 text-3xl font-black text-white">Lifetime Pro interest</p>
            <p className="mt-3 text-sm leading-7 text-amber-50/80">
              Lightweight GitHub issue flow. No payment, no subscription, no investment guarantees.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}

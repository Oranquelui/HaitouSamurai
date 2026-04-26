export function PricingTeaser() {
  return (
    <section className="mx-auto max-w-7xl px-5 py-16 sm:px-8 lg:px-10">
      <div className="glow-panel overflow-hidden rounded-[2rem] p-6 sm:p-8">
        <div className="grid gap-8 lg:grid-cols-[1fr_0.9fr] lg:items-center">
          <div>
            <p className="kicker">OSS First / Lifetime Later</p>
            <h2 className="jp-serif mt-3 text-4xl font-black text-white sm:text-5xl">無料で信頼を作り、買い切りで便利さを売る。</h2>
            <p className="mt-5 max-w-2xl text-sm leading-7 text-slate-400">
              Core dashboardはOSSで公開。Lifetime Proはサブスクではなく、データ更新、watchlist、export、private supportなど時間短縮のための一回購入として検証します。
            </p>
          </div>
          <div className="rounded-3xl border border-amber-300/25 bg-amber-300/10 p-6">
            <p className="display-font text-5xl text-amber-200">Lifetime</p>
            <p className="mt-3 text-3xl font-black text-white">¥4,980 - ¥7,800</p>
            <p className="mt-3 text-sm leading-7 text-amber-50/80">Future validation range. No subscription. No investment guarantees.</p>
          </div>
        </div>
      </div>
    </section>
  );
}

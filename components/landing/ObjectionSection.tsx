const objections = [
  ["高配当は危険では？", "だから利回り単体ではなく、配当性向・利益率・EPS成長・負債・流動性を同時に見ます。"],
  ["これは投資助言？", "いいえ。銘柄推奨や売買指示ではなく、ユーザー自身の条件で確認する教育目的のスクリーニングです。"],
  ["なぜGitHubで公開？", "ロジックを見える化し、投資家にも開発者にも検証可能なOSSとして育てるためです。"],
  ["Proは何を売る？", "助言ではなく、watchlist、目標配当プランナー、保存シナリオ、CSV exportなど調査時間を短縮する便利機能です。" ]
];

export function ObjectionSection() {
  return (
    <section className="mx-auto max-w-7xl px-5 py-16 sm:px-8 lg:px-10">
      <div className="grid gap-8 lg:grid-cols-[0.8fr_1.2fr]">
        <div>
          <p className="kicker">Objection Map</p>
          <h2 className="jp-serif mt-3 text-4xl font-black text-white sm:text-5xl">怖さを煽らず、見るべき数字に分解する。</h2>
        </div>
        <div className="grid gap-3">
          {objections.map(([q, a]) => (
            <div key={q} className="glow-panel rounded-3xl p-5">
              <p className="font-bold text-amber-200">{q}</p>
              <p className="mt-3 text-sm leading-7 text-slate-400">{a}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

const steps = [
  {
    id: "01",
    title: "今の条件",
    body: "未来の配当収入は、今の財務条件、資本効率、負債、選択からしか立ち上がらない。",
    tags: ["Yield", "Payout", "Debt", "ROE"]
  },
  {
    id: "02",
    title: "見えないフィードバック",
    body: "過去の増配、現在の業績、将来の減配リスクは閉じたループでつながる。",
    tags: ["Past", "Present", "Future"]
  },
  {
    id: "03",
    title: "未来の形成",
    body: "HaitouSamuraiは予言ではなく、条件の組み合わせからシグナルを形成する。",
    tags: ["Signal", "Score", "Explain"]
  },
  {
    id: "04",
    title: "人間のシフト",
    body: "投資家は待つ側から、条件を理解して設計する側へ移る。",
    tags: ["Design", "Watch", "Decide"]
  }
];

export function TelicRecursion() {
  return (
    <section className="mx-auto max-w-7xl px-5 py-16 sm:px-8 lg:px-10">
      <div className="mb-8 max-w-3xl">
        <p className="kicker">Decision Philosophy</p>
        <h2 className="jp-serif mt-3 text-4xl font-black text-white sm:text-6xl">未来を待たない。条件を設計する。</h2>
        <p className="mt-5 text-base leading-8 text-slate-400">
          添付イメージの核は、目的論的再帰です。市場を神秘化せず、条件・フィードバック・選択のループとして扱うことで、HaitouSamuraiは「予測」ではなく「判断設計」を支援します。
        </p>
      </div>
      <div className="grid gap-4 lg:grid-cols-4">
        {steps.map((step, index) => (
          <article key={step.id} className="glow-panel relative overflow-hidden rounded-[1.75rem] p-6">
            <div className="absolute -right-8 -top-8 h-24 w-24 rounded-full bg-cyan-300/10 blur-2xl" />
            <p className="display-font text-5xl text-cyan-200/40">{step.id}</p>
            <h3 className="jp-serif mt-4 text-2xl font-black text-white">{step.title}</h3>
            <p className="mt-4 text-sm leading-7 text-slate-400">{step.body}</p>
            <div className="mt-6 flex flex-wrap gap-2">
              {step.tags.map((tag) => (
                <span key={tag} className="rounded-full border border-white/10 bg-white/[0.04] px-3 py-1 text-[0.68rem] text-slate-300">{tag}</span>
              ))}
            </div>
            {index < steps.length - 1 ? <span className="absolute right-4 top-1/2 hidden text-cyan-200 lg:block">→</span> : null}
          </article>
        ))}
      </div>
    </section>
  );
}

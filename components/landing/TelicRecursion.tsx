const steps = [
  {
    id: "01",
    title: "候補を掘る",
    body: "配当利回りだけではなく、配当性向、利益率、ROE/ROA、負債、流動性を同じ画面に集める。",
    tags: ["Yield", "Payout", "Debt", "ROE"]
  },
  {
    id: "02",
    title: "リスクを見る",
    body: "高利回りの理由が、利益成長なのか、株価下落なのか、過剰配当性向なのかを分解する。",
    tags: ["Margin", "EPS", "Performance"]
  },
  {
    id: "03",
    title: "手取りを試す",
    body: "税金と為替の前提を置き、配当が実際にいくら残るかをサンプル計算する。",
    tags: ["Tax", "JPY", "Scenario"]
  },
  {
    id: "04",
    title: "次に調べる",
    body: "売買判断を出さず、ユーザーが自分の条件で比較し、一次情報で確認する次の対象を決める。",
    tags: ["Screen", "Export", "Review"]
  }
];

export function TelicRecursion() {
  return (
    <section className="mx-auto max-w-7xl px-5 py-16 sm:px-8 lg:px-10">
      <div className="mb-8 max-w-3xl">
        <p className="kicker">Dividend Mining Workflow</p>
        <h2 className="jp-serif mt-3 text-4xl font-black text-white sm:text-6xl">候補を掘り、数字で確認し、次に調べる。</h2>
        <p className="mt-5 text-base leading-8 text-slate-400">
          HaitouSamuraiは銘柄を推奨しません。配当候補、減配リスクのサイン、税引後の手取りを整理し、ユーザー自身の調査を短くするためのワークフローです。
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

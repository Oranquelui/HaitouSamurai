const steps = [
  {
    id: "01",
    title: "銘柄を選ぶ",
    body: "公開情報で更新していく配当リサーチ候補から、気になる銘柄を自分で選びます。アプリは銘柄をおすすめしません。",
    tags: ["配当あり銘柄", "公開情報で更新", "試算用"]
  },
  {
    id: "02",
    title: "投資額を入れる",
    body: "100万円、300万円、毎月積立後の想定など、試したい金額を入れて自分で組み合わせます。",
    tags: ["投資額", "比率", "組み合わせ"]
  },
  {
    id: "03",
    title: "手取りを見る",
    body: "日本の税率20.315%を反映し、年間配当と毎月の手取りを目安として表示します。",
    tags: ["税引後", "月額", "円換算"]
  },
  {
    id: "04",
    title: "一次情報で確認する",
    body: "配当は確定利益ではありません。決算、配当方針、為替、税制を確認する前提で使います。",
    tags: ["決算", "配当方針", "税制"]
  }
];

export function TelicRecursion() {
  return (
    <section className="mx-auto max-w-7xl px-5 py-16 sm:px-8 lg:px-10">
      <div className="mb-8 max-w-3xl">
        <p className="kicker">使い方</p>
        <h2 className="jp-serif mt-3 text-4xl font-black text-blue-950 sm:text-6xl">自分の金額で、配当の手取りを確認する。</h2>
        <p className="mt-5 text-base leading-8 text-blue-950/65">
          配当サムライは銘柄を推奨しません。ユーザーが選んだ銘柄と投資額に対して、税引後にどれくらい残るかを整理するための試算ツールです。
        </p>
      </div>
      <div className="grid gap-4 lg:grid-cols-4">
        {steps.map((step, index) => (
          <article key={step.id} className="bright-panel relative overflow-hidden rounded-lg p-6">
            <p className="display-font text-5xl text-blue-950/20">{step.id}</p>
            <h3 className="jp-serif mt-4 text-2xl font-black text-blue-950">{step.title}</h3>
            <p className="mt-4 text-sm leading-7 text-blue-950/65">{step.body}</p>
            <div className="mt-6 flex flex-wrap gap-2">
              {step.tags.map((tag) => (
                <span key={tag} className="rounded border border-blue-950/10 bg-white/50 px-3 py-1 text-[0.68rem] text-blue-950/65">{tag}</span>
              ))}
            </div>
            {index < steps.length - 1 ? <span className="absolute right-4 top-1/2 hidden text-blue-900 lg:block">→</span> : null}
          </article>
        ))}
      </div>
    </section>
  );
}

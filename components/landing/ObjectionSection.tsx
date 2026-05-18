const objections = [
  ["この金額は確定ですか？", "いいえ。配当利回り、為替、税率を置いた試算です。実際の配当、株価、為替、税制は変わります。"],
  ["対象銘柄は何ですか？", "公開情報でリサーチした配当あり銘柄を、試算用データとして更新していく前提です。銘柄推奨ではありません。"],
  ["銘柄をおすすめしますか？", "おすすめしません。ユーザーが自分で組み合わせた内容に対して、配当収入の目安だけを計算します。"],
  ["米国株の税金は？", "外国源泉税や外国税額控除は別シナリオです。最初の画面では日本で受け取る時の基本前提を明示します。"]
];

export function ObjectionSection() {
  return (
    <section className="mx-auto max-w-7xl px-5 py-16 sm:px-8 lg:px-10">
      <div className="grid gap-8 lg:grid-cols-[0.8fr_1.2fr]">
        <div>
          <p className="kicker">確認しておくこと</p>
          <h2 className="jp-serif mt-3 text-4xl font-black text-blue-950 sm:text-5xl">配当の手取りは、前提で変わる。</h2>
        </div>
        <div className="grid gap-3">
          {objections.map(([q, a]) => (
            <div key={q} className="bright-panel rounded-lg p-5">
              <p className="font-bold text-blue-950">{q}</p>
              <p className="mt-3 text-sm leading-7 text-blue-950/65">{a}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

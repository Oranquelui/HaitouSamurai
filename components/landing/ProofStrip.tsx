const proofItems = [
  { label: "入力するもの", value: "投資額", detail: "銘柄ごとに金額を入れる" },
  { label: "対象銘柄", value: "配当リサーチ候補", detail: "公開情報で更新していく試算用データ" },
  { label: "税率の前提", value: "20.315%", detail: "日本の上場株式等を想定" },
  { label: "見えるもの", value: "毎月の手取り", detail: "年間配当と月額目安を表示" }
];

export function ProofStrip() {
  return (
    <section className="mx-auto max-w-7xl px-5 py-10 sm:px-8 lg:px-10">
      <div className="grid gap-3 md:grid-cols-4">
        {proofItems.map((item) => (
          <div key={item.label} className="bright-panel rounded-lg p-5">
            <p className="text-xs uppercase tracking-[0.2em] text-blue-900">{item.label}</p>
            <p className="mt-3 text-2xl font-black text-blue-950">{item.value}</p>
            <p className="mt-2 text-sm text-blue-950/65">{item.detail}</p>
          </div>
        ))}
      </div>
    </section>
  );
}

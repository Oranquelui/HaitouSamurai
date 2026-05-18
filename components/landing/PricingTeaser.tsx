import Link from "next/link";

export function PricingTeaser() {
  return (
    <section className="mx-auto max-w-7xl px-5 py-16 sm:px-8 lg:px-10">
      <div className="bright-panel overflow-hidden rounded-lg p-6 sm:p-8">
        <div className="grid gap-8 lg:grid-cols-[1fr_0.9fr] lg:items-center">
          <div>
            <p className="kicker">まずは試算から</p>
            <h2 className="jp-serif mt-3 text-4xl font-black text-blue-950 sm:text-5xl">気になる組み合わせで、毎月の手取りを見てみる。</h2>
            <p className="mt-5 max-w-2xl text-sm leading-7 text-blue-950/65">
              100万円を入れたらどうなるか、300万円ならどうか。配当あり銘柄を自分で組み合わせて、税引後の配当収入を確認できます。
            </p>
            <div className="mt-6 flex flex-col gap-3 sm:flex-row sm:flex-wrap">
              <Link className="samurai-button" href="/dashboard">
                配当を試算する
              </Link>
            </div>
          </div>
          <div className="rounded-lg border border-blue-950/15 bg-white/45 p-6">
            <p className="display-font text-5xl text-blue-950/25">Plan</p>
            <p className="mt-3 text-3xl font-black text-blue-950">入力した金額だけを計算する</p>
            <p className="mt-3 text-sm leading-7 text-blue-950/65">
              アプリが買う銘柄を決めるのではなく、ユーザーが入力した条件に対して配当収入の目安を返します。
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}

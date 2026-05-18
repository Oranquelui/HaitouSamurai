import { describe, expect, it } from "vitest";
import { readFile } from "node:fs/promises";
import { dashboardTrustCopy, landingCtas } from "./public-links";
import { sampleDataNotice, shortDisclaimer, stockUniverseNotice } from "./disclaimer";

describe("public launch copy", () => {
  it("exposes a minimal public CTA path to the dividend simulator only", () => {
    expect(landingCtas.map((cta) => cta.label)).toEqual(["配当を試算する"]);

    expect(landingCtas[0]).toMatchObject({ href: "/dashboard", priority: "primary" });
  });

  it("keeps dashboard copy inside a Japanese user simulation boundary", () => {
    expect(shortDisclaimer).toContain("投資助言");
    expect(shortDisclaimer).toContain("銘柄推奨");
    expect(sampleDataNotice).toContain("試算用データ");
    expect(sampleDataNotice).toContain("リアルタイム");
    expect(sampleDataNotice).not.toContain("Excel");
    expect(sampleDataNotice).not.toContain("Excel由来");
    expect(stockUniverseNotice).toContain("配当リサーチ候補");
    expect(stockUniverseNotice).toContain("公開情報で更新");
    expect(stockUniverseNotice).not.toContain("S&P500");
    expect(stockUniverseNotice).not.toContain("Nasdaq");
    expect(dashboardTrustCopy).toEqual(
      expect.arrayContaining([
        expect.stringContaining("日本の税率20.315%"),
        expect.stringContaining("銘柄推奨ではありません")
      ])
    );
    expect(dashboardTrustCopy.join("\n")).not.toContain("NISA");
  });

  it("declares the Next.js smooth scroll contract for route transitions", async () => {
    const layoutSource = await readFile(new URL("../app/layout.tsx", import.meta.url), "utf8");

    expect(layoutSource).toContain('data-scroll-behavior="smooth"');
  });

  it("does not depend on runtime Google font fetching for local/offline builds", async () => {
    const layoutSource = await readFile(new URL("../app/layout.tsx", import.meta.url), "utf8");
    const globalCss = await readFile(new URL("../app/globals.css", import.meta.url), "utf8");

    expect(layoutSource).not.toContain("next/font/google");
    expect(layoutSource).not.toContain("Bebas_Neue");
    expect(layoutSource).not.toContain("Noto_Serif_JP");
    expect(globalCss).toContain("--font-jp");
    expect(globalCss).toContain("--font-mono");
    expect(globalCss).toContain("--font-display");
  });

  it("uses the public brand name 配当サムライ / Haitou Samurai in metadata", async () => {
    const layoutSource = await readFile(new URL("../app/layout.tsx", import.meta.url), "utf8");

    expect(layoutSource).toContain("配当サムライ");
    expect(layoutSource).toContain("Haitou Samurai");
    expect(layoutSource).not.toContain("Dividend Mining Research Tool");
    expect(layoutSource).not.toContain("github.com");
    expect(layoutSource).toContain('metadataBase: new URL("https://haitou-samurai.oranque.jp")');
  });

  it("keeps the landing hero focused on user dividend simulation, not implementation details", async () => {
    const heroSource = await readFile(new URL("../components/landing/Hero.tsx", import.meta.url), "utf8");
    const disclaimerSource = await readFile(new URL("../lib/disclaimer.ts", import.meta.url), "utf8");
    const visibleHeroCopy = `${heroSource}\n${disclaimerSource}`;
    const rejectedFraming = `${["Excel", "born"].join("-")} ontology/pipeline project`;

    expect(heroSource).toContain("いくら投資すると、");
    expect(heroSource).toContain("毎月いくら残るか。");
    expect(visibleHeroCopy).toContain("配当リサーチ候補");
    expect(visibleHeroCopy).not.toContain("S&P500");
    expect(visibleHeroCopy).not.toContain("Nasdaq");
    expect(heroSource).toContain("20.315%");
    expect(heroSource).not.toContain("Excelをそのまま");
    expect(visibleHeroCopy).not.toContain("Excel由来");
    expect(visibleHeroCopy).not.toContain("Excel");
    expect(heroSource).not.toContain("Pythonで処理");
    expect(heroSource).not.toContain("TypeScript");
    expect(heroSource).not.toContain("Next.js UI");
    expect(heroSource).not.toContain("OSS/FDE");
    expect(heroSource).not.toContain("Built With");
    expect(heroSource).not.toContain("Star on GitHub");
    expect(heroSource).not.toContain(rejectedFraming);
  });

  it("keeps the landing headline readable instead of oversized vertical-feeling blocks", async () => {
    const heroSource = await readFile(new URL("../components/landing/Hero.tsx", import.meta.url), "utf8");

    expect(heroSource).toContain("text-[clamp(2.65rem,5.5vw,4.45rem)]");
    expect(heroSource).toContain("leading-[1.12]");
    expect(heroSource).toContain("max-w-[38rem]");
    expect(heroSource).not.toContain("lg:text-[5.05rem]");
    expect(heroSource).not.toContain("leading-[1.02]");
  });

  it("keeps the full landing page oriented to Japanese dividend-simulation users", async () => {
    const landingSources = await Promise.all(
      [
        "../components/landing/Hero.tsx",
        "../components/landing/ProofStrip.tsx",
        "../components/landing/TelicRecursion.tsx",
        "../components/landing/ObjectionSection.tsx",
        "../components/landing/PricingTeaser.tsx"
      ].map((file) => readFile(new URL(file, import.meta.url), "utf8"))
    );
    const source = landingSources.join("\n");

    expect(source).toContain("毎月の手取り");
    expect(source).toContain("配当あり銘柄");
    expect(source).toContain("配当リサーチ候補");
    expect(source).toContain("日本の税率20.315%");
    expect(source).toContain("自分で組み合わせ");
    expect(source).not.toContain("NISA");
    expect(source).not.toContain("X API");
    expect(source).not.toContain("EN demand");
    expect(source).not.toContain("GitHub");
    expect(source).not.toContain("Waitlist");
    expect(source).not.toContain("Pro workflow");
    expect(source).not.toContain("OSS");
    expect(source).not.toContain("FDE");
  });

  it("uses an offwhite and navy landing theme instead of green-led styling", async () => {
    const globalCss = await readFile(new URL("../app/globals.css", import.meta.url), "utf8");
    const heroSource = await readFile(new URL("../components/landing/Hero.tsx", import.meta.url), "utf8");

    expect(globalCss).toContain("--landing-navy");
    expect(globalCss).toContain("--landing-offwhite");
    expect(heroSource).toContain("text-blue-950");
    expect(heroSource).not.toContain("text-teal");
    expect(heroSource).not.toContain("text-emerald");
  });

  it("keeps hero preview metric numbers compact enough for four columns", async () => {
    const heroSource = await readFile(new URL("../components/landing/Hero.tsx", import.meta.url), "utf8");

    expect(heroSource).toContain("text-[clamp(0.95rem,1.35vw,1.1rem)]");
    expect(heroSource).toContain("whitespace-nowrap");
    expect(heroSource).toContain("tabular-nums");
    expect(heroSource).not.toContain("mt-4 text-3xl font-black");
  });

  it("uses a permanent-yellow tax accent that belongs to the offwhite/navy theme", async () => {
    const globalCss = await readFile(new URL("../app/globals.css", import.meta.url), "utf8");
    const heroSource = await readFile(new URL("../components/landing/Hero.tsx", import.meta.url), "utf8");

    expect(globalCss).toContain("--landing-tax-accent: #b88712");
    expect(heroSource).toContain("text-[var(--landing-tax-accent)]");
    expect(heroSource).toContain("border-[var(--landing-tax-accent)]/35");
    expect(heroSource).not.toContain("text-amber-700");
    expect(heroSource).not.toContain("bg-amber-500");
  });

  it("keeps the dashboard as an offwhite/navy Japanese dividend simulator", async () => {
    const dashboardSources = await Promise.all(
      [
        "../app/dashboard/page.tsx",
        "../components/dashboard/DashboardShell.tsx",
        "../components/dashboard/IncomeSimulation.tsx",
        "../components/dashboard/SignalExplainer.tsx",
        "../components/dashboard/YieldQualityScatter.tsx",
        "../components/dashboard/DividendSignalTable.tsx"
      ].map((file) => readFile(new URL(file, import.meta.url), "utf8"))
    );
    const source = dashboardSources.join("\n");

    expect(source).toContain("dashboard-light");
    expect(source).toContain("dashboard-panel");
    expect(source).toContain("自分の投資額");
    expect(source).toContain("毎月の手取り");
    expect(source).toContain("日本の税率20.315%");
    expect(source).toContain("配当リサーチ候補");
    expect(source).not.toContain("Excel由来の試算用リストです");
    expect(source).not.toContain("S&P500/Nasdaq構成銘柄リストではありません");
    expect(source).toContain("銘柄推奨ではありません");
    expect(source).toContain("useState");
    expect(source).toContain("investmentJpy");
    expect(source).toContain('id="portfolio-simulator" className="grid gap-5"');
    expect(source).not.toContain('id="portfolio-simulator" className="grid gap-5 xl:grid-cols');
    expect(source).not.toContain("GitHub");
    expect(source).not.toContain("Waitlist");
    expect(source).not.toContain("Sample dataset");
    expect(source).not.toContain("SAMPLE DATASET");
    expect(source).not.toContain("Deck");
    expect(source).not.toContain("$10k");
    expect(source).not.toContain("After-tax income lens");
    expect(source).not.toContain("glow-panel");
    expect(source).not.toContain("text-white");
  });

  it("keeps dashboard Japanese typography readable without ultra-heavy display weights", async () => {
    const dashboardSources = await Promise.all(
      [
        "../app/dashboard/page.tsx",
        "../components/dashboard/DashboardShell.tsx",
        "../components/dashboard/IncomeSimulation.tsx",
        "../components/dashboard/SignalExplainer.tsx",
        "../components/dashboard/YieldQualityScatter.tsx",
        "../components/dashboard/DividendSignalTable.tsx"
      ].map((file) => readFile(new URL(file, import.meta.url), "utf8"))
    );
    const source = dashboardSources.join("\n");

    expect(source).not.toContain("font-black");
    expect(source).not.toContain("display-font");
  });

  it("uses short dashboard state labels instead of verbose confirmation labels", async () => {
    const dashboardSources = await Promise.all(
      [
        "../components/dashboard/DividendSignalTable.tsx",
        "../components/dashboard/SignalExplainer.tsx",
        "../components/dashboard/YieldQualityScatter.tsx",
        "../components/dashboard/DashboardShell.tsx"
      ].map((file) => readFile(new URL(file, import.meta.url), "utf8"))
    );
    const source = dashboardSources.join("\n");

    expect(source).toContain('header: "状態"');
    expect(source).toContain('label: "良好"');
    expect(source).toContain('label: "通常"');
    expect(source).toContain('label: "注意"');
    expect(source).toContain('label: "要確認"');
    expect(source).not.toContain("確認ラベル");
    expect(source).not.toContain("確認強め");
    expect(source).not.toContain("経過確認");
    expect(source).not.toContain("注意点あり");
  });

  it("keeps dashboard state badges visible without vertical wrapping", async () => {
    const tableSource = await readFile(new URL("../components/dashboard/DividendSignalTable.tsx", import.meta.url), "utf8");

    expect(tableSource).toContain("stateColumnClassName");
    expect(tableSource).toContain("min-w-[7rem]");
    expect(tableSource).toContain("whitespace-nowrap");
    expect(tableSource).toContain("w-[4.75rem]");
    expect(tableSource).toContain("text-center");
  });

  it("keeps investment amount as free input without cramped preset buttons", async () => {
    const incomeSource = await readFile(new URL("../components/dashboard/IncomeSimulation.tsx", import.meta.url), "utf8");

    expect(incomeSource).toContain('id="investment-jpy"');
    expect(incomeSource).toContain("draftInvestmentJpy");
    expect(incomeSource).toContain("handleApplyInvestment");
    expect(incomeSource).toContain("試算に反映");
    expect(incomeSource).not.toContain("presetInvestmentAmounts");
    expect(incomeSource).not.toContain("500_000");
    expect(incomeSource).not.toContain("5_000_000");
  });

  it("supports multi-stock selection and visible table sorting", async () => {
    const shellSource = await readFile(new URL("../components/dashboard/DashboardShell.tsx", import.meta.url), "utf8");
    const tableSource = await readFile(new URL("../components/dashboard/DividendSignalTable.tsx", import.meta.url), "utf8");

    expect(shellSource).toContain("selectedTickers");
    expect(shellSource).toContain("selectedStocks");
    expect(shellSource).toContain("toggleStockSelection");
    expect(tableSource).toContain('header: "選択"');
    expect(tableSource).toContain("selectedTickers");
    expect(tableSource).toContain("onToggleSelection");
    expect(tableSource).toContain("searchQuery");
    expect(tableSource).toContain("filteredStocks");
    expect(tableSource).toContain("sortPresets");
    expect(tableSource).toContain("銘柄名・ティッカー・セクター・状態で検索");
    expect(tableSource).toContain("gradeMeta[stock.signal.grade].label");
    expect(tableSource).toContain("検索結果");
    expect(tableSource).toContain("スコア順");
    expect(tableSource).toContain("利回り順");
    expect(tableSource).toContain("ROE順");
    expect(tableSource).toContain("配当性向低い順");
    expect(tableSource).toContain("sortIndicator");
    expect(tableSource).toContain("getIsSorted");
    expect(tableSource).toContain("列見出しで並び替え");
  });

  it("turns the yield map into a dividend sustainability diagnostic surface", async () => {
    const mapSource = await readFile(new URL("../components/dashboard/YieldQualityScatter.tsx", import.meta.url), "utf8");

    expect(mapSource).toContain("配当継続力マップ");
    expect(mapSource).toContain("高利回り注意");
    expect(mapSource).toContain("高利回り・高ROE要確認");
    expect(mapSource).toContain("利回りの罠候補");
    expect(mapSource).toContain("低利回り・高ROE観察");
    expect(mapSource).toContain("要追加調査");
    expect(mapSource).toContain("clampDividendMapRoe");
    expect(mapSource).toContain("diagnosticTooltipLines");
    expect(mapSource).toContain("payoutRiskTier");
    expect(mapSource).toContain("dividendSustainabilityGuidePlugin");
    expect(mapSource).toContain("activeZoneLabels");
    expect(mapSource).toContain("filteredPoints");
    expect(mapSource).toContain("toggleZoneLayer");
    expect(mapSource).toContain("aria-pressed");
    expect(mapSource).toContain("全ゾーン");
  });

  it("adds a taxable-account monthly income lens and dividend calendar model", async () => {
    const shellSource = await readFile(new URL("../components/dashboard/DashboardShell.tsx", import.meta.url), "utf8");
    const incomeSource = await readFile(new URL("../components/dashboard/IncomeSimulation.tsx", import.meta.url), "utf8");
    const calendarSource = await readFile(new URL("../components/dashboard/DividendCalendar.tsx", import.meta.url), "utf8");

    expect(shellSource).toContain("DividendCalendar");
    expect(shellSource).not.toContain("accountType");
    expect(incomeSource).not.toContain("TaxAccountType");
    expect(incomeSource).toContain("課税口座");
    expect(incomeSource).not.toContain("NISA");
    expect(incomeSource).toContain("月5万円まであと");
    expect(incomeSource).toContain("必要元本");
    expect(incomeSource).toContain("教育用");
    expect(calendarSource).toContain("月別配当");
    expect(calendarSource).toContain("簡易モデル");
    expect(calendarSource).toContain("実際の支払月ではありません");
    expect(calendarSource).toContain("税引後手取り");
    expect(calendarSource).not.toContain("NISA");
    expect(calendarSource).not.toContain("bg-[var(--dividend-gold)]");
  });

  it("keeps public docs honest about implemented scope and planned work", async () => {
    const publicDocSources = await Promise.all(
      [
        "../README.md",
        "../docs/PUBLIC_LAUNCH.md",
        "../docs/ONTOLOGY.md",
        "../docs/LANGUAGE_DECISION.md",
        "../docs/LEGAL_DISCLAIMER.md",
        "../docs/RESEARCH.md",
        "../docs/superpowers/specs/2026-05-14-haitou-samurai-v1-1-design.md",
        "../docs/superpowers/plans/2026-04-26-haitou-samurai-mvp-lp-plan.md"
      ].map((file) => readFile(new URL(file, import.meta.url), "utf8"))
    );
    const docsSource = publicDocSources.join("\n");

    expect(docsSource).toContain("Implemented");
    expect(docsSource).toContain("Planned");
    expect(docsSource).toContain("public dividend research workflow");
    expect(docsSource).not.toContain("operational spreadsheet");
    expect(docsSource).not.toContain("Excel");
    expect(docsSource).not.toContain("spreadsheet");
    expect(docsSource).not.toContain("personal dividend-mining workbook");
    expect(docsSource).not.toContain("Workbook Sheet Mapping");
    expect(docsSource).not.toContain("original workbook purpose");
    expect(docsSource).not.toContain("/Users/");
    expect(docsSource).not.toContain("workbook-style");
    expect(docsSource).not.toContain("FDE portfolio project");
    expect(docsSource).not.toContain("GitHub stars");
    expect(docsSource).not.toContain("Star on GitHub");
    expect(docsSource).not.toContain("Waitlist");
    expect(docsSource).not.toContain("Lifetime Pro");
    expect(docsSource).not.toContain("Pro validation");
    expect(docsSource).not.toContain("Pro must sell");
    expect(docsSource).not.toContain("One-time purchase");
    expect(docsSource).not.toContain("TODO: add deployed URL");
    expect(docsSource).not.toContain("Demo URL:");
    expect(docsSource).not.toContain("tax_on_amount_above_threshold");
    expect(docsSource).not.toContain("Tax threshold");
  });
});

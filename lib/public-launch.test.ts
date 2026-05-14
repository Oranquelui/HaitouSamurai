import { describe, expect, it } from "vitest";
import { readFile } from "node:fs/promises";
import { dashboardTrustCopy, landingCtas, WAITLIST_ISSUE_URL } from "./public-links";
import { sampleDataNotice, shortDisclaimer } from "./disclaimer";

describe("public launch copy", () => {
  it("exposes a minimal public CTA path for demo, GitHub, and waitlist interest", () => {
    expect(landingCtas.map((cta) => cta.label)).toEqual([
      "Try Dashboard",
      "Star on GitHub",
      "Join Lifetime Pro Waitlist"
    ]);

    expect(landingCtas[0]).toMatchObject({ href: "/dashboard", priority: "primary" });
    expect(landingCtas[1].href).toBe("https://github.com/Oranquelui/HaitouSamurai");
    expect(WAITLIST_ISSUE_URL).toContain("issues/new");
  });

  it("keeps dashboard copy inside the research and sample-data boundary", () => {
    expect(shortDisclaimer).toContain("not investment advice");
    expect(shortDisclaimer).toContain("ticker recommendations");
    expect(sampleDataNotice).toContain("Sample dataset");
    expect(sampleDataNotice).toContain("not live market data");
    expect(dashboardTrustCopy).toEqual(
      expect.arrayContaining([
        expect.stringContaining("Static sample metrics"),
        expect.stringContaining("educational screening")
      ])
    );
  });

  it("declares the Next.js smooth scroll contract for route transitions", async () => {
    const layoutSource = await readFile(new URL("../app/layout.tsx", import.meta.url), "utf8");

    expect(layoutSource).toContain('data-scroll-behavior="smooth"');
  });

  it("uses the public brand name 配当サムライ / Haitou Samurai in metadata", async () => {
    const layoutSource = await readFile(new URL("../app/layout.tsx", import.meta.url), "utf8");

    expect(layoutSource).toContain("配当サムライ");
    expect(layoutSource).toContain("Haitou Samurai");
    expect(layoutSource).not.toContain("Dividend Mining Research Tool");
  });
});

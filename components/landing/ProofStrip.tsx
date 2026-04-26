const proofItems = [
  { label: "X API sample", value: "346", detail: "public posts analyzed" },
  { label: "JP demand", value: "NISA + income", detail: "cashflow stability" },
  { label: "EN demand", value: "yield traps", detail: "dividend-cut anxiety" },
  { label: "Core need", value: "explainable", detail: "why safe or risky" }
];

export function ProofStrip() {
  return (
    <section className="mx-auto max-w-7xl px-5 py-10 sm:px-8 lg:px-10">
      <div className="grid gap-3 md:grid-cols-4">
        {proofItems.map((item) => (
          <div key={item.label} className="glow-panel rounded-3xl p-5">
            <p className="text-xs uppercase tracking-[0.2em] text-cyan-200">{item.label}</p>
            <p className="mt-3 text-2xl font-black text-white">{item.value}</p>
            <p className="mt-2 text-sm text-slate-400">{item.detail}</p>
          </div>
        ))}
      </div>
    </section>
  );
}

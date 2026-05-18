import Link from "next/link";
import { DashboardShell } from "@/components/dashboard/DashboardShell";
import { stockSignals } from "@/lib/data/sample-stocks";
import { shortDisclaimer } from "@/lib/disclaimer";

export default function DashboardPage() {
  return (
    <main className="dashboard-light">
      <nav className="mx-auto flex max-w-7xl items-center justify-between px-5 py-5 sm:px-8 lg:px-10">
        <Link href="/" className="text-xl font-bold text-blue-950">配当サムライ</Link>
        <a className="samurai-button py-2 text-sm" href="#portfolio-simulator">自分の金額で試算</a>
      </nav>
      <DashboardShell stocks={stockSignals} />
      <div className="mx-auto max-w-7xl px-5 pb-12 text-xs leading-6 text-blue-950/55 sm:px-8 lg:px-10">{shortDisclaimer}</div>
    </main>
  );
}

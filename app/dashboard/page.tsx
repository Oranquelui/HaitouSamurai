import Link from "next/link";
import { DashboardShell } from "@/components/dashboard/DashboardShell";
import { stockSignals } from "@/lib/data/sample-stocks";
import { shortDisclaimer } from "@/lib/disclaimer";

export default function DashboardPage() {
  return (
    <main>
      <nav className="mx-auto flex max-w-7xl items-center justify-between px-5 py-5 sm:px-8 lg:px-10">
        <Link href="/" className="display-font text-3xl text-white">HaitouSamurai</Link>
        <a className="ghost-button py-2 text-sm" href="https://github.com/Oranquelui/HaitouSamurai" target="_blank" rel="noreferrer">GitHub</a>
      </nav>
      <DashboardShell stocks={stockSignals} />
      <div className="mx-auto max-w-7xl px-5 pb-12 text-xs leading-6 text-slate-500 sm:px-8 lg:px-10">{shortDisclaimer}</div>
    </main>
  );
}

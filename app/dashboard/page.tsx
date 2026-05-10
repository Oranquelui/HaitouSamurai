import Link from "next/link";
import { DashboardShell } from "@/components/dashboard/DashboardShell";
import { stockSignals } from "@/lib/data/sample-stocks";
import { shortDisclaimer } from "@/lib/disclaimer";
import { GITHUB_REPO_URL, WAITLIST_ISSUE_URL } from "@/lib/public-links";

export default function DashboardPage() {
  return (
    <main>
      <nav className="mx-auto flex max-w-7xl items-center justify-between px-5 py-5 sm:px-8 lg:px-10">
        <Link href="/" className="display-font text-3xl text-white">HaitouSamurai</Link>
        <div className="flex items-center gap-2">
          <a className="ghost-button py-2 text-sm" href={GITHUB_REPO_URL} target="_blank" rel="noreferrer">GitHub</a>
          <a className="ghost-button py-2 text-sm" href={WAITLIST_ISSUE_URL} target="_blank" rel="noreferrer">Waitlist</a>
        </div>
      </nav>
      <DashboardShell stocks={stockSignals} />
      <div className="mx-auto max-w-7xl px-5 pb-12 text-xs leading-6 text-slate-500 sm:px-8 lg:px-10">{shortDisclaimer}</div>
    </main>
  );
}

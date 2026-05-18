"use client";

import {
  flexRender,
  getCoreRowModel,
  getSortedRowModel,
  useReactTable,
  type ColumnDef,
  type SortingState
} from "@tanstack/react-table";
import { useMemo, useState } from "react";
import type { StockSignalRecord } from "@/lib/data/sample-stocks";
import type { SignalGrade } from "@/lib/scoring/dividend-score";

const gradeMeta: Record<SignalGrade, { label: string; className: string }> = {
  "High Coverage": { label: "良好", className: "bg-blue-950 text-[#fffdf7]" },
  Monitor: { label: "通常", className: "bg-blue-200 text-blue-950 ring-blue-950/10" },
  "Risk Flags": { label: "注意", className: "bg-amber-200 text-amber-950 ring-amber-800/15" },
  "Needs Review": { label: "要確認", className: "bg-rose-200 text-rose-950 ring-rose-900/15" }
};

const stateColumnClassName = "w-[7rem] min-w-[7rem] text-center";
const stateBadgeClassName = "inline-flex w-[4.75rem] items-center justify-center whitespace-nowrap rounded-md px-2.5 py-1.5 text-sm font-bold leading-none shadow-sm ring-1 ring-inset";
const sortPresets: Array<{ label: string; sorting: SortingState }> = [
  { label: "スコア順", sorting: [{ id: "score", desc: true }] },
  { label: "利回り順", sorting: [{ id: "dividendYield", desc: true }] },
  { label: "ROE順", sorting: [{ id: "roe", desc: true }] },
  { label: "配当性向低い順", sorting: [{ id: "payoutRatio", desc: false }] },
  { label: "銘柄順", sorting: [{ id: "ticker", desc: false }] }
];

export function DividendSignalTable({
  stocks,
  selectedTickers,
  onToggleSelection
}: {
  stocks: StockSignalRecord[];
  selectedTickers: string[];
  onToggleSelection: (stock: StockSignalRecord) => void;
}) {
  const [sorting, setSorting] = useState<SortingState>([{ id: "score", desc: true }]);
  const [searchQuery, setSearchQuery] = useState("");
  const selectedTickerSet = useMemo(() => new Set(selectedTickers), [selectedTickers]);
  const normalizedSearchQuery = searchQuery.trim().toLowerCase();
  const filteredStocks = useMemo(() => {
    if (!normalizedSearchQuery) {
      return stocks;
    }

    return stocks.filter((stock) => {
      const publicStateLabel = gradeMeta[stock.signal.grade].label;

      return [stock.ticker, stock.name, stock.sector, stock.signal.grade, publicStateLabel]
        .join(" ")
        .toLowerCase()
        .includes(normalizedSearchQuery);
    });
  }, [normalizedSearchQuery, stocks]);

  const columns = useMemo<ColumnDef<StockSignalRecord>[]>(
    () => [
      {
        id: "select",
        header: "選択",
        enableSorting: false,
        cell: ({ row }) => {
          const isSelected = selectedTickerSet.has(row.original.ticker);
          return (
            <button
              aria-label={`${row.original.ticker}を選択`}
              aria-pressed={isSelected}
              className={`inline-flex h-8 w-8 items-center justify-center rounded-md border text-sm font-bold transition ${isSelected ? "border-blue-950 bg-blue-950 text-[#fffdf7]" : "border-blue-950/25 bg-white/70 text-blue-950"}`}
              type="button"
              onClick={(event) => {
                event.stopPropagation();
                onToggleSelection(row.original);
              }}
            >
              {isSelected ? "✓" : ""}
            </button>
          );
        }
      },
      {
        accessorKey: "ticker",
        header: "銘柄",
        cell: ({ row }) => <span className="font-semibold text-blue-950">{row.original.ticker}</span>
      },
      {
        accessorKey: "name",
        header: "名称",
        cell: ({ row }) => <span className="text-blue-950/70">{row.original.name}</span>
      },
      {
        id: "score",
        accessorFn: (row) => row.signal.score,
        header: "確認スコア",
        cell: ({ row }) => <span className="font-semibold text-blue-900">{row.original.signal.score}</span>
      },
      {
        id: "grade",
        accessorFn: (row) => row.signal.grade,
        header: "状態",
        cell: ({ row }) => {
          const grade = gradeMeta[row.original.signal.grade];
          return <span className={`${stateBadgeClassName} ${grade.className}`}>{grade.label}</span>;
        }
      },
      {
        accessorKey: "dividendYield",
        header: "利回り",
        cell: ({ row }) => `${row.original.dividendYield.toFixed(1)}%`
      },
      {
        accessorKey: "payoutRatio",
        header: "配当性向",
        cell: ({ row }) => `${row.original.payoutRatio.toFixed(0)}%`
      },
      {
        accessorKey: "roe",
        header: "ROE",
        cell: ({ row }) => `${row.original.roe.toFixed(1)}%`
      },
      {
        accessorKey: "netProfitMargin",
        header: "純利益率",
        cell: ({ row }) => `${row.original.netProfitMargin.toFixed(1)}%`
      },
      {
        accessorKey: "epsGrowthThisYear",
        header: "EPS成長",
        cell: ({ row }) => `${row.original.epsGrowthThisYear.toFixed(1)}%`
      },
      {
        accessorKey: "totalDebtToEquity",
        header: "総D/E",
        cell: ({ row }) => row.original.totalDebtToEquity.toFixed(2)
      }
    ],
    [onToggleSelection, selectedTickerSet]
  );

  const table = useReactTable({
    data: filteredStocks,
    columns,
    state: { sorting },
    onSortingChange: setSorting,
    getCoreRowModel: getCoreRowModel(),
    getSortedRowModel: getSortedRowModel()
  });

  return (
    <div className="dashboard-panel overflow-hidden">
      <div className="border-b border-blue-950/12 p-5">
        <p className="kicker">配当リサーチ候補</p>
        <div className="mt-1 flex flex-col gap-3 sm:flex-row sm:items-end sm:justify-between">
          <div>
            <h2 className="text-2xl font-bold text-blue-950">配当候補を選んで試算する</h2>
            <p className="mt-2 text-sm leading-6 text-blue-950/60">公開情報でリサーチした配当あり銘柄を、試算用データとして更新していく前提です。銘柄推奨ではありません。</p>
          </div>
          <span className="rounded-md border border-blue-950/12 bg-white/70 px-3 py-1 text-xs font-semibold text-blue-950/60">列見出しで並び替え</span>
        </div>
        <div className="mt-5 grid gap-3 lg:grid-cols-[minmax(0,1fr)_auto] lg:items-end">
          <div>
            <label className="text-xs font-semibold tracking-[0.14em] text-blue-950/45" htmlFor="stock-search">
              銘柄名・ティッカー・セクター・状態で検索
            </label>
            <div className="mt-2 grid gap-2 sm:grid-cols-[minmax(0,1fr)_auto]">
              <input
                id="stock-search"
                className="min-h-11 w-full rounded-md border border-blue-950/18 bg-white/75 px-4 text-sm font-semibold text-blue-950 outline-none transition placeholder:text-blue-950/35 focus:border-blue-900 focus:ring-4 focus:ring-blue-900/10"
                placeholder="AAPL / Apple / Technology"
                type="search"
                value={searchQuery}
                onChange={(event) => setSearchQuery(event.target.value)}
              />
              <button
                className="min-h-11 rounded-md border border-blue-950/14 bg-white/70 px-4 text-sm font-bold text-blue-950/70 transition hover:border-blue-950/30 hover:bg-white disabled:cursor-not-allowed disabled:opacity-35"
                disabled={!searchQuery}
                type="button"
                onClick={() => setSearchQuery("")}
              >
                クリア
              </button>
            </div>
            <p className="mt-2 text-xs font-semibold tracking-[0.12em] text-blue-950/45">
              検索結果 {filteredStocks.length} / {stocks.length} 件
            </p>
          </div>
          <div className="flex flex-wrap gap-2">
            {sortPresets.map((preset) => {
              const isActive = sorting[0]?.id === preset.sorting[0]?.id && sorting[0]?.desc === preset.sorting[0]?.desc;

              return (
                <button
                  key={preset.label}
                  aria-pressed={isActive}
                  className={isActive ? "rounded-md bg-blue-950 px-3 py-2 text-xs font-bold text-[#fffdf7]" : "rounded-md border border-blue-950/12 bg-white/70 px-3 py-2 text-xs font-bold text-blue-950/65 transition hover:border-blue-950/30 hover:text-blue-950"}
                  type="button"
                  onClick={() => setSorting(preset.sorting)}
                >
                  {preset.label}
                </button>
              );
            })}
          </div>
        </div>
      </div>
      <div className="overflow-x-auto">
        <table className="w-full min-w-[1220px] text-left text-sm">
          <thead className="bg-blue-950/[0.04] text-xs font-semibold tracking-[0.14em] text-blue-950/55">
            {table.getHeaderGroups().map((headerGroup) => (
              <tr key={headerGroup.id}>
                {headerGroup.headers.map((header) => {
                  const sortDirection = header.column.getIsSorted();
                  const sortIndicator = sortDirection === "asc" ? "↑" : sortDirection === "desc" ? "↓" : "↕";
                  return (
                    <th key={header.id} className={`px-5 py-4 ${header.column.id === "grade" ? stateColumnClassName : ""}`}>
                      {header.column.getCanSort() ? (
                        <button className="inline-flex items-center gap-1.5 whitespace-nowrap hover:text-blue-950" onClick={header.column.getToggleSortingHandler()}>
                          <span>{flexRender(header.column.columnDef.header, header.getContext())}</span>
                          <span className="text-blue-950/35">{sortIndicator}</span>
                        </button>
                      ) : (
                        <span className="whitespace-nowrap">{flexRender(header.column.columnDef.header, header.getContext())}</span>
                      )}
                    </th>
                  );
                })}
              </tr>
            ))}
          </thead>
          <tbody>
            {table.getRowModel().rows.map((row) => {
              const isSelected = selectedTickerSet.has(row.original.ticker);
              return (
                <tr
                  key={row.id}
                  className={`cursor-pointer border-t border-blue-950/10 transition ${isSelected ? "bg-blue-950/10" : "hover:bg-blue-950/[0.04]"}`}
                  onClick={() => onToggleSelection(row.original)}
                >
                  {row.getVisibleCells().map((cell) => (
                    <td key={cell.id} className={`px-5 py-4 text-blue-950/70 ${cell.column.id === "grade" ? stateColumnClassName : ""}`}>
                      {flexRender(cell.column.columnDef.cell, cell.getContext())}
                    </td>
                  ))}
                </tr>
              );
            })}
          </tbody>
        </table>
        {filteredStocks.length === 0 ? (
          <div className="border-t border-blue-950/10 bg-white/50 px-5 py-10 text-center text-sm font-semibold text-blue-950/55">
            該当する銘柄がありません。検索語を変えてください。
          </div>
        ) : null}
      </div>
    </div>
  );
}

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
import { signalColorByGrade } from "@/lib/ontology/signals";

export function DividendSignalTable({
  stocks,
  selectedTicker,
  onSelect
}: {
  stocks: StockSignalRecord[];
  selectedTicker: string;
  onSelect: (stock: StockSignalRecord) => void;
}) {
  const [sorting, setSorting] = useState<SortingState>([{ id: "score", desc: true }]);

  const columns = useMemo<ColumnDef<StockSignalRecord>[]>(
    () => [
      {
        accessorKey: "ticker",
        header: "Ticker",
        cell: ({ row }) => <span className="font-black text-white">{row.original.ticker}</span>
      },
      {
        accessorKey: "name",
        header: "Name",
        cell: ({ row }) => <span className="text-slate-300">{row.original.name}</span>
      },
      {
        id: "score",
        accessorFn: (row) => row.signal.score,
        header: "Coverage",
        cell: ({ row }) => <span className="font-black text-cyan-200">{row.original.signal.score}</span>
      },
      {
        id: "grade",
        accessorFn: (row) => row.signal.grade,
        header: "Review",
        cell: ({ row }) => (
          <span className="rounded-full px-3 py-1 text-xs font-black" style={{ backgroundColor: `${signalColorByGrade[row.original.signal.grade]}22`, color: signalColorByGrade[row.original.signal.grade] }}>
            {row.original.signal.grade}
          </span>
        )
      },
      {
        accessorKey: "dividendYield",
        header: "Yield",
        cell: ({ row }) => `${row.original.dividendYield.toFixed(1)}%`
      },
      {
        accessorKey: "payoutRatio",
        header: "Payout",
        cell: ({ row }) => `${row.original.payoutRatio.toFixed(0)}%`
      },
      {
        accessorKey: "roe",
        header: "ROE",
        cell: ({ row }) => `${row.original.roe.toFixed(1)}%`
      },
      {
        accessorKey: "netProfitMargin",
        header: "Net Margin",
        cell: ({ row }) => `${row.original.netProfitMargin.toFixed(1)}%`
      },
      {
        accessorKey: "epsGrowthThisYear",
        header: "EPS Y",
        cell: ({ row }) => `${row.original.epsGrowthThisYear.toFixed(1)}%`
      },
      {
        accessorKey: "totalDebtToEquity",
        header: "Total D/E",
        cell: ({ row }) => row.original.totalDebtToEquity.toFixed(2)
      }
    ],
    []
  );

  const table = useReactTable({
    data: stocks,
    columns,
    state: { sorting },
    onSortingChange: setSorting,
    getCoreRowModel: getCoreRowModel(),
    getSortedRowModel: getSortedRowModel()
  });

  return (
    <div className="glow-panel overflow-hidden rounded-[1.75rem]">
      <div className="border-b border-white/10 p-5">
        <p className="kicker">Screening Table</p>
        <h2 className="mt-1 text-2xl font-black text-white">Dividend Mining Metrics</h2>
      </div>
      <div className="overflow-x-auto">
        <table className="w-full min-w-[1120px] text-left text-sm">
          <thead className="bg-white/[0.035] text-xs uppercase tracking-[0.14em] text-slate-400">
            {table.getHeaderGroups().map((headerGroup) => (
              <tr key={headerGroup.id}>
                {headerGroup.headers.map((header) => (
                  <th key={header.id} className="px-5 py-4">
                    <button className="hover:text-cyan-200" onClick={header.column.getToggleSortingHandler()}>
                      {flexRender(header.column.columnDef.header, header.getContext())}
                    </button>
                  </th>
                ))}
              </tr>
            ))}
          </thead>
          <tbody>
            {table.getRowModel().rows.map((row) => {
              const isSelected = row.original.ticker === selectedTicker;
              return (
                <tr
                  key={row.id}
                  className={`cursor-pointer border-t border-white/5 transition ${isSelected ? "bg-cyan-300/10" : "hover:bg-white/[0.04]"}`}
                  onClick={() => onSelect(row.original)}
                >
                  {row.getVisibleCells().map((cell) => (
                    <td key={cell.id} className="px-5 py-4 text-slate-300">
                      {flexRender(cell.column.columnDef.cell, cell.getContext())}
                    </td>
                  ))}
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </div>
  );
}

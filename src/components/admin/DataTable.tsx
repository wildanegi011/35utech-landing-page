"use client";

import * as React from "react";
import {
  ColumnDef,
  flexRender,
  getCoreRowModel,
  getPaginationRowModel,
  useReactTable,
} from "@tanstack/react-table";

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

interface DataTableProps<TData, TValue> {
  columns: ColumnDef<TData, TValue>[];
  data: TData[];
  pageSize?: number;
}

export function DataTable<TData, TValue>({
  columns,
  data,
  pageSize = 10,
}: DataTableProps<TData, TValue>) {
  const [pagination, setPagination] = React.useState({
    pageIndex: 0,
    pageSize: pageSize,
  });

  const table = useReactTable({
    data,
    columns,
    getCoreRowModel: getCoreRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    onPaginationChange: setPagination,
    state: {
      pagination,
    },
  });

  return (
    <div className="space-y-6">
      <div className="relative rounded-[24px] border border-slate-200/60 bg-white shadow-sm overflow-hidden">
        <div className="overflow-x-auto no-scrollbar">
          <Table>
            <TableHeader className="bg-slate-50/50 border-b border-slate-100">
              {table.getHeaderGroups().map((headerGroup) => (
                <TableRow key={headerGroup.id} className="hover:bg-transparent border-none">
                  {headerGroup.headers.map((header) => (
                    <TableHead
                      key={header.id}
                      className="h-11 px-6 text-[11px] font-black uppercase tracking-widest text-slate-400 select-none"
                    >
                      {header.isPlaceholder
                        ? null
                        : flexRender(header.column.columnDef.header, header.getContext())}
                    </TableHead>
                  ))}
                </TableRow>
              ))}
            </TableHeader>
            <TableBody>
              {table.getRowModel().rows?.length ? (
                table.getRowModel().rows.map((row) => (
                  <TableRow
                    key={row.id}
                    className="group border-b border-slate-50 last:border-0 transition-colors hover:bg-slate-50/20"
                  >
                    {row.getVisibleCells().map((cell) => (
                      <TableCell
                        key={cell.id}
                        className="px-6 py-4 text-xs font-bold text-slate-600 transition-colors group-hover:text-slate-900"
                      >
                        {flexRender(cell.column.columnDef.cell, cell.getContext())}
                      </TableCell>
                    ))}
                  </TableRow>
                ))
              ) : (
                <TableRow>
                  <TableCell colSpan={columns.length} className="h-48 text-center text-xs font-bold text-slate-400 uppercase tracking-widest">
                    Tidak ada data ditemukan
                  </TableCell>
                </TableRow>
              )}
            </TableBody>
          </Table>
        </div>

        {/* Pagination Footer - Exact Design Match */}
        <div className="bg-slate-50/30 px-6 py-4 flex items-center justify-between border-t border-slate-100">
          <div className="flex items-center gap-8">
            {/* Showing Info */}
            <p className="text-sm font-bold text-slate-400 tracking-wide">
              Menampilkan
              <span className="text-slate-600 mx-1.5 font-extrabold">
                {table.getState().pagination.pageIndex * table.getState().pagination.pageSize + 1}-
                {Math.min((table.getState().pagination.pageIndex + 1) * table.getState().pagination.pageSize, data.length)}
              </span>
              dari
              <span className="text-slate-600 mx-1.5 font-extrabold">{data.length}</span>
              data
            </p>

            {/* Page Size Selector */}
            <div className="flex items-center gap-3">
              <span className="text-[11px] font-black uppercase tracking-widest text-slate-400">Tampilan</span>
              <select
                value={table.getState().pagination.pageSize}
                onChange={(e) => table.setPageSize(Number(e.target.value))}
                className="bg-white border border-slate-200 rounded-lg px-2.5 py-1.5 text-xs font-extrabold text-slate-600 focus:outline-none focus:ring-1 focus:ring-primary/20 transition-all cursor-pointer shadow-sm"
              >
                {[5, 10, 25, 50].map((size) => (
                  <option key={size} value={size}>{size} baris</option>
                ))}
              </select>
            </div>
          </div>

          {/* Numbered Dots Navigation */}
          <div className="flex items-center gap-1.5">
            <Button
              variant="ghost" size="icon"
              onClick={() => table.previousPage()}
              disabled={!table.getCanPreviousPage()}
              className="w-8 h-8 text-slate-400 hover:text-primary disabled:opacity-30"
            >
              <span className="text-lg">‹</span>
            </Button>

            <div className="flex items-center gap-1.5">
              {Array.from({ length: Math.min(table.getPageCount(), 5) }, (_, i) => (
                <Button
                  key={i}
                  size="sm"
                  onClick={() => table.setPageIndex(i)}
                  className={cn(
                    "w-9 h-9 rounded-lg text-xs font-black transition-all",
                    table.getState().pagination.pageIndex === i
                      ? "bg-primary text-white shadow-sm"
                      : "bg-transparent text-slate-500 hover:text-slate-900 hover:bg-slate-100"
                  )}
                >
                  {i + 1}
                </Button>
              ))}
              {table.getPageCount() > 5 && <span className="text-slate-300 mx-1.5 text-base font-bold">...</span>}
            </div>

            <Button
              variant="ghost" size="icon"
              onClick={() => table.nextPage()}
              disabled={!table.getCanNextPage()}
              className="w-8 h-8 text-slate-400 hover:text-primary disabled:opacity-30"
            >
              <span className="text-lg">›</span>
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}

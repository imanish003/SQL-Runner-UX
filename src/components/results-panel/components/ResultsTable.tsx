import { IResultsData } from "@/types";
import { TABLE_CONFIG } from "../constants";
import useResultsTable from "../hooks/useResultsTable";
import { flexRender } from "@tanstack/react-table";
import type { Table, Row } from "@tanstack/react-table";
import type { Virtualizer } from "@tanstack/react-virtual";
import { memo, useRef } from "react";
import TableLoadingSkeleton from "./TableLoadingSkeleton";
import EmptyTableState from "./EmptyTableState";
import { cn } from "@/utils/cn";
import { GripVerticalIcon } from "lucide-react";

type TableRowData = Record<string, string | number>;

export interface IResultsTableProps {
  /** The data to display in the table */
  data?: IResultsData;
  /** Loading state indicator */
  isLoading?: boolean;
}

/**
 * Component for rendering the table header with column headers and resize handles.
 */
function TableHeader({ table }: { table: Table<TableRowData> }) {
  return (
    <div className="sticky top-0 z-10 shadow-sm" role="rowgroup">
      <div
        className="flex"
        style={{ width: table.getCenterTotalSize() }}
        role="row"
      >
        {table.getHeaderGroups().map((headerGroup) =>
          headerGroup.headers.map((header) => (
            <div
              key={header.id}
              className="text-xs sm:text-sm font-semibold whitespace-nowrap px-4 bg-muted border-r border-border hover:border-r-primary-foreground flex items-center relative text-foreground uppercase tracking-wide"
              style={{
                width: header.getSize(),
                height: `${TABLE_CONFIG.HEADER_HEIGHT}px`,
              }}
              title={header.column.columnDef.header as string}
              role="columnheader"
            >
              <span className="truncate">
                {flexRender(
                  header.column.columnDef.header,
                  header.getContext()
                )}
              </span>

              {/* Resize Handle */}
              <div
                onMouseDown={header.getResizeHandler()}
                onTouchStart={header.getResizeHandler()}
                className={cn(
                  "absolute right-0 top-0 h-full cursor-col-resize select-none bg-transparent hover:bg-primary/40 transition-colors flex items-center justify-center z-1 group translate-x-1/2",
                  header.column.getIsResizing() && "bg-primary"
                )}
                role="button"
                tabIndex={0}
                aria-label={`Resize ${header.column.columnDef.header} column`}
              >
                <GripVerticalIcon className="h-3 w-3 text-muted-foreground group-hover:text-primary-foreground" />
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
}

/**
 * Component for rendering virtualized rows.
 */
function VirtualizedRows({
  rows,
  virtualizer,
  table,
}: {
  rows: Row<TableRowData>[];
  virtualizer: Virtualizer<HTMLDivElement, Element>;
  table: Table<TableRowData>;
}) {
  return (
    <div
      style={{
        height: `${virtualizer.getTotalSize()}px`,
        position: "relative",
        width: table.getCenterTotalSize(),
      }}
      role="rowgroup"
    >
      {virtualizer.getVirtualItems().map((virtualRow) => {
        const row = rows[virtualRow.index];
        if (!row) return null;

        return (
          <div
            key={row.id}
            className="absolute border-b flex cursor-pointer hover:bg-muted/50 transition-colors"
            style={{
              height: `${TABLE_CONFIG.ROW_HEIGHT}px`,
              transform: `translateY(${virtualRow.start}px)`,
              width: table.getCenterTotalSize(),
            }}
            role="row"
            tabIndex={0}
          >
            {row.getVisibleCells().map((cell) => (
              <div
                key={cell.id}
                className="text-xs sm:text-sm px-4 whitespace-nowrap flex items-center border-r bg-background"
                style={{
                  height: `${TABLE_CONFIG.ROW_HEIGHT}px`,
                  width: cell.column.getSize(),
                }}
                title={String(cell.getValue())}
                role="cell"
              >
                <span className="truncate">
                  {flexRender(cell.column.columnDef.cell, cell.getContext())}
                </span>
              </div>
            ))}
          </div>
        );
      })}
    </div>
  );
}

/**
 * Component for rendering non-virtualized rows.
 */
function NonVirtualizedRows({
  rows,
  table,
}: {
  rows: Row<TableRowData>[];
  table: Table<TableRowData>;
}) {
  return (
    <div
      className="flex flex-col"
      style={{ width: table.getCenterTotalSize() }}
      role="rowgroup"
    >
      {rows.map((row) => (
        <div
          key={row.id}
          className="flex border-b cursor-pointer hover:bg-muted/50 transition-colors"
          role="row"
          tabIndex={0}
        >
          {row.getVisibleCells().map((cell) => (
            <div
              key={cell.id}
              className="text-xs sm:text-sm px-4 whitespace-nowrap flex items-center border-r"
              style={{
                height: `${TABLE_CONFIG.ROW_HEIGHT}px`,
                width: cell.column.getSize(),
              }}
              title={String(cell.getValue())}
              role="cell"
            >
              <span className="truncate">
                {flexRender(cell.column.columnDef.cell, cell.getContext())}
              </span>
            </div>
          ))}
        </div>
      ))}
    </div>
  );
}

/**
 * A high-performance table component for displaying query results with virtualization support.
 *
 * Features:
 * - Virtualization for large datasets (>50 rows)
 * - Column resizing with visual feedback
 * - Accessibility support (ARIA roles, keyboard navigation)
 * - Loading and empty states
 * - Responsive design
 */
export function ResultsTable({ data, isLoading = false }: IResultsTableProps) {
  const scrollableContainerRef = useRef<HTMLDivElement>(null);

  const { table, rows, shouldVirtualize, virtualizer } = useResultsTable(
    data,
    scrollableContainerRef
  );

  if (isLoading) {
    return <TableLoadingSkeleton />;
  }

  if (!data?.rows?.length) {
    return <EmptyTableState />;
  }

  return (
    <div
      className="h-full flex flex-col"
      role="table"
      aria-label="Query results table"
    >
      {/* Scrollable Container with Header */}
      <div
        ref={scrollableContainerRef}
        className="flex-1 overflow-auto min-h-[200px]"
        role="presentation"
      >
        <TableHeader table={table} />

        {shouldVirtualize ? (
          <VirtualizedRows
            rows={rows}
            virtualizer={virtualizer}
            table={table}
          />
        ) : (
          <NonVirtualizedRows rows={rows} table={table} />
        )}
      </div>
    </div>
  );
}

export default memo(ResultsTable);

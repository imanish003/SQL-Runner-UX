import { IResultsData } from "@/types";
import { TABLE_CONFIG } from "../constants";
import { getCoreRowModel, useReactTable } from "@tanstack/react-table";
import { useVirtualizer } from "@tanstack/react-virtual";
import { useMemo } from "react";

/**
 * Consolidated hook for ResultsTable functionality
 * Combines table setup, column configuration, and virtualization
 */
export default function useResultsTable(
  data: IResultsData | undefined,
  parentRef: React.RefObject<HTMLDivElement | null>
) {
  // Column creation logic
  const columns = useMemo(() => {
    if (!data?.columns?.length) {
      return [];
    }

    return data.columns.map((columnName) => ({
      accessorFn: (row: Record<string, unknown>) => row[columnName],
      id: columnName,
      header: columnName,
      size: TABLE_CONFIG.DEFAULT_COLUMN_WIDTH,
      minSize: TABLE_CONFIG.MIN_COLUMN_WIDTH,
    }));
  }, [data?.columns]);

  // Table setup logic
  const table = useReactTable({
    data: data?.rows ?? [],
    columns,
    getCoreRowModel: getCoreRowModel(),
    enableColumnResizing: true,
    columnResizeMode: "onChange",
    defaultColumn: {
      minSize: TABLE_CONFIG.MIN_COLUMN_WIDTH,
      size: TABLE_CONFIG.DEFAULT_COLUMN_WIDTH,
    },
  });

  const rows = table.getRowModel().rows;
  const shouldVirtualize = rows.length > TABLE_CONFIG.VIRTUALIZATION_THRESHOLD;

  // Virtualization setup
  const virtualizer = useVirtualizer({
    count: rows.length,
    getScrollElement: () => parentRef.current,
    estimateSize: () => TABLE_CONFIG.ROW_HEIGHT,
    enabled: shouldVirtualize,
  });

  return {
    table,
    rows,
    shouldVirtualize,
    columns,
    virtualizer,
  };
}

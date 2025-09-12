/**
 * Table transformation utilities for converting raw JSON data into table format
 */
import { IResultsData } from "@/types";
import { flattenDataItem, FlattenedData } from "./dataFlattening";

const EMPTY_RESULTS_DATA: IResultsData = {
  columns: [],
  rows: [],
  totalRows: 0,
  executionTime: 0,
};

/**
 * Extracts column names from flattened data rows
 */
export function extractColumnNames(rows: FlattenedData[]): string[] {
  if (rows.length === 0) return [];
  return Object.keys(rows[0]);
}

/**
 * Filters out empty objects from the transformed data
 */
function filterValidRows(data: FlattenedData[]): FlattenedData[] {
  return data.filter((item) => Object.keys(item).length > 0);
}

/**
 * Transforms raw JSON array into ResultsData format for table display
 *
 * @param rawData - Array of raw JSON objects to transform
 * @returns Structured table data with columns, rows, and metadata
 *
 * @example
 * ```ts
 * const data = [{ name: "John", address: { city: "NYC" } }];
 * const result = transformToTableData(data);
 *
 * Returns: { columns: ["address.city", "name"], rows: [...], totalRows: 1, executionTime: 0.001 }
 * ```
 */
export function transformToTableData(rawData: unknown[]): IResultsData {
  const startTime = performance.now();

  if (!Array.isArray(rawData) || rawData.length === 0) {
    return EMPTY_RESULTS_DATA;
  }

  const transformedData = filterValidRows(
    rawData.map((item) => {
      if (typeof item === "object" && item !== null) {
        return flattenDataItem(item as Record<string, unknown>);
      }
      return {};
    })
  );

  if (transformedData.length === 0) {
    return EMPTY_RESULTS_DATA;
  }

  const columns = extractColumnNames(transformedData);
  const executionTime = (performance.now() - startTime) / 1000;

  return {
    columns,
    rows: transformedData,
    totalRows: rawData.length,
    executionTime: Math.round(executionTime * 1000) / 1000,
  };
}

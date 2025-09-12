export interface IQuery {
  id: string;
  title: string;
  description: string;
  rowCount: number;
  sql: string;
}

export interface IResultsData {
  columns: string[];
  rows: Record<string, string | number>[];
  totalRows: number;
  executionTime: number;
}

import { useState, useCallback, useEffect } from "react";
import { IResultsData } from "@/types";
import { fetchDataForQuery } from "@/utils/apiClient";
import { transformToTableData } from "@/utils/tableTransformation";

const simulateArtificialDelay = async () => {
  const delay = Math.random() * 500 + 500; // 500ms to 1000ms
  await new Promise((resolve) => setTimeout(resolve, delay));
};

/**
 * Custom hook for managing query results in QueryRunner
 * Handles loading state, error state, and data fetching
 */
export default function useQueryResults(selectedQueryId: string) {
  const [isLoading, setIsLoading] = useState(false);
  const [resultsData, setResultsData] = useState<IResultsData | null>(null);
  const [error, setError] = useState<string | null>(null);

  // Function to fetch and transform data
  const executeQuery = useCallback(async () => {
    setIsLoading(true);
    setError(null);

    try {
      await simulateArtificialDelay();

      // Fetch raw data
      const rawData = await fetchDataForQuery(selectedQueryId);

      // Transform to table format
      const results = transformToTableData(rawData);

      setResultsData(results);
    } catch (err) {
      console.warn("Error executing query:", err);
      setError(err instanceof Error ? err.message : "An error occurred");

      // Set empty results on error
      setResultsData({
        columns: [],
        rows: [],
        totalRows: 0,
        executionTime: 0,
      });
    } finally {
      setIsLoading(false);
    }
  }, [selectedQueryId]);

  const clearResults = useCallback(() => {
    setResultsData(null);
    setError(null);
  }, []);

  // Automatically clear results and error when query ID changes
  useEffect(() => {
    clearResults();
  }, [selectedQueryId, clearResults]);

  return {
    isLoading,
    resultsData,
    error,
    executeQuery,
    clearResults,
  };
}

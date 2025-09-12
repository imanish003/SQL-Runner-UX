"use client";

import { useQueryResults, useSelectedQuery } from "./hooks";
import Sidebar from "@/components/sidebar";
import { MainContent } from "./components";
import { useCallback } from "react";

export default function QueryRunner() {
  const { selectedQueryId, queryText, setQueryText, handleQuerySelect } =
    useSelectedQuery();

  const { isLoading, resultsData, executeQuery, clearResults, error } =
    useQueryResults(selectedQueryId);

  const handleClearQuery = useCallback(() => {
    setQueryText("");
    clearResults();
  }, [setQueryText, clearResults]);

  return (
    <div className="h-screen bg-background flex relative">
      <Sidebar
        selectedQueryId={selectedQueryId}
        onQuerySelect={handleQuerySelect}
      />
      <MainContent
        queryText={queryText}
        setQueryText={setQueryText}
        executeQuery={executeQuery}
        isLoading={isLoading}
        resultsData={resultsData}
        error={error}
        onClearQuery={handleClearQuery}
      />
    </div>
  );
}

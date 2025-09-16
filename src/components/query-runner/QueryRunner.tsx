"use client";

import { useQueryResults, useSelectedQuery } from "./hooks";
import { useCallback, Suspense, lazy } from "react";
import LoadingSpinner from "@/components/ui/loading-spinner";

// Lazy load heavy components
const Sidebar = lazy(() => import("@/components/sidebar"));
const MainContent = lazy(() => import("./components/MainContent"));

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
      <Suspense fallback={<LoadingSpinner className="w-full" />}>
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
      </Suspense>
    </div>
  );
}

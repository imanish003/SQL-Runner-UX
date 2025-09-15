import React, { lazy, Suspense } from "react";
import {
  ResizableHandle,
  ResizablePanel,
  ResizablePanelGroup,
} from "@/components/ui/resizable";
import { IResultsData } from "@/types";
import LoadingSpinner from "@/components/ui/loading-spinner";

// Lazy load heavy components
const QueryEditor = lazy(() => import("@/components/query-editor"));
const ResultsPanel = lazy(() =>
  import("@/components/results-panel").then((module) => ({
    default: module.ResultsPanel,
  }))
);

interface MainContentProps {
  queryText: string;
  setQueryText: (text: string) => void;
  executeQuery: () => void;
  isLoading: boolean;
  resultsData: IResultsData | null;
  error: string | null;
  onClearQuery: () => void;
}

const MainContent: React.FC<MainContentProps> = ({
  queryText,
  setQueryText,
  executeQuery,
  isLoading,
  resultsData,
  error,
  onClearQuery,
}) => (
  <div className="flex flex-col w-full overflow-hidden">
    {/* Spacer to prevent content overlap on mobile */}
    <div className="h-[60px] md:hidden" />

    <ResizablePanelGroup direction="vertical" className="flex-1">
      {/* Query Panel */}
      <ResizablePanel defaultSize={40} minSize={20} maxSize={90}>
        <Suspense
          fallback={<LoadingSpinner message="Loading query editor..." />}
        >
          <QueryEditor
            value={queryText}
            onChange={setQueryText}
            onExecute={executeQuery}
            onClear={onClearQuery}
            isExecuting={isLoading}
          />
        </Suspense>
      </ResizablePanel>

      <ResizableHandle withHandle />

      {/* Results Panel */}
      <ResizablePanel defaultSize={60} minSize={10}>
        <Suspense fallback={<LoadingSpinner message="Loading results..." />}>
          <ResultsPanel
            data={resultsData || undefined}
            isLoading={isLoading}
            error={error}
          />
        </Suspense>
      </ResizablePanel>
    </ResizablePanelGroup>
  </div>
);

export default MainContent;

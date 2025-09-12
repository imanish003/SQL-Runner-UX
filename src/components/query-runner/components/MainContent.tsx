import React from "react";
import QueryEditor from "@/components/query-editor";
import { ResultsPanel } from "@/components/results-panel";
import {
  ResizableHandle,
  ResizablePanel,
  ResizablePanelGroup,
} from "@/components/ui/resizable";
import { IResultsData } from "@/types";

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
        <QueryEditor
          value={queryText}
          onChange={setQueryText}
          onExecute={executeQuery}
          onClear={onClearQuery}
          isExecuting={isLoading}
        />
      </ResizablePanel>

      <ResizableHandle withHandle />

      {/* Results Panel */}
      <ResizablePanel defaultSize={60} minSize={10}>
        <ResultsPanel
          data={resultsData || undefined}
          isLoading={isLoading}
          error={error}
        />
      </ResizablePanel>
    </ResizablePanelGroup>
  </div>
);

export default MainContent;

import { useMemo, useState } from "react";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { AlertTriangle } from "lucide-react";
import ResultsTable from "./components/ResultsTable";
import ResultsHeader from "./components/ResultsHeader";
import ResultsPlaceholder from "./components/ResultsPlaceholder";
import { IResultsData } from "@/types";

export interface IResultsPanelProps {
  data?: IResultsData | undefined;
  isLoading?: boolean;
  error?: string | null;
}

export default function ResultsPanel({
  data,
  isLoading = false,
  error,
}: IResultsPanelProps) {
  const [isMaximized, setIsMaximized] = useState(false);

  const handleToggleMaximize = useMemo(() => {
    return () => {
      setIsMaximized((prev) => !prev);
    };
  }, []);

  /**
   * UI States based on props
   */
  const isShowPlaceholder = !isLoading && !data && !error;
  const isShowAlert = !!error;
  const isShowResultsTable = !!data && !error;
  const alertJsx = isShowAlert && (
    <Alert variant="destructive">
      <AlertTriangle className="h-4 w-4" />
      <AlertTitle>Error</AlertTitle>
      <AlertDescription>{error}</AlertDescription>
    </Alert>
  );
  const placeholderJsx = isShowPlaceholder && <ResultsPlaceholder />;
  const resultsTableJsx = isShowResultsTable && (
    <ResultsTable data={data} isLoading={isLoading} />
  );

  const panelContent = (
    <>
      <CardHeader className="pb-3 px-3 sm:px-6">
        <ResultsHeader
          data={data}
          isMaximized={isMaximized}
          onToggleMaximize={handleToggleMaximize}
        />
      </CardHeader>

      <CardContent className="p-3 sm:p-4 h-[calc(100%-5rem)] overflow-hidden">
        {alertJsx}
        {placeholderJsx}
        {resultsTableJsx}
      </CardContent>
    </>
  );

  return (
    <>
      {/* Normal panel view */}
      <Card className="h-full rounded-none border-0 min-w-0 overflow-hidden">
        {panelContent}
      </Card>

      {/* Maximized dialog view */}
      <Dialog open={isMaximized} onOpenChange={setIsMaximized}>
        <DialogContent
          className="h-full min-w-[98vw] max-h-[98vh] overflow-hidden"
          showCloseButton={false}
        >
          <DialogHeader className="sr-only">
            <DialogTitle>Maximized Query Results</DialogTitle>
          </DialogHeader>
          <Card className="h-full border-0 shadow-none rounded-lg overflow-hidden gap-0">
            {panelContent}
          </Card>
        </DialogContent>
      </Dialog>
    </>
  );
}

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { CardDescription, CardTitle } from "@/components/ui/card";
import { IResultsData } from "@/types";
import { Maximize2, Minimize2 } from "lucide-react";

export interface IResultsHeaderProps {
  data?: IResultsData | undefined;
  isMaximized?: boolean;
  onToggleMaximize?: () => void;
}

export default function ResultsHeader({
  data,
  isMaximized = false,
  onToggleMaximize,
}: IResultsHeaderProps) {
  return (
    <div className="flex sm:items-center justify-between gap-2 items-center">
      <div className="flex-1">
        <CardTitle>Query Results</CardTitle>
        <CardDescription className="hidden sm:block">
          Results from your executed query
        </CardDescription>
      </div>
      <div className="flex items-center gap-1 sm:gap-2 flex-shrink-0">
        {data && (
          <>
            <Badge variant="outline" aria-label="Number of rows displayed">
              {data.rows.length} of {data.totalRows}
            </Badge>
            <Badge variant="secondary" aria-label="Query execution time">
              {data.executionTime}s
            </Badge>
          </>
        )}
        <Button
          variant="ghost"
          size="sm"
          onClick={onToggleMaximize}
          aria-label="Toggle Maximize Results Panel"
        >
          {isMaximized ? <Minimize2 aria-hidden /> : <Maximize2 aria-hidden />}
        </Button>
      </div>
    </div>
  );
}

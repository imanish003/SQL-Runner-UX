import { Button } from "@/components/ui/button";
import { Loader2 } from "lucide-react";

export interface IQueryActionsProps {
  onExecute?: () => void;
  onClear?: () => void;
  isExecuting?: boolean;
}

export default function QueryActions({
  onExecute,
  onClear,
  isExecuting = false,
}: IQueryActionsProps) {
  return (
    <div className="flex flex-row gap-2 mt-4">
      <Button
        size="sm"
        onClick={onExecute}
        disabled={isExecuting}
        className="w-[130px]"
      >
        {isExecuting && <Loader2 className="h-full animate-spin" />}
        {isExecuting ? "Executing..." : "Execute Query"}
      </Button>
      <Button
        variant="secondary"
        size="sm"
        onClick={onClear}
        disabled={isExecuting}
      >
        Clear
      </Button>
    </div>
  );
}

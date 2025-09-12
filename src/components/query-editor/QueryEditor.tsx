import { useState } from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Maximize2, Minimize2 } from "lucide-react";
import QueryInput from "./components/QueryInput";
import QueryActions from "./components/QueryActions";

export interface IQueryEditorProps {
  value: string;
  onChange?: (value: string) => void;
  onExecute?: () => void;
  onClear?: () => void;
  isExecuting?: boolean;
}

export default function QueryEditor({
  value,
  onChange,
  onExecute,
  onClear,
  isExecuting = false,
}: IQueryEditorProps) {
  const [isMaximized, setIsMaximized] = useState(false);

  const toggleMaximize = () => {
    setIsMaximized((prev) => !prev);
  };

  const mainContent = (
    <>
      <CardHeader className="px-4">
        <div className="flex justify-between items-center">
          <div className="flex-1">
            <CardTitle className="text-lg">Query Editor</CardTitle>
            <CardDescription className="text-xs sm:text-sm">
              Write and execute your SQL queries
            </CardDescription>
          </div>
          <Button
            variant="ghost"
            size="lg"
            onClick={toggleMaximize}
            className="text-muted-foreground hover:text-foreground h-8 w-8 md:h-6 md:w-6"
            aria-label={isMaximized ? "Minimize Editor" : "Maximize Editor"}
          >
            {isMaximized ? (
              <Minimize2 className="h-4 w-4" aria-hidden />
            ) : (
              <Maximize2 className="h-4 w-4" aria-hidden />
            )}
          </Button>
        </div>
      </CardHeader>

      <CardContent className="flex flex-col p-3 sm:p-4 h-[calc(100%-5rem)]">
        <QueryInput value={value} onChange={onChange} />
        <QueryActions
          onExecute={onExecute}
          onClear={onClear}
          isExecuting={isExecuting}
        />
      </CardContent>
    </>
  );

  return (
    <>
      {/* Normal panel view */}
      <Card className="h-full rounded-none gap-0 pb-0 border-0">
        {mainContent}
      </Card>

      {/* Maximized dialog view */}
      <Dialog open={isMaximized} onOpenChange={setIsMaximized}>
        <DialogContent
          className="h-full min-w-[98vw] max-h-[98vh] overflow-hidden"
          showCloseButton={false}
        >
          <DialogHeader className="sr-only">
            <DialogTitle>Maximized Query Editor</DialogTitle>
          </DialogHeader>
          <Card className="h-full border-0 shadow-none rounded-lg overflow-hidden gap-0 pb-0">
            {mainContent}
          </Card>
        </DialogContent>
      </Dialog>
    </>
  );
}

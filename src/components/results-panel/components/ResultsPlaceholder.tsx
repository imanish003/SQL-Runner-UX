import { cn } from "@/utils/cn";

interface ResultsPlaceholderProps {
  className?: string;
  message?: string;
}

const DEFAULT_MESSAGE = "No data to display. Run a query to see results.";

export default function ResultsPlaceholder({
  className,
  message,
}: ResultsPlaceholderProps) {
  return (
    <div
      className={cn(
        "flex justify-center w-full text-muted-foreground p-2",
        className
      )}
      role="status"
      aria-live="polite"
    >
      {message || DEFAULT_MESSAGE}
    </div>
  );
}

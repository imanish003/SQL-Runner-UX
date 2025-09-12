import { Button } from "@/components/ui/button";
import { cn } from "@/utils/cn";
import { IQuery } from "@/types";

interface CollapsedQueryListProps {
  queries: IQuery[];
  selectedQueryId?: string;
  onQuerySelect: (query: IQuery) => void;
}

export default function CollapsedQueryList({
  queries,
  selectedQueryId,
  onQuerySelect,
}: CollapsedQueryListProps) {
  return (
    <div className="flex flex-col items-center gap-2">
      {queries.map((query, index) => {
        const isCurrentlySelected = selectedQueryId === query.id;

        return (
          <Button
            key={query.id}
            variant={isCurrentlySelected ? "default" : "ghost"}
            size="sm"
            className={cn(
              "w-[calc(100%-0.7rem)] h-12 rounded-lg transition-all duration-200 relative",
              isCurrentlySelected
                ? "shadow-sm ring-1 ring-primary/60 bg-primary hover:bg-primary/70"
                : "hover:bg-accent"
            )}
            onClick={() => onQuerySelect(query)}
            aria-label={query.title}
            // Adding title for better accessibility and to show full title on hover
            title={`${query.title} - ${query.description}`}
          >
            <span className="font-semibold text-sm">{index + 1}</span>
          </Button>
        );
      })}
    </div>
  );
}

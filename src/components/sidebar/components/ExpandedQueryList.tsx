import {
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import QueryCard from "./QueryCard";
import { IQuery } from "@/types";

interface ExpandedQueryListProps {
  queries: IQuery[];
  selectedQueryId?: string;
  onQuerySelect?: (query: IQuery) => void;
}

export default function ExpandedQueryList({
  queries,
  selectedQueryId,
  onQuerySelect,
}: ExpandedQueryListProps) {
  return (
    <div className="flex flex-col h-full overflow-y-auto min-h-0">
      <CardHeader className="pb-3 flex-shrink-0 px-3 sm:px-6">
        <CardTitle className="text-base sm:text-lg">Saved Queries</CardTitle>
        <CardDescription className="text-xs sm:text-sm">
          Click to load and execute
        </CardDescription>
      </CardHeader>

      <CardContent className="flex-1 flex flex-col gap-4 p-3">
        {queries.map((query) => (
          <div key={query.id} className="animate-in fade-in-0">
            <QueryCard
              title={query.title}
              description={query.description}
              isSelected={selectedQueryId === query.id}
              onClick={() => onQuerySelect?.(query)}
            />
          </div>
        ))}
      </CardContent>
    </div>
  );
}

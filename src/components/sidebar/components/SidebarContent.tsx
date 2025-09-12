import { Card } from "@/components/ui/card";
import SidebarHeader from "./SidebarHeader";
import ExpandedQueryList from "./ExpandedQueryList";
import CollapsedQueryList from "./CollapsedQueryList";
import { defaultQueries } from "../data";
import { IQuery } from "@/types";

export interface ISidebarProps {
  onQuerySelect: (query: IQuery) => void;
  selectedQueryId?: string;
  queries?: IQuery[];
  isCompact?: boolean;
  onToggleCollapse: () => void;
}

export default function SidebarContent({
  queries = defaultQueries,
  selectedQueryId,
  onQuerySelect,
  isCompact = false,
  onToggleCollapse,
}: ISidebarProps) {
  const queryListProps = {
    queries,
    selectedQueryId,
    onQuerySelect,
  };

  return (
    <Card className="h-full w-full rounded-none shadow-md pt-0">
      <SidebarHeader
        isCompact={isCompact}
        onToggleCollapse={onToggleCollapse}
      />

      {isCompact ? (
        <CollapsedQueryList {...queryListProps} />
      ) : (
        <ExpandedQueryList {...queryListProps} />
      )}
    </Card>
  );
}

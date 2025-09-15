import React, { Suspense, useState } from "react";
import { cn } from "@/utils/cn";
import { IQuery } from "@/types";
import SidebarContent from "./components/SidebarContent";
import LoadingSpinner from "../ui/loading-spinner";

interface DesktopSidebarProps {
  selectedQueryId: string;
  onQuerySelect: (query: IQuery) => void;
}

const DesktopSidebar: React.FC<DesktopSidebarProps> = ({
  selectedQueryId,
  onQuerySelect,
}) => {
  const [isSidebarCollapsed, setSidebarCollapsed] = useState(false);

  const handleToggleSidebar = () => {
    setSidebarCollapsed((collapsed) => !collapsed);
  };

  return (
    <div
      className={cn(
        "hidden md:flex flex-shrink-0 transition-all duration-300 relative",
        {
          "md:w-[60px]": isSidebarCollapsed,
          "md:w-[260px] lg:w-[280px]": !isSidebarCollapsed,
        }
      )}
    >
      <Suspense fallback={<LoadingSpinner message="Loading sidebar..." />}>
        <SidebarContent
          selectedQueryId={selectedQueryId}
          onQuerySelect={onQuerySelect}
          isCompact={isSidebarCollapsed}
          onToggleCollapse={handleToggleSidebar}
        />
      </Suspense>
    </div>
  );
};

export default DesktopSidebar;

import SidebarContent from "./components/SidebarContent";
import React, { useState } from "react";
import { IQuery } from "@/types";
import MobileHeader from "@/components/sidebar/components/MobileHeader";
import { cn } from "@/utils/cn";

interface MobileSidebarProps {
  selectedQueryId: string;
  onQuerySelect: (query: IQuery) => void;
}

const MobileSidebar: React.FC<MobileSidebarProps> = ({
  selectedQueryId,
  onQuerySelect,
}) => {
  const [isMobileSidebarOpen, setIsMobileSidebarOpen] = useState(false);

  const handleToggleSidebar = () => {
    setIsMobileSidebarOpen((open) => !open);
  };

  return (
    // "md:hidden" ensures this drawer is only visible on mobile devices
    <div className="md:hidden">
      <MobileHeader
        onOpenSidebar={handleToggleSidebar}
        isOpen={isMobileSidebarOpen}
      />

      {/* Backdrop */}
      {isMobileSidebarOpen && (
        <div
          className="fixed inset-0 bg-black/20 backdrop-blur-sm z-40"
          onClick={() => setIsMobileSidebarOpen(false)}
        />
      )}

      {/* Mobile Sidebar */}
      <div
        id="mobile-sidebar"
        className={cn(
          "fixed top-0 left-0 h-full w-[80%] z-50 transition-transform duration-300 ease-in-out",
          {
            "translate-x-0": isMobileSidebarOpen,
            "-translate-x-full": !isMobileSidebarOpen,
          }
        )}
      >
        <SidebarContent
          selectedQueryId={selectedQueryId}
          onQuerySelect={onQuerySelect}
          isCompact={false}
          onToggleCollapse={() => setIsMobileSidebarOpen(false)}
        />
      </div>
    </div>
  );
};

export default MobileSidebar;

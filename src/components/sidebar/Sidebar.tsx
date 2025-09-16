"use client";

import { lazy } from "react";
import { IQuery } from "@/types";

// Lazy load platform-specific sidebar components
const DesktopSidebar = lazy(() => import("./Sidebar.Desktop"));
const MobileSidebar = lazy(() => import("./Sidebar.Mobile"));

interface SidebarProps {
  selectedQueryId: string;
  onQuerySelect: (query: IQuery) => void;
}

export function Sidebar({ selectedQueryId, onQuerySelect }: SidebarProps) {
  return (
    <>
      <MobileSidebar
        selectedQueryId={selectedQueryId}
        onQuerySelect={onQuerySelect}
      />
      <DesktopSidebar
        selectedQueryId={selectedQueryId}
        onQuerySelect={onQuerySelect}
      />
    </>
  );
}

export default Sidebar;

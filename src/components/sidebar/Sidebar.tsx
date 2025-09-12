"use client";

import DesktopSidebar from "./Sidebar.Desktop";
import MobileSidebar from "./Sidebar.Mobile";
import { IQuery } from "@/types";

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

import { Button } from "@/components/ui/button";
import { Database, Menu } from "lucide-react";

interface MobileHeaderProps {
  onOpenSidebar: () => void;
  isOpen: boolean;
}

export default function MobileHeader({
  onOpenSidebar,
  isOpen,
}: MobileHeaderProps) {
  return (
    <>
      {/* Fixed Header */}
      <header className="fixed top-0 left-0 right-0 h-[60px] flex justify-between px-4 py-3 border-b bg-background/95 backdrop-blur z-30 md:hidden">
        <div className="flex items-center gap-2">
          <Database className="h-5 w-5 text-primary" aria-hidden />
          <h1 className="font-bold text-sm">SQL Runner</h1>
        </div>

        <Button
          variant="ghost"
          size="sm"
          onClick={onOpenSidebar}
          className="h-9 w-9 p-0 hover:bg-accent/60"
          aria-label={isOpen ? "Close navigation menu" : "Open navigation menu"}
          aria-expanded={isOpen}
          aria-controls="mobile-sidebar"
        >
          <Menu className="h-4 w-4" aria-hidden />
        </Button>
      </header>
    </>
  );
}

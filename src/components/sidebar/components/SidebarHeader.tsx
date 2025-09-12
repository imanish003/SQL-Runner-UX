import { Button } from "@/components/ui/button";
import { Database, Menu } from "lucide-react";
import { cn } from "@/utils/cn";

interface SidebarHeaderProps {
  isCompact: boolean;
  onToggleCollapse: () => void;
}

export default function SidebarHeader({
  isCompact,
  onToggleCollapse,
}: SidebarHeaderProps) {
  const toggleButtonProps = {
    variant: "ghost" as const,
    size: "sm" as const,
    onClick: onToggleCollapse,
    className: "p-0 hover:bg-accent/60 transition-colors cursor-pointer",
  };

  return (
    <header
      className={cn(
        "flex items-center border-b bg-muted transition-all duration-100",
        isCompact ? "flex-col gap-2 p-3" : "justify-between p-4"
      )}
      aria-hidden={false}
    >
      {isCompact ? (
        <>
          <Database className="h-6 w-6 text-primary" aria-hidden />
          <Button
            {...toggleButtonProps}
            className={cn(
              toggleButtonProps.className,
              "h-9 w-9 md:h-7 md:w-7 "
            )}
            aria-label="Expand sidebar"
          >
            <Menu className="h-4 w-4 md:h-3.5 md:w-3.5" aria-hidden />
          </Button>
        </>
      ) : (
        <>
          <div className="flex items-center gap-2">
            <Database
              className="h-5 w-5 text-primary flex-shrink-0"
              aria-hidden
            />
            <h1 className="font-bold text-lg bg-gradient-to-r from-primary to-primary/80 bg-clip-text text-transparent">
              SQL Runner
            </h1>
          </div>
          <Button
            {...toggleButtonProps}
            className={cn(toggleButtonProps.className, "h-9 w-9 md:h-8 md:w-8")}
            aria-label="Collapse sidebar"
            aria-expanded={true}
          >
            <Menu className="h-4 w-4" aria-hidden />
          </Button>
        </>
      )}
    </header>
  );
}

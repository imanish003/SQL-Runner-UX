import React from "react";
import { cn } from "@/utils/cn";

interface ILoadingSpinnerProps {
  size?: "sm" | "md" | "lg";
  className?: string;
  message?: string;
}

/**
 * Reusable loading spinner component for use with React.Suspense
 * Follows the project's design system and accessibility standards
 */
export function LoadingSpinner({
  size = "md",
  className,
  message = "Loading...",
}: ILoadingSpinnerProps) {
  const sizeClasses = {
    sm: "h-4 w-4",
    md: "h-8 w-8",
    lg: "h-12 w-12",
  };

  return (
    <div
      className={cn(
        "flex flex-col items-center justify-center space-y-2 p-4 text-center",
        className
      )}
      role="status"
      aria-label={message}
    >
      <div
        className={cn(
          "animate-spin rounded-full border-2 border-muted border-t-primary",
          sizeClasses[size]
        )}
        aria-hidden="true"
      />
      <span className="text-sm text-muted-foreground">{message}</span>
    </div>
  );
}

export default LoadingSpinner;

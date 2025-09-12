/**
 * Loading skeleton component displayed while data is being fetched
 */
function TableLoadingSkeleton() {
  return (
    <div
      className="h-full flex flex-col space-y-4"
      role="status"
      aria-label="Loading table data"
    >
      <div className="text-muted-foreground text-sm">Loading results...</div>
      <div className="space-y-2">
        {Array.from({ length: 5 }, (_, i) => (
          <div key={i} className="flex space-x-4">
            {Array.from({ length: 5 }, (_, j) => (
              <div
                key={j}
                className="h-4 bg-muted rounded animate-pulse flex-1"
                aria-hidden="true"
              />
            ))}
          </div>
        ))}
      </div>
    </div>
  );
}

export default TableLoadingSkeleton;

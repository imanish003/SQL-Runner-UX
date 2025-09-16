function EmptyTableState() {
  return (
    <div
      className="flex items-center justify-center text-muted-foreground"
      role="status"
      aria-label="Query executed successfully but returned no results"
    >
      No data matches your query criteria
    </div>
  );
}

export default EmptyTableState;

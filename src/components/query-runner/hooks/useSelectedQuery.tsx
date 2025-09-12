import { IQuery } from "@/types";
import { useCallback, useState } from "react";

const DEFAULT_QUERY_ID = "customers";
const DEFAULT_QUERY_TEXT = "SELECT * FROM customers WHERE city = 'London'";

export function useSelectedQuery() {
  const [selectedQueryId, setSelectedQueryId] =
    useState<string>(DEFAULT_QUERY_ID);
  const [queryText, setQueryText] = useState<string>(DEFAULT_QUERY_TEXT);

  const handleQuerySelect = useCallback((query: IQuery) => {
    setSelectedQueryId(query.id);
    setQueryText(query.sql);
  }, []);

  return {
    selectedQueryId,
    queryText,
    setQueryText,
    handleQuerySelect,
  };
}

export default useSelectedQuery;

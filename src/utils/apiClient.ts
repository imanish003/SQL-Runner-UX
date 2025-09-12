/**
 * API Client for fetching JSON datasets from the public/data directory
 */

export type Dataset =
  | "customers"
  | "orders"
  | "products"
  | "employees"
  | "categories"
  | "regions"
  | "shippers"
  | "suppliers"
  | "empty-results";

/**
 * Maps query IDs to their corresponding JSON file names
 */
function getDatasetForQuery(queryId: string): Dataset {
  switch (queryId) {
    case "customers":
      return "customers";
    case "recent-orders":
      return "orders";
    case "products-by-category":
      return "products";
    case "employee-directory":
      return "employees";
    case "regional-analysis":
      return "regions";
    case "empty-results":
      return "empty-results";
    default:
      return "customers"; // Default fallback
  }
}

/**
 * Fetches raw JSON data for a given dataset
 */
export async function fetchDataset(dataset: Dataset): Promise<unknown[]> {
  try {
    const response = await fetch(`/data/${dataset}.json`);

    if (!response.ok) {
      throw new Error(
        `Failed to fetch ${dataset}.json: ${response.statusText}`
      );
    }

    const data = await response.json();

    if (!Array.isArray(data)) {
      throw new Error(
        `Invalid data format: expected array, got ${typeof data}`
      );
    }

    return data;
  } catch (error) {
    console.error("Error fetching dataset:", error);
    throw error;
  }
}

/**
 * Fetches dataset based on query ID
 */
export async function fetchDataForQuery(queryId: string): Promise<unknown[]> {
  // Handle error query specially
  if (queryId === "error-query") {
    throw new Error(
      "There was an error while executing the query. Please try again."
    );
  }

  const dataset = getDatasetForQuery(queryId);
  return fetchDataset(dataset);
}

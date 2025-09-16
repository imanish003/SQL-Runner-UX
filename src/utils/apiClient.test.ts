import { expect, test, describe, vi, afterEach } from "vitest";
import { fetchDataset, fetchDataForQuery } from "./apiClient";

// Mock fetch globally
const fetchMock = vi.fn();
global.fetch = fetchMock;

describe("apiClient", () => {
  afterEach(() => {
    vi.clearAllMocks();
  });

  describe("fetchDataset", () => {
    test("fetches and returns valid JSON array", async () => {
      const mockData = [{ id: 1, name: "Test" }];
      fetchMock.mockResolvedValueOnce({
        ok: true,
        json: vi.fn().mockResolvedValue(mockData),
      });

      const result = await fetchDataset("customers");

      expect(fetchMock).toHaveBeenCalledWith("/data/customers.json");
      expect(result).toEqual(mockData);
    });

    test("throws error for non-ok response", async () => {
      fetchMock.mockResolvedValueOnce({
        ok: false,
        statusText: "Not Found",
      });

      await expect(fetchDataset("customers")).rejects.toThrow(
        "Failed to fetch customers.json: Not Found"
      );
    });

    test("throws error for invalid data format (not array)", async () => {
      fetchMock.mockResolvedValueOnce({
        ok: true,
        json: vi.fn().mockResolvedValue({ error: "Invalid format" }),
      });

      await expect(fetchDataset("customers")).rejects.toThrow(
        "Invalid data format: expected array, got object"
      );
    });

    test("throws error for fetch failure", async () => {
      fetchMock.mockRejectedValueOnce(new Error("Network error"));

      await expect(fetchDataset("customers")).rejects.toThrow("Network error");
    });
  });

  describe("fetchDataForQuery", () => {
    test("fetches data for valid query", async () => {
      const mockData = [{ id: 1, name: "Customer" }];
      fetchMock.mockResolvedValueOnce({
        ok: true,
        json: vi.fn().mockResolvedValue(mockData),
      });

      const result = await fetchDataForQuery("customers");

      expect(fetchMock).toHaveBeenCalledWith("/data/customers.json");
      expect(result).toEqual(mockData);
    });

    test("throws error for error-query", async () => {
      await expect(fetchDataForQuery("error-query")).rejects.toThrow(
        "There was an error while executing the query. Please try again."
      );
    });
  });
});
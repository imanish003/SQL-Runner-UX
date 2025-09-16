import { describe, it, expect, vi, beforeEach } from "vitest";
import {
  extractColumnNames,
  transformToTableData,
} from "./tableTransformation";
import { flattenDataItem, type FlattenedData } from "./dataFlattening";

// Mock the dataFlattening module to control the behavior in tests
vi.mock("./dataFlattening", () => ({
  flattenDataItem: vi.fn(),
}));

const mockFlattenDataItem = vi.mocked(flattenDataItem);

describe("extractColumnNames", () => {
  it("should return an empty array when given an empty array", () => {
    const result = extractColumnNames([]);
    expect(result).toEqual([]);
  });

  it("should extract column names from a single row", () => {
    const rows: FlattenedData[] = [{ name: "John", age: "30", city: "NYC" }];

    const result = extractColumnNames(rows);
    expect(result).toEqual(["name", "age", "city"]);
  });
});

describe("transformToTableData", () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it("should return empty results data for non-array input", () => {
    const result = transformToTableData("not an array" as unknown as unknown[]);
    expect(result).toEqual({
      columns: [],
      rows: [],
      totalRows: 0,
      executionTime: 0,
    });
  });

  it("should return empty results data for empty array", () => {
    const result = transformToTableData([]);
    expect(result).toEqual({
      columns: [],
      rows: [],
      totalRows: 0,
      executionTime: 0,
    });
  });

  it("should transform simple objects correctly", () => {
    const rawData = [
      { name: "John", age: 30 },
      { name: "Jane", age: 25 },
    ];

    const flattenedData1: FlattenedData = { name: "John", age: "30" };
    const flattenedData2: FlattenedData = { name: "Jane", age: "25" };

    mockFlattenDataItem
      .mockReturnValueOnce(flattenedData1)
      .mockReturnValueOnce(flattenedData2);

    const result = transformToTableData(rawData);

    expect(mockFlattenDataItem).toHaveBeenCalledTimes(2);
    expect(mockFlattenDataItem).toHaveBeenCalledWith({ name: "John", age: 30 });
    expect(mockFlattenDataItem).toHaveBeenCalledWith({ name: "Jane", age: 25 });

    expect(result.columns).toEqual(["name", "age"]);
    expect(result.rows).toEqual([flattenedData1, flattenedData2]);
    expect(result.totalRows).toBe(2);
    expect(result.executionTime).toBeGreaterThanOrEqual(0);
  });

  it("should handle nested objects", () => {
    const rawData = [
      {
        name: "John",
        address: { city: "NYC", zip: "10001" },
      },
    ];

    const flattenedData: FlattenedData = {
      name: "John",
      "address.city": "NYC",
      "address.zip": "10001",
    };

    mockFlattenDataItem.mockReturnValueOnce(flattenedData);

    const result = transformToTableData(rawData);

    expect(result.columns).toEqual(["name", "address.city", "address.zip"]);
    expect(result.rows).toEqual([flattenedData]);
    expect(result.totalRows).toBe(1);
  });
});

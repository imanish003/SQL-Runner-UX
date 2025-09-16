import { describe, it, expect } from "vitest";
import { flattenDataItem, type FlattenedData } from "./dataFlattening";

describe("flattenDataItem", () => {
  it("should flatten a basic nested object using dot notation", () => {
    const input = {
      name: "John",
      address: { street: "123 Main", city: "NYC" },
    };

    const expected: FlattenedData = {
      name: "John",
      "address.street": "123 Main",
      "address.city": "NYC",
    };

    const result = flattenDataItem(input);
    expect(result).toEqual(expected);
  });

  it("should handle arrays with objects using index notation", () => {
    const input = {
      user: "Alice",
      orders: [
        { id: 1, total: 100 },
        { id: 2, total: 200 },
      ],
    };

    const expected: FlattenedData = {
      user: "Alice",
      "orders[0].id": "1",
      "orders[0].total": "100",
      "orders[1].id": "2",
      "orders[1].total": "200",
    };

    const result = flattenDataItem(input);
    expect(result).toEqual(expected);
  });

  it("should flatten deeply nested structures", () => {
    const input = {
      company: {
        name: "Acme Corp",
        address: {
          location: { lat: 40.7128, lng: -74.006 },
          country: "US",
        },
      },
    };

    const expected: FlattenedData = {
      "company.name": "Acme Corp",
      "company.address.location.lat": "40.7128",
      "company.address.location.lng": "-74.006",
      "company.address.country": "US",
    };

    const result = flattenDataItem(input);
    expect(result).toEqual(expected);
  });

  it("should handle null and undefined values by converting to '—'", () => {
    const input = {
      name: "Bob",
      age: null,
      email: undefined,
      active: true,
    };

    const expected: FlattenedData = {
      name: "Bob",
      age: "—",
      email: "—",
      active: "true",
    };

    const result = flattenDataItem(input);
    expect(result).toEqual(expected);
  });

  it("should handle arrays with primitive values", () => {
    const input = {
      tags: ["javascript", "typescript", "react"],
      numbers: [1, 2, 3],
    };

    const expected: FlattenedData = {
      "tags[0]": "javascript",
      "tags[1]": "typescript",
      "tags[2]": "react",
      "numbers[0]": "1",
      "numbers[1]": "2",
      "numbers[2]": "3",
    };

    const result = flattenDataItem(input);
    expect(result).toEqual(expected);
  });

  it("should handle empty objects", () => {
    const input = {};
    const expected: FlattenedData = {};
    const result = flattenDataItem(input);
    expect(result).toEqual(expected);
  });

  it("should handle arrays with mixed types", () => {
    const input = {
      mixed: ["string", 42, true, null],
    };

    const expected: FlattenedData = {
      "mixed[0]": "string",
      "mixed[1]": "42",
      "mixed[2]": "true",
      "mixed[3]": "null",
    };

    const result = flattenDataItem(input);
    expect(result).toEqual(expected);
  });

  it("should handle prefix correctly", () => {
    const input = { key: "value" };
    const expected: FlattenedData = {
      "prefix.key": "value",
    };

    const result = flattenDataItem(input, "prefix");
    expect(result).toEqual(expected);
  });

  it("should convert all values to strings", () => {
    const input = {
      string: "text",
      number: 123,
      boolean: true,
    };

    const expected: FlattenedData = {
      string: "text",
      number: "123",
      boolean: "true",
    };

    const result = flattenDataItem(input);
    expect(result).toEqual(expected);
  });
});
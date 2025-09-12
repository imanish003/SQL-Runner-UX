/**
 * Object flattening utilities for converting nested data structures to flat key-value pairs
 */

export type FlattenedData = Record<string, string | number>;

/**
 * Handles array values by flattening each element with index notation
 */
function handleArrayValue(
  flattened: FlattenedData,
  key: string,
  array: unknown[]
): void {
  array.forEach((item, index) => {
    const indexedKey = `${key}[${index}]`;
    if (typeof item === "object" && item !== null) {
      Object.assign(
        flattened,
        flattenDataItem(item as Record<string, unknown>, indexedKey)
      );
    } else {
      flattened[indexedKey] = String(item);
    }
  });
}

/**
 * Transforms a single data item by flattening nested objects using dot notation
 *
 * @example
 * Basic nested object:
 * ```ts
 * flattenDataItem({
 *   name: "John",
 *   address: { street: "123 Main", city: "NYC" }
 * })
 * Returns: { name: "John", "address.street": "123 Main", "address.city": "NYC" }
 * ```
 *
 * @example
 * Arrays with objects:
 * ```ts
 * flattenDataItem({
 *   user: "Alice",
 *   orders: [
 *     { id: 1, total: 100 },
 *     { id: 2, total: 200 }
 *   ]
 * })
 * Returns: {
 *   user: "Alice",
 *   "orders[0].id": "1",
 *   "orders[0].total": "100",
 *   "orders[1].id": "2",
 *   "orders[1].total": "200"
 * }
 * ```
 *
 * @example
 * Deeply nested structures:
 * ```ts
 * flattenDataItem({
 *   company: {
 *     name: "Acme Corp",
 *     address: {
 *       location: { lat: 40.7128, lng: -74.0060 },
 *       country: "US"
 *     }
 *   }
 * })
 * Returns: {
 *   "company.name": "Acme Corp",
 *   "company.address.location.lat": "40.7128",
 *   "company.address.location.lng": "-74.0060",
 *   "company.address.country": "US"
 * }
 * ```
 *
 * @example
 * Null/undefined handling:
 * ```ts
 * flattenDataItem({
 *   name: "Bob",
 *   age: null,
 *   email: undefined,
 *   active: true
 * })
 * Returns: { name: "Bob", age: "—", email: "—", active: "true" }
 * ```
 */
export function flattenDataItem(
  item: Record<string, unknown>,
  prefix: string = ""
): FlattenedData {
  const flattened: FlattenedData = {};

  Object.entries(item).forEach(([key, value]) => {
    const fullKey = prefix ? `${prefix}.${key}` : key;

    if (value === null || value === undefined) {
      flattened[fullKey] = "—";
    } else if (Array.isArray(value)) {
      handleArrayValue(flattened, fullKey, value);
    } else if (typeof value === "object") {
      Object.assign(
        flattened,
        flattenDataItem(value as Record<string, unknown>, fullKey)
      );
    } else {
      flattened[fullKey] = String(value);
    }
  });

  return flattened;
}

import { expect, test, describe } from "vitest";
import { cn } from "./cn";

describe("cn utility function", () => {
  test("combines multiple class strings", () => {
    const result = cn("text-red-500", "bg-blue-100");
    expect(result).toBe("text-red-500 bg-blue-100");
  });

  test("handles conditional classes with object notation", () => {
    const result = cn("text-base", {
      "font-bold": true,
      "text-red-500": false,
      underline: true,
    });
    expect(result).toBe("text-base font-bold underline");
  });

  test("handles array of classes", () => {
    const result = cn(["text-sm", "text-gray-500"], "font-medium");
    expect(result).toBe("text-sm text-gray-500 font-medium");
  });

  test("removes falsy values", () => {
    const result = cn("text-base", null, undefined, false, "", "font-bold");
    expect(result).toBe("text-base font-bold");
  });

  test("merges conflicting Tailwind classes correctly", () => {
    // twMerge should resolve conflicts, keeping the last one
    const result = cn("text-sm text-base text-lg");
    expect(result).toBe("text-lg");
  });

  test("merges conflicting padding classes", () => {
    const result = cn("p-4 px-2");
    expect(result).toBe("p-4 px-2");
  });

  test("merges conflicting margin classes", () => {
    const result = cn("m-2 mx-4");
    expect(result).toBe("m-2 mx-4");
  });

  test("handles complex responsive and state variants", () => {
    const result = cn(
      "text-sm md:text-base lg:text-lg",
      "hover:text-blue-500 focus:text-blue-600"
    );
    expect(result).toBe(
      "text-sm md:text-base lg:text-lg hover:text-blue-500 focus:text-blue-600"
    );
  });

  test("works with no arguments", () => {
    const result = cn();
    expect(result).toBe("");
  });

  test("works with empty strings", () => {
    const result = cn("", "", "");
    expect(result).toBe("");
  });

  test("handles mixed types of inputs", () => {
    const result = cn(
      "text-base",
      ["font-bold", "text-blue-500"],
      {
        underline: true,
        "line-through": false,
      },
      null,
      "hover:text-blue-600"
    );
    expect(result).toBe(
      "text-base font-bold text-blue-500 underline hover:text-blue-600"
    );
  });

  test("resolves background color conflicts", () => {
    const result = cn("bg-red-500 bg-blue-500");
    expect(result).toBe("bg-blue-500");
  });

  test("resolves text color conflicts", () => {
    const result = cn("text-red-500 text-blue-500 text-green-500");
    expect(result).toBe("text-green-500");
  });

  test("keeps non-conflicting classes when resolving conflicts", () => {
    const result = cn("text-red-500 font-bold bg-blue-500 text-green-500");
    expect(result).toBe("font-bold bg-blue-500 text-green-500");
  });

  test("handles function calls with dynamic class generation", () => {
    const isActive = true;
    const size = "lg";

    const result = cn("btn", isActive && "btn-active", `btn-${size}`, {
      "btn-disabled": false,
    });
    expect(result).toBe("btn btn-active btn-lg");
  });
});

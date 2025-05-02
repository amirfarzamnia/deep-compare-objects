import deepCompareObjects from "../src/index";

describe("deepCompareObjects", () => {
  test("should return empty object when objects are identical", () => {
    const obj = { a: 1, b: 2 };
    const result = deepCompareObjects(obj, obj);
    expect(result).toEqual({});
  });

  test("should find differences in simple objects", () => {
    const a = { a: 1, b: 2 };
    const b = { a: 1, b: 3 };
    const result = deepCompareObjects(a, b);
    expect(result).toEqual({ b: 3 });
  });

  test("should handle nested objects", () => {
    const a = { a: { b: 1, c: 2 } };
    const b = { a: { b: 1, c: 3 } };
    const result = deepCompareObjects(a, b);
    expect(result).toEqual({ a: { c: 3 } });
  });

  test("should handle arrays", () => {
    const a = { arr: [1, 2, 3] };
    const b = { arr: [1, 4, 3] };
    const result = deepCompareObjects(a, b);
    expect(result).toEqual({ arr: [undefined, 4, undefined] });
  });

  test("should handle nested arrays with objects", () => {
    const a = { arr: [{ a: 1 }, { b: 2 }] };
    const b = { arr: [{ a: 1 }, { b: 3 }] };
    const result = deepCompareObjects(a, b);
    expect(result).toEqual({ arr: [undefined, { b: 3 }] });
  });

  test("should handle new properties in second object", () => {
    const a = { a: 1 };
    const b = { a: 1, b: 2 };
    const result = deepCompareObjects(a, b);
    expect(result).toEqual({ b: 2 });
  });

  test("should handle missing properties in second object", () => {
    const a = { a: 1, b: 2 };
    const b = { a: 1 };
    const result = deepCompareObjects(a, b);
    expect(result).toEqual({});
  });

  test("should handle different types", () => {
    const a = { a: "1" };
    const b = { a: 1 };
    const result = deepCompareObjects(a, b);
    expect(result).toEqual({ a: 1 });
  });
});

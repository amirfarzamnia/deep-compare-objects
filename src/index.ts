import stringify from "json-stringify-safe";

/**
 * Finds and returns the differences between two objects `a` and `b`.
 *
 * @param {Record<string, any>} [a] The first object to compare.
 * @param {Record<string, any>} [b] The second object to compare.
 *
 * @returns {Record<string, any> | undefined} An object containing the differences between `a` and `b`, or undefined if `b` is null or undefined.
 */
export default function deepCompareObjects(
  a: Record<string, any> = {},
  b: Record<string, any> = {}
): Record<string, any> | undefined {
  // This event happens when the object b is of the null type.
  if (!b) {
    return b;
  }

  return [...new Set([...Object.keys(b), ...Object.keys(a)])].reduce(
    (differences: Record<string, any>, key: string) => {
      if (Array.isArray(b[key])) {
        if (!Array.isArray(a[key])) {
          return { ...differences, [key]: b[key] };
        }

        const d = b[key].reduce(
          (acc: any[] | undefined, item: any, index: number) => {
            const isObject = typeof item === "object" && !Array.isArray(item);

            if (!isObject && stringify(a[key][index]) === stringify(item)) {
              return acc;
            }

            acc ??= [];

            if (isObject) {
              const d = deepCompareObjects(a[key][index], item);

              if (d && Object.keys(d).length) {
                acc[index] = d;
              }
            } else {
              acc[index] = item;
            }

            return acc;
          },
          undefined
        );

        if (d && d.length) {
          differences[key] = d;
        }
      } else if (typeof b[key] === "object") {
        const d = deepCompareObjects(a[key], b[key]);

        if (
          (d && Object.keys(d).length) ||
          stringify(a[key]) !== stringify(b[key])
        ) {
          differences[key] = d;
        }
      } else if (stringify(a[key]) !== stringify(b[key])) {
        differences[key] = b[key];
      }

      return differences;
    },
    {}
  );
}

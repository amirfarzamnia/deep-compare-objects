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
  if (!b) return b;

  // Reduce through the keys of objects.
  return [...new Set([...Object.keys(b), ...Object.keys(a)])].reduce(
    (differences: Record<string, any>, key: string) => {
      // Check if the value of key in b is an array.
      if (Array.isArray(b[key])) {
        // If the value in a is not an array, it's a difference.
        if (!Array.isArray(a[key])) return { ...differences, [key]: b[key] };

        // Reduce through the elements of the array in b.
        const d = b[key].reduce(
          (acc: any[] | undefined, item: any, index: number) => {
            // Check if the item is an object.
            const isObject = typeof item === "object" && !Array.isArray(item);

            // If the items are equal, no difference.
            if (
              !isObject &&
              JSON.stringify(a[key][index]) === JSON.stringify(item)
            )
              return acc;

            // Initialize the accumulator array if not yet initialized.
            acc ||= [];

            // If item is an object, recursively find differences.
            if (isObject) {
              // Recursively find differences if the value is an object.
              const d = deepCompareObjects(a[key][index], item);

              // If differences found, assign to accumulator array.
              if (d && Object.keys(d).length) acc[index] = d;
            } else {
              // If item is not an object, assign to accumulator array.
              acc[index] = item;
            }

            // Return the accumulated differences.
            return acc;
          },
          undefined
        );

        // If differences found in array, assign to differences object.
        if (d && d.length) differences[key] = d;
      } else if (typeof b[key] === "object") {
        // If value is an object, recursively find differences.
        const d = deepCompareObjects(a[key], b[key]);

        // If differences found, assign to differences object.
        if (
          (d && Object.keys(d).length) ||
          JSON.stringify(a[key]) !== JSON.stringify(b[key])
        )
          differences[key] = d;
      } else if (JSON.stringify(a[key]) !== JSON.stringify(b[key])) {
        // If values are not equal, assign to differences object.
        differences[key] = b[key];
      }

      // Return the accumulated differences.
      return differences;
    },
    {}
  );
}

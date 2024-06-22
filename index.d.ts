/**
 * The `deep-compare-objects` module allows you to get the deep difference between two objects.
 * To get started, import the necessary modules:
 *
 * ```js
 * import deepCompareObjects from 'deep-compare-objects';
 * ```
 *
 * For a detailed understanding of its functionality, refer to the module's GitHub page:
 *
 * @see [GitHub](https://github.com/amirfarzamnia/deep-compare-objects)
 */

declare module 'deep-compare-objects' {
    /**
     * Finds and returns the differences between two objects `a` and `b`.
     *
     * @param {Record<string, any>} [a] The first object to compare.
     * @param {Record<string, any>} [b] The second object to compare.
     *
     * @returns {Record<string, any> | undefined} An object containing the differences between `a` and `b`, or undefined if `b` is null or undefined.
     */

    export default function findObjectDifferences(a?: Record<string, any>, b?: Record<string, any>): Record<string, any> | undefined;
}

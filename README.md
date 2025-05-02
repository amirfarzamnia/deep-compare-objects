# Deep Compare Objects

A TypeScript utility for deeply comparing objects and arrays, identifying their differences with precision.

[![npm version](https://badge.fury.io/js/deep-compare-objects.svg)](https://badge.fury.io/js/deep-compare-objects)
[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)
[![TypeScript](https://img.shields.io/badge/TypeScript-007ACC.svg?logo=typescript&logoColor=white)](https://www.typescriptlang.org/)

## Features

- Deep comparison of objects and arrays
- Handles nested structures
- TypeScript support
- Safe JSON stringification
- Returns only the differences between objects

## Installation

```bash
# Using npm
npm install deep-compare-objects

# Using yarn
yarn add deep-compare-objects

# Using pnpm
pnpm add deep-compare-objects
```

## Usage

```typescript
import deepCompareObjects from "deep-compare-objects";

// Basic object comparison
const obj1 = { name: "John", age: 30 };
const obj2 = { name: "John", age: 31 };
const differences = deepCompareObjects(obj1, obj2);
// Result: { age: 31 }

// Nested object comparison
const nested1 = { user: { name: "John", address: { city: "New York" } } };
const nested2 = { user: { name: "John", address: { city: "Los Angeles" } } };
const nestedDifferences = deepCompareObjects(nested1, nested2);
// Result: { user: { address: { city: 'Los Angeles' } } }

// Array comparison
const arr1 = [1, 2, { name: "John" }];
const arr2 = [1, 2, { name: "Jane" }];
const arrayDifferences = deepCompareObjects(arr1, arr2);
// Result: { 2: { name: 'Jane' } }
```

## API

### `deepCompareObjects(a: Record<string, any>, b: Record<string, any>): Record<string, any> | undefined`

Compares two objects and returns their differences.

#### Parameters

- `a` (optional): The first object to compare. Defaults to an empty object.
- `b` (optional): The second object to compare. Defaults to an empty object.

#### Returns

- An object containing only the differences between `a` and `b`
- `undefined` if `b` is null or undefined

#### Behavior

- For primitive values, returns the new value if different
- For objects, recursively compares and returns only the changed properties
- For arrays, compares each element and returns only the changed elements
- Handles circular references safely using `json-stringify-safe`

## Examples

### Comparing Simple Objects

```typescript
const obj1 = { name: "John", age: 30 };
const obj2 = { name: "John", age: 31, city: "New York" };
const result = deepCompareObjects(obj1, obj2);
// Result: { age: 31, city: 'New York' }
```

### Comparing Nested Objects

```typescript
const obj1 = {
  user: {
    name: "John",
    preferences: {
      theme: "dark",
      notifications: true,
    },
  },
};

const obj2 = {
  user: {
    name: "John",
    preferences: {
      theme: "light",
      notifications: true,
    },
  },
};

const result = deepCompareObjects(obj1, obj2);
// Result: { user: { preferences: { theme: 'light' } } }
```

### Comparing Arrays

```typescript
const arr1 = [1, 2, { name: "John" }];
const arr2 = [1, 3, { name: "Jane" }];
const result = deepCompareObjects(arr1, arr2);
// Result: { 1: 3, 2: { name: 'Jane' } }
```

## Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## Author

Amir Farzamnia - [GitHub](https://github.com/amirfarzamnia)

## Support

If you find this package useful, please consider giving it a ⭐️ on GitHub!

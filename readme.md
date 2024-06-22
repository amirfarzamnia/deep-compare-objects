# Deep Compare Objects

**Deep Compare Objects** is a JavaScript module designed to deeply compare two JavaScript objects and identify their differences. It's lightweight, easy to use, and efficient for a wide range of use cases.

## Features

- Deep comparison of nested objects and arrays.
- Detects added, removed, and changed properties.
- Simple and intuitive API.
- Lightweight and dependency-free.

## Installation

You can install this module via npm:

```sh
npm install deep-compare-objects
```

or via yarn:

```sh
yarn add deep-compare-objects
```

## Usage

Here's a quick example to get you started:

```javascript
import deepCompareObjects from 'deep-compare-objects';

const a = { a: [1, 2, 3], b: { c: 1, d: 1 }, e: 'e', f: 'f', g: {} };
const b = { a: [3, 2, 1], b: { c: 1, d: 2 }, e: 'e', f: 'F', g: {} };

console.log(deepCompareObjects(a, b)); // { a: [ 3, <1 empty item>, 1 ], b: { d: 2 }, f: 'F' }
```

## License

This project is licensed under the MIT License. See the [LICENSE](LICENSE) file for details.

<h1 align="center">react-calculator-epx</h1>

<p align="center">
  <img alt="top language" src="https://img.shields.io/github/languages/top/Dants0/react-calculator-epx?color=171717&labelColor=FFE000">
  <img alt="languages count" src="https://img.shields.io/github/languages/count/Dants0/react-calculator-epx?color=171717&labelColor=FFE000">
  <img alt="last commit" src="https://img.shields.io/github/last-commit/Dants0/react-calculator-epx?color=171717&labelColor=FFE000">
  <img alt="stars" src="https://img.shields.io/github/stars/dants0/react-calculator-epx?color=171717&labelColor=FFE000">
  <img alt="npm version" src="https://img.shields.io/npm/v/react-calculator-epx?color=171717&labelColor=FFE000">
</p>

<p align="center">
  A powerful TypeScript math library with arithmetic, number theory, statistics, and geometry — ready to use in any Node.js or browser project.
</p>

---

## Table of Contents

- [Installation](#installation)
- [Quick Start](#quick-start)
- [API Reference](#api-reference)
  - [Basic Operations](#basic-operations)
  - [Number Theory](#number-theory)
  - [Statistics](#statistics)
  - [Logarithm](#logarithm)
  - [Utilities](#utilities)
  - [Geometry](#geometry)
- [Development](#development)
- [License](#license)

---

## Installation

```bash
npm install react-calculator-epx
```

---

## Quick Start

```typescript
import { Calculator } from 'react-calculator-epx';

const calc = new Calculator({ num_1: 20, num_2: 10 });

calc.sum()       // 30
calc.minus()     // 10
calc.multiply()  // 200
calc.division()  // 2

console.log(calc.showResults());
// Sum: 30
// Minus: 10
// Multiply: 200
// Division: 2
```

---

## API Reference

All methods are on the `Calculator` class. The constructor takes `{ num_1, num_2 }`. Methods that deal with two numbers use the instance values; methods like `fibonacci` or `trianglearea` receive their own arguments.

### Basic Operations

| Method | Description | Example |
|---|---|---|
| `sum()` | `num_1 + num_2` | `new Calculator({ num_1: 5, num_2: 3 }).sum()` → `8` |
| `minus()` | `num_1 - num_2` | `new Calculator({ num_1: 10, num_2: 4 }).minus()` → `6` |
| `multiply()` | `num_1 * num_2` | `new Calculator({ num_1: 3, num_2: 7 }).multiply()` → `21` |
| `division()` | `num_1 / num_2` | `new Calculator({ num_1: 20, num_2: 4 }).division()` → `5` |
| `modulo()` | `num_1 % num_2` | `new Calculator({ num_1: 10, num_2: 3 }).modulo()` → `1` |
| `power(exp)` | `num_1 ^ exp` | `new Calculator({ num_1: 2, num_2: 0 }).power(8)` → `256` |
| `percentage()` | `(num_1 * num_2) / 100` | `new Calculator({ num_1: 20, num_2: 200 }).percentage()` → `40` |
| `abs()` | `Math.abs(num_1)` | `new Calculator({ num_1: -7, num_2: 0 }).abs()` → `7` |

```typescript
const calc = new Calculator({ num_1: 10, num_2: 3 });

calc.modulo()       // 1
calc.power(2)       // 100  (10^2)

const pct = new Calculator({ num_1: 15, num_2: 200 });
pct.percentage()    // 30  (15% of 200)
```

> `division()` and `modulo()` throw `Error` when `num_2 === 0`.

---

### Number Theory

| Method | Description | Example |
|---|---|---|
| `fibonacci(n)` | nth Fibonacci number | `fibonacci(10)` → `55` |
| `factorial(n)` | n! | `factorial(5)` → `120` |
| `isPrime(n)` | Returns `true` if `n` is prime | `isPrime(7)` → `true` |
| `gcd()` | Greatest common divisor of `num_1` and `num_2` | `gcd()` with `{12, 8}` → `4` |
| `lcm()` | Least common multiple of `num_1` and `num_2` | `lcm()` with `{4, 6}` → `12` |
| `isEven(n)` | Returns `true` if `n` is even | `isEven(4)` → `true` |
| `isOdd(n)` | Returns `true` if `n` is odd | `isOdd(7)` → `true` |

```typescript
const calc = new Calculator({ num_1: 0, num_2: 0 });

calc.fibonacci(10)   // 55
calc.factorial(6)    // 720
calc.isPrime(97)     // true
calc.isPrime(9)      // false
calc.isEven(42)      // true
calc.isOdd(13)       // true

const gcdCalc = new Calculator({ num_1: 48, num_2: 18 });
gcdCalc.gcd()        // 6
gcdCalc.lcm()        // 144
```

---

### Statistics

| Method | Description | Example |
|---|---|---|
| `average(numbers[])` | Arithmetic mean of an array | `average([1, 2, 3, 4, 5])` → `3` |

```typescript
const calc = new Calculator({ num_1: 0, num_2: 0 });

calc.average([10, 20, 30])   // 20
calc.average([7])            // 7
calc.average([])             // throws Error
```

---

### Logarithm

| Method | Description | Example |
|---|---|---|
| `log(base?)` | log of `num_1` in the given base (default: 10) | `log()` with `num_1=100` → `2` |

```typescript
new Calculator({ num_1: 100, num_2: 0 }).log()     // 2   (log base 10)
new Calculator({ num_1: 8, num_2: 0 }).log(2)      // 3   (log base 2)
new Calculator({ num_1: 1000, num_2: 0 }).log()    // 3
```

> Throws if `num_1 <= 0` or if `base <= 0` or `base === 1`.

---

### Utilities

| Method | Description | Example |
|---|---|---|
| `clamp(min, max)` | Clamps `num_1` between `min` and `max` | `clamp(0, 10)` with `num_1=15` → `10` |
| `showResults()` | Prints sum, minus, multiply, division in one string | — |

```typescript
new Calculator({ num_1: 15, num_2: 0 }).clamp(0, 10)   // 10
new Calculator({ num_1: -5, num_2: 0 }).clamp(0, 10)   // 0
new Calculator({ num_1: 5, num_2: 0 }).clamp(0, 10)    // 5

const calc = new Calculator({ num_1: 20, num_2: 10 });
console.log(calc.showResults());
// Sum: 30
// Minus: 10
// Multiply: 200
// Division: 2
```

---

### Geometry

| Method | Description |
|---|---|
| `trianglearea(base, height)` | Area of a triangle: `(base × height) / 2` |
| `rectangle(base, height)` | Area of a rectangle: `base × height` |
| `diamond(max_diagonal, min_diagonal)` | Area of a diamond: `(d1 × d2) / 2` |
| `trapeze(max_base, min_base, height)` | Area of a trapezoid: `((a + b) × h) / 2` |
| `areacircle(radius)` | Area of a circle: `π × r²` |
| `circlecircumference(radius)` | Circumference of a circle: `2 × π × r` |
| `spherevolume(radius)` | Volume of a sphere: `(4/3) × π × r³` |
| `cylindervolume(radius, height)` | Volume of a cylinder: `π × r² × h` |
| `perfectsquare(a)` | `a²` |
| `squareroot(n)` | `√n` |

```typescript
const calc = new Calculator({ num_1: 0, num_2: 0 });

calc.trianglearea(4, 3)          // 6
calc.rectangle(6, 4)             // 24
calc.diamond(6, 4)               // 12
calc.trapeze(6, 4, 5)            // 25
calc.areacircle(5)               // ≈ 78.5398
calc.circlecircumference(5)      // ≈ 31.4159
calc.spherevolume(3)             // ≈ 113.0973
calc.cylindervolume(3, 5)        // ≈ 141.3717
calc.perfectsquare(7)            // 49
calc.squareroot(64)              // 8
```

> All geometry methods throw `Error` for zero or negative inputs.

---

## Development

### Install dependencies

```bash
npm install
```

### Run tests

```bash
npm test
```

### Build

```bash
npm run build
# Output → dist/
```

### Project structure

```
src/
  Calculator.ts   # main class
  index.ts        # package entry point
tests/
  Calculator.test.ts
dist/             # compiled output (gitignored)
tsconfig.json         # dev + ts-jest
tsconfig.build.json   # production build
jest.config.ts
```

---

## Tech

- [TypeScript](https://www.typescriptlang.org/)
- [Jest](https://jestjs.io/) + [ts-jest](https://kulshekhar.github.io/ts-jest/)
- [Node.js](https://nodejs.org/)

---

## License

MIT © [@dants0](https://github.com/Dants0)

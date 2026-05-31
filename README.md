<h1 align="center">react-calculator-epx</h1>

<p align="center">
  <img alt="top language" src="https://img.shields.io/github/languages/top/Dants0/react-calculator-epx?color=171717&labelColor=FFE000">
  <img alt="languages count" src="https://img.shields.io/github/languages/count/Dants0/react-calculator-epx?color=171717&labelColor=FFE000">
  <img alt="last commit" src="https://img.shields.io/github/last-commit/Dants0/react-calculator-epx?color=171717&labelColor=FFE000">
  <img alt="stars" src="https://img.shields.io/github/stars/dants0/react-calculator-epx?color=171717&labelColor=FFE000">
  <img alt="npm version" src="https://img.shields.io/npm/v/react-calculator-epx?color=171717&labelColor=FFE000">
</p>

<p align="center">
  A comprehensive TypeScript math library covering arithmetic, calculus, linear algebra, complex numbers, discrete math, statistics, analytic geometry, and 3D solid geometry.
</p>

---

## Table of Contents

- [Installation](#installation)
- [Quick Start](#quick-start)
- [Modules](#modules)
  - [Calculator](#calculator) — arithmetic, number theory, geometry helpers
  - [Calculus](#calculus) — derivatives, integrals, limits
  - [ComplexNumber](#complexnumber) — imaginary number arithmetic
  - [Logarithm](#logarithm) — ln, log2, log10, antilog, change of base
  - [DiscreteMath](#discretemath) — combinations, sets, binary, modular arithmetic
  - [Algebra — Matrix](#matrix) — matrix operations, determinant, inverse, linear systems
  - [Algebra — Polynomial](#polynomial) — polynomial evaluation, derivative, root finding
  - [Vector2D / Vector3D](#vector2d--vector3d) — vector arithmetic and geometry
  - [AnalyticGeometry](#analyticgeometry) — points, lines, circles in the plane
  - [SolidGeometry](#solidgeometry) — volumes and surface areas of 3D solids
  - [Statistics](#statistics) — mean, variance, correlation, quartiles
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
import {
  Calculator, Calculus, ComplexNumber, Logarithm,
  DiscreteMath, Matrix, Polynomial,
  Vector2D, Vector3D,
  AnalyticGeometry, SolidGeometry, Statistics,
} from 'react-calculator-epx';

// Arithmetic
new Calculator({ num_1: 20, num_2: 10 }).sum()       // 30

// Calculus
Calculus.derivative(x => x ** 2, 3)                  // ≈ 6
Calculus.integral(x => x ** 2, 0, 1)                 // ≈ 0.333

// Complex numbers
new ComplexNumber(3, 4).modulus()                     // 5

// Statistics
Statistics.mean([1, 2, 3, 4, 5])                     // 3
Statistics.correlation([1,2,3], [1,2,3])             // 1

// 3D geometry
SolidGeometry.sphere(5)  // { volume: 523.598, surfaceArea: 314.159 }
```

---

## Modules

---

### Calculator

> `import { Calculator } from 'react-calculator-epx'`

Stateful class — pass two numbers in the constructor and operate on them.

```typescript
const calc = new Calculator({ num_1: 20, num_2: 4 });
```

#### Basic Operations

| Method | Returns | Notes |
|---|---|---|
| `sum()` | `num_1 + num_2` | |
| `minus()` | `num_1 - num_2` | |
| `multiply()` | `num_1 * num_2` | |
| `division()` | `num_1 / num_2` | throws if `num_2 === 0` |
| `modulo()` | `num_1 % num_2` | throws if `num_2 === 0` |
| `power(exp)` | `num_1 ^ exp` | |
| `percentage()` | `(num_1 * num_2) / 100` | |
| `abs()` | `Math.abs(num_1)` | |
| `log(base?)` | log of `num_1` | default base 10 |
| `clamp(min, max)` | `num_1` clamped | |
| `showResults()` | formatted string | |

#### Number Theory

| Method | Returns |
|---|---|
| `fibonacci(n)` | nth Fibonacci number |
| `factorial(n)` | n! |
| `isPrime(n)` | `boolean` |
| `gcd()` | GCD of `num_1` and `num_2` |
| `lcm()` | LCM of `num_1` and `num_2` |
| `isEven(n)` / `isOdd(n)` | `boolean` |
| `average(numbers[])` | arithmetic mean |

#### Geometry (2D)

| Method | Formula |
|---|---|
| `trianglearea(base, height)` | `(b × h) / 2` |
| `rectangle(base, height)` | `b × h` |
| `diamond(d1, d2)` | `(d1 × d2) / 2` |
| `trapeze(a, b, h)` | `((a+b) × h) / 2` |
| `areacircle(r)` | `π × r²` |
| `circlecircumference(r)` | `2 × π × r` |
| `spherevolume(r)` | `(4/3) × π × r³` |
| `cylindervolume(r, h)` | `π × r² × h` |
| `perfectsquare(a)` | `a²` |
| `squareroot(n)` | `√n` |

```typescript
const calc = new Calculator({ num_1: 48, num_2: 18 });
calc.gcd()           // 6
calc.lcm()           // 144
calc.fibonacci(10)   // 55
calc.factorial(6)    // 720
calc.isPrime(97)     // true
calc.trianglearea(4, 3)   // 6
calc.areacircle(5)        // ≈ 78.5398
```

---

### Calculus

> `import { Calculus } from 'react-calculator-epx'`

All methods are **static**. Numerical methods — no symbolic computation.

| Method | Description | Precision |
|---|---|---|
| `derivative(f, x, h?)` | First derivative at `x` | Central difference, O(h²) |
| `secondDerivative(f, x, h?)` | Second derivative at `x` | Central difference, O(h²) |
| `integral(f, a, b, n?)` | Definite integral from `a` to `b` | Simpson's 1/3 rule |
| `limit(f, x, h?)` | Two-sided limit at `x` | Throws if limit doesn't exist |
| `partialDerivativeX(f, x, y, h?)` | ∂f/∂x at `(x, y)` | Central difference |
| `partialDerivativeY(f, x, y, h?)` | ∂f/∂y at `(x, y)` | Central difference |
| `arcLength(f, a, b, n?)` | Arc length of `f` on `[a, b]` | Numerical integration |

```typescript
// Derivative: f(x) = x², f'(3) = 6
Calculus.derivative(x => x ** 2, 3)                    // ≈ 6

// Second derivative: f(x) = x², f''(x) = 2
Calculus.secondDerivative(x => x ** 2, 10)             // ≈ 2

// Integral: ∫₀¹ x² dx = 1/3
Calculus.integral(x => x ** 2, 0, 1)                   // ≈ 0.3333

// Integral: ∫₀^π sin(x) dx = 2
Calculus.integral(x => Math.sin(x), 0, Math.PI)        // ≈ 2

// Limit: lim(x→1) (x²-1)/(x-1) = 2
Calculus.limit(x => (x ** 2 - 1) / (x - 1), 1)       // ≈ 2

// Partial derivatives: f(x,y) = x² + y²
Calculus.partialDerivativeX((x, y) => x ** 2 + y ** 2, 3, 4)  // ≈ 6
Calculus.partialDerivativeY((x, y) => x ** 2 + y ** 2, 3, 4)  // ≈ 8

// Arc length of y = x² from 0 to 1
Calculus.arcLength(x => x ** 2, 0, 1)                  // ≈ 1.4789
```

---

### ComplexNumber

> `import { ComplexNumber } from 'react-calculator-epx'`

Immutable value class. Every operation returns a new `ComplexNumber`.

```typescript
const z = new ComplexNumber(real, imag);
// or from polar form:
const z = ComplexNumber.fromPolar(r, theta);
```

| Method | Description |
|---|---|
| `add(other)` | z₁ + z₂ |
| `sub(other)` | z₁ - z₂ |
| `mul(other)` | z₁ × z₂ |
| `div(other)` | z₁ ÷ z₂ — throws for zero |
| `conjugate()` | a + bi → a - bi |
| `modulus()` | \|z\| = √(a² + b²) |
| `argument()` | arg(z) = atan2(b, a) in radians |
| `pow(n)` | zⁿ via De Moivre's theorem |
| `sqrt()` | principal square root |
| `exp()` | eᶻ via Euler's formula |
| `toPolar()` | `{ r, theta }` |
| `toString()` | `"a + bi"` |

```typescript
const z1 = new ComplexNumber(3, 4);
z1.modulus()    // 5
z1.argument()   // ≈ 0.9273 rad

const z2 = new ComplexNumber(1, 2);
z1.add(z2)      // ComplexNumber(4, 6)
z1.mul(z2)      // ComplexNumber(-5, 10)

// Euler's identity: e^(iπ) = -1
new ComplexNumber(0, Math.PI).exp()   // ComplexNumber(-1, ≈0)

// i² = -1
new ComplexNumber(0, 1).pow(2)        // ComplexNumber(-1, 0)

ComplexNumber.fromPolar(1, Math.PI / 2)  // ≈ ComplexNumber(0, 1)
```

---

### Logarithm

> `import { Logarithm } from 'react-calculator-epx'`

All methods are **static**. No constructor needed — takes the argument directly.

| Method | Description |
|---|---|
| `ln(x)` | Natural logarithm |
| `log2(x)` | Logarithm base 2 |
| `log10(x)` | Logarithm base 10 |
| `logBase(x, base)` | Logarithm in any base |
| `antilog(y, base?)` | Inverse of log: `base^y` (default base 10) |
| `changeOfBase(value, fromBase, toBase)` | Converts a log value between bases |

```typescript
Logarithm.ln(Math.E)       // 1
Logarithm.log2(1024)       // 10
Logarithm.log10(100)       // 2
Logarithm.logBase(243, 3)  // 5

Logarithm.antilog(3, 10)   // 1000
Logarithm.antilog(8, 2)    // 256

// log₁₀(1000) = 3 → what is log₂(1000)?
Logarithm.changeOfBase(3, 10, 2)  // ≈ 9.9657
```

> All methods throw for non-positive arguments or invalid bases (`base ≤ 0` or `base = 1`).

---

### DiscreteMath

> `import { DiscreteMath } from 'react-calculator-epx'`

All methods are **static**.

#### Combinatorics

| Method | Description |
|---|---|
| `combination(n, k)` | C(n, k) = n! / (k!(n-k)!) |
| `permutation(n, k)` | P(n, k) = n! / (n-k)! |

```typescript
DiscreteMath.combination(10, 3)   // 120
DiscreteMath.permutation(5, 2)    // 20
```

#### Set Operations

| Method | Description |
|---|---|
| `powerSet(set)` | All subsets of an array |
| `union(a, b)` | A ∪ B |
| `intersection(a, b)` | A ∩ B |
| `difference(a, b)` | A \\ B |
| `symmetricDifference(a, b)` | (A \\ B) ∪ (B \\ A) |

```typescript
const A = new Set([1, 2, 3]);
const B = new Set([2, 3, 4]);

DiscreteMath.union(A, B)               // Set {1, 2, 3, 4}
DiscreteMath.intersection(A, B)        // Set {2, 3}
DiscreteMath.difference(A, B)          // Set {1}
DiscreteMath.symmetricDifference(A, B) // Set {1, 4}

DiscreteMath.powerSet([1, 2])
// [[], [1], [2], [1, 2]]
```

#### Number Systems & Algorithms

| Method | Description |
|---|---|
| `toBinary(n)` | Integer to binary string |
| `fromBinary(bin)` | Binary string to integer |
| `extendedGcd(a, b)` | Returns `{ gcd, x, y }` where `ax + by = gcd` |
| `hammingDistance(a, b)` | Number of differing bits |
| `modpow(base, exp, mod)` | Fast modular exponentiation `(base^exp) mod mod` |

```typescript
DiscreteMath.toBinary(42)                   // "101010"
DiscreteMath.fromBinary('101010')           // 42
DiscreteMath.extendedGcd(35, 15)            // { gcd: 5, x: 1, y: -2 }
DiscreteMath.hammingDistance(7, 10)         // 3
DiscreteMath.modpow(2, 10, 1000)            // 24  (1024 mod 1000)
```

---

### Matrix

> `import { Matrix } from 'react-calculator-epx'`

Immutable. Every operation returns a new `Matrix`.

```typescript
const A = new Matrix([[1, 2], [3, 4]]);
const B = new Matrix([[5, 6], [7, 8]]);
```

| Method | Description |
|---|---|
| `Matrix.identity(n)` | n×n identity matrix |
| `Matrix.zeros(rows, cols)` | Zero matrix |
| `add(other)` | A + B |
| `sub(other)` | A - B |
| `mul(other)` | A × B |
| `scale(scalar)` | k × A |
| `transpose()` | Aᵀ |
| `trace()` | Sum of diagonal elements |
| `det()` | Determinant (Gaussian elimination) |
| `inverse()` | A⁻¹ (Gauss-Jordan) — throws if singular |
| `solve(b)` | Solves Ax = b, returns x as column matrix |
| `isSquare()` | `boolean` |
| `get(row, col)` | Element access |

```typescript
const A = new Matrix([[1, 2], [3, 4]]);

A.det()       // -2
A.trace()     // 5
A.transpose() // Matrix([[1,3],[2,4]])

const inv = A.inverse();
A.mul(inv)    // ≈ identity

// Solve  x + y = 3
//       2x - y = 0
const coeff = new Matrix([[1, 1], [2, -1]]);
const rhs   = new Matrix([[3], [0]]);
coeff.solve(rhs)  // Matrix([[1], [2]])  →  x=1, y=2
```

---

### Polynomial

> `import { Polynomial } from 'react-calculator-epx'`

Coefficients are passed as an array where **index = degree**: `[a₀, a₁, a₂, ...]`
so `[−4, 0, 1]` represents `x² − 4`.

| Method | Description |
|---|---|
| `evaluate(x)` | p(x) via Horner's method |
| `add(other)` | p + q |
| `mul(other)` | p × q |
| `derivative()` | Returns p′ as a new `Polynomial` |
| `findRoots()` | Real roots via Newton's method |
| `toString()` | Human-readable string |
| `degree` | Highest non-zero exponent |

```typescript
// x² - 4
const p = new Polynomial([-4, 0, 1]);
p.evaluate(3)    // 5
p.toString()     // "x^2 - 4"
p.findRoots()    // [-2, 2]

// x³ - x  (roots: -1, 0, 1)
new Polynomial([0, -1, 0, 1]).findRoots()  // [-1, 0, 1]

// derivative of x³ is 3x²
new Polynomial([0, 0, 0, 1]).derivative().toString()  // "3x^2"

// (x+1)(x-1) = x²-1
new Polynomial([1, 1]).mul(new Polynomial([-1, 1])).toString()  // "x^2 - 1"
```

---

### Vector2D / Vector3D

> `import { Vector2D, Vector3D } from 'react-calculator-epx'`

Immutable. Every operation returns a new vector.

```typescript
const u = new Vector2D(3, 4);
const v = new Vector3D(1, 2, 3);
```

#### Vector2D

| Method | Description |
|---|---|
| `add(other)` / `sub(other)` | Vector arithmetic |
| `scale(scalar)` | Scalar multiplication |
| `dot(other)` | Dot product |
| `magnitude()` | \|u\| |
| `normalize()` | Unit vector |
| `angle(other)` | Angle between vectors (radians) |
| `project(onto)` | Vector projection |
| `isOrthogonal(other)` | `dot = 0` |
| `isParallel(other)` | `cross = 0` |

#### Vector3D

All Vector2D methods plus:

| Method | Description |
|---|---|
| `cross(other)` | Cross product u × v |

```typescript
const i = new Vector3D(1, 0, 0);
const j = new Vector3D(0, 1, 0);

i.cross(j)          // Vector3D(0, 0, 1)  →  k
i.dot(j)            // 0
i.angle(j)          // π/2 radians
i.isOrthogonal(j)   // true

new Vector2D(3, 4).magnitude()    // 5
new Vector2D(3, 4).normalize()    // Vector2D(0.6, 0.8)

// Project (3,4) onto the x-axis
new Vector2D(3, 4).project(new Vector2D(1, 0))  // Vector2D(3, 0)
```

---

### AnalyticGeometry

> `import { AnalyticGeometry } from 'react-calculator-epx'`  
> `import type { Point2D, Point3D, Line2D } from 'react-calculator-epx'`

All methods are **static**. Lines use the `ax + by + c = 0` form.

| Method | Description |
|---|---|
| `distance2D(p1, p2)` | Euclidean distance in 2D |
| `distance3D(p1, p2)` | Euclidean distance in 3D |
| `midpoint2D(p1, p2)` | Midpoint in 2D |
| `midpoint3D(p1, p2)` | Midpoint in 3D |
| `lineThrough2Points(p1, p2)` | Returns `Line2D` (ax+by+c=0) |
| `linesIntersection(l1, l2)` | Intersection point or `null` (parallel) |
| `pointToLineDistance(point, line)` | Perpendicular distance |
| `triangleArea(p1, p2, p3)` | Area via Shoelace formula |
| `circumscribedCircle(p1, p2, p3)` | `{ center, radius }` — throws if collinear |
| `isInsideCircle(point, center, r)` | `boolean` |
| `areCollinear(p1, p2, p3)` | `boolean` |
| `pointToSegmentDistance(point, a, b)` | Distance to segment (not infinite line) |

```typescript
AnalyticGeometry.distance2D({ x: 0, y: 0 }, { x: 3, y: 4 })  // 5

// Line through (0,0) and (1,1): x - y = 0
const line = AnalyticGeometry.lineThrough2Points({ x: 0, y: 0 }, { x: 1, y: 1 });

// Intersection of x-y=0 and x+y-2=0 → (1, 1)
const l1 = { a: 1, b: -1, c: 0 };
const l2 = { a: 1, b:  1, c: -2 };
AnalyticGeometry.linesIntersection(l1, l2)  // { x: 1, y: 1 }

// Area of right triangle (0,0), (4,0), (0,3) = 6
AnalyticGeometry.triangleArea({ x:0,y:0 }, { x:4,y:0 }, { x:0,y:3 })  // 6

// Circumscribed circle through (0,0), (2,0), (1,1)
AnalyticGeometry.circumscribedCircle(
  { x: 0, y: 0 }, { x: 2, y: 0 }, { x: 1, y: 1 }
)  // { center: { x: 1, y: 0 }, radius: 1 }
```

---

### SolidGeometry

> `import { SolidGeometry } from 'react-calculator-epx'`

All methods are **static** and return `{ volume: number, surfaceArea: number }`.

| Method | Shape |
|---|---|
| `cube(side)` | Cube |
| `rectangularPrism(l, w, h)` | Rectangular prism (cuboid) |
| `cylinder(radius, height)` | Cylinder |
| `cone(radius, height)` | Cone |
| `sphere(radius)` | Sphere |
| `pyramid(baseArea, basePerimeter, height)` | Regular pyramid (any base) |
| `torus(R, r)` | Torus — R: major radius, r: tube radius |
| `ellipsoid(a, b, c)` | Ellipsoid (surface via Knud Thomsen's approx.) |
| `regularTetrahedron(edge)` | Regular tetrahedron |

```typescript
SolidGeometry.cube(3)
// { volume: 27, surfaceArea: 54 }

SolidGeometry.sphere(5)
// { volume: ≈ 523.598, surfaceArea: ≈ 314.159 }

SolidGeometry.cylinder(3, 10)
// { volume: ≈ 282.743, surfaceArea: ≈ 244.346 }

SolidGeometry.cone(3, 4)
// { volume: ≈ 37.699, surfaceArea: ≈ 75.398 }

SolidGeometry.torus(5, 1)
// { volume: ≈ 98.696, surfaceArea: ≈ 197.392 }

// Square pyramid: base 4×4, height 3
SolidGeometry.pyramid(16, 16, 3)
// { volume: 16, surfaceArea: ≈ 52 }

SolidGeometry.regularTetrahedron(2)
// { volume: ≈ 0.9428, surfaceArea: ≈ 6.9282 }
```

> All methods throw for zero or negative dimensions. `torus` throws when `r ≥ R`.

---

### Statistics

> `import { Statistics } from 'react-calculator-epx'`

All methods are **static** and take a `number[]` as their main argument.

| Method | Description |
|---|---|
| `mean(data)` | Arithmetic mean |
| `median(data)` | Middle value (interpolated for even n) |
| `mode(data)` | Most frequent values — returns `number[]` (handles multimodal) |
| `variance(data, population?)` | Population (default) or sample variance |
| `stdDev(data, population?)` | Standard deviation |
| `range(data)` | max − min |
| `percentile(data, p)` | p-th percentile with linear interpolation |
| `zScore(x, data)` | (x − mean) / stdDev |
| `covariance(x, y)` | Population covariance |
| `correlation(x, y)` | Pearson's correlation coefficient |
| `quartiles(data)` | `{ Q1, Q2, Q3 }` |
| `iqr(data)` | Interquartile range (Q3 − Q1) |

```typescript
const data = [2, 4, 4, 4, 5, 5, 7, 9];

Statistics.mean(data)              // 5
Statistics.median(data)            // 4.5
Statistics.mode(data)              // [4]
Statistics.variance(data, true)    // 4   (population)
Statistics.variance(data, false)   // 4.571  (sample)
Statistics.stdDev(data, true)      // 2
Statistics.range(data)             // 7
Statistics.percentile(data, 75)    // 5.75
Statistics.iqr(data)               // 2.25

Statistics.correlation([1,2,3,4], [1,2,3,4])   // 1   (perfect positive)
Statistics.correlation([1,2,3,4], [4,3,2,1])   // -1  (perfect negative)

const { Q1, Q2, Q3 } = Statistics.quartiles(data);
```

---

## Development

```bash
npm install        # install dependencies
npm test           # run 243 tests across 10 suites
npm run build      # compile to dist/ with type declarations
```

### Project structure

```
src/
  Calculator.ts        # arithmetic, number theory, 2D geometry
  Calculus.ts          # derivatives, integrals, limits
  ComplexNumber.ts     # complex number arithmetic
  Logarithm.ts         # ln, log2, log10, antilog, changeOfBase
  DiscreteMath.ts      # combinatorics, sets, binary, modular arithmetic
  Algebra.ts           # Matrix + Polynomial classes
  Vector.ts            # Vector2D + Vector3D
  AnalyticGeometry.ts  # analytic geometry in 2D/3D
  SolidGeometry.ts     # volumes and surface areas of 3D solids
  Statistics.ts        # descriptive statistics
  index.ts             # package entry point
tests/
  *.test.ts            # one test file per module
dist/                  # compiled output (gitignored)
tsconfig.json          # dev + ts-jest config
tsconfig.build.json    # production build
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

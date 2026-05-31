interface CalculatorProps {
  num_1: number;
  num_2: number;
}

export class Calculator {
  private num_1: number;
  private num_2: number;

  constructor({ num_1, num_2 }: CalculatorProps) {
    this.num_1 = num_1;
    this.num_2 = num_2;
  }

  // ─── Basic Operations ────────────────────────────────────────────────────────

  sum(): number {
    return this.num_1 + this.num_2;
  }

  minus(): number {
    return this.num_1 - this.num_2;
  }

  multiply(): number {
    return this.num_1 * this.num_2;
  }

  division(): number {
    if (this.num_2 === 0) {
      throw new Error('Division by zero is not possible');
    }
    return this.num_1 / this.num_2;
  }

  modulo(): number {
    if (this.num_2 === 0) {
      throw new Error('Modulo by zero is not possible');
    }
    return this.num_1 % this.num_2;
  }

  power(exponent: number): number {
    return Math.pow(this.num_1, exponent);
  }

  // num_1 percent of num_2 (e.g. num_1=20, num_2=200 → 40)
  percentage(): number {
    return (this.num_1 * this.num_2) / 100;
  }

  abs(): number {
    return Math.abs(this.num_1);
  }

  // ─── Number Theory ───────────────────────────────────────────────────────────

  fibonacci(n: number): number {
    if (n <= 0) {
      throw new Error('Enter a positive integer');
    }
    if (n === 1) {
      return 1;
    }
    const memo: number[] = [0, 1];
    for (let i = 2; i <= n; i++) {
      memo[i] = memo[i - 1] + memo[i - 2];
    }
    return memo[n];
  }

  factorial(n: number): number {
    if (n < 0) {
      throw new Error('Factorial is not possible for negative numbers');
    }
    if (n === 0) {
      return 1;
    }
    let result = 1;
    for (let i = 2; i <= n; i++) {
      result *= i;
    }
    return result;
  }

  isPrime(n: number): boolean {
    if (n < 2) return false;
    if (n === 2) return true;
    if (n % 2 === 0) return false;
    for (let i = 3; i <= Math.sqrt(n); i += 2) {
      if (n % i === 0) return false;
    }
    return true;
  }

  gcd(): number {
    let a = Math.abs(Math.round(this.num_1));
    let b = Math.abs(Math.round(this.num_2));
    while (b !== 0) {
      [a, b] = [b, a % b];
    }
    return a;
  }

  lcm(): number {
    const g = this.gcd();
    if (g === 0) return 0;
    return Math.abs(Math.round(this.num_1) * Math.round(this.num_2)) / g;
  }

  isEven(n: number): boolean {
    return n % 2 === 0;
  }

  isOdd(n: number): boolean {
    return n % 2 !== 0;
  }

  // ─── Statistics ──────────────────────────────────────────────────────────────

  average(numbers: number[]): number {
    if (numbers.length === 0) {
      throw new Error('Cannot calculate average of an empty array');
    }
    return numbers.reduce((sum, n) => sum + n, 0) / numbers.length;
  }

  // ─── Logarithm ───────────────────────────────────────────────────────────────

  log(base: number = 10): number {
    if (this.num_1 <= 0) {
      throw new Error('Logarithm is not defined for non-positive numbers');
    }
    if (base <= 0 || base === 1) {
      throw new Error('Invalid logarithm base');
    }
    return Math.log(this.num_1) / Math.log(base);
  }

  // ─── Utilities ───────────────────────────────────────────────────────────────

  clamp(min: number, max: number): number {
    if (min > max) {
      throw new Error('min cannot be greater than max');
    }
    return Math.min(Math.max(this.num_1, min), max);
  }

  // ─── Geometry ────────────────────────────────────────────────────────────────

  perfectsquare(a: number): number {
    if (a <= 0) {
      throw new Error('Invalid square specified');
    }
    return Math.pow(a, 2);
  }

  squareroot(number: number): number {
    if (number <= 0) {
      throw new Error('Invalid square root specified');
    }
    return Math.sqrt(number);
  }

  trianglearea(base: number, height: number): number {
    if (base <= 0 || height <= 0) {
      throw new Error('Invalid base and height specified for Area triangles');
    }
    return (base * height) / 2;
  }

  rectangle(base: number, height: number): number {
    if (base <= 0 || height <= 0) {
      throw new Error('Invalid base and height specified for rectangle');
    }
    return base * height;
  }

  diamond(max_diagonal: number, min_diagonal: number): number {
    if (max_diagonal <= 0 || min_diagonal <= 0) {
      throw new Error('Invalid max_diagonal and min_diagonal specified');
    }
    return (max_diagonal * min_diagonal) / 2;
  }

  trapeze(max_base: number, min_base: number, height: number): number {
    if (max_base <= 0 || min_base <= 0 || height <= 0) {
      throw new Error('Invalid max_base, min_base, height specified. They must be greater than zero.');
    }
    return ((max_base + min_base) * height) / 2;
  }

  areacircle(radius: number): number {
    if (radius <= 0) {
      throw new Error('Invalid radius specified');
    }
    return Math.PI * radius ** 2;
  }

  circlecircumference(radius: number): number {
    if (radius <= 0) {
      throw new Error('Invalid radius specified');
    }
    return 2 * Math.PI * radius;
  }

  spherevolume(radius: number): number {
    if (radius <= 0) {
      throw new Error('Invalid radius specified');
    }
    return (4 / 3) * Math.PI * radius ** 3;
  }

  cylindervolume(radius: number, height: number): number {
    if (radius <= 0 || height <= 0) {
      throw new Error('Invalid radius and height specified');
    }
    return Math.PI * radius ** 2 * height;
  }

  // ─── Display ─────────────────────────────────────────────────────────────────

  showResults(): string {
    if (this.num_1 === 0 && this.num_2 === 0) {
      throw new Error('It is not possible to present results without calculating first');
    }
    const divisionStr = this.num_2 !== 0
      ? `Division: ${this.division()}`
      : 'Division: undefined (division by zero)';
    return `Sum: ${this.sum()}\nMinus: ${this.minus()}\nMultiply: ${this.multiply()}\n${divisionStr}`;
  }
}

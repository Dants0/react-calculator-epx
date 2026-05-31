import { Calculator } from '../src/Calculator';

// ─── Basic Operations ─────────────────────────────────────────────────────────

describe('Calculator - basic operations', () => {
  test('sum() should return the sum of num_1 and num_2', () => {
    const calc = new Calculator({ num_1: 5, num_2: 10 });
    expect(calc.sum()).toBe(15);
  });

  test('minus() should return the difference between num_1 and num_2', () => {
    const calc = new Calculator({ num_1: 10, num_2: 3 });
    expect(calc.minus()).toBe(7);
  });

  test('multiply() should return the product of num_1 and num_2', () => {
    const calc = new Calculator({ num_1: 4, num_2: 5 });
    expect(calc.multiply()).toBe(20);
  });

  test('division() should return the correct result', () => {
    const calc = new Calculator({ num_1: 20, num_2: 4 });
    expect(calc.division()).toBe(5);
  });

  test('division() should return 0 when num_1 is 0', () => {
    const calc = new Calculator({ num_1: 0, num_2: 10 });
    expect(calc.division()).toBe(0);
  });

  test('division() should throw when num_2 is 0', () => {
    const calc = new Calculator({ num_1: 10, num_2: 0 });
    expect(() => calc.division()).toThrowError('Division by zero is not possible');
  });

  test('division() should throw when both are 0 (bug regression)', () => {
    const calc = new Calculator({ num_1: 0, num_2: 0 });
    expect(() => calc.division()).toThrowError('Division by zero is not possible');
  });

  test('modulo() should return the remainder', () => {
    expect(new Calculator({ num_1: 10, num_2: 3 }).modulo()).toBe(1);
    expect(new Calculator({ num_1: 20, num_2: 6 }).modulo()).toBe(2);
  });

  test('modulo() should throw when num_2 is 0', () => {
    const calc = new Calculator({ num_1: 10, num_2: 0 });
    expect(() => calc.modulo()).toThrowError('Modulo by zero is not possible');
  });

  test('power() should return num_1 raised to the exponent', () => {
    expect(new Calculator({ num_1: 2, num_2: 0 }).power(10)).toBe(1024);
    expect(new Calculator({ num_1: 3, num_2: 0 }).power(3)).toBe(27);
    expect(new Calculator({ num_1: 5, num_2: 0 }).power(0)).toBe(1);
  });

  test('percentage() should return num_1% of num_2', () => {
    expect(new Calculator({ num_1: 20, num_2: 200 }).percentage()).toBe(40);
    expect(new Calculator({ num_1: 50, num_2: 80 }).percentage()).toBe(40);
  });

  test('abs() should return the absolute value of num_1', () => {
    expect(new Calculator({ num_1: -15, num_2: 0 }).abs()).toBe(15);
    expect(new Calculator({ num_1: 15, num_2: 0 }).abs()).toBe(15);
    expect(new Calculator({ num_1: 0, num_2: 0 }).abs()).toBe(0);
  });
});

// ─── showResults ──────────────────────────────────────────────────────────────

describe('Calculator - showResults()', () => {
  test('should throw when num_1 and num_2 are both 0', () => {
    const calc = new Calculator({ num_1: 0, num_2: 0 });
    expect(() => calc.showResults()).toThrowError(
      'It is not possible to present results without calculating first'
    );
  });

  test('should return formatted results correctly', () => {
    const calc = new Calculator({ num_1: 20, num_2: 10 });
    expect(calc.showResults()).toBe('Sum: 30\nMinus: 10\nMultiply: 200\nDivision: 2');
  });

  test('should show division by zero message when num_2 is 0', () => {
    const calc = new Calculator({ num_1: 5, num_2: 0 });
    expect(calc.showResults()).toContain('Division: undefined (division by zero)');
  });
});

// ─── Fibonacci & Factorial ────────────────────────────────────────────────────

describe('Calculator - fibonacci() and factorial()', () => {
  const calc = new Calculator({ num_1: 0, num_2: 0 });

  test.each([
    [1, 1],
    [2, 1],
    [8, 21],
    [10, 55],
    [20, 6765],
  ])('fibonacci(%i) should return %i', (n, expected) => {
    expect(calc.fibonacci(n)).toBe(expected);
  });

  test('fibonacci() should throw for n <= 0', () => {
    expect(() => calc.fibonacci(0)).toThrowError('Enter a positive integer');
    expect(() => calc.fibonacci(-1)).toThrowError('Enter a positive integer');
  });

  test.each([
    [0, 1],
    [1, 1],
    [4, 24],
    [5, 120],
    [10, 3628800],
  ])('factorial(%i) should return %i', (n, expected) => {
    expect(calc.factorial(n)).toBe(expected);
  });

  test('factorial() should throw for negative numbers', () => {
    expect(() => calc.factorial(-1)).toThrowError(
      'Factorial is not possible for negative numbers'
    );
  });
});

// ─── Number Theory ────────────────────────────────────────────────────────────

describe('Calculator - number theory', () => {
  const calc = new Calculator({ num_1: 0, num_2: 0 });

  test('isPrime() should correctly identify prime numbers', () => {
    expect(calc.isPrime(2)).toBe(true);
    expect(calc.isPrime(7)).toBe(true);
    expect(calc.isPrime(13)).toBe(true);
    expect(calc.isPrime(97)).toBe(true);
  });

  test('isPrime() should return false for non-primes', () => {
    expect(calc.isPrime(1)).toBe(false);
    expect(calc.isPrime(0)).toBe(false);
    expect(calc.isPrime(-5)).toBe(false);
    expect(calc.isPrime(4)).toBe(false);
    expect(calc.isPrime(9)).toBe(false);
  });

  test('gcd() should return the greatest common divisor', () => {
    expect(new Calculator({ num_1: 12, num_2: 8 }).gcd()).toBe(4);
    expect(new Calculator({ num_1: 48, num_2: 18 }).gcd()).toBe(6);
    expect(new Calculator({ num_1: 7, num_2: 3 }).gcd()).toBe(1);
  });

  test('lcm() should return the least common multiple', () => {
    expect(new Calculator({ num_1: 4, num_2: 6 }).lcm()).toBe(12);
    expect(new Calculator({ num_1: 12, num_2: 8 }).lcm()).toBe(24);
    expect(new Calculator({ num_1: 7, num_2: 3 }).lcm()).toBe(21);
    expect(new Calculator({ num_1: 0, num_2: 0 }).lcm()).toBe(0);
  });

  test('isEven() should return true for even numbers', () => {
    expect(calc.isEven(0)).toBe(true);
    expect(calc.isEven(4)).toBe(true);
    expect(calc.isEven(-8)).toBe(true);
  });

  test('isOdd() should return true for odd numbers', () => {
    expect(calc.isOdd(1)).toBe(true);
    expect(calc.isOdd(7)).toBe(true);
    expect(calc.isOdd(-3)).toBe(true);
  });
});

// ─── Statistics ───────────────────────────────────────────────────────────────

describe('Calculator - statistics', () => {
  const calc = new Calculator({ num_1: 0, num_2: 0 });

  test('average() should return the mean of a list of numbers', () => {
    expect(calc.average([1, 2, 3, 4, 5])).toBe(3);
    expect(calc.average([10, 20])).toBe(15);
    expect(calc.average([7])).toBe(7);
  });

  test('average() should throw for empty array', () => {
    expect(() => calc.average([])).toThrowError(
      'Cannot calculate average of an empty array'
    );
  });
});

// ─── Logarithm ────────────────────────────────────────────────────────────────

describe('Calculator - log()', () => {
  test('log() should return log base 10 by default', () => {
    expect(new Calculator({ num_1: 100, num_2: 0 }).log()).toBeCloseTo(2, 5);
    expect(new Calculator({ num_1: 1000, num_2: 0 }).log()).toBeCloseTo(3, 5);
  });

  test('log() should return log with custom base', () => {
    expect(new Calculator({ num_1: 8, num_2: 0 }).log(2)).toBeCloseTo(3, 5);
  });

  test('log() should throw for non-positive num_1', () => {
    expect(() => new Calculator({ num_1: 0, num_2: 0 }).log()).toThrowError(
      'Logarithm is not defined for non-positive numbers'
    );
    expect(() => new Calculator({ num_1: -5, num_2: 0 }).log()).toThrowError(
      'Logarithm is not defined for non-positive numbers'
    );
  });

  test('log() should throw for invalid base', () => {
    expect(() => new Calculator({ num_1: 10, num_2: 0 }).log(1)).toThrowError(
      'Invalid logarithm base'
    );
    expect(() => new Calculator({ num_1: 10, num_2: 0 }).log(0)).toThrowError(
      'Invalid logarithm base'
    );
  });
});

// ─── Utilities ────────────────────────────────────────────────────────────────

describe('Calculator - clamp()', () => {
  test('clamp() should return num_1 clamped between min and max', () => {
    expect(new Calculator({ num_1: 5, num_2: 0 }).clamp(1, 10)).toBe(5);
    expect(new Calculator({ num_1: -5, num_2: 0 }).clamp(0, 10)).toBe(0);
    expect(new Calculator({ num_1: 15, num_2: 0 }).clamp(0, 10)).toBe(10);
  });

  test('clamp() should throw when min > max', () => {
    expect(() => new Calculator({ num_1: 5, num_2: 0 }).clamp(10, 1)).toThrowError(
      'min cannot be greater than max'
    );
  });
});

// ─── Geometry ─────────────────────────────────────────────────────────────────

describe('Calculator - geometry', () => {
  const calc = new Calculator({ num_1: 0, num_2: 0 });

  test('trianglearea() should return the correct area', () => {
    expect(calc.trianglearea(4, 3)).toBe(6);
  });

  test('trianglearea() should throw for invalid input', () => {
    expect(() => calc.trianglearea(0, 5)).toThrowError(
      'Invalid base and height specified for Area triangles'
    );
    expect(() => calc.trianglearea(-2, 5)).toThrowError(
      'Invalid base and height specified for Area triangles'
    );
  });

  test('perfectsquare() should return the correct value', () => {
    expect(calc.perfectsquare(5)).toBe(25);
    expect(calc.perfectsquare(7)).toBe(49);
  });

  test('perfectsquare() should throw for invalid input', () => {
    expect(() => calc.perfectsquare(0)).toThrowError('Invalid square specified');
    expect(() => calc.perfectsquare(-1)).toThrowError('Invalid square specified');
    expect(() => calc.perfectsquare(-5)).toThrowError('Invalid square specified');
  });

  test('squareroot() should return the correct value', () => {
    expect(calc.squareroot(64)).toBe(8);
    expect(calc.squareroot(49)).toBe(7);
  });

  test('squareroot() should throw for invalid input (bug regression: any negative)', () => {
    expect(() => calc.squareroot(0)).toThrowError('Invalid square root specified');
    expect(() => calc.squareroot(-1)).toThrowError('Invalid square root specified');
    expect(() => calc.squareroot(-5)).toThrowError('Invalid square root specified');
  });

  test('rectangle() should return the correct area', () => {
    expect(calc.rectangle(6, 4)).toBe(24);
    expect(calc.rectangle(8, 3)).toBe(24);
  });

  test('rectangle() should throw for invalid input', () => {
    expect(() => calc.rectangle(0, 4)).toThrow(
      'Invalid base and height specified for rectangle'
    );
    expect(() => calc.rectangle(-1, 4)).toThrow(
      'Invalid base and height specified for rectangle'
    );
  });

  test('diamond() should return the correct area', () => {
    expect(calc.diamond(6, 4)).toBe(12);
    expect(calc.diamond(8, 3)).toBe(12);
  });

  test('diamond() should throw for invalid input', () => {
    expect(() => calc.diamond(-1, 4)).toThrow(
      'Invalid max_diagonal and min_diagonal specified'
    );
    expect(() => calc.diamond(0, 4)).toThrow(
      'Invalid max_diagonal and min_diagonal specified'
    );
  });

  test('trapeze() should return the correct area', () => {
    expect(calc.trapeze(6, 4, 5)).toBe(25);
    expect(calc.trapeze(8, 3, 7)).toBe(38.5);
  });

  test('trapeze() should throw for invalid input', () => {
    expect(() => calc.trapeze(0, 4, 5)).toThrow(
      'Invalid max_base, min_base, height specified. They must be greater than zero.'
    );
  });

  test('areacircle() should return the correct area', () => {
    expect(calc.areacircle(4)).toBeCloseTo(50.2655, 4);
    expect(calc.areacircle(6)).toBeCloseTo(113.0973, 4);
  });

  test('areacircle() should throw for invalid input (bug regression: any negative)', () => {
    expect(() => calc.areacircle(-1)).toThrow('Invalid radius specified');
    expect(() => calc.areacircle(-5)).toThrow('Invalid radius specified');
    expect(() => calc.areacircle(0)).toThrow('Invalid radius specified');
  });

  test('circlecircumference() should return the correct circumference', () => {
    expect(calc.circlecircumference(5)).toBeCloseTo(31.4159, 4);
    expect(calc.circlecircumference(1)).toBeCloseTo(6.2832, 4);
  });

  test('circlecircumference() should throw for invalid input', () => {
    expect(() => calc.circlecircumference(0)).toThrow('Invalid radius specified');
    expect(() => calc.circlecircumference(-3)).toThrow('Invalid radius specified');
  });

  test('spherevolume() should return the correct volume', () => {
    expect(calc.spherevolume(3)).toBeCloseTo(113.0973, 4);
    expect(calc.spherevolume(1)).toBeCloseTo(4.1888, 4);
  });

  test('spherevolume() should throw for invalid input', () => {
    expect(() => calc.spherevolume(0)).toThrow('Invalid radius specified');
    expect(() => calc.spherevolume(-2)).toThrow('Invalid radius specified');
  });

  test('cylindervolume() should return the correct volume', () => {
    expect(calc.cylindervolume(3, 5)).toBeCloseTo(141.3717, 4);
    expect(calc.cylindervolume(2, 10)).toBeCloseTo(125.6637, 4);
  });

  test('cylindervolume() should throw for invalid input', () => {
    expect(() => calc.cylindervolume(0, 5)).toThrow('Invalid radius and height specified');
    expect(() => calc.cylindervolume(3, 0)).toThrow('Invalid radius and height specified');
    expect(() => calc.cylindervolume(-1, 5)).toThrow('Invalid radius and height specified');
  });
});

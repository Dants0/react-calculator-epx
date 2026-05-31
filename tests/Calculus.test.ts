import { Calculus } from '../src/Calculus';

describe('Calculus - derivative', () => {
  test('derivative of x² at x=3 is 6', () => {
    expect(Calculus.derivative(x => x ** 2, 3)).toBeCloseTo(6, 5);
  });
  test('derivative of sin(x) at x=0 is 1', () => {
    expect(Calculus.derivative(x => Math.sin(x), 0)).toBeCloseTo(1, 5);
  });
  test('derivative of e^x at x=1 is e', () => {
    expect(Calculus.derivative(x => Math.exp(x), 1)).toBeCloseTo(Math.E, 5);
  });
  test('second derivative of x² is 2', () => {
    expect(Calculus.secondDerivative(x => x ** 2, 5)).toBeCloseTo(2, 3);
  });
  test('second derivative of cos(x) at x=0 is -1', () => {
    expect(Calculus.secondDerivative(x => Math.cos(x), 0)).toBeCloseTo(-1, 3);
  });
});

describe('Calculus - integral (Simpson)', () => {
  test('∫x² from 0 to 1 = 1/3', () => {
    expect(Calculus.integral(x => x ** 2, 0, 1)).toBeCloseTo(1 / 3, 6);
  });
  test('∫sin(x) from 0 to π = 2', () => {
    expect(Calculus.integral(x => Math.sin(x), 0, Math.PI)).toBeCloseTo(2, 6);
  });
  test('∫e^x from 0 to 1 = e-1', () => {
    expect(Calculus.integral(x => Math.exp(x), 0, 1)).toBeCloseTo(Math.E - 1, 6);
  });
});

describe('Calculus - limit', () => {
  test('limit of (x²-1)/(x-1) at x=1 is 2', () => {
    expect(Calculus.limit(x => (x ** 2 - 1) / (x - 1), 1)).toBeCloseTo(2, 4);
  });
  test('limit of sin(x)/x at x=0 is 1', () => {
    expect(Calculus.limit(x => Math.sin(x) / x, 0)).toBeCloseTo(1, 4);
  });
  test('throws for non-existent limit', () => {
    expect(() => Calculus.limit(x => (x > 0 ? 1 : -1) * 1e10, 0)).toThrow();
  });
});

describe('Calculus - partial derivatives', () => {
  test('∂/∂x of x²+y² at (3,4) ≈ 6', () => {
    expect(Calculus.partialDerivativeX((x, y) => x ** 2 + y ** 2, 3, 4)).toBeCloseTo(6, 5);
  });
  test('∂/∂y of x²+y² at (3,4) ≈ 8', () => {
    expect(Calculus.partialDerivativeY((x, y) => x ** 2 + y ** 2, 3, 4)).toBeCloseTo(8, 5);
  });
  test('∂/∂x of x·y at (2,5) ≈ 5', () => {
    expect(Calculus.partialDerivativeX((x, y) => x * y, 2, 5)).toBeCloseTo(5, 5);
  });
});

describe('Calculus - arc length', () => {
  test('arc length of x² from 0 to 1 ≈ 1.4789', () => {
    expect(Calculus.arcLength(x => x ** 2, 0, 1)).toBeCloseTo(1.4789, 2);
  });
  test('arc length of horizontal line y=0 from 0 to 5 is 5', () => {
    expect(Calculus.arcLength(() => 0, 0, 5)).toBeCloseTo(5, 4);
  });
});

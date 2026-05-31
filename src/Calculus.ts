export class Calculus {
  private static readonly H = 1e-7;

  static derivative(f: (x: number) => number, x: number, h = Calculus.H): number {
    return (f(x + h) - f(x - h)) / (2 * h);
  }

  static secondDerivative(f: (x: number) => number, x: number, h = 1e-5): number {
    return (f(x + h) - 2 * f(x) + f(x - h)) / (h * h);
  }

  static partialDerivativeX(f: (x: number, y: number) => number, x: number, y: number, h = Calculus.H): number {
    return (f(x + h, y) - f(x - h, y)) / (2 * h);
  }

  static partialDerivativeY(f: (x: number, y: number) => number, x: number, y: number, h = Calculus.H): number {
    return (f(x, y + h) - f(x, y - h)) / (2 * h);
  }

  // Simpson's 1/3 rule
  static integral(f: (x: number) => number, a: number, b: number, n = 1000): number {
    if (n % 2 !== 0) n++;
    const h = (b - a) / n;
    let sum = f(a) + f(b);
    for (let i = 1; i < n; i++) {
      sum += (i % 2 === 0 ? 2 : 4) * f(a + i * h);
    }
    return (h / 3) * sum;
  }

  static limit(f: (x: number) => number, x: number, h = 1e-8): number {
    const left = f(x - h);
    const right = f(x + h);
    if (!isFinite(left) || !isFinite(right)) {
      throw new Error('Limit is infinite or undefined at this point');
    }
    const relTol = 1e-5 * (1 + Math.abs(left + right) / 2);
    if (Math.abs(left - right) > relTol) {
      throw new Error('Left and right limits differ — limit does not exist at this point');
    }
    return (left + right) / 2;
  }

  static arcLength(f: (x: number) => number, a: number, b: number, n = 1000): number {
    const integrand = (x: number) => Math.sqrt(1 + Calculus.derivative(f, x) ** 2);
    return Calculus.integral(integrand, a, b, n);
  }
}

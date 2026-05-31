import { Matrix, Polynomial } from '../src/Algebra';

// ─── Matrix ───────────────────────────────────────────────────────────────────

describe('Matrix - construction & statics', () => {
  test('identity(3) has 1s on diagonal', () => {
    const I = Matrix.identity(3);
    expect(I.get(0, 0)).toBe(1); expect(I.get(1, 1)).toBe(1); expect(I.get(2, 2)).toBe(1);
    expect(I.get(0, 1)).toBe(0);
  });
  test('zeros(2,3) is all zeros', () => {
    const Z = Matrix.zeros(2, 3);
    expect(Z.rows).toBe(2); expect(Z.cols).toBe(3);
    expect(Z.get(1, 2)).toBe(0);
  });
  test('throws for empty matrix', () => {
    expect(() => new Matrix([])).toThrow();
  });
});

describe('Matrix - arithmetic', () => {
  const A = new Matrix([[1, 2], [3, 4]]);
  const B = new Matrix([[5, 6], [7, 8]]);

  test('add', () => {
    const C = A.add(B);
    expect(C.get(0, 0)).toBe(6); expect(C.get(1, 1)).toBe(12);
  });
  test('sub', () => {
    const C = B.sub(A);
    expect(C.get(0, 0)).toBe(4); expect(C.get(1, 1)).toBe(4);
  });
  test('mul: [[1,2],[3,4]] × [[5,6],[7,8]]', () => {
    const C = A.mul(B);
    expect(C.get(0, 0)).toBe(19); expect(C.get(0, 1)).toBe(22);
    expect(C.get(1, 0)).toBe(43); expect(C.get(1, 1)).toBe(50);
  });
  test('scale', () => {
    const C = A.scale(2);
    expect(C.get(0, 0)).toBe(2); expect(C.get(1, 1)).toBe(8);
  });
  test('transpose', () => {
    const T = A.transpose();
    expect(T.get(0, 1)).toBe(3); expect(T.get(1, 0)).toBe(2);
  });
  test('throws for dimension mismatch', () => {
    expect(() => A.add(new Matrix([[1, 2, 3]]))).toThrow();
  });
});

describe('Matrix - trace & determinant', () => {
  test('trace([[1,2],[3,4]]) = 5', () => {
    expect(new Matrix([[1, 2], [3, 4]]).trace()).toBe(5);
  });
  test('det of 2×2', () => {
    expect(new Matrix([[1, 2], [3, 4]]).det()).toBeCloseTo(-2, 10);
  });
  test('det of 3×3', () => {
    const M = new Matrix([[1, 2, 3], [4, 5, 6], [7, 8, 10]]);
    expect(M.det()).toBeCloseTo(-3, 10);
  });
  test('det of singular matrix is 0', () => {
    expect(new Matrix([[1, 2], [2, 4]]).det()).toBeCloseTo(0, 10);
  });
});

describe('Matrix - inverse & solve', () => {
  test('inverse of [[2,0],[0,2]] = [[0.5,0],[0,0.5]]', () => {
    const inv = new Matrix([[2, 0], [0, 2]]).inverse();
    expect(inv.get(0, 0)).toBeCloseTo(0.5, 10);
    expect(inv.get(1, 1)).toBeCloseTo(0.5, 10);
  });
  test('A × A⁻¹ = I', () => {
    const A = new Matrix([[1, 2], [3, 4]]);
    const I = A.mul(A.inverse());
    expect(I.get(0, 0)).toBeCloseTo(1, 10); expect(I.get(0, 1)).toBeCloseTo(0, 10);
    expect(I.get(1, 0)).toBeCloseTo(0, 10); expect(I.get(1, 1)).toBeCloseTo(1, 10);
  });
  test('throws for singular matrix', () => {
    expect(() => new Matrix([[1, 2], [2, 4]]).inverse()).toThrow();
  });
  test('solve: x+y=3, 2x-y=0 → x=1, y=2', () => {
    const A = new Matrix([[1, 1], [2, -1]]);
    const b = new Matrix([[3], [0]]);
    const x = A.solve(b);
    expect(x.get(0, 0)).toBeCloseTo(1, 8);
    expect(x.get(1, 0)).toBeCloseTo(2, 8);
  });
});

// ─── Polynomial ───────────────────────────────────────────────────────────────

describe('Polynomial - evaluate', () => {
  test('x² evaluated at 3 = 9', () => {
    expect(new Polynomial([0, 0, 1]).evaluate(3)).toBe(9);
  });
  test('x² - 4 evaluated at 2 = 0', () => {
    expect(new Polynomial([-4, 0, 1]).evaluate(2)).toBe(0);
  });
  test('constant polynomial 5 evaluated at 10 = 5', () => {
    expect(new Polynomial([5]).evaluate(10)).toBe(5);
  });
});

describe('Polynomial - operations', () => {
  test('add: (x+1) + (x+2) = 2x+3', () => {
    const p = new Polynomial([1, 1]).add(new Polynomial([2, 1]));
    expect(p.evaluate(0)).toBe(3); expect(p.evaluate(1)).toBe(5);
  });
  test('mul: (x+1)(x-1) = x²-1', () => {
    const p = new Polynomial([1, 1]).mul(new Polynomial([-1, 1]));
    expect(p.evaluate(0)).toBe(-1); expect(p.evaluate(2)).toBe(3);
  });
  test('derivative of x³ is 3x²', () => {
    const d = new Polynomial([0, 0, 0, 1]).derivative();
    expect(d.evaluate(2)).toBeCloseTo(12, 10);
    expect(d.evaluate(3)).toBeCloseTo(27, 10);
  });
  test('derivative of constant is 0', () => {
    expect(new Polynomial([5]).derivative().evaluate(100)).toBe(0);
  });
});

describe('Polynomial - findRoots', () => {
  test('x² - 4 has roots ±2', () => {
    const roots = new Polynomial([-4, 0, 1]).findRoots();
    expect(roots).toHaveLength(2);
    expect(roots[0]).toBeCloseTo(-2, 5);
    expect(roots[1]).toBeCloseTo(2, 5);
  });
  test('x² - x - 6 has roots -2 and 3', () => {
    const roots = new Polynomial([-6, -1, 1]).findRoots();
    expect(roots).toHaveLength(2);
    expect(roots[0]).toBeCloseTo(-2, 5);
    expect(roots[1]).toBeCloseTo(3, 5);
  });
  test('x³ - x has roots -1, 0, 1', () => {
    const roots = new Polynomial([0, -1, 0, 1]).findRoots();
    expect(roots).toHaveLength(3);
    expect(roots[0]).toBeCloseTo(-1, 5);
    expect(roots[1]).toBeCloseTo(0, 5);
    expect(roots[2]).toBeCloseTo(1, 5);
  });
  test('constant polynomial has no roots', () => {
    expect(new Polynomial([5]).findRoots()).toHaveLength(0);
  });
});

describe('Polynomial - toString', () => {
  test('x² - 4', () => expect(new Polynomial([-4, 0, 1]).toString()).toBe('x^2 - 4'));
  test('x² - x - 6', () => expect(new Polynomial([-6, -1, 1]).toString()).toBe('x^2 - x - 6'));
  test('constant 5', () => expect(new Polynomial([5]).toString()).toBe('5'));
  test('x', () => expect(new Polynomial([0, 1]).toString()).toBe('x'));
});

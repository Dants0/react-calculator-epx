// ─── Matrix ───────────────────────────────────────────────────────────────────

export class Matrix {
  readonly rows: number;
  readonly cols: number;
  readonly data: number[][];

  constructor(data: number[][]) {
    if (data.length === 0 || data[0].length === 0) throw new Error('Matrix cannot be empty');
    const cols = data[0].length;
    if (data.some(row => row.length !== cols)) throw new Error('All rows must have the same length');
    this.rows = data.length;
    this.cols = cols;
    this.data = data.map(row => [...row]);
  }

  static identity(n: number): Matrix {
    return new Matrix(
      Array.from({ length: n }, (_, i) => Array.from({ length: n }, (_, j) => (i === j ? 1 : 0)))
    );
  }

  static zeros(rows: number, cols: number): Matrix {
    return new Matrix(Array.from({ length: rows }, () => new Array(cols).fill(0)));
  }

  get(row: number, col: number): number {
    return this.data[row][col];
  }

  isSquare(): boolean {
    return this.rows === this.cols;
  }

  add(other: Matrix): Matrix {
    if (this.rows !== other.rows || this.cols !== other.cols) {
      throw new Error('Matrix dimensions must match for addition');
    }
    return new Matrix(this.data.map((row, i) => row.map((v, j) => v + other.data[i][j])));
  }

  sub(other: Matrix): Matrix {
    if (this.rows !== other.rows || this.cols !== other.cols) {
      throw new Error('Matrix dimensions must match for subtraction');
    }
    return new Matrix(this.data.map((row, i) => row.map((v, j) => v - other.data[i][j])));
  }

  mul(other: Matrix): Matrix {
    if (this.cols !== other.rows) {
      throw new Error(`Cannot multiply ${this.rows}x${this.cols} by ${other.rows}x${other.cols}`);
    }
    const result = Array.from({ length: this.rows }, () => new Array(other.cols).fill(0));
    for (let i = 0; i < this.rows; i++) {
      for (let j = 0; j < other.cols; j++) {
        for (let k = 0; k < this.cols; k++) {
          result[i][j] += this.data[i][k] * other.data[k][j];
        }
      }
    }
    return new Matrix(result);
  }

  scale(scalar: number): Matrix {
    return new Matrix(this.data.map(row => row.map(v => v * scalar)));
  }

  transpose(): Matrix {
    return new Matrix(
      Array.from({ length: this.cols }, (_, i) =>
        Array.from({ length: this.rows }, (_, j) => this.data[j][i])
      )
    );
  }

  trace(): number {
    if (!this.isSquare()) throw new Error('Trace is only defined for square matrices');
    return this.data.reduce((sum, row, i) => sum + row[i], 0);
  }

  det(): number {
    if (!this.isSquare()) throw new Error('Determinant is only defined for square matrices');
    return gaussianDet(this.data.map(row => [...row]));
  }

  inverse(): Matrix {
    if (!this.isSquare()) throw new Error('Inverse is only defined for square matrices');
    const n = this.rows;
    // Augmented matrix [A | I]
    const aug = this.data.map((row, i) => [
      ...row,
      ...Array.from({ length: n }, (_, j) => (i === j ? 1 : 0)),
    ]);
    for (let i = 0; i < n; i++) {
      let maxRow = i;
      for (let j = i + 1; j < n; j++) {
        if (Math.abs(aug[j][i]) > Math.abs(aug[maxRow][i])) maxRow = j;
      }
      [aug[i], aug[maxRow]] = [aug[maxRow], aug[i]];
      if (Math.abs(aug[i][i]) < 1e-14) throw new Error('Matrix is singular — inverse does not exist');
      const pivot = aug[i][i];
      for (let j = 0; j < 2 * n; j++) aug[i][j] /= pivot;
      for (let j = 0; j < n; j++) {
        if (j === i) continue;
        const factor = aug[j][i];
        for (let k = 0; k < 2 * n; k++) aug[j][k] -= factor * aug[i][k];
      }
    }
    return new Matrix(aug.map(row => row.slice(n)));
  }

  // Solve Ax = b using Gaussian elimination with partial pivoting
  solve(b: Matrix): Matrix {
    if (!this.isSquare()) throw new Error('Coefficient matrix must be square');
    if (b.cols !== 1 || b.rows !== this.rows) throw new Error('b must be a column vector of matching size');
    const n = this.rows;
    const aug = this.data.map((row, i) => [...row, b.data[i][0]]);
    for (let i = 0; i < n; i++) {
      let maxRow = i;
      for (let j = i + 1; j < n; j++) {
        if (Math.abs(aug[j][i]) > Math.abs(aug[maxRow][i])) maxRow = j;
      }
      [aug[i], aug[maxRow]] = [aug[maxRow], aug[i]];
      if (Math.abs(aug[i][i]) < 1e-14) throw new Error('System has no unique solution');
      for (let j = i + 1; j < n; j++) {
        const factor = aug[j][i] / aug[i][i];
        for (let k = i; k <= n; k++) aug[j][k] -= factor * aug[i][k];
      }
    }
    const x = new Array(n).fill(0);
    for (let i = n - 1; i >= 0; i--) {
      x[i] = aug[i][n];
      for (let j = i + 1; j < n; j++) x[i] -= aug[i][j] * x[j];
      x[i] /= aug[i][i];
    }
    return new Matrix(x.map(v => [v]));
  }

  toString(): string {
    return this.data.map(row => `[${row.join(', ')}]`).join('\n');
  }
}

function gaussianDet(mat: number[][]): number {
  const n = mat.length;
  let sign = 1;
  for (let i = 0; i < n; i++) {
    let maxRow = i;
    for (let j = i + 1; j < n; j++) {
      if (Math.abs(mat[j][i]) > Math.abs(mat[maxRow][i])) maxRow = j;
    }
    if (maxRow !== i) {
      [mat[i], mat[maxRow]] = [mat[maxRow], mat[i]];
      sign *= -1;
    }
    if (Math.abs(mat[i][i]) < 1e-14) return 0;
    for (let j = i + 1; j < n; j++) {
      const factor = mat[j][i] / mat[i][i];
      for (let k = i; k < n; k++) mat[j][k] -= factor * mat[i][k];
    }
  }
  let det = sign;
  for (let i = 0; i < n; i++) det *= mat[i][i];
  return det;
}

// ─── Polynomial ───────────────────────────────────────────────────────────────

export class Polynomial {
  readonly coefficients: number[]; // coefficients[i] = coefficient of x^i

  constructor(coefficients: number[]) {
    if (coefficients.length === 0) throw new Error('Polynomial must have at least one coefficient');
    let end = coefficients.length - 1;
    while (end > 0 && coefficients[end] === 0) end--;
    this.coefficients = coefficients.slice(0, end + 1);
  }

  get degree(): number {
    return this.coefficients.length - 1;
  }

  // Horner's method
  evaluate(x: number): number {
    let result = 0;
    for (let i = this.degree; i >= 0; i--) {
      result = result * x + this.coefficients[i];
    }
    return result;
  }

  add(other: Polynomial): Polynomial {
    const len = Math.max(this.coefficients.length, other.coefficients.length);
    const result = new Array(len).fill(0);
    for (let i = 0; i < this.coefficients.length; i++) result[i] += this.coefficients[i];
    for (let i = 0; i < other.coefficients.length; i++) result[i] += other.coefficients[i];
    return new Polynomial(result);
  }

  mul(other: Polynomial): Polynomial {
    const result = new Array(this.degree + other.degree + 1).fill(0);
    for (let i = 0; i <= this.degree; i++) {
      for (let j = 0; j <= other.degree; j++) {
        result[i + j] += this.coefficients[i] * other.coefficients[j];
      }
    }
    return new Polynomial(result);
  }

  derivative(): Polynomial {
    if (this.degree === 0) return new Polynomial([0]);
    return new Polynomial(this.coefficients.slice(1).map((c, i) => c * (i + 1)));
  }

  // Newton's method with Cauchy bound for initial range
  findRoots(): number[] {
    if (this.degree === 0) return [];
    const an = this.coefficients[this.degree];
    const bound = 1 + Math.max(...this.coefficients.slice(0, this.degree).map(c => Math.abs(c / an)));
    const deriv = this.derivative();
    const roots: number[] = [];
    const samples = 400;
    const step = (2 * bound) / samples;

    const newton = (x0: number): number | null => {
      let x = x0;
      for (let iter = 0; iter < 300; iter++) {
        const fx = this.evaluate(x);
        if (Math.abs(fx) < 1e-12) return x;
        const fpx = deriv.evaluate(x);
        if (Math.abs(fpx) < 1e-15) return null;
        const xNew = x - fx / fpx;
        if (!isFinite(xNew)) return null;
        if (Math.abs(xNew - x) < 1e-12) { x = xNew; break; }
        x = xNew;
      }
      return Math.abs(this.evaluate(x)) < 1e-8 ? x : null;
    };

    for (let i = 0; i <= samples; i++) {
      const root = newton(-bound + i * step);
      if (root !== null) {
        if (!roots.some(r => Math.abs(r - root) < 1e-6)) {
          roots.push(parseFloat(root.toFixed(10)));
        }
      }
    }
    return roots.sort((a, b) => a - b);
  }

  toString(): string {
    if (this.coefficients.every(c => c === 0)) return '0';
    const parts: string[] = [];
    for (let i = this.degree; i >= 0; i--) {
      const c = this.coefficients[i];
      if (c === 0) continue;
      const absC = Math.abs(c);
      let term: string;
      if (i === 0) term = `${absC}`;
      else if (i === 1) term = absC === 1 ? 'x' : `${absC}x`;
      else term = absC === 1 ? `x^${i}` : `${absC}x^${i}`;
      parts.push(
        parts.length === 0
          ? c < 0 ? `-${term}` : term
          : c < 0 ? `- ${term}` : `+ ${term}`
      );
    }
    return parts.join(' ');
  }
}

export class ComplexNumber {
  constructor(readonly real: number, readonly imag: number = 0) {}

  add(other: ComplexNumber): ComplexNumber {
    return new ComplexNumber(this.real + other.real, this.imag + other.imag);
  }

  sub(other: ComplexNumber): ComplexNumber {
    return new ComplexNumber(this.real - other.real, this.imag - other.imag);
  }

  mul(other: ComplexNumber): ComplexNumber {
    return new ComplexNumber(
      this.real * other.real - this.imag * other.imag,
      this.real * other.imag + this.imag * other.real
    );
  }

  div(other: ComplexNumber): ComplexNumber {
    const denom = other.real ** 2 + other.imag ** 2;
    if (denom === 0) throw new Error('Division by zero complex number');
    return new ComplexNumber(
      (this.real * other.real + this.imag * other.imag) / denom,
      (this.imag * other.real - this.real * other.imag) / denom
    );
  }

  conjugate(): ComplexNumber {
    return new ComplexNumber(this.real, -this.imag);
  }

  modulus(): number {
    return Math.sqrt(this.real ** 2 + this.imag ** 2);
  }

  argument(): number {
    return Math.atan2(this.imag, this.real);
  }

  // De Moivre's theorem: z^n = r^n * (cos(nθ) + i·sin(nθ))
  pow(n: number): ComplexNumber {
    const r = this.modulus();
    const theta = this.argument();
    const rn = Math.pow(r, n);
    return new ComplexNumber(rn * Math.cos(n * theta), rn * Math.sin(n * theta));
  }

  sqrt(): ComplexNumber {
    return this.pow(0.5);
  }

  // Euler's formula: e^(a+bi) = e^a * (cos(b) + i·sin(b))
  exp(): ComplexNumber {
    const ea = Math.exp(this.real);
    return new ComplexNumber(ea * Math.cos(this.imag), ea * Math.sin(this.imag));
  }

  toPolar(): { r: number; theta: number } {
    return { r: this.modulus(), theta: this.argument() };
  }

  static fromPolar(r: number, theta: number): ComplexNumber {
    return new ComplexNumber(r * Math.cos(theta), r * Math.sin(theta));
  }

  toString(): string {
    if (this.imag === 0) return `${this.real}`;
    if (this.real === 0) return `${this.imag}i`;
    return this.imag > 0
      ? `${this.real} + ${this.imag}i`
      : `${this.real} - ${Math.abs(this.imag)}i`;
  }
}

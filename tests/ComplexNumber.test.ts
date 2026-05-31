import { ComplexNumber } from '../src/ComplexNumber';

describe('ComplexNumber - arithmetic', () => {
  test('add', () => {
    const r = new ComplexNumber(1, 2).add(new ComplexNumber(3, 4));
    expect(r.real).toBe(4); expect(r.imag).toBe(6);
  });
  test('sub', () => {
    const r = new ComplexNumber(5, 3).sub(new ComplexNumber(2, 1));
    expect(r.real).toBe(3); expect(r.imag).toBe(2);
  });
  test('mul: (1+2i)(3+4i) = -5+10i', () => {
    const r = new ComplexNumber(1, 2).mul(new ComplexNumber(3, 4));
    expect(r.real).toBe(-5); expect(r.imag).toBe(10);
  });
  test('div: (4+2i)/(2+1i) = 2', () => {
    // (4+2i)/(2+i) = (8+4+4i-2i)/5 = (12+2i)/5 = 2.4+0.4i... wait
    // Let me recompute: (4+2i)(2-1i)/((2)^2+(1)^2) = (8-4i+4i-2i^2)/5 = (8+2)/5 + 0i = 2
    const r = new ComplexNumber(4, 2).div(new ComplexNumber(2, 1));
    expect(r.real).toBeCloseTo(2, 10); expect(r.imag).toBeCloseTo(0, 10);
  });
  test('div throws for zero', () => {
    expect(() => new ComplexNumber(1, 1).div(new ComplexNumber(0, 0))).toThrow();
  });
});

describe('ComplexNumber - properties', () => {
  test('modulus of 3+4i is 5', () => {
    expect(new ComplexNumber(3, 4).modulus()).toBeCloseTo(5, 10);
  });
  test('argument of i is π/2', () => {
    expect(new ComplexNumber(0, 1).argument()).toBeCloseTo(Math.PI / 2, 10);
  });
  test('conjugate of 3+4i is 3-4i', () => {
    const c = new ComplexNumber(3, 4).conjugate();
    expect(c.real).toBe(3); expect(c.imag).toBe(-4);
  });
});

describe('ComplexNumber - power and roots', () => {
  test('i² = -1', () => {
    const r = new ComplexNumber(0, 1).pow(2);
    expect(r.real).toBeCloseTo(-1, 10); expect(r.imag).toBeCloseTo(0, 10);
  });
  test('(1+i)^4 = -4', () => {
    const r = new ComplexNumber(1, 1).pow(4);
    expect(r.real).toBeCloseTo(-4, 10); expect(r.imag).toBeCloseTo(0, 10);
  });
  test('sqrt of -1 is i', () => {
    const r = new ComplexNumber(-1, 0).sqrt();
    expect(Math.abs(r.imag)).toBeCloseTo(1, 10);
  });
});

describe('ComplexNumber - polar and exp', () => {
  test('fromPolar(1, π/2) ≈ i', () => {
    const z = ComplexNumber.fromPolar(1, Math.PI / 2);
    expect(z.real).toBeCloseTo(0, 10); expect(z.imag).toBeCloseTo(1, 10);
  });
  test('e^(iπ) ≈ -1 (Euler)', () => {
    const r = new ComplexNumber(0, Math.PI).exp();
    expect(r.real).toBeCloseTo(-1, 10); expect(r.imag).toBeCloseTo(0, 10);
  });
  test('toPolar of 3+4i gives r=5', () => {
    expect(new ComplexNumber(3, 4).toPolar().r).toBeCloseTo(5, 10);
  });
});

describe('ComplexNumber - toString', () => {
  test('3+4i', () => expect(new ComplexNumber(3, 4).toString()).toBe('3 + 4i'));
  test('3-4i', () => expect(new ComplexNumber(3, -4).toString()).toBe('3 - 4i'));
  test('pure real', () => expect(new ComplexNumber(5, 0).toString()).toBe('5'));
  test('pure imag', () => expect(new ComplexNumber(0, 3).toString()).toBe('3i'));
});

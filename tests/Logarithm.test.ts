import { Logarithm } from '../src/Logarithm';

describe('Logarithm - basic', () => {
  test('ln(e) = 1', () => expect(Logarithm.ln(Math.E)).toBeCloseTo(1, 10));
  test('ln(1) = 0', () => expect(Logarithm.ln(1)).toBe(0));
  test('log2(8) = 3', () => expect(Logarithm.log2(8)).toBeCloseTo(3, 10));
  test('log2(1) = 0', () => expect(Logarithm.log2(1)).toBe(0));
  test('log10(100) = 2', () => expect(Logarithm.log10(100)).toBeCloseTo(2, 10));
  test('log10(1000) = 3', () => expect(Logarithm.log10(1000)).toBeCloseTo(3, 10));
  test('logBase(8, 2) = 3', () => expect(Logarithm.logBase(8, 2)).toBeCloseTo(3, 10));
  test('logBase(27, 3) = 3', () => expect(Logarithm.logBase(27, 3)).toBeCloseTo(3, 10));
});

describe('Logarithm - antilog', () => {
  test('antilog(3, 10) = 1000', () => expect(Logarithm.antilog(3, 10)).toBeCloseTo(1000, 6));
  test('antilog(0) = 1 (base 10)', () => expect(Logarithm.antilog(0)).toBe(1));
  test('antilog(1, 2) = 2', () => expect(Logarithm.antilog(1, 2)).toBe(2));
});

describe('Logarithm - changeOfBase', () => {
  test('log_10(1000)=3 converted to base 2 ≈ 9.9657', () => {
    expect(Logarithm.changeOfBase(3, 10, 2)).toBeCloseTo(9.9657, 3);
  });
  test('log_2(8)=3 converted to base 10 ≈ 0.9031', () => {
    expect(Logarithm.changeOfBase(3, 2, 10)).toBeCloseTo(0.9031, 3);
  });
});

describe('Logarithm - throws for invalid input', () => {
  test('ln(0) throws', () => expect(() => Logarithm.ln(0)).toThrow());
  test('ln(-1) throws', () => expect(() => Logarithm.ln(-1)).toThrow());
  test('logBase with base 1 throws', () => expect(() => Logarithm.logBase(5, 1)).toThrow());
  test('logBase with base 0 throws', () => expect(() => Logarithm.logBase(5, 0)).toThrow());
  test('antilog with bad base throws', () => expect(() => Logarithm.antilog(1, 1)).toThrow());
});

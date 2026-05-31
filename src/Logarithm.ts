export class Logarithm {
  static ln(x: number): number {
    if (x <= 0) throw new Error('ln is defined only for positive numbers');
    return Math.log(x);
  }

  static log2(x: number): number {
    if (x <= 0) throw new Error('log2 is defined only for positive numbers');
    return Math.log2(x);
  }

  static log10(x: number): number {
    if (x <= 0) throw new Error('log10 is defined only for positive numbers');
    return Math.log10(x);
  }

  static logBase(x: number, base: number): number {
    if (x <= 0) throw new Error('Logarithm is defined only for positive numbers');
    if (base <= 0 || base === 1) throw new Error('Base must be positive and not equal to 1');
    return Math.log(x) / Math.log(base);
  }

  static antilog(y: number, base = 10): number {
    if (base <= 0 || base === 1) throw new Error('Base must be positive and not equal to 1');
    return Math.pow(base, y);
  }

  // Convert a known log value from one base to another.
  // If log_fromBase(x) = value, returns log_toBase(x).
  // Uses change of base: log_to(x) = log_from(x) / log_from(to)
  static changeOfBase(value: number, fromBase: number, toBase: number): number {
    if (fromBase <= 0 || fromBase === 1) throw new Error('Invalid fromBase');
    if (toBase <= 0 || toBase === 1) throw new Error('Invalid toBase');
    return value / Logarithm.logBase(toBase, fromBase);
  }
}

export class DiscreteMath {
  static combination(n: number, k: number): number {
    if (!Number.isInteger(n) || !Number.isInteger(k) || n < 0 || k < 0) {
      throw new Error('n and k must be non-negative integers');
    }
    if (k > n) return 0;
    k = Math.min(k, n - k);
    let result = 1;
    for (let i = 0; i < k; i++) {
      result = (result * (n - i)) / (i + 1);
    }
    return Math.round(result);
  }

  static permutation(n: number, k: number): number {
    if (!Number.isInteger(n) || !Number.isInteger(k) || n < 0 || k < 0) {
      throw new Error('n and k must be non-negative integers');
    }
    if (k > n) return 0;
    let result = 1;
    for (let i = 0; i < k; i++) result *= n - i;
    return result;
  }

  static powerSet<T>(set: T[]): T[][] {
    const result: T[][] = [[]];
    for (const element of set) {
      const newSubsets = result.map(subset => [...subset, element]);
      result.push(...newSubsets);
    }
    return result;
  }

  static union<T>(a: Set<T>, b: Set<T>): Set<T> {
    return new Set([...a, ...b]);
  }

  static intersection<T>(a: Set<T>, b: Set<T>): Set<T> {
    return new Set([...a].filter(x => b.has(x)));
  }

  static difference<T>(a: Set<T>, b: Set<T>): Set<T> {
    return new Set([...a].filter(x => !b.has(x)));
  }

  static symmetricDifference<T>(a: Set<T>, b: Set<T>): Set<T> {
    return DiscreteMath.union(
      DiscreteMath.difference(a, b),
      DiscreteMath.difference(b, a)
    );
  }

  static toBinary(n: number): string {
    if (!Number.isInteger(n) || n < 0) {
      throw new Error('Input must be a non-negative integer');
    }
    return n.toString(2);
  }

  static fromBinary(bin: string): number {
    if (!/^[01]+$/.test(bin)) throw new Error('Invalid binary string');
    return parseInt(bin, 2);
  }

  static extendedGcd(a: number, b: number): { gcd: number; x: number; y: number } {
    if (b === 0) return { gcd: a, x: 1, y: 0 };
    const { gcd, x, y } = DiscreteMath.extendedGcd(b, a % b);
    return { gcd, x: y, y: x - Math.floor(a / b) * y };
  }

  static hammingDistance(a: number, b: number): number {
    let xor = (a ^ b) >>> 0;
    let count = 0;
    while (xor > 0) {
      count += xor & 1;
      xor >>>= 1;
    }
    return count;
  }

  // Fast modular exponentiation: (base^exp) mod mod
  static modpow(base: number, exp: number, mod: number): number {
    if (mod === 1) return 0;
    let result = 1;
    base = base % mod;
    while (exp > 0) {
      if (exp % 2 === 1) result = (result * base) % mod;
      exp = Math.floor(exp / 2);
      base = (base * base) % mod;
    }
    return result;
  }
}

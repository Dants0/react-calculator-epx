import { DiscreteMath } from '../src/DiscreteMath';

describe('DiscreteMath - combination & permutation', () => {
  test('C(5,2) = 10', () => expect(DiscreteMath.combination(5, 2)).toBe(10));
  test('C(10,3) = 120', () => expect(DiscreteMath.combination(10, 3)).toBe(120));
  test('C(n,0) = 1', () => expect(DiscreteMath.combination(7, 0)).toBe(1));
  test('C(n,n) = 1', () => expect(DiscreteMath.combination(5, 5)).toBe(1));
  test('C(n,k) = 0 when k > n', () => expect(DiscreteMath.combination(3, 5)).toBe(0));
  test('P(5,2) = 20', () => expect(DiscreteMath.permutation(5, 2)).toBe(20));
  test('P(4,4) = 24', () => expect(DiscreteMath.permutation(4, 4)).toBe(24));
  test('throws for negative input', () => {
    expect(() => DiscreteMath.combination(-1, 2)).toThrow();
  });
});

describe('DiscreteMath - power set', () => {
  test('power set of [] is [[]]', () => {
    expect(DiscreteMath.powerSet([])).toEqual([[]]);
  });
  test('power set of [1,2] has 4 elements', () => {
    const ps = DiscreteMath.powerSet([1, 2]);
    expect(ps).toHaveLength(4);
    expect(ps).toContainEqual([]);
    expect(ps).toContainEqual([1]);
    expect(ps).toContainEqual([2]);
    expect(ps).toContainEqual([1, 2]);
  });
  test('power set of [a,b,c] has 8 elements', () => {
    expect(DiscreteMath.powerSet(['a', 'b', 'c'])).toHaveLength(8);
  });
});

describe('DiscreteMath - set operations', () => {
  const A = new Set([1, 2, 3]);
  const B = new Set([2, 3, 4]);

  test('union', () => {
    expect(DiscreteMath.union(A, B)).toEqual(new Set([1, 2, 3, 4]));
  });
  test('intersection', () => {
    expect(DiscreteMath.intersection(A, B)).toEqual(new Set([2, 3]));
  });
  test('difference A \\ B', () => {
    expect(DiscreteMath.difference(A, B)).toEqual(new Set([1]));
  });
  test('symmetric difference', () => {
    expect(DiscreteMath.symmetricDifference(A, B)).toEqual(new Set([1, 4]));
  });
});

describe('DiscreteMath - binary', () => {
  test('toBinary(10) = "1010"', () => expect(DiscreteMath.toBinary(10)).toBe('1010'));
  test('toBinary(0) = "0"', () => expect(DiscreteMath.toBinary(0)).toBe('0'));
  test('fromBinary("1010") = 10', () => expect(DiscreteMath.fromBinary('1010')).toBe(10));
  test('fromBinary("11111111") = 255', () => expect(DiscreteMath.fromBinary('11111111')).toBe(255));
  test('throws for invalid binary', () => expect(() => DiscreteMath.fromBinary('102')).toThrow());
});

describe('DiscreteMath - extendedGcd, hammingDistance, modpow', () => {
  test('extendedGcd(35,15): gcd=5, 35x+15y=5', () => {
    const { gcd, x, y } = DiscreteMath.extendedGcd(35, 15);
    expect(gcd).toBe(5);
    expect(35 * x + 15 * y).toBe(5);
  });
  test('hammingDistance(7, 10) = 3', () => {
    // 7=0111, 10=1010, XOR=1101 → 3 bits
    expect(DiscreteMath.hammingDistance(7, 10)).toBe(3);
  });
  test('hammingDistance(0, 0) = 0', () => expect(DiscreteMath.hammingDistance(0, 0)).toBe(0));
  test('modpow(2, 10, 1000) = 24', () => expect(DiscreteMath.modpow(2, 10, 1000)).toBe(24));
  test('modpow(3, 4, 5) = 1', () => expect(DiscreteMath.modpow(3, 4, 5)).toBe(1));
});

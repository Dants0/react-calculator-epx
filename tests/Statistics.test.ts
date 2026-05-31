import { Statistics } from '../src/Statistics';

const data = [1, 2, 3, 4, 5];

describe('Statistics - central tendency', () => {
  test('mean([1..5]) = 3', () => expect(Statistics.mean(data)).toBe(3));
  test('mean([2,4]) = 3', () => expect(Statistics.mean([2, 4])).toBe(3));
  test('median([1..5]) = 3', () => expect(Statistics.median(data)).toBe(3));
  test('median([1,2,3,4]) = 2.5', () => expect(Statistics.median([1, 2, 3, 4])).toBe(2.5));
  test('mode([1,2,2,3]) = [2]', () => expect(Statistics.mode([1, 2, 2, 3])).toEqual([2]));
  test('mode([1,1,2,2,3]) = [1,2] (bimodal)', () => {
    expect(Statistics.mode([1, 1, 2, 2, 3])).toEqual([1, 2]);
  });
  test('throws on empty array', () => {
    expect(() => Statistics.mean([])).toThrow();
    expect(() => Statistics.median([])).toThrow();
  });
});

describe('Statistics - dispersion', () => {
  test('variance([1..5], population) = 2', () => {
    expect(Statistics.variance(data, true)).toBeCloseTo(2, 10);
  });
  test('variance([1..5], sample) = 2.5', () => {
    expect(Statistics.variance(data, false)).toBeCloseTo(2.5, 10);
  });
  test('stdDev([1..5]) = √2', () => {
    expect(Statistics.stdDev(data, true)).toBeCloseTo(Math.sqrt(2), 10);
  });
  test('range([1..5]) = 4', () => expect(Statistics.range(data)).toBe(4));
  test('iqr([1..5]) = 2', () => expect(Statistics.iqr(data)).toBeCloseTo(2, 8));
});

describe('Statistics - percentile & quartiles', () => {
  test('percentile([1..5], 50) = 3 (median)', () => {
    expect(Statistics.percentile(data, 50)).toBeCloseTo(3, 8);
  });
  test('percentile([1..5], 0) = 1', () => {
    expect(Statistics.percentile(data, 0)).toBe(1);
  });
  test('percentile([1..5], 100) = 5', () => {
    expect(Statistics.percentile(data, 100)).toBe(5);
  });
  test('quartiles([1..5]): Q1=2, Q2=3, Q3=4', () => {
    const { Q1, Q2, Q3 } = Statistics.quartiles(data);
    expect(Q1).toBeCloseTo(2, 8);
    expect(Q2).toBe(3);
    expect(Q3).toBeCloseTo(4, 8);
  });
  test('throws for invalid percentile', () => {
    expect(() => Statistics.percentile(data, 101)).toThrow();
    expect(() => Statistics.percentile(data, -1)).toThrow();
  });
});

describe('Statistics - z-score', () => {
  test('z-score of mean is 0', () => {
    expect(Statistics.zScore(3, data)).toBeCloseTo(0, 10);
  });
  test('z-score of 5 in [1..5] ≈ 1.414', () => {
    expect(Statistics.zScore(5, data)).toBeCloseTo(Math.sqrt(2), 5);
  });
});

describe('Statistics - covariance & correlation', () => {
  test('correlation([1,2,3],[1,2,3]) = 1 (perfect positive)', () => {
    expect(Statistics.correlation([1, 2, 3], [1, 2, 3])).toBeCloseTo(1, 10);
  });
  test('correlation([1,2,3],[3,2,1]) = -1 (perfect negative)', () => {
    expect(Statistics.correlation([1, 2, 3], [3, 2, 1])).toBeCloseTo(-1, 10);
  });
  test('covariance([1,2,3],[1,2,3]) = variance', () => {
    expect(Statistics.covariance([1, 2, 3], [1, 2, 3])).toBeCloseTo(
      Statistics.variance([1, 2, 3], true), 10
    );
  });
  test('throws for different length arrays', () => {
    expect(() => Statistics.covariance([1, 2], [1, 2, 3])).toThrow();
  });
});

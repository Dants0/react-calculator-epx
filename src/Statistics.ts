export class Statistics {
  private static validate(data: number[]): void {
    if (data.length === 0) throw new Error('Data array cannot be empty');
  }

  static mean(data: number[]): number {
    Statistics.validate(data);
    return data.reduce((sum, x) => sum + x, 0) / data.length;
  }

  static median(data: number[]): number {
    Statistics.validate(data);
    const sorted = [...data].sort((a, b) => a - b);
    const mid = Math.floor(sorted.length / 2);
    return sorted.length % 2 === 0 ? (sorted[mid - 1] + sorted[mid]) / 2 : sorted[mid];
  }

  static mode(data: number[]): number[] {
    Statistics.validate(data);
    const freq = new Map<number, number>();
    for (const x of data) freq.set(x, (freq.get(x) ?? 0) + 1);
    const max = Math.max(...freq.values());
    return [...freq.entries()].filter(([, f]) => f === max).map(([v]) => v).sort((a, b) => a - b);
  }

  static variance(data: number[], population = true): number {
    Statistics.validate(data);
    if (!population && data.length < 2) throw new Error('Sample variance requires at least 2 data points');
    const m = Statistics.mean(data);
    const sumSq = data.reduce((sum, x) => sum + (x - m) ** 2, 0);
    return sumSq / (population ? data.length : data.length - 1);
  }

  static stdDev(data: number[], population = true): number {
    return Math.sqrt(Statistics.variance(data, population));
  }

  static range(data: number[]): number {
    Statistics.validate(data);
    return Math.max(...data) - Math.min(...data);
  }

  // Linear interpolation percentile (p in [0, 100])
  static percentile(data: number[], p: number): number {
    Statistics.validate(data);
    if (p < 0 || p > 100) throw new Error('Percentile must be between 0 and 100');
    const sorted = [...data].sort((a, b) => a - b);
    const idx = (p / 100) * (sorted.length - 1);
    const lo = Math.floor(idx), hi = Math.ceil(idx);
    return sorted[lo] + (sorted[hi] - sorted[lo]) * (idx - lo);
  }

  static zScore(x: number, data: number[]): number {
    const s = Statistics.stdDev(data);
    if (s === 0) throw new Error('Standard deviation is zero — z-score is undefined');
    return (x - Statistics.mean(data)) / s;
  }

  static covariance(x: number[], y: number[]): number {
    if (x.length !== y.length) throw new Error('Arrays must have the same length');
    Statistics.validate(x);
    const mx = Statistics.mean(x), my = Statistics.mean(y);
    return x.reduce((sum, xi, i) => sum + (xi - mx) * (y[i] - my), 0) / x.length;
  }

  static correlation(x: number[], y: number[]): number {
    const denom = Statistics.stdDev(x) * Statistics.stdDev(y);
    if (denom === 0) throw new Error('Standard deviation is zero — correlation is undefined');
    return Statistics.covariance(x, y) / denom;
  }

  static quartiles(data: number[]): { Q1: number; Q2: number; Q3: number } {
    return {
      Q1: Statistics.percentile(data, 25),
      Q2: Statistics.median(data),
      Q3: Statistics.percentile(data, 75),
    };
  }

  static iqr(data: number[]): number {
    const { Q1, Q3 } = Statistics.quartiles(data);
    return Q3 - Q1;
  }
}

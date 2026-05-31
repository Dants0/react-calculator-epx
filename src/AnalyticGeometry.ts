export interface Point2D { x: number; y: number }
export interface Point3D { x: number; y: number; z: number }
export interface Line2D  { a: number; b: number; c: number } // ax + by + c = 0

export class AnalyticGeometry {
  static distance2D(p1: Point2D, p2: Point2D): number {
    return Math.sqrt((p2.x - p1.x) ** 2 + (p2.y - p1.y) ** 2);
  }

  static distance3D(p1: Point3D, p2: Point3D): number {
    return Math.sqrt((p2.x - p1.x) ** 2 + (p2.y - p1.y) ** 2 + (p2.z - p1.z) ** 2);
  }

  static midpoint2D(p1: Point2D, p2: Point2D): Point2D {
    return { x: (p1.x + p2.x) / 2, y: (p1.y + p2.y) / 2 };
  }

  static midpoint3D(p1: Point3D, p2: Point3D): Point3D {
    return { x: (p1.x + p2.x) / 2, y: (p1.y + p2.y) / 2, z: (p1.z + p2.z) / 2 };
  }

  // Returns the line in ax + by + c = 0 form passing through p1 and p2
  static lineThrough2Points(p1: Point2D, p2: Point2D): Line2D {
    const a = p2.y - p1.y;
    const b = -(p2.x - p1.x);
    const c = (p2.x - p1.x) * p1.y - (p2.y - p1.y) * p1.x;
    return { a, b, c };
  }

  // Intersection of l1 and l2. Returns null if lines are parallel.
  // Cramer's rule applied to [a1 b1; a2 b2] [x; y] = [-c1; -c2]
  static linesIntersection(l1: Line2D, l2: Line2D): Point2D | null {
    const det = l1.a * l2.b - l2.a * l1.b;
    if (Math.abs(det) < 1e-10) return null;
    return {
      x: (l2.c * l1.b - l1.c * l2.b) / det,
      y: (l2.a * l1.c - l1.a * l2.c) / det,
    };
  }

  // Distance from point to line ax + by + c = 0
  static pointToLineDistance(point: Point2D, line: Line2D): number {
    return Math.abs(line.a * point.x + line.b * point.y + line.c) /
      Math.sqrt(line.a ** 2 + line.b ** 2);
  }

  // Shoelace formula
  static triangleArea(p1: Point2D, p2: Point2D, p3: Point2D): number {
    return Math.abs(
      p1.x * (p2.y - p3.y) + p2.x * (p3.y - p1.y) + p3.x * (p1.y - p2.y)
    ) / 2;
  }

  static isInsideCircle(point: Point2D, center: Point2D, radius: number): boolean {
    return AnalyticGeometry.distance2D(point, center) <= radius;
  }

  // Circumscribed circle through three non-collinear points
  static circumscribedCircle(p1: Point2D, p2: Point2D, p3: Point2D): { center: Point2D; radius: number } {
    const D = 2 * (p1.x * (p2.y - p3.y) + p2.x * (p3.y - p1.y) + p3.x * (p1.y - p2.y));
    if (Math.abs(D) < 1e-10) throw new Error('Points are collinear — no circumscribed circle');
    const s1 = p1.x ** 2 + p1.y ** 2;
    const s2 = p2.x ** 2 + p2.y ** 2;
    const s3 = p3.x ** 2 + p3.y ** 2;
    const cx = (s1 * (p2.y - p3.y) + s2 * (p3.y - p1.y) + s3 * (p1.y - p2.y)) / D;
    const cy = (s1 * (p3.x - p2.x) + s2 * (p1.x - p3.x) + s3 * (p2.x - p1.x)) / D;
    const center = { x: cx, y: cy };
    return { center, radius: AnalyticGeometry.distance2D(center, p1) };
  }

  static areCollinear(p1: Point2D, p2: Point2D, p3: Point2D): boolean {
    return AnalyticGeometry.triangleArea(p1, p2, p3) < 1e-10;
  }

  // Shortest distance from a point to a line segment (not infinite line)
  static pointToSegmentDistance(point: Point2D, a: Point2D, b: Point2D): number {
    const dx = b.x - a.x, dy = b.y - a.y;
    const lenSq = dx * dx + dy * dy;
    if (lenSq === 0) return AnalyticGeometry.distance2D(point, a);
    const t = Math.max(0, Math.min(1, ((point.x - a.x) * dx + (point.y - a.y) * dy) / lenSq));
    return AnalyticGeometry.distance2D(point, { x: a.x + t * dx, y: a.y + t * dy });
  }
}

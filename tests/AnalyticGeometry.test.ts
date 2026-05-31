import { AnalyticGeometry } from '../src/AnalyticGeometry';

describe('AnalyticGeometry - distances & midpoints', () => {
  test('distance2D: (0,0)→(3,4) = 5', () => {
    expect(AnalyticGeometry.distance2D({ x: 0, y: 0 }, { x: 3, y: 4 })).toBeCloseTo(5, 10);
  });
  test('distance3D: (0,0,0)→(1,2,2) = 3', () => {
    expect(AnalyticGeometry.distance3D({ x: 0, y: 0, z: 0 }, { x: 1, y: 2, z: 2 })).toBeCloseTo(3, 10);
  });
  test('midpoint2D of (0,0) and (4,6) = (2,3)', () => {
    const m = AnalyticGeometry.midpoint2D({ x: 0, y: 0 }, { x: 4, y: 6 });
    expect(m.x).toBe(2); expect(m.y).toBe(3);
  });
  test('midpoint3D', () => {
    const m = AnalyticGeometry.midpoint3D({ x: 0, y: 0, z: 0 }, { x: 2, y: 4, z: 6 });
    expect(m.x).toBe(1); expect(m.y).toBe(2); expect(m.z).toBe(3);
  });
});

describe('AnalyticGeometry - lines', () => {
  test('lineThrough2Points: (0,0)→(1,1) gives y=x', () => {
    const l = AnalyticGeometry.lineThrough2Points({ x: 0, y: 0 }, { x: 1, y: 1 });
    // ax + by + c = 0 → on the line: l.a*1 + l.b*1 + l.c should be 0
    expect(l.a * 1 + l.b * 1 + l.c).toBeCloseTo(0, 10);
    expect(l.a * 0 + l.b * 0 + l.c).toBeCloseTo(0, 10);
  });
  test('linesIntersection: x-y=0 and x+y-2=0 → (1,1)', () => {
    const l1 = { a: 1, b: -1, c: 0 };
    const l2 = { a: 1, b: 1, c: -2 };
    const p = AnalyticGeometry.linesIntersection(l1, l2);
    expect(p).not.toBeNull();
    expect(p!.x).toBeCloseTo(1, 8); expect(p!.y).toBeCloseTo(1, 8);
  });
  test('linesIntersection: parallel lines return null', () => {
    expect(AnalyticGeometry.linesIntersection({ a: 1, b: 1, c: 0 }, { a: 1, b: 1, c: 2 })).toBeNull();
  });
  test('pointToLineDistance: (0,0) to x-y=0 is 0', () => {
    expect(AnalyticGeometry.pointToLineDistance({ x: 0, y: 0 }, { a: 1, b: -1, c: 0 })).toBeCloseTo(0, 10);
  });
  test('pointToLineDistance: (1,0) to x=0 (a=1,b=0,c=0) is 1', () => {
    expect(AnalyticGeometry.pointToLineDistance({ x: 1, y: 0 }, { a: 1, b: 0, c: 0 })).toBeCloseTo(1, 10);
  });
});

describe('AnalyticGeometry - triangles & circles', () => {
  test('triangleArea: right triangle (0,0)(4,0)(0,3) = 6', () => {
    expect(
      AnalyticGeometry.triangleArea({ x: 0, y: 0 }, { x: 4, y: 0 }, { x: 0, y: 3 })
    ).toBeCloseTo(6, 10);
  });
  test('isInsideCircle: (0,0) inside circle centered (0,0) r=1', () => {
    expect(AnalyticGeometry.isInsideCircle({ x: 0, y: 0 }, { x: 0, y: 0 }, 1)).toBe(true);
  });
  test('isInsideCircle: (2,0) outside circle r=1', () => {
    expect(AnalyticGeometry.isInsideCircle({ x: 2, y: 0 }, { x: 0, y: 0 }, 1)).toBe(false);
  });
  test('circumscribedCircle: (0,0)(2,0)(1,1) → center (1,0), r=1', () => {
    const { center, radius } = AnalyticGeometry.circumscribedCircle(
      { x: 0, y: 0 }, { x: 2, y: 0 }, { x: 1, y: 1 }
    );
    expect(center.x).toBeCloseTo(1, 8); expect(center.y).toBeCloseTo(0, 8);
    expect(radius).toBeCloseTo(1, 8);
  });
  test('circumscribedCircle throws for collinear points', () => {
    expect(() =>
      AnalyticGeometry.circumscribedCircle({ x: 0, y: 0 }, { x: 1, y: 1 }, { x: 2, y: 2 })
    ).toThrow();
  });
  test('areCollinear: points on y=x are collinear', () => {
    expect(AnalyticGeometry.areCollinear({ x: 0, y: 0 }, { x: 1, y: 1 }, { x: 2, y: 2 })).toBe(true);
  });
});

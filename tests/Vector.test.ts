import { Vector2D, Vector3D } from '../src/Vector';

describe('Vector2D', () => {
  const u = new Vector2D(3, 4);
  const v = new Vector2D(1, 2);

  test('magnitude of (3,4) = 5', () => expect(u.magnitude()).toBeCloseTo(5, 10));
  test('add', () => { const r = u.add(v); expect(r.x).toBe(4); expect(r.y).toBe(6); });
  test('sub', () => { const r = u.sub(v); expect(r.x).toBe(2); expect(r.y).toBe(2); });
  test('scale', () => { const r = u.scale(2); expect(r.x).toBe(6); expect(r.y).toBe(8); });
  test('dot: (3,4)·(1,2) = 11', () => expect(u.dot(v)).toBe(11));

  test('normalize has magnitude 1', () => {
    expect(u.normalize().magnitude()).toBeCloseTo(1, 10);
  });

  test('angle between (1,0) and (0,1) = π/2', () => {
    expect(new Vector2D(1, 0).angle(new Vector2D(0, 1))).toBeCloseTo(Math.PI / 2, 10);
  });

  test('angle between parallel vectors = 0', () => {
    expect(new Vector2D(2, 0).angle(new Vector2D(5, 0))).toBeCloseTo(0, 10);
  });

  test('project (3,4) onto (1,0) = (3,0)', () => {
    const p = u.project(new Vector2D(1, 0));
    expect(p.x).toBeCloseTo(3, 10); expect(p.y).toBeCloseTo(0, 10);
  });

  test('isOrthogonal: (1,0) ⊥ (0,1)', () => {
    expect(new Vector2D(1, 0).isOrthogonal(new Vector2D(0, 1))).toBe(true);
  });

  test('isParallel: (2,4) ∥ (1,2)', () => {
    expect(new Vector2D(2, 4).isParallel(new Vector2D(1, 2))).toBe(true);
  });

  test('normalize throws for zero vector', () => {
    expect(() => new Vector2D(0, 0).normalize()).toThrow();
  });
  test('toString', () => expect(u.toString()).toBe('(3, 4)'));
});

describe('Vector3D', () => {
  const i = new Vector3D(1, 0, 0);
  const j = new Vector3D(0, 1, 0);
  const k = new Vector3D(0, 0, 1);

  test('magnitude of (1,2,2) = 3', () => {
    expect(new Vector3D(1, 2, 2).magnitude()).toBeCloseTo(3, 10);
  });

  test('cross: i × j = k', () => {
    const r = i.cross(j);
    expect(r.x).toBeCloseTo(0, 10); expect(r.y).toBeCloseTo(0, 10); expect(r.z).toBeCloseTo(1, 10);
  });

  test('cross: j × k = i', () => {
    const r = j.cross(k);
    expect(r.x).toBeCloseTo(1, 10); expect(r.y).toBeCloseTo(0, 10); expect(r.z).toBeCloseTo(0, 10);
  });

  test('cross product is perpendicular to both operands', () => {
    const a = new Vector3D(1, 2, 3);
    const b = new Vector3D(4, 5, 6);
    const c = a.cross(b);
    expect(a.dot(c)).toBeCloseTo(0, 8);
    expect(b.dot(c)).toBeCloseTo(0, 8);
  });

  test('isOrthogonal: i ⊥ j', () => expect(i.isOrthogonal(j)).toBe(true));
  test('isParallel: i ∥ 2i', () => expect(i.isParallel(i.scale(2))).toBe(true));

  test('angle between i and j = π/2', () => {
    expect(i.angle(j)).toBeCloseTo(Math.PI / 2, 10);
  });

  test('normalize of (0,0,3) = (0,0,1)', () => {
    const n = new Vector3D(0, 0, 3).normalize();
    expect(n.z).toBeCloseTo(1, 10); expect(n.x).toBeCloseTo(0, 10);
  });

  test('toString', () => expect(new Vector3D(1, 2, 3).toString()).toBe('(1, 2, 3)'));
});

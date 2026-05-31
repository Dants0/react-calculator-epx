export class Vector2D {
  constructor(readonly x: number, readonly y: number) {}

  add(other: Vector2D): Vector2D { return new Vector2D(this.x + other.x, this.y + other.y); }
  sub(other: Vector2D): Vector2D { return new Vector2D(this.x - other.x, this.y - other.y); }
  scale(s: number): Vector2D    { return new Vector2D(this.x * s, this.y * s); }

  dot(other: Vector2D): number {
    return this.x * other.x + this.y * other.y;
  }

  magnitude(): number {
    return Math.sqrt(this.x ** 2 + this.y ** 2);
  }

  normalize(): Vector2D {
    const mag = this.magnitude();
    if (mag === 0) throw new Error('Cannot normalize a zero vector');
    return new Vector2D(this.x / mag, this.y / mag);
  }

  angle(other: Vector2D): number {
    const denom = this.magnitude() * other.magnitude();
    if (denom === 0) throw new Error('Cannot compute angle with a zero vector');
    return Math.acos(Math.max(-1, Math.min(1, this.dot(other) / denom)));
  }

  project(onto: Vector2D): Vector2D {
    const mag2 = onto.dot(onto);
    if (mag2 === 0) throw new Error('Cannot project onto a zero vector');
    return onto.scale(this.dot(onto) / mag2);
  }

  isOrthogonal(other: Vector2D): boolean {
    return Math.abs(this.dot(other)) < 1e-10;
  }

  isParallel(other: Vector2D): boolean {
    return Math.abs(this.x * other.y - this.y * other.x) < 1e-10;
  }

  toString(): string { return `(${this.x}, ${this.y})`; }
}

export class Vector3D {
  constructor(readonly x: number, readonly y: number, readonly z: number) {}

  add(other: Vector3D): Vector3D { return new Vector3D(this.x + other.x, this.y + other.y, this.z + other.z); }
  sub(other: Vector3D): Vector3D { return new Vector3D(this.x - other.x, this.y - other.y, this.z - other.z); }
  scale(s: number): Vector3D    { return new Vector3D(this.x * s, this.y * s, this.z * s); }

  dot(other: Vector3D): number {
    return this.x * other.x + this.y * other.y + this.z * other.z;
  }

  cross(other: Vector3D): Vector3D {
    return new Vector3D(
      this.y * other.z - this.z * other.y,
      this.z * other.x - this.x * other.z,
      this.x * other.y - this.y * other.x
    );
  }

  magnitude(): number {
    return Math.sqrt(this.x ** 2 + this.y ** 2 + this.z ** 2);
  }

  normalize(): Vector3D {
    const mag = this.magnitude();
    if (mag === 0) throw new Error('Cannot normalize a zero vector');
    return new Vector3D(this.x / mag, this.y / mag, this.z / mag);
  }

  angle(other: Vector3D): number {
    const denom = this.magnitude() * other.magnitude();
    if (denom === 0) throw new Error('Cannot compute angle with a zero vector');
    return Math.acos(Math.max(-1, Math.min(1, this.dot(other) / denom)));
  }

  project(onto: Vector3D): Vector3D {
    const mag2 = onto.dot(onto);
    if (mag2 === 0) throw new Error('Cannot project onto a zero vector');
    return onto.scale(this.dot(onto) / mag2);
  }

  isOrthogonal(other: Vector3D): boolean {
    return Math.abs(this.dot(other)) < 1e-10;
  }

  isParallel(other: Vector3D): boolean {
    return this.cross(other).magnitude() < 1e-10;
  }

  toString(): string { return `(${this.x}, ${this.y}, ${this.z})`; }
}

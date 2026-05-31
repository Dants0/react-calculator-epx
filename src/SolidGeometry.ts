type ShapeResult = { volume: number; surfaceArea: number };

function positive(...vals: number[]): void {
  if (vals.some(v => v <= 0)) throw new Error('All dimensions must be positive');
}

export class SolidGeometry {
  static cube(side: number): ShapeResult {
    positive(side);
    return { volume: side ** 3, surfaceArea: 6 * side ** 2 };
  }

  static rectangularPrism(length: number, width: number, height: number): ShapeResult {
    positive(length, width, height);
    return {
      volume: length * width * height,
      surfaceArea: 2 * (length * width + width * height + height * length),
    };
  }

  static cylinder(radius: number, height: number): ShapeResult {
    positive(radius, height);
    return {
      volume: Math.PI * radius ** 2 * height,
      surfaceArea: 2 * Math.PI * radius * (radius + height),
    };
  }

  static cone(radius: number, height: number): ShapeResult {
    positive(radius, height);
    const slant = Math.sqrt(radius ** 2 + height ** 2);
    return {
      volume: (Math.PI * radius ** 2 * height) / 3,
      surfaceArea: Math.PI * radius * (radius + slant),
    };
  }

  static sphere(radius: number): ShapeResult {
    positive(radius);
    return {
      volume: (4 / 3) * Math.PI * radius ** 3,
      surfaceArea: 4 * Math.PI * radius ** 2,
    };
  }

  // Generic regular pyramid: base described by area + perimeter
  static pyramid(baseArea: number, basePerimeter: number, height: number): ShapeResult {
    positive(baseArea, basePerimeter, height);
    const apothem = (2 * baseArea) / basePerimeter;
    const slant = Math.sqrt(height ** 2 + apothem ** 2);
    return {
      volume: (baseArea * height) / 3,
      surfaceArea: baseArea + (basePerimeter * slant) / 2,
    };
  }

  // Torus: R = major radius (center of tube), r = minor radius (tube radius)
  static torus(R: number, r: number): ShapeResult {
    positive(R, r);
    if (r >= R) throw new Error('Minor radius r must be less than major radius R');
    return {
      volume: 2 * Math.PI ** 2 * R * r ** 2,
      surfaceArea: 4 * Math.PI ** 2 * R * r,
    };
  }

  // Ellipsoid semi-axes a, b, c. Surface uses Knud Thomsen's approximation.
  static ellipsoid(a: number, b: number, c: number): ShapeResult {
    positive(a, b, c);
    const p = 1.6075;
    const surfaceArea =
      4 * Math.PI * Math.pow((Math.pow(a * b, p) + Math.pow(a * c, p) + Math.pow(b * c, p)) / 3, 1 / p);
    return { volume: (4 / 3) * Math.PI * a * b * c, surfaceArea };
  }

  static regularTetrahedron(edge: number): ShapeResult {
    positive(edge);
    return {
      volume: edge ** 3 / (6 * Math.sqrt(2)),
      surfaceArea: Math.sqrt(3) * edge ** 2,
    };
  }
}

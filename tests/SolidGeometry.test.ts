import { SolidGeometry } from '../src/SolidGeometry';

describe('SolidGeometry - cube', () => {
  test('cube(3): volume=27, surfaceArea=54', () => {
    const { volume, surfaceArea } = SolidGeometry.cube(3);
    expect(volume).toBeCloseTo(27, 10);
    expect(surfaceArea).toBeCloseTo(54, 10);
  });
  test('throws for non-positive side', () => {
    expect(() => SolidGeometry.cube(0)).toThrow();
    expect(() => SolidGeometry.cube(-1)).toThrow();
  });
});

describe('SolidGeometry - rectangular prism', () => {
  test('prism(2,3,4): volume=24, surfaceArea=52', () => {
    const { volume, surfaceArea } = SolidGeometry.rectangularPrism(2, 3, 4);
    expect(volume).toBeCloseTo(24, 10);
    expect(surfaceArea).toBeCloseTo(52, 10);
  });
});

describe('SolidGeometry - cylinder', () => {
  test('cylinder(1,1): volume=π, surfaceArea=4π', () => {
    const { volume, surfaceArea } = SolidGeometry.cylinder(1, 1);
    expect(volume).toBeCloseTo(Math.PI, 8);
    expect(surfaceArea).toBeCloseTo(4 * Math.PI, 8);
  });
});

describe('SolidGeometry - cone', () => {
  test('cone(1,1): volume=π/3', () => {
    const { volume } = SolidGeometry.cone(1, 1);
    expect(volume).toBeCloseTo(Math.PI / 3, 8);
  });
  test('cone(3,4): volume = 12π', () => {
    const { volume } = SolidGeometry.cone(3, 4);
    expect(volume).toBeCloseTo(12 * Math.PI, 8);
  });
});

describe('SolidGeometry - sphere', () => {
  test('sphere(1): volume=4π/3, surfaceArea=4π', () => {
    const { volume, surfaceArea } = SolidGeometry.sphere(1);
    expect(volume).toBeCloseTo((4 / 3) * Math.PI, 8);
    expect(surfaceArea).toBeCloseTo(4 * Math.PI, 8);
  });
});

describe('SolidGeometry - pyramid', () => {
  test('square pyramid base 4×4, height 3: volume=16', () => {
    // base area = 16, base perimeter = 16
    const { volume } = SolidGeometry.pyramid(16, 16, 3);
    expect(volume).toBeCloseTo(16, 8);
  });
});

describe('SolidGeometry - torus', () => {
  test('torus(2,1): volume=4π², surfaceArea=8π²', () => {
    const { volume, surfaceArea } = SolidGeometry.torus(2, 1);
    expect(volume).toBeCloseTo(4 * Math.PI ** 2, 6);
    expect(surfaceArea).toBeCloseTo(8 * Math.PI ** 2, 6);
  });
  test('throws when r >= R', () => {
    expect(() => SolidGeometry.torus(1, 2)).toThrow();
  });
});

describe('SolidGeometry - ellipsoid & tetrahedron', () => {
  test('ellipsoid(1,1,1) volume = sphere(1) volume', () => {
    const { volume } = SolidGeometry.ellipsoid(1, 1, 1);
    expect(volume).toBeCloseTo((4 / 3) * Math.PI, 8);
  });
  test('regularTetrahedron(1): surfaceArea = √3', () => {
    const { surfaceArea } = SolidGeometry.regularTetrahedron(1);
    expect(surfaceArea).toBeCloseTo(Math.sqrt(3), 8);
  });
  test('regularTetrahedron(1): volume = 1/(6√2)', () => {
    const { volume } = SolidGeometry.regularTetrahedron(1);
    expect(volume).toBeCloseTo(1 / (6 * Math.sqrt(2)), 8);
  });
});

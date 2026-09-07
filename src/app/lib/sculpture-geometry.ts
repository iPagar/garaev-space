import {
  ExtrudeGeometry,
  Group,
  Mesh,
  MeshPhysicalMaterial,
  Path,
  Shape,
  Vector3,
} from "three";

function roundedRectangle(
  path: Path,
  width: number,
  height: number,
  radius: number,
) {
  const x = width / 2 - radius;
  const y = height / 2 - radius;
  path.absarc(x, y, radius, 0, Math.PI / 2);
  path.absarc(-x, y, radius, Math.PI / 2, Math.PI);
  path.absarc(-x, -y, radius, Math.PI, (Math.PI * 3) / 2);
  path.absarc(x, -y, radius, (Math.PI * 3) / 2, Math.PI * 2);
  path.closePath();
}

export function createSculpture() {
  const outline = new Shape();
  roundedRectangle(outline, 3.4, 2.25, 0.55);

  const opening = new Path();
  roundedRectangle(opening, 2.72, 1.57, 0.21);
  outline.holes.push(opening);

  const geometry = new ExtrudeGeometry(outline, {
    depth: 0.3,
    steps: 1,
    curveSegments: 24,
    bevelEnabled: true,
    bevelSegments: 6,
    bevelSize: 0.065,
    bevelThickness: 0.065,
  });
  geometry.translate(0, 0, -0.15);

  const material = new MeshPhysicalMaterial({
    color: 0xc9cdd3,
    metalness: 1,
    roughness: 0.28,
    clearcoat: 0.15,
    clearcoatRoughness: 0.35,
  });

  const sculpture = new Group();
  sculpture.name = "Interlocking silver frames";
  const axis = new Vector3(1, 1, 1).normalize();

  // Cyclic axis permutation gives each frame its own perpendicular plane.
  // Their unequal width and height leave clearance at the crossings.
  for (let index = 0; index < 3; index += 1) {
    const frame = new Mesh(geometry, material);
    frame.name = `Frame ${index + 1}`;
    frame.setRotationFromAxisAngle(axis, (index * Math.PI * 2) / 3);
    frame.castShadow = true;
    frame.receiveShadow = true;
    sculpture.add(frame);
  }

  return sculpture;
}

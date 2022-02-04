import BlobFloating, { BlobFloatingProps } from "./BlobFloating";

type Vec3 = [number, number, number];

const randomVector: (r: number) => Vec3 = (r: number) => [
  r / 2 - Math.random() * r,
  r / 2 - Math.random() * r,
  r / 2 - Math.random() * r,
];

export const randomEuler: () => Vec3 = () => [
  Math.random() * Math.PI,
  Math.random() * Math.PI,
  Math.random() * Math.PI,
];

const blobData: BlobFloatingProps[] = Array.from({ length: 12 }, (r = 10) => ({
  meshProps: {
    position: randomVector(r as number),
    rotation: randomEuler(),
  },
  random: Math.random(),
  size: 0.8,
  speed: Math.random() * 0.5,
  color: Math.random() * 0.7,
  density: Math.random() * 1.5 + 0.5,
  strength: Math.random() * 0.15,
  offset: Math.random() * 2 * Math.PI,
}));

export default function Blobs() {
  return (
    <>
      {blobData.map((props, i) => (
        <BlobFloating key={i} {...props} />
      ))}
    </>
  );
}

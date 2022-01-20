import BlobFloating, { BlobFloatingProps } from "./BlobFloating";

const randomVector = (r) => [
  r / 2 - Math.random() * r,
  r / 2 - Math.random() * r,
  r / 2 - Math.random() * r,
];

export const randomEuler = () => [
  Math.random() * Math.PI,
  Math.random() * Math.PI,
  Math.random() * Math.PI,
];

const blobData: BlobFloatingProps[] = Array.from({ length: 12 }, (r = 10) => ({
  meshProps: {
    position: randomVector(r),
    rotation: randomEuler(),
  },
  random: Math.random(),
  size: 0.8,
  speed: Math.random() * 0.5,
  color: Math.random() * 0.6,
  density: Math.random() * 2,
  strength: Math.random() * 0.1,
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

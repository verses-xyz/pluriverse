import BlobFloating from "./BlobFloating";

const randomVector = (r) => [
  r / 2 - Math.random() * r,
  r / 2 - Math.random() * r,
  r / 2 - Math.random() * r,
];

const randomEuler = () => [
  Math.random() * Math.PI,
  Math.random() * Math.PI,
  Math.random() * Math.PI,
];

const blobData = Array.from({ length: 12 }, (r = 10) => ({
  random: Math.random(),
  position: randomVector(r),
  rotation: randomEuler(),
  size: 0.8,
  speed: Math.random() * 0.5,
  color: Math.random() * 0.5,
  density: Math.random() * 2,
  strength: Math.random() * 0.2,
  offset: Math.random() * 2 * Math.PI,
}));

export default function Blobs() {
  return (
    <>
      {blobData.map((props, i) => {
        return <BlobFloating key={i} {...props} />;
      })}
    </>
  );
}

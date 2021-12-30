import * as THREE from 'three';
import { useFrame } from '@react-three/fiber';
import { useRef } from 'react';
import Blob from './Blob';

export default function BlobFloating({
  random,
  size,
  speed,
  color,
  density,
  strength,
  offset,
  ...props
}) {
  const ref = useRef();

  useFrame((state) => {
    const t = state.clock.getElapsedTime() + random * 10000;

    ref.current.rotation.set(
      Math.cos(t / 4) / 2,
      Math.sin(t / 4) / 2,
      Math.cos(t / 1.5) / 2,
    );

    ref.current.position.y = Math.sin(t / 1.5) / 2;

    ref.current.scale.x = ref.current.scale.y = ref.current.scale.z = THREE.MathUtils.lerp(ref.current.scale.z, 1, 0.1);
  });

  return (
    <group ref={ref}>
      <Blob
        size={size}
        speed={speed}
        color={color}
        density={density}
        strength={strength}
        offset={offset}
        {...props}
      />
    </group>
  );
}

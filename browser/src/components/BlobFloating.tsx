import * as THREE from "three";
import { MeshProps, useFrame } from "@react-three/fiber";
import { useRef } from "react";
import Blob, { SizeChoice } from "./Blob";

export interface BlobFloatingProps {
  random: number;
  size: number;
  speed: number;
  color: number;
  density: number;
  strength: number;
  alpha?: number;
  offset: number;
  meshProps?: MeshProps;
}

export default function BlobFloating({
  random,
  size,
  speed,
  color,
  density,
  strength,
  alpha,
  offset,
  meshProps,
}: BlobFloatingProps) {
  const ref = useRef<THREE.Group>();

  // move blobs to the left
  // const gsap = useGsap();
  // useEffect(() => {
  //   gsap.fromTo(
  //     ref.current.position,
  //     {
  //       z: 0,
  //     },
  //     {
  //       z: 40,
  //       scrollTrigger: {
  //         trigger: "#essay-content",
  //         start: 0,
  //         end: " top top",
  //         scrub: true,
  //       },
  //     }
  //   );
  //   // eslint-disable-next-line react-hooks/exhaustive-deps
  // }, []);

  useFrame((state) => {
    const t = state.clock.getElapsedTime() + random * 10000;

    if (ref.current) {
      ref.current.rotation.set(
        Math.cos(t / 4) / 2,
        Math.sin(t / 4) / 2,
        Math.cos(t / 1.5) / 2
      );

      ref.current.position.y = Math.sin(t / 1.5) / 2;

      ref.current.scale.x =
        ref.current.scale.y =
        ref.current.scale.z =
          THREE.MathUtils.lerp(ref.current.scale.z, 1, 0.1);
    }
  });

  return (
    <group ref={ref}>
      <Blob
        sizeType={SizeChoice.Small}
        speed={speed}
        color={color}
        density={density}
        strength={strength}
        offset={offset}
        alpha={alpha}
        meshProps={meshProps}
      />
    </group>
  );
}

import { OrbitControls, Stars } from "@react-three/drei";
import { useThree } from "@react-three/fiber";
import {
  Bloom,
  DepthOfField,
  EffectComposer,
  Noise,
  Vignette,
  BrightnessContrast,
  HueSaturation,
} from "@react-three/postprocessing";
import { useEffect, useRef } from "react";
import useGsap from "../hook/useGsap";
import Blobs from "./Blobs";

export default function UniverseScene() {
  // const { camera } = useThree();
  // const gsap = useGsap();

  // useEffect(() => {
  //   gsap.fromTo(
  //     camera.position,
  //     {
  //       z: 20,
  //     },
  //     {
  //       z: -10,
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

  return (
    <>
      <OrbitControls autoRotate={true} autoRotateSpeed={1} enableZoom={false} />
      <fog attach="fog" args={["#dbdbdb", 16, 30]} />
      <ambientLight intensity={0.5} />
      <directionalLight intensity={0.3} position={[5, 25, 20]} />
      <pointLight color="indianred" />
      <pointLight position={[10, 10, -10]} color="orange" />
      <pointLight position={[-10, -10, 10]} color="lightblue" />
      <pointLight intensity={1} position={[-10, -25, -10]} />
      <spotLight
        castShadow
        intensity={2.25}
        angle={0.2}
        penumbra={1}
        position={[-25, 20, -15]}
        shadow-mapSize={[1024, 1024]}
        shadow-bias={-0.0001}
      />
      <Stars radius={500} depth={50} count={1500} factor={15} />
      <EffectComposer>
        <DepthOfField
          focusDistance={0}
          focalLength={0.5}
          bokehScale={0.4}
          height={480}
        />
        {/* <Bloom
          luminanceThreshold={0}
          luminanceSmoothing={9}
          height={300}
          opacity={3}
        /> */}
        <Noise opacity={0.025} />
        <Vignette eskil={false} offset={0.1} darkness={1.1} />
        {/* <BrightnessContrast brightness={0.2} contrast={0.4} /> */}
        <HueSaturation hue={0.6} saturation={0.3} />
      </EffectComposer>
      <Blobs />
    </>
  );
}

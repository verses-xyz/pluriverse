import { OrbitControls, Stars } from "@react-three/drei";
import {
  Bloom,
  DepthOfField,
  EffectComposer,
  Noise,
  Vignette,
  HueSaturation,
} from "@react-three/postprocessing";
import { BlurPass, Resizer } from 'postprocessing'
import Blobs from "./Blobs";
import { useEffect } from "react";
import { useThree } from "@react-three/fiber";
import useGsap from "../hook/useGsap";

export default function UniverseScene() {
  const { camera } = useThree();
  const gsap = useGsap();

  useEffect(() => {
    gsap.fromTo(
      camera.position,
      {
        z: 20,
      },
      {
        z: 5,
        scrollTrigger: {
          trigger: "#essay-content",
          start: 0,
          end: " top top",
          scrub: true,
        },
      }
    );
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <>
      <OrbitControls
        autoRotate={true}
        autoRotateSpeed={0.3}
        enableZoom={false}
      />
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

      <EffectComposer>
        <Vignette eskil={false} offset={0.1} darkness={1.1} />
        {/*<BrightnessContrast brightness={0.2} contrast={0.4} />*/}
        <HueSaturation hue={0.6} saturation={0.3} />
        <Bloom
          intensity={0.2} // The bloom intensity.
          blurPass={BlurPass} // A blur pass.
          width={Resizer.AUTO_SIZE} // render width
          height={Resizer.AUTO_SIZE} // render height
          kernelSize={5} // blur kernel size
          luminanceThreshold={0.2} // luminance threshold. Raise this value to mask out darker elements in the scene.
          luminanceSmoothing={0.1} // smoothness of the luminance threshold. Range is [0, 1]
        />
        <DepthOfField
          focusDistance={0}
          focalLength={0}
          bokehScale={0.25}
          width={Resizer.AUTO_SIZE} // render width
          height={Resizer.AUTO_SIZE} // render height
        />
        <Noise opacity={0.005} />
      </EffectComposer>
      <Blobs />
      <Stars radius={100} depth={50} count={1500} factor={4} />
    </>
  );
}

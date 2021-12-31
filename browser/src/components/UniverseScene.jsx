import { OrbitControls, Stars } from "@react-three/drei";
import { useFrame } from "@react-three/fiber";
import useScroll from "../hooks/useScroll";
import Blobs from "./Blobs";
import * as THREE from "three";

function lerp(x, y, a) {
  return (1 - a) * x + a * y;
}

function scalePercent(start, end, scrollPercent) {
  return (scrollPercent - start) / (end - start);
}

export default function UniverseScene() {
  const { scrollPercentage } = useScroll();
  console.log("scrollPercentage->", scrollPercentage);
  useFrame(({ camera }) => {
    // console.log(scalePercent(10, 20, scrollPercentage));
    const scaledPercentage = scalePercent(0, 20, scrollPercentage);
    console.log({ scaledPercentage });
    const newCameraPosition = lerp(20, 40, scaledPercentage);
    console.log(newCameraPosition);
    if (newCameraPosition) {
      camera.position.z = newCameraPosition;
    }
  });
  return (
    <>
      <OrbitControls
        autoRotate={false}
        autoRotateSpeed={1}
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
      <Stars radius={500} depth={50} count={1500} factor={15} />
      <Blobs />
    </>
  );
}

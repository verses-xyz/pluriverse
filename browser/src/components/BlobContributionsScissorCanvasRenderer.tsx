import {
  ScissorCanvas, // <- R3F Canvas wrapper
  ScissorScene, // <- The <scene> to be rendered witin a given virtual canvas
  useScissorFrame, // <- Like useFrame, provides access to the Scissoring render loop
  useScissorInit, // <- Window into the first run of useScissorFrame. Used to initialize whatever you want
} from "src/components/react-three-scissor";
import { Contribution } from "src/types/common/server-api";
import { BlobSingle } from "./BlobSingle";
import { Suspense, useRef } from "react";
import * as THREE from "three";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls";

export default function BlobContributionsScissorCanvasRenderer({
  contributions,
}: {
  contributions: Contribution[];
}) {
  if (!contributions || contributions.length === 0) {
    return null;
  }

  const contributionIdsAsStrings = contributions.map((c) => `${c.id}`);

  const orbit = useRef<OrbitControls>();
  useScissorFrame(() => {
    if (orbit.current) {
      orbit.current.update();
    }
  }, contributionIdsAsStrings);

  useScissorInit(({ camera: genericCamera, element, scene }) => {
    const camera = genericCamera as THREE.PerspectiveCamera;

    camera.position.set(2, 2, 2);
    camera.lookAt(0, 0, 0);
    orbit.current = new OrbitControls(camera, element);
    orbit.current.enableZoom = false;
    orbit.current.autoRotate = true;

    const bBox = new THREE.Box3().setFromObject(scene);
    const size = new THREE.Vector3();
    bBox.getSize(size);
    const height = size.y;
    const dist = height / (2 * Math.tan((camera.fov * Math.PI) / 360));
    const pos = scene.position;

    const fac = 0.85;
    camera.position.setScalar(dist).multiplyScalar(fac);
    camera.lookAt(pos);
  }, contributionIdsAsStrings);

  return (
    <ScissorCanvas
      gl={{
        antialias: true,
      }}
      shadows
      style={{
        position: "fixed",
        left: "0",
        top: "0",
        width: "100%",
        height: "100%",
        display: "block",
        zIndex: -1,
      }}
    >
      {contributions.map(({ id, pattern, prompt, response, author }) => {
        return (
          <ScissorScene uuid={`${id}`} key={id}>
            <BlobSingle
              pattern={pattern}
              prompt={prompt}
              walletId={author.walletId}
              response={response}
            />
          </ScissorScene>
        );
      })}
    </ScissorCanvas>
  );
}

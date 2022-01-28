import { Canvas, Props, useFrame, useThree } from "@react-three/fiber";
import React, { forwardRef, useEffect } from "react";
import store from "./store";

import { iScissorWindow, tScissorCallback } from "./ScissorTypes";

function ScissorRenderer() {
  const windows = store((s) => s.windows) as { [key: string]: iScissorWindow };
  const frameSubscribers = store((s) => s.frameSubscribers) as {
    [key: string]: tScissorCallback;
  };
  const initSubscribers = store((s) => s.initSubscribers) as {
    [key: string]: tScissorCallback;
  };
  const sethasInit = store((s) => s.sethasInit);

  const { gl } = useThree();

  // console.log({ windows });
  const drawWindows = () => {
    gl.setScissorTest(false);
    gl.clear(true, true);
    gl.setScissorTest(true);

    for (const key in windows) {
      const { scene, element, camera, hasInit } = windows[key];

      if (scene && camera) {
        if (!hasInit) {
          if (initSubscribers[key])
            initSubscribers[key]({
              scene,
              camera,
              element,
            });
          scene.add(camera);
          sethasInit(true, key);
        }

        const rect = element.getBoundingClientRect();
        const { left, right, top, bottom, width, height } = rect;

        const isOffscreen =
          bottom < 0 ||
          top > gl.domElement.clientHeight ||
          right < 0 ||
          left > gl.domElement.clientWidth;

        if (!isOffscreen) {
          const positiveYUpBottom = gl.domElement.clientHeight - bottom;
          gl.setScissor(left, positiveYUpBottom, width, height);
          gl.setViewport(left, positiveYUpBottom, width, height);

          // @ts-ignore
          camera.aspect = rect.width / rect.height;
          // @ts-ignore
          camera.updateProjectionMatrix();

          if (frameSubscribers[key])
            frameSubscribers[key]({
              scene,
              camera,
              element,
            });

          gl.render(scene, camera);
        }
      }
    }
  };

  useFrame(() => {
    drawWindows();
  }, 1);

  return <></>;
}

const ScissorCanvas = forwardRef<
  HTMLCanvasElement,
  React.PropsWithChildren<Props>
>((props, ref) => {
  const windows = store((s) => s.windows) as { [key: string]: iScissorWindow };
  const canFindWindows = Object.keys(windows).length > 0;

  return canFindWindows ? (
    <Canvas
      ref={ref}
      style={{
        position: "fixed",
        left: "0",
        top: "0",
        width: "100%",
        height: "100%",
        display: "block",
        zIndex: -1,
      }}
      {...props}
    >
      <ScissorRenderer />
      {props.children}
    </Canvas>
  ) : null;
});

export default ScissorCanvas;

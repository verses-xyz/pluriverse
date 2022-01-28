import { Canvas, Props, useFrame, useThree } from "@react-three/fiber";
import React, { forwardRef, useEffect } from "react";
import store from "./store";

import { iScissorWindow, tScissorCallback } from "./ScissorTypes";

// https://stackoverflow.com/questions/704758/how-do-i-check-if-an-element-is-really-visible-with-javascript
function visible(element) {
  if (element.offsetWidth === 0 || element.offsetHeight === 0) return false;
  var height = document.documentElement.clientHeight,
    rects = element.getClientRects(),
    on_top = function (r) {
      var x = (r.left + r.right) / 2,
        y = (r.top + r.bottom) / 2;
      return document.elementFromPoint(x, y) === element;
    };
  for (var i = 0, l = rects.length; i < l; i++) {
    var r = rects[i],
      in_viewport =
        r.top > 0 ? r.top <= height : r.bottom > 0 && r.bottom <= height;
    if (in_viewport && on_top(r)) return true;
  }
  return false;
}

function ScissorRenderer() {
  const windows = store((s) => s.windows) as { [key: string]: iScissorWindow };
  const frameSubscribers = store((s) => s.frameSubscribers) as {
    [key: string]: tScissorCallback;
  };
  const initSubscribers = store((s) => s.initSubscribers) as {
    [key: string]: tScissorCallback;
  };
  const sethasInit = store((s) => s.sethasInit);
  console.log(windows);

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
        // IntersectionObserver.observe(element);

        const isVisible = visible(element);

        const isOffscreen =
          bottom < 0 ||
          top > gl.domElement.clientHeight ||
          right < 0 ||
          left > gl.domElement.clientWidth;

        if (!isOffscreen && isVisible) {
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

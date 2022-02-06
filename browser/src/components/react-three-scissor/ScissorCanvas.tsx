import { Canvas, Props, useFrame, useThree } from "@react-three/fiber";
import React, { forwardRef, Suspense } from "react";
import store from "./store";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls";
import { iScissorWindow, tScissorCallback } from "./ScissorTypes";
import { CarouselGradientClassName } from "src/classNameConstants";
import { LoadingIndicator } from "../core/LoadingIndicator";

// https://stackoverflow.com/questions/704758/how-do-i-check-if-an-element-is-really-visible-with-javascript
const ElementClassNamesToIgnore = [CarouselGradientClassName];
function visible(element: HTMLElement) {
  if (element.offsetWidth === 0 || element.offsetHeight === 0) return false;
  const height = document.documentElement.clientHeight;
  const rects = element.getClientRects();
  const on_top = function (r) {
    const x = (r.left + r.right) / 2;
    const y = (r.top + r.bottom) / 2;
    return (
      document
        .elementsFromPoint(x, y)
        .filter(
          (e) =>
            !ElementClassNamesToIgnore.some((className) =>
              e.className.includes(className)
            )
        )[0] === element
    );
  };
  for (let i = 0, l = rects.length; i < l; i++) {
    const r = rects[i];
    const in_viewport =
      r.top > 0 ? r.top <= height : r.bottom > 0 && r.bottom <= height;
    if (in_viewport && on_top(r)) return true;
  }
  return false;
}

function ScissorRenderer() {
  const windows = store((s) => s.windows) as {
    [key: string]: { [uuid: string]: iScissorWindow };
  };
  const frameSubscribers = store((s) => s.frameSubscribers) as {
    [key: string]: tScissorCallback;
  };
  const initSubscribers = store((s) => s.initSubscribers) as {
    [key: string]: tScissorCallback;
  };
  const sethasInit = store((s) => s.sethasInit);

  const { gl } = useThree();
  gl.autoClear = false;

  const drawWindows = () => {
    gl.setScissorTest(false);
    gl.clear(true, true);
    gl.setScissorTest(true);
    // NOTE: if no windows are on screen, need to make it clear so that it doesn't render a black screen and cover everything.
    if (!windows.length) {
      gl.setClearAlpha(0);
    }

    for (const key in windows) {
      for (const uuid in windows[key]) {
        const { scene, element, camera, hasInit, controls } =
          windows[key][uuid];

        if (scene && camera) {
          if (!hasInit) {
            if (initSubscribers[key])
              initSubscribers[key]({
                scene,
                camera,
                element,
                controls,
              });
            scene.add(camera);
            controls?.update();
            sethasInit(true, key, uuid);
          }

          const rect = element.getBoundingClientRect();
          const { left, right, top, bottom, width, height } = rect;

          const isVisible = visible(element);

          const isOffscreen =
            bottom < 0 ||
            top > gl.domElement.clientHeight ||
            right < 0 ||
            left > gl.domElement.clientWidth;

          if (!isOffscreen && isVisible) {
            const positiveYUpBottom = gl.domElement.clientHeight - bottom;
            gl.setViewport(left, positiveYUpBottom, width, height);
            gl.setScissor(left, positiveYUpBottom, width, height);

            // @ts-ignore
            camera.aspect = rect.width / rect.height;
            // @ts-ignore
            camera.updateProjectionMatrix();

            if (frameSubscribers[key]) {
              frameSubscribers[key]({
                scene,
                camera,
                element,
                controls,
              });
            }
            controls?.update();
            gl.render(scene, camera);
          }
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
  // ref?.addEventListener(
  //   "webglcontextlost",
  //   function (event) {
  //     event.preventDefault();
  //   },
  //   false
  // );
  return (
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
  );
});

export default ScissorCanvas;

import create from "zustand";
import produce from "immer";
import * as THREE from "three";
import { iScissorWindow, tScissorCallback } from "./ScissorTypes";
import {OrbitControls} from "three/examples/jsm/controls/OrbitControls";

interface iScissorRootState {
  windows: {
    [key: string]: { [uuid: string]: iScissorWindow };
  };
  scenes: {
    [key: string]: {
      scene: THREE.Scene;
      camera?: THREE.Camera | undefined;
    };
  };
  frameSubscribers: {
    [key: string]: tScissorCallback;
  };
  initSubscribers: {
    [key: string]: tScissorCallback;
  };
  addWindow: (window: HTMLElement, id: string) => string;
  removeWindow: (id: string, uuid: string) => any;
  addScene: (
    scene: THREE.Scene,
    id: string,
    camera?: THREE.Camera | undefined
  ) => any;
  removeScene: (id: string) => any;
  sethasInit: (hasInit: boolean, id: string, uuid: string) => any;
  getIds: () => string[];
  addSubscriber: (cb: tScissorCallback, uuid: string[]) => any;
  removeSubscriber: (uuid: string[]) => any;
  addInitSubscriber: (cb: tScissorCallback, uuid: string[]) => any;
  removeInitSubscriber: (uuid: string[]) => any;
}

export default create<iScissorRootState>((set: any, get: any) => ({
  windows: {},
  scenes: {},
  // TODO: this should get both ID (of the corresponding scene and item) BUT return a UUID corresponding to the new window
  // Then it should return both, and you need both to delete a window.
  addWindow: (window: HTMLElement, id: string) => {
    const uuid = THREE.MathUtils.generateUUID();
    set(
      produce((state: iScissorRootState) => {
        const maybeScene = state.scenes[id];
        const rect = window.getBoundingClientRect();
        // TODO: idk where this camera is coming from so its always initializing a camera
        const camera = new THREE.PerspectiveCamera(
          75,
          rect.width / rect.height,
          0.1,
          1000
        );
        const controls = new OrbitControls(camera, window);
        controls.autoRotate = true;
        controls.enableZoom = false;
        controls.autoRotateSpeed = 4;
        if (!state.windows[id]) {
          state.windows[id] = {};
        }
        state.windows[id][uuid] = {
          element: window,
          scene: maybeScene?.scene,
          controls,
          camera: camera,
        };
      })
    );

    return uuid;
  },
  removeWindow: (id: string, uuid: string) =>
    set(
      produce((state: iScissorRootState) => {
        delete state.windows[id][uuid];
      })
    ),

  addScene: (scene: THREE.Scene, id: string, camera?: THREE.Camera) => {
    return set(
      produce((state: iScissorRootState) => {
        state.scenes[id] = {
          scene,
          camera,
        };
        if (state.windows[id]) {
          for (const uuid of Object.keys(state.windows[id])) {
            const elem = state.windows[id][uuid].element;
            const rect = elem.getBoundingClientRect();
            const newCamera =
              camera ??
              new THREE.PerspectiveCamera(
                75,
                rect.width / rect.height,
                0.1,
                1000
              );
            const controls = new OrbitControls(newCamera, elem);
            controls.autoRotate = true;
            controls.enableZoom = false;
            controls.autoRotateSpeed = 4;
            state.windows[id][uuid].scene = scene;
            state.windows[id][uuid].camera = newCamera;
            state.windows[id][uuid].controls = controls;
            state.windows[id][uuid].hasInit = false;
          }
        }
      })
    );
  },

  removeScene: (id: string) => {
    get().removeWindow(id);
    set(
      produce((state: iScissorRootState) => {
        delete state.scenes[id];
      })
    );
  },

  sethasInit: (hasInit: boolean, id: string, uuid: string) =>
    set(
      produce((state: iScissorRootState) => {
        state.windows[id][uuid].hasInit = hasInit;
      })
    ),

  getIds: () => Object.keys((get() as iScissorRootState).windows),

  frameSubscribers: {},
  addSubscriber: (cb: tScissorCallback, uuid: string[]) =>
    set(
      produce((state: iScissorRootState) => {
        if (uuid.length > 0) {
          uuid.forEach((id) => (state.frameSubscribers[id] = cb));
        } else {
          Object.keys(state.windows).forEach(
            (k) => (state.frameSubscribers[k] = cb)
          );
        }
      })
    ),
  removeSubscriber: (uuid: string[]) =>
    set(
      produce((state: iScissorRootState) => {
        if (uuid.length > 0) {
          uuid.forEach((id) => delete state.frameSubscribers[id]);
        } else {
          state.frameSubscribers = {};
        }
      })
    ),

  initSubscribers: {},
  addInitSubscriber: (cb: tScissorCallback, uuid: string[]) =>
    set(
      produce((state: iScissorRootState) => {
        if (uuid.length > 0) {
          uuid.forEach((id) => (state.initSubscribers[id] = cb));
        } else {
          Object.keys(state.windows).forEach(
            (k) => (state.initSubscribers[k] = cb)
          );
        }
      })
    ),
  removeInitSubscriber: (uuid: string[]) =>
    set(
      produce((state: iScissorRootState) => {
        if (uuid.length > 0) {
          uuid.forEach((id) => delete state.initSubscribers[id]);
        } else {
          state.initSubscribers = {};
        }
      })
    ),
}));

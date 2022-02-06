import {OrbitControls} from "three/examples/jsm/controls/OrbitControls";

export interface iScissorWindow {
  scene?: THREE.Scene;
  camera?: THREE.Camera;
  element: HTMLElement;
  controls?: OrbitControls;
  hasInit?: boolean;
}

export type tScissorCallback = (state: Partial<iScissorWindow>) => void;

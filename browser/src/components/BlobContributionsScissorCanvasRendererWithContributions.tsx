import { useContext } from "react";
import { ContributionsContext } from "src/pages/Main";
import BlobContributionsScissorCanvasRenderer from "./BlobContributionsScissorCanvasRenderer";

export default function BlobContributionsScissorCanvasRendererWithContributions() {
  const { contributions } = useContext(ContributionsContext);

  return (
    <BlobContributionsScissorCanvasRenderer contributions={contributions} />
  );
}

// interface BlobContext {
//   addWindow: (window: HTMLElement, id?: string | undefined) => string;
//   removeWindow: (id: string) => any;
//   addScene: (
//     scene: THREE.Scene,
//     id: string,
//     camera?: THREE.Camera | undefined
//   ) => any;
//   removeScene: (id: string) => any;
// }

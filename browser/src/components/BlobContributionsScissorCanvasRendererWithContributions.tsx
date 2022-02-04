import { useContext } from "react";
import { ContributionsContext } from "src/helpers/contexts/ContributionsContext";
import BlobContributionsScissorCanvasRenderer from "./BlobContributionsScissorCanvasRenderer";

export default function BlobContributionsScissorCanvasRendererWithContributions() {
  const { contributions } = useContext(ContributionsContext);

  if (contributions && contributions.length > 0) {
    return (
      <BlobContributionsScissorCanvasRenderer contributions={contributions} />
    );
  } else {
    return <></>;
  }
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

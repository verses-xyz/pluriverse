import { useContext } from "react";
import { ContributionsContext } from "src/pages/Main";
import BlobContributionsScissorCanvasRenderer from "./BlobContributionsScissorCanvasRenderer";

export default function BlobContributionsScissorCanvasRendererWithContributions() {
  const { contributions } = useContext(ContributionsContext);

  return (
    <BlobContributionsScissorCanvasRenderer contributions={contributions} />
  );
}

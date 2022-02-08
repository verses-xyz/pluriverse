import {
  ScissorWindow, // <- The <div> to use as a "virtual canvas"
} from "src/components/react-three-scissor";

export default function BlobSingleScissorWindow({ id }: { id: number }) {
  return (
    <ScissorWindow
      style={{ width: "100%", height: "156px", cursor: "pointer" }}
      id={`${id}`}
    />
  );
}

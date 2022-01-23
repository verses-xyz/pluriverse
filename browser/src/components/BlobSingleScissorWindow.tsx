import {
  ScissorWindow, // <- The <div> to use as a "virtual canvas"
} from "react-three-scissor";

export default function BlobSingleScissorWindow({ id }: { id: number }) {
  console.log({ id });
  return (
    <ScissorWindow style={{ width: "100%", height: 150 }} uuid={`${id}`} />
  );
}

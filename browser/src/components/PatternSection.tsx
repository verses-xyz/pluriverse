import useToggle from "src/hook/useToggle";
import { Contribution } from "src/types/common/server-api";
import { AiOutlinePlus } from "react-icons/ai";

export default function PatternSection({
  title,
  body,
  contributions,
}: {
  title: string;
  body: string;
  contributions: Contribution[];
}) {
  const [expanded, toggle] = useToggle();

  return (
    <div
      style={{
        paddingTop: 16,
        paddingBottom: 16,
        borderTop: "1px solid #ccc",
      }}
    >
      <div
        onClick={toggle}
        style={{
          display: "flex",
          justifyContent: "space-between",
          cursor: "pointer",
        }}
      >
        <h3 className="font-bold font-mono text-xl">{title}</h3>
        <div
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            paddingRight: 10,
          }}
        >
          <AiOutlinePlus />
        </div>
      </div>
      {expanded && <p className="fadeInDownFast pb-8">{body}</p>}
    </div>
  );
}

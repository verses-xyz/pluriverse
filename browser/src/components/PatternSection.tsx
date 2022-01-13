import useToggle from "src/hook/useToggle";
import { Contribution } from "src/types/common/server-api";
import { AiOutlinePlus, AiOutlineMinus } from "react-icons/ai";
import ContributionsCarousel from "./ContributionsCarousel";
import "./PatternSection.css";

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
        paddingTop: 28,
        paddingBottom: 32,
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
        <h3 className="font-bold font-mono text-3xl">{title}</h3>
        <div
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            paddingRight: 10,
          }}
        >
          {expanded ? <AiOutlineMinus /> : <AiOutlinePlus />}
        </div>
      </div>
      {expanded && (
        <div>
          <div className="grid md:grid-cols-2 gap-16 pt-8 pb-8 fadeInDownFast">
            <div>
              <h4 className="font-title text-xl font-mono font-bold">
                The problem
              </h4>
              <p>{body}</p>
            </div>
            <div>
              <h4 className="font-title text-xl font-mono font-bold">
                The solution
              </h4>
              <p>
                The many worlds of the pluriverse must be connected. Meaningful
                interoperability will be both technical and institutional; the
                data moats of today will give way to the portable social graphs
                and cooperative data structures of tomorrow. The many worlds of
                the pluriverse must be connected. Meaningful interoperability
                will be both technical and institutional; the data moats of
                today will give way to the portable social graphs and
                cooperative data structures of tomorrow. The many worlds of the
                pluriverse must be connected. Meaningful interoperability will
                be both technical and institutional; the data moats of today
                will give way to the portable social graphs and cooperative data
                structures of tomorrow.
              </p>
            </div>
          </div>
          <div className="py-8">
            <ContributionsCarousel contributions={contributions} />
          </div>
        </div>
      )}
    </div>
  );
}

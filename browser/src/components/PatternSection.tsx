import useToggle from "src/hook/useToggle";
import { Contribution, Pattern } from "src/types/common/server-api";
import { AiOutlinePlus, AiOutlineMinus } from "react-icons/ai";
import ContributionsCarousel from "./ContributionsCarousel";
import "./PatternSection.css";

export default function PatternSection({
  title,
  problem,
  solution,
  contributions,
  pattern,
  defaultExpanded = false,
}: {
  title: string;
  problem?: string;
  solution?: string;
  pattern: Pattern;
  contributions: Contribution[];
  defaultExpanded?: boolean;
}) {
  const [expanded, toggle] = useToggle(defaultExpanded);

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
        {/* TODO: click to get link to this page */}
        {/* TODO: add onto contribution card to get back here */}
        <h3 id={pattern} className="font-bold font-mono text-xl md:text-3xl">
          {title}
        </h3>
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
          <div className="grid md:grid-cols-2 gap-16 my-8 fadeInDownFast">
            {problem && (
              <div>
                <h4 className="font-title text-xl font-mono font-bold">
                  The problem
                </h4>
                <p>{problem}</p>
              </div>
            )}
            {solution && (
              <div>
                <h4 className="font-title text-xl font-mono font-bold">
                  The solution
                </h4>
                <p>{solution}</p>
              </div>
            )}
          </div>
          {contributions && contributions.length > 0 && (
            <div className="my-8">
              <ContributionsCarousel contributions={contributions} />
            </div>
          )}
        </div>
      )}
    </div>
  );
}

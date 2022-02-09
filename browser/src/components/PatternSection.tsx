import useToggle from "src/hook/useToggle";
import { Contribution, Pattern } from "src/types/common/server-api";
import { AiOutlinePlus, AiOutlineMinus } from "react-icons/ai";
import ContributionsCarousel from "./ContributionsCarousel";
import "./PatternSection.css";

export default function PatternSection({
  index,
  title,
  problem,
  solution,
  contributions,
  pattern,
  defaultExpanded = false,
}: {
  index: number;
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
      className="py-8"
      style={{
        borderTop: "1px solid var(--outline-default)",
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
        <h3 id={pattern} className="font-semibold text-2xl md:text-3xl">
          <span
            className="mr-2 font-mono text-xl md:text-2xl opacity-75"
            style={{ fontWeight: 400 }}
          >
            {`0${index}.`}
          </span>
          <span>{title}</span>
        </h3>
        {/* Read more / less button */}
        <div className="flex flex-row gap-2 items-center">
          <span
            className="hidden md:inline-block"
            style={{
              fontFamily: "var(--font-family-secondary)",
              fontSize: "var(--font-size-default)",
              whiteSpace: "nowrap",
            }}
          >
            {expanded ? "Hide" : "Show"}
          </span>
          {expanded ? <AiOutlineMinus /> : <AiOutlinePlus />}
        </div>
      </div>
      {expanded && (
        <div>
          <div className="grid md:grid-cols-2 gap-16 my-8 fadeInDownFast">
            {problem && (
              <div>
                <h4 className="font-title text-xl font-semibold">Challenge</h4>
                <p>{problem}</p>
              </div>
            )}
            {solution && (
              <div>
                <h4 className="font-title text-xl font-semibold">
                  Possibility
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

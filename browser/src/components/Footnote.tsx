import useToggle from "src/hook/useToggle";

export default function Footnote({
  children,
  data,
  left,
  topOffset,
}: {
  children: any;
  data: any;
  left?: boolean;
  topOffset?: number;
}) {
  const [expanded, toggle] = useToggle();

  return (
    <span className="footnote" onClick={toggle}>
      {children}
      <div
        className={`footnote-content ${
          left ? "footnote-content-left" : "footnote-content-right"
        }`}
        style={{ marginTop: topOffset }}
      >
        {data}
      </div>
      {expanded && <div className={`footnote-content-mobile`}>{data}</div>}
    </span>
  );
}

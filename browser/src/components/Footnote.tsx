export default function Footnote({
  children,
  data,
  left,
  topOffset,
}: {
  children: any;
  data: string;
  left?: boolean;
  topOffset?: number;
}) {
  return (
    <span className="footnote">
      {children}
      <div
        className={`footnote-content ${
          left ? "footnote-content-left" : "footnote-content-right"
        }`}
        style={{ marginTop: topOffset }}
      >
        {data}
      </div>
    </span>
  );
}

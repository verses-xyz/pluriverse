export default function Footnote({ children, data }) {
  return (
    <span className="footnote">
      {children}
      <div className="footnote-content">{data}</div>
    </span>
  );
}

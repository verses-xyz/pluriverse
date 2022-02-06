import * as React from "react";
import useToggle from "src/hook/useToggle";

import useOnClickOutside from "src/hook/useOnClickOutside";

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
  const ref = React.useRef(null);

  useOnClickOutside(ref, () => {
    if (expanded) {
      toggle();
    }
  });

  return (
    <span
      ref={ref}
      className={`footnote ${expanded ? "expanded" : ""}`}
      onClick={toggle}
    >
      <span className="footnote-text">{children}</span>
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

import * as React from "react";
import useToggle from "src/hook/useToggle";
import useOnClickOutside from "src/hook/useOnClickOutside";
import { IoMdClose } from "react-icons/io";

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
      // only toggle if it's not mobile
      onClick={!expanded && toggle}
      ref={ref}
      className={`footnote ${expanded ? "expanded" : ""}`}
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
      {expanded && (
        <div className={`footnote-content-mobile`}>
          <button
            className="absolute"
            style={{ top: "var(--space-12)", right: "var(--space-12)" }}
            onClick={toggle}
          >
            <IoMdClose color="var(--foreground-default)" />
          </button>
          {data}
        </div>
      )}
    </span>
  );
}

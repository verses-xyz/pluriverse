import { InputHTMLAttributes } from "react";
import "./AutoGrowInput.css";

interface Props {
  value?: string;
  onChange: (value: string) => void;
  className?: string;
  extraProps?: InputHTMLAttributes<HTMLTextAreaElement>;
}

export function AutoGrowInput({
  value,
  onChange,
  extraProps,
  className,
}: Props) {
  return (
    // <div
    //   className={`auto-grow-input ${className ? className : ""}`}
    //   style={{
    //     display: "inline-grid",
    //     alignItems: "center",
    //     justifyItems: "start",
    //     padding: 0,
    //     border: "1px solid #ccc",
    //     borderRadius: 4,
    //   }}
    // >
    //   <input
    //     value={value}
    //     onChange={(event) => onChange(event.target.value)}
    //     style={{
    //       gridArea: "1 / 1 / 2 / 2",
    //       width: "100%",
    //       padding: 8,
    //       wordWrap: "break-word",
    //     }}
    //     {...(extraProps || {})}
    //   />
    //   <span
    //     style={{
    //       gridArea: "1 / 1 / 2 / 2",
    //       visibility: "hidden",
    //     }}
    //   >
    //     {value}
    //   </span>
    <div className={`grow-wrap ${className ? className : ""}`}>
      {/* <div className={`grow-wrap`}> */}
      <textarea
        {...(extraProps || {})}
        className="form-textarea block w-full"
        style={{ minHeight: "150px" }}
        // placeholder="Enter your response to the prompt..."
        value={value}
        onChange={(event) => onChange(event.target.value)}
      />
    </div>

    // <span contentEditable="true" role="textbox" className="contenteditableSpan">
    //   {!value ? extraProps?.placeholder : ""}
    // </span>
  );
}

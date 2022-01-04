import { InputHTMLAttributes } from "react";
import "./AutoGrowInput.css";

interface Props {
  value?: string;
  onChange: (value: string) => void;
  className?: string;
  extraProps?: InputHTMLAttributes<HTMLInputElement>;
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
    <div className={`auto-grow-input ${className ? className : ""}`}>
      <textarea
        className="form-textarea mt-1 block w-full"
        style={{ width: "300px", height: "200px" }}
        placeholder="Enter your response to the prompt..."
        value={value}
        onChange={(event) => onChange(event.target.value)}
      ></textarea>
    </div>

    // <span contentEditable="true" role="textbox" className="contenteditableSpan">
    //   {!value ? extraProps?.placeholder : ""}
    // </span>
  );
}

import { InputHTMLAttributes } from "react";
import "./AutoGrowInput.css";
import { Editor } from "./Editor";

interface Props {
  value?: string;
  onChange: (value: string) => void;
  responseLength: number | undefined;
  setResponseLength: (value: number) => void;
  className?: string;
  extraProps?: InputHTMLAttributes<HTMLTextAreaElement>;
}

export function AutoGrowInput({
  value,
  onChange,
  responseLength,
  setResponseLength,
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
    <>
      <div className={`grow-wrap ${className ? className : ""}`}>
        <Editor
          value={value}
          onChange={onChange}
          responseLength={responseLength}
          setResponseLength={setResponseLength}
          placeholder={extraProps.placeholder ? extraProps.placeholder : null}
        />
      </div>
    </>
  );
}

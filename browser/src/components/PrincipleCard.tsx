import { Principle } from "../types";
import "./PrincipleCard.css";

export function PrincipleCard({ title, body }: Principle) {
  return (
    <div className="container columns-1 principle">
      <h3 className="text-xl font-bold title">{title}</h3>
      <p className="text-base description">{body}</p>
    </div>
  );
}

import { Principles } from "../types";
import { PrincipleCard } from "./PrincipleCard";

export function PrincipleCardList() {
  return (
    <div className="columns-1 md:columns-2">
      {Object.values(Principles).map((principle, index) => (
        <PrincipleCard key={index} {...principle} />
      ))}
    </div>
  );
}

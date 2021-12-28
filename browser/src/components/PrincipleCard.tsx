import "./PrincipleCard.css";

interface Principle {
  title: string;
  body: string;
}

export function PrincipleCard({ title, body }: Principle) {
  return (
    <div className="container columns-1 principle">
      <h2 className="text-3xl font-bold title">{title}</h2>
      <p className="text-base description">{body}</p>
    </div>
  );
}

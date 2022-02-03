import "./Hero.css";

export default function Hero() {
  return (
    <div>
      <div className="hero fadeInDown flex flex-col items-center justify-center">
        <h1 className="text-5xl md:text-8xl m-0">
          Towards a Digital Pluriverse
        </h1>
        <div className="text-2xl md:text-5xl py-8">
          “a world where many worlds may fit”
        </div>
        <span className="heroAttribution opacity-70 text-xl">
          – Zapatistas, Chiapas
        </span>
      </div>
    </div>
  );
}

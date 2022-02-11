import "./Hero.css";

export default function Hero() {
  return (
    <div>
      <div className="hero fadeInDown flex flex-col items-center justify-center">
        <div className="versesLogoContainer">
          <a href="https://verses.xyz">
            <img
              className="w-24 h-24 md:w-32 md:h-32 mb-2"
              src="/verses-logo.svg"
            />
          </a>
        </div>
        <h1 className="text-5xl text-center md:text-8xl m-0">
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

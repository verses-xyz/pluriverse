import "./Hero.css";

export default function Hero() {
  return (
    <div>
      <div className="hero fadeInDown flex flex-col items-center justify-center">
        <h1 className="text-5xl md:text-8xl pb-5 m-0">
          Towards a Digital Pluriverse
        </h1>
        <div className="text-2xl md:text-7xl pt-16 pb-8">
          “a world where many worlds may fit”
        </div>
      </div>
    </div>
  );
}

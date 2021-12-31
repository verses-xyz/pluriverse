import useScroll from "../hooks/useScroll";
import "./Hero.css";

export default function Hero() {
  return (
    <div className="hero">
      <h1 className="text-7xl pb-5 m-0">
        Pluriverse <span className="text-3xl">[noun]</span>
      </h1>
      <div className="text-3xl pb-8">plu·​ri·​verse | \ ˈplu̇rəˌvərs \</div>
      <div className="text-7xl pb-8">“a world where many worlds fit”</div>
      <div className="pt-4 text-2xl">– Zapatistas, Chiapas</div>
    </div>
  );
}

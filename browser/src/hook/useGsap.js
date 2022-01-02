import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

export default function useGsap() {
  gsap.registerPlugin(ScrollTrigger);
  return gsap;
}

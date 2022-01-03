import { useEffect } from "react";
import useGsap from "src/hook/useGsap";

export default function GradientManager({ essayContentRef }) {
  const gsap = useGsap();

  useEffect(() => {
    gsap.fromTo(
      ".gradient-1",
      {
        opacity: 1,
      },
      {
        opacity: 0,
        scrollTrigger: {
          trigger: essayContentRef.current,
          start: 0,
          end: " top top",
          scrub: true,
        },
      }
    );
  }, []);

  useEffect(() => {
    gsap.fromTo(
      ".gradient-2",
      {
        opacity: 0,
      },
      {
        opacity: 1,
        scrollTrigger: {
          trigger: essayContentRef.current,
          start: 0,
          end: " top top",
          scrub: true,
        },
      }
    );
  }, []);

  return (
    <div>
      <div className="gradient-1" />
      <div className="gradient-2" />
    </div>
  );
}

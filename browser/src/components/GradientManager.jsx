import { useEffect } from "react";
import useGsap from "src/hook/useGsap";

export default function GradientManager() {
  // const gsap = useGsap();

  // useEffect(() => {
  //   // fade out  gradient 1
  //   gsap.fromTo(
  //     ".gradient-1",
  //     {
  //       opacity: 1,
  //     },
  //     {
  //       opacity: 0,
  //       ease: "slow(0.7, 0.7, false)",
  //       scrollTrigger: {
  //         trigger: essayContentRef.current,
  //         start: 0,
  //         end: " top top",
  //         scrub: true,
  //       },
  //     }
  //   );
  // }, []);

  // fade in  gradient 2
  // useEffect(() => {
  //   gsap.fromTo(
  //     ".gradient-2",
  //     {
  //       opacity: 0,
  //     },
  //     {
  //       opacity: 1,
  //       scrollTrigger: {
  //         trigger: essayContentRef.current,
  //         start: 0,
  //         end: " top top",
  //         scrub: true,
  //       },
  //     }
  //   );
  // }, []);

  // // fade out gradient 2
  // useEffect(() => {
  //   gsap.fromTo(
  //     ".gradient-2",
  //     {
  //       opacity: 1,
  //     },
  //     {
  //       opacity: 0,
  //       scrollTrigger: {
  //         trigger: patternsContentRef.current,
  //         start: 0,
  //         end: " top top",
  //         scrub: true,
  //       },
  //     }
  //   );
  // }, []);

  // // fade in gradient 3
  // useEffect(() => {
  //   gsap.fromTo(
  //     ".gradient-3",
  //     {
  //       opacity: 0,
  //     },
  //     {
  //       opacity: 1,
  //       scrollTrigger: {
  //         trigger: patternsContentRef.current,
  //         start: 0,
  //         end: " top top",
  //         scrub: true,
  //       },
  //     }
  //   );
  // }, []);

  return (
    <div>
      <div className="gradient-1" />
      {/* <div className="gradient-2" /> */}
      {/* <div className="gradient-3" /> */}
    </div>
  );
}

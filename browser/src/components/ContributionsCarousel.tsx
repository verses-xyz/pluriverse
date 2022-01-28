import { Contribution } from "src/types/common/server-api";
import "./ContributionsCarousel.css";
import { MdKeyboardArrowLeft, MdKeyboardArrowRight } from "react-icons/md";
import { useRef } from "react";
import { useInView } from "react-intersection-observer";
import { ContributionCard } from "./ContributionCard";
import { CarouselGradientClassName } from "src/classNameConstants";

function CarouselArrow({
  left = false,
  onPress,
}: {
  left?: boolean;
  onPress: () => void;
}) {
  return (
    <button onClick={onPress} className="carouselArrowButton">
      {left ? <MdKeyboardArrowLeft /> : <MdKeyboardArrowRight />}
    </button>
  );
}

export default function ContributionsCarousel({
  contributions,
}: {
  contributions: Contribution[];
}) {
  const overflowContainerRef = useRef<HTMLDivElement | null>(null);

  // scroll by half the width of the container
  // TODO: fix this
  // const amountToScrollBy = overflowContainerRef?.current?.offsetWidth * 0.5;
  const amountToScrollBy = 600; // TODO: don't hardcode

  const onLeftPress = () => {
    // console.log({ overflowContainerRef });
    overflowContainerRef?.current?.scrollBy({
      left: -amountToScrollBy,
      behavior: "smooth",
    });
  };

  const onRightPress = () => {
    // console.log({ overflowContainerRef });
    overflowContainerRef?.current?.scrollBy({
      left: amountToScrollBy,
      behavior: "smooth",
    });
  };

  const [leftInvisiblePixelRef, hideLeftControl] = useInView({
    root: overflowContainerRef.current,
    rootMargin: "15px",
  });

  const [rightInvisiblePixelRef, hideRightControl] = useInView({
    root: overflowContainerRef.current,
    rootMargin: "15px",
  });

  return (
    <div style={{ position: "relative" }}>
      {!hideLeftControl && (
        <>
          <div className={`${CarouselGradientClassName} left`} />
          <div
            style={{ position: "absolute", top: "40%", left: -30, zIndex: 10 }}
          >
            <CarouselArrow left onPress={onLeftPress} />
          </div>
        </>
      )}
      <div
        className="flex flex-row carouselOverflowContainer"
        ref={overflowContainerRef}
      >
        <div style={{ display: "flex" }}>
          <div ref={leftInvisiblePixelRef} />
          {contributions.map((contribution) => (
            <div className="pr-4" style={{ scrollSnapAlign: "start" }}>
              <ContributionCard
                key={contribution.id}
                contribution={contribution}
                hideHeader
                isCompact
              />
            </div>
          ))}
          <div ref={rightInvisiblePixelRef} />
        </div>
      </div>
      {!hideRightControl && (
        <>
          <div
            style={{ position: "absolute", top: "40%", right: -30, zIndex: 11 }}
          >
            <CarouselArrow onPress={onRightPress} />
          </div>
          <div className={`${CarouselGradientClassName} right`} />
        </>
      )}
    </div>
  );
}

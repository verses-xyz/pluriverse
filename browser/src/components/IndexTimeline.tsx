import { useState } from "react";

// sorry i got lazy and didn't bother to make a new file for styling but the code is not too bad, kinda used to css in js lol

const sections = [
  { title: "Introduction" },
  { title: "Origins of the Pluriverse" },
  { title: "Patterns" },
  { title: "01. Interoperability" },
  { title: "02. Agency" },
  { title: "03. Regeneration" },
  { title: "04. Privacy" },
  { title: "05. Voice" },
  { title: "06. Engagement and Attention" },
  { title: "07. Commons" },
];

function calculateScaleX(index, hoveredIndex) {
  const distance = Math.abs(index + 1 - (hoveredIndex + 1));
  const scale = 1 / distance;
  console.log(scale);
  return scale * 4;
}

export default function IndexTimeline(params: type) {
  const [hoveredIndex, setHoveredIndex] = useState<number | undefined>(
    undefined
  );

  const indexStyles = {
    backgroundColor: "rgb(61,61,61)",
    width: 18,
    height: 3,
    zIndex: 100000,
    opacity: 0.3,
    // will-change: opacity;
    transition: "transform .2s",
    transformOrigin: "0 0",
  };

  return (
    <div
      style={{
        position: "fixed",
        height: "100vh",
        zIndex: 1000,
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        paddingLeft: 24,
      }}
    >
      {sections.map(({ title }, index) => (
        <div
          style={{ paddingBottom: 16, cursor: "pointer" }}
          onPointerEnter={() => {
            setHoveredIndex(index);
          }}
          onPointerLeave={() => setHoveredIndex(undefined)}
        >
          <div style={{ position: "relative" }}>
            <div
              style={{
                ...indexStyles,
                transform: `scaleX(${
                  hoveredIndex !== undefined
                    ? calculateScaleX(index, hoveredIndex)
                    : 1
                })`,
              }}
            ></div>
            {hoveredIndex === index && (
              <div
                style={{
                  position: "absolute",
                  top: -16,
                  left: 90,
                  width: 1000,
                  fontSize: 16,
                  fontWeight: 700,
                  transition: "transform .2s",
                }}
              >
                {title}
              </div>
            )}
          </div>
        </div>
      ))}
    </div>
  );
}

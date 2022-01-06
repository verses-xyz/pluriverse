import fragmentShader from "../shaders/fragment.glsl";
import vertexShader from "../shaders/vertex.glsl";
import { useMemo, useRef } from "react";
import { useFrame } from "@react-three/fiber";

export function BlobShaderMaterial({
  speed,
  color,
  density,
  strength,
  offset,
}) {
  const ref = useRef();
  const data = useMemo(
    () => ({
      uniforms: {
        uTime: { value: 0 },
        uHue: { value: color },
        uSpeed: { value: speed },
        uNoiseDensity: { value: density },
        uNoiseStrength: { value: strength },
        uOffset: { value: offset },
        uFreq: { value: 3 },
        uAmp: { value: 6 },
        red: { value: 0 },
        green: { value: 0 },
        blue: { value: 0 },
        uAlpha: { value: 1.0 },
      },
      defines: {
        PI: Math.PI,
      },
      fragmentShader,
      vertexShader,
    }),
    // eslint-disable-next-line react-hooks/exhaustive-deps
    []
  );

  useFrame((state) => {
    ref.current.uniforms.uHue.value = color;
    ref.current.uniforms.uSpeed.value = speed;
    ref.current.uniforms.uNoiseDensity.value = density;
    ref.current.uniforms.uNoiseStrength.value = strength;
    ref.current.uniforms.uOffset.value = offset;
  });

  return <shaderMaterial ref={ref} attach="material" {...data} />;
}

export default function Blob({
  size,
  speed,
  color,
  density,
  strength,
  offset,
  ...props
}) {
  return (
    <mesh {...props}>
      <icosahedronGeometry attach="geometry" args={[size, 64, 64]} />
      <BlobShaderMaterial
        speed={speed}
        color={color}
        density={density}
        strength={strength}
        offset={offset}
      />
    </mesh>
  );
}

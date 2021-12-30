import { useMemo } from 'react';
import fragmentShader from '../shaders/fragment.glsl';
import vertexShader from '../shaders/vertex.glsl';

export function BlobShaderMaterial({
  size,
  speed,
  color,
  density,
  strength,
  offset,
}) {
  const data = useMemo(
    () => ({
      uniforms: {
        uTime: { value: 0 },
        uSpeed: { value: speed },
        uNoiseDensity: { value: density },
        uNoiseStrength: { value: strength },
        uFreq: { value: 3 },
        uAmp: { value: 6 },
        uHue: { value: color },
        uOffset: { value: offset },
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
    [],
  );

  return <shaderMaterial attach="material" {...data} />;
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
        size={size}
        speed={speed}
        color={color}
        density={density}
        strength={strength}
        offset={offset}
      />
    </mesh>
  );
}

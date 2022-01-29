import fragmentShader from "../shaders/fragment.glsl";
import vertexShader from "../shaders/vertex.glsl";
import { useMemo, useRef } from "react";
import { MeshProps } from "@react-three/fiber";

interface ShaderProps {
  speed: number;
  color: number;
  density: number;
  strength: number;
  alpha?: number;
  offset: number;
}

interface BlobProps extends ShaderProps {
  size: number;
  meshProps?: MeshProps;
}

export function BlobShaderMaterial({
  speed,
  color,
  density,
  strength,
  alpha = 1.0,
  offset,
}: ShaderProps) {
  // console.log(speed, color, density, strength, alpha, offset);
  const ref = useRef();
  const data = useMemo(() => {
    return {
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
        uAlpha: { value: alpha },
      },
      defines: {
        PI: Math.PI,
      },
      fragmentShader,
      vertexShader,
    };
  }, [color, speed, density, strength, offset, alpha]);

  return (
    <shaderMaterial
      key={[color, speed, density, strength, offset, alpha].join(" ")}
      ref={ref}
      attach="material"
      {...data}
    />
  );
}

export default function Blob({
  size,
  meshProps = {},
  ...shaderProps
}: BlobProps) {
  return (
    <mesh {...meshProps}>
      <icosahedronGeometry attach="geometry" args={[size, 16]} />
      <BlobShaderMaterial {...shaderProps} />
    </mesh>
  );
}

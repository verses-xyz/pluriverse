import { useMemo, useRef } from "react";
import fragmentShader from "../shaders/fragment.glsl";
import vertexShader from "../shaders/vertex.glsl";
import { MeshProps } from "@react-three/fiber";
import { IcosahedronGeometry } from "three";

interface ShaderProps {
  speed: number;
  color: number;
  density: number;
  strength: number;
  alpha?: number;
  offset: number;
}

export enum SizeChoice {
  Small = "Small",
  Medium = "Medium",
}

const BlobSizes: Record<SizeChoice, number> = {
  [SizeChoice.Small]: 0.8,
  [SizeChoice.Medium]: 5,
};

const IcosahedronGeos: Record<string, IcosahedronGeometry> = Object.fromEntries(
  Object.entries(BlobSizes).map(([sizeChoice, size]) => [
    sizeChoice as SizeChoice,
    new IcosahedronGeometry(size, 8),
  ])
);

const LowResIcosahedronGeos: Record<string, IcosahedronGeometry> =
  Object.fromEntries(
    Object.entries(BlobSizes).map(([sizeChoice, size]) => [
      sizeChoice as SizeChoice,
      new IcosahedronGeometry(size, 1),
    ])
  );

interface BlobProps extends ShaderProps {
  sizeType: SizeChoice;
  lowRes?: boolean;
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
      precision="lowp"
    />
  );
}

export default function Blob({
  sizeType,
  meshProps = {},
  lowRes,
  ...shaderProps
}: BlobProps) {
  return (
    <mesh
      {...meshProps}
      geometry={
        lowRes ? LowResIcosahedronGeos[sizeType] : IcosahedronGeos[sizeType]
      }
    >
      <BlobShaderMaterial {...shaderProps} />
    </mesh>
  );
}

import {
  DepthOfField,
  EffectComposer,
  HueSaturation,
  Noise,
  Vignette,
} from "@react-three/postprocessing";

export default function BlobsPostProcessing() {
  return (
    <EffectComposer>
      <DepthOfField
        focusDistance={0}
        focalLength={0.5}
        bokehScale={0.4}
        height={480}
      />
      <Noise opacity={0.025} />
      <Vignette eskil={false} offset={0.1} darkness={1.1} />
      <HueSaturation hue={0.6} saturation={0.3} />
    </EffectComposer>
  );
}

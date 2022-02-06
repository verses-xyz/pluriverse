import {
  Bloom,
  BrightnessContrast,
  DepthOfField,
  EffectComposer,
  HueSaturation,
  Noise,
  Vignette,
} from "@react-three/postprocessing";
import { Resizer } from "postprocessing";

export default function BlobsPostProcessing({ includeBloom = true }) {
  return (
    <EffectComposer>
      <Vignette eskil={false} offset={0.1} darkness={1.1} />
      <BrightnessContrast brightness={0.2} contrast={0.4} />
      <HueSaturation hue={0.6} saturation={0.3} />
      {includeBloom ? (
        <Bloom
          intensity={0.2} // The bloom intensity.
          width={Resizer.AUTO_SIZE} // render width
          height={Resizer.AUTO_SIZE} // render height
          kernelSize={4} // blur kernel size
          luminanceThreshold={0.1} // luminance threshold. Raise this value to mask out darker elements in the scene.
          luminanceSmoothing={0.2} // smoothness of the luminance threshold. Range is [0, 1]
        />
      ) : (
        <></>
      )}
      <DepthOfField
        focusDistance={0}
        focalLength={0}
        bokehScale={0.05}
        width={Resizer.AUTO_SIZE} // render width
        height={Resizer.AUTO_SIZE} // render height
      />
      <Noise opacity={0.01} />
    </EffectComposer>
  );
}

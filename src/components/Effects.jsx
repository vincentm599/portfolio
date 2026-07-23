import { EffectComposer, Bloom } from "@react-three/postprocessing";

export default function Effects() {
  return (
    <EffectComposer>
      <Bloom
        intensity={0.15}
        luminanceThreshold={0.2}
        luminanceSmoothing={0.1}
        mipmapBlur
      />
    </EffectComposer>
  );
}
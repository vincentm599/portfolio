import { useEffect, useMemo } from "react";
import * as THREE from "three";

export default function TVScreen() {
  const video = useMemo(() => {
    const v = document.createElement("video");
    v.src = `${import.meta.env.BASE_URL}videos/tv.mp4`;
    v.loop = true;
    v.muted = true;
    v.playsInline = true;
    v.autoplay = true;
    v.crossOrigin = "anonymous";
    return v;
  }, []);

  useEffect(() => {
    video.play().catch(console.error);

    return () => {
      video.pause();
    };
  }, [video]);

  const texture = useMemo(() => {
    const tex = new THREE.VideoTexture(video);
    tex.colorSpace = THREE.SRGBColorSpace;
    return tex;
  }, [video]);

  return (
    <mesh
      position={[-4, 3.2, -12]}
      rotation={[0, Math.PI / 45, 0]}
      scale={[1.6, 0.9, 1]}
    >
      <planeGeometry args={[1, 1]} />
      <meshBasicMaterial map={texture} toneMapped={false} />
    </mesh>
  );
}
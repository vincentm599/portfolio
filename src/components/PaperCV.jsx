import { useState } from "react";
import { useLoader } from "@react-three/fiber";
import { animated, useSpring } from "@react-spring/three";
import * as THREE from "three";


export default function PaperCV({ visible, onClose }) {
  const [hovered, setHovered] = useState(false);

  const texture = useLoader(
    THREE.TextureLoader,
    "/images/cv.jpg"
  );

  const animation = useSpring({
    position: visible 
      ? [-2, 2.2, 10.1] 
      : [-3.0687, 1.1286, 1.758], 

    rotation: visible
      ? [0, 0, 0]
      : [-Math.PI / 2, 0, 0],

    scale: visible
      ? 1
      : hovered
      ? 0.08
      : 0.06,

    config: {
      tension: 180,
      friction: 18,
    },
  });

  return (
    <animated.mesh
      position={animation.position}
      rotation={animation.rotation}
      scale={animation.scale}
      onPointerOver={() => {
        document.body.style.cursor = "pointer";
        setHovered(true);
      }}
      onPointerOut={() => {
        document.body.style.cursor = "default";
        setHovered(false);
      }}
      onClick={() => {
        if (visible) onClose();
      }}
    >
      <boxGeometry args={[7.5, 10.5, 0.06]} />
      

<meshBasicMaterial
  map={texture}
  toneMapped={false}
/>
    </animated.mesh>
    
  );
}
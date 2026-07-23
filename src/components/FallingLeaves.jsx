import { useMemo, useRef } from "react";
import { useFrame } from "@react-three/fiber";
import { useGLTF } from "@react-three/drei";

function Leaf({ startX, startY, startZ, speed }) {
  const ref = useRef();
  const { scene } = useGLTF("/models/leaf.glb");

  const leaf = useMemo(() => scene.clone(), [scene]);

  useFrame((state, delta) => {
    if (!ref.current) return;

    // Descente
    ref.current.position.y -= speed * delta;

    // Léger vent
    ref.current.position.x +=
  Math.sin(state.clock.elapsedTime * speed * 5 + startX) *
  (0.002 + Math.random() * 0.001);

ref.current.position.z +=
  Math.cos(state.clock.elapsedTime * speed * 4 + startZ) *
  (0.001 + Math.random() * 0.001);

    // Rotation
    ref.current.rotation.x += delta * (0.1 + speed);
ref.current.rotation.y += delta * (0.2 + speed * 0.5);
ref.current.rotation.z += delta * (0.3 + speed * 0.8);

    // Recommence en haut
    if (ref.current.position.y < 0) {
      ref.current.position.set(
        2 + (Math.random() - 0.1) * 2,
        7 + Math.random() * 7,
        2 + (Math.random() - 1.5) * 2
      );
    }
  });

  return (
    <primitive
      ref={ref}
      object={leaf}
      position={[startX, startY, startZ]}
      scale={0.05 + Math.random() * 0.05}
    />
  );
}

export default function FallingLeaves() {
  const leaves = useMemo(() => {
    return Array.from({ length: 40 }, () => ({
      x: 3 + (Math.random() - 0.5) * 2,
      y: -10 + Math.random() * 6,
      z: -3 + (Math.random() - 5.5) * 2,
      speed: 0.15 + Math.random() * 0.7,
    }));
  }, []);

  return (
    <>
      {leaves.map((leaf, index) => (
        <Leaf
          key={index}
          startX={leaf.x}
          startY={leaf.y}
          startZ={leaf.z}
          speed={leaf.speed}
        />
      ))}
    </>
  );
}
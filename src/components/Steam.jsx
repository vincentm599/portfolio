import { useMemo, useRef } from "react";
import { useFrame } from "@react-three/fiber";

function Particle({ position }) {
  const ref = useRef();

  useFrame((state, delta) => {
    if (!ref.current) return;
    ref.current.scale.setScalar(
  0.03 + Math.random() * 0.03
);

    ref.current.position.y += delta * 0.15;
    ref.current.position.x +=
      Math.sin(state.clock.elapsedTime * 2 + position[1]) * 0.0015;

    ref.current.position.z +=
      Math.cos(state.clock.elapsedTime * 1.5 + position[0]) * 0.0008;

    ref.current.material.opacity -= delta * 0.12;

    if (ref.current.material.opacity <= 0) {
      ref.current.position.set(
        position[0] + (Math.random() - 0.5) * 0.03,
        position[1],
        position[2] + (Math.random() - 0.5) * 0.03
      );

      ref.current.material.opacity = 0.18;
      ref.current.scale.setScalar(0.05);
    }

    const s = ref.current.scale.x;

if (s < 0.12) {
  ref.current.scale.setScalar(s + delta * 0.03);
}
  });

  return (
    <mesh ref={ref} position={position}>
      <sphereGeometry args={[1, 10, 10]} />
      <meshStandardMaterial
        color="white"
        transparent
        opacity={0.32}
        depthWrite={false}
      />
    </mesh>
  );
}

export default function Steam() {
  const particles = useMemo(() => {
    return Array.from({ length: 15 }, (_, i) => [
      -5.7,
      2.4 + i * 0.02,
      -6.5,
    ]);
  }, []);

  return (
    <>
      {particles.map((p, i) => (
        <Particle key={i} position={p} />
      ))}
    </>
  );
}
import { useMemo, useRef } from "react";
import { useFrame } from "@react-three/fiber";

function Bug({ radius, speed, offset }) {
  const ref = useRef();

  useFrame((state) => {
    const t = state.clock.elapsedTime * speed + offset;

    ref.current.position.x = -7.95 + Math.cos(t) * radius;
    ref.current.position.z = -3.8 + Math.sin(t) * radius;
    ref.current.position.y =
      5.3 +
      Math.sin(t * 2) * 0.12 +
      Math.cos(t * 3) * 0.05;
  });

  return (
    <mesh ref={ref}>
      <sphereGeometry args={[0.015, 8, 8]} />
      <meshBasicMaterial color="#fff7b0" />
    </mesh>
  );
}

export default function Bugs() {
  const bugs = useMemo(() => {
    return Array.from({ length: 8 }, (_, i) => ({
      radius: 0.25 + Math.random() * 0.35,
      speed: 0.6 + Math.random() * 0.8,
      offset: Math.random() * Math.PI * 2,
    }));
  }, []);

  return (
    <>
      {bugs.map((bug, i) => (
        <Bug key={i} {...bug} />
      ))}
    </>
  );
}
import { useEffect, useRef } from "react";
import { useFrame } from "@react-three/fiber";

export default function Customer({
  scene,
  objectName,
  rotationY = 0,
}) {
  const customer = useRef();

  useEffect(() => {
    scene.traverse((child) => {
      if (child.name === objectName) {
        customer.current = child;

        customer.current.userData.baseY = child.position.y;

        // Rotation de départ
        customer.current.rotation.y = rotationY;
        customer.current.userData.baseRotY = rotationY;
      }
    });
  }, [scene, objectName, rotationY]);

  useFrame((state) => {
    if (!customer.current) return;

    const t = state.clock.elapsedTime;
    const breathe = Math.sin(t * 1.2);

    // Respiration
    customer.current.position.y =
      customer.current.userData.baseY +
      breathe * 0.008;

    // Légers mouvements
    customer.current.rotation.z =
      Math.sin(t * 1.15) * 0.03;

    customer.current.rotation.x =
      Math.sin(t * 0.85 + 1.3) * 0.07;

    customer.current.rotation.y =
      customer.current.userData.baseRotY +
      Math.sin(t * 0.55 + 2.2) * 0.015;
  });

  return null;
}
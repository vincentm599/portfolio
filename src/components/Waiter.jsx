import { useEffect, useRef } from "react";
import { useFrame } from "@react-three/fiber";

export default function Waiter({ scene }) {
  const waiter = useRef();
  const direction = useRef(1);
const pauseUntil = useRef(0);

  
useEffect(() => {
  scene.traverse((child) => {
    if (child.name === "Serveur") {
      waiter.current = child;
      waiter.current.userData.basePos = child.position.clone();

      console.log("✅ Serveur trouvé", waiter.current);
    }
  });
}, [scene]);

useFrame((state, delta) => {
  if (!waiter.current) return;

  const time = state.clock.elapsedTime;

  const minX = waiter.current.userData.basePos.x;
  const maxX = minX + 5;

  // Si le serveur est en pause, on ne le déplace pas
  if (time < pauseUntil.current) {
    return;
  }

  // Déplacement
  waiter.current.position.x += direction.current * delta * 1.2;

  // Petit rebond pendant la marche
  waiter.current.position.y =
    waiter.current.userData.basePos.y +
    Math.abs(Math.sin(time * 4)) * 0.015;

  // Légère animation du corps
  waiter.current.rotation.x =
    Math.sin(time * 2) * 0.05;

  waiter.current.rotation.z =
    Math.sin(time * 3) * 0.015;

  // Orientation
  const targetRotation =
    direction.current > 0
      ? Math.PI / 2
      : -Math.PI / 2;

  waiter.current.rotation.y +=
    (targetRotation - waiter.current.rotation.y) * 0.08;

  // Arrivé au bout
  if (
    direction.current > 0 &&
    waiter.current.position.x >= maxX
  ) {
    waiter.current.position.x = maxX;
    direction.current = -1;
    pauseUntil.current = time + 6; // Pause de 20 secondes
  }

  // Revenu au départ
  if (
    direction.current < 0 &&
    waiter.current.position.x <= minX
  ) {
    waiter.current.position.x = minX;
    direction.current = 1;
    pauseUntil.current = time + 10; // Pause de 20 secondes
  }
});

  return null;
}
import { useEffect, useRef, useState } from "react";
import { useGLTF } from "@react-three/drei";
import { useFrame } from "@react-three/fiber";

import Cat from "./Cat";
import RestaurantSign from "./RestaurantSign";
import Customer from "./Customer";
import Waiter from "./Waiter";
import TVScreen from "./TVScreen";
import { Html } from "@react-three/drei";


export default function CoffeeModel({ onPaperClick }) {
  const { scene } = useGLTF("/models/coffee.glb");

  const signRef = useRef(null);
  const coffeeRef = useRef(null);
  const newspaperRef = useRef(null);
  const canRef = useRef(null);
  const trashRef = useRef(null);

  const newspaperAnim = useRef(0);
  const newspaperStartX = useRef(0);

  const [canStep, setCanStep] = useState(0);
  const [ecoBonus, setEcoBonus] = useState(false);

  useEffect(() => {
    scene.traverse((child) => {
      // Néon
      if (child.name === "Object_4003") {
        signRef.current = child;

        if (child.material) {
          child.material.emissive.set("#ff2da8");
        }
      }

      // Café
      if (child.name === "defaultMaterial026") {
        coffeeRef.current = child;
      }

      // Journal
      if (child.name === "Newspaper") {
        newspaperRef.current = child;
        newspaperStartX.current = child.position.x;
      }

      // Canette
      if (child.name === "cola_can_low002") {
        canRef.current = child;
      }

      

      // Poubelle
      if (child.name === "pCylinder2") {
        trashRef.current = child;
      }
    });
  }, [scene]);

  useFrame((state) => {
    const t = state.clock.elapsedTime;

    // Néon
    if (signRef.current?.material) {
      let intensity = 8;
      intensity += Math.sin(t * 60) * 1.2;
      intensity += (Math.random() - 0.5) * 1.5;

      if (Math.random() < 0.005) intensity = 0;

      signRef.current.material.emissiveIntensity = Math.max(0, intensity);
    }

    // Café
    if (coffeeRef.current) {
      coffeeRef.current.rotation.y += 0.05;
    }

    // Journal
    if (newspaperRef.current) {
      newspaperAnim.current *= 0.9;
      newspaperRef.current.position.x =
        newspaperStartX.current + newspaperAnim.current;
    }
  });

  const handleClick = (e) => {
    e.stopPropagation();

    let obj = e.object;

    while (obj) {
      // Journal
      if (obj.name === "Newspaper") {
        newspaperAnim.current = 4.53;
        return;
      }

      // CV
      if (obj.name === "papercv") {
        onPaperClick?.();
        return;
      }

      // Canette
      if (
        obj.name === "cola_can_low002" ||
        obj.name === "cola_can_low002_Standardmaterial_0"
      ) {
        if (!canRef.current) return;

if (
  obj.name === "cola_can_low002" ||
  obj.name === "cola_can_low002_Standardmaterial_0"
) {
  canRef.current.position.set(-60.2, 60.35, -109.1);

  setEcoBonus(true);
    setTimeout(() => {
    setEcoBonus(false);
  }, 2000);

  return;
}
      }

      // Cadeau
      if (obj.name.toLowerCase().includes("cadeau")) {
        window.open(
          "https://www.instagram.com/autourducadeau?utm_source=qr&igsh=emY3djhyeWZhbHYy",
          "_blank",
          "noopener,noreferrer"
        );
        return;
      }

      // Restaurant
      if (obj.userData.onClick) {
        obj.userData.onClick();
        return;
      }

      obj = obj.parent;
    }
  };

  return (
    <>
      <primitive
        object={scene}
        castShadow
        receiveShadow
        onClick={handleClick}
      />
      {ecoBonus && (
  <Html center>
    <div
      style={{
        background: "rgba(20,20,20,0.85)",
        color: "#7CFC00",
        padding: "12px 20px",
        borderRadius: "12px",
        fontSize: "28px",
        fontWeight: "bold",
        border: "2px solid #7CFC00",
        userSelect: "none",
      }}
    >
      🌱 +1 point bonus écolo !
    </div>
  </Html>
)}

      <RestaurantSign scene={scene} />
      <Cat scene={scene} />

      <Customer scene={scene} objectName="Node_1" />
      <Customer scene={scene} objectName="mesh_0001" />

      <TVScreen />

      <Waiter scene={scene} />
    </>
  );
}
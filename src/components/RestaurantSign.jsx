import { useEffect, useRef } from "react";
import { useFrame } from "@react-three/fiber";

export default function RestaurantSign({ scene }) {
  const sign = useRef();
  const hovered = useRef(false);

  useEffect(() => {
    scene.traverse((child) => {
      if (
        child.name ===
        "SM_Welcome_Sign_Restourant_T_floor_sign_1001_0"
      ) {
        sign.current = child;
      }
    });
  }, [scene]);

  useFrame(() => {
    if (!sign.current) return;

    const target = hovered.current ? 1.03 : 1;

    sign.current.scale.x +=
      (target - sign.current.scale.x) * 0.12;
    sign.current.scale.y +=
      (target - sign.current.scale.y) * 0.12;
    sign.current.scale.z +=
      (target - sign.current.scale.z) * 0.12;

    if (sign.current.material) {
      sign.current.material.emissive.set("#dcf80528");
      sign.current.material.emissiveIntensity =
        hovered.current ? 0.1 : 0;
    }
  });

  useEffect(() => {
    if (!sign.current) return;

    sign.current.userData.onPointerOver = () => {
      hovered.current = true;
      document.body.style.cursor = "pointer";
    };

    sign.current.userData.onPointerOut = () => {
      hovered.current = false;
      document.body.style.cursor = "default";
    };

    sign.current.userData.onClick = () => {
      window.open(
        "https://vincentm599.github.io/le-tablier-dambre/",
        "_blank",
        "noopener,noreferrer"
      );
    };

    return () => {
      document.body.style.cursor = "default";
    };
  }, [scene]);

  return null;
}
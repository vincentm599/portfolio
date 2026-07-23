import { useEffect } from "react";

export default function Gift({ scene }) {
  useEffect(() => {
    scene.traverse((child) => {
      if (child.name.toLowerCase().includes("cadeau")) {
        console.log("🎁", child.name);

        child.traverse((mesh) => {
          if (!mesh.isMesh) return;

          mesh.userData.onPointerOver = () => {
            document.body.style.cursor = "pointer";
          };

          mesh.userData.onPointerOut = () => {
            document.body.style.cursor = "default";
          };

          mesh.userData.onClick = () => {
            window.open(
              "https://www.instagram.com/autourducadeau?utm_source=qr&igsh=emY3djhyeWZhbHYy",
              "_blank",
              "noopener,noreferrer"
            );
          };
        });
      }
    });

    return () => {
      document.body.style.cursor = "default";
    };
  }, [scene]);

  return null;
}
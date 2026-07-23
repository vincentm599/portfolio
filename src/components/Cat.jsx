import { useEffect, useRef } from "react";

export default function Cat({ scene }) {
  const audio = useRef();

  useEffect(() => {
    audio.current = new Audio("/sounds/cat-meow.mp3");
    audio.current.volume = 0.5;

    let cat = null;

    scene.traverse((child) => {
      if (child.name === "Object_2001") {
        cat = child;
      }
    });

    if (!cat) return;

    const onClick = () => {
      audio.current.currentTime = 0;
      audio.current.play();
    };

    cat.userData.onClick = onClick;

    return () => {
      delete cat.userData.onClick;
    };
  }, [scene]);

  return null;
}
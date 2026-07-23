import { Canvas } from "@react-three/fiber";
import CoffeeScene from "./components/CoffeeScene";

export default function App() {
  return (
    <div style={{ width: "100vw", height: "100vh" }}>
      <Canvas
        shadows
        camera={{ position: [0, 6, 20], fov: 45 }}
      >
        <CoffeeScene />
      </Canvas>
    </div>
  );
}
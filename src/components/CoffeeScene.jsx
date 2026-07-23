import CoffeeModel from "./CoffeeModel";
import FallingLeaves from "./FallingLeaves";
import Lights from "./Lights";
import Effects from "./Effects";
import Steam from "./Steam";
import { useState } from "react";
import PaperCV from "./PaperCV";
import Bugs from "./Bugs";




import {
  OrbitControls,
  Environment,
  Stars,
} from "@react-three/drei";

export default function CoffeeScene() {
  const [showCV, setShowCV] = useState(false);

  return (
    <>
      {/* Fond */}
      <color attach="background" args={["#02040d"]} />

      {/* Ciel étoilé */}
      <Stars
        radius={250}
        depth={100}
        count={6000}
        factor={4}
        saturation={0}
        fade
        speed={0.2}
      />


      {/* Environnement */}
      <Environment preset="night" />

      {/* Lumières */}
      <Lights />

      <Bugs />

      {/* Modèle principal */}
      <CoffeeModel
  onPaperClick={() => setShowCV(true)}
/>

      {/* Feuilles */}
      <FallingLeaves />

      {/* Bloom */}
      <Effects />


      <Steam />



      {/* Caméra */}
      <OrbitControls
        enableZoom
        minDistance={5}
        maxDistance={95}
        minPolarAngle={Math.PI / 5.4}
        maxPolarAngle={Math.PI / 2.1}
      />
      <PaperCV
  visible={showCV}
  onClose={() => setShowCV(false)}
/>



    </>
  );
}
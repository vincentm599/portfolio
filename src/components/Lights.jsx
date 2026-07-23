export default function Lights() {
  return (
    <>
      <ambientLight intensity={0.35} />

      <directionalLight
        position={[8, 12, 5]}
        intensity={0.8}
        castShadow
      />

      {/* Lampadaire */}
      <pointLight
        position={[-7.95, 5.30, -3.8]}
        intensity={80}
        distance={8}
        color="#ffd87a"
        castShadow
      />

      {/* Porte */}
      <pointLight
        position={[-2.2, 1.3, 5.5]}
        intensity={40}
        distance={10}
        color="#ffddb0"
      />

      {/* Mur arrière */}
      <pointLight
        position={[-2, 0.2, -5.5]}
        intensity={8}
        distance={8}
        color="#8aa2ff"
      />
      <pointLight
        position={[4.2, 1.3, 5.5]}
        intensity={20}
        distance={50}
        color="#df17171c"
      />
      <pointLight
        position={[-2.2, 3.3, -10.5]}
        intensity={50}
        distance={50}
        color="#eb990a"
      />
      <pointLight
        position={[-2.2, 3.3, -10.5]}
        intensity={50}
        distance={50}
        color="#eb990a"
      />
        <pointLight
        position={[-2.2, 4.3, -4.5]}
        intensity={10}
        distance={20}
        color="#fdfcfc"
      />
    </>
  );
}
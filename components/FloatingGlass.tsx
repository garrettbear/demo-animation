"use client";

import { Canvas, useFrame } from "@react-three/fiber";
import { MeshTransmissionMaterial, Text, RoundedBox } from "@react-three/drei";
import { useRef, useState } from "react";
import * as THREE from "three";
import { useDrag } from "@use-gesture/react";

function GlassBox() {
  const ref = useRef<THREE.Mesh>(null);
  const [rotation, setRotation] = useState<[number, number]>([0.1, 0.3]);
  const idleTime = useRef(0);

  useFrame((_, delta) => {
    idleTime.current += delta;
    const y = Math.sin(idleTime.current * 2) * 0.08;
    if (ref.current) {
      ref.current.rotation.x = rotation[0];
      ref.current.rotation.y = rotation[1];
      ref.current.position.y = y - 0.5;
    }
  });

  const bind = useDrag(({ offset: [x, y] }) => {
    setRotation([0.1 + y / 80, 0.3 + x / 80]);
  });

  return (
    <RoundedBox
      ref={ref}
      args={[3, 3, 0.02]}
      radius={0.25}
      smoothness={10}
      position={[1.1, 2.1, 0]}
      {...bind()}
    >
      <MeshTransmissionMaterial
        backside
        thickness={1}
        transmission={1}
        roughness={0.025}
        clearcoat={1}
        chromaticAberration={0.2}
        distortion={0.4}
        distortionScale={0.2}
        temporalDistortion={0.15}
        anisotropy={0.2}
        envMapIntensity={0}
        background={new THREE.Color("#ffffff")}
      />
    </RoundedBox>
  );
}

function Scene() {
  return (
    <>
      <Text
        position={[-0, 0, -0.5]}
        fontSize={4}
        color="black"
        anchorX="center"
        anchorY="middle"
      >
        2
      </Text>

      <ambientLight intensity={1.2} />
      <directionalLight position={[5, 5, 5]} intensity={0.7} />
      <GlassBox />
    </>
  );
}

export default function FloatingGlass() {
  return (
    <div className="relative w-full h-full bg-white overflow-hidden rounded-2xl">
      <Canvas camera={{ position: [2, 2, 4], fov: 30 }}>
        <Scene />
      </Canvas>
    </div>
  );
}

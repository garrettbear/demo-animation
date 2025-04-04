"use client";

import { Canvas, useFrame } from "@react-three/fiber";
import { MeshTransmissionMaterial, Text, RoundedBox } from "@react-three/drei";
import { useRef } from "react";
import * as THREE from "three";

function GlassBox() {
  const ref = useRef<THREE.Mesh>(null);
  const idleTime = useRef(0);

  useFrame(({ pointer }, delta) => {
    idleTime.current += delta;
    const floatY = Math.sin(idleTime.current * 2) * 0.08;

    const targetX = THREE.MathUtils.clamp(pointer.y * 0.3, -0.15, 0.15);
    const targetY = THREE.MathUtils.clamp(pointer.x * 0.4, -0.2, 0.2);

    if (ref.current) {
      ref.current.rotation.x = THREE.MathUtils.lerp(
        ref.current.rotation.x,
        targetX,
        0.1
      );
      ref.current.rotation.y = THREE.MathUtils.lerp(
        ref.current.rotation.y,
        targetY,
        0.1
      );
      ref.current.position.y = floatY + -1.1;
    }
  });

  return (
    <RoundedBox
      ref={ref}
      args={[3, 3, 0.02]}
      radius={0.25}
      smoothness={10}
      position={[1.3, 0, 0]}
    >
      <MeshTransmissionMaterial
        transmission={1}
        backside
        thickness={0.1}
        roughness={0.01}
        clearcoat={1}
        chromaticAberration={0.35}
        distortion={0.15}
        distortionScale={0.2}
        temporalDistortion={0.05}
        anisotropy={0.3}
        envMapIntensity={0}
        background={new THREE.Color("#d3dac9")}
      />
    </RoundedBox>
  );
}

function Scene() {
  return (
    <>
      <Text
        position={[0, -0.5, -0.5]}
        fontSize={4}
        color="#002314"
        anchorX="center"
        anchorY="middle"
      >
        $
      </Text>

      <GlassBox />
    </>
  );
}

export default function FloatingGlass() {
  return (
    <div className="absolute inset-0 w-full h-full">
      <Canvas camera={{ position: [2, 2, 4], fov: 30, zoom: 1 }}>
        <Scene />
      </Canvas>
    </div>
  );
}

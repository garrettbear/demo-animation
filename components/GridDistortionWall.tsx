"use client";

import { Canvas, useFrame } from "@react-three/fiber";
import * as THREE from "three";
import { useRef, useMemo, useState, useEffect } from "react";
import { InstancedMesh } from "three";
import { RoundedBoxGeometry } from "three/examples/jsm/geometries/RoundedBoxGeometry.js";

function Grid({
  mouse,
  cols,
  rows,
}: {
  mouse: { x: number; y: number };
  cols: number;
  rows: number;
}) {
  const meshRef = useRef<InstancedMesh>(null);
  const total = cols * rows;
  const dummy = useMemo(() => new THREE.Object3D(), []);
  const timeRef = useRef(0);

  const positions = useMemo(() => {
    const temp: { x: number; y: number }[] = [];
    for (let i = 0; i < total; i++) {
      const col = i % cols;
      const row = Math.floor(i / cols);
      temp.push({
        x: col - cols / 2,
        y: row - rows / 2,
      });
    }
    return temp;
  }, [total, cols, rows]);

  useFrame((_, delta) => {
    if (!meshRef.current) return;
    timeRef.current += delta;

    positions.forEach((pos, i) => {
      const dx = pos.x - mouse.x;
      const dy = pos.y - mouse.y;
      const dist = Math.sqrt(dx * dx + dy * dy);
      const maxDist = 4; // Reduced max distance for tighter effect
      const influence = Math.max(0, 1 - dist / maxDist);

      // Time-based wave effect
      const waveX = Math.sin(pos.x * 0.5 + timeRef.current * 2) * 0.1;
      const waveY = Math.cos(pos.y * 0.5 + timeRef.current * 2) * 0.1;

      // Calculate mouse-based distortion
      const angle = Math.atan2(dy, dx);
      const push = influence * 0.8; // Increased push effect

      // Combine mouse and wave effects
      const offsetX = Math.cos(angle) * push + waveX;
      const offsetY = Math.sin(angle) * push + waveY;

      // Dynamic scale based on both mouse and wave
      const waveScale = 1 + Math.sin(dist * 0.5 + timeRef.current * 3) * 0.1;
      const scale = (1 - influence * 0.4) * waveScale;

      // Add slight z-position variation for depth
      const zOffset = Math.sin(dist * 2 - timeRef.current * 2) * 0.2;

      dummy.position.set(
        pos.x * 1.02 + offsetX,
        pos.y * 1.02 + offsetY,
        zOffset
      );
      dummy.scale.set(scale, scale, 1);
      dummy.rotation.z = influence * angle * 0.3 + waveX * 0.5;
      dummy.updateMatrix();
      meshRef.current!.setMatrixAt(i, dummy.matrix);
    });

    meshRef.current.instanceMatrix.needsUpdate = true;
  });

  const geometry = useMemo(() => {
    return new RoundedBoxGeometry(0.85, 0.85, 0.1, 4, 0.15);
  }, []);

  return (
    <instancedMesh ref={meshRef} args={[geometry, undefined, total]}>
      <meshStandardMaterial
        color="#E5E5E5"
        roughness={0.1}
        metalness={0.2}
        transparent
        opacity={0.95}
      />
    </instancedMesh>
  );
}

export default function GridDistortionWall() {
  const [mouse, setMouse] = useState({ x: 0, y: 0 });
  const [cols, setCols] = useState(32); // More columns for denser grid
  const [rows, setRows] = useState(16); // More rows

  useEffect(() => {
    const handleResize = () => {
      const width = window.innerWidth;
      const height = 500;
      const boxSize = 30; // Even smaller boxes for denser grid
      setCols(Math.floor(width / boxSize));
      setRows(Math.floor(height / boxSize));
    };
    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  return (
    <div
      className="relative w-full h-[500px] bg-[#F5F5F5]"
      onMouseMove={(e) => {
        const bounds = e.currentTarget.getBoundingClientRect();
        const x = ((e.clientX - bounds.left) / bounds.width) * cols - cols / 2;
        const y = -(
          ((e.clientY - bounds.top) / bounds.height) * rows -
          rows / 2
        );
        setMouse({ x, y });
      }}
      onMouseLeave={() => setMouse({ x: cols * 2, y: rows * 2 })}
    >
      <Canvas
        orthographic
        camera={{ zoom: 100, position: [0, 0, 100] }}
        dpr={[1, 2]} // Better rendering on high-DPI displays
      >
        <ambientLight intensity={1.2} />
        <directionalLight position={[5, 5, 5]} intensity={0.6} />
        <Grid mouse={mouse} cols={cols} rows={rows} />
      </Canvas>
    </div>
  );
}

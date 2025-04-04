"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";

export default function BackgroundGrid() {
  const gridRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const squares = gridRef.current?.querySelectorAll(".grid-square");
    if (!squares) return;

    // Set initial state
    gsap.set(squares, {
      scale: 0.5,
      borderRadius: "1rem",
      opacity: 0,
    });

    // Animate after layout stabilizes
    requestAnimationFrame(() => {
      gsap.to(squares, {
        scale: 1,
        borderRadius: 0,
        opacity: 1,
        duration: 1,
        ease: "power1.out", // smoother and lighter
        stagger: {
          amount: 2,
          grid: [10, 10],
          from: "center",
        },
      });
    });
  }, []);

  const gridSize = 10;
  const squares = Array.from({ length: gridSize * gridSize });

  return (
    <div
      ref={gridRef}
      className="absolute inset-0 grid grid-cols-10 grid-rows-10"
    >
      {squares.map((_, i) => (
        <div key={i} className="grid-square bg-blue-500 w-full h-full" />
      ))}
    </div>
  );
}

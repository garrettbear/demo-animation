"use client";

import { useEffect, useRef } from "react";
import {
  motion,
  useInView,
  useAnimation,
  AnimationControls,
} from "framer-motion";

interface AnimatedBackgroundProps {
  children: React.ReactNode;
  className?: string;
}

const GridSquare = ({
  index,
  controls,
}: {
  index: number;
  controls: AnimationControls;
}) => (
  <div className="relative w-full h-full">
    {/* Empty square outline */}
    <div className="absolute inset-0 bg-brand-gray-1 rounded-xl" />
    {/* Filling square */}
    <motion.div
      className="absolute inset-0 bg-white rounded-xl"
      initial={{ scale: 0 }}
      animate={controls}
      variants={{
        hidden: { scale: 0 },
        visible: {
          scale: 1,
          transition: {
            delay: index * 0.1,
            duration: 0.8,
            ease: [0.23, 1, 0.32, 1],
          },
        },
      }}
    />
  </div>
);

export default function AnimatedBackground({
  children,
  className = "",
}: AnimatedBackgroundProps) {
  const ref = useRef(null);
  const controls = useAnimation();
  const isInView = useInView(ref, {
    once: true,
    amount: 0.6,
    margin: "-100px",
  });

  useEffect(() => {
    if (isInView) {
      controls.start("visible");
    } else {
      controls.start("hidden");
    }
  }, [isInView, controls]);

  // Create grid of squares
  const rows = 8;
  const cols = 8;
  const squares = [];

  for (let i = 0; i < rows; i++) {
    for (let j = 0; j < cols; j++) {
      const index = j + i * 0.5; // Calculate delay index based on position
      squares.push(
        <div key={`${i}-${j}`} className="relative aspect-square">
          <GridSquare index={index} controls={controls} />
        </div>
      );
    }
  }

  return (
    <motion.div
      ref={ref}
      className={`relative overflow-hidden ${className}`}
      initial="hidden"
    >
      <div className="absolute inset-0 bg-white" />
      <div
        className="absolute inset-0 grid"
        style={{
          gridTemplateColumns: `repeat(${cols}, 1fr)`,
          gridTemplateRows: `repeat(${rows}, 1fr)`,
          gap: "12px",
        }}
      >
        {squares}
      </div>
      <div className="relative z-10">{children}</div>
    </motion.div>
  );
}

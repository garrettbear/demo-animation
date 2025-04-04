"use client";

import { motion } from "framer-motion";
import { useEffect, useRef, useState } from "react";
import { useInView } from "react-intersection-observer";

type Props = {
  value: string;
  delay?: number;
  className?: string;
};

export default function AnimatedNumberText({
  value,
  delay = 0,
  className,
}: Props) {
  const { ref, inView } = useInView({ triggerOnce: true, threshold: 0.6 });
  const [start, setStart] = useState(false);

  useEffect(() => {
    if (inView) setStart(true);
  }, [inView]);

  return (
    <div ref={ref} className={`inline-flex items-baseline ${className}`}>
      {value.split("").map((char, i) => {
        const isDigit = /\d/.test(char);

        return (
          <div key={i} className="relative w-auto h-[1em] overflow-hidden">
            {isDigit ? (
              <DigitRoll
                finalDigit={char}
                delay={delay + i * 0.1}
                active={start}
              />
            ) : (
              <motion.span
                initial={{ opacity: 0, y: -10 }}
                animate={start ? { opacity: 1, y: 0 } : {}}
                transition={{ delay: delay + i * 0.05, duration: 0.4 }}
                className="inline-block pb-[0.05em]" // slight optical alignment tweak
              >
                {char}
              </motion.span>
            )}
          </div>
        );
      })}
    </div>
  );
}

function DigitRoll({
  finalDigit,
  delay,
  active,
  cycles = 2,
}: {
  finalDigit: string;
  delay: number;
  active: boolean;
  cycles?: number;
}) {
  const containerRef = useRef<HTMLDivElement>(null);
  const [digitHeight, setDigitHeight] = useState(0);

  useEffect(() => {
    if (containerRef.current) {
      const span = containerRef.current.querySelector("span");
      if (span) {
        setDigitHeight(span.clientHeight);
      }
    }
  }, []);

  const parsedFinal = parseInt(finalDigit, 10);
  const finalIndex = cycles * 10 + (isNaN(parsedFinal) ? 0 : parsedFinal);
  const sequence = Array.from({ length: finalIndex + 1 }, (_, i) =>
    (i % 10).toString()
  );

  return (
    <div ref={containerRef} className="h-[1em] overflow-hidden relative">
      <motion.div
        initial={{ y: 0 }}
        animate={active && digitHeight ? { y: -finalIndex * digitHeight } : {}}
        transition={{ delay, duration: 1.4, ease: "easeOut" }}
        className="flex flex-col will-change-transform"
      >
        {sequence.map((d, i) => (
          <span
            key={i}
            className="h-[1em] leading-none text-inherit font-inherit text-center"
          >
            {d}
          </span>
        ))}
      </motion.div>
    </div>
  );
}

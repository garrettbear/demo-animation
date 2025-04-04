// components/ExpandingCard.tsx
"use client";

import { useRef, useEffect } from "react";
import gsap from "gsap";
import { useInView } from "react-intersection-observer";

export default function ExpandingCard() {
  const cardRef = useRef<HTMLDivElement>(null);
  const { ref, inView } = useInView({ triggerOnce: true, threshold: 0.6 });

  useEffect(() => {
    if (!cardRef.current || !inView) return;

    const ctx = gsap.context(() => {
      gsap.to(cardRef.current, {
        borderRadius: 0,
        scale: 1.2,
        duration: 1.2,
        ease: "power3.out",
      });
    }, cardRef);

    return () => ctx.revert();
  }, [inView]);

  return (
    <div
      ref={(node) => {
        cardRef.current = node;
        ref(node);
      }}
      className="bg-blue-500 rounded-xl transition-all duration-700"
      style={{ width: "100px", height: "100px" }}
    />
  );
}

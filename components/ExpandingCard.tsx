"use client";

import { useRef, useEffect } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

interface ExpandingCardProps {
  title: string;
  content: string;
  index: number;
}

export default function ExpandingCard({
  title,
  content,
  index,
}: ExpandingCardProps) {
  const cardRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!cardRef.current) return;

    const ctx = gsap.context(() => {
      gsap.fromTo(
        cardRef.current,
        {
          width: "100px",
          height: "100px",
        },
        {
          width: "300px",
          height: "300px",
          duration: 1,
          ease: "power3.out",
          scrollTrigger: {
            trigger: cardRef.current,
            start: "top 80%",
            toggleActions: "play none none reverse",
          },
        }
      );
    }, cardRef);

    return () => ctx.revert();
  }, []);

  return (
    <div
      ref={cardRef}
      className="bg-brand-blue-1 rounded-xl mx-auto mt-40"
      style={{ width: "100px", height: "100px" }}
      id={`card-${index}`}
    >
      <h3 className="text-xl font-bold mb-2 opacity-0">{title}</h3>
      <p className="text-sm text-gray-600 opacity-0">{content}</p>
    </div>
  );
}

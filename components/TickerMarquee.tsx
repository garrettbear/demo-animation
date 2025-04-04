"use client";

import React, { useRef } from "react";
import { useAnimationFrame } from "framer-motion";

const assets = [
  { symbol: "onTSLA", price: "$168.32", delta: "+1.2%" },
  { symbol: "onAPPL", price: "$189.12", delta: "-0.6%" },
  { symbol: "onNVDA", price: "$874.50", delta: "+3.4%" },
  { symbol: "onMETA", price: "$494.22", delta: "+0.2%" },
  { symbol: "onGOOG", price: "$148.92", delta: "-1.1%" },
  { symbol: "onMSFT", price: "$410.65", delta: "+0.5%" },
];

const TickerItem = ({ asset }: { asset: (typeof assets)[number] }) => (
  <div className="flex items-center gap-3 text-white text-sm font-medium bg-neutral-900 px-4 py-2 rounded-full shadow">
    <span>{asset.symbol}</span>
    <span className="text-gray-400">{asset.price}</span>
    <span
      className={`${
        asset.delta.startsWith("+") ? "text-green-400" : "text-red-400"
      }`}
    >
      {asset.delta}
    </span>
  </div>
);

export default function TickerMarquee() {
  const marqueeRef = useRef<HTMLDivElement>(null);
  const x = useRef(0);

  useAnimationFrame((_, delta) => {
    if (!marqueeRef.current) return;
    x.current -= delta * 0.05; // adjust speed here
    marqueeRef.current.style.transform = `translateX(${x.current}px)`;
    if (marqueeRef.current.offsetWidth + x.current <= 0) {
      x.current = 0;
    }
  });

  return (
    <div className="relative w-full overflow-hidden bg-black py-4">
      <div
        ref={marqueeRef}
        className="flex gap-8 whitespace-nowrap will-change-transform"
      >
        {[...assets, ...assets].map((asset, i) => (
          <TickerItem key={`${asset.symbol}-${i}`} asset={asset} />
        ))}
      </div>
    </div>
  );
}

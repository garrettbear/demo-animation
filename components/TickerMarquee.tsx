"use client";

import React, { useRef, useState } from "react";
import { useAnimationFrame } from "framer-motion";
import Popover from "./Popover";

const assets = [
  { symbol: "onTSLA", price: "$168.32", delta: "+1.2%" },
  { symbol: "onAPPL", price: "$189.12", delta: "-0.6%" },
  { symbol: "onNVDA", price: "$874.50", delta: "+3.4%" },
  { symbol: "onMETA", price: "$494.22", delta: "+0.2%" },
  { symbol: "onGOOG", price: "$148.92", delta: "-1.1%" },
  { symbol: "onMSFT", price: "$410.65", delta: "+0.5%" },
];

const TickerItem = ({
  asset,
  onHoverChange,
}: {
  asset: (typeof assets)[number];
  onHoverChange: (isHovered: boolean) => void;
}) => {
  const [isHovered, setIsHovered] = useState(false);
  const itemRef = useRef<HTMLDivElement>(null);

  const handleHover = (hovered: boolean) => {
    setIsHovered(hovered);
    onHoverChange(hovered);
  };

  return (
    <div className="relative" ref={itemRef}>
      <div
        className="flex flex-col justify-center text-white text-sm font-medium bg-neutral-900 p-6 aspect-square rounded-2xl shadow cursor-pointer hover:bg-neutral-800 transition-colors"
        onMouseEnter={() => handleHover(true)}
        onMouseLeave={() => handleHover(false)}
      >
        <h4 className="text-xl font-medium">{asset.symbol}</h4>
        <div className="flex justify-between gap-4">
          <span className="text-gray-400">{asset.price}</span>
          <span
            className={`${
              asset.delta.startsWith("+") ? "text-green-400" : "text-red-400"
            }`}
          >
            {asset.delta}
          </span>
        </div>
      </div>
      <Popover
        isOpen={isHovered}
        onClose={() => handleHover(false)}
        referenceElement={itemRef.current}
        placement="top"
      >
        <div className="max-w-sm">
          <h3 className="text-xl font-medium mb-3">{asset.symbol} Details</h3>
          <p className="text-brand-gray-3 text-base mb-4">
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do
            eiusmod tempor incididunt.
          </p>
          <div className="space-y-2">
            <p className="text-lg">Current Price: {asset.price}</p>
            <p className="text-lg">
              24h Change:{" "}
              <span
                className={
                  asset.delta.startsWith("+")
                    ? "text-green-600"
                    : "text-red-600"
                }
              >
                {asset.delta}
              </span>
            </p>
          </div>
        </div>
      </Popover>
    </div>
  );
};

export default function TickerMarquee() {
  const marqueeRef = useRef<HTMLDivElement>(null);
  const x = useRef(0);
  const [isPaused, setIsPaused] = useState(false);

  useAnimationFrame((_, delta) => {
    if (!marqueeRef.current || isPaused) return;
    x.current -= delta * 0.05;
    marqueeRef.current.style.transform = `translateX(${x.current}px)`;
    if (marqueeRef.current.offsetWidth + x.current <= 0) {
      x.current = 0;
    }
  });

  return (
    <div className="relative w-full py-4">
      <div
        id="popover-container"
        className="absolute inset-0 pointer-events-none"
        style={{ zIndex: 100 }}
      />

      <div className="relative overflow-hidden">
        <div
          ref={marqueeRef}
          className="flex gap-8 whitespace-nowrap will-change-transform"
        >
          {[...assets, ...assets].map((asset, i) => (
            <TickerItem
              key={`${asset.symbol}-${i}`}
              asset={asset}
              onHoverChange={setIsPaused}
            />
          ))}
        </div>
      </div>
    </div>
  );
}

"use client";

import React, { useRef, useState } from "react";
import { useAnimationFrame } from "framer-motion";
import Popover from "../components/Popover";

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

  return (
    <div
      className="relative"
      onMouseEnter={() => {
        setIsHovered(true);
        onHoverChange(true);
      }}
      onMouseLeave={() => {
        setIsHovered(false);
        onHoverChange(false);
      }}
    >
      <div className="flex items-center gap-3 text-sm font-medium bg-brand-gray-1 px-4 py-2 rounded-full cursor-pointer transition-all group hover:bg-neutral-800">
        <span className="group-hover:text-white transition-colors">
          {asset.symbol}
        </span>
        <span className="text-brand-gray-4 group-hover:text-brand-gray-2 transition-colors">
          {asset.price}
        </span>
        <span
          className={`transition-colors ${
            asset.delta.startsWith("+")
              ? "text-green-600 group-hover:text-green-400"
              : "text-red-600 group-hover:text-red-400"
          }`}
        >
          {asset.delta}
        </span>
      </div>
      {isHovered && (
        <Popover
          isOpen={isHovered}
          onClose={() => {
            setIsHovered(false);
            onHoverChange(false);
          }}
          className="absolute top-full left-1/2 -translate-x-1/2 mt-2 z-50 min-w-[300px]"
        >
          <div className="p-6">
            <h3 className="text-xl font-medium mb-3">{asset.symbol} Details</h3>
            <p className="text-gray-600 text-base mb-4">
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
      )}
    </div>
  );
};

export default function TickerMarquee() {
  const marqueeRef = useRef<HTMLDivElement>(null);
  const x = useRef(0);
  const [isPaused, setIsPaused] = useState(false);

  useAnimationFrame((_, delta) => {
    if (!marqueeRef.current || isPaused) return;
    x.current -= delta * 0.05; // adjust speed here
    marqueeRef.current.style.transform = `translateX(${x.current}px)`;
    if (marqueeRef.current.offsetWidth + x.current <= 0) {
      x.current = 0;
    }
  });

  return (
    <div className="relative w-full py-4">
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
  );
}

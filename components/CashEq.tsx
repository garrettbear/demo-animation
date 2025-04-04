"use client";

import React from "react";
import AnimatedNumberText from "./AnimatedNumberText";

const tokens = [
  {
    symbol: "USDY",
    price: "$1.00",
    apy: "5.2%",
    description:
      "Available to non-US persons, permissionless. Live on ~7 chains.",
    tags: ["Permissionless", "Non-US", "Multi-chain (7)"],
  },
  {
    symbol: "OUSG",
    price: "$1.00",
    apy: "4.8%",
    description:
      "Available to both US and non-US persons, permissioned. Instant mint & redeem.",
    tags: ["US & Non-US", "Permissioned", "Instant Redeem", "3 Chains"],
  },
];

export default function CashEq() {
  return (
    <section className="py-24 flex justify-center items-center gap-12">
      <div className="max-w-1/2">
        <h2 className="text-4xl font-bold">Cash Equivalent Tokens</h2>
        <p className="text-gray-600 text-lg">
          Lorem ipsum dolor sit amet, consectetur adipiscing elit. Lorem ipsum
          dolor sit amet consectetur adipisicing elit. Quibusdam exercitationem,
          quasi amet voluptas expedita doloribus eligendi deleniti suscipit
          minima neque illo voluptates! These assets offer safer and better
          yields.
        </p>
      </div>

      <div className="flex flex-col gap-4">
        {tokens.map((token) => (
          <div
            key={token.symbol}
            className="bg-brand-blue-1 text-brand-blue-6 rounded-2xl p-6 flex flex-col justify-between"
          >
            <div>
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-2xl font-semibold">{token.symbol}</h3>
                <span className="text-gray-500 text-sm">Live Price</span>
              </div>

              <div className="flex items-baseline space-x-4 mb-4">
                <AnimatedNumberText
                  value={token.price}
                  className="text-3xl font-bold"
                />

                <span className="text-green-600 font-medium">
                  APY {token.apy}
                </span>
              </div>

              <p className="text-gray-600 text-sm mb-4">{token.description}</p>

              <div className="flex flex-wrap gap-2">
                {token.tags.map((tag) => (
                  <span
                    key={tag}
                    className="bg-gray-100 text-xs px-3 py-1 rounded-full text-gray-700"
                  >
                    {tag}
                  </span>
                ))}
              </div>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}

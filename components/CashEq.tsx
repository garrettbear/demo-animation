"use client";

import React, { useRef } from "react";
import { motion, useInView } from "framer-motion";
import AnimatedNumberText from "./AnimatedNumberText";
import AnimatedBackground from "./AnimatedBackground";

const tokens = [
  {
    symbol: "USDY",
    price: "$1.00",
    apy: "5.2%",
    description: "",
    tags: ["Permissionless", "Non-US", "Multi-chain (7)"],
  },
  {
    symbol: "OUSG",
    price: "$1.00",
    apy: "4.8%",
    description: "",
    tags: ["US & Non-US", "Permissioned", "Instant Redeem", "3 Chains"],
  },
];

const cardVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: {
      delay: i * 0.2,
      duration: 0.5,
      ease: "easeOut",
    },
  }),
};

export default function CashEq() {
  const ref = useRef(null);
  const isInView = useInView(ref, {
    once: true,
    amount: 0.7,
    margin: "-100px",
  });

  return (
    <AnimatedBackground>
      <section className="py-24 min-h-[60vh] flex items-center" ref={ref}>
        <div className="container mx-auto flex flex-col md:grid md:grid-cols-7 gap-6">
          <motion.div
            className="col-span-3 h-full"
            variants={cardVariants}
            initial="hidden"
            animate={isInView ? "visible" : "hidden"}
            custom={0}
          >
            <div className="bg-brand-gray-1 rounded-xl p-8 h-full flex flex-col justify-end">
              <h2 className="text-4xl font-ondo mb-4">
                Cash Equivalent Tokens
              </h2>
              <p className="text-brand-gray-5 text-sm">
                Lorem ipsum dolor sit amet consectetur adipisicing elit.
                Quibusdam exercitationem, quasi amet voluptas expedita doloribus
                eligendi deleniti suscipit minima neque illo voluptates! These
                assets offer safer and better yields.
              </p>
            </div>
          </motion.div>

          {tokens.map((token, index) => (
            <motion.div
              key={token.symbol}
              className="bg-brand-gray-1 col-span-2 rounded-xl p-6 h-full"
              variants={cardVariants}
              initial="hidden"
              animate={isInView ? "visible" : "hidden"}
              custom={index + 1}
            >
              <div className="flex flex-col justify-between h-full">
                <div>
                  <div className="flex items-center justify-between mb-4">
                    <h3 className="text-xl font-semibold">{token.symbol}</h3>
                    <span className="text-brand-gray-4 text-sm">
                      Live Price
                    </span>
                  </div>

                  <div className="flex items-baseline space-x-2 mb-4">
                    <AnimatedNumberText
                      value={token.price}
                      className="text-3xl font-bold"
                    />

                    <span className="text-brand-gray-4 font-medium">
                      APY {token.apy}
                    </span>
                  </div>

                  <p className="text-brand-gray-5 text-sm mb-4">
                    {token.description}
                  </p>
                </div>

                <div className="flex flex-wrap gap-2">
                  {token.tags.map((tag) => (
                    <span
                      key={tag}
                      className="bg-brand-blue-1 text-xs px-3 py-1 rounded-full text-brand-blue-5"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </section>
    </AnimatedBackground>
  );
}

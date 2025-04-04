"use client";

import React from "react";
import { motion } from "framer-motion";
import Button from "./Button";
import FloatingGlass from "./FloatingGlass";

const Hero = () => {
  return (
    <div className="relative min-h-screen overflow-hidden">
      <div className="absolute inset-0">
        <FloatingGlass />
      </div>

      <div className="relative z-10 w-full md:w-2/5 flex items-center justify-center min-h-screen">
        <motion.div
          initial={{ scale: 0.7, opacity: 0, originX: 0, originY: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ duration: 1.1, ease: [0.33, 1, 0.68, 1] }}
          className="space-y-6 pl-16"
        >
          <motion.h1
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.6, duration: 0.6 }}
            className="text-4xl md:text-6xl font-ondo font-medium"
          >
            Ondo Tokenized Assets
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.8, duration: 0.6 }}
            className="text-md text-brand-gray-4"
          >
            Some well written copy here that describes the various types of
            tokens that Ondo offers. There are Cash Equivalent tokens (USDY,
            OUSG) and there are tokenized equities (Stocks, ETFs).
          </motion.p>

          <div className="flex gap-4">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 1, duration: 0.5 }}
            >
              <Button>View GM Assets</Button>
            </motion.div>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 1.2, duration: 0.5 }}
            >
              <Button>View CE Assets</Button>
            </motion.div>
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default Hero;

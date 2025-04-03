import React from "react";
import Button from "./Button";
import FloatingGlass from "./FloatingGlass";

const Hero = () => {
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 md:py-24">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
        <div className="space-y-6">
          <h1 className="text-4xl md:text-6xl font-ondo font-medium">
            Ondo Tokenized Assets
          </h1>

          <p className="text-md text-brand-gray-3">
            Some well written copy here that describes the various types of
            tokens that Ondo offers. There are Cash Equivalent tokens (USDY,
            OUSG) and there are tokenized equities (Stocks, ETFs).
          </p>

          <div className="flex flex-wrap gap-4 pt-4">
            <Button>View GM Assets</Button>
            <Button>View CE Assets</Button>
          </div>
        </div>

        <div className="bg-gray-200 rounded-lg aspect-square flex items-center justify-center p-5 max-h-[50vh]">
          <FloatingGlass />
        </div>
      </div>
    </div>
  );
};

export default Hero;

"use client";

import { useGsapAnimations } from "./hooks/useGsapAnimations";
import Nav from "../components/Nav";
import Hero from "../components/Hero";
import CashEq from "../components/CashEq";
import ExpandingCard from "../components/ExpandingCard";

export default function Home() {
  useGsapAnimations();

  const cards = [
    { title: "USDY", content: "Safer, yield-bearing token for non-US users" },
    { title: "OUSG", content: "Permissioned, instant mint & redeem" },
    { title: "Stable ETH", content: "High-yield, overcollateralized" },
    { title: "Tokenized Bonds", content: "TradFi meets DeFi" },
  ];

  return (
    <div className="bg-black p-1 py-2">
      <main className="bg-white text-black rounded-t-2xl overflow-hidden">
        <section className="relative bg-brand-green-1">
          <Nav />
          <Hero />
        </section>
        <CashEq />
        <section className="min-h-screen bg-neutral-100 py-24 px-8">
          <div className="max-w-6xl mx-auto grid grid-cols-2 md:grid-cols-4 gap-6">
            {cards.map((card, i) => (
              <ExpandingCard key={i} index={i} {...card} />
            ))}
          </div>
        </section>
      </main>
      <footer className="bg-white rounded-b-2xl text-center text-sm pt-4 pb-2">
        <p>© 2025 Ondo. All rights reserved.</p>
      </footer>
    </div>
  );
}

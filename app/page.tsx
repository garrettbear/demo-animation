"use client";

import { useGsapAnimations } from "./hooks/useGsapAnimations";
import Nav from "../components/Nav";
import Hero from "../components/Hero";
import CashEq from "../components/CashEq";
import TickerMarquee from "../components/TickerMarquee";
export default function Home() {
  useGsapAnimations();

  return (
    <div className="bg-black p-1 py-2">
      <main className="bg-white text-black rounded-t-2xl overflow-hidden">
        <section className="relative bg-brand-green-1">
          <Nav />
          <Hero />
        </section>
        <CashEq />
        <TickerMarquee />
      </main>
      <footer className="bg-white rounded-b-2xl text-black text-center text-sm pt-4 pb-2">
        <p>© {new Date().getFullYear()} Demo. All rights reserved.</p>
      </footer>
    </div>
  );
}

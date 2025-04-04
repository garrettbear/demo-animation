"use client";

import { useGsapAnimations } from "./hooks/useGsapAnimations";
import Nav from "../components/Nav";
import Hero from "../components/Hero";
import CashEq from "../components/CashEq";
import TickerMarquee from "../components/TickerMarquee";
import AnimatedBackground from "../components/AnimatedBackground";

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
        <AnimatedBackground>
          <section className="min-h-[100vh]">
            <h3 className="text-center text-3xl font-bold pt-12">
              US Markets. Global Assets.
            </h3>
            <div className="flex flex-wrap justify-center gap-3 py-6 px-4">
              <span className="px-3 py-1 text-sm font-medium bg-brand-blue-1 text-brand-blue-5 rounded-full">
                Currently Not Available in the US
              </span>
            </div>
            <TickerMarquee />
          </section>
        </AnimatedBackground>
      </main>
      <footer className="bg-white rounded-b-2xl text-black text-center text-sm pt-4 pb-2">
        <p>© {new Date().getFullYear()} Demo. All rights reserved.</p>
      </footer>
    </div>
  );
}

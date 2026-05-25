"use client";
import { motion } from "framer-motion";

export function Hero() {
  return (
    <section className="min-h-screen flex flex-col items-center justify-center px-4 relative">
      <motion.h1
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        className="text-7xl md:text-9xl font-bold tracking-tighter text-center bg-gradient-to-b from-foreground to-foreground/50 bg-clip-text text-transparent"
      >
        Vertexora <br /> Solutions
      </motion.h1>
      <motion.p
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.5, duration: 0.8 }}
        className="mt-6 text-xl text-foreground/60 max-w-lg text-center font-medium"
      >
        Building the future with agentic intelligence and elite design.
      </motion.p>
    </section>
  );
}

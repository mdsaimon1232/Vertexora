"use client";

import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";

export function Hero() {
  return (
    <section className="h-screen w-full">
      <div className="relative h-full w-full overflow-hidden rounded-2xl md:rounded-[2rem]">
        {/* Background video */}
        <video
          autoPlay
          loop
          muted
          playsInline
          className="absolute inset-0 h-full w-full object-cover transition-transform duration-[10s] group-hover:scale-105"
          src="https://d8j0ntlcm91z4.cloudfront.net/user_38xzZboKViGWJOttwIXH07lWA1P/hf_20260405_170732_8a9ccda6-5cff-4628-b164-059c500a2b41.mp4"
        />

        {/* Noise overlay */}
        <div className="noise-overlay pointer-events-none absolute inset-0 opacity-[0.25] mix-blend-overlay" />

        {/* Gradient overlay */}
        <div className="pointer-events-none absolute inset-0 bg-gradient-to-b from-black/10 via-black/10 to-[#050505]/90" />

        {/* Title */}
        <div className="absolute left-6 top-16 md:left-10 md:top-24 z-20 pointer-events-none flex justify-start">
          <h1 
            className="font-medium leading-[0.85] tracking-[-0.07em] text-[12vw] sm:text-[10vw] md:text-[8vw] lg:text-[7vw] xl:text-[6vw] 2xl:text-[6vw] text-left" 
            style={{ color: "#E1E0CC" }}
          >
            <div className="inline-flex flex-wrap ">
              <span className="inline-block relative" style={{ marginRight: "0px", opacity: 1, transform: "none" }}>
                Vertexora
                <span className="absolute top-[0.65em] -right-[0.3em] text-[0.31em]">*</span>
              </span>
            </div>
          </h1>
        </div>

        {/* Hero content */}
        <div className="absolute bottom-0 left-0 right-0 px-4 pb-2 sm:px-6 md:px-10">
          <div className="flex flex-col md:flex-row items-end justify-between gap-6 pb-6 lg:pb-10">
            {/* Action Button */}
            <motion.a
              href="#contact"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.7 }}
              className="group flex items-center gap-4 rounded-full bg-[#E1E0CC] py-1.5 pl-6 pr-2 text-sm font-semibold text-black hover:bg-white hover:gap-5 transition-all cursor-pointer shadow-[0_0_20px_rgba(225,224,204,0.3)] shrink-0"
            >
              <span className="uppercase tracking-tighter">Start Project</span>
              <span className="flex h-10 w-10 md:h-12 md:w-12 items-center justify-center rounded-full bg-black shadow-lg transition-transform group-hover:scale-110">
                <ArrowRight className="h-4 w-4 md:h-5 md:w-5" style={{ color: "#E1E0CC" }} />
              </span>
            </motion.a>

            {/* Description */}
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.5 }}
              className="text-sm md:text-base lg:text-lg font-light text-white/90 leading-relaxed max-w-2xl drop-shadow-md text-right"
            >
              We build scalable digital products, high-performance web applications, and intelligent automation systems engineered for modern business growth.
            </motion.p>
          </div>
        </div>
      </div>
    </section>
  );
}

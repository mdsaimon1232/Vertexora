"use client";
import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";
import { useEffect, useRef } from "react";

export function Hero() {
  const videoRef = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    if (videoRef.current) {
      videoRef.current.play().catch((error) => {
        console.error("Video autoplay failed:", error);
      });
    }
  }, []);

  return (
    <section className="min-h-screen flex flex-col items-center justify-center px-4 relative overflow-hidden">
      {/* Background video */}
      <video
        ref={videoRef}
        autoPlay
        loop
        muted
        playsInline
        className="absolute inset-0 h-full w-full object-cover -z-40 transition-transform duration-[10s]"
        src="https://d8j0ntlcm91z4.cloudfront.net/user_38xzZboKViGWJOttwIXH07lWA1P/hf_20260405_170732_8a9ccda6-5cff-4628-b164-059c500a2b41.mp4"
      />

      {/* Noise overlay */}
      <div className="noise-overlay pointer-events-none absolute inset-0 opacity-[0.15] mix-blend-overlay -z-30" />

      {/* Gradient overlay - much more subtle to keep video clear */}
      <div className="pointer-events-none absolute inset-0 bg-gradient-to-b from-black/20 via-transparent to-background/40 -z-20" />

      <div className="z-10 flex flex-col items-center">
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
          transition={{ delay: 0.3, duration: 0.8 }}
          className="mt-6 text-xl md:text-2xl text-foreground/80 max-w-2xl text-center font-medium drop-shadow-lg"
        >
          Building the future with agentic intelligence and elite design.
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6, duration: 0.8 }}
          className="mt-10 flex flex-col md:flex-row items-center gap-6"
        >
          <a
            href="#contact"
            className="group flex items-center gap-4 rounded-full bg-blue-600 dark:bg-foreground py-2 pl-8 pr-2 text-sm font-semibold text-white dark:text-background hover:scale-105 transition-all shadow-[0_0_30px_rgba(59,130,246,0.3)] dark:shadow-[0_0_30px_rgba(255,255,255,0.1)]"
          >
            <span className="uppercase tracking-widest">Start Project</span>
            <span className="flex h-12 w-12 items-center justify-center rounded-full bg-white dark:bg-background transition-transform group-hover:rotate-[-45deg]">
              <ArrowRight className="h-5 w-5 text-blue-600 dark:text-foreground" />
            </span>
          </a>
        </motion.div>
      </div>

      {/* Bottom info bar */}
      <div className="absolute bottom-10 left-0 right-0 px-10 hidden md:flex justify-between items-end z-10">
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.8 }}
          className="text-sm font-light tracking-widest uppercase opacity-50"
        >
          Based in Silicon Valley & Remote
        </motion.div>
        <motion.div
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.8 }}
          className="max-w-xs text-right text-xs uppercase tracking-tighter opacity-50 leading-relaxed"
        >
          Scalable digital products & intelligent automation engineered for modern growth.
        </motion.div>
      </div>
    </section>
  );
}

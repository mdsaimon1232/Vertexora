"use client";

import { motion, useInView } from "motion/react";
import { ArrowRight } from "lucide-react";
import { useRef } from "react";

/* ---------------- WordsPullUp ---------------- */
interface WordsPullUpProps {
  text: string;
  className?: string;
  showAsterisk?: boolean;
  style?: React.CSSProperties;
}

export const WordsPullUp = ({ text, className = "", showAsterisk = false, style }: WordsPullUpProps) => {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true });
  const words = text.split(" ");

  return (
    <div ref={ref} className={`inline-flex flex-wrap ${className}`} style={style}>
      {words.map((word, i) => {
        const isLast = i === words.length - 1;
        return (
          <motion.span
            key={i}
            initial={{ y: 20, opacity: 0 }}
            animate={isInView ? { y: 0, opacity: 1 } : {}}
            transition={{ duration: 0.6, delay: i * 0.08, ease: [0.16, 1, 0.3, 1] }}
            className="inline-block relative"
            style={{ marginRight: isLast ? 0 : "0.25em" }}
          >
            {word}
            {showAsterisk && isLast && (
              <span className="absolute top-[0.65em] -right-[0.3em] text-[0.31em]">*</span>
            )}
          </motion.span>
        );
      })}
    </div>
  );
};

/* ---------------- WordsPullUpMultiStyle ---------------- */
interface Segment {
  text: string;
  className?: string;
}

interface WordsPullUpMultiStyleProps {
  segments: Segment[];
  className?: string;
  style?: React.CSSProperties;
}

export const WordsPullUpMultiStyle = ({ segments, className = "", style }: WordsPullUpMultiStyleProps) => {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true });

  const words: { word: string; className?: string }[] = [];
  segments.forEach((seg) => {
    seg.text.split(" ").forEach((w) => {
      if (w) words.push({ word: w, className: seg.className });
    });
  });

  return (
    <div ref={ref} className={`inline-flex flex-wrap justify-center ${className}`} style={style}>
      {words.map((w, i) => (
        <motion.span
          key={i}
          initial={{ y: 20, opacity: 0 }}
          animate={isInView ? { y: 0, opacity: 1 } : {}}
          transition={{ duration: 0.6, delay: i * 0.08, ease: [0.16, 1, 0.3, 1] }}
          className={`inline-block ${w.className ?? ""}`}
          style={{ marginRight: "0.25em" }}
        >
          {w.word}
        </motion.span>
      ))}
    </div>
  );
};

/* ---------------- Hero ---------------- */
const PrismaHero = () => {
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

        {/* Moved Title */}
        <div className="absolute left-6 top-16 md:left-10 md:top-24 z-20 pointer-events-none flex justify-start">
          <h1
            className="font-medium leading-[0.85] tracking-[-0.07em] text-[12vw] sm:text-[10vw] md:text-[8vw] lg:text-[7vw] xl:text-[6vw] 2xl:text-[6vw] text-left"
            style={{ color: "#E1E0CC" }}
          >
            <WordsPullUp text="Vertexora" showAsterisk />
          </h1>
        </div>

        {/* Hero content */}
        <div className="absolute bottom-0 left-0 right-0 px-4 pb-2 sm:px-6 md:px-10">
          <div className="flex flex-col md:flex-row items-end justify-between gap-6 pb-6 lg:pb-10">
            
            {/* Button on the Left */}
            <motion.a
              href="#contact"
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ duration: 0.8, delay: 0.7, ease: [0.16, 1, 0.3, 1] }}
              className="group flex items-center gap-4 rounded-full bg-[#E1E0CC] py-1.5 pl-6 pr-2 text-sm font-semibold text-black hover:bg-white hover:gap-5 transition-all cursor-pointer shadow-[0_0_20px_rgba(225,224,204,0.3)] shrink-0"
            >
              <span className="uppercase tracking-tighter">Start Project</span>
              <span className="flex h-10 w-10 md:h-12 md:w-12 items-center justify-center rounded-full bg-black shadow-lg transition-transform group-hover:scale-110">
                <ArrowRight className="h-4 w-4 md:h-5 md:w-5" style={{ color: "#E1E0CC" }} />
              </span>
            </motion.a>

            {/* Description on the Right */}
            <motion.p
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ duration: 0.8, delay: 0.5, ease: [0.16, 1, 0.3, 1] }}
              className="text-sm md:text-base lg:text-lg font-light text-white/90 leading-relaxed max-w-2xl drop-shadow-md text-right"
            >
              We build scalable digital products, high-performance web applications, and intelligent automation systems engineered for modern business growth.
            </motion.p>
          </div>
        </div>
      </div>
    </section>
  );
};

export { PrismaHero };
